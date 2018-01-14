# vue-movies

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# run unit tests
npm test

# run unit tests with watch mode
npm test -- --watch
```

## Step 1

> Add Vue components

- Install the dependencies, start the development server and go to http://localhost:8080.
- Install Vue.js devtools [chrome extension]( https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

At this moment, the whole application is composed of 2 components: `App.vue` (the main component) and `Header.vue`. You can see and inspect these components with "Vue" tab within the Chrome devtools.

As you can see in the source code (`vue-movies/src/`), the whole HTML template is in `App.vue` component, which is far from ideal. We need to split this code in components, the same way it is done with `Header`.

- Create an empty component `Week` (no props or data) for the week days bar. Extract the following HTML code from `App.vue`:

```html
<section class="section has-full-width days-bar">
  ...
</section>
```

and move it into `components/Week.vue` template. Use this new component in `App.vue`. Inspect the Vue devtools to see the `Week` component.
- Do the same for the checkbox filters by creating 3 components: `TimeFilter`, `GenreFilter` and `CountryFilter`. The HTML code blocks you must extract from `App.vue` are the following ones:

```html
<!-- TimeFilter.vue -->
<section class="section has-full-width">
  <strong>By time of day</strong>
  ...
</section>

<!-- GenreFilter.vue -->
<section class="section has-full-width">
  <strong>By genre</strong>
  ...
</section>

<!-- CountryFilter.vue -->
<section class="section has-full-width">
  <strong>By country</strong>
  ...
</section>
```

- Create a `Movie` component to represent each movie on the list. As you can guess, the HTML code of a `Movie` component is defined by the following blocks:

```html
<article class="media">
  ...
</articles>
```

A `Movie` component has 4 props: `poster`, `title`, `subtitle` and `asbtract`. All props are `String`. Replace hard coded texts in `Movie` template with the corresponding props. Also, as **different movies have different tickets**, the `Movie` component needs a `<slot></slot>` tag in its template to allow tickets to be _inserted_ from `App.vue` template. Use `Movie` components in `App.vue` (as many times as there are movies).
- Create a `Ticket` component to represent a movie ticket. The HTML code of a `Ticket` components is defined by the following blocks:

```html
<a class="button is-light ticket">
  ...
</a>
```

A `Ticket` component has 1 prop: `time` (type `String`). Replace hard coded time with `time` prop in `Ticket` template. Use `Ticket` components in `App.vue`, within each `<Movie>` tag.

## Step 2

> Fetch movies from JSON, use `v-for` directive and computed properties

- In `App.vue` component, import `movies` from `/assets/json/movies.json`:

```javascript
import { movies } from '@/assets/json/movies.json'
```

and return this list (`movies`) in `data()` function. Look at `App` component in the Vue devtools, you should see the list of 12 movies.
- Use `v-for` directive to replace all `<Movie>` tags with a single one. The `Movie` component needs to be updated as it now needs a prop `movie` (type `Object`) instead of `poster`, `title`, `subtitle` and `asbtract`. You can use `movie.id` as a `key` for the `v-for` directive.
- In `Movie` component, add a `computed` property `subtitle()` to render the movie subtitle from its `release`, `genres` and `country` properties.
- Now, the `Ticket` component should be within the `Movie` component. Replace the `<slot></slot>` tag with a `<Ticket>` tag associated with a `v-for` directive (a movie has multiple tickets). You should only display tickets from first day (`movie.days[0].tickets`). You can use `ticket.id` as a `key` for the `v-for` directive.

## Step 3

> Display tickets per day

As you can see in the movies data, each movie has 7 days and each day has 1 to 5 tickets. To display the tickets corresponding to a given day, we need a way to communicate from the `Week` component to the `Movie` components. To do this, we will emit an event (the selected day) from the `Week` component to its parent `App` component. Then, the `App` component will transmit the selected day to the `Movies` component with a prop.
- Add a new property in the `App` component `data()` function: `currentDayIndex` with 0 as the value.
- Update the `Movie` component to add a new prop: `currentDayIndex` (type `Number`). In the HTML template, use this new prop to select the day in the  `<Ticket v-for="...">` loop.
- In the `Week` component, add a `data()` function to return a `days` array:

```javascript
days: [
  'Today',
  'Mon 1/1',
  'Tue 2/1',
  'Wed 3/1',
  'Thu 4/1',
  'Fri 5/1',
  'Sat 6/1'
]
```

Replace the hard coded `<li>` tags with a single `<li>` and a `v-for` directive that loops on `days` list.
- Add a method `isActive(index)` that returns `true` when the current day index from the loop is the selected day. Use this method in the template to toggle the CSS class `is-active` on the `<li>` tag.
- Add a method `selectDay(index)` that should be called on `click` event on the `<a>` tag. This method emits an event `dayUpdate` with the day index.
- Finally, in `App` component, add a method `updateDay(dayIndex)` that should be called on `dayUpdate` event. In this method, you need to update `currentDayIndex` with the new day index.

## Step 4

> Filter movies by time of day

As you did with `Week` component, `TimeFilter` component needs to communicate with `Movie` component through `App` component with events and props.
- Add a new property in `App` component `data()` function:

```javascript
periods: {
  BEFORE_7: false,
  AFTER_7: false
}
```

This property handles the state of the `TimeFilter` component.
- Add a new prop: `periods` (type `Object`) in `TimeFilter` to receive `periods` data from `App` component template.
- In `TimeFilter` component template, bind the `periods` to the `checked` attribute of both `input` tags (i.e. "before-7" checkbox should be checked if `BEFORE_7` is `true` and "after-7" checkbox should be checked if `AFTER_7` is `true`).
- Add a method `updatePeriod(periodId, $event)` that should be called on `change` event on both `input` tags. This method emits an event `periodUpdate` with a period id and its `checked` property.
- In `App` component, add a method `updatePeriod(periodId, checked)` that should be called on `periodUpdate`. In this method, you need to update `periods` boolean flags.
- In `Movie` component, add a new prop: `periods` (type `Object`). As you can guess, this prop should be used to transmit `periods` from `App` component.
- Add a new `computed` property `ticketsAvailable()` that should return `true` if both `periods` are checked or unchecked. If `BEFORE_7` period is checked, the method should return `true` only if the movie has tickets available before 7 for the current day. If `AFTER_7` period is checked, the method should return `true` only if the movie has tickets available after 7 for the current day. Use this `computed` property in a `v-if` directive on the root `tag` (`<article>`) of the template to show or hide movies according to the checked periods.

> Filter movies by genre

- Add a new property in `App` component `data()` function:

```javascript
genres: [
  { id: 'ACTION', label: 'Action', checked: false },
  { id: 'ADVENTURE', label: 'Adventure', checked: false },
  { id: 'ANIMATION', label: 'Animation', checked: false },
  { id: 'BIOGRAPHY', label: 'Biography', checked: false },
  { id: 'COMEDY', label: 'Comedy', checked: false },
  { id: 'CRIME', label: 'Crime', checked: false },
  { id: 'DRAMA', label: 'Drama', checked: false },
  { id: 'FANTASY', label: 'Fantasy', checked: false },
  { id: 'HORROR', label: 'Horror', checked: false },
  { id: 'ROMANCE', label: 'Romance', checked: false },
  { id: 'SCI-FI', label: 'Sci-Fi', checked: false }
]
```

This property handles the state of `GenreFilter` component.
- Add a new prop: `genres` (type `Array`) in `GenreFilter` to receive `genres` data from `App` component template.
- In `GenreFilter` component template, replace all hard coded `<li>` tags with a single `<li>` tag and a `v-for` directive that loops on `genres` list. Bind `id`, `label` and `checked` properties on `<input>` tag.
- As you did for `TimeFilter`, add a method `updateGenre(genreId, $event)` that emits a `genreUpdate` event with the current genre id and its `checked` property.
- Handle this event in `App` component to update `genres` data.
- In `Movie` component, add a new prop: `genres` (type `Array`) to get the `genres` list from `App` component.
- Add a new `computed` property `genresAvailable()` that should return `true` if all genres are unchecked. Otherwise, `true` should be returned only if the movie has the selected genre(s). Use this `computed` property in the `v-if` so that movies are filtered by periods **AND** by genres.

> Filter movies by country

- Add a new property in `App` component `data()` function:

```javascript
countries: [
  { id: 'USA', label: 'USA', checked: false },
  { id: 'FRANCE', label: 'France', checked: false },
  { id: 'SOUTH_KOREA', label: 'South Korea', checked: false }
]
```

This property handles the state of `CountryFilter` component.
- Add a new prop: `countries` (type `Array`) in `CountryFilter` to receive `countries` data from `App` component template.
- In `CountryFilter` component template, replace all hard coded `<li>` tags with a single `<li>` tag and a `v-for` directive that loops on `countries` list. Bind `id`, `label` and `checked` properties on `<input>` tag.
- As you did for `GenreFilter`, add a method `updateCountry(countryId, $event)` that emits a `countryUpdate` event with the current genre id and its `checked` property.
- Handle this event in `App` component to update `countries` data.
- In `Movie` component, add a new prop: `countries` (type `Array`) to get the `countries` list from `App` component.
- Add a new `computed` property `countriesAvailable()` that should return `true` if all countries are unchecked. Otherwise, `true` should be returned only if the movie has the selected country (a movie has only 1 country). Use this `computed` property in the `v-if` so that movies are filtered by periods **AND** by genres **AND** by countries.

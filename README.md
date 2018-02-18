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

## Step 5

> Fetch movies from server

To fetch movies from server, we're going to use `vue-movies-server` repository. Download / Clone the project on your computer from: https://github.com/sciences-u-lyon/vue-movies-server.

To start the server:
- Go into `/vue-movies-server`
- Install dependencies: `npm install`
- Run the start command: `npm start`

Back to `vue-movies` app, use `axios`, a promise based HTTP client for the browser, to fetch movies from an API, instead of getting them from a JSON file.
- Install `axios` in the project dependencies: `npm install axios --save`.
- In `App` component, set `movies` in `data()` as an empty array.
- in a `hook` function of the Vue instance of `App` component, fetch movies from http://localhost:3000/movies with a `GET` HTTP request with `axios` to set `movies`.

As you will notice, movies posters are not displayed anymore. This is because, now, we need to fetch images from the server.
- In `Movie` component, use a new computed property `poster` to fetch the current movie poster with the following URL: http://localhost:3000/img/movie-poster-name.jpg.

## Step 6

> Hands on Vue Router

We're going to use `vue-router` to add a "checkout" view with a form to (fake) buy a movie ticket. But first, let's refactor our app to use `vue-router` with the current and only view (the list of movies).

- Create a new folder `home` in the `components` folder.
- Move all components except `Header` inside `home` folder.
- Create a new component `Home` (with `<main>` as root tag in template) and move inside all code from `App`, so that `App` template now is:
```html
<template>
  <section class="section">
    <div class="container">
      <Header />

    </div>
  </section>
</template>
```
- Create a new folder `router` in `src`, with a single file `index.js`.
- In this file, export an instance of `Router` with a single route mapped to `Home` component (URL should be `/`).
- Import this `Router` instance in `main.js` to add it as a property to the `Vue` instance.
- Finally, in `App` component, use `<router-view />` tag (right below `<Header />`) to dynamically load `Home` component with the default URL: `/`.

Let's now add the "checkout" view:

- Create a new folder `checkout` in the `components` folder.
- In this folder, create a new component `Checkout` with the following template:
```html
<template>
  <main>
    <div class="columns is-variable">
      <div class="column is-half">
        <section class="section has-full-width">
          <Movie />
        </section>
      </div>
      <div class="column">
        <TicketForm />
      </div>
    </div>
  </main>
</template>
```
- As you can, there are 2 children components within `Checkout`: `Movie` and `TicketForm`. This `Movie` is not the `Movie` component we use for the movies list (this is a simplified version).
- In the `checkout` folder, create a `Movie` component with the following template:
```html
<template>
  <article class="media">
    <div class="columns is-variable">
      <div class="column is-two-fifths">
        <img src="/static/img/avengers.jpg">
      </div>
      <div class="column">
        <div class="media-content">
          <div class="content">
            <strong>Avengers: Infinity War</strong>
            <br>
            <small>4 May 2018 / Action, Adventure, Fantasy / USA</small>
            <p class="abstract">The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
```
- Then, create a `TicketForm` component with the following template:
```html
<template>
  <section class="section has-full-width">
    <h1 class="title">
      <span class="icon is-small"><i class="fa fa-calendar" aria-hidden="true"></i></span>&nbsp;
      <span>Today at 20:00</span>
    </h1>
    <form novalidate>
      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control has-icons-left has-icons-right">
          <!-- Add class `is-danger` to input when invalid -->
          <input id="email" class="input" type="email" placeholder="john.doe@domain.com" required>
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
          <!-- Add code below when invalid -->
          <!-- <span class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span> -->
        </div>
        <!-- Add code below when invalid -->
        <!-- <p class="help is-danger">Email is invalid</p> -->
      </div>
      <div class="field">
        <label class="label" for="creditcard">Credit Card Number</label>
        <div class="control has-icons-left has-icons-right">
          <!-- Add class `is-danger` to input when invalid -->
          <input id="creditcard" class="input" type="number" placeholder="12345678" required>
          <span class="icon is-small is-left">
            <i class="fa fa-credit-card-alt"></i>
          </span>
          <!-- Add code below when invalid -->
          <!-- <span class="icon is-small is-right">
            <i class="fa fa-warning"></i>
          </span> -->
        </div>
        <!-- Add code below when invalid -->
        <!-- <p class="help is-danger">Credit Card Number is invalid (must be 8 numbers)</p> -->
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary">
            <span class="icon is-small"><i class="fa fa-ticket"></i></span>
            <span>Buy Ticket</span>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
```
- In `/router/index.js`, add a route `/checkout/:movieId` mapped to `Checkout` component.

This `Checkout` component should be loaded on the ticket click event of a movie.

- Add a `checkout` method on the `Ticket` component that will `$emit` a `checkout` event when we click on the `<a>` tag.
- In `home/Movie` component, handle the `checkout` event from `Ticket` and use the `$router` object to push the `/checkout` route with `{ movieId }` as params and `{ dayIndex, ticketId }` as query. For example, if we want to checkout the ticket of id 2 for today (day index 0) and for the first movie, the URL should be: `/checkout/1?dayIndex=0&ticketId=2`.
- In `checkout/Movie` component, use the `created` hook function to fetch the movie from the server. You need to use the movie id from the URL (`this.$route.params`) and execute a `GET` HTTP request with `axios` on the following API route: `http://localhost:3000/movies/movieId`.
- Once you get the `movie` data, pass it as a `props` to the `Movie` component and replace the hard coded values.
- Finally, you need to get the day value matching the given `dayIndex` and find the ticket object matching the `ticketId` (form the movie tickets list), so that you can replace the hard coded string "Today at 20:00" in `TicketForm` component with dynamic values.

## Step 7

> Handling checkout form with validation

To handle form validation, we're going to use `VeeValidate`, a simple input validation plugin for Vue.
- Install `VeeValidate` in `vue-movies` dependencies: `npm install vee-validate --save`.
- In `TicketForm` component, add a `data()` function that returns an object with 3 properties: `submitted` set to `false`, `email` and `creditCard`, both set to `''` (empty string).
- Bind these properties to their corresponding `<input>` tag with the `v-model` directive.
- Use `v-validate` directive on `<input>` tags to set validations rules:
  - `email` should be `required` and of type `email`.
  - `creditCard` should be `required` and count exactly 8 digits.
- Use `errors` special object (from `VeeValidate`) to add `is-error` class to `<input>` tags when they are not valid AND the form was submitted. Use this object as well to show the warning icons.
- The submit button should be disabled if `email` AND `creditCard` fields are pristine. Use `fields` special object to handle it.
- Add a method `checkoutTicket` to set `submitted` to `true` and emit a `checkout` event with `email` and `creditCard` values, only if the form is valid.
- This method should be called on the form `submit` event.

The last thing we need to do now to complete the project, is to send the user inputs and the selected movie to the server:
- In `Checkout` component, handle `checkout` event from `TicketForm` to call a `checkout` method.
- This method should send a `POST` HTTP request with `axios` to the following API route: http://localhost:3000/checkout, and the following params:
```javascript
{
  email,
  creditCard,
  movie: {
    title,
    day,
    time
  }
}
```
- Once the request is sent with success, you should redirect the URL to `Home` component (`/`).

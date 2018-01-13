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

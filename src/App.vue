<template>
  <section class="section">
    <div class="container">
      <Header />

      <Week />

      <div class="columns is-variable is-8">
        <div class="column is-three-quarters">

          <section class="section has-full-width movies">

            <Movie
              v-for="movie in movies"
              :key="movie.id"
              :movie="movie" />

          </section>
        </div>

        <div class="column">
          <section class="section has-full-width filters">
            <h1 class="title">Find movies</h1>

            <TimeFilter />
            <GenreFilter />
            <CountryFilter />

          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header.vue'
import Week from '@/components/Week.vue'
import Movie from '@/components/Movie.vue'
import TimeFilter from '@/components/TimeFilter.vue'
import GenreFilter from '@/components/GenreFilter.vue'
import CountryFilter from '@/components/CountryFilter.vue'

import { movies } from '@/assets/json/movies.json'

export default {
  components: {
    Header,
    Week,
    Movie,
    TimeFilter,
    GenreFilter,
    CountryFilter
  },
  data () {
    return {
      movies
    }
  }
}
</script>

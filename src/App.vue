<template>
  <section class="section">
    <div class="container">
      <Header />

      <Week
        :currentDayIndex="currentDayIndex"
        @dayUpdate="updateDay" />

      <div class="columns is-variable is-8">
        <div class="column is-three-quarters">
          <section class="section has-full-width movies">

            <Movie
              v-for="movie in movies"
              :key="movie.id"
              :currentDayIndex="currentDayIndex"
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
import { movies } from '@/assets/json/movies.json'

import Header from '@/components/Header.vue'
import Week from '@/components/Week.vue'
import Movie from '@/components/Movie.vue'
import TimeFilter from '@/components/TimeFilter.vue'
import GenreFilter from '@/components/GenreFilter.vue'
import CountryFilter from '@/components/CountryFilter.vue'

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
      currentDayIndex: 0,
      movies
    }
  },
  methods: {
    updateDay (dayIndex) {
      this.currentDayIndex = dayIndex
    }
  }
}
</script>

<template>
  <article class="media">
    <div class="columns is-variable">
      <div class="column is-one-quarter">
        <img :src="require(`@/assets/img/${movie.poster}`)">
      </div>
      <div class="column">
        <div class="media-content">
          <div class="content">
            <strong>{{ movie.title }}</strong>
            <br>
            <small>{{ subtitle }}</small>
            <p class="abstract">{{ movie.abstract }}</p>

            <Ticket v-for="ticket in movie.days[currentDayIndex].tickets"
              :key="ticket.id"
              :time="ticket.time" />
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import Ticket from '@/components/Ticket.vue'
export default {
  props: {
    currentDayIndex: Number,
    movie: Object
  },
  components: {
    Ticket
  },
  computed: {
    subtitle () {
      const genres = this.movie.genres.map(genre => genre.label).join(', ')
      return `${this.movie.release} / ${genres} / ${this.movie.country.label}`
    }
  }
}
</script>

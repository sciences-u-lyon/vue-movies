<template>
  <section class="section has-full-width days-bar">
    <div class="container">
      <div class="tabs is-toggle">
        <ul>
          <li v-for="(day, index) in days"
            :key="index"
            :class="{ 'is-active': isActive(index) }">
            <a @click="selectDay(index)">{{ day }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentDayIndex: Number
  },
  data () {
    return {
      days: [
        'Today',
        'Mon 1/1',
        'Tue 2/1',
        'Wed 3/1',
        'Thu 4/1',
        'Fri 5/1',
        'Sat 6/1'
      ]
    }
  },
  methods: {
    isActive (index) {
      return this.currentDayIndex === index
    },
    selectDay (index) {
      this.$emit('dayUpdate', index)
    }
  }
}
</script>

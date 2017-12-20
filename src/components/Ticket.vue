<template>
  <a class="button is-light ticket">
    <span class="icon is-small"><i class="fas fa-ticket-alt"></i></span>
    <span>{{ time }}</span>
  </a>
</template>

<script>
export default {
  props: {
    time: String
  }
}
</script>

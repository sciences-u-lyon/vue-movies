<template>
  <article class="media">
    <figure class="media-left">
      <img :src="poster">
    </figure>
    <div class="media-content">
      <div class="content">
        <strong>{{ title }}</strong>
        <br>
        <small>{{ subtitle }}</small>
        <p class="abstract">{{ abstract }}</p>

        <slot></slot>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    poster: String,
    title: String,
    subtitle: String,
    abstract: String
  }
}
</script>

<template>
  <article class="media">
    <div class="columns is-variable">
      <div class="column is-one-quarter">
        <img :src="poster">
      </div>
      <div class="column">
        <div class="media-content">
          <div class="content">
            <strong>{{ title }}</strong>
            <br>
            <small>{{ subtitle }}</small>
            <p class="abstract">{{ abstract }}</p>

            <slot></slot>
          </div>
        </div>
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

<template>
  <div class="page-title">
    <h1>
      <i v-if="icon" :class="icon">
        {{ main }}
      </i>
    </h1>
    <h2>{{ sub }}</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['icon', 'main', 'sub']
}
</script>

<style>
  .page-title {

  }

  .page-title h1 {
    margin: 0;
  }

  .page-title h2 {
    color: #777;
    margin-top: 5px;
    font-size: 1.3rem;
  }
</style>
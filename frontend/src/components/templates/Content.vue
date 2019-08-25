<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '../home/Home.vue'

export default {
  name:'Content',
  components: { Home }
}
</script>

<style>
  .content {
    grid-area: content;
    background: #efefef;
    padding: 20px;
  }
</style>
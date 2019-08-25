<template>
  <header class="header">
    <a v-if="!hideToggle" @click.prevent="toggleMenu" class="toggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">{{title}}</router-link>
    </h1>
    <userDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import userDropdown from './userDropdown.vue'

export default {
  components: { userDropdown },
  name: 'top',
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible ? 'fa-angle-left' : 'fa-angle-down'
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit('toggleMenu', undefined)
    }
  }
}
</script>

<style>
  .header {
    grid-area: header;
    background: linear-gradient(to right, #1e469a, #49a7c1);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header a.toggle {
    cursor: pointer;
    width: 60px;
    height: 100%;
    color: #fff;
    justify-self: flex-start;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header a.toggle:hover{
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
  }

  .header .title {
    font-size: 1.2rem;
    color: #fff;
    font-weight: 100;
    flex-grow: 1;
    text-align: center;
  }

  .header .title a {
    color: #fff;
    text-decoration: none;
  }


</style>
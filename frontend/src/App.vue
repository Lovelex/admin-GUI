<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header title="Lovelex - Base de Conhecimento" 
      :hideToggle="false"
      :hideUserDropdown="false"
      />
    <Menu />
    <Content />
    <Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/templates/Header.vue'
import Menu from '@/components/templates/Menu.vue'
import Content from '@/components/templates/Content.vue'
import Footer from '@/components/templates/Footer.vue'

export default {
  name: "App",
  components:{ Header, Menu, Content, Footer },
  computed: {
    ...mapState(['isMenuVisible'])
  }
}
</script>

<style>
  * {
    font-family: "Lato", sans-serif;
  }

  body {
    margin: 0;
  }

  #app {
    -webkit-font-smoothing: Subpixel-rendering;
    -moz-osx-font-smoothing: auto;

    height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas: 
      "header header"  
      "menu content" 
      "menu footer" 
  }

  #app.hide-menu {
    grid-template-areas: 
      "header header"
      "content content"
      "footer footer"
  }
</style>
<template>
  <footer class="footer">
    <span>Copyright <strong>Lovelex</strong> © 2018 - {{year}} </span>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed:{
    year(){
      return new Date().getFullYear()
    }
  }
}
</script>

<style>
  .footer {
    grid-area: footer;
    background-color: #ddd;
    color: #333;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
  }
</style>
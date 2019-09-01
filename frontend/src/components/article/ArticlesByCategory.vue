<template>
  <div class="articles-by-category">
    <PageTitle 
      icon="fa fa-folder-o" 
      :main="category.name"  
      sub="Categoria"/>

    <ul>
      <li v-for="article in articles" :key="article.id" >
        <ArticleItem :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button
        class="btn btn-lg btn-outline-primary" 
        v-if="loadMore"
        @click="getArticles"> Carregar Mais Artigos
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global.js'
import PageTitle from '../templates/PageTitle.vue'
import ArticleItem from '../article/ArticleItem.vue'

export default {
  name: 'ArticlesByCategory',
  props: ['id'],
  components: { PageTitle, ArticleItem },
  data() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true
    }
  },

  methods: {
    async getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      await axios.get(url).then(res => this.category = res.data)
    },

    async getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
      await axios.get(url).then(res => {
        this.articles = this.articles.concat(res.data)
        this.page++
        
        if(res.data.length === 0) this.loadMore = false
      })
    }
  },

  watch: {
    $route(to) {
      this.category.id = to.params.id
      this.articles = []
      this.page = 1
      this.loadMore = true

      this.getCategory()
      this.getArticles()
    }
  },

  mounted() {
    this.category.id = this.id
    this.getCategory()
    this.getArticles()
  }
}
</script>

<style>
  .articles-by-category ul {
    list-style-type: none;
    padding: 0;
  }

  .articles-by-category .load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
  }
</style>
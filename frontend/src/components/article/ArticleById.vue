<template>
  <div class="article-by-id">
    <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global.js'
import axios from 'axios'
import PageTitle from '../templates/PageTitle.vue'

export default {
  name: 'ArticleById',
  props: ['id'],
  components: { PageTitle },
  data() {
    return {
      article: {}
    }
  },

  methods: {
    async getArticleById() {
      const url = `${baseApiUrl}/articles/${this.id}`
      await axios.get(url).then(res => this.article = res.data )
      
    }
  },

  mounted() {
    this.getArticleById()
  },

  updated() {
    document.querySelectorAll('.article-content pre').forEach(e => {
      hljs.highlightBlock(e)
    })
  }
}
</script>

<style>
  .article-by-id .article-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 25px;
  }

  .article-by-id .article-content pre {
    padding: 20px;
    border-radius: 8px;
    font-size: 1.2rem;
    background-color: #2e2e2e;
    color: #fff;
    font-weight: 600;
  }

  .article-by-id .article-content img {
    max-width: 100%;
  }

  .article-by-id .article-content :last-child {
    margin-bottom: 0px;
  }
</style>
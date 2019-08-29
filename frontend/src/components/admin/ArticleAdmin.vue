<template>
  <div class="article-admin">
    <b-form class="p-3" >
      <input type="hidden" id="article-id" v-model="article.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome:" label-for="article-name">
            <b-form-input
              required
              v-model="article.name"
              type="text"
              id="article-name"
              placeholder="Informe o Nome do Artigo"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição:" label-for="article-name">
            <b-form-input
              required
              v-model="article.description"
              type="text"
              id="article-description"
              placeholder="Informe a Descrição do Artigo"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Imagem(Url):" label-for="article-name">
            <b-form-input
              required
              v-model="article.imageUrl"
              type="text"
              id="article-image"
              placeholder="Informe a URL da Imagem"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Categoria:" label-for="article-category">
            <b-form-select v-model="article.categoryId" :options="categories" id="article-category" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Autor:" label-for="article-author">
            <b-form-select v-model="article.userId" :options="users" id="article-author" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Conteúdo:" label-for="article-content">
            <VueEditor placeholder="Informe o Conteúdo do Artigo" v-model="article.content" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button @click="reset" class="ml-3">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row>
      <b-col>
        <b-table hover striped :items="articles" :fields="fields">
          <template slot="actions" slot-scope="data">
            <b-button variant="warning" class="mr-2" @click="loadArticle(data.item, 'save')">
              <i class="fa fa-pencil" />
            </b-button>
            <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
              <i class="fa fa-trash" />
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global.js";
import axios from "axios";

export default {
  components: { VueEditor },
  name: "ArticleAdmin",
  data() {
    return {
      mode: "save",
      categories: [],
      articles: [],
      article: {},
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    async loadArticles() {
      const url = `${baseApiUrl}/articles`;
      const response = await axios.get(url);

      this.articles = response.data.data;
      this.count = response.data.count;
      this.limit = response.data.limit;
    },

    async loadArticle(article, mode = "save") {
      this.mode = mode;
      // this.article = { ...article };

      await axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then(response => { this.article = response.data})
    },

    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles/${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .then(() => this.loadArticles())
        .catch(showError);
    },

    reset() {
      this.mode = "save";
      (this.categories = []),
        (this.article = {}),
        (this.users = []),
        this.loadArticles();
    },

    async loadCategories() {
      const url = `${baseApiUrl}/categories`;
      const response = await axios.get(url);
      this.categories = response.data.map(category => {
        return { value: category.id, text: category.path };
      });
    },

    async loadUsers() {
      const url = `${baseApiUrl}/users`;
      const response = await axios.get(url);
      this.users = response.data.map(user => {
        return { value: user.id, text: `${user.name} - ${user.email}` };
      });
    }
  },

  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  }
};
</script>

<style>
</style>
<template>
  <div class="category-admin">
    <b-form class="p-3">
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome:" label-for="category-name">
            <b-form-input
              type="text"
              id="category-name"
              v-model="category.name"
              required
              placeholder="Informe o Nome da Categoria"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Categoria Pai:" label-for="category-parentId">
            <b-form-select id="category-parentId" 
              :options="categories" v-model="category.parentId" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row>
      <b-col>
        <b-table hover striped :items="categories" :fields="fields">
          <template slot="actions" slot-scope="data">
            <b-button variant="warning" class="mr-2" @click="loadCategory(data.item, 'save')">
              <i class="fa fa-pencil" />
            </b-button>
            <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
              <i class="fa fa-trash" />
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global.js";
import axios from "axios";

export default {
  name: "UserAdmin",
  data() {
    return {
      mode: "save",
      categories: [],
      category: {},
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    async loadCategories() {
      const url = `${baseApiUrl}/categories`;
      const response = await axios.get(url);
      this.categories = response.data.map( category => {
        return { ...category, value: category.id, text: category.path }
        // Value and text are default of b-form-select options
      } )
    },

    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { 
        id: category.id,
        name: category.name,
        parentId: category.parentId
      }
    },

    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories/${id}`, { ...this.category })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset()
        })
        .then(() => this.loadCategories())
        .catch(showError)
    },

    remove() {
      const id = this.category.id
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .then(() => this.loadCategories())
        .catch(showError)
    },

    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    }
  },

  mounted() {
    this.loadCategories();
  }
};
</script>

<style>
</style>
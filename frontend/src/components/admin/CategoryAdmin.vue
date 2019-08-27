<template>
  <div class="category-admin">
    <b-form class="p-3">
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-row>
        <b-col xl="12">
          <b-form-group label="Categoria" label-for="category-name">
            <b-form-input type="text" id="category-name" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global.js";
import axios from "axios";

export default {
  name: "UserAdmin",
  data() {
    return {
      categories:[],
      category: {},
    }
  }
}
</script>

<style>
</style>
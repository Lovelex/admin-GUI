<template>
  <div class="user-admin">
    <b-form class="p-3">
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="email"
              v-model="user.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Email do Usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <template v-if="mode === 'save'">
        <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">Administrador?</b-form-checkbox>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Senha:" label-for="user-password">
              <b-form-input
                id="user-password"
                type="password"
                v-model="user.password"
                required
                placeholder="Informe a Senha do Usuário"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Confirmar Senha:" label-for="user-confirm-password">
              <b-form-input
                id="user-confirm-password"
                type="password"
                v-model="user.confirmPassword"
                required
                placeholder="Confirme a Senha do Usuário"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </template>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-table hover striped :items="users" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUser(data.item, 'save')" class="mr-2">
          <i class="fa fa-pencil" />
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <i class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>
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
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-Mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    async loadUsers() {
      const url = `${baseApiUrl}/users`;
      const response = await axios.get(url);
      this.users = response.data;
    },

    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset()
        })
        .catch(showError);
      this.loadUsers();
    },

    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },

    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
  },

  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>
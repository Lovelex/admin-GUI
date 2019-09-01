<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{user.name}}</span>
      <div class="user-dropdown-img">
        <gravatar :email="user.email" alt="User" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-cogs">Administração</i>
      </router-link>
      <a href @click.prevent="logout">
        <i class="fa fa-sign-out">Sair</i>
      </a>
    </div>
  </div>
</template>

<script>
import { userKey } from "@/global.js";
import { mapState } from "vuex";
import gravatar from "vue-gravatar";

export default {
  name: "userDropdown",

  components: { gravatar },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'auth' })
    }
  }
};
</script>

<style>
.user-dropdown {
  height: 100%;
  position: relative;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown .user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0 20px;
}

.user-dropdown .user-dropdown-img {
  margin: 0 10px;
}

.user-dropdown .user-dropdown-img > img {
  max-height: 37px;
}

.user-dropdown .user-dropdown-content {
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown:hover .user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown:hover .user-dropdown-content a:hover {
  background-color: #ededed;
}

.user-dropdown:hover .user-dropdown-content a i::before {
  margin: 5px;
}
</style>
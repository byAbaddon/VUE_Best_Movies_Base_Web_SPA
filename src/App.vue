<!--  App.vue --> 

<template>
  <v-app class="container">
    <HeaderComponent class="item" />

    <v-main class="item">
      <router-view />
    </v-main>

    <FooterComponent class="item" />
  </v-app>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import router from "@/router"
import { onBeforeMount, onMounted } from "vue"
import { useMoviesStore } from "@/stores/moviesStore"

const store = useMoviesStore()

onBeforeMount(() => {
  if (!localStorage.getItem("auth")) {
    router.push("/").catch(() => {})
  } else {
    store.isAdminLogin = true
  }
})

onMounted( () => {
  store.loadMoviesFromStore()

})

</script>

<style>
body {
  user-select: none;
  background: #e8eaf6;
  font-family: "Playwrite CU", cursive;
  font-size: smaller;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1;
  margin: 0px;
}
</style>


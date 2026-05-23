 <!-- MoiviesView.vue -->
<template>
  <div  class=" bg-movies" >
    <div class="bg-white">
    
    <h2 class="text-center mt-0 text-uppercase">
      Choose a movie from the list of
      <span class="text-red-darken-4">
        {{ allMoviesCount }}
      </span>
      great movies
    </h2>

    <h3 class="text-blue text-center mt-1 text-uppercase text-decoration-underline">
      or search by options
    </h3>
</div>
    <v-card class="mt-1 " max-height="8em">
      <v-tabs
        class="mt-1 d-flex"
        v-model="tab"
        align-tabs="center"
        bg-color="deep-purple-darken-4"
        center-active
        slider-color="red-darken-4"
      >
        <v-tab :value="0" class="body-2 font-weight-bold" :style="{ width: !hideTab ? '100%' : '' }">
          <span @click="btnAllMovies"   class="d-none d-sm-inline">All-Movies</span>
          <span @click="btnAllMovies"   class="d-inline d-sm-none">Movies</span>
        </v-tab>

        <v-tab v-show="hideTab" :value="1" class="body-2 text-yellow font-weight-bold">
          Name
        </v-tab>

        <v-tab v-show="hideTab" :value="2" class="text-green body-2 font-weight-bold">
          Genre
        </v-tab>

        <v-tab v-show="hideTab" :value="3" class="text-orange body-2 font-weight-bold">
          Year
        </v-tab>
      </v-tabs>
    </v-card>

    <SearchMovieComponent :activeTab="tab" />
    <MovieListComponent />
  </div>
</template>

<script setup>
import MovieListComponent from '@/components/MovieListComponent.vue'
import SearchMovieComponent from '@/components/SearchMovieComponent.vue'
import { useMoviesStore } from '@/stores/moviesStore'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const store = useMoviesStore()

const tab = ref(0)
const hideTab = ref(true)


const allMoviesCount = computed(() => store.movies.length)


const btnAllMovies = () => {
  store.currentMovies = store.movies
}


watch(tab, (newValue) => {
  hideTab.value = newValue === 0
})
</script>

<style scoped>

.bg-movies {
  background-image: url('/assets/images/bg/bg_about.png');
  background-size: cover;
  background-position: center;
}


h2, h3 {
  text-shadow: 3px 3px 3px rgba(218, 3, 3, 0.4);
}
</style>



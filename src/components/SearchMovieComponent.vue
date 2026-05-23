<!-- SearchMovieComponents.vue  -->

<template>
  <div  class="bg-white" >
    <!-- SEARCH BY NAME    -->
    <v-row v-if="activeTab == 1" class="align-center justify-center">
      <v-col cols="8" lg="4">
        <v-text-field
          v-model="searchQueryByName"
          variant="underlined"
          prepend-icon="mdi-filmstrip"
          label="Search by name"
          :rules="rulesName"
          @keyup.enter="goBtnName(searchQueryByName)"
          :hint="hintMessage"
          clearable
        />
      </v-col>

      <v-col cols="auto">
        <v-btn
          class="mb-6"
          @click="goBtnName(searchQueryByName)"
          :disabled="isBtnNameDisabled"
          color="primary"
        >
          GO
        </v-btn>
      </v-col>
    </v-row>

    <!-- SEARCH BY YEAR      :hint="hintMessage" -->
    <v-row v-if="activeTab == 3" class="align-center justify-center">
      <v-col cols="8" lg="3">
        <v-text-field
          v-model="searchQueryByYear"
          type="number"
          variant="underlined"
          prepend-icon="mdi-calendar"
          label="Search by year"
          :rules="rulesYear"
          @keyup.enter="goBtnYear(searchQueryByYear)"
          :hint="hintMessage"
          clearable
        />
      </v-col>

      <v-col cols="auto">
        <v-btn
          class="mb-6"
          @click="goBtnYear(searchQueryByYear)"
          :disabled="isBtnYearDisabled"
          color="primary"
        >
          GO
        </v-btn>
      </v-col>
    </v-row>

    <!-- SEARCH BY GENRE -->
    <v-row v-if="activeTab == 2" class="justify-center">
      <v-col cols="8" lg="3">
        <v-select
          v-model="selectedGenre"
          :items="genreArray"
          label="Search by genre"
          variant="underlined"
          prepend-icon="mdi-magnify"
          @update:modelValue="findByGenre"
          :hint="hintMessage"
          clearable
        />
      </v-col>

    </v-row>
  </div>
</template>

<script setup>
import { useMoviesStore } from "@/stores/moviesStore"
import { ref, computed, watch } from "vue"
import confetti from "canvas-confetti"


const props = defineProps({
  activeTab: Number,
})


watch(() => props.activeTab, (newVal) => {
  if (newVal == 0) {

    selectedGenre.value = null
    counterFindMovies.value = 0
    searchQueryByName.value = ''
    searchQueryByYear.value = ''

    store.filteredMovies = []   // ✔ ТУК
    hintMessage.value ='write'
    // store.loadMoviesFromStore()
  }
})





const store = useMoviesStore()

const searchQueryByName = ref("")
const searchQueryByYear = ref("")
const selectedGenre = ref(null)
const counterFindMovies = ref(0)
const hintMessage = ref('write')
const genreArray = [
  "Action","Adventure","Animation","Biography","Comedy","Crime",
  "Documentary","Drama","Fantasy","Horror","Romance","Thriller","War","Western"
]

// --------------------
// SEARCH BY NAME                            
// --------------------
const goBtnName = (query) => {
  if (!query) return
  const regex = new RegExp(query.replace(/\s+/g, "\\s*"), "i")

  const result = store.movies.filter(m => regex.test(m.title))

  counterFindMovies.value = result.length

  store.filteredMovies = result.length ? result : []
  store.currentMovies = store.filteredMovies
  hintMessage.value = `${result.length} result was found!` 
  
  if (result.length) launchConfetti()
}

// --------------------
// SEARCH BY YEAR
// --------------------
const goBtnYear = (year) => {
  if (!year) return
  const result = store.movies.filter(m =>
    String(m.year) === String(year)
  )

  counterFindMovies.value = result.length

  store.filteredMovies = result.length ? result : []
  store.currentMovies = store.filteredMovies
  hintMessage.value = `${result.length} result was found!` 
  if (result.length) launchConfetti()
}

// --------------------
// SEARCH BY GENRE
// --------------------
const findByGenre = (genre) => {
  if (!genre) return
  const result = store.movies.filter(m => {
    if (Array.isArray(m.genre)) {
      return m.genre.includes(genre)
    }
    return String(m.genre).includes(genre)
  })

  counterFindMovies.value = result.length

   store.filteredMovies = result.length ? result : []
  store.currentMovies = store.filteredMovies
    hintMessage.value = `${result.length} result was found!` 
  if (result.length) launchConfetti()
}

// --------------------
// VALIDATION
// --------------------
const rulesName = [
  v => !!v || "Required",
  v => v?.length >= 4 || "Min 4 chars"
]

const rulesYear = [
  v => !!v || "Required",
  v => /^\d{4}$/.test(v) || "Invalid year"
]

const isBtnNameDisabled = computed(() =>
  !rulesName.every(r => r(searchQueryByName.value) === true)
)

const isBtnYearDisabled = computed(() =>
  !rulesYear.every(r => r(searchQueryByYear.value) === true)
)

// --------------------
// CONFETTI
// --------------------
const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  })
}



</script>



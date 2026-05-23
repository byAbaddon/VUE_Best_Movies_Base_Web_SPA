import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadAllMoviesFromBase } from '@/service/loadAllMovies'

import addData from '@/service/addMovie'
import deleteData from '@/service/deleteMovie'
import editData from '@/service/editMovie'
import getDataById from '@/service/getMovie'
import singUser from '@/service/login'

export const useMoviesStore = defineStore('movies', () => {
  const isAdminLogin = ref(false)
  const movies = ref([])
  const filteredMovies = ref([])
  const currentMovies = ref([])
  const btnName = ref('Movies')

  let unsubscribe = null

  // -------------------------
  // REALTIME LISTENER
  // -------------------------
const loadMoviesFromStore = (options = {}) => {
  unsubscribe = loadAllMoviesFromBase(options, (loadedMovies) => {
    movies.value = loadedMovies
    currentMovies.value = loadedMovies
  })
}

  // -------------------------
  // STOP LISTENER
  // -------------------------
const stopMoviesListener = () => {
  if (!unsubscribe) return

  unsubscribe()
  unsubscribe = null
}

  // -------------------------
  // ADD
  // -------------------------
  const addMovie = async (movie) => {
    return await addData(movie)
  }

  // -------------------------
  // DELETE
  // -------------------------
  const deleteMovie = async (movieId) => {
    return await deleteData(movieId)
  }

  // -------------------------
  // EDIT
  // -------------------------
  const editMovie = async (movieId, updatedData) => {
    return await editData(movieId, updatedData)
  }

  // -------------------------
  // GET BY ID
  // -------------------------
  const getMovieById = async (movieId) => {
    return await getDataById(movieId)
  }

  // -------------------------
  // LOGIN
  // -------------------------
  const loginUser = async (email, pass) => {
    const user = await singUser(email, pass)
    isAdminLogin.value = user === 'success'
  }

  // -------------------------
  // DISPLAY LOGIC
  // -------------------------
  const displayedMovies = computed(() =>
    filteredMovies.value.length ? filteredMovies.value : movies.value
  )

  return {
    displayedMovies,
    isAdminLogin,
    movies,
    filteredMovies,
    currentMovies,
    btnName,
    
    loadMoviesFromStore,
    stopMoviesListener,

    addMovie,
    deleteMovie,
    editMovie,
    getMovieById,
    loginUser,
  }
})

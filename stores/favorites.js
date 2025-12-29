export const useFavorites = defineStore('favorites', () => {
  const { $api } = useNuxtApp()

  const favoriteUsers = ref([])
  const favoritePosts = ref([])

  const favoriteUserIds = computed(() => favoriteUsers.value.map(u => u.id))

  async function fetchFavorites () {
    const response = await $api.get('/favorites')
    favoriteUsers.value = response.data.users || []
    favoritePosts.value = response.data.posts || []
  }

  function isUserFollowed (userId) {
    return favoriteUserIds.value.includes(userId)
  }

  async function followUser (user) {
    await $api.post(`/users/${user.id}/favorite`)
    favoriteUsers.value.push(user)
  }

  async function unfollowUser (userId) {
    await $api.delete(`/users/${userId}/favorite`)
    favoriteUsers.value = favoriteUsers.value.filter(u => u.id !== userId)
  }

  return {
    favoriteUsers,
    favoritePosts,
    favoriteUserIds,
    fetchFavorites,
    isUserFollowed,
    followUser,
    unfollowUser
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot))
}

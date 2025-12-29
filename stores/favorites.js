export const useFavorites = defineStore('favorites', () => {
  const { $api } = useNuxtApp()

  const favoriteUsers = ref([])
  const favoritePosts = ref([])

  const favoriteUserIds = computed(() => favoriteUsers.value.map(u => u.id))
  const favoritePostIds = computed(() => favoritePosts.value.map(p => p.id))

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

  function isPostFavorited (postId) {
    return favoritePostIds.value.includes(postId)
  }

  async function favoritePost (post) {
    await $api.post(`/posts/${post.id}/favorite`)
    favoritePosts.value.push(post)
  }

  async function unfavoritePost (postId) {
    await $api.delete(`/posts/${postId}/favorite`)
    favoritePosts.value = favoritePosts.value.filter(p => p.id !== postId)
  }

  return {
    favoriteUsers,
    favoritePosts,
    favoriteUserIds,
    favoritePostIds,
    fetchFavorites,
    isUserFollowed,
    followUser,
    unfollowUser,
    isPostFavorited,
    favoritePost,
    unfavoritePost
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot))
}

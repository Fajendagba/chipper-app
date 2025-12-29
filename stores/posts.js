export const usePosts = defineStore('posts', () => {
  const { $api } = useNuxtApp()

  const posts = ref([])
  const pendingPosts = ref([])

  const hasNewPosts = computed(() => pendingPosts.value.length > 0)

  async function fetchPosts () {
    const response = await $api.get('/posts')
    posts.value = response.data
  }

  async function createPost (title, body) {
    const response = await $api.post('/posts', { title, body })
    posts.value.unshift(response.data)
    return response.data
  }

  async function checkForNewPosts () {
    const response = await $api.get('/posts')
    const fetchedPosts = response.data

    if (posts.value.length === 0) return

    const currentNewestId = posts.value[0]?.id || 0
    const newPosts = fetchedPosts.filter(p => p.id > currentNewestId)

    if (newPosts.length > 0) {
      pendingPosts.value = newPosts
    }
  }

  function loadNewPosts () {
    posts.value = [...pendingPosts.value, ...posts.value]
    pendingPosts.value = []
  }

  return {
    posts,
    pendingPosts,
    hasNewPosts,
    fetchPosts,
    createPost,
    checkForNewPosts,
    loadNewPosts
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePosts, import.meta.hot))
}

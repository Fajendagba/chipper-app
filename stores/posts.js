export const usePosts = defineStore('posts', () => {
  const { $api } = useNuxtApp()

  const posts = ref([])

  async function fetchPosts () {
    const response = await $api.get('/posts')
    posts.value = response.data
  }

  async function createPost (title, body) {
    const response = await $api.post('/posts', { title, body })
    posts.value.unshift(response.data)
    return response.data
  }

  return {
    posts,
    fetchPosts,
    createPost
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePosts, import.meta.hot))
}

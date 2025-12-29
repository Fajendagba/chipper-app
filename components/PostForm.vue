<script setup>
const { showErrorModal } = useHelpers()
const postsStore = usePosts()

const title = ref('')
const body = ref('')
const loading = ref(false)

async function submit () {
  loading.value = true

  try {
    await postsStore.createPost(title.value, body.value)
    title.value = ''
    body.value = ''
  } catch (e) {
    showErrorModal(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form
    class="grid gap-4 mb-16"
    @submit.prevent="submit">
    <input
      v-model="title"
      placeholder="Post title"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">
    <textarea
      v-model="body"
      placeholder="What is happening?!"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"></textarea>
    <button
      :disabled="loading"
      class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      Post
    </button>
  </form>
</template>

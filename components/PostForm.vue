<script setup>
const { showErrorModal } = useHelpers()
const postsStore = usePosts()

const title = ref('')
const body = ref('')
const imageFile = ref(null)
const fileInputRef = ref(null)
const loading = ref(false)

async function submit () {
  loading.value = true

  try {
    let data
    if (imageFile.value) {
      data = new FormData()
      data.append('title', title.value)
      data.append('body', body.value)
      data.append('image', imageFile.value)
    } else {
      data = { title: title.value, body: body.value }
    }

    await postsStore.createPost(data)
    title.value = ''
    body.value = ''
    imageFile.value = null
    if (fileInputRef.value) fileInputRef.value.value = ''
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
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700"
      @change="e => imageFile = e.target.files[0]">
    <button
      :disabled="loading"
      class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      Post
    </button>
  </form>
</template>

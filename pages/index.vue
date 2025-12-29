<script setup>
import { onMounted, onUnmounted } from 'vue'

definePageMeta({
  middleware: ['validate-session']
})

const user = useUser()
const postsStore = usePosts()
const favoritesStore = useFavorites()

await postsStore.fetchPosts()

if (!user.isGuest) {
  await favoritesStore.fetchFavorites()
}

let pollInterval = null

onMounted(() => {
  pollInterval = setInterval(() => {
    postsStore.checkForNewPosts()
  }, 30000)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})
</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <button
    v-if="postsStore.hasNewPosts"
    class="w-full bg-green-500 text-white font-bold py-4 rounded-lg mb-8"
    @click="postsStore.loadNewPosts()">
    Load New Posts
  </button>
  <div class="grid gap-16">
    <PostItem
      v-for="post in postsStore.posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>

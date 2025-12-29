<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const user = useUser()
const favoritesStore = useFavorites()
const { showErrorModal } = useHelpers()

const isFollowed = computed(() => favoritesStore.isUserFollowed(props.post.user.id))
const isFavorited = computed(() => favoritesStore.isPostFavorited(props.post.id))
const loadingFollow = ref(false)
const loadingFavorite = ref(false)

async function toggleFollow () {
  loadingFollow.value = true

  try {
    if (isFollowed.value) {
      await favoritesStore.unfollowUser(props.post.user.id)
    } else {
      await favoritesStore.followUser(props.post.user)
    }
  } catch (e) {
    showErrorModal(e)
  } finally {
    loadingFollow.value = false
  }
}

async function toggleFavorite () {
  loadingFavorite.value = true

  try {
    if (isFavorited.value) {
      await favoritesStore.unfavoritePost(props.post.id)
    } else {
      await favoritesStore.favoritePost(props.post)
    }
  } catch (e) {
    showErrorModal(e)
  } finally {
    loadingFavorite.value = false
  }
}
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>
      <button
        v-if="!user.isGuest"
        :disabled="loadingFollow"
        :class="isFollowed ? 'bg-blue-500 text-white' : 'bg-blue-200'"
        class="font-medium text-sm px-2 rounded-full"
        @click="toggleFollow">
        {{ isFollowed ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <img
      v-if="post.image_url"
      :src="post.image_url"
      :alt="post.title"
      class="rounded-lg max-w-full">
    <button
      v-if="!user.isGuest"
      :disabled="loadingFavorite"
      :class="isFavorited ? 'bg-red-500 text-white' : 'bg-red-200 text-red-500'"
      class="flex items-center justify-center gap-2 p-4 rounded-lg"
      @click="toggleFavorite">
      <HeartIcon
        class="h-6 stroke-current" />
      <span class="font-bold">
        {{ isFavorited ? 'Remove from favorites' : 'Add to my favorites' }}
      </span>
    </button>
  </div>
</template>
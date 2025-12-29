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
const loading = ref(false)

async function toggleFollow () {
  loading.value = true

  try {
    if (isFollowed.value) {
      await favoritesStore.unfollowUser(props.post.user.id)
    } else {
      await favoritesStore.followUser(props.post.user)
    }
  } catch (e) {
    showErrorModal(e)
  } finally {
    loading.value = false
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
        :disabled="loading"
        :class="isFollowed ? 'bg-blue-500 text-white' : 'bg-blue-200'"
        class="font-medium text-sm px-2 rounded-full"
        @click="toggleFollow">
        {{ isFollowed ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg">
      <HeartIcon
        class="h-6 stroke-current" />
      <span class="font-bold">
        Add to my favorites
      </span>
    </button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  displayMode: {
    type: Number,
    default: 1
  }
})

const menuItems = ref([])

// Mapping of titles to image URLs
const titleToImageMap = {
  facebook: '/src/assets/images/icons/facebook.svg',
  instagram: '/src/assets/images/icons/instagram.svg'
}

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const items = data.data.attributes.items.data

    const sortedItems = items.sort((a, b) => a.attributes.order - b.attributes.order)

    menuItems.value = sortedItems
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(`${import.meta.env.VITE_BASE_URL}/api/menus/2?populate=*`)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <article class="social-menu">
    <p v-if="displayMode !== 1" class="social-menu__text">Finden Sie auch</p>
    <ul class="social-menu__list">
      <li
        v-for="(item, index) in menuItems"
        :key="item.id"
        :class="{ hidden: displayMode !== 1 && index === 0 }"
        class="social-menu__list--item"
      >
        <a
          :href="item.attributes.url"
          :target="item.attributes.target"
          class="social-menu__list--link"
        >
          <img
            v-if="titleToImageMap.hasOwnProperty(item.attributes.title.toLowerCase())"
            :src="titleToImageMap[item.attributes.title.toLowerCase()]"
            :alt="`${item.attributes.title} link`"
          />
        </a>
      </li>
    </ul>
  </article>
</template>

<style lang="scss">
$border-style: 1px solid $color-secondary;

.social-menu {
  align-items: center;
  border: $border-style;
  display: flex;
  font-family: $knucklehead;
  font-size: 1.5rem;

  &__text {
    text-align: center;
    width: 100%;
  }

  &__list {
    display: flex;
    list-style: none;

    &--item.hidden {
      display: none;
    }

    &--link {
      align-items: center;
      border-left: $border-style;
      display: flex;
      height: 60px;
      justify-content: center;
      width: 60px;
    }
  }
}
</style>

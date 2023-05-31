<script setup>
import { onMounted, ref } from 'vue'

const categories = ref({})
const baseUrl = import.meta.env.VITE_BASE_URL

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const items = data.data.map((category) => {
      const picture = `${baseUrl}${category.attributes.icon.data.attributes.url}`
      return {
        ...category,
        picture
      }
    })

    const sortedCategories = items.sort((a, b) => a.id - b.id)
    categories.value = sortedCategories
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(`${baseUrl}/api/categories?populate=*`)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})

const titleToUrl = (title) => title.toLowerCase().replace(' ', '-')
</script>

<template>
  <ul class="categories-list">
    <li v-for="category in categories" :key="category.id">
      <router-link
        :to="{
          name: 'kategorie',
          params: { name: titleToUrl(category.attributes.title) }
        }"
        :aria-label="category.attributes.title"
        class="categories-list__link"
      >
        <img
          :src="category.picture"
          :alt="`${category.attributes.title} icon`"
          class="categories-list__icon"
        />
        {{ category.attributes.title }}
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss">
.categories-list {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 40px 10px;
  justify-content: space-around;
  list-style: none;

  &__link {
    color: $color-text;
    display: grid;
    font: 2.25rem/1em $knucklehead;
    gap: 16px;
    justify-items: center;
    text-align: center;
    width: 155px;

    &:not(:hover) {
      text-decoration: none;
    }
  }

  &__icon {
    height: 72px;
    width: 72px;
  }
}
</style>

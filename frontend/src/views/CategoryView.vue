<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const category = ref({})
const baseUrl = import.meta.env.VITE_BASE_URL

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  const handleCategoryData = (data) => {
    category.value = data.data.attributes
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const categoryId = data.data.find(
      (category) => category.attributes.title.toLowerCase() === route.params.name
    ).id

    fetch(`${baseUrl}/api/categories/${categoryId}?populate=*`)
      .then(handleResponse)
      .then(handleCategoryData)
      .catch(handleError)
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(`${baseUrl}/api/categories`).then(handleResponse).then(handleData).catch(handleError)
})
</script>

<template>
  <section class="heading">
    <h1 class="heading__title">{{ category.title }}</h1>
  </section>
</template>

<style lang="scss">
.heading {
  background: linear-gradient(to bottom, $color-primary 60%, transparent 60%);
  padding: 80px 20px 100px;
  position: relative;

  &::before {
    background-color: $color-secondary;
    content: '';
    display: block;
    height: 80%;
    left: 0;
    position: absolute;
    top: 0;
    width: 80%;
    z-index: 0;
  }

  &__title {
    font-size: 5rem;
    line-height: 1em;
    position: relative;
    z-index: 1;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const category = ref({})
const products = ref({})
const baseUrl = import.meta.env.VITE_BASE_URL

// Generate the srcset attribute value for the responsive image
const generateSrcset = (attributes) => {
  const { formats } = attributes
  return `
    ${baseUrl}${formats.small.url} ${formats.small.width}w,
    ${baseUrl}${formats.medium.url} ${formats.medium.width}w
  `
}

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  const handleCategoryData = (data) => {
    const attributes = data.data.attributes
    category.value = attributes
    products.value = attributes.products.data.sort((a, b) => a.id - b.id)
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const categoryId = data.data.find(
      (category) => category.attributes.title.toLowerCase().replace(' ', '-') === route.params.name
    ).id

    fetch(`${baseUrl}/api/categories/${categoryId}?populate[products][populate]=*`)
      .then(handleResponse)
      .then(handleCategoryData)
      .catch(handleError)
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(`${baseUrl}/api/categories`).then(handleResponse).then(handleData).catch(handleError)
})

const nameToUrl = (name) => `/product/${name.toLowerCase().replace(' ', '-')}`
</script>

<template>
  <section class="heading">
    <div class="container">
      <h1 class="heading__title">{{ category.title }}</h1>
    </div>
  </section>
  <ul class="product-list">
    <div class="container">
      <li class="product-list__item" v-for="product in products" :key="product.id">
        <a :href="nameToUrl(product.attributes.name)" class="product-item">
          <article class="product-item__item">
            <h2 class="product-item__name">{{ product.attributes.name }}</h2>
            <img
              class="product-item__picture"
              :srcset="generateSrcset(product.attributes.photo.data.attributes)"
              :src="`${baseUrl}${product.attributes.photo.data.attributes.url}`"
            />
          </article>
        </a>
      </li>
    </div>
  </ul>
</template>

<style lang="scss">
.heading {
  background: linear-gradient(to bottom, $color-primary 70%, transparent 70%);
  padding: 80px 0 100px;
  position: relative;

  @media (min-width: $lg) {
    padding: 120px 0 120px;
  }

  @media (min-width: $xl) {
    padding: 140px 0;
  }

  &::before {
    background-color: $color-secondary;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 80%;
    z-index: 0;
  }

  &__title {
    position: relative;
    z-index: 1;
  }
}

.product-list {
  list-style: none;
  overflow: hidden;
  padding: 0;

  .container {
    background-color: $color-secondary;
    margin-bottom: 60px;
    padding: 1px;

    @media (min-width: $md) {
      display: grid;
      gap: 1px;
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $lg) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $xl) {
      position: relative;

      &::before,
      &::after {
        background-color: $color-secondary;
        content: '';
        display: block;
        height: 1px;
        position: absolute;
        width: 100vw;
      }

      &::before {
        right: -50%;
        top: 0;
      }
      &::after {
        bottom: 0;
        left: -50%;
      }
    }
  }
}

.product-item {
  background-color: $color-background;
  color: $color-text;
  display: block;

  &:not(:hover) {
    text-decoration: none;
  }

  &__item {
    display: grid;
    padding: 60px 20px 0;
  }

  &__name {
    align-items: center;
    border-top: 1px solid $color-secondary;
    display: flex;
    font-size: 30px;
    justify-content: space-between;
    padding: 20px 0 40px;

    &::after {
      background: url('@/assets/images/icons/redirect-arrow.svg') no-repeat center/30%;
      content: '';
      display: inline-block;
      height: 63px;
      margin-right: -20px;
      width: 63px;
    }
  }

  &__picture {
    aspect-ratio: 1/1;
    height: 100%;
    object-fit: contain;
    order: -1;
    padding-bottom: 40px;
    width: 100%;
  }
}
</style>

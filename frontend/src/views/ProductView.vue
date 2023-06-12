<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ContactForm from '@/components/ContactForm.vue'

const route = useRoute()
const product = ref({})
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

  const handleProductData = (data) => {
    product.value = data.data.attributes
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const productId = data.data.find(
      (product) => product.attributes.name.toLowerCase().replace(' ', '-') === route.params.name
    ).id

    fetch(`${baseUrl}/api/products/${productId}?populate=*`)
      .then(handleResponse)
      .then(handleProductData)
      .catch(handleError)
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(`${baseUrl}/api/products?&pagination[limit]=100`)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <section class="heading product-heading">
    <div class="container">
      <h1 class="product-heading__title">
        <span class="product-heading__title--category">
          {{ product.category?.data.attributes.title }}
        </span>
        <br />
        {{ product.name }}
      </h1>
      <img
        v-if="product.photo"
        :alt="product.photo.data.attributes.alternativeText"
        :src="`${baseUrl}${product.photo.data.attributes.url}`"
        :srcset="generateSrcset(product.photo.data.attributes)"
        class="product-heading__photo"
      />
    </div>
  </section>
  <section class="details">
    <div class="container">
      <h2 class="details__title">Technische Daten</h2>
      <div class="details__table" v-html="product.table"></div>
    </div>
  </section>
  <contact-form />
</template>

<style lang="scss">
.product-heading {
  background: linear-gradient(to bottom, $color-primary 50%, transparent 50%);
  overflow: hidden;
  padding-bottom: 0;
  padding: 70px 0 60px;

  @media (min-width: $lg) {
    background: linear-gradient(to bottom, $color-primary 80%, transparent 80%);
    padding: 120px 0;
  }

  @media (min-width: $xl) {
    padding: 180px 0;
  }

  &::before {
    height: 60%;

    @media (min-width: $lg) {
      height: 90%;
    }
  }

  &::after {
    background-color: $color-secondary;
    bottom: 0;
    content: '';
    display: block;
    height: 2px;
    position: absolute;
    width: 100vw;
  }

  .container {
    display: grid;

    @media (min-width: $lg) {
      grid-template-columns: 1fr 2fr;
    }
  }

  &__title,
  &__photo {
    z-index: 1;
  }

  &__title {
    grid-row: 2;
    margin-top: 60px;

    &--category {
      color: $color-primary;
    }

    @media (min-width: $lg) {
      grid-row: 1;
      margin: 0;

      &--category {
        color: $color-background;
      }
    }
  }

  &__photo {
    align-self: center;
    width: 100%;
  }
}

.details {
  margin: 60px 0;

  @media (min-width: $lg) {
    margin: 120px 0;
  }

  &__title {
    font-size: 3.75rem;
    margin-bottom: 60px;
    padding-left: 20px;
    position: relative;

    &::before {
      background-color: $color-primary;
      content: '';
      height: 95%;
      left: -20px;
      position: absolute;
      width: 10px;
    }

    @media (min-width: $lg) {
      font-size: 5rem;
      margin-bottom: 120px;
    }

    @media (min-width: $xl) {
      font-size: 6rem;
    }
    @media (min-width: $xxl) {
      padding-left: 40px;

      &::before {
        left: -4px;
        z-index: 1;
      }
    }
  }

  &__table {
    .table {
      margin: 0 -20px;
      width: calc(100% + 40px) !important;

      @media (min-width: $xl) {
        margin: 0;
        width: 100% !important;
      }

      table {
        border-collapse: collapse;
        font-family: $knucklehead;
        font-size: 1.5rem;
        width: 100%;

        @media (min-width: $lg) {
          font-size: 3rem;
        }

        td {
          border: 1px solid;
          padding: 20px;
          text-align: center;

          &:not(:first-of-type) {
            border-color: $color-text;
            color: rgba($color: $color-tertiary, $alpha: 0.8);
          }
        }
      }
    }
  }
}
</style>

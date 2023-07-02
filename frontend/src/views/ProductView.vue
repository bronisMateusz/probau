<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ContactForm from '@/components/ContactForm.vue'

const route = useRoute()
const product = ref({})
const baseUrl = import.meta.env.VITE_BASE_URL
const lightboxVisible = ref(false)
const lightboxSrc = ref('')
const lightboxAlt = ref('')
const galleryImages = ref([])
const currentImageIndex = ref(0)

// Generate the srcset attribute value for the responsive image
const generateSrcset = (attributes) => {
  const { formats } = attributes
  return `
    ${baseUrl}${formats.small.url} ${formats.small.width}w,
    ${baseUrl}${formats.medium.url} ${formats.medium.width}w
  `
}

const openLightbox = (src, alt) => {
  lightboxSrc.value = baseUrl + src
  lightboxAlt.value = alt
  lightboxVisible.value = true

  // Find the index of the clicked image
  const index = galleryImages.value.findIndex((image) => image.attributes.url === src)
  if (index !== -1) currentImageIndex.value = index
}

const closeLightbox = () => (lightboxVisible.value = false)

const handleKeyPress = (event) => {
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowLeft') changeImage(-1)
  else if (event.key === 'ArrowRight') changeImage(1)
}

const changeImage = (increment) => {
  currentImageIndex.value =
    (currentImageIndex.value + increment + galleryImages.value.length) % galleryImages.value.length
  const newImage = galleryImages.value[currentImageIndex.value]
  lightboxSrc.value = baseUrl + newImage.attributes.url
  lightboxAlt.value = newImage.attributes.alternativeText
}

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  const handleProductData = (data) => {
    product.value = data.data.attributes
    if (data.data.attributes.gallery) {
      galleryImages.value = data.data.attributes.gallery.pictures.data
    }
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const productId = data.data.find(
      (product) => product.attributes.name.toLowerCase().replace(' ', '-') === route.params.name
    ).id

    const fieldsToPopulate = ['photo', 'gallery', 'category']
    const populateParam = fieldsToPopulate
      .map((field) => `populate[${field}][populate]=*`)
      .join('&')
    const url = `${baseUrl}/api/products/${productId}?${populateParam}`

    fetch(url).then(handleResponse).then(handleProductData).catch(handleError)
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(`${baseUrl}/api/products?&pagination[limit]=100`)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})

watch(lightboxVisible, (value) => {
  if (!value) {
    // Remove event listener when the lightbox is closed
    document.removeEventListener('keydown', handleKeyPress)
  } else {
    document.addEventListener('keydown', handleKeyPress)
  }
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
  <div v-if="product.gallery" class="gallery">
    <div class="container">
      <h2 class="gallery__title">Produktgalerie</h2>
      <ul class="gallery__list">
        <li v-for="image in product.gallery.pictures.data" :key="image.id" class="gallery__item">
          <img
            :srcset="generateSrcset(image.attributes)"
            :alt="image.attributes.alternativeText"
            @click="openLightbox(image.attributes.url, image.attributes.alternativeText)"
            class="gallery__image"
          />
        </li>
      </ul>
    </div>
  </div>

  <div
    class="lightbox"
    :class="{ hidden: !lightboxVisible, opened: lightboxVisible }"
    @click.self="closeLightbox"
  >
    <button class="lightbox__close btn" @click="closeLightbox">&times;</button>
    <img class="lightbox__image" :src="lightboxSrc" :alt="lightboxAlt" />
    <div class="lightbox__navigation">
      <button class="lightbox__prev btn" @click="changeImage(-1)">&lt;</button>
      <button class="lightbox__next btn" @click="changeImage(1)">&gt;</button>
    </div>
  </div>

  <ContactForm />
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
    max-height: 70vh;
    object-fit: contain;
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

.gallery {
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

  &__list {
    display: grid;
    gap: 20px;
    list-style: none;

    @media (min-width: $md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $lg) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $xl) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    aspect-ratio: 4/3;
    overflow: hidden;
  }

  &__image {
    cursor: pointer;
    height: 100%;
    object-fit: cover;
    transition: scale 0.3s ease;
    width: 100%;

    &:hover {
      filter: grayscale(1);
      scale: 1.2;
    }
  }
}

.lightbox {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 9999;

  &.hidden {
    display: none;
  }

  &.opened {
    opacity: 1;
  }

  &__image {
    max-height: 90%;
    max-width: calc(100% - 120px);
    object-fit: contain;
  }

  &__close {
    right: 16px;
    top: 10px;
  }

  &__prev,
  &__next {
    top: 50%;
    transform: translateY(-50%);
  }

  &__prev {
    left: 16px;
  }

  &__next {
    right: 16px;
  }

  .btn {
    color: $color-background;
    cursor: pointer;
    font-size: 50px;
    position: absolute;
    transition: color 0.3s ease;

    &:hover {
      color: $color-secondary;
    }
  }
}
</style>

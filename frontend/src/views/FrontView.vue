<script setup>
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import ImageSlider from '@/components/ImageSlider.vue'
import ContactForm from '@/components/ContactForm.vue'

const attributes = ref({})

const md = new MarkdownIt({
  html: false,
  breaks: true
})

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) => {
    attributes.value = {
      ...data.data.attributes,
      about_us_body: md.render(data.data.attributes.about_us_body)
    }
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch(
    'http://localhost:1337/api/front-page?populate[slider][populate]=*&populate[offer_slider][populate]=*'
  )
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <image-slider :attributes="attributes.slider" />
  <section class="about-us">
    <div class="container col-50-50">
      <h2 class="about-us__title" v-html="attributes.about_us_title"></h2>
      <div class="about-us__body" v-html="attributes.about_us_body"></div>
    </div>
  </section>
  <section class="offer">
    <div class="container">
      <h2 class="offer__title">Angebot</h2>
      <div class="offer__categories"></div>
      <div class="offer__slider"></div>
      <a class="offer__link" target="_blank">Mehr sehen</a>
    </div>
  </section>
  <section class="map"></section>
  <contact-form />
</template>

<style lang="scss">
.about-us {
  $border-style: 2px solid $color-secondary;
  border-bottom: $border-style;
  border-top: $border-style;
  padding: 60px 0;

  @media (min-width: $lg) {
    padding: 120px 0;
  }

  .container {
    @media (min-width: $xxl) {
      gap: 100px;
      grid-template-columns: 3fr 2fr;
    }
  }

  &__title {
    u {
      background: linear-gradient(
        to bottom,
        transparent 75%,
        $color-primary 75%,
        $color-primary 85%,
        transparent 85%
      );
      text-decoration: none;
    }

    @media (min-width: $lg) {
      font-size: 5.5rem;
    }

    @media (min-width: $xxl) {
      padding-left: 80px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  }
}
</style>

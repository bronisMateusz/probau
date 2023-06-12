<script setup>
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'

import ImageSlider from '@/components/ImageSlider.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import ContactForm from '@/components/ContactForm.vue'
import ContactInformation from '@/components/ContactInformation.vue'
import SocialMenu from '@/components/SocialMenu.vue'

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
    `${
      import.meta.env.VITE_BASE_URL
    }/api/front-page?populate[slider][populate]=*&populate[offer_slider][populate]=*`
  )
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <image-slider :attributes="attributes.slider" />
  <section id="about-us" class="about-us">
    <div class="container col-50-50">
      <h2 class="about-us__title" v-html="attributes.about_us_title"></h2>
      <div class="about-us__body" v-html="attributes.about_us_body"></div>
    </div>
  </section>
  <section id="offer" class="offer">
    <div class="container">
      <h2 class="offer__title">Angebot</h2>
      <categories-list class="offer__categories" />
      <image-slider :attributes="attributes.offer_slider" :display-mode="2" class="offer__slider" />
    </div>
  </section>
  <section id="contact" class="map">
    <div class="container">
      <h2 class="map__title">Standort</h2>
      <div class="map__contact">
        <contact-information :displayHeading="true" />
        <social-menu :display-mode="2" />
      </div>
      <img src="@/assets/images/map.svg" alt="Hohenthann map" class="map__image" />
    </div>
  </section>
  <contact-form />
</template>

<style lang="scss">
$border-style: 2px solid $color-secondary;

.about-us {
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

.offer {
  background: linear-gradient(to bottom, $color-primary 75%, $color-background 75%);
  border-bottom: $border-style;
  border-top: $border-style;
  padding: 60px 0;

  @media (min-width: $lg) {
    background: linear-gradient(
      to left,
      $color-primary 50%,
      $color-secondary 50%,
      $color-background 90%
    );
    padding: 80px 0 0;
  }

  .container {
    @media (min-width: $lg) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__title {
    margin-left: -20px;
    margin-right: -20px;
    padding-bottom: 60px;
    padding-left: 40px;
    position: relative;

    &::before {
      background-color: $color-text;
      content: '';
      height: 1em;
      left: 0;
      position: absolute;
      width: 10px;
      z-index: 2;
    }

    &::after {
      background-color: $color-tertiary;
      content: '';
      height: 2px;
      inset: auto 0 0 0;
      position: absolute;
    }

    @media (min-width: $lg) {
      grid-column: 2;
      margin-left: 0;
      padding-left: 50px;

      &::before {
        left: -5px;
      }

      &::after {
        width: 50vw;
      }
    }

    @media (min-width: $xl) {
      padding-left: 90px;
    }
  }

  &__categories {
    margin: 60px 0;

    @media (min-width: $lg) {
      grid-column: 2;
      margin-bottom: 120px;
    }

    @media (min-width: $xl) {
      margin-left: auto;
      max-width: 590px;
    }
  }

  &__slider {
    margin: 40px -20px 0 0;

    @media (min-width: $lg) {
      grid-row: 1/4;
      margin: 0 0 0 -20px;
    }
  }
}

.map {
  overflow: hidden;
  padding: 60px 0;
  position: relative;

  @media (min-width: $lg) {
    background: linear-gradient(
      to right,
      $color-background 50%,
      $color-secondary 50%,
      $color-secondary 60%,
      $color-background 90%
    );
    padding: 100px 0;
  }

  @media (min-width: $xxl) {
    padding-top: 200px;
  }

  &__title {
    margin-left: -20px;
    margin-right: -20px;
    padding-bottom: 60px;
    padding-left: 40px;
    position: relative;

    &::before {
      background-color: $color-primary;
      content: '';
      height: 1em;
      left: 0;
      position: absolute;
      width: 10px;
    }

    &::after {
      background-color: $color-secondary;
      content: '';
      height: 2px;
      inset: auto 0 0 0;
      position: absolute;
    }

    @media (min-width: $lg) {
      margin-right: 0;
    }

    @media (min-width: $xl) {
      &::after {
        left: 50%;
        transform: translateX(-50%);
        width: 200vw;
      }
    }

    @media (min-width: $xxl) {
      margin-left: -4px;
      z-index: 1;
    }
  }

  &__contact {
    background-color: rgba($color: $color-background, $alpha: 0.9);
    border: 1px solid $color-tertiary;
    display: grid;
    margin: -1px auto auto;
    max-width: 550px;
    position: relative;
    z-index: 1;

    .contact-information {
      height: calc(100% - 89px);
      padding: 60px 20px;
    }

    .social-menu {
      border-color: $color-tertiary;
      margin: auto -1px -1px;

      &__list--link {
        border-color: $color-tertiary;

        img {
          filter: brightness(0.1);
        }

        &:hover img {
          filter: brightness(0) invert(73%) sepia(79%) saturate(1536%) hue-rotate(358deg)
            brightness(94%) contrast(107%);
        }
      }
    }

    @media (min-width: $lg) {
      grid-column: 1;
      height: 500px;
      margin-left: 20px;
      width: 100%;
      z-index: 2;

      .contact-information {
        padding: 80px 40px;
      }

      .social-menu {
        $size: 90px;
        font-size: 2.25rem;
        height: $size;
        line-height: 1em;

        &__list--link {
          height: $size;
          width: $size;
        }
      }
    }

    @media (min-width: $xl) {
      .contact-information {
        padding: 80px;
      }
    }

    @media (min-width: $xxl) {
      margin: 0;
    }
  }

  &__image {
    height: 150%;
    margin-left: -25%;
    margin-top: -25%;
    object-fit: cover;
    width: 150%;

    @media (min-width: $lg) {
      align-self: start;
      grid-column: 2;
      grid-row: 1/3;
      margin: -35% 0 50% -50%;
      object-fit: unset;
      z-index: 1;
    }

    @media (min-width: $xxl) {
      height: 175%;
      margin-top: -57.5%;
      width: 175%;
    }
  }

  @media (min-width: $lg) {
    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto 1fr;
    }
  }
}
</style>

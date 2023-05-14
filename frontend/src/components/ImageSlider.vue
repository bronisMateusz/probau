<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  attributes: {
    type: Object,
    required: true
  }
})

const title = ref('')
const pictures = ref([])

const baseUrl = 'http://localhost:1337'

// Generate the srcset attribute value for the responsive image
const generateSrcset = (formats) => {
  return `
  ${baseUrl}${formats.small.url} ${formats.small.width}w,
  ${baseUrl}${formats.medium.url} ${formats.medium.width}w
  `
}

// Generate the sizes attribute for responsive images
const generateSizes = () => '(max-width: 640px) 500px, 750px'

const md = new MarkdownIt({
  html: false,
  breaks: true
})

watch(
  () => props.attributes,
  () => {
    title.value = md.render(props.attributes.text).replace(/<p>/g, '').replace(/<\/p>/g, '')
    pictures.value = props.attributes.pictures.data.map((picture) => ({
      src: picture.attributes.formats.medium.url,
      alt: picture.attributes.alternativeText,
      srcset: generateSrcset(picture.attributes.formats),
      sizes: generateSizes()
    }))
  }
)

let intervalId
const currentSlideIndex = ref(0)

const startSlider = () => {
  intervalId = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % pictures.value.length
  }, 5000)
}

const stopSlider = () => clearInterval(intervalId)

onMounted(() => startSlider())

onUnmounted(() => stopSlider())
</script>

<template>
  <div class="slider">
    <div class="container">
      <h2 class="slider__title" v-html="title"></h2>
      <div class="slider__slides">
        <img
          v-for="(picture, index) in pictures"
          class="slider__image"
          :key="index"
          :src="picture.src"
          :alt="picture.alt"
          :srcset="picture.srcset"
          :sizes="picture.sizes"
          :style="{
            opacity: index === currentSlideIndex ? 1 : 0,
            transform: index === currentSlideIndex ? 'translateX(0)' : 'translateX(100%)'
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.slider {
  background: linear-gradient(to right, $color-secondary 80%, $color-primary 20%);
  height: 70vh;
  overflow: hidden;
  position: relative;

  &::after {
    background-color: white;
    bottom: 0;
    content: '';
    inset: 80% 0 0;
    position: absolute;
  }

  @media (min-width: $lg) {
    background: linear-gradient(to right, $color-secondary 65%, $color-primary 35%);
  }

  .container {
    height: 100%;

    @media (min-width: $lg) {
      align-items: center;
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }

  &__title,
  &__slides {
    z-index: 1;
  }

  &__title {
    display: none;

    @media (min-width: $lg) {
      display: initial;
      font-size: 12vh;
      line-height: 0.75em;
      padding-left: 100px;

      em {
        color: $color-text-inverted;
        font-style: normal;
      }
    }
  }

  &__slides {
    height: 100%;
    position: relative;
  }

  &__image {
    height: calc(100% - 60px);
    left: 0;
    object-fit: contain;
    position: absolute;
    top: 60px;
    transition: opacity 1s, transform 1s;
  }
}
</style>

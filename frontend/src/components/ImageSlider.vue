<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  attributes: {
    type: Object,
    required: true
  },
  displayMode: {
    type: Number,
    default: 1
  }
})

const title = ref('')
const pictures = ref([])

const baseUrl = import.meta.env.VITE_BASE_URL

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
    if (props.displayMode === 1)
      title.value = md.render(props.attributes.text).replace(/<p>/g, '').replace(/<\/p>/g, '')

    const data = props.displayMode === 1 ? props.attributes.pictures.data : props.attributes.data
    pictures.value = data.map((picture) => ({
      src: `${baseUrl}${picture.attributes.formats.medium.url}`,
      alt: picture.attributes.alternativeText,
      srcset: generateSrcset(picture.attributes.formats),
      sizes: generateSizes()
    }))
  }
)

let intervalId
const activeDotIndex = ref(0)
const currentSlideIndex = ref(0)

const startSlider = () => {
  intervalId = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % pictures.value.length
    activeDotIndex.value = currentSlideIndex.value
  }, 5000)
}

const stopSlider = () => clearInterval(intervalId)

const updateIndex = (index) => {
  currentSlideIndex.value = index
  activeDotIndex.value = index
}

onMounted(() => startSlider())

onUnmounted(() => stopSlider())
</script>

<template>
  <div class="slider" :class="displayMode === 1 ? 'with-background' : 'without-background'">
    <h2 v-if="displayMode === 1" class="slider__title" v-html="title"></h2>
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
    <div v-if="displayMode === 2" class="slider__dots">
      <div
        v-for="(picture, index) in pictures"
        :key="index"
        :class="{ active: index === activeDotIndex }"
        @click="updateIndex(index)"
        class="slider__dot"
      ></div>
    </div>
  </div>
</template>

<style lang="scss">
.slider {
  position: relative;

  &.with-background {
    background: linear-gradient(to right, $color-secondary 80%, $color-primary 80%);
    height: 70vh;

    &::after {
      background-color: $color-background;
      bottom: 0;
      content: '';
      inset: 80% 0 0;
      position: absolute;
    }

    .slider__image {
      height: calc(100% - 60px);
      top: 60px;
    }

    @media (min-width: $lg) {
      align-items: center;
      background: linear-gradient(to right, $color-secondary 65%, $color-primary 65%);
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }

  &.without-background {
    aspect-ratio: 3/2;

    .slider__image {
      height: 100%;
      min-width: 100%;
    }

    .slider__dots {
      display: flex;
      gap: 8px;
      margin-top: 60px;

      @media (min-width: $lg) {
        gap: 16px;
        justify-content: flex-end;
        margin: 60px;
      }
    }

    @media (min-width: $lg) {
      aspect-ratio: unset;

      .slider__slides {
        height: calc(100% - 166px);
      }
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

    @media (min-width: $xxl) {
      padding-left: 160px;
    }
  }

  &__slides {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  &__image {
    left: 0;
    object-fit: contain;
    position: absolute;
    transition: opacity 1s, transform 1s;
  }

  &__dot {
    background-color: $color-tertiary;
    display: block;
    height: 16px;
    transition: background-color 0.3s ease-in-out;
    width: 16px;

    &.active {
      background-color: $color-primary;
    }

    @media (min-width: $lg) {
      height: 24px;
      width: 24px;
    }
  }
}
</style>

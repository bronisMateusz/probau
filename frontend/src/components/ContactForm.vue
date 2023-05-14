<script setup>
import { onMounted, ref } from 'vue'

const attributes = ref({})

const baseUrl = 'http://localhost:1337'
// Generate the srcset attribute value for the responsive image
const generateSrcset = () => {
  const { formats } = attributes.value.picture.data.attributes
  return `
    ${baseUrl}${formats.small.url} ${formats.small.width}w,
    ${baseUrl}${formats.medium.url} ${formats.medium.width}w
  `
}

// Generate the sizes attribute value for the responsive image
const generateSizes = () => '(max-width: 640px) 500px, 750px'

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) => {
    attributes.value = data.data.attributes
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch('http://localhost:1337/api/contact-form?populate=picture')
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})

const nameLabel = 'Name'
const emailLabel = 'E-mail'
const textareaLabel = 'Stellen Sie Ihre Frage...'
</script>

<template>
  <section class="contact-form">
    <div class="container">
      <h2 class="contact-form__title">{{ attributes.title }}</h2>
      <h3 class="contact-form__subtitle">{{ attributes.subtitle }}</h3>
      <form class="contact-form__form">
        <p class="contact-form__form--item">
          <label for="name-input" class="contact-form__label">{{ nameLabel }}</label>
          <input type="text" id="name-input" name="name" :placeholder="nameLabel" />
        </p>
        <p class="contact-form__form--item">
          <label for="email-input" class="contact-form__label">{{ emailLabel }}</label>
          <input type="email" id="email-input" name="email" :placeholder="emailLabel" />
        </p>
        <p class="contact-form__form--item">
          <label for="question-textarea" class="contact-form__label">
            {{ textareaLabel }}
          </label>
          <textarea
            id="question-textarea"
            name="question"
            rows="3"
            :placeholder="textareaLabel"
          ></textarea>
        </p>
        <button type="submit" class="contact-form__submit btn-primary">Ihre Frage senden</button>
      </form>
      <img
        v-if="attributes.picture && attributes.picture.data"
        :src="attributes.picture.data.attributes.url"
        :alt="attributes.picture.data.attributes.alternativeText"
        :srcset="generateSrcset()"
        :sizes="generateSizes()"
        class="contact-form__image"
      />
    </div>
  </section>
</template>

<style lang="scss">
.contact-form {
  background-color: $color-primary;
  margin-bottom: -6px;
  padding-top: 60px;

  @media (min-width: $lg) {
    padding: 0;
    position: relative;

    &::after {
      background-color: $color-tertiary;
      content: '';
      height: 2px;
      left: 0;
      right: 0;
      position: absolute;
      top: 100px;
    }
  }

  &__title,
  &__subtitle {
    padding-left: 20px;
  }

  &__title {
    margin-bottom: 20px;
    position: relative;

    &::before {
      background-color: $color-text;
      content: '';
      left: -20px;
      height: 95%;
      width: 10px;
      position: absolute;
    }

    @media (min-width: $lg) {
      margin-top: 148px;

      &::before {
        left: -30px;
      }
    }

    @media (min-width: $xl) {
      &::before {
        left: -80px;
      }
    }
  }

  &__subtitle {
    font-family: $roboto;
    font-size: 1rem;
    margin-bottom: 100px;
    position: relative;

    &::after {
      background-color: $color-tertiary;
      content: '';
      height: 2px;
      left: -20px;
      right: -20px;
      position: absolute;
      top: calc(100% + 57px);
    }

    @media (min-width: $lg) {
      font-size: 1.25rem;

      &::after {
        left: -30px;
      }
    }

    @media (min-width: $xl) {
      &::after {
        left: -80px;
        width: 50vw;
      }
    }
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 60px;

    &--item {
      width: 100%;
    }
  }

  &__label {
    display: none;
  }

  &__submit {
    margin-top: 20px;

    @media (min-width: $lg) {
      margin-top: 60px;
    }
  }

  &__image {
    aspect-ratio: 5/8;
    margin: 0 -20px;
    object-fit: cover;
    height: 100%;
    width: calc(100% + 40px);
    z-index: 1;

    @media (min-width: $lg) {
      grid-row: 1/4;
      margin-right: 0;
      width: calc(100% + 20px);
    }

    @media (min-width: $xl) {
      margin-left: 0;
      width: 100%;
    }
  }

  @media (min-width: $lg) {
    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      > *:not(.contact-form__image) {
        grid-column: 2;
        margin-left: 30px;
        padding-left: 20px;
      }
    }
  }

  @media (min-width: $xl) {
    .container > *:not(.contact-form__image) {
      margin-left: 80px;
    }
  }
}
</style>

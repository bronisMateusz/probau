<script setup>
import { onMounted, ref } from 'vue'
defineProps({
  displayHeading: {
    type: Boolean,
    default: false
  },
  invertColors: {
    type: Boolean,
    default: false
  }
})
const attributes = ref({})

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) => (attributes.value = data.data.attributes)

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch('http://localhost:1337/api/contact-information')
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <address class="contact-information" :class="{ invert: invertColors }">
    <h2 v-if="displayHeading" class="contact-information__heading">
      {{ attributes.company_name }}
    </h2>
    <strong class="contact-information__address">{{ attributes.address }}</strong>
    <br />
    <a :href="`tel:${attributes.phone_number}`" class="contact-information__link">
      {{ attributes.phone_number }}
    </a>
    <br />
    <a :href="`mailto:${attributes.mail}`" class="contact-information__link">{{
      attributes.mail
    }}</a>
  </address>
</template>

<style lang="scss">
.contact-information {
  color: $color-text;
  font-style: normal;
  white-space: pre-wrap;

  &.invert {
    color: $color-text-inverted;

    .contact-information__link {
      color: $color-text-inverted;
    }
  }

  &__heading {
    font: 400 2.5rem $knucklehead;
    margin-bottom: 16px;
  }

  &__address {
    display: block;
  }

  &__link {
    color: $color-text;
  }

  @media (min-width: $lg) {
    font-size: 20px;

    &__heading {
      font-size: 3.75rem;
      margin-bottom: 24px;
    }
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
const isMenuOpen = ref(false)
const menuItems = ref([])
const phoneNumber = ref('')
const mail = ref('')

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) =>
    data.data.attributes.items.data.filter((item) => {
      switch (item.attributes.additional_attributes) {
        case 'tel:':
          phoneNumber.value = item.attributes.title
          break
        case 'mailto:':
          mail.value = item.attributes.title
          break
        default:
          menuItems.value.push(item)
      }
    })

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch('http://192.168.0.4/:1337/api/menus/1?populate=*')
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <a class="navbar__brand" href="/">
      <img src="@/assets/images/probau-logo.svg" alt="Probau logo" />
    </a>
    <button class="navbar__toggler" aria-label="Menu toggler" @click.prevent="toggleMenu">
      <span class="navbar__toggler--bar"></span>
      <span class="navbar__toggler--bar"></span>
      <span class="navbar__toggler--bar"></span>
    </button>
    <div class="navbar__menu" :class="{ active: isMenuOpen }">
      <ul class="navbar__menu--list">
        <li v-for="item in menuItems" :key="item.id" class="navbar__menu--item">
          <a :href="item.attributes.url" class="navbar__menu--link">{{ item.attributes.title }}</a>
        </li>
      </ul>
      <div class="navbar__contact">
        <a :href="`tel:${phoneNumber}`">{{ phoneNumber }}</a>
        <a :href="`mailto:${mail}`">{{ mail }}</a>
      </div>
    </div>
  </nav>
</template>

<styles lang="scss">
.navbar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;

  a {
    color: $color-text-inverted;

    &:not(:hover) {
      text-decoration: none;
    }

    @media (min-width: $lg) {
      font-size: 1.25rem;
    }
  }

  &__brand {
    img {
      max-height: 50px;
    }

    @media (min-width: $lg) {
      background-color: $color-tertiary;
      left: -15px;
      padding: 25px 30px;
      position: absolute;
      top: 0px;

      img {
        max-height: 70px;
      }
    }

    @media (min-width: $xl) {
      padding: 50px 70px;

      img {
        max-height: 100px;
      }
    }
  }

  &__toggler {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 42px;
    justify-content: center;
    row-gap: 6px;
    width: 42px;

    &--bar {
      background-color: $color-secondary;
      display: block;
      height: 4px;
      width: 30px;
    }

    @media (min-width: $lg) {
      display: none;
    }
  }

  &__menu {
    background-color: $color-tertiary;
    display: grid;
    gap: 20px;
    left: -20px;
    padding: 20px 40px 40px;
    position: absolute;
    right: -10px;
    text-align: center;
    top: 100%;

    &:not(.active) {
      display: none;
    }

    &--list {
      list-style: none;
      padding: 0;
    }

    &--link {
      display: block;
      padding: 10px 20px;
    }

    @media (min-width: $lg) {
      align-items: center;
      grid-template-columns: 1fr auto;
      margin-left: auto;
      position: revert;
      padding: 26px 0;
      width: calc(100% - 210px);

      &:not(.active) {
        display: grid;
      }

      &--list {
        display: flex;
        justify-content: center;
      }
    }

    @media (min-width: $xl) {
      width: calc(100% - 360px);
    }
  }

  &__contact {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-weight: 700;
    text-transform: uppercase;

    a {
      &:first-of-type {
        font-size: 1.5rem;
      }

      &:last-of-type {
        font-size: 1rem;
        opacity: 0.8;
      }
    }

    @media (min-width: $lg) {
      align-items: flex-end;
    }
  }
}
</styles>

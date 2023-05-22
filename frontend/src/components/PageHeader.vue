<script setup>
import { ref } from 'vue'
import MainMenu from '@/components/MainMenu.vue'

const isMenuOpen = ref(false)
const phoneNumber = ref('')
const mail = ref('')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const updateMail = (value) => {
  mail.value = value
}

const updatePhoneNumber = (value) => {
  phoneNumber.value = value
}
</script>

<template>
  <header id="page-header">
    <nav class="navbar">
      <a class="navbar__brand" href="/">
        <img src="@/assets/images/probau-logo.svg" alt="Probau link" />
      </a>
      <button class="navbar__toggler" aria-label="Menu toggler" @click.prevent="toggleMenu">
        <span class="navbar__toggler--bar"></span>
        <span class="navbar__toggler--bar"></span>
        <span class="navbar__toggler--bar"></span>
      </button>
      <div class="navbar__menu" :class="{ active: isMenuOpen }">
        <main-menu
          class="navbar__menu--list"
          :mail="mail"
          :phone-number="phoneNumber"
          @update-mail="updateMail"
          @update-phone-number="updatePhoneNumber"
        />
        <div class="navbar__contact">
          <a :href="`tel:${phoneNumber}`">{{ phoneNumber }}</a>
          <a :href="`mailto:${mail}`">{{ mail }}</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<styles lang="scss">
#page-header {
  background-color: $color-tertiary;
  color: $color-text-inverted;
  inset: 0 0 auto;
  padding: 10px 10px 10px 20px;
  position: fixed;
  z-index: 10;

  @media (min-width: $lg) {
    padding: 0 15px;
  }

  @media (min-width: $xxl) {
    padding-right: 240px;
  }

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
        a {
          padding: 10px 20px;
        }
      }

      @media (min-width: $lg) {
        align-items: center;
        grid-template-columns: 1fr auto;
        margin-left: auto;
        padding: 26px 0;
        position: revert;
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
}
</styles>

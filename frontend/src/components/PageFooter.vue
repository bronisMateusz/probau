<script setup>
import { ref } from 'vue'
import ContactInformation from '@/components/ContactInformation.vue'
import MainMenu from '@/components/MainMenu.vue'
import SocialMenu from '@/components/SocialMenu.vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="container col-50-50">
      <div class="footer__column">
        <div class="footer__logos">
          <a href="/">
            <img src="@/assets/images/probau-logo.svg" alt="Probau link" />
          </a>
          <a href="http://importerkoparek.eu/de/" target="_blank">
            <img src="@/assets/images/kingway-logo.svg" alt="Kingway link" />
          </a>
        </div>
        <contact-information :invert-colors="true" class="footer__contact" />
      </div>
      <div class="footer__column">
        <main-menu class="footer__main-menu" />
        <social-menu :display-mode="2" class="footer__social-menu" />
        <small class="footer__copyright">
          &copy;{{ currentYear }} Probau Jakub Dylus Alle Rechte vorbehalten
        </small>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: #1e1e1e;
  color: $color-text-inverted;

  &__column {
    display: flex;
    flex-direction: column;
    gap: 60px;
    padding: 60px 0;

    @media (min-width: $lg) {
      padding: 120px 0;
    }

    &:first-child {
      $border-style: 1px solid $color-tertiary;
      border-bottom: $border-style;

      @media (min-width: $lg) {
        border-bottom: unset;
        border-right: $border-style;
      }
      @media (min-width: $xl) {
        align-items: center;
        flex-direction: row;
        justify-content: center;
      }
    }
  }

  &__logos {
    align-items: center;
    display: flex;
    gap: 20px;
    justify-content: center;

    img {
      height: 50px;
    }

    @media (min-width: $xl) {
      flex-direction: column;
      gap: 32px;

      img {
        height: 100%;
        width: 240px;
      }
    }
  }

  &__contact {
    text-align: center;

    @media (min-width: $xl) {
      text-align: left;
    }
  }

  &__main-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-transform: uppercase;

    a {
      padding: 8px;
    }

    @media (min-width: $xl) {
      justify-content: flex-end;

      a {
        padding: 8px 16px;
      }
    }
  }

  &__social-menu {
    max-width: 360px;
    margin: 0 auto;
    width: 100%;

    @media (min-width: $xl) {
      margin-right: 0;
    }
  }

  &__copyright {
    color: $color-text-secondary;
    display: block;
    font-size: 0.875rem;
    opacity: 0.5;
    text-align: center;

    @media (min-width: $lg) {
      font-size: 1rem;
      padding-right: 16px;
    }
    @media (min-width: $xl) {
      font-size: 1.25rem;
      text-align: right;
    }
  }
}
</style>

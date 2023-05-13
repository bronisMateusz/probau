<script setup>
import MainMenu from '@/components/MainMenu.vue'
</script>

<template>
  <footer class="footer col-50-50">
    <div class="footer__column">
      <div class="footer__logos">
        <a class="navbar__brand" href="/">
          <img src="@/assets/images/probau-logo.svg" alt="Probau logo" />
        </a>
        <a class="navbar__brand" href="http://importerkoparek.eu/de/">
          <img src="@/assets/images/kingway-logo.svg" alt="Kingway logo" />
        </a>
      </div>
    </div>
    <div class="footer__column">
      <main-menu class="footer__menu" />
      <small class="footer__copyright"> ©2023 Probau Jakub Dylus Alle Rechte vorbehalten </small>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  align-items: center;
  background-color: #1e1e1e;
  color: $color-text-inverted;

  &__column {
    padding: 60px 20px;

    &:first-child {
      $border-style: 1px solid $color-tertiary;
      border-bottom: $border-style;

      @media (min-width: $lg) {
        border-bottom: unset;
        border-right: $border-style;
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

    @media (min-width: $lg) {
      flex-direction: column;
      gap: 32px;

      img {
        height: 100%;
        width: 240px;
      }
    }
  }

  &__menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-transform: uppercase;

    a {
      padding: 8px;
    }

    @media (min-width: $lg) {
      justify-content: flex-end;

      a {
        padding: 8px 16px;
      }
    }
  }

  &__copyright {
    color: $color-text-secondary;
    display: block;
    font-size: 0.875rem;
    opacity: 0.5;
    text-align: center;

    @media (min-width: $lg) {
      font-size: 1.25rem;
      text-align: right;
      padding-right: 16px;
    }
  }
}
</style>

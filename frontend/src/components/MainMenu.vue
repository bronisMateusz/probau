<script setup>
import { onMounted, ref, defineEmits } from 'vue'

defineProps({
  phoneNumber: String,
  mail: String
})

const emit = defineEmits(['updatePhoneNumber', 'updateMail'])

const menuItems = ref([])
const phoneNumberValue = ref('')
const mailValue = ref('')

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  const handleData = (data) => {
    const items = data.data.attributes.items.data

    const sortedItems = items
      .filter((item) => {
        switch (item.attributes.additional_attributes) {
          case 'tel:':
            phoneNumberValue.value = item.attributes.title
            break
          case 'mailto:':
            mailValue.value = item.attributes.title
            break
          default:
            return true
        }
      })
      .sort((a, b) => a.attributes.order - b.attributes.order)

    menuItems.value = sortedItems

    // Emit the updated values to the parent component
    emit('updatePhoneNumber', phoneNumberValue.value)
    emit('updateMail', mailValue.value)
  }

  // Handle any errors that may occur
  const handleError = (error) => console.error('There was a problem with the request:', error)

  fetch('http://localhost:1337/api/menus/1?populate=*')
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <ul class="navbar__menu--list">
    <li v-for="item in menuItems" :key="item.id" class="navbar__menu--item">
      <a :href="item.attributes.url" class="navbar__menu--link">{{ item.attributes.title }}</a>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const menuItems = ref({})

onMounted(() => {
  // Handle the response from the API
  const handleResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  // Handle the data received from the API
  function handleData(data) {
    menuItems.value = data.data.attributes.items.data
  }

  // Handle any errors that may occur
  function handleError(error) {
    console.error('There was a problem with the request:', error)
  }

  fetch('http://localhost:1337/api/menus/1?populate=*')
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)
})
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <a :href="item.attributes.url">{{ item.attributes.title }}</a>
      </li>
    </ul>
  </nav>
</template>

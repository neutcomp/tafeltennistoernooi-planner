<template>
  <header class="shadow-sm bg-white">
    <nav class="container mx-auto p-4 flex justify-between">

      <ul class="flex gap-4">
        <li>
          <NuxtLink to="/" class="btn">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/deelnemer/" class="btn">Deelnemers overzicht</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/toernooi/" class="btn">Toernooi overzicht</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/gebruiker/" class="btn">Gebruiker overzicht</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Modal Group Control" />

      <svg width="100%" height="34" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <rect class="loop" width="100%" height="100%" fill="url(#grad)"></rect>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#41b883;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#41b883;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#41b883;stop-opacity:0" />
          </linearGradient>
        </defs>
      </svg>

      <nav>
        <RouterLink to="/">Action</RouterLink>
        <RouterLink to="/controller">Controller</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.loop {
  animation: loop 0.5s ease-in infinite;
}
@keyframes loop {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

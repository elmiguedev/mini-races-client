<template>
  <nav class="flex justify-center items-center space-x-8 p-4">
    <RouterLink to="/" class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/' }">
      Home
    </RouterLink>
    <RouterLink to="/races" class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/races' }">
      Races
    </RouterLink>
    <RouterLink to="/logout" class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/logout' }">
      Logout
    </RouterLink>
    <RouterLink to="/admin" class="text-black px-4 py-2 transition-all  hover:text-gray-700"
      :class="{ 'font-bold text-gray-800': $route.path === '/admin' }">
      admin
    </RouterLink>
  </nav>
</template>

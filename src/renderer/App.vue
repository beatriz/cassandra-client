<template>
  <div id="app" uk-grid>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'cassandra-client',
    components: {
      Sidebar
    }
  }
</script>

<style>
  /* CSS */
</style>

<template>
  <div id="app">
    <connection></connection>
  </div>
</template>

<script>
  import Connection from '@/components/Connection'

  export default {
    name: 'cassandra-client',
    components: {
      Connection
    }
  }
</script>

<style>
  /* CSS */
</style>

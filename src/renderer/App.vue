<template>
  <div id="app" class="uk-grid uk-margin uk-margin-top">
    <sidebar class="uk-width-1-5"></sidebar>
    <query class="uk-width-4-5"></query>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Query from '@/components/Query'

  export default {
    name: 'cassandra-client',
    components: {
      Sidebar,
      Query
    }
  }
</script>

<style>
  /* CSS */
  @import '~uikit/dist/css/uikit.min.css';
</style>

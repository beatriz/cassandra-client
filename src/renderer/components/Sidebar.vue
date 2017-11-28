<template>
  <div id="sidebar">
    <connection v-on:connected="getKeyspaces"></connection>

    {{keyspaces.length}}
  </div>
</template>

<script>
import Connection from '@/components/Connection'
const cassandra = require('../cassandra')

export default {
  name: 'sidebar',
  components: {
    Connection
  },
  data () {
    return {
      keyspaces: []
    }
  },
  methods: {
    getKeyspaces () {
      cassandra.getKeyspaces()
        .then(res => { this.keyspaces = res.rows })
        .catch(err => console.log(err))
    }
  }
}
</script>

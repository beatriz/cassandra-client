<template>
  <div id="sidebar" class="uk-width-1-4">
    <connection v-on:connected="getKeyspaces"></connection>

    <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
      <keyspace-item v-for="k in keyspaces" :key="k.keyspace_name" v-bind:keyspace="k.keyspace_name"></keyspace-item>
    </ul>
  </div>
</template>


<script>
import Connection from '@/components/Connection'
import KeyspaceItem from '@/components/KeyspaceItem'
const cassandra = require('../cassandra')

export default {
  name: 'sidebar',
  components: {
    Connection,
    KeyspaceItem
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

<template>
  <div id="sidebar" class="uk-width-1-4">
    <connection v-on:connected="getKeyspaces"></connection>

    <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
        <li class="uk-parent" v-for="k in keyspaces" :key="k.keyscpace_name">
            <a href="#" v-on:click="keyspaceInfo(k.keyspace_name)">{{k.keyspace_name}}</a>
            <ul class="uk-nav-sub" uk-nav>
                <li v-for="table in k.tables" :key="table.table_name">
                  <a href="#">{{table.table_name}}</a>
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>
import Connection from '@/components/Connection'
import Vue from 'vue'
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
    },
    keyspaceInfo (keyspaceName) {
      cassandra.getKeyspaceInfo(keyspaceName)
        .then(res => {
          Vue.set(this.keyspaces, this.keyspaces.findIndex(x => x.keyspace_name === keyspaceName), {keyspace_name: keyspaceName, tables: res.rows})
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

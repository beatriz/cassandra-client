<template>
  <li class="uk-parent">
      <a href="#" v-on:click="getInfo">{{keyspace}}</a>
      <ul class="uk-nav-sub uk-nav-parent-icon" uk-nav>
          <table-item v-for="t in tables" :key="t.table_name" v-bind:keyspace="keyspace" v-bind:table="t.table_name"></table-item>
          
      </ul>
  </li>
</template>

<script>
import TableItem from '@/components/TableItem'
const cassandra = require('../cassandra')

export default {
  name: 'keyspace-item',
  components: {
    TableItem
  },
  props: {
    keyspace: String
  },
  data () {
    return {
      tables: []
    }
  },
  methods: {
    getInfo () {
      cassandra.getKeyspaceInfo(this.keyspace)
        .then((res) => { this.tables = res.rows })
        .catch(err => console.log(err))
    }
  }
}
</script>

<template>
  <li class="uk-parent">
      <a href="#" v-on:click="getInfo">{{keyspace}}</a>
      <ul class="uk-nav-sub uk-nav-parent-icon" uk-nav>
          <table-item v-for="t in tables" :key="t.table_name" v-bind:keyspace="keyspace" v-bind:table="t.table_name" type="table"></table-item>
          <table-item v-for="t in views" :key="t.view_name" v-bind:keyspace="keyspace" v-bind:table="t.view_name" type="view"></table-item>          
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
      tables: [],
      views: []
    }
  },
  methods: {
    getInfo () {
      Promise.all([cassandra.getTables(this.keyspace), cassandra.getViews(this.keyspace)])
        .then(([res1, res2]) => {
          this.tables = res1.rows
          this.views = res2.rows
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

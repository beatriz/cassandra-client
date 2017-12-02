<template>
  <li class="uk-parent">
      <a href="#" v-on:click="getInfo">{{table}} ({{type}})</a>
      <ul class="uk-nav-sub" uk-nav>
          <li v-for="col in columns" :key="col.column_name">
            <a href="#">{{col.column_name}}</a>
          </li>
      </ul>
  </li>
</template>

<script>
const cassandra = require('../cassandra')

export default {
  name: 'table-item',
  props: {
    keyspace: String,
    table: String,
    type: String
  },
  data () {
    return {
      columns: []
    }
  },
  methods: {
    getInfo () {
      cassandra.getColumns(this.keyspace, this.table)
        .then((res) => { this.columns = res.rows })
        .catch(err => console.log(err))
    }
  }
}
</script>

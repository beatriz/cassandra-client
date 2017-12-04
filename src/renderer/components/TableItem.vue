<template>
  <li class="uk-parent">
      <a href="#" v-on:click="getInfo">
        <span class="uk-badge" v-bind:style="{ background:badgeColor}">{{type}}</span> {{table}}
      </a>
      <ul class="uk-nav-sub" uk-nav>
          <li v-for="col in columns" :key="col.column_name">
            <span class="uk-badge">{{col.kind}}</span> {{col.column_name}} ({{col.type}})
          </li>
      </ul>
  </li>
</template>

<script>
const cassandra = require('../cassandra')
const dict = { 'partition_key': 0, 'clustering': 1, 'regular': 2 }

export default {
  name: 'table-item',
  props: {
    keyspace: String,
    table: String,
    type: String
  },
  data () {
    return {
      columns: [],
      partitionKeys: [],
      clusteringKeys: [],
      badgeColor: this.type === 'T' ? '#ffa500' : '#1e87f0'
    }
  },
  methods: {
    getInfo () {
      cassandra.getColumns(this.keyspace, this.table)
        .then((res) => {
          this.columns = res.rows.sort((a, b) => {
            return dict[a.kind] - dict[b.kind]
          })
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

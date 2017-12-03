<template>
  <div id="query">
    <div class="uk-margin">
      <button v-on:click="makeQuery" class="uk-icon-button" uk-icon="icon: play"></button>
    </div>
    <textarea class="uk-textarea" v-model="query"></textarea>
    <div>
      <div v-if="result.rows">
        <table class="uk-table uk-table-striped">
          <thead>
            <tr>
              <th v-for="col in result.columns" :key="col.name">
                {{col.name}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in result.rows" :key="index">
              <td v-for="cell in result.columns" :key="cell.name">
                {{row[cell.name]}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        {{result.wasApplied ? 'applied' : 'not applied'}}
      </div>
    </div>
  </div>
</template>


<script>
const cassandra = require('../cassandra')

export default {
  name: 'query',
  data () {
    return {
      query: [],
      result: Object
    }
  },
  methods: {
    makeQuery () {
      cassandra.executeQuery(this.query)
        .then(res => { this.result = res })
        .catch(err => console.error(err))
    }
  }
}
</script>

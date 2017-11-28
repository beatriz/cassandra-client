<template>
  <div class="hello">
    <label>Contact points</label>
    <input type="text" v-model="contactPoints" />
    <label>Port</label>
    <input type="text" v-model="port" />
    <button v-on:click="connect">Connect</button>

    <div v-bind:class="[textClass]">{{ status }}</div>
  </div>
</template>

<script>
import * as cassandra from '../cassandra'
export default {
  name: 'sidebar',
  data () {
    return {
      contactPoints: '',
      port: '',
      status: '',
      textClass: ''
    }
  },
  methods: {
    connect () {
      this.status = 'Connecting'
      this.textClass = 'uk-text-warning'

      cassandra.connect(this.contactPoints, this.port)
        .then(() => {
          this.status = 'Connected'
          this.textClass = 'uk-text-success'
        })
        .catch(err => {
          this.textClass = 'uk-text-danger'
          this.status = err.message
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
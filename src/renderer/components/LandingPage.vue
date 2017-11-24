<template>
  <div class="hello">
    <label>Contact points</label>
    <input type="text" v-model="contactPoints" />
    <label>Port</label>
    <input type="text" v-model="port" />

    <div v-if="isConnecting">Connecting</div>
    <div v-else>
      <div v-if="connected">Connected</div>
      <div v-else>{{connectionError}}</div>
    </div>
    <button v-on:click="connect">Connect</button>
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
      isConnecting: false,
      connected: false,
      connectionError: ''
    }
  },
  methods: {
    connect () {
      this.isConnecting = true
      cassandra.connect(this.contactPoints, this.port)
        .then(() => {
          this.isConnecting = false
          this.connected = true
        })
        .catch(err => {
          this.isConnecting = false
          this.connected = false
          this.connectionError = err.message
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
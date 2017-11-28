<template>
  <div class="connection">
    <button v-on:click="openModal" type="button">Connect</button>

    <div id="connection-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body"> 
        <label>Contact points</label>
        <input type="text" v-model="contactPoints" />
        <label>Port</label>
        <input type="text" v-model="port" />

        <div v-bind:class="[textClass]">{{ status }}</div>

        <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary" type="button" v-on:click="connect">Connect</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const cassandra = require('../cassandra')
const UIKit = require('uikit')

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
          UIKit.modal('#connection-modal').hide()
        })
        .catch(err => {
          this.textClass = 'uk-text-danger'
          this.status = err.message
        })
    },
    openModal () {
      UIKit.modal('#connection-modal').show()
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
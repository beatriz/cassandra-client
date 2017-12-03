<template>
  <div class="connection">
    <button class="uk-button uk-button-secondary uk-width-1-1" v-on:click="openModal" type="button">Connect</button>

    <div id="connection-modal" uk-modal>
      <div class="uk-modal-dialog"> 
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <form class="uk-form-stacked" v-on:submit="connect">
            <div class="uk-modal-body" uk-grid>
              <div>
                <label class="uk-form-label">Contact points</label>
                <div class="uk-form-controls">
                  <input class="uk-input" type="text" v-model="contactPoints" />
                </div>
              </div>
              <div>
                <label class="uk-form-label">Port</label>
                <div class="uk-form-controls">
                  <input class="uk-input" type="text" v-model="port" />
                </div>
              </div>
            <div v-bind:class="[textClass]">{{ status }}</div>
            </div>

            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                <input class="uk-button uk-button-primary" type="submit" v-on:click="connect" value="Connect" />
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const cassandra = require('../cassandra')
const UIKit = require('uikit')
const storage = require('@/jsonStorage')

export default {
  name: 'connection',
  data () {
    return {
      contactPoints: '',
      port: '',
      status: '',
      textClass: ''
    }
  },
  methods: {
    connect (e) {
      e.preventDefault()
      this.status = 'Connecting'
      this.textClass = 'uk-text-warning'
      storage.setConnection(this.contactPoints, this.port)

      cassandra.connect(this.contactPoints, this.port)
        .then(() => {
          this.status = 'Connected'
          this.textClass = 'uk-text-success'
          this.$emit('connected')
          UIKit.modal('#connection-modal').hide()
        })
        .catch(err => {
          this.textClass = 'uk-text-danger'
          this.status = err.message
        })
    },
    openModal () {
      storage.getConnection()
        .then(conn => {
          this.contactPoints = conn.contactPoints
          this.port = conn.port
        })
        .catch(err => console.err(err))
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
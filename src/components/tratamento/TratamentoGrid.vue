<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Procurar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      item-key="id"
      :search="search"
      :headers="headers"
      :items="tratamentos"
      :loading="loading">
      <template v-slot:item.inicio="{ item }">
        {{ item.inicio | moment('DD/MM/YYYY') }}
      </template>
      <template v-slot:item.valorTotal="{ item }">
        {{ item.valorTotal | currency }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="visualizar(item)" title="visualizar tratamento">mdi-eye</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
  created () {
    axios.get(`https://puc-dentista-api.herokuapp.com/api/tratamento/dentista/${this.user.id}`).then(response => {
      this.tratamentos = response.data
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.showError({ error, message: 'Houve um problema ao consultar os tratamentos do dentista.' })
    })
  },
  data () {
    return {
      loading: true,
      search: '',
      tratamentos: [],
      headers: [
        { text: 'Código', value: 'id' },
        { text: 'Paciente', value: 'paciente' },
        { text: 'Plano', value: 'plano' },
        { text: 'Início', value: 'inicio' },
        { text: 'Total', value: 'valorTotal' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions' }
      ]
    }
  },
  methods: {
    ...mapMutations(['showError']),
    visualizar (item) {
      this.$router.push(`/tratamentos/${item.id}`)
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

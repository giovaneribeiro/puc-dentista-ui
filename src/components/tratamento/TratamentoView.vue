<template>
  <v-container fluid>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-card>
      <v-card-title>dados do tratamento</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field readonly hide-details
              label="código tratamento"
              v-model="tratamento.id"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field readonly hide-details
              label="status"
              v-model="tratamento.status"></v-text-field>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field readonly hide-details
              label="paciente"
              v-model="tratamento.paciente"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field readonly hide-details
              label="idade"
              v-model="tratamento.idade"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field readonly hide-details
              label="cpf"
              v-model="tratamento.cpf"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-6">
      <v-card-title>procedimentos realizados</v-card-title>
      <v-card-text>
        <v-data-table
          item-key="id"
          :headers="headers"
          :items="tratamento.eventos">
          <template v-slot:item.precoOriginal="{ item }">
            {{ item.precoOriginal | currency }}
          </template>
          <template v-slot:item.precoFinal="{ item }">
            {{ item.precoFinal | currency }}
          </template>
          <template v-slot:item.realizacao="{ item }">
            {{ item.realizacao | moment('DD/MM/YYYY') }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-card class="mt-6">
      <v-card-title>comentários</v-card-title>
      <v-card-text>
        <v-row v-if="tratamento.comentarios && tratamento.comentarios.length > 0">
          <v-col>
            <v-timeline dense>
              <v-timeline-item v-for="comentario in tratamento.comentarios" :key="comentario.id" small>
                <v-row justify="space-between">
                  <v-col cols="7" v-text="comentario.descricao"></v-col>
                  <v-col cols="3" v-text="comentario.nomeUsuario"></v-col>
                  <v-col class="text-right" cols="2">{{ comentario.criacao | moment('DD/MM/YYYY HH:mm:ss') }}</v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>Não há comentários neste tratamento.</v-col>
        </v-row>
        <v-row v-if="tratamento.status === 'EM_ANALISE'">
          <v-col>
            <v-textarea hide-details
              label="adicionar comentário"
              v-model="novoComentario"></v-textarea>
          </v-col>
        </v-row>
        <v-row v-if="tratamento.status === 'EM_ANALISE'">
          <v-col class="text-right">
            <v-btn class="primary" @click="adicionarComentario()">Adicionar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
  created () {
    axios.get(`https://puc-dentista-api.herokuapp.com/api/tratamento/${this.$route.params.id}`).then(response => {
      this.tratamento = response.data
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.showError({ error, message: 'Houve um problema ao consultar o tratamento.' })
    })
  },
  data () {
    return {
      loading: true,
      tratamento: {},
      novoComentario: null,
      eventos: [],
      headers: [
        { text: 'Código', value: 'id' },
        { text: 'Evento', value: 'evento' },
        { text: 'Preço Original', value: 'precoOriginal' },
        { text: 'Preço Final', value: 'precoFinal' },
        { text: 'Realização', value: 'realizacao' },
        { text: 'Observações', value: 'observacoes' }
      ]
    }
  },
  methods: {
    ...mapMutations(['showSnackbar', 'showError']),
    adicionarComentario () {
      if (this.novoComentario && this.novoComentario.trim()) {
        const comentario = { descricao: this.novoComentario, codigoUsuario: this.user.idUsuario }

        axios.post(`https://puc-dentista-api.herokuapp.com/api/tratamento/${this.$route.params.id}/comentario`, comentario).then(response => {
          response.data.nomeUsuario = this.user.nome
          this.tratamento.comentarios.push(response.data)
          this.novoComentario = null
          this.showSnackbar({ type: 'success', message: 'Comentário adicionado com sucesso.' })
        }).catch(error => {
          this.showError({ error, message: 'Não foi possível adicionar este comentário ao tratamento.' })
        })
      } else {
        this.showSnackbar({ type: 'warning', message: 'Favor adicionar um comentário para enviar' })
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

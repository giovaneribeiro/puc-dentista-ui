<template>
  <v-snackbar top right absolute v-model="snackbar.visible"
    :color="snackbar.type"
    :multi-line="snackbar.multiline">
    {{ snackbar.message }}
    <v-btn text @click="closeSnackbar">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    snackbar () {
      return this.$store.state.snackbar
    }
  },
  methods: {
    ...mapMutations(['closeSnackbar'])
  }
}
</script>

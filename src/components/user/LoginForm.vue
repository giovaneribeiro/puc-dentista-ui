<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row class="mt-6">
        <v-col class="primary text-center white--text login-padding">
          <div class="mb-8">
            <div id="icon"></div>
          </div>

          <div class="my-8">
            <p class="headline font-weight-bold my-0">boas vindas ao</p>
            <p class="display-1 font-weight-bold my-0">novo portal do dentista</p>
          </div>

          <p>ainda não é nosso credenciado?</p>
          <v-btn x-large color="white primary--text"><u>s</u>eja nosso credenciado</v-btn>
        </v-col>
        <v-col class="text-center login-padding">
          <p class="display-1 font-weight-bold my-12">faça seu login</p>
          <div class="mx-12">
            <v-text-field filled v-model="email"
              :rules="[rules.required, rules.email]"
              label="e-mail"
              required></v-text-field>
            <v-text-field filled v-model="password"
              label="senha"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              required></v-text-field>
            <v-btn x-large color="primary" :disabled="!valid || loading" :loading="loading" @click="login">
              <u>e</u>ntrar
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data: () => ({
    valid: false,
    loading: false,
    email: '',
    password: '',
    showPassword: false,
    rules: {
      required: value => !!value || 'Obrigatório.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido.'
      }
    }
  }),
  methods: {
    ...mapMutations(['showSnackbar', 'showError']),
    ...mapActions(['signIn']),
    login () {
      if (this.$refs.form.validate()) {
        this.loading = true

        const { email, password } = this

        this.signIn({ usuario: email, senha: password }).then(() => {
          this.loading = false
          this.$router.push({ name: 'dashboard' })
        }).catch(error => {
          this.loading = false
          this.showError({ error, message: 'Usuário ou senha inválidos.' })
        })
      }
    }
  }
}
</script>

<style>
  #icon {
    background-color: white;
    height: 100px;
    width: 100px;
    margin: 0 auto;
    border-radius: 9999px;
  }
  .login-padding {
    padding-top: 75px;
    padding-bottom: 75px;
  }
</style>

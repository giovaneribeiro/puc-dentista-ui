<template>
  <div v-if="isAuth">
    <v-navigation-drawer app
      v-model="drawer" dark class="grey darken-2"
      :clipped="$vuetify.breakpoint.lgAndUp">
      <v-list>
        <v-list-item :key="1">
          <v-list-item-action>
            <v-icon dark class="primary">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-lowercase">{{ user.dentista }}</v-list-item-title>
            <v-list-item-subtitle>cnes: {{ user.cpf || user.cnpj }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading">
            <v-col cols="6">
              <v-subheader>{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>
          <v-list-group v-else-if="item.children" :key="item.text">
            <template v-slot:activator>
              <v-list-item-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.to">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary white--text"
      :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <span class="text-lowercase">{{ user.nome }}</span>
      <v-menu bottom left v-if="isAuth">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="white--text" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title href @click="logout">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    ...mapActions(['signOut']),
    logout () {
      this.signOut()
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'user']),
    items () {
      const menu = [
        { icon: 'mdi-home', text: 'início', to: '/' },
        {
          icon: 'mdi-tooth-outline',
          text: 'tratamentos',
          children: [
            { text: 'visualizar tratamentos', to: '/tratamentos' },
            { text: 'solicitar tratamento', to: '/solicitar' }
          ]
        }
      ]

      if (this.usuarioNivel2()) {
        menu.push(
          {
            icon: 'mdi-cash',
            text: 'financeiro',
            children: [
              { text: 'pagamentos', to: '/pagamentos' }
            ]
          },
          {
            icon: 'mdi-card-account-details',
            text: 'cadastro',
            children: [
              { text: 'atualizar dados', to: '/dados' },
              { text: 'atualizar benefícios', to: '/beneficios' }
            ]
          }
        )
      }

      return menu
    }
  }
}
</script>

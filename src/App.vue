<template>
  <v-app>
    <Navigation></Navigation>

    <v-content>
      <v-container fluid>
        <Snackbar></Snackbar>
        <router-view></router-view>
      </v-container>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Navigation from '@/components/template/Navigation.vue'
import Footer from '@/components/template/Footer.vue'
import Snackbar from '@/components/template/Snackbar.vue'

export default {
  components: { Navigation, Footer, Snackbar }
}
</script>

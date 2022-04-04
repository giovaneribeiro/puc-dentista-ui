<template>
  <div>
    <Header title="painel de controle">
      boas vindas, <span class="text-lowercase">{{ user.nome }}</span>!
    </Header>
  </div>
</template>

<script>
import Header from '@/components/template/Header'
import { mapGetters } from 'vuex'

export default {
  components: { Header },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

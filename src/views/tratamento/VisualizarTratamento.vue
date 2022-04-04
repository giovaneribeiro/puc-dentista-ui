<template>
  <div>
    <Header title="visualizar tratamento">
      aqui você verá o andamento do tratamento selecionado
    </Header>

    <TratamentoView></TratamentoView>
  </div>
</template>

<script>
import Header from '@/components/template/Header'
import TratamentoView from '@/components/tratamento/TratamentoView'

export default {
  components: { Header, TratamentoView }
}
</script>

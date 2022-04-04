<template>
  <div>
    <Header title="tratamentos do dentista">
      aqui você poderá visualizar todos os tratamentos do dentista, e também poderá filtrar os registros por tratamento, paciente ou status.
    </Header>

    <TratamentoGrid></TratamentoGrid>
  </div>
</template>

<script>
import Header from '@/components/template/Header'
import TratamentoGrid from '@/components/tratamento/TratamentoGrid'

export default {
  components: { Header, TratamentoGrid }
}
</script>

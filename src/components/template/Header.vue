<template>
  <div>
    <v-card flat>
      <v-card-title>
        <h1>{{ title }}</h1>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

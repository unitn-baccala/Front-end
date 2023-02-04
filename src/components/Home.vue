<script lang="ts">
  import Registration from '@/components/Registration.vue'

  export default {
    components: {
      Registration
    }
  }
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-spacer></v-spacer>
      <Registration></Registration>
    </v-app-bar>

    <v-main>
      <v-card
        class="mx-auto my-10 elevation-8 w-50 h-50"
      >
        <v-img
          class="h-50"
          src="menu.jpg"
          cover
        >
        </v-img>

        <v-card-title>Baccala</v-card-title>
        <v-card-text>
          Una bellissima descrizione del nostro applicativo
        </v-card-text>

      </v-card>
    </v-main>
  </v-app>
</template>  

<style>
html { overflow-y: auto }
</style>
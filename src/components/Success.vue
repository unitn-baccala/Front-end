<script lang="ts">
  export default {
    data: () => ({
      text: `Hello, I'm a snackbar`,
    }),
    props: {
        open: Boolean
    }
  }
</script>

<template>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="open"
      >
        {{ text }}
  
        <template v-slot:actions>
          <v-btn
            color="pink"
            variant="text"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
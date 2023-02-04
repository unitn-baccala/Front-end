<script lang="ts">
import { registerUser } from '@/apis/userApi';
import Success from './Success.vue';

  export default {
    data() {
        return {
            open: false,
            snackBarOpen: false,
            email: "",
            password: "",
            emailRules: [
                (value: string) => {
                    if (value) {
                        if ((/^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,4})$/).test(value)) {
                            return true;
                        }
                        else {
                            return "Devi inserire un'indirizzo email valido";
                        }
                    }
                    else {
                        return "Devi inserire un'indirizzo email";
                    }
                },
            ],
            passwordRules: [
                (value: string) => {
                    if (value) {
                        if ((/^(?=.*[a-zA-Z])(.{12,64})$/).test(value)) {
                            return true;
                        }
                        else {
                            return "Devi inserire una password lunga almeno 12 caratteri";
                        }
                    }
                    else {
                        return "Devi inserire una password";
                    }
                },
            ]
        };
    },
    methods: {
        registration() {
            registerUser(this.email, this.password).then((res) => {
                if (res.status == 400 || res.status == 500) {
                    //errore
                }
                else {
                    this.snackBarOpen = true;
                }
            });
        }
    },
    components: { Success }
}
</script>

<template>
  <Success></Success>
  <v-btn
    color="primary"
  >
    Open Dialog
    <v-dialog
      v-model="open"
      activator="parent"
      persistent
    >
    
    <v-sheet width="300" class="mx-auto my-10 py-10 px-10 elevation-8 w-50 h-50">
      <v-form @submit.prevent>
        <v-text-field
          v-model="email"
          label="Email*"
          :rules="emailRules"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="password"
          label="Password*"
          :rules="passwordRules"
          type="password"
          required
        >
        </v-text-field>

        <v-btn type="submit" block class="mt-2" @click="registration">Submit</v-btn>
      </v-form>
    </v-sheet>

    </v-dialog>
  </v-btn>
</template>
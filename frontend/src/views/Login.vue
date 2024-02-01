<template>
  <div class="container">
      <!-- <div class="logo">
    <img src="src/views/Signin/bankal.png" alt="Company Logo">
  </div> -->
  <h1>Login</h1>
<form @submit.prevent="handleSubmit">
  <div v-if="err">{{ err }}</div>
  <label>Username: </label><br>
  <input type="text" required v-model="username"><br><br>
  <label>Password: </label><br>
  <input type="password" required v-model="password"> <br><br>

  <div>
      <button> Submit </button>
  </div> <br>
  <div>
      <button @click = 'signUp'>Sign Up instead</button>
  </div>
</form>
</div>
<!-- <p>{{email}}</p> -->
<!-- <p>{{password}}</p> -->
<router-view></router-view>
</template>

<script>
//import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.0/axios.min.js"
import axios from 'axios'
let url = 'api/login'

export default {
  data() {
      return {
          username: '',
          // persons: [],
          password: '',
          err : ''
      }
  },

  methods: {
      async handleSubmit() {
          let p = await axios.post(url, {
              username: this.username,
              password: this.password,
            })
          console.log(p.data);
          if (p.data==='found') {
            this.$router.push('/league/myteam')
          } else if (p.data === 'not found') {
            this.err = 'Invalid Login credentials'
          } 
          else{
            this.err = 'Unable to login'
          }
      },
      
      // async getPerson(){
      //     const 
      // }
      async signUp(){
          this.$router.push("/register/")
      },
  }

}
</script>

<style>
 
</style>
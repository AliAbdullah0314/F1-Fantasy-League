<template>
    <form @submit.prevent=signUp>
        <h1>Sign Up</h1>
        <!-- <router-view></router-view> -->
        <div>
            <div v-if="err">{{ err }}</div>
            <label>Username: </label><br>
            <input type="text" v-model="username" placeholder="Enter Username" /><br><br>
            <label>Password: </label><br>
            <input type="password" v-model="password" placeholder="Enter Password" /><br><br>
            <div v-if="passwordError">{{ passwordError }}</div><br>
            <label>Re-enter Password: </label><br>
            <input type="password" v-model="passwordC" placeholder="Confirm Password" /><br><br>
            <button>Sign Up</button><br>
            
        </div>
    </form>
    <br>
    <button @click = "goto('/login')">Login instead</button>

    <!-- <router-link to="/league/myteam" tag="button">to myteam</router-link> -->
</template>
  
<script>
import axios from 'axios'
let url = 'api'

export default {

    data() {
        return {
            username: "",
            password: "",
            passwordC: "",
            passwordError: "",
            err: "",
        }
    },
    methods: {
        async signUp() {
            if (this.password !== this.passwordC) {
                this.passwordError = "Please ensure passwords match, type again and resubmit"
            } else {
                
                const res = await axios.post(url, {
                    username: this.username,
                    password: this.password,
                })

                if (res.data === 'success') {
                    //send to create team page
                    console.log('success')
                    this.$router.push('/league/create')
                }
                else if(res.data === 'taken'){
                    this.err = "Username is already taken, please try again"
                    
                }
                else{
                    this.err = "Error Registering user, please try again later";
                }


            }

        },
        goto(path){
            this.$router.push(path);

        }


    }
}
</script>
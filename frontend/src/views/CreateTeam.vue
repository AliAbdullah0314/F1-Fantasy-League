<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <nav>
      <router-link to="/league/myteam">My Team</router-link> |
      <router-link to="/league/transfer">Transfer</router-link> |
      <router-link to="/league/leaderboard">Leaderboard</router-link> |
      <router-link to="/league/standings">Standings</router-link> |
      <h3>{{ username }}</h3>
      <button @click=logout>Logout</button>
    </nav>
    <label v-if="total>budget">You have gone over budget</label>
    <label v-if="err">{{err}}</label>
    <label>BUDGET: {{ budget }}</label>
    <label>TOTAL: {{ total }}</label>
    <form @submit.prevent=createTeam>
      <label>Driver 1: </label>
      <select required name="driver1" id="drivers1" @change="changeEventd1" v-model="driver1sel">
        <option v-for="driver in drivers" :value='driver'>{{ driver.name }}</option>
      </select>
      <label>{{ d1price }}</label> <br>

      <label>Driver 2: </label>
      <select required name="driver2" id="drivers2" @change="changeEventd2" v-model="driver2sel">
        <option v-for="driver in drivers2" :value='driver'>{{ driver.name }}</option>
      </select>
      <label>{{ d2price }}</label> <br>

      <label>Team Principal: </label>
      <select required name="principal" id="principals" @change="changeEventp" v-model="principalsel">
        <option v-for="principal in principals" :value='principal'>{{ principal.name }}</option>
      </select>
      <label>{{ pprice }}</label> <br>

      <label>Constructor: </label>
      <select required name="constructor" id="constructors" @change="changeEventc" v-model="constructorsel">
        <option v-for="constructor in constructors" :value='constructor'>{{ constructor.name }}</option>
      </select>
      <label>{{ cprice }}</label> <br>


      <input type="submit">
    </form>
  </div> -->



  <div class="home-container">
    <div class="home-container01">
      <h1 class="home-text">Create Your Own Team</h1>
      <div class="home-container02">
        <div class="home-container03">
          <label style="color: red;" v-if="total > budget">You have gone over budget</label>
          <label v-if="err">{{ err }}</label>
          <label>Driver 1:</label>
          <div class="home-container04">
            <select class="home-select" required name="driver1" id="drivers1" @change="changeEventd1"
              v-model="driver1sel">
              <option v-for="driver in drivers" :value='driver'>{{ driver.name }}</option>
            </select>
            <label class="home-text02">Cost: {{ d1price }} bp</label>
          </div>
        </div>
        <div class="home-container05">
          <label>Driver 2:</label>
          <div class="home-container06">
            <select class="home-select1" required name="driver2" id="drivers2" @change="changeEventd2"
              v-model="driver2sel">
              <option v-for="driver in drivers2" :value='driver'>{{ driver.name }}</option>
            </select>
            <label class="home-text04">Cost: {{ d2price }} bp</label>
          </div>
        </div>
        <div class="home-container07">
          <label>Team Principal:</label>
          <div class="home-container08">
            <select class="home-select2" required name="principal" id="principals" @change="changeEventp"
              v-model="principalsel">
              <option v-for="principal in principals" :value='principal'>{{ principal.name }}</option>
            </select>
            <label class="home-text06">Cost: {{ pprice }} bp</label>
          </div>
        </div>
        <div class="home-container09">
          <label>Constructor</label>
          <div class="home-container10">
            <select class="home-select3" required name="constructor" id="constructors" @change="changeEventc" v-model="constructorsel">
              <option v-for="constructor in constructors" :value='constructor'>{{ constructor.name }}</option>
            </select>
            <label class="home-text08">Cost: {{ cprice }} bp</label>
          </div>
        </div>
      </div>
      <button type="submit" class="button" @click="createTeam">Submit</button>
    </div>
    <div class="home-sidebar">
      <span class="home-text09">My Budget:</span><br>
      <span style="color: aqua;">{{ budget }} bp</span><br><br><br><br>
      <label class="home-text10">Total Cost: {{ total }} bp</label>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router'
import axios from 'axios'
let url = '/league/create/api'
export default {

  data() {
    return {
      drivers: [],
      drivers2: [],
      principals: [],
      constructors: [],
      username: "",
      driver1sel: '',
      driver2sel: '',
      principalsel: '',
      constructorsel: '',
      d1price: 0,
      d2price: 0,
      pprice: 0,
      cprice: 0,
      total: 0,
      budget: 18000,
      err: '',


    }
  },
  async created() {
    let auth = await axios.get('/authenticate/api');

    if (auth.data.msg === 'authenticated') {
      if (auth.data.user.drivers.driver1.name) {
        console.log('not authenticated, illegal access');
        this.$router.push('/login');
      } else {
        const fetch = await axios.get(url)
        this.drivers = fetch.data.drivers;
        this.drivers2 = fetch.data.drivers;
        this.principals = fetch.data.principals;
        this.constructors = fetch.data.constructors;
      }

    }
    else {
      console.log('not authenticated, illegal access');
      this.$router.push('/login');
    }
  },
  methods: {
    async createTeam() {

      if (this.total <= this.budget && this.driver1sel !== this.driver2sel) {

        const res = await axios.post(url, {
          driver1sel: this.driver1sel,
          driver2sel: this.driver2sel,
          principalsel: this.principalsel,
          constructorsel: this.constructorsel,
        })

        this.$router.push('/league/myteam')

      }
      else {
        this.err = 'Issues with your form submission';
      }


    },
    changeEventd1() {
      console.log('changed1', this.driver1sel)
      let temp = this.drivers.filter((ele) => {
        if (ele.name === this.driver1sel.name) {
          this.d1price = ele.price;
          return true;
        }
      })
      this.total = this.d1price + this.d2price + this.pprice + this.cprice
    },
    changeEventd2(event) {
      this.drivers.filter((ele) => {
        if (ele.name === this.driver2sel.name) {
          this.d2price = ele.price;
          return true;
        }
      })
      this.total = this.d1price + this.d2price + this.pprice + this.cprice
    },
    changeEventp(event) {
      this.principals.filter((ele) => {
        if (ele.name === this.principalsel.name) {
          this.pprice = ele.price;
          return true;
        }
      })
      this.total = this.d1price + this.d2price + this.pprice + this.cprice
    },
    changeEventc(event) {
      this.constructors.filter((ele) => {
        if (ele.name === this.constructorsel.name) {
          this.cprice = ele.price;
          return true;
        }
      })
      this.total = this.d1price + this.d2price + this.pprice + this.cprice
    },
    goto(path) {
      this.$router.push(path);

    },
    logout() {
      this.$router.push('/login');
    }



  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}

.home-container01 {
  top: -2px;
  left: -1px;
  width: 867px;
  height: 990px;
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.home-text {
  margin-top: 96px;
  text-align: center;
  margin-bottom: 96px;
}

.home-container02 {
  flex: 0 0 auto;
  width: 818px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.home-container03 {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-container04 {
  flex: 0 0 auto;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.home-select {
  width: 521px;
  height: 69px;
  padding: var(--dl-space-space-unit);
  align-self: center;
  border-radius: 5%;
  background-color: aqua;
}

.home-text02 {
  padding: 25px;
  align-self: center;
  margin-left: 48px;
  border-radius: 20%;
  background-color: rgb(255, 228, 0);
}

.home-container05 {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-container06 {
  flex: 0 0 auto;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.home-select1 {
  width: 521px;
  height: 69px;
  padding: var(--dl-space-space-unit);
  align-self: center;
  border-radius: 5%;
  background-color: aqua;
}

.home-text04 {
  padding: 25px;
  align-self: center;
  margin-left: 48px;
  border-radius: 20%;
  background-color: rgb(255, 228, 0);
}

.home-container07 {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-container08 {
  flex: 0 0 auto;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.home-select2 {
  width: 521px;
  height: 69px;
  padding: var(--dl-space-space-unit);
  align-self: center;
  border-radius: 5%;
  background-color: aqua;
}

.home-text06 {
  padding: 25px;
  align-self: center;
  margin-left: 48px;
  border-radius: 20%;
  background-color: rgb(255, 228, 0);
}

.home-container09 {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-container10 {
  flex: 0 0 auto;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.home-select3 {
  width: 521px;
  height: 69px;
  padding: var(--dl-space-space-unit);
  align-self: center;
  border-radius: 5%;
  background-color: aqua;
}

.home-text08 {
  padding: 25px;
  align-self: center;
  margin-left: 48px;
  border-radius: 20%;
  background-color: rgb(255, 228, 0);
}

.home-sidebar {
  flex: 1;
  width: 333px;
  height: auto;
  display: flex;
  padding: var(--dl-space-space-twounits);
  position: relative;
  max-width: auto;
  min-width: auto;
  align-self: flex-end;
  max-height: 100%;
  min-height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #b1b1b1;
}

.home-text09 {
  top: 25%;
  left: 0px;
  right: 0px;
  margin: auto;
  position: absolute;
  text-align: center;
}

.home-text10 {
  padding: 24px;
  align-self: center;
  border-radius: 20%;
  background-color: rgb(255, 228, 0);
}
</style>
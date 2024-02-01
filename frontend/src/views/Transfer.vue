<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <nav>
      <router-link to="/league/myteam">My Team</router-link> |
      <router-link to="/league/transfer">Transfer</router-link> |
      <router-link to="/league/leaderboard">Leaderboard</router-link> |
      <router-link to="/league/standings">Standings</router-link> 
      <h3>{{ username }}</h3>
      <button @click=logout>Logout</button>
    </nav>
    <label v-if="cost>points">You have gone over budget</label>
    <label v-if="err">{{err}}</label>
    <label>My championship points: {{ points }}</label>
    <label>COST: {{ cost }} Championship points</label>
    <form @submit.prevent=transfer>
      <label>Driver you want to give away: </label>
      <select required name="driver1" id="drivers1" @change="changeEventd1" v-model="drivergive">
        <option v-for="driver in mydrivers" :value='driver'>{{ driver.name }}</option>
      </select>
      

      <label>Driver you want: </label>
      <select required name="driver2" id="drivers2" @change="changeEventd2" v-model="driverwant">
        <option v-for="driver in drivers" :value='driver'>{{ driver.name }}</option>
      </select> <br>

      <input type="submit">
    </form>
  </div> -->



  <div class="home-container">
    <header data-thq="thq-navbar" class="home-navbar-interactive">
      <div data-thq="thq-navbar-nav" class="home-desktop-menu">
        <nav class="home-links">
          <router-link class="home-text" to="/league/myteam">My Team</router-link> |
          <router-link class="home-text" to="/league/transfer">Transfer</router-link> |
          <router-link class="home-text" to="/league/leaderboard">Leaderboard</router-link> |
          <router-link class="home-text" to="/league/standings">Standings</router-link>
          <div class="home-text">
            <div class="home-login button">{{ username }}</div> <br>
            <button @click=logout>Logout</button>

          </div>
        </nav>
        <!-- <div class="home-buttons">
          <button  class="home-text">Login</button>
          <div > {{ username }}</div>
        </div> -->
      </div>
      <div data-thq="thq-burger-menu" class="home-burger-menu">
        <svg viewBox="0 0 1024 1024" class="home-icon">
          <path
            d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z">
          </path>
        </svg>
      </div>
      <!-- <div data-thq="thq-mobile-menu" class="home-mobile-menu">
        <div class="home-nav">
          <div class="home-top">
            <img
              alt="image"
              src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
              class="home-logo"
            />
            <div data-thq="thq-close-menu" class="home-close-menu">
              <svg viewBox="0 0 1024 1024" class="home-icon02">
                <path
                  d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                ></path>
              </svg>
            </div>
          </div>
          <nav class="home-links1">
            <span class="home-text04">About</span>
            <span class="home-text05">Features</span>
            <span class="home-text06">Pricing</span>
            <span class="home-text07">Team</span>
            <span class="home-text08">Blog</span>
          </nav>
          <div class="home-buttons1">
            <button class="home-login1 button">Login</button>
            <button class="button">Register</button>
          </div>
        </div>
        <div>
          <svg viewBox="0 0 950.8571428571428 1024" class="home-icon04">
            <path
              d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
            ></path></svg><svg viewBox="0 0 877.7142857142857 1024" class="home-icon06">
            <path
              d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
            ></path></svg><svg viewBox="0 0 602.2582857142856 1024" class="home-icon08">
            <path
              d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"
            ></path>
          </svg>
        </div>
      </div> -->
    </header>
    <form class="home-form" @submit.prevent=transfer>
      <button type="submit" class="home-button button">Submit</button>
      <label class="home-text09">
        <span>Driver you want to give away:</span>
        <br />
        <span><span v-html="raw1on1"></span></span>
      </label>
      <select class="home-select" required name="driver1" id="drivers1" @change="changeEventd1" v-model="drivergive">
        <option v-for="driver in mydrivers" :value='driver'>{{ driver.name }}</option>
      </select>
      <!-- <select class="home-select">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select> -->
      <select class="home-select1" required name="driver2" id="drivers2" @change="changeEventd2" v-model="driverwant">
        <option v-for="driver in drivers" :value='driver'>{{ driver.name }}</option>
      </select> <br>
      <!-- <select class="home-select1">
        <option value="Option 1">Option 1</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
        <option value="Option 3">Option 3</option>
      </select> -->
      <label class="home-text13">Driver you want:</label>
      <label class="home-text14">Cost: {{ cost }} Championship Points</label>
    </form>
    <div class="home-sidebar"><span class="home-text02">My Championship Points:</span><span
        class="home-text02">{{ points }}</span></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router'
import axios from 'axios'
let url = '/league/transfer/api'
export default {

  data() {
    return {
      mydrivers: [],
      drivers: [],
      username: "",
      driverwant: '',
      drivergive: '',
      giveprice: 0,
      wantprice: 0,
      cost: 0,
      points: 0,
      err: '',


    }
  },
  async created() {
    let auth = await axios.get('/authenticate/api');

    if (auth.data.msg === 'authenticated') {
      const fetch = await axios.get(url)
      this.mydrivers = fetch.data.mydrivers; //array of 2 driver obj
      this.drivers = fetch.data.drivers; //array of driver obj
      this.points = fetch.data.points;
      this.username = fetch.data.username;
    }
    else {
      console.log('not authenticated, illegal access');
      this.$router.push('/login');
    }



  },
  methods: {
    async transfer() {

      //handle case when driverwant is the other driver in mydrivers

      if (this.cost <= this.points && this.driverwant !== this.drivergive) {

        const res = await axios.post(url, {
          driverwant: this.driverwant,
          drivergive: this.drivergive,
          penalty: this.cost
        })

        this.$router.push('/league/myteam')

      }
      else {
        this.err = 'Issues with your form submission';
      }


    },
    changeEventd1() {
      console.log('changed1', this.drivergive)
      let temp = this.drivers.filter((ele) => {
        if (ele.name === this.drivergive.name) {
          this.giveprice = ele.price;
          return true;
        }
      })

      if (this.giveprice < this.wantprice) {
        this.cost = this.wantprice - this.giveprice
      }
      else {
        this.cost = this.giveprice - this.wantprice;
      }

    },
    changeEventd2(event) {
      this.drivers.filter((ele) => {
        if (ele.name === this.driverwant.name) {
          this.wantprice = ele.price;
          return true;
        }
      })
      if (this.giveprice < this.wantprice) {
        this.cost = this.wantprice - this.giveprice
      }
      else {
        this.cost = this.giveprice - this.wantprice;
      }
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

.home-navbar-interactive {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-space-space-twounits);
  padding-left: var(--dl-space-space-threeunits);
  padding-right: var(--dl-space-space-threeunits);
  padding-bottom: var(--dl-space-space-twounits);
  justify-content: space-between;
  background-color: #ff4a4a;
}

.home-desktop-menu {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.home-links {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.home-text {
  margin-left: 96px;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  margin-right: 96px;
}

.home-text01 {
  margin-left: 96px;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  margin-right: 96px;
}

.home-text02 {
  margin-left: 96px;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  margin-right: 96px;
  color: #01e7c0;
}

.home-text03 {
  margin-left: 96px;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  margin-right: 96px;
}

.home-buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.home-login {
  border-width: 0px;
  margin-right: var(--dl-space-space-twounits);
}

.home-burger-menu {
  display: none;
}

.home-icon {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
}

.home-mobile-menu {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: none;
  padding: 32px;
  z-index: 100;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
}

.home-nav {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.home-top {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-space-space-threeunits);
  justify-content: space-between;
}

.home-logo {
  height: 2rem;
}

.home-close-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-icon02 {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
}

.home-links1 {
  flex: 0 0 auto;
  display: flex;
  align-self: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.home-text04 {
  margin-bottom: var(--dl-space-space-unit);
}

.home-text05 {
  margin-bottom: var(--dl-space-space-unit);
}

.home-text06 {
  margin-bottom: var(--dl-space-space-unit);
}

.home-text07 {
  margin-bottom: var(--dl-space-space-unit);
}

.home-text08 {
  margin-bottom: var(--dl-space-space-unit);
}

.home-buttons1 {
  display: flex;
  margin-top: var(--dl-space-space-unit);
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.home-login1 {
  margin-right: var(--dl-space-space-twounits);
}

.home-icon04 {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
  margin-right: var(--dl-space-space-twounits);
}

.home-icon06 {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
  margin-right: var(--dl-space-space-twounits);
}

.home-icon08 {
  width: var(--dl-size-size-xsmall);
  height: var(--dl-size-size-xsmall);
}

.home-container1 {
  top: 260px;
  flex: 0 0 auto;
  left: 89px;
  width: 321px;
  height: 100px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  border-radius: 20px;
  justify-content: center;
  background-color: #01e7e7;
}

.home-text10 {
  align-self: center;
}

.home-text11 {
  color: aqua;
  align-self: center;
}

.home-container2 {
  top: 260px;
  flex: 0 0 auto;
  left: 488px;
  width: 321px;
  height: 100px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  border-radius: 20px;
  justify-content: center;
  background-color: #01e7e7;
}

.home-container3 {
  top: 437px;
  flex: 0 0 auto;
  left: 290px;
  width: 321px;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  height: 100px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  border-radius: 304px;
  justify-content: center;

  background-color: #3e3e3e;
}

.home-container4 {
  top: 636px;
  flex: 0 0 auto;
  left: 131px;
  width: 634px;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  height: 142px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  border-radius: 30px;
  justify-content: center;
  background-color: #01e7c0;
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
  background-color: #4b4b4b;
}

.home-text09 {
  top: 38px;
  left: 45px;
  position: absolute;
  font-size: 30px;
}

.home-select {
  top: 90px;
  left: 50px;
  width: 331px;
  position: absolute;
  font-size: 30px;
  border-radius: 10px;
  background-color: aqua;
}

.home-select1 {
  top: 226px;
  left: 48px;
  width: 331px;
  position: absolute;
  font-size: 30px;
  border-radius: 10px;
  background-color: aqua;
}

.home-text13 {
  top: 169px;
  left: 51px;
  position: absolute;
  font-size: 30px;
}

.home-text14 {
  top: 307px;
  left: 0px;
  right: 0px;
  margin: auto;
  position: absolute;
  background: #ffe400;
  padding-top: var(--dl-space-space-halfunit);
  padding-left: var(--dl-space-space-threeunits);
  border-radius: 15px;
  padding-right: var(--dl-space-space-threeunits);
  padding-bottom: var(--dl-space-space-halfunit);
  background-image: initial;
}

.home-form {
  top: 256px;
  left: 84px;
  width: 490px;
  height: 638px;
  display: flex;
  position: absolute;
}

.home-button {
  top: 403px;
  left: 170px;
  display: block;
  position: absolute;
  align-self: flex-start;
  box-shadow: rgb(212, 212, 212) 5px 5px 10px 0px;
  border-color: var(--dl-color-gray-black);
}

@media(max-width: 767px) {
  .home-navbar-interactive {
    padding-left: var(--dl-space-space-twounits);
    padding-right: var(--dl-space-space-twounits);
  }

  .home-desktop-menu {
    display: none;
  }

  .home-burger-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .home-text04 {
    margin-bottom: var(--dl-space-space-unit);
  }

  .home-text05 {
    margin-left: 0;
    margin-bottom: var(--dl-space-space-unit);
  }

  .home-text06 {
    margin-left: 0;
    margin-bottom: var(--dl-space-space-unit);
  }

  .home-text07 {
    margin-left: 0;
    margin-bottom: var(--dl-space-space-unit);
  }

  .home-text08 {
    margin-left: 0;
    margin-bottom: var(--dl-space-space-unit);
  }
}

@media(max-width: 479px) {
  .home-navbar-interactive {
    padding: var(--dl-space-space-unit);
  }

  .home-mobile-menu {
    padding: 16px;
  }
}</style>
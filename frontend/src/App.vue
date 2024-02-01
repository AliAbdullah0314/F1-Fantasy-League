<template>
  <router-view/>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <!-- <div>HELLO, welcome to the application</div>
  <router-link to="/register" tag="button">to register</router-link> -->



</template>

<script>
export default {
  async created(){
    //this.$router.push("/register/");
    this.$router.push(window.location.pathname);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #b94242;
}

img{
  max-width: 30%;
  max-height: 30%;
}
table{
  margin-left: auto;
  margin-right: auto;
}
td{
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
}
</style>

<template>
  <div id="app">
  <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'app',

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
body,html {
    margin: 0;
    padding: 0;
    font-family: 'Roboto Mono', monospace;
}
:root {
    --main-color: rgb(58, 2, 41);
    --light-color: rgb(122, 0, 112);
}

.loader {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 2;
}
#loading {
    text-align: center;
    font-size: 3rem;
    background: linear-gradient(45deg, #dd186a, rgb(209, 212, 24));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400% 400%;
    -webkit-animation: brandingAnim 2s ease-out infinite;
    animation: brandingAnim 2s ease-out infinite;
    font-weight: bolder;
    text-transform: uppercase;
}

.center-child {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.heading h1{
    font-size: 3rem;
    font-weight: bold;
}

.heading p {
    text-align: center;
    width: 90%;
    color: rgb(117, 117, 117);
    margin-bottom: 2rem;
    font-weight: bold;
}

.btn {
    cursor: pointer;
    background: gray;
    padding: 0.5rem 3.5rem;
    margin: 0.5rem;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    width: fit-content;
       

}

.game-btn {
    border-radius: 10px;
    border-bottom: 4px solid black;
    border:2px solid var(--main-color);
    box-shadow: 4px 4px 8px 0 rgba(44, 44, 44, 0.089);
}


.bluegrad {
    background-image: linear-gradient(to left, var(--light-color) 0%, var(--main-color) 100%);
    border-bottom: 4px solid var(--main-color);
    box-shadow: 3px 3px 0px 0px var(--main-color);
}


.bluegrad:hover {
    box-shadow: 0px 0px 0px 0px var(--main-color);
    transform: translateX(3px) translateY(3px);
}
.yellowgrad {
    background-image: linear-gradient(to right, #F9D423 0%, #FFE80B 100%);
    border-bottom: 4px solid #F9D423;
    border:2px solid #F9D423;
    box-shadow: 3px 3px 0px 0px #F9D423;
    color: black;
}
.yellowgrad:hover {
    box-shadow: 0px 0px 0px 0px #F9D423;
    transform: translateX(3px) translateY(3px);
}
.social-share {
    margin-top:2rem;
    margin-bottom:2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
}

.share {
    padding: 0.6rem;
    border-radius: 50%;
}

.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
}
.grad-text {
    background-image: linear-gradient(to left, var(--light-color) 0%, var(--main-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
      font-family: 'Poppins', sans-serif;
}



.header-game {
    width: 100vw;
    height: 70px;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    background-image: linear-gradient(to left, var(--light-color) 0%, var(--main-color) 100%);
}

.timmer {
    height: 70px;
    color: white;
    font-weight: bold;
    max-width: 100px;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.253);
    text-align: center;
    vertical-align: center;
}
.scorecard {
    justify-self: right;
}
.big-text {
    font-size: 4rem;
    text-align: center;
    font-weight: bold;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
}


.jumbo-text {
    margin: 0rem;
    font-size: 6rem;
    text-align: center;
    font-weight: bold;
}

.emotion {
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 2rem;

}

.orangegrad {
    background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
    border-bottom: 4px solid #f83600;
    border:2px solid #f83600;
    box-shadow: 3px 3px 0px 0px #f83600;
}

.orangegrad:hover {
    box-shadow: 0px 0px 0px 0px #f83600;
    transform: translateX(3px) translateY(3px);
}
.round-button {
    border-radius: 50%!important;
    height: 70px;
    width: 70px;
    padding: 0;
    justify-content: center;
}
.timmer-progress {
    height: 10px;
    width:100vw;
    position: fixed;
    bottom: 0px;
    transition:  3s width;
    background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);

}
/* 
    ##Device = Laptops, Desktops
    ##Screen = B/w 1025px to 1280px
  */
@media (min-width: 1025px) {
    .heading h1 {
        font-size: 6rem;
        margin: 1rem;
    }
    .heading p {
        font-size: 2rem;
        max-width: 800px;
        margin-bottom: 4rem;
    }
}
</style>

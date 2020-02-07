<template>
  <div class="home page">

    <div v-if="showModal" @close="showModal = false">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header"><div class="grad-text big">Help</div></slot>
              </div>

              <div class="modal-body">
                <slot
                  name="body"
                >
                1. Hit Play button <br/>
                2. Start Recording <br/>
                3. Say word  under 3 secs.<br/>
                4. Share & enjoy 🎊
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <div class="modal-default-button  btn game-btn bluegrad noselect" v-on:click="showModal = false">CLOSE</div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showPrivacy">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header"><div class="grad-text big">Privacy</div></slot>
              </div>

              <div class="modal-body">
                <slot
                  name="body"
                >
              We will collect your audio samples, the words you speak, they will be used for curating a dataset.
              You can read the <a href="https://docs.google.com/document/d/19-rTKKbfs5MJ2r_b7elvF7UQ27tGvnkWkflnFQ0VvQY/edit?usp=sharing" target="_blank" >privacy policy</a>.
              <br/>
              here is a <a href="https://youtu.be/5d8RA3fBAa0" target="_blank"> demo video</a>
                </slot>
              </div>
              <p><strong>Please provide the required information below</strong></p>
              <form action="#" @submit.prevent="privacysubmit">
                <input type="name" required v-model="name" placeholder="your name" class="form-control form">
                <input type="email" required v-model="email" placeholder="your email" class="form-control form">
                <select name="gender" v-model="gender" required class="form">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
                <select name="batches" v-model="batches" required class="form">
                  <option value="house" selected>house</option>
                  <option value="roadside">roadside</option>
                  <option value="park">park</option>
                  <option value="transport">transport</option>
                   <option value="mall">mall</option>
                   <option value="market">market</option>
                </select>


              <p style="font-size: 0.7rem"><em>By clicking "I agree". You agree with our privacy policy. The personal information collected above is for internal use only. It will not be released in public and will be kept confidential</em></p>
                  <div class="modal-footer">
                    <slot name="footer">
                      <button type="submit" class="modal-default-button btn game-btn bluegrad noselect">
                      I agree
                    </button>
                    </slot>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>

      <div class="heading center-child">
        <h1 class="grad-text">QuickSpeech v2 </h1>
        <p>How many words can you say in 3 min in different emotions</p>
      </div>
      <div class="menu center-child">

        <!--<router-link to="/play" class="no-deco">-->
          <div class="btn game-btn bluegrad noselect" @click="togglePrivacy">
            PLAY
          </div>
        <!--</router-link>-->
        <div class="btn game-btn bluegrad noselect" v-on:click="showModal = true" >
          HELP
        </div>
        <div class="social-share">
          <div class="share circle twitter bluegrad">
            <a class="nodeco" href="http://twitter.com/share?text=I have played quickspeech, play and help in collecting dataset&url=http://quickspeech-in.web.app&hashtags=quickspeech,womenesafety,datasetcollection" target="_blank">
            <img src="../../assets/TwitterLogo.png" class="noselect" />
            </a>
          </div>
          <div class="center-child share circle Facebook bluegrad">
              <a class="nodeco" href="            https://www.facebook.com/sharer/sharer.php?u=http://quickspeech-in.web.app?share=1" target="_blank">
              <img src="../../assets/facebook.png" class="noselect"/>
            </a>
          </div>
        </div>
        <div class="score-card center-child">
          <h1 class="noselect">HIGHEST SCORE</h1>
          <div class="btn game-btn yellowgrad noselect">
            SCORE: {{gethighscore}}
          </div>
        </div>
        <div> <a href="mailto:aniket965.as@gmail.com" target="_blank" > Report bug 👾 </a> </div>
     
      </div>
    </div>
</template>

<script>
export default {
  name: 'StartPage',
  data() {
    return {
        showModal:false,
        viewPrivacy: false,
        privacyAgreed: false,
        gender: 'male',
        email: null,
        name:null,
        batches:'house',

    }
  },
  methods: {
     track() {
      this.$ga.page("/gamepage");
    },

    privacysubmit() {
        this.privacyAgreed=true
        window.email = this.email
        window.gender = this.gender
        window.batches = this.batches
        window.studentname = this.name
        this.$router.push("/play")

    },


  togglePrivacy() {
      this.viewPrivacy = true
      if(this.privacyAgreed === true){
          this.$router.push("/play")
      }
  },

  },
  computed: {
    gethighscore() {
      return localStorage.getItem('score')  !== null ? localStorage.getItem('score') : 0
    },


    showPrivacy() {
        return this.privacyAgreed === false && this.viewPrivacy===true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no-deco {
  color: white;
  text-decoration: none;
}

.form {
  width: 100%;
}
</style>

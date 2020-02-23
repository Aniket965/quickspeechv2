<script type="text/x-template" id="modal-template">
</script>

<template>
  <div class="game page">
    <div v-if="showModal" @close="showModal = false;">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  <div class="grad-text big">QuickSpeech</div>
                </slot>
              </div>

              <div class="modal-body">
                <slot
                  name="body"
                >Thank you for contributing the audios, Please share this as much as you can</slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  Score: {{score}}
                  <div
                    class="modal-default-button btn game-btn bluegrad noselect"
                    v-on:click="close"
                  >CLOSE</div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="header-game">
      <div class="timmer noselect" id="gametimmer">3:00</div>
      <div class="btn game-btn yellowgrad scorecard noselect">SCORE: {{score}}</div>
    </div>
    <div class="center-child">
      <div class="game-text" style="width: 80%;">
        <h1 style="margin-top:2rem;" class="noselect">Press record and say,</h1>
        <div class="grad-text big-text noselect" id="keyword">loading.</div>
        <div class="center-child emotion noselect" id="emotion">...</div>
        <div class="center-align jumbo-text noselect" id="emoji">.</div>
      </div>
      <div
        style="margin-top: 3rem;"
        class="btn game-btn center-child orangegrad scorecard round-button"
      >
        <img class="noselect" src="../../assets/mic.png" id="record" v-on:click="onRecordClicked" />
      </div>
    </div>

    <div class="timmer-progress stick-bottom" id="progressbar"></div>

    <div id="audio" class="mx-auto" style="display: none"></div>
  </div>
</template>

<script>
import AudioRecorder from "../../scripts/recorder.js";
import makeKeywordPattern from "../../scripts/datasetgen.js";
import FireBaseUploader from "../../scripts/firebaseuploader";

function progress(time, currentTime) {
  if (currentTime > time) return;
  setTimeout(() => {
    // let progressbar = document.getElementById("progressbar");
    // progressbar.style.width = `${((time - currentTime) / time) * 100}vw`;
    progress(time, currentTime + 10);
  }, 10);
}

function gametime(time, currentTime, that, ispause = false) {
  if (currentTime > time) {
    that.showModal = true;
    that.gameOver = true;
    return;
  }

  setTimeout(() => {
    let timmer = document.getElementById("gametimmer");
    let timeleft = (time - currentTime) / 1000;
    timmer.innerHTML = `${Math.floor(timeleft / 60) + ":" + (timeleft % 60)}`;
    gametime(time, currentTime + 1000, that);
  }, 1000);
}

export default {
  name: "GamePage",
  data() {
    return {
      gameStarted: false,
      score: 0,
      recorder: null,
      showModal: false,
      gameOver:false,
    };
  },

  methods: {
    close: function() {
     this.showModal = false;
     window.location.href = "/";
    },
    onRecordClicked: function() {
      this.gameOver = false;
      this.recorder.start(3000);
      progress(3200, 0);
      let progressbar = document.getElementById("progressbar");
      progressbar.style.width = `0vw`;
      setTimeout(() => {
        this.recorder.stop();
        let progressbar = document.getElementById("progressbar");
        progressbar.style.width = `100vw`;
        if(!this.gameOver) this.score += 1;
        if (localStorage.getItem("score")) {
          if (this.score > localStorage.getItem("score")) {
            localStorage.setItem("score", this.score);
          }
        } else {
          localStorage.setItem("score", this.score);
        }
      }, 3500);
    },
    track() {
      this.$ga.page("/gamepage");
    }
  },
  mounted() {
    gametime(180000, 0, this);
    let recorder = new AudioRecorder();
    let recordings = {};
    // When stop is pressed, a recording is available
    recorder.onAudioAvailable = function(blob) {
      let wav = URL.createObjectURL(blob);
      let audioId = Math.floor(Date.now());
      let audio = document.createElement("audio");
      audio.src = wav;
      audio.setAttribute("controls", "true");
      audio.id = audioId;
      audio.style = "display: block";
      audio.className = "mx-auto";

      if (!recorder.disabled) {
        return;
      }
      let el = document.getElementById("audio");
      el.insertBefore(audio, el.childNodes[0] || null);

      var label =
        window.currentKeywords[0] +
        "-safe-" +
        window.currentKeywords[1] +
        "-"+
        audioId +
        "-" +
        window.studentname +
        "-" +
        window.email +
        "-" +
        window.gender +
        "-"+
        window.batches +
        "-" + 
        ".wav";

      // It keep tracks of all uploads
      FireBaseUploader.uploadWebAudioBlob(blob, label);
    };

    // if set to disabled or enabled
    recorder.onStateChanged = function(disabled) {
      if (!disabled) {
        makeKeywordPattern(tospeak => {
          var k = document.getElementById("keyword");
          var e = document.getElementById("emotion");
          let emoji = document.getElementById("emoji");
          k.style.opacity = 0;
          e.style.opacity = 0;
          k.style.webkitBackfaceVisibility ="visible";
          e.style.webkitBackfaceVisibility ="visible";
          
          emoji.style.opacity = 0;
          setTimeout(
            (k, e) => {
              k.innerHTML = tospeak[0];
              e.innerHTML = tospeak[1];
              emoji.innerHTML = tospeak[2];
              k.style.opacity = 1;
              e.style.opacity = 1;
              k.style.webkitBackfaceVisibility ="visible";
              e.style.webkitBackfaceVisibility ="visible";
              emoji.style.opacity = 1;
            },
            300,
            k,
            e
          );
        });
        document.getElementById("record").removeAttribute("disabled");
      } else {
        document.getElementById("record").setAttribute("disabled", "true");
      }
    };

    recorder.init();
    this.recorder = recorder;
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.big {
  font-size: 2rem;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
</style>

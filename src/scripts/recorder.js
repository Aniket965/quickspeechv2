/**
 *
 * @param sample The sampleRate to record with
 * @param noise boolean
 * @param echo boolean
 * @constructor
 */
function AudioRecorder(sample, noise, echo){

    this.opts = {
        video: false,
        audio: {
            channelCount: 1,
            echoCancellation: echo || true,
            noiseSuppression: noise || true,
            sampleRate: sample || 16000,
            volume: 1
        }
    }

    this.disabled = true
    this.btnDisabled = false
    this.recorder = null
    this.onStateChanged = null
    this.onAudioAvailable = null


    /**
     *  Initializes the Audio Recorder
     */
    this.init = function(auto) {

        var recorder;
        var that = this
        navigator.mediaDevices.getUserMedia(
            this.opts
        ).then(function(stream){

            recorder = RecordRTC(stream, {
                type: 'audio',
                mimeType: 'audio/wav',
                recorderType: StereoAudioRecorder,
                timeSlice: 3200,
                disableLogs: false,
                ondataavailable: function(e){
                    that.recordAvailable(e, that)
                },
                desiredSampRate: 16000,
                numberOfAudioChannels: 1

            });
            // recorder = new MediaRecorder(stream, {mimeType: "audio/webm;codecs=pcm"})
            // recorder.ondataavailable = function(e){
            //     that.recordAvailable(e, that)
            // }

            setTimeout(function(){
                window.mrecorder = recorder
                that.toggleDisabled()
            }, 1000)
        }).catch(function(e) {
            console.log('No live audio input: ' + e);
        });

    }

    this.toggleDisabled = function(){

        this.disabled = !this.disabled;
        if(this.onStateChanged){
            this.onStateChanged(this.disabled);
        }
    }

    this.start = function (timeslice) {
        if(this.disabled) return


        this.disabled = true
        if(this.onStateChanged){
            this.onStateChanged(this.disabled)
        }

        window.mrecorder.reset()
        window.mrecorder.startRecording()
        // window.mrecorder.start(timeslice)
        console.log('recording...')

    }

    this.stop = function () {

        // triggers ondataavailable for the recorder
        window.mrecorder.stopRecording()
        // window.mrecorder.stop()
        console.log('stopped recording')

    }

    this.recordAvailable = function(blob, that) {
        console.log("Data Available")

        let data = blob;

        if(that.onAudioAvailable){
            that.onAudioAvailable(data)
        }

        that.disabled = false
        if(that.onStateChanged){
            that.onStateChanged(that.disabled)
        }

    }


}

export default AudioRecorder;
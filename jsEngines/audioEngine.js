function audioStart(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    var aCtx;
    var analyser;
    var microphone;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
          audio: {
            latency: 0.003,
            echoCancellation: false,
            mozNoiseSuppression: false,
            mozAutoGainControl: false
          }
        },
        function(stream) {
          aCtx = new AudioContext();
          microphone = aCtx.createMediaStreamSource(stream);
          var destination = aCtx.destination;
          microphone.connect(destination);
        },
        function() {
          console.log("Error 003 - Chrome didn't allowed MIC Usage")
        }
      );
    }
    }
    
    audioStart();
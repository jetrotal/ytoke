document.getElementById("player").style.opacity = "0";
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

var url_string = window.location.href
var url = new URL(url_string);

var videosParam = url.searchParams.get("v");

var videosList = videosParam.split('@@@');
var videoIndex = url.searchParams.get("i");


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
console.log("\n" + window.location.host + "\n")


var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: vh,
        width: '100%',
        videoId: videosList[videoIndex],
        playerVars: { 'autoplay': 1, 'controls': 0, 'enablejsapi': 1, 'origin': window.location.host },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.playVideo();
}



function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.UNSTARTED) {
        if (videoIndex <= videosList.length) {
            window.location.replace("player.html?i=" + (parseInt(videoIndex) + 1) + "&v=" + videosParam);
        } else {
            window.location.replace("status.html?text=Music Not Found&color=red");
        }
    }
    if (event.data == YT.PlayerState.PLAYING) {
        document.getElementById("player").style.opacity = "100";
    }
    if (event.data == YT.PlayerState.ENDED) {
        window.location.replace("status.html?text=Choose Next Song&color=white");
    }
}

function stopVideo() {
    player.stopVideo();
}
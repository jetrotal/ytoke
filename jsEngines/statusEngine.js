function init() {
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var url_string = window.location.href;
    var url = new URL(url_string);

    var txtStatus = url.searchParams.get("text");
    var txtColor = url.searchParams.get("color");

    content = document.getElementById("content");

    if (txtStatus == " - ") txtStatus = "YTOKÊ v0.7",
        txtColor = "white";

    content.innerHTML = txtStatus;
    content.style.color = txtColor;
    content.style.height = vh;
    content.style.width = vw;
}
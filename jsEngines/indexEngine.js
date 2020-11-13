var iframe
$(document).ready(function () {


    function showInputs(e) {
        if (iframe.src.includes("status.html") && e != 27)
            iframe.src = "status.html?text=" + document.getElementById("bandInput").value + " - " + document.getElementById("songInput").value + "&color=yellow";
    }
    function clearInputs() {
        document.getElementById("bandInput").value = "";
        document.getElementById("songInput").value = "";
        document.getElementById("bandInput").focus();
    }

    iframe = document.getElementById("iFrame");


    document.onkeyup = function (e) {
        if (document.getElementById("songInput") != document.activeElement)
            document.getElementById("bandInput").focus();
        showInputs(e.keycode)
    };
    $("input").keyup(function (event) {

        if (event.keyCode === 13) { //if enter
            if (document.getElementById("bandInput") != document.activeElement)
                $("#searcher").click()
            else document.getElementById("songInput").value += " ", document.getElementById("songInput").focus();

        }
        if (event.keyCode === 27) { // if esc
            $("#stopper").click();
        }
    });

    $("#stopper").click(function () {
        iframe.src = "status.html?text=Song Skipped<p style='font-size: 25px;font-weight: normal;color=white'>Choose Another Song&color=pink";
        clearInputs();

    });

    $("#searcher").click(async function () {

        if ((!document.getElementById("bandInput").value || document.getElementById("bandInput").value == " ") && (!document.getElementById("songInput").value || document.getElementById("songInput").value == " ")) {
            document.getElementById("bandInput").value = "";
            document.getElementById("songInput").value = "";
            return document.getElementById("bandInput").focus();
        }

        var nameValue = document.getElementById("bandInput").value
            + document.getElementById("songInput").value
            + searchTerms;

        clearInputs();

        var CSEjson = "";
        var CSE = "";

        async function checkEngine(engine, i) {
            const response = await fetch(engine);
            CSEjson = await response.json();
            CSE = await "" + Object.keys(CSEjson)[0];


        }

        for (i = 0; i < engines.length; i++) {
            try {
                await checkEngine(engines[i] + nameValue, i);
            } catch (e) { CSE = "timeout" }
            console.log("Search Engine " + i + ": " + CSE);

            if (CSE != "error") {
                console.log("JSON " + JSON.stringify(CSEjson));
                break;
            }
        }
        if (CSE == "error") return iframe.src = "status.html?text=Music Download Limit Reached&color=red";
        if (CSE == "undefined") return iframe.src = "status.html?text=Music Not Found&color=red";
        if (CSE == "timeout") return iframe.src = "status.html?text=Service Offline<p style='font-size: 10px'>Check your Internet&color=red";

        //$.get(engines[2] + nameValue, function (data, status) {

        var v = "";
        for (i = 0; i < CSEjson.items.length; i++) {
            v += CSEjson.items[i].link.split('?v=')[1] + "@@@";
        }
        v = v.slice(0, -3);

        iframe.src = "player.html?i=0&v=" + v;

        //});
    });
});

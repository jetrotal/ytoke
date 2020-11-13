(function ($) {
    'use strict';

    function handleAutocompleteChoice(e, ui) {
        var d = ui.item;
        d.artist = d.artist.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^\]]*]/, '');
        if (iframe.src.includes("status.html") && e != 27)
        iframe.src = "status.html?text=" + d.artist + " - " + document.getElementById("songInput").value + "&color=yellow";

    }

    function handleAutocompleteChoice2(e, ui) {
        var d = ui.item;
        d.musicTitle = d.musicTitle.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^\]]*]/, '');
        if (iframe.src.includes("status.html") && e != 27)
        iframe.src = "status.html?text=" + document.getElementById("bandInput").value+ " - " + d.musicTitle + "&color=yellow";

    }

    $(document).ready(function () {
        var acOptions = {
            callback: handleAutocompleteChoice,
            modules: ['artist'],
            apiKey: 'a603101296f5b0e49086f7951dcede4f'
        };
        var acOptions2 = {
            callback: handleAutocompleteChoice2,
            modules: ['album'],
            apiKey: 'a603101296f5b0e49086f7951dcede4f',
            parent: 'bandInput'
        };


        $('#bandInput').lfmComplete(acOptions);
        $('#songInput').lfmComplete2(acOptions2);
    });
}(jQuery));
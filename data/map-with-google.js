self.on('context', function(){

    var text = wrapText(getSelectedText());

    return text === null || text === '' ?
        false :
        'Search Google Maps for "' + text + '"';

});

self.on('click', function(){

    // Using plain old window.open() here because I couldn't find a way to open this
    // right next to the current tab using sdk/tabs.
    window.open('http://maps.google.com/maps?q=' + encodeURIComponent(getSelectedText()));

});

function getSelectedText(){

    return window.getSelection().toString().trim();

}

function wrapText(text){

    // Google Search wraps the text at 15 characters,
    // so we will match that for consistency.
    var s = text.substr(0, 15);

    if (s.length !== text.length)
        s += '...';

    return s;

}
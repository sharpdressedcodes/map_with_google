self.on('context', function(node){

    var text = wrapText(getSelectedText());

    return text === null || text === '' ?
        false :
        '____Search Google Maps for "' + text + '"';

});

self.on('click', function(){
    self.postMessage(getSelectedText());
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
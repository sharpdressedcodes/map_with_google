var { Ci } = require('chrome');
var contextMenu = require('sdk/context-menu');
var windowUtils = require('sdk/window/utils');
var self = require('sdk/self');

var menuItem = contextMenu.Item({
    accesskey: 'G',
    label: 'Search Google Maps',
    image: self.data.url('map-with-google-16.png'),
    context: contextMenu.SelectionContext(),
    contentScriptFile: self.data.url('map-with-google.js'),
    onMessage: function(text){
        var browser = getBrowser();
        if (browser !== null){
            var tab = browser.addTab('http://maps.google.com/maps?q=' + encodeURIComponent(text), {
                relatedToCurrent: true
            });
        }
    }
});

function getBrowser(){

    var result = null;
    var window = windowUtils.getMostRecentBrowserWindow();

    if (typeof gBrowser === 'undefined'){
        var mainWindow = window.QueryInterface(Ci.nsIInterfaceRequestor)
            .getInterface(Ci.nsIWebNavigation)
            .QueryInterface(Ci.nsIDocShellTreeItem)
            .rootTreeItem
            .QueryInterface(Ci.nsIInterfaceRequestor)
            .getInterface(Ci.nsIDOMWindow);
        result = mainWindow.gBrowser;
    } else {
        result = gBrowser;
    }

    return result;

}

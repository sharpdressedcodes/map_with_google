var contextMenu = require('sdk/context-menu');
var self = require('sdk/self');

var menuItem = contextMenu.Item({
    accesskey: 'G',
    label: 'Search Google Maps',
    image: self.data.url('map-with-google-16.png'),
    context: contextMenu.SelectionContext(),
    contentScriptFile: self.data.url('map-with-google.js')
});

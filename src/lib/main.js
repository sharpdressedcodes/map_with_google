'use strict';

const MAPS_URL = 'http://maps.google.com/maps?q=';
const MENU_LABEL = '____Search Google Maps';
const MENU_ACCESS_KEY = 'G';
const MENU_IMAGE = 'map-with-google-16.png';
const MENU_SCRIPT = 'map-with-google.js';

var { Ci } = require('chrome');
var { viewFor } = require('sdk/view/core');
var contextMenu = require('sdk/context-menu');
var windowUtils = require('sdk/window/utils');
var self = require('sdk/self');
var windows = require('sdk/windows').browserWindows;
var HookedContextMenu = require('./HookedContextMenu');

var menus = [];
var menuItem = null;
var active = false;
var menuItemOptions = {
    accesskey: MENU_ACCESS_KEY,
    label: MENU_LABEL,
    image: self.data.url(MENU_IMAGE),
    context: contextMenu.SelectionContext(),
    contentScriptFile: self.data.url(MENU_SCRIPT),
    onMessage: function(text){
        var browser = getBrowser();
        if (browser !== null){
            var tab = browser.addTab(MAPS_URL + encodeURIComponent(text), {
                relatedToCurrent: true
            });
        }
    }
};

windows.on('activate', onActivateWindow);
windows.on('close', onCloseWindow);

function onActivateWindow(window){

    var w = viewFor(window);
    var b = false;

    if (active){
        for (var i = 0, i_ = menus.length; i < i_ && !b; i++){
            if (menus[i].window === w){
                b = true;
            }
        }

        if (!b){
            menus.push(new HookedContextMenu(viewFor(window), menuItemOptions.label));
        }
    }

}

function onCloseWindow(window){

    var w = viewFor(window);

    for (var i = 0, i_ = menus.length; i < i_; i++){
        if (menus[i].window === w){
            menus[i].unhookContextMenu();
            menus.splice(i, 1);
            break;
        }
    }
}

function getBrowser(){

    var result = null;

    if (typeof gBrowser === 'undefined'){
        result = getMainWindow().gBrowser;
    } else {
        result = gBrowser;
    }

    return result;

}

function getMainWindow(){

    var window = windowUtils.getMostRecentBrowserWindow();

    return window.QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIWebNavigation)
        .QueryInterface(Ci.nsIDocShellTreeItem)
        .rootTreeItem
        .QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIDOMWindow);

}

exports.main = function(options, callbacks){

    /*install
     enable
     startup
     upgrade
     downgrade*/

    //switch (options.loadReason){
    //    case 'install':
    //    case 'enable':
    //    case 'startup':
    //    case 'upgrade':
    //    case 'downgrade':
    //}

    active = true;
    menuItem = contextMenu.Item(menuItemOptions);
    menus.push(new HookedContextMenu(getMainWindow().window, MENU_LABEL));

};

exports.onUnload = function(reason){

    /*uninstall
     disable
     shutdown
     upgrade
     downgrade*/

    //switch (reason){
    //    case 'uninstall':
    //    case 'disable':
    //    case 'shutdown':
    //    case 'upgrade':
    //    case 'downgrade':
    //}

    active = false;
    menuItem = null;
    menus = [];

};
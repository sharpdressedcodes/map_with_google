'use strict';

function HookedContextMenu(window, label){

    this.window = window;
    this.label = label;
    this.contextMenu = window.document.getElementById('contentAreaContextMenu');

    this.hookContextMenu();

}
HookedContextMenu.prototype.hookContextMenu = function(){

    if (this.contextMenu !== null){
        this.contextMenu.addEventListener('popupshowing', this.onPopupShowing.bind(this), false);
    }

};
HookedContextMenu.prototype.unhookContextMenu = function(){

    if (this.contextMenu !== null){
        this.contextMenu.removeEventListener('popupshowing', this.onPopupShowing);
    }

};
HookedContextMenu.prototype.onPopupShowing = function(){

    var els = [].slice.call(this.contextMenu.getElementsByTagName('menuitem'));
    var old = this.window.document.getElementById('context-searchselect');

    for (var i = 0, i_ = els.length; i < i_; i++){

        var item = els[i];
        var label = item.getAttribute('label');

        if (label.indexOf(this.label) === 0){
            item.setAttribute('label', label.replace(/_/g, ''));
            if (item !== old.nextSibling){
                item.parentNode.removeChild(item);
                old.parentNode.insertBefore(item, old.nextSibling);
            }
            break;
        }
    }

};

module.exports = HookedContextMenu;
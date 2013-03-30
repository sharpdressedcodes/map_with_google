
var suricattagmap = new Object();

suricattagmap.default_menutext='';

suricattagmap.locateOnGMap = function(){

  var textSelection=content.window.getSelection().toString();

	if (textSelection!=''){
		var url='http://maps.google.com/maps?q='+escape(textSelection);

		/*
		 relatedToCurrent:true means the new tab will open up
		 straight after the current tab - remove to open at end of tabs
		*/

		var tab = getBrowser().addTab(url,{relatedToCurrent:true});
		getBrowser().selectedTab = tab;
	}
}

window.addEventListener("load", suricattagmap.gmapInit, true);

window.addEventListener("contextmenu", function(e) {
    var menu = document.getElementById('suricattagmap');

    if (suricattagmap.default_menutext=='')
      suricattagmap.default_menutext=menu.getAttribute('label');

    var textSelection=content.window.getSelection().toString();
    var compactedText=textSelection.substr(0,15);

    if (compactedText.length!=textSelection.length)
      compactedText+='...';

    menu.hidden=(textSelection.length==0);

    if (!menu.hidden && suricattagmap.default_menutext!='')
      menu.setAttribute('label',suricattagmap.default_menutext+'"'+compactedText+'"');

}, false);

// hides the item when appropriate (use same logic as for Back, Stop etc.)
// script written by Stephen Clavering, used in his goHome extension

suricattagmap.gmapInit = function() {
  document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",suricattagmap.gmapHide,false);
  var menu=document.getElementById('suricattagmap');
  if (suricattagmap.default_menutext=='')
    suricattagmap.default_menutext=menu.getAttribute('label');
}

suricattagmap.gmapHide = function() {
  var cm = gContextMenu;
  document.getElementById("suricattagmap").hidden = !cm.isTextSelected;
}

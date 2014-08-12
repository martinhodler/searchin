/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        Dialogs        = brackets.getModule("widgets/Dialogs"),
        PopUpManager   = brackets.getModule("widgets/PopUpManager"),
        NativeApp      = brackets.getModule("utils/NativeApp"),
        EditorManager  = brackets.getModule("editor/EditorManager");

    
    
    function searchMDN() {
        var editor = EditorManager.getCurrentFullEditor();
        if (editor.hasSelection()) {
            var text = editor.getSelectedText();
            NativeApp.openURLInDefaultBrowser("https://developer.mozilla.org/search?q=" + text);
        }
    }
    
    function searchWebPlatform() {
        var editor = EditorManager.getCurrentFullEditor();
        if (editor.hasSelection()) {
            var text = editor.getSelectedText();
            NativeApp.openURLInDefaultBrowser("http://docs.webplatform.org/w/index.php?search=" + text);
        }
    }

    var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    menu.addMenuDivider(Menus.LAST, Menus.LAST);      
    
    var SEARCHIN_MDN = "searchin.MDN";   
    CommandManager.register("Search in MDN", SEARCHIN_MDN, searchMDN);
    menu.addMenuItem(SEARCHIN_MDN);
    
    var SEARCHIN_WEBPLATFORM = "searchin.WebPlatform";
    CommandManager.register("Search in WebPlatform", SEARCHIN_WEBPLATFORM, searchWebPlatform);
    menu.addMenuItem(SEARCHIN_WEBPLATFORM);
});
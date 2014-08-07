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

    
    // Function to run when the menu item is clicked
    function searchMDN() {
        var editor = EditorManager.getCurrentFullEditor();
        if (editor.hasSelection()) {
            var text = editor.getSelectedText();
            NativeApp.openURLInDefaultBrowser("https://developer.mozilla.org/search?q=" + text);
        }
    }


    // First, register a command - a UI-less object associating an id to a handler
    var HELPSEARCH_MDN = "helpsearch.MDN";   // package-style naming to avoid collisions
    CommandManager.register("Search in MDN", HELPSEARCH_MDN, searchMDN);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    menu.addMenuDivider(Menus.LAST, Menus.LAST);      
    var item = menu.addMenuItem(HELPSEARCH_MDN);

    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, XMLHttpRequest */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus"),
        PanelManager   = brackets.getModule("view/PanelManager"),
        NativeApp      = brackets.getModule("utils/NativeApp"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        EditorManager  = brackets.getModule("editor/EditorManager");

    
    ExtensionUtils.loadStyleSheet(module, "style.css");
    
    var SEARCHIN_PANEL = "searchin-panel";
    var searchPanel = $('<div id="'+SEARCHIN_PANEL+'"></div>');
    var panel = PanelManager.createBottomPanel(SEARCHIN_PANEL, searchPanel);
    
    
    function createListMDN(dom, html) {
        
        var container = $(".search-results-container", dom).get(0);

        if ($(".column-container", container).size() > 0) {
            $(".column-container", container).each(function() {
                // Link
                var link = $(this).find("h4").html();

                // Description
                var description = $(this).find("p").html();

                html += '<div class="searchin-item"><div class="searchin-item-title">'+link+'</div><div class="searchin-item-description">'+description+'</div></div>';
            });
        } else {
            html += '<div class="searchin-noresult">No results</div>';
        }
        
        return html;
    }
    
    function createListWebPlatform(dom, html) {
        
        var container = $(".mw-search-results", dom).first();

        if ($(container).children("li").size() > 0) {
            $(container).children("li").each(function() {
                // Link
                var a = $(this).find(".mw-search-result-heading a");
                var link = '<a href="http://docs.webplatform.org'+$(a).attr('href')+'" title="'+$(a).attr('title')+'">'+$(a).html()+'</a>';

                // Description
                var description = $(this).find(".searchresult").html();

                html += '<div class="searchin-item"><div class="searchin-item-title">'+link+'</div><div class="searchin-item-description">'+description+'</div></div>';
            });
        } else {
            html += '<div class="searchin-noresult">No results</div>';
        }
        
        return html;
    }
    

    
    
    function search(url, title, createListCB) {
        var editor = EditorManager.getCurrentFullEditor();
        
        if (editor.hasSelection()) {
            var text = editor.getSelectedText(),
                xhr = new XMLHttpRequest();
            
            url = url + text;
            
            xhr.open('GET', url, false);
            xhr.send(null);
            
            var dom = $(xhr.responseText);
            
            var html = '<div class="searchin-toolbar"><a href="#" class="searchin-close">&times;</a><div class="searchin-search">Search "'+text+'" on '+title+'</div>';
            html += '<a href="'+url+'" class="searchin-more">More on '+title+'</a>';

            html += '</div><div class="searchin-results">';
            

            html = createListCB(dom, html);
            
            
            html += "</div>";
            
            panel.$panel.html(html);
            
            $(".searchin-close", panel.$panel).click(function() { panel.hide(); });
            
            panel.show();
        }
    }
    
    
    function searchMDN() {
        search("https://developer.mozilla.org/search?q=", "MDN", createListMDN);
    }
    
    function searchWebPlatform() {
        search("http://docs.webplatform.org/w/index.php?search=", "WebPlatform", createListWebPlatform);
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
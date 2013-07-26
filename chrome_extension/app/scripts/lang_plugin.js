/**
 * Given a mimetype "x" and a run function, executes the scripts inside tags like:
 * <script src="something" type="x">Your script</script>
 */
var langPlugin = {};

langPlugin.runLang = function(lang_eval, mimetype, container) {
    // Given a function that can eval a particular language,
    // and the appropriate mime type, run all of that type of script in the page
    // or, optionally, a given container.
    container = container || document.documentElement;
    var i, script,
        scriptElements = langPlugin.getScriptsForMimeType(mimetype, container);

    for (i=0; i<scriptElements.length; i++) {
        script = langPlugin.getScriptText(scriptElements[i]);
        lang_eval(script);
    }
};

langPlugin.getScriptsForMimeType = function(mimetype, container) {
    // Find all script tags with a given MIME type.
    var scripts = container.getElementsByTagName('script');
    var validScripts = [];

    for (var i=0; i< scripts.length; i++) {
        if (scripts[i].type === mimetype) {
            validScripts.push(scripts[i]);
        }
    }
    return validScripts;
};

langPlugin.getFile = function(href){
    // Synchronously fetch a file from server to client.
    var AJAX = new XMLHttpRequest();
    AJAX.open("GET", href, false);
    AJAX.send(null);
    return AJAX.responseText;
}

langPlugin.getScriptText = function(scriptElement) {
    // Get the source code for a script tag, whether inline or sourced.
    if (scriptElement.src) {
        return langPlugin.getFile(scriptElement.src);
    } else {
        return scriptElement.text;
    }
}

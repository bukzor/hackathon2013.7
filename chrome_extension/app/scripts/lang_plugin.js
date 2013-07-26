/**
 * Given a mimetype "x" and a run function, executes the scripts inside tags like:
 * <script src="something" type="x">Your script</script>
 */
var langPlugin = {};

langPlugin.runLang = function(mimetype, run, container) {
    container = container || document.documentElement;
    var i, script,
        scriptElements = langPlugin.getScriptsForMimeType(mimetype, container);

    for (i=0; i<scriptElements.length; i++) {
        script = langPlugin.getScriptText(scriptElements[i]);
        run(script);
    }
};

langPlugin.getScriptsForMimeType = function(mimetype, container) {
    var scripts = container.getElementsByTagName('script');
    var validScripts = [];

    for (var i=0; i< scripts.length; i++) {
        if (scripts[i].type === mimetype) {
            validScripts.push(scripts[i]);
        }
    }
    return validScripts;
};

langPlugin.getScriptText = function(scriptElement) {
    if (scriptElement.src) {
        var AJAX = new XMLHttpRequest();
        AJAX.open("GET", scriptElement.src, false);
        AJAX.send(null);
        return AJAX.responseText;
    } else {
        return scriptElement.text;
    }
};

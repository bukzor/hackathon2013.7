We did this:

    npm install generator-chrome-extension
    yo chrome-extension
    [?] What would you like to call this extension? bogolisp
    [?] How would you like to describe this extension? Interpreter for application/bogolisp scripts
    [?] Would you like to use UI Action? No
    [?] Would you like to use the Options Page? Yes
    [?] Would you like to use the Omnibox? (Please input keyword) no
    [?] Would you like to use the Content Scripts (Not Programmatic)? Yes
    [?] Would you like to use permissions? Yes
    [?] "Tabs" permission: Yes
    [?] "Bookmarks" permission: No
    [?] "Cookies" permission: Yes
    [?] "History" permission: No
    [?] "Management" permission: No
    create app/manifest.json
    create app/options.html
    create app/scripts/options.js
    create app/scripts/contentscript.js
    create app/scripts/background.js
    create app/_locales/en/messages.json
    create app/styles/main.css
    create app/images/icon-16.png
    create app/images/icon-128.png
    create package.json
    create bower.json
    identical .bowerrc
    identical .editorconfig
    conflict .gitignore
    [?] Overwrite .gitignore? overwrite
        force .gitignore
    identical .gitattributes
    conflict .jshintrc
    [?] Overwrite .jshintrc? overwrite
        force .jshintrc
    create Gruntfile.js
    invoke   mocha:app
    create     test/index.html
    create     test/lib/chai.js
    create     test/lib/expect.js
    create     test/lib/mocha/mocha.css
    create     test/lib/mocha/mocha.js
    create     test/spec/test.js

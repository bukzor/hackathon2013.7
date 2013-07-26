hackathon2013.7
===============

The goal is to get our own scripting language into the browser.
We'll use llvm and pnacl. Or at least that's what we thought.  
We decided to implement lisp in the browser, using JS and a Chrome Extension: http://bukzor.github.io/hackathon2013.7/

Reading:
--------

 * The llvm tutorial: <http://llvm.org/docs/tutorial/index.html>
 * The nacl tutorial: <https://developers.google.com/native-client/devguide/tutorial#next>
 * A simple nacl extension: <http://stackoverflow.com/questions/10335284/adding-nacl-in-an-chrome-extension>
 * The pnacl getting-started guide: <http://www.chromium.org/nativeclient/pnacl/building-and-testing-portable-native-client>

Other notes:
------------

A good way to verify your pnacl setup, is the [pnacl-examples extention][1].

To get chrome 30 in ubuntu, you need the [google-chrome ppa][2]

A fixed chromium bug enabling use of nacl in plugins:

 * <https://code.google.com/p/nativeclient/issues/detail?id=439>
 * <http://code.google.com/p/nativeclient/source/detail?r=2232>

[1]: https://chrome.google.com/webstore/detail/pnacl-examples/mblemkccghnfkjignlmgngmopopifacf
[2]: http://www.ubuntuupdates.org/ppa/google_chrome


Problems and Solutions
----------------------

__P__: The pnacl objects *seem* to run, but hang.

__S__: You may have enabled the debugger, which would cause any nacl object to hit a breakpoint. Go to
[chrome://flags/#enable-nacl-debug](chrome://flags/#enable-nacl-debug) and make sure it's disabled.

__P__: Lots of weird errors when compiling the llvm tutorials code, such as `error: no matching member function for call
to 'CreateCall'`

__P__: Make sure you're using llvm-3.0, not any of the 2.x series.

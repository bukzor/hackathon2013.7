#!/bin/bash
# This script is intended to make a working dev environment on a "fresh" Ubuntu machine.

# https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

# We install locally rather than globally, because of my personal bias.
npm install yo

cd bin
ln -s ../node_modules/.bin/*

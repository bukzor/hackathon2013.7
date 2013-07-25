#!/bin/bash
# This script is intended to make a working dev environment on a "fresh" Ubuntu machine.
SCRIPT=$(readlink -f ${BASH_SOURCE[0]})
HERE=$(dirname $SCRIPT)
source $HERE/env.sh

# https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

# We install locally rather than globally, because of my personal bias.
npm install yo

# Install the locally-required packages (bower.json and package.json)
bower install
npm install

# `grunt test` wants compass, for whatever reason
sudo apt-get install rubygems
gem install compass


cd $HERE/bin
ln -s ../node_modules/.bin/* .
ln -s ../gem/bin/* .

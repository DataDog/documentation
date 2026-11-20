#!/bin/bash

# test if we are wrongly running `npm install` instead of yarn.
if ! [[ $npm_config_user_agent == yarn* ]]
then
    echo "npm got replaced with yarn: install it with 'sudo npm install -g yarn' and run 'yarn' instead."
    exit 1
fi

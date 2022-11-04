#!/bin/bash

mkdir -p ~/.nohooks
hooks=`git config --get core.hooksPath`
if [[ $hooks == *nohooks* ]]; then
    git config --global core.hooksPath /usr/local/dd/global_hooks/
    echo "Hooks enabled"
    echo "Hooks directory set to $(git config --get core.hooksPath)"
else
    git config --global core.hooksPath ~/.nohooks
    echo "Hooks disabled"
    echo "Hooks directory set to $(git config --get core.hooksPath)"
fi

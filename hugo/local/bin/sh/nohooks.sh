#!/bin/bash

mkdir -p ~/.nohooks
hooks=`git config --get core.hooksPath`

if [[ $1 && $1 == status && $hooks == *nohooks* ]]; then
  echo "Hooks are currently disabled"
elif [[ $1 && $1 == status && $hooks != *nohooks* ]]; then
  echo "Hooks are currently enabled"
elif [[ $1 ]]; then
  echo "Flag not recognized"
  exit 1
elif [[ $# -eq 0 ]]; then
  if [[ $hooks == *nohooks* ]]; then
      git config --global core.hooksPath /usr/local/dd/global_hooks/
      echo "Hooks enabled"
      echo "Hooks directory set to $(git config --get core.hooksPath)"
  else
      git config --global core.hooksPath ~/.nohooks
      echo "Hooks disabled"
      echo "Hooks directory set to $(git config --get core.hooksPath)"
  fi
fi

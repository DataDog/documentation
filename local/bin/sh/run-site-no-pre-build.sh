#!/bin/bash

RUN_SERVER=${RUN_SERVER:=false}
RENDER_SITE_TO_DISK=${RENDER_SITE_TO_DISK:=false}

if [ ${RUN_SERVER} = true ]; then
  yarn run start
  
  # Building the documentation
  # if [ ${RUN_WEBPACK} = true ]; then
  #   printf "checking that node modules are installed and up-to-date"
  #   npm --global install yarn && \
  #   npm cache clean --force && yarn install --frozen-lockfile
  #   printf "starting webpack and hugo build"
	#   yarn run start

  #   sleep 5
	# fi

else
	exit 0
fi

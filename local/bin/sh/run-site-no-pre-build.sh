#!/bin/bash

RUN_SERVER=${RUN_SERVER:=false}
RENDER_SITE_TO_DISK=${RENDER_SITE_TO_DISK:=false}

# Install Yarn and install assets
	npm --global install yarn && \
  npm cache clean --force && yarn install --frozen-lockfile

if [ ${RUN_SERVER} = true ]; then
  echo "Installing Yarn and static assets"
	npm --global install yarn && \
  npm cache clean --force && yarn install --frozen-lockfile

  echo "Starting Hugo in server mode"
  hugo server --buildDrafts --buildFuture --navigateToChanged --noHTTPCache
else
	exit 0
fi

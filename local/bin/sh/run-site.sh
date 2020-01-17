#!/bin/bash

RUN_SERVER=${RUN_SERVER:=false}
GITHUB_TOKEN=${GITHUB_TOKEN:=false}
RUN_WEBPACK=${RUN_WEBPACK:=true}
RENDER_SITE_TO_DISK=${RENDER_SITE_TO_DISK:=false}
CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS:=false}
LOCAL=${LOCAL:=False}

if [ ${RUN_SERVER} = true ]; then
	# integrations
	if [ ${GITHUB_TOKEN} != false ]; then
		args="${args} --token ${GITHUB_TOKEN}"
	else
		printf "No GITHUB TOKEN was found. skipping any data sync that relies on pulling from web.\n"
		printf "Add all source repositories in the same parent folder as the documentation/ folder to build the full doc locally.\n"
		update_pre_build.py
	fi
	if [[ ${args} != "" ]]; then
		update_pre_build.py "${args}"
	fi

  # placeholders
	if [ ${CREATE_I18N_PLACEHOLDERS} == true ]; then
		echo "creating i18n placeholder pages."
		placehold_translations.py -c "config/_default/languages.yaml"
	fi

	# webpack
	if [ ${RUN_WEBPACK} = true ]; then
		echo "checking that node modules are installed and up-to-date"
    npm --global install yarn && \
    npm cache clean --force && yarn install --frozen-lockfile
    echo "starting webpack and hugo build"
	yarn run start

    sleep 5
	fi

else
	exit 0
fi

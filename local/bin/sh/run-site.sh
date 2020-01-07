#!/usr/bin/env sh

RUN_SERVER=${RUN_SERVER:=false}
FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS:=false}
GITHUB_TOKEN=${GITHUB_TOKEN:="False"}
RUN_WEBPACK=${RUN_WEBPACK:=true}
CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS:=false}
RENDER_SITE_TO_DISK=${RENDER_SITE_TO_DISK:=false}
LOCAL=${LOCAL:=False}

if [ ${RUN_SERVER} == true ]; then
	# integrations
	if [ ${FETCH_INTEGRATIONS} == true ]; then
		args=""
		if [ ${GITHUB_TOKEN} != "False" ]; then
			args="${args} --token ${GITHUB_TOKEN}"
		else
			echo "No GITHUB TOKEN was found. skipping any data sync that relies on pulling from web.\n"
			echo "Add all source repositories in the same parent folder as the documentation/ folder to build the full doc locally.\n"
			update_pre_build.py
		fi
		if [[ ${args} != "" ]]; then
			update_pre_build.py ${args}
		fi
	fi

	# placeholders
	if [ ${CREATE_I18N_PLACEHOLDERS} == true ]; then
		echo "creating i18n placeholder pages."
		placehold_translations.py -c "config/_default/languages.yaml"
	fi

	# webpack
	if [ ${RUN_WEBPACK} == true ]; then
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

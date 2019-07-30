#!/usr/bin/env sh

RUN_SERVER=${RUN_SERVER:=false}
FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS:=false}
DOGWEB=${DOGWEB:=false}
INTEGRATIONS_CORE=${INTEGRATIONS_CORE:=false}
INTEGRATIONS_EXTRAS=${INTEGRATIONS_EXTRAS:=false}
GITHUB_TOKEN=${GITHUB_TOKEN:="false"}
RUN_WEBPACK=${RUN_WEBPACK:=true}
CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS:=false}
RENDER_SITE_TO_DISK=${RENDER_SITE_TO_DISK:=false}


if [ ${RUN_SERVER} == true ]; then

	

	# integrations
	if [ ${FETCH_INTEGRATIONS} == true ]; then
		args=""
		if [ ${DOGWEB} != "false" ]; then
			args="${args} --dogweb ${DOGWEB}"
		fi
		if [ ${INTEGRATIONS_CORE} != "false" ]; then
			args="${args} --integrations ${INTEGRATIONS_CORE}"
		fi
		if [ ${INTEGRATIONS_EXTRAS} != "false" ]; then
			args="${args} --extras ${INTEGRATIONS_EXTRAS}"
		fi
		if [ ${GITHUB_TOKEN} != "false" ]; then
			args="${args} --token ${GITHUB_TOKEN}"
		else
			echo "No GITHUB TOKEN was found. skipping any integration sync that relies on pulling from web."
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
	webpackargs ="--config webpack.dev.js"
	hugoargs ="-D -d ../dist -s site --port 3000 --navigateToChanged --noHTTPCache --ignoreCache --disableFastRender"
    echo "starting webpack and hugo build"
	yarn run start
    
    
    
    sleep 5
	fi

	# # hugo
	# args=""
	# if [ ${RENDER_SITE_TO_DISK} != "false" ]; then
	# 	args="${args} --renderToDisk"
	# fi
	# # hugo server defaults to --environment development
	# ./node_modules/.bin/hugo server ${args} &
	# sleep 5

	# if [ ${RUN_WEBPACK} == true ]; then
	# 	echo "webpack watch..."
	# 	gulp watch
	# fi

else
	exit 0
fi

#!/usr/bin/env sh

RUN_SERVER=${RUN_SERVER:=false}
FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS:=false}
DOGWEB=${DOGWEB:=false}
INTEGRATIONS_CORE=${INTEGRATIONS_CORE:=false}
GITHUB_TOKEN=${GITHUB_TOKEN:="false"}
RUN_GULP=${RUN_GULP:=true}
CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS:=false}
USE_DOCKER=${USE_DOCKER:=false}


if [ ${RUN_SERVER} == true ]; then
	if [ ${RUN_GULP} == true ]; then
		echo "checking that node modules are installed and up-to-date"
		npm install
        echo "starting gulp watch"
        gulp watch --silent &
	fi
	echo "building hugo site..."
	if [ ${FETCH_INTEGRATIONS} == true ]; then
		echo "grabbing integrations..."
		args=""
		if [ ${DOGWEB} != "false" ]; then
			args="${args} --dogweb ${DOGWEB}"
		fi
		if [ ${INTEGRATIONS_CORE} != "false" ]; then
			args="${args} --integrations ${INTEGRATIONS_CORE}"
		fi
		if [ ${GITHUB_TOKEN} != "false" ]; then
			args="${args} --token ${GITHUB_TOKEN}"
		fi
		integrations_sync.py ${args} || true
	fi
	if [ ${CREATE_I18N_PLACEHOLDERS} == true ]; then
		echo "creating i18n placeholder pages."
		placehold_translations.py -c "config.yaml" -f "content/" || true
	fi
	if [ ${USE_DOCKER} == "true" ]; then
		hugo server --renderToDisk --bind="0.0.0.0" || exit 1
	else
		hugo server --renderToDisk || exit 1
	fi
else
	exit 0
fi

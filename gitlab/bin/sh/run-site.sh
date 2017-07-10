#!/usr/bin/env sh

RUN_SERVER=${RUN_SERVER:=false}
FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS:=false}
GITHUB_TOKEN=${GITHUB_TOKEN:=""}
RUN_GULP=${RUN_GULP:=true}
CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS:=false}

echo $FETCH_INTEGRATIONS
echo $RUN_SERVER
echo $RUN_GULP
echo $CREATE_I18N_PLACEHOLDERS

if [ ${RUN_SERVER} == true ]; then
	if [ ${RUN_GULP} == true ]; then
		echo "checking that node modules are installed and up-to-date"
		npm install
        echo "starting gulp watch"
        gulp watch --silent &
	fi
	echo "building hugo site..."
	if [ ${FETCH_INTEGRATIONS} == true ]; then
		echo "grabbing integrations. this takes forever."
		integrations_sync.py --token "${GITHUB_TOKEN}" || true
	fi
	if [ ${CREATE_I18N_PLACEHOLDERS} == true ]; then
		echo "creating i18n placeholder pages."
		placehold_translations.py -c "config.yaml" -f "content/" || true
	fi
	hugo server --watch=true --renderToDisk --bind="0.0.0.0" "$@" || exit 1
else
	exit 0
fi

#!/bin/bash

RUN_SERVER=${RUN_SERVER:=false}
GITHUB_TOKEN=${GITHUB_TOKEN:=false}
RENDER_SITE_TO_DISK=${RENDER_SITE_TO_DISK:=false}
CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS:=false}
LOCAL=${LOCAL:=False}

if [ ${RUN_SERVER} = true ]; then
	# integrations
	if [ ${GITHUB_TOKEN} != false ]; then
		args="${args} --token ${GITHUB_TOKEN}"
	else
		printf "\033[31m\033[1mNo GITHUB TOKEN was found. Skipping any data sync that relies on pulling from web.\033[0m\n"
		printf "\033[33m\033[1mAdd all source repositories in the same parent folder as the documentation/ folder to build the full doc locally.\nOr use the 'make start-no-pre-build' command to build the doc without any external content.\033[0m\n"
    args="${args} --token 'false'"
	fi

  update_pre_build.py "${args}"

	# rbac permissions
	if [ ${PULL_RBAC_PERMISSIONS} == true ]; then
		echo "Pulling RBAC permissions."

		if [ ${DD_API_KEY} != false ] && [ ${DD_APP_KEY} != false ]; then
			pull_rbac.py ${DD_API_KEY} ${DD_APP_KEY}
		else
			echo "Api or application keys were not found. Skipping RBAC permissions."
		fi
	fi

  # placeholders
	if [ ${CREATE_I18N_PLACEHOLDERS} == true ]; then
		echo "Creating i18n placeholder pages."
		placehold_translations.py -c "config/_default/languages.yaml"
	fi

  echo "Installing Yarn and static assets"
	npm --global install yarn && \
  npm cache clean --force && yarn install --frozen-lockfile

  echo "Starting Hugo in server mode"
  hugo server --buildDrafts --buildFuture --navigateToChanged --noHTTPCache
else
	exit 0
fi

# make
.PHONY: clean clean-all clean-build clean-docker clean-exe clean-integrations clean-auto-doc clean-node clean-virt docker-start docker-stop help start stop
.DEFAULT_GOAL := help
PY3=$(shell if [ `which pyenv` ]; then \
				if [ `pyenv which python3` ]; then \
					printf `pyenv which python3`; \
				fi \
			elif command -v python3 > /dev/null 2>&1; then \
				printf "python3"; \
			else printf "false"; \
			fi)
IMAGE_VERSION="latest"

# config
CONFIG_FILE := Makefile.config
ifeq ($(wildcard $(CONFIG_FILE)),)
	$(error $(CONFIG_FILE) not found. See $(CONFIG_FILE).example.)
endif
include $(CONFIG_FILE)


help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

clean: stop  ## clean all make installs.
	@echo "cleaning up..."
	make clean-build
	make clean-integrations
	make clean-auto-doc
	make clean-static

clean-all: stop  ## clean everything.
	make clean-build
	make clean-exe
	make clean-integrations
	make clean-auto-doc
	make clean-node
	make clean-virt
	make clean-docker

clean-build:  ## remove build artifacts.
	@if [ -d public ]; then rm -r public; fi

clean-docker:  ## remove image.
	@if [[ `docker ps -a | grep docs` ]]; then printf  "removing:" && docker rm -f docs; fi || true
	@if [[ `docker images | grep mstbbs/docker-dd-docs:${IMAGE_VERSION}` ]]; then printf  "removing:" && docker rmi -f mstbbs/docker-dd-docs:${IMAGE_VERSION}; fi || true

clean-exe:  ## remove execs.
	@rm -rf ${EXE_LIST}

clean-integrations:  ## remove built integrations files.
	@if [ -d data/integrations ]; then \
		find ./data/integrations -type f -maxdepth 1 \
	    -a -not -name '*.fr.yaml' \
	    -exec rm -rf {} \; ;fi
	@if [ -d data/service_checks ]; then \
		find ./data/service_checks -type f -maxdepth 1 \
	    -a -not -name '*.fr.json' \
	    -exec rm -rf {} \; ;fi
	@find ./content/integrations -type f -maxdepth 1 \
	    -a -not -name '_index.md' \
		  -a -not -name 'adobe_experience_manager.md' \
	    -a -not -name 'amazon_guardduty.md' \
	    -a -not -name 'amazon_vpc.md' \
	    -a -not -name 'azure_dbformysql.md' \
	    -a -not -name 'azure_dbforpostgresql.md' \
	    -a -not -name 'amazon_cloudhsm.md' \
	    -a -not -name 'cloud_foundry.md' \
	    -a -not -name 'cloudcheckr.md' \
	    -a -not -name 'integration_sdk.md' \
	    -a -not -name 'jenkins.md' \
	    -a -not -name 'journald.md' \
	    -a -not -name 'kubernetes.md' \
	    -a -not -name 'nxlog.md' \
	    -a -not -name 'rss.md' \
	    -a -not -name 'rsyslog.md' \
	    -a -not -name 'sinatra.md' \
	    -a -not -name 'stunnel.md' \
	    -a -not -name 'syslog_ng.md' \
	    -a -not -name 'system.md' \
	    -a -not -name 'tcprtt.md' \
	    -a -not -name 'uwsgi.md' \
	    -a -not -name '*.fr.md' \
	    -exec rm -rf {} \;

clean-auto-doc: ##remove all doc automatically created
	@if [ -d content/developers/integrations ]; then \
	find ./content/developers/integrations -type f -maxdepth 1 -exec rm -rf {} \; ;fi

clean-node:  ## remove node_modules.
	@if [ -d node_modules ]; then rm -r node_modules; fi

clean-static:  ## remove compiled static assets
	@if [ -d static/css ]; then rm -r static/css; fi
	@if [ -d static/images ]; then rm -r static/images; fi
	@if [ -d static/js ]; then rm -r static/js; fi
	@if [ -d data/manifests ]; then rm -r data/manifests; fi

clean-virt:  ## remove python virtual env.
	@if [ -d ${VIRENV} ]; then rm -rf $(VIRENV); fi

docker-start: clean docker-stop  ## start container and run default commands to start hugo site.
	@docker run -ti --name "docs" -v `pwd`:/src:cached \
		-e FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS} \
		-e GITHUB_TOKEN \
		-e RUN_SERVER=${RUN_SERVER} \
		-e CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		-e DOGWEB=${DOGWEB} \
		-e INTEGRATIONS_CORE=${INTEGRATIONS_CORE} \
		-e INTEGRATIONS_EXTRAS=${INTEGRATIONS_EXTRAS} \
		-e USE_DOCKER=true \
		-p 1313:1313 mstbbs/docker-dd-docs:${IMAGE_VERSION}

docker-stop:  ## kill the site and stop the running container.
	@if [[ `docker ps -a | grep docs` ]]; then printf  "removing:" && docker rm -f docs; fi || echo "nothing to clean."

docker-tests: stop  ## run the tests through the docker container.
	@docker run -tid --name "docs" -v `pwd`:/src:cached \
		-e RUN_SERVER=true \
		-e RUN_GULP=false \
		-p 1313:1313 mstbbs/docker-dd-docs:${IMAGE_VERSION}
	@printf "\e[93mSetting up test environment, this may take a minute...\033[0m\n"
	@docker exec -ti docs run-tests.sh
	@make docker-stop

hugpython: hugpython/bin/activate  ## build virtualenv used for tests.

hugpython/bin/activate: local/etc/requirements3.txt  ## start python virtual environment.
	@if [ ${PY3} != "false" ]; then \
		test -x ${VIRENV}/bin/pip || ${PY3} -m venv --clear ${VIRENV}; \
		$(VIRENV)/bin/pip install -r local/etc/requirements3.txt; \
	else printf "\e[93mPython 3 is required to fetch integrations and run tests.\033[0m Try https://github.com/pyenv/pyenv.\n"; fi

source-helpers: hugpython  ## source the helper functions used in build, test, deploy.
	@mkdir -p ${EXEDIR}
	@find ${LOCALBIN}/*  -type f -exec cp {} ${EXEDIR} \;
	@cp -r local/githooks/* .git/hooks
	@c++ -Wall -Werror -O2 local/etc/format-links.cpp -o local/bin/format-links

# ARGS=<file> will format that file
# ARGS=<directory> will recursively format all english markdown files inside <directory>
# empty ARGS will format all english markdown files inside content/
link-formatting: source-helpers
	@local/bin/sh/format-links.sh $(ARGS)

start: clean source-helpers ## start the gulp/hugo server.
	@echo "starting up..."
	@if [ ${PY3} != "false" ]; then \
		source ${VIRENV}/bin/activate;  \
		FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS} \
		GITHUB_TOKEN=${GITHUB_TOKEN} \
		RUN_SERVER=${RUN_SERVER} \
		CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		DOGWEB=${DOGWEB} \
		INTEGRATIONS_CORE=${INTEGRATIONS_CORE} \
		INTEGRATIONS_EXTRAS=${INTEGRATIONS_EXTRAS} \
		run-site.sh; \
	else \
		FETCH_INTEGRATIONS="false" \
		CREATE_I18N_PLACEHOLDERS="false" \
		RUN_SERVER=${RUN_SERVER} \
		run-site.sh; fi

stop:  ## stop the gulp/hugo server.
	@echo "stopping previous..."
	@pkill -x gulp || true
	@pkill -x hugo server --renderToDisk || true

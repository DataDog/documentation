# make
.PHONY: clean clean-all clean-build clean-exe clean-integrations clean-auto-doc clean-node clean-virt help start stop
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

clean: stop  ## Clean all make installs.
	@echo "cleaning up..."
	make clean-build
	make clean-integrations
	make clean-auto-doc

clean-all: stop  ## Clean everything.
	make clean-build
	make clean-exe
	make clean-integrations
	make clean-auto-doc
	make clean-node
	make clean-virt

clean-build:  ## Remove build artifacts.
	@if [ -d public ]; then rm -r public; fi

clean-exe:  ## Remove execs.
	@rm -rf ${EXE_LIST}

clean-integrations:  ## Remove built integrations files.
	@rm -rf ./integrations_data/
	@if [ -d data/integrations ]; then \
		find ./data/integrations -type f -maxdepth 1 \
	    -a -not -name '*.fr.yaml' \
	    -exec rm -rf {} \; ;fi
	@if [ -d data/service_checks ]; then \
		find ./data/service_checks -type f -maxdepth 1 \
	    -a -not -name '*.fr.json' \
	    -exec rm -rf {} \; ;fi
	@find ./content/en/integrations -type f -maxdepth 1 \
	    -a -not -name '_index.md' \
		-a -not -name 'adobe_experience_manager.md' \
		-a -not -name 'alcide.md' \
	    -a -not -name 'amazon_guardduty.md' \
	    -a -not -name 'amazon_vpc.md' \
	    -a -not -name 'amazon_cloudhsm.md' \
	    -a -not -name 'pivotal_platform.md' \
			-a -not -name 'carbon_black.md' \
		  -a -not -name 'cloudability.md' \
	    -a -not -name 'cloudcheckr.md' \
		  -a -not -name 'fluentbit.md' \
			-a -not -name 'iam_access_analyzer.md' \
	    -a -not -name 'integration_sdk.md' \
	    -a -not -name 'journald.md' \
	    -a -not -name 'kubernetes.md' \
	    -a -not -name 'marklogic.md' \
	    -a -not -name 'nxlog.md' \
	    -a -not -name 'rss.md' \
	    -a -not -name 'rsyslog.md' \
	    -a -not -name 'sidekiq.md' \
	    -a -not -name 'sinatra.md' \
	    -a -not -name 'stunnel.md' \
	    -a -not -name 'syslog_ng.md' \
	    -a -not -name 'system.md' \
	    -a -not -name 'tcprtt.md' \
	    -a -not -name 'uwsgi.md' \
	    -a -not -name '*.fr.md' \
	    -exec rm -rf {} \;

clean-auto-doc: ##Remove all doc automatically created
	@if [ -d content/en/developers/integrations ]; then \
	find ./content/en/developers/integrations -type f -maxdepth 1 -exec rm -rf {} \; ;fi
	@if [ content/en/agent/basic_agent_usage/heroku.md ]; then \
	rm -f content/en/agent/basic_agent_usage/heroku.md ;fi
	@if [ content/en/tracing/setup/ruby.md ]; then \
	rm -f content/en/tracing/setup/ruby.md ;fi
	@if [ content/en/developers/amazon_cloudformation.md ]; then \
	rm -f content/en/developers/amazon_cloudformation.md ;fi
	@if [ content/en/logs/log_collection/android.md ]; then \
	rm -f content/en/logs/log_collection/android.md ;fi

clean-node:  ## Remove node_modules.
	@if [ -d node_modules ]; then rm -r node_modules; fi

clean-virt:  ## Remove python virtual env.
	@if [ -d ${VIRENV} ]; then rm -rf $(VIRENV); fi

hugpython: hugpython/bin/activate  ## Build virtualenv used for tests.

hugpython/bin/activate: local/etc/requirements3.txt  ## Start python virtual environment.
	@if [ ${PY3} != "false" ]; then \
		test -x ${VIRENV}/bin/pip || ${PY3} -m venv --clear ${VIRENV}; \
		$(VIRENV)/bin/pip install -r local/etc/requirements3.txt; \
	else printf "\e[93mPython 3 is required to fetch integrations and run tests.\033[0m Try https://github.com/pyenv/pyenv.\n"; fi

source-helpers: hugpython  ## Source the helper functions used in build, test, deploy.
	@mkdir -p ${EXEDIR}
	@find ${LOCALBIN}/*  -type f -exec cp {} ${EXEDIR} \;
	@cp -r local/githooks/* .git/hooks

start: clean source-helpers ## Build the documentation with all external content.
	@echo "\033[35m\033[1m\nBuilding the documentation with ALL external content:\033[0m"
	@if [ ${PY3} != "false" ]; then \
		source ${VIRENV}/bin/activate;  \
		GITHUB_TOKEN=${GITHUB_TOKEN} \
		RUN_SERVER=${RUN_SERVER} \
		CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		CONFIGURATION_FILE=${CONFIGURATION_FILE} \
		LOCAL=${LOCAL}\
		run-site.sh; \
	else @echo "\033[31m\033[1mPython 3 must be available to Build the documentation.\033[0m" ; fi

start-no-pre-build: clean source-helpers ## Build the documentation without automatically pulled content.
	@echo "\033[35m\033[1m\nBuilding the documentation with NO external content:\033[0m"
	@if [ ${PY3} != "false" ]; then \
		source ${VIRENV}/bin/activate;  \
		RUN_SERVER=${RUN_SERVER} \
		run-site-no-pre-build.sh; \
	else @echo "\033[31m\033[1mPython 3 must be available to Build the documentation.\033[0m" ; fi

stop:  ## Stop wepack watch/hugo server.
	@echo "stopping previous..."
	@pkill -x webpack || true
	@pkill -x hugo server --renderToDisk || true

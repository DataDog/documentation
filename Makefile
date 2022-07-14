# make
.PHONY: clean clean-all clean-build clean-examples clean-go-examples clean-java-examples clean-exe clean-integrations clean-auto-doc clean-node clean-virt help start stop
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
	_ := $(error $(CONFIG_FILE) not found. See $(CONFIG_FILE).example.)
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
	make clean-examples

clean-build:  ## Remove build artifacts.
	@rm -rf public
	@rm -rf static/images/integrations_logos/2020w2.pdf

clean-exe:  ## Remove execs.
	@rm -rf ${EXE_LIST}

clean-integrations:  ## Remove built integrations files.
	@rm -rf ./integrations_data/
	@if [ -d data/integrations ]; then \
		find ./data/integrations -type f -maxdepth 1 \
	    -a -not -name '*.fr.yaml' \
	    -a -not -name '*.ja.yaml' \
		-a -not -name 'docker_daemon.yaml' \
	    -exec rm -rf {} \; ;fi
	@if [ -d data/service_checks ]; then \
		find ./data/service_checks -type f -maxdepth 1 \
	    -a -not -name '*.fr.json' \
	    -a -not -name '*.ja.json' \
	    -exec rm -rf {} \; ;fi
	@git clean -xf ./content/en/integrations
	@find ./content/en/security_platform/default_rules -type f -maxdepth 1 \
		-a -not -name '_index.md' \
		-exec rm -rf {} \;
	@rm -rf static/images/marketplace

clean-auto-doc: ##Remove all doc automatically created
	@rm -rf content/en/developers/integrations;
	@rm -f content/en/agent/basic_agent_usage/ansible.md;
	@rm -f content/en/agent/basic_agent_usage/chef.md;
	@rm -f content/en/agent/basic_agent_usage/heroku.md;
	@rm -f content/en/agent/basic_agent_usage/puppet.md;
	@rm -f content/en/agent/basic_agent_usage/saltstack.md;
	@rm -f content/en/serverless/libraries_integrations/plugin.md;
	@rm -f content/en/serverless/libraries_integrations/macro.md;
	@rm -f content/en/serverless/libraries_integrations/cli.md;
	@rm -f content/en/serverless/libraries_integrations/extension.md;
	@rm -f content/en/serverless/libraries_integrations/cdk.md;
	@rm -f content/en/synthetics/cicd_integrations/circleci_orb.md;
	@rm -f content/en/synthetics/cicd_integrations/github_actions.md;
	@rm -f content/en/real_user_monitoring/android/_index.md;
	@rm -f content/en/real_user_monitoring/android/data_collected.md;
	@rm -f content/en/real_user_monitoring/android/advanced_configuration.md;
	@rm -f content/en/real_user_monitoring/android/integrated_libraries.md;
	@rm -f content/en/real_user_monitoring/android/mobile_vitals.md;
	@rm -f content/en/real_user_monitoring/android/troubleshooting.md;
	@rm -f content/en/real_user_monitoring/error_tracking/android.md;
	@rm -f content/en/real_user_monitoring/error_tracking/ios.md;
	@rm -f content/en/real_user_monitoring/browser/_index.md;
	@rm -f content/en/real_user_monitoring/ios/_index.md;
	@rm -f content/en/real_user_monitoring/ios/crash_reporting.md;
	@rm -f content/en/real_user_monitoring/ios/mobile_vitals.md;
	@rm -rf content/en/real_user_monitoring/ios;
	@rm -f content/en/real_user_monitoring/reactnative/_index.md;
	@rm -f content/en/real_user_monitoring/reactnative/integrated_libraries.md;
	@rm -f content/en/real_user_monitoring/reactnative/mobile_vitals.md;
	@rm -f content/en/real_user_monitoring/reactnative/expo.md;
	@rm -f content/en/real_user_monitoring/flutter/_index.md;
	@rm -f content/en/tracing/setup/ruby.md;
	@rm -f content/en/tracing/setup_overview/setup/ruby.md;
	@rm -f content/en/integrations/guide/amazon_cloudformation.md;
	@rm -f content/en/logs/log_collection/android.md;
	@rm -f content/en/logs/log_collection/ios.md;
	@rm -f content/en/logs/log_collection/javascript.md;
	@rm -f content/en/logs/guide/forwarder.md;
	@rm -f content/en/tracing/setup_overview/setup/android.md;
	@rm -f content/en/security_platform/cloud_workload_security/agent_expressions.md;
	@rm -f content/en/security_platform/cloud_workload_security/backend.md;

clean-node:  ## Remove node_modules.
	@rm -rf node_modules;

clean-virt:  ## Remove python virtual env.
	@rm -rf $(VIRENV);

hugpython: hugpython/bin/activate  ## Build virtualenv used for tests.

hugpython/bin/activate: local/etc/requirements3.txt  ## Start python virtual environment.
	@if [ ${PY3} != "false" ]; then \
		test -x ${VIRENV}/bin/pip || ${PY3} -m venv --clear ${VIRENV}; \
		$(VIRENV)/bin/pip install -r local/etc/requirements3.txt; \
	else printf "\e[93mPython 3 is required to fetch integrations and run tests.\033[0m Try https://github.com/pyenv/pyenv.\n"; fi

source-helpers: # Source the helper functions used in build, test, deploy.
	@if [ "${DOCKER}" != "true" ]; then make hugpython; fi
	@mkdir -p ${EXEDIR}
	@find ${LOCALBIN}/*  -type f -exec cp {} ${EXEDIR} \;
	@cp -r local/githooks/* .git/hooks

start: clean source-helpers examples ## Build the documentation with all external content.
	@echo "\033[35m\033[1m\nBuilding the documentation with ALL external content:\033[0m"
	@if [ ${PY3} != "false" ]; then \
		. ${VIRENV}/bin/activate; \
		GITHUB_TOKEN=${GITHUB_TOKEN} \
		DD_API_KEY=${DD_API_KEY} \
		DD_APP_KEY=${DD_APP_KEY} \
		RUN_SERVER=${RUN_SERVER} \
		CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		PULL_RBAC_PERMISSIONS=${PULL_RBAC_PERMISSIONS} \
		CONFIGURATION_FILE=${CONFIGURATION_FILE} \
		LOCAL=${LOCAL}\
		LANGS_TO_IGNORE=${LANGS_TO_IGNORE} \
		DOCKER=${DOCKER} \
		run-site.sh; \
	else @echo "\033[31m\033[1mPython 3 must be available to Build the documentation.\033[0m" ; fi

start-no-pre-build: clean source-helpers ## Build the documentation without automatically pulled content.
	@echo "\033[35m\033[1m\nBuilding the documentation with NO external content:\033[0m"
	@if [ ${PY3} != "false" ]; then \
		. ${VIRENV}/bin/activate; \
		RUN_SERVER=${RUN_SERVER} \
		LANGS_TO_IGNORE=${LANGS_TO_IGNORE} \
		DOCKER=${DOCKER} \
		run-site-no-pre-build.sh; \
	else @echo "\033[31m\033[1mPython 3 must be available to Build the documentation.\033[0m" ; fi

stop:  ## Stop wepack watch/hugo server.
	@echo "stopping previous..."

clean-go-examples:
	@git clean -xdf content/en/api/**/*.go

clean-java-examples:
	@git clean -xdf content/en/api/**/*.java

clean-python-examples:
	@git clean -xdf content/en/api/**/*.py*

clean-ruby-examples:
	@git clean -xdf content/en/api/**/*.rb*

clean-typescript-examples:
	@git clean -xdf content/en/api/**/*.ts*

clean-examples: clean-go-examples clean-java-examples clean-python-examples clean-ruby-examples clean-typescript-examples
	@rm -rf examples

BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

examples/datadog-api-client-go:
	@git clone --depth 1 --branch $(BRANCH) https://github.com/DataDog/datadog-api-client-go.git $@ || git clone --depth 1 --branch $(shell grep -A1 "datadog-api-client-go" data/sdk_versions.json | grep version | cut -f 2 -d ':' | tr -d '"') https://github.com/DataDog/datadog-api-client-go.git $@
	@cd $@

examples/datadog-api-client-java:
	@git clone --depth 1 --branch $(BRANCH) https://github.com/DataDog/datadog-api-client-java.git $@ || git clone --depth 1 --branch $(shell grep -A1 "datadog-api-client-java" data/sdk_versions.json | grep version | cut -f 2 -d ':' | tr -d '"') https://github.com/DataDog/datadog-api-client-java.git $@
	@cd $@

examples/datadog-api-client-python:
	@git clone --depth 1 --branch $(BRANCH) https://github.com/DataDog/datadog-api-client-python.git $@ || git clone --depth 1 --branch $(shell grep -A1 "datadog-api-client-python" data/sdk_versions.json | grep version | cut -f 2 -d ':' | tr -d '"') https://github.com/DataDog/datadog-api-client-python.git $@
	@cd $@

examples/datadog-api-client-ruby:
	@git clone --depth 1 --branch $(BRANCH) https://github.com/DataDog/datadog-api-client-ruby.git $@ || git clone --depth 1 --branch $(shell grep -A1 "datadog-api-client-ruby" data/sdk_versions.json | grep version | cut -f 2 -d ':' | tr -d '"') https://github.com/DataDog/datadog-api-client-ruby.git $@
	@cd $@

examples/datadog-api-client-typescript:
	@git clone --depth 1 --branch $(BRANCH) https://github.com/DataDog/datadog-api-client-typescript.git $@ || git clone --depth 1 --branch $(shell grep -A1 "datadog-api-client-typescript" data/sdk_versions.json | grep version | cut -f 2 -d ':' | tr -d '"') https://github.com/DataDog/datadog-api-client-typescript.git $@
	@cd $@

.PHONY: examples/go examples/java examples/python examples/ruby examples/typescript examples

EXAMPLES_DIR = $(shell pwd)/examples/content/en/api

examples/go: examples/datadog-api-client-go clean-go-examples
	-cp -Rn examples/datadog-api-client-go/examples/v* ./content/en/api/

examples/java: examples/datadog-api-client-java clean-java-examples
	-cp -Rn examples/datadog-api-client-java/examples/v* ./content/en/api/

examples/python: examples/datadog-api-client-python clean-python-examples
	-find examples/datadog-api-client-python/examples -iname \*.py -exec mv {} {}beta \;
	-cp -Rn examples/datadog-api-client-python/examples/v* ./content/en/api

examples/ruby: examples/datadog-api-client-ruby clean-ruby-examples
	-find examples/datadog-api-client-ruby/examples -iname \*.rb -exec mv {} {}beta \;
	-cp -Rn examples/datadog-api-client-ruby/examples/v* ./content/en/api

examples/typescript: examples/datadog-api-client-typescript clean-typescript-examples
	-cp -Rn examples/datadog-api-client-typescript/examples/v* ./content/en/api

examples: examples/go examples/java examples/python examples/ruby examples/typescript

start-docker: clean
	@export REPO_PATH=$(PWD) && \
	export GITHUB_TOKEN=${GITHUB_TOKEN} && \
	export FULL_BUILD=${FULL_BUILD} && \
	docker-compose -f ./docker-compose-docs.yml pull && docker-compose -p docs-local -f ./docker-compose-docs.yml up

stop-docker:
	docker-compose -f ./docker-compose-docs.yml down

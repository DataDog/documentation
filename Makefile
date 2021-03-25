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
	@if [ -d public ]; then rm -r public; fi
	@if [ assets/images/integrations_logos/2020w2.pdf ]; then \
	rm -f assets/images/integrations_logos/2020w2.pdf ;fi

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
	@find ./content/en/integrations -type f -maxdepth 1 \
		-a -not -name '_index.md' \
		-a -not -name 'adobe_experience_manager.md' \
		-a -not -name 'kubernetes_audit_logs.md' \
		-a -not -name 'alcide.md' \
		-a -not -name 'amazon_guardduty.md' \
		-a -not -name 'amazon_cloudhsm.md' \
		-a -not -name 'apigee.md' \
		-a -not -name 'pivotal_platform.md' \
		-a -not -name 'carbon_black.md' \
		-a -not -name 'cloudability.md' \
		-a -not -name 'cloudcheckr.md' \
		-a -not -name 'fluentbit.md' \
		-a -not -name 'iam_access_analyzer.md' \
		-a -not -name 'integration_sdk.md' \
		-a -not -name 'journald.md' \
		-a -not -name 'kubernetes.md' \
		-a -not -name 'nxlog.md' \
		-a -not -name 'rss.md' \
		-a -not -name 'rsyslog.md' \
		-a -not -name 'sidekiq.md' \
		-a -not -name 'sinatra.md' \
		-a -not -name 'snyk.md' \
		-a -not -name 'stunnel.md' \
		-a -not -name 'syslog_ng.md' \
		-a -not -name 'system.md' \
		-a -not -name 'tcprtt.md' \
		-a -not -name 'uwsgi.md' \
		-exec rm -rf {} \;
	@find ./content/en/security_monitoring/default_rules -type f -maxdepth 1 \
		-a -not -name '_index.md' \
		-exec rm -rf {} \;
	@if [ -d assets/images/marketplace ]; then \
		find ./assets/images/marketplace -type f \
	    -exec rm -rf {} \; ;fi

clean-auto-doc: ##Remove all doc automatically created
	@if [ -d content/en/developers/integrations ]; then \
	find ./content/en/developers/integrations -type f -maxdepth 1 -exec rm -rf {} \; ;fi
	@if [ content/en/agent/basic_agent_usage/ansible.md ]; then \
	rm -f content/en/agent/basic_agent_usage/ansible.md ;fi
	@if [ content/en/agent/basic_agent_usage/chef.md ]; then \
	rm -f content/en/agent/basic_agent_usage/chef.md ;fi
	@if [ content/en/agent/basic_agent_usage/heroku.md ]; then \
	rm -f content/en/agent/basic_agent_usage/heroku.md ;fi
	@if [ content/en/agent/basic_agent_usage/puppet.md ]; then \
	rm -f content/en/agent/basic_agent_usage/puppet.md ;fi
	@if [ content/en/agent/basic_agent_usage/saltstack.md ]; then \
	rm -f content/en/agent/basic_agent_usage/saltstack.md ;fi
	@if [ content/en/serverless/forwarder.md ]; then \
	rm -f content/en/serverless/forwarder.md ;fi
	@if [ content/en/serverless/datadog_lambda_library/python.md ]; then \
	rm -f content/en/serverless/datadog_lambda_library/python.md ;fi
	@if [ content/en/serverless/datadog_lambda_library/nodejs.md ]; then \
	rm -f content/en/serverless/datadog_lambda_library/nodejs.md ;fi
	@if [ content/en/serverless/datadog_lambda_library/ruby.md ]; then \
	rm -f content/en/serverless/datadog_lambda_library/ruby.md ;fi
	@if [ content/en/serverless/datadog_lambda_library/go.md ]; then \
	rm -f content/en/serverless/datadog_lambda_library/go.md ;fi
	@if [ content/en/serverless/datadog_lambda_library/java.md ]; then \
	rm -f content/en/serverless/datadog_lambda_library/java.md ;fi
	@if [ content/en/serverless/serverless_integrations/plugin.md ]; then \
	rm -f content/en/serverless/serverless_integrations/plugin.md ;fi
	@if [ content/en/serverless/serverless_integrations/macro.md ]; then \
	rm -f content/en/serverless/serverless_integrations/macro.md ;fi
	@if [ content/en/serverless/serverless_integrations/cli.md ]; then \
	rm -f content/en/serverless/serverless_integrations/cli.md ;fi
	@if [ content/en/real_user_monitoring/android.md ]; then \
	rm -f content/en/real_user_monitoring/android.md ;fi
	@if [ content/en/real_user_monitoring/browser/_index.md ]; then \
	rm -f content/en/real_user_monitoring/browser/_index.md ;fi
	@if [ content/en/real_user_monitoring/ios.md ]; then \
	rm -f content/en/real_user_monitoring/ios.md ;fi
	@if [ content/en/tracing/setup/ruby.md ]; then \
	rm -f content/en/tracing/setup/ruby.md ;fi
	@if [ content/en/tracing/setup_overview/setup/ruby.md ]; then \
	rm -f content/en/tracing/setup_overview/setup/ruby.md ;fi
	@if [ content/en/developers/amazon_cloudformation.md ]; then \
	rm -f content/en/developers/amazon_cloudformation.md ;fi
	@if [ content/en/logs/log_collection/android.md ]; then \
	rm -f content/en/logs/log_collection/android.md ;fi
	@if [ content/en/logs/log_collection/ios.md ]; then \
	rm -f content/en/logs/log_collection/ios.md ;fi
	@if [ content/en/logs/log_collection/javascript.md ]; then \
	rm -f content/en/logs/log_collection/javascript.md ;fi
	@if [ content/en/tracing/setup_overview/setup/android.md ]; then \
	rm -f content/en/tracing/setup_overview/setup/android.md ;fi

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

start: clean source-helpers examples ## Build the documentation with all external content.
	@echo "\033[35m\033[1m\nBuilding the documentation with ALL external content:\033[0m"
	@if [ ${PY3} != "false" ]; then \
		source ${VIRENV}/bin/activate;  \
		GITHUB_TOKEN=${GITHUB_TOKEN} \
		DD_API_KEY=${DD_API_KEY} \
		DD_APP_KEY=${DD_APP_KEY} \
		RUN_SERVER=${RUN_SERVER} \
		CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		PULL_RBAC_PERMISSIONS=${PULL_RBAC_PERMISSIONS} \
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

clean-go-examples:
	@git clean -xdf content/en/api/**/*.go

clean-java-examples:
	@git clean -xdf content/en/api/**/*.java

clean-python-examples:
	@git clean -xdf content/en/api/**/*.py*

clean-ruby-examples:
	@git clean -xdf content/en/api/**/*.rb*


clean-examples: clean-go-examples clean-java-examples clean-python-examples clean-ruby-examples
	@rm -rf examples

BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

examples/datadog-api-client-go:
	@git clone https://github.com/DataDog/datadog-api-client-go.git $@
	@cd $@ && git switch $(BRANCH) || echo "branch $(BRANCH) was not found; using default branch"

examples/datadog-api-client-java:
	@git clone https://github.com/DataDog/datadog-api-client-java.git $@
	@cd $@ && git switch $(BRANCH) || echo "branch $(BRANCH) was not found; using default branch"

examples/datadog-api-client-python:
	@git clone https://github.com/DataDog/datadog-api-client-python.git $@
	@cd $@ && git switch $(BRANCH) || echo "branch $(BRANCH) was not found; using default branch"

examples/datadog-api-client-ruby:
	@git clone https://github.com/DataDog/datadog-api-client-ruby.git $@
	@cd $@ && git switch $(BRANCH) || echo "branch $(BRANCH) was not found; using default branch"

.PHONY: examples/go examples/java examples/python examples/ruby examples

EXAMPLES_DIR = $(shell pwd)/examples/content/en/api

examples/go: examples/datadog-api-client-go clean-go-examples
	echo $(EXAMPLES_DIR)
	@cd examples/datadog-api-client-go; ./extract-code-blocks.sh $(EXAMPLES_DIR)

	-cp -Rn examples/content ./

examples/java: examples/datadog-api-client-java clean-java-examples
	@cd examples/datadog-api-client-java; ./extract-code-blocks.sh $(EXAMPLES_DIR)

	-cp -Rn examples/content ./

examples/python: examples/datadog-api-client-python clean-python-examples
	@cd examples/datadog-api-client-python; ./extract-code-blocks.sh $(EXAMPLES_DIR)

	-cp -Rn examples/content ./

examples/ruby: examples/datadog-api-client-ruby clean-ruby-examples
	@cd examples/datadog-api-client-ruby; ./extract-code-blocks.sh $(EXAMPLES_DIR)

	-cp -Rn examples/content ./


examples: examples/go examples/java examples/python examples/ruby

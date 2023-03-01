# make
SHELL = /bin/bash
.PHONY: help clean-all clean dependencies server start start-no-pre-build start-docker stop-docker all-examples clean-examples placeholders update_pre_build config derefs
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

# API Code Examples
BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)
EXAMPLES_DIR = $(shell pwd)/examples/content/en/api
EXAMPLES_REPOS := datadog-api-client-go datadog-api-client-java datadog-api-client-python datadog-api-client-ruby datadog-api-client-typescript

#DEREFS := $(shell find integrations_data/extracted/dd-source -type f -name "*manifest.json" | sed 's/\(.*\)\/manifest.json/\1\/manifest.deref.json/')
DEREFS := $(shell find integrations_data/extracted/dd-source -type f -name "*manifest.json" | sed 's/.*\/\(.*\)\/manifest.json/data\/workflows\/\1.json/')

# Set defaults when no makefile.config or missing entries
# Use DATADOG_API_KEY if set, otherwise try DD_API_KEY and lastly fall back to false
GITHUB_TOKEN ?= ""
DD_API_KEY ?= false
DD_APP_KEY ?= false
DATADOG_API_KEY ?= $(DD_API_KEY)
DATADOG_APP_KEY ?= $(DD_APP_KEY)
FULL_BUILD ?= false
CONFIGURATION_FILE ?= "./local/bin/py/build/configurations/pull_config_preview.yaml"

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

clean-all: clean clean-examples clean-dependent-repos ## Clean everything (environment, sourced repos, generated files)
	rm -rf ./node_modules ./hugpython ./public

clean-dependent-repos:
	rm -rf ./integrations_data

# remove build generated content
# removing only git ignored files
clean:  ## Clean generated files placed in the hugo site
	@git clean -Xf ./content
	@git clean -Xf ./data
	@git clean -Xf ./static/images/marketplace

# if .dockerenv exists we are running from inside a docker container
# if node_modules was generated in docker when using local or vice versa
# then generate new node_modules first to avoid binary incompatibilities
server:
	@if [[ -f /.dockerenv ]]; then \
		echo "Running docker build...."; \
		file node_modules/hugo-bin/vendor/hugo | grep "Mach-O" && make -B node_modules; \
		yarn run prestart && yarn run docker:start; \
	else \
	  echo "Running regular build...."; \
	  file node_modules/hugo-bin/vendor/hugo | grep "Mach-O" || make -B node_modules; \
	  yarn run prestart && yarn run start; \
	fi;

# Download all dependencies and run the site
start: dependencies ## Build and run docs including external content.
	@make server

# Skip downloading any dependencies and run the site (hugo needs at the least node)
start-no-pre-build: node_modules  ## Build and run docs excluding external content.
	@make server

start-docker: clean  ## Build and run docs including external content via docker
	@export REPO_PATH=$(PWD) && \
	export GITHUB_TOKEN=$(GITHUB_TOKEN) && \
	export FULL_BUILD=$(FULL_BUILD) && \
	docker-compose -f ./docker-compose-docs.yml pull && docker-compose -p docs-local -f ./docker-compose-docs.yml up

stop-docker: ## Stop the running docker container.
	@docker-compose -f ./docker-compose-docs.yml down

# install the root level node modules
node_modules: package.json yarn.lock
	@yarn install --immutable

# All the requirements for a full build
dependencies: clean hugpython all-examples data/permissions.json update_pre_build node_modules
	@make placeholders
	@make derefs

# make directories
data/workflows/:
	mkdir -p $@

# dereference any source jsonschema files
derefs: $(DEREFS)

.SECONDEXPANSION:
$(DEREFS): %.json : integrations_data/extracted/dd-source/domains/workflow/actionplatform/apps/wf-actions-worker/src/runner/bundles/$$(basename $$(notdir $$@))/manifest.json | data/workflows/
	@node ./assets/scripts/workflow-process.js $< $@

# builds permissions json from rbac
# Always run if PULL_RBAC_PERMISSIONS or we are running in gitlab e.g CI_COMMIT_REF_NAME exists
data/permissions.json:
	@. hugpython/bin/activate && ./local/bin/py/build/pull_rbac.py "$(DATADOG_API_KEY)" "$(DATADOG_APP_KEY)"

# only build placeholders in ci
placeholders:
	@. hugpython/bin/activate && ./local/bin/py/placehold_translations.py -c "config/_default/languages.yaml"

# create the virtual environment
hugpython: local/etc/requirements3.txt
	@${PY3} -m venv --clear $@ && . $@/bin/activate && $@/bin/pip install --upgrade pip wheel && $@/bin/pip install -r $<

update_pre_build:
	@. hugpython/bin/activate && GITHUB_TOKEN=$(GITHUB_TOKEN) CONFIGURATION_FILE=$(CONFIGURATION_FILE) ./local/bin/py/build/update_pre_build.py

# Only to be run during deployment
# Updates hugo preview config file for feature branch naming scheme
config:
	envsubst '$$CI_COMMIT_REF_NAME' < "config/$(CI_ENVIRONMENT_NAME)/config.yaml" | sponge "config/$(CI_ENVIRONMENT_NAME)/config.yaml"; \
	envsubst '$$CI_COMMIT_REF_NAME' < "config/$(CI_ENVIRONMENT_NAME)/params.yaml" | sponge "config/$(CI_ENVIRONMENT_NAME)/params.yaml"; \
	echo -e "\nbranch: ${CI_COMMIT_REF_NAME}" >> config/$(CI_ENVIRONMENT_NAME)/params.yaml;

#######################################################################################################################
# API Code Examples
#######################################################################################################################

# template for extracting example repos
# master = always use tag from sdk version
# branches = attempt to use an associated branch name on failure fallback to sdk version
define EXAMPLES_template
examples/$(1):
	$(eval TAG := $(or $(shell grep -A1 $(1) data/sdk_versions.json | grep version | cut -f 2 -d ':' | tr -d '" '),$(BRANCH)))
	@if [[ "$(BRANCH)" = "master" ]]; then \
		echo "Cloning $(1) at $(TAG)"; \
		git clone --depth 1 --branch $(TAG) https://github.com/DataDog/$(1).git examples/$(1); \
	else \
		echo "Cloning $(1) at $(BRANCH)"; \
		git clone --depth 1 --branch $(BRANCH) https://github.com/DataDog/$(1).git examples/$(1) || git clone --depth 1 --branch $(TAG) https://github.com/DataDog/$(1).git examples/$(1); \
	fi

.PHONY: examples/$(patsubst datadog-api-client-%,clean-%-examples,$(1)) examples/$(patsubst datadog-api-client-%,%,$(1))

examples/$(patsubst datadog-api-client-%,clean-%-examples,$(1)):
	@if [ "$$@" = "examples/clean-python-examples" ]; then \
		echo "Cleaning .py*"; \
		git clean -xdf content/en/api/**/*.py*; \
	elif [ "$$@" = "examples/clean-ruby-examples" ]; then \
		echo "Cleaning .rb*"; \
		git clean -xdf content/en/api/**/*.rb*; \
	elif [ "$$@" = "examples/clean-typescript-examples" ]; then \
		echo "Cleaning .ts*"; \
		git clean -xdf content/en/api/**/*.ts*; \
	else \
		echo "Cleaning .$(subst datadog-api-client-,,$(1))"; \
		git clean -xdf content/en/api/**/*.$(subst datadog-api-client-,,$(1)); \
	fi

examples/$(patsubst datadog-api-client-%,%,$(1)): examples/$(1) examples/$(patsubst datadog-api-client-%,clean-%-examples,$(1))
	-find examples/$(1)/examples -iname \*.py -exec mv {} {}beta \;
	-find examples/$(1)/examples -iname \*.rb -exec mv {} {}beta \;
	-cp -Rn examples/$(1)/examples/v* ./content/en/api
endef

# generate rules for each repo from the template/function
# e.g
# with repo datadog-api-client-go we would get targets
# examples/datadog-api-client-go/.git
# examples/go
# examples/clean-go-examples
$(foreach repo,$(EXAMPLES_REPOS),$(eval $(call EXAMPLES_template,$(repo))))

# build all examples
# dynamic prerequisites equivalent to examples/go examples/java examples/python etc.
all-examples: $(foreach repo,$(EXAMPLES_REPOS),$(addprefix examples/, $(patsubst datadog-api-client-%,%,$(repo))))

# clean all examples
# dynamic prerequisites equivalent to examples/clean-go-examples examples/clean-java-examples examples/clean-python-examples etc.
clean-examples: $(foreach repo,$(EXAMPLES_REPOS),$(addprefix examples/, $(patsubst datadog-api-client-%,clean-%-examples,$(repo))))
	@rm -rf examples

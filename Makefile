# make
SHELL = /bin/bash
# MAKEFLAGS := --jobs=$(shell nproc)
# MAKEFLAGS += --output-sync --no-print-directory
.PHONY: help clean-all clean start-preserve-build dependencies server start start-no-pre-build start-docker stop-docker all-examples clean-examples placeholders update_pre_build config derefs vector_data websites_sources_data build-api-derefs
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
EXAMPLES_REPOS := datadog-api-client-go datadog-api-client-java datadog-api-client-python datadog-api-client-ruby datadog-api-client-typescript datadog-api-client-rust

# Set defaults when no makefile.config or missing entries
GITHUB_TOKEN ?= ""
FULL_BUILD ?= false
CONFIGURATION_FILE ?= "./local/bin/py/build/configurations/pull_config_preview.yaml"

# Set default S3 path for websites sources data
FF_S3_PATH ?= "staging"

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

clean-all: clean clean-examples clean-dependent-repos clean-build-scripts ## Clean everything (environment, sourced repos, generated files, build scripts)
	rm -rf ./node_modules ./hugpython ./public ./_vendor

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

update-blog-links: hugpython
	@. hugpython/bin/activate && \
	./local/bin/py/blog_linker.py

# compile .mdoc.md files to HTML
# so Hugo can include them in the site
build-cdocs:
	@echo "Compiling .mdoc files to HTML";
	@node ./local/bin/js/cdocs-build.js;

# build .mdoc.md files, then watch for changes
watch-cdocs:
	@echo "Compiling .mdoc files to HTML";
	@node ./local/bin/js/cdocs-build.js --watch;

build-api-derefs:
	@node ./assets/scripts/build-api-derefs.js

start:
	@make setup-build-scripts ## Build and run docs including external content.
	@make dependencies
	@make server

# Skip downloading any dependencies and run the site (hugo needs at the least node)
start-no-pre-build: node_modules  ## Build and run docs excluding external content.
	@make setup-build-scripts
	@make build-cdocs
	@make server

# Leave build scripts as is for local testing
# This is useful for testing changes to the build scripts locally
start-preserve-build: dependencies
	@make server

# Run the site with websites_sources_data (integrations previews)
start-sources: node_modules
	@make setup-build-scripts
	@make websites_sources_data
	@make build-cdocs
	@make server

# Leave build scripts in place, but skip dependencies and sources_module
# Useful for testing local changes to the CDOCS build script
start-cdocs-preserve-build:
	@make build-cdocs
	@make server

start-docker: clean  ## Build and run docs including external content via docker
	@export REPO_PATH=$(PWD) && \
	export GITHUB_TOKEN=$(GITHUB_TOKEN) && \
	export FULL_BUILD=$(FULL_BUILD) && \
	docker-compose -f ./docker-compose-docs.yml pull && docker-compose -p docs-local -f ./docker-compose-docs.yml up

stop-docker: ## Stop the running docker container.
	@docker-compose -f ./docker-compose-docs.yml down

find-int: hugpython ## Find the source for an integration (downloads/updates integrations repos first)
	@. hugpython/bin/activate && \
	export GITHUB_TOKEN=$(GITHUB_TOKEN) && \
	./local/bin/py/integration-finder.py $(int)

# install the root level node modules
node_modules: package.json yarn.lock
	@yarn install --immutable

# All the requirements for a full build
dependencies: clean
	make hugpython all-examples update_pre_build node_modules build-cdocs websites_sources_data

# Download files from S3 bucket and add them to the file system.
# Preview S3 content locally: add FF_S3_PATH env var when executing appropriate Make targets
# e.g. make start-sources FF_S3_PATH=<websites-sources feature branch>
websites_sources_data: hugpython
	@echo "Removing _vendor directory..."
	rm -rf _vendor
	@echo "Downloading fresh data from websites-sources S3 bucket..."
	@. hugpython/bin/activate && \
		export FF_S3_PATH=${FF_S3_PATH} && \
		python3 ./local/bin/py/build/get_websites_sources_data.py

integrations_data/extracted/vector:
	$(call source_repo,vector,https://github.com/vectordotdev/vector.git,master,true,website/)

# builds cue.json for vector
vector_data: integrations_data/extracted/vector
	@cue export $(shell find integrations_data/extracted/vector -type f -name "*.cue") > integrations_data/extracted/vector/cue.json; \
	node ./assets/scripts/reference-process.js

# only build placeholders in ci
placeholders: hugpython update_pre_build
	make build-api-derefs
	@. hugpython/bin/activate && ./local/bin/py/placehold_translations.py -c "config/_default/languages.yaml"
	@. hugpython/bin/activate && ./local/bin/py/placehold_translations.py -c "config/_default/languages.yaml" -f "./_vendor/content/en/"

# create the virtual environment
hugpython: local/etc/requirements3.txt
	@${PY3} -m venv --clear $@ && . $@/bin/activate && $@/bin/pip install --upgrade pip wheel && $@/bin/pip install -r $<;\
	if [[ "$(CI_COMMIT_REF_NAME)" != "" ]]; then \
		$@/bin/pip install https://binaries.ddbuild.io/dd-source/python/assetlib-0.0.72592276-py3-none-any.whl; \
	fi

update_pre_build: hugpython
	@. hugpython/bin/activate && GITHUB_TOKEN=$(GITHUB_TOKEN) CONFIGURATION_FILE=$(CONFIGURATION_FILE) ./local/bin/py/build/update_pre_build.py

# Only to be run during deployment
# Updates hugo preview config file for feature branch naming scheme
config:
	envsubst '$$CI_COMMIT_REF_NAME' < "config/$(CI_ENVIRONMENT_NAME)/config.yaml" | sponge "config/$(CI_ENVIRONMENT_NAME)/config.yaml"; \
	envsubst '$$CI_COMMIT_REF_NAME' < "config/$(CI_ENVIRONMENT_NAME)/params.yaml" | sponge "config/$(CI_ENVIRONMENT_NAME)/params.yaml"; \
	echo -e "\nbranch: ${CI_COMMIT_REF_NAME}" >> config/$(CI_ENVIRONMENT_NAME)/params.yaml;

# # Automatically download the latest module from websites-sources repo
# update_websites_sources_module:
# 	node_modules/hugo-bin/vendor/hugo mod get github.com/DataDog/websites-sources@main
# 	node_modules/hugo-bin/vendor/hugo mod clean
# 	node_modules/hugo-bin/vendor/hugo mod tidy
# 	cat go.mod
# 	@if [ -n "$(CI_COMMIT_REF_NAME)" ]; then \
# 		echo "In ci, vendoring integrations pages for placeholder generation"; \
# 		node_modules/hugo-bin/vendor/hugo mod vendor; \
# 		cp -rpv _vendor/github.com/DataDog/websites-sources/content/en/integrations/. content/en/integrations/; \
# 		rm -rf _vendor; \
# 	fi

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
	-find examples/$(1)/examples -maxdepth 1 -iname \*.rs -exec sh -c 'mkdir -p `echo {} | sed "s/\_/\//2" | sed "s/\_/\//1" | xargs dirname` && mv {} `echo {} | sed "s/\_/\//2" | sed "s/\_/\//1"`' \;
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

# Local build setup
PY_PATH := local/bin/py
JS_PATH := local/bin/js
TRANSLATIONS_PATH := $(PY_PATH)/translations
BUILD_SCRIPTS_PATH := $(PY_PATH)/build

.PHONY: setup-build-scripts clean-build-scripts backup-config restore-config

# Save specific config files
backup-config:
	@tmp_backup=$$(mktemp -d) && \
	mkdir -p $$tmp_backup/build_backup && \
	if [ -d "$(BUILD_SCRIPTS_PATH)/configurations" ]; then \
		for config in pull_config_preview.yaml pull_config.yaml integration_merge.yaml; do \
			if [ -f "$(BUILD_SCRIPTS_PATH)/configurations/$$config" ]; then \
				cp "$(BUILD_SCRIPTS_PATH)/configurations/$$config" "$$tmp_backup/build_backup/$$config"; \
			fi \
		done; \
	fi && \
	if [ -d "$(PY_PATH)" ]; then \
	    mkdir -p $$tmp_backup/py_backup && \
	    find $(PY_PATH) -mindepth 1 -maxdepth 1 \
	        ! -name "build" \
	        ! -name "translations" \
	        ! -name "add_notranslate_tag.py" \
	        ! -name "missing_metrics.py" \
	        ! -name "placehold_translations.py" \
	        ! -name "submit_github_status_check.py" \
	        -exec cp -r {} $$tmp_backup/py_backup/ \; ; \
	fi && \
	echo "$$tmp_backup" > .backup_path

# Restore specific config files
restore-config:
	@if [ -f .backup_path ]; then \
		backup_dir=$$(cat .backup_path) && \
		if [ -d "$$backup_dir/py_backup" ]; then \
			cp -r $$backup_dir/py_backup/* $(PY_PATH)/; \
		fi && \
		if [ -d "$$backup_dir/build_backup" ]; then \
			mkdir -p $(BUILD_SCRIPTS_PATH)/configurations && \
			for config in pull_config_preview.yaml pull_config.yaml integration_merge.yaml; do \
				if [ -f "$$backup_dir/build_backup/$$config" ]; then \
					cp "$$backup_dir/build_backup/$$config" "$(BUILD_SCRIPTS_PATH)/configurations/$$config"; \
				fi \
			done; \
		fi && \
		rm -rf $$backup_dir && \
		rm .backup_path; \
	fi

$(PY_PATH):
	@mkdir -p $(PY_PATH)

# Clean build scripts
clean-build-scripts:
	@echo "Cleaning build files..."
	@$(MAKE) backup-config
	@rm -rf $(PY_PATH)
	@rm -rf $(JS_PATH)
	@mkdir -p $(PY_PATH)
	@mkdir -p $(BUILD_SCRIPTS_PATH)
	@$(MAKE) restore-config

# Source the build scripts and maintain file structure
setup-build-scripts: $(PY_PATH) backup-config clean-build-scripts
	@echo "Fetching latest build scripts..."; \
	if [ -z "$(BUILD_SCRIPT_BRANCH)" ] || [ -z "$(BUILD_SCRIPT_REPO_URL)" ] || [ -z "$(BUILD_SCRIPT_SOURCE_DIR)" ]; then \
		echo -e "\033[0;31mone or more build-script env vars are undefined, check your makefile.config \033[0m"; \
		exit 1; \
	fi;
	@tmp_dir=$$(mktemp -d) && \
	git clone --depth 1 -b $(BUILD_SCRIPT_BRANCH) $(BUILD_SCRIPT_REPO_URL) $$tmp_dir && \
	if [ -d "$$tmp_dir/$(BUILD_SCRIPT_SOURCE_DIR)" ]; then \
		echo "Moving files to python directory..." && \
		cp -r $$tmp_dir/$(BUILD_SCRIPT_SOURCE_DIR)/* $(PY_PATH)/ && \
		if [ -d "$(PY_PATH)/services" ]; then \
			echo "Cleaning up directory structure..." && \
			rm -rf $(PY_PATH)/services; \
		fi \
	fi && \
	rm -rf $$tmp_dir
	@$(MAKE) restore-config
	mkdir local/bin/js
	cp -r $(PY_PATH)/js/* $(JS_PATH)/
	rm -rf local/bin/py/sh local/bin/py/js
	@echo "Build scripts updated successfully!"

# Function that will clone a repo or sparse clone a repo
# If the dir already exists it will attempt to update it instead
#
# Arguments
# 1 = dir name to clone to
# 2 = https repo url
# 3 = Branch name
# 4 = whether this is a sparse checkout or not
# 5 = sparse files/dirs to include other than cone root files
define source_repo
	@if $(4) ; then \
		if [ -d ./integrations_data/extracted/$(1) ]; then \
			git -C ./integrations_data/extracted/$(1) checkout $(3); \
		else \
			rm -rf ./integrations_data/extracted/$(1); \
			git clone --branch $(3) --depth 1 --filter=blob:none --no-checkout $(2) ./integrations_data/extracted/$(1); \
			cd ./integrations_data/extracted/$(1); \
			git sparse-checkout init --cone; \
			git sparse-checkout set $(5); \
			git checkout $(3); \
		fi \
	else \
		if [ -d ./integrations_data/extracted/$(1) ]; then \
			git -C ./integrations_data/extracted/$(1) pull --ff-only; \
		else \
			git clone --branch $(3) --depth 1 --filter=blob:none $(2) ./integrations_data/extracted/$(1); \
		fi \
	fi
endef

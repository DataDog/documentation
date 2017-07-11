# make
.PHONY: clean clean-all clean-build clean-docker clean-exe clean-integrations clean-node clean-virt docker-start docker-stop docker docker-tests help start stop
.DEFAULT_GOAL := help

CONFIG_FILE := Makefile.config
# Explicitly check for the config file, otherwise make -k will proceed anyway.
ifeq ($(wildcard $(CONFIG_FILE)),)
$(error $(CONFIG_FILE) not found. See $(CONFIG_FILE).example.)
endif
include $(CONFIG_FILE)


help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

clean: stop  ## clean all make installs.
	make clean-build
	make clean-integrations

clean-all: stop  ## clean everything.
	make clean-build
	make clean-docker
	make clean-exe
	make clean-integrations
	make clean-node
	make clean-virt

clean-build:  ## remove build artifacts.
	@if [ -d public ]; then rm -r public; fi

clean-docker:  ## remove image.
	@if [[ `docker ps -a | grep docs` ]]; then printf  "removing:" && docker rm -f docs; fi
	@if [[ `docker images | grep mstbbs/docker-dd-docs` ]]; then printf  "removing:" && docker rmi -f mstbbs/docker-dd-docs; fi

clean-exe:  ## remove execs.
	@rm -rf ${EXE_LIST}

clean-integrations:  ## remove built integrations files.
	@rm -rf data/integrations

clean-node:  ## remove node_modules.
	@if [ -d node_modules ]; then rm -r node_modules; fi

clean-virt:  ## remove python virtual env.
	@if [ -d ${VIRENV} ]; then rm -rf $(VIRENV); fi

docker: stop  ## build docker image.
	@docker build -t dd-docs gitlab/

docker-start: stop  ## start container and run default commands to start hugo site.
	@docker run -ti --name "docs" -v `pwd`:/src:cached \
		-e FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS} \
		-e GITHUB_TOKEN \
		-e RUN_SERVER=${RUN_SERVER} \
		-e CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		-e DOGWEB=${DOGWEB} \
		-e INTEGRATIONS_CORE=${INTEGRATIONS_CORE} \
		-e USE_DOCKER=true \
		-p 1313:1313 mstbbs/docker-dd-docs

docker-stop:  ## kill the site and stop the running container.
	@if [[ `docker ps -a | grep docs` ]]; then printf  "removing:" && docker rm -f docs; fi

docker-tests: stop ## run the tests through the docker container.
	@docker run -tid --name "docs" -v `pwd`:/src:cached \
		-e RUN_SERVER=true \
		-e RUN_GULP=false \
		-p 1313:1313 mstbbs/docker-dd-docs
	@printf "\e[93mSetting up test environment, this may take a minute...\033[0m\n"
	@docker exec -ti docs run-tests.sh
	@make docker-stop

hugpython: hugpython/bin/activate  ## build virtualenv used for tests.

hugpython/bin/activate: gitlab/etc/requirements3.txt  ## start python virtual environment.
	@if ! command -v python3 > /dev/null 2>&1; then printf "\e[93mPython 3 is required.\033[0m\n" && exit 1; fi;
	@echo "installing virtualenv..."
	@test -d ${VIRENV} || python3 -m venv ${VIRENV}
	@$(VIRENV)/bin/pip install -Ur gitlab/etc/requirements3.txt

source-helpers: hugpython  ## source the helper functions used in build, test, deploy.
	@find ${LOCALBIN}/*  -type f -exec cp {} ${EXEDIR} \;

start: stop source-helpers ## start the gulp/hugo server.
	@echo "starting up..."
	@source ${VIRENV}/bin/activate; \
		FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS} \
		GITHUB_TOKEN=${GITHUB_TOKEN} \
		RUN_SERVER=${RUN_SERVER} \
		CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		DOGWEB=${DOGWEB} \
		INTEGRATIONS_CORE=${INTEGRATIONS_CORE} \
		gitlab/bin/sh/run-site.sh

stop:  ## stop the gulp/hugo server.
	@echo "cleaning up..."
	@pkill -x gulp || true
	@pkill -x hugo server --renderToDisk || true

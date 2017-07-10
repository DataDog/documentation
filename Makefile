# make
.PHONY: clean clean-build clean-docker clean-node help start stop tests
.DEFAULT_GOAL := help

# build options
CREATE_I18N_PLACEHOLDERS = false
FETCH_INTEGRATIONS = false
GITHUB_TOKEN = ${github_personal_token}
RUN_SERVER = true
RUN_GULP = true


help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

clean: stop  ## clean all make installs.
	make clean-build
	make clean-docker
	make clean-node

clean-build:  ## remove build artifacts.
	@if [ -d public ]; then rm -r public; fi

clean-docker:  ## remove image
	@if [[ `docker ps -a | grep docs` ]]; then printf  "removing:" && docker rm -f docs; fi
	@if [[ `docker images | grep dd-docs` ]]; then printf  "removing:" && docker rmi -f dd-docs; fi

clean-node:  ## remove node_modules.
	@if [ -d node_modules ]; then rm -r node_modules; fi

docker: stop  ## build and run docker env with gulp watch enabled
	@docker build -t dd-docs gitlab/

start: stop docker  ## build the docker image and run default commands to start hugo site.
	@docker run -ti --name "docs" -v `pwd`:/src:cached \
		-e FETCH_INTEGRATIONS=${FETCH_INTEGRATIONS} \
		-e GITHUB_TOKEN \
		-e RUN_SERVER=${RUN_SERVER} \
		-e CREATE_I18N_PLACEHOLDERS=${CREATE_I18N_PLACEHOLDERS} \
		-p 1313:1313 dd-docs

stop:  ## kill the site and stop the running container
	@if [[ `docker ps -a | grep docs` ]]; then printf  "removing:" && docker rm -f docs; fi

tests: stop docker ## run the tests through the docker container
	@docker run -tid --name "docs" -v `pwd`:/src:cached \
		-e RUN_SERVER=true \
		-e RUN_GULP=false \
		-p 1313:1313 dd-docs
	@printf "\e[93mSetting up test environment, this may take a minute...\033[0m\n"
	@docker exec -ti docs run-tests.sh
	@make docker-stop

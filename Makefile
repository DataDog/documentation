.PHONY: clean clean-build clean-exe clean-venv help pre-build source-helpers start stop tests test-images test-links test-static
.DEFAULT_GOAL := help
LOCALBIN = gitlab/bin
LOCALETC = gitlab/etc
EXEDIR = /usr/local/bin
EXE_LIST = `find gitlab/bin -type f -exec sh -c "echo ${EXEDIR}/{} | sed s@${LOCALBIN}/@@" \;`
VIRENV = hugpython
CONFIG = config.yaml
ARTIFACT_NAME = public
URL = http://localhost:1313/
CI_ENVIRONMENT_NAME = local
FETCH_INTEGRATIONS = false

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

build: pre-build  ## digest and build a hugo site.
	hugo --config=${CONFIG};
	@make digest

clean:  ## clean all make installs.
	make clean-build
	make clean-exe
	make clean-venv

clean-build:  ## remove build artifacts.
	@if [ -d public ]; then rm -r public; fi

clean-exe:  ## remove execs.
	@rm -rf ${EXE_LIST}

clean-venv:  ## remove python virtual env.
	@if [ -d ${VIRENV} ]; then rm -rf $(VIRENV); fi

digest:  ## create a digest of all pages built by hugo.
	@find ${ARTIFACT_NAME} -name '*.html' -type f -exec grep -vl 'http-equiv="refresh"' {} /dev/null \; | \
        sed -ne "s@${ARTIFACT_NAME}@.$(pwd)/${ARTIFACT_NAME}@p" | \
        cat > ${ARTIFACT_NAME}/digest.txt

hugpython: hugpython/bin/activate  ## build virtualenv used for tests.

hugpython/bin/activate: gitlab/etc/requirements3.txt  ## start python virtual environment.
	@if ! command -v python3 > /dev/null 2>&1; then printf "\e[93mPython 3 is required.\033[0m\n" && exit 1; fi;
	@echo "installing virtualenv..."
	@test -d ${VIRENV} || python3 -m venv ${VIRENV}
	@$(VIRENV)/bin/pip install -r gitlab/etc/requirements3.txt

pre-build: source-helpers  ## gulp tasks; gather external content & data.
	@gulp build --silent; \
	if [ ! ${github_personal_token} ]; then printf "\e[93mNo github token found. Skipping integrations download.\033[0m\n"; \
	else if [ ${FETCH_INTEGRATIONS} == true ]; then integrations_sync_osx --token ${github_personal_token} || true; fi; fi;\
	placehold_translations.py -c "config.yaml" -f "content/";

source-helpers: hugpython  ## source the helper functions used in build, test, deploy.
	@find ${LOCALBIN}/*  -type f -exec cp {} ${EXEDIR} \;

start: stop pre-build  ## start the gulp/hugo server.
	@echo "starting up..."
	@gulp watch --silent &>/dev/null & \
	hugo server --renderToDisk &>/dev/null &
	@printf "\e[96mDocs site is now running. Visit http://localhost:1313/ \033[0m\n"
	@printf "run 'make stop' to kill.\n"

stop:  ## stop the gulp/hugo server.
	@echo "cleaning up..."
	@pkill -x gulp || true
	@pkill -x hugo server --renderToDisk || true

tests:  ## test a build.
	make test-images
	make test-links
	make test-static
	make stop
	make clean-build
	make clean-exe

test-images: start  ## test images.
	make digest
	@source ${VIRENV}/bin/activate; \
	check_links.py "images" -p 15 -f "`cat ${ARTIFACT_NAME}/digest.txt`" -d "${URL}" --check_all "True" \
    	--verbose "False" --src_path "`pwd`/${ARTIFACT_NAME}" --external "True" --timeout 5;

test-links: start  ## test all links work.
	make digest
	@source ${VIRENV}/bin/activate; \
	check_links.py "links" -p 15 -f "`cat ${ARTIFACT_NAME}/digest.txt`" -d "${URL}" --check_all "True" \
    	--verbose "False" --src_path "`pwd`/${ARTIFACT_NAME}" --external "True" --timeout 5 \
    	--ignore "`pwd`/${LOCALETC}/links.ignore";

test-static: start  ## test static assets are available.
	make digest
	@source ${VIRENV}/bin/activate; \
	check_links.py "static" -p 15 -f "`cat ${ARTIFACT_NAME}/digest.txt`" -d "${URL}" --check_all "True" \
   		--verbose "False" --src_path "`pwd`/${ARTIFACT_NAME}" --external "True" --timeout 5;

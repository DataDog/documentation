# Documentation site for Datadog

Built with [hugo](https://gohugo.io/), a static website generation tool.

## Setup
### Installation

* Install hugo: https://gohugo.io/overview/installing/

* Install nodejs: https://nodejs.org/en/download/package-manager/

* Install Python3: https://www.python.org/downloads/ or https://github.com/pyenv/pyenv

* Install gulp: ```yarn add gulp-yarn -D```

* Download the documentation repo ```git clone https://github.com/DataDog/documentation.git```

### Run the server

Inside `documentation/` folder, create a `Makefile.config` file from the [Makefile.config.example](https://github.com/DataDog/documentation/blob/master/Makefile.config.example)

If you are a Datadog employee, add your [Github personal token](https://github.com/DataDog/documentation/wiki/Github-personal-token)

To run the site without Docker and perform administrative tasks (compile metrics, create i18n placeholders, etc), just execute:

`make start`

Documentation is available at `http://localhost:1313`

To run the site with Docker (easier setup, slower server), install [Docker](https://docs.docker.com/engine/installation/#supported-platforms) then execute: 

`make docker-start`

### Makefile

To use the Makefile, create a Makefile.config. See the instructions at the top of the [Makefile.config.example](https://github.com/DataDog/documentation/blob/master/Makefile.config.example).

After you have a config file you can run `make help` to see options:

```
clean-build               remove build artifacts.
clean-docker              remove image.
clean-exe                 remove execs.
clean-integrations        remove built integrations files.
clean-node                remove node_modules.
clean-virt                remove python virtual env.
clean                     clean all make installs.
docker-start              start container and run default commands to start hugo site.
docker-stop               kill the site and stop the running container.
docker-tests              run the tests through the docker container.
hugpython                 build virtualenv used for tests.
source-helpers            source the helper functions used in build, test, deploy.
start                     start the gulp/hugo server.
stop                      stop the gulp/hugo server.
```

## Working on Docs

### Datadog Staff

* Always branch off of master; never commit directly to master.
* Name your branch `slack_handle/your_feature` if you would like to create a preview site and run tests.
* When you are ready to commit, create a new pull request to master from your branch.
* Consult our [contributing guidelines](https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md)

### Outside Contributors

* Fork the master branch
* When you are ready to commit make a pull request back to `DataDog/master`
* Consult our [contributing guidelines](https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md)

### A note about markdown

This site uses Blackfriday for markdown. To learn about the syntax, [see this site](https://github.com/russross/blackfriday).

If you include ANY Markdown in a file, give it an .md extension.

Make sure all files are lowercase. Macs are case insensitive when creating links to images and pages, but the server is not so tests may be fine locally but the site will fail in production.

## Releasing

If you receive an error regarding `There was a problem getting GitHub Metrics`, please see the [Github personal access token](https://github.com/DataDog/documentation/wiki/Github-personal-token).

Within 5 minutes of merging to master, it deploys automatically. You can see the status in the internal Datadog Slack *#documentation* channel.

## How to add a new integration

[See the dedicated doc page](https://docs.datadoghq.com/developers/integrations)

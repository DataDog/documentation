# Documentation site for Datadog

Built with [hugo][1], a static website generation tool.

## Setup

### Installation

1. [Install Node / npm][2] (node `>=14.16.0`)

2. [Install Python3][3] (you can also use [pyenv][4])

3. [Install hugo][12]

4. [Install Go][13] (at minimum, `go version` 1.12)

5. Install yarn: `npm install -g yarn`

6. Download the documentation repo `git clone https://github.com/DataDog/documentation.git`

### Run the server

Inside `documentation/` folder, create a `Makefile.config` file from the [Makefile.config.example][5]

If you are a Datadog employee, add your [GitHub personal token][6]

To run the documentation site locally, execute:

| Command                   | Description                                                                                                                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `make start-no-pre-build` | Build the lightweight version of the documentation with no extra content                                                                                                                                                                   |
| `make start`*             | Build the full documentation with all extra content (integrations, extra pulled files, localized content, etc). Only useful if you have a GitHub personal token setup in your `Makefile.config` or the extra content is available locally. |
| `make start-docker`       | Build the documentation using the docker image. For more information see [Docker Development][15].                                                                                                                                         |

**Documentation is then available at `http://localhost:1313`**

**NOTE**: `make start` attempts to pull all dependent repos from their origins or a local cache. The order it attempts to retrieve is:
  * One directory above where this repo is cloned.
  * `integrations_data`: A local pull of all dependent repos from the last successful build
  * If neither of the above exist, an attempt is made to pull dependent repos from upstream.

If you'd like to re-pull dependencies, run `make clean-all` and then try your `make` command again.

To learn more about how the documentation is built, refer to the [Documentation Build Wiki][7].

## Working on Docs

### Datadog Staff

* Always branch off of master; never commit directly to master.
* Name your branch `<SLACK_HANDLE>/<FEATURE_NAME>` if you would like to create a preview site and run tests.
* When you are ready to commit, create a new pull request to master from your branch.
* Consult our [contributing guidelines][8], and the [Documentation Build Wiki][7].
* Use GitHub's [draft pull request][14] feature and appropriate labels such as "Do Not Merge" or "Work in Progress" until your PR is ready to be merged and live on production.

### Outside Contributors

* Fork the master branch.
* Consult our [contributing guidelines][8].
* When you are ready to finalize your changes, commit them, and then make a pull request back to `DataDog/master`.
* A DataDog technical writer might change your PR title with a DOCS ticket number, such as "[DOCS-9000]" which just means it has been added to the team's internal Jira queue to triage and review. No action is necessary from you if we change the title of your PR.


### A note about markdown

This site uses [Goldmark][9] for markdown, which is compliant with [CommonMark 0.29][10].

If you include ANY Markdown in a file, give it an `.md` extension.

Make sure all files are lowercase. Macs are case insensitive when creating links to images and pages, but our build server is not, so tests may work locally, but the site will fail in production.

## Releasing

Within 10 minutes of merging to master, it deploys automatically.

## How to add a new integration

[See the dedicated doc page][11].

## Docker development

Prerequsites:
- Running Monterey OSX
- Docker Desktop >= 4.7.1 is installed
- At least 6GB of RAM is dedicated towards Docker for Mac
  1. Open the Docker for Mac app dashboard
  2. Click the gear icon
  3. Click Resources
  4. The memory slider should be set to 6GB
- VirtioFS is enabled
  1. Open the Docker for Mac app dashboard
  2. Click the gear icon
  3. Click Experimental Features
  4. Click Enable VirtioFS accelerated directory sharing
  5. Click Apply & Restart

### How to run documentation inside a Docker container
1. Go to project root
2. Make a copy of `Makefile.config.example` called `Makefile.config`
3. Enter value for `GITHUB_TOKEN`
4. Set `DOCKER` to true
5. Run `make start-docker`

To stop the app, hit Ctrl-C or run `make stop-docker`

[1]: https://gohugo.io
[2]: https://nodejs.org/en/download/package-manager
[3]: https://www.python.org/downloads
[4]: https://github.com/pyenv/pyenv
[5]: https://github.com/DataDog/documentation/blob/master/Makefile.config.example
[6]: https://github.com/DataDog/documentation/wiki/Github-personal-token
[7]: https://github.com/DataDog/documentation/wiki/Documentation-Build
[8]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
[9]: https://github.com/yuin/goldmark
[10]: https://spec.commonmark.org/0.29/
[11]: https://docs.datadoghq.com/developers/integrations
[12]: https://gohugo.io/getting-started/installing/
[13]: https://golang.org/doc/install
[14]: https://github.blog/2019-02-14-introducing-draft-pull-requests/
[15]: https://github.com/DataDog/documentation/blob/master/README.md#docker-development

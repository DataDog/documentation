# Documentation site for Datadog

Welcome to the Datadog documentation repository. The markdown stored in this repo is published to the [Datadog documentation site][17] using [hugo][1], a static website generation tool.

## Contribute to the docs

Contributions are encouraged! If you notice something on one of the pages that needs an edit, open a pull request in this repo for the documentation team to review

Most pages on the documentation site feature an **Edit** button that sends you to the source file in this repo. You can make an edit straight from the GitHub website!

![The edit button on a docs page](static/images/edit_link.png)

For more information on contributing, see the [contribution guidelines][18].

## Setup

> [!NOTE]
> The documentation build is only available to Datadog employees.

### Installation

1. [Install Node.js and npm][2] (Node.js `>=14.16.0`)
1. [Install Python 3][3] (you can also use [pyenv][4])
1. [Install Hugo][13]
1. [Install Go][14] (at minimum, `go version` 1.12)
1. Install Yarn: `npm install -g yarn`
1. Ensure you've created an [SSH key and added it to your GitHub account][19].
1. Download the documentation repo: `git clone git@github.com:DataDog/documentation.git`. 

### Run the server

Inside the `documentation/` folder, create a `Makefile.config` file from the [Makefile.config.example][5].

If you are a Datadog employee, add your [GitHub personal token][6].

To run the documentation site locally, execute the following commands:

| Command                   | Description                                                                                       |
|---------------------------|---------------------------------------------------------------------------------------------------|
| `make start-no-pre-build` | Build the lightweight version of the documentation with no extra content                          |
| `make start`*             | Build the full documentation with all extra content (integrations, extra pulled files, localized content, etc). Only useful if you have a GitHub personal token setup in your `Makefile.config` or the extra content is available locally. |
| `make start-docker`       | Build the documentation using the docker image. For more information, see [Docker Development][16]. |

**Documentation is then available at `http://localhost:1313`.**

**NOTE**: `make start` attempts to pull all dependent repos from their origins or a local cache. The order it attempts to retrieve is:
  - One directory above where this repo is cloned.
  - `integrations_data`: A local pull of all dependent repos from the last successful build.
  - If neither of the above exist, an attempt is made to pull dependent repos from upstream.

If you'd like to re-pull dependencies, run `make clean-all` and then try your `make` command again.

To learn more about how the documentation is built, refer to the [Documentation Build Wiki][7].

## Working on Docs

### Datadog Staff

- Always branch off of master; never commit directly to master.
- Name your branch `<SLACK_HANDLE>/<FEATURE_NAME>` if you would like to create a preview site and run tests.
  - If you're collaborating on a branch with someone, you can have two names on the branch so you can both receive Slack notifications when a preview build finishes, e.g. `<SLACK_HANDLE_1>/<SLACK_HANDLE_2>/<FEATURE_NAME>`.
- When you are ready to commit, create a new pull request to master from your branch.
- Consult our [contributing guidelines][8], and the [Documentation Build Wiki][7].
- Use GitHub's [draft pull request][15] feature and appropriate labels such as "Do Not Merge" or "Work in Progress" until your PR is ready to be merged and live on production.

### Outside Contributors

- Fork the master branch.
- Consult our [contributing guidelines][8].
- When you are ready to finalize your changes, commit them, and then make a pull request back to `DataDog/master`.
- A Datadog technical writer might change your PR title with a DOCS ticket number, such as "[DOCS-9000]," which just means it has been added to the team's internal Jira queue to triage and review. No action is necessary from you if we change the title of your PR.

### A note about markdown

This site uses [Goldmark][9] for markdown, which is compliant with [CommonMark 0.29][10].

If you include ANY Markdown in a file, give it a `.md` extension.

Make sure all files are lowercase. Macs are case-insensitive when creating links to images and pages, but our build server is not, so tests may work locally, but the site will fail in production.

## Releasing

Within 10 minutes of merging to master, it deploys automatically.

## How to add a new integration

[See the dedicated doc page][11].

## Docker development

Prerequisites:
- Running Monterey OSX
- [Docker Desktop][12] >= 4.7.1 is installed
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

1. Go to the project root.
2. Make a copy of `Makefile.config.example` called `Makefile.config`.
3. Enter a value for `GITHUB_TOKEN`.
4. Set `FULL_BUILD` to true to build the full documentation with all extra content.
5. Run `make start-docker`.

To stop the app, hit Ctrl-C or run `make stop-docker`.

[1]: https://gohugo.io
[2]: https://nodejs.org/en/download/package-manager#macos
[3]: https://www.python.org/downloads
[4]: https://github.com/pyenv/pyenv#unixmacos
[5]: https://github.com/DataDog/documentation/blob/master/Makefile.config.example
[6]: https://github.com/DataDog/documentation/wiki/Github-personal-token
[7]: https://github.com/DataDog/documentation/wiki/Documentation-Build
[8]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
[9]: https://github.com/yuin/goldmark
[10]: https://spec.commonmark.org/0.29/
[11]: https://docs.datadoghq.com/developers/integrations
[12]: https://www.docker.com/products/docker-desktop/
[13]: https://gohugo.io/getting-started/installing/
[14]: https://golang.org/doc/install
[15]: https://github.blog/2019-02-14-introducing-draft-pull-requests/
[16]: https://github.com/DataDog/documentation#docker-development
[17]: https://docs.datadoghq.com
[18]: /CONTRIBUTING.md
[19]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

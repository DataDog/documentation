# Documentation site for Datadog

Built with [hugo](https://gohugo.io/), a static website generation tool.

# Setup

## Github personal token

Integrations that have metrics will attempt to read the metrics metadata list from the Datadog web application repo. This requires read access to that repository and your Github Personal Token. If you are not a Datadog employee, please skip this step.

For more information on generating a token, see [Github's documentation](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).

After you've generated a token, add the following line to the `.bash_profile` in your home directory:

```
export github_personal_token=[paste access token here]
```

You should then run `source ~/.bash_profile` to reload the settings.

Update the Makefile:

```
FETCH_INTEGRATIONS = true
```

## Advanced setup

### Install dependencies

* Install hugo: https://gohugo.io/overview/installing/

* Install nodejs: https://nodejs.org/en/download/package-manager/

* Install gulp:
```
npm install --global --production gulp-cli && npm install
```

### Run the server
`make start` will start the hugo server and gulp watch tasks in the background.
You can also run `gulp && hugo server --renderToDisk --verbose` to run the server in the foreground. 

### Run tests
`make tests` will run image and link checkers.

# Working on Docs

This site uses Blackfriday for markdown. To learn about the syntax, [see this site](https://github.com/russross/blackfriday).

If you include ANY Markdown in a file, give it an .md extension.

Make sure all files are lowercase. Macs are case insensitive when creating links to images and pages, but the server is not. The tests will be fine locally but the site will fail in production.

# Releasing

Before push/merging, run `make tests` to verify there are no broken links.

**If there are errors, please don't merge.**

If you receive an error regarding `There was a problem getting GitHub Metrics`, please see the Github personal access token information in the setup instructions above.

Within 5 minutes of merging to master, it will deploy automatically. You can see the status in the internal Datadog Slack #documentation channel.

# How to add a new integration

Integrations include information that comes from two different sources. The first and main source are the files under content/integrations. The second source are the metric csv files under dogweb. In order to see the metric tables that appear for some of the integrations, you need to create an environment variable called `github_personal_token` assigned your github personal token (you need to have access to dogweb and therefore must be a Datadog employee to see this). The table will be brought in automatically by the deploy process.

The top of each integration file should include the following frontmatter:

    ---
    title: Datadog-<integration name> Integration
    integration_title: <integration name>
    kind: integration
    doclevel: basic
    ---

If you are writing a lot about the integration, change doclevel to complete or just remove the whole line. Now write the doc. There is no need to update any index, menu, or sidebars. Those are automatically generated.

Most integrations start with a heading level of 3. Going forward you should start with 1. But if you do, make sure to add the newhlevel attribute to the frontmatter: `newhlevel: true`

Every integration should have the following format:

### Overview
**Absolutely Required.**

The first thing in the Overview should be a representative image for the integration. Try to make it as interesting as possible.

The overview section is required and should be a paragraph or two with some bullets of what is interesting about this integration. For example, the following comes from the Docker integration.

Get metrics from Docker in real time to:

* Visualize your containers' performance.
* Correlate the performance of containers with the applications running inside.

There are three ways to setup the Docker integration: install the agent on the host, on a single priviledged container, and on each individual container.


### Installation
**Required with some exceptions**

The installation section should cover anything that needs to be installed on the agent host. For instance, in the Docker installation section you learn about installing the agent into a container. If there is nothing to install on the agent host, this section can be left out. To be a complete integration, either an installation section or a configuration section must be included.

### Configuration
**Required with some exceptions**

The configuration section should cover anything that you can configure in the Datadog interface or the agent configuration files. In almost every case this section should be included since there is almost always something to configure. To be a complete integration, either an installation section or a configuration section must be included.

At the end of the configuration section include a link to the example configuration files. This should be done by adding `<%= insert_example_links%>`. This method takes a few optional parameters: `conf` is the name of the example YAML file, minus the extension; `check` is the name of the check file, minus the .py extension; setting either `check` or `conf` to `"none"` will hide that line; `include_intro` set to false will show only the list minus the sentence at the top; normally the integration title in the links will come from the pages frontmatter, but setting `integration` will override that, `yaml_extension` will change the extension from example to something else (like "default").

#### Configuration Options

Describe each of the options available in the YAML file. This will often be the stuff included in the YAML comments (remove them from the YAML included in the doc), but sometimes you will have to investigate a bit to figure out what the option is for.

### Validation
**Required**

The validation section should include instructions on how to validate that the integration is successfully working.

### Troubleshooting
**Optional**

The troubleshooting section should include anything that answers a question a user might have about the integration. If there is a question that comes up in support about the integration, it should be added here.

### Metrics
**Required for integrations that have metrics**

If the metrics are listed in the integration under dogweb, add an attribute to the frontmatter: `git_integration_title: integration_name` replacing the integration name with the name of the folder for the integration in the dogweb repo.

Then add `<%= get_metrics_from_git()%>` to the Metrics section. This will use your Github Personal Token to grab the metrics from the repo. For more information about setting up your Github Personal Token, see the [Setup section](#setup) above.

### Events
**Optional**

Include a list of events if the integration provides any.

### Service Checks
**Optional**

Include a list of service checks if the integration provides any.

### Further Reading
**Optional**

Include any links to Docs guides or Datadog blog articles that highlight the integration.

# How to add a new Guide

Create a markdown file under content/guides. Add the following front matter at the top of the file:

    ---
    title: <guide title>
    kind: guide
    listorder: <where in the list you want the doc to appear>
    ---

Each guide has a listorder. Change the list order number of this doc and any other docs to make sure stuff appears in the right order. There is no need to update any index, menu, or sidebars. Those are automatically generated.


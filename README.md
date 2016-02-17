# Documentation site for Datadog

Built with [nanoc](http://nanoc.stoneship.org/), a static website generation tool.

# Setup

**NOTE: if you are Datadog Internal, use this on your host os and not on the personal-chef vm. There are a few reports that it will not run on personal-chef. **

```
brew install rbenv # or equivalent on linux
rbenv install 2.3.0
rbenv local 2.3.0
gem install bundler # and set up your shell / shell profile for it
rbenv exec bundle install
```

# Working on Docs

```
rake
```

If you get an error, make sure you're running on the host.

Yeah, that's it. This command will compile the site, check
for any bad links, and refresh your browser.

This site uses Kramdown. To learn about the syntax, [see this site][1].

If you include ANY Markdown in a file, give it an .md extension.

Make sure all files are lowercase. Macs are case insensitive when creating links to images and pages, but the server is not. The tests will be fine locally but the site will fail in production.

# Releasing

Before push/merging, make sure to

```
rake clean
rake
```

and verify that there are no bad links on [http://localhost:3000](http://localhost:3000).

If you've been working on code samples you should also

```
export TEST_DD_API_KEY=test_org_api_key
export TEST_DD_APP_KEY=test_org_app_key
rake clean
rake test
```

These keys should be for a test account that does not include dozens of people. There are several samples that mute and unmute everything. Everyone in the org will be notified. If you are the only one in the org, you won't be getting angry emails from others asking you to stop muting everything.

**If there are errors, please don't merge.**

Internal Datadog folks: Within 5 minutes of merging to master, it will deploy automatically. You can see the status in #documentation.

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

### Validation
**Required**

The validation section should include instructions on how to validate that the integration is successfully working.

### Metrics
**Required for integrations that have metrics**

If the metrics are listed in the integration under dogweb, add an attribute to the frontmatter: `git_integration_title: integration_name` replacing the integration name with the name of the folder for the integration in the dogweb repo.

Then add `<%= get_metrics_from_git()%>` to the Metrics section. This will use your Github Personal Token to grab the metrics from the repo.

### Events
**Optional**

This is a newer section. If you can describe the events that are part of the integration, it should go here.

### Troubleshooting
**Optional**

The troubleshooting section should include anything that answers a question a user might have about the integration. If there is a question that comes up in support about the integration, it should be added here.

### Compatibility
**Required**

The compatibility section should include which versions this integration has been tested and validated on.


# How to add a new Guide

Create a markdown file under content/guides. Add the following front matter at the top of the file:

    ---
    title: <guide title>
    kind: guide
    listorder: <where in the list you want the doc to appear>
    ---

Each guide has a listorder. Change the list order number of this doc and any other docs to make sure stuff appears in the right order. There is no need to update any index, menu, or sidebars. Those are automatically generated.


[1]: http://kramdown.gettalong.org/quickref.html

---
title: Officially Integrating with Datadog
kind: documentation
customnav: developersnav
aliases:
   - /guides/new_integration/
---

## Create a new integration

Being able to see all of your metrics from across your infrastructure is key within Datadog. While we do have guides to submit [custom metrics][1] via our [API][2] and [code instrumentation][3], it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.

If you would like to propose an integration, please reach out to support@datadoghq.com and tell us what metrics you would like to see from that given source.

If you manage or work with a service and would like to see Datadog integrate it, the following information is needed:

  * How will data get into Datadog? There are currently three options:
    1. Push data from the source to Datadog
    2. Crawl the data source's API
    3. Have the Datadog Agent pick up the information from the source
  * What are the metrics and tags should be picked up from the source?
  * What metrics should be included on the default dashboard that we generate for each integration?

We will also need a short blurb describing the integration as well as the correct image to use across our site.

   [1]: /developers/metrics/
   [2]: /api/
   [3]: /developers/libraries/


## New integration documentation

Integrations include information that comes from two different sources. The first and main source are the files under content/integrations. The second source are the metric csv files under dogweb. In order to see the metric tables that appear for some of the integrations, you need to create an environment variable called `github_personal_token` assigned your github personal token (you need to have access to dogweb and therefore must be a Datadog employee to see this). The table will be brought in automatically by the deploy process.

The top of each integration file should include the following frontmatter:

    ---
    title: Datadog-<integration name> Integration
    integration_title: <integration name>
    kind: integration
    git_integration_title: <integration name>
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

At the end of the configuration section include a link to the example configuration files. This should be done by adding `{{< insert_example_links >}}`. This method takes a few optional parameters: `conf` is the name of the example YAML file, minus the extension; `check` is the name of the check file, minus the .py extension; setting either `check` or `conf` to `"none"` will hide that line; `include_intro` set to false will show only the list minus the sentence at the top; normally the integration title in the links will come from the pages frontmatter, but setting `integration` will override that, `yaml_extension` will change the extension from example to something else (like "default").

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

Then add `{{< get-metrics-from-git >}}` to the Metrics section. This renders all metrics for an integration. You can also selectively display metrics:
 
```
{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}
```

This will use your Github Personal Token to grab the metrics from the repo. For more information about setting up your Github Personal Token, see the [Setup section](#setup) above.

### Events
**Optional**

Include a list of events if the integration provides any.

### Service Checks
**Optional**

Include a list of service checks if the integration provides any.

### Further Reading
**Optional**

Include any links to Docs guides or Datadog blog articles that highlight the integration.
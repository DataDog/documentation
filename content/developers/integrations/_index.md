---
title: Create a new integration
kind: documentation
customnav: developersnav
aliases:
   - /guides/new_integration/
---

## Overview

Being able to see all of your metrics from across your infrastructure is key within Datadog. While we do have guides to submit [custom metrics][1] via our [API][2] and [code instrumentation][3], it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.

If you would like to propose an integration, reach out to support@datadoghq.com and tell us what metrics you would like to see from that given source.

If you manage or work with a service and would like to see Datadog integrate it, the following information is needed:

  * How does data get into Datadog? There are currently three options:
    1. Push data from the source to Datadog
    2. Crawl the data source's API
    3. Have the Datadog Agent pick up the information from the source
  * What are the metrics and tags should be picked up from the source?
  * What metrics should be included on the default dashboard that we generate for each integration?

We also need a short blurb describing the integration as well as the correct image to use across our site.

   [1]: /developers/metrics/
   [2]: /api/
   [3]: /developers/libraries/


## New integration documentation

Integrations include information that comes from two different sources. The first and main source are the files under content/integrations. The second source are the metric csv files under dogweb. In order to see the metric tables that appear for some of the integrations, you need to create an environment variable called `github_personal_token` assigned your github personal token (you need to have access to dogweb and therefore must be a Datadog employee to see this). The table is brought in automatically by the deploy process.

The top of each integration file should include the following frontmatter:

    ---
    title: Datadog-<integration name> Integration
    integration_title: <integration name>
    kind: integration
    git_integration_title: <integration name>
    ---

There is no need to update any index, menu, or sidebars. Those are automatically generated.

Most integrations start with a heading level of 2.

Every integration should have the following format:

```
## Overview
**Absolutely Required.**

The first thing in the Overview should be a representative image for the integration. Try to make it as interesting as possible.

The overview section is required and should be a paragraph or two with some bullets of what is interesting about this integration. For example, the following comes from the Docker integration.

Get metrics from Docker in real time to:

* Visualize your containers' performance.
* Correlate the performance of containers with the applications running inside.

There are three ways to setup the Docker integration: install the agent on the host, on a single priviledged container, and on each individual container.

## Setup
### Installation
**Required with some exceptions**

The installation section should cover anything that needs to be installed on the agent host. For instance, in the Docker installation section you learn about installing the agent into a container. If there is nothing to install on the agent host, this section can be left out. To be a complete integration, either an installation section or a configuration section must be included.

### Configuration
**Required with some exceptions**

The configuration section should cover anything that you can configure in the Datadog interface or the agent configuration files. In almost every case this section should be included since there is almost always something to configure. To be a complete integration, either an installation section or a configuration section must be included.

### Configuration Options

Describe each of the options available in the YAML file. This is often the stuff included in the YAML comments (remove them from the YAML included in the doc), but sometimes you have to investigate a bit to figure out what the option is for.

### Validation
**Required**

The validation section should include instructions on how to validate that the integration is successfully working.

## Troubleshooting
**Optional**

The troubleshooting section should include anything that answers a question a user might have about the integration. If there is a question that comes up in support about the integration, it should be added here.

##Data Collected
### Metrics
**Required for integrations that have metrics**

Include a list of metrics if the integration provides any.

### Events
**Optional**

Include a list of events if the integration provides any.

### Service Checks
**Optional**

Include a list of service checks if the integration provides any.

## Further Reading
**Optional**

Include any links to Docs pages or Datadog blog articles that highlight the integration.
```

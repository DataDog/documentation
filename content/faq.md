---
title: Frequently Asked Questions
kind: documentation
autotocdepth: 1
description:
---
<!--
===============================================================================
    Architecture
===============================================================================
-->

## Architecture

### Is Datadog a cloud service or server application?


It's primarily a cloud service, but if you want to collect data on your servers,
there is an Agent you'll need to install. We never make any direct connections
to your infrastructure. For cloud integrations, we connect to them using the
credentials you provide to us.

### How do I delete a host or metric?


All hosts or metrics that have not seen data in 24 hours will disappear from the UI;
you can still query against them, but it will not appear in drop downs or infrastructure.
There is not a way to immediately delete a metric.

### What's the difference between Graphite's query language and Datadog's?


In terms of metric naming, we differ a little with Graphite in that a metric
query is defined by a metric name and a scope, where a scope is one or more tags.
To translate:

~~~
<application>.requests.<HTTP Method>.<HTTP Method>.<Handler Method>.mean_90
~~~

into Datadog, we'd probably say:

~~~
<application>.requests.mean_90{http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>}
~~~

Where `<application>.requests.mean_90` is the metric name, and
`http_method:<HTTP Method>, handler_class:<HTTP Method>, handler_method:<Handler Method>`
are tags, so a concrete example might look like:

~~~
foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

To do aggregation, we can specify an aggregator as part of the metric query:

~~~
avg:foo.requests.mean_90{http_method:GET, handler_class:ThingHandler, handler_method:list}
~~~

This will graph a single series that's the average of that metric across the
intersection of those tags. We support avg, sum, min, max aggregators. If you
wanted to see all the possible series for a given tag facet, you can say:

~~~
avg:foo.requests.mean_90{handler_class:ThingHandler, handler_method:list} by {http_method}
~~~

Which would graph stacked area series for each http_method value like GET, POST, etc.

### How are hostnames determined?


The hostnames are determined by what the Datadog Agent detects; this is fully
documented [here][architecture-1]. You can see all names being detected by the Agent by running the info command:
`/etc/init.d/datadog-agent info`

[architecture-1]: /graphing/infrastructure/


<!--
===============================================================================
    Integrations
===============================================================================
-->

## Integrations

### I set up my integration. Why am I not seeing metrics?


There a several problems that could cause this.  Send a message to support
(support@datadoghq.com) describing the issue and include the agent info, the logs, and
the configuration file as attachments to that message.  You can find the location of
these in the following link and selecting your OS on our [agent usage guide][integrations-1]

### How is Datadog retrieving my data?


* Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* The full license agreement can be found [here][integrations-2].

### I’d like to tweak an integration or write up a new one. Do you accept pull requests?


Yes! The agent is entirely open source and can be found on our [Github project page][integrations-3].

[integrations-1]: /guides/basic_agent_usage
[integrations-2]: https://app.datadoghq.com/policy/license
[integrations-3]: https://github.com/DataDog/dd-agent

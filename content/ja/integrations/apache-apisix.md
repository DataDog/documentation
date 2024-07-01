---
"app_id": "apache-apisix"
"app_uuid": "b842d639-caf6-4b3a-8115-52458b9a0753"
"assets":
  "dashboards":
    "Apache APISIX Dashboard": assets/dashboards/apache-apisix_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - apisix.request.counter
      - apisix.request.latency
      - apisix.upstream.latency
      - apisix.apisix.latency
      - apisix.ingress.size
      - apisix.egress.size
      "metadata_path": metadata.csv
      "prefix": apisix.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10244"
    "source_type_name": Apache APISIX
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": dev@apisix.apache.org
  "support_email": dev@apisix.apache.org
"categories":
- cloud
- metrics
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "apache-apisix"
"integration_id": "apache-apisix"
"integration_title": "Apache APISIX"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "apache-apisix"
"public_title": "Apache APISIX"
"short_description": "Datadog-APISIX Integration"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Datadog-APISIX Integration
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://apisix.apache.org/blog/2021/11/12/apisix-datadog"
  "support": "README.md#Support"
  "title": Apache APISIX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Apache APISIX is a dynamic, real-time, high-performance API gateway, and it provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more. For example, use Apache APISIX to handle traditional north-south traffic, as well as east-west traffic between services. It can also be used as a Kubernetes ingress controller.

The [APISIX-Datadog plugin][1] pushes its custom metrics to the DogStatsD server and comes bundled with the Datadog Agent over the UDP connection. DogStatsD is an implementation of StatsD protocol. It collects the custom metrics for [Apache APISIX][2] agent, aggregates it into a single data point, and sends it to the configured Datadog server.

## Setup

### Installation

Follow the configuration instructions below.

### Configuration

1. If you are already using Datadog and have the Datadog Agent installed, make sure port 8125/UDP is allowed through your firewall. For example, the Apache APISIX agent can reach port 8125 of the Datadog Agent. If you already have this configured, you can skip to step 3.

> To learn more about how to install the Datadog Agent, see the [Agent documentation][3].

2. If you are new to Datadog:

   1. First, create an account by visiting the [Datadog website][4] and click on the Get Started Free button.
   2. Generate an API Key.
      ![Generate an API Key][5]

3. The APISIX-Datadog plugin requires only the DogStatsD component of `datadog/agent` as the plugin asynchronously send metrics to the DogStatsD server following the statsd protocol over standard UDP socket. That's why APISIX recommends using the standalone `datadog/dogstatsd` image instead of using the full agent. It's extremely lightweight (only ~11 MB in size) compared to ~2.8GB of `datadog/agent` image.

To run it as a container:

```shell
# pull the latest image
$ docker pull datadog/dogstatsd:latest
# run a detached container
$ docker run -d --name dogstatsd-agent -e DD_API_KEY=<Your API Key from step 2> -p 8125:8125/udp  datadog/dogstatsd
```

If you are using Kubernetes in your production environment, you can deploy `dogstatsd` as a `Daemonset` or as a `Multi-Container Pod` alongside Apache APISIX agent.

4. The following is an example on how to activate the Datadog plugin for a specific route. This assumes the `dogstatsd` agent is already up and running.

```shell
# enable plugin for a specific route
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "plugins": {
    "datadog": {}
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  },
  "uri": "/hello"
}'
```

Now any requests to endpoint URI `/hello` will generate the above metrics and push it to local DogStatsD server of the Datadog Agent.

5. To deactivate the plugin, remove the corresponding JSON configuration in the plugin configuration to disable  `datadog`. APISIX plugins are hot-reloaded, therefore there is no need to restart APISIX.

```shell
# disable plugin for a route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "plugins": {},
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

5. See the [Datadog Plugin][1] documentation for additional custom configuration options.

### Validation

[Run the Agent's status subcommand][6] and look for `apisix` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "apache-apisix" >}}


### Events

The Apache APISIX check does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

- [Cloud Monitoring with Datadog in Apache APISIX][9]

[1]: https://apisix.apache.org/docs/apisix/plugins/datadog
[2]: https://apisix.apache.org/
[3]: https://docs.datadoghq.com/agent/
[4]: https://www.datadoghq.com/
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/metadata.csv
[8]: https://docs.datadoghq.com/help/
[9]: https://apisix.apache.org/blog/2021/11/12/apisix-datadog


---
"app_id": "tyk"
"app_uuid": "caca4c4f-104b-4d28-a051-f09bc58a0a32"
"assets":
  "dashboards":
    "Tyk Analytics Canvas": assets/dashboards/tyk_analytics_canvas.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - tyk.request_time.95percentile
      - tyk.request_time.count
      - tyk.request_time.avg
      - tyk.request_time.max
      - tyk.request_time.median
      "metadata_path": metadata.csv
      "prefix": tyk.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10233"
    "source_type_name": Tyk
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Tyk
  "sales_email": yaara@tyk.io
  "support_email": yaara@tyk.io
"categories":
- metrics
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/tyk/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "tyk"
"integration_id": "tyk"
"integration_title": "Tyk"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "tyk"
"public_title": "Tyk"
"short_description": "Track requests with time statistics sliced by resp-code, api, path, oauth etc."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Metrics"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Track requests with time statistics sliced by resp-code, api, path, oauth etc.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Tyk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Datadog can collect and display errors, response time, duration, latency, as well as monitor the performance of API traffic in [Tyk][1] to discover issues in your APIs or consumers.

Tyk has a built-in Datadog integration that collects metrics from [Tyk API gateway][2].

Tyk API gateway records all the traffic that it's processing. It sends that information to Datadog and builds dashboards around it.

### How it works

[Tyk pump][3] writes custom application metrics and sends them into Datadog by sending them to [DogStatsD][4], a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the StatsD protocol which adds a few Datadog-specific extensions including the Histogram metric type, that is in use by `Tyk-gateway`.

`Tyk-gateway` uses `Tyk-pump` to send the analytics it generated to Datadog.

When running the Datadog Agent, DogstatsD gets the `request_time` metric from `Tyk-pump` in real time, per request, so you can understand the usage of your APIs and get the flexibility of aggregating by various parameters such as date, version, returned code, method etc.

The custom metric Tyk is using is of type [DD_HISTOGRAM_AGGREGATES][5].

## セットアップ

Tyk's integration is included in the `tyk-pump` package, so you only need to set configuration in the `pump.conf` (and there's no need to install anything on your Tyk platform).

### Installation

#### インストール

For this integration you need to have a running Tyk installation. You can install [Tyk self managed][6] or [Tyk OSS][7]. Both options include the `tyk-pump`.

#### Install Datadog Agent

Install the [Datadog Agent][8] in your environment.

Run the Datadog [Agent][9] in your K8s cluster, as a Docker container, on your Mac, or any way as long as `Tyk pump` is able to access it.

For containerized environments, see the [Autodiscovery Integration Templates][10] for more guidance. To validate that the changes are applied, [run the Agent's status subcommands][11]


### 構成

#### Tyk-pump
To set a Datadog pump follow the instructions in [the DogstatsD section][12] of the pump README.

The following is an example of Datadog pump configuration in `pump.conf`:

``` json
pump.conf:
...
   "dogstatsd": {
      "type": "dogstatsd",
      "meta": {
        "address": "dd-agent:8126",
        "namespace": "tyk",
        "async_uds": true,
        "async_uds_write_timeout_seconds": 2,
        "buffered": true,
        "buffered_max_messages": 32,
        "sample_rate": 0.9999999999,
        "tags": [
          "method",
          "response_code",
          "api_version",
          "api_name",
          "api_id",
          "org_id",
          "tracked",
          "path",
          "oauth_id"
        ]
      }
    },
```

This [example][13] was taken from [Tyk-demo][14] project, an open source project that spins up a full Tyk platform in one command and offers ready-made examples, including the Datadog example. To run this integration, use `up.sh analytics-datadog`.

#### Setup Datadog Agent

Tyk's integration uses [DogstatsD][15]. It is a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the `StatsD` protocol and adds a few Datadog-specific extensions. Tyk is using `Histogram metric type`.

Set up the following Datadog and DogStatsD environment variables in your environment:

| DD Environment variable | Value | Description |
|---------------------------|-------------|------|
| DD_API_KEY | {your-datadog-api-key} | For the Datadog Agent to connect the DD portal. Your API key can be found in [Account Settings][16]. |
| DD_ENV |    tyk-demo-env   |   Sets the environment name. |
| DD_DOGSTATSD_TAGS | "env:tyk-demo" |  Additional tags to append to all metrics, events, and service checks received by this DogStatsD server. |
| DD_LOGS_ENABLED | true | Enables log collection for the Datadog Agent. |
| DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL | true | Collects logs from containers. |
| DD_DOGSTATSD_SOCKET | /var/run/docker.sock | Path to the Unix socket to listen to. Docker compose mounts this path. |
| DD_DOGSTATSD_ORIGIN_DETECTION | true | Enables container detection and tagging for Unix socket metrics. |
| DD_DOGSTATSD_NON_LOCAL_TRAFFIC | true | Listens for DogStatsD packets from other containers. (Required to send custom metrics). |
| DD_AGENT_HOST | dd-agent | Name of the agent host in Docker. |
| DD_AC_EXCLUDE | redis | Excludes Datadog redis checks. (Optional) |
| DD_CONTAINER_EXCLUDE | true | Excludes docker checks for the Datadog Agent. |

After setting environment variables listed above, set up the agent [with DogstatsD][17].

[Restart the Agent][18] after setup.

### Validation

Create a dashboard or import [the sample][19] and add a widget. In the section **Graph your data** under the **metric** option, start typing the namespace you chose for the pump in the config `pump.conf` under `dogstatsd.namespace`.

In the example above, it's `tyk`. Once you start typing, all the available metrics are displayed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "tyk" >}}


### ダッシュボード

With Datadog, you can create dashboards that display statistics about your API services and their consumption.

Here's an example for such a dashboard:

![Tyk Analytics dashboard example][21]

**Note: You can [import][19] the above dashboard and use it as an example or baseline for your own dashboard.**

### イベント

The Tyk integration does not include any events.

### サービスチェック

The Tyk integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][22].

[1]: https://tyk.io/
[2]: https://github.com/TykTechnologies/tyk
[3]: https://tyk.io/docs/tyk-pump/
[4]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#pagetitle
[5]: https://docs.datadoghq.com/agent/docker/?tab=standard#dogstatsd-custom-metrics
[6]: https://tyk.io/docs/tyk-self-managed/install/
[7]: https://tyk.io/docs/apim/open-source/installation/
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://docs.datadoghq.com/agent/
[10]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[11]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[12]: https://github.com/TykTechnologies/tyk-pump#dogstatsd
[13]: https://github.com/TykTechnologies/tyk-demo/blob/master/deployments/analytics-datadog/volumes/tyk-pump/pump-datadog.conf
[14]: https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/analytics-datadog
[15]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#setup
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#how-it-works
[18]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[19]: https://github.com/DataDog/integrations-extras/blob/master/tyk/assets/dashboards/tyk_analytics_canvas.json
[20]: https://github.com/DataDog/integrations-extras/blob/master/tyk/metadata.csv
[21]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/tyk/images/datadog-tyk-analytics-dashboard.jpg
[22]: https://docs.datadoghq.com/help/


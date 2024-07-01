---
"app_id": "go-expvar"
"app_uuid": "cac5ebe3-fa36-49f7-93c5-22116c745e80"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "go_expvar.memstats.alloc"
      "metadata_path": "metadata.csv"
      "prefix": "go_expvar."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "77"
    "source_type_name": "Go Expvar"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "languages"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "go_expvar"
"integration_id": "go-expvar"
"integration_title": "Go-Expvar"
"integration_version": "2.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "go_expvar"
"public_title": "Go-Expvar"
"short_description": "Collect expvar-instrumented metrics and memory stats from your Go service."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Languages"
  "configuration": "README.md#Setup"
  "description": "Collect expvar-instrumented metrics and memory stats from your Go service."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Go-Expvar"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Go graph][1]

## Overview

Track the memory usage of your Go services and collect metrics instrumented from Go's expvar package.

If you prefer to instrument your Go code using only [dogstats-go][2], you can still use this integration to collect memory-related metrics.

## Setup

### Installation

The Go Expvar check is packaged with the Agent, so [install the Agent][3] anywhere you run Go services to collect metrics.

### Configuration

#### Prepare the service

If your Go service doesn't use the [expvar package][4] already, import it (`import "expvar"`). If you don't want to instrument your own metrics with expvar - that is you only want to collect your service's memory metrics - import the package using the blank identifier (`import _ "expvar"`). If your service doesn't already listen for HTTP requests (with the http package), [make it listen][5] locally just for the Datadog Agent.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Connect the Agent

1. Edit the file `go_expvar.d/conf.yaml`, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample go_expvar.d/conf.yaml][2] for all available configuration options.

    **Note**: If you don't configure a `metrics` list, the Agent still collects memstat metrics. Use `metrics` to tell the Agent which expvar vars to collect.

2. [Restart the Agent][3].

**Note**: The Go Expvar integration can potentially emit [custom metrics][4], which may impact your [billing][5]. By default, there is a limit of 350 metrics. If you require additional metrics, contact [Datadog support][6].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[6]: https://docs.datadoghq.com/help/
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `go_expvar`                              |
| `<INIT_CONFIG>`      | blank or `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"expvar_url": "http://%%host%%:8080"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][6] and look for `go_expvar` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "go_expvar" >}}


### Events

The Go-Expvar check does not include any events.

### Service Checks

The Go-Expvar check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][7].

## Further Reading

- [Instrument your Go apps with Expvar and Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://golang.org/pkg/expvar
[5]: https://golang.org/pkg/net/http/#ListenAndServe
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/help/
[8]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog

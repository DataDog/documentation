---
"app_id": "fluentd"
"app_uuid": "c725a834-feee-481d-94f0-afe95f39d0b1"
"assets":
  "dashboards":
    "fluentd": "assets/dashboards/fluentd_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "fluentd.buffer_queue_length"
      "metadata_path": "metadata.csv"
      "prefix": "fluentd."
    "process_signatures":
    - "td-agent"
    - "fluentd"
    - "ruby td-agent"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "108"
    "source_type_name": "fluentd"
  "saved_views":
    "fluentd_processes": "assets/saved_views/fluentd_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "metrics"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/fluentd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "fluentd"
"integration_id": "fluentd"
"integration_title": "FluentD"
"integration_version": "3.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "fluentd"
"public_title": "FluentD"
"short_description": "Monitor buffer queues and retry counts for each Fluentd plugin you've enabled."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Monitor buffer queues and retry counts for each Fluentd plugin you've enabled."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "FluentD"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Fluentd Dashboard][1]

## Overview

Get metrics from Fluentd to:

- Visualize Fluentd performance.
- Correlate the performance of Fluentd with the rest of your applications.

## Setup

### Installation

The Fluentd check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Fluentd servers.

#### Prepare Fluentd

In your Fluentd configuration file, add a `monitor_agent` source:

```text
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `fluentd.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your [Fluentd metrics](#metrics). See the [sample fluentd.d/conf.yaml][2] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param monitor_agent_url - string - required
     ## Monitor Agent URL to connect to.
     #
     - monitor_agent_url: http://example.com:24220/api/plugins.json
   ```

2. [Restart the Agent][3].

##### Log collection

You can use the [Datadog FluentD plugin][4] to forward the logs directly from FluentD to your Datadog account.

###### Add metadata to your logs

Proper metadata (including hostname and source) is the key to unlocking the full potential of your logs in Datadog. By default, the hostname and timestamp fields should be properly remapped with the [remapping for reserved attributes][5].

###### Source and custom tags

Add the `ddsource` attribute with [the name of the log integration][6] in your logs in order to trigger the [integration automatic setup][7] in Datadog.
[Host tags][8] are automatically set on your logs if there is a matching hostname in your [infrastructure list][9]. Use the `ddtags` attribute to add custom tags to your logs:

Setup Example:

```conf
  # Match events tagged with "datadog.**" and
  # send them to Datadog

<match datadog.**>
  @type datadog
  @id awesome_agent
  api_key <your_api_key>

  # Optional
  include_tag_key true
  tag_key 'tag'

  # Optional tags
  dd_source '<INTEGRATION_NAME>'
  dd_tags '<KEY1:VALUE1>,<KEY2:VALUE2>'

  <buffer>
          @type memory
          flush_thread_count 4
          flush_interval 3s
          chunk_limit_size 5m
          chunk_limit_records 500
  </buffer>
</match>
```

By default, the plugin is configured to send logs through HTTPS (port 443) using gzip compression.
You can change this behavior by using the following parameters:

- `use_http`: Set this to `false` if you want to use TCP forwarding and update the `host` and `port` accordingly (default is `true`)
- `use_compression`: Compression is only available for HTTP. Disable it by setting this to `false` (default is `true`)
- `compression_level`: Set the compression level from HTTP. The range is from 1 to 9, 9 being the best ratio (default is `6`)

Additional parameters can be used to change the endpoint used in order to go through a proxy:

- `host`: The proxy endpoint for logs not directly forwarded to Datadog (default value: `http-intake.logs.datadoghq.com`).
- `port`: The proxy port for logs not directly forwarded to Datadog (default value: `80`).
- `ssl_port`: The port used for logs forwarded with a secure TCP/SSL connection to Datadog (default value: `443`).
- `use_ssl`: Instructs the Agent to initialize a secure TCP/SSL connection to Datadog (default value: `true`).
- `no_ssl_validation`: Disables SSL hostname validation (default value: `false`).

**Note**: Set `host` and `port` to your region {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
<match datadog.**>

  #...
  host 'http-intake.logs.datadoghq.eu'

</match>
```

###### Kubernetes and Docker tags

Datadog tags are critical to be able to jump from one part of the product to another. Having the right metadata associated with your logs is therefore important in jumping from a container view or any container metrics to the most related logs.

If your logs contain any of the following attributes, these attributes are automatically added as Datadog tags on your logs:

- `kubernetes.container_image`
- `kubernetes.container_name`
- `kubernetes.namespace_name`
- `kubernetes.pod_name`
- `docker.container_id`

While the Datadog Agent collects Docker and Kubernetes metadata automatically, FluentD requires a plugin for this. Datadog recommends using [fluent-plugin-kubernetes_metadata_filter][10] to collect this metadata.

Configuration example:

```conf
# Collect metadata for logs tagged with "kubernetes.**"
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/fluentd/datadog_checks/fluentd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/fluent-plugin-datadog
[5]: https://docs.datadoghq.com/logs/processing/#edit-reserved-attributes
[6]: https://docs.datadoghq.com/integrations/#cat-log-collection
[7]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[8]: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/
[9]: https://app.datadoghq.com/infrastructure
[10]: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `fluentd`                                                         |
| `<INIT_CONFIG>`      | blank or `{}`                                                     |
| `<INSTANCE_CONFIG>`  | `{"monitor_agent_url": "http://%%host%%:24220/api/plugins.json"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `fluentd` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "fluentd" >}}


### Events

The FluentD check does not include any events.

### Service Checks
{{< get-service-checks-from-git "fluentd" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

- [How to monitor Fluentd with Datadog][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/fluentd/images/snapshot-fluentd.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitor-fluentd-datadog

---
"app_id": "logstash"
"app_uuid": "efcb18d9-2789-4481-bd4b-ff5a4c058dc3"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "logstash.process.cpu.percent"
      "metadata_path": "metadata.csv"
      "prefix": "logstash."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10016"
    "source_type_name": "Logstash"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "ervansetiawan@gmail.com"
  "support_email": "ervansetiawan@gmail.com"
"categories":
- "log collection"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "logstash"
"integration_id": "logstash"
"integration_title": "Logstash"
"integration_version": "1.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "logstash"
"public_title": "Logstash"
"short_description": "Monitor and collect runtime metrics from a Logstash instance"
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
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Monitor and collect runtime metrics from a Logstash instance"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Logstash"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Logstash in real time to:

- Visualize and monitor Logstash states.
- Be notified about Logstash events.

## セットアップ

### インストール

The Logstash check is not included in the [Datadog Agent][1] package, so you need to install it.

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

For Agent v7.21+ / v6.21+, follow the instructions below to install the Logstash check on your host. For earlier versions of the Agent, see [Use Community Integrations][1]. 

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][2].

[1]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[2]: https://docs.datadoghq.com/getting_started/integrations/
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

Use the following Dockerfile to build a custom Datadog Agent image that includes the Logstash integration.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-logstash==<INTEGRATION_VERSION>
```

If you are using Kubernetes, update your Datadog Operator or Helm chart configuration to pull this custom Datadog Agent image.

See [Use Community Integrations][1] for more context.

[1]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
{{% /tab %}}
{{< /tabs >}}

### 構成

#### Metric collection

{{< tabs >}}
{{% tab "Host" %}}

##### ホスト

1. Edit the `logstash.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1].

   ```yaml
   init_config:

   instances:
     # The URL where Logstash provides its monitoring API.
     # This will be used to fetch various runtime metrics about Logstash.
     #
     - url: http://localhost:9600
   ```

   See the [sample logstash.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

##### Containerized

For containerized environments, use an Autodiscovery template with the following parameters:

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `logstash`                           |
| `<INIT_CONFIG>`      | blank or `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:9600"}` |

To learn how to apply this template, see [Docker Integrations][1] or [Kubernetes Integrations][2].

See the [sample logstash.d/conf.yaml][3] for all available configuration options.

[1]: https://docs.datadoghq.com/containers/docker/integrations
[2]: https://docs.datadoghq.com/containers/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

#### Log collection

Datadog has [an output plugin][2] for Logstash that takes care of sending your logs to your Datadog platform.

To install this plugin run the following command:

- `logstash-plugin install logstash-output-datadog_logs`

Then configure the `datadog_logs` plugin with your [Datadog API key][3]:

```conf
output {
    datadog_logs {
        api_key => "<DATADOG_API_KEY>"
    }
}
```

By default, the plugin is configured to send logs through HTTPS (port 443) using gzip compression.
You can change this behavior by using the following parameters:

- `use_http`: Set this to `false` if you want to use TCP forwarding and update the `host` and `port` accordingly (default is `true`).
- `use_compression`: Compression is only available for HTTP. Disable it by setting this to `false` (default is `true`).
- `compression_level`: Set the compression level from HTTP. The range is from 1 to 9, 9 being the best ratio (default is `6`).

Additional parameters can be used to change the endpoint used in order to go through a [proxy][4]:

- `host`: The proxy endpoint for logs not directly forwarded to Datadog (default value: `http-intake.logs.datadoghq.com`).
- `port`: The proxy port for logs not directly forwarded to Datadog (default value: `80`).
- `ssl_port`: The port used for logs forwarded with a secure TCP/SSL connection to Datadog (default value: `443`).
- `use_ssl`: Instructs the Agent to initialize a secure TCP/SSL connection to Datadog (default value: `true`).
- `no_ssl_validation`: Disables SSL hostname validation (default value: `false`).

**Note**: Set `host` and `port` to your region {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
output {
   datadog_logs {
       api_key => "<DATADOG_API_KEY>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### Add metadata to your logs

To get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs, including hostname and source. By default, the hostname and timestamp should be properly remapped thanks to Datadog's default [remapping for reserved attributes][5]. To make sure the service is correctly remapped, add its attribute value to the service remapping list.

##### Source

Set up a Logstash filter to set the source (Datadog integration name) on your logs.

```conf
filter {
  mutate {
    add_field => {
 "ddsource" => "<MY_SOURCE_VALUE>"
       }
    }
 }
```

This triggers the [integration automatic setup][6] in Datadog.

##### Custom tags

[Host tags][7] are automatically set on your logs if there is a matching hostname in your [infrastructure list][8]. Use the `ddtags` attribute to add custom tags to your logs:

```conf
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```

### Validation

[Run the Agent's `status` subcommand][9] and look for `logstash` under the Checks section.

## Compatibility

The Logstash check is compatible with Logstash 5.x, 6.x and 7.x versions. It also supports the new multi-pipelines metrics introduced in Logstash 6.0. Tested with Logstash versions 5.6.15, 6.3.0 and 7.0.0.

## 収集データ

### メトリクス
{{< get-metrics-from-git "logstash" >}}


### Events

The Logstash check does not include any events.

### Service Checks
{{< get-service-checks-from-git "logstash" >}}


## Troubleshooting

### Agent cannot connect

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Check that the `url` in `conf.yaml` is correct.

If you need further help, contact [Datadog support][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/logstash-output-datadog_logs
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/agent/proxy/#proxy-for-logs
[5]: /logs/#edit-reserved-attributes
[6]: /logs/processing/#integration-pipelines
[7]: /getting_started/tagging/assigning_tags
[8]: https://app.datadoghq.com/infrastructure
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[10]: http://docs.datadoghq.com/help

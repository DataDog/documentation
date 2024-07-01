---
"app_id": "proxysql"
"app_uuid": "aadfa11b-3de5-4827-9cdd-888c4e9587d0"
"assets":
  "dashboards":
    "ProxySQL Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": proxysql.active_transactions
      "metadata_path": metadata.csv
      "prefix": proxysql.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10096"
    "source_type_name": ProxySQL
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
- caching
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "proxysql"
"integration_id": "proxysql"
"integration_title": "ProxySQL"
"integration_version": "5.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "proxysql"
"public_title": "ProxySQL"
"short_description": "Collect your ProxySQL metrics and logs."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Category::Caching"
  "configuration": "README.md#Setup"
  "description": Collect your ProxySQL metrics and logs.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ProxySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [ProxySQL][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The ProxySQL integration is included in the [Datadog Agent][3] package, so you don't need to install anything else on your servers.

### Configuration

#### Enabling SSL
To connect to ProxySQL using full SSL/TLS validation, enable the `tls_verify` option in `conf.yaml`. Include certificates and passwords needed to connect with SSL/TLS.

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `proxysql.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your ProxySQL performance data. See the [sample proxysql.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add the log files you are interested in to your `proxysql.d/conf.yaml` file to start collecting your ProxySQL logs:

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample proxysql.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

#### Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `proxysql`                                                   |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "proxysql", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][4] and look for `proxysql` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "proxysql" >}}


### Events

The ProxySQL check does not include any events.

### Service Checks
{{< get-service-checks-from-git "proxysql" >}}


## Troubleshooting

Need help? Contact [Datadog support][5].



[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help

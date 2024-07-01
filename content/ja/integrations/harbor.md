---
"app_id": "harbor"
"app_uuid": "a4aae6fb-1865-42d0-be03-78e98b7e4b22"
"assets":
  "dashboards":
    "Harbor Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": harbor.projects.count
      "metadata_path": metadata.csv
      "prefix": harbor.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10063"
    "source_type_name": Harbor
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/harbor/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "harbor"
"integration_id": "harbor"
"integration_title": "Harbor"
"integration_version": "3.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "harbor"
"public_title": "Harbor"
"short_description": "Monitor the health of Harbor Container Registry"
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
  - "Category::Containers"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor the health of Harbor Container Registry
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Harbor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Harbor][1] through the Datadog Agent.

## Setup

### Installation

The Harbor check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `harbor.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Harbor performance data. See the [sample harbor.d/conf.yaml][2] for all available configuration options.

    **Note**: You can specify any type of user in the config but an account with admin permissions is required to fetch disk metrics. The metric `harbor.projects.count` only reflects the number of projects the provided user can access.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `harbor.d/conf.yaml` file to start collecting your Harbor logs:

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `harbor`                                                                              |
| `<INIT_CONFIG>`      | blank or `{}`                                                                         |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%", "username": "<USER_ID>", "password": "<USER_PASSWORD>"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "harbor", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `harbor` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "harbor" >}}


### Events

The Harbor integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "harbor" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: https://goharbor.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/

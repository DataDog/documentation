---
"app_id": "citrix-hypervisor"
"app_uuid": "cf4ad6ea-85ae-4f7d-8e79-7b8d36924425"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": citrix_hypervisor.host.cpu
      "metadata_path": metadata.csv
      "prefix": citrix_hypervisor.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10198"
    "source_type_name": Citrix Hypervisor
  "monitors":
    "Host CPU high": assets/monitors/host_cpu_high.json
    "VM CPU high": assets/monitors/vm_cpu_high.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "citrix_hypervisor"
"integration_id": "citrix-hypervisor"
"integration_title": "Citrix Hypervisor"
"integration_version": "3.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "citrix_hypervisor"
"public_title": "Citrix Hypervisor"
"short_description": "Monitor the health and performance of a Citrix Hypervisor host."
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
  - "Category::Cloud"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of a Citrix Hypervisor host.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Citrix Hypervisor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Citrix Hypervisor][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The Citrix Hypervisor check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.  
The recommended way to monitor Citrix hypervisors is to install one Datadog Agent on each hypervisor.

#### Datadog user

The Citrix Hypervisor integration requires a user with at least [`read-only`][4] access to monitor the service.

### Configuration

#### Host

1. Edit the `citrix_hypervisor.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Citrix Hypervisor performance data. See the [sample citrix_hypervisor.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `citrix_hypervisor.d/conf.yaml` file to start collecting your Citrix Hypervisor logs:
    ```yaml
    logs:
    - type: file
      path: /var/log/xensource.log
      source: citrix_hypervisor
    ```
    Change the `path` value and configure it for your environment. See the [sample `citrix_hypervisor.d/conf.yaml` file][5] for all available configuration options.

3. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `citrix_hypervisor` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "citrix_hypervisor" >}}


### Events

The Citrix Hypervisor integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "citrix_hypervisor" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].

## Further reading

Additional helpful documentation, links, and articles:

- [Monitor Citrix Hypervisor performance with Datadog][11]

[1]: https://www.citrix.com/products/citrix-hypervisor/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html
[5]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/


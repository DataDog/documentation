---
"app_id": "cisco-aci"
"app_uuid": "fab40264-45aa-434b-9f9f-dc0ab609dd49"
"assets":
  "dashboards":
    "cisco_aci": "assets/dashboards/cisco_aci_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "cisco_aci.fabric.node.health.cur"
      "metadata_path": "metadata.csv"
      "prefix": "cisco_aci."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "210"
    "source_type_name": "Cisco ACI"
  "monitors":
    "[Cisco ACI] Average CPU usage high alert": "assets/monitors/cpu_high.json"
    "[Cisco ACI] Critical health alert": "assets/monitors/critical_health_score.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "network"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cisco_aci"
"integration_id": "cisco-aci"
"integration_title": "CiscoACI"
"integration_version": "2.8.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "cisco_aci"
"public_title": "CiscoACI"
"short_description": "Track Cisco ACI performance and usage."
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
  - "Category::Network"
  "configuration": "README.md#Setup"
  "description": "Track Cisco ACI performance and usage."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "CiscoACI"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The Cisco ACI Integration lets you:

- Track the state and health of your network
- Track the capacity of your ACI
- Monitor the switches and controllers themselves

## Setup

### Installation

The Cisco ACI check is packaged with the Agent, so simply [install the Agent][1] on a server within your network.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `cisco_aci.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample cisco_aci.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
        ## @param aci_url - string - required
        ## URL to query to gather metrics.
        #
      - aci_url: http://localhost

        ## @param username - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        username: datadog

        ## @param pwd - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        pwd: <PWD>

        ## @param tenant - list of strings - optional
        ## List of tenants to collect metrics data from.
        #
        # tenant:
        #   - <TENANT_1>
        #   - <TENANT_2>
   ```

   *NOTE*: Be sure to specify any tenants for the integration to collect metrics on applications, EPG, etc.

2. [Restart the Agent][3] to begin sending Cisco ACI metrics to Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cisco_aci`                                                            |
| `<INIT_CONFIG>`      | blank or `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"aci_url":"%%host%%", "username":"<USERNAME>", "pwd": "<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][2] and look for `cisco_aci` under the Checks section.

## Vendor profiles

Specific supported vendor profiles for this integration can be found on the [network vendors][3] page.

## Data Collected

### Metrics
{{< get-metrics-from-git "cisco_aci" >}}


### Events

The Cisco ACI check sends tenant faults as events.

### Service Checks
{{< get-service-checks-from-git "cisco_aci" >}}


## Troubleshooting

### Missing `cisco_aci.tenant.*` metrics
If you are missing `cisco_aci.tenant.*` metrics, you can run the `test/cisco_aci_query.py` script to manually query the tenant endpoint.

Modify the `apic_url`, `apic_username`, and `apic_password` to your configuration information, and input the tenant URL for the `apic_url`.

Verify that the output you get from cURLing the endpoint matches any of the metrics collected in `datadog_checks/cisco_aci/aci_metrics.py`. If none of the statistics match, this means that the endpoint is not emitting any statistics that the integration can collect.

### Long execution times

Because this check queries all the tenants, apps, and endpoints listed before returning metrics, there may be high execution times coming from this integration.

  ```yaml
    cisco_aci (2.2.0)
  -----------------
    Instance ID: cisco_aci:d3a2958f66f46212 [OK]
    Configuration Source: file:/etc/datadog-agent/conf.d/cisco_aci.d/conf.yaml
    Total Runs: 1
    Metric Samples: Last Run: 678, Total: 678
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 1
    Average Execution Time : 28m20.95s
    Last Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
    Last Successful Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
  ```

Need help? Contact [Datadog support][4].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[4]: https://docs.datadoghq.com/help/

---
"app_id": "dns"
"app_uuid": "a21dc4ff-8b3f-427e-a5cc-17790a36b147"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "dns.response_time"
      "metadata_path": "metadata.csv"
      "prefix": "dns."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "DNS"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "network"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/dns_check/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "dns_check"
"integration_id": "dns"
"integration_title": "DNS Check"
"integration_version": "3.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "dns_check"
"public_title": "DNS Check"
"short_description": "Monitor the resolvablity of and lookup times for any DNS record."
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
  "description": "Monitor the resolvablity of and lookup times for any DNS record."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "DNS Check"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Monitor the resolvability of and lookup times for any DNS records using nameservers of your choosing.

## Setup

### Installation

The DNS check is included in the [Datadog Agent][1] package. No additional installation is needed on your server.

Though many metrics-oriented checks are best run on the same host(s) as the monitored service, you may want to run this status-oriented check from hosts that do not run the monitored DNS services.

### Configuration

1. Edit the `dns_check.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2] to start collecting your DNS data.
   See the [sample dns_check.d/conf.yaml][3] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Name of your DNS check instance.
     ## To create multiple DNS checks, create multiple instances with unique names.
     #
     - name: '<INSTANCE_NAME>'

       ## @param hostname - string - required
       ## Hostname to resolve.
       #
       hostname: '<HOSTNAME>'
   ```

    If you omit the `nameserver` option, the check uses whichever nameserver is configured in local network settings.

2. [Restart the Agent][4] to begin sending DNS service checks and response times to Datadog.

### Validation

[Run the Agent's `status` subcommand][5] and look for `dns_check` under the Checks section.

## 収集データ

### Metrics
{{< get-metrics-from-git "dns_check" >}}


### Events

The DNS check does not include any events.

### Service Checks
{{< get-service-checks-from-git "dns_check" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/dns_check/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/dns_check/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/


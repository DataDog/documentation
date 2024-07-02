---
"app_id": "external-dns"
"app_uuid": "b41539a6-8222-4d6e-92f9-0a9f8496acdd"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": external_dns.source.endpoints.total
      "metadata_path": metadata.csv
      "prefix": external_dns.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10075"
    "source_type_name": External DNS
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- network
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/external_dns/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "external_dns"
"integration_id": "external-dns"
"integration_title": "External DNS"
"integration_version": "3.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "external_dns"
"public_title": "External DNS"
"short_description": "Track all your External DNS metrics with Datadog"
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
  - "Category::Network"
  "configuration": "README.md#Setup"
  "description": Track all your External DNS metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": External DNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from the external DNS service in real time to visualize and monitor DNS metrics collected with the Kubernetes external DNS Prometheus add on.

For more information about external DNS, see the [Github repo][1].

## Setup

### Installation

The external DNS check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your servers.

### Configuration

Edit the `external_dns.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][3], to point to your server and port, and to set the masters to monitor. See the [sample external_dns.d/conf.yaml][4] for all available configuration options.

#### Using with service discovery

If you are using one Datadog Agent pod per Kubernetes worker node, use these example annotations on your external-dns pod to retrieve the data automatically:

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- The `externaldns-pod` tag keeps track of the target DNS pod IP. The other tags are related to the Datadog Agent that is polling the information using the autodiscovery.
- The autodiscovery annotations are done on the pod. To deploy, add the annotations to the metadata of the template's specification.

### Validation

[Run the Agent's `status` subcommand][5] and look for `external_dns` under the Checks section.

## 収集データ

### Metrics
{{< get-metrics-from-git "external_dns" >}}


### Events

The external DNS check does not include any events.

### Service Checks
{{< get-service-checks-from-git "external_dns" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://github.com/kubernetes-incubator/external-dns
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/external_dns/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/external_dns/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/


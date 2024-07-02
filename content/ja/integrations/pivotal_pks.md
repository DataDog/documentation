---
"app_id": "pivotal-pks"
"app_uuid": "e8a08b96-bbca-4907-8cc8-b7c3abf2f443"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10034"
    "source_type_name": Pivotal PKS
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
- kubernetes
- log collection
- network
- orchestration
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pivotal_pks"
"integration_id": "pivotal-pks"
"integration_title": "Pivotal Container Service"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "pivotal_pks"
"public_title": "Pivotal Container Service"
"short_description": "Enterprise-Grade Kubernetes offering from Pivotal."
"supported_os":
- linux
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Network"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Enterprise-Grade Kubernetes offering from Pivotal.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Pivotal Container Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This integration monitors [Pivotal Container Service][1] clusters.

## セットアップ

Since Datadog already integrates with Kubernetes, it is ready-made to monitor Pivotal Kubernetes Service (PKS). You can use the Datadog [Cluster Monitoring tile][2] along with this integration to monitor your cluster.

Install the Datadog Agent on each non-worker VM in your PKS environment. In environments without Pivotal Application Service (PAS) installed, select the `Resource Config` section of the tile and set `instances` of the `datadog-firehose-nozzle` to `0`.

### Metric collection

Monitoring PKS requires that you set up the Datadog integration for [Kubernetes][3].

### Log collection

_Available for Agent versions >6.0_

The setup is exactly the same as for Kubernetes.
To start collecting logs from all your containers, use your Datadog Agent [environment variables][4].

You can also take advantage of DaemonSets to [automatically deploy the Datadog Agent on all your nodes][5].

Follow the [container log collection steps][6] to learn more about those environment variables and discover more advanced setup options.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://network.pivotal.io/products/datadog
[3]: https://docs.datadoghq.com/integrations/kubernetes/
[4]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup
[5]: https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#container-installation
[6]: https://docs.datadoghq.com/logs/log_collection/docker/#option-2-container-installation
[7]: https://docs.datadoghq.com/help/


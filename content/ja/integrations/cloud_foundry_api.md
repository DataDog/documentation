---
app_id: cloud-foundry-api
app_uuid: a0c8e3e8-f3de-4405-88d3-0856e6c0948f
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloud_foundry_api.events.count
      metadata_path: metadata.csv
      prefix: cloud_foundry_api.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cloud Foundry API
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/README.md
display_on_public_website: true
draft: false
git_integration_title: cloud_foundry_api
integration_id: cloud-foundry-api
integration_title: Cloud Foundry API
integration_version: 3.3.1
is_public: true
manifest_version: 2.0.0
name: cloud_foundry_api
public_title: Cloud Foundry API
short_description: Collects Cloud Foundry audit events.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::Orchestration
  configuration: README.md#Setup
  description: Collects Cloud Foundry audit events.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cloud Foundry API
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check queries the [Cloud Foundry API][1] to collect audit events and send them to Datadog through the Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

The Cloud Foundry API check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### 構成

1. Edit the `cloud_foundry_api.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Cloud Foundry API data. See the [sample cloud_foundry_api.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `cloud_foundry_api` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloud_foundry_api" >}}


### イベント

The Cloud Foundry API integration collects the configured audit events.

### サービスチェック
{{< get-service-checks-from-git "cloud_foundry_api" >}}


## トラブルシューティング

Need help? Contact [Datadog support][9].


[1]: http://v3-apidocs.cloudfoundry.org
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/datadog_checks/cloud_foundry_api/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help
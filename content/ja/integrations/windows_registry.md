---
app_id: windows-registry
app_uuid: cc166a5c-6742-4811-b3e1-93dbec0ac5b2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8444609
    source_type_name: windows-registry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_registry/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_registry
integration_id: windows-registry
integration_title: Windows Registry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: windows_registry
public_title: Windows Registry
short_description: Monitor your Windows hosts for changes in registry keys.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  configuration: README.md#Setup
  description: Monitor your Windows hosts for changes in registry keys.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows Registry
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Watch for changes in Windows Registry keys and forward them to Datadog. Enable this integration to:

- Understand system and application level health and state through Windows Registry values.
- Monitor for unexpected changes impacting security and compliance requirements.

## セットアップ

### インストール

The Windows Registry integration is included in the [Datadog Agent][1] package. No additional installation is needed.

### 構成

This integration collects and reports Windows Registry information using both of the following methods:

- As [Datadog Metrics][2]
- As [Datadog Logs][3]


1. Edit the `windows_registry.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's [configuration directory][4] to start collecting Windows registry information. See the [sample windows_registry.d/conf.yaml][5] for all available configuration options.

2. To send registry values and changes as Logs, log collection needs to be enabled in the Datadog Agent. To enable log collection, add the following to your `datadog.yaml` file: 

    ```yaml
    logs_enabled: true
    ```

3. [Restart the Agent][6].


### Validation

Check the information page in the Datadog Agent Manager or run the Agent's `status` [subcommand][7] and look for `windows_registry` under the **Checks** section.

## 収集データ

### メトリクス

All metrics collected by the Windows Registry integration are forwarded to Datadog as [custom metrics][11], which may impact your billing.

### Logs

All logs collected by the Windows Registry integration are forwarded to Datadog, and are subject to [Logs billing][8].

### サービスチェック

The Windows Registry integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9] with an [Agent Flare][10].

[10]:https://docs.datadoghq.com/ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[11]:https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/?tab=countrate
[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://docs.datadoghq.com/ja/metrics/#overview
[3]: https://docs.datadoghq.com/ja/logs/
[4]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/windows_registry.d/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/?tab=gui#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/account_management/billing/log_management/
[9]: https://docs.datadoghq.com/ja/help/
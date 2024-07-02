---
"app_id": "active-directory"
"app_uuid": "e03a0916-8708-4417-82e4-1f0c7bbee655"
"assets":
  "dashboards":
    "Active Directory": "assets/dashboards/active_directory.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "active_directory.dra.inbound.objects.persec"
      "metadata_path": "metadata.csv"
      "prefix": "active_directory."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10068"
    "source_type_name": "Active Directory"
  "monitors":
    "[Active Directory] Anomalous number of sessions for connected LDAP clients for host: {{host.name}}": "assets/monitors/ldap_client_sessions.json"
    "[Active Directory] Anomalous number of successful LDAP bindings for host: {{host.name}}": "assets/monitors/ldap_binding_successful.json"
    "[Active Directory] Elevated LDAP binding duration for host {{host.name}}": "assets/monitors/ldap_binding.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "active_directory"
"integration_id": "active-directory"
"integration_title": "Active Directory"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "active_directory"
"public_title": "Active Directory"
"short_description": "Collect and graph Microsoft Active Directory metrics"
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "Collect and graph Microsoft Active Directory metrics"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Active Directory"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from Microsoft Active Directory to visualize and monitor its performances.

## セットアップ

### インストール

The Agent's Active Directory check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your servers.

If installing the Datadog Agent on a domain environment, see [the installation requirements for the Agent][2]

### 構成

#### Metric collection

1. Edit the `active_directory.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][3] to start collecting your Active Directory performance data. The default setup should already collect metrics for the localhost. See the [sample active_directory.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5]

**Note**: Versions 1.13.0 or later of this check use a new implementation for metric collection, which requires Python 3. For hosts that are unable to use Python 3, or if you would like to use a legacy version of this check, refer to the following [config][6].

### Validation

[Run the Agent's status subcommand][7] and look for `active_directory` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "active_directory" >}}


### イベント

The Active Directory check does not include any events.

### サービスチェック

The Active Directory check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[9]: https://docs.datadoghq.com/help/


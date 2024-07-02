---
"app_id": "mergify"
"app_uuid": "17230c84-50c7-4025-8fc8-69a9bc0bd502"
"assets":
  "dashboards":
    "Mergify merge queue overview": assets/dashboards/mergify_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": mergify.queue_checks_outcome
      "metadata_path": metadata.csv
      "prefix": mergify.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10349"
    "source_type_name": Mergify
"author":
  "homepage": "https://mergify.com"
  "name": Community
  "sales_email": hello@mergify.com
  "support_email": support@mergify.com
"categories":
- developer tools
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/mergify/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mergify"
"integration_id": "mergify"
"integration_title": "Mergify"
"integration_version": "1.0.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "mergify"
"public_title": "Mergify"
"short_description": "Mergify merge queue statistics integration"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Category::Developer Tools"
  "configuration": "README.md#Setup"
  "description": Mergify merge queue statistics integration
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Mergify
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This integration monitors merge queue length for each configured repository in
[Mergify][1] and tracks Mergify's global availability. By sending metrics to your
Datadog account, you can set up monitors for anomaly alerts and analyze merge
queue performance. You can maintain awareness of Mergify service availability
and optimize your development workflow using this Datadog integration.

## セットアップ

### インストール

#### From release

Run `datadog-agent integration install -t datadog-mergify==<INTEGRATION_VERSION>`.

#### From source

To install the Mergify check on your host:

1. Install the [developer tool][2] on any machine.

2. Run `ddev release build mergify` to build the package.

3. [Download the Datadog Agent][3].

4. Upload the build artifact to any host with an Agent and
 run `datadog-agent integration install -w
 path/to/mergify/dist/<ARTIFACT_NAME>.whl`.

### 構成

1. Edit the `mergify.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Mergify [metrics](#metrics).

   See the sample [mergify.d/conf.yaml.example][5] file for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `mergify` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "mergify" >}}


### イベント

Mergify does not include any events.

## トラブルシューティング

Need help? Contact [Mergify support][1].

[1]: https://mergify.com
[2]: https://docs.datadoghq.com/developers/integrations/new_check_howto/#configure-the-developer-tool
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/mergify/datadog_checks/mergify/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/mergify/assets/service_checks.json


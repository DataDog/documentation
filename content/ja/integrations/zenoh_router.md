---
"app_id": "zenoh-router"
"app_uuid": "8ef30e8d-955c-4456-b176-a01f2560bda1"
"assets":
  "dashboards":
    "Zenoh routers - Overview": assets/dashboards/zenoh_routers_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": zenoh.router.sessions
      "metadata_path": metadata.csv
      "prefix": zenoh.router.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10445"
    "source_type_name": Zenoh router
  "monitors":
    "[Zenoh router] Disconnected": assets/monitors/zenoh_router_disconnected.json
"author":
  "homepage": "https://zenoh.io/"
  "name": ZettaScale
  "sales_email": contact@zettascale.tech
  "support_email": alexander@bushnev.pro
"categories":
- network
- iot
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "zenoh_router"
"integration_id": "zenoh-router"
"integration_title": "Zenoh router"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "zenoh_router"
"public_title": "Zenoh router"
"short_description": "Collect network metrics from the Zenoh routers."
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
  - "Category::Network"
  - "Category::IoT"
  - "Offering::Integration"
  - "Queried Data Type::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Collect network metrics from the Zenoh routers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Zenoh router
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors Zenoh router.

[Zenoh][1] is an open source Zero Overhead Network Protocol.

Zenoh (/zeno/) is a pub/sub/query protocol unifying data in motion, data at rest, and computations. It elegantly blends traditional pub/sub with geo distributed storage, queries, and computations, while retaining a level of time and space efficiency that is well beyond any of the mainstream stacks.

The Zenoh router integration allows you to monitor router metrics and router/peer/client connection statuses in Datadog.

## セットアップ

### Installation with the Datadog Agent (v7.21+ and v6.21+)

For Agent v7.21+ / v6.21+, follow the instructions below to install Zenoh router check on your host.

1. On your host, run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-zenoh_router==<INTEGRATION_VERSION>
   ```

### Installation from the source code

To install the Zenoh router check on your host:

1. Install the [developer toolkit][2] on any machine.

2. Run `ddev release build zenoh_router` to build the package.

3. Upload the build artifact to any host with [the Agent installed][3]

4. On the host, run `datadog-agent integration install -w path/to/zenoh_router/dist/<ARTIFACT_NAME>.whl`.

### 構成

1. Make sure that the [Zenoh REST API plugin][4] is enabled.

2. Edit the `zenoh_router.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Zenoh router [metrics](#metrics).
See the [sample zenoh_router.d/conf.yaml][6] for all available configuration options.

3. [Restart the Agent][7].

### Validation

Run the [Agent's status subcommand][8] and look for `zenoh_router` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "zenoh_router" >}}


### イベント

Zenoh router does not include any events.

### サービスチェック
{{< get-service-checks-from-git "zenoh_router" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://zenoh.io/
[2]: https://docs.datadoghq.com/developers/integrations/python/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://zenoh.io/docs/apis/rest/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/datadog_checks/zenoh_router/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zenoh_router/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/


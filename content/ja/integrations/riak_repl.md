---
app_id: riak-repl
app_uuid: bbba11cf-2ea1-4a8b-904c-eb3b55ed169a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: riak_repl.server_bytes_sent
      metadata_path: metadata.csv
      prefix: riak_repl.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10168
    source_type_name: Riak MDC Replication
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: britt.treece@gmail.com
  support_email: britt.treece@gmail.com
categories:
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md
display_on_public_website: true
draft: false
git_integration_title: riak_repl
integration_id: riak-repl
integration_title: Riak MDC Replication
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: riak_repl
public_title: Riak MDC Replication
short_description: Track replication performance, capacity, and health
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
  - Category::Data Stores
  configuration: README.md#Setup
  description: Track replication performance, capacity, and health
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Riak MDC Replication
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors Riak replication [riak-repl][1].

## セットアップ

The Riak-Repl check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Riak-Repl check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-riak_repl==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `riak_repl.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your riak_repl performance data. See the [sample riak_repl.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6]

### Validation

Run the [Agent's status subcommand][7] and look for `riak_repl` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "riak_repl" >}}


### サービスチェック

The Riak-Repl integration does not include any service checks.

### イベント

The Riak-Repl integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/ja/integrations/riak_repl/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
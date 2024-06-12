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
  name: コミュニティ
  sales_email: britt.treece@gmail.com
  support_email: britt.treece@gmail.com
categories:
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md
display_on_public_website: true
draft: false
git_integration_title: riak_repl
integration_id: riak-repl
integration_title: Riak MDC Replication
integration_version: 1.0.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: riak_repl
public_title: Riak MDC Replication
short_description: レプリケーションのパフォーマンス、容量、健全性を追跡
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
  description: レプリケーションのパフォーマンス、容量、健全性を追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Riak MDC Replication
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは Riak レプリケーション [riak-repl][1] を監視します。

## 計画と使用

Riak-Repl チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Riak-Repl チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-riak_repl==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. riak_repl のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `riak_repl.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル riak_repl.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `riak_repl` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "riak_repl" >}}


### ヘルプ

Riak-Repl インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Riak-Repl インテグレーションには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/riak_repl/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
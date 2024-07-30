---
app_id: exim
app_uuid: c84e4868-f96b-49b6-8243-2031dde179af
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: exim.queue.count
      metadata_path: metadata.csv
      prefix: exim.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10291
    source_type_name: exim
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: JeanFred1@gmail.com
  support_email: JeanFred1@gmail.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/exim/README.md
display_on_public_website: true
draft: false
git_integration_title: exim
integration_id: exim
integration_title: Exim
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: exim
public_title: Exim
short_description: メールキューを監視する Exim インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: メールキューを監視する Exim インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Exim
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Exim][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い exim チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-exim==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. exim のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `exim.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル exim.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `exim` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "exim" >}}


### ヘルプ

Exim インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "exim" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.exim.org/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/exim/datadog_checks/exim/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/exim/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/exim/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
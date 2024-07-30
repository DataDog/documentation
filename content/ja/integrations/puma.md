---
app_id: puma
app_uuid: c517e801-0fa5-4f5e-8175-a7d5d48a8131
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: puma.workers
      metadata_path: metadata.csv
      prefix: puma.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10126
    source_type_name: Puma
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: justin.morris@ferocia.com.au
  support_email: justin.morris@ferocia.com.au
categories:
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/puma/README.md
display_on_public_website: true
draft: false
git_integration_title: puma
integration_id: puma
integration_title: Puma
integration_version: 1.2.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: puma
public_title: Puma
short_description: Ruby および Rack のための高速コンカレントウェブサーバー
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ruby および Rack のための高速コンカレントウェブサーバー
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Puma
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックでは、[コントロールとステータス][2]サーバーにより提供される Puma メトリクスエンドポイントを使用して、Datadog Agent 経由で [Puma][1] を監視します。

## 計画と使用

Puma チェックは [Datadog Agent][3] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Puma チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][4]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][5]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Puma のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `puma.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル puma.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][8]を実行し、Checks セクションの `puma` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "puma" >}}


### ヘルプ

Puma には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "puma" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/puma/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/
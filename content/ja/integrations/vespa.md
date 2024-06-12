---
app_id: vespa
app_uuid: 9e31df30-189f-468f-88c7-9c73caf4cdca
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: vespa.mem.heap.free.average
      metadata_path: metadata.csv
      prefix: vespa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10212
    source_type_name: Vespa
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Vespa
  sales_email: dd@vespa.ai
  support_email: dd@vespa.ai
categories:
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md
display_on_public_website: true
draft: false
git_integration_title: vespa
integration_id: vespa
integration_title: Vespa
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: vespa
public_title: Vespa
short_description: ビッグデータサービングエンジン Vespa の健全性とパフォーマンスの監視
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  configuration: README.md#Setup
  description: ビッグデータサービングエンジン Vespa の健全性とパフォーマンスの監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Vespa
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Vespa][1] システムからメトリクスをリアルタイムに取得して、以下のことを実施できます。

- Vespa のステータスとパフォーマンスを視覚化して監視する
- 健全性と可用性に関するアラートを生成する

## 計画と使用

Vespa チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Vespa チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

Vespa チェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーに `vespa.d/` フォルダーを作成します。
2. 上記のステップで作成した `vespa.d/` フォルダーに `conf.yaml` ファイルを作成します。
3. [vespa.d/conf.yaml のサンプル][6]ファイルを参考にして、`conf.yaml` ファイルのコンテンツをコピーします。
4. `conf.yaml` ファイルを編集して `consumer` を構成します。これにより、チェックによって転送されるメトリクスを決定します。
   - `consumer`: Vespa アプリケーションの services.xml からメトリクスを収集するコンシューマー。`default` コンシューマーまたは[カスタムコンシューマー][7]の
     いずれか。
5. [Agent を再起動します][8]。

### 検証

[Agent のステータスサブコマンド][9]を実行し、Checks セクションで `vespa` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "vespa" >}}


### ヘルプ

Vespa インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "vespa" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[7]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/vespa/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/
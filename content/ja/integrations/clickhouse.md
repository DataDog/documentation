---
app_id: clickhouse
app_uuid: 668f43c1-bdd8-4686-bb92-d40f0c48fda9
assets:
  dashboards:
    ClickHouse Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: clickhouse.query.active
      metadata_path: metadata.csv
      prefix: clickhouse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ClickHouse
  logs:
    source: clickhouse
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data store
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/clickhouse/README.md
display_on_public_website: true
draft: false
git_integration_title: clickhouse
integration_id: clickhouse
integration_title: ClickHouse
integration_version: 2.8.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: clickhouse
oauth: {}
public_title: ClickHouse
short_description: ClickHouse クラスターの健全性とパフォーマンスを監視。
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
  - Category::Data Store
  - Category::Log Collection
  configuration: README.md#Setup
  description: ClickHouse クラスターの健全性とパフォーマンスを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ClickHouse
---



## 概要

このチェックは、Datadog Agent を通じて [ClickHouse][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

ClickHouse チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

#### メトリクスの収集

1. ClickHouse のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `clickhouse.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル clickhouse.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. ClickHouse のログの収集を開始するには、該当のログファイルを `clickhouse.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/log/clickhouse-server/clickhouse-server.log
         source: clickhouse
         service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル clickhouse.d/conf.yaml][1] を参照してください。

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `clickhouse`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<ユーザー>", "password": "<パスワード>"}`       |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、**Checks** セクションで `clickhouse` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "clickhouse" >}}


### イベント

ClickHouse チェックにはイベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "clickhouse" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。



[1]: https://clickhouse.yandex
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/
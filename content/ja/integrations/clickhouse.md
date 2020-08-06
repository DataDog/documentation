---
assets:
  dashboards:
    ClickHouse Overview: assets/dashboards/overview.json
  logs:
    source: clickhouse
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/clickhouse/README.md'
display_name: ClickHouse
git_integration_title: clickhouse
guid: 781edd66-9c4c-4210-898c-182a6b8ba4ab
integration_id: clickhouse
integration_title: ClickHouse
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: clickhouse.
metric_to_check: clickhouse.query.active
name: clickhouse
public_title: Datadog-ClickHouse インテグレーション
short_description: ClickHouse クラスターの健全性とパフォーマンスを監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [ClickHouse][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

ClickHouse チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

#### メトリクスの収集

1. ClickHouse のパフォーマンスデータを収集するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `clickhouse.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル clickhouse.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル clickhouse.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `clickhouse`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<ユーザー>", "password": "<パスワード>"}`       |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][6]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][7]し、**Checks** セクションで `clickhouse` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "clickhouse" >}}


### サービスのチェック

**clickhouse.can_connect**:<br>
Agent が監視対象の ClickHouse データベースに接続できない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

### イベント

ClickHouse チェックにはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://clickhouse.yandex
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
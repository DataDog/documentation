---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Singlestore Overview: assets/dashboards/overview.json
  logs:
    source: singlestore
  metrics_metadata: metadata.csv
  monitors:
    '[SingleStore] License expiration': assets/monitors/license_expiration.json
    '[SingleStore] Read failures rate': assets/monitors/read_failures.json
    '[SingleStore] Write failures rate': assets/monitors/write_failures.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- data store
- ログの収集
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/singlestore/README.md
display_name: SingleStore
draft: false
git_integration_title: singlestore
guid: d40f153d-d02d-4bcc-9a7d-04bf5ba46e7a
integration_id: singlestore
integration_title: SingleStore
integration_version: 1.3.0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: singlestore.
metric_to_check: singlestore.bytes_received
name: singlestore
process_signatures:
- memsqld
public_title: SingleStore
short_description: リーフやアグリゲーターから SingleStore のメトリクスを収集します。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [SingleStore][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

SingleStore チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

##### メトリクスの収集
1. SingleStore のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `singlestore.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル singlestore.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

**注**: デフォルトでは、SingleStore インテグレーションは `MV_GLOBAL_STATUS`、`AGGREGATORS`、`LEAVES` テーブルからしかメトリクスを収集しません。システムレベルのメトリクス (CPU、ディスク、ネットワーク IO、メモリ) を追加で収集するには、`singlestore.d/conf.yaml` ファイルで `collect_system_metrics: true` を設定します。

##### ログの収集

{{< site-region region="us3" >}}
**ログ収集は、このサイトではサポートされていません。**
{{< /site-region >}}

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. SingleStore のログの収集を開始するには、該当のログファイルを `singlestore.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/lib/memsql/<NODE_ID>/tracelogs/memsql.log
         source: singlestore
         service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル singlestore.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `singlestore`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<ユーザー>", "password": "<パスワード>"}`       |


**注**: デフォルトでは、SingleStore インテグレーションは `MV_GLOBAL_STATUS`、`AGGREGATORS`、`LEAVES` テーブルからしかメトリクスを収集しません。システムレベルのメトリクス (CPU、ディスク、ネットワーク IO、メモリ) を追加で収集するには、`singlestore.d/conf.yaml` ファイルで `"collect_system_metrics": "true"` を追加します。

##### ログの収集

{{< site-region region="us3" >}}
**ログ収集は、このサイトではサポートされていません。**
{{< /site-region >}}

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][6]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "singlestore", "service": "<SERVICE_NAME>"}` |


### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `singlestore` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "singlestore" >}}



### イベント

SingleStore インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "singlestore" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.singlestore.com/
[2]: https://docs.datadoghq.com/ja/getting_started/agent/autodiscovery#integration-templates
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/singlestore/datadog_checks/singlestore/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/singlestore/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/singlestore/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
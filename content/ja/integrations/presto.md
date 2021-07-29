---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Presto Overview: assets/dashboards/overview.json
  logs:
    source: presto
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    error_patterns: assets/saved_views/error_patterns.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/presto/README.md'
display_name: Presto
draft: false
git_integration_title: presto
guid: a05766fc-8760-464b-9e5d-a784500b7b90
integration_id: presto
integration_title: Presto
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: presto.
metric_to_check: presto.failure_detector.active_count
name: presto
public_title: Datadog-Presto インテグレーション
short_description: PrestoSQL クラスターのパフォーマンスや使用状況の統計などを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、次のような [Presto][1] メトリクスを収集します。

- 全体的なアクティビティメトリクス: 完了/失敗したクエリ、データ入力/出力サイズ、実行時間。
- パフォーマンスメトリクス: クラスターメモリ、入力 CPU 時間、実行 CPU 時間。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Presto チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。使用状況メトリクスとパフォーマンスメトリクスを収集するコーディネーターノードおよびワーカーノードごとに Agent をインストールします。

### コンフィギュレーション

1. Presto のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `presto.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル presto.d/conf.yaml][4] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][5]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][6]までお問い合わせください。

2. [Agent を再起動します][7]。

#### メトリクスの収集

presto.d/conf.yaml ファイルのデフォルトコンフィギュレーションを使用して、Presto メトリクスの収集を有効にします。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル presto.d/conf.yaml][4] を参照してください。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Presto のログの収集を開始するには、次のコンフィギュレーションブロックを `presto.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/presto/*.log
       source: presto
       service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル presto.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `presto` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "presto" >}}


### イベント

Presto には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "presto" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.datadoghq.com/ja/integrations/presto/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/integrations/java/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/presto/assets/service_checks.json
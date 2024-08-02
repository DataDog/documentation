---
app_id: presto
app_uuid: b725cadc-d041-4199-8b86-c714ee9a318f
assets:
  dashboards:
    Presto Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: presto.failure_detector.active_count
      metadata_path: metadata.csv
      prefix: presto.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10057
    source_type_name: Presto
  logs:
    source: presto
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    error_patterns: assets/saved_views/error_patterns.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/presto/README.md
display_on_public_website: true
draft: false
git_integration_title: presto
integration_id: presto
integration_title: Presto
integration_version: 2.8.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: presto
public_title: Presto
short_description: PrestoSQL クラスターのパフォーマンスや使用状況の統計などを収集
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
  - Category::Log Collection
  configuration: README.md#Setup
  description: PrestoSQL クラスターのパフォーマンスや使用状況の統計などを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Presto
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、次のような [Presto][1] メトリクスを収集します。

- 全体的なアクティビティメトリクス: 完了/失敗したクエリ、データ入力/出力サイズ、実行時間。
- パフォーマンスメトリクス: クラスターメモリ、入力 CPU 時間、実行 CPU 時間。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Presto チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。使用状況メトリクスとパフォーマンスメトリクスを収集するコーディネーターノードおよびワーカーノードごとに Agent をインストールします。

### ブラウザトラブルシューティング

1. Presto のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `presto.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル presto.d/conf.yaml][4] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][5]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][6]までお問い合わせください。

2. [Agent を再起動します][7]。

#### メトリクスの収集

presto.d/conf.yaml ファイルのデフォルトコンフィギュレーションを使用して、Presto メトリクスの収集を有効にします。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル presto.d/conf.yaml][4] を参照してください。

#### 収集データ

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

[Agent の status サブコマンド][8]を実行し、Checks セクションで `presto` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "presto" >}}


### ヘルプ

Presto には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "presto" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.datadoghq.com/ja/integrations/presto/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/integrations/java/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/presto/assets/service_checks.json
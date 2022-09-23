---
app_id: etcd
app_uuid: 7f16875b-4aa8-44e3-adff-63622c234253
assets:
  dashboards:
    Etcd Overview: assets/dashboards/etcd_overview.json
    etcd-Screenboard: assets/dashboards/etcd_2_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - etcd.store.watchers
      - etcd.server.has_leader
      metadata_path: metadata.csv
      prefix: etcd.
    process_signatures:
    - etcd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: etcd
  logs:
    source: etcd
  saved_views:
    etcd_overview: assets/saved_views/etcd_overview.json
    etcd_processes: assets/saved_views/etcd_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- orchestration
- containers
- configuration & deployment
- autodiscovery
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/etcd/README.md
display_on_public_website: true
draft: false
git_integration_title: etcd
integration_id: etcd
integration_title: etcd
integration_version: 3.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: etcd
oauth: {}
public_title: etcd
short_description: 書き込み、更新、削除、ノード間レイテンシー、さまざまな Etcd メトリクスを追跡。
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
  - Category::オーケストレーション
  - Category::コンテナ
  - Category::構成 & デプロイ
  - Category::オートディスカバリー
  - Category::ログの収集
  configuration: README.md#Setup
  description: 書き込み、更新、削除、ノード間レイテンシー、さまざまな Etcd メトリクスを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: etcd
---



![Etcd ダッシュボード][1]

## 概要

Etcd のメトリクスを収集して、以下のことができます。

- Etcd クラスターの健全性を監視できます。
- ホスト構成が同期されていない可能性があることに気付くことができます。
- Etcd のパフォーマンスを他のアプリケーションと関連付けることができます。

## セットアップ

### インストール

Etcdチェックは [Datadog Agent][2] パッケージに含まれています。Etcd インスタンスに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Etcd のパフォーマンスデータを収集するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `etcd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル etcd.d/conf.yaml][2] を参照してください。
2. [Agent を再起動します][3]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. `etcd.d/conf.yaml` の下部にある、コンフィギュレーションブロックのコメントを解除して編集します。

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: etcd
        service: "<SERVICE_NAME>"
    ```

    `path` パラメーターと `service` パラメーターの値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[etcd.d/conf.yaml のサンプル][2]を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                |
| -------------------- | ---------------------------------------------------- |
| `<インテグレーション名>` | `etcd`                                               |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                        |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url": "http://%%host%%:2379/metrics"}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "etcd", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `etcd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "etcd" >}}


Etcd メトリクスは、ノードのステータスに応じて `etcd_state:leader` または `etcd_state:follower` がタグ付けされるため、メトリクスをステータスごとに簡単に集計できます。

### イベント

Etcd チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "etcd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Kubernetes Control Plane モニタリング][5]
- [etcd のパフォーマンスを監視し、一貫した Docker の構成を確保する][6]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/control_plane/?tab=helm
[6]: https://www.datadoghq.com/blog/monitor-etcd-performance
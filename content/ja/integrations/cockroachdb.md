---
app_id: cockroachdb
app_uuid: 7368f005-2333-4dc5-a2b5-14419e4995d1
assets:
  dashboards:
    CockroachDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cockroachdb.sys.uptime
      metadata_path: metadata.csv
      prefix: cockroachdb.
    process_signatures:
    - cockroach
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10036
    source_type_name: CockroachDB
  logs:
    source: cockroachdb
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- キャッシュ
- クラウド
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb
integration_id: cockroachdb
integration_title: CockroachDB
integration_version: 3.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cockroachdb
public_title: CockroachDB
short_description: CockroachDB クラスターの全体的な健全性とパフォーマンスを監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Cloud
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: CockroachDB クラスターの全体的な健全性とパフォーマンスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CockroachDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

CockroachDB チェックは、[CockroachDB][1] クラスターの全体的な健全性とパフォーマンスを監視します。

## セットアップ

### インストール

CockroachDB チェックは [Datadog Agent][2] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

バージョン 1.9.0 から、この OpenMetrics ベースのインテグレーションには、最新モード (ターゲットエンドポイントを指すように `openmetrics_endpoint` を設定することで有効) とレガシーモード (代わりに `prometheus_url` を設定することで有効) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。なお、最新モードには Python 3 が必要です。詳細は [OpenMetrics ベースのインテグレーションにおける最新バージョンとレガシーバージョン][3]を参照してください。

Python 3 を使えないホストやレガシーモードを使うホストについては、以下の[構成][4]を参照してください。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. CockroachDB のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `cockroachdb.d/conf.yaml` ファイルを編集します。マルチノードクラスターの場合、各ノードに対して個別のチェックインスタンスを構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cockroachdb.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
       ## @param openmetrics_endpoint - string - required
       ## The URL exposing metrics in the OpenMetrics format.
       #
     - openmetrics_endpoint: http://localhost:8080/_status/vars
   ```

2. [Agent を再起動します][3]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

   ```yaml
   logs_enabled: true
   ```

2. CockroachDB のログの収集を開始するには、次のコンフィギュレーションブロックを `cockroachdb.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
    - type: file
      path: /var/lib/cockroach/logs/cockroach.log
      source: cockroachdb
      service: cockroachdb
      log_processing_rules:
      - type: multi_line
        name: new_log_start_with_status_and_date
        pattern: [A-Z]\d{6}\s\d+\:\d+\:\d+\.\d+
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル cockroachdb.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                    |
| -------------------- | -------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cockroachdb`                                            |
| `<INIT_CONFIG>`      | 空白または `{}`                                            |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint":"http://%%host%%:8080/_status/vars"}` |

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][2]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "cockroachdb", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `cockroachdb` を探します。

## データ収集

### メトリクス
{{< get-metrics-from-git "cockroachdb" >}}


### サービスチェック

CockroachDB チェックには、サービスのチェック機能は含まれません。

### イベント

CockroachDB チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した CockroachDB パフォーマンスメトリクスの監視][7]


[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog
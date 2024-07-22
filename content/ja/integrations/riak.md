---
app_id: riak
app_uuid: 9f45bc5b-ef21-4336-a44d-7891a7a35cec
assets:
  dashboards:
    riak: assets/dashboards/riak_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: riak.memory_processes
      metadata_path: metadata.csv
      prefix: riak.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Riak
  logs:
    source: riak
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riak/README.md
display_on_public_website: true
draft: false
git_integration_title: riak
integration_id: riak
integration_title: Riak
integration_version: 3.3.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: riak
public_title: Riak
short_description: RiakKV または RiakTS について、ノード、vnode、およびリングのパフォーマンスメトリクスを追跡
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
  - Category::データストア
  - Category::ログの収集
  configuration: README.md#Setup
  description: RiakKV または RiakTS について、ノード、vnode、およびリングのパフォーマンスメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Riak
---



![Riak Graph][1]

## 概要

このチェックを使用して、RiakKV または RiakTS から取得されるノード、vnode、およびリングのパフォーマンスメトリクスを追跡します。

## セットアップ

### インストール

Riak チェックは [Datadog Agent][2] パッケージに含まれています。Riak サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `riak.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル riak.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Riak stats url to connect to.
     #
     - url: http://127.0.0.1:8098/stats
   ```

2. [Agent を再起動][3]すると、Datadog への Riak メトリクスの送信が開始されます。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Riak のログの収集を開始するには、次の構成ブロックを `riak.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/log/riak/console.log
         source: riak
         service: "<SERVICE_NAME>"

       - type: file
         path: /var/log/riak/error.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}

       - type: file
         path: /var/log/riak/crash.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `riak`                                 |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"url":"http://%%host%%:8098/stats"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "riak", "service": "riak", "log_processing_rules": {"type": "multi_line", "name": "new_log_Start_with_date", "pattern": "\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `riak` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "riak" >}}


### イベント

Riak チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "riak" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riak/images/riak_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
---
app_id: lighttpd
app_uuid: 3d7ace6a-9efd-4d21-b4e6-a9956512a875
assets:
  dashboards:
    lighttpd: assets/dashboards/lighttpd_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: lighttpd.performance.uptime
      metadata_path: metadata.csv
      prefix: lighttpd.
    process_signatures:
    - lighttpd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Lighttpd
  logs:
    source: lighttpd
  saved_views:
    lighttpd_processes: assets/saved_views/lighttpd_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- web
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md
display_on_public_website: true
draft: false
git_integration_title: lighttpd
integration_id: lighttpd
integration_title: Lighttpd
integration_version: 3.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: lighttpd
oauth: {}
public_title: Lighttpd
short_description: アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡。
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
  - Category::Web
  - Category::ログの収集
  configuration: README.md#Setup
  description: アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lighttpd
---



![Lighttpd ダッシュボード][1]

## 概要

Agent の lighttpd チェックは、アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡します。

## セットアップ

### APM に Datadog Agent を構成する

Lighttpd チェックは [Datadog Agent][2] パッケージに含まれています。Lighttpd サーバーに追加でインストールする必要はありません。

加えて、Lighttpd サーバーに `mod_status` をインストールします。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `lighttpd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル lighttpd.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param lighttpd_status_url - string - required
     ## Status url of your Lighttpd server.
     #
     - lighttpd_status_url: http://localhost/server-status?auto
   ```

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                           |
| -------------------- | --------------------------------------------------------------- |
| `<インテグレーション名>` | `lighttpd`                                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                   |
| `<インスタンスコンフィギュレーション>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. lighttpd ログの収集を開始するには、次のコンフィギュレーションブロックを `lighttpd.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: lighttpd
   ```

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル lighttpd.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `lighttpd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "lighttpd" >}}


### イベント

Lighttpd チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "lighttpd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [Datadog で Lighttpd の Web サーバーメトリクスを監視します][7]。



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics
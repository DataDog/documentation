---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    lighttpd: assets/dashboards/lighttpd_dashboard.json
  logs:
    source: lighttpd
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    lighttpd_processes: assets/saved_views/lighttpd_processes.json
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md'
display_name: Lighttpd
draft: false
git_integration_title: lighttpd
guid: 01dcfe7a-7a56-4388-a388-799ee6daaaab
integration_id: lighttpd
integration_title: Lighttpd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lighttpd.
metric_to_check: lighttpd.performance.uptime
name: lighttpd
process_signatures:
  - lighttpd
public_title: Datadog-Lighttpd インテグレーション
short_description: アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Lighttpd ダッシュボード][1]

## 概要

Agent の lighttpd チェックは、アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡します。

## セットアップ

### インストール

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

**lighttpd.can_connect**:<br>
Agent が lighttpd に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

Lighttpd Web サーバーのメトリクスを監視する方法 (または理由) について理解するには、Datadog の[ブログ記事][7]を参照してください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics
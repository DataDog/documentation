---
aliases:
  - /ja/integrations/faq/issues-with-apache-integration/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: apache
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/apache/README.md'
description: 毎秒のリクエスト数、処理バイト数、ワーカースレッド数、アップタイムなどを追跡
display_name: Apache
git_integration_title: apache
guid: cb2b4a06-4ede-465e-9478-a45f8b32058a
integration_id: apache
integration_title: Apache
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: apache.
metric_to_check: apache.performance.busy_workers
name: Apache
process_signatures:
  - httpd
  - apache
  - apache2
public_title: Datadog-Apache インテグレーション
short_description: 毎秒のリクエスト数、処理バイト数、ワーカースレッド数、アップタイムなどを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Apache ダッシュボード][1]

## 概要

Apache チェックは、毎秒のリクエスト数、処理されたバイト数、ワーカースレッド数、サービスアップタイムなどを追跡します。

## セットアップ

### インストール

Apache チェックは Agent にパッケージ化されています。Apache のメトリクスとログの収集を開始するには、以下を行います。

1. Apache サーバーに [Agent をインストール][2]します。

2. Apache サーバーに `mod_status` をインストールし、`ExtendedStatus` を有効にします。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. Apache メトリクスの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `apache.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル apache.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param apache_status_url - string - required
     ## Status url of your Apache server.
     #
     - apache_status_url: http://localhost/server-status?auto
   ```

2. [Agent を再起動します][5]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Apache のログの収集を開始するには、次の構成ブロックを `apache.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/apache2/access.log
       source: apache
       service: apache

     - type: file
       path: /var/log/apache2/error.log
       source: apache
       service: apache
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル apache.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                         |
| -------------------- | ------------------------------------------------------------- |
| `<インテグレーション名>` | `apache`                                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                 |
| `<インスタンスコンフィギュレーション>`  | `{"apache_status_url": "http://%%host%%/server-status?auto"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][7]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "apache", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `apache` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "apache" >}}


### イベント

Apache チェックにはイベントは含まれません。

### サービスのチェック

**apache.can_connect**:<br>
設定された `apache_status_url` に Agent が接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

### Apache のステータス URL

Apache インテグレーションで問題が発生する場合の多くは、Agent が Apache のステータス URL にアクセスできないことが原因です。[`apache.d/conf.yaml` ファイル][4]に一覧表示されている `apache_status_url` に対して curl を実行してみてください (必要に応じてログイン資格情報を指定)。

- [Apache SSL 証明書に関する問題][10]

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [CloudFormation を使用した Datadog のデプロイと構成][11]
- [Apache Web サーバーのパフォーマンスの監視][12]
- [Apache パフォーマンスメトリクスを収集する方法][13]
- [Datadog で Apache Web サーバーを監視する方法][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/apache/metadata.csv
[10]: https://docs.datadoghq.com/ja/integrations/faq/apache-ssl-certificate-issues/
[11]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[12]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[13]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[14]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog
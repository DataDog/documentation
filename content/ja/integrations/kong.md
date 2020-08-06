---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Kong Overview: assets/dashboards/kong_overview.json
  logs:
    source: kong
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
  - 'https://github.com/DataDog/integrations-core/blob/master/kong/README.md'
display_name: Kong
git_integration_title: kong
guid: f1098d6f-b393-4374-81c0-47c0a142aeef
integration_id: kong
integration_title: Kong
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kong.
metric_to_check: kong.total_requests
name: kong
process_signatures:
  - kong start
public_title: Datadog-Kong インテグレーション
short_description: 合計リクエスト数、応答コード数、クライアント接続数などを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Agent の Kong チェックは、合計リクエスト数、応答コード数、クライアント接続数などを追跡します。

## セットアップ

### インストール

Kong チェックは [Datadog Agent][1] パッケージに含まれています。Kong サーバーに追加でインストールする必要はありません。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. [Kong メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `kong.d/conf.yaml` ファイルにこの構成ブロックを追加します。使用可能なすべての構成オプションについては、[サンプル kong.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param kong_status_url - string - required
     ## URL where Kong exposes its status.
     #
     - kong_status_url: http://localhost:8001/status/
   ```

2. [Agent を再起動します][4]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Kong アクセスログは NGINX によって生成されます。したがって、デフォルトの場所は NGINX ファイルと同じです。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Kong のログの収集を開始するには、次の構成ブロックを `kong.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: '<SERVICE>'
       source: kong

     - type: file
       path: /var/log/nginx/error.log
       service: '<SERVICE>'
       source: kong
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル kong.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][4]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][5]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                 |
| -------------------- | ----------------------------------------------------- |
| `<インテグレーション名>` | `kong`                                                |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                         |
| `<インスタンスコンフィギュレーション>`  | `{"kong_status_url": "http://%%host%%:8001/status/"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][6]を参照してください。

| パラメーター      | 値                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kong", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `kong` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kong" >}}


### イベント

Kong チェックには、イベントは含まれません。

### サービスのチェック

**kong.can_connect**:<br>
Agent が Kong に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [新しい Datadog インテグレーションを使用した Kong の監視][10]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/kong/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/monitor-kong-datadog
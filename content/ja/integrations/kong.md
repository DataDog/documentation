---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Kong Overview: assets/dashboards/kong_overview.json
    kong: assets/dashboards/kong_dashboard.json
  logs:
    source: kong
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    kong_processes: assets/saved_views/kong_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
- web
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kong/README.md
display_name: Kong
draft: false
git_integration_title: kong
guid: f1098d6f-b393-4374-81c0-47c0a142aeef
integration_id: kong
integration_title: Kong
integration_version: 2.1.0
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

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Prometheus プラグインを有効にする][1]ことで、OpenMetrics のメトリクスが Kong サービスで公開されることを確認します。これは、Agent が Kong のメトリクスを収集する前に、最初に構成する必要があります。
2. [Kong メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `kong.d/conf.yaml` ファイルにこの構成ブロックを追加します。使用可能なすべての構成オプションについては、[サンプル kong.d/conf.yaml][3] を参照してください。


   ```yaml
   init_config:

   instances:
     ## @param openmetrics_endpoint - 文字列 - 必須
     ## OpenMetrics 形式のメトリクスを公開するURL。
     #
     - openmetrics_endpoint: http://localhost:8001/metrics
   ```

2. [Agent を再起動します][4]。

**注**: 現在のバージョンのチェック (1.17.0+) は、メトリクスの収集に [OpenMetrics][5] を使用しており、これは Python 3 を必要とします。Python 3 を使用できないホスト、またはこのチェックのレガシーバージョンを使用する場合は、次の[構成][6]を参照してください。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル kong.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

[1]: https://docs.konghq.com/hub/kong-inc/prometheus/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.27.x/kong/datadog_checks/kong/data/conf.yaml.example
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

[Prometheus プラグインを有効にする][1]ことで、OpenMetrics のメトリクスが Kong サービスで公開されることを確認します。これは、Agent が Kong のメトリクスを収集する前に、最初に構成する必要があります。
コンテナ環境では、[オートディスカバリーインテグレーションテンプレート][2]を参照して、以下のパラメーターを適用するためのガイダンスを確認してください。

##### メトリクスの収集

| パラメーター            | 値                                                 |
| -------------------- | ----------------------------------------------------- |
| `<インテグレーション名>` | `kong`                                                |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                         |
| `<インスタンスコンフィギュレーション>`  | `{"openmetrics_endpoint": "http://%%host%%:8001/metrics"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][3]を参照してください。

| パラメーター      | 値                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kong", "service": "<サービス名>"}` |

[1]: https://docs.konghq.com/hub/kong-inc/prometheus/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `kong` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kong" >}}


### イベント

Kong チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "kong" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

- [Datadog インテグレーションを使用した Kong の監視][4]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-kong-datadog
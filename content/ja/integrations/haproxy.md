---
app_id: haproxy
app_uuid: 804dd2ae-d0a9-4063-a2bc-bd949ac7bb62
assets:
  dashboards:
    HAProxy - Overview (OpenMetrics): assets/dashboards/openmetrics_overview.json
    HAProxy - Overview (Prometheus): assets/dashboards/prometheus_overview.json
    haproxy: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - haproxy.frontend.bytes.in.count
      - haproxy.frontend.bytes.in_rate
      - haproxy.frontend.bytes.in.total
      metadata_path: metadata.csv
      prefix: haproxy.
    process_signatures:
    - haproxy
    - haproxy-master
    - haproxy-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: HAProxy
  logs:
    source: haproxy
  monitors:
    '[HAProxy] Anomalous frontend request rate for host {{host.name}}': assets/monitors/request_rate.json
    '[HAProxy] Anomalous number of frontend 4xx HTTP responses for host: {{host.name}}': assets/monitors/frontend_5xx.json
    '[HAProxy] Anomalous number of frontend 5xx HTTP responses for host: {{host.name}}': assets/monitors/frontend_4xx.json
    '[HAProxy] Backend queue time went above 500ms for host: {{host.name}}': assets/monitors/backend_queue_time.json
    '[HAProxy] Backend response time is above 500ms for host: {{host.name}}': assets/monitors/backend_rtime.json
    '[HAProxy] High amount of backend session usage for host: {{host.name}}': assets/monitors/backend_sessions.json
    '[HAProxy] High amount of frontend session usage for host: {{host.name}}': assets/monitors/frontend_sessions.json
    '[HAProxy] High number of backend denied responses for host: {{host.name}}': assets/monitors/backend_dreq.json
    '[HAProxy] High number of frontend denied requests for host: {{host.name}}': assets/monitors/frontend_dreq.json
    '[HAProxy] Number of backend connection failures for host: {{host.name}} is above normal.': assets/monitors/backend_econ.json
    '[HAProxy] Number of client-side request error for {{host.name}} is above normal.': assets/monitors/frontend_ereq.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    haproxy_processes: assets/saved_views/haproxy_processes.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- web
- log collection
- autodiscovery
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md
display_on_public_website: true
draft: false
git_integration_title: haproxy
integration_id: haproxy
integration_title: HAProxy
integration_version: 4.3.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: haproxy
oauth: {}
public_title: HAProxy
short_description: リクエスト、応答、エラー、処理バイト数などのキーメトリクスを監視。
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
  - Category::オートディスカバリー
  configuration: README.md#Setup
  description: リクエスト、応答、エラー、処理バイト数などのキーメトリクスを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HAProxy
---



![HAProxy 付属のダッシュボード][1]

## 概要

Datadog で HAProxy のアクティビティをキャプチャして、以下のことができます。

- HAProxy の負荷分散パフォーマンスを視覚化できます。
- サーバーがダウンしたときに気付くことができます。
- HAProxy のパフォーマンスを他のアプリケーションと関連付けることができます。

## セットアップ

### インストール

Haproxy チェックは [Datadog Agent][2] パッケージに含まれています。Haproxy サーバーには何もインストールする必要がありません。

### コンフィギュレーション

#### Prometheus の使用

このインテグレーションを設定するための推奨される方法は、HAProxy で Prometheus エンドポイントを有効にすることです。このエンドポイントは、バージョン 2 (エンタープライズバージョン 1.9rc1) 以降の HAProxy に組み込まれています。古いバージョンを使用している場合は、[HAProxy Prometheus エクスポーター][3]を設定するか、次のセクションで説明するレガシーソケットベースのインテグレーションを設定することを検討してください。

#### HAProxy の準備

1. [公式ガイド][4]を使用して `haproxy.conf` を構成します。
2. [HAProxy を再起動して、Prometheus エンドポイントを有効にします][5]。

#### Agent の構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

##### メトリクスの収集
ホストで実行中の Agent に対してこのチェックを構成するには:

1. HAProxy メトリクスの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `haproxy.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル haproxy.d/conf.yaml][1] を参照してください。

   ```yaml  
   instances:

     ## @param use_openmetrics - boolean - optional - default: false
     ## Enable to preview the new version of the check which supports HAProxy version 2+
     ## or environments using the HAProxy exporter.
     ##
     ## OpenMetrics-related options take effect only when this is set to `true`. 
     ##
     ## Uses the latest OpenMetrics V2 implementation for more features and better performance.
     ## Note: To see the configuration options for the OpenMetrics V1 implementation (Agent 7.33 or older),
     ## https://github.com/DataDog/integrations-core/blob/7.33.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
     #
   - use_openmetrics: true  # Enables OpenMetrics V2

     ## @param openmetrics_endpoint - string - optional
     ## The URL exposing metrics in the OpenMetrics format.
     #
     openmetrics_endpoint: http://localhost:<PORT>/metrics
   ```
   **注**: `use_openmetrics` オプションはメトリクスの収集に [OpenMetrics v2][2] を使用します。これは Agent v7.35+ または Agent v6.35+ で [Python 3][3] を有効にする必要があります。Python 3 を使用できないホスト、または Agent v7.34 以下のホストでは、OpenMetrics v1 の実装または[ソケットベースのレガシーインテグレーション](#using-the-stats-endpoint)を使用します。

   レガシー実装の構成オプションを表示するには、Agent v7.34 の [サンプル haproxy.d/conf.yaml][4] ファイルをご覧ください。


3. [Agent を再起動します][5]。

[1]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[2]: https://datadoghq.dev/integrations-core/base/openmetrics/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-v6-python-3/?tab=helm#use-python-3-with-datadog-agent-v6
[4]: https://github.com/DataDog/integrations-core/blob/7.34.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------|
| `<インテグレーション名>` | `haproxy`                                                                               |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                           |
| `<インスタンスコンフィギュレーション>`  | `{"openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"}` |

##### Kubernetes のデプロイメント例

デプロイメントの `.spec.template.metadata` の下にポッドアノテーションを追加します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: haproxy
spec:
  template:
    metadata:
      labels:
        name: haproxy
      annotations:
        ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
        ad.datadoghq.com/haproxy.init_configs: '[{}]'
        ad.datadoghq.com/haproxy.instances: |
          [
            {
              "openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"
            }
          ]
    spec:
      containers:
        - name: haproxy
```

[1]: https://app.datadoghq.com/account/settings#agent
{{% /tab %}}
{{< /tabs >}}


#### 統計エンドポイントの使用

**注**: このコンフィギュレーション戦略は、レガシーユーザー向けのリファレンスとして提供されています。初めてインテグレーションを設定する場合は、前のセクションで説明した Prometheus ベースの戦略の使用を検討してください。

Agent は、メトリクスを統計エンドポイントを使って収集します。

1. `haproxy.conf` で統計エンドポイントを構成します。

   ```conf
     listen stats # Define a listen section called "stats"
     bind :9000 # Listen on localhost:9000
     mode http
     stats enable  # Enable stats page
     stats hide-version  # Hide HAProxy version
     stats realm Haproxy\ Statistics  # Title text for popup window
     stats uri /haproxy_stats  # Stats URI
     stats auth Username:Password  # Authentication credentials
   ```

2. [HAProxy を再起動して、統計エンドポイントを有効にします][5]。


{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `haproxy.d/conf.yaml` ファイルを編集し、HAProxy の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始します。使用可能なすべてのコンフィギュレーションオプションについては、[haproxy.d/conf.yaml のサンプル][2]を参照してください。

##### メトリクスの収集

1. [Haproxy のメトリクス](#metrics)の収集を開始するには、`haproxy.d/conf.yaml` ファイルに次の構成ブロックを追加します。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Haproxy URL to connect to gather metrics.
     ## Set the according <USERNAME> and <PASSWORD> or use directly a unix stats
     ## or admin socket: unix:///var/run/haproxy.sock
     #
     - url: http://localhost/admin?stats
   ```

2. [Agent を再起動します][3]。

##### ログの収集

デフォルトで、Haproxy はログを UDP 経由で 514 ポートに送信します。Agent はこのポートでログをリッスンできますが、1024 よりも下のポート番号にバインディングするため、管理者特権が必要になります。以下ではこの設定方法について説明します。別のポートを使用することも可能で、その場合は手順 3 をスキップしてください。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Haproxy のログの収集を開始するには、次の構成ブロックを `haproxy.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: udp
       port: 514
       service: <SERVICE_NAME>
       source: haproxy
   ```

    環境に合わせて、`service` パラメーターの値を変更して構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル haproxy.d/conf.yaml][2] を参照してください。

3. `setcap` コマンドを使用して、514 ポートへのアクセスを許可します。

    ```bash
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

    セットアップが正しいか確認するために、`getcap` コマンドを実行します。

    ```bash
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    正しければ、次のように出力されます。
    ```bash
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **注:** この `setcap` コマンドを、Agent をアップグレードするたびに実行してください。

4. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["haproxy"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "https://%%host%%/admin?stats"}]'
```

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。他にも、[ファイル、ConfigMap、または key-value ストア][2]を使用してテンプレートを構成できます。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
    ad.datadoghq.com/haproxy.init_configs: '[{}]'
    ad.datadoghq.com/haproxy.instances: |
      [
        {
          "url": "https://%%host%%/admin?stats"
        }
      ]
spec:
  containers:
    - name: haproxy
```

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.logs: '[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: haproxy
```

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"haproxy\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"https://%%host%%/admin?stats\"}]"
    }
  }]
}
```

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"haproxy\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `haproxy` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "haproxy" >}}


### イベント

Haproxy チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "haproxy" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

- [HAProxy パフォーマンスメトリクスの監視][8]
- [HAProxy メトリクスの収集方法][9]
- [Datadog を使用した HAProxy の監視][10]
- [HAProxy のマルチプロセスコンフィギュレーション][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/haproxy/images/haproxy-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/prometheus/haproxy_exporter
[4]: https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/
[5]: https://www.haproxy.org/download/1.7/doc/management.txt
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[9]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[10]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[11]: https://docs.datadoghq.com/ja/integrations/faq/haproxy-multi-process/
---
app_id: haproxy
app_uuid: 804dd2ae-d0a9-4063-a2bc-bd949ac7bb62
assets:
  dashboards:
    HAProxy - Overview (OpenMetrics): assets/dashboards/openmetrics_overview.json
    HAProxy - Overview (Prometheus): assets/dashboards/prometheus_overview.json
    haproxy: assets/dashboards/overview.json
  integration:
    auto_install: true
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
    source_type_id: 38
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
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md
display_on_public_website: true
draft: false
git_integration_title: haproxy
integration_id: haproxy
integration_title: HAProxy
integration_version: 5.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: haproxy
public_title: HAProxy
short_description: リクエスト、応答、エラー、処理バイト数などのキーメトリクスを監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: リクエスト、応答、エラー、処理バイト数などのキーメトリクスを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HAProxy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![HAProxy 付属のダッシュボード][1]

## 概要

Datadog で HAProxy のアクティビティをキャプチャして、以下のことができます。

- HAProxy の負荷分散パフォーマンスを視覚化できます。
- サーバーがダウンしたときに気付くことができます。
- HAProxy のパフォーマンスを他のアプリケーションと関連付けることができます。

## 計画と使用

このインテグレーションでは、Prometheus エンドポイント (推奨) または stats エンドポイントを介したソケットベースのインテグレーション (非推奨) からメトリクスを収集できます。Prometheus エンドポイントを使用するには、HAProxy バージョン 2 (エンタープライズバージョン 1.9rc1) 以降が必要です。

Prometheus エンドポイントを使用する場合、バージョン 1.10.0 以降、この OpenMetrics ベースのインテグレーションには、最新モード (`use_openmetrics`: true) とレガシーモード (`use_openmetrics`: false および `use_prometheus`: true) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。詳しくは、[OpenMetrics ベースのインテグレーションにおける最新バージョニングとレガシーバージョニング][2]を参照してください。

ソケットベースのインテグレーションを使用するには、`use_openmetrics` と `use_prometheus` を false に設定し、構成セクションの[対応する手順](#using-the-stats-endpoint)に従ってください。

`use_openmetrics` オプションは、最新の [OpenMetrics][3] モードを使用し、Agent v7.35 以降が必要です。または、メトリクス収集のために Agent v6.35 以降で [Python 3][4] を有効にする必要があります。Python 3 を使用できないホストや、Agent v7.34 以前のホストでは、OpenMetrics のレガシーモードまたは[ソケットベースのレガシーインテグレーション](#using-the-stats-endpoint)を使用してください。

`[OpenMetrics V1]` または `[OpenMetrics V2]` とマークされたメトリクスは、HAProxy インテグレーションの対応するモードを使用してのみ利用可能です。`[OpenMetrics V1 and V2]` とマークされたメトリクスは、どちらのモードでも収集されます。

### インフラストラクチャーリスト

HAProxy チェックは [Datadog Agent][5] パッケージに含まれています。HAProxy サーバーには何もインストールする必要がありません。

### ブラウザトラブルシューティング

#### Prometheus の使用

このインテグレーションを設定するための推奨される方法は、HAProxy で Prometheus エンドポイントを有効にすることです。このエンドポイントは、バージョン 2 (エンタープライズバージョン 1.9rc1) 以降の HAProxy に組み込まれています。古いバージョンを使用している場合は、[HAProxy Prometheus エクスポーター][6]を設定するか、次のセクションで説明するレガシーソケットベースのインテグレーションを設定することを検討してください。

最新の OpenMetrics モードではなく、従来の OpenMetrics モードを使用するには、`use_openmetrics` オプションを `use_prometheus` に変更し、`openmetrics_endpoint` オプションを `prometheus_url` に変更してください。詳細については、[ホストからの Prometheus および OpenMetrics メトリクス収集のドキュメント][7]を参照してください。

#### HAProxy の準備

1. [公式ガイド][8]を使用して `haproxy.conf` を構成します。
2. [HAProxy を再起動して、Prometheus エンドポイントを有効にします][9]。

#### Agent の構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

##### メトリクスの収集
ホストで実行中の Agent に対してこのチェックを構成するには

1. HAProxy メトリクスの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `haproxy.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル haproxy.d/conf.yaml][1] を参照してください。

   ```yaml  
   instances:

     ## @param use_openmetrics - boolean - optional - default: false
     ## Enable to preview the new version of the check which supports HAProxy version 2 or later
     ## or environments using the HAProxy exporter.
     ##
     ## OpenMetrics-related options take effect only when this is set to `true`. 
     ##
     ## Uses the latest OpenMetrics V2 implementation for more features and better performance.
     ## Note: To see the configuration options for the OpenMetrics V1 implementation (Agent v7.33 or earlier),
     ## https://github.com/DataDog/integrations-core/blob/7.33.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
     #
   - use_openmetrics: true  # Enables OpenMetrics V2

     ## @param openmetrics_endpoint - string - optional
     ## The URL exposing metrics in the OpenMetrics format.
     #
     openmetrics_endpoint: http://localhost:<PORT>/metrics
   ```

   レガシー実装の構成オプションを表示するには、Agent v7.34 以前の[サンプル haproxy.d/conf.yaml][2] ファイルをご覧ください。


3. [Agent を再起動します][3]。

[1]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/7.34.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `haproxy`                                                                               |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                           |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"}` |

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

[1]: https://app.datadoghq.com/account/settings/agent/latest
{{% /tab %}}
{{< /tabs >}}


#### 統計エンドポイントの使用

この構成戦略は、レガシーユーザー向けのリファレンスとして提供されています。初めてインテグレーションを設定する場合は、前のセクションで説明した Prometheus ベースの戦略の使用を検討してください。

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

2. [HAProxy を再起動して、統計エンドポイントを有効にします][9]。


{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `haproxy.d/conf.yaml` ファイルを編集し、HAProxy の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始します。使用可能なすべてのコンフィギュレーションオプションについては、[haproxy.d/conf.yaml のサンプル][2]を参照してください。

##### メトリクスの収集

1. [HAProxy のメトリクス](#metrics)の収集を開始するには、`haproxy.d/conf.yaml` ファイルに次の構成ブロックを追加します。

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

##### 収集データ

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

##### 収集データ

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

#### ガイド

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。他にも、[ファイル、ConfigMap、または key-value ストア][2]を使用してテンプレートを構成できます。

**Annotations v1** (Datadog Agent v7.36 以前向け)

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

**Annotations v2** (Datadog Agent v7.36 以降向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.checks: |
      {
        "haproxy": {
          "init_config": {},
          "instances": [
            {
              "url": "https://%%host%%/admin?stats"
            }
          ]
        }
      }
spec:
  containers:
    - name: haproxy
```

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

**Annotations v1/v2**

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

##### 収集データ

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

[Agent の status サブコマンドを実行][10]し、Checks セクションで `haproxy` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "haproxy" >}}


### ヘルプ

HAProxy チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "haproxy" >}}


## ヘルプ
### エラー: ポート 514 はすでに使用中
syslog があるシステムで、Agent がポート 514 で HAProxy ログをリッスンしている場合、Agent ログに以下のエラーが表示されることがあります: 
`Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

これは、デフォルトで syslog がポート 514 でリッスンしているために起こっています。このエラーを解決するには、syslog を無効にするか、ポート 514 と Agent がログをリッスンしている別のポートにログを転送するように HAProxy を構成することができます。Agent がリッスンするポートは、[こちら][11]で haproxy.d/conf.yaml ファイル定義することができます。

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

- [HAProxy パフォーマンスメトリクスの監視][13]
- [HAProxy メトリクスの収集方法][14]
- [Datadog を使用した HAProxy の監視][15]
- [HAProxy のマルチプロセス構成][16]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/haproxy/images/haproxy-dash.png
[2]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[3]: https://datadoghq.dev/integrations-core/base/openmetrics/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-v6-python-3/?tab=helm#use-python-3-with-datadog-agent-v6
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://github.com/prometheus/haproxy_exporter
[7]: https://docs.datadoghq.com/ja/integrations/guide/prometheus-host-collection/
[8]: https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/
[9]: https://www.haproxy.org/download/1.7/doc/management.txt
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/0e34b3309cc1371095762bfcaf121b0b45a4e263/haproxy/datadog_checks/haproxy/data/conf.yaml.example#L631
[12]: https://docs.datadoghq.com/ja/help/
[13]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[15]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[16]: https://docs.datadoghq.com/ja/integrations/faq/haproxy-multi-process/
---
app_id: apache
app_uuid: 8dfc1942-7820-49c7-93c8-5a31579ee52a
assets:
  dashboards:
    apache: assets/dashboards/apache_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: apache.performance.busy_workers
      metadata_path: metadata.csv
      prefix: apache.
    process_signatures:
    - httpd
    - apache
    - apache2
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30
    source_type_name: Apache
  logs:
    source: apache
  monitors:
    '[Apache] Low number of idle workers': assets/monitors/apache_low_idle_workers.json
    '[Apache] resource utilization': assets/monitors/high_keep_alive_and_cpu.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    apache_processes: assets/saved_views/apache_processes.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/apache/README.md
display_on_public_website: true
draft: false
git_integration_title: apache
integration_id: apache
integration_title: Apache
integration_version: 4.5.0
is_public: true
manifest_version: 2.0.0
name: apache
public_title: Apache
short_description: 毎秒のリクエスト数、処理バイト数、ワーカースレッド数、アップタイムなどを追跡
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
  description: 毎秒のリクエスト数、処理バイト数、ワーカースレッド数、アップタイムなどを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apache
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Apache ダッシュボード][1]

## 概要

Apache チェックは、毎秒のリクエスト数、処理されたバイト数、ワーカースレッド数、サービスアップタイムなどを追跡します。

## 計画と使用

### インフラストラクチャーリスト

Apache チェックは [Datadog Agent][2] にパッケージ化されています。Apache のメトリクスとログの収集を開始するには、以下を行います。

1. Apache サーバーに [Agent をインストール][3]します。

2. Apache サーバーに `mod_status` をインストールし、`ExtendedStatus` を有効にします。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. Apache メトリクスの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `apache.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル apache.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param apache_status_url - string - required
     ## Status url of your Apache server.
     #
     - apache_status_url: http://localhost/server-status?auto
   ```

2. [Agent を再起動します][3]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

   ```yaml
   logs_enabled: true
   ```

2. このコンフィギュレーションブロックを `apache.d/conf.yaml` ファイルに追加して、Apache ログの収集を開始します。このとき、お使いの環境に応じて構成するために `path` と `service` の値が調整されます。

   ```yaml
   logs:
     - type: file
       path: /path/to/your/apache/access.log
       source: apache
       service: apache
       sourcecategory: http_web_access

     - type: file
       path: /path/to/your/apache/error.log
       source: apache
       service: apache
       sourcecategory: http_web_error
   ```

    使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル apache.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["apache"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

##### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "apache", "service": "<SERVICE_NAME>"}]'
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

**Annotations v1** (Datadog Agent < v7.36 向け)

```yaml
apiVersion: v1
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache"]'
    ad.datadoghq.com/apache.init_configs: '[{}]'
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        }
      ]
spec:
  containers:
    - name: apache
```

**Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "init_config": {},
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        }
      }
spec:
  containers:
    - name: apache
```

##### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

**Annotations v1/v2**

```yaml
apiVersion: v1
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: apache
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
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"apache\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"apache_status_url\": \"http://%%host%%/server-status?auto\"}]"
    }
  }]
}
```

##### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"apache\",\"service\":\"<YOUR_APP_NAME>\"}]"
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

[Agent の status サブコマンドを実行][4]し、Checks セクションの `apache` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "apache" >}}


### ヘルプ

Apache チェックにはイベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "apache" >}}


## ヘルプ

### Apache のステータス URL

Apache インテグレーションで問題が発生する場合の多くは、Agent が Apache のステータス URL にアクセスできないことが原因です。[`apache.d/conf.yaml` ファイル][5]に一覧表示されている `apache_status_url` に対して curl を実行してみてください (必要に応じてログイン資格情報を指定)。

- [Apache SSL 証明書に関する問題][6]

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [CloudFormation を使用した Datadog のデプロイと構成][7]
- [Apache Web サーバーのパフォーマンスの監視][8]
- [Apache パフォーマンスメトリクスを収集する方法][9]
- [Datadog で Apache Web サーバーを監視する方法][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/integrations/faq/apache-ssl-certificate-issues/
[7]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[8]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[9]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[10]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog
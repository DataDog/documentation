---
aliases:
  - /ja/integrations/faq/issues-with-apache-integration/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    apache: assets/dashboards/apache_dashboard.json
  logs:
    source: apache
  metrics_metadata: metadata.csv
  monitors:
    '[Apache] Low number of idle workers': assets/recommended_monitors/apache_low_idle_workers.json
    '[Apache] resource utilization': assets/recommended_monitors/high_keep_alive_and_cpu.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    apache_processes: assets/saved_views/apache_processes.json
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
draft: false
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

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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

##### ログの収集

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

##### ログの収集


ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[Docker ログ収集ドキュメント][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "apache", "service": "<SERVICE_NAME>"}]'
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

##### ログの収集


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][3]を参照してください。

次に、[ログのインテグレーション][4]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][5]を使用して構成することも可能です。

```yaml
apiVersion: v1
kind: Pod
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

##### ログの収集


ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[ECS ログ収集ドキュメント][2]を参照してください。

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

[Agent の status サブコマンドを実行][3]し、Checks セクションの `apache` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "apache" >}}


### イベント

Apache チェックにはイベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "apache" >}}


## トラブルシューティング

### Apache のステータス URL

Apache インテグレーションで問題が発生する場合の多くは、Agent が Apache のステータス URL にアクセスできないことが原因です。[`apache.d/conf.yaml` ファイル][4]に一覧表示されている `apache_status_url` に対して curl を実行してみてください (必要に応じてログイン資格情報を指定)。

- [Apache SSL 証明書に関する問題][5]

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [CloudFormation を使用した Datadog のデプロイと構成][6]
- [Apache Web サーバーのパフォーマンスの監視][7]
- [Apache パフォーマンスメトリクスを収集する方法][8]
- [Datadog で Apache Web サーバーを監視する方法][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/integrations/faq/apache-ssl-certificate-issues/
[6]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[7]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[8]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[9]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog
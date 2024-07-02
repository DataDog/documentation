---
"app_id": "coredns"
"app_uuid": "b613759e-89ca-4d98-a2c1-4d465c42e413"
"assets":
  "dashboards":
    "CoreDNS": assets/dashboards/coredns.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": coredns.request_count
      "metadata_path": metadata.csv
      "prefix": coredns.
    "process_signatures":
    - coredns
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10038"
    "source_type_name": CoreDNS
  "monitors":
    "[CoreDNS] Cache hits count low": assets/monitors/coredns_cache_hits_low.json
    "[CoreDNS] Request duration high": assets/monitors/coredns_request_duration_high.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- containers
- kubernetes
- log collection
- network
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/coredns/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "coredns"
"integration_id": "coredns"
"integration_title": "CoreDNS"
"integration_version": "3.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "coredns"
"public_title": "CoreDNS"
"short_description": "CoreDNS collects DNS metrics in Kubernetes."
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": CoreDNS collects DNS metrics in Kubernetes.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": CoreDNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

CoreDNS からリアルタイムにメトリクスを取得して、DNS エラーとキャッシュのヒットまたはミスを視覚化および監視します。

## セットアップ


バージョン 1.11.0 から、この OpenMetrics ベースのインテグレーションには、最新モード (ターゲットエンドポイントを指すように `openmetrics_endpoint` を設定することで有効) とレガシーモード (代わりに `prometheus_url` を設定することで有効) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。詳細は [OpenMetrics ベースのインテグレーションにおける最新バージョンとレガシーバージョン][1]を参照してください。

CoreDNS チェックの最新モードは Python 3 を必要とし、`.bucket` メトリクスを送信し、`.sum` と `.count` ヒストグラムサンプルを単調カウント型として送信します。これらのメトリクスはレガシーモードでは `gauge` 型で送信されていました。各モードで利用できるメトリクスの一覧は [`metadata.csv` ファイル][2]を参照してください。

Python 3 を使用できないホスト、または以前にこのインテグレーションモードを実装した場合は、`legacy` モードの[構成例][3]を参照してください。`coredns.d/auto_conf.yaml` ファイルに依存しているオートディスカバリーのユーザーのために、このファイルはデフォルトで `legacy` モードのチェックのために `prometheus_url` オプションを有効にします。デフォルトの構成オプションについては [coredns.d/auto_conf.yaml][4] のサンプルを、利用可能なすべての構成オプションについては [coredns.d/conf.yaml.example][5] のサンプルを参照してください。

### インストール

CoreDNS チェックは [Datadog Agent][6] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成
{{< tabs >}}
{{% tab "Docker" %}}
#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

この OpenMetrics ベースのチェックのレガシーモードを有効にするには、`openmetrics_endpoint` を `prometheus_url` に置き換えます。

```yaml
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]' 
```

**注**:

- 出荷時の `coredns.d/auto_conf.yaml` ファイルは、レガシーモードのデフォルトで `prometheus_url` オプションを有効にします。
- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする Datadog Agent に関連します。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

#### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<SERVICE_NAME>"}]'
```

[1]: http://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。または、[ファイル、コンフィギュレーションマップ、または Key-Value ストア][2]を使用してテンプレートを構成することもできます。

**Annotations v1** (Datadog Agent < v7.36 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

**Annotations v2** (Datadog Agent v7.36 以降向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.checks: |
      {
        "coredns": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
        }
      }
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

この OpenMetrics ベースのチェックのレガシーモードを有効にするには、`openmetrics_endpoint` を `prometheus_url` に置き換えます。

**Annotations v1** (Datadog Agent < v7.36 向け)

```yaml
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
```

**Annotations v2** (Datadog Agent v7.36 以降向け)

```yaml
          "instances": [
            {
              "prometheus_url": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
```

**注**:

- 出荷時の `coredns.d/auto_conf.yaml` ファイルは、レガシーモードのデフォルトで `prometheus_url` オプションを有効にします。
- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする Datadog Agent に関連します。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

#### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログインテグレーション][4]をポッドアノテーションとして設定します。または、[ファイル、コンフィギュレーションマップ、または Key-Value ストア][5]を使用してこれを構成することもできます。

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<SERVICE_NAME>"}]'
  labels:
    name: coredns
```

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration
[5]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=file
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"openmetrics_endpoint\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

この OpenMetrics ベースのチェックのレガシーモードを有効にするには、`openmetrics_endpoint` を `prometheus_url` に置き換えます。

```json
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
```

**注**:

- 出荷時の `coredns.d/auto_conf.yaml` ファイルは、レガシーモードのデフォルトで `prometheus_url` オプションを有効にします。
- `dns-pod` タグは、対象の DNS ポッド IP を追跡します。他のタグは、サービスディスカバリーを使用して情報をポーリングする Datadog Agent に関連します。
- ポッドでサービスディスカバリーアノテーションを実行する必要があります。デプロイの場合は、テンプレートの仕様のメタデータにアノテーションを追加します。外側のレベルの仕様には追加しないでください。

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/agent/amazon_ecs/?tab=awscli#process-collection
[2]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `coredns` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "coredns" >}}


### イベント

CoreDNS チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "coredns" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [CoreDNS モニタリングのキーメトリクス][9]
- [CoreDNS からメトリクスとログを収集するためのツール][10]
- [Datadog を使用した CoreDNS の監視方法][11]



[1]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[2]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[3]: https://github.com/DataDog/integrations-core/blob/7.32.x/coredns/datadog_checks/coredns/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: http://docs.datadoghq.com/help
[9]: https://www.datadoghq.com/blog/coredns-metrics/
[10]: https://www.datadoghq.com/blog/coredns-monitoring-tools/
[11]: https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/

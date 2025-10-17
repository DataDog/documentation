---
app_id: strimzi
app_uuid: 06a90da7-974a-489e-b9bf-9a2828a351fe
assets:
  dashboards:
    strimzi: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - strimzi.cluster_operator.jvm.gc.memory_promoted_bytes.count
      - strimzi.topic_operator.jvm.gc.memory_promoted_bytes.count
      - strimzi.user_operator.jvm.gc.memory_promoted_bytes.count
      metadata_path: metadata.csv
      prefix: strimzi.
    process_signatures:
    - java io.strimzi.operator.cluster.Main
    - java io.strimzi.operator.topic.Main
    - java io.strimzi.operator.user.Main
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10352
    source_type_name: Strimzi
  monitors:
    Strimzi Cluster Operator Resource on host is in a "fail" state": assets/monitors/cluster_operator_resource.json
    Strimzi Topic Operator Resource on host is in a "fail" state": assets/monitors/topic_operator_resource.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/strimzi/README.md
display_on_public_website: true
draft: false
git_integration_title: strimzi
integration_id: strimzi
integration_title: Strimzi
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: strimzi
public_title: Strimzi
short_description: Strimzi
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Strimzi
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/container-native-integrations/#messaging-and-streaming-with-strimzi
  support: README.md#Support
  title: Strimzi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Strimzi][1] を監視します。

## セットアップ

### インストール

Strimzi チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

<div class="alert alert-danger">このチェックでは <a href="https://docs.datadoghq.com/integrations/openmetrics/">OpenMetrics</a> を使用しており、Python 3 が必要です。</div>

### 構成

Strimzi チェックは、以下のオペレーターの Prometheus 形式メトリクスを収集します。
   - クラスター
   - トピック
   - ユーザー

**注**: Kafka と Zookeeper の監視には、それぞれ [Kafka][3]、[Kafka Consumer][4]、[Zookeeper][5] チェックを使用してください。

以下の手順に従って、Agent でこのチェックを有効化し、構成します。

#### ホスト

1. Strimzi のパフォーマンス データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダー内の `strimzi.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル strimzi.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

#### コンテナ化

コンテナ化された環境の場合は、これらの手順の適用方法について [オートディスカバリーのインテグレーション テンプレート][8] を参照してください。以下は、ポッド アノテーションを使用して各種の Operator マニフェストで構成する例です。

##### クラスター オペレーター:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: strimzi-cluster-operator
  labels:
    app: strimzi
  namespace: kafka
spec:
  replicas: 1
  selector:
    matchLabels:
      name: strimzi-cluster-operator
      strimzi.io/kind: cluster-operator
  template:
    metadata:
      labels:
        name: strimzi-cluster-operator
        strimzi.io/kind: cluster-operator
      annotations:
        ad.datadoghq.com/strimzi-cluster-operator.checks: |
          {
            "strimzi": {
              "instances":[
                {
                  "cluster_operator_endpoint": "http://%%host%%:8080/metrics"
                }
              ]
            }
          }
      spec:
        containers:
        - name: strimzi-cluster-operator
...
```
**注**: この例で使用したテンプレートは [こちら][9] にあります。


##### トピック オペレーターとユーザー オペレーター:
```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
spec:
...
  entityOperator:
    topicOperator: {}
    userOperator: {}
    template:
      pod:
        metadata:
          annotations:
            ad.datadoghq.com/topic-operator.checks: |
              {
                "strimzi": {
                  "instances":[
                    {
                      "topic_operator_endpoint": "http://%%host%%:8080/metrics"
                    }
                  ]
                }
              }
            ad.datadoghq.com/user-operator.checks: |
              {
                "strimzi": {
                  "instances":[
                    {
                      "user_operator_endpoint": "http://%%host%%:8081/metrics"
                    }
                  ]
                }
              } 
...
```
**注**: この例で使用したテンプレートは [こちら][10] にあります。

使用可能なすべての構成オプションの詳細については、[サンプル strimzi.d/conf.yaml][6] を参照してください。

#### Kafka と Zookeeper

Strimzi の Kafka コンポーネントと Zookeeper コンポーネントは、[Kafka][3]、[Kafka Consumer][4]、[Zookeeper][5] チェックで監視できます。Kafka のメトリクスは JMX 経由で収集されます。JMX を有効化する方法は、[JMX オプションに関する Strimzi のドキュメント][11] を参照してください。以下は、ポッド アノテーションを使用して Kafka、Kafka Consumer、Zookeeper のチェックを構成する例です。
```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    jmxOptions: {}
    version: 3.4.0
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
    template:
      pod:
        metadata:  
          annotations:
            ad.datadoghq.com/kafka.checks: |
              {
                "kafka": {
                  "init_config": {
                    "is_jmx": true, 
                    "collect_default_metrics": true, 
                    "new_gc_metrics": true
                  },
                  "instances":[
                    {
                      "host": "%%host%%",
                      "port": "9999"
                    }
                  ]
                },
                "kafka_consumer": {
                  "init_config": {},
                  "instances": [
                    {
                      "kafka_connect_str": "%%host%%:9092",
                      "monitor_unlisted_consumer_groups": "true"
                    }
                  ]
                }
              }        
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      inter.broker.protocol.version: "3.4"
    storage:
      type: ephemeral
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
    template:
      pod:
        metadata:
          annotations:
            ad.datadoghq.com/zookeeper.checks: |
              {
                "zk": {
                  "instances":[
                    {
                      "host":"%%host%%","port":"2181"
                    }
                  ]
                }
              } 
```
**注**: この例で使用したテンプレートは [こちら][10] にあります。

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Strimzi のログは、Kubernetes 経由で各種の Strimzi ポッドから収集できます。Datadog Agent では、ログ収集はデフォルトで無効です。有効化するには、[Kubernetes ログ収集][12] を参照してください。

[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "strimzi", "service": "<SERVICE_NAME>"}`   |

### 検証

[Agent の status サブコマンドを実行][13] し、Checks セクションで `strimzi` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "strimzi" >}}


### イベント

Strimzi インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "strimzi" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [コンテナ ネイティブ技術のモニタリング][17]


[1]: https://strimzi.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/integrations/kafka/
[4]: https://docs.datadoghq.com/ja/integrations/kafka/?tab=host#kafka-consumer-integration
[5]: https://docs.datadoghq.com/ja/integrations/zk/
[6]: https://github.com/DataDog/integrations-core/blob/master/strimzi/datadog_checks/strimzi/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[9]: https://github.com/strimzi/strimzi-kafka-operator/blob/release-0.34.x/install/cluster-operator/060-Deployment-strimzi-cluster-operator.yaml
[10]: https://github.com/strimzi/strimzi-kafka-operator/blob/release-0.34.x/examples/kafka/kafka-ephemeral-single.yaml
[11]: https://strimzi.io/docs/operators/0.20.0/full/using.html#assembly-jmx-options-deployment-configuration-kafka
[12]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/strimzi/metadata.csv
[15]: https://github.com/DataDog/integrations-core/blob/master/strimzi/assets/service_checks.json
[16]: https://docs.datadoghq.com/ja/help/
[17]: https://www.datadoghq.com/blog/container-native-integrations/#messaging-and-streaming-with-strimzi
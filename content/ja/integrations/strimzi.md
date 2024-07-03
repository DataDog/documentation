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
    cluster_operate_resource_state: assets/monitors/cluster_operator_resource.json
    topic_operate_resource_state: assets/monitors/topic_operator_resource.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/strimzi/README.md
display_on_public_website: true
draft: false
git_integration_title: strimzi
integration_id: strimzi
integration_title: Strimzi
integration_version: 2.2.1
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
  configuration: README.md#Setup
  description: Strimzi
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Strimzi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

This check monitors [Strimzi][1] through the Datadog Agent.

## セットアップ

### インストール

The Strimzi check is included in the [Datadog Agent][2] package.
No additional installation is needed on your server.

<div class="alert alert-warning">This check uses <a href="https://docs.datadoghq.com/integrations/openmetrics/">OpenMetrics</a>, which requires Python 3.</div>

### 構成

The Strimzi check collects Prometheus-formatted metrics on the following operators:
   - クラスター
   - Topic
   - ユーザー

**Note**: For monitoring Kafka and Zookeeper, please use the [Kafka][3], [Kafka Consumer][4] and [Zookeeper][5] checks respectively.

Follow the instructions below to enable and configure this check for an Agent.

#### ホスト

1. Edit the `strimzi.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Strimzi performance data. See the [sample strimzi.d/conf.yaml][6] for all available configuration options.

2. [Agent を再起動します][7]。

#### コンテナ化

For containerized environments, refer to the [Autodiscovery Integration Templates][8] for guidance on applying these instructions. Here's an example of how to configure this on the different Operator manifests using pod annotations:

##### Cluster Operator:
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
**Note**: The template used for this example can be found [here][9].


##### Topic and User Operators:
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
**Note**: The template used as for this example can be found [here][10].

See the [sample strimzi.d/conf.yaml][6] for all available configuration options.

#### Kafka and Zookeeper

The Kafka and Zookeeper components of Strimzi can be monitored using the [Kafka][3], [Kafka Consumer][4] and [Zookeeper][5] checks. Kafka metrics are collected through JMX. For more information on enabling JMX, see the [Strimzi documentation on JMX options][11]. Here's an example of how to configure the Kafka, Kafka Consumer and Zookeeper checks using Pod annotations:
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
**Note**: The template used for this example can be found [here][10].

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Strimzi logs can be collected from the different Strimzi pods through Kubernetes. Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][12].

[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "strimzi", "service": "<SERVICE_NAME>"}`   |

### 検証

[Run the Agent's status subcommand][13] and look for `strimzi` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "strimzi" >}}


### イベント

The Strimzi integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "strimzi" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Monitoring your container-native technologies][17]


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
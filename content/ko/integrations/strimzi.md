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
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- 쿠버네티스(Kubernetes)
custom_kind: integration
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
  - 제출한 데이터 유형::로그
  - Submitted Data Type::Metrics
  - 제공::통합
  configuration: README.md#Setup
  description: Strimzi
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/container-native-integrations/#messaging-and-streaming-with-strimzi
  support: README.md#Support
  title: Strimzi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog Agent를 통해 [Strimzi][1]를 모니터링합니다.

## 설정

### 설치

Strimzi 점검은 [Datadog Agent][2] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

<div class="alert alert-warning">이 점검은<a href="https://docs.datadoghq.com/integrations/openmetrics/">OpenMetrics</a>를 사용하며 Python 3이 필요합니다.</div>

### 구성

Strimzi 점검은 다음 연산자에 관한 Prometheus 형식의 메트릭을 수집합니다.
   - Cluster
   - Topic
   - 사용자

**참고**: Kafka 및 Zookeeper를 모니터링하려면 각각 [Kafka][3], [Kafka Consumer][4] 및 [Zookeeper][5] 점검을 사용하세요.

다음 지침을 따라 Agent에 이 점검을 활성화하고 구성하세요.

#### 호스트

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더의 `strimzi.d/conf.yaml` 파일을 편집하여 Strimzi 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 strimzi.d/conf.yaml][6]을 참고하세요.

2. [Agent를 다시 시작][7]합니다.

#### 컨테이너화

컨테이너화된 환경에서 이 지침을 적용하려면 [Autodiscovery 통합 템플릿][8]을 참고하세요. 다음 예제는 포드 주석을 사용하여 다양한 Operator 매니페스트에서 이를 구성하는 방법을 보여줍니다.

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
**참고**: 이 예제에 사용된 템플릿은 [여기][9]에서 찾을 수 있습니다.


##### Topic 및 User Operators:
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
**참고**: 이 예제에 사용된 템플릿은 [여기][10]에서 찾을 수 있습니다.

사용 가능한 모든 구성 옵션은 [샘플 strimzi.d/conf.yaml][6]을 참고하세요.

#### Kafka 및 Zookeeper

Strimzi의 Kafka 및 Zookeeper 구성 요소는 [Kafka][3], [Kafka Consumer][4], [Zookeeper][5] 점검을 사용하여 모니터링할 수 있습니다. Kafka 메트릭은 JMX를 통해 수집됩니다. JMX 활성화에 대한 자세한 내용은 [Strimzi의 JMX 옵션 설명서][11]를 참고하세요. 다음은 포드 주석을 사용하여 Kafka, Kafka Consumer, Zookeeper 점검을 구성하는 방법을 보여줍니다.
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
**참고**: 이 예제에 사용된 템플릿은 [여기][10]에서 찾을 수 있습니다.

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Strimzi 로그는 Kubernetes를 통해 여러 Strimzi 포드에서 수집할 수 있습니다. Datadog Agent에는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][12]을 참고하세요.

아래 파라미터를 적용하는 방법은 [Autodiscovery 통합 템플릿][8]을 참고하세요.

| 파라미터      | 값                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "strimzi", "service": "<SERVICE_NAME>"}`   |

### 검증

[Agent 상태 하위 명령을 실행][13]하고 Checks 섹션에서 `strimzi`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "strimzi" >}}


### 이벤트

Strimzi 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "strimzi" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][16]에 문의해 주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [컨테이너 기반 기술 모니터링][17]


[1]: https://strimzi.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/integrations/kafka/
[4]: https://docs.datadoghq.com/ko/integrations/kafka/?tab=host#kafka-consumer-integration
[5]: https://docs.datadoghq.com/ko/integrations/zk/
[6]: https://github.com/DataDog/integrations-core/blob/master/strimzi/datadog_checks/strimzi/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[9]: https://github.com/strimzi/strimzi-kafka-operator/blob/release-0.34.x/install/cluster-operator/060-Deployment-strimzi-cluster-operator.yaml
[10]: https://github.com/strimzi/strimzi-kafka-operator/blob/release-0.34.x/examples/kafka/kafka-ephemeral-single.yaml
[11]: https://strimzi.io/docs/operators/0.20.0/full/using.html#assembly-jmx-options-deployment-configuration-kafka
[12]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[13]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/strimzi/metadata.csv
[15]: https://github.com/DataDog/integrations-core/blob/master/strimzi/assets/service_checks.json
[16]: https://docs.datadoghq.com/ko/help/
[17]: https://www.datadoghq.com/blog/container-native-integrations/#messaging-and-streaming-with-strimzi
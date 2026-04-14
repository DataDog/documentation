---
app_id: elasticsearch
app_uuid: fc23bf70-2992-4e07-96db-c65c167f25d6
assets:
  dashboards:
    elasticsearch: assets/dashboards/overview.json
    elasticsearch_timeboard: assets/dashboards/metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: elasticsearch.search.query.total
      metadata_path: metadata.csv
      prefix: elasticsearch.
    process_signatures:
    - java org.elasticsearch.bootstrap.Elasticsearch
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37
    source_type_name: Elasticsearch
  monitors:
    Average Search Query Latency is High: assets/monitors/elastic_average_search_latency.json
    Current Indexing Load is High: assets/monitors/elastic_indexing_load.json
    Latency is high: assets/monitors/elastic_query_latency_high.json
    Number of pending tasks is high: assets/monitors/elastic_pending_tasks_high.json
    Query load is high: assets/monitors/elastic_query_load_high.json
    Unsuccessful requests rate is high: assets/monitors/elastic_requests.json
  saved_views:
    elasticsearch_processes: assets/saved_views/elasticsearch_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
- tracing
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/elastic/README.md
display_on_public_website: true
draft: false
git_integration_title: elastic
integration_id: elasticsearch
integration_title: Elasticsearch
integration_version: 8.1.0
is_public: true
manifest_version: 2.0.0
name: elastic
public_title: Elasticsearch
short_description: 전체 클러스터 상태부터 JVM 힙 사용량 및 그 사이의 모든 것을 모니터링하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Log Collection
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Submitted Data Type::Events
  - Offering::Integration
  configuration: README.md#Setup
  description: 전체 클러스터 상태부터 JVM 힙 사용량 및 그 사이의 모든 것을 모니터링하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics
  support: README.md#Support
  title: Elasticsearch
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Elasticsearch dashboard][1]

## 개요

Elasticsearch 클러스터의 전반적인 상태부터 JVM 힙 사용량 및 그 사이의 모든 것에 이르기까지 최신 상태를 유지하세요. 복제본을 재생하거나, 클러스터에 용량을 추가하거나, 설정을 조정해야 할 때 알림을 받고 클러스터 메트릭이 어떻게 반응하는지 추적할 수 있습니다.

Datadog Agent의 Elasticsearch 검사는 검색 및 인덱싱 성능, 메모리 사용량 및 가비지 수집, 노드 가용성, 샤드 통계, 디스크 공간 및 성능, 보류 중인 작업 등에 대한 메트릭을 수집합니다. 또한 Agent는 클러스터의 전반적인 상태에 대한 이벤트 및 서비스 점검을 보냅니다.

## 설정

### 설치

Elasticsearch 검사는 [Datadog Agent][2] 패키지에 포함되어 있어 추가 설치가 필요하지 않습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [Agent 구성 디렉터리][1]의 루트에 있는 `conf.d/` 폴더에서 `elastic.d/conf.yaml` 파일을 편집하여 Elasticsearch [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 elastic.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL where Elasticsearch accepts HTTP requests. This is used to
     ## fetch statistics from the nodes and information about the cluster health.
     #
     - url: http://localhost:9200
   ```

    **참고**:

      - 호스팅된 Elasticsearch를 사용하는 등 클러스터 외부에서 실행되는 하나의 Datadog Agent에서만 Elasticsearch 메트릭을 수집하는 경우 `cluster_stats`를 `true`로 설정합니다.
      - [Agent 수준 태그][3]는 Agent를 실행하지 않는 클러스터의 호스트에는 적용되지 않습니다. **모든** 메트릭에 일관된 태그가 있는지 확인하려면 `<integration>.d/conf.yaml`에서 통합 수준 태그를 사용하세요. 예를 들어:

        ```yaml
        init_config:
        instances:
          - url: "%%env_MONITOR_ES_HOST%%"
            username: "%%env_MONITOR_ES_USER%%"
            password: *********
            auth_type: basic
            cluster_stats: true
            tags:
            - service.name:elasticsearch
            - env:%%env_DD_ENV%%
        ```

      - AWS Elasticsearch 서비스에 대한 Agent의 Elasticsearch 통합을 사용하려면 AWS Elasticsearch 통계 URL을 가리키도록 `url` 파라미터를 설정합니다.
      - Amazon ES 구성 API에 대한 모든 요청은 서명해야 합니다. 자세한 내용은 [OpenSearch 서비스 요청 만들기 및 서명][4]을 참조하세요.
      - `aws` 인증 유형은 [boto3][5]를 사용하여 `.aws/credentials`에서 AWS 크리덴셜을 자동으로 수집합니다. `conf.yaml`에서 `auth_type: basic`를 사용하고 `username: <USERNAME>` 및 `password: <PASSWORD>`으로 크리덴셜을 정의합니다.
      - Elasticsearch에서 모니터링할 적절한 권한이 있는 사용자와 역할(아직 없는 경우)을 생성해야 합니다. 이는 Elasticsearch에서 제공하는 REST API 또는 Kibana UI를 통해 수행할 수 있습니다.
      - If you have enabled security features in Elasticsearch, you can use `monitor` or `manage` privilege while using the API to make the calls to the Elasticsearch indices.
      - 생성된 역할에 다음 속성을 포함합니다.
        ```json
        name = "datadog"
        indices {
          names = [".monitoring-*", "metricbeat-*"]
          privileges = ["read", "read_cross_cluster", "monitor"]
        }
        cluster = ["monitor"]
        ```
        사용자에게 역할을 추가합니다.
        ```json
        roles = [<created role>, "monitoring_user"]
        ```
        자세한 내용은 [역할 생성 또는 업데이트][6] 및 [사용자 생성 또는 업데이트][7]를 참조하세요.


2. [Agent를 재시작합니다][8].

###### 커스텀 쿼리

The Elasticsearch integration allows you to collect custom metrics through custom queries by using the `custom_queries` configuration option.

**Note:** When running custom queries, use a read only account to ensure that the Elasticsearch instance does not change.

```yaml
custom_queries:
 - endpoint: /_search
   data_path: aggregations.genres.buckets
   payload:
     aggs:
       genres:
         terms:
           field: "id"
   columns:
   - value_path: key
     name: id
     type: tag
   - value_path: doc_count
     name: elasticsearch.doc_count
   tags:
   - custom_tag:1
```
커스텀 쿼리는 `GET` 요청으로 전송됩니다. 선택적 `payload` 파라미터를 사용하면 요청이 `POST` 요청으로 전송됩니다.

`value_path`는 문자열 키일 수도 있고 목록 인덱스일 수도 있습니다. 예:
```json
{
  "foo": {
    "bar": [
      "result0",
      "result1"
    ]
  }
}
```

`value_path: foo.bar.1`는 `result1` 값을 반환합니다.

##### 트레이스 수집

Datadog APM은 Elasticsearch와 통합되어 분산 시스템 전체의 트레이스를 확인합니다. Datadog Agent v6+에서는 트레이스 수집이 기본적으로 활성화되어 있습니다. 트레이스 수집을 시작하려면 다음 안내를 따르세요.

1. [Datadog에서 트레이스 수집을 활성화합니다][9].
2. [Instrument your application that makes requests to Elasticsearch][10].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. 다음을 사용하여 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 검색 느린 로그를 수집하고 느린 로그를 인덱싱하려면 [Elasticsearch 설정을 구성][11]하세요. 기본적으로 느린 로그는 활성화되어 있지 않습니다.

   - 특정 인덱스 `<INDEX>`에 대한 인덱스 느린 로그를 구성하려면 다음을 수행합니다.

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.indexing.slowlog.threshold.index.warn": "0ms",
       "index.indexing.slowlog.threshold.index.info": "0ms",
       "index.indexing.slowlog.threshold.index.debug": "0ms",
       "index.indexing.slowlog.threshold.index.trace": "0ms",
       "index.indexing.slowlog.level": "trace",
       "index.indexing.slowlog.source": "1000"
     }'
     ```

   - 특정 인덱스 `<INDEX>`에 대한 검색 느린 로그를 구성하려면 다음을 수행합니다.

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.search.slowlog.threshold.query.warn": "0ms",
       "index.search.slowlog.threshold.query.info": "0ms",
       "index.search.slowlog.threshold.query.debug": "0ms",
       "index.search.slowlog.threshold.query.trace": "0ms",
       "index.search.slowlog.threshold.fetch.warn": "0ms",
       "index.search.slowlog.threshold.fetch.info": "0ms",
       "index.search.slowlog.threshold.fetch.debug": "0ms",
       "index.search.slowlog.threshold.fetch.trace": "0ms"
     }'
     ```

3. Elasticsearch 로그 수집을 시작하려면 `elastic.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/elasticsearch/*.log
       source: elasticsearch
       service: "<SERVICE_NAME>"
   ```

   - 느린 로그 수집을 시작하려면 추가 인스턴스를 추가하세요.

     ```yaml
     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_indexing_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"

     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_search_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"
     ```

     `path`와 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다.

4. [Agent를 재시작합니다][8].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#file-location
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html#managedomains-signing-service-requests
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[6]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role.html
[7]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-user.html
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/tracing/send_traces/
[10]: https://docs.datadoghq.com/ko/tracing/setup/
[11]: https://docs.datadoghq.com/ko/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
{{% /tab %}}
{{% tab "도커" %}}

#### Docker

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```yaml
LABEL "com.datadoghq.ad.check_names"='["elastic"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "http://%%host%%:9200"}]'
```

##### 로그 수집


기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집][2]을 참고하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"elasticsearch","service":"<SERVICE_NAME>"}]'
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 구성의 전체 목록은 [Kubernetes 애플리케이션 추적][4] 및 [Kubernetes 데몬 설정][5]을 참조하세요.

그런 다음 [애플리케이션 컨테이너를 계측][6]하고 `DD_AGENT_HOST`를 Agent 컨테이너의 이름으로 설정합니다.


[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### 쿠버네티스(Kubernetes)

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

[자동탐지 통합 템플릿][1]을 애플리케이션 컨테이너의 포드 주석으로 설정합니다. 이외 템플릿은 또한 [파일, configmap, key-value store][2]로 설정할 수 있습니다.

**주석 v1**(Datadog 에이전트 v7.36 이하용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.check_names: '["elastic"]'
    ad.datadoghq.com/elasticsearch.init_configs: '[{}]'
    ad.datadoghq.com/elasticsearch.instances: |
      [
        {
          "url": "http://%%host%%:9200"
        }
      ]
spec:
  containers:
    - name: elasticsearch
```

**주석 v2**(Datadog 에이전트 v7.36 이상용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.checks: |
      {
        "elastic": {
          "init_config": {},
          "instances": [
            {
              "url": "http://%%host%%:9200"
            }
          ]
        }
      }
spec:
  containers:
    - name: elasticsearch
```

##### 로그 수집


Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][3]을 참조하세요.

그런 다음 [로그 통합][4]을 포드 주석으로 설정합니다. 또한 [파일, configmap, 또는 key-value store][5]로 설정할 수 있습니다.

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.logs: '[{"source":"elasticsearch","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: elasticsearch
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+를 실행하는 호스트에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 구성의 전체 목록은 [Kubernetes 애플리케이션 추적][6] 및 [Kubernetes 데몬 설정][7]을 참조하세요.

그런 다음 [애플리케이션 컨테이너를 계측][8]하고 `DD_AGENT_HOST`를 Agent 컨테이너의 이름으로 설정합니다.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"elastic\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"http://%%host%%:9200\"}]"
    }
  }]
}
```

##### 로그 수집


기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][2]을 참조하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"elasticsearch\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 구성의 전체 목록은 [Kubernetes 애플리케이션 추적][4] 및 [Kubernetes 데몬 설정][5]을 참조하세요.

그런 다음 [애플리케이션 컨테이너를 계측][6]하고 `DD_AGENT_HOST`를 [EC2 개인 IP 주소][7]로 설정합니다.


[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/ko/tracing/setup/
[7]: https://docs.datadoghq.com/ko/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고][3] Checks 섹션에서 `elastic`을 찾으세요.

## 수집한 데이터

기본적으로 Agent는 다음 메트릭 중 일부를 전송하지 않습니다. 모든 메트릭을 보내려면 `elastic.yaml`에서 위와 같이 플래그를 구성하세요.

- `pshard_stats`는 **elasticsearch.primaries.\*** 및 **elasticsearch.indices.count** 메트릭을 전송합니다.
- `index_stats`는 **elasticsearch.index.\*** 메트릭을 전송합니다.
- `pending_task_stats`는 **elasticsearch.pending\_\*** 메트릭을 전송합니다.
- `slm_stats`는 **elasticsearch.slm.\*** 메트릭을 전송합니다.

### 메트릭
{{< get-metrics-from-git "elasticsearch" >}}


### 이벤트

Elasticsearch 검사는 Elasticsearch 클러스터의 전체 상태가 빨간색, 노란색 또는 녹색으로 변경될 때마다 Datadog에 이벤트를 내보냅니다.

### 서비스 점검
{{< get-service-checks-from-git "elasticsearch" >}}


## 트러블슈팅

- [Agent가 연결되지 않습니다][4]
- [Elasticsearch가 모든 메트릭을 전송하지 않는 이유는 무엇인가요?][5]

## 참고 자료

- [Elasticsearch 성능 모니터링 방법][6]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/integrations/faq/elastic-agent-can-t-connect/
[5]: https://docs.datadoghq.com/ko/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[6]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics

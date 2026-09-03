---
app_id: redis-cloud
app_uuid: 0b59b80e-db72-44a6-8c2b-67475d10ad71
assets:
  dashboards:
    redis-cloud-active-active: assets/dashboards/redis_cloud_active-active.json
    redis-cloud-database: assets/dashboards/redis_cloud_database.json
    redis-cloud-networking: assets/dashboards/redis_cloud_networking.json
    redis-cloud-overview: assets/dashboards/redis_cloud_overview.json
    redis-cloud-proxy: assets/dashboards/redis_cloud_proxy.json
    redis-cloud-proxy-threads: assets/dashboards/redis_cloud_proxy-threads.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rdsc.bdb_conns
      metadata_path: metadata.csv
      prefix: rdsc
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7769531
    source_type_name: Redis Cloud
  logs: {}
author:
  homepage: https://redis.com/cloud/overview/
  name: Redis, Inc.
  sales_email: press@redis.com
  support_email: support@redis.com
categories:
- ai/ml
- 캐싱
- 데이터 저장소
- 클라우드
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: redis_cloud
integration_id: redis-cloud
integration_title: Redis Cloud
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: redis_cloud
public_title: Redis Cloud
short_description: Redis Cloud 통합
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Category::Caching
  - Category::Data Stores
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Redis Cloud 통합
  media:
  - caption: Redis Cloud  개요 표시
    image_url: images/datadog-cloud-overview-dashboard.png
    media_type: 이미지
  - caption: Redis Cloud 클러스터 세부 사항
    image_url: images/datadog-cloud-cluster-database.png
    media_type: 이미지
  - caption: Redis Cloud 노드 세부 사항
    image_url: images/datadog-cloud-node-dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Redis Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Redis는 문자열, 해시, 목록, 집합, 스트림 등 다양한 데이터 구조를 지원하는 빠른 범용 데이터 저장소입니다. Redis의 특징은 프로그래밍 가능성, 확장성, 영속성, 클러스터링, 고가용성입니다. 커뮤니티 에디션에는 벡터 검색, 확률적 데이터 구조, JSON 지원, 전체 텍스트 검색 등의 추가 데이터 모델과 기능이 추가되었습니다.

[Redis Cloud][1] 통합은 Redis 소프트웨어의 Redis Cloud 배포와 함께 사용하도록 설계되었습니다. Redis Enterprise 설치에는 사용할 수 없습니다. [Redis Enterprise][2]에 관한 정보는 [Datadog Redis Enterprise 통합][3]을 참조하세요.

본 통합으로 Datadog Agent를 사용하여 세 가지 중요 클러스터 컴포넌트인 데이터베이스, 노드, 샤드에 대한 메트릭을 제공해 드립니다. 데이터베이스 처리량, 메모리 사용률, CPU 사용량, 연결 카운트, 복제 상태, Datadog 내의 다양한 추가 메트릭을 모니터할 수 있습니다. 해당 정보를 사용하여 Redis Cloud 클러스터의 전반적인 상태를 파악하고, 애플리케이션 성능 문제를 진단하고, 다운타임을 방지할 수 있습니다.

지원하는 전체 메트릭 목록은 하단의 **Metrics** 섹션을 참조하세요.

## 설정

### 설치

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.
- Datadog Agent v6:
   ```shell
   datadog-agent integration install -t datadog-redis_cloud==1.1.0
   ```
- Datadog Agent v7:
   ```shell
   agent integration install -t datadog-redis_cloud==1.1.0
   ```

2. `openmetrics_endpoint`를 클러스터 마스터 노드로 설정하여 통합을 구성합니다. 자세한 내용은 [통합 시작하기][4]를 참조하세요.
3. Agent를 [재시작][5]합니다. 


### 설정

`openmetrics_endpoint`가 클러스터를 포인팅하도록 설정합니다. [예시][4]를 참조하세요. `tls_verify`를 false로 설정합니다.

예시 구성 파일에 명시된 대로 `extra_metrics`, `excluded_metrics`의 두 가지 옵션 파라미터가 있습니다.

extra_metrics 파라미터는 메트릭 그룹 목록을 받습니다. 다음 그룹을 사용할 수 있습니다. RDSC.REPLICATION,  
RDSC.NODE, RDSC.BIGSTORE, RDSC.FLASH,  RDSC.SHARDREPL. 기본 메트릭 그룹 RDSC.DATABASE, 
RDSC.PROXY, RDSC.LISTENER, RDSC.SHARD는 통합에 자동 삽입됩니다.

`exclude_metrics` 파라미터는 제외할 개별 메트릭 목록을 가져옵니다. 이는 해당 정보가 
Datadog으로 전달되지 않는다는 것을 의미합니다. 개별 메트릭의 접두사를 제거해야 합니다. 즉, 'rdsc.bdb_up'은  
'bdb_up'이 됩니다. 전체 메트릭 목록은 통합 페이지의 'Data Collected' 탭과 [Metrics](#metrics) 섹션에서 사용할 수 있습니다.
다음 추가 그룹은 관련 접두사를 사용하여 Data Collected 페이지에서 
개별 메트릭을 검색하는 데 사용할 수 있습니다.

| 그룹            | 접두사                    | 참고                                                 |
|------------------|---------------------------|-------------------------------------------------------|
| RDSC.NODE        | rdsc.node_                | 이렇게 하면 Bigstore 및 Flash 메트릭도 반환됩니다.  |
| RDSC.DATABASE    | rdsc.bdb_                 | 이렇게 하면 복제 메트릭도 반환됩니다.         |
| RDSC.SHARD       | rdsc.redis_               | 이렇게 하면 샤드 복제 메트릭도 반환됩니다.   |
| RDSC.REPLICATION | rdsc.bdb_crdt_            |                                                       |
| RDSC.REPLICATION | rdsc.bdb_replicaof_       |                                                       |
| RDSC.SHARDREPL   | rdsc.redis_crdt_          |                                                       |
| RDSC.PROXY       | rdsc.dmcproxy_            |                                                       |
| RDSC.LISTENER    | rdsc.listener_            |                                                       |
| RDSC.BIGSTORE    | rdsc.node_bigstore_       |                                                       |
| RDSC.FLASH       | rdsc.node_available_flash | 모든 Flash 메트릭의 형식은 rdsc.node_*_flash입니다. |


### 검증

1. 특히 클라우드 환경에서 해당 머신에 핑할 수 있는지 확인하세요. `wget --no-check-certificate <endpoint>` 또는 `curl -k <endpoint>`를 실행하여 메트릭을 수신할 수 있는지 확인합니다.

2. Datadog Agent의 [상태][6]를 확인합니다.


## 수집한 데이터

Redis Cloud 통합은 데이터베이스, 노드, 샤드의 모든 메트릭을 수집합니다.


### 메트릭
{{< get-metrics-from-git "redis_cloud" >}}



### 서비스 점검

Redis Cloud 통합은 서비스 점검을 포함하지 않습니다.


### 이벤트

Redis Cloud 통합은 이벤트를 포함하지 않습니다.


## 트러블슈팅

도움이 필요하신가요? [Redis Field Engineering][8]에 문의하세요.

[1]: https://redis.io/docs/latest/operate/rc/
[2]: https://redis.io/docs/latest/operate/rs/
[3]: https://app.datadoghq.com/integrations?integrationId=redis-enterprise
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/redis_cloud/metadata.csv
[8]: mailto:support@redis.com
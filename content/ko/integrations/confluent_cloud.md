---
app_id: confluent-cloud
app_uuid: 406c781b-842d-4e0c-84dc-4b13b8e93fb6
assets:
  dashboards:
    confluent-cloud: assets/dashboards/confluent_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - confluent_cloud.kafka.received_bytes
      - confluent_cloud.connect.sent_records
      - confluent_cloud.ksql.streaming_unit_count
      - confluent_cloud.schema_registry.schema_count
      metadata_path: metadata.csv
      prefix: confluent_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 609
    source_type_name: Confluent Cloud
  monitors:
    '[Confluent Cloud] Mirror topic lag is increasing': assets/monitors/cluster_link_lag_rate_change_percent.json
    '[Confluent Cloud] Topic lag is Increasing': assets/monitors/consumer_lag_monitor_rate_change_percent.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
- 메시지 큐
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud
integration_id: confluent-cloud
integration_title: Confluent Cloud
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: confluent_cloud
public_title: Confluent Cloud
short_description: Confluent Cloud에서 다양한 Kafka 메트릭을 수집하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::메트릭
  - 카테고리::메시지 큐
  configuration: README.md#Setup
  description: Confluent Cloud에서 다양한 Kafka 메트릭을 수집하세요.
  media:
  - caption: Confluent Cloud 대시보드 개요
    image_url: images/confluent_dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Confluent Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요


{{< site-region region="gov" >}}
**Confluent Cloud 통합은 Datadog {{< region-param key="dd_site_name" >}} 사이트에서 지원되지 않습니다**.
{{< /site-region >}}


Confluent Cloud는 완전 관리형 클라우드 호스팅 스트리밍 데이터 서비스입니다. Datadog과 Confluent Cloud를 연결하여 Confluent Cloud 리소스의 주요 메트릭을 시각화하고 알림를 생성합니다.

Datadog의 즉시 사용 가능한 Confluent Cloud 대시보드는 활성 연결의 변화율, 평균 소비된 레코드와 생산된 레코드의 비율과 같은 정보를 포함하여 환경의 상태와 성능을 모니터링하기 위한 주요 클러스터 메트릭을 보여줍니다.

권장 모니터를 사용하여 토픽 랙(topic lag)이 너무 높아지면 팀에 알리거나 이러한 메트릭을 사용하여 직접 만들 수 있습니다.

스트리밍 데이터 파이프라인의 토폴로지를 시각화하거나 데이터 스트림 설정에서 로컬 병목 현상을 조사하는 것이 유용한 경우 [Data Streams Monitoring][1]을 참조하세요.

## 설정

### 설치

[Datadog Confluent Cloud 통합 타일][2]을 사용하여 통합을 설치합니다.

### 구성

1. 통합 타일에서 **Configuration** 탭으로 이동합니다.
2. **+ Add API Key**를 클릭하여 [Confluent Cloud API Key 및 API Secret](#api-key-and-secret)을 입력합니다.
3. **Save**를 클릭합니다. Datadog은 해당 크리덴셜과 연결된 계정을 검색합니다.
4. Confluent Cloud [Cluster ID](#cluster-id) 또는 [Connector ID](#connector-id)를 추가합니다. Datadog은 Confluent Cloud 메트릭을 크롤링하고 몇 분 내에 메트릭을 로드합니다.

#### API Key 및 Secret

Confluent Cloud API 키와 Secret을 생성하려면 [UI에서 새 서비스 계정에 MetricsViewer 역할 추가][3]를 참조하세요.

#### Cluster ID

Confluent Cloud Cluster ID 찾는 방법:

1. Confluent Cloud에서 **Environment Overview**로 이동한 다음 모니터링하려는 클러스터를 선택합니다.  
2. 왼쪽 탐색에서 **Cluster overview** > **Cluster settings**를 클릭합니다.
3. **Identification**에서 `lkc`로 시작하는 Cluster ID를 복사합니다.

#### Connector ID

Confluent Cloud Connector ID 찾는 방법:

1. Confluent Cloud에서 **Environment Overview**로 이동한 다음 모니터링하려는 클러스터를 선택합니다.  
2. 왼쪽 탐색에서 **Data integration** > **Connectors**를 클릭합니다.
3. **Connectors**에서 `lcc`로 시작하는 Connector ID를 복사합니다.

## 대시보드

통합 구성 후 Kafka 클러스터 및 커넥터 메트릭에 대한 개요를 보려면 즉시 사용 가능한 Confluent Cloud 대시보드를 참조하세요.

기본적으로 Confluent Cloud에서 수집된 모든 메트릭이 표시됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "confluent_cloud" >}}


### 이벤트

Confluent Cloud 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Confluent Cloud 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

- [Terraform으로 Confluent 계정 생성 및 관리][6]
- [Terraform으로 Confluent 리소스 생성 및 관리][7]

[1]: https://www.datadoghq.com/product/data-streams-monitoring/
[2]: https://app.datadoghq.com/integrations/confluent-cloud
[3]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource
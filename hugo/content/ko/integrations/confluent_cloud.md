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
    Connector incoming throughput dropped to 0: assets/monitors/connector_no_input_data.json
    Connector outgoing throughput dropped to 0: assets/monitors/connector_no_output_data.json
    Kafka Consumer lag is increasing: assets/monitors/consumer_lag_monitor_rate_change_percent.json
    Mirror Kafka Consumer lag is increasing: assets/monitors/cluster_link_lag_rate_change_percent.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 비용 관리
- 메트릭
- 메시지 큐
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud
integration_id: confluent-cloud
integration_title: Confluent Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: confluent_cloud
public_title: Confluent Cloud
short_description: Confluent Cloud에서 다양한 Kafka 메트릭 및 관련 비용 데이터를 수집합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Category::Metrics
  - Category::Message Queues
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Setup
  description: Confluent Cloud에서 다양한 Kafka 메트릭 및 관련 비용 데이터를 수집합니다.
  media:
  - caption: Confluent Cloud 대시보드 개요
    image_url: images/confluent_dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/confluent-cloud-monitoring-datadog/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
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

## 설정

### 설치

[Datadog Confluent Cloud 통합 타일][1]을 사용하여 통합을 설치합니다.

### 설정

1. Confluent Cloudd에서 **+ Add API Key**를 클릭하여 [Confluent Cloud API Key 및 API Secret](#api-key-and-secret)을 입력합니다.
   - **클라우드 리소스 관리** API 키와 시크릿을 생성합니다.
   - **Save**를 클릭합니다. Datadog은 해당 크리덴셜과 연결된 계정을 검색합니다.
   - Datadog 통합 설정에서 **API 키 및 API 시크릿** 필드에 API 키와 시크릿을 추가합니다.
2. Confluent Cloud [Cluster ID](#cluster-id) 또는 [Connector ID](#connector-id)를 추가합니다. Datadog은 Confluent Cloud 메트릭을 크롤링하고 몇 분 내에 메트릭을 로드합니다.
3. 다음에 따라 Confluent Cloud(옵션)에 정의된 태그를 수집합니다.
   - **Schema Registry** API 키 및 시크릿을 생성합니다. [Confluent Cloud의 스키마 관리][2]에 대해 자세히 알아보세요.
   - **저장**을 클릭합니다. Datadog은 Confluent Cloud에 정의된 태그를 수집합니다.
   - Datadog 통합 설정에서 **Schema Registry API 키 및 시크릿** 필드에 API 키와 시크릿을 추가합니다.
4. 클라우드 비용 관리(Cloud Cost Management)를 사용하고 비용 데이터 수집을 활성화한 경우
   - API 키에 [BillingAdmin 역할][3]이 활성화되어 있는지 확인합니다.
   - 24시간 내에 [클라우드 비용 관리(Cloud Cost Management)][4]에서 확인할 수 있습니다. ([수집된 데이터][5])

설정 리소스(예: 클러스터 및 커넥터)에 대한 자세한 내용은 [Confluent Cloud 통합 설명서][6]를 참조하세요.

#### API Key 및 Secret

Confluent Cloud API 키와 Secret을 생성하려면 [UI에서 새 서비스 계정에 MetricsViewer 역할 추가][7]를 참조하세요.

#### Cluster ID

Confluent Cloud Cluster ID 찾는 방법:

1. Confluent Cloud에서 **Environment Overview**로 이동한 다음 모니터링하려는 클러스터를 선택합니다.  
2. 왼쪽 탐색에서 **Cluster overview** > **Cluster settings**를 클릭합니다.
3. **식별(Identification)**에서 `lkc`로 시작하는 Cluster ID를 복사합니다.

#### Connector ID

다음에 따라 Confluent Cloud Connector ID를 찾습니다.

1. Confluent Cloud에서 **Environment Overview**로 이동한 다음 모니터링하려는 클러스터를 선택합니다.  
2. 왼쪽 탐색에서 **Data integration** > **Connectors**를 클릭합니다.
3. **커넥터(Connectors)**에서 `lcc`로 시작하는 Connector ID를 복사합니다.

## 대시보드

통합 구성 후 Kafka 클러스터 및 커넥터 메트릭에 대한 개요를 보려면 즉시 사용 가능한 Confluent Cloud 대시보드를 참조하세요.

기본적으로 Confluent Cloud에서 수집한 모든 메트릭이 표시됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "confluent-cloud" >}}


### 이벤트

Confluent Cloud 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Confluent Cloud 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

- [Terraform으로 Confluent 계정 생성 및 관리][10]
- [Terraform으로 Confluent 리소스 생성 및 관리][11]

[1]: https://app.datadoghq.com/integrations/confluent-cloud
[2]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud
[3]: https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[4]: https://app.datadoghq.com/cost
[5]: https://docs.datadoghq.com/ko/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected
[6]: https://docs.datadoghq.com/ko/integrations/confluent_cloud/
[7]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource
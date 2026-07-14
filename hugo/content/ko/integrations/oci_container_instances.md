---
app_id: oci-container-instances
app_uuid: 3ed1e6b8-a260-4b8d-9d1d-e180ed388776
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.computecontainerinstance.container_cpu_used
      - oci.computecontainerinstance.container_ephemeral_storage_used
      - oci.computecontainerinstance.container_memory_used
      - oci.computecontainerinstance.cpu_used
      - oci.computecontainerinstance.cpu_utilization
      - oci.computecontainerinstance.ephemeral_storage_used
      - oci.computecontainerinstance.memory_used
      - oci.computecontainerinstance.memory_utilization
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37146647
    source_type_name: OCI Container Instances
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- oracle
- 메트릭
- 컨테이너
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_container_instances
integration_id: oci-container-instances
integration_title: OCI Container Instances
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_container_instances
public_title: OCI Container Instances
short_description: OCI Container Instances는 인프라 관리가 필요 없는 서버리스 컨테이너 환경을 제공합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Container Instances는 인프라 관리가 필요 없는 서버리스 컨테이너 환경을 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Container Instances
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Oracle Cloud Infrastructure(OCI) Container Instances는 서버를 관리하지 않고도 컨테이너를 즉시 실행할 수 있는 서버리스 컴퓨팅 서비스입니다.

이 통합은 [oci_computecontainerinstance][1] 네임스페이스에서 메트릭과 태그를 수집하여 Oracle Cloud Infrastructure 컨테이너 인스턴스의 상태, 용량, 성능을 모니터링하고 알림을 보내는 데 도움이 됩니다.

## 설정

### 설치

OCI Container Instances 메트릭은 현재 **Preview** 단계이며 정식 출시 전까지는 요금이 청구되지 않습니다.

[Oracle Cloud Infrastructure][2] 통합을 설정한 후 위에 언급된 모든 네임스페이스가 [Connector Hub][3]에 포함되어 있는지 확인하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oci_container_instances" >}}


### 서비스 점검

OCI Container Instances는 서비스 점검을 포함하지 않습니다.

### 이벤트

OCI Container Instances는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.oracle.com/en-us/iaas/Content/container-instances/container-instance-metrics.htm
[2]: https://docs.datadoghq.com/ko/integrations/oracle_cloud_infrastructure
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_container_instances/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/
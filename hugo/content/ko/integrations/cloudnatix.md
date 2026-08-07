---
app_id: cloudnatix
app_uuid: caebfbe2-48ba-443f-b2c6-bd80122b2605
assets:
  dashboards:
    cloudnatix_overview: assets/dashboards/cloudnatix_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    metrics:
      check:
      - cloudnatix.vpa
      - cloudnatix.vpa.recommendation
      - cloudnatix.workload.resource
      - cloudnatix.workload.monthly_spend
      - cloudnatix.workload.monthly_projected_saving
      - cloudnatix.pod_evition_by_vpa
      - cloudnatix.compute.daily_spend
      metadata_path: metadata.csv
      prefix: cloudnatix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10367
    source_type_name: CloudNatix
author:
  homepage: https://cloudnatix.com/
  name: CloudNatix
  sales_email: sales@cloudnatix.com
  support_email: support@cloudnatix.com
categories:
- cloud
- aws
- azure
- google cloud
- 쿠버네티스(Kubernetes)
- 메트릭
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudnatix/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudnatix
integration_id: cloudnatix
integration_title: CloudNatix
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cloudnatix
pricing: []
public_title: CloudNatix
short_description: CloudNatix는 자동화된 용량, 비용 및 운영 최적화를 제공합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Category::AWS
  - Category::Azure
  - Category::Google Cloud
  - Category::Kubernetes
  - 카테고리::메트릭
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  - Offering::Integration
  configuration: README.md#Setup
  description: CloudNatix는 자동화된 용량, 비용 및 운영 최적화를 제공합니다.
  media:
  - caption: 클러스터 지출, 사용량 및 비용 최적화에 대한 인사이트를 제공하는 CloudNatix Datadog 대시보드입니다.
    image_url: images/cloudnatix-dashboard.png
    media_type: image
  - caption: 워크로드당 예상 가능한 절감액을 시각화하세요
    image_url: images/cloudnatix-projected-saving.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/infrastructure-optimization-rightsizing-cloudnatix-datadog/
  support: README.md#Support
  title: CloudNatix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 검사는 [CloudNatix][1]의 데이터를 제공합니다.

CloudNatix는 여러 VM 기반 및 Kubernetes 클러스터에 연결하여 특허 출원 중인 Autopilot 기술을 통해 자동화된 용량, 비용 및 운영 최적화를 지원합니다. CloudNatix Insights는 DevOps 팀에 잠재적인 용량 및 가용성 문제에 대한 사전 가시성을 제공합니다.

CloudNatix 통합은 즉시 사용 가능한 대시보드를 통해 Datadog에 비용 및 운영 최적화 인사이트를 제공하므로 클러스터 비용을 빠르게 확인하고 비용 절감 기회를 분석할 수 있습니다.

## 설정

### 설치

클러스터에 CloudNatix 검사를 설치하려면 다음 안내를 따르세요.

1. CloudNatix 통합 검사가 설치된 Datadog  Agent의 Docker 이미지를 빌드합니다. 자세한 내용은 [커뮤니티 통합 사용][2]을 참조하세요.
2. 빌드된 Docker 이미지가 있는 Kubernetes 클러스터에 [Datadog Agent를 설치][3]합니다.
3. Kubernetes 클러스터에 [CloudNatix를 설치][4]합니다. CloudNatix Cluster Agent는
   Datadog 통합과 함께 작동하도록 자동으로 구성됩니다.

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `cloudnatix`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cloudnatix" >}}


### 서비스 점검

CloudNatix는 서비스 점검을 포함하지 않습니다.

### 이벤트

CloudNatix는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [CloudNatix 지원팀][7]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [CloudNatix 및 Datadog을 사용하여 인프라스트럭처 최적화][8]

[1]: https://cloudnatix.com/
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=docker
[3]: https://app.datadoghq.com/account/settings#agent/kubernetes
[4]: https://docs.cloudnatix.com/docs/tutorial
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/cloudnatix/metadata.csv
[7]: mailto:support@cloudnatix.com
[8]: https://www.datadoghq.com/blog/infrastructure-optimization-rightsizing-cloudnatix-datadog/
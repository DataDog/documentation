---
app_id: azure-arc
app_uuid: 0afa2450-f495-4e18-bdd7-c1cd43e3aebf
assets:
  dashboards:
    azure_arc: assets/dashboards/azure_arc.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.arc_vm.count
      metadata_path: metadata.csv
      prefix: azure.arc_
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 801
    source_type_name: Azure Arc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- azure
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_arc
integration_id: azure-arc
integration_title: Azure Arc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_arc
public_title: Azure Arc
short_description: 주요 Azure Arc 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 Azure Arc 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/azure-arc-integration/
  support: README.md#Support
  title: Azure Arc
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Arc는 데이터 센터, 에지 및 멀티 클라우드 환경에서 유연하게 실행할 수 있는 애플리케이션 및 서비스를 빌드할 수 있도록 Azure 플랫폼을 확장하는 브리지입니다.

Azure Arc를 통해 다음을 수행할 수 있습니다.

- Azure Arc Server 및 Kubernetes 클러스터에 대한 연결 상태, 태그 및 기타 세부 정보를 수집합니다.
- Datadog Agent로도 모니터링되는 Arc 관리형 서버의 경우 Azure Arc 태그를 Datadog의 호스트와 관련 메트릭 및 로그에 전파합니다.
- AWS 또는 GCP 통합을 통해서도 모니터링되는 Arc 관리형 서버의 경우 Azure Arc 태그를 Datadog의 호스트와 관련 클라우드 메트릭 및 로그에 전파합니다.
- Azure Arc를 위한 기본 대시보드에서 위 데이터에 대한 즉각적인 인사이트와 요약을 얻을 수 있습니다.

Datadog 확장을 사용하여 Datadog Agent를 구성하고 Arc 서버에 배포할 수도 있습니다. 이 옵션에 대한 자세한 내용은 [Datadog VM 확장][1] 페이지를 참조하세요.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][2]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-arc" >}}


### 이벤트

Azure Arc 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Azure Arc 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

[Monitor your Azure Arc hybrid infrastructure with Datadog][5]

[1]: https://docs.datadoghq.com/ko/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/ko/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/azure-arc-integration/
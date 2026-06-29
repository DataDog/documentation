---
app_id: pivotal-pks
app_uuid: e8a08b96-bbca-4907-8cc8-b7c3abf2f443
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10034
    source_type_name: Pivotal PKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- Kubernetes
- 로그 수집
- 네트워크
- 오케스트레이션
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_on_public_website: true
draft: false
git_integration_title: pivotal_pks
integration_id: pivotal-pks
integration_title: Pivotal Container Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pivotal_pks
public_title: Pivotal Container Service
short_description: Pivotal의 엔터프라이즈급 쿠버네티스(Kubernetes) 제품
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Pivotal의 엔터프라이즈급 쿠버네티스(Kubernetes) 제품
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pivotal Container Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 통합은 [Pivotal Container Service][1] 클러스터를 모니터링합니다.

## 설정

Datadog는 이미 쿠버네티스(Kubernetes)와 통합되어 있으므로 PKS(Pivotal Kubernetes Service)를 모니터링할 준비가 되었습니다. 이 통합과 함께 Datadog [클러스터 모니터링 타일][2]을 사용하여 클러스터를 모니터링하세요.

PKS 환경의 각 비워커 VM에 Datadog 에이전트를 설치합니다. PAS(Pivotal Application Service)가 설치되지 않은 환경에서 타일의 `Resource Config` 섹션을 선택하고 `datadog-firehose-nozzle`의 `instances`를 `0`으로 설정합니다.

### 메트릭 수집

PKS를 모니터링하려면 [쿠버네티스(Kubernetes)][3]에 대해 Datadog 통합을 설정해야 합니다.

### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

설정은 쿠버네티스(Kubernetes)와 완전히 동일합니다.
모든 컨테이너에서 로그 수집을 시작하려면 Datadog 에이전트 [환경 변수][4]를 사용하세요.

또한 DaemonSets를 활용하여 [모든 노드에 Datadog 에이전트를 자동으로 배포할 수도 있습니다][5].

환경 변수에 대해 자세히 알아보려면 [컨테이너 로그 수집 단계][6]를 참조하고 고급 설정 옵션을 살펴보세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://network.pivotal.io/products/datadog
[3]: https://docs.datadoghq.com/ko/integrations/kubernetes/
[4]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/kubernetes/#log-collection-setup
[5]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/kubernetes/#container-installation
[6]: https://docs.datadoghq.com/ko/logs/log_collection/docker/#option-2-container-installation
[7]: https://docs.datadoghq.com/ko/help/
---
app_id: podman
app_uuid: ecc06845-18ac-448e-b352-1bbf31fdfcc3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10267
    source_type_name: Podman
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/podman/README.md
display_on_public_website: true
draft: false
git_integration_title: podman
integration_id: podman
integration_title: Podman
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: podman
public_title: Podman
short_description: Datadog로 Podman 컨테이너 메트릭 모두 추적하기
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog로 Podman 컨테이너 메트릭 모두 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Podman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


[Podman][1]은 Linux 시스템에서 OCI 컨테이너를 개발, 관리, 실행하는, daemon 없는 컨테이너 엔진입니다. 컨테이너를 루트로 실행하거나 루트 없는 모드로 실행할 수 있습니다.

## 개요

Podman 컨테이너 런타임은 [컨테이너 에이전트 점검][2]에서 지원됩니다.
이 점검은 시작에 사용되는 런타임과 상관 없이 실행 중인 컨테이너에서 메트릭 집합을 보고합니다.

**참고**: `container` 점검은 컨테이너 런타임과 관계 없이 시스템에 있는 모든 컨테이너의 표준 메트릭을 보고합니다.

## 설정

### 설치

[Podman][1]에서 관리하는 컨테이너를 모니터링하려면 [컨테이너 에이전트 점검][2]의 [설치 지침][3]을 참고하세요.

## 수집한 데이터

### 메트릭

본 통합에서 제공하는 메트릭 목록을 보려면 [metadata.csv][4]를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][1]에 연락하세요.

[1]: https://podman.io/
[2]: https://docs.datadoghq.com/ko/integrations/container/
[3]: https://docs.datadoghq.com/ko/integrations/container/#setup
[4]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
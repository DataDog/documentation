---
app_id: container
app_uuid: ac3cc203-5b28-457d-8737-bbe32fa7c3b9
assets:
  dashboards:
    Containers: assets/dashboards/containers.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: container.uptime
      metadata_path: metadata.csv
      prefix: container.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10242
    source_type_name: 컨테이너
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/container/README.md
display_on_public_website: true
draft: false
git_integration_title: container
integration_id: container
integration_title: 컨테이너
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: container
public_title: 컨테이너
short_description: Datadog으로 컨테이너 메트릭 추적
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Datadog으로 컨테이너 메트릭 추적
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 컨테이너
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 컨테이너를 시작하는 데 사용된 런타임에 관계없이 실행 중인 모든 컨테이너에 대한 일련의 메트릭을 보고합니다.

**참고**: `container` 검사는 `containerd` 검사와 다릅니다. `container` 검사는 컨테이너 런타임에 관계없이 시스템에서 발견된 모든 컨테이너에 대한 표준화된 메트릭을 보고합니다.
`containerd`는 `containerd` 런타임 전용이며 `containerd.*` 네임스페이스에 메트릭을 게시합니다.

## 설정

### 설치

컨테이너는 핵심 Datadog Agent 검사이며 지원되는 컨테이너 런타임이 감지되면 자동으로 활성화됩니다.
환경에 따라 지원되는 컨테이너 런타임(Docker, Containerd)에 대한 액세스를 구성해야 할 수도 있습니다.

#### 컨테이너에서 설치

`container` 검사를 수행하려면 자동 활성화를 위해 일부 폴더를 마운트해야 합니다. 이는 공식 Helm Chart, Datadog Operator에 의해 처리되며 Kubernetes, Docker, ECS 및 ECS Fargate에 대해 문서화된 설정으로 처리됩니다.

### 구성

`container` 검사에서는 특정 구성 설정을 노출하지 않습니다. 공통 필드를 사용자 정의하거나 `container` 검사를 강제로 활성화하려면 다음 단계를 따르세요.

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `container.d/conf.yaml` 파일을 생성합니다.

2. [Agent를 재시작합니다][1]

`container` 검사를 통해 CPU, 메모리, 네트워크 및 디스크 IO에 대한 메트릭을 수집할 수 있습니다.
단, 환경(예: Linux/Windows)에 따라 일부 메트릭을 사용하지 못할 수도 있습니다.

### 검증

[Agent의 `status` 하위 명령을 실행][1]하고 **Checks** 섹션에서 `container`를 찾습니다.

## 수집한 데이터

### 메트릭

이 통합에서 제공하는 메트릭 목록은 [metadata.csv][2]를 참조하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
[3]: https://docs.datadoghq.com/ko/help/
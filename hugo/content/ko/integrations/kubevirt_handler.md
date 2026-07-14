---
app_id: kubevirt-handler
app_uuid: 751006a9-b87a-4f54-acc5-2886ec49073e
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_handler.can_connect
      - kubevirt_handler.vmi.cpu_system_usage_seconds.count
      metadata_path: metadata.csv
      prefix: kubevirt_handler.
    process_signatures:
    - virt-handler
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22778164
    source_type_name: KubeVirt Handler
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- kubernetes
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_handler
integration_id: kubevirt-handler
integration_title: KubeVirt Handler
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_handler
public_title: KubeVirt Handler
short_description: 주요 메트릭을 수집하여 KubeVirt Handler Daemon의 상태를 모니터링합니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 주요 메트릭을 수집하여 KubeVirt Handler Daemon의 상태를 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: KubeVirt Handler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-warning">
본 통합은 퍼블릭 베타 단계이므로 프로덕션 워크로드에서는 신중하게 사용해야 합니다.
</div>

## 개요

이 검사는 Datadog Agent를 통해 [KubeVirt Handler][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치 및 설정하세요. 컨테이너화된 환경의 경우, 이러한 지침을 적용하는 데 가이드가 필요하다면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

KubeVirt Handler 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

1. Agent의 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `kubevirt_handler.d/conf.yaml` 파일을 편집하여 kubevirt_handler 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 kubevirt_handler.d/conf.yaml][4]을 참조하세요.

2. [에이전트를 재시작하세요][5].

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `kubevirt_handler`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kubevirt_handler" >}}


### 이벤트

KubeVirt Handler 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

KubeVirt Handler 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/integrations/kubevirt_handler
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/datadog_checks/kubevirt_handler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/
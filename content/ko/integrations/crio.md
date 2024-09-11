---
app_id: cri-o
app_uuid: a5f9ace1-19b5-4928-b98b-21f15d62cce2
assets:
  dashboards:
    crio: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: crio.operations.count
      metadata_path: metadata.csv
      prefix: crio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10044
    source_type_name: CRI-O
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/crio/README.md
display_on_public_website: true
draft: false
git_integration_title: crio
integration_id: cri-o
integration_title: CRI-O
integration_version: 2.6.1
is_public: true
manifest_version: 2.0.0
name: crio
public_title: CRI-O
short_description: Datadog로 CRI-O 메트릭을 모두 추적하기
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Containers
  configuration: README.md#Setup
  description: Datadog로 CRI-O 메트릭을 모두 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI-O
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [CRI-O][1]를 모니터링합니다.

## 설정

### 설치

이 통합의 경우 활성화된 메트릭이 `127.0.0.1:9090/metrics`에 노출되어 있을 때 기본적으로 비활성화되어 있는 CRI-O  `--enable-metrics ` 옵션이 필요합니다.

### 설정

1. 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `crio.d/conf.yaml` 파일을 편집해 CRI-O 성능 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션을 모두 보려면 [sample crio.d/conf.yaml][2]을 참고하세요.

2. [Restart the Agent][3].

### 검증

[에이전트 상태 하위 명령을 실행하고][4] 점검 섹션 아래에서 `crio`를 찾으세요.

## 수집한 데이터

CRI-O는 런타임 운영 횟수와 대기 시간 메트릭을 수집합니다.
Datadog-CRI-O 통합은 CRI-O golang 이진수 자체의 메모리 사용량과 CPU를 수집합니다.

### 메트릭
{{< get-metrics-from-git "crio" >}}


### 서비스 점검
{{< get-service-checks-from-git "crio" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json
[7]: https://docs.datadoghq.com/ko/help/
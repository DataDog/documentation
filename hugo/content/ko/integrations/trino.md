---
app_id: trino
app_uuid: 5d6fa7f8-e827-408c-9cf1-8f2bd64b45d3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: trino.memory.reserved_distributed_bytes
      metadata_path: metadata.csv
      prefix: trino.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10282
    source_type_name: Trino
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/trino/README.md
display_on_public_website: true
draft: false
git_integration_title: trino
integration_id: trino
integration_title: Trino
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: trino
public_title: Trino
short_description: Trino 클러스터의 성능 및 사용 통계 수집
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 제공::통합
  configuration: README.md#Setup
  description: Trino 클러스터의 성능 및 사용 통계 수집
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Trino
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 다음 예시와 같은 [Trino][1] 메트릭을 수집합니다.

- 전반적인 활동 메트릭: 완료/실패한 쿼리, 데이터 입력/출력 크기, 실행 시간.
- 성능 메트릭: 클러스터 메모리, 입력 CPU, 실행 CPU 시간.

## 설정

### 설치

Agent v7.33.0+의 경우 아래 지침에 따라 호스트에 Trino 점검을 설치하세요. Docker Agent 또는 구버전의 Agent와 함께 설치하려면 [커뮤니티 통합 사용][2]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-trino==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 구성

1. 에이전트 구성 디렉터리의 루트에 있는 `conf.d/` 폴더 내 `trino.d/conf.yaml` 
   파일을 편집하여 Trino 성능 데이터를 수집하기 시작하세요.
   사용 가능한 모든 구성 옵션은 [샘플 trino.d/conf.yaml][4]을 참조하세요.

   이 점검은 인스턴스당 350개의 메트릭으로 제한됩니다. 반환되는 메트릭의 수는 Datadog Agent [상태 명령][5]을 실행할 때 표시됩니다.
   [구성][4]을 편집하여 관심 있는 메트릭을 지정할 수 있습니다.
   수집할 메트릭을 사용자 지정하는 방법을 알아보려면 [JMX 점검][6]을 참조하세요.
   더 많은 메트릭을 모니터링해야 하는 경우 [Datadog 지원팀][7]으로 문의하세요.

2. [에이전트를 재시작합니다][8].

### 검증

[Agent의 `status` 하위 명령을 실행하고][5] 확인 섹션에서 Trino를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "trino" >}}


### 이벤트

Trino 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Trino 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://trino.io/
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/trino/datadog_checks/trino/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/integrations/java/
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-extras/blob/master/trino/metadata.csv
---
app_id: pulsar
app_uuid: 2a3a1555-3c19-42a9-b954-ce16c4aa6308
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pulsar.active_connections
      metadata_path: metadata.csv
      prefix: pulsar.
    process_signatures:
    - java org.apache.pulsar.PulsarStandaloneStarter
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10143
    source_type_name: pulsar
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 메시지 큐
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pulsar/README.md
display_on_public_website: true
draft: false
git_integration_title: pulsar
integration_id: pulsar
integration_title: Pulsar
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: pulsar
public_title: Pulsar
short_description: Pulsar 클러스터를 모니터링하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 카테고리::메세지 큐
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Pulsar 클러스터를 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pulsar
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog 에이전트를 통해 [Pulsar][1]을 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

Pulsar 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

1. 에이전트의 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `pulsar.d/conf.yaml` 파일을 편집하여 pulsar 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [pulsar.d/conf.yaml 샘플][4]을 참고하세요.

2. [Agent를 재시작합니다][5].

### 검증

[에이전트 상태 하위 명령을 실행][6]하고 점검 섹션에서 `pulsar`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "pulsar" >}}



### 로그 수집

1. Pulsar 로그 통합은 Pulsar의 [기본 로그 형식][8]을 지원합니다. 다른 형식이 있을 경우에는 [통합 파이프라인][9]을 복제하고 편집하세요.

2. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.
   ```yaml
   logs_enabled: true
   ```

3. `pulsar.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집합니다. 환경에 따라 경로 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 pulsar.d/conf.yaml][4]을 참고하세요.
   ```yaml
    logs:
      - type: file
        path: /pulsar/logs/pulsar.log
        source: pulsar
   ```
4. [Agent를 재시작합니다][5]

### 이벤트

Pulsar 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "pulsar" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://pulsar.apache.org
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/pulsar/metadata.csv
[8]: https://pulsar.apache.org/docs/en/reference-configuration/#log4j
[9]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines
[10]: https://github.com/DataDog/integrations-core/blob/master/pulsar/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/
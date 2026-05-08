---
app_id: mergify
app_uuid: 17230c84-50c7-4025-8fc8-69a9bc0bd502
assets:
  dashboards:
    Mergify merge queue overview [deprecated]: assets/dashboards/mergify_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mergify.queue_checks_outcome
      metadata_path: metadata.csv
      prefix: mergify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10349
    source_type_name: Mergify
author:
  homepage: https://mergify.com
  name: 커뮤니티
  sales_email: hello@mergify.com
  support_email: support@mergify.com
categories:
- 개발 툴
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify
integration_id: mergify
integration_title: Mergify [더 이상 사용되지 않음]
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: mergify
public_title: Mergify [더 이상 사용되지 않음]
short_description: Mergify 병합 대기열 통계 통합
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  - Category::Developer Tools
  - 제공::통합
  configuration: README.md#Setup
  description: Mergify 병합 대기열 통계 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify [더 이상 사용되지 않음]
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

**중요**: 2024년 10월 10일부터 이 통합은 더 이상 지원되지 않습니다. [새로운 통합][1]을 사용하세요.

이 통합은 [Mergify][2]에 구성된 각 리포지토리의 병합 대기열 길이를 모니터링하고 Mergify의 글로벌 가용성을 추적합니다. Datadog 계정으로 메트릭을 전송하여 이상 알림에 대한 모니터링을 설정하고 병합 대기열 성능을 분석할 수 있습니다. 또한 이 Datadog 통합을 사용하여 Mergify 서비스 가용성을 파악하고 개발 워크플로를 최적화할 수 있습니다.

## 설정

### 설치

#### 릴리스에서

`datadog-agent integration install -t datadog-mergify==<INTEGRATION_VERSION>`을 실행합니다.

#### 소스에서

호스트에 Mergify 점검을 설치하는 방법:

1. 컴퓨터에 [개발자 도구][3]를 설치합니다.

2. `ddev release build mergify`를 실행해 패키지를 빌드합니다.

3. [Datadog 에이전트를 다운로드][4]합니다.

4. 빌드 아티팩트를 에이전트가 있는 호스트에 업로드합니다.
 `datadog-agent integration install -w
 path/to/mergify/dist/<ARTIFACT_NAME>.whl`.

### 구성

1. [Agent 구성 디렉터리][5]의 루트에 있는 `conf.d/` 폴더의 `mergify.d/conf.yaml` 파일을 편집하여 Mergify [메트릭](#metrics) 수집을 시작하세요.

   사용 가능한 모든 구성 옵션은 샘플 [mergify.d/conf.yaml.example][6] 파일을 참고하세요.

2. [에이전트를 다시 시작][7]합니다.

### 검증

[Agent 상태 하위 명령][8]을 실행하고 Checks 섹션에서 `mergify`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mergify" >}}


### 이벤트

Mergify는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Mergify 지원팀][2]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/mergify-oauth
[2]: https://mergify.com
[3]: https://docs.datadoghq.com/ko/developers/integrations/new_check_howto/#configure-the-developer-tool
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/mergify/datadog_checks/mergify/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/mergify/assets/service_checks.json
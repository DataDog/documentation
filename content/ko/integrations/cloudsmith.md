---
app_id: cloudsmith
app_uuid: 92b5a159-e5e9-4e38-a4d4-b987cd03b7a1
assets:
  dashboards:
    Cloudsmith: assets/dashboards/cloudsmith_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloudsmith.bandwidth_used
      metadata_path: metadata.csv
      prefix: cloudsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10208
    source_type_name: Cloudsmith
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cloudsmith
  sales_email: ccarey@cloudsmith.io
  support_email: ccarey@cloudsmith.io
categories:
- cloud
- 메트릭
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudsmith
integration_id: cloudsmith
integration_title: Cloudsmith
integration_version: 0.0.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cloudsmith
public_title: Cloudsmith
short_description: Cloudsmith 메트릭 모니터링하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::클라우드
  - 카테고리::메트릭
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  configuration: README.md#Setup
  description: Cloudsmith 메트릭 모니터링하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 Datadog 에이전트로 [Cloudsmith][1]를 모니터링합니다.
- Cloudsmith 계정의 스토리지, 대역폭 및 토큰 사용량을 모니터링합니다.


## 설정

[Datadog 에이전트][2] 패키지에는 Cloudsmith 점검이 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Cloudsmith 점검을 설치하세요. 도커(Docker) 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-cloudsmith==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. 에이전트의 설정 디렉터리 루트에서 `conf.d/` 폴더에 있는 `cloudsmith.d/conf.yaml` 파일을 편집하여 Cloudsmith 성능 데이터 수집을 시작하세요. 사용 가능한 모든 설정 옵션은 [샘플 cloudsmith.d/conf.yaml][5]을 참조하세요.

2. [에이전트를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령을 실행하고][7] 점검 섹션에서 `cloudsmith`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cloudsmith" >}}


### 이벤트

수집한 모든 Cloudsmith 관련 이벤트는 Datadog 이벤트 스트림 내에 `source:cloudsmith` 속성과 함께 표시됩니다. Cloudsmith API로 전송되는 요청의 수를 줄일 목적으로 5분마다 수집합니다.

이벤트에는 두 가지 유형이 있습니다.

- 보안 스캔 이벤트
- 감사 로그 이벤트

`@aggregation_key:audit_log`, `@aggregation_key:vulnerabilities` 집계 키로 접근할 수 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Cloudsmith 고객 지원팀][10]에 문의해주세요.

[1]: https://cloudsmith.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/datadog_checks/cloudsmith/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/assets/service_checks.json
[10]: https://help.cloudsmith.io/docs/contact-us#live-chat-via-intercom
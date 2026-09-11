---
app_id: sendmail
app_uuid: 8169d145-8d1f-4bb8-a4de-a0aa9aa84c0b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: sendmail.queue.size
      metadata_path: metadata.csv
      prefix: sendmail.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10204
    source_type_name: Sendmail
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: david.bouchare@datadoghq.com
  support_email: david.bouchare@datadoghq.com
categories:
- 메트릭
- 네트워크
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md
display_on_public_website: true
draft: false
git_integration_title: sendmail
integration_id: sendmail
integration_title: Sendmail
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sendmail
public_title: Sendmail
short_description: 메일 대기열 모니터링을 위한 Sendmail 통합
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 'Category::Metrics '
  - Category::Network
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: 메일 대기열 모니터링을 위한 Sendmail 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sendmail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog 에이전트를 통해 [Sendmail][1]을 모니터링합니다.

## 설정

Sendmail 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21 이상/v6.21 이상의 경우 아래 지침에 따라 호스트에 Sendmail 점검을 설치하세요. 도커(Docker) 에이전트 또는 이전 버전의 에이전트에 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-sendmail==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. 에이전트의 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `sendmail.d/conf.yaml` 파일을 편집하여 sendmail 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 sendmail.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

### 검증

[에이전트 상태 하위 명령을 실행][7]하고 점검 섹션에서 `sendmail`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "sendmail" >}}


### 이벤트

Sendmail에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "sendmail" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
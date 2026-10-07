---
app_id: upsc
app_uuid: 4681a41f-efdc-4d22-b573-06e101b9cf24
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: upsc.battery.charge
      metadata_path: metadata.csv
      prefix: upsc.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10211
    source_type_name: UPSC
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md
display_on_public_website: true
draft: false
git_integration_title: upsc
integration_id: upsc
integration_title: UPSC
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: upsc
public_title: UPSC
short_description: UPS 배터리용 UPSC 상태 수집기
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::OS & 시스템
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: UPS 배터리용 UPSC 상태 수집기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: UPSC
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

UPSC를 통해 UPSD 서비스에서 실시간으로 메트릭을 가져와 다음을 실행합니다.

- UPS 배터리의 상태를 시각화하고 모니터링합니다.
- UPS 대체 작동 및 이벤트에 대한 알림을 받습니다.

## 설정

[Datadog Agent][1] 패키지에는 UPSC 점검이 포함되어 있지 않으므로 직접 설치해야 합니다.

### 설치

Agent v7.21 이상/v6.21 이상이라면 아래 지침에 따라 호스트에 UPSC 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent를 사용하여 설치하려면 [커뮤니티 통합 사용][2]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-upsc==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 구성

1. UPSC [메트릭](#metrics) 수집을 시작하려면 [Agent의 구성 디렉터리][4]의 루트에 있는 `conf.d/` 폴더에서 `upsc.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 upsc.d/conf.yaml[5]을 참고하세요.

2. [에이전트 재시작][6]

## 검증

[Agent 상태 하위 명령][7]을 실행하고 Checks 섹션에서 `upsc`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "upsc" >}}


### 이벤트

UPSC 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

UPSC 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[9]: http://docs.datadoghq.com/help
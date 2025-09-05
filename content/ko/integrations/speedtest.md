---
app_id: speedtest
app_uuid: 550862f8-f1d1-4924-b802-185b865e09a4
assets:
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: speedtest.download.bandwidth
      metadata_path: metadata.csv
      prefix: speedtest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10119
    source_type_name: speedtest
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: cody.lee@datadoghq.com
  support_email: cody.lee@datadoghq.com
categories:
- 개발 툴
- 네트워크
- 테스팅
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md
display_on_public_website: true
draft: false
git_integration_title: speedtest
integration_id: speedtest
integration_title: speedtest
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: speedtest
public_title: speedtest
short_description: speedtest-cli를 사용하여 Speedtest 결과 실행
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: speedtest-cli를 사용하여 Speedtest 결과 실행
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: speedtest
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog Agent를 통해 [Speedtest][1]를 모니터링합니다.

## 설정

Speedtest 점검은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Speedtest 점검을 설치합니다. [커뮤니티 통합 사용][3]을 참조하여 Agent의 구버전이나 Docker Agent를 사용해 설치합니다.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

**참고**: 모든 호스트에 [Speedtest CLI][1]를 설치하고 사용 전 Datadog Agent 사용자로서 서약서에 동의해야 합니다(예: `sudo -u dd-agent speedtest`).

### 구성

1. Agent 구성 디렉터리의 루트에 있는 `conf.d/` 폴더에서 `speedtest.d/conf.yaml` 파일을 편집하면 Speedtest 성능 데이터 수집이 시작됩니다. 사용 가능한 모든 구성 옵션의 경우 [샘플 speedtest.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

### 검증

[Agent 상태 하위 명령][7]을 실행하여 점검 섹션에서 `speedtest`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "speedtest" >}}


### 이벤트

Speedtest 점검은 어떠한 이벤트도 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "speedtest" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://www.speedtest.net/apps/cli
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
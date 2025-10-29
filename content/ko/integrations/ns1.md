---
app_id: ns1
app_uuid: 8bc08030-a931-42a0-b9c0-9ca87f3e0e12
assets:
  dashboards:
    NS1: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ns1.qps
      metadata_path: metadata.csv
      prefix: ns1.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10182
    source_type_name: NS1
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: NS1
  sales_email: zjohnson@ns1.com
  support_email: zjohnson@ns1.com
categories:
- 네트워크
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md
display_on_public_website: true
draft: false
git_integration_title: ns1
integration_id: ns1
integration_title: ns1
integration_version: 0.0.6
is_public: true
manifest_version: 2.0.0
name: ns1
public_title: ns1
short_description: NS1 메트릭을 수집하는 Datadog 통합
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Network
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: NS1 메트릭을 수집하는 Datadog 통합
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://help.ns1.com/hc/en-us/articles/4402752547219
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/ns1-monitoring-datadog/
  support: README.md#Support
  title: ns1
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 통합은 Datadog 에이전트를 통해 [NS1][1] 서비스를 모니터링합니다.

![Snap][2]

## 설정

NS1 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 따라 NS1 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합 사용][4]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-ns1==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][5]과 유사하게 설정하세요.

### 설정

1. NS1 메트릭 수집을 시작하려면 에이전트의 설정 디렉터리 루트의 `conf.d/` 폴더에서 `ns1.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션을 보려면 [[ns1.d/conf.yaml][6] 샘플을 참고하세요.

2. [에이전트를 다시 시작][7]합니다.

### 검증

[에이전트의 상태 하위 명령][5]을 실행하고 점검 섹션에서 `ns1`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ns1" >}}


### 이벤트

NS1 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ns1" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [NS1 + Datadog 통합(발신) 퀵 스타트 가이드][11]
- [NS1와 Datadog를 함께 사용해 모니터링][12]


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.datadoghq.com/ko/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219
[12]: https://www.datadoghq.com/blog/ns1-monitoring-datadog/
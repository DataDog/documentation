---
app_id: vespa
app_uuid: 9e31df30-189f-468f-88c7-9c73caf4cdca
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: vespa.mem.heap.free.average
      metadata_path: metadata.csv
      prefix: vespa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10212
    source_type_name: Vespa
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Vespa
  sales_email: dd@vespa.ai
  support_email: dd@vespa.ai
categories:
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md
display_on_public_website: true
draft: false
git_integration_title: vespa
integration_id: vespa
integration_title: Vespa
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: vespa
public_title: Vespa
short_description: 빅데이터 제공 엔진 Vespa의 상태 및 성능 모니터링
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - 카테고리::데이터 저장
  - 제공::통합
  configuration: README.md#Setup
  description: 빅데이터 제공 엔진 Vespa의 상태 및 성능 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Vespa
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Vespa][1] 시스템에서 실시간으로 메트릭을 가져와 다음을 실행합니다.

- Vespa 상태 및 성능을 시각화하고 모니터링합니다.
- 상태 및 가용성에 대한 알림을 받습니다.

## 설정

[Datadog Agent][2] 패키지에는 Vespa 점검이 포함되어 있지 않으므로 직접 설치해야 합니다.

### 설치

Agent v7.21 이상 / v6.21 이상이라면, 아래 지침을 따라 호스트에 Vespa 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent를 사용하여 설치하려면 [커뮤니티 통합 사용][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

Vespa 점검을 구성하는 방법:

1. [Agent 구성 디렉터리][5]의 루트에 있는 `conf.d/` 폴더에 `vespa.d/` 폴더를 만듭니다.
2. 이전에 만든 `vespa.d/` 폴더에 `conf.yaml` 파일을 만듭니다.
3. [샘플 vespa.d/conf.yaml][6] 파일을 참고하여 그 내용을 `conf.yaml` 파일에 복사합니다.
4. `conf.yaml` 파일을 편집하여 `consumer`를 구성합니다. 이 구성은 점검에서 전달할 메트릭 세트를 결정합니다.
   - `consumer`: Vespa 애플리케이션 services.xml에서 `default` 또는 [커스텀 컨슈머][7]에 대한
     메트릭을 수집하는 컨슈머
5. [Agent를 재시작합니다][8].

### 검증

[Agent의 상태 하위 명령][9]을 실행하고 Checks 섹션에서 `vespa`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "vespa" >}}


### 이벤트

Vespa 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "vespa" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.


[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[7]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/vespa/assets/service_checks.json
[12]: https://docs.datadoghq.com/ko/help/
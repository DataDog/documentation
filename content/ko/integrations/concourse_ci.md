---
app_id: concourse-ci
app_uuid: eb83d03f-e1d6-4718-8e54-922f4d2528b1
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: concourse.ci.goroutines
      metadata_path: metadata.csv
      prefix: concourse.ci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10041
    source_type_name: Concourse CI
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 자동화
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/README.md
display_on_public_website: true
draft: false
git_integration_title: concourse_ci
integration_id: concourse-ci
integration_title: Concourse-CI
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: concourse_ci
public_title: Concourse-CI
short_description: Concourse CI에서 전송한 메트릭을 수집합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::자동화
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  configuration: README.md#Setup
  description: Concourse CI에서 전송한 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Concourse-CI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Concourse CI의 Datadog 메트릭 이미터(Emitter)를 다음과 같이 설정합니다. 

- 파이프라인의 기간, 컨테이너 수, 마운트된 워커의 볼륨을 시각화합니다.
- 경로를 구축할 목적으로 느린 요청을 식별합니다.

## 설정

### 설치

Concourse CI는 Datadog 메트릭 이미터(emitter)와 함께 번들로 제공됩니다. 시작 시 메트릭을 전송하도록 [ATC][1]를 구성하기 위한 전제 조건으로 [Datadog 에이전트][2]가 설치되어 있어야 합니다.

### 설정

다음 옵션을 설정하여 ATC가 Datadog 이미터(emitter)를 사용하도록 설정합니다. `concourse.ci` 접두사를 사용하여 [커스텀 메트릭][3]을 전송하지 않도록 하는 것이 중요합니다.

### 메트릭 이미터(emitter) 옵션

자세한 내용을 확인하려면 Concourse CI 문서의 [메트릭 구성하기][4]를 참조하세요.

```text
Metric Emitter (Datadog):
    --datadog-agent-host=       Datadog agent host to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_HOST]
    --datadog-agent-port=       Datadog agent port to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_PORT]
    --datadog-prefix=           Prefix for all metrics to easily find them in Datadog [$CONCOURSE_DATADOG_PREFIX]
```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "concourse_ci" >}}


### 이벤트

본 통합은 이벤트를 지원하지 않습니다.

### 서비스

본 통합은 서비스 점검을 수집하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://concourse-ci.org/concepts.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/developers/metrics/custom_metrics/
[4]: https://concourse-ci.org/metrics.html#configuring-metrics
[5]: https://github.com/DataDog/integrations-extras/blob/master/concourse_ci/metadata.csv
[6]: https://docs.datadoghq.com/ko/help/
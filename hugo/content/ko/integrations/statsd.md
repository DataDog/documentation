---
app_id: statsd
app_uuid: 847f92f2-77e2-4429-844f-50f4d9c8097f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: statsd.counters.count
      metadata_path: metadata.csv
      prefix: statsd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10086
    source_type_name: StatsD
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/statsd/README.md
display_on_public_website: true
draft: false
git_integration_title: statsd
integration_id: statsd
integration_title: StatsD
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: statsd
public_title: StatsD
short_description: StatsD 서버의 가용성을 모니터하고 메트릭 수를 추적합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: StatsD 서버의 가용성을 모니터하고 메트릭 수를 추적합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/statsd
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
  support: README.md#Support
  title: StatsD
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 비 Datadog StatsD 서버의 가용성 및 업타임을 모니터합니다. 또한 StatsD가 수신한 메트릭 수를 메트릭 유형별로 추적합니다.

이 검사는 StatsD 서버에서 Datadog으로 애플리케이션 메트릭을 포워딩하지 **않으며**, StatsD 자체에 대한 메트릭을 수집합니다.

## 설정

### 설치

StatsD 점검에는 [Datadog Agent][1] 패키지가 포함되어 있으므로 StatsD가 실행되는 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에 있는 `statsd.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 statsd.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 8126 # or wherever your statsd listens
   ```

2. [Agent를 다시 시작][3]하여 Datadog으로 StatsD 메트릭과 서비스 검사를 전송합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                 |
| -------------------- | ------------------------------------- |
| `<INTEGRATION_NAME>` | `statsd`                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                         |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"8126"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### 로그 수집

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Supervisord 로그 수집을 시작하려면 `statsd.d/conf.yaml` 파일에 이 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: statsd
   ```

   `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다.
   사용 가능한 모든 구성 옵션은 [샘플 statsd.d/conf.yaml][2]을 참고하세요.

3. [에이전트를 재시작][3]하세요.

### 검증

[Agent 상태 하위 명령을 실행][4]하고 Checks 섹션에서 `statsd`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "statsd" >}}


### 이벤트

StatsD 검사는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "statsd" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [StatsD는 무엇이며 어떻게 도움이 되나요?][6]
- [Counts Graphing으로 StatsD 메트릭 시각화][7]



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/statsd
[7]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
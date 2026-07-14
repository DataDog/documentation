---
app_id: gearman
app_uuid: 7e1b6c42-8f40-4f4c-8d58-a3f7f39cb3e5
assets:
  dashboards:
    gearman: assets/dashboards/gearman_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gearman.unique_tasks
      metadata_path: metadata.csv
      prefix: gearman.
    process_signatures:
    - gearmand
    - gearman
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 52
    source_type_name: Gearman
  saved_views:
    gearman_processes: assets/saved_views/gearman_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md
display_on_public_website: true
draft: false
git_integration_title: gearmand
integration_id: gearman
integration_title: Gearman
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: gearmand
public_title: Gearman
short_description: 대기열에 있는 작업과 실행 중인 작업 수를 총개수나 작업별로 추적하기.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 대기열에 있는 작업과 실행 중인 작업 수를 총개수나 작업별로 추적하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gearman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Gearman 메트릭을 수집하면 다음을 할 수 있습니다.

- Gearman 성능 시각화
- 대기열에 있거나 실행 중인 작업 수 파악
- Gearman의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

[Datadog 에이전트][1] 패키지에 Gearman 점검이 포함되어 있기 때문에 Gearman 작업 서버에 새로운 설치를 할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `gearmand.d/conf.yaml` 파일을 편집해 Gearman 성능 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션을 모두 보려면 [샘플 gearmand.d/conf.yaml][2]을 참고하세요.

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

2. [에이전트]를 다시 시작합니다[3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `gearmand`                             |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server":"%%host%%", "port":"4730"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### 로그 수집

1. Datadog 에이전트에서는 기본적으로 로그 수집을 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. Gearman 로그를 수집하려면 `gearmand.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.

    ```yaml
    logs:
      - type: file
        path: /var/log/gearmand.log
        source: gearman
    ```

   `path` 파라미터 값을 내 환경에 맞게 바꾸세요. 사용할 수 있는 설정 옵션을 모두 보려면  [샘플 gearmand.d/conf.yaml][2]을 참고하세요.

3. [에이전트를 재시작][3]하세요.

쿠버네티스 환경에서 로그를 수집하기 위해 에이전트를 구성하는 것과 관련한 자세한 내용은 [쿠버네티스 로그 수집][4]을 참고하세요.

### 검증

[에이전트의 `status` 하위 명령을 실행][5]하고 Checks 섹션 아래에서 `gearmand`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gearman" >}}


### 이벤트

Gearman 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "gearman" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/

---
app_id: twemproxy
app_uuid: 34f4e81a-6fd2-48fd-a10c-5bffb75bbd0e
assets:
  dashboards:
    Twemproxy - Overview: assets/dashboards/twemproxy_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: twemproxy.total_connections
      metadata_path: metadata.csv
      prefix: twemproxy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10070
    source_type_name: Twemproxy
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/twemproxy/README.md
display_on_public_website: true
draft: false
git_integration_title: twemproxy
integration_id: twemproxy
integration_title: Twemproxy
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: twemproxy
public_title: Twemproxy
short_description: twemproxy 성능을 시각화하고 나머지 애플리케이션과 연계하세요.
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
  description: twemproxy 성능을 시각화하고 나머지 애플리케이션과 연계하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Twemproxy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

각 Twemproxy 서버의 전체 및 풀별 통계를 추적하세요. 이 Agent 검사는 클라이언트 및 서버 연결 및 오류, 요청 및 응답 속도, 프록시 입출력 바이트 등에 대한 메트릭을 수집합니다.

## 설정

### 설치

Agent의 Twemproxy 검사는 [Datadog Agent][1] 패키지에 포함되어 있으므로 Twemproxy 서버에 아무것도 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에 있는 `twemproxy.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 twemproxy.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 2222
   ```

2. [Agent를 다시 시작][3]하여 Datadog로 Twemproxy 메트릭 전송을 시작합니다.

##### 로그 수집

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Apache 로그 수집을 시작하려면 이 구성 블록을 `twemproxy.d/conf.yaml` 파일에 추가하세요.

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: twemproxy
       service: "<SERVICE_NAME>"
   ```

    `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 twemproxy.d/conf.yaml][2]을 참조하세요.

3. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/twemproxy/datadog_checks/twemproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `twemproxy`                            |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"22222"}` |

##### 로그 수집

로그 수집은 기본적으로 Datadog Agent에서 비활성화 상태입니다. 활성화하려면 [Kubernetes 로그 수집 설명서][2]를 참조하세요.

| 파라미터      | 값                                            |
| -------------- | ------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "twemproxy", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent 상태 하위 명령][2]을 실행하고 확인 섹션에서 `twemproxy`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "twemproxy" >}}


### 이벤트

Twemproxy 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "twemproxy" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/
---
app_id: kong
app_uuid: 41e7a8cb-07b6-46cc-a087-53e87736b5c7
assets:
  dashboards:
    Kong API: assets/dashboards/kong_api.json
    Kong Overview: assets/dashboards/kong_overview.json
    Kong Overview OpenMetrics: assets/dashboards/kong_overview_openmetrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kong.total_requests
      - kong.nginx.requests.total
      metadata_path: metadata.csv
      prefix: kong.
    process_signatures:
    - kong start
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 141
    source_type_name: Kong
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    kong_processes: assets/saved_views/kong_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kong/README.md
display_on_public_website: true
draft: false
git_integration_title: kong
integration_id: kong
integration_title: Kong
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: kong
public_title: Kong
short_description: 총 요청, 응답 코드, 클라이언트 연결 등을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS:Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 총 요청, 응답 코드, 클라이언트 연결 등을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-kong-datadog
  support: README.md#Support
  title: Kong
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Agent의 Kong 점검은 총 요청, 응답 코드, 클라이언트 연결 등을 추적합니다.

또한 Kong의 [Datadog 플러그인][1]을 사용하여 [DogStatsD][2]를 사용하는 Datadog Agent를 통해 Datadog에 API, 연결 및 데이터베이스 메트릭을 보낼 수 있습니다. 자세한 내용은 [Datadog 통합으로 Kong 모니터링][3] 블로그 게시물을 읽어보세요.

## 설정

### 설치

Kong 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 Kong 서버에 추가 설치할 필요가 없습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Prometheus 플러그인 활성화][1]를 통해 OpenMetrics 메트릭이 Kong 서비스에 노출되는지 확인합니다. Agent가 Kong 메트릭을 수집하기 전에 이를 먼저 설정해야 합니다.
2. [Agent 구성 디렉터리][2]의 루트에서 `conf.d/` 폴더에 있는 `kong.d/conf.yaml` 파일에 이 구성 블록을 추가하여 [Kong 메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 kong.d/conf.yaml][3]을 참조하세요.


   ```yaml
   init_config:

   instances:
     ## @param openmetrics_endpoint - string - required
     ## OpenMetrics 형식으로 메트릭을 노출하는 URL입니다.
     #
     - openmetrics_endpoint: http://localhost:8001/metrics
   ```

2. [에이전트를 재시작합니다][4].

**참고**: 점검의 현재 버전(1.17.0+)은  메트릭 수집을 위해 [OpenMetrics][5]를 사용하며 Python 3이 필요합니다. 호스트가 Python 3을 사용할 수 없거나 이 점검의 레거시 버전을 사용하려면 다음 [config][6]을 참조하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Kong 액세스 로그는 NGINX에서 생성되므로 기본 위치는 NGINX 파일과 동일합니다.

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. Kong 로그 수집을 시작하려면 `kong.d/conf.yaml` 파일에 다음 구성 블록을 추가합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: '<SERVICE>'
       source: kong

     - type: file
       path: /var/log/nginx/error.log
       service: '<SERVICE>'
       source: kong
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞춰 설정합니다. 사용 가능한 모든 설정 옵션은 [샘플kong.d/conf.yaml][3]을 참조하세요.

3. [에이전트를 재시작합니다][4].

[1]: https://docs.konghq.com/hub/kong-inc/prometheus/
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.27.x/kong/datadog_checks/kong/data/conf.yaml.example
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

[Prometheus 플러그인 활성화][1]를 통해 OpenMetrics 메트릭이 Kong 서비스에 노출되는지 확인합니다. Agent 가 Kong 메트릭을 수집하기 전에 이를 먼저 구성해야 합니다.
컨테이너화된 환경의 경우 아래 파라미터 적용에 대한 지침은 [자동탐지 통합 템플릿][2]을 참조하세요.

##### 메트릭 수집

| 파라미터            | 값                                                 |
| -------------------- | ----------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kong`                                                |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                         |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:8001/metrics"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집 문서][3]를 참조하세요.

| 파라미터      | 값                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kong", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.konghq.com/hub/kong-inc/prometheus/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `kong`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kong" >}}


### 이벤트

Kong 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "kong" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

- [Datadog 통합으로 Kong 모니터링][3]


[1]: https://docs.konghq.com/hub/kong-inc/datadog/
[2]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[3]: https://www.datadoghq.com/blog/monitor-kong-datadog
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/
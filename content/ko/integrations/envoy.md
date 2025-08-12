---
app_id: envoy
app_uuid: 49dc62d7-7e0c-4c46-b90f-dfd4d5c35d53
assets:
  dashboards:
    Envoy - Overview: assets/dashboards/envoy_overview.json
    Envoy Openmetrics Overview: assets/dashboards/openmetrics_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: envoy.server.uptime
      metadata_path: metadata.csv
      prefix: envoy.
    process_signatures:
    - envoy
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10012
    source_type_name: Envoy
  monitors:
    Envoy instance disconnected from control plane: assets/monitors/connected_state.json
  saved_views:
    envoy_4xx: assets/saved_views/envoy_4xx.json
    envoy_5xx: assets/saved_views/envoy_5xx.json
    envoy_error_grouped: assets/saved_views/envoy_error_grouped.json
    envoy_overview: assets/saved_views/envoy_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- log collection
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/envoy/README.md
display_on_public_website: true
draft: false
git_integration_title: envoy
integration_id: envoy
integration_title: Envoy
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: envoy
public_title: Envoy
short_description: Envoy는 오픈 소스 엣지이자 서비스 프록시입니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Network
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Envoy는 오픈 소스 엣지이자 서비스 프록시입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Envoy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 [Envoy][1]에서 분산 시스템 옵저버빌리티 메트릭을 수집합니다.

## 설정

### 설치

Envoy 검사는 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

#### Istio

[Istio][3]의 일부로 Envoy를 사용하는 경우 Istio 프록시 메트릭 엔드포인트에서 메트릭을 수집하도록 Envoy 통합을 구성합니다.

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

#### 표준

`/stats` 엔드포인트를 설정하는 방법에는 두 가지가 있습니다.

##### 보안되지 않은 통계 엔드포인트

다음은 Envoy 어드민 구성의 예입니다.

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### 보안된 통계 엔드포인트

[어드민 엔드포인트][4](Envoy가 자체적으로 연결됨)로 라우팅하는 리스너/가상호스트를 생성합니다. 단, `/stats`에 대해서만 경로가 있으며 다른 모든 경로는 정적/오류 응답을 받습니다. 또한, 예를 들어 인증용 L3 필터와도 잘 통합할 수 있습니다.

다음은 [envoy_secured_stats_config.json][5]의 구성 예시입니다.

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [Agent 구성 디렉터리][1]의 루트에 있는 `conf.d/` 폴더에서 `envoy.d/conf.yaml` 파일을 편집하여 Envoy 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 envoy.d/conf.yaml][2]을 참조하세요.

    ```yaml
    init_config:

    instances:
        ## @param openmetrics_endpoint - string - required
        ## The URL exposing metrics in the OpenMetrics format.
        #
      - openmetrics_endpoint: http://localhost:8001/stats/prometheus

    ```

2. Datadog Agent가 Envoy의 [어드민 엔드포인트][3]에 액세스할 수 있는지 확인하세요.
3. [Agent를 재시작합니다][4].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 다음으로, 맨 아래 `logs` 줄의 주석 처리를 제거하여 `envoy.d/conf.yaml`을 편집합니다. Envoy 로그 파일의 올바른 경로로 로그 `path`를 업데이트합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/envoy.log
       source: envoy
       service: envoy
   ```

3. [Agent를 재시작합니다][4].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[3]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                       |
| -------------------- | ------------------------------------------- |
| `<INTEGRATION_NAME>` | `envoy`                                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                               |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
**참고**: 검사의 현재 버전(1.26.0+)은 메트릭 수집을 위해 [OpenMetrics][2]를 사용하며, Python 3이 필요합니다. Python 3을 사용할 수 없는 호스트의 경우 또는 이 검사의 레거시 버전을 사용하려면 다음 [구성][3]을 참조하세요.

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][4]을 참조하세요.

| 파라미터      | 값                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "envoy", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[3]: https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `envoy`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "envoy" >}}


각 메트릭에서 전송된 태그 목록은 [metrics.py][7]를 참조하세요.

### 이벤트

Envoy 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "envoy" >}}


## 트러블슈팅

### 일반적인 문제

#### 엔드포인트 `/server_info`에 연결할 수 없음
- Envoy 환경에서 엔드포인트를 사용할 수 없는 경우 Envoy 구성에서 `collect_server_info` 옵션을 비활성화하여 오류 로그를 최소화합니다.

**참고**: Envoy 버전 데이터는 수집되지 않습니다.

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[8]: https://docs.datadoghq.com/ko/help/
---
app_id: cilium
app_uuid: 791bc8e8-1a70-465a-b423-709b6af4e6e5
assets:
  dashboards:
    Cilium Overview: assets/dashboards/overview.json
    Cilium Overview v2: assets/dashboards/overview_v2.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cilium.endpoint.state
      metadata_path: metadata.csv
      prefix: cilium.
    process_signatures:
    - cilium-operator-generic
    - cilium-agent
    - cilium-health-responder
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10077
    source_type_name: Cilium
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cog-2
- 네트워크
- 보안
- 로그 수집
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cilium/README.md
display_on_public_website: true
draft: false
git_integration_title: cilium
integration_id: cilium
integration_title: Cilium
integration_version: 3.4.0
is_public: true
kind: 통합
manifest_version: 2.0.0
name: cilium
public_title: Cilium
short_description: 포드별 에이전트 메트릭을 수집하고 클러스터 전반의 운영자 메트릭을 수집합니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Containers
  - Category::Network
  - 카테고리::보안
  - Category::Log Collection
  configuration: README.md#Setup
  description: 포드별 에이전트 메트릭을 수집하고 클러스터 전반의 운영자 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cilium
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 [Cilium][1]을 모니터링합니다. 통합은 `cilium-agent` 또는 `cilium-operator`에서 메트릭을 수집할 수 있습니다.

## 설정

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

Cilium 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있습니다. 하지만 프로메테우스 메트릭을 노출하기 위한 또 다른 설정 단계가 필요합니다.

1.10.0 버전부터 개방형메트릭 기반 통합은 최신 모드(`use_openmetrics`: 참)이며 레거시 모드(`use_openmetrics`: 거짓)입니다. 가장 최신 기능을 받으려면 Datadog에서 최신 모드를 활성화할 것을 권장합니다. 자세한 정보는 [개방형메트릭 기반 통합에 대한 최신 및 레거시 버전 관리][4]를 참조하세요.

1. `cilium-agent` 및 `cilium-operator` 모두에서 프로메테우스 메트릭을 활성화하려면 Cilium 버전에 따라 설정한 다음 Helm 값을 사용해 Cilium를 배포합니다.
   * Cilium < v1.8.x:
     `global.prometheus.enabled=true`
   * Cilium >= v1.8.x and < v1.9.x:
     `global.prometheus.enabled=true` 및 `global.operatorPrometheus.enabled=true`
   * Cilium >= 1.9.x:
     `prometheus.enabled=true` 및 `operator.prometheus.enabled=true`

또는 별도로 쿠버네티스(Kubernetes) 매니페스트에서 프로메테우스 메트릭을 활성화합니다.
<div class="alert alert-warning"><a href="https://docs.cilium.io/en/v1.12/operations/upgrade/#id2">Cilium <= v1.11</a>의 경우 <code>--prometheus-serve-addr=:9090</code>를 사용합니다.</a></div>  

   - `cilium-agent`에서 Cilium DaemonSet 설정의 `--prometheus-serve-addr=:9962` to the `args` 섹션을 추가합니다.

     ```yaml
     # [...]
     spec:
       containers:
         - args:
             - --prometheus-serve-addr=:9962
     ```

   - `cilium-operator`에서 Cilium 배포 설정의 `--enable-metrics` to the `args` 섹션을 추가합니다.

      ```yaml
      # [...]
      spec:
        containers:
          - args:
              - --enable-metrics
      ```

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:
1. 에이전트의 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `cilium.d/conf.yaml` 파일을 편집해 Cilium 성능 데이터를 수집하기 시작합니다. 사용 가능한 모든 설정 옵션을 보려면 [샘플 cilium.d/conf.yaml][1]을 참조합니다.

   - `cilium-agent` 메트릭을 수집하려면, `agent_endpoint` 옵션을 활성화합니다.
   - `cilium-operator` 메트릭을 수집하려면 `operator_endpoint` 옵션을 활성화합니다.

    ```yaml  
        instances:

            ## @param use_openmetrics - boolean - optional - default: false
            ## Use the latest OpenMetrics implementation for more features and better performance.
            ##
            ## Note: To see the configuration options for the legacy OpenMetrics implementation (Agent 7.33 or older),
            ## see https://github.com/DataDog/integrations-core/blob/7.33.x/cilium/datadog_checks/cilium/data/conf.yaml.example
            #
          - use_openmetrics: true # Enables OpenMetrics latest mode

            ## @param agent_endpoint - string - optional
            ## The URL where your application metrics are exposed by Prometheus.
            ## By default, the Cilium integration collects `cilium-agent` metrics.
            ## One of agent_endpoint or operator_endpoint must be provided.
            #
            agent_endpoint: http://localhost:9090/metrics

            ## @param operator_endpoint - string - optional
            ## Provide instead of `agent_endpoint` to collect `cilium-operator` metrics.
            ## Cilium operator metrics are exposed on port 6942.
            #
            operator_endpoint: http://localhost:6942/metrics
   ```

2. [에이전트를 다시 시작합니다][2].

##### 로그 수집

Cilium은 두 유형의 로그 `cilium-agent` 및 `cilium-operator`을 포함합니다.

1. Datadog 에이전트에서는 기본적으로 로그 수집이 비활성화되어 있습니다. [DaemonSet 설정][1]에서 활성화합니다.

   ```yaml
     # (...)
       env:
       #  (...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     # (...)
   ```

2. 매니페스트를 통해 도커(Docker) 소켓을 Datadog 에이전트에 마운팅하거나 도커를 사용하지 않는 경우 `/var/log/pods` 디렉터리를 마운팅합니다. 예시 매니페스트는 DaemonSet을 위한 쿠버네티스(Kubernetes) 설치 지침][3]을 참조하세요.

3. [에이전트를 다시 시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=daemonset#installation
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

##### `cilium-agent` 메트릭 및 로그를 수집하는 방법:

- 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics", "use_openmetrics": "true"}` |

- 로그 수집

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |

##### `cilium-operator` 메트릭 및 로그를 수집하는 방법:

- 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"operator_endpoint": "http://%%host%%:6942/metrics", "use_openmetrics": "true"}` |

- 로그 수집

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-operator", "service": "cilium-operator"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행하고][5] 점검 섹션 아래에서 `cilium`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cilium" >}}


### 이벤트

Cilium 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "cilium" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.


[1]: https://cilium.io
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadohgq.com/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/
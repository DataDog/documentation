---
app_id: haproxy
app_uuid: 804dd2ae-d0a9-4063-a2bc-bd949ac7bb62
assets:
  dashboards:
    HAProxy - Overview (OpenMetrics): assets/dashboards/openmetrics_overview.json
    HAProxy - Overview (Prometheus): assets/dashboards/prometheus_overview.json
    haproxy: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - haproxy.frontend.bytes.in.count
      - haproxy.frontend.bytes.in_rate
      - haproxy.frontend.bytes.in.total
      metadata_path: metadata.csv
      prefix: haproxy.
    process_signatures:
    - haproxy
    - haproxy-master
    - haproxy-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38
    source_type_name: HAProxy
  monitors:
    Backend queue time is high: assets/monitors/backend_queue_time.json
    Backend sessions usage is high: assets/monitors/backend_sessions.json
    Frontend request rate is anomalous: assets/monitors/request_rate.json
    Frontend sessions usage is high: assets/monitors/frontend_sessions.json
    Number of backend connection failures is high: assets/monitors/backend_econ.json
    Number of client-side request error is high: assets/monitors/frontend_ereq.json
    Number of denied response is high: assets/monitors/backend_dreq.json
    Number of frontend 4xx HTTP responses is high: assets/monitors/frontend_4xx.json
    Number of frontend 5xx HTTP responses is high: assets/monitors/frontend_5xx.json
    Number of frontend denied requests is high: assets/monitors/frontend_dreq.json
    Response time is high: assets/monitors/backend_rtime.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    haproxy_processes: assets/saved_views/haproxy_processes.json
    response_time_overview: assets/saved_views/response_time.json
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
- https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md
display_on_public_website: true
draft: false
git_integration_title: haproxy
integration_id: haproxy
integration_title: HAProxy
integration_version: 7.1.0
is_public: true
manifest_version: 2.0.0
name: haproxy
public_title: HAProxy
short_description: 요청, 응답, 오류, 제공된 바이트 등에 대한 주요 메트릭을 모니터링하세요.
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
  description: 요청, 응답, 오류, 제공된 바이트 등에 대한 주요 메트릭을 모니터링하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
  - resource_type: 문서
    url: https://docs.datadoghq.com/integrations/faq/haproxy-multi-process/
  support: README.md#Support
  title: HAProxy
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![HAProxy 즉시 사용 가능한 대시보드][1]

## 개요

Datadog에서 HAProxy 활동을 캡처하여 다음을 수행합니다.

- HAProxy 로드 밸런싱 성능을 시각화합니다.
- 서버가 다운되는 시점을 파악합니다.
- HAProxy의 성능을 나머지 애플리케이션과 상호 연결합니다.

## 설정

이 통합은 프로메테우스(Prometheus) 엔드포인트(권장) 또는 소켓 기반 통합에서 통계 엔드포인트(더 이상 사용되지 않음)를 통해 메트릭을 수집할 수 있습니다. 프로메테우스 엔드포인트를 사용하려면 HAProxy 버전 2(엔터프라이즈 버전 1.9rc1) 이상이 필요합니다.

프로메테우스 엔드포인트를 사용하는 경우 버전 4.0.0부터 개방형메트릭 기반 통합에는 최신 모드(`use_openmetrics`: true)와 레거시 모드(`use_openmetrics`: false 및 `use_prometheus`: true)가 포함되어 있습니다. 최신 기능을 모두 사용하려면 Datadog에서 최신 모드를 활성화할 것을 권장합니다. 자세한 내용은 [개방형메트릭 기반 통합을 위한 최신 및 레거시 버전 관리]를 참조하세요.

소켓 기반 통합을 사용하려면 `use_openmetrics`와 `use_prometheus`를 모두 false로 설정하고 설정 섹션의 [해당 지침](#using-the-stats-endpoint)을 따르세요.

`use_openmetrics` 옵션은 최신 모드의 [개방형메트릭][3]를 사용해야 합니다. 메트릭 수집을 위해 에이전트 v7.35 이상이 필요하거나 에이전트 v6.35 이상에서 [파이썬(Python) 3][4]를 활성화해야 합니다.. 파이썬 3을 사용할 수 없거나 에이전트 v7.34 이하를 사용하는 호스트의 경우 레거시 모드나 개방형메트릭 또는 [소켓 기반 레거시 통합](#using-the-stats-endpoint)을 사용하세요. 

`[OpenMetrics V1]` 또는 `[OpenMetrics V2]`로 표시된 메트릭은 해당 HAProxy 통합 모드에서만 사용할 수 있습니다. `[OpenMetrics V1 and V2]`로 표시된 메트릭은 두 모드 모두에서 수집됩니다.

### 설치

[Datadog 에이전트][5] 패키지에 HAProxy 점검이 포함되어 있으므로 HAProxy 서버에 아무 것도 설치할 필요가 없습니다.

### 설정

#### 프로메테우스 사용

통합을 설정하는 권장 방법은 HAProxy에서 프로메테우스 엔드포인트를 활성화하는 것입니다. 이 엔드포인트는 버전 2(엔터프라이즈 버전 1.9rc1)부터 HAProxy에 내장되어 있습니다. 이전 버전을 사용하는 경우, [HAProxy 프로메테우스 내보내기][6]를 설정하거나 다음 섹션에 설명된 레거시 소켓 기반 통합을 설정하는 것을 고려하세요.

레거시 개방형메트릭 모드를 최신 모드 대신 사용하려면 `use_openmetrics` 옵션을 `use_prometheus`로 변경하고 `openmetrics_endpoint` 옵션을 `prometheus_url`로 변경하세요. 자세한 내용은 [호스트 설명서의 프로메테우스 및 개방형메트릭 메트릭 수집][7]을 참조하세요.

#### HAProxy 준비

1. [공식 가이드][8]를 사용하여 `haproxy.conf`를 설정하세요.
2. [프로메테우스 엔드포인트를 활성화하려면 HAProxy를 다시 시작하세요][9].

#### 에이전트 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

##### 메트릭 수집
호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면

1. 에이전트의 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `haproxy.d/conf.yaml` 파일을 편집하여 HAProxy 메트릭 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [haproxy.d/conf.yaml 샘플][1]을 참조하세요.

   ```yaml  
   instances:

     ## @param use_openmetrics - boolean - optional - default: false
     ## Enable to preview the new version of the check which supports HAProxy version 2 or later
     ## or environments using the HAProxy exporter.
     ##
     ## OpenMetrics-related options take effect only when this is set to `true`. 
     ##
     ## Uses the latest OpenMetrics V2 implementation for more features and better performance.
     ## Note: To see the configuration options for the OpenMetrics V1 implementation (Agent v7.33 or earlier),
     ## https://github.com/DataDog/integrations-core/blob/7.33.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
     #
   - use_openmetrics: true  # Enables OpenMetrics V2

     ## @param openmetrics_endpoint - string - optional
     ## The URL exposing metrics in the OpenMetrics format.
     #
     openmetrics_endpoint: http://localhost:<PORT>/metrics
   ```

   레거시 구현에 대한 설정 옵션을 보려면 에이전트 v7.34 이전 버전에 대한 [haproxy.d/conf.yaml 샘플][2] 파일을 참조하세요.


3. [에이전트를 재시작][3]하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/7.34.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `haproxy`                                                                               |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                           |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"}` |

##### 쿠버네티스(Kubernetes) 배포 예시

배포를 위해 `.spec.template.metadata` 아래에 포드 주석을 추가합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: haproxy
spec:
  template:
    metadata:
      labels:
        name: haproxy
      annotations:
        ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
        ad.datadoghq.com/haproxy.init_configs: '[{}]'
        ad.datadoghq.com/haproxy.instances: |
          [
            {
              "openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"
            }
          ]
    spec:
      containers:
        - name: haproxy
```

[1]: https://app.datadoghq.com/account/settings/agent/latest
{{% /tab %}}
{{< /tabs >}}


#### 통계 엔드포인트 사용

이 설정 전략은 레거시 사용자를 위한 참조용으로 제공됩니다. 통합을 처음 설정하는 경우 이전 섹션에서 설명한 프로메테우스 기반 전략을 사용하는 것이 좋습니다.

에이전트는 통계 엔드포인트를 사용하여 메트릭을 수집합니다.

1. `haproxy.conf`에서 메트릭을 설정합니다.

   ```conf
     listen stats # Define a listen section called "stats"
     bind :9000 # Listen on localhost:9000
     mode http
     stats enable  # Enable stats page
     stats hide-version  # Hide HAProxy version
     stats realm Haproxy\ Statistics  # Title text for popup window
     stats uri /haproxy_stats  # Stats URI
     stats auth Username:Password  # Authentication credentials
   ```

2. [통계 엔드포인트를 활성화하려면 HAProxy를 다시 시작하세요][9].


{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면,

[메트릭에이전트의 설정 디렉토리][1] 루트의 `conf.d/` 폴더에 있는 `haproxy.d/conf.yaml` 파일을 편집하여 HAProxy [메트릭](#metric-collection) 및 [로그](#log-collection) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [haproxy.d/conf.yaml 샘플][2]을 참조하세요.

##### 메트릭 수집

1. `haproxy.d/conf.yaml` 파일에 설정 블록을 추가하여 [HAProxy 메트릭](#metrics) 수집을 시작하세요.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Haproxy URL to connect to gather metrics.
     ## Set the according <USERNAME> and <PASSWORD> or use directly a unix stats
     ## or admin socket: unix:///var/run/haproxy.sock
     #
     - url: http://localhost/admin?stats
   ```

2. [에이전트를 재시작][3]하세요.

##### 로그 수집

기본적으로 Haproxy는 UDP를 통해 포트 514로 로그를 전송합니다. 에이전트는 이 포트에서 로그를 수신할 수 있지만 1024 미만의 포트 번호에 바인딩하려면 더 높은 권한이 필요합니다. 아래 지침에 따라 설정하세요. 또는 다른 포트를 사용하고 3단계를 건너뛸 수 있습니다.

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. `haproxy.d/conf.yaml` 파일에 설정 블록을 추가하여 Haproxy 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: udp
       port: 514
       service: <SERVICE_NAME>
       source: haproxy
   ```

   `service` 파라미터 값을 변경하고 환경에 맞춰 설정을 변경합니다. 사용 가능한 모든 설정 옵션은 [haproxy.d/conf.yaml 샘플][2]을 참조하세요.

3. `setcap` 명령을 사용하여 포트 514에 대한 액세스 권한을 부여합니다.

    ```bash
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

   `getcap` 명령을 실행하여 설정이 올바른지 확인합니다.

    ```bash
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    예상 결과:
    ```bash
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **참고:** 에이전트를 업그레이드할 때마다 이 `setcap` 명령을 다시 실행합니다.

4. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### 도커(Docker)

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```yaml
LABEL "com.datadoghq.ad.check_names"='["haproxy"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "https://%%host%%/admin?stats"}]''
```

##### 로그 수집

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집][2]을 참고하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### 쿠버네티스(Kubernetes)

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

[자동탐지 통합 템플릿][1]을 애플리케이션 컨테이너의 포드 주석으로 설정합니다. 이외 템플릿은 또한 [파일, configmap, key-value store][2]로 설정할 수 있습니다.

**주석 v1**(Datadog 에이전트 v7.36 이전)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
    ad.datadoghq.com/haproxy.init_configs: '[{}]'
    ad.datadoghq.com/haproxy.instances: |
      [
        {
          "url": "https://%%host%%/admin?stats"
        }
      ]
spec:
  containers:
    - name: haproxy
```

**주석 v2**(Datadog 에이전트 v7.36 이상)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.checks: |
      {
        "haproxy": {
          "init_config": {},
          "instances": [
            {
              "url": "https://%%host%%/admin?stats"
            }
          ]
        }
      }
spec:
  containers:
    - name: haproxy
```

##### 로그 수집

_에이전트 버전 6.0 이상에서 사용 가능_

Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

그런 다음 [로그 통합][4]을 포드 주석으로 설정합니다. 또한 [파일, configmap, 또는 key-value store][5]로 설정할 수 있습니다.

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.logs: '[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: haproxy
```

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"haproxy\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"https://%%host%%/admin?stats\"}]"
    }
  }]
}
```

##### 로그 수집

_에이전트 버전 6.0 이상에서 사용 가능_

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][2]을 참조하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"haproxy\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 상태 하위 명령을 실행][10]하고 점검 섹션에서 `haproxy`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "haproxy" >}}


### 이벤트

HAProxy 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "haproxy" >}}


## 트러블슈팅
### 포트 514 이미 사용 중 오류
syslog를 사용하는 시스템의 에이전트가 포트 514에서 HAProxy 로그를 수신 대기 중인 경우 에이전트 로그에 다음 오류가 나타날 수 있습니다. 
`Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. 

기본적으로 syslog가 포트 514에서 수신 대기 중이기 때문에 이 오류가 발생합니다. 이 오류를 해결하려면 syslog를 사용하지 않도록 설정하거나 로그를 포트 514로 전달하고 에이전트 이 로그를 수신 대기 중인 다른 포트로 전달하도록 HAProxy를 설정할 수 있습니다. 에이전트가 수신 대기하는 포트는 haproxy.d/conf.yaml 파일 [여기][11]에서 정의할 수 있습니다.

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

## 참고 자료

- [모니터링 HAProxy 성능 메트릭][13]
- [HAProxy 수집 방법 메트릭][14]
- [Datadog를 사용해 HAProxy를 모니터링하세요.][15]
- [HA 프록시 멀티 프로세스 설정][16]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/haproxy/images/haproxy-dash.png
[2]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[3]: https://datadoghq.dev/integrations-core/base/openmetrics/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-v6-python-3/?tab=helm#use-python-3-with-datadog-agent-v6
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://github.com/prometheus/haproxy_exporter
[7]: https://docs.datadoghq.com/ko/integrations/guide/prometheus-host-collection/
[8]: https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/
[9]: https://www.haproxy.org/download/1.7/doc/management.txt
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/0e34b3309cc1371095762bfcaf121b0b45a4e263/haproxy/datadog_checks/haproxy/data/conf.yaml.example#L631
[12]: https://docs.datadoghq.com/ko/help/
[13]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[15]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[16]: https://docs.datadoghq.com/ko/integrations/faq/haproxy-multi-process/
---
app_id: haproxy
categories:
- log collection
custom_kind: 통합
description: 요청, 응답, 오류, 제공된 바이트 등 주요 메트릭을 모니터링하세요. more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
  tag: 블로그
  text: HAProxy 성능 메트릭 모니터링
- link: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
  tag: 블로그
  text: HAProxy 메트릭 수집 방법
- link: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
  tag: 블로그
  text: Datadog으로 HAProxy 모니터링
- link: https://docs.datadoghq.com/integrations/faq/haproxy-multi-process/
  tag: 설명서
  text: 다중 프로세스 모드의 HAProxy
integration_version: 8.0.0
media: []
supported_os:
- linux
- windows
- macos
title: HAProxy
---
![HAProxy 기본 제공 Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/haproxy/images/haproxy-dash.png)

## 개요

Datadog에서 HAProxy 활동을 캡처하여 다음을 수행합니다.

- HAProxy 로드 밸런싱 성능을 시각화합니다.
- 서버가 다운되는 시점을 파악합니다.
- HAProxy의 성능을 나머지 애플리케이션과 상호 연결합니다.

## 설정

이 통합은 프로메테우스(Prometheus) 엔드포인트(권장) 또는 소켓 기반 통합에서 통계 엔드포인트(더 이상 사용되지 않음)를 통해 메트릭을 수집할 수 있습니다. 프로메테우스 엔드포인트를 사용하려면 HAProxy 버전 2(엔터프라이즈 버전 1.9rc1) 이상이 필요합니다.

프로메테우스 엔드포인트를 사용하는 경우 버전 4.0.0부터 개방형 메트릭 기반 통합에는 최신 모드(`use_openmetrics`: true)와 레거시 모드(`use_openmetrics`: false 및 `use_prometheus`: true)가 포함되어 있습니다. 최신 기능을 모두 사용하려면 Datadog에서 최신 모드를 활성화할 것을 권장합니다. 자세한 내용은 [개방형 메트릭 기반 통합을 위한 최신 및 레거시 버전 관리](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations)를 참조하세요.

소켓 기반 통합을 사용하려면 `use_openmetrics`와 `use_prometheus`를 모두 false로 설정하고 설정 섹션의 [해당 지침](#using-the-stats-endpoint)을 따르세요.

`use_openmetrics` 옵션은 [OpenMetrics](https://datadoghq.dev/integrations-core/base/openmetrics/) 최신 모드를 사용하며, 메트릭을 수집하려면 Agent v7.35 이상이 필요하거나 Agent v6.35 이상에서 [Python 3](https://docs.datadoghq.com/agent/guide/agent-v6-python-3/?tab=helm#use-python-3-with-datadog-agent-v6)를 활성화해야 합니다. Python 3을 사용할 수 없거나 Agent v7.34 이하를 사용하는 호스트의 경우 OpenMetrics 레거시 모드나 [소켓 기반 레거시 통합](#using-the-stats-endpoint)을 사용하세요.

`[OpenMetrics V1]` 또는 `[OpenMetrics V2]`로 표시된 메트릭은 해당 HAProxy 통합 모드에서만 사용할 수 있습니다. `[OpenMetrics V1 and V2]`로 표시된 메트릭은 두 모드 모두에서 수집됩니다.

### 설치

HAProxy 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 HAProxy 서버에 별도로 설치할 필요가 없습니다.

### 설정

#### 프로메테우스 사용

통합을 설정하는 권장 방법은 HAProxy에서 프로메테우스 엔드포인트를 활성화하는 것입니다. 이 엔드포인트는 버전 2(엔터프라이즈 버전 1.9rc1)부터 HAProxy에 내장되어 있습니다. 이전 버전을 사용하는 경우, [HAProxy Prometheus Exporter](https://github.com/prometheus/haproxy_exporter)를 설정하거나 다음 섹션에 설명된 레거시 소켓 기반 통합을 설정하는 것을 고려하세요.

레거시 OpenMetrics 모드를 최신 모드 대신 사용하려면 `use_openmetrics` 옵션을 `use_prometheus`로 변경하고 `openmetrics_endpoint` 옵션을 `prometheus_url`로 변경하세요. 자세한 내용은 [호스트 설명서의 Prometheus 및 OpenMetrics 메트릭 수집](https://docs.datadoghq.com/integrations/guide/prometheus-host-collection/)을 참조하세요.

#### HAProxy 준비

1. [공식 가이드](https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/)를 참조하여 `haproxy.conf`을 구성합니다. 
1. [HAProxy를 재시작하여 Prometheus 엔드포인트 활성화합니다](https://www.haproxy.org/download/1.7/doc/management.txt).

#### 에이전트 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

##### 메트릭 수집

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. HAProxy 메트릭 수집을 시작하려면 Agent 구성 디렉터리 루트에서 `conf.d/` 폴더에 있는 `haproxy.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example)을 참고하세요.

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

   레거시 구현에 대한 구성 옵션을 보려면 Agent v7.34 이하용 [샘플 haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/7.34.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example) 파일을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://app.datadoghq.com/account/settings/agent/latest)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

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

1. [HAProxy를 재시작하여 통계 엔드포인트 활성화합니다](https://www.haproxy.org/download/1.7/doc/management.txt).

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

HAProxy [메트릭](#metric-collection) 및 [로그](#log-collection) 수집을 시작하려면 [Agent 설정 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트에 있는 `conf.d/` 폴더에서 `haproxy.d/conf.yaml` 파일을 편집합니다. 모든 가용 설정 옵션을 보려면 [샘플 haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example)을 참조하세요.

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

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

기본적으로 Haproxy는 UDP를 통해 포트 514로 로그를 전송합니다. 에이전트는 이 포트에서 로그를 수신할 수 있지만 1024 미만의 포트 번호에 바인딩하려면 더 높은 권한이 필요합니다. 아래 지침에 따라 설정하세요. 또는 다른 포트를 사용하고 3단계를 건너뛸 수 있습니다.

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `haproxy.d/conf.yaml` 파일에 설정 블록을 추가하여 Haproxy 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: udp
       port: 514
       service: <SERVICE_NAME>
       source: haproxy
   ```

   `service` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 모든 가용 설정 옵션은 [샘플 haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example)을 참조하세요.

1. `setcap` 명령을 사용하여 포트 514에 대한 액세스 권한을 부여합니다.

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

   **참고:** Agent를 업그레이드할 때마다 이 `setcap` 명령을 다시 실행합니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### 도커(Docker)

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.check_names"='["haproxy"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "https://%%host%%/admin?stats"}]''
```

##### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes)을 포드 어노테이션으로 설정합니다. 이 외에도 [파일, 구성 맵 또는 키-값 저장소](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration)를 사용하여 템플릿을 구성할 수도 있습니다.

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

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 포드 어노테이션으로 설정합니다. [파일, 구성 맵 또는 키-값 저장소](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration)를 사용하여 구성할 수도 있습니다.

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

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker)을 Docker 레이블로 설정합니다.

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

Datadog Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

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

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `haproxy`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **haproxy.backend.active.servers** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 서버 수.|
| **haproxy.backend.agg.check.status** <br>(gauge) | [OpenMetrics V1 및 V2\] 서버의 상태 확인 현황에 대한 백엔드의 집계 게이지(2.4 버전 이상).|
| **haproxy.backend.agg.server.check.status** <br>(gauge) | [OpenMetrics V1 및 V2\] 서버의 상태 확인 현황에 대한 백엔드의 집계 게이지(지원 중단).|
| **haproxy.backend.agg.server.status** <br>(gauge) | [OpenMetrics V1 및 V2\] 서버의 상태에 대한 백엔드의 집계 게이지(2.4 버전 이상).|
| **haproxy.backend.backup.servers** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 백업 서버 수.|
| **haproxy.backend.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 현재 수신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.backend.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 현재 수신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.backend.bytes.in_rate** <br>(gauge) | \[Legacy\] 백엔드 호스트의 유입 바이트율.<br>_byte로 표시_ |
| **haproxy.backend.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 현재 송신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.backend.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 현재 송신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.backend.bytes.out_rate** <br>(gauge) | \[Legacy\] 백엔드 호스트의 유출 바이트율.<br>_byte로 표시_ |
| **haproxy.backend.check.last.change.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 UP\<->DOWN 전환 이후 경과 시간(초).|
| **haproxy.backend.check.up.down.count** <br>(count) | \[OpenMetrics V2\] 총 UP->DOWN 전환 횟수.|
| **haproxy.backend.check.up.down.total** <br>(count) | \[OpenMetrics V1\] 총 UP->DOWN 전환 횟수.|
| **haproxy.backend.client.aborts.count** <br>(count) | \[OpenMetrics V2\] 클라이언트에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.backend.client.aborts.total** <br>(count) | \[OpenMetrics V1\] 클라이언트에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.backend.connect.time** <br>(gauge) | \[Legacy\] 최근 백엔드 요청 1024건에 대한 평균 연결 시간.<br>_millisecond로 표시_ |
| **haproxy.backend.connect.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 연결 시간.|
| **haproxy.backend.connection.attempts.count** <br>(count) | \[OpenMetrics V2\] 총 연결 설정 시도 횟수.|
| **haproxy.backend.connection.attempts.total** <br>(count) | \[OpenMetrics V1\] 총 연결 설정 시도 횟수.|
| **haproxy.backend.connection.errors.count** <br>(count) | \[OpenMetrics V2\] 총 연결 오류 횟수.|
| **haproxy.backend.connection.errors.total** <br>(count) | \[OpenMetrics V1\] 총 연결 오류 횟수.|
| **haproxy.backend.connection.reuses.count** <br>(count) | \[OpenMetrics V2\] 총 연결 재사용 횟수.|
| **haproxy.backend.connection.reuses.total** <br>(count) | \[OpenMetrics V1\] 총 연결 재사용 횟수.|
| **haproxy.backend.count.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 총 소요 시간.|
| **haproxy.backend.current.queue** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 대기열에 있는 요청 수.|
| **haproxy.backend.current.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 세션 수.|
| **haproxy.backend.denied.req_rate** <br>(gauge) | \[Legacy\] 보안 문제로 인해 거부된 백엔드 요청 수.<br>_request로 표시_ |
| **haproxy.backend.denied.resp_rate** <br>(gauge) | \[Legacy\] 보안 문제로 인해 거부된 백엔드 응답 수.<br>_response로 표시_ |
| **haproxy.backend.downtime.seconds.count** <br>(count) | \[OpenMetrics V2\] 서비스의 총 다운타임(초).|
| **haproxy.backend.downtime.seconds.total** <br>(count) | \[OpenMetrics V1\] 서비스의 총 다운타임(초).|
| **haproxy.backend.errors.con_rate** <br>(gauge) | \[Legacy\] 백엔드 서버에 연결 시도 중 오류가 발생한 백엔드 요청의 비율.<br>_error로 표시_ |
| **haproxy.backend.errors.resp_rate** <br>(gauge) | \[Legacy\] 오류로 인해 백엔드 응답이 중단된 비율<br>_error로 표시_ |
| **haproxy.backend.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] 헤더 재작성 실패 경고의 총 횟수.|
| **haproxy.backend.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] 헤더 재작성 실패 경고의 총 횟수.|
| **haproxy.backend.http.cache.hits.count** <br>(count) | \[OpenMetrics V2\] HTTP 캐시 히트 총 횟수.|
| **haproxy.backend.http.cache.hits.total** <br>(count) | \[OpenMetrics V1\] HTTP 캐시 히트 총 횟수.|
| **haproxy.backend.http.cache.lookups.count** <br>(count) | \[OpenMetrics V2\] HTTP 캐시 총 조회수.|
| **haproxy.backend.http.cache.lookups.total** <br>(count) | \[OpenMetrics V1\] HTTP 캐시 총 조회수.|
| **haproxy.backend.http.comp.bytes.bypassed.count** <br>(count) | \[OpenMetrics V2\] HTTP 컴프레서를 우회한 바이트 총량(CPU/BW 제한).<br>_byte로 표시_ |
| **haproxy.backend.http.comp.bytes.bypassed.total** <br>(count) | \[OpenMetrics V1\] HTTP 컴프레서를 우회한 바이트 총량(CPU/BW 제한).<br>_byte로 표시_ |
| **haproxy.backend.http.comp.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 컴프레셔에 입력된 HTTP 응답 바이트의 총량.<br>_byte로 표시_ |
| **haproxy.backend.http.comp.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 컴프레셔에 입력된 HTTP 응답 바이트의 총량.<br>_byte로 표시_ |
| **haproxy.backend.http.comp.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 컴프레셔에서 출력된 HTTP 응답 바이트의 총량.<br>_byte로 표시_ |
| **haproxy.backend.http.comp.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 컴프레셔에서 출력된 HTTP 응답 바이트의 총량.<br>_byte로 표시_ |
| **haproxy.backend.http.comp.responses.count** <br>(count) | \[OpenMetrics V2\] 압축된 총 HTTP 응답 수.|
| **haproxy.backend.http.comp.responses.total** <br>(count) | \[OpenMetrics V1\] 압축된 총 HTTP 응답 수.|
| **haproxy.backend.http.requests.count** <br>(count) | \[OpenMetrics V2\] 수신한 HTTP 요청의 총 횟수.|
| **haproxy.backend.http.requests.total** <br>(count) | \[OpenMetrics V1\] 수신한 HTTP 요청의 총 횟수.|
| **haproxy.backend.http.responses.count** <br>(count) | \[OpenMetrics V2\] 총 HTTP 응답 수.|
| **haproxy.backend.http.responses.total** <br>(count) | \[OpenMetrics V1\] 총 HTTP 응답 수.|
| **haproxy.backend.internal.errors.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 발생한 내부 오류의 총 횟수(2.2 버전 이상부터).|
| **haproxy.backend.internal.errors.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 발생한 내부 오류의 총 횟수(2.2 버전 이상부터).|
| **haproxy.backend.last.session.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 세션이 서버/백엔드에 할당된 이후부터 경과 시간(초).|
| **haproxy.backend.limit.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 구성된 세션 제한.|
| **haproxy.backend.loadbalanced.count** <br>(count) | \[OpenMetrics V2\] 새 세션 또는 리디스패치 시 서비스를 선택한 총 횟수.|
| **haproxy.backend.loadbalanced.total** <br>(count) | \[OpenMetrics V1\] 새 세션 또는 리디스패치 시 서비스를 선택한 총 횟수.|
| **haproxy.backend.max.connect.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 연결 완료를 기다리는 데 소요된 최대 관측 시간.|
| **haproxy.backend.max.count.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 총 요청+응답 시간(요청+대기열+연결+응답+처리)|
| **haproxy.backend.max.queue** <br>(gauge) | \[OpenMetrics V1 및 V2\] 대기열에 있는 요청의 최대 관측 수.|
| **haproxy.backend.max.queue.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 대기열에서 소요된 최대 관측 시간|
| **haproxy.backend.max.response.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서버 응답을 기다리는 데 소요된 최대 관측 시간|
| **haproxy.backend.max.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 세션 수.|
| **haproxy.backend.max.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 활성 세션 수.|
| **haproxy.backend.max.total.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 총 요청+응답 시간(요청+대기열+연결+응답+처리)|
| **haproxy.backend.queue.current** <br>(gauge) | \[Legacy\] 할당된 백엔드가 없는 백엔드 요청 수.<br>_request로 표시_ |
| **haproxy.backend.queue.time** <br>(gauge) | \[Legacy\] 최근 백엔드 요청 1024건에 대한 평균 대기열 대기 시간.<br>_millisecond로 표시_ |
| **haproxy.backend.queue.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 대기열 대기 시간.|
| **haproxy.backend.redispatch.warnings.count** <br>(count) | \[OpenMetrics V2\] 총 리디스패치 경고 수.|
| **haproxy.backend.redispatch.warnings.total** <br>(count) | \[OpenMetrics V1\] 총 리디스패치 경고 수.|
| **haproxy.backend.requests.denied.count** <br>(count) | \[OpenMetrics V2\] 거절된 요청 총 횟수.|
| **haproxy.backend.requests.denied.total** <br>(count) | \[OpenMetrics V1\] 거절된 요청 총 횟수.|
| **haproxy.backend.requests.tot_rate** <br>(gauge) | \[Legacy\] 백엔드 HTTP 요청의 총 발생률.<br>_request로 표시_ |
| **haproxy.backend.response.1xx** <br>(gauge) | \[Legacy\] 1xx 코드가 포함된 초당 백엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.backend.response.2xx** <br>(gauge) | \[Legacy\] 2xx 코드가 포함된 초당 백엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.backend.response.3xx** <br>(gauge) | \[Legacy\] 3xx 코드가 포함된 초당 백엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.backend.response.4xx** <br>(gauge) | \[Legacy\] 4xx 코드가 포함된 초당 백엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.backend.response.5xx** <br>(gauge) | \[Legacy\] 5xx 코드가 포함된 초당 백엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.backend.response.errors.count** <br>(count) | \[OpenMetrics V2\] 총 응답 오류 수.|
| **haproxy.backend.response.errors.total** <br>(count) | \[OpenMetrics V1\] 총 응답 오류 수.|
| **haproxy.backend.response.other** <br>(gauge) | \[Legacy\] 다른 코드가 포함된 백엔드 HTTP 응답(프로토콜 오류).<br>_response로 표시_ |
| **haproxy.backend.response.time** <br>(gauge) | \[Legacy\] 최근 백엔드 요청 1024건에 대한 평균 응답 시간(TCP의 경우 0).<br>_millisecond로 표시_ |
| **haproxy.backend.response.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 응답 시간.|
| **haproxy.backend.responses.denied.count** <br>(count) | \[OpenMetrics V2\] 거절된 응답 총 횟수.|
| **haproxy.backend.responses.denied.total** <br>(count) | \[OpenMetrics V1\] 거절된 응답 총 횟수.|
| **haproxy.backend.retry.warnings.count** <br>(count) | \[OpenMetrics V2\] 총 재시도 경고 수.|
| **haproxy.backend.retry.warnings.total** <br>(count) | \[OpenMetrics V1\] 총 재시도 경고 수.|
| **haproxy.backend.server.aborts.count** <br>(count) | \[OpenMetrics V2\] 서버에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.backend.server.aborts.total** <br>(count) | \[OpenMetrics V1\] 서버에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.backend.session.current** <br>(gauge) | \[Legacy\] 활성 백엔드 세션 수.<br>_connection으로 표시_ |
| **haproxy.backend.session.limit** <br>(gauge) | \[Legacy\] 설정된 백엔드 세션 제한.<br>_connection으로 표시_ |
| **haproxy.backend.session.pct** <br>(gauge) | \[Legacy\] 사용 중인 세션의 백분율(backend.session.current/backend.session.limit * 100).<br>_percent로 표시_ |
| **haproxy.backend.session.rate** <br>(gauge) | \[Legacy\] 초당 생성되는 백엔드 세션 수.<br>_connection으로 표시_ |
| **haproxy.backend.session.time** <br>(gauge) | \[Legacy\] 최근 요청 1024건에 대한 평균 총 세션 시간.<br>_millisecond로 표시_ |
| **haproxy.backend.sessions.count** <br>(count) | \[OpenMetrics V2\] 세션 총수.|
| **haproxy.backend.sessions.total** <br>(count) | \[OpenMetrics V1\] 세션 총수.|
| **haproxy.backend.status** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서비스의 현재 상태. \<= 2.3: 게이지 값에 따라 상태가 결정됩니다(프론트엔드: 0=STOP, 1=UP, 2=FULL - 백엔드: 0=DOWN, 1=UP - 서버: 0=DOWN, 1=UP, 2=MAINT, 3=DRAIN, 4=NOLB). >= 2.4: 상태 레이블 값에 따라 달라집니다.|
| **haproxy.backend.total.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 총 소요 시간.|
| **haproxy.backend.uptime** <br>(gauge) | \[Legacy\] 마지막 UP\<->DOWN 전환 이후 경과 시간(초)<br>_second로 표시_ |
| **haproxy.backend.uweight** <br>(gauge) | \[OpenMetrics V1 and V2\] 서버의 사용자 가중치 또는 백엔드에 대한 활성 서버의 사용자 가중치 합계(>= 2.4).|
| **haproxy.backend.warnings.redis_rate** <br>(gauge) | \[Legacy\] 요청이 다른 서버로 리디스패치된 횟수.<br>_error로 표시_ |
| **haproxy.backend.warnings.retr_rate** <br>(gauge) | \[Legacy\] 서버 연결 재시도 횟수.<br>error로 표시_ |
| **haproxy.backend.weight** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서비스 가중치.|
| **haproxy.backend_hosts** <br>(gauge) | \[Legacy\] 백엔드 호스트 수.<br>_host로 표시_ |
| **haproxy.count_per_status** <br>(gauge) | \[Legacy\] 상태별 호스트 수(UP/DOWN/NOLB/MAINT).<br>_host로 표시_ |
| **haproxy.frontend.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 현재 수신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.frontend.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 현재 수신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.frontend.bytes.in_rate** <br>(gauge) | \[Legacy\] 프론트엔드 호스트의 유입 바이트율.<br>_byte로 표시_ |
| **haproxy.frontend.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 현재 송신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.frontend.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 현재 송신 바이트의 총량입니다. 기본적으로 Prometheus를 사용하는 경우 카운트로 제출됩니다.<br>_byte로 표시_ |
| **haproxy.frontend.bytes.out_rate** <br>(gauge) | \[Legacy\] 프론트엔드 호스트의 유출 바이트율.<br>_byte로 표시_ |
| **haproxy.frontend.connections.count** <br>(count) | \[OpenMetrics V2\] 총 연결 수.|
| **haproxy.frontend.connections.rate** <br>(gauge) | \[Legacy\] 초당 연결 수.<br>_connection으로 표시_ |
| **haproxy.frontend.connections.rate.max** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 연결 수.|
| **haproxy.frontend.connections.tot_rate** <br>(gauge) | \[Legacy\] 프론트엔드 연결의 총 발생율.<br>_connection로 표시_ |
| **haproxy.frontend.connections.total** <br>(count) | \[OpenMetrics V1\] 총 연결 수.|
| **haproxy.frontend.current.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 세션 수.|
| **haproxy.frontend.denied.connections.count** <br>(count) | \[OpenMetrics V2\] 'tcp-request connection' 규칙에 의해 거부된 총 요청 수.|
| **haproxy.frontend.denied.connections.total** <br>(count) | \[OpenMetrics V1\] 'tcp-request connection' 규칙에 의해 거부된 총 요청 수.|
| **haproxy.frontend.denied.req_rate** <br>(gauge) | \[Legacy\] 보안 문제로 인해 거부된 프런트엔드 요청 수.<br>_request로 표시_ |
| **haproxy.frontend.denied.resp_rate** <br>(gauge) | \[Legacy\] 보안 문제로 인해 거부된 프런트엔드 응답 수.<br>_response로 표시_ |
| **haproxy.frontend.denied.sessions.count** <br>(count) | \[OpenMetrics V2\] 'tcp-request session' 규칙에 의해 거부된 총 요청 수.|
| **haproxy.frontend.denied.sessions.total** <br>(count) | \[OpenMetrics V1\] 'tcp-request session' 규칙에 의해 거부된 총 요청 수.|
| **haproxy.frontend.errors.req_rate** <br>(gauge) | \[Legacy\] 프론트엔드 요청 오류율.<br>_error로 표시_ |
| **haproxy.frontend.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] 헤더 재작성 실패 경고의 총 개수.|
| **haproxy.frontend.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] 헤더 재작성 실패 경고의 총 횟수.|
| **haproxy.frontend.http.cache.hits.count** <br>(count) | \[OpenMetrics V2\] HTTP 캐시 히트 총 횟수.|
| **haproxy.frontend.http.cache.hits.total** <br>(count) | \[OpenMetrics V1\] HTTP 캐시 히트 총 횟수.|
| **haproxy.frontend.http.cache.lookups.count** <br>(count) | \[OpenMetrics V2\] HTTP 캐시 총 조회수.|
| **haproxy.frontend.http.cache.lookups.total** <br>(count) | \[OpenMetrics V1\] HTTP 캐시 총 조회수.|
| **haproxy.frontend.http.comp.bytes.bypassed.count** <br>(count) | \[OpenMetrics V2\] HTTP 컴프레서를 우회한 바이트 총량(CPU/BW 제한).<br>_byte로 표시_ |
| **haproxy.frontend.http.comp.bytes.bypassed.total** <br>(count) | \[OpenMetrics V1\] HTTP 컴프레서를 우회한 바이트 총량(CPU/BW 제한).<br>_byte로 표시_ |
| **haproxy.frontend.http.comp.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 컴프레셔에 전달된 HTTP 응답 바이트의 총량.<br>_byte로 표시됨_ |
| **haproxy.frontend.http.comp.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 컴프레셔에 입력된 HTTP 응답 바이트의 총량.<br>_byte로 표시됨_ |
| **haproxy.frontend.http.comp.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 컴프레셔에서 출력된 HTTP 응답 바이트의 총량.<br>_byte로 표시됨_ |
| **haproxy.frontend.http.comp.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 컴프레셔에서 출력된 HTTP 응답 바이트의 총량.<br>_byte로 표시됨_ |
| **haproxy.frontend.http.comp.responses.count** <br>(count) | \[OpenMetrics V2\] 압축된 총 HTTP 응답 수.|
| **haproxy.frontend.http.comp.responses.total** <br>(count) | \[OpenMetrics V1\] 압축된 총 HTTP 응답 수.|
| **haproxy.frontend.http.requests.count** <br>(count) | \[OpenMetrics V2\] 수신한 HTTP 요청의 총 횟수.|
| **haproxy.frontend.http.requests.rate.max** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 HTTP 요청 수.|
| **haproxy.frontend.http.requests.total** <br>(count) | \[OpenMetrics V1\] 수신한 HTTP 요청의 총 횟수.|
| **haproxy.frontend.http.responses.count** <br>(count) | \[OpenMetrics V2\] 총 HTTP 응답 수.|
| **haproxy.frontend.http.responses.total** <br>(count) | \[OpenMetrics V1\] 총 HTTP 응답 수.|
| **haproxy.frontend.intercepted.requests.count** <br>(count) | \[OpenMetrics V2\] 인터셉트된 총 HTTP 요청 수.|
| **haproxy.frontend.intercepted.requests.total** <br>(count) | \[OpenMetrics V1\] 인터셉트된 총 HTTP 요청 수.|
| **haproxy.frontend.internal.errors.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 총 내부 오류 총수(2.2 버전 이후).|
| **haproxy.frontend.internal.errors.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 총 내부 오류의 총수(2.2 버전 이상).|
| **haproxy.frontend.limit.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초당 새 세션에 설정된 제한.|
| **haproxy.frontend.limit.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 구성된 세션 제한.|
| **haproxy.frontend.max.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 세션 수.|
| **haproxy.frontend.max.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 활성 세션 수.|
| **haproxy.frontend.request.errors.count** <br>(count) | \[OpenMetrics V2\] 총 요청 오류 수.|
| **haproxy.frontend.request.errors.total** <br>(count) | \[OpenMetrics V1\] 총 요청 오류 수.|
| **haproxy.frontend.requests.denied.count** <br>(count) | \[OpenMetrics V2\] 거절된 요청 총 횟수.|
| **haproxy.frontend.requests.denied.total** <br>(count) | \[OpenMetrics V1\] 거절된 요청 총 횟수.|
| **haproxy.frontend.requests.intercepted** <br>(gauge) | \[Legacy\] 초당 인터셉트된 프론트엔드 요청 수.<br>_request로 표시_ |
| **haproxy.frontend.requests.rate** <br>(gauge) | \[Legacy\] 초당 프론트엔드 HTTP 요청 수.<br>_request로 표시_ |
| **haproxy.frontend.requests.tot_rate** <br>(gauge) | \[Legacy\] 프론트엔드 HTTP 요청의 총 발생률.<br>_request로 표시_ |
| **haproxy.frontend.response.1xx** <br>(gauge) | \[Legacy\] 1xx 코드가 포함된 프론트엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.frontend.response.2xx** <br>(gauge) | \[Legacy\] 2xx 코드가 포함된 프론트엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.frontend.response.3xx** <br>(gauge) | \[Legacy\] 3xx 코드가 포함된 프론트엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.frontend.response.4xx** <br>(gauge) | \[Legacy\] 4xx 코드가 포함된 프론트엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.frontend.response.5xx** <br>(gauge) | \[Legacy\] 5xx 코드가 포함된 프론트엔드 HTTP 응답.<br>_response로 표시_ |
| **haproxy.frontend.response.other** <br>(gauge) | \[Legacy\] 다른 코드가 포함된 프론트엔드 HTTP 응답(프로토콜 오류).<br>_response로 표시_ |
| **haproxy.frontend.responses.denied.count** <br>(count) | \[OpenMetrics V2\] 거절된 응답 총 횟수.|
| **haproxy.frontend.responses.denied.total** <br>(count) | \[OpenMetrics V1\] 거절된 응답 총 횟수.|
| **haproxy.frontend.session.current** <br>(gauge) | \[Legacy\] 활성 프론트엔드 세션 수.<br>_connection으로 표시_ |
| **haproxy.frontend.session.limit** <br>(gauge) | \[Legacy\] 설정된 프론트엔드 세션 제한.<br>_connection으로 표시_ |
| **haproxy.frontend.session.pct** <br>(gauge) | \[Legacy\] 사용 중인 세션의 백분율(frontend.session.current/frontend.session.limit * 100).<br>_percent로 표시_ |
| **haproxy.frontend.session.rate** <br>(gauge) | \[Legacy\] 초당 생성되는 프론트엔드 세션 수.<br>_connection으로 표시_ |
| **haproxy.frontend.sessions.count** <br>(count) | \[OpenMetrics V2\] 세션 총수.|
| **haproxy.frontend.sessions.total** <br>(count) | \[OpenMetrics V1\] 세션 총수.|
| **haproxy.frontend.status** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서비스의 현재 상태. \<= 2.3: 게이지 값에 따라 상태가 결정됩니다(프론트엔드: 0=STOP, 1=UP, 2=FULL - 백엔드: 0=DOWN, 1=UP - 서버: 0=DOWN, 1=UP, 2=MAINT, 3=DRAIN, 4=NOLB). >= 2.4: 상태 레이블 값에 따라 달라집니다.|
| **haproxy.listener.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 요청 바이트의 총량(>= 2.4).|
| **haproxy.listener.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 요청 바이트의 총량(>= 2.4).|
| **haproxy.listener.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 응답 바이트의 총량(>= 2.4).|
| **haproxy.listener.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 응답 바이트의 총량(>= 2.4).|
| **haproxy.listener.current.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프론트엔드, 백엔드 또는 서버의 현재 세션 수(>= 2.4).|
| **haproxy.listener.denied.connections.count** <br>(count) | \[OpenMetrics V2\] 작업자 프로세스가 시작된 이후 tcp-request connection 규칙에 의해 리스너/프론트엔드에서 차단된 수신 연결의 총 횟수(>= 2.4).|
| **haproxy.listener.denied.connections.total** <br>(count) | \[OpenMetrics V1\] 작업자 프로세스가 시작된 이후 tcp-request connection 규칙에 의해 리스너/프론트엔드에서 차단된 수신 연결의 총 횟수(>= 2.4).|
| **haproxy.listener.denied.sessions.count** <br>(count) | \[OpenMetrics V2\] 작업자 프로세스가 시작된 이후 tcp-request connection 규칙에 의해 리스너/프론트엔드에서 차단된 수신 세션의 총 횟수|
| **haproxy.listener.denied.sessions.total** <br>(count) | \[OpenMetrics V1\] 작업자 프로세스가 시작된 이후 tcp-request connection 규칙에 의해 리스너/프론트엔드에서 차단된 수신 세션의 총 횟수|
| **haproxy.listener.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] 작업자 프로세스 시작 이후 실패한 HTTP 헤더 재작성의 총 횟수(>= 2.4).|
| **haproxy.listener.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] 작업자 프로세스 시작 이후 실패한 HTTP 헤더 재작성의 총 횟수(>= 2.4).|
| **haproxy.listener.internal.errors.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 발생한 내부 오류의 총 횟수(>= 2.4).|
| **haproxy.listener.internal.errors.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 발생한 내부 오류의 총 횟수(>= 2.4).|
| **haproxy.listener.limit.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프론트엔드/리스너/서버의 maxconn, 백엔드의 fullconn(>= 2.4).|
| **haproxy.listener.max.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 프로세스 시작 이후 발생한 현재 세션의 최고값(>= 2.4).|
| **haproxy.listener.request.errors.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 발생한 잘못된 요청의 총 횟수(>= 2.4).|
| **haproxy.listener.request.errors.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 발생한 잘못된 요청의 총 횟수(>= 2.4).|
| **haproxy.listener.requests.denied.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 거부된 요청의 총 횟수(>= 2.4).|
| **haproxy.listener.requests.denied.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 거부된 요청의 총 횟수(>= 2.4).|
| **haproxy.listener.responses.denied.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 거부된 응답의 총 횟수(>= 2.4).|
| **haproxy.listener.responses.denied.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 거부된 응답의 총 횟수(>= 2.4).|
| **haproxy.listener.sessions.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 생성된 세션의 총수(>= 2.4).|
| **haproxy.listener.sessions.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 생성된 세션의 총수(>= 2.4).|
| **haproxy.listener.status** <br>(gauge) | \[OpenMetrics V1 및 V2\] 상태 레이블 값별 서비스의 현재 상태(>= 2.4).|
| **haproxy.process.active.peers** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 피어 수.|
| **haproxy.process.build_info** <br>(gauge) | \[OpenMetrics V1 및 V2\] 빌드 정보.|
| **haproxy.process.busy.polling.enabled** <br>(gauge) | \[OpenMetrics V1 and V2\] 비지 폴링(busy polling) 이 활성화된 경우 0이 아닌 값.|
| **haproxy.process.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 현재 작업자 프로세스 시작 이후 전송한 총 바이트 수(>= 2.3).|
| **haproxy.process.bytes.out.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 직전 1초간 현재 작업자 프로세스가 전송한 바이트 수(>= 2.3).|
| **haproxy.process.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 현재 작업자 프로세스 시작 이후 전송한 총 바이트 수(>= 2.3).|
| **haproxy.process.connected.peers** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 연결된 피어 수.|
| **haproxy.process.connections.count** <br>(count) | \[OpenMetrics V2\] 생성된 세션 총수.|
| **haproxy.process.connections.total** <br>(count) | \[OpenMetrics V1\] 생성된 세션 총수.|
| **haproxy.process.current.backend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 직전 1초간 현재 백엔드 SSL키 연산량(초당).|
| **haproxy.process.current.connection.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 직전 1초간 현재 연결 수(초당).|
| **haproxy.process.current.connections** <br>(gauge) | \[OpenMetrics V1 및 V2\] 활성 세션 수.|
| **haproxy.process.current.frontend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 직전 1초간 현재 프론트엔드 SSL키 연산량(초당).|
| **haproxy.process.current.run.queue** <br>(gauge) | \[OpenMetrics V1 및 V2\] 실행 대기열의 현재 작업 수.|
| **haproxy.process.current.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 직전 1초간 현재 세션 수(초당).|
| **haproxy.process.current.ssl.connections** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열린 SSL 연결 수.|
| **haproxy.process.current.ssl.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 직전 1초간 현재 SSL 세션 수(초당).|
| **haproxy.process.current.tasks** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 작업 수.|
| **haproxy.process.current.zlib.memory** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 zlib에 사용된 메모리(바이트). 2.4 버전 이상부터 zlib는 더 이상 기본값이 아님.|
| **haproxy.process.dropped.logs.count** <br>(count) | \[OpenMetrics V2\] 드롭된 로그의 총수.|
| **haproxy.process.dropped.logs.total** <br>(count) | \[OpenMetrics V1\] 드롭된 로그의 총수.|
| **haproxy.process.failed.resolutions** <br>(count) | \[OpenMetrics V1\] 현재 작업자 프로세스 시작 이후 실패한 DNS 해석 총 횟수(>= 2.3).|
| **haproxy.process.failed.resolutions.count** <br>(count) | \[OpenMetrics V2\] 현재 작업자 프로세스 시작 이후 실패한 DNS 해석 총 횟수(>= 2.3).|
| **haproxy.process.frontend.ssl.reuse** <br>(gauge) | \[OpenMetrics V1 및 V2\] SSL 세션 재사용률(퍼센트).|
| **haproxy.process.hard.max.connections** <br>(gauge) | \[OpenMetrics V1 및 V2\] 초기 최대 동시 연결 수.|
| **haproxy.process.http.comp.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 직전 1초간 HTTP 압축 전 초당 바이트 수.<br>_byte로 표시_ |
| **haproxy.process.http.comp.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 직전 1초간 HTTP 압축 전 초당 바이트 수.<br>_byte로 표시_ |
| **haproxy.process.http.comp.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 직전 1초간 HTTP 압축 후 초당 바이트 수.<br>_byte로 표시_ |
| **haproxy.process.http.comp.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 직전 1초간 HTTP 압축 후 초당 바이트 수.<br>_byte로 표시_ |
| **haproxy.process.idle.time.percent** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 샘플의 전체 대비 총 유휴 비율(퍼센트).|
| **haproxy.process.jobs** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 작업 수(리스너, 세션, 열린 장치).|
| **haproxy.process.limit.connection.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 초당 최대 연결 수.|
| **haproxy.process.limit.http.comp** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 최대 입력 압축률(바이트).|
| **haproxy.process.limit.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 초당 최대 세션 수.|
| **haproxy.process.limit.ssl.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 초당 최대 SSL 세션 수.|
| **haproxy.process.listeners** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 리스너 수.|
| **haproxy.process.max.backend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 백엔드 SSL 키 연산량.|
| **haproxy.process.max.connection.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 연결 수.|
| **haproxy.process.max.connections** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최대 동시 연결 수.|
| **haproxy.process.max.fds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 열린 파일 디스크립터의 최대 수. 0=unset.|
| **haproxy.process.max.frontend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 프론트엔드 SSL 키 연산량.|
| **haproxy.process.max.memory.bytes** <br>(gauge) | \[OpenMetrics V1 and V2\] 프로세스당 메모리 제한(바이트). 0=unset.|
| **haproxy.process.max.pipes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 파이프 최대 수.|
| **haproxy.process.max.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 세션 수.|
| **haproxy.process.max.sockets** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최대 오픈 소켓 수.|
| **haproxy.process.max.ssl.connections** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 최대 동시 SSL 연결 수.|
| **haproxy.process.max.ssl.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 SSL 세션 수.|
| **haproxy.process.max.zlib.memory** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 zlib 최대 메모리 양(바이트). 2.4 버전 이상부터 zlib는 더 이상 기본값이 아님.|
| **haproxy.process.nbproc** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 프로세서 수.|
| **haproxy.process.nbthread** <br>(gauge) | \[OpenMetrics V1 및 V2\] 설정된 스레드 수.|
| **haproxy.process.pipes.free.count** <br>(count) | \[OpenMetrics V2\] 미사용 파이프 수.|
| **haproxy.process.pipes.free.total** <br>(count) | \[OpenMetrics V1\] 미사용 파이프 수.|
| **haproxy.process.pipes.used.count** <br>(count) | \[OpenMetrics V2\] 사용 중인 파이프 수.|
| **haproxy.process.pipes.used.total** <br>(count) | \[OpenMetrics V1\] 사용 중인 파이프 수.|
| **haproxy.process.pool.allocated.bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 풀에 할당된 총 메모리 양(바이트).|
| **haproxy.process.pool.failures.count** <br>(count) | \[OpenMetrics V2\] 실패한 풀 할당의 총 횟수.|
| **haproxy.process.pool.failures.total** <br>(count) | \[OpenMetrics V1\] 실패한 풀 할당의 총 횟수.|
| **haproxy.process.pool.used.bytes** <br>(gauge) | \[OpenMetrics V1 및 V2\] 풀에서 사용 중인 총 메모리 양(바이트).|
| **haproxy.process.recv.logs.count** <br>(count) | \[OpenMetrics V2\] 이 작업 프로세스 시작 후 로그 포워딩 리스너가 수신한 총 로그 메시지 수(>= 2.4).|
| **haproxy.process.recv.logs.total** <br>(count) | \[OpenMetrics V1\] 이 작업 프로세스 시작 후 로그 포워딩 리스너가 수신한 총 로그 메시지 수(>= 2.4).|
| **haproxy.process.relative.process.id** <br>(gauge) | \[OpenMetrics V1 and V2\] 1부터 시작하는 상대 프로세스 ID.|
| **haproxy.process.requests.count** <br>(count) | \[OpenMetrics V2\] 총 요청 수(TCP 또는 HTTP).|
| **haproxy.process.requests.total** <br>(count) | \[OpenMetrics V1\] 총 요청 수(TCP 또는 HTTP).|
| **haproxy.process.spliced.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 현재 작업자 프로세스 시작 이후 커널 파이프를 통해 전송한 총 바이트 수(>= 2.3).|
| **haproxy.process.spliced.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 현재 작업자 프로세스 시작 이후 커널 파이프를 통해 전송한 총 바이트 수(>= 2.3).|
| **haproxy.process.ssl.cache.lookups.count** <br>(count) | \[OpenMetrics V2\] SSL 세션 캐시 총 조회수.|
| **haproxy.process.ssl.cache.lookups.total** <br>(count) | \[OpenMetrics V1\] SSL 세션 캐시 총 조회수.|
| **haproxy.process.ssl.cache.misses.count** <br>(count) | \[OpenMetrics V2\] SSL 세션 캐시 미스 총 횟수.|
| **haproxy.process.ssl.cache.misses.total** <br>(count) | \[OpenMetrics V1\] SSL 세션 캐시 미스 총 횟수.|
| **haproxy.process.ssl.connections.count** <br>(count) | \[OpenMetrics V2\] 열린 SSL 연결 총 횟수.|
| **haproxy.process.ssl.connections.total** <br>(count) | \[OpenMetrics V1\] 열린 SSL 연결 총 횟수.|
| **haproxy.process.start.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 시작 시간(초).|
| **haproxy.process.stopping** <br>(gauge) | \[OpenMetrics V1 및 V2\] 0이 아니면 종료 작업이 진행 중임을 뜻합니다.|
| **haproxy.process.unstoppable.jobs** <br>(gauge) | \[OpenMetrics V1 및 V2\] 소프트 종료(soft stop) 도중 종료할 수 없는 현재 활성 작업 수.|
| **haproxy.process.uptime.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 이 작업자 프로세스 시작 후 경과된 시간(>= 2.4).|
| **haproxy.server.bytes.in.count** <br>(count) | \[OpenMetrics V2\] 현재 수신 바이트 총량.<br>_byte로 표시_ |
| **haproxy.server.bytes.in.total** <br>(count) | \[OpenMetrics V1\] 현재 수신 바이트 총량.<br>_byte로 표시_ |
| **haproxy.server.bytes.out.count** <br>(count) | \[OpenMetrics V2\] 현재 송신 바이트 총량.<br>_byte로 표시_ |
| **haproxy.server.bytes.out.total** <br>(count) | \[OpenMetrics V1\] 현재 송신 바이트 총량.<br>_byte로 표시_ |
| **haproxy.server.check.code** <br>(gauge) | \[OpenMetrics V1 and V2\] 계층 5-7 코드. 마지막 상태 점검에서 사용 가능한 경우. (>= 2.0)|
| **haproxy.server.check.duration.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 이전에 실행한 서비스 점검 시간(>= 2.0)<br>_second로 표시_ |
| **haproxy.server.check.failures.count** <br>(count) | \[OpenMetrics V2\] 총 검사 실패 횟수(서버가 동작 중일 때만 검사 실패 횟수 계산).|
| **haproxy.server.check.failures.total** <br>(count) | \[OpenMetrics V1\] 총 검사 실패 횟수(서버가 동작 중일 때만 검사 실패 횟수 계산).|
| **haproxy.server.check.last.change.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 UP\<->DOWN 전환 이후 경과 시간(초). (>= 2.0)<br>_second로 표시_ |
| **haproxy.server.check.status** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 서비스 점검 상태(활성화된 경우). \<= 2.3: haproxy 문서의 HCHK_STATUS\_\* 값을 따름. >= 2.4: 상태 레이블 값을 따름.|
| **haproxy.server.check.up.down.count** <br>(count) | \[OpenMetrics V2\] 총 UP->DOWN 전환 횟수.|
| **haproxy.server.check.up.down.total** <br>(count) | \[OpenMetrics V1\] 총 UP->DOWN 전환 횟수.|
| **haproxy.server.client.aborts.count** <br>(count) | \[OpenMetrics V2\] 클라이언트에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.server.client.aborts.total** <br>(count) | \[OpenMetrics V1\] 클라이언트에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.server.connect.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 1024건의 성공한 연결의 평균 연결 시간.|
| **haproxy.server.connection.attempts.count** <br>(count) | [\OpenMetrics V2\] 총 연결 설정 시도 횟수.|
| **haproxy.server.connection.attempts.total** <br>(count) | [\OpenMetrics V1\] 총 연결 설정 시도 횟수.|
| **haproxy.server.connection.errors.count** <br>(count) | \[OpenMetrics V2\] 총 연결 오류 횟수.|
| **haproxy.server.connection.errors.total** <br>(count) | \[OpenMetrics V1\] 총 연결 오류 횟수.|
| **haproxy.server.connection.reuses.count** <br>(count) | \[OpenMetrics V2\] 총 연결 재사용 횟수.|
| **haproxy.server.connection.reuses.total** <br>(count) | \[OpenMetrics V1\] 총 연결 재사용 횟수.|
| **haproxy.server.current.queue** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 대기열에 있는 요청 수.|
| **haproxy.server.current.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 활성 세션 수.|
| **haproxy.server.current.throttle** <br>(gauge) | \[OpenMetrics V1 및 V2\] 슬로우스타트가 활성화된 경우 서버의 현재 스로틀 백분율. 슬로우스타트가 아닌 경우 값 없음.|
| **haproxy.server.downtime.seconds.count** <br>(count) | \[OpenMetrics V2\] 서비스의 총 다운타임(초).|
| **haproxy.server.downtime.seconds.total** <br>(count) | \[OpenMetrics V1\] 서비스의 총 다운타임(초).|
| **haproxy.server.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] 헤더 재작성 실패 경고의 총 개수.|
| **haproxy.server.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] 헤더 재작성 실패 경고의 총 횟수.|
| **haproxy.server.http.responses.count** <br>(count) | \[OpenMetrics V2\] 총 HTTP 응답 수.|
| **haproxy.server.http.responses.total** <br>(count) | \[OpenMetrics V1\] 총 HTTP 응답 수.|
| **haproxy.server.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 및 V2\] 재사용할 수 있는 현재 유휴 연결 수.|
| **haproxy.server.idle.connections.limit** <br>(gauge) | \[OpenMetrics V1 및 V2\] 사용 가능한 유휴 연결 수 제한.|
| **haproxy.server.internal.errors.count** <br>(count) | \[OpenMetrics V2\] 프로세스 시작 이후 총 내부 오류 총수(2.2 버전 이후).|
| **haproxy.server.internal.errors.total** <br>(count) | \[OpenMetrics V1\] 프로세스 시작 이후 총 내부 오류의 총수(2.2 버전 이상).|
| **haproxy.server.last.session.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 마지막 세션이 서버/백엔드에 할당된 이후부터 경과 시간(초).|
| **haproxy.server.limit.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 구성된 세션 제한.|
| **haproxy.server.loadbalanced.count** <br>(count) | \[OpenMetrics V2\] 새 세션 또는 리디스패치 시 서비스를 선택한 총 횟수.|
| **haproxy.server.loadbalanced.total** <br>(count) | \[OpenMetrics V1\] 새 세션 또는 리디스패치 시 서비스를 선택한 총 횟수.|
| **haproxy.server.max.connect.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 연결 완료를 기다리는 데 소요되는 최대 관측 시간|
| **haproxy.server.max.count.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 총 요청+응답 시간(요청+대기열+연결+응답+처리)|
| **haproxy.server.max.queue** <br>(gauge) | \[OpenMetrics V1 및 V2\] 대기열에 있는 요청의 최대 관측 수.|
| **haproxy.server.max.queue.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 대기열에서 소요된 최대 관측 시간|
| **haproxy.server.max.response.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서버 응답을 기다리는 데 소요된 최대 관측 시간|
| **haproxy.server.max.session.rate** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 초당 최대 세션 수.|
| **haproxy.server.max.sessions** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 활성 세션 수.|
| **haproxy.server.max.total.time.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 관측된 최대 총 요청+응답 시간(요청+대기열+연결+응답+처리)|
| **haproxy.server.need.connections.current** <br>(gauge) | \[OpenMetrics V1 및 V2\] 예상 필요 연결 수(>= 2.3).|
| **haproxy.server.queue.limit** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서버에 설정된 최대 대기열(0은 제한 없음을 뜻함).|
| **haproxy.server.queue.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 대기열 대기 시간.|
| **haproxy.server.redispatch.warnings.count** <br>(count) | \OpenMetrics V2\] 총 리디스패치 경고 수.|
| **haproxy.server.redispatch.warnings.total** <br>(count) | \[OpenMetrics V1\] 총 리디스패치 경고 수.|
| **haproxy.server.response.errors.count** <br>(count) | \[OpenMetrics V2\] 총 응답 오류 수.|
| **haproxy.server.response.errors.total** <br>(count) | \[OpenMetrics V1\] 총 응답 오류 수.|
| **haproxy.server.response.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 응답 시간.|
| **haproxy.server.responses.denied.count** <br>(count) | \[OpenMetrics V2\] 거절된 응답 총 횟수.|
| **haproxy.server.responses.denied.total** <br>(count) | \[OpenMetrics V1\] 거절된 응답 총 횟수.|
| **haproxy.server.retry.warnings.count** <br>(count) | \[OpenMetrics V2\] 총 재시도 경고 수.|
| **haproxy.server.retry.warnings.total** <br>(count) | \[OpenMetrics V1\] 총 재시도 경고 수.|
| **haproxy.server.safe.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 안전 유휴 연결 수(>= 2.3).|
| **haproxy.server.server.aborts.count** <br>(count) | \[OpenMetrics V2\] 서버에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.server.server.aborts.total** <br>(count) | \[OpenMetrics V1\] 서버에 의해 중단된 총 데이터 전송 횟수.|
| **haproxy.server.server.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 및 V2\] 재사용할 수 있는 현재 유휴 연결 수|
| **haproxy.server.server.idle.connections.limit** <br>(gauge) | \[OpenMetrics V1 및 V2\] 사용 가능한 유휴 연결 수 제한|
| **haproxy.server.sessions.count** <br>(count) | \[OpenMetrics V2\] 세션 총수.|
| **haproxy.server.sessions.total** <br>(count) | \[OpenMetrics V1\] 세션 총수.|
| **haproxy.server.status** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서비스의 현재 상태. \<= 2.3: 게이지 값에 따라 상태가 결정됩니다(프론트엔드: 0=STOP, 1=UP, 2=FULL - 백엔드: 0=DOWN, 1=UP - 서버: 0=DOWN, 1=UP, 2=MAINT, 3=DRAIN, 4=NOLB). >= 2.4: 상태 레이블 값에 따라 달라집니다.|
| **haproxy.server.total.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 및 V2\] 최근 성공한 연결 1024건의 평균 총 소요 시간.|
| **haproxy.server.unsafe.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 안전하지 않은 유휴 연결 수(>= 2.3).|
| **haproxy.server.used.connections.current** <br>(gauge) | \[OpenMetrics V1 및 V2\] 현재 사용 중인 연결 수(>= 2.3).|
| **haproxy.server.uweight** <br>(gauge) | \[OpenMetrics V1 and V2\] 서버의 사용자 가중치 또는 백엔드 활성 서버의 사용자 가중치 합계(>= 2.4).|
| **haproxy.server.weight** <br>(gauge) | \[OpenMetrics V1 및 V2\] 서비스 가중치.|
| **haproxy.sticktable.size** <br>(gauge) | \[OpenMetrics V1 및 V2\] 테이블에 포함할 수 있는 최대 요소 수(\<= 2.3: Unix 소켓을 통해, >= 2.4: Prometheus를 통해).|
| **haproxy.sticktable.used** <br>(gauge) | \[OpenMetrics V1 및 V2\] 테이블의 요소 수(\<= 2.3: Unix 소켓을 통해, >= 2.4: Prometheus를 통해).|

### 이벤트

HAProxy 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**haproxy.backend_up**

HAProxy 상태 Page를 서비스 점검으로 변환합니다. HAProxy가 특정 서비스를 `down`으로 보고하는 경우 `CRITICAL`를 반환합니다. `maint`, `ok`, 그 외의 상태는 `OK`를 반환합니다.

_상태: ok, critical, unknown_

**haproxy.openmetrics.health**

Agent가 OpenMetrics 엔드포인트에 연결할 수 없는 경우 `CRITICAL`를 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

### 포트 514 이미 사용 중 오류

syslog를 사용하는 시스템의 Agent가 포트 514에서 HAProxy 로그를 수신 대기 중인 경우 Agent 로그에 다음 오류가 나타날 수 있습니다. 
`Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`. 

기본적으로 syslog가 포트 514에서 수신 대기 중이기 때문에 이 오류가 발생합니다. 이 오류를 해결하려면 syslog를 사용하지 않도록 설정하거나, 로그를 포트 514 및 Agent가 로그를 수신 대기 중인 다른 포트로 전달하도록 HAProxy를 설정할 수 있습니다. Agent가 수신 대기하는 포트는 haproxy.d/conf.yaml 파일 [여기](https://github.com/DataDog/integrations-core/blob/0e34b3309cc1371095762bfcaf121b0b45a4e263/haproxy/datadog_checks/haproxy/data/conf.yaml.example#L631)에서 정의할 수 있습니다.

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [HAProxy 성능 메트릭 모니터링](https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics)
- [HAProxy 메트릭 수집 방법](https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics)
- [Datadog으로 HAProxy 모니터링하기](https://www.datadoghq.com/blog/monitor-haproxy-with-datadog)
- [HAProxy 멀티 프로세스 구성](https://docs.datadoghq.com/integrations/faq/haproxy-multi-process/)
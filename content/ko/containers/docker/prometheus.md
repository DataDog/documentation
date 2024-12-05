---
aliases:
- /ko/agent/docker/prometheus
further_reading:
- link: /agent/docker/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/docker/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/docker/integrations/
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/docker/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: 도커 Prometheus 및 OpenMetrics 메트릭 수집
---

Datadog 에이전트와 [Datadog-OpenMetrics][1] 또는 [Datadog-Prometheus][2] 통합을 사용하여 컨테이너 내부의 애플리케이션에서 노출된 Prometheus 및 OpenMetrics 메트릭을 수집하세요.

## 개요

버전 6.5.0부터 에이전트에 Prometheus 엔드포인트를 스크래핑할 수 있는 [OpenMetrics][3] 및 [Prometheus][4] 검사가 포함되어 있습니다. Datadog은 더 효율적이고 Prometheus 텍스트 형식을 완벽하게 지원하는 OpenMetrics 검사를 사용할 것을 권장합니다. 사용자 지정 검사 작성 등 `OpenMetricsCheck` 인터페이스의 고급 사용법은 [개발자 도구][5] 섹션을 참조하세요. 또한, 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 Prometheus 검사를 사용하세요.

이 페이지에서는 이러한 검사의 기본 사용법을 설명하며, 이를 통해 Datadog 내에 노출된 모든 Prometheus 메트릭을 가져올 수 있습니다.

이 페이지에 있는 CLI 명령은 도커 런타임에 대한 것입니다. 컨테이너화된 런타임인 경우 `docker`를 `nerdctl`로 대체하며, 포드맨 런타임의 경우 `podman`으로 대체합니다.

## 설정

### 설치

아래 명령에서 `<DATADOG_API_KEY>`를 조직의 API 키로 대체하여 다른 컨테이너 옆에 있는 도커 에이전트를 시작합니다:

{{< tabs >}}
{{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version < 2" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

 **참고**: Datadog 사이트는 {{< region-param key="dd_site" code="true" >}} 입니다.

### 설정

에이전트는 도커에서 실행 중인지를 감지하고 모든 컨테이너 라벨에서 Datadog-OpenMetrics 라벨을 자동으로 검색합니다. 자동 탐지는 파일 유형에 따라 다음의 라벨 형식을 예상합니다:

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

#### 다중 엔드포인트 예시

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

**다중 엔드포인트 예시**:

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics", "openmetrics"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      },
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

{{% /tab %}}
{{% tab "Docker run command" %}}

```shell
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

**다중 엔드포인트 예시**:

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

다음 설정 플레이스홀더 값을 사용합니다:

| 플레이스홀더             | 설명                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | Prometeus 엔드포인트에 액세스하기 위해 연결할 포트입니다. [자동 탐지 템플릿 변수][6] `%%port%%`를 사용할 수도 있습니다. |
| `<PROMETHEUS_ENDPOINT>` | Prometheus 형식으로 컨테이너에서 제공하는 메트릭의 URL 경로입니다.                                                                    |
| `<NAMESPACE>`           | Datadog에서 볼 때 모든 메트릭에 접두사가 붙도록 네임스페이스를 설정합니다.                                                                      |
| `<METRIC_TO_FETCH>`     | Prometheus 엔드포인트에서 가져올 Prometheus 메트릭 키입니다.                                                                        |
| `<NEW_METRIC_NAME>`     | Datadog에서 `<METRIC_TO_FETCH>` 메트릭 키를  `<NEW_METRIC_NAME>`로 변환합니다.                                                          |


`metrics` 설정은 사용자 지정 메트릭으로 검색할 메트릭 목록입니다. 가져올 각 메트릭과 원하는 메트릭 이름을 `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`와 같이 키-값 쌍으로 Datadog에서 포함합니다. 또는 정규식으로 해석된 메트릭 이름 문자열 목록을 제공하여 원하는 메트릭을 현재 이름으로 가져올 수도 있습니다. **참고: 정규식은 잠재적으로 많은 사용자 지정 메트릭을 전송할 수 있습니다.

`namespace` 및 `metrics`를 포함하여 인스턴스에 사용할 수 있는 매개 변수 전체 목록은 [sample configuration openmetrics.d/conf.yaml][7]을 참조하세요.

## 시작하기

### 단순 메트릭 수집

컨테이너 내부에서 작동 중인 Prometheus가 노출한 메트릭 수집을 시작하려면 다음 단계를 실행하세요:

1. Datadog 에이전트 시작:
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. OpenMetrics 검사용 자동 탐지 라벨을 사용해 에이전트가 수집할 예제 메트릭을 노출하는 Prometheus 컨테이너를 시작합니다.

   다음 라벨을 사용해 에이전트가 `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight`, 그리고  `go_memory`로 시작하는 모든 노출된 메트릭을 수집하도록 합니다.

    ```yaml
    labels:
      com.datadoghq.ad.check_names: '["openmetrics"]'
      com.datadoghq.ad.init_configs: '[{}]'
      com.datadoghq.ad.instances:  |
        [
          {
            "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
            "namespace": "documentation_example_docker",
            "metrics": [
              {"promhttp_metric_handler_requests": "handler.requests"},
              {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
              "go_memory.*"
            ]
          }
        ]
    ```
   이 라벨과 함께 Prometeus 컨테이너 예제를 시작하려면 다음을 실행합니다:

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. [메트릭 요약][8] 페이지로 이동하여 수집된 메트릭을 확인합니다:

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Prometheus metric collected docker">}}

## 사용자 지정에서 공식 통합까지

기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 사용자 지정 메트릭으로 간주됩니다. 기성 소프트웨어를 모니터링하면서 공식 통합이 필요하다고 생각되면 주저하지 마시고 [참여][5]해 주세요!

공식 통합에는 전용 디렉토리가 있습니다. 일반 검사에는 기본 설정 및 메트릭 메타데이터를 하드코딩하는 기본 인스턴스 메커니즘이 있습니다. 예를 들어, [kube-proxy][9] 통합을 참조하세요.



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/openmetrics/
[2]: /ko/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ko/developers/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/ko/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/summary
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy

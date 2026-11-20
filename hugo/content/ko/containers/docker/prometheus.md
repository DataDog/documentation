---
aliases:
- /ko/agent/docker/prometheus
description: Datadog Agent를 사용하여 컨테이너화된 Docker 애플리케이션에서 Prometheus 및 OpenMetrics 메트릭
  수집
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
title: Docker Prometheus 및 OpenMetrics 메트릭 수집
---
Datadog Agent와 [Datadog-OpenMetrics][1] 또는 [Datadog-Prometheus][2] 통합을 사용하여 사용자의 컨테이너 내부에서 실행 중인 애플리케이션에서 노출된 Prometheus 및 OpenMetrics 메트릭을 수집합니다.

## 개요 {#overview}

버전 6.5.0부터 Agent에 Prometheus 엔드포인트를 스크레이핑할 수 있는 [OpenMetrics][3] 및 [Prometheus][4] 검사가 포함됩니다. OpenMetrics 검사가 더 효율적이고 Prometheus 텍스트 형식을 완전히 지원하기 때문에 OpenMetrics 검사를 사용하는 것이 좋습니다. 사용자 지정 검사 작성을 비롯한 `OpenMetricsCheck` 인터페이스의 고급 사용법을 자세히 알아보려면 [개발자 도구][5] 섹션을 참조하세요. Prometheus 검사는 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 사용하세요.

이 페이지에서는 이러한 검사의 기본 사용법을 설명합니다. 따라서 Datadog 내에서 모든 Prometheus 노출 메트릭을 가져올 수 있습니다.

이 페이지의 CLI 명령은 Docker 런타임 기준입니다. containerd 런타임의 경우 `docker`를 `nerdctl`로 바꾸고, Podman 런타임의 경우 `podman`으로 바꾸세요.

## 설정 {#setup}

### 설치 {#installation}

아래 명령에서 `<DATADOG_API_KEY>`를 조직의 API 키로 바꾸고 Docker Agent를 다른 컨테이너와 함께 실행하세요.

{{< tabs >}}
{{% tab "표준" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux 버전 2 미만" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**참고**: Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

### 구성 {#configuration}

Agent는 Docker에서 실행 중인지 탐지하고 모든 컨테이너 레이블에서 Datadog-OpenMetrics 레이블을 자동으로 검색합니다. Autodiscovery에서 요구하는 레이블 형식은 파일 유형에 따라 다음 예시와 같습니다.

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

#### 다중 엔드포인트 예시 {#multiple-endpoints-example}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}, {"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
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
{{% tab "Docker run 명령" %}}

```shell
# single metric
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**`com.datadoghq.ad.instances`**에서 사용하는 메트릭 형식의 예시

```shell
# multiple metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}, {\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

```shell
# all metrics of a base type
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\"<METRIC_BASE_TO_FETCH>.*\"]}]"
```

```shell
# all metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\".*\"]}]"
```

**다중 엔드포인트 예시**:

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

다음 자리 표시자 설정 값을 사용합니다.

| 자리 표시자             | 설명                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | Prometheus 엔드포인트에 액세스하기 위해 연결할 포트입니다. 또는 [Autodiscovery 템플릿 변수][6] `%%port%%`를 사용할 수 있습니다. |
| `<PROMETHEUS_ENDPOINT>` | 컨테이너가 Prometheus 형식으로 제공하는 메트릭의 URL 경로입니다.                                                                   |
| `<NAMESPACE>`           | Datadog에서 볼 때 모든 메트릭에 접두사가 붙도록 네임스페이스를 설정합니다.                                                                      |
| `<METRIC_TO_FETCH>`     | Prometheus 엔드포인트에서 가져올 Prometheus 메트릭 키입니다.                                                                        |
| `<NEW_METRIC_NAME>`     | Datadog에서 `<METRIC_TO_FETCH>` 메트릭 키를 `<NEW_METRIC_NAME>`으로 변환합니다.                                                          |


`metrics` 구성은 사용자 지정 메트릭으로 검색할 메트릭 목록입니다. 가져올 각 메트릭과 Datadog에서 원하는 메트릭 이름을 키 값 쌍으로 포함합니다(예: `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`). 정규 표현식으로 해석되는 메트릭 이름 문자열 목록을 제공하여 원하는 메트릭과 해당 메트릭의 현재 이름을 가져올 수도 있습니다. **참고:** 정규 표현식은 많은 수의 사용자 지정 메트릭을 보낼 가능성이 있습니다.

`namespace` 및 `metrics` 등 인스턴스에 사용할 수 있는 파라미터 전체 목록은 [sample configuration openmetrics.d/conf.yaml][7]을 참조하세요.

## 시작하기 {#getting-started}

### 간단한 메트릭 수집 {#simple-metric-collection}

컨테이너 내에서 실행 중인 Prometheus가 노출하는 메트릭 수집을 시작하려면 다음 단계를 따르세요.

1. Datadog Agent를 실행합니다.
    {{< tabs >}}
    {{% tab "표준" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. OpenMetrics 검사를 위해 Autodiscovery 레이블을 지정한 상태에서, Agent가 수집할 예시 메트릭을 노출하는 Prometheus 컨테이너를 실행합니다.

    다음 레이블을 사용하면 Agent가 `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` 메트릭과 `go_memory`로 시작하는 노출된 메트릭을 모두 수집합니다.

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
    To launch an example Prometheus container with these labels you can run:

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. [Metrics Catalog][8] 페이지로 이동하여 수집된 메트릭을 확인합니다.

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Docker에서 수집한 Prometheus 메트릭">}}

## 사용자 지정부터 공식 통합까지 {#from-custom-to-official-integration}

기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 사용자 지정 메트릭으로 간주됩니다. 상용 소프트웨어를 모니터링 중이고, 공식 통합할 가치가 있다고 생각되는 경우 망설이지 말고 [기여][5]하세요!

공식 통합에는 자체적인 전용 디렉터리가 있습니다. 일반 검사에 기본 구성 및 메트릭 메타데이터를 하드코딩하기 위한 기본 인스턴스 메커니즘이 있습니다. 예를 들어, [kube-proxy][9] 통합을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/openmetrics/
[2]: /ko/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ko/extend/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/ko/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/catalog
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
---
app_id: ray
app_uuid: bae260a0-91be-4dc4-9767-61f072f82d76
assets:
  dashboards:
    Ray Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ray.process.open_fds
      metadata_path: metadata.csv
      prefix: ray.
    process_signatures:
    - ray.util.client.server
    - gcs_server
    - raylet
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10393
    source_type_name: Ray
  monitors:
    High CPU Utilization on Ray.io node: assets/monitors/cpu_utilization.json
    High Memory Usage: assets/monitors/mem_utilization.json
    High Number of Failed Tasks on Ray.io Node: assets/monitors/failed_task.json
    Low GPU Utilization low on Ray.io Node: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ray/README.md
display_on_public_website: true
draft: false
git_integration_title: ray
integration_id: ray
integration_title: Ray
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: ray
public_title: Ray
short_description: Ray 성능 및 상태 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: Ray 성능 및 상태 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ray
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog Agent를 통해 [Ray][1]를 모니터링합니다. Ray는 강화 학습, 딥러닝, 튜닝, 모델 제공 등 AI 및 Python 워크로드를 쉽게 확장할 수 있도록 지원하는 오픈소스 통합 컴퓨팅 프레임워크입니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

Agent 릴리스 7.49.0부터 Ray 점검이 [Datadog Agent][3] 패키지에 포함되었습니다. 서버에 추가 설치가 필요하지 않습니다.

**주의**: 이 점검은 Ray가 노출할 수 있는 OpenMetrics 엔드포인트에서 메트릭을 수집하기 위해 [OpenMetrics][4]를 사용하며, 이를 위해 Python 3이 필요합니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

##### 메트릭 수집

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더의 `ray.d/conf.yaml` 파일을 편집하여 Ray 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 구성 파일][1]을 참고하세요.

    이 예시는 해당 구성을 보여줍니다.

    ```yaml
    init_config:
      ...
    instances:
      - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    ```

2. 구성을 수정한 후 [Agent를 다시 시작합니다.][2]

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "도커" %}}

#### Docker

##### 메트릭 수집

이 예제는 `docker-compose.yml` 내부에서 Docker 레이블로 구성하는 방법을 보여줍니다. 사용 가능한 모든 구성 옵션은 [샘플 구성 파일][1]을 참고하세요.

```yaml
labels:
  com.datadoghq.ad.checks: '{"ray":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8080"}]}}'
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### 쿠버네티스(Kubernetes)

##### 메트릭 수집

이 예제는 Ray 포드에서 Kubernetes 주석을 구성하는 방법을 보여줍니다. 사용 가능한 모든 구성 옵션은 [샘플 구성 파일][1]을 참고하세요.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/ray.checks: |-
      {
        "ray": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'ray'
# (...)
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

Ray 메트릭은 OpenMetrics 엔드포인트에서 사용할 수 있습니다. 또한 Ray를 사용하면 [사용자 지정 애플리케이션 수준 메트릭을 내보낼 수 있습니다][5]. `extra_metrics` 옵션을 사용하여 이러한 메트릭을 수집하도록 Ray 통합을 구성할 수 있습니다. 사용자 지정 메트릭을 포함한 모든 Ray 메트릭은 `ray.` 접두사를 사용합니다.

**참고:** 사용자 지정 Ray 메트릭은 Datad에서 표준 메트릭으로 간주됩니다.

이 예제는 `extra_metrics` 옵션을 활용하는 구성을 보여줍니다.

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    # 사용자 정의 Ray 메트릭도 함께 수집하세요
    extra_metrics:
      - my_custom_ray_metric
```

이 옵션을 구성하는 자세한 방법은 [샘플 `ray.d/conf.yaml` 구성 파일][6]에서 확인하세요.

### 검증

[Agent 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `ray`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ray" >}}


### 이벤트

Ray 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ray" >}}


### 로그

Ray 통합은 Ray 서비스에서 로그를 수집하여 Datadog으로 전달할 수 있습니다.

{{< tabs >}}
{{% tab "Host" %}}

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. `ray.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집하세요. 예를 들면 다음과 같습니다.

   ```yaml
   logs:
     - type: file
       path: /tmp/ray/session_latest/logs/dashboard.log
       source: ray
       service: ray
     - type: file
       path: /tmp/ray/session_latest/logs/gcs_server.out
       source: ray
       service: ray
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][1]을 참고하세요.

그런 다음 로그 통합을 포드 애노테이션으로 설정합니다. 파일, 구성 맵, 키-값 저장소를 사용하여 구성할 수도 있습니다. 자세한 내용은 [Kubernetes 로그 수집][2]의 구성 섹션을 참고하세요.


**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ray
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"ray","service":"ray"}]'
spec:
  containers:
    - name: ray
```

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

Ray의 로깅 구성 및 모든 로그 파일에 대한 자세한 내용은 [Ray 공식 설명서][8]를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://www.ray.io/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[5]: https://docs.ray.io/en/latest/ray-observability/user-guides/add-app-metrics.html
[6]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example#L59-L105
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.ray.io/en/latest/ray-observability/user-guides/configure-logging.html
[9]: https://docs.datadoghq.com/ko/help/
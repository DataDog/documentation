---
app_id: openmetrics
app_uuid: 302b841e-8270-4ecd-948e-f16317a316bc
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10045
    source_type_name: OpenMetrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md
display_on_public_website: true
draft: false
git_integration_title: openmetrics
integration_id: openmetrics
integration_title: OpenMetrics
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: openmetrics
public_title: OpenMetrics
short_description: OpenMetrics은 메트릭 데이터 노출을 위한 개방형 표준입니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: OpenMetrics은 메트릭 데이터 노출을 위한 개방형 표준입니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://docs.datadoghq.com/agent/openmetrics/
  - resource_type: 설명서
    url: https://docs.datadoghq.com/developers/openmetrics/
  support: README.md#Support
  title: OpenMetrics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

OpenMetrics 또는 Prometheus 엔드포인트에서 커스텀 메트릭을 추출합니다.

<div class="alert alert-danger">본 통합으로 수집한 모든 메트릭은 <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">커스텀 메트릭</a>으로 간주됩니다.</div>

본 통합은 [Prometheus 익스포전 형식][1]과 [OpenMetrics 사양][2] 모두와 호환됩니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][3]을 참조하세요.

본 통합에는 최신 모드(활성화하려면 `openmetrics_endpoint`가 대상 엔드포인트를 가리키도록 설정)와 레거시 모드(활성화 하려면 `prometheus_url`를 대신 설정)가 있습니다. Datadog은 최신 모드를 활성화해 최신 기능을 활용할 것을 권장합니다. 자세한 내용을 확인하려면 [OpenMetrics 기반 통합의 최신 및 레거시 버전 관리][4]를 참고하세요.

### 설치

OpenMetrics 점검은 [Datadog 에이전트 v6.6.0 이상][5] 패키지에 포함되어 있습니다.

### 설정

[에이전트 설정 디렉토리][6] 루트에서 `conf.d/openmetrics.d/conf.yaml` 파일을 수정합니다. 사용 가능한 모든 설정 옵션은 [openmetrics.d/conf.yaml 샘플][7]을 참조하세요. 본 예시는 Datadog 에이전트 버전 7.32.0의 최신 OpenMetrics 점검 예제입니다. 이전에 통합을 구현한 경우 [레거시 예제][8]를 참조하세요.

각 인스턴스마다 다음 파라미터가 필요합니다.

| 파라미터        | 설명                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | Prometheus 또는 OpenMetrics 형식으로 애플리케이션 메트릭이 노출되는 URL입니다(고유해야 함).                                                                                                                         |
| `namespace`      | 모든 메트릭에 추가할 네임스페이스입니다.                                                                                                                                                                                                                                 |
| `metrics`        | 커스텀 메트릭을 검색하는 메트릭 목록입니다. 목록 에 각 메트릭을 `metric_name` 또는 `metric_name: renamed`로 각각 추가하여 이름을 변경합니다. 메트릭은 정규식으로 해석됩니다. `".*"`를 와일드카드(`metric.*`)로 사용하여 일치하는 모든 메트릭을 가져옵니다. **참고**: 정규식은 잠재적으로 커스텀 메트릭을 전송합니다. |

Datadog 에이전트 v7.32.0 이상부터는 [OpenMetrics 사양 표준][2]을 준수하여, `_total`로 끝나는 카운터 이름은 `_total` 접미사 없이 지정해야 합니다. 예를 들어, `promhttp_metric_handler_requests_total`를 수집하려면 메트릭 이름 `promhttp_metric_handler_requests`을 지정합니다. 이렇게 하면 메트릭 이름에 `.count`, `promhttp_metric_handler_requests.count`이 추가되어 Datadog으로 전송됩니다.

본 점검은 인스턴스당 2000 메트릭으로 제한됩니다. 반환되는 메트릭 수는 Datadog 에이전트 [상태 명령][9]을 실행할 때 표시됩니다. 설정을 편집하여 관심 있는 메트릭을 지정할 수 있습니다. 수집할 메트릭을 사용자 지정하는 방법을 알아보려면 [Prometheus 및OpenMetrics 메트릭 수집][10]을 참조하세요.

메트릭을 더 많이 모니터링해야 하는 경우 [Datadog 지원 팀][11]에 문의하세요.

### 검증

[에이전트 상태 하위 명령을 실행][9]하고 점검 섹션에서 `openmetrics`을 찾으세요.

## 수집한 데이터

### 메트릭

OpenMetrics 점검으로 수집한 모든 메트릭은 Datadog에 커스텀 메트릭으로 포워드됩니다.

### 이벤트

OpenMetrics 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

OpenMetrics 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

### 높은 커스텀 메트릭 빌링

`metrics` 옵션용 일반 와일드카드 값을 사용하는 OpenMetrics 설정은 커스텀 메트릭 빌링에 상당한 영향을 미칩니다.

Datadog은 보다 정확한 수집을 위해 특정 메트릭 이름 또는 메트릭 이름 부분 일치를 사용할 것을 권장합니다.

### 유형 미지정 메트릭 누락

기본적으로 통합은 Prometheus 익스포지션에 없는 유형의 메트릭을 건너뜁니다. 유형 미지정 메트릭을 수집하려면, 예를 들어 다음과 같이 `metrics` 매핑에서 유형을 명시적으로 지정해야 합니다.

```yaml
  metrics:
    - "<NAME_OF_METRIC_WITHOUT_TYPE>":
        "type": "gauge"
```

메트릭 이름은 정규식으로 지정할 수 있으므로, 모든 이름을 각각 명시하지 않고도 메트릭 집합에 대한 유형을 지정할 수 있습니다.

### 에이전트 7.46로 OpenMetrics 페이로드 파싱 시 에러 발생

에이전트 버전 7.46과 함께 제공해 드리는 본 통합 버전은 메트릭 엔드포인트에서 메트릭을 요청할 때 기본적으로 OpenMetrics 형식을 우선 사용합니다. 이는 `Accept` 헤더를 `application/openmetrics-text;version=1.0.0,application/openmetrics-text;version=0.0.1;q=0.75,text/plain;version=0.0.4;q=0.5,*/*;q=0.1` 로 설정하여 실행됩니다. 이는 수동 설정 필요를 줄이기 위해 서버에서 수신하는 `Content-Type`에 기반하여 사용할 스크레퍼를 동적 결정하는 작업과 함께 실행되었습니다.

이전 버전에서는 기본값이 `text/plain`으로 설정되어 있어 일반적으로 서버가 Prometheus 엑스포지션 형식으로 메트릭을 반환합니다. 즉, 이 버전의 통합으로 업데이트하면 Prometheus 형식에서 OpenMetrics 형식으로 전환될 수도 있습니다.

대부분의 상황에서 동작이 동일해야 하지만, 일부 애플리케이션은 `Content-Type`을 OpenMetric 표준 형식을 사용하도록 설정했음에도 불구하고 OpenMetric을 완전히 준수하지 않는 형식으로 메트릭을 반환합니다. 이로 인해 메트릭 페이로드를 파싱하는 동안 통합이 오류를 보고할 수도 있습니다.

새 버전으로 OpenMetrics 엔드포인트를 스크래핑할 때 파싱 오류가 표시되는 경우, [설정 파일][12]의 `headers` 옵션을 사용하여 `text/plain`로 전송하는 `Accept` 헤더를 수동으로 설정하여 덜 엄격한 Prometheus 형식을 사용하도록 할 수 있습니다.

```yaml
## All options defined here are available to all instances.
#
init_config:
  ...
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    ...
    headers:
      Accept: text/plain
```

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

- [OpenMetrics 점검 설정하기][13]
- [커스텀 OpenMetrics 점검하기][14]

[1]: https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/prometheus/?tab=docker#configuration
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/getting_started/integrations/prometheus/
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L537-L546
[13]: https://docs.datadoghq.com/ko/agent/openmetrics/
[14]: https://docs.datadoghq.com/ko/developers/openmetrics/
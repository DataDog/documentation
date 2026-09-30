---
app_id: prometheus
app_uuid: b978d452-7008-49d0-bb87-62d8639b2205
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10013
    source_type_name: Prometheus
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/prometheus/README.md
display_on_public_website: true
draft: false
git_integration_title: prometheus
integration_id: prometheus
integration_title: Prometheus (레거시)
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: prometheus
public_title: Prometheus (레거시)
short_description: Prometheus는 시계열 메트릭 데이터를 위한 오픈소스 모니터링 시스템입니다.
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
  - Category::Event Management
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Prometheus는 시계열 메트릭 데이터를 위한 오픈소스 모니터링 시스템입니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-prometheus-metrics
  - resource_type: 문서
    url: https://docs.datadoghq.com/agent/prometheus/
  - resource_type: 문서
    url: https://docs.datadoghq.com/developers/prometheus/
  support: README.md#Support
  title: Prometheus (legacy)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Prometheus를 연결해 다음을 수행할 수 있습니다.
- Prometheus 엔드포인트에서 커스텀 메트릭 추출
- Datadog 이벤트 스트림에서 Prometheus Alertmanager 경고 확인

**참고**: Datadog은 더 효율적이고 Prometheus 텍스트 형식을 완벽하게 지원하는 [OpenMetrics 점검][1] 사용을 권장합니다. 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 Prometheus 점검을 사용하세요.

<div class="alert alert-danger">
이 통합을 통해 검색된 모든 메트릭은 <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">커스텀 메트릭</a>으로 지정됩니다.
</div>

**Prometheus 점검을 구성하는 방법은 [Prometheus 메트릭 수집 시작하기][2]에서 확인하세요.**

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][3]을 참조하세요.

### 설치

Prometheus 점검은 [Datadog Agent][4] 6.1.0 버전부터 패키지로 제공됩니다.

### 구성

OpenMetrics/Prometheus 엔드포인트를 노출하는 애플리케이션에서 메트릭을 검색하려면 `prometheus.d/conf.yaml` 파일을 편집하세요.

각 인스턴스는 최소한 다음으로 구성됩니다.

| 설정          | 설명                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `prometheus_url` | 메트릭 경로를 가리키는 URL(**참고:** 고유해야 함)                                                    |
| `namespace`      | 이 네임스페이스는 메트릭 이름 충돌을 방지하기 위해 모든 메트릭에 추가됩니다                                        |
| `metrics`        | `- <METRIC_NAME>` 또는 `- <METRIC_NAME>: <RENAME_METRIC>` 양식에서 커스텀 메트릭으로 검색할 메트릭 목록 |

메트릭을 나열할 때 `- <METRIC_NAME>*`과 같이 `*` 와일드카드를 사용하여 일치하는 모든 메트릭을 검색할 수 있습니다. **참고:** 와일드카드 사용 시 많은 커스텀 메트릭을 전송할 수 있으므로 주의하세요.

더 많은 고급 설정(ssl, 레이블 결합, 커스텀 태그 등)은 [샘플 prometheus.d/conf.yaml][5]에서 확인할 수 있습니다.

이 통합의 특성상 Datadog에 많은 수의 커스텀 메트릭을 제출할 수 있습니다. 사용자는 구성 오류 또는 입력 변경에 대해 전송되는 메트릭의 최대 수를 제어할 수 있습니다. 점검에서 기본 메트릭 한도는 2000개입니다. 이 한도를 늘리려면`prometheus.d/conf.yaml` 파일에서 `max_returned_metrics` 옵션을 설정하세요.

`send_monotonic_counter: True`이면 Agent는 해당 값의 델타를 보내고 앱 내 유형은 count로 설정됩니다(이것은 기본 동작입니다). `send_monotonic_counter: False`이면 Agent는 원시적이고 단조롭게 증가하는 값을 보내고 앱 내 유형은 gauge로 설정됩니다.

### 검증

[Agent의 `status` 하위 명령을 실행][6]하고 Checks 섹션에서 `prometheus`를 찾습니다.

## 수집한 데이터

### 메트릭

Prometheus 점검을 통해 수집된 모든 메트릭은 커스텀 메트릭으로 Datadog에 전달됩니다.

참고: `<HISTOGRAM_METRIC_NAME>` Prometheus 히스토그램 메트릭에 대한 버킷 데이터는 버킷 이름을 포함한 `upper_bound` 태그와 함께 Datadog 내의 `<HISTOGRAM_METRIC_NAME>.count` 메트릭에 저장됩니다. `+Inf` 버킷에 액세스하려면 `upper_bound:none`을 사용합니다.

### 이벤트

Prometheus Alertmanager 경고는 웹훅 구성에 따라 자동으로 Datadog 이벤트 스트림으로 전송됩니다.

### 서비스 점검

Prometheus 점검은 서비스 점검을 포함하지 않습니다.

## Prometheus Alertmanager
이벤트 스트림에서 Prometheus Alertmanager 경고을 보내세요. 기본적으로 Alertmanager는 구성된 웹훅에 모든 경고를 동시에 보냅니다. Datadog에서 경고를 보려면 Alertmanager 인스턴스를 구성하여 한 번에 하나씩 경고를 보내야 합니다. `route`에서 그룹별 파라미터를 추가하여 경고 규칙의 실제 이름으로 경고를 그룹화할 수 있습니다.

### 설정
1. Alertmanager 구성 파일, `alertmanager.yml`을 편집하여 다음을 포함합니다.
```
receivers:
- name: datadog
  webhook_configs: 
  - send_resolved: true
    url: https://app.datadoghq.com/intake/webhook/prometheus?api_key=<DATADOG_API_KEY>
route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 5m
  receiver: datadog
  repeat_interval: 3h
```

**참고**: 이 엔드포인트는 페이로드에서 한 번에 하나의 이벤트만 허용합니다.

2. Prometheus와 Alertmanager 서비스를 다시 시작합니다.
```
sudo systemctl restart prometheus.service alertmanager.service
```

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 참고 자료

- [Datadog Agent 6에 대한 Prometheus 지원 소개][8]
- [Prometheus 점검 구성하기][9]
- [커스텀 Prometheus 점검 작성하기][10]

[1]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[2]: https://docs.datadoghq.com/ko/getting_started/integrations/prometheus/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/prometheus?tab=docker#configuration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[9]: https://docs.datadoghq.com/ko/agent/prometheus/
[10]: https://docs.datadoghq.com/ko/developers/prometheus/
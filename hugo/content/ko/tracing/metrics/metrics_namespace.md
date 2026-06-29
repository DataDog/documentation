---
algolia:
  tags:
  - trace metrics
aliases:
- /ko/tracing/getting_further/metrics_namespace
- /ko/tracing/guide/metrics_namespace
description: 네임스페이스, 유형(hits[요청 수], errors[오류], latency[지연 시간], Apdex) 및 애플리케이션 트래픽을
  기반으로 한 계산 방식을 포함한 APM 트레이스 메트릭에 대한 종합 가이드입니다.
further_reading:
- link: tracing/trace_pipeline/generate_metrics/
  tag: 설명서
  text: 수집한 스팬에서 사용자 지정 메트릭 생성
- link: tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 애플리케이션 성능 모니터링(APM) 추적 설정 방법 알아보기
- link: tracing/software_catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스를 검색 및 카탈로그화
- link: tracing/services/service_page
  tag: 설명서
  text: Datadog 서비스에 관해 자세히 알아보기
- link: tracing/services/resource_page
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
- link: tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog 트레이스 읽는 법 이해하기
title: 트레이스 메트릭
---
## 개요 {#overview}

애플리케이션 메트릭은 [트레이스 수집을 활성화하고 애플리케이션 계측][1]을 완료한 후 수집됩니다.

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="트레이스 메트릭" >}}

이 메트릭은 요청 수, 오류 수 및 지연 시간을 측정합니다. 이들은 [트레이스 수집 샘플링][2] 구성 여부와 관계없이 애플리케이션 트래픽의 100%를 기반으로 계산됩니다. 이 메트릭을 사용하여 서비스 또는 리소스의 잠재적 오류를 식별하고, 대시보드, 모니터링 및 SLO를 생성함으로써 애플리케이션 트래픽에 대한 완전한 가시성을 확보할 수 있습니다.

**참고**: 애플리케이션이 OpenTelemetry 라이브러리로 계측되어 있고 샘플링이 SDK 수준에서 설정된 경우, APM 메트릭은 샘플링된 데이터 집합을 기준으로 계산됩니다. 반면 OpenTelemetry Collector 수준에서 샘플링이 설정되고, 샘플러 프로세서가 Datadog 커넥터보다 상위에 있는 경우에는 APM 메트릭이 애플리케이션 트래픽의 100%를 기준으로 계산됩니다.

트레이스 메트릭은 서비스 진입 스팬과 통합 언어에 따라 특정 작업에 대해 생성됩니다. 예를 들어 Django 통합은 다양한 작업을 나타내는 스팬으로부터 트레이스 메트릭을 생성합니다(Django 요청에 대한 루트 스팬 1개, 각 미들웨어에 대한 스팬 1개, View에 대한 스팬 1개).

[트레이스 메트릭][3] 네임스페이스는 다음 형식을 사용합니다.

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

정의:

`<SPAN_NAME>`
: 작업의 이름 또는 `span.name`(예시: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: 메트릭의 이름(예시: `hits`, `errors`, `apdex`, `duration`). 아래 섹션을 참조하세요.

`<TAGS>`
: 사용 가능한 트레이스 메트릭 태그는 : `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, `rpc.grpc.status_code`(Datadog Agent v7.65.0 이상 필요)입니다. 또한 Datadog Agent 태그(호스트 및 [추가 기본 태그][4] 포함)도 사용할 수 있습니다. 
: **참고:** 스팬에 설정된 기타 사용자 지정 태그는 트레이스 메트릭 태그로 사용할 수 없습니다.

## 메트릭 접미사 {#metric-suffix}

### Hits {#hits}

`trace.<SPAN_NAME>.hits`
: **전제 조건:** 이 메트릭은 모든 APM 서비스에서 제공됩니다.<br>
**설명:** 특정 이름(예: `redis.command`, `pylons.request`, `rails.request` 또는 `mysql.query`)을 가진 스팬이 생성된 횟수를 나타냅니다.<br>
**메트릭 유형:** [COUNT][5].<br>
**태그:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, Datadog Host Agent의 모든 호스트 태그 및 [추가 기본 태그][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **전제 조건:** HTTP 메타데이터가 존재하는 경우 HTTP/WEB APM 서비스에서 제공됩니다.<br>
**설명:** HTTP 상태 코드별 요청 수(Hits)를 나타냅니다.<br>
**메트릭 유형:** [COUNT][5].<br>
**태그:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, Datadog Host Agent의 모든 호스트 태그 및 [추가 기본 태그][4].

### 지연 시간 분포 {#latency-distribution}

`trace.<SPAN_NAME>`
: **전제 조건:** 이 메트릭은 모든 APM 서비스에서 제공됩니다.<br>
**설명:** 모든 서비스, 리소스, 버전, 환경 및 추가 기본 태그에 대한 지연 시간 분포를 나타냅니다. **모든 지연 시간 측정 사용 사례에 권장됩니다.**<br>
**메트릭 유형:** [DISTRIBUTION][6].<br>
**태그:** `env`, `service`,`version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, `synthetics` 및 [추가 기본 태그][4].

### 오류 {#errors}

`trace.<SPAN_NAME>.errors`
: **전제 조건:** 이 메트릭은 모든 APM 서비스에서 제공됩니다.<br>
**설명:** 특정 스팬에 대한 오류 수를 나타냅니다.<br>
**메트릭 유형:** [COUNT][5].<br>
**태그:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, Datadog Host Agent의 모든 호스트 태그 및 [추가 기본 태그][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **전제 조건:** 이 메트릭은 모든 APM 서비스에서 제공됩니다.<br>
**설명:** 특정 스팬에 대한 오류 수를 나타냅니다.<br>
**메트릭 유형:** [COUNT][5].<br>
**태그:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, Datadog Host Agent의 모든 호스트 태그 및 [추가 기본 태그][4].

### Apdex {#apdex}

`trace.<SPAN_NAME>.apdex`
: **전제 조건:** 이 메트릭은 HTTP 또는 웹 기반 APM 서비스에서 제공됩니다.<br>
**설명:** 각 웹 서비스의 [Apdex][10] 점수를 측정합니다.<br>
**메트릭 유형:** [GAUGE][7].<br>
**태그:** `env`, `service`, `version`, `resource` / `resource_name`, `synthetics` 및 [추가 기본 태그][4].

## 레거시 메트릭 {#legacy-metrics}

다음 메트릭은 이전 버전과의 호환성을 위해 유지됩니다. 모든 지연 시간 측정 사용 사례에 대해 Datadog은 레거시 메트릭 대신 [Latency Distribution 메트릭](#latency-distribution) 사용을 강력히 권장합니다.

### Duration(레거시) {#duration-legacy}

<div class="alert alert-danger">
<strong>중요:</strong> Duration 메트릭은 이전 버전과의 호환성을 위해서만 유지됩니다. 모든 지연 시간 측정 사용 사례에 대해 Datadog은 백분위수 계산 정확도와 전반적인 성능 분석 측면에서 더 우수한 <a href="#latency-distribution">Latency Distribution</a> 메트릭 사용을 강력히 권장합니다.
</div>

`trace.<SPAN_NAME>.duration`
: **전제 조건:** 이 메트릭은 모든 APM 서비스에서 제공됩니다.<br>
**설명:** 수집 서비스에서 관찰된 하위 스팬을 포함하여, 특정 시간 간격 내 스팬 집합의 총 소요 시간을 측정합니다. 대부분의 사용 사례에서 Datadog은 평균 지연 시간 또는 백분위수 계산을 위해 [Latency Distribution](#latency-distribution) 사용을 권장합니다. 호스트 태그 필터를 사용하여 평균 지연 시간을 계산하려면 다음 공식을 사용할 수 있습니다. <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}.rollup(sum).fill(zero)` <br>
이 메트릭은 백분위수 집계를 지원하지 않습니다. 자세한 내용은 [Latency Distribution](#latency-distribution) 섹션을 참조하세요. <br>
**메트릭 유형:** [GAUGE][7].<br>
**태그:** `env`, `service`, `resource`, `http.status_code`, Datadog Host Agent의 모든 호스트 태그 및 [추가 기본 태그][4].

### Duration by(레거시) {#duration-by-legacy}

<div class="alert alert-danger">
<strong>중요:</strong> Duration 메트릭은 이전 버전과의 호환성을 위해서만 유지됩니다. 모든 지연 시간 측정 사용 사례에 대해 Datadog은 백분위수 계산 정확도와 전반적인 성능 분석 측면에서 더 우수한 <a href="#latency-distribution">Latency Distribution</a> 메트릭 사용을 강력히 권장합니다.
</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **전제 조건:** HTTP 메타데이터가 존재하는 경우 HTTP/WEB APM 서비스에서 제공됩니다.<br>
**설명:** HTTP 상태 코드별 스팬 집합의 총 소요 시간을 측정합니다. 구체적으로는 특정 시간 간격과 HTTP 상태 코드에 대해 모든 스팬이 소비한 시간의 상대적 비중을 의미하며, 하위 프로세스 대기 시간도 포함됩니다.<br>
**메트릭 유형:** [GAUGE][7].<br>
**태그:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, Datadog Host Agent의 모든 호스트 태그 및 [추가 기본 태그][4].

## 트레이스 메트릭에 대한 샘플링 영향 {#sampling-impact-on-trace-metrics}

대부분의 경우 트레이스 메트릭은 전체 애플리케이션 트래픽을 기준으로 계산됩니다. 그러나 특정 트레이스 수집 샘플링 구성에서는 메트릭이 전체 요청이 아닌 일부 요청 집합만 반영할 수 있습니다.

### 애플리케이션 측 샘플링 {#application-side-sampling}

일부 SDK는 애플리케이션 측 샘플링을 지원하며, Datadog Agent로 전송되기 전에 스팬 수를 줄입니다. 예를 들어 Ruby SDK는 성능 오버헤드를 줄이기 위해 애플리케이션 측 샘플링을 제공합니다. 그러나 Datadog Agent는 정확한 메트릭 계산을 위해 모든 스팬이 필요하므로 이 기능은 트레이스 메트릭 정확도에 영향을 줄 수 있습니다. 

이 설정을 지원하는 SDK는 매우 적으며 일반적으로 사용을 권장하지 않습니다.

### OpenTelemetry 샘플링 {#opentelemetry-sampling}

OpenTelemetry SDK의 기본 샘플링 메커니즘은 Datadog 컬렉터로 전송되는 스팬 수를 줄입니다. 그 결과 트레이스 메트릭이 샘플링된 데이터만 기반으로 계산되어 부정확해질 수 있습니다.

### X-Ray 샘플링 {#x-ray-sampling}

X-Ray 스팬은 Datadog으로 전송되기 전에 이미 샘플링됩니다. 따라서 트레이스 메트릭이 전체 트래픽을 반영하지 못할 수 있습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/
[2]: /ko/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ko/tracing/glossary/#trace-metrics
[4]: /ko/tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[5]: /ko/metrics/types/?tab=count#metric-types
[6]: /ko/metrics/types/?tab=distribution#metric-types
[7]: /ko/metrics/types/?tab=gauge#metric-types
[8]: /ko/tracing/software_catalog/#services-types
[9]: /ko/tracing/glossary/#services
[10]: /ko/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
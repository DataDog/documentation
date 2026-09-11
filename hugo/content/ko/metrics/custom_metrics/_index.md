---
algolia:
  tags:
  - custom metrics
aliases:
- /ko/guides/metrics/
- /ko/metrictypes/
- /ko/units/
- /ko/developers/metrics/datagram_shell
- /ko/developers/metrics/custom_metrics/
- /ko/getting_started/custom_metrics
- /ko/developers/metrics/
- /ko/metrics/guide/tag-configuration-cardinality-estimation-tool/
description: 사용자 지정 메트릭이 무엇인지, 이름과 태그로 어떻게 식별되는지, Datadog에서 어떻게 청구되는지 알아보세요.
further_reading:
- link: /extend/dogstatsd/
  tag: 설명서
  text: DogStatsD에 대해 자세히 알아보기
- link: /extend/community/libraries/
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: 설명서
  text: Custom Metrics 청구
- link: /account_management/billing/metric_name_pricing/
  tag: 설명서
  text: Custom Metrics의 Metric Name 요금제
- link: /metrics/guide/custom_metrics_governance/
  tag: 가이드
  text: 사용자 지정 메트릭 거버넌스 모범 사례
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: 블로그
  text: Metrics without Limits™를 사용하여 사용자 지정 메트릭 볼륨을 동적으로 제어
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: 블로그
  text: Datadog으로 효과적인 임원 대시보드 설계
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: 학습 센터
  text: Metrics Governance
title: Custom Metrics
---
{{< learning-center-callout header="활성화 웨비나 세션에 참여하기" hide_image="true" btn_title="가입" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  사용자 지정 메트릭을 위한 Foundation Enablement 세션을 살펴보고 가입하세요. 사용자 지정 메트릭을 활용하여 방문자 수, 평균 고객 장바구니 크기, 요청 지연 시간 또는 사용자 지정 알고리즘의 성능 분포와 같은 애플리케이션 KPI를 추적하는 방법을 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

사용자 지정 메트릭은 방문자 수, 평균 고객 장바구니 크기, 요청 지연 시간 또는 사용자 지정 알고리즘의 성능 분포와 같은 애플리케이션 KPI를 추적하는 데 도움이 됩니다. 사용자 지정 메트릭은 **메트릭 이름과 태그 값(호스트 태그 포함)의 고유한 조합**으로 식별됩니다. 아래 예시에서 메트릭 `request.Latency`는 두 개의 태그 키로부터 네 가지 고유한 태그 값 조합을 가집니다.

- `endpoint`(값 `endpoint:X` 또는 `endpoint:Y`)
- `status`(값 `status:200` 또는 `status:400`)

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="요청 지연 시간" style="width:80%;">}}

다음도 사용자 지정 메트릭으로 간주됩니다.
- 일반적으로 [DogStatsD][3] 또는 [사용자 지정 Agent Check][4]를 통해 제출되는 모든 메트릭.
- [Marketplace integrations][29]에서 제출되는 메트릭
- 일부 [표준 통합](#standard-integrations)은 사용자 지정 메트릭을 생성할 수 있음
- [Datadog 통합 {{< translate key="integration_count" >}} 개 이상][1]에 포함되지 않은 통합에서 제출된 메트릭.

**참고**: Datadog Admin 역할 또는 `usage_read` 권한이 있는 사용자는 [사용자 상세 정보 페이지][5]에서 계정의 시간당 월평균 사용자 지정 메트릭 수와 상위 5,000개 사용자 지정 메트릭을 확인할 수 있습니다. [사용자 지정 메트릭 계산 방식][6]에 대해 자세히 알아보세요.

## 사용자 지정 메트릭 속성 {#custom-metrics-properties}

Datadog Custom Metrics는 아래와 같은 속성을 가집니다. Datadog에서 메트릭을 그래프로 시각화하는 방법은 [메트릭 소개][7]를 참조하세요.

| 속성         | 설명                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | [메트릭 이름](#naming-custom-metrics).                                                                                                                  |
| `<METRIC_VALUE>` | 메트릭 값. **참고**: 메트릭 값은 32비트여야 합니다. 값은 날짜나 타임스탬프를 나타내지 않아야 합니다.                                                                                                                                |
| `<TIMESTAMP>`    | 메트릭 값과 연결된 타임스탬프. **참고**: 메트릭 타임스탬프는 현재 시각보다 10분 이상 미래이거나 1시간 이상 과거일 수 없습니다. |
| `<TAGS>`         | 메트릭과 연결된 태그 집합.                                                                                                                 |
| `<METRIC_TYPE>`  | 메트릭 유형. [메트릭 유형][8]을 참조하세요.                                                                                             |
| `<INTERVAL>`     | 메트릭의 `<TYPE>`이 [RATE][9] 또는 [COUNT][10]인 경우 해당 [간격][11]을 정의합니다.                                                       |

### 사용자 지정 메트릭 이름 지정 {#naming-custom-metrics}

다음 사용자 지정 메트릭 명명 규칙을 따라야 합니다.

* 메트릭 이름은 문자로 시작해야 합니다.
* 메트릭 이름에는 ASCII 영숫자, 밑줄(_), 마침표(.)만 사용할 수 있습니다.
  * 공백을 포함한 기타 문자는 밑줄(_)로 변환됩니다.
  * 유니코드는 지원되지 _않습니다_.
* 메트릭 이름은 200자를 초과할 수 없습니다. UI 관점에서는 100자 미만을 권장합니다.

**참고**: Datadog에서는 메트릭 이름의 대소문자를 구분합니다.

### 메트릭 단위 {#metric-units}

메트릭 단위는 [Metrics Summary][12]에서 설정하거나 시각화의 그래프 편집기에서 [Unit override][13] 기능을 사용하여 사용자 지정 메트릭 단위를 설정할 수 있습니다. 자세한 내용은 [메트릭 단위][14] 설명서를 참조하세요.

## 사용자 지정 메트릭 제출 {#submitting-custom-metrics}

{{< whatsnext desc="Datadog에 메트릭을 전송하는 방법은 여러 가지가 있습니다.">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}사용자 지정 Agent 검사{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog의 HTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}로그 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}APM 스팬 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}RUM 이벤트 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}라이브 프로세스 기반 메트릭 생성{{< /nextlink >}}
{{< /whatsnext >}}

또한 [Datadog 공식 API 및 커뮤니티 기여 API, DogStatsD 클라이언트 라이브러리][15] 중 하나를 사용하여 사용자 지정 메트릭을 제출할 수 있습니다.

**참고**: 사용자 지정 메트릭 제출에는 강제되는 고정 속도 제한이 없습니다. 기본 할당량을 초과하면 [Datadog의 사용자 지정 메트릭 과금 정책][6]에 따라 비용이 청구됩니다.

## 표준 통합 {#standard-integrations}

다음 표준 통합은 사용자 지정 메트릭을 생성할 수 있습니다.

| 통합 유형                           | 통합                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| 기본적으로 350개의 사용자 지정 메트릭으로 제한됩니다.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| 사용자 지정 메트릭 수집에 기본 제한이 없습니다. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows 성능 카운터][22] /[WMI][23] /[Prometheus][21] |
| 사용자 지정 메트릭 수집이 가능하도록 구성할 수 있습니다.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| 클라우드 통합에서 전송된 사용자 지정 메트릭    | [AWS][28]                                                                          |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/
[2]: /ko/account_management/billing/custom_metrics/#standard-integrations
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ko/metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /ko/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /ko/metrics
[8]: /ko/metrics/types/
[9]: /ko/metrics/types/?tab=rate#metric-types
[10]: /ko/metrics/types/?tab=count#metric-types
[11]: /ko/extend/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /ko/metrics/summary/#metric-unit
[13]: /ko/dashboards/guide/unit-override/
[14]: /ko/metrics/units/
[15]: /ko/extend/community/libraries/
[16]: /ko/integrations/activemq/#activemq-xml-integration
[17]: /ko/integrations/go_expvar/
[18]: /ko/integrations/java/
[19]: /ko/integrations/nagios
[20]: /ko/integrations/pdh_check/
[21]: /ko/integrations/openmetrics/
[22]: /ko/integrations/windows_performance_counters/
[23]: /ko/integrations/wmi_check/
[24]: /ko/integrations/mysql/
[25]: /ko/integrations/oracle/
[26]: /ko/integrations/postgres/
[27]: /ko/integrations/sqlserver/
[28]: /ko/integrations/amazon_web_services/
[29]: /ko/integrations/#cat-marketplace
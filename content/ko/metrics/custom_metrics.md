---
algolia:
  tags:
  - 커스텀 메트릭
aliases:
- /ko/guides/metrics/
- /ko/metrictypes/
- /ko/units/
- /ko/developers/metrics/datagram_shell
- /ko/developers/metrics/custom_metrics/
- /ko/getting_started/custom_metrics
- /ko/developers/metrics/
- /ko/metrics/guide/tag-configuration-cardinality-estimation-tool/
further_reading:
- link: /developers/dogstatsd/
  tag: 설명서
  text: DogStatsD에 대해 자세히 알아보기
- link: /developers/community/libraries/
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 메트릭을 최대한으로 활용해 보세요.
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: 블로그
  text: Metrics without LimitsTM을 사용해 커스텀 메트릭 볼륨을 동적으로 제어합니다.
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog를 통해 Azure App Service에서 Linux 웹 앱을 모니터링합니다.
title: 커스텀 메트릭
---

## 개요

메트릭이 [{{< translate key="integration_count" >}}개 이상의 Datadog 통합][1] 중 하나에서 전송되지 않으면 커스텀 메트릭으로 간주됩니다. 커스텀 메트릭으로 방문자 수, 평균 고객 장바구니 크기, 요청 지연, 또는 커스텀 알고리즘 성능 분포 등 애플리케이션 KPI를 추적할 수 있습니다. 특정 [표준 통합](#standard-integrations)의 경우에도 커스텀 메트릭을 전송할 수 있습니다.

커스텀 메트릭은 **호스트 태그 포함 메트릭 이름 및 태그 값의 고유한 조합**으로 식별됩니다. 일반적으로 [DogStatsD][3] 또는 [커스텀 에이전트 점검][4]을 통해 전송하는 모든 메트릭은 커스텀 메트릭입니다.

**참고**: Datadog 관리자 역할 또는 `usage_read` 권한이 있는 사용자는 시간당 커스텀 메트릭 월간 평균 개수를 확인하고 [사용량 상세 정보 페이지][5]에서 계정의 상위 5000개 커스텀 메트릭을 볼 수 있습니다. [커스텀 메트릭 계산 방법][6]에 대해 자세히 알아보세요.

## 커스텀 메트릭 속성

Datadog 커스텀 메트릭의 속성은 아래와 같습니다. [메트릭 소개][7]를 읽고 Datadog를 통해 메트릭을 그래프화하는 방법을 알아보세요.

| 속성         | 설명                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | [메트릭 이름](#naming-custom-metrics)입니다.                                                                                                                  |
| `<METRIC_VALUE>` | 메트릭의 값입니다. **참고**: 메트릭 값은 32비트여야 합니다. 값은 날짜 또는 타임스탬프를 반영해선 안 됩니다.                                                                                                                                |
| `<TIMESTAMP>`    | 메트릭 값과 연결된 타임스탬프입니다. **참고**: 메트릭 타임스탬프는 과거의 1시간 값 이상이거나 미래의 10분 이상일 수 없습니다. |
| `<TAGS>`         | 메트릭과 연결된 일련의 태그입니다.                                                                                                                 |
| `<METRIC_TYPE>`  | 메트릭 유형입니다. [메트릭 유형][8]을 읽어보세요.                                                                                             |
| `<INTERVAL>`     | 메트릭 `<TYPE>`은(는 )[비율][9] 또는 [개수][10]입니다. 해당 [간격][11]을 정의합니다.                                                       |

### 커스텀 메트릭 이름 만들기

다음은 커스텀 메트릭 이름 명명 규칙입니다.

* 메트릭 이름은 문자로 시작해야 합니다.
* 메트릭 이름은 ASCII 영숫자, 밑줄 및 마침표만 포함해야 합니다.
  * 공백 등 다른 문자는 밑줄로 변환됩니다.
  * 유니코드는 지원되지 _않습니다_.
* 메트릭 이름은 200자를 초과할 수 없습니다. UI 관점에서 100자 미만이 좋습니다.

**참고**: Datadog에서 메트릭 이름은 대소문자를 구분합니다.

### 메트릭  단위

[메트릭 요약][12]으로 메트릭 단위를 설정하거나 시각화 그래프 편집기의 [단위 재정의][13] 기능을 사용해 커스텀 메트릭 단위를 설정하세요. 자세한 내용은 [메트릭 단위][14] 설명서를 참고하세요.

## 커스텀 메트릭 제출

{{< whatsnext desc="Datadog로 메트릭을 보내는 데는 여러 방법이 있습니다.">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}커스텀 에이전트 점검{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog HTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}로그 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}APM 스팬 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}RUM 이벤트 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}라이브 프로세스 기반 메트릭 생성{{< /nextlink >}}
{{< /whatsnext >}}

또한 [Datadog 공식 API 및 커뮤니티 기여 API, DogStatsD 클라이언트 라이브러리][15] 중 하나를 사용하여 커스텀 메트릭을 제출할 수 있습니다.

**참고**: 커스텀 메트릭 제출은 고정 요금 제한의 영향을 받지 않습니다. 기본 할당이 초과되면 [커스텀 메트릭에 대한 Datadog 빌링 정책][6]에 따라 요금이 부과됩니다.

## 표준 통합

다음 표준 통합에서 커스텀 메트릭을 만들 수 있습니다.

| 통합 종류                           | 통합                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| 커스텀 메트릭 기본 제한 값은 350개입니다.      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| 커스텀 메트릭 수집에는 기본 제한 값이 없습니다. | [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows 성능 카운터][22] /[WMI][23] /[Prometheus][21] |
| 커스텀 메트릭을 수집하도록 구성할 수 있습니다.   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| 클라우드 통합에서 전송된 커스텀 메트릭    | [AWS][28]                                                                          |

## 참고 자료

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
[11]: /ko/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /ko/metrics/summary/#metric-unit
[13]: /ko/dashboards/guide/unit-override/
[14]: /ko/metrics/units/
[15]: /ko/developers/community/libraries/
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
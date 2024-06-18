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
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: 블로그
  text: Metrics without Limits™을 사용해 커스텀 메트릭 볼륨을 동적으로 제어합니다.
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog를 통해 Azure App Service에서 Linux 웹 앱을 모니터링합니다.
title: 커스텀 메트릭
---

## 개요

메트릭이 [{{< translate key="integration_count" >}}개 이상의 Datadog 통합][1] 중 하나에서 제출하지 않은 경우, 커스텀 메트릭<sup>[(1)][2]</sup>으로 간주됩니다. 방문자 수, 평균 고객 장바구니 크기, 요청 지연 또는 커스텀 알고리즘 성능 분포 등 커스텀 메트릭을 통해 애플리케이션 KPI를 추적할 수 있습니다.

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

## 커스텀 메트릭 제출

{{< whatsnext desc="There are multiple ways to send metrics to Datadog:">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}커스텀 에이전트 점검{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog HTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}로그 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}APM 스팬(span) 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/generate_metrics/" >}}RUM 이벤트 기반 메트릭 생성{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}라이브 프로세스 기반 메트릭 생성{{< /nextlink >}}
{{< /whatsnext >}}

또한 [Datadog 공식 API 및 커뮤니티 기여 API, DogStatsD 클라이언트 라이브러리][12] 중 하나를 사용하여 커스텀 메트릭을 제출할 수 있습니다.

**참고**: 커스텀 메트릭 제출은 고정 요금 제한의 영향을 받지 않습니다. 기본 할당이 초과되면 [커스텀 메트릭에 대한 Datadog 빌링 정책][6]에 따라 요금이 부과됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br><sup>(1)</sup> *[일부 통합은 커스텀 메트릭을 내보낼 수 있음][2]*

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
[12]: /ko/developers/community/libraries/
---
aliases:
- /ko/monitors/create/configuration
description: 모니터 생성 페이지에 대해 설명합니다.
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리
- link: /monitors/status/
  tag: 설명서
  text: 모니터 상태
- link: https://www.datadoghq.com/blog/manage-monitors-with-datadog-teams/
  tag: 블로그
  text: Datadog Teams를 사용하여 모니터를 더욱 효율적으로 관리하기
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: 학습 센터
  text: 경보 사용자 지정 모니터 알림
title: 모니터 구성
---
## 개요 {#overview}

모니터 구성을 시작하려면 다음 단계를 완료하세요.

* **검색 쿼리 정의:** 이벤트 수를 집계하고, 메트릭을 측정하고, 하나 이상의 차원을 기준으로 그룹화하는 등의 작업을 수행할 수 있도록 쿼리를 작성합니다.
* **경보 조건 설정:** 경보 및 경고 임계값, 평가 시간 범위를 정의하고 고급 경보 옵션을 구성합니다.
* **알림 및 자동화 구성:** 변수를 사용하여 사용자 지정 알림 제목과 메시지를 작성합니다. 알림을 팀에 전송하는 방법(이메일, Slack 또는 PagerDuty)을 선택합니다. 경보 알림에 워크플로 자동화 또는 케이스를 포함합니다.
* **권한 및 감사 알림 정의:** 세분화된 액세스 제어를 구성하고 모니터를 편집할 수 있는 특정 역할 및 사용자를 지정합니다. 모니터가 수정될 경우 알림을 받을 수 있도록 감사 알림을 활성화합니다.

## 검색 쿼리 정의 {#define-the-search-query}

검색 쿼리 작성 방법에 대한 자세한 내용은 각 [모니터 유형][1] 페이지를 참조하세요.

## 미리 보기 그래프 {#preview-graphs}

쿼리를 작성하거나 수정하는 동안 구성 화면 상단의 미리 보기 그래프는 결과를 실시간으로 반영하여 동적으로 업데이트됩니다.

{{< tabs >}}
{{% tab "Evaluated Data" %}}

{{< img src="/monitors/configuration/evaluated_data_preview_high_error_rate.png" alt="Evaluated Data 미리 보기 그래프" style="width:100%;" >}}

Evaluated Data 그래프는 현재 쿼리와 임계값을 기준으로 모니터가 데이터를 어떻게 평가했을지를 보여줍니다. 평가 미리 보기를 사용하면 다음을 수행할 수 있습니다.
- 과거 상태 전환 확인(예: `OK` → `ALERT`)
- 모니터가 어떻게 동작했을지 이해
- 누가 알림을 받게 되는지 미리 확인(알림 규칙에 따른 대상 포함)
- 저장하기 전에 구성 오류를 빠르게 발견

이 기능은 Metrics, Logs, APM, RUM, Events, Audit, Database, Agent Observability 및 Deployment 모니터에서 지원됩니다.

{{% /tab %}}

{{% tab "Source Data" %}}

{{< img src="/monitors/configuration/source_data_graph_high_error_rate.png" alt="Source Data 미리 보기 그래프" style="width:100%;" >}}

Source Data 그래프는 임계값 평가나 경보 로직을 적용하지 않은 상태에서 모니터의 원본 시계열 또는 쿼리 출력 결과를 표시합니다. 이를 통해 다음을 수행할 수 있습니다.

- 모니터가 평가하는 기본 데이터를 시각화.
- 경보 상태 변경과 실제 데이터 추세 간의 상관관계 확인.
- 경보 조건을 구성하기 전에 데이터의 이상, 누락 구간 또는 예상치 못한 패턴 식별.

소스 데이터 그래프를 사용하여 쿼리가 예상한 결과를 반환하는지 확인하고, 경보 임계값과 평가 윈도우를 보다 정확하게 조정할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

## 경보 조건 설정 {#set-alert-conditions}

경보 조건은 [모니터 유형][1]에 따라 달라집니다. 쿼리 값이 임계값을 초과하거나 일정 횟수 이상의 연속 검사 실패가 발생한 경우 모니터를 트리거하도록 구성할 수 있습니다.

{{< tabs >}}
{{% tab "임계값 알림" %}}

* 메트릭의 `average`, `max`, `min` 또는 `sum`이
임계값과 비교하여 * `above`, `above or equal to`, `below` 또는 `below or equal to`이고
* 지난 `5 minutes`, `15 minutes`, `1 hour` 또는 `custom`(1분~48시간 범위 설정 가능, 메트릭 모니터의 경우 1개월) 동안의 기간에 속한 경우 트리거합니다.

### 집계 방식 {#aggregation-method}

쿼리는 일련의 데이터 포인트를 반환하지만, 임계값과 비교하기 위해서는 단일 값이 필요합니다. 따라서 모니터는 평가 윈도우 내의 데이터를 하나의 값으로 축약해야 합니다.

| 옵션                  | 설명                                            |
|-------------------------|--------------------------------------------------------|
| average         | 시계열의 값을 평균하여 단일 값을 생성한 후 임계값과 비교합니다. 모니터 쿼리에 `avg()` 함수를 추가합니다. |
| max | 생성된 시계열 내의 값 중 하나라도 임계값을 초과하면 경보가 트리거됩니다. 모니터 쿼리에 `max()` 함수를 추가합니다.* |
| min  | 쿼리의 평가 윈도우 내 모든 데이터 포인트가 임계값을 초과하면 경보가 트리거됩니다. 모니터 쿼리에 `min()` 함수를 추가합니다.* |
| sum | 시계열의 모든 데이터 포인트 합계가 임계값을 초과하면 경보가 트리거됩니다. 모니터 쿼리에 `sum()` 함수를 추가합니다. |

\* 위의 max 및 min 설명은 메트릭이 임계값을 _초과_할 때 경보가 발생하는 경우를 가정합니다. 메트릭이 임계값 _미만_일 때 경보가 발생하도록 설정된 모니터에서는 max와 min의 동작이 반대로 적용됩니다. 추가 예시는 [모니터 애그리게이터][1] 가이드를 참조하세요.

**참고**: `as_count()`를 사용할 경우 동작 방식이 달라질 수 있습니다. 자세한 내용은 [모니터 평가의 as_count()][2]를 참조하세요.

### 평가 윈도우 {#evaluation-window}

모니터는 누적 시간 윈도우 또는 롤링 시간 윈도우를 사용하여 평가할 수 있습니다. 누적 시간 윈도우는 "현재 시점까지 사용 가능한 모든 데이터의 합계는 얼마인가?"와 같이 과거 맥락이 필요한 질문에 적합합니다. 롤링 시간 윈도우는 "최근 _N_개의 데이터 포인트 평균은 얼마인가?"와 같이 과거 전체 맥락이 필요하지 않은 질문에 적합합니다.

아래 그림은 누적 시간 윈도우와 롤링 시간 윈도우의 차이를 보여줍니다.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="누적 시간 윈도우와 롤링 시간 윈도우를 보여주는 두 개의 그래프. 누적 시간 윈도우는 시간이 지남에 따라 계속 확장됩니다. 롤링 시간 윈도우는 특정 시점을 기준으로 일정 범위를 유지합니다." style="width:100%;">}}

#### 롤링 시간 윈도우 {#rolling-time-windows}

롤링 시간 윈도우는 고정된 크기를 가지며 시간이 지남에 따라 시작 지점이 이동합니다. 모니터는 최근 `5 minutes`, `15 minutes`, `1 hour` 또는 최대 1개월까지의 사용자 지정 시간 윈도우를 기준으로 데이터를 조회할 수 있습니다.

**참고**: [로그 모니터][6]의 최대 롤링 시간 윈도우는 `2 days`입니다.

#### 누적 시간 윈도우 {#cumulative-time-windows}
누적 시간 윈도우는 시작 시점이 고정되어 있으며 시간이 지남에 따라 범위가 확장됩니다. 모니터는 다음 세 가지 누적 시간 윈도우를 지원합니다.

- `Current hour`: 한 시간 중 구성 가능한 분에 시작하며, 최대 1시간 길이의 시간 윈도우입니다. 예를 들어 매시 정각(0)분에 시작하여 1시간 동안 HTTP 엔드포인트가 수신한 호출 수를 모니터링할 수 있습니다.
- `Current day`: 하루 중 구성 가능한 시간과 분에 시작하며, 최대 24시간 길이의 시간 윈도우입니다. 예를 들어 `current day` 시간 윈도우를 사용하고 시작 시간을 UTC 오후 2시로 설정하여 [일일 로그 인덱스 할당량][3]을 모니터링할 수 있습니다.
- `Current month`: 매월 지정된 날짜의 특정 시각과 분부터 시작하여 현재 월을 기준으로 데이터를 조회합니다. 이 옵션은 월 누계 시간 윈도우를 나타내며 메트릭 모니터에서만 사용할 수 있습니다.

{{< img src="/monitors/create/cumulative_window_example_more_options.png" alt="Datadog 인터페이스에서 누적 윈도우가 구성된 방법에 대한 스크린샷. 사용자는 aws.sqs.number_of_messages_received를 검색했습니다. 옵션은 CURRENT MONTH 동안 쿼리의 SUM을 평가하도록 설정되어 있습니다." style="width:100%;">}}

누적 시간 윈도우는 최대 기간에 도달하면 재설정됩니다. 예를 들어 `current month`를 기준으로 하는 누적 시간 윈도우는 매월 1일 UTC 자정에 재설정됩니다. 또한 30분에 시작하는 `current hour` 누적 시간 윈도우는 매시간 재설정됩니다. 예를 들어 오전 6시 30분, 오전 7시 30분, 오전 8시 30분에 재설정됩니다.

### 평가 빈도 {#evaluation-frequency}

평가 빈도는 Datadog이 모니터 쿼리를 얼마나 자주 실행하는지를 정의합니다. 대부분의 구성에서 평가 빈도는 `1 minute`입니다. 즉, 매분마다 모니터가 [선택된 데이터](#define-the-search-query)를 [선택된 평가 윈도우](#evaluation-window) 동안 조회하고, 집계된 값을 [정의된 임계값](#thresholds)과 비교합니다.

기본적으로 평가 빈도는 사용 중인 [평가 윈도우](#evaluation-window)에 따라 결정됩니다. 평가 윈도우가 길어질수록 평가 빈도는 낮아집니다. 다음 표는 더 긴 시간 윈도우에 따라 평가 빈도가 어떻게 조정되는지 보여줍니다.

| 평가 윈도우 범위        | 평가 빈도  |
|---------------------------------|-----------------------|
| 윈도우 < 24시간               | 1분              |
| 24시간 <= 윈도우 < 48시간   | 10분            |
| 윈도우 >= 48시간              | 30분            |

모니터의 경보 조건을 매일, 매주 또는 매월 확인하도록 평가 빈도를 구성할 수도 있습니다. 이 구성에서 평가 빈도는 더 이상 평가 윈도우에 의해 결정되지 않고, 구성된 일정에 따라 결정됩니다.

자세한 내용은 [모니터 평가 빈도 사용자 지정][4] 가이드를 참조하세요.

### 임계값 {#thresholds}

임계값을 사용하여 경보를 트리거할 수 있는 수치 값을 설정합니다. 선택한 메트릭에 따라 편집기에는 사용되는 단위(`byte`, `kibibyte`, `gibibyte` 등)가 표시됩니다.

Datadog은 두 가지 유형의 알림(경보 및 경고)을 제공합니다. 모니터는 경보 또는 경고 임계값을 기준으로 자동 복구되지만, 추가 조건을 지정할 수도 있습니다. 복구 임계값에 대한 자세한 내용은 [복구 임계값이란 무엇인가요?][5]를 참조하세요. 예를 들어 메트릭이 `3`을 초과할 때 모니터가 경보를 발생시키고 복구 임계값이 지정되지 않은 경우, 메트릭 값이 다시 `3` 아래로 내려가면 모니터가 자동으로 복구됩니다.

| 옵션                                   | 설명                    |
|------------------------------------------|--------------------------------|
| 경보&nbsp;임계값&nbsp;**(필수)** | 경보 알림을 트리거하는 데 사용되는 값입니다. |
| 경고&nbsp;임계값                   | 경고 알림을 트리거하는 데 사용되는 값입니다. |
| 경보&nbsp;복구&nbsp;임계값       | 경보 복구를 위한 추가 조건을 지정하는 선택적 임계값입니다. |
| 경고&nbsp;복구&nbsp;임계값     | 경고 복구를 위한 추가 조건을 지정하는 선택적 임계값입니다. |

임계값을 변경하면 편집기의 미리 보기 그래프에 기준 지점을 나타내는 마커가 표시됩니다.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="임계값 미리 보기 그래프" style="width:100%;">}}

**참고**: 임계값에 소수 값을 입력할 때 값이 `<1`인 경우 숫자 앞에 `0`을 추가하세요. 예를 들어 `.5`가 아니라 `0.5`를 사용하세요.


[1]: /ko/monitors/guide/monitor_aggregators/
[2]: /ko/monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/ko/logs/log_configuration/indexes/#set-daily-quota
[4]: /ko/monitors/guide/custom_schedules
[5]: /ko/monitors/guide/recovery-thresholds/
[6]: /ko/monitors/types/log/
{{% /tab %}}
{{% tab "검사 경보" %}}

검사 경보는 각 검사 그룹에서 연속적으로 제출된 상태를 추적하고 이를 임계값과 비교합니다. 검사 경보를 다음과 같이 설정할 수 있습니다.

1. 선택한 횟수만큼 연속 실패한 후 경보 트리거: `<NUMBER>`

    각 검사 실행은 `OK`, `WARN` 또는 `CRITICAL` 중 하나의 상태를 제출합니다. `WARN` 및 `CRITICAL` 상태가 몇 회 연속 발생했을 때 알림을 보낼지 선택합니다. 예를 들어 프로세스에서 연결 실패가 한 번만 발생하는 일시적인 문제가 있을 수 있습니다. 이 값을 `> 1`로 설정하면 이러한 일시적인 문제는 무시되지만, 두 번 이상 연속 실패하는 경우에는 알림이 전송됩니다.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="검사 임계값 경보/경고" style="width:90%;">}}

2. 선택한 횟수만큼 연속 성공한 후 경보 해제: `<NUMBER>`

    `OK` 상태가 몇 회 연속 발생했을 때 경보를 해제할지 선택합니다.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="검사 임계값 복구" style="width:90%;">}}

검사 경보 구성에 대한 자세한 내용은 [프로세스 검사][1], [통합 검사][2], [사용자 지정 검사][3] 모니터 설명서를 참조하세요.



[1]: /ko/monitors/types/process_check/
[2]: /ko/monitors/types/integration/?tab=checkalert#integration-metric
[3]: /ko/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### 고급 경보 조건 {#advanced-alert-conditions}

#### 데이터 없음 {#no-data}

누락된 데이터에 대한 알림은 정상적인 상황에서 메트릭이 항상 데이터를 보고해야 하는 경우에 유용합니다. 예를 들어 Agent가 설치된 호스트가 항상 실행 상태여야 한다면, `system.cpu.idle` 메트릭이 지속적으로 데이터를 보고할 것으로 기대할 수 있습니다.

이 경우 데이터 누락 알림을 활성화하는 것이 좋습니다. 아래 섹션에서는 각 옵션을 사용하여 이를 설정하는 방법을 설명합니다.

**참고**: 데이터 누락에 대한 경보를 발생시키려면 먼저 모니터가 데이터를 평가할 수 있어야 합니다. 예를 들어 `service:abc`에 대한 모니터를 생성했는데 해당 `service`의 데이터가 보고되지 않는 경우, 모니터는 경보를 전송하지 않습니다.

데이터가 `N`분 동안 누락된 경우, 드롭다운 메뉴에서 옵션을 선택하세요.

{{< img src="/monitors/create/on_missing_data.png" alt="데이터 없음 옵션" style="width:70%;">}}

- `Evaluate as zero` / `Show last known status`
- `Show NO DATA`
- `Show NO DATA and notify`
- `Show OK`.

선택한 동작은 모니터의 쿼리가 어떠한 데이터도 반환하지 않을 때 적용됩니다. `Do not notify` 옵션과 달리, 데이터 누락 윈도우는 구성할 수 **없습니다**

| 옵션                    | 모니터 상태 및 알림                                             |
|---------------------------|---------------------------------------------------------------------------|
| `Evaluate as zero`        | 빈 결과를 0으로 대체한 후 경보/경고 임계값과 비교합니다. 예를 들어 경보 임계값이 `> 10`으로 설정된 경우, 값 0은 해당 조건을 충족하지 않으므로 모니터링 상태는 `OK`로 설정됩니다.   |
| `Show last known status`  | 그룹 또는 모니터의 마지막으로 알려진 상태가 설정됩니다.                        |
| `Show NO DATA`            | 모니터 상태가 `NO DATA`로 설정됩니다.                                       |
| `Show NO DATA and notify` | 모니터 상태가 `NO DATA`로 설정되며 알림이 전송됩니다.        |
| `Show OK`                 | 모니터가 해결됨으로 처리되고 상태가 `OK`로 설정됩니다.                            |

`Evaluate as zero` 및 `Show last known status` 옵션은 쿼리 유형에 따라 표시됩니다.

- **Evaluate as zero:** 이 옵션은 `default_zero()` 함수가 없는 `Count` 쿼리를 사용하는 모니터에서 사용할 수 있습니다.
- **Show last known status:** 이 옵션은 `Count`를 제외한 모든 쿼리 유형(예: `Gauge`, `Rate`, `Distribution`)과 `default_zero()`가 포함된 `Count` 쿼리에서 사용할 수 있습니다.

#### 자동 해결 {#auto-resolve}

`[Never]`, `After 1 hour`, `After 2 hours` 등의 상태를 트리거된 상태에서 자동으로 해결합니다.

자동 해결은 데이터가 더 이상 제출되지 않을 때 작동합니다. 데이터가 계속 보고되는 경우 모니터는 ALERT 또는 WARN 상태에서 자동으로 해결되지 않습니다. 데이터가 계속 제출되는 경우에는 [다시 알리기][2] 기능을 사용하여 문제가 아직 해결되지 않았음을 팀에 알릴 수 있습니다.

주기적으로 보고되는 일부 메트릭의 경우, 트리거된 경보가 일정 시간이 지나면 자동으로 해결되도록 설정하는 것이 적절할 수 있습니다. 예를 들어 오류가 기록될 때만 값을 보고하는 카운터가 있다고 가정해 보겠습니다. 이 경우 메트릭은 오류 수가 `0`임을 보고하지 않으므로 경보가 영구적으로 해결되지 않습니다. 이러한 경우에는 메트릭에 일정 시간 동안 활동이 없으면 경보가 해결되도록 설정할 수 있습니다. **참고**: 모니터가 자동 해결된 후 다음 평가 시점에 쿼리 값이 복구 임계값을 충족하지 못하면 모니터는 다시 경보를 트리거합니다.

대부분의 경우 이 설정은 크게 유용하지 않습니다. 일반적으로는 실제로 문제가 해결된 경우에만 경보가 해제되기를 원하기 때문입니다. 따라서 일반적으로는 이 값을 `[Never]`로 유지하여 메트릭이 설정된 임계값 위 또는 아래로 이동했을 때만 경보가 해결되도록 하는 것이 적절합니다.

#### 그룹 보존 시간 {#group-retention-time}

데이터가 누락된 상태가 `N`시간 지속되면 해당 그룹을 모니터 상태에서 제거할 수 있습니다. 보존 시간은 최소 1시간에서 최대 72시간까지 설정할 수 있습니다. 다중 경보 모니터의 경우 **Remove the non-reporting group after `N (length of time)`**를 선택하세요.

{{< img src="/monitors/create/group_retention_time.png" alt="그룹 보존 시간 옵션" style="width:70%;">}}

[자동 해결 옵션][3]과 마찬가지로 그룹 보존 시간은 데이터가 더 이상 제출되지 않을 때 적용됩니다. 이 옵션은 데이터 보고가 중단된 후 해당 그룹을 모니터 상태에 얼마나 오래 유지할지를 제어합니다. 기본적으로 그룹은 상태를 24시간 동안 유지한 후 제거됩니다. 모니터 쿼리가 더 이상 데이터를 반환하지 않게 되는 시점부터 그룹 보존 시간과 자동 해결 옵션의 시작 시점은 **동일합니다**.

그룹 보존 시간을 설정하는 대표적인 사용 사례는 다음과 같습니다.

- 데이터 보고가 중단된 즉시 또는 짧은 시간 후에 그룹을 제거하려는 경우
- 일반적으로 문제 해결에 소요되는 기간만큼 그룹 상태를 유지하려는 경우

**참고**: 그룹 보존 시간 옵션은 [`On missing data`][4] 옵션을 지원하는 다중 경보 모니터에서만 사용할 수 있습니다. 해당 모니터 유형에는 APM Trace Analytics, Audit Logs, CI Pipelines, Error Tracking, Events, Logs 및 RUM 모니터가 포함됩니다.

#### 새 그룹 지연 {#new-group-delay}

새 그룹에 대해 평가 시작을 `N`초 지연합니다.

새로 생성된 그룹이 부팅되고 애플리케이션이 완전히 시작될 수 있도록 경보를 시작하기 전에 대기할 시간(초)을 지정합니다. 이 값은 0 이상의 정수여야 합니다.

예를 들어 컨테이너화된 아키텍처를 사용하는 경우, 그룹 지연을 설정하면 새 컨테이너가 생성될 때 발생하는 높은 리소스 사용량이나 높은 지연 시간으로 인해 컨테이너 범위의 모니터 그룹이 경보를 트리거하는 것을 방지할 수 있습니다. 이 지연은 지난 24시간 동안 관찰되지 않았던 모든 새 그룹에 적용되며 기본값은 `60`초입니다.

이 옵션은 다중 경보 모드에서 사용할 수 있습니다.

#### 평가 지연 {#evaluation-delay}

<div class="alert alert-info">Datadog은 서비스 공급자가 사후 보완하는 클라우드 메트릭의 경우 15분 지연을 권장합니다. 또한 나눗셈 공식을 사용하는 경우에는 모니터가 완전한 값을 기준으로 평가할 수 있도록 60초 지연을 설정하는 것이 유용합니다. 예상 지연 시간은 <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
">클라우드 메트릭 지연</a> 페이지를 참조하세요.</div>

평가를 `N`초만큼 지연합니다.

이는 평가를 지연할 시간(초)을 의미합니다. 이 값은 0 이상의 정수여야 합니다. 예를 들어 지연 시간이 900초(15분)로 구성되어 있고 모니터 평가 기간이 최근 `5 minutes`이며 현재 시간이 7:00인 경우, 모니터는 6:40~6:45 구간의 데이터를 평가합니다. 구성 가능한 최대 평가 지연 시간은 86,400초(24시간)입니다.

## 알림 및 자동화 구성 {#configure-notifications-and-automations}

알림 메시지에 가장 중요하게 생각하는 정보를 포함하도록 구성합니다. 또한 어떤 팀에 경보를 전송할지와 어떤 속성에 대해 경보를 발생시킬지 지정합니다.

### 메시지 {#message}

이 섹션에서는 팀에 대한 알림과 경보 전송 방식을 구성합니다.

  - [템플릿 변수를 사용하여 알림 구성][5]
  - [이메일, Slack 또는 PagerDuty를 통해 팀에 알림 전송][6]

알림 메시지의 구성 옵션에 대한 자세한 내용은 [Alerting Notifications][7]을 참조하세요.

### 메타데이터 추가 {#add-metadata}

<div class="alert alert-info">모니터 태그는 Agent 또는 통합에서 전송하는 태그와는 별개입니다. 자세한 내용은 <a href="/monitors/manage/">모니터 관리 설명서</a>를 참조하세요.</div>

1. **Tags** 드롭다운을 사용하여 모니터에 [태그][8]를 연결합니다.
1. **Teams** 드롭다운을 사용하여 모니터에 [Teams][9]를 연결합니다.
1. **Priority**를 선택합니다.

### 경보 집계 설정 {#set-alert-aggregation}

경보는 쿼리에서 선택한 집계 방식(예: `avg by service`)에 따라 자동으로 그룹화됩니다. 쿼리에 그룹화가 없는 경우 기본값은 `Simple Alert`입니다. 쿼리가 어떤 차원으로든 그룹화된 경우에는 그룹화가 `Multi Alert`으로 변경됩니다.

{{< img src="/monitors/create/notification-aggregation.png" alt="모니터 알림 집계 구성 옵션" style="width:100%;">}}

#### 단순 경고 {#simple-alert}

`Simple Alert` 모드는 모든 보고 소스를 집계하여 하나의 알림을 트리거합니다. 집계된 값이 설정된 조건을 충족하면 **하나의 경보**를 받게 됩니다. 예를 들어 모든 서버의 평균 CPU 사용량이 특정 임계값을 초과할 때 알림을 받도록 모니터를 설정할 수 있습니다. 이 경우 해당 임계값이 충족되면, 임계값을 초과한 개별 서버 수와 관계없이 하나의 알림만 수신합니다. 이는 시스템 전반의 추세나 동작을 모니터링하는 데 유용합니다.


{{< img src="/monitors/create/simple-alert.png" alt="단순 경고 모드에서 모니터 알림이 전송되는 방식을 보여주는 다이어그램" style="width:90%;">}}

#### 다중 경보 {#multi-alert}

`Multi Alert` 모니터는 경보 임계값을 충족하는 각 엔터티에 대해 개별 알림을 트리거합니다.

{{< img src="/monitors/create/multi-alert.png" alt="다중 경보 모드에서 모니터 알림이 전송되는 방식을 보여주는 다이어그램" style="width:90%;">}}

예를 들어 서비스별로 집계한 P99 지연 시간이 특정 임계값을 초과할 때 알림을 받도록 모니터를 설정한 경우, 임계값을 초과한 각 서비스마다 **별도의** 경보를 받게 됩니다. 이는 시스템 또는 애플리케이션의 특정 문제를 식별하고 해결하는 데 유용합니다. 보다 세부적인 수준에서 문제를 추적할 수 있습니다.

##### 알림 그룹화 {#notification-grouping}

대규모 엔터티 그룹을 모니터링하는 경우 다중 경보를 사용하면 모니터가 지나치게 시끄러워질 수 있습니다. 이를 완화하기 위해 어떤 차원이 경보를 트리거할지 사용자 지정할 수 있습니다. 이렇게 하면 불필요한 알림을 줄이고 가장 중요한 경보에 집중할 수 있습니다. 예를 들어 모든 호스트의 평균 CPU 사용량을 모니터링하고 있다고 가정해 보겠습니다. 쿼리를 `service` 및 `host` 기준으로 그룹화했지만, 임계값을 초과한 각 `service` 속성에 대해서만 한 번씩 알림을 받고 싶다면 다중 경보 옵션에서 `host` 속성을 제거하여 전송되는 알림 수를 줄일 수 있습니다.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="다중 경보에서 특정 차원 기준으로 알림이 전송되는 방식을 보여주는 다이어그램" style="width:90%;">}}

`Multi Alert` 모드에서 알림을 집계하는 경우, 집계되지 않은 차원은 UI에서 `Sub Groups`가 됩니다.

**참고**: 메트릭이 `host` 태그만 보고하고 `service` 태그는 보고하지 않는 경우, 해당 메트릭은 모니터에서 감지되지 않습니다. 반면 `host` 태그와 `service` 태그가 모두 있는 메트릭은 모니터에서 감지됩니다.

쿼리에서 태그 또는 차원을 구성하면, 해당 값은 다중 경보에서 평가되는 모든 그룹에 대해 사용할 수 있으며 알림 메시지에 유용한 컨텍스트를 동적으로 채워 넣는 데 활용할 수 있습니다. 알림 메시지에서 태그 값을 참조하는 방법은 [속성 및 태그 변수][10]를 참조하세요.

| 그룹화 기준                       | 단순 경고 모드 | 다중 경보 모드 |
|-------------------------------------|------------------------|-----------------------|
| _(전체)_                      | 하나의 그룹이 하나의 알림을 트리거 | 해당 없음 |
| 1개&nbsp;이상의&nbsp;차원&nbsp;| 하나 이상의 그룹이 경보 조건을 충족하면 하나의 알림 전송 | 경보 조건을 충족하는 그룹마다 하나의 알림 전송 |

## 권한 {#permissions}

모든 사용자는 자신이 속한 팀이나 역할과 관계없이 모든 모니터를 볼 수 있습니다. 기본적으로 [Monitors Write 권한][11]이 있는 역할과 관련된 사용자만 모니터를 편집할 수 있습니다. [Datadog Admin 역할 및 Datadog Standard 역할][12]에는 기본적으로 Monitors Write 권한이 포함되어 있습니다. 조직에서 [사용자 지정 역할][13]을 사용하는 경우, 다른 사용자 지정 역할에도 Monitors Write 권한이 부여될 수 있습니다. 모니터의 RBAC를 설정하고 설정 잠김에서 역할 제한 사용으로 모니터를 마이그레이션하는 자세한 방법은 [모니터의 RBAC 설정 방법][14] 가이드를 참조하세요.

또한 모니터를 편집할 수 있는 [팀][17], [역할][15] 또는 사용자의 목록을 지정하여 모니터를 더욱 제한할 수 있습니다. 모니터 생성자는 기본적으로 해당 모니터에 대한 편집 권한을 가집니다. 편집 권한에는 모니터링 구성 업데이트, 모니터링 삭제, 그리고 원하는 기간만큼 모니터 음소거가 포함됩니다.

**참고**: 이러한 제한은 UI와 API 모두에 적용됩니다.

### 세분화된 액세스 제어 {#granular-access-controls}

[세분화된 액세스 제어][16]를 사용하여 모니터를 편집할 수 있는 팀, 역할 또는 사용자를 제한할 수 있습니다.
1. 모니터를 편집하거나 구성하는 동안 **권한 및 감사 알림 정의** 섹션을 찾습니다.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="권한 정의를 위한 모니터 구성 옵션" style="width:70%;" >}}
1. **Edit Access**를 클릭합니다.
1. **Restrict Access**를 클릭합니다.
1. 대화 상자가 업데이트되며 조직 구성원은 기본적으로 **Viewer** 권한을 갖는 것으로 표시됩니다.
1. 드롭다운을 사용하여 모니터를 편집할 수 있는 하나 이상의 팀, 역할 또는 사용자를 선택합니다.
1. **Add**를 클릭합니다.
1. 대화 상자가 업데이트되며 선택한 역할에 **Editor** 권한이 부여된 것으로 표시됩니다.
1. **Done**을 클릭합니다.

**참고:** 모니터에 대한 편집 권한을 유지하려면 저장하기 전에 자신이 속한 역할 또는 팀을 최소 하나 이상 포함해야 합니다.

액세스가 제한된 모니터를 다시 모든 사용자가 접근할 수 있도록 하려면 다음 단계를 따르세요.
1. 모니터를 보는 동안 **More** 드롭다운 메뉴를 클릭합니다.
1. **Permissions**를 선택합니다.
1. **Restore Full Access**를 클릭합니다.
1. **Save**를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types
[2]: /ko/monitors/notify/#renotify
[3]: /ko/monitors/configuration/?tab=thresholdalert#auto-resolve
[4]: /ko/monitors/configuration/?tabs=othermonitortypes#no-data
[5]: /ko/monitors/notify/variables/
[6]: /ko/monitors/notify/#configure-notifications-and-automations
[7]: /ko/monitors/notify/
[8]: /ko/getting_started/tagging/
[9]: /ko/account_management/teams/
[10]: /ko/monitors/notify/variables/?tab=is_alert#attribute-and-tag-variables
[11]: /ko/account_management/rbac/permissions/#monitors
[12]: /ko/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[13]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[14]: /ko/monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /ko/account_management/rbac/
[16]: /ko/account_management/rbac/granular_access
[17]: /ko/account_management/teams/
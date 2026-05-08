---
aliases:
- /ko/monitors/service_level_objectives/burn_rate/
description: 모니터를 사용하여 SLO의 경비 지출을 알립니다.
further_reading:
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: 블로그
  text: 경비 지출은 더 나은 오류율입니다.
title: 경비 지출 알림
---
{{< jqmath-vanilla >}}

## 개요

SLO 경비 지출 알림은 SLO 오류 예산의 소진율이 지정된 임계값을 초과하고 특정 기간 동안 지속될 때 작동합니다. 예를 들어 SLO의 30일 목표에 대해 지난 1시간과 지난 5분 동안 14.4 이상의 경비 지출이 측정된 경우 알림을 설정할 수 있습니다. 또한 7.2 이상의 경비 지출와 같이 약간 낮은 임계값을 경고하도록 선택적으로 설정할 수 있습니다.

다음 SLO 유형에 경비 지출 알림을 사용할 수 있습니다.

- [메트릭 기반 SLO][1],
- 메트릭 모니터 유형(메트릭, 통합, APM 메트릭, 이상치, 예측 또는 아웃라이어 모니터)으로만 구성된 [모니터 기반 SLO][2]
- [타임 슬라이스 SLO][7]

{{< img src="service_management/service_level_objectives/slo-burn-rate-alert-v2.png" alt="경비 지출 알림 설정">}}

## 경비 지출 알림의 작동 방식

경비 지출은 [Google에서 만든][3] 단위가 없는 값으로, SLO의 목표 기간에 비해 오류 예산이 얼마나 빨리 소진되는지를 나타냅니다. 예를 들어 30일 목표인 경우 경비 지출이 1로 일정하게 유지되면 오류 예산이 정확히 30일 안에 모두 소진된다는 의미입니다. 경비 지출이 2로 일정하게 유지되면  15일 안에 소진되고, 경비 지출이 3이면 10일 안에 소진됩니다.

이 관계는 다음 공식에서 나타납니다:

$${\text"length of SLO target" \text" (7, 30 or 90 days)"} / \text"burn rate" = \text"time until error budget is fully consumed"\$$

관찰된 경비 지출을 측정하기 위해 경비 지출 알림을 최근 "오류율"을 계산에 사용합니다. "오류율"은 *지정된 기간* 동안의 총 동작 대비 불량 동작의 비율을 의미합니다:

$$\text"error rate" = 1 - {\text"good behavior during time period" / \text"total behavior during time period"}$$

"동작"의 단위는 SLO 유형에 따라 달라집니다. 메트릭 기반 SLO는 성공한 요청 또는 실패한 요청 횟수 등 특정 항목의 발생 횟수를 추적하는 반면, 모니터 기반 SLO는 모니터의 다운타임 및 가동 시간과 같은 시간의 양을 추적합니다.

99.9%와 같은 SLO 목표를 설정할 때 오류 예산은 허용 가능한 범주 내에 있는 불안정성의 양을 의미합니다:

$$\text"error budget" = 100% - \text"SLO Target"$$

다시 말해, 오류 예산(분수 형식)은 이상적인 오류율입니다. 따라서 경비 지출은 이상적인 오류율의 배수로 해석할 수도 있습니다. 예를 들어, 30일 동안 99.9%의 SLO에서 경비 지출이 10인 경우, 오류 예산이 3일 내에 완전히 고갈되며 관찰된 오류율이 이상적인 오류율의 10배라는 것을 의미합니다:

$$(\text"burn rate") (\text"ideal error rate") = \text"observed error rate"$$
$$(10)(0.001) = 0.01$$

애플리케이션의 새로운 기능 개발에 투자할 때 SLO의 목표 기간 동안 항상 1의 경비 지출을 유지하는 것이 이상적입니다. 그러나 실제로는 문제나 사고가 발생하여 경비 지출이 급격히 증가할 수 있습니다. 이러한 상황에서 경비 지출 알림을 사용하면 오류 예산이 빠른 속도로 소모되어 SLO 목표를 놓치게 되는 것을 대비할 수 있습니다.

경비 지출 알림을  설정할 때 경비 지출 임계값과 함께 관찰된 경비 지출을 측정할 "긴 경고 창" 및 "짧은 경고 창"을 지정합니다. 시간 단위로 지정되는 긴 경고 창은 모니터가 충분한 기간 동안 경비 지출을 측정하여 중요한 문제에 대응하도록 합니다. 이렇게 하면 모니터가 사소한 문제로 불규칙한 알림을 트리거하는 것을 방지할 수 있습니다. 짧은 경고 창은 분 단위로 지정됩니다. 최근 경비 지출이 여전히 임계값을 초과하는지 확인하여 문제가 종료되었을 때 모니터가 빠르게 복구되도록 합니다. Google은 짧은 창을 긴 창의 1/12로 설정할 것을 권장합니다. Datadog에서 API 또는 Terraform을 통해 프로그래밍 방식으로 짧은 창을 사용자 지정할 수 있습니다. 다음은 경비 지출 알림 평가에 대한 공식입니다.

$$(\text"long window error rate" / {1 - \text"SLO target"} ≥ \text"burn rate threshold") ∧ (\text"short window error rate" / {1 - \text"SLO target"} ≥ \text"burn rate threshold") = \text"ALERT"$$

## 최대 경비 지출 값

이 공식을 사용하면 긴 창과 짧은 창에서 관찰된 경비 지출을 평가할 수 있습니다:

$$\text"error rate" / {1 - \text"SLO target"}$$

관찰 가능한 최대 오류율은 1입니다(예: 주어진 기간 동안 전체 동작의 100%가 불량한 경우). 즉, 경비 지출 알림에서 사용할 수 있는 최대 경비 지출 값이 있다는 뜻입니다:

$$\text"max burn rate" = 1 / {1 - \text"SLO target"}$$

SLO 목표가 낮을수록 최대 경비 지출 값도 낮아집니다. 이 값보다 높은 경비 지출 임계값을 설정하려고 하면 알림이 트리거 되지 않습니다. 위의 공식에 의해 결정된 최댓값보다 높은 값으로 경비 지출 알림의 조건을 설정하면, SLO의 오류율이 100%를 초과할 때(사실상 불가능) 경비 지출 알림이 작동되도록 지시하는 것입니다. Datadog은 이러한 알림이 실수로 생성되지 않도록 최댓값보다 높은 경비 지출 값을 가진 알림 생성을 차단합니다.

## 경비 지출 값 선택하기

알림을 보낼 경비 지출 값을 선택하는 것은 SLO에서 사용하는 목표와 시간 창에 따라 다릅니다. 경비 지출 알림을 설정할 때는 경비 지출 임계값과 긴 창을 설정하는 데 중점을 두어야 합니다. Datadog은 Google의 권장 사항대로 짧은 창을 긴 창의 1/12로 유지한 다음, 필요한 경우 값을 조정할 것을 권장합니다. 최대 경비 지출은 앞서 설명한 연유에 따라 제한됩니다. 

### 접근법 #1: 오류 예산 고갈 시간

경비 지출 임계값의 경우 이전 관계를 기억하세요:

$$\text"length of SLO target (7, 30, or 90 days)" / \text"burn rate" = \text"time until error budget is fully consumed"$$
Solve for burn rate and pick a time until the error budget is fully consumed that would qualify as a significant issue. 

긴 창에서는 중요한 문제를 나타내기 위해 높은 경비 지출이 지속되어야 하는 기간을 선택합니다. 경비 지출이 높을수록 긴 창을 작게 설정하면 심각도가 높은 문제를 더 빨리 발견할 수 있습니다.

### 접근법 #2: 이론적 오류 예산 소비

또는 이론적 오류 예산 소비 측면에서 경비 지출와 긴 창의 페어링을 고려할 수 있습니다.

$$\text"burn rate" = {\text"length of SLO target (in hours) " * \text" percentage of error budget consumed"} / {\text"long window (in hours) " * 100%}$$

예를 들어, 7일의 SLO에서 이론적 오류 예산 소비량이 10%, 긴 창에서 1시간인 경우 알림을 받으려면 선택한 경비 지출은 다음과 같아야 합니다:

$$\text"burn rate" = {7 \text"days" * 24 \text"hours" * 10% \text"error budget consumed"} / {1 \text"hour" * 100%} = 16.8$$

**참고:** 메트릭 기반 SLO의 경우 접근법 #2의 관계는 긴 창에 포함된 총 발생 횟수를 SLO 목표의 전체 길이로 추정합니다. 그러나 실제로 관찰된 오류 예산 소비는 이 관계와 정확히 일치하지 않을 수 있는데, 이는 롤링 창에서 메트릭 기반 SLO가 추적하는 총 발생 건수가 하루 종일 다를 가능성이 높기 때문입니다. 경비 지출 알림은 상당한 양의 오류 예산 소비가 발생하기 전에 이를 예측하기 위한 것입니다. 모니터 기반 SLO의 경우, 시간은 항상 일정한 속도로 이동하기 때문에 이론적 오류 예산 소비량과 실제 오류 예산 소비량은 동일합니다. 예를 들어, 60분 분량의 모니터 데이터는 항상 1시간 창에 포함됩니다.

## 모니터 생성

1. [SLO 상태 페이지][4]로 이동하세요.
2. 새 SLO를 만들거나 기존 SLO를 편집한 다음 **알림 저장 및 설정* 버튼을 클릭합니다. 기존 SLO의 경우 SLO 세부 정보 사이드 패널에서 **알림 설정** 버튼을 클릭하여 바로 이동할 수도 있습니다.
3. **1단계: 알림 조건 설정**에서 **경비 지출** 탭을 선택합니다
4. 긴 창에서 특정한 경비 지출이 측정될 때 알림이 작동하도록 설정합니다:
   * 경비 지출은 다음의 범위에 있어야 합니다.
     $$0 < \text"burn rate" ≤ 1 / {1 - \text"SLO target"}$$
   * Datadog은 긴 창에 대해 최대 48시간의 값을 지원합니다. 긴 창은 `1 hour <= long window <= 48 hours`의 범위에 있어야 합니다.
   * 그러면 짧은 창이  `short window = 1/12 * long window` 자동으로 계산됩니다.
   * [API 또는 Terraform](#api-and-terform)을 사용하여 다른 짧은 창 값을 지정할 수 있지만 긴 창보다는 항상  작아야 합니다.
5. **Configure notifications and automations** 섹션에 [알림 정보][4]를 추가합니다.
6. SLO 설정 페이지에서 **저장 및 종료** 버튼을 클릭합니다.

### 그룹별 SLO 알림 설정

그룹이 포함된 Time Slice SLO의 경우, SLO 그룹 또는 전체 SLO를 기준으로 경비 지출 알림을 설정할 수 있습니다. 그룹을 기준으로 알림을 설정하는 경우, [알림 집계][8]를 구성하여 단순 알림 또는 다중 알림을 사용할 수 있습니다. 메트릭 및 모니터 기반 SLO의 경우 전체 SLO를 기준으로 경비 지출 알림만 설정할 수 있습니다.

### 예시

다음 표는 7일, 30일 및 90일 목표에 대한 Datadog의 권장 값입니다.

- 이러한 예는 99.9%의 목표를 가정하지만 96% (96%에 대한 최대 경비 지출은 25) 정도의 낮은 목표에 적합합니다. 그러나 더 낮은 목푯값을 사용하는 경우 [최대 경비 지출 값](#maximum-burn-rate-values) 섹션에 설명된 대로 더 낮은 임계값이 필요할 수 있습니다. Datadog은 소비된 이론적 오류 예산에 대해 더 작은 값 또는 긴 창에 대해 더 높은 값을 적용해 [접근법 #2](#approach-2-theoretical-error-budget-consumption)를 사용할 것을 권장합니다.
- 메트릭 기반 SLO의 경우, 소비된 이론적 오류 예산은 긴 알림 창에서 관찰된 총 발생 횟수를 SLO 목표의 총 길이로 추정하여 계산됩니다.

7일 목표인 경우:

| 경비 지출 | 긴 창 | 짧은 창 | 소비된 이론적 오류 예산 |
|---|---|---|---|
| 16.8  | 1시간  | 5분  | 10%  |
| 5.6  | 6시간  | 30분  | 20%  |
| 2.8  | 24시간  | 120분  | 40%  |

30일 목표인 경우:

| 경비 지출 | 긴 창 | 짧은 창 | 소비된 이론적 오류 예산 |
|---|---|---|---|
| 14.4  | 1시간  | 5분  | 2%  |
| 6  | 6시간  | 30분  | 5%  |
| 3  | 24시간  | 120분  | 10%  |

90일 목표인 경우:

| 경비 지출 | 긴 창 | 짧은 창 | 소비된 이론적 오류 예산 |
|---|---|---|---|
| 21.6  | 1시간  | 5분  | 1%  |
| 10.8  | 6시간  | 30분  | 3%  |
| 4.5  | 24시간  | 120분  | 5%  |

**권장 사항:** 경비 지출 알림이 지속적으로 불안정하다면 짧은 창을 조금 더 크게 설정해야 합니다. 단, 짧은 창을 크게 설정할수록 문제가 종료된 후 모니터의 복구 속도가 느려진다는 점을 유의하세요.

### API 와 Terraform

[create-monitor API endpoint][5]를 사용하여 SLO 경비 지출 알림을 생성할 수 있습니다. 다음은 지난 1시간과 지난 5분 동안 14.4의 경비 지출이 측정될 때 알림을 생성하기 위한 쿼리 예제입니다.  *slo_id*를 경비 지출 알림을 설정하고자 하는 SLO의 영숫자 ID로 변경하고 SLO 목표에 따라 *time_window*를 7일, 30일 또는 90일 중 하나로 변경합니다:

```
burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
```

또한 [Terraform의 datadog_monitor resource][6]를 사용하여 SLO 경비 지출 알림을 생성할 수 있습니다. 다음은  메트릭 기반 SLO에 대한 경비 지출 알림을 설정할 수 있는 .tf의 예입니다.

**참고:** SLO 경비 지출 알림은 Terraform v2.7.0 또는 이전 버전, v2.13.0 또는 이상 버전에서만 지원됩니다. v2.7.0과 v2.13.0 사이의 버전에서는 지원되지 않습니다.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Burn Rate Alert Example"
    type  = "slo alert"

    query = <<EOT
    burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 14.4
    }
    tags = ["foo:bar", "baz"]
}
```


[1]: /ko/service_management/service_level_objectives/metric/
[2]: /ko/service_management/service_level_objectives/monitor/
[3]: https://sre.google/workbook/alerting-on-slos/
[4]: https://app.datadoghq.com/slo
[5]: /ko/api/v1/monitors/#create-a-monitor
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[7]: /ko/service_management/service_level_objectives/time_slice
[8]: /ko/monitors/configuration/#set-alert-aggregation
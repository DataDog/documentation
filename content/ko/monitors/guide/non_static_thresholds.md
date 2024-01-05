---
further_reading:
- link: /monitors/types/composite/
  tag: 설명서
  text: 컴포지트 모니터
- link: /monitors/types/anomaly/
  tag: 설명서
  text: 이상 징후 모니터
kind: 가이드
title: 비정적 임계값을 모니터링하는 방법
---

## 개요

일반적인 메트릭 모니터는 단일 메트릭이 특정 임계값을 초과하면 경고를 트리거합니다. 예를 들어, 디스크 사용량이 80%를 초과하면 트리거되도록 경고를 설정할 수 있습니다. 이 접근 방식은 많은 사용 사례에 효율적이지만 임계값이 절대 숫자가 아닌 변수인 경우 어떻게 될까요?

Watchdog 기반 모니터(즉, [이상 징후][1] 및 [아웃라이어][2])는 측정항목이 트랙을 벗어나는 것에 대한 명시적인 정의가 없을 때 특히 유용합니다. 그러나 가능하다면 특정 사용 사례에 대한 정확성을 최대화하고 경고 시간을 최소화하기 위해 맞춤형 경고 조건이 포함된 일반 모니터를 사용해야 합니다.

이 가이드는 비정적 임계값 경고에 대한 일반적인 사용 사례를 다룹니다:
  - [**시즌별 변동치**를 벗어난 메트릭에 대한 경고](#seasonal-threshold) 
  - [다른 **참조** 메트릭의 값을 기준으로 경고](#reference-threshold)

## 시즌별 임계값

### 컨텍스트

귀하는 전자 상거래 웹 사이트를 담당하는 팀장이며 다음을 진행하고자 합니다.
- 홈페이지에서 예기치 않게 트래픽이 적은 경우 알림 받기
- 공공 인터넷 제공업체에 영향을 미치는 지역화된 인시던트 포착
- 알 수 없는 실패 시나리오를 위한 작업

웹사이트 트래픽은 밤과 낮, 주중과 주말에 따라 달라집니다. "예기치 않게 낮다"는 것이 무엇을 의미하는지 정량화할 수 있는 절대적인 수치는 없습니다. 그러나 트래픽은 예측 가능한 패턴을 따르므로 10%의 차이는 공용 인터넷 제공업체에 영향을 미치는 국지적인 사고와 같은 문제를 나타내는 신뢰할 수 있는 메트릭으로 간주할 수 있습니다.

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="주기적 또는 시즌별 메트릭의 선 그래프" style="width:100%;" >}}

### 모니터

팀은 [`nginx.requests.total_count`][3] 메트릭을 사용하여 NGINX 웹 서버의 연결 수를 측정합니다.

**요청**은 세 가지 부분으로 구성됩니다:
1. 현재 요청 수를 가져오는 쿼리입니다.
2. 일주일 전에 동시에 요청 수를 가져오는 쿼리입니다.
3. 처음 두 쿼리 사이의 비율을 계산하는 "공식" 쿼리입니다.

그런 다음 시간 집계를 결정합니다:
- 시간대를 선택합니다. 시간대가 클수록 이상 징후를 탐지하기 위해 더 많은 데이터를 평가합니다. 시간대가 클수록 모니터 경고도 더 많이 발생할 수 있으므로 1시간 단위로 시작하여 필요에 맞게 조정합니다.
- 집계를 선택합니다. 비율을 수행하는 카운트 메트릭이므로 `average`(또는 `sum`)를 선택합니다.

아래 스크린샷에 표시되는 임계값은 첫 번째 쿼리(현재) 값과 두 번째 쿼리(지난 주) 값 사이의 10% 차이를 허용하기 위해 0.9로 구성되었습니다.

{{< tabs >}}
{{% tab "UI Configuration" %}}
{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="메트릭 쿼리에 week_before 시간 이동을 추가하고 공식 a/b를 설정하는 구성" style="width:100%;" >}}
{{% /tab %}}

{{% tab "JSON 예시" %}}
``` json
{
    "name": "[Seasonal threshold] Amount of connection",
    "type": "query alert",
    "query": "sum(last_10m):sum:nginx.requests.total_count{env:prod} by {datacenter} / week_before(sum:nginx.requests.total_count{env:prod} by {datacenter}) <= 0.9",
    "message": "The amount of connection is lower than yesterday by {{value}} !",
    "tags": [],
    "options": {
        "thresholds": {
            "critical": 0.9
        },
        "notify_audit": false,
        "require_full_window": false,
        "notify_no_data": false,
        "renotify_interval": 0,
        "include_tags": true,
        "new_group_delay": 60,
        "silenced": {}
    },
    "priority": null,
    "restricted_roles": null
}
```
{{% /tab %}}
{{< /tabs >}}

## 기준 임계값

### 컨텍스트
귀하는 전자상거래 웹사이트의 결제 프로세스를 담당하는 QA 팀장입니다. 귀하는 고객이 좋은 경험을 하고 문제 없이 제품을 구매할 수 있기를 원합니다. 이를 나타내는 메트릭 중 하나는 오류율입니다.

트래픽은 하루 종일 동일하지 않으므로 금요일 저녁에 분당 50개의 오류가 있는 것이 일요일 아침에 분당 50개의 오류가 있는 것보다 더 나을 수 있습니다. 오류 자체가 아닌 오류율을 모니터링하면 정상 메트릭과 비정상 메트릭의 모습을 안정적으로 확인할 수 있습니다.

오류율이 높을 때뿐만 아니라 적중 횟수가 충분히 클 때도 경고를 받습니다.

### 모니터

총 3개의 모니터를 만듭니다:
1. [총 적중 횟수를 알리는 메트릭 모니터.](#metric-monitor-to-alert-on-the-total-number-of-hits)
1. [오류율을 계산하는 메트릭 모니터](#metric-monitor-to-calculate-the-error-rate)
1. [처음 두 모니터가 ALERT 상태일 경우 경고를 트리거하는 컴포지트 모니터.](#composite-monitor)

#### 총 적중 수를 경고하는 메트릭 모니터

첫 번째 모니터는 성공과 실패를 포함한 총 적중 횟수를 추적합니다. 이 모니터는 오류율이 경고를 트리거해야 하는지 여부를 결정합니다.

{{< tabs >}}
{{% tab "UI Configuration" %}}
  {{< img src="monitors/guide/non_static_thresholds/reference_total_hits.png" alt="총 조회수를 계산하는 공식이 포함된 메트릭 모니터 구성" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON 예시" %}}
```
{
    "name": "Number of hits",
    "type": "query alert",
    "query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count() > 4000",
    "message": "There has been more than 4000 hits for this region !",
    "tags": [],
    "options": {
        "thresholds": {
            "critical": 1000
        },
        "notify_audit": false,
        "require_full_window": false,
        "notify_no_data": false,
        "renotify_interval": 0,
        "include_tags": true,
        "new_group_delay": 60
    }
}

```
{{% /tab %}}
{{< /tabs >}}

#### 오류율을 계산하는 메트릭 모니터

두 번째 모니터는 오류율을 계산합니다. 오류 수를 총 적중 수로 나누어 오류율 `a / a+b`을 구하는 쿼리를 만듭니다.

{{< tabs >}}
{{% tab "UI 설정" %}}
  {{< img src="monitors/guide/non_static_thresholds/reference_error_rate.png" alt="오류율을 계산하는 공식이 포함된 메트릭 모니터 설정" style="width:100%;" >}}
{{% /tab %}}

{{% tab "JSON 예시" %}}
```
{
    "name": "Error Rate",
    "type": "query alert",
    "query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() / (sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count()) > 0.5",
    "message": "The error rate is currently {{value}} ! Be careful !",
    "tags": [],
    "options": {
        "thresholds": {
            "critical": 0.5
        },
        "notify_audit": false,
        "require_full_window": false,
        "notify_no_data": false,
        "renotify_interval": 0,
        "include_tags": true,
        "new_group_delay": 60
    }
}

```

{{% /tab %}}
{{< /tabs >}}


#### 컴포지트 모니터

마지막 모니터는 컴포지트 모니터로 두 개의 이전 모니터링이 모두 **ALERT** 상태인 경우에만 경고를 보냅니다.

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="두 모니터가 모두 ALERT 상태인 경우 경고하는 부울 논리를 보여주는 컴포지트 모니터 구성 예" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/anomaly/
[2]: /ko/monitors/types/outlier/
[3]: /ko/integrations/nginx/?tab=host#data-collected
[4]: /ko/account_management/billing/usage_metrics/#types-of-usage
[5]: /ko/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
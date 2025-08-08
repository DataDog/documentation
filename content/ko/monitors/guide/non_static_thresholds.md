---
further_reading:
- link: /monitors/types/composite/
  tag: 설명서
  text: 컴포지트 모니터
- link: /monitors/types/anomaly/
  tag: 설명서
  text: 이상 징후 모니터
title: 비정적 임계값을 모니터링하는 방법
---

## 개요

일반 메트릭 모니터링은 단일 메트릭이 특정 임계값 수치를 초과하면 알림을 트리거합니다. 예를 들어, 디스크 사용량이 80%를 초과하면 알림을 트리거하도록 설정할 수 있습니다. 이러한 접근 방식은 대부분의 사례에서 효율적이지만 임계값이 절대적 수치가 아닌 번수인 경우에는 어떻게 될까요?

Watchdog 기반 모니터링(예: [이상 항목][1] 및 [이상값][2]은 메트릭이 정상 범위를 벗어났다는 명시적 정의가 없는 경우 특히 유용합니다. 그러나 가능하면 특정 사용 사례에 맞게 알림 조건을 맞춤 설정한 일반 모니터를 사용해 정밀도를 최대화하고 알림 시간을 최소화하는 것이 좋습니다.

본 지침에서는 비고정 임계값 알림에 대한 일반 사용 사례를 다룹니다.
  - [**계절 변동**(#seasonal-threshold)을 벗어난 메트릭에 대한 알림]
  - [다른 **reference** 메트릭 값을 기반으로 한 알림](#reference-threshold)

## 계절 임계값

### 컨텍스트

내가 이커머스 웹사이트를 담당하는 팀 리더이고, 다음 작업을 하려고 한다고 합시다.
- 홈페이지의 예상치 못한 트래픽 감소에 대한 알림 받기
- 공공 인터넷 제공업체에 영향을 미치는 인시던트와 같은 로컬 인시던트 캡처
- 알려지지 않은 장애 시나리오에 대비

웹사이트의 트래픽은 밤과 낮, 주중과 주말에 따라 달라집니다. '예기치 않게 낮음'이 무엇을 뜻하는지 정량화할 수 있는 절대적인 수치는 없습니다. 그러나 트래픽은 예측 가능한 패턴을 따르기 때문에, 10%의 차이는 공공 인터넷 제공업체에 영향을 미치는 로컬 인시던트와 같은 문제를 나타내는 신뢰할 수 있는 지표로 간주할 수 있습니다.

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="주기적 또는 계절별 메트릭의 선형 그래프" style="width:100%;" >}}

### 모니터

우리 팀은 [`nginx.requests.total_count`][3] 메트릭으로 NGINX 웹 서버의 연결 수를 측정한다고 하겠습니다.

**요청**은 다음 세 부분으로 구성됩니다.
1. 현재 요청 수를 가져오는 쿼리
2. 일주일 전 동일한 시간의 요청 수를 가져오는 쿼리
3. 처음 두 쿼리 간의 비율을 계산하는 "Formula" 쿼리

그런 다음 시간 집계를 결정합니다.
- 기간을 선택합니다. 기간이 길수록 이상을 감지하기 위해 평가해야 하는 데이터가 많아집니다. 또한, 기간이 길수록 모니터링 알림이 더 많이 발생할 수 있으므로 1시간으로 시작하여 필요에 따라 조정합니다. 
- 집계를 선택합니다. 비율을 계산하는 메트릭 카운트이므로 `average`(또는 `sum`)이 적절합니다.

하단의 스크린샷에 표시된 임계값은 첫 번째 쿼리(현재)와 두 번째 쿼리(일주일 전)의 값 사이에 10%의 차이를 허용하도록 0.9로 설정되어 있습니다.

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="week_before 타임 시프트를 메트릭 쿼리에 추가하고 공식 a/b를 지정한 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
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

## 참조 임계값

### 컨텍스트
내가 이커머스 웹사이트의 결제 프로세스를 담당하는 QA 팀 리더라고 합시다. 고객이 좋은 경험을 하고 제품을 문제 없이 구매할 수 있게 하고 싶습니다. 이를 나타내는 한 가지 지표가 바로 오류율입니다.

트래픽의 양은 하루에도 동일하지 않습니다. 예를 들어, 금요일 저녁의 분당 50건 오류보다 일요일 아침의 분당 50건 오류가 더 심각한 문제입니다. 오류 자체보다는 오류율을 모니터링하여 정상 및 비정상 메트릭이 어떻게 나타나는지 신뢰할 수 있는 시각 정보를 얻을 수 있습니다.

오류율이 높을 때뿐만 아니라 방문 수가 매우 높을 때도 알림을 받습니다.

### 모니터링

총 3개의 모니터링을 생성합니다.
1. [총 방문수를 알려주는 메트릭 모니터](#metric-monitor-to-alert-on-the-total-number-of-hits)
1. [오류율을 계산하는 메트릭 모니터](#metric-monitor-to-calculate-the-error-rate)
1. [처음 두 개 모니터링이 경고 상태라면 알림을 트리거하는 복합 모니터](#composite-monitor)

#### 총 방문수를 알려주는 메트릭 모니터

첫 번째 모니터는 성공 및 실패를 포함한 총 방문수를 추적합니다. 해당 모니터는 오류율에 따라 알림을 트리거할지 여부를 결정합니다.

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_total_hits.png" alt="총 방문수를 계산하는 공식이 있는 메트릭 모니터링 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
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

#### 오류율을 계산하는 메트릭 모니터링

두 번째 모니터는 오류율을 계산합니다. 오류의 수를 총 방문수로 나눈 쿼리를 생성하여 오류율 `a / a+b`를 구합니다.

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_error_rate.png" alt="오류율을 계산 공식이 있는 메트릭 모니터 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
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


#### 복합 모니터

마지막 모니터는 복함 모니터입니다. 앞의 두 모니터 모두 **경고** 상태인 경우에만 알림을 전송합니다.

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="두 개의 모니터가 모두 경고 상태인 경우 알림을 전송하는 부울 로직의 복합 모니터 설정 예시" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/anomaly/
[2]: /ko/monitors/types/outlier/
[3]: /ko/integrations/nginx/?tab=host#data-collected
[4]: /ko/account_management/billing/usage_metrics/#types-of-usage
[5]: /ko/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
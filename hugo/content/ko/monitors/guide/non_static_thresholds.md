---
description: 계절성 패턴, 참조 메트릭, 복합 조건 모니터를 사용하여 동적 경보 시나리오의 가변 임계값을 모니터링하세요.
further_reading:
- link: /monitors/types/composite/
  tag: 설명서
  text: 복합 조건 모니터
- link: /monitors/types/anomaly/
  tag: 설명서
  text: 이상 탐지 모니터
title: 비정적 임계값을 모니터링하는 방법
---
## 개요 {#overview}

일반적인 메트릭 모니터는 단일 메트릭이 특정 임계값을 초과하면 경보를 트리거합니다. 예를 들어, 디스크 사용량이 80%를 초과하면 경보가 트리거되도록 설정할 수 있습니다. 이 접근 방식은 많은 사용 사례에 효율적이지만, 임계값이 절대적인 숫자가 아닌 변수일 때는 어떻게 될까요?

Watchdog 기반 모니터(특히 [이상][1] 및 [이상치][2] 모니터)는 메트릭이 정상 범위를 벗어났다는 명확한 정의가 없을 때 특히 유용합니다. 그러나 가능하면 특정 사용 사례에 맞게 경보 조건을 설정한 일반 모니터를 사용하여 정확도를 극대화하고 경보가 발생하기까지 걸리는 시간을 최소화해야 합니다.

이 가이드는 비정적 임계값에 따른 경보의 일반적인 사용 사례를 다룹니다.
  - [메트릭이 **계절적 변동**](#seasonal-threshold)  범위를 벗어나 예상과 다르게 움직일 때 경보 설정
  - [다른 **참조** 메트릭의 값을 기반으로 경보 설정](#reference-threshold)

## 계절적 임계값 {#seasonal-threshold}

### Context {#context}

여러분은 전자상거래 웹사이트를 담당하는 팀장입니다. 원하는 것은 다음과 같습니다. 
- 홈페이지 트래픽이 예상치 못하게 낮아질 때 경보 수신 
- 공용 인터넷 제공업체에 영향을 미치는 인시던트와 같은 보다 국지적인 인시던트 포착
- 알 수 없는 장애 시나리오에 대비

웹사이트 트래픽은 밤낮으로, 그리고 평일과 주말에 따라 달라집니다. '예상치 못하게 낮음'이 무엇을 의미하는지 정량화할 절대적인 수치는 없습니다. 하지만 트래픽은 예측 가능한 패턴을 따르므로 10%의 차이를 공용 인터넷 제공업체에 영향을 미치는 국지적 인시던트와 같은 문제의 신뢰할 수 있는 지표로 간주할 수 있습니다.

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="주기적 또는 계절적 메트릭의 선 그래프" style="width:100%;" >}}

### 모니터 {#monitor}

팀에서 [`nginx.requests.total_count`][3] 메트릭을 사용하여 NGINX 웹 서버의 연결 수를 측정합니다.

**request**는 3개 부분으로 구성됩니다. 
1. 현재 요청 수를 가져오기 위한 쿼리입니다.
2. 1주일 전 같은 시간의 요청 수를 가져오기 위한 쿼리입니다.
3. 처음 두 쿼리 간의 비율을 계산하는 'Formula' 쿼리입니다.

그런 다음 시간 집계를 결정합니다.
- 시간 범위를 선택합니다. 시간 범위가 클수록 이상을 탐지하기 위해 평가하는 데이터가 많아집니다. 시간 범위가 클수록 모니터 경보가 더 많이 발생할 수 있으므로 1시간으로 시작한 다음 필요에 따라 조정하세요. 
- 집계를 선택합니다. 비율을 계산하는 카운트 메트릭이므로 `average` (또는 `sum`)이 자연스러운 선택입니다.

아래 스크린샷에 표시된 임계값은 첫 번째 쿼리(현재)와 두 번째 쿼리(1주일 전) 값 사이의 10% 차이를 허용하도록 0.9로 구성되었습니다.

{{< tabs >}}
{{% tab "UI 구성" %}}

{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="메트릭 쿼리에 week_before 타임시프트를 추가하고 수식 a/b를 설정하기 위한 구성" style="width:100%;" >}}

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

## Reference threshold

### Context
You are the QA team lead, in charge of the checkout process of your e-commerce website. You want to ensure that your customers have a good experience and can purchase your products without any issues. One indicator of that is the error rate.

The traffic is not the same throughout the day, so 50 errors/minute on a Friday evening is less worrying than 50 errors/minute on a Sunday morning. Monitoring an error rate rather than the errors themselves gives you a reliable view of what healthy and unhealthy metrics look like.

Get alerted when the error rate is high, but also when the volume of hits is significant enough.

### Monitor

Create 3 monitors in total:
1. [Metric monitor to alert on total number of hits.](#metric-monitor-to-alert-on-the-total-number-of-hits)
1. [Metric monitor to calculate the error rate.](#metric-monitor-to-calculate-the-error-rate)
1. [Composite monitor that triggers an alert if the first two monitors are in an ALERT state.](#composite-monitor)

#### Metric monitor to alert on the total number of hits

The first monitor tracks the total number of hits, both successes and failures. This monitor determines whether the error rate should trigger an alert.

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_total_hits.png" alt="Metric monitor configuration with formula to calculate total hits" style="width:100%;" >}}

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

#### Metric monitor to calculate the error rate

The second monitor calculates the error rate. Create a query on the number of errors divided by the total number of hits to get the error rate `a / a+b`:

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_error_rate.png" alt="Metric monitor configuration with formula to calculate error rate" style="width:100%;" >}}

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


#### 복합 조건 모니터 {#composite-monitor}

마지막 모니터는 복합 조건 모니터로, 앞선 두 모니터가 모두 {{< ui >}}ALERT{{< /ui >}} 상태일 경우에만 경보를 보냅니다. 

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="두 모니터가 모두 ALERT 상태일 때 경보를 보내는 부울 논리를 보여주는 복합 조건 모니터 구성 예시" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/anomaly/
[2]: /ko/monitors/types/outlier/
[3]: /ko/integrations/nginx/?tab=host#data-collected
[4]: /ko/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[5]: /ko/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
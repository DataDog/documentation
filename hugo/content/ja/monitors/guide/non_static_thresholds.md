---
description: 動的なアラートを送信するシナリオに対応するために、季節的なパターン、リファレンスメトリクス、複合条件モニターを使用して可変しきい値をモニターします。
further_reading:
- link: /monitors/types/composite/
  tag: ドキュメント
  text: 複合条件モニター
- link: /monitors/types/anomaly/
  tag: ドキュメント
  text: 異常検知モニター
title: 非静的なしきい値のモニター方法
---
## 概要 {#overview}

一般的なメトリクスモニターは、単一のメトリクスが特定のしきい値を超えた場合にアラートをトリガーします。たとえば、ディスク使用率が 80% を超えた場合にアラートがトリガーされるように設定できます。このアプローチは多くのユースケースで有効ですが、しきい値が絶対値ではなく、可変の場合はどうでしょうか。

Watchdog を利用したモニター (具体的には[異常][1]と[外れ値][2]) は、正常範囲から外れているメトリクスの明確な定義がない場合に特に役立ちます。ただし、可能な場合は通常のモニターを使用し、精度が最大限に高まり、アラートが送信されるまでの時間が最短になるように、具体的なユースケースに合わせてアラート条件を調整する必要があります。

このガイドでは、非静的なしきい値に基づいてアラートを送信する一般的なユースケースについて説明します。
  - [メトリクスが**季節的な変動の範囲を外れた場合にアラートを送信する**](#seasonal-threshold) 
  - [別の**リファレンス**メトリクスの値に基づいてアラートを送信する](#reference-threshold)

## 季節的なしきい値 {#seasonal-threshold}

### コンテキスト {#context}

あなたは、チームの責任者としてeコマースウェブサイトを担当しています。次のことを可能にする必要があります。
- ホームページのトラフィックが予期せず減少した場合にアラートを受け取る 
- パブリックインターネットプロバイダーに影響を与えるインシデントなど、より局所的なインシデントを捕捉する
- 未知の障害シナリオに対応する

担当するウェブサイトのトラフィックは、夜間と日中、平日と週末で変動します。何をもって「予期せず減少した」と言えるかを数量化するための絶対的な数値はありません。ただし、トラフィックは予測可能なパターンに従うため、10%の差異は問題があることを示す信頼性の高い指標とみなすことができます (パブリックインターネットプロバイダーに影響を与える局所的なインシデントなど)。

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="周期的または季節的に変動するメトリクスの折れ線グラフ" style="width:100%;" >}}

### モニター {#monitor}

チームは、[`nginx.requests.total_count`][3] メトリクスを使用して NGINX Web サーバーの接続数を測定します。

**リクエスト**は、次の 3 つの部分で構成されています。
1. 現在のリクエスト数を取得するためのクエリ。
2. 1 週間前の同時刻のリクエスト数を取得するためのクエリ。
3. 最初の 2 つのクエリ間の比率を計算する「数式」クエリ。

次に、時間集計を決定します。
- 期間を選択します。期間が長いほど、異常を検出するために評価されるデータ量が増えます。期間が長いとモニターアラートも増える可能性があるため、最初は 1 時間に設定し、必要に応じて調整してください。
- 集計方法を選択します。これは比率を計算するカウントメトリクスであるため、通常は `average` (または`sum`) を選択します。

以下のスクリーンショットに表示されているしきい値は 0.9 に設定されています。これは、最初のクエリ (現在) の値と 2 番目のクエリ (1 週間前) の値の間で 10% の差を許容します。

{{< tabs >}}
{{% tab "UI 設定" %}}

{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="メトリクスクエリに week_before タイムシフトを追加し、数式 a/b を設定するための構成" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON の例" %}}
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
	"message": "The error rate is currently {{value}} !Be careful !",
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


#### 複合条件モニター {#composite-monitor}

最後のモニターは複合条件モニターです。これは、前述の 2 つのモニターのいずれも [{{< ui >}}ALERT{{< /ui >}}] (アラート) 状態である場合にのみアラートを送信します。

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="両方のモニターが [ALERT] 状態の場合にアラートを送信するブールロジックが示されている複合条件モニター構成の例" style="width:100%;" >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/anomaly/
[2]: /ja/monitors/types/outlier/
[3]: /ja/integrations/nginx/?tab=host#data-collected
[4]: /ja/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[5]: /ja/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
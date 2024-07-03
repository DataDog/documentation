---
further_reading:
- link: /network_monitoring/devices/netflow/#visualization
  tag: ドキュメント
  text: Learn more about NetFlow Monitoring
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスを確認
title: NetFlow Monitor
---

{{< callout btn_hidden="true" header="Join the Beta!">}}
The NetFlow monitor is in private beta. Reach out to your Datadog representative to sign up for access.
{{< /callout >}}

## 概要

Datadog [Network Device Monitoring][1] (NDM) provides visibility into your on-premises and virtual network devices, such as routers, switches, and firewalls. As a part of NDM, [NetFlow Monitoring][2] enables you to examine, interpret, and analyze your network traffic flow data over time, and identify top contributors to network congestion. 

After enabling NetFlow Monitoring, you can create a NetFlow monitor to alert you when a flow metric (such as network throughput for a specific source or destination pair) crosses a threshold that you have set.

## モニターの作成

To create a NetFlow monitor in Datadog, use the main navigation: [**Monitors** --> **New Monitor** --> **NetFlow**][3]. 

### 検索クエリを定義する

As you define the search query, the top graph updates in real time.

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="Example monitor configuration using NetFlow data" style="width:100%;" >}}

1. Construct a search query using the same logic as the [NetFlow widgets][4] in your dashboards. 
1. Select if you want to alert on bytes or packets for traffic.
1. Choose the tags you want to filter the alerted traffic by. See the [full list of available facets][4].

### 数式と関数の使用

You can create NetFlow monitors using formulas and functions. This can be used, for example, to create monitors on the volume of traffic sent by source and device. 

{{< img src="monitors/monitor_types/netflow/formula.png" alt="Example monitor configuration using NetFlow data and a formula" style="width:100%;" >}}

For more information, see the [Functions][5] documentation.

### アラートの条件を設定する

Configure monitors to trigger if the query value crosses a threshold, and customize advanced alert options for recovery thresholds and evaluation delays. For more information, see [Configure Monitors][6].

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][7] のページを参照してください。

## Monitor NetFlow events

For more information about events you can create NetFlow monitors on, see the [NetFlow Monitoring documentation][4].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/devices/
[2]: /ja/network_monitoring/devices/netflow/
[3]: https://app.datadoghq.com/monitors/create/netflow
[4]: /ja/network_monitoring/devices/netflow/#visualization
[5]: /ja/dashboards/functions/
[6]: /ja/monitors/configuration/
[7]: /ja/monitors/notify/
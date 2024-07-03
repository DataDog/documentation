---
further_reading:
- link: /network_monitoring/performance/
  tag: Documentation
  text: Learn more about Network Performance Monitoring
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
- link: /network_monitoring/performance/recommended_monitors
  tag: ドキュメント
  text: Recommended NPM Monitors
title: Network Performance Monitor
---
<div class="alert alert-info">The NPM monitor is in public beta.</div>

## 概要

Datadog [Network Performance Monitoring][1] (NPM) provides visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog. After you enable NPM, you can create an NPM monitor and get alerted if a TCP network metric crosses a threshold that you have set. For example, you can monitor network throughput between a specific client/server and get alerted if that throughput crosses a threshold. 

## モニターの作成

To create an NPM monitor in Datadog, use the main navigation: [**Monitors** --> **New Monitor** --> **Network Performance**][2]. 

### 検索クエリを定義する

{{< img src="monitors/monitor_types/network_performance/example_dns_failures.png" alt="Example configuration with auto-grouped client and server traffic, hidden N/A values, measured as the sum of DNS failures metric with a limit of 100" style="width:100%;" >}}

1. Construct a search query using the same logic as the [NPM analytics][3] search bar. 
1. Select the tags you want to group your client and server by.
1. Choose if you want to show or hide N/A traffic.
1. Select a metric you want to measure from the dropdown list. By default, the monitor measures the sum of the metric selected. See which metrics are available for NPM monitors in the [metric definitions](#metric-definitions).
1. Set the limit on how many results you want to be included in the query.

### 数式と関数の使用

数式や関数を使用して NPM モニターを作成できます。例えば、クライアントとサーバー間のスループットに関するモニターを作成するのに使用できます。

The following example shows using a formula to calculate percent retransmits from a client to server. 

{{< img src="monitors/monitor_types/network_performance/npm_formulas_functions.png" alt="Example NPM monitor configuration showing percent of retransmits from a client to server" style="width:100%;" >}}

For more information, see the [Functions][4] documentation.

## Metric definitions

The following tables list the different NPM metrics you can create monitors on. 

### Volume
| メトリクス名    | 定義                 | 
| -------------- | -------------------------  | 
| Bytes Received | Bytes received from client. |
| Bytes Sent     | Bytes sent from client.     |
| Packets Sent   | Packets sent from client.   |

### TCP
| メトリクス名             | 定義                                    | 
| ----------------------  | --------------------------------------------- | 
| 再送回数             | Retransmits between client/server.              |
| レイテンシー                 | Average time it takes to make the connection.   |
| RTT (Round-Trip Time)   | Average time it takes to receive a response. |
| Jitter                  | Average variance in RTT.                     |
| Established Connections | Establishes connections between client/server. |
| クローズされた接続の数      | Closed connections between client/server.      |

### DNS
| メトリクス名              | 定義                               |
| -----------------------  | ---------------------------------------  |
| DNS Requests             | Total number of DNS requests.             |
| DNS Failures             | Total number of DNS failures.             |
| DNS Timeouts             | Total number of DNS timeouts.             |
| DNS Failed Responses     | Total number of DNS failed responses.             |
| DNS Successful Responses | Total number of DNS successful responses.     |
| DNS Failure Latency      | Average DNS failure latency. |
| DNS Success Latency      | Average DNS success latency.              |
| NXDOMAIN Errors          | Total number of NXDOMAIN errors.              |
| SERVFAIL Errors          | Total number of SERVFAIL errors.          |
| Other Errors             | Total number of other errors.           |


### アラートの条件を設定する

Configure monitors to trigger if the query value crosses a threshold and customize advanced alert options for recovery thresholds and evaluations delays. For more information, see [Configure Monitors][5].

### 通知
**Configure notifications and automations** (通知と自動化の構成) セクションの詳しい説明は、[通知][6]のページをご覧ください。

## Common monitors
You can start creating monitors on NPM with the following common monitors. These provide a good starting point to track your network and get alerted if your network is experiencing unusual traffic and potentially experiencing unexpected network behavior. 

### Throughput monitor
The throughput monitor alerts you if throughput between two endpoints specified in the query surpasses a threshold. Monitoring throughput can help you determine if your network is nearing capacity given your network bandwidth. Knowing this can give you enough time to make adjustments to your network to avoid bottlenecks and other effects downstream. 

{{< img src="monitors/monitor_types/network_performance/common_monitors_throughput.png" alt="Example configuration for a throughput monitor, set Query A to measure Bytes Sent and add a formula of throughput(a)" style="width:100%;" >}}

### Percent retransmits
Retransmission occurs when packets are either damaged or lost and indicate an unreliable network. The percent retransmits monitor alerts you if the percentage of total packets sent that are resulting in retransmits passes a threshold. 

{{< img src="monitors/monitor_types/network_performance/common_monitors_retransmits.png" alt="Example configuration for a percent transmits monitor, set Query A to measure Retransmits, Query B to measure Packets Sent, and add a formula to calculate the percentage with (a/b)*100" style="width:100%;" >}}

### DNS failures
DNS failure monitor tracks DNS server performance to help you identify server-side and client-side DNS issues. Use this monitor to alert you if the sum of DNS failures passes a threshold. 

{{< img src="monitors/monitor_types/network_performance/common_monitors_dns_failure.png" alt="Example configuration for DNS failure, set Query A to measure DNS Failures" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/performance/
[2]: https://app.datadoghq.com/monitors/create/network-performance
[3]: /ja/network_monitoring/performance/network_analytics/
[4]: /ja/dashboards/functions/
[5]: /ja/monitors/configuration/
[6]: /ja/monitors/notify/
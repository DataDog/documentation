---
aliases:
- /ja/monitors/monitor_types/host
- /ja/monitors/create/types/host/
description: Datadog に報告を行っているホストがあるかどうかをチェックする
further_reading:
- link: /infrastructure/
  tag: ドキュメント
  text: インフラストラクチャーのモニタリング
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスの参照
title: ホストモニター
---

## 概要

Infrastructure monitoring provides visibility into your entire IT environment, including cloud-hosted and on-prem servers, through many integrations. Use the Host monitor to stay informed on which hosts are or are not submitting data to ensure continuous visibility.

すべての Datadog Agent は、ステータスが `OK` の `datadog.agent.up` というサービスチェックを報告します。ホストモニターを使用して、1 つ以上のホストでこのチェックを監視できます。

<div class="alert alert-warning">AIX Agents do not report the <code>datadog.agent.up</code> service check. You can use the metric <code>datadog.agent.running</code> to monitor the uptime of an AIX Agent. The metric emits a value of <code>1</code> if the Agent is reporting to Datadog.</div>

## Monitor creation

To create a [host monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Host*.

### Pick hosts by name or tag

Select the hosts to monitor by choosing host names, tags, or choose `All Monitored Hosts`. If you need to exclude certain hosts, use the second field to list names or tags.

- The include field uses `AND` logic. All listed names and tags must be present on a host for it to be included.
- The exclude field uses `OR` logic. Any host with a listed name or tag is excluded.

#### Examples

| Monitor                                                | Include               | Exclude     |
|--------------------------------------------------------|-----------------------|-------------|
| Include all hosts with the tag `env:prod`              | `env:prod`            | leave empty |
| Include all hosts except hosts with the tag `env:test` | `All Monitored Hosts` | `env:test`  |

### Set alert conditions

In this section, choose between a **Check Alert** or **Cluster Alert**:

{{< tabs >}}
{{% tab "Check Alert" %}}

A check alert tracks if a host stops reporting for a given amount of time. Too much time following a check run can be a sign of problems with data submission from the host.

Enter the number of minutes to check for missing data. The default value is 2 minutes.

If `datadog.agent.up` stops reporting an `OK` status for more than the minutes specified, an alert is triggered.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert tracks if some percentage of hosts have stopped reporting for a given amount of time.

To set up a cluster alert:

1. Decide whether or not to group your hosts according to a tag. `Ungrouped` calculates the status percentage across all included hosts. `Grouped` calculates the status percentage on a per group basis.
2. Select the percentage for alert and warn thresholds. Only one setting (alert or warn) is required.
3. Enter the number of minutes to check for missing data. The default value is 2 minutes.

If `datadog.agent.up` stops reporting an `OK` status for more than the minutes specified and the percentage threshold is reached, an alert is triggered.

{{% /tab %}}
{{< /tabs >}}

### Advanced alert conditions

For detailed instructions on the advanced alert options (auto resolve, new group delay, etc.), see the [Monitor Configuration][2] page.

### Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/host
[2]: /ja/monitors/configuration/#advanced-alert-conditions
[3]: /ja/monitors/notify/
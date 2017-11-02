---
title: ホストを対象にしたMonitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Check if one or more hosts are reporting to Datadog"
---

<!-- ### Host Monitors

*Requires Datadog Agent version >= 5.0.0.*


Every Datadog Agent collection reports a heartbeat called `datadog.agent.up`
with a status `UP`. You can monitor this heartbeat across one or more hosts.
-->

*Datadog Agent バージョン 5.0.0 以上が必要です。*

{{< img src="monitors/monitor_types/host/host_monitor.png" >}}

Datadog Agentが起動していると`datadog.agent.up`と呼ばれるハートビート信号を
`UP`というステータスで定期的に送信します。
このハートビート信号の状態をMonitor対象に追加することで、Datadog Agentやホストの死活状態が把握できます。


<!--
1. Select your **host by name or tag(s)**. Providing a tag will monitor every
   host that has that tag or tag combination.

2. Select the **no-data timeframe**. If the heartbeat stops reporting for more
   than the number of minutes you have selected, then you will get notified.

3. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

1. **ホスト名かタグ**の単一指定か組み合わせを設定します。タグを選択した場合は、そのタグ(タグの組み合わせ)が付与されているホストが監視対象になります。

2. `Check Alert`または`Cluster Alert`を選択します。その後、**no-data timeframe**の項目で、分単位で時間を設定します。ここで設定した時間を超えてハートビート信号が受信できなかった場合に、通知が送信されます。

3. 通知先の設定をします。通知先の設定に関しては、このドキュメントの[”通知先の設定”](#通知先の設定)の項目を参照してください。
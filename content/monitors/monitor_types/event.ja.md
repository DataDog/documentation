---
title: イベントを対象にしたMonitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Monitor events gathered by Datadog"
---
<!--
### Event Monitors


Event monitors allows you to alert when an event matching your query occurs.


1. Select the query and parameters (status, priority, sources and tags) you want
    to monitor.

2. Select the alert gouping

3. Select the **alerting conditions**. The **threshold value** and **timeframe**
    options allows you to set the number of occurence of an event required during
    a timeframe before triggering the monitor.

4. Configure your **notifcation options**. Refer to the [Notifications](#notifications)
    section of this guide for informations.
-->

イベントを対象にしたMonitorでは、指定した条件に合致する場合にアラートで通知することができます。

{{< img src="monitors/monitor_types/event/event_monitor.png" >}}

1. 監視する文字列とパラメータ(ステータス, 優先度, ソース, タグ)を設定します。

2. アラートグループを選択します。

3. **アラート条件** を設定します。**閾値** と**時間枠**の設定によって、アラートが発報されるために必要な時間枠あたりのイベント発生回数を指定することができます。

5. 4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの[”通知先の設定”](#通知先の設定)の項目を参照してください。


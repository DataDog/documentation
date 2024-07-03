---
aliases:
- /ja/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101: Alerting on what matters'
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Learning Center
  text: Introduction to Observability
- link: /monitors/types/metric/
  tag: Documentation
  text: Metric Monitors
- link: /monitors/notify/
  tag: Documentation
  text: Monitor Notifications
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session on creating effective monitors
kind: documentation
title: Getting Started with Monitors
---

## Overview

With Datadog alerting, you have the ability to create monitors that actively check metrics, integration availability, network endpoints, and more. Use monitors to draw attention to the systems that require observation, inspection, and intervention.

This page is an introduction to monitors and outlines instructions for setting up a metric monitor. A [metric monitor][1] provides alerts and notifications if a specific metric is above or below a certain threshold. For example, a metric monitor can alert you when disk space is low. 

This guide covers:
- Monitor creation and configuration
- Setting up monitor alerts
- Customizing notification messages
- Monitor permissions

## Prerequisites

Before getting started, you need a Datadog account linked to a host with the Datadog Agent installed. To learn more about the Agent, see the [Getting started with the Agent guide][2], or navigate to **[Integrations > Agent][3]** to view installation instructions.

To verify that the Datadog Agent is running, check that your [Infrastructure List][4] in Datadog is populated.

## Create a monitor

To create a monitor, navigate to **[Monitors > New Monitor][5]** and select **Metric**.

## Configure

The main components of monitor configuration are:

- **Choose the detection method**: How are you measuring what will be alerted on? Are you concerned about a metric value crossing a threshold, a change in a value crossing a threshold, an anomalous value, or something else?
- **Define the metric**: What value are you monitoring to alert? The disk space in your system? The number of errors encountered for logins?
- **Set the alert conditions**: When does an engineer need to be woken up? 
- **Configure notifications and automations**: What information needs to be in the alert?
- **Define permissions and audit notifications**: Who has access to these alerts, and who should be notified if the alert is modified?

### 検出方法を選択します。

メトリクスモニターを作成すると、検出方法として **Threshold Alert (しきい値アラート)** が自動的に選択されます。しきい値アラートは、メトリクス値をユーザー定義のしきい値と比較します。このモニターの目的は静的なしきい値に基づいてアラートを生成することなので、変更は必要ありません。

### メトリクスを定義する

ディスク容量不足のアラートを取得するには、[Disk インテグレーション][6]から `system.disk.in_use` メトリクスを使用して、`host` と `device` のメトリクスの平均を計算します。

{{< img src="getting_started/monitors/monitor_query.png" alt="Define the metric for system.disk.in_use avg by host and device" style="width:100%" >}}

### アラートの条件を設定する

[Disk インテグレーションのドキュメント][6]によると、`system.disk.in_use` は、使用中のディスク容量が全体に占める割合を示します。したがって、このメトリクスが報告している値が `0.7` ならば、デバイスは 70% 使用されています。

ディスク容量不足のアラートを発生させるには、メトリクスがしきい値を`超えた`ときにモニターをトリガーする必要があります。しきい値はオプションで設定します。このメトリクスの場合、適切な値の範囲は `0` から `1` です。

以下のしきい値を設定します。
```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

この例では、このセクションの他の設定はデフォルトのままにします。詳細については、[メトリクスモニター][7]のドキュメントを参照してください。

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="Set the alert and warning thresholds for the monitor to trigger alerts" style="width:80%" >}}

### Notifications and automations

When this monitor is triggered to alert, a notification message is sent. In this message, you can include conditional values, instructions for resolution, or a summary of what the alert is. At a minimum, a notification must have a title and message.

#### タイトル

タイトルはモニターごとに一意である必要があります。これはマルチアラートモニターなので、メッセージテンプレート変数を使用してグループ要素 (`host` と `device`) ごとに名前を付けることができます。
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### メッセージ

次の例のように、メッセージを使用して問題の解決方法をチームに伝達します。
```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

アラートと警告のしきい値に基づいて条件付きメッセージを追加するには、メッセージに含めることができる利用可能な[通知変数][8]を参照してください。

#### サービスとチームメンバーへの通知

Send notifications to your team through email, Slack, PagerDuty, and more. You can search for team members and connected accounts with the dropdown box. 

{{< img src="getting_started/monitors/monitor_notification.png" alt="Add a monitor message and automations to your alert notification" style="width:100%;" >}}

To add a workflow from [Workflow Automation][14] or a case from [Case Management][15] to the alert notification, click **Add Workflow** or **Add Case**. You can also tag [Datadog Team][16] members by using the `@team` handle.

他のセクションはそのままにしておきます。各構成オプションの詳細については、[モニター構成][9]のドキュメントを参照してください。

### 権限

Click **Edit Access** to restrict the editing of your monitor to its creator and to specific roles in your org. Optionally, select `Notify` to be alerted when the monitor is modified.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="Set access permissions for a monitor and options for audit notifications" style="width:80%;" >}}

For more information about roles, see [Role Based Access Control][10].

## モバイルでモニターとトリアージアラートを見る

[Apple App Store][12] および [Google Play ストア][13]で入手できる [Datadog モバイルアプリ][11]をダウンロードすれば、モバイルのホーム画面からモニター保存ビューを閲覧したり、モニターの表示やミュートを行うことができます。これは、ラップトップやデスクトップから離れているときのトリアージに役立ちます。

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのインシデント">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/metric/
[2]: /ja/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /ja/integrations/disk/
[7]: /ja/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /ja/monitors/notify/variables/
[9]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /ja/account_management/rbac/
[11]: /ja/service_management/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /ja/service_management/workflows/
[15]: /ja/service_management/case_management/
[16]: /ja/account_management/teams/
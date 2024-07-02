---
title: Watchdog Monitor
description: "Algorithmically detects application and infrastructure issues."
aliases:
- /monitors/monitor_types/watchdog
- /monitors/create/types/watchdog/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /watchdog/
  tag: Documentation
  text: Watchdog, algorithmically detect application and infrastructure issues
---

## 概要

[Watchdog][1] は、APM、インフラストラクチャー、ログのためのアルゴリズム機能です。メトリクスやログの傾向やパターンを継続的に観測し、非定型的な挙動を探すことで、潜在的な問題を自動的に検出するものです。

## モニターの作成

Datadog で [Watchdog モニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Watchdog*。

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-1.png" alt="Configuring a Watchdog Monitor" style="width:80%;">}}

## Define your query
Select the scope to be alerted on with the following optional configurations (wildcards are supported):

**1. 定義済みセレクタ**
* Environment. These values are derived from the `env` tag.
* Alert Category. Scope the monitor to a subset of Watchdog alerts.
* Team. These values are derived from the Service Catalog.

**2. Additional scoping**
* Filter on any additional tag available on the Watchdog event.
* Group By the dimensions you want to [group notifications by][3].
{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-2.png" alt="Configuring a Watchdog Monitor with advanced settings" style="width:90%;">}}

選択が完了すると、モニター作成ページの上部にあるグラフに、選択した時間枠の中で一致した Watchdog イベントが表示されます。

### 通知

For more instructions on the **Configure notifications and automations** section, see the [Notifications][4] page.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /monitors/configuration/?tab=thresholdalert#alert-grouping
[4]: /monitors/notify/

---
description: Guide for creating alerts on conversion rates.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentation
  text: Learn about RUM Monitors
title: Alerting With Conversion Rates
---

## 概要

コンバージョン率は、ユーザーワークフローの成功を監視する上で非常に重要です。このガイドでは、[RUM ファネル][1]の視覚化でコンバージョン率を生成し、コンバージョン率が所定のしきい値を下回ると通知するアラートを作成する方法を説明します。

## RUM エクスプローラーでファネルを作成する

In Datadog, navigate to [Digital Experience > Product Analytics > Funnels][1].

{{< img src="real_user_monitoring/funnel_analysis/rum-funnel-creation-2.png" alt="The funnel creation page with key actions highlighted" style="width:100%;" >}}

In the **Define steps for measuring conversion** section, create some steps from your views and actions. You can click on the bar graphs to see a side panel with analytics about user conversions and dropoffs. To add a subsequent view or action in the funnel, click **+** and select from frequent next steps.

## Export the conversion rate graph

ファネルには、全体のコンバージョン率とドロップオフ率、コンバージョンまたはドロップオフセッションの数、コンバージョンまたはドロップオフセッションのパーセンテージが表示されます。

Click the **Save to Dashboard** button and select an existing dashboard from the dropdown menu to export the graph to. Optionally, click **New Dashboard** to create a dashboard.

## Edit the conversion rate query

ダッシュボードでは、ウィジェットを編集し、**Graph your data** の下でコンバージョン率のクエリにアクセスすることができます。

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/conversion-rate-formula.png" alt="RUM エクスプローラーでコンバージョン率クエリにアクセスする" style="width:100%;" >}}

## RUM モニターの更新

別のタブで、[**Monitors** > **New Monitor**][3] に移動し、**Real User Monitoring** を選択します。

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/copy-paste-query-into-rum-monitor.mp4" alt="既存のダッシュボードまたは新しいダッシュボードにファネルウィジェットをエクスポートする" video=true >}}

ダッシュボードからクエリをコピーして RUM モニターのクエリエディタに貼り付け、`(a / b) * 100` を使用して数式を追加します。

## 高度なモニター構成

適用されたクエリを使用して、アラート条件をカスタマイズし、アラートが適切な担当者やチャンネルに通知されるように通知を設定することができます。詳しくは、[リアルユーザーモニタリングモニター][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/funnels
[2]: https://app.datadoghq.com/rum/explorer?viz=timeseries
[3]: https://app.datadoghq.com/monitors/create/rum
[4]: /ja/monitors/types/real_user_monitoring/
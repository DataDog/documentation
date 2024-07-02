---
title: ユーザー保持
kind: documentation
description: Measure user retention to understand overall user satisfaction with your application.
further_reading:
    - link: /product_analytics/
      tag: ドキュメント
      text: 製品分析
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## 概要
Retention Analysis では、ユーザーがページやアクションに再訪する頻度を測定することができます。ユーザーのリテンションを長期的に追跡することで、全体的なユーザー満足度に関する洞察を得ることができます。

User retention is measured within a given cohort of users that you define. A cohort is a group of users who participate in an initial event, such as clicking a link. A user in the cohort is considered retained if they subsequently complete a return event, such as clicking the same link again or clicking a **Proceed to Payment** button. Only views and actions can act as events.

リテンショングラフは、毎週リターンイベントを完了したユーザーの割合を表示します。

{{< img src="real_user_monitoring/retention_analysis/example-retention-analysis-graph.png" alt="Retention Analysis グラフ例" style="width:100%;" >}}

## 前提条件

ユニークユーザー属性フィールドが反映される必要があります。[ユニークユーザー属性の送信方法][4]を参照してください。

## グラフの作成

To build a retention graph, navigate to **[Digital Experience > Product Analytics > Retention Analysis][1]**, which takes you to the **User Retention** page, then follow the steps below.

### 1. 初期イベントを定義する
1. ユーザーグループを定義する初期イベントとして機能するビューまたはアクションを選択します。
2. オプションで、使用デバイスやアクセス元の国などのフィルターを追加できます。
    - 初期イベントがビューの場合、任意の[ビューファセット][2]またはコンテキストファセットを追加できます。
    - 初期イベントがアクションの場合、任意の[アクションファセット][3]またはコンテキストファセットを追加できます。

### 2. オプションで、リターンイベントを定義する
リターンイベントのデフォルトは、元のイベントの繰り返しです。別のリターンイベントを使用するには

1. **Repeated the original event** を **Experienced a different event** に変更します。
2. リターンイベントとして機能するビューまたはアクションを選択します。
3. オプションで、ユーザーのオペレーティングシステムなど、必要なフィルター基準を追加します。

## グラフの分析
週ごとのユーザーリテンションに関する洞察は、グラフの各行を左から右に水平に読んでください。

個々のダイアグラムのセルをクリックしてユーザーのリストを表示したり、リストを CSV としてエクスポートすることができます。

{{< img src="real_user_monitoring/retention_analysis/retention-analysis-graph-details-panel.png" alt="ダイアグラムのセルの詳細パネル" style="width:90%;" >}}

グラフには、初期イベントとリターンイベントが一致するかどうかによって、若干異なる情報が表示されます。

### 一致するイベント
イベントが一致する場合
- **Week 0** は、初期イベントを完了したすべてのユーザーを表すため、常に 100% です。
- その他のセルは、ある週のビューアーを **Week 0** と比較し、その週にイベントを完了したコホートの割合を表示します。

{{< img src="real_user_monitoring/retention_analysis/matching-events-retention-graph.png" alt="一致するイベントのリテンショングラフ" style="width:90%;" >}}

上のグラフの **Dec 04 2023** の行を左から右に読むと
- **Week 0** にイベントを完了した人の 94% が、**Week 1** に再び戻ってきてイベントを完了しました。
- **Week 0** にイベントを完了した人の 92% が、**Week 2** に再び戻ってきてイベントを完了しました。

### 異なるイベント
イベントが異なる場合
- **Week 0** は、初期イベントとリターンイベントの両方を完了したユーザーを表します。
- **Week 0** 以降、各セルはその週にリターンイベントを完了した **Users** 列の割合を表示します。

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="異なるイベントのリテンショングラフ" style="width:90%;" >}}

上のグラフの **Dec 04 2023** の行を左から右に読むと
- 144 人のユーザーが初期イベントを完了しました。
- **Week 0** では、144 人のユーザーのうち 94% がリターンイベントを完了しました。
- **Week 1** では、144 人のユーザーのうち 92% がリターンイベントを完了しました。

## データ保持

Data retention for this feature is limited to 30 days unless your organization is configured to retain data for 90 days. You can file a [support ticket][5] to increase retention to 90 days at no additional cost.

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/retention-analysis
[2]: /real_user_monitoring/browser/data_collected/#view-attributes
[3]: /real_user_monitoring/browser/data_collected/#action-timing-metrics
[4]: /real_user_monitoring/browser/advanced_configuration#user-session
[5]: /help

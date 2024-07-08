---
description: コンバージョン率に関するアラートの作成ガイドです。
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM モニターについて
title: コンバージョン率でアラートを出す
---

## 概要

コンバージョン率は、ユーザーワークフローの成功を監視する上で非常に重要です。このガイドでは、[RUM ファネル][1]の視覚化でコンバージョン率を生成し、コンバージョン率が所定のしきい値を下回ると通知するアラートを作成する方法を説明します。

## RUM エクスプローラーでファネルを作成する

ビューとアクションに基づいてファネル視覚化を作成するには、[**UX Monitoring** > **Analytics**][2] に移動し、`Visualize as` フィールドの **Funnel** をクリックします。

次の例は、ファネル内の `Product` ステップのコンバージョン率にアラートするモニターを作成する方法を示しています。

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/second-step-in-funnel.png" alt="ファネルの第 2 ステップのコンバージョン率に関するモニターを作成する" style="width:100%;" >}}

ビューとアクションからいくつかのステップを作成します。棒グラフをクリックすると、ユーザーのコンバージョンとドロップオフに関する分析結果が表示されたサイドパネルが表示されます。ファネルに後続のビューまたはアクションを追加するには、**+** をクリックし、頻繁に行われる次のステップから選択します。

## コンバージョン率グラフのエクスポート

ファネルには、全体のコンバージョン率とドロップオフ率、コンバージョンまたはドロップオフセッションの数、コンバージョンまたはドロップオフセッションのパーセンテージが表示されます。

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/funnel-widget-export.mp4" alt="既存のダッシュボードまたは新しいダッシュボードにファネルウィジェットをエクスポートする" video=true >}}

**Export** ボタンをクリックし、グラフをエクスポートする既存のダッシュボードをドロップダウンメニューから選択します。オプションで、**New Dashboard** をクリックして、ダッシュボードを作成します。

## コンバージョン率クエリの編集

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

[1]: /ja/real_user_monitoring/explorer/visualize/#funnel
[2]: https://app.datadoghq.com/rum/explorer?viz=timeseries
[3]: https://app.datadoghq.com/monitors/create/rum
[4]: /ja/monitors/create/types/real_user_monitoring/
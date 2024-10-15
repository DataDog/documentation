---
description: RUM イベントに関するアラート作成ガイドです。
further_reading:
- link: /real_user_monitoring/platform/dashboards/
  tag: ドキュメント
  text: RUM ダッシュボード
- link: /monitors/create/types/real_user_monitoring/
  tag: ドキュメント
  text: RUM モニター
- link: /monitors/
  tag: ドキュメント
  text: アラート設定
title: RUM データによるアラート
---

## 概要

Real User Monitoring では、アプリケーションの非定型な動作を通知するアラートを作成することができます。複雑な条件、事前定義されたしきい値、平均、比率、パフォーマンスインジケーターメトリクス (Apdex など) を計算する複数のクエリで RUM モニターを作成することができます。

## 検索クエリを定義する

RUM モニターを作成するには、まず [RUM モニターのドキュメント][1]をご覧ください。[RUM エクスプローラー][2]で RUM データをフィルタリングするために、1 つまたは複数のクエリを追加することができます。各クエリでは、アプリケーションレベルまたは特定のページのようなより詳細なレベルでスコープを設定できます。

[カスタムファセットとメジャー][3]を含め、RUM が収集するあらゆるファセットを使用することができます。ロード時間、経過時間、エラー数などのビュー関連のカウントを測定するには、`measure by` フィールドを使用します。

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-rum-views-errors.png" alt="ビューが 8 個以上のエラーを超えた場合のアラートの検索クエリ" style="width:100%;">}}

上記の例は、Shopist iOS アプリケーションのビューに対して、`Application ID` や `View Path` といったファセットを構成した RUM モニターの検索クエリです。このモニター例では、ビューに大量のエラー (例えば、8 個以上) が発生した場合にアラートを発します。

## クエリをモニターにエクスポートする

[RUM エクスプローラー][2]の検索クエリをモニターにエクスポートすることで、クエリのすべてのコンテキストを保持することができます。

{{< img src="real_user_monitoring/guide/alerting-with-rum/export-to-monitor-3.mp4" alt="RUM エクスプローラーの右端にあるエクスポートボタン" video="true" style="width:100%;" >}}

上の例は、1Mb を超える画像用に設定された RUM モニターの検索クエリです。大きな画像は、アプリケーションのパフォーマンスを低下させる可能性があります。

構成済みの RUM モニターに検索クエリをエクスポートするには、**Export** ボタンをクリックします。詳細については、[RUM イベントのエクスポート][4]を参照してください。

## アラートのルーティング

アラートを作成したら、メッセージを書いてテスト通知を送信することで、アラートを個人またはチームのチャンネルにルーティングします。詳しくは、[通知][5]を参照してください。

## アラート設定例

以下の例では、RUM データを使ったアラートの使用例を紹介しています。

### 売上高の減少

RUM の[グローバルコンテキスト][6]を使えば、ユーザーごとの購入金額など、ビジネス特有の属性で RUM のイベントをリッチ化することが可能です。

この例では、アプリケーションのほとんどのユーザーが 800 ドルから 1000 ドルを使うと仮定して、ユーザーの支出パターンの週ごとの偏差を発見するように構成された RUM モニターを示します。

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-monitor.png" alt="売上高の減少の RUM モニター" style="width:100%;" >}}

今週の支出を先週の支出と比較するには、`week_before` などの関数を `roll up every` フィールドの横に追加します。また、絶対値を適用して、先週と今週の購買金額の差を計算することもできます。前週との差が 50 ドルを超えたら、アラートで通知を送ります。

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-alerting-conditions.png" alt="RUM モニターの売上高の減少に関するアラート条件" style="width:100%;" >}}

### エラー率

リクエストに対するエラーの割合から、リクエストの何パーセントがエラーになっているかを計算することができます。

この例では、サンプル Shop.ist アプリケーションの `/cart` ページのエラー率に対する RUM モニターを示しています。

{{< img src="real_user_monitoring/guide/alerting-with-rum/error-rate-example-monitor.png" alt="エラー率の RUM モニター" style="width:100%;" >}}

### パフォーマンスのバイタル

Real User Monitoring では、アプリケーションのパフォーマンスを [Core Web Vitals][7]、[Mobile Vitals][8] として測定、算出、採点しています。例えば、LCP (Largest Contentful Paint) は読み込みパフォーマンスを測定し、ページの読み込み開始時に 2.5 秒でベンチマークされます。

この例では、サンプル Shop.ist アプリケーションの `/cart` ページの LCP に対する RUM モニターを示しています。

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-largest-contentful-paint-example-monitor.png" alt="Largest Contentful Paint の RUM モニター" style="width:100%;" >}}

このモニター例では、LCP のロードに 2 秒かかると警告し、2.5 秒以上かかるとアラートを表示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/real_user_monitoring/#create-a-rum-monitor
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ja/real_user_monitoring/guide/send-rum-custom-actions/#create-facets-and-measures-on-attributes
[4]: /ja/real_user_monitoring/explorer/export/
[5]: /ja/monitors/notify/
[6]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[7]: /ja/real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[8]: /ja/real_user_monitoring/android/mobile_vitals/
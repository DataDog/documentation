---
aliases:
- /ja/monitors/faq/how-can-i-configure-a-metric-monitor-to-alert-on-no-change-in-value
further_reading:
- link: /monitors/
  tag: Documentation
  text: モニターの作成方法
- link: /monitors/notify/
  tag: Documentation
  text: モニター通知の設定
kind: ガイド
title: 値に変化がない場合のアラート
---

メトリクス値が設定された期間にわたって変化しないときにアラートをトリガーする簡単な方法は、クエリで `diff()` 関数を使用して開始することです。これにより、連続するデータポイントからデルタ値が生成されます。

* `diff(avg:system.mem.free{*})`

次に、abs() 関数を適用して、これらのデルタの絶対値を取得します。

* `abs(diff(avg:system.mem.free{*}))`

これらの関数は、"+" ボタンを使用して UI のクエリに適用できます。

{{< img src="monitors/faq/new_query_ui_monitors.png" alt="new_query_ui_monitors"  >}}

または、複雑なクエリを 'edit monitor' UI に手動で入力するか、[API][1] を介してプログラムで適用することもできます。下の画像を参照してください。

メトリクスモニター自体の[アラート条件][2]については、次のように構成します。

* しきい値アラートを選択します
* "Trigger when the metric is..." ドロップダウンセレクターを **below** または **equal to** に設定します
* "Alert Threshold" フィールドを 0 (ゼロ) に設定します

このコンフィギュレーションでは、選択した時間枠で値の変更が登録されていない場合にアラートイベントがトリガーされます。

他の[アラート条件/オプション][2]を設定することもできます。モニターの UI コンフィギュレーションは、次のようになります。

{{< img src="monitors/faq/zero_alert.png" alt="zero_alert"  >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/
[2]: /ja/monitors/create/configuration/
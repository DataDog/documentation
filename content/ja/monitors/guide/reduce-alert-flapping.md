---
aliases:
- /ja/monitors/faq/how-do-i-reduce-alert-flapping-noise
further_reading:
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
title: アラートのバタつきを抑える
---

アラートの疲労や、アラートが「バタバタ」する (「OK」から「アラート」状態に急激に切り替わる) ことは、よくある問題や悩みの種です。

There is functionality within Datadog that often leads to less noisy, more meaningful alerts.

* アラートしきい値の再評価
    * アラート <-> OK や状態変化が頻繁に起こる場合のバタつきを抑えるには、しきい値条件を大きくしたり小さくしたりするのが一番簡単な方法かもしれません。
* `min` のしきい値を使う
    * これは、時間枠内のメトリクスのすべてのデータポイントがしきい値に違反した場合にのみアラートをトリガーします

* 関数-レート、移動平均、タイムシフトの差分を用いてクエリを再構築する
    * This means, you can compare the difference between a metric stream's values with the values from a week ago and set alert conditions based off the difference
    * タイムシフトの差分では、関数を組み合わせることができ、また、履歴を表示することも可能です。例:
 `abs(system.cpu.system{*} - week_before(system.cpu.system{*}))`
    * メトリクスが頻繁に急上昇し、その急上昇が本質的に問題を示すものではない場合、レートまたは平均を適用することで、より意味のあるしきい値を設定することができます。

* 複合条件アラートで他のモニターの状態を考慮する
    * [Composite Monitor][6] allows you to combine two or more previously created alerts.
    例えば、あるホストで CPU が高く、かつディスクが高い場合、アラートをトリガーします。

* 異常検知や外れ値と一緒にいくつかのビルトイン分析モジュールを使用する
    * [異常検知][2]は、データストリームが履歴的に一貫性のない方法で動作したときにアラートを発行するために、いくつかの季節性分析を使用します。
    * [外れ値検出][3]は、同じコンテキストの他のデータストリームを使用して、あるストリームが他のストリームと比較して異なる方法で動作した場合にアラートを発行します。
    * どちらも複合条件アラートと併用することも可能です。

もし問題がアラートのルーティングであれば、[テンプレート変数][4]と[条件変数][5]による**警告**または**アラート**状態の分離は興味深いものになるでしょう。

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/monitors/types/anomaly/
[3]: /ja/monitors/types/outlier/
[4]: /ja/monitors/notify/variables/?tab=is_alert#template-variables
[5]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[6]: /ja/monitors/types/composite/
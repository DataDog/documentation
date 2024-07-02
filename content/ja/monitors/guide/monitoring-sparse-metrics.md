---
title: Monitoring Sparse Metrics
further_reading:
- link: "/api/latest/monitors/#edit-a-monitor"
  tag: Documentation
  text: Learn more about updating monitor settings through the API
- link: "/dashboards/functions/interpolation/#default-zero"
  tag: Documentation
  text: Learn more about interpolation
---

## 概要

データの報告頻度が低いモニターは、予期しない結果が出たり、クエリが意図した値を返さないことがあります。その場合、実際のデータや想定される値に応じてモニターが適切に設定されていることを確認するために使用できるツールや動作が用意されています。

このガイドでは、疎なデータを持つモニターのトラブルシューティングと構成に使える以下の方法について説明します。
- [メトリクスが疎であるかどうかを判断する](#how-to-determine-whether-you-have-a-sparse-metric)
- モニターのソースを検討する -> [メトリクスベースのモニター](#metric-based-monitor)、[イベントベースのモニター](#event-based-monitor)
- [モニターはスケジュールどおりに実行されているか？](#schedule-based-monitoring)


## メトリクスが疎であるかどうかを判断する方法

ダッシュボードウィジェット、ノートブック、あるいは[既存のモニターの履歴グラフ][1]を利用してデータポイントにカーソルを合わせると、各ポイント間のギャップが直線で埋められておらず、データポイントが連続的に見えるかどうかを確認することができます。

ノートブックまたはウィジェットで **Bars** 表示オプションを選択すると、データのポイントとその頻度が表示されます。

ウィジェットに表示されるメトリクスは、次のようになる場合があります。

{{< img src="monitors/guide/sparse_metrics/line_graph_sparse.png" alt="メトリクスのグラフで、折れ線グラフの直線が上下に移動している様子" style="width:90%;" >}}

しかし、**Bars** スタイルを適用すると、次のようになります。

{{< img src="monitors/guide/sparse_metrics/bar_graph_sparse.png" alt="上のメトリクスの折れ線グラフと同じデータで、各データポイントが棒で表示され、疎なメトリクスの棒と棒の間のギャップが目立つ" style="width:90%;" >}}

棒グラフ表示では、データポイント間のギャップをより明確に視覚化することができます。 

グラフエディターにグラフスタイルを変更するオプションが複数用意されていない場合は、関数 `default_zero()` をメトリクス に適用することで、データ間のギャップを明らかにすることができます。この関数については、[補間][2]のドキュメントを参照してください。

## メトリクスベースのモニター

このモニターの種類が[メトリクス][3]、[変化][4]、[異常値][5]、[予測][6]、[外れ値][7]のいずれかの場合は、以下の設定を調整します。

* *Advanced options* で、評価の際にデータウィンドウが一杯である必要があるかどうかに関して **Do not require** を選択します。
* データの遅延が頻繁に発生する場合は、モニターの評価遅延の時間を延ばすことを検討してください (秒単位)。*Advanced options* で、**Delay monitor evaluation by X seconds** フィールドに値を追加します。
* 予想される頻度に基づいて評価 (avg by、max by、min by、sum by) を調整します。デフォルトの評価は **avg by** ですが、疎なメトリクスには適さない可能性があります。
* 集計関数の **avg by** を使用している場合は、`default_zero()` のような[補間関数][2]を追加して、メトリクス間のギャップをゼロとして評価することを検討してください。
* クエリで算術演算を使用している場合は、[演算メトリクスと疎なメトリクスの監視][8]でより詳しい使い方を確認してください。

## イベントベースのモニター

このモニターの種類が[ログ][9]、[イベント][10]、[監査証跡][11]、[エラー追跡][12]のいずれかの場合は、以下をご覧ください。

* "Missing data" の設定 (*Evaluate as zero**、**Show NO DATA**、**Show NO DATA and notify**、または **Show OK**) が、想定されるモニターの挙動に対応していることを確認してください。
  {{< img src="monitors/guide/sparse_metrics/data_is_missing.png" alt="モニター構成の 'Set alert conditions' セクションの欠落データに関する選択オプション" style="width:80%;" >}}
* 評価期間を調整します。データポイントが 30 分ごとに利用可能になると予想される場合は、それを考慮した評価期間はする必要があります。

## スケジュールベースのモニタリング

監視しているのは、1 日、1 週間、1 か月のうちの特定の時点で発生する必要のあるイベントですか？バックアップジョブやエクスポートなどの CRON タスクですか？その場合は、[カスタムスケジュール][13]の利用を検討してください。RRULES を設定して、モニターがいつ評価と通知を行うべきかを定義できます。

## トラブルシューティング

疎なデータの監視に関するご質問は、[Datadog のサポートチームまでお問い合わせください][14]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/status/#investigate-a-monitor-in-a-notebook
[2]: /dashboards/functions/interpolation/#default-zero
[3]: /monitors/types/metric/?tab=threshold
[4]: /monitors/types/metric/?tab=change
[5]: /monitors/types/anomaly/
[6]: /monitors/types/forecasts/?tab=linear
[7]: /monitors/types/outlier/?tab=dbscan
[8]: /monitors/guide/monitor-arithmetic-and-sparse-metrics
[9]: /monitors/types/log/
[10]: /monitors/types/event/
[11]: /monitors/types/audit_trail/
[12]: /monitors/types/error_tracking/?tab=count
[13]: /monitors/guide/custom_schedules/?tab=day
[14]: /help/

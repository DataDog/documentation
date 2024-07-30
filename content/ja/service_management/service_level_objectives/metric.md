---
aliases:
- /ja/monitors/service_level_objectives/event/
- /ja/monitors/service_level_objectives/metric/
description: メトリクスを使用してサービスレベル目標 (SLO) を定義する
further_reading:
- link: /metrics/
  tag: Documentation
  text: メトリクスの詳細
- link: /service_management/service_level_objectives/
  tag: Documentation
  text: SLO の概要、構成、計算
title: メトリクスベース SLO
---

## 概要

メトリクスベースの SLO は、計数ベースのデータストリームでイベントの良し悪しを判断する場合に有用です。メトリクスクエリは良質なイベントの合計を同様の時間軸におけるイベント総数で割り、サービスレベル指標 (SLI) を算出します。SLO の作成には、[APM スパン][1]、[RUM イベント][2]、[ログ][3]から生成されるカスタムメトリクスを含め、あらゆるメトリクスを使用することができます。SLO の構成と計算方法については、[サービスレベル目標][4]のページを参照してください。

{{< img src="service_management/service_level_objectives/metric-based-slo-example.png" alt="メトリクスベース SLO の例" >}}

## セットアップ

[SLO ステータスページ][5]で、**New SLO +** を選択します。その後、[**Metric**][6] をクリックします。

### クエリの定義

1. 定義するクエリは 2 つあります。分子クエリは良好なイベントの合計を定義し、分母クエリは総イベントの合計を定義します。SLO 計算が正しく動作するように、クエリでは COUNT、RATE、またはパーセンタイル対応の DISTRIBUTION メトリクスを使用する必要があります。詳しくは[クエリ][9]のドキュメントをご覧ください。
1. タグを使用して特定のグループを含めるか除外するには、`FROM` フィールドを使用します。
1. パーセンタイル対応の DISTRIBUTION メトリクスでは、`count values...` アグリゲーターを使用して、メトリクスがカウントする数値のしきい値を指定する必要があります。この機能はしきい値クエリと呼ばれ、数値のしきい値に一致する生の値の数をカウントして、分子と分母のカウントを生成することができます。詳しくは、[しきい値クエリ][7]を参照してください。
1. オプションとして、パーセンタイル対応の DISTRIBUTION メトリクススでは、`count values...` アグリゲーターのすぐ右にあるドロップダウンを使用して、SLI を特定のグループごとに分割することができます。
1. オプションとして、COUNT または RATE のメトリクスでは、`sum by` アグリゲーターを使用して、SLI を特定のグループごとに分割することができます。

**例:** HTTP のリターンコードを追跡しており、メトリクスに `code:2xx OR code:3xx OR code:4xx` などのタグが含まれている場合の例。良好なイベントの合計は `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}` です。イベント自体の合計を表す `total` は `sum:httpservice.hits{!code:3xx}` となります。

`HTTP 3xx` を省いた理由は、これらは一般的にリダイレクトされるもので、SLI として、または SLl に対してカウントされるべきではないためです。一方、3xx ベースでないエラーコードは合計に含める必要があります。`total` には `HTTP 3xx` を除いたすべてのタイプのデータを、また `numerator` には `OK` タイプのステータスコードのみを充当します。

#### メトリクスベース SLI のマルチグループ

メトリクスベース SLI を使用すると、SLI の最も重要な属性に集中できます。エディターでメトリクスベース SLI にグループを追加するには、`datacenter`、`partition`、`availability-zone`、`resource` などのタグ、またはその他の関連グループを使用します。

{{< img src="service_management/service_level_objectives/metric_editor.png" alt="グループ化されたメトリクスベース SLO エディター" >}}

これらの SLI をグループ化すると、個々のグループのステータス、適切なリクエスト数、残りのエラーバジェットを詳細パネルで視覚化できます。

{{< img src="service_management/service_level_objectives/metric_results.png" alt="メトリクスベースの SLO グループ結果" >}}

デフォルトで、棒グラフは SLO 全体の正しい/正しくない要求すべての全体数を表示します。テーブルの該当する行をクリックすると、個別のグループの正しい/正しくない要求の棒グラフを詳しく確認できます。さらに、棒グラフの下にある凡例でオプションを選択し、正しいまたは正しくない要求の数を表示/非表示にすることも可能です。

**注**: モニターベース SLI を使用している場合は、[モニターグループを表示][8]することもできます。

### SLO ターゲットの設定

SLO ターゲットは、ターゲットパーセンテージとタイムウィンドウで構成されます。メトリクスベース SLO のターゲットを設定する場合、ターゲットパーセンテージは SLO の分母で示されたイベント合計のうち良質なイベントであるべき部分を指定し、タイムウィンドウは、ターゲットが追跡される必要があるローリング期間を指定します。

例: `リクエストの 99% は、過去 7 日間でエラーが生じていないこと`。

SLO がターゲットパーセンテージを上回っている間、SLO のステータスは緑色のフォントで表示されます。ターゲットパーセンテージに違反すると、SLO のステータスは赤色のフォントで表示されます。オプションで、ターゲットパーセンテージより大きい警告パーセンテージを含めて、SLO 違反に近づいていることを示すこともできます。警告パーセンテージに違反している場合 (ただし、ターゲットパーセンテージには違反していない場合)、SLO ステータスは黄色のフォントで表示されます。

**注:** メトリクスベースの SLO ターゲットには小数第 3 位まで使用できます。SLO の詳細 UI に表示される精度は `num_target_decimal_places + 1 = 小数第 4 位` までです。正確な精度は、分母クエリ内の値の大きさにより異なります。分母が大きいほど、小数第 4 位の上限まで精度を表示できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/tracing/generate_metrics/
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[3]: https://docs.datadoghq.com/ja/logs/log_configuration/logs_to_metrics/#overview
[4]: /ja/service_management/service_level_objectives
[5]: https://app.datadoghq.com/slo
[6]: https://app.datadoghq.com/slo/new/metric
[7]: /ja/metrics/distributions/#threshold-queries
[8]: /ja/service_management/service_level_objectives/monitor/
[9]: https://docs.datadoghq.com/ja/dashboards/querying/#advanced-graphing
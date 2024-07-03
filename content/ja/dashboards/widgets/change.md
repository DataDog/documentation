---
aliases:
- /ja/graphing/widgets/change/
description: Graph the change in a value over a chosen time period.
further_reading:
- link: /monitors/types/metric/?tab=change
  tag: Documentation
  text: Configure Change alert detection in monitors
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentation
  text: Widget JSON schema
- link: /dashboards/graphing_json/request_json/
  tag: Documentation
  text: Request JSON schema
title: Change Widget
widget_type: change
---

変化グラフは、特定の時間内におけるメトリクスの変動を示します。これは、N 分前の値と現在の値との絶対変化量または相対変化量 (%) を指定のしきい値と比較します。比較されるデータポイントは単一のポイントではなく、メトリクスの定義セクションのパラメーターを使用して計算される値です。詳細については、[メトリクスモニター][6]ドキュメント、および[変化アラートモニターガイド][7]を参照してください。

{{< img src="/dashboards/widgets/change/change_widget.png" alt="jvm.heap_memory メトリクスの変化ウィジェットの例" style="width:100%;" >}}

## セットアップ

### 構成

1. グラフ化するメトリクスを選択します。
2. 集計関数を選択します。
3. オプション: ウィジェットのコンテキストを選択します。
4. `host` や `service` などのタグキーで集計を分解します。
5. "Compare to" 期間の値を選択します。
    * an hour before (1 時間前)
    * a day before (1 日前)
    * a week before (1 週間前)
    * a month before (1 か月前)
6. `relative` または `absolute` 変化を選択します。
7. メトリクスの順序を決めるフィールドを選択します。
    * `change`
    * `name`
    * `present value`
    * `past value`
8. `ascending` か `descending` かを選択します。
9. グラフに現在値を表示するかどうかを選択します。

### オプション

#### コンテキストリンク

[コンテキストリンク][1]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内、またはサードパーティ製) の橋渡しをします。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/guide/context-links/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/
[6]: /ja/monitors/types/metric/?tab=change
[7]: /ja/monitors/types/change-alert/
---
aliases:
- /ja/graphing/widgets/geomap/
description: 地理データを色分けされた地域またはポイントで可視化し、場所に基づくメトリクスやパターンを表示します。
further_reading:
- link: /dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /notebooks/
  tag: ドキュメント
  text: Notebooks
title: Geomap ウィジェット
widget_type: geomap
---
Geomap ウィジェットは、色分けされた地域またはポイントで地理データを可視化します。以下の用途に使用できます。
- 国別のユーザーセッションを表示します。
- フィルタリングして、すべてのセッションのリストを新しいタブで表示します。
- 従業員別にフィルタリングしてユーザーセッションを表示します。
- 読み込み時間、Core Web Vitals、エラーが発生したビューの割合などのパフォーマンスメトリクスを監視します。
- メトリクスを地図上にプロットして、店舗やデバイスなどの物理的な場所の健全性を監視します。

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Geomap ウィジェットで地域にズームする" video=true >}}

## セットアップ{#setup}

{{< img src="dashboards/widgets/geomap/geomap_setup3.png" alt="Geomap のウィジェット構成の [Graph your data] セクション">}}

### 構成{#configuration}
1. 可視化レイヤーを選択します。
    * {{< ui >}}Regions{{< /ui >}}: 国または国の行政区画レベルでメジャーを集計します。
    * {{< ui >}}Points{{< /ui >}}: イベントをポイントとして地図上に重ね、地理的なイベントデータを表示します。

2. グラフ化するデータを選択します。<br>
  **注**: データソースのサポートは、選択した可視化レイヤーによって異なります。
  {{< tabs >}}
  {{% tab "地域" %}}
  |  データソース    | 注    |
  | --------------  | -------- |
  |ログイベント   | group by タグには、国 ISO コード (ISO alpha-2 形式) または国の行政区画 ISO コード (ISO-3166-2 形式) を含める必要があります。これを行うには [GeoIP プロセッサー][1]を使用するか、[インジェスト時にタグ][2]を手動で含めることができます。ログイベントクエリを構成するには、[ログ検索ドキュメント][3]を参照してください。|
  |メトリクス   | group by タグには、国 ISO コード (ISO alpha-2 形式) または国の行政区画 ISO コード (ISO-3166-2 形式) を含める必要があります。[インジェストされたログからメトリクスを生成][4]するか、[インジェスト時にタグ][2]を手動で含めることができます。メトリクスクエリを構成するには、[クエリドキュメント][5]を参照してください。|
  |RUM   | RUM クエリを構成するには、[RUM ドキュメント][6]を参照してください。|
  |SLO | SLO クエリを構成するには、[SLO 検索ドキュメント][7]を参照してください。|
  |Security Signals <br> App and API Protection <br> Audit Trail | クエリを構成するには、[ログ検索ドキュメント][3]を参照してください。|

  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "ポイント" %}}
  |  データソース | メモ |
  | -----------  | ----- |
  |ログイベント   | group by タグには、alpha-2 ISO 形式に従った国 ISO コードを含める必要があります。これを行うには [GeoIP プロセッサー][1]を使用するか、[インジェスト時にタグ][2]を手動で含めることができます。ログイベントクエリを構成するには、[ログ検索ドキュメント][3]を参照してください。|
  |RUM   | RUM クエリを構成するには、[RUM ドキュメント][4]を参照してください。|
  |メトリクス   | メトリクスクエリには地理座標は含まれません。メトリクスをプロットするには、緯度と経度の座標を提供するリファレンステーブルとクエリを結合します。「[リファレンステーブルを使用したメトリクスのプロット](#plot-metrics-with-a-reference-table)」を参照してください。|

  **注**: ポイントレイヤーには、一度に最大100,000件のイベントが表示されます。
  
  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (オプション){{< ui >}}Visual Options{{< /ui >}} の下の [{{< ui >}}Set widget default view{{< /ui >}}] ドロップダウンを使用して、マップの初期フォーカス位置を選択します。[{{< ui >}}Custom{{< /ui >}}] を選択してカスタム地域を定義するか、国、州、または都道府県の名前を検索します。

### リファレンステーブルを使用したメトリクスのプロット{#plot-metrics-with-a-reference-table}

メトリクスクエリには地理座標は含まれません。{{< ui >}}Points{{< /ui >}} レイヤーにメトリクスをプロットするには、メトリクスクエリを、緯度と経度の座標を提供する[リファレンステーブル][10]と結合します。リファレンステーブルは、マップ上に表示する場所の名前などのメタデータも提供できます。

開始する前に、以下をセットアップします。
- 各場所を識別する値 (例: `store_id`) でタグ付けされたメトリクス。
- そのタグと一致する値を持つ列、および各場所の緯度列と経度列を含むリファレンステーブル。列名は、ウィジェットエディターでマッピングするため、特定の形式に従う必要はありません。

リファレンステーブルを使用してメトリクスをプロットするには、以下の手順に従います。

1. Geomap ウィジェットをダッシュボードに追加し、{{< ui >}}Points{{< /ui >}} レイヤーを選択します。
1. ソースセレクターで [{{< ui >}}Metrics{{< /ui >}}] を選択し、メトリクスクエリを記述します。
1. 結合のタイプと、メトリクスと結合するリファレンステーブルを指定します。Geomap ウィジェットでは、[{{< ui >}}All locations{{< /ui >}}] (左結合) と [{{< ui >}}Locations with data only{{< /ui >}}] (内部結合) の 2 つの結合タイプを使用できます。
1. `store_id` などのメトリクスタグと、一致するリファレンステーブルの列を使用して、結合条件を定義します。結合の詳細については、[リファレンステーブルとメトリクスの結合][11]を参照してください。
1. {{< ui >}}latitude{{< /ui >}} と {{< ui >}}longitude{{< /ui >}} については、各場所の座標が含まれているリファレンステーブルの列を選択します。
1. (オプション) メトリクス値に基づいてポイントに色を付けるには、条件付き書式ルールを追加します。たとえば、ポイントを緑、黄、または赤に変えるしきい値を定義して、ステータスを強調表示します。
1. (オプション) {{< ui >}}Tooltip Fields{{< /ui >}} で、店舗名など、ポイントのツールチップに表示する追加のリファレンステーブル列を選択します。

### オプション{#options}

#### コンテキストリンク{#context-links}

[コンテキストリンク][7] はデフォルトで有効になっていますが、オンとオフを切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと Datadog 内またはサードパーティの他のページを結び付けます。

#### 視覚的書式設定ルール{#visual-formatting-rules}

Geomap ウィジェットの地域やポイントの色は、条件付きルールを使用してカスタマイズできます。

## API{#api}

このウィジェットは、**[Dashboards API][8]** で使用できます。[ウィジェット JSON スキーマの定義][9] については、以下のテーブルを参照してください。

{{< dashboards-widgets-api >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/geoip_parser/
[2]: /ja/getting_started/tagging/#define-tags
[3]: /ja/logs/search_syntax/
[4]: /ja/logs/logs_to_metrics/
[5]: /ja/dashboards/querying/
[6]: /ja/real_user_monitoring/explorer/search_syntax/
[7]: /ja/dashboards/guide/context-links/
[8]: /ja/api/latest/dashboards/
[9]: /ja/dashboards/graphing_json/widget_json/
[10]: /ja/reference_tables/
[11]: /ja/metrics/reference_table_joins_with_metrics/
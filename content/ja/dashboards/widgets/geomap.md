---
title: ジオマップ ウィジェット
kind: documentation
aliases:
  - /ja/graphing/widgets/geomap/
further_reading:
  - link: /ja/dashboards/timeboards/
    tag: Documentation
    text: タイムボード
  - link: /ja/dashboards/screenboards/
    tag: Documentation
    text: スクリーンボード
  - link: /ja/dashboards/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
  - link: /notebooks/
    tag: Documentation
    text: ノートブック
---
ジオマップウィジェットを使用すると、国のタグやファセットを持つメトリクスのグラフを作成できます。

{{< img src="dashboards/widgets/geomap/geomap.png" alt="ジオマップ" >}}

## セットアップ

{{< img src="dashboards/widgets/geomap/geomap_setup.png" alt="トップリスト"  style="width:80%;">}}

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * RUM: RUM クエリの構成については、[RUM ドキュメント][1]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][2]を参照してください。
      * **注**: タグ別グループは、alpha-2 ISO 形式の国名コードを含む必要があります。これを実行するには、[GeoIP Processor][3] を使用するか、[取り込み時にタグ][4]を手動で含めます。
    * メトリクス: メトリクスのクエリを構成するには、[クエリ作成][5]ドキュメントを参照してください。
      * **注**: タグ別グループは、alpha-2 ISO 形式の国名コードを含む必要があります。[取り込み済みのログからメトリクスを生成][6]するか[取り込み時にタグ][4]を手動で含めます。

2. オプション: ビューボックスを構成して、デフォルトでズームインする地図上の点を設定します。

### オプション

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/analytics/?tab=timeseries#build-an-analytics-query
[2]: /ja/logs/search_syntax/
[3]: /ja/logs/processing/processors/?tab=ui#geoip-parser
[4]: /ja/getting_started/tagging/#defining-tags
[5]: /ja/dashboards/querying/
[6]: /ja/logs/logs_to_metrics/
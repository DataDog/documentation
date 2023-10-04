---
aliases:
- /ja/graphing/widgets/geomap/
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: Documentation
  text: JSON を使用したダッシュボードの構築
- link: /notebooks/
  tag: Documentation
  text: ノートブック
kind: documentation
title: ジオマップ ウィジェット
---

ジオマップウィジェットは、地理データをプロットし、陰影のある地域や点を通して視覚化します。

{{< img src="/dashboards/widgets/geomap/geomap-points.png" alt="ポイントオーバーレイによるジオマップの視覚化" >}}

## セットアップ

{{< img src="dashboards/widgets/geomap/geomap_setup2.png" alt="ウィジェット構成の Geomap Graph your data セクション">}}

### コンフィギュレーション
1. 視覚化レイヤーを選択します。
    * **Regions**: 国レベルでメジャーを集計します。
    * **Points**: イベントを地図上に点として重ね合わせ、地理的なイベントデータを表示します。

2. グラフ化するデータを選択します。<br>
  **注**: データソースのサポートは、選択した視覚化レイヤーによって異なります。
  {{< tabs >}}
  {{% tab "リージョン" %}}
  |  データソース    | 備考    | 
  | --------------  | -------- |
  |Log Events   | タグ別グループは、alpha-2 ISO 形式の国名コードを含む必要があります。これを実行するには、[GeoIP Processor][1] を使用するか、[取り込み時にタグ][2]を手動で含めます。ログイベントクエリの構成は、[ログ検索ドキュメント][3]を参照してください。|
  |Metric   | タグ別グループは、alpha-2 ISO 形式の国名コードを含む必要があります。[取り込み済みのログからメトリクスを生成][4]するか[取り込み時にタグ][2]を手動で含めます。メトリクスクエリの構成は、[クエリのドキュメント][5]を参照してください。|
  |RUM   | RUM クエリの構成については、[RUM ドキュメント][6]を参照してください。 |
  |SLO | SLO クエリの構成については、[SLO 検索ドキュメント][7]を参照してください。 |
  |セキュリティシグナル <br> アプリケーションセキュリティ <br> 監査証跡 | クエリの構成については、[ログ検索ドキュメント][3]を参照してください。 |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_management/service_level_objectives/#searching-slos
  {{% /tab %}}

 {{% tab "ポイント" %}}
| データソース | 備考 |
| ----------- | ----- | 
|Log Events   | タグ別グループは、alpha-2 ISO 形式の国名コードを含む必要があります。これを実行するには、[GeoIP Processor][1] を使用するか、[取り込み時にタグ][2]を手動で含めます。ログイベントクエリの構成は、[ログ検索ドキュメント][3]を参照してください。|
|RUM | RUM クエリの構成については、[RUM ドキュメント][4]を参照してください。 |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. オプション: ビューボックスを構成して、最初にマップをフォーカスする場所を指定します。

### オプション

#### コンテキストリンク

[コンテキストリンク][7]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内、またはサードパーティ製) を接続します。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][8] ドキュメントをご参照ください。

変化ウィジェット専用の[ウィジェット JSON スキーマ定義][9]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/#geoip-parser
[2]: /ja/getting_started/tagging/#define-tags
[3]: /ja/logs/search_syntax/
[4]: /ja/logs/logs_to_metrics/
[5]: /ja/dashboards/querying/
[6]: /ja/real_user_monitoring/explorer/search_syntax/
[7]: /ja/dashboards/guide/context-links/
[8]: /ja/api/latest/dashboards/
[9]: /ja/dashboards/graphing_json/widget_json/
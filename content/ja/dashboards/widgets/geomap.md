---
aliases:
- /ja/graphing/widgets/geomap/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
title: Geomap Widget
widget_type: geomap
---

ジオマップウィジェットは、陰影をつけた地域や点を使って地理データを視覚化します。これにより、以下のようなことが可能になります。
- 国別のユーザーセッションを表示。
- フィルターをかけて、新しいタブで全セッションのリストを表示。
- 従業員別にフィルターされたユーザーセッションを表示。
- ロード時間、コア Web バイタル、エラーがあるビューの割合など、パフォーマンスメトリクスを監視。

{{< img src="/dashboards/widgets/geomap/geomap-points.png" alt="ポイントオーバーレイによるジオマップの視覚化" >}}

## セットアップ

{{< img src="dashboards/widgets/geomap/geomap_setup2.png" alt="ウィジェット構成の Geomap Graph your data セクション">}}

### 構成
1. 視覚化レイヤーを選択します。
    * **Regions**: 国レベルでメジャーを集計します。
    * **Points**: イベントをマップ上でポイントとしてオーバーレイし、地理的なイベントデータを表示します。

2. グラフ化するデータを選択します。<br>
  **注**: データソースのサポートは、選択した視覚化レイヤーによって異なります。
  {{< tabs >}}
  {{% tab "Regions" %}}
  |  データソース    | 備考    | 
  | --------------  | -------- |
  |ログイベント   | group by タグには、alpha-2 の ISO フォーマットに従った国の ISO コードを含める必要があります。これを行うには、[GeoIP Processor][1] を使用するか、手動で[取り込み時にタグ][2]を含めます。ログイベントクエリを構成するには、[ログ検索ドキュメント][3]を参照してください。|
  |メトリクス   | group by タグには、alpha-2 の ISO フォーマットに従った国の ISO コードを含める必要があります。[取り込んだログからメトリクスを生成する][4]か、手動で[取り込み時にタグ][2]を含めます。メトリクスクエリを構成するには、[クエリのドキュメント][5]を参照してください。|
  |RUM   | RUM クエリを構成するには、[RUM ドキュメント][6]を参照してください。|
  |SLO | SLO クエリを構成するには、[SLO 検索ドキュメント][7]を参照してください。 |
  |セキュリティシグナル <br> アプリケーションセキュリティ <br> 監査証跡 | クエリを構成するには、[ログ検索ドキュメント][3]を参照してください。 |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_management/service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  データソース | 備考 |
  | -----------  | ----- | 
  |ログイベント   | group by タグには、alpha-2 の ISO フォーマットに従った国の ISO コードを含める必要があります。これを行うには、[GeoIP Processor][1] を使用するか、手動で[取り込み時にタグ][2]を含めます。ログイベントクエリを構成するには、[ログ検索ドキュメント][3]を参照してください。 |
  |RUM   | RUM クエリを構成するには、[RUM ドキュメント][4]を参照してください。 |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. オプション: マップを最初にフォーカスする場所を指定するために、ビューボックスを構成します。

### オプション

#### コンテキストリンク

[コンテキストリンク][7]はデフォルトで有効になっていますが、有効/無効を切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内またはサードパーティ) を接続します。

## API

このウィジェットは **[Dashboards API][8]** で使用できます。[ウィジェット JSON スキーマ定義][9]については、以下の表を参照してください。

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
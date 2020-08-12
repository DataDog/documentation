---
title: RUM エクスプローラー
kind: documentation
aliases:
  - /ja/real_user_monitoring/rum_explorer
further_reading:
  - link: /real_user_monitoring/explorer/search/
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/rum_explorer/
    tag: ドキュメント
    text: Datadog でビューを検索する
---
{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM エクスプローラー"  >}}

RUM (Real User Monitoring) エクスプローラーでは、さまざまなアプリケーションから集めたすべてのビューを調査することができます。

## コンテキスト

最初に、RUM エクスプローラーページでビューを調査するためのコンテキストを作成します。それには、適切な[タイムレンジ](#time-range)を選択し、[検索バー][1]を使用してビューや分析を絞り込みます。

### タイムレンジ

タイムレンジは検索バーのすぐ下にタイムラインとして表示されます。これを使用して、ビューストリームや分析のビューを、期間を指定して表示することができます。

タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンから選択します (または、[カスタムタイムフレームを入力します][2]):

{{< img src="real_user_monitoring/explorer/rum_time_selector.png" alt="RUM のタイムセレクター"  style="width:50%;">}}

すべての検索パラメーターは URL の中に含まれています。URL を共有することで、ビューを共有できます。

## 視覚化

ビューをクリックするとパネルが開き、そのビューに関する詳しい情報 (リソース、トレース、エラー、ユーザーアクション、ロングタスク、ログ、属性) が表示されます。

{{< img src="real_user_monitoring/explorer/rum_views.png" alt="Rum View"  style="width:80%;">}}

## セットアップ - ファセットとメジャー

ビューを[収集した][3]後で、ビューの属性にファセットまたはメジャーのインデックスを付けると、[コンテキスト](#context)の作成時、または[分析][4]時にそれらを使用できます。

注: RUM エクスプローラーページを最大限に活用するために、ビューの属性が [Datadog の属性命名規則][5]に従っていることを確認してください。

{{< tabs >}}
{{% tab "Facets" %}}

ファセットは、1 つの属性またはタグの個別メンバーをすべて表示すると共に、示されたビューの数など、いくつかの基本的な分析も提供します。ファセットを使用すると、特定の属性に基づいてデータセットを絞り込んだり、データセットの切り口を変えることができます。絞り込むには、表示させたい値を選択します。

{{< img src="real_user_monitoring/explorer/rum_facet.png" alt="ファセットのデモ"  style="width:80%;">}}

**ファセットの作成**:

属性をファセットとして使用したり、検索で使用したりするには、属性をクリックしてファセットとして追加します。

{{< img src="real_user_monitoring/explorer/create_facet.png" style="width:50%;" alt="ファセットの作成"  style="width:30%;">}}

これで、この属性の値が**すべての新しいビューに**格納され、[検索バー][1]、ファセットパネル、および [RUM 分析クエリ][2]で使用できるようになります。

[1]: /ja/real_user_monitoring/explorer/search/#search
[2]: /ja/real_user_monitoring/rum_analytics/
{{% /tab %}}
{{% tab "Measures" %}}

メジャーは、ビューに含まれる数値を持つ属性です。

**メジャーの作成**:

属性をメジャーとして使用するには、ビューの数値属性をクリックします。

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="メジャーの作成"  style="width:30%;">}}

これで、この属性の値が**すべての新しいビューに**格納され、[検索バー][1]、ファセットパネル、および [RUM 分析クエリ][2]で使用できるようになります。

**メジャー単位の選択**:

各メジャーは独自の単位を持ち、RUM エクスプローラーの列と RUM 分析への表示に、この単位が使用されます。

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="メジャーの編集"  style="width:50%;">}}

[1]: /ja/real_user_monitoring/explorer/search/#search
[2]: /ja/real_user_monitoring/rum_analytics/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/search/#search-syntax
[2]: /ja/dashboards/guide/custom_time_frames
[3]: /ja/real_user_monitoring/installation/
[4]: /ja/real_user_monitoring/explorer/analytics/
[5]: /ja/logs/processing/attributes_naming_convention/
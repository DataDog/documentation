---
title: RUM エクスプローラー
kind: documentation
aliases:
  - /ja/real_user_monitoring/rum_explorer
further_reading:
  - link: /real_user_monitoring/rum_explorer/
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/explorer/search/
    tag: ドキュメント
    text: RUM エクスプローラーでの検索について
  - link: 'https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals'
    tag: ブログ
    text: RUM でウェブに関する主な指標を監視
---
{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM エクスプローラー"  >}}

RUM (Real User Monitoring) エクスプローラーでは、さまざまなアプリケーションから集めたすべてのデータを調査できます。また、RUM イベントに関する詳細な情報にアクセスして、以下のことを実施できます。 
- ユーザーセッションをナビゲートする
- ビュー、リソース、アクションに影響をおよぼすパフォーマンス問題を調査する
- アプリケーションエラーを解決する

## エクスプローラーをナビゲートする

{{< img src="real_user_monitoring/explorer/explorer_tabs.png" alt="RUM エクスプローラータブ"  >}}

RUM エクスプローラーには、デフォルトですべてのイベントタイプが表示されます。各タブから、選択した RUM イベントタイプに関連する列を含むカスタマイズされたリストにアクセスできます。

### イベントのサイドパネル

{{< img src="real_user_monitoring/explorer/event_side_panel.png" alt="RUM イベントのサイドパネル"  >}}

RUM エクスプローラーで行をクリックすると、イベントのサイドパネルが開きます。サイドパネルには RUM イベントに関連するすべての情報が表示されます。ビューとアクションは、関連するリソースとエラーと一緒にウォーターフォール形式で表示されます。

### 属性タブ

RUM は、デフォルトでコンテキスト情報を収集します。その他のコンテキスト属性は、グローバルテキスト API と一緒に追加できます。

{{< img src="real_user_monitoring/explorer/attributes_tab.png" alt="RUM イベントサイドパネルの属性タブ"  >}}

## コンテキスト

最初に、RUM エクスプローラーページで RUM イベントを調査するためのコンテキストを作成します。そのためには、適切な[タイムレンジ](#time-range)を選択し、[検索バー][1]を使用して RUM イベントや分析を絞り込みます。

### タイムレンジ

タイムレンジは検索バーのすぐ下にタイムラインとして表示されます。これを使用して、エクスプローラーストリームや分析の RUM イベントを、期間を指定して表示することができます。

タイムレンジをすばやく変更するには、プリセットされたレンジをドロップダウンから選択します (または、[カスタムタイムフレームを入力します][2]):

{{< img src="real_user_monitoring/explorer/rum_time_selector.png" alt="RUM のタイムセレクター"  style="width:50%;">}}

すべての検索パラメーターは URL の中に含まれています。URL を共有することで、ビューを共有できます。


## ファセットとメジャーの設定

情報を収集したら、RUM イベントの属性にファセットまたはメジャーのインデックスを付けると、[コンテキスト](#context)の作成時や[分析][3]時に使用できます。

{{< tabs >}}
{{% tab "Facets" %}}

ファセットには、1 つの属性またはタグの個別メンバーがすべて表示されると共に、表示された RUM イベントの数などの基本的な分析が提供されます。ファセットを使用すると、特定の属性に基づきデータセットの絞り込みや切り口の切り替えができます。絞り込むには、表示する値を選択します。

{{< img src="real_user_monitoring/explorer/rum_facet.png" alt="ファセットのデモ"  style="width:80%;">}}

**ファセットの作成**:

属性をファセットとして使用したり、検索で使用したりするには、属性をクリックしてファセットとして追加します。

{{< img src="real_user_monitoring/explorer/create_facet.png" style="width:50%;" alt="ファセットの作成"  style="width:30%;">}}

これで、この属性の値が**すべての新しいビューに**格納され、[検索バー][1]、ファセットパネル、および [RUM 分析クエリ][2]で使用できるようになります。

[1]: /ja/real_user_monitoring/explorer/search/#search
[2]: /ja/real_user_monitoring/rum_analytics/
{{% /tab %}}
{{% tab "Measures" %}}

メジャーは、RUM イベントに含まれる数値を持つ属性です。

**メジャーの作成**:

属性をメジャーとして使用するには、ビューの数値属性をクリックします。

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="メジャーの作成"  style="width:30%;">}}

これで、この属性の値が**すべての新しい RUM イベント用**に格納され、[検索バー][1]、ファセットパネル、および [RUM 分析クエリ][2]で使用できるようになります。

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
[3]: /ja/real_user_monitoring/explorer/analytics/
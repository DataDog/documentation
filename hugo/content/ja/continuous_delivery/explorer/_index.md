---
description: CD Visibility のデプロイメントをクエリおよび視覚化する方法について学習します。
further_reading:
- link: /continuous_delivery/features
  tag: ドキュメント
  text: CD Visibility の機能について
- link: /continuous_delivery/deployments/
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer/saved_views
  tag: ドキュメント
  text: Saved Views について
title: CD Visibility のデプロイメントを調査する
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility はプレビュー版です。アクセスは、すでに登録されている組織に限定されています。
{{< /callout >}}

## デプロイメント {#deployments}

デプロイメントの概要を確認するには、[**Software Delivery**] > [**CD Visibility**] > [**Deployments**][6] に移動します。

[**Deployments** ページ][6] には、選択した時間枠におけるサービスおよび環境別の集計統計と、最新のデプロイ実行のステータスが表示されます。このページを使用して、すべてのサービスデプロイメントを確認し、その健全性を把握します。
表示されるメトリクスには、実行数、失敗数、失敗率、所要時間の中央値、および所要時間の 95 パーセンタイル値が含まれます。この情報により、どのデプロイメントの失敗確率が高いか、どのデプロイメントの実行に最も時間がかかっているかが明らかになります。最新の変更による影響は、直近のデプロイ結果のステータス、リビジョン、および時刻を確認することで把握できます。

<div class="alert alert-info">サービスが構成されていないデプロイメントおよび部分的なデプロイメント実行は、Deployments ページの統計集計から除外されます。これらのデプロイメントは、Deployment Executions ページで検索できます<code>@deployment.partial_deployment:* OR -@deployment.service:*</code>。</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="The Deployments page in Datadog" style="width:100%" >}}

環境へのサービスのデプロイ方法が複数ある場合、デプロイ行を展開して、デプロイ名ごとにさらにフィルタリングされた統計情報を確認できます。

{{< ui >}}Deployment{{< /ui >}} ページでは、以下のような概要情報が提供されます。

- 集計された統計情報に基づく、さまざまなサービスおよび環境の健全性の概要。
- 本番環境でのデプロイ破損など、緊急の問題を特定して修正するためのウィンドウ。
- 各サービスのデプロイがどのように実行されたか、その結果や傾向の経時的な分析。

### デプロイメントの詳細 {#deployment-details}

特定のサービスデプロイメントをクリックすると {{< ui >}}Deployment Details{{< /ui >}} ページが表示され、指定した時間枠で選択したサービスデプロイメントのデータを確認できます。

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="単一デプロイメントの Deployment ページ" style="width:100%;">}}

時間の経過に伴う成功および失敗したデプロイメントの数、デプロイメントの平均所要時間、ロールバック数、失敗率など、選択したサービスデプロイメントに関するインサイトを取得します。ページの下部には、選択した環境フィルターに基づいて、そのサービスのデプロイ実行を示すテーブルが表示されます。

## デプロイ実行 {#deployment-executions}

[**Deployment Executions** ページ][4] には、選択した期間中のすべてのデプロイ実行が表示されます。左側のファセットを使用してデプロイ実行のリストをフィルターし、実行をクリックして Deployment Execution Details サイドパネルで詳細を確認します。

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployments ページの Deployment Details サイドパネル" style="width:100%;">}}

デプロイメントが CI Visibility のパイプラインに正しく関連付けられている場合、デプロイ実行パネルには、パイプラインのトレースを表示できる新しい [{{< ui >}}Pipeline{{< /ui >}}] タブが含まれます。このタブから、上部にある [{{< ui >}}View Full Pipeline{{< /ui >}}] リンクをクリックして CI Visibility に移動できます。

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="[Pipeline] タブ付きのデプロイ実行パネル" style="width:100%;">}}

デプロイメントを CI パイプラインに関連付けるために、追加のセットアップが必要になる場合があります。詳細については、ご利用の CD プロバイダーのセットアップページを参照してください。

[Deployment Executions ページ][4] では、任意のタグを使用して、複数のレベルでデプロイ実行を[検索とフィルター](#search-and-filter)、[分析](#analyze)、[視覚化](#visualize)、および[エクスポート](#export)できます。

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="CD Visibility エクスプローラーに表示されるデプロイ実行結果" width="100%" >}}

### 検索とフィルター {#search-and-filter}

左側のファセットをクリックするか、検索バーに独自のカスタムクエリを書き込むことで、デプロイ実行のサブセットに焦点を絞り込んだり、広げたり、変更したりできます。ファセットを選択または選択解除すると、検索バーにその変更が自動的に反映されます。同様に、検索バーのクエリを変更したり、検索バーにクエリをゼロから書き込んだりして、左側のファセットを選択または選択解除することもできます。クエリの作成方法については、[検索構文][2] を参照してください。

### 分析 {#analyze}

情報を導出または統合するために、クエリされたデプロイ実行をフィールド、パターン、トランザクションなどの上位レベルのエンティティにグループ化します。[ファセット][3] は属性を検索するために必須ではありませんが、ファセットを使用して以下の操作を実行できます。

- 環境におけるデプロイメントの検索および進捗の追跡を行います。
- すべてのデプロイメント結果を調査して、失敗したデプロイメントを特定し、トラブルシューティングを行います。

### 視覚化 {#visualize}

視覚化タイプを選択してフィルターや集計の結果を表示し、デプロイメントの実行状況をより深く理解します。たとえば、デプロイメント結果をリスト形式で表示して、デプロイメントデータを列ごとに整理できます。または、デプロイメント結果を時系列グラフで表示して、デプロイメントデータを経時的に測定します。

### エクスポート {#export}

[Deployment Executions ページ][4] で [ビュー][5] をエクスポートして、後で、または別のコンテキストで再利用します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_delivery/search
[2]: /ja/continuous_delivery/explorer/search_syntax
[3]: /ja/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /ja/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments
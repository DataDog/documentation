---
description: CD Visibility のデプロイをクエリし、可視化する方法を紹介します。
further_reading:
- link: /continuous_delivery/features
  tag: ドキュメント
  text: CD Visibility の機能について
- link: /continuous_delivery/deployments/
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer/saved_views
  tag: ドキュメント
  text: 保存ビューについて
title: CD Visibility のデプロイを確認する
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しませんか？" >}}
CD Visibility はプレビュー段階です。この機能に興味がある場合は、フォームにご記入いただき、アクセスをリクエストしてください。
{{< /callout >}}

## デプロイ

デプロイの概要を確認するには、[**Software Delivery** > **CD Visibility** > **Deployments**][6] に移動します。

[**Deployments** ページ][6] では、選択した期間におけるサービス別・環境別の集計統計に加え、最新のデプロイ実行のステータスも確認できます。このページを使うと、すべてのサービスのデプロイを一覧で把握し、健全性を俯瞰できます。
表示されるメトリクスには、実行回数と失敗回数、失敗率、継続時間の中央値、継続時間の 95 パーセンタイルが含まれます。これらの情報から、失敗する可能性が高いデプロイや、実行に最も時間がかかっているデプロイを特定できます。最新の変更の影響は、直近のデプロイ結果のステータス、リビジョン、時刻を確認することで把握できます。

<div class="alert alert-info">サービスが設定されていないデプロイと、一部のみ実行されたデプロイ実行は、Deployments ページの統計集計から除外されます。これらのデプロイは Deployment Executions ページで検索できます: <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="Datadog の Deployments ページ" style="width:100%" >}}

環境へのサービスのデプロイ方法が複数ある場合、デプロイ行を展開して、デプロイ名ごとにさらにフィルタリングされた統計情報を確認できます。

**Deployment** ページでは、以下のような概要情報が提供されます。

- 集計された統計情報に基づく、さまざまなサービスおよび環境の健全性の概要。
- 本番環境でのデプロイ破損など、緊急の問題を特定して修正するためのウィンドウ。
- 各サービスのデプロイがどのように実行されたか、その結果や傾向の経時的な分析。

### デプロイメントの詳細

特定のサービスデプロイメントをクリックすると、**Deployment Details** ページが表示され、指定した時間枠で選択したサービスデプロイメントのデータを確認できます。

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="単一のデプロイメントの Deployment ページ" style="width:100%;">}}

選択したサービスデプロイメントに関する情報として、成功および失敗したデプロイメントの回数、平均デプロイ期間、ロールバックの回数、失敗率などの洞察が得られます。ページ下部には、選択された環境フィルターに基づくサービスのデプロイメント実行の一覧が表示されます。

## デプロイメント実行

[**Deployment Executions** ページ][4] では、選択した期間にデプロイが実行されたすべてのタイミングを確認できます。左側のファセットを使ってデプロイ実行の一覧を絞り込み、実行をクリックすると、Deployment Execution Details のサイド パネルで追加の詳細を確認できます。

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployments ページの Deployment Details サイドパネル" style="width:100%;">}}

デプロイメントが CI Visibility のパイプラインに正しく関連付けられている場合、デプロイメント実行パネルに新しい **Pipeline** タブが表示され、そこからパイプラインのトレースを確認できます。このタブから、画面上部の **View Full Pipeline** リンクをクリックすると、CI Visibility のページに移動できます。

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="パイプラインタブが表示されたデプロイメント実行パネル" style="width:100%;">}}

デプロイメントを CI パイプラインに関連付けるには、追加の設定が必要になる場合があります。詳細については、ご利用の CD プロバイダーのセットアップページを参照してください。

[Deployment Executions ページ][4] では、任意のタグを使って、複数の粒度でデプロイ実行を [検索とフィルタリング](#search-and-filter)、[分析](#analyze)、[可視化](#visualize)、[エクスポート](#export) できます。

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="CD Visibility Explorer に表示されるデプロイメント実行結果" width="100%" >}}

### 検索とフィルター

左側のファセットをクリックするか、検索バーに独自のカスタム クエリを入力して、デプロイ実行のサブセットに対する焦点を絞り込んだり、広げたり、切り替えたりできます。ファセットを選択・選択解除すると、検索バーの内容は自動的に反映されます。同様に、検索バーのクエリを編集したり、検索バーで一からクエリを作成したりして、左側のファセットを選択・選択解除することもできます。クエリの作り方については、[検索構文][2] を参照してください。

### 分析

クエリしたデプロイメントを、フィールド、パターン、トランザクションなどの上位エンティティにグループ化して、情報を取得・統合します。[ファセット][3]は属性の検索に必須ではありませんが、次のようなアクションを実行できます。

- 環境におけるデプロイメントの検索および進捗の追跡
- すべてのデプロイメント結果を調査して、失敗したデプロイメントを特定し、トラブルシューティング

### 可視化

視覚化タイプを選択してフィルターや集計結果を表示し、デプロイメント実行をより深く理解する。例えば、デプロイメント結果をリストで表示し、デプロイメントデータを列に整理します。または、デプロイメント結果を時系列グラフで表示し、時間経過によるデプロイメントデータを測定します。

### エクスポート

[Deployment Executions ページ][4] の [ビュー][5] をエクスポートしておくと、後で再利用したり、別のコンテキストで使い回したりできます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_delivery/search
[2]: /ja/continuous_delivery/explorer/search_syntax
[3]: /ja/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /ja/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments
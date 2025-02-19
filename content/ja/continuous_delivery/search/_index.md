---
description: デプロイメントを検索・管理する方法を説明します。
further_reading:
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: パイプライン実行を検索およびフィルターする
title: デプロイメントの検索と管理
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility は現在、選択されたサイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しませんか？" >}}
CD Visibility は現在プレビュー版です。この機能にご興味がある場合は、フォームにご記入いただき、アクセスをリクエストしてください。
{{< /callout >}}

## デプロイメント

デプロイメントの概要を確認するには、[**Software Delivery** > **CD Visibility** > **Deployments**][1] に移動します。

[**Deployments** ページ][1]には、選択した期間におけるサービスおよび環境ごとの集計統計と、最新のデプロイメント実行のステータスが表示されます。このページを使用して、すべてのサービスデプロイメントを確認し、その健全性の概要を把握できます。
表示されるメトリクスには、実行数、失敗数、失敗率、中央値、95 パーセンタイル値が含まれます。この情報により、失敗の可能性が高いデプロイメントや、実行に最も時間がかかっているデプロイメントを特定できます。最後のデプロイメント結果のステータス、リビジョン、時間を確認することで、最新の変更の影響を確認できます。

<div class="alert alert-info">サービスが構成されていないデプロイメントや、部分的に実行されたデプロイメントは、Deployments ページの統計集計から除外されます。これらのデプロイメントは、Deployment Executions ページで <code>@deployment.partial_deployment:* OR -@deployment.service:*</code> を検索して確認できます。</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="Datadog の Deployments ページ" style="width:100%" >}}

環境へのサービスのデプロイ方法が複数ある場合、デプロイ行を展開して、デプロイ名ごとにさらにフィルタリングされた統計情報を確認できます。

**Deployment** ページでは、以下のような概要情報が提供されます。

- 集計された統計情報に基づく、さまざまなサービスおよび環境の健全性の概要。
- 本番環境でのデプロイ破損など、緊急の問題を特定して修正するためのウィンドウ。
- 各サービスのデプロイがどのように実行されたか、その結果や傾向の経時的な分析。

## デプロイメントの詳細

特定のサービスデプロイメントをクリックすると、**Deployment Details** ページが表示され、指定した時間枠で選択したサービスデプロイメントのデータを確認できます。

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="単一のデプロイメントの Deployment ページ" style="width:100%;">}}

選択したサービスデプロイメントに関する情報として、成功および失敗したデプロイメントの回数、平均デプロイ期間、ロールバックの回数、失敗率などの洞察が得られます。ページ下部には、選択された環境フィルターに基づくサービスのデプロイメント実行の一覧が表示されます。

## デプロイメント実行

[**Deployment Executions** ページ][2]では、選択した時間枠におけるデプロイメント実行の全履歴が表示されます。左側のファセットを使用してデプロイメント実行リストをフィルタリングし、実行をクリックすると、Deployment Execution Details サイドパネルでさらに詳細が表示されます。

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployments ページの Deployment Details サイドパネル" style="width:100%;">}}

デプロイメントが CI Visibility のパイプラインに正しく関連付けられている場合、デプロイメント実行パネルに新しい **Pipeline** タブが表示され、そこからパイプラインのトレースを確認できます。このタブから、画面上部の **View Full Pipeline** リンクをクリックすると、CI Visibility のページに移動できます。

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="パイプラインタブが表示されたデプロイメント実行パネル" style="width:100%;">}}

デプロイメントを CI パイプラインに関連付けるには、追加の設定が必要になる場合があります。詳細については、ご利用の CD プロバイダーのセットアップページを参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/ci/deployments/executions
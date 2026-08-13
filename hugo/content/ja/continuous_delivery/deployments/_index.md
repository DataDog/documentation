---
cascade:
  algolia:
    rank: 70
    tags:
    - CD パイプライン
    - CD パイプライン
further_reading:
- link: /continuous_delivery/search
  tag: ドキュメント
  text: デプロイメント結果を検索・管理する方法
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: CD Visibility Explorer について
title: Datadog における CD Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しませんか？" >}}
CD Visibility は現在プレビュー版です。この機能にご興味がある場合は、フォームにご記入いただき、アクセスをリクエストしてください。
{{< /callout >}}

## 概要

[Deployment Visibility][1] はデプロイメントを優先した視点から、デプロイメントの重要なメトリクスと結果を表示することにより、CD の健全性を把握するためのビューを提供します。

## セットアップ

{{< whatsnext desc="デプロイメントプロバイダーを選択して、Datadog で CD Visibility をセットアップします。" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}CI プロバイダー (GitLab、Jenkins、CircleCI など){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-danger">サポートされていないプロバイダーをご利用の場合は、<a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">このフォームに記入してサポートをリクエストしてください</a>。</div>

## デプロイメントデータの使用

[ダッシュボード][2]や[ノートブック][3]を作成するとき、検索クエリにデプロイメントデータを使用することで、ビジュアライゼーションウィジェットのオプションが更新されます。詳細については、[ダッシュボード][4]および[ノートブックのドキュメント][5]を参照してください。

## デプロイメントデータの共有

**Export** ボタンをクリックすることで、[保存ビュー][6]へ検索クエリをエクスポートできます。

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="CD Visibility Explorer に表示されるデプロイメント実行結果" width="100%" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/notebook/list
[4]: /ja/dashboards
[5]: /ja/notebooks
[6]: /ja/continuous_delivery/explorer/saved_views
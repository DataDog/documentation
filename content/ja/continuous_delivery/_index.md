---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous delivery
    - デプロイメントの可視性
    - デプロイメント
    - デプロイメント実行
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility のセットアップ方法
- link: continuous_delivery/search
  tag: ドキュメント
  text: デプロイメント結果を検索・管理する方法
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: CD Visibility Explorer について
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: ブログ
  text: CI/CD モニタリングのベストプラクティス
title: Continuous Delivery Visibility
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しませんか？" >}}
CD Visibility はプレビュー段階です。この機能に興味がある場合は、フォームにご記入いただき、アクセスをリクエストしてください。
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility は、デプロイメントに関する可観測性を提供します。CD Visibility を使用すると、デプロイメントのメトリクスやデータを Datadog に取り込み、デプロイメントの健全性を伝えられるようになり、チームが常に高品質のコードを提供できるようにするための改善に注力できます。

## デプロイ頻度の向上

Deployment Visibility を利用すると、すべてのデプロイメントイベントをトラッキングすることで、さまざまな CD 環境でのデプロイメントを監視できます。ボトルネックを特定し、障害を把握し、デプロイメント成功のメトリクスを測定できます。CD Visibility を導入すると、チームはプロセスを最適化し、安全にデプロイ頻度を高め、一貫したデリバリーパフォーマンスを確保することが可能になります。

## シームレスなインテグレーションで効率アップ

Datadog は [CI プロバイダー][4]や、[Argo CD][5] のような CD プロバイダーと連携し、メトリクスを収集し、デプロイメントの実行パフォーマンスや結果を追跡します。

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

時間の経過とともに集計されたデータを利用して、傾向を把握し、運用効率を高めるためのデプロイメント戦略を改善してください。

## 準備はいいですか？

[Deployment Visibility][1] を参照して、CD プロバイダーで CD Visibility を設定する手順、互換性要件に関する情報、データ収集のインスツルメントと構成手順を確認してください。その後、[CD Visibility Explorer][2] でデプロイメント実行の詳細を確認し、検索クエリを[保存ビュー][3]にエクスポートしてみましょう。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_delivery/deployments
[2]: /ja/continuous_delivery/explorer
[3]: /ja/continuous_delivery/explorer/saved_views
[4]: /ja/continuous_delivery/deployments/ciproviders
[5]: /ja/continuous_delivery/deployments/argocd
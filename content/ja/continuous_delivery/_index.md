---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous delivery
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: database_monitoring/troubleshooting/
  tag: ドキュメント
  text: Deployment Visibility のセットアップ方法
- link: universal_service_monitoring/
  tag: ドキュメント
  text: デプロイメント結果を検索・管理する方法
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: CD Visibility Explorer について
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: ブログ
  text: CI/CD モニタリングのベストプラクティス
kind: ドキュメント
title: Continuous Delivery Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CD Visibility は利用できません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility は非公開ベータ版です。アクセスをリクエストするには、フォームに記入してください。
{{< /callout >}}

## 概要

Datadog Continuous Delivery (CD) Visibility は、デプロイメントの可観測性を提供します。CD Visibility が、デプロイメントのメトリクスとデータを Datadog に取り込むことで、あなたはデプロイメントの健全性を伝達することができ、毎回高品質なコードを提供するチームの能力を向上させることに労力を集中させることができます。

## シームレスなインテグレーションで効率アップ

Datadog は、以下の CD プロバイダーとインテグレーションして、デプロイメントメトリクスを収集し、デプロイメント実行のパフォーマンスと結果を追跡します。時間の経過とともに集計されたデータを使用して、デプロイメントのパフォーマンスの傾向を追跡します。

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

</br>

## 準備はいいですか？

ご利用の CD プロバイダーで CD Visibility をセットアップする手順、互換性の要件に関する情報、データ収集のインスツルメンテーションおよび構成については、[Deployment Visibility][1] を参照してください。その後、[CD Visibility Explorer][2] でデプロイメント実行の詳細を調査し、検索クエリを[保存ビュー][3]にエクスポートしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_delivery/deployments
[2]: /ja/continuous_delivery/explorer
[3]: /ja/continuous_delivery/explorer/saved_views
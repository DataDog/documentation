---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous delivery
    - deployment visibility
    - deployments
    - deployment executions
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

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CD Visibility は利用できません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility は、非公開ベータ版です。アクセスをリクエストするには、フォームにご記入ください。
{{< /callout >}}

## 概要

Datadog Continuous Delivery (CD) Visibility provides observability on your deployments. CD Visibility brings deployment metrics and data into Datadog so you can communicate the health of your deployments, and focus your efforts in improving your team's ability to deliver quality code every time.

## Improve deployment frequency

Deployment Visibility helps you monitor deployments across CD environments by tracking every deployment event. You can identify bottlenecks, understand failures, and measure deployment success metrics. With CD Visibility, your team can optimize processes, increase deployment frequency safely, and ensure consistent delivery performance.

## シームレスなインテグレーションで効率アップ

Datadog integrates with [CI providers][4] and CD providers like [Argo CD][5] to collect metrics and track the execution performance and results of your deployments.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Use the data aggregated over time to identify trends and improve your deployment strategies for enhanced operational efficiency.

## 準備はいいですか？

See [Deployment Visibility][1] for instructions on setting up CD Visibility with your CD providers, information about compatibility requirements, and steps for instrumenting and configuring data collection. Then, start exploring details about your deployment executions in the [CD Visibility Explorer][2] and export your search query into a [saved view][3].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_delivery/deployments
[2]: /ja/continuous_delivery/explorer
[3]: /ja/continuous_delivery/explorer/saved_views
[4]: /ja/continuous_delivery/deployments/ciproviders
[5]: /ja/continuous_delivery/deployments/argocd
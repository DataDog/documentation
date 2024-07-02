---
title: CD Visibility in Datadog
further_reading:
- link: /continuous_delivery/search
  tag: Documentation
  text: Learn how to search and manage your deployment results
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Learn about the CD Visibility Explorer
cascade:
    algolia:
        rank: 70
        tags: [cd pipeline, cd pipelines]
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">現在、選択されたサイト ({{< region-param key="dd_site_name" >}}) では CD Visibility は利用できません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility は非公開ベータ版です。アクセスをリクエストするには、フォームに記入してください。
{{< /callout >}}

## 概要

[Deployment Visibility][1] はデプロイメントを優先した視点から、デプロイメントの重要なメトリクスと結果を表示することにより、CD の健全性を把握するためのビューを提供します。

## セットアップ

{{< whatsnext desc="デプロイメントプロバイダーを選択して、Datadog で CD Visibility をセットアップします。" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}CI プロバイダー (GitLab、Jenkins、CircleCI など){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-warning">サポートされていないプロバイダーをご利用の場合は、<a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">このフォームに記入してサポートをリクエストしてください</a>。</div>

## デプロイメントデータの使用

When creating a [dashboard][2] or a [notebook][3], you can use deployment data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][4] and [Notebooks documentation][5].

## Share deployment data

You can export your search query to a [saved view][6] by clicking the **Export** button.

{{< img src="continuous_delivery/explorer/deployment_executions.png" alt="Deployment execution results appearing in the CD Visibility Explorer" width="100%" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/notebook/list
[4]: /dashboards
[5]: /notebooks
[6]: /continuous_delivery/explorer/saved_views

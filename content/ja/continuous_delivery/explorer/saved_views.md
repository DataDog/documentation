---
descriptions: Learn how to create and share saved views in the CD Visibility Explorer.
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: Documentation
  text: Learn how to create a search query
title: Saved Views
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

Saved views allow you to save the state of the [CD Visibility Explorer][2] and enable effective troubleshooting by providing you with access to scoped queries, relevant facets, visualization options, and the time range. 

Saved views can keep track of your:

- Deployment results and environment data
- Search queries (such as failed deployment executions with a specific CD provider, failing deployment executions in a given environment by their deployment status, deployment executions that required rollbacks, and deployment IDs or URLs)
- Live time range (such as the past hour or the past week)
- Visualizations (such as a timeseries, top list, table, or list)

You can also use saved views to share common queries and configurations with your teammates.

## Saved views

To access your saved views, expand **> Views** to the left in the [CD Visibility Explorer][1].

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Click **Save** to create a custom saved view from the current content in your Explorer.

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="Default view in the CD Visibility Explorer" width="100%" >}}

以下が可能です。

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

## デフォルトビュー

You can set a saved view to be your default landing page in the [CD Visibility Explorer][2]. Default views are set per user and have no impact on your organization. 

{{< img src="continuous_delivery/explorer/default_view.png" alt="Default view in the CD Visibility Explorer" width="100%" >}}

デフォルトの保存ビューは、UI でアクションを完了するか、別の構成が埋め込まれた Explorer のリンクを開くことで、一時的にオーバーライドされます。

**Views** パネルのデフォルトビューエントリでは、以下のアクションが可能です。

- エントリをクリックして、デフォルトビューをリロード
- 現在のパラメーターでデフォルトビューを更新
- デフォルトビューをデフォルト設定にリセットして、再起動

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: /ja/continuous_delivery/explorer/
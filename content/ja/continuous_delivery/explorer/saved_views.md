---
descriptions: CD Visibility Explorer で保存ビューを作成し、共有する方法を説明します。
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
title: 保存ビュー
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">現在、選択されたサイト ({{< region-param key="dd_site_name" >}})では、 CD Visibility は利用できません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility は非公開ベータ版です。アクセスをリクエストするには、フォームに記入してください。
{{< /callout >}}

## 概要

保存ビューを使用すると、 [CD Visibility Explorer][2] の状態を保存し、スコープされたクエリ、関連するファセット、視覚化オプション、および時間範囲にアクセスできるようになり、効果的なトラブルシューティングが可能になります。

保存ビューは以下を追跡できます。

- デプロイの結果と環境データ
- 検索クエリ (特定の CD プロバイダーで失敗したデプロイ実行、特定の環境でのデプロイステータスによる失敗したデプロイ実行、ロールバックを必要としたデプロイ実行、およびデプロイ ID や URL など)
- ライブ時間範囲 (過去 1 時間、過去 1 週間など)
- 視覚化 (時系列、トップリスト、表、リストなど)

保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

保存ビューにアクセスするには、 [CD Visibility Explorer][1] で **> Views** を左に展開します。

[デフォルトビュー](#default-views)を除くすべての保存ビューは、ユーザーが作成したカスタム保存ビューを含め、組織全体で共有されます。これらのビューは組織内の誰でも編集可能で、ビューを作成したユーザーのアバターが表示されます。エクスプローラーの現在のコンテンツからカスタム保存ビューを作成するには、 **Save** をクリックします。

<div class="alert alert-info">読み取り専用ユーザーには、更新、名前の変更、および削除のアクションが無効になっています。</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="CD Visibility Explorer のデフォルトビュー" width="100%" >}}

You can:

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

## Default views

[CD Visibility Explorer][2] では、保存ビューをデフォルトのランディングページに設定することができます。デフォルトビューはユーザーごとに設定され、組織には影響がありません。

{{< img src="continuous_delivery/explorer/default_view.png" alt="CD Visibility Explorer のデフォルトビュー" width="100%" >}}

Temporarily override your default saved view by completing an action in the UI or opening links in the Explorer that embeds a different configuration.

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: /ja/continuous_delivery/explorer/
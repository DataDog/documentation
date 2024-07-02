---
title: 保存ビュー
further_reading:
- link: /tests/explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
- link: /tests/explorer
  tag: ドキュメント
  text: Learn about the Test Visibility Explorer
---

## 概要

Saved views allow you to save the state of the [Test Visibility Explorer][2] on the [**Test Runs** page][1] and enable effective troubleshooting by providing you with quick access to scoped queries, relevant facets, visualization options, and the time range. 

保存ビューは、次のものを追跡できます。

- Test runs
- Search queries (such as flaky tests)
- 列のソート順
- ライブの時間範囲 (過去 1 時間や過去 1 週間など)
- Visualizations (such as a timeseries, toplist, table, or distribution graph)
- ファセットのサブセット

また、保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

To access your saved views, expand **> Views** to the left in the [Test Visibility Explorer][1].

{{< img src="continuous_integration/saved-view-test-runs.png" alt="Access Saved Views by clicking the tab to the left of Test Visibility" width="50%" >}}

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. 

Click **Save** to create a custom saved view from the current content in the Test Visibility Explorer.

以下が可能です。

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

## デフォルトビュー

You can set a saved view to be your default landing page in the [Test Visibility Explorer][2]. Default views are set per user and have no impact on your organization. 

Temporarily override your default saved view by completing an action in the UI or opening links in the Test Visibility Explorer that embeds a different configuration.

**Views** パネルのデフォルトビューエントリでは、以下のアクションが可能です。

- エントリをクリックして、デフォルトビューをリロード
- 現在のパラメーターでデフォルトビューを更新
- デフォルトビューをデフォルト設定にリセットして、再起動

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /tests/explorer/
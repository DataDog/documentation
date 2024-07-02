---
title: 保存ビュー
kind: documentation
aliases:
- /continuous_testing/explorer/saved_views/
further_reading:
- link: /synthetics/explore/results_explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
---

## 概要

Saved views allow you to save the state of the [Synthetic Monitoring & Testing Results Explorer][2] and enable effective troubleshooting by providing you with access to scoped queries, relevant facets, visualization options, and the time range. 

保存ビューは、次のものを追跡できます。

- CI バッチとテスト実行
- 検索クエリ (HTTP エラーステータスコードで失敗したテスト実行、ブロックステータスで失敗した CI 内のテスト実行、再試行が必要なテスト実行、CI パイプラインに追加するテスト ID など)
- ライブの時間範囲 (過去 1 時間や過去 1 週間など)
- 視覚化 (時系列、トップリスト、テーブル、リストなど)

また、保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

To access your saved views, expand **> Views** to the left in the [Synthetic Monitoring & Testing Results Explorer][1].

[デフォルトビュー](#default-views)を除き、保存ビューはすべて、ユーザーが作成したいカスタム保存ビューも含め、組織全体で共有されます。これらの保存ビューは組織内の誰でも編集可能で、ビューを作成したユーザーアバターが表示されます。Explorer の現在のコンテンツからカスタム保存ビューを作成するには、**Save** をクリックします。

以下が可能です。

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

## デフォルトビュー

You can set a saved view to be your default landing page in the [Synthetic Monitoring & Testing Results Explorer][2]. Default views are set per user and have no impact on your organization. 

{{< img src="continuous_testing/saved_view.png" alt="Saved Views in the Synthetic Monitoring & Testing Results Explorer" width="100%" >}}

Temporarily override your default saved view by completing an action in the UI or opening links in the Results Explorer that embeds a different configuration.

**Views** パネルのデフォルトビューエントリでは、以下のアクションが可能です。

- エントリをクリックして、デフォルトビューをリロード
- 現在のパラメーターでデフォルトビューを更新
- デフォルトビューをデフォルト設定にリセットして、再起動

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer
[2]: /continuous_testing/explorer/
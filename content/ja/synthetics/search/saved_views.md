---
further_reading:
- link: /synthetics/search/
  tag: ドキュメント
  text: Synthetic テストを検索・管理する方法を説明します
title: 保存ビュー
---

## 概要

保存ビューにより、 [Synthetic Tests ページ][1]の**検索と管理**の状態を保存し、スコープ付きクエリ、関連ファセット、[テストカバレッジウィジェット][3]、および時間範囲にすばやくアクセスできるため、効果的なトラブルシューティングを行うことができます。

また、保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビューの作成

保存ビューにアクセスするには、[Synthetic Tests ページ][1]の **Synthetic Monitoring & Continuous Testing** の左にある **> Views** を展開します。保存ビューを作成するには、Synthetic テストを検索し、**+ Create a New Saved View** をクリックします。 

{{< img src="synthetics/search/create_a_new_saved_view.png" alt="Synthetic Tests ページで新規の保存ビューを作成する" style="width:100%" >}}

[デフォルトビュー](#default-views)を除き、保存ビューはすべて、ユーザーが作成したいカスタム保存ビューも含め、組織全体で共有されます。これらの保存ビューは組織内の誰でも編集可能で、ビューを作成したユーザーアバターが表示されます。Synthetic Tests ページの現行のコンテンツから保存ビューを作成するには、名前を入力して **Save** をクリックします。

以下が可能です。

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

## デフォルトビュー

[Synthetic Tests ページ][2]では、[保存ビュー](#create-a-saved-view)をデフォルトのランディングページに設定することができます。デフォルトビューはユーザーごとに設定され、組織には影響がありません。

デフォルトの保存ビューを一時的に上書きするには、検索クエリのファセットを追加して、**Update your default view** をクリックします。新規の保存ビューを作成するには、**+ Create a New Saved View** ボタンをクリックします。

{{< img src="synthetics/search/update_your_default_view.png" alt="Synthetic Tests ページでデフォルトビューを更新する" style="width:100%" >}}

**Views** パネルのデフォルトビューエントリでは、以下のアクションが可能です。

- エントリをクリックして、デフォルトビューをリロード
- 現在のパラメーターでデフォルトビューを更新
- デフォルトビューをデフォルト設定にリセットして、再起動

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ja/synthetics/search/
[3]: /ja/synthetics/test_coverage/
---
aliases:
- /ja/continuous_testing/explorer/saved_views/
further_reading:
- link: /synthetics/explore/results_explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
title: 保存ビュー
---

## 概要

保存ビューは、[Synthetic Monitoring & Testing Results Explorer][2] の状態を保存することを可能にします。また、スコープされたクエリ、関連するファセット、視覚化オプション、および時間範囲にアクセスできるようにすることで、効果的なトラブルシューティングを実現します。

保存ビューは、次のものを追跡できます。

- CI バッチとテスト実行
- 検索クエリ (HTTP エラーステータスコードで失敗したテスト実行、ブロックステータスで失敗した CI 内のテスト実行、再試行が必要なテスト実行、CI パイプラインに追加するテスト ID など)
- ライブの時間範囲 (過去 1 時間や過去 1 週間など)
- 視覚化 (時系列、トップリスト、テーブル、リストなど)

また、保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

保存ビューにアクセスするには、[Synthetic Monitoring & Testing Results Explorer][1] の左側にある **> Views** を展開します。

[デフォルトビュー](#default-views)を除き、保存ビューはすべて、ユーザーが作成したいカスタム保存ビューも含め、組織全体で共有されます。これらの保存ビューは組織内の誰でも編集可能で、ビューを作成したユーザーアバターが表示されます。Explorer の現在のコンテンツからカスタム保存ビューを作成するには、**Save** をクリックします。

以下が可能です。

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

## デフォルトビュー

[Synthetic Monitoring & Testing Results Explorer][2] では、保存ビューをデフォルトのランディングページに設定することができます。デフォルトビューはユーザーごとに設定され、組織には影響がありません。

{{< img src="continuous_testing/saved_view.png" alt="Synthetic Monitoring & Testing Results Explorer の保存ビュー" width="100%" >}}

デフォルトの保存ビューは、UI でアクションを完了するか、別のコンフィギュレーションが埋め込まれた Results Explorer へのリンクを開くことで、一時的に上書きされます。

**Views** パネルのデフォルトビューエントリでは、以下のアクションが可能です。

- エントリをクリックして、デフォルトビューをリロード
- 現在のパラメーターでデフォルトビューを更新
- デフォルトビューをデフォルト設定にリセットして、再起動

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer
[2]: /ja/continuous_testing/explorer/
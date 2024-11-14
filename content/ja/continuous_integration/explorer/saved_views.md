---
further_reading:
- link: /continuous_integration/explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
- link: /continuous_integration/explorer
  tag: ドキュメント
  text: CI Visibility Explorer について
title: 保存ビュー
---

## 概要

保存ビューにより、 [**Executions** ページ][3]の [CI Visibility Explorer][2] の状態を保存し、スコープ付きクエリ、関連ファセット、視覚化オプション、および時間範囲にすばやくアクセスできるため、効果的なトラブルシューティングを行うことができます。

保存ビューは、次のものを追跡できます。

- パイプライン実行
- 検索クエリ (失敗したジョブなど)
- 列のソート順
- ライブの時間範囲 (過去 1 時間や過去 1 週間など)
- 視覚化 (時系列、トップリスト、表、分布グラフなど)
- ファセットのサブセット

また、保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

保存ビューにアクセスするには、[CI Visibility Explorer][1] の左側にある **> Views** を展開します。

  {{< img src="continuous_integration/saved-view-pipelines-executions.png" alt="CI Visibility の左側のタブをクリックして保存ビューにアクセスします" width="50%" >}}

[デフォルトビュー](#default-views)を除き、保存ビューはすべて、ユーザーが作成したいカスタム保存ビューも含め、組織全体で共有されます。これらの保存ビューは組織内の誰でも編集可能で、ビューを作成したユーザーアバターが表示されます。

Explorer の現在のコンテンツからカスタム保存ビューを作成するには、**Save** をクリックします。

以下が可能です。

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

## デフォルトビュー

[CI Visibility Explorer][2] では、保存ビューをデフォルトのランディングページに設定することができます。デフォルトビューはユーザーごとに設定され、組織には影響がありません。

デフォルトの保存ビューは、UI でアクションを完了するか、別の構成が埋め込まれた Explorer のリンクを開くことで、一時的にオーバーライドされます。

**Views** パネルのデフォルトビューエントリでは、以下のアクションが可能です。

- エントリをクリックして、デフォルトビューをリロード
- 現在のパラメーターでデフォルトビューを更新
- デフォルトビューをデフォルト設定にリセットして、再起動

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /ja/continuous_integration/explorer/
[3]: https://app.datadoghq.com/ci/pipeline-executions
---
title: Saved Views
further_reading:
- link: /continuous_integration/explorer/search_syntax/
  tag: Documentation
  text: Learn how to create a search query
- link: /continuous_integration/explorer
  tag: ドキュメント
  text: CI Visibility Explorer について
---

## 概要

Saved views allow you to save the state of the [CI Visibility Explorer][2] on the [**Executions** page][3] and enable effective troubleshooting by providing you with quick access to scoped queries, relevant facets, visualization options, and the time range. 

保存ビューは、次のものを追跡できます。

- Pipeline executions
- Search queries (such as failed jobs)
- 列のソート順
- ライブの時間範囲 (過去 1 時間や過去 1 週間など)
- Visualizations (such as a timeseries, toplist, table, or distribution graph)
- ファセットのサブセット

また、保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

保存ビューにアクセスするには、[CI Visibility Explorer][1] の左側にある **> Views** を展開します。

{{< img src="continuous_integration/saved-view-pipelines-executions.png" alt="Access Saved Views by clicking the tab to the left of CI Visibility" width="50%" >}}

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. 

Click **Save** to create a custom saved view from the current content in the CI Visibility Explorer.

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
[2]: /continuous_integration/explorer/
[3]: https://app.datadoghq.com/ci/pipeline-executions
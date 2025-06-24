---
further_reading:
- link: /quality_gates/explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
title: 保存ビュー
---

{{< callout url="#" btn_hidden="true" header="プレビューに参加してください！" >}}
Quality Gates はプレビュー版です。
{{< /callout >}}

## 概要

保存ビューを使用すると、[**Quality Gate Executions** ページ][1]上の [Quality Gates Explorer][2] の状態を保存でき、特定の条件に絞ったクエリや関連するファセット、可視化オプション、時間範囲などへのアクセスを通じて、効果的なトラブルシューティングが可能になります。

保存ビューでは、以下の情報を追跡できます:

- Quality Gate の実行およびルールの実行 
- 検索クエリ 
- 列のソート順 
- ライブの時間範囲 (直近 1 時間や直近 1 週間など) 
- 可視化 (時系列、トップリスト、テーブル、ファネルグラフなど) 
- ファセットのサブセット 

また、保存ビューを使うことで、共通のクエリや設定をチームメンバーと共有することもできます。

## 保存ビュー

[Quality Gates Explorer][1] の左側にある **> Views** を展開すると、保存ビューにアクセスできます。

[デフォルトビュー](#default-views)を除くすべての保存ビューは、ユーザーが作成したカスタムビューを含め、組織全体で共有されます。これらのビューは組織内の誰でも編集でき、ビューの作成者のアバターが表示されます。**Save** をクリックすると、現在の Explorer の内容から保存ビューを作成できます。

{{< img src="quality_gates/explorer/expand_view_1.png" text="Quality Gates Explorer で保存ビューを作成" style="width:100%" >}}

利用可能な操作:

- 保存ビューを読み込む、または再読み込みする
- 現在のビューの構成で保存ビューを更新する
- 保存ビューの名前を変更または削除する
- 短縮リンクを使って保存ビューを共有する
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加する

<div class="alert alert-info">読み取り専用ユーザーに対しては、ビューの更新、名前変更、削除操作は無効化されています。</div>

## デフォルトビュー

[Quality Gates Explorer][2] では、保存ビューをデフォルトのランディングページに設定することができます。デフォルトビューはユーザーごとに設定され、組織には影響がありません。

{{< img src="quality_gates/explorer/default_view_1.png" text="Quality Gates Explorer でデフォルトビューを設定" style="width:100%" >}}

現在のデフォルトである保存ビューから、デフォルトとして使用したい新しいレイアウトへビューを更新します。**Views** パネルで、現在のビューをデフォルトの保存ビューとして保存してください。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates/executions
[2]: /ja/quality_gates/explorer/
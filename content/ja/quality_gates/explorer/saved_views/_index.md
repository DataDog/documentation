---
further_reading:
- link: /quality_gates/explorer/search_syntax/
  tag: ドキュメント
  text: 検索クエリの作成方法
kind: ドキュメント
title: パフォーマンス
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 Quality Gates は利用できません。</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates は公開ベータ版です。
{{< /callout >}}

## 概要

保存ビューにより、[**Quality Gate Executions** ページ][1]の[Quality Gates Explorer][2] の状態を保存し、スコープ付きクエリ、関連ファセット、可視化オプション、および時間範囲にすばやくアクセスできるため、効果的なトラブルシューティングを行うことができます。

保存ビューは、以下を追跡することができます。

- Quality Gates 実行とルール実行
- 検索クエリ 
- 列のソート順
- ライブ時間範囲 (過去 1 時間や過去 1 週間など)
- 視覚化 (時系列、トップリスト、テーブル、ファネルグラフなど)
- ファセットのサブセット

保存ビューを使用して、チームメイトと共通のクエリや構成を共有することもできます。

## 保存ビュー

保存ビューにアクセスするには、[Quality Gates Explorer][1] の左側にある **> Views** を展開します。

[デフォルトビュー](#default-views)を除き、保存ビューはすべて、ユーザーが作成したいカスタム保存ビューも含め、組織全体で共有されます。これらの保存ビューは組織内の誰でも編集可能で、ビューの作成者のアバターが表示されます。Explorer の現在のコンテンツからカスタム保存ビューを作成するには、**Save** をクリックします。

{{< img src="quality_gates/explorer/expand_view.png" text="Quality Gates Explorer に保存ビューを作成" style="width:100%" >}}

You can:

- 保存ビューをロードまたはリロード
- 保存ビューを現在のビューの構成で更新
- 保存ビューの名前を変更または削除
- ショートリンクを使用して保存ビューを共有
- 保存ビューをお気に入りに登録し、ナビゲーションメニューからアクセスできる Saved Views リストに追加

<div class="alert alert-info">更新、名前の変更、削除の操作は、読み取り専用ユーザーには無効です。</div>

## デフォルトビュー

[Quality Gates Explorer][2] では、保存ビューをデフォルトのランディングページに設定することができます。デフォルトビューは各ユーザーごとに設定され、組織への影響はありません。

{{< img src="quality_gates/explorer/default_view.png" text="Quality Gates Explorer でデフォルトビューを設定" style="width:100%" >}}

現在のデフォルト保存ビューから、デフォルトにしたい別のレイアウトにビューを更新するアクションを実行します。**Views** パネルで、現在のビューをデフォルトの保存ビューとして保存します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates/executions
[2]: /ja/quality_gates/explorer/
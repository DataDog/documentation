---
title: 保存ビュー
kind: documentation
description: 保存ビューを使用してログエクスプローラーを自動構成する
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
---
## ログエクスプローラーのデフォルトビュー

メインナビゲーションメニューからログ検索、ログ分析、ログパターンのページに移動するか、それぞれの URL をブラウザに入力すると、ログエクスプローラーのデフォルトビューがロードされます。

デフォルトビューには以下が含まれます。

* 空のクエリ
* ファセットリストに表示するファセット
* 基本のページレイアウト（検索、分析表示オプション、その他のテーブル構成）

ファセットリスト（以下を参照）やページレイアウトを変更すると、このデフォルトビューに自動的に保存されます。

{{< img src="logs/explorer/saved_views/edit_facet_list.png" alt="保存ビューの選択"  style="width:90%;" >}}

## 保存済みビュー

保存ビューでは、ログエクスプローラーでの検索に関して、以下の変更を保存することができます。

*  [検索クエリ][1]
* [選択したファセットのサブセット][2]
* デフォルト表示のカスタマイズ（[ログストリーム][3]、[ログパターン][4]、[ログ分析][5]、およびそれぞれの表示プロパティ）

### 保存ビューのロード

左側のパネルから保存ビューを直接選択するか、検索バーでオートコンプリート機能を使用し、一致するものを選択します。

{{< img src="logs/explorer/saved_views/saved_view_load-from-bar.png" alt="保存ビューの選択"  style="width:90%;" >}}

保存ビューにスターを付けて、お気に入りに指定することができます。スターの付いた保存ビューは、メインナビゲーションメニューから直接選択できます。

{{< img src="logs/explorer/saved_views/saved_view_load.mp4" alt="保存ビューのロード" video="true"  >}}

### 保存ビューの共有

保存ビューのショートリンクをコピーして貼り付けることで、チームメイトと共有できます。

{{< img src="logs/explorer/saved_views/saved_view_share.png" alt="保存ビューの選択"  style="width:30%;" >}}

### 保存ビューの管理

保存ビューを新しく作成するには、画面の最上部にある *Save as* ボタンをクリックします。名前を入力し、*Save* をクリックしてください。

保存ビューをロードして編集し、"Save As" ボタンを使用して更新すれば、クエリやページレイアウト構成への変更を、必要に応じて記録することができます。

{{< img src="logs/explorer/saved_views/saved_view_create-delete.mp4" video="true" alt="保存ビューの作成"  style="width:90%;" >}}

保存ビューはログエクスプローラーの保存ビューリストから直接削除できます。保存ビューの名前の上にマウスを合わせると **delete** ボタンが表示されます。このボタンと確認をクリックしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search
[2]: /ja/logs/explorer/facets
[3]: /ja/logs/explorer/?tab=logstream#visualization
[4]: /ja/logs/explorer/patterns
[5]: /ja/logs/explorer/analytics
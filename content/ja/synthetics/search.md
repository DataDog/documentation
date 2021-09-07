---
title: Synthetic テストの検索と管理
kind: ドキュメント
description: Synthetic テストを検索および管理します。
further_reading:
  - link: /getting_started/synthetics/
    tag: Documentation
    text: Synthetic モニタリングの概要
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: ブログ
    text: エンドツーエンドテスト作成のベストプラクティス
  - link: 'https://www.datadoghq.com/blog/test-maintenance-best-practices/'
    tag: ブログ
    text: エンドツーエンドテスト維持のベストプラクティス
  - link: /synthetics/guide/
    tag: Documentation
    text: Synthetic モニタリングガイド
---
## 概要

[Synthetic Tests ページ][1]を使用すると、1 つのページですべてのテストを検索、アクセス、管理できます。ファセットを使用して重要なテストをすばやく見つけ、グローバルなアップタイムと応答時間のグラフを使用してアプリケーションの状態の概要を取得し、一括機能を通じてテストを管理します。

{{< img src="synthetics/search/search.png" alt="Synthetic テスト検索" >}}

## 検索

### ファセットとタグ

ページの左側にある **Synthetics Filters** パネルには、テストの検索に使用できるいくつかのデフォルトファセットが一覧表示されます。デフォルトのファセットは次のとおりです。

| ファセット          | 説明                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | Synthetic テストのタイプ: `browser`、`api`、`api-ssl`、`api-tcp`、`api-dns` |
| `Status`       | Synthetic テストのステータス: `OK`、`Alert`、`No Data`                           |
| `Creator`      | Synthetic テストの作成者                                             |
| `Region`       | Synthetic テストが実行されている (管理およびプライベート) ロケーション        |
| `State`        | Synthetic テストの状態: `live`、`paused`                             |
| `Notification` | 通知の Synthetic テストで使用されるハンドル                       |
| `Env`          | Synthetic テストが実行されている環境                              |
| `Tag`          | Synthetic テストに割り当てられたタグ                                        |

### クエリを作成する

左側のパネルのファセットをクリックするか、検索バーを使用して独自のカスタムクエリを入力して、Synthetic テストを検索します。パネルまたは検索バーでファセット値を選択または選択解除すると、検索バーは同等のクエリで自動的に更新されます。同様に、検索バーのクエリを変更すると (または最初からクエリを書き込むと)、ファセットのチェックボックスが更新され、その変更が反映されます。クエリを編集すると、クエリ結果がリアルタイムで更新されます。クリックする「検索」ボタンはありません。

* **フリーテキストで検索**: テキストを検索バーに入力して、テスト名で検索します。
* **単一のファセットで検索**: ファセット値をクリックして、そのファセット値のみを含む検索クエリを作成します。たとえば、`type:api` です。同じファセットの別の値を検索に追加するには、他の値のチェックボックスをクリックするか、`OR` ブール演算子を使用して他の値を追加し、値を引用符と括弧で囲みます。たとえば、`type:("api" OR "api-ssl")` です。
* **複数のファセットとテキストで検索**: 異なるファセットの値をクリックして、複数のファセットのフィルタリングを含む検索クエリを作成します。たとえば、`type:api``region:aws:us-east-2` です。ファセットとテキストを混在させることもできます。たとえば、`checkout type:browser` です。非表示ですが、複数の用語を検索する場合は `AND` ブール演算子が適用されます。
* **ファセットまたはテキストを除外する**: 既存の入力済みチェックボックスをクリックしてファセット値の選択を解除するか、用語の前に `-` を付けて検索クエリから除外します。例: `-state:paused`
* **カスタムマッチを実行する**: ワイルドカード (`*`) を使用します。たとえば、`valid*` です。

ブラウザテストのみを検索する場合は、左側のパネルの **Browser Test** をクリックします。タイプに関係なく、すべてのテストを再度選択するには、もう一度クリックします。

{{< img src="synthetics/search/facet-search.gif" alt="ファセット検索" >}}

## テストの管理

### 一括管理

テーブルの複数の個別のテストチェックボックスをクリックするか、`State` の横のチェックボックスをクリックしてページのすべてのテストチェックボックスを選択することにより、リストページから Synthetic テストを一括管理します。
選択したら、`Run Tests Now` または `Delete` を選択します。これにより、選択したすべての Synthetic テストが一括で実行または削除されます。

{{< img src="synthetics/search/bulk-edit.png" alt="一括編集" >}}

### アクショントレイオプション

テーブルのテストにカーソルを合わせて、`Pause`、`Run Test Now`、`Edit`、`Clone`、`Delete` などのオプションを入力します。オプション `Edit Recording` は、ブラウザテストにも使用できます。

{{< img src="synthetics/search/action_tray.mp4" alt="アクショントレイオプション" video="true" width="100%">}}

### 監査イベント

Synthetic テスト、グローバル変数、プライベートロケーションの作成、追加、削除により、[イベントストリーム][2]にイベントが作成されます。生成されたイベントには変更の説明と、変更を実行したユーザーが表示されます。

イベントストリームで `#audit synthetics` を検索して、Synthetic モニタリングに関連するすべての変更を見つけます。テストの ID を検索して、特定のテストで行われた変更を取得します。たとえば、`tags:public_id:4m7-bqy-mxq` です。

{{< img src="synthetics/search/audit_events.png" alt="Synthetic モニタリング監査イベント" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /ja/events/
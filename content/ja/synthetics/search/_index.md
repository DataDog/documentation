---
description: Synthetic テストを検索・管理する方法を説明します。
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト維持のベストプラクティス
- link: /synthetics/search/saved_views
  tag: ドキュメント
  text: 保存ビューについて
- link: /continuous_testing/explorer
  tag: ドキュメント
  text: Synthetic Monitoring &amp; Continuous Testing Explorer について
- link: /service_management/events/explorer
  tag: ドキュメント
  text: イベントエクスプローラーについて
title: Synthetic テストの検索と管理
---

## 概要

[Synthetic Tests ページ][1]では、すべてのテストへのアクセス、[検索](#search-for-tests)、[管理](#manage-tests)が可能です。

{{< img src="synthetics/search/synthetic_tests_page.png" alt="Synthetic Monitoring Tests ページ" style="width:100%" >}}

[ファセット](#facets-and-tags)を使うことで、以下のアクションを実現できます。

- 特定の Synthetic テストを検索する
- すべての CI/CD ジョブの実行を調査して、失敗したテスト実行を特定してトラブルシューティングします
- CI/CD パイプラインでのテストの進行状況を追跡します
- 修正する不安定なテストを特定します
- 一括アクションでテストを管理する
- Synthetic Monitoring の構成に対する変更を追跡するためのイベントを監視する

## テストを検索する

### ファセットとタグ

左側の **Synthetics Filters** パネルには、テストの検索に使用できるデフォルトのファセットが表示されます。

デフォルトのファセットは以下の通りです。

| ファセット          | 説明                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `Type`         | Synthetic テストの種類: `browser`、`api`、`api-multi`、`api-websocket`、`api-ssl`、`api-dns`、`api-tcp`、`api-udp`、`api-icmp`、または `api-grpc` |
| `Status`       | Synthetic テストのステータス: `OK`、`Alert`、または `No Data`                       |
| `Creator`      | Synthetic テストの作成者                                            |
| `Region`       | Synthetic テストが実行されている管理およびプライベートロケーション         |
| `State`        | Synthetic テストの状態: `live` または `paused`                          |
| `Notification` | 通知の Synthetic テストで使用されるハンドル                      |
| `Env`          | Synthetic テストが実行されている環境                             |
| `CI/CD Execution Rule` | テスト実行のステータス: `Blocking`、`Non-blocking`、または `Skipped` |

**Synthetic Filters** の下にある **Tags** パネルには、テストを識別するために使用できるデフォルトのタグがいくつか表示されます。

デフォルトのタグは以下の通りです。

| タグ          | 説明                                                                     |
|----------------|-------------------------------------------------------------------------------|
| `Team`         | Synthetic テストへの対応を担当するチーム                    |
| `Tag`          | Synthetic テストに割り当てられたタグ                                       |
| `Service`      | Synthetic テストが実行されているサービス                                 |
| `Private Locations`| プライベートロケーションを有効にするかどうか: `true` または `false`          |

詳しくは、[タグの使用方法][4]をご覧ください。

### 検索クエリを作成する

左側のファセットをクリックするか、検索バーで独自のカスタムクエリを記述して、テストを検索します。クエリを編集すると、検索結果がリアルタイムで更新されます。

ファセットの選択・解除を行うと、検索バーにも自動的に変更が反映されます。同様に、検索バーのクエリを変更したり、検索バーに一からクエリを書いて、左側のファセットの選択と非選択を行うことも可能です。

* **フリーテキストで検索**: テキストを検索バーに入力して、テスト名で検索します。
* **単一のファセットで検索**: ファセット値をクリックして、そのファセット値のみを含む検索クエリを作成します。たとえば、`type:api` です。同じファセットの別の値を検索に追加するには、追加の値のチェックボックスをクリックします。また、`OR` ブール演算子を使用して追加の値を追加し、値を引用符と括弧で囲むこともできます。たとえば、`type:("api" OR "api-ssl")` です。
* **複数のファセットとテキストで検索**: 異なるファセットタイプからファセットの値をクリックして、複数のファセットをフィルタリングする検索クエリをカスタマイズします。たとえば、`type:api region:aws:us-east-2` です。ファセットとテキストを混在させることもできます。たとえば、`checkout type:browser` です。非表示ですが、複数の用語を検索する場合は `AND` ブール演算子が適用されます。
* **メッセージで検索**: [テストモニター][5]で構成されたテストの通知メッセージにフィルターをかける検索クエリを作成するために、メッセージを追加してください。例えば、`message:testcontent` とします。
* **ファセットまたはテキストを除外する**: 既に入力済みチェックボックスをクリックしてファセット値の選択を解除するか、用語の前に `-` を付けて検索クエリから除外します。例: `-state:paused`
* **カスタムマッチを実行する**: ワイルドカード (`*`) を使用します。たとえば、`valid*` です。

Synthetics テストの種類を検索するには、**Type** ファセットでテストの種類を選択します。

{{< img src="synthetics/search/facet_search.mp4" alt="Tests ページでファセットを使ってテストを検索する" video=true >}}

## テストの管理

### 一括アクション

[Synthetic Tests ページ][1]で 1 つまたは複数のテストを選択し、**Edit Tags**、**Run Tests Now**、**Delete** をクリックして、Synthetic テストを一括で管理します。

{{< img src="synthetics/search/edit_tags.mp4" alt="Synthetic テストの一括タグ編集" video=true >}}

### テストアクション

テストにカーソルを合わせると、右側に `Pause`、`Run Test Now`、`Edit`、`Clone`、`Delete` などのオプションアイコンが表示されます。ブラウザテストでは、`Edit Recording` オプションを使用することができます。

{{< img src="synthetics/search/manage_test_options.mp4" alt="Synthetic テストにカーソルを合わせると表示されるアクショントレイオプション" video="true" width="100%">}}

### イベントの追跡

Synthetic テスト、グローバル変数、プライベートロケーションを作成、追加、削除すると、[イベントエクスプローラー][6]にイベントが発生します。イベントには、発生した変更が記述され、その変更を行ったユーザーが表示されます。

{{< img src="synthetics/search/synthetic_events.png" alt="イベントエクスプローラーの Synthetic テストアラート" style="width:100%" >}}

テストモニターのアラートを検索バーで検索するか、**Event** テンプレート変数でイベントの種類を選択して、Synthetic 関連のすべての変更を検索します。例えば、`Event Type:synthetics_alert` です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/list
[2]: /ja/synthetics/metrics/
[3]: /ja/synthetics/dashboards/
[4]: /ja/getting_started/tagging/using_tags/#synthetics
[5]: /ja/synthetics/guide/synthetic-test-monitors/
[6]: https://app.datadoghq.com/event/explorer
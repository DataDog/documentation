---
title: Search Monitors
description: "Filter the monitor list by using the faceted search"
---

モニターを検索するには、画面左側のファセットパネルまたは上部の検索バー、あるいはその両方を使用してクエリを作成します。属性を選択すると、それに応じて検索バーのクエリが更新されます。同様に、検索バーのクエリを変更する (またはクエリを新規作成する) と、属性チェックボックスが更新されて変更内容が反映されます。いずれの場合も、クエリを編集するとその結果がリアルタイムで更新されます。**注**: クリックが可能な*検索*ボタンはありません。

## 検索バー

Use simple text to search across all monitor titles and notification messages. For example, a search of `*postgresql*` returns all monitors with `postgresql` anywhere in the title or
notification message.

フィールド名を指定することで、検索結果の絞り込みが可能です。

| 項目    | 説明                                            | 例        |
|---------|--------------------------------------------------------|----------------|
| タイトル   | モニターのタイトルに含まれる文言を検索します。                | `title:text`   |
| メッセージ | モニターの通知メッセージに含まれる文言を検索します。 | `message:text` |

また、`1234567` などの ID を利用してモニターを検索することも可能です。モニターの ID は[モニターステータスページ][1]で確認できます。

<div class="alert alert-info">モニターグループをフィルターする方法については、<a href="/monitors/manage/status/">モニターステータスページ</a>を参照してください。</div>

### クエリ

Enhance your search query with boolean operators (`AND`, `OR`, `NOT`) and parentheses. The search syntax is similar to [Elasticsearch][2] with the following exceptions:

* 正規表現はサポートされていません。
* Both single-character wildcard (`?`) and the general wildcard (`*`) are supported.
* 近接検索はサポートされていませんが、[ファジー][3]演算子はサポート対象です。
* 範囲探索はサポートされていません。
* ブースティングはサポートされていません。

また、`-`、`(`、`)`、`"`、`~`、`*`、`:`、`.`、およびスペースは予約済みです。これらの文字を含むモニターフィールドを検索する際は、`status:Alert AND "chef-client"` のように対象のフィールド文字列を引用符で囲むようにしてください。

引用符で囲まれたフィールドには注意事項があります。

* `metric:system.cpu.idle` などのように、フィールド名でよく見かける `.` は使用可能です。引用符の有無は問いません。
* 引用符で囲まれたワイルドカード検索は使用できません。たとえば、`"chef-client*"` などの構文では `*` が文字として扱われるため、`"chef-client failing"` というタイトルのモニターを検索することはできません。

## 属性

高度な検索を使用すると、以下のモニター属性を組み合わせて対象を絞り込むことができます。

| 属性    | 説明                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| ステータス       | モニターのステータス: `Triggered` (`Alert`、`Warn`、`No Data`) または `OK`                            |
| ミュート        | モニターのミュート状態: `true` または `false`                                               |
| タイプ         | Datadog の[モニター種類][4]                                                                   |
| Creator      | モニターの作成者                                                                      |
| サービス      | `service:<VALUE>` の形式で使用されるサービスタグ                                         |
| タグ          | The [tags][5] assigned to the monitor                                               |
| Env          | `env:<VALUE>` の形式で使用される環境タグ                                         |
| スコープ        | モニタークエリの `from` フィールド一覧に含まれる検索タグ                                   |
| メトリクス/チェック | 監視対象のメトリクスまたはサービスチェック                                                     |
| 通知 | 通知を受け取る人またはサービス                                                  |
| ミュートの残り   | ダウンタイムによってこのモニターの通知のミュートが停止するまでの残り時間。`muted_left:30m` を検索すると、最大 30 分間ミュートされたままのすべてのモニターが返されます。サポートされる単位は、秒 (`s`)、分 (`m`)、時間 (`h`)、週 (`w`) です。    |
| ミュートの経過 | ダウンタイムによってこのモニターの通知のミュートが開始してからの経過時間。`muted_elapsed:30d` を検索すると、少なくとも 30 日間ミュートされたすべてのモニターが返されます。サポートされる単位は、秒 (`s`)、分 (`m`)、時間 (`h`)、週 (`w`) です。 |

モニターの検索に必要な数だけボックスをチェックできます。以下の規則が適用されますのでご確認ください。

* `AND` 演算子は、`status:Alert type:Metric` など、異なるフィールドから属性をチェックする場合に適用されます (2 つの検索ワードの間に演算子がない場合は自動で `AND` と判断されます) 。
* `OR` 演算子はほとんどの場合、`status:(Alert OR Warn)` など 同じフィールド内の属性をチェックする場合に用いられます。ただし、複数のスコープやサービスタグをチェックする場合は例外として `AND` 演算子を使用します。
* 一部の属性では複数の値を選択できません。たとえば、メトリクスやサービスチェックを選択すると、選択を解除するまでその他のオプションはリストに表示されなくなります。
* *Status* 属性の `Triggered` チェックボックスは `status:(Alert OR Warn OR "No Data")` を解決するためのものです。Triggered は有効なモニターのステータスではありません。
* *メトリクス/チェック*属性の名称は、クエリ内では常に `metric` と表示されます。たとえば、チェック `http.can_connect` を選択すると、`metric:http.can_connect` がクエリに追加されます。

**Note**: For attributes with a large number of values across your monitors, use the attribute search bar to find the correct value.

## 保存ビュー

保存したビューを活用して、事前に設定されたビューにすばやく移動し、チームのモニターや 60 日以上ミュートされたモニターなどの特定のコンテキストに関連するモニターを見つけます。

{{< img src="monitors/manage_monitor/overview.jpg" alt="保存ビューの選択" style="width:90%;" >}}

Saved views are visible by everyone in your organization.
Technically, a saved view keeps track of:

- 検索クエリ

### デフォルトのビュー

{{< img src="monitors/manage_monitor/default.jpg" alt="デフォルトビュー" style="width:50%;" >}}

既存の Manage Monitor ビューがデフォルトの保存ビューになります。この構成は、ユーザー本人のみがアクセスし表示できます。この構成を更新しても、組織には何の影響もありません。

You can **temporarily** override your default saved view by completing any action in the UI or when opening links to the Manage Monitor page that embed a different configuration.

Views パネルのデフォルト保存ビューエントリからは、以下のアクションが可能です。

* エントリをクリックして、デフォルトビューを**リロード**。
* 現在のパラメーターでデフォルトビューを**更新**。
* デフォルトビューを Datadog のデフォルトに**リセット**して再起動。

[1]: /monitors/manage/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /monitors/
[5]: /monitors/manage/#monitor-tags
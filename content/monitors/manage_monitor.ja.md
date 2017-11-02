---
title: 設定済みのMonitorの管理
kind: documentation
autotocdepth: 2
customnav: monitornav
---

<!--
## Managing Monitors

The [Manage Monitors](https://app.datadoghq.com/monitors/manage) page lets you run an advanced search of all monitors so you can delete, mute, resolve, or edit service tags for selected monitors in bulk. You can also clone or fully edit any individual monitor in the search results.
-->
## 設定済みのMonitorの管理

[Manage Monitors](https://app.datadoghq.com/monitors/manage) ページではすべての設定済みのMonitorを詳細検索することで、Monitorの削除やミュート、解決済みのマーク、あるいはサービスタグの編集などを、一括で実行することができます。検索した個々のMonitorは、クローンしたり、編集することも可能です。

<!--
### Find the Monitors

Advanced search lets you query monitors by any combination of monitor attributes:

* `title` and `message` — text search
* `status` — Alert, Warn, No Data, Ok
* `scope` — e.g. *, role:master-db
* `type` — metric, integration, apm, etc
* `muted`
* `creator`
* `id`
* `service` — tags
* `team` — tags
* `env` — tags
* `notification` — the monitor's notification target, e.g. you@example.com, slack-ops-oncall
* `metric` — the metric _or_ service check monitored, e.g. system.cpu.user, http.can_connect

To run a search, construct your query using the checkboxes on the left and/or the search bar along the top. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query; there's no 'Search' button to click.
-->
### Monitorを検索する

Monitorの詳細検索では、あらゆるMonitorの属性を組み合わせてクエリすることができます:

* `title` と `message` — Monitorのタイトルと通知本文の検索、テキスト検索で使用
* `status` — Alert, Warn, No Data, Ok, Muted
* `type` — metric, integration, apm, など
* `creator` - Monitorの作成者
* `service` — サービスタグ
* `scope` — 例えば、 *、あるいは role:master-db
* `id` - Monitor ID
* `team` — タグ
* `env` — タグ
* `metric` — メトリクス _または_ サービスチェック、例えば、 system.cpu.user, http.can_connect
* `notification` — Monitorで設定した通知先のターゲット、例えば、you@example.com, slack-ops-oncall

Monitorの検索を実行するには、画面左側のチェックボックスおよび/あるいは画面上部の検索バーを使用してクエリを指定します。チェックボックスを使用すると、検索バーにも同等のクエリが表示されます。同じように、検索バーのクエリを変更したり一から指定したりすると、チェックボックスの内容も変更が反映されます。いずれの場合でも、クエリの結果はリアルタイムで更新されるので、クリックするための検索ボタンはありません。

<!--
#### Check the boxes

When you don't need to search monitor titles and bodies for specific text, your search is a quick click or two away. Check as many boxes as you need to find your desired monitors, keeping the following in mind:

* Checking attributes from different fields will AND the values, e.g. `status:Alert type:Metric` (the lack of an operator between the two search terms implies AND)
* Checking attributes within the same field will often OR the values, e.g. `status:(Alert OR Warn)`, but there are some exceptions. For example, checking multiple scopes or service tags ANDs them.
* Some fields do not allow you to select multiple values, e.g. when you tick a metric or service check, the other metrics/checks disappear from the list until you untick your selection.
* The Triggered checkbox under the Status field means `status:(Alert OR Warn OR "No Data")`, not `status:Triggered`. Triggered is not a valid monitor status.
* The Muted checkbox appears under the Status field, but Muted is actually its own field; checking it adds `muted:true` to your query, not `status:muted`.
* The Metric/Check field is always called `metric` in the query, e.g. selecting the check `http.can_connect` adds `metric:http.can_connect` to your query.

For fields that have an arbitrary (i.e. large) number of values across all monitors—Service tag, Scope, Metric/Check, Notification—use the field-specific search bars to find the value you're looking for.

When you need to run a more complex search than the checkboxes allow, use the search bar to edit your query or write a new one.
-->
#### Monitorをチェックボックスから検索する

Monitorのタイトルや通知本文を使って検索する必要がないのであれば、Monitorの検索はわずか1-2回程度のクリックをするだけです。 以下の要点を考慮したうえで、検索に必要なだけチェックボックスを選択して下さい:

* 異なるフィールドの属性をチェックした場合は、それらはAND条件として処理されます、例えば、`status:Alert type:Metric` (2つの検索条件の間に演算子は記載されていませんが、これはAND条件を意味します)
* 同じフィールド内で属性をチェックした場合は、それらはOR条件として処理されます、例えば、`status:(Alert OR Warn)`、しかし、これにはいくつか例外もあります。例えば`scope`や`service`タグを複数選択した場合はAND条件で処理されます。
* いくつかのフィールドでは複数の値を選択することが許可されていません、例えば、メトリクス/サービスチェックについて選択した場合は、他のメトリクス/サービスチェックは選択中のチェックを外さない限りリストには現れません。
* Statusフィールド直下のTriggeredチェックボックスは `status:(Alert OR Warn OR "No Data")` を意味し、 `status:Triggered` を意味するわけではありません。これは、Triggered がMonitorステータスの有効な値ではないためです。
* Statusフィールドには Mutedチェックボックスがありますが、Mutedは実際は独立したフィールドを持つものです。これをチェックすると、検索クエリとしては`muted:true` が加えられます。`status:muted` ではありません。
* Metric/Checkのフィールドは検索クエリとしては常に`metric` と記述されます。例えば、`http.can_connect` チェックを追加すると、`metric:http.can_connect` が検索クエリに記述されます。

いずれのフィールド(Service tag, Scope, Metric/Check, Notification)においても、すべてのMonitorを通して膨大な数の値がある場合はフィールドごとに配置されている検索バーで使用したい値を検索します。

チェックボックスでできることよりも複雑な検索の実行が必要な場合は、画面上部の検索バーにてクエリを指定して下さい。

<!--
#### Write a query

The most common reason to write a query is to search for specific text across all monitor titles and message bodies. A simple search of `postgresql` will return all monitors with `postgresql` anywhere in the title or message body. To search on title or message body, but not both, qualify the search term with the field name, e.g. `title:postgresql`.

Otherwise, you can use boolean operators (AND, OR, and NOT) and parentheses to write complex queries using any monitor fields. The search syntax is very similar to that of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax), so it's easiest to describe how it is *not* like Elasticsearch syntax:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is
* Proximity searches are not supported, but the [fuzzy](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness) operator is
* Ranges are not supported
* Boosting is not supported

Finally, The following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search monitor fields that include any of them, wrap the field string in quotes: `status:Alert AND "chef-client"` is a valid query string; `status:Alert AND chef-client` is not.

There are a few caveats regarding quoted fields:

* You may use `.` with or without surrounding quotes, as it commonly appears in some fields: `metric:system.cpu.idle` is valid.
* You may NOT use wildcard search inside quoted strings: `"chef-client*"`, while valid syntactically, won't return a monitor titled `"chef-client failing"` because the `*` is treated literally.
-->
#### Monitorの検索クエリを利用する

検索バーで個別にクエリを記述する最も一般的な理由は、すべてのMonitorのタイトルと通知本文に対して特定のテキストを検索したい場合です。シンプルに `postgresql` と単語で検索した場合は、タイトルか通知本文のいずれかに `postgresql` を含むすべてのMonitorが返されます。タイトルか通知本文について検索したいが両方ではない場合、いずれかのフィールドを指定して `title:postgresql` というように検索ができます。

あるいは、Boolean演算子 (AND, OR, そして NOT) とカッコを使用して、Monitorのあらゆるフィールドに対する複雑なクエリを記述します。検索クエリの構文は [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax) のそれと非常によく似ています。このため、Elasticserchの構文がどんなもの *ではない* のかを説明するのが最も簡単でしょう:

* 正規表現はサポートされていません。
* 1字のワイルドカード (`?`) はサポートされていませんが、一般的なワイルドカードである (`*`) はサポートされています。
* 近接検索はサポートされていませんが、 [fuzzy](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness) 演算子についてはサポートされています。
* Ranges はサポートされていません。
* Boosting はサポートされていません。

最後に、下記の文字: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, そして空白は予約されています。これらの文字を含むMonitorフィールドを検索するには、フィールドの文字列を引用符で囲います。`status:Alert AND "chef-client"` は有効なクエリ文字列ですが、`status:Alert AND chef-client` は有効ではありません。

フィールドの文字列を囲う際にいくつかの注意点があります:

* ドット `.` は既に有効な `metric:system.cpu.idle` などのフィールドで一般的に使用されているので、引用符で囲っても囲わなくても構いません。
* 引用符で囲われたクエリ文字列中にワイルドカードを使用することはできません: `"chef-client*"` は有効な構文ではあるものの、`*` が文字通りに扱われるため、`"chef-client failing"` のようなタイトルのMonitorを返すことはありません。

<!--
### Manage chosen Monitors

When you have found the monitors you were looking for, select one or more that you wish you update using the checkboxes next to each result. You can select all results by ticking the topmost checkbox next to the STATUS column heading. Modify the monitors in bulk using the buttons at the top right of the search results: Mute, Resolve, Delete, and Edit Service Tags.



To edit an individual monitor, hover over it and use the buttons to the far right in its row: Edit, Clone, Mute, Delete. To see more detail on a monitor, click its Name to visit its status page.


-->
### 選択したMonitorを設定変更する

探していたMonitorが得られたあとは、検索結果の各Monitor横にあるチェックボックスを使用して編集したいMonitorを1つ以上選択します。STATUS列 見出しの横にある一番上のチェックボックスを選択すると、すべての検索結果を選択できます。検索結果の右上にあるボタン（Mute, Resolve, Delete そして Edit Tags）を使用して、一括してMonitorを変更します。

{{< img src="monitors/manage_monitor/manage-monitors-mute.png" alt="manage-monitors-mute" responsive="true">}}

個々のMonitorを編集するには、編集したいMonitorにマウスオーバーし、その行の右端にあるボタン (Edit, Clone, Mute, Delete)　を使用します。Monitorの詳細を表示するには、そのタイトルをクリックしてステータスページにアクセスします。

{{< img src="monitors/manage_monitors/manage-monitors-hover-clone.png" alt="manage-monitors-hover-clone" responsive="true" >}}

<!--
## Manage Triggered Monitors with group-level granularity

You can mute or resolve triggered monitors in bulk using the [Triggered Monitors page](https://app.datadoghq.com/monitors/triggered). It's similar to the [Manage Monitors page](#managing-monitors)—you can find monitors by their attributes using the same easy tickboxes or query syntax—but there are a few differences. Aside from only showing monitors with a triggered status (Alert, Warn, or No Data), the main difference is that the Triggered Monitors page shows a row for _each group_ (i.e. each reporting source) of each monitor.

Say you have a monitor called "high latency" that is grouped by host. If there are 20 hosts reporting and 14 have a triggered status, the Triggered Monitor page will show 14 rows if you search for the monitor by title in the query search bar (e.g. `high latency` or `title:
"high latency"`). This lets you easily mute or resolve a monitor for some reporting sources, but not all (though of course you can mute or resolve all, too).

In writing your search queries, you can use all the same fields available on the Manage Monitors page, even though most of them aren't controllable via tickboxes on the Triggered Monitors page. A few notes on field differences on the Triggered Monitors page:

* It uses the `group_status` field instead of `status`.
* It adds the `triggered` field, which lets you filter monitors by how long they've been triggered.
* It also adds the `group` field, which helps you narrow down search results for monitors grouped by more than one thing. Say you have a monitor grouped by `host` and `env`. You search for this monitor by title and get four rows, where the groups are `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, and `host:web02,env:prod`. Use the `group` field to only show, for example, prod hosts (`group:"env:prod"`) or web02 hosts (`group:"host:web02"`).
-->
## トリガされたMonitorをグループ単位で操作する

トリガされたMonitorを一括でミュートや解決済みとマークするには [Triggered Monitors ページ](https://app.datadoghq.com/monitors/triggered)を使用します。これは[Manage Monitors ページ](#managing-monitors)とよく似ているので、同じようにMonitorの属性のチェックボックスをやクエリ構文を使用して簡単にMonitorを探すことができますが、いくつか違いがあります。Monitorをトリガの状態(Alert, Warn, または No Data)と表示するだけでなく、Triggered Monitorsページには各Monitorの _各グループ_ （各アラート元）の行が表示されるというのが大きな違いです。

例えば、サーバーホストによってグループ化された "high latency" というMonitorがあるとします。ホストが20台あり、14台がトリガ状態の場合、検索バーでMonitorのタイトルで検索した場合、Triggered Monitorページには14行が表示されます（例、`high latency` または `title:"high latency"`）。これにより、一部のアラート元でMonitorを簡単にミュートまたは解決済みとマークすることができます（もちろん、すべてをミュートまたは解決することもできます）

検索クエリを記述する場合、Manage Monitors ページで使用可能なすべてのフィールドを使用できますが、そのほとんどはトリガされたモニタページのチェックボックスで制御できません。 Triggered Monitorsページのフィールドとの違いに関するいくつかの注意があります：

* `status` フィールドの代わりに `group_status` が使用されます。
* `triggered` フィールドが追加されています。これにより、トリガされてからの時間によってMonitorをフィルタすることができます。
* また、 `group` フィールドも追加されています。これは、複数のグループにまたがったMonitorの検索結果を絞り込むのに役立ちます。例えば、Monitorが `host` と `env` でグループ化されており、このMonitorをタイトルで検索して4行の結果を得ました。グループが  `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, そして `host:web02,env:prod`となっています。`group` フィールドを使用することで、env:prod のホスト (`group:"env:prod"`) または web02 のホスト  (`group:"host:web02"`) だけを表示できます。
---
last_modified: 2017/02/20
translation_status: complete
language: ja
title: メトリクスとイベントを相関させる方法
kind: guide
listorder: 4
---

<!-- ## Overview
{: .overview}

Event Correlation refers to overlaying events on top of a dashboard graph and is an important feature of the Datadog platform. You can setup correlation at two different times: either when you setup the dashboard or adhoc at the time you view the dashboard. -->

## 概 要
{: .overview}

"イベントの相関"とは、ダッシュボード内のグラフの上にイベントの発生タイミングを上書きすることをいいます。これは、Datadogを使ってインフラの状態の分析する際には非常に強力な機能です。この"イベントの相関"は、次の二つの方法で、実現することができます。

1. ダッシュボードの表示内容を設定する時、相関を設定しておく。
2. ダッシュボードを表示しているときにアドホックに相関を開始する。


<!-- ## Event Correlation at Design Time
{: #designtime}

![Search Box](/static/images/guides-eventcorrelation-screenboard.png)

Setup event correlation at design time by editing any graph on both Time Boards and Screen Boards and adding events to the graph. To learn more about this, visit the [Graphing Primer](/graphing/). You can find details about adding events [using the UI](/graphing/#overlay-events-for-additional-context) or via the JSON interface further down the page. -->

## ダッシュボード設定時の"イベントの相関"の設定
{: #designtime}

![Search Box](/static/images/guides-eventcorrelation-screenboard.png)

タイムボードとスクリーンボードの両方のグラフを編集し、グラフにイベントを追加することで、デザイン時にイベント相関を設定できます。 詳細については、[Graphing Primer]（/ graphing /）を参照してください。 イベントの追加[UIの使用]（追加のコンテキストの/グラフ表示/オーバーレイイベント）、またはページのさらに下のJSONインターフェイスを使用して詳細を確認できます。


<!-- ## Event Correlation at View Time
{: #viewtime}

![Search Box](/static/images/guides-eventcorrelation-searchbox.png)

Setup event correlation at view time by adding a query in the Search box at the top left of any Time Board dashboard window. This will replace any events added at design time, but will apply the events to all graphs on that particular dashboard. -->

## ダッシュボードを表示している時のアドホックな"イベントの相関"
{: #viewtime}

![Search Box](/static/images/guides-eventcorrelation-searchbox.png)

任意のタイムボードダッシュボードウィンドウの左上にある[検索]ボックスにクエリを追加することにより、ビュー時にイベント相関を設定します。 これにより、設計時に追加されたすべてのイベントが置き換えられますが、その特定のダッシュボード上のすべてのグラフにイベントが適用されます。


<!-- ## Event Query Language
{: #eql}

You can narrow down your search by filtering on certain event properties. See the list of filters below for more details. Please note that filters perform an exact match search and will not work with partial strings.


| Filter | Description |
|--------|-------------|
|user:pup@datadoghq.com|Find all events with comments by pup@datadoghq.com.|
|sources:github,chef|Show events from Github OR Chef.|
|tags:env-prod OR db|Show events tagged with #env-prod OR #db.|
|tags:security-group:sg-123 AND role:common-node|Show events tagged with #security-group:sg-123 AND #role:common-node.|
|hosts:i-0ade23e6,db.myapp.com|Show events from i-0ade23e6 OR db.myapp.com.|
|status:error|Show events with error status. (supports: 'error', 'warning', 'success')|
|priority:low|Show only low-priority events. (supports: 'low' or 'normal'. defaults to 'all')|
|incident:claimed|Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')|
{:.table} -->

## "イベントの相関"をする際のクエリの書き方
{: #eql}

特定のイベントプロパティをフィルタリングすることで検索範囲を絞り込むことができます。 詳細については、下のフィルタのリストを参照してください。 フィルタは完全一致検索を実行し、部分文字列では機能しません。


| Filter | Description |
|--------|-------------|
|user:pup@datadoghq.com|Find all events with comments by pup@datadoghq.com.|
|sources:github,chef|Show events from Github OR Chef.|
|tags:env-prod OR db|Show events tagged with #env-prod OR #db.|
|tags:security-group:sg-123 AND role:common-node|Show events tagged with #security-group:sg-123 AND #role:common-node.|
|hosts:i-0ade23e6,db.myapp.com|Show events from i-0ade23e6 OR db.myapp.com.|
|status:error|Show events with error status. (supports: 'error', 'warning', 'success')|
|priority:low|Show only low-priority events. (supports: 'low' or 'normal'. defaults to 'all')|
|incident:claimed|Show only claimed incidents. (supports: 'open', 'claimed', 'resolved', or 'all')|
{:.table}


<!-- Full text search works on all keywords provided in the search query after applying any filters. Full text search will look inside the event text, title, tags, users who commented on the event and host names and devices tied to the event for any related information.

You can use full text search to find all events with the same key tags. For example, to show all events with the #service key you would search #service.

In the example below, a full text search is performed to find all open chef or nagios errors that mention one or more redis instances that are currently down.

```sources:nagios,chef status:error redis_* AND down```

Please note that some of the advanced query language features (e.g. boolean logic) work only in the event stream page, and do not work in graph tiles or in screen board widgets.
 -->

フルテキスト検索は、フィルタを適用した後に検索クエリで提供されるすべてのキーワードに対して機能します。 全文検索では、イベントテキスト、タイトル、タグ、イベントにコメントしたユーザー、イベントに関連付けられたホスト名とデバイス、関連する情報が表示されます。

フルテキスト検索を使用して、同じキータグを持つすべてのイベントを見つけることができます。 たとえば、#serviceキーですべてのイベントを表示するには#serviceを検索します。

以下の例では、フルテキスト検索が実行され、現在開いている1つ以上の赤いインスタンスを示す開いているシェフまたはナギオスのエラーをすべて検索します。

ソース：ナギオス、シェフのステータス：error redis_ * AND down

ブール論理などの高度なクエリ言語機能の一部は、イベントストリームページでのみ機能し、グラフタイルやスクリーンボードウィジェットでは機能しないことに注意してください。
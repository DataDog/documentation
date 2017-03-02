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

"イベントの相関"とは、ダッシュボード内のグラフの上にイベントの発生タイミングを上書きすることをいいます。これは、Datadogを使って状況を分析する際には非常に強力な機能です。この"イベントの相関"は、次の二つの方法で、実現することができます。

1. ダッシュボードの表示内容を設定する際に、グラフ設定に相関を設定しておく。
2. ダッシュボードを表示しているときに、検索窓よりアドホックに相関を開始する。


<!-- ## Event Correlation at Design Time
{: #designtime}

![Search Box](/static/images/guides-eventcorrelation-screenboard.png)

Setup event correlation at design time by editing any graph on both Time Boards and Screen Boards and adding events to the graph. To learn more about this, visit the [Graphing Primer](/graphing/). You can find details about adding events [using the UI](/graphing/#overlay-events-for-additional-context) or via the JSON interface further down the page. -->

## ダッシュボード設定時の"イベントの相関"の設定
{: #designtime}

![Search Box](/static/images/guides-eventcorrelation-screenboard.png)

TimeBoard でも ScreenBoard でも、グラフの表示内容を編集する際に"イベントの相関"を設定することができます。詳細については、[グラフ表示入門](/ja/graphing/)を参照してください。UI を使用した"イベントの相関"の設定方法に関しては、先のページの["6) メトリクスのグラフ表示にイベントを重ねあわせる""](ja/graphing/#section-7)を参照してください。JSON インターフェイスを使用して設定する場合は、["JSONを使用したグラフ表示入門"](/ja/graphingjson)ページで詳細を確認してください。


<!-- ## Event Correlation at View Time
{: #viewtime}

![Search Box](/static/images/guides-eventcorrelation-searchbox.png)

Setup event correlation at view time by adding a query in the Search box at the top left of any Time Board dashboard window. This will replace any events added at design time, but will apply the events to all graphs on that particular dashboard. -->

## ダッシュボードを表示している時のアドホックな"イベントの相関"
{: #viewtime}

![Search Box](/static/images/guides-eventcorrelation-searchbox.png)

TimeBoard を表示している場合は、左上の検索ボックスにクエリを入力することで"イベントの相関"を始めることができます。新たにクエリを入力することにより、ダッシュボードを設定した際にグラフ内に設置した"イベントの相関"はリセットされ、新たに入力されたクエリがダッシュボード上の全てのグラフに適用されます。


<!-- ## Event Query Language
{: #eql}

You can narrow down your search by filtering on certain event properties. See the list of filters below for more details. Please note that filters perform an exact match search and will not work with partial strings.
-->

## "イベントの相関"をする際のクエリの書き方
{: #eql}

特定のイベントプロパティを使ってフィルタリングすることでフルテキスト検索にかける結果の範囲を絞り込むことができます。
詳細については、下のリストを参照してください。プロパティによるフィルタには、完全一致が必要です。文字列の一部では機能しません。


<!--
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

| Filter | Description |
|--------|-------------|
|user:pup@datadoghq.com|pup@datadoghq.com がコメントしたイベントを検索し表示します|
|sources:github,chef|Github か Chef のインテグレーションによってポストされたイベントを検索し表示します|
|tags:env-prod OR db|#env-prod か #db のタグの付いたイベントを検索し表示します|
|tags:security-group:sg-123 AND role:common-node|#security-group:sg-123 と #role:common-node のタグ付いたイベントを検索し表示します|
|hosts:i-0ade23e6,db.myapp.com|ホスト i-0ade23e6 か db.myapp.com からのイベントを検索し表示します|
|status:error|ステータスが "error" のイベントを検索し表示します <br/> (supports: 'error', 'warning', 'success')|
|priority:low|プライオリティが "low" のイベントを検索し表示します <br/> (supports: 'low' or 'normal'. defaults to 'all')|
|incident:claimed|インシデントが "claimed" のイベントを検索し表示します <br/> (supports: 'open', 'claimed', 'resolved', or 'all')|
{:.table}


<!-- Full text search works on all keywords provided in the search query after applying any filters. Full text search will look inside the event text, title, tags, users who commented on the event and host names and devices tied to the event for any related information.

You can use full text search to find all events with the same key tags. For example, to show all events with the #service key you would search #service.

In the example below, a full text search is performed to find all open chef or nagios errors that mention one or more redis instances that are currently down.

```sources:nagios,chef status:error redis_* AND down```

Please note that some of the advanced query language features (e.g. boolean logic) work only in the event stream page, and do not work in graph tiles or in screen board widgets.
 -->

先に紹介したフィルターの実施結果に対して、キーワードによるフルテキスト検索が機能します。フルテキスト検索は、イベントテキスト、タイトル、タグ、イベントにコメントしたユーザ、イベントに関連付けられたホスト名とデバイス、そのた関連する情報の対して実行されます。

フルテキスト検索を使用して、同じキータグを持つすべてのイベントを見つけることもできます。 たとえば、#service キーを含んだすべてのイベントを表示するには #service を検索します。

以下の例では、Chef と Nagios のエラーを対象に、フルテキスト検索により、未解決でredisのインスタンス名を含んでいるイベントを検索しています。

```sources:nagios,chef status:error redis_* AND down```

**注:** 尚、ブール理論などの一部の高度なクエリ機能は、イベント ストリームのページでのみ機能し、TimeBoard のグラフ タイルや ScreenBoard のグラフ ウィジェットでは機能しません。
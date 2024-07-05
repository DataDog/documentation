---
aliases:
- /ja/logs/search
description: ログをフィルターして、現在関心のあるログのサブセットに焦点を絞る、拡大する、またはシフトします。
further_reading:
- link: logs/explorer/analytics
  tag: ドキュメント
  text: ログをグループ化する方法
- link: logs/explorer/visualize
  tag: ドキュメント
  text: ログからビジュアライゼーションを作成する
- link: /logs/explorer/export
  tag: ドキュメント
  text: ログエクスプローラーからビューをエクスポートする
title: ログを検索
---

## 概要

個々のログからの情報はリストとして視覚化すると便利ですが、集計することで価値ある情報にアクセスできる場合もあります。この情報にアクセスするには、[ログエクスプローラー][5]でログを検索し、時系列、トップリスト、ツリーマップ、円グラフまたはテーブルとして表示します。

ログエクスプローラーの検索は、時間範囲と検索クエリからなり、`key:value` 検索と全文検索が混在しています。

## 検索クエリ

例えば、過去 15 分間に Web ストアサービスがエラーステータスで生成したログをフィルタリングするには、`service:payment status:error rejected` のようなカスタムクエリを作成し、時間範囲を `Past 15 minutes` に設定します。

{{< img src="logs/explorer/search_filter.png" alt="ログエクスプローラーで、Web ストアサービスの支払い拒否のエラーログをフィルターする検索クエリを作成する" style="width:100%;" >}}

[インデックス化されたログ][1]は、全文検索と `key:value` 検索クエリの両方をサポートします。

**注**: `key:value` クエリでは、事前に[ファセットを宣言][2]する必要が**ありません**。

## オートコンプリート

検索バーのオートコンプリート機能を使用すると、以下を使用してクエリを完成させることができます。
- ログ内の既存のキーと値
- 自分が行った最近の検索 (他のユーザーが行った最近の検索は表示されません)
- 保存済みビュー

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="クエリとして service: が、オートコンプリートオプションとして emailer、balancer-checker、ad-server、vpc が表示されているログ検索バー" style="width:80%;">}}

### ファセットと値のオートコンプリート

検索バーは、検索バーに入力された内容に基づきファセットを自動で提案します。これらのファセットは、[ファセットパネル][5]内での位置と同じ順番で表示されます。ファセットの表示名が定義されている場合は、ドロップダウンメニューの右側に表示されます。ファセットパネルに表示されるように設定されていないファセットは、検索時に自動提案されません。

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="クエリとして `network` が、オートコンプリートのオプションとしてファセット @network.bytes_written、@network.client.ip、@network.interface が表示されているログ検索バー" style="width:80%;">}}

ファセットを選択し、 `:` の文字を入力すると、検索バーが値を自動で提案します。これらの値は、直近の 15 分間でその `facet:value` のペアを含むログの数が多い順に表示されます。その値を含むログの推定数はドロップダウンメニューの右側に表示されます。下の例では、`service` ファセットの自動提案リストの最初に `balance-checker` サービスが表示されており、ログの推定数は `2.66M` で、一番多くなっています。

{{< img src="logs/explorer/search/log_value_autocomplete.png" alt="クエリとして `service:` が、オートコンプリートのオプションとしてbalance-checker、ad-server、fraud-detector、trade-executor の値が表示されているログ検索バー" style="width:80%;">}}

### 最近の検索のオートコンプリート

ログエクスプローラーで行った直近 100 件の検索が保持されます。他のユーザーが行った最近の検索は保持も表示もされません。検索バーは、検索バーに入力された内容に一致する直近の検索 4 件を自動で提案し、最も最近の検索が最初に表示されます。検索バーには、各検索がどのくらい前に実行されたかも表示されます。下の例では、検索バーに `service:web-store status:error` と入力すると、これらの用語を含む直近の検索 4 件が新しい順に表示されており、それぞれの検索で異なるエラーが指定されています。

{{< img src="logs/explorer/search/log_recent_searches.png" alt="クエリとして `service:web-store status:error` が、オートコンプリートのオプションとして Web ストアサービスの異なるエラーを対象とした 4 つの検索が表示されているログ検索バー" style="width:80%;">}}

### 保存ビューのオートコンプリート

ログエクスプローラーでは、保存ビューを作成してクエリと追加のコンテキストを保存し、後から一元的にアクセスすることができます。検索バーは、検索バーに入力された内容と一致する保存ビューを自動で提案します。保存ビューは、保存ビューパネル内での位置と同じ順番で表示され、星付きの保存ビューが最初に表示されます。保存ビューの名前、保存されたクエリ、保存ビューを最後に更新したユーザーのプロファイル写真はドロップダウンメニューに表示されます。保存ビューのクエリが長すぎてドロップダウンに表示できない場合は、カーソルを合わせると、クエリの全文がツールチップに表示されます。プロファイル写真にカーソルを合わせれば、保存ビューを最後に更新したユーザーのメールアドレスもツールチップに表示されます。

{{< img src="logs/explorer/search/log_autocomplete_saved_views.png" alt="クエリとして `service:web-store status:error` が、オートコンプリートのオプションとして Web ストアサービスの異なるエラーを対象とした保存ビューが表示されているログ検索バー " style="width:80%;">}}

## 検索構文

構文のハイライト表示により、キー (例: `@merchant_name` などの属性)、値 (例: 特定のマーチャントの名前)、フリーテキスト (例: `responded 500` などのログメッセージ内のキーワード)、制御文字 (例: 括弧やコロン) などの入力タイプが明確に区別されます。ステータス属性も、`error` はで赤 `info` は青など、それぞれの状態を表す色でハイライト表示されます。

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="クエリとして `service:auth-dotnet status:error 500 (check-token OR create-user)` が表示され、構文が見やすくハイライト表示されているログ検索バー" style="width:100%;">}}

明確なエラー状態は、クエリのどの部分に構文エラーがあり、それをどのように修正すればよいかを知らせます。例えば、
- クエリ `service:` に値がない状態で入力した場合、クエリにカーソルを合わせると "Missing value in key:value pair" というメッセージが表示されます。
- 範囲クエリ用の角括弧を入力したのに、最高値と最低値を入力しなかった場合は、"Expected term but end of input found" というメッセージが表示されます。
- `service:(web-store OR auth-dotnet` のように、ログフィールドに複数の値を入力した後に、括弧を閉じるのを忘れた場合は、`Missing closing parenthesis character` というメッセージが表示されます。

{{< img src="logs/explorer/search/log_error_states.png" alt="クエリとして `service:(web-store OR auth-dotnet` が表示され、`Missing closing parenthesis character`というメッセージが表示されているログ検索バー" style="width:50%;">}}

ログエクスプローラーでログの検索やタイムフレームのカスタマイズを始めるには、[検索構文のドキュメント][3]と[カスタムタイムフレームのドキュメント][4]をお読みください。

## 検索バーのスタイル適用とオートコンプリートを無効にする

検索バーの右側のボタンを切り替えると RAW モードでの検索が可能になり、構文のハイライト表示、検索ピルのスタイル適用、オートコンプリートが無効になります。

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="RAW 検索モードのクエリとして `service:auth-dotnet status:error 500 (check-token OR create-user)` が表示されているログ検索バー" style="width:100%;">}}

検索バーは、マウスでもキーボードコマンドでも操作できます。たとえば、テキストの選択には `CMD-A` を、テキストのコピーには `CMD-C` を、テキストの切り取りには `CMD-X` を、テキストの貼り付けには `CMD-V` を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/indexes
[2]: /ja/logs/explorer/facets/
[3]: /ja/logs/search-syntax
[4]: /ja/dashboards/guide/custom_time_frames
[5]: /ja/logs/explorer/
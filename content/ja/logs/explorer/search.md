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

[Logs Explorer][5] を使用すると、個々のログをリストとして検索・表示できます。ただし、最も価値のあるインサイトはログを大規模に集約することで得られることが多いです。検索機能を使用してログをフィルタリングし、時系列チャート、トップ リスト、ツリー マップ、円グラフ、またはテーブルとして可視化することで、ログ データ全体のトレンド、パターン、外れ値を把握できます。

## 自然言語クエリ

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Natural Language Queries は <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。
</div>
{{% /site-region %}}

<div class="alert alert-info">Logs 用 Natural Language Queries (NLQ) は <strong>Llama を使用して構築されています</strong>。</div>

Natural Language Queries (NLQ) を使用すると、探している内容を平易な英語で記述できます。Datadog がリクエストを自動的に構造化されたログ クエリへ変換するため、複雑な構文を記述せずにログを探索できます。この機能にアクセスするには、検索フィールドの **Ask** をクリックします。

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="Logs Explorer で自然言語クエリを使用して、平易な英語のフレーズでログを検索する方法を示す" video=true >}}

システムは自然言語の入力を Datadog クエリに変換し、サービス、属性、タグ、時間範囲などのコンテキストを理解します。また、関連フィールドを自動的に検出し、「Top 20 services by errors」や「Show errors from service X in the past 24 hours」のような簡単な説明から可視化を作成できます。

NLQ を無効にするには [`org_management` permissions][8] が必要です。[Organization Settings > Preferences][7] に移動し、Natural Language Queries 機能をオフに切り替えてください。

## 検索クエリ

Log Explorer の検索は時間範囲と検索クエリで構成され、`key:value` と [全文検索][6] を組み合わせて使用します。

Web ストア サービスが生成したログのうちステータスが error のものを過去 15 分間でフィルタリングするには、`service:payment status:error rejected` のようなカスタム クエリを作成し、時間範囲を `Past 15 minutes` に設定します。

{{< img src="logs/explorer/search_filter.png" alt="ログエクスプローラーで、Web ストアサービスの支払い拒否のエラーログをフィルターする検索クエリを作成する" style="width:100%;" >}}

[インデックス化されたログ][1]は、[全文検索][6]と `key:value` 検索クエリの両方をサポートします。

**注**: `key:value` クエリでは、事前に[ファセットを宣言][2]する必要が**ありません**。

## オートコンプリート

検索バーのオートコンプリート機能を使用すると、以下を使用してクエリを完成させることができます。
- ログ内の既存のキーと値
- 自分が行った最近の検索 (他のユーザーが行った最近の検索は表示されません)
- 保存ビュー

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="クエリとして service: が、オートコンプリートオプションとして emailer、balancer-checker、ad-server、vpc が表示されているログ検索バー" style="width:80%;">}}

### ファセットと値のオートコンプリート

検索バーは入力内容に基づいてファセットを自動提案します。これらのファセットは [ファセット パネル][5] での配置順と同じ順序で表示されます。ファセットに表示名が定義されている場合、その名前はドロップダウン メニューの右側に表示されます。

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
[6]: /ja/logs/explorer/search_syntax/#full-text-search
[7]: https://app.datadoghq.com/organization-settings/preferences
[8]: /ja/account_management/rbac/permissions/#access-management
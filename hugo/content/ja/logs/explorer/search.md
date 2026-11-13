---
aliases:
- /ja/logs/search
description: ログをフィルタリングして、現在関心のあるログのサブセットに焦点を絞り込んだり、広げたり、切り替えたりできます。
further_reading:
- link: logs/explorer/analytics
  tag: ドキュメント
  text: ログをグループ化する方法
- link: logs/explorer/visualize
  tag: ドキュメント
  text: ログから視覚化を作成する
- link: /logs/explorer/export
  tag: ドキュメント
  text: Log Explorer からビューをエクスポートする
title: ログを検索
---
## 概要 {#overview}

[Log Explorer][1] では、個々のログを検索し、一覧表示することができます。しかし、最も価値のある洞察は、多くの場合、ログの大規模な集計によって得られます。検索機能を使用すると、ログをフィルタリングし、時系列チャート、トップリスト、ツリーマップ、円グラフ、またはテーブルとして視覚化することで、ログデータ全体の傾向、パターン、および外れ値をより深く理解できます。

## 自然言語クエリ {#natural-language-queries}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
自然言語クエリは、この <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。
</div>
{{% /site-region %}}
自然言語クエリ (NLQ) を使用して、探している内容を平易な英語で記述します。Datadog がリクエストを構造化されたログクエリに自動的に変換するため、複雑な構文を記述することなく、簡単にログを調査できます。この機能にアクセスするには、検索フィールドの {{< ui >}}Ask{{< /ui >}} をクリックします。

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="平易な英語のフレーズを使用してログを検索する方法を示す Log Explorer での自然言語クエリ" video=true >}}

システムは、自然言語の入力を Datadog クエリに変換し、サービス、属性、タグ、時間範囲などのコンテキストを理解します。関連するフィールドも自動的に検出されるため、ユーザーは「Top 20 services by errors」や「Show errors from service X in the past 24 hours」のような簡単な説明を使用して視覚化を作成できます。

NLQ を無効にするには、[`org_management` 権限][2]が必要です。[{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}}][3] に移動し、自然言語クエリ機能をオフに切り替えます。

## 検索クエリ {#search-query}

Log Explorer の検索は、時間範囲と検索クエリ (`key:value` と[全文検索][4]の組み合わせ) で構成されます。Log Explorer の右上にある時間範囲セレクターを使用して検索の時間枠を選択できます。カスタム時間範囲の設定の詳細については、[カスタムタイムフレームのドキュメント][5]を参照してください。

過去 15 分間に Web ストアサービスによって生成されたエラーステータスのログをフィルタリングするには、`service:payment status:error rejected` のようなカスタムクエリを作成し、時間範囲を `Past 15 minutes` に設定します。

{{< img src="logs/explorer/search_filter.png" alt="Web ストアサービスに対する拒否された支払いのエラーログをフィルタリングする検索クエリを Log Explorer で作成" style="width:100%;" >}}

[インデックス化されたログ][6]は、[全文検索][4]と `key:value` 検索クエリの両方をサポートしています。

**注**: `key:value` クエリでは、事前に[ファセットを宣言][7]する必要は**ありません**。

クエリ構文の完全なリファレンスについては、[検索構文のドキュメント][8]を参照してください。

## 検索バーの機能 {#search-bar-features}

Log Explorer の検索バーには、クエリをより効率的かつ正確に記述するためのいくつかの機能が含まれています。

### 構文のハイライトとエラー検証 {#syntax-highlighting-and-error-validation}

構文のハイライトにより、キー、値、フリーテキスト、制御文字といった入力タイプが明確に区別されます。たとえば、`service` と `status` はキー、`auth-dotnet` と `error` は値、`500` と `check-token` はフリーテキストであり、括弧は制御文字です。ステータス属性はステータスごとに色分けされています (`error` は赤、`info` は青)。

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="構文のハイライトで色分けされた「service:auth-dotnet status:error 500 (check-token OR create-user)」というクエリが表示された Log Explorer の検索バー" style="width:100%;">}}

エラー検証は、`key:value` のペアの値の欠落、不完全な範囲クエリ、閉じ括弧の不足などの構文エラーを特定し、修正案を提示します。

{{< img src="logs/explorer/search/log_error_states.png" alt="「service:(web-store OR auth-dotnet」というクエリと「Missing closing parenthesis character」というメッセージが表示された Log Explorer の検索バー" style="width:50%;">}}

### オートコンプリート {#autocomplete}

検索バーのオートコンプリート機能は、ログ内の既存のキーと値、最近の検索、保存ビューを使用してクエリを補完するのに役立ちます。

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="「service:」というクエリとオートコンプリートの選択肢として「emailer」、「balancer-checker」、「ad-server」、および「vpc」が表示された Log Explorer の検索バー" style="width:80%;">}}

オートコンプリートは、入力内容に基づいてファセットと値を提案します。これらは[ファセットパネル][7]と同じ順序で表示されます。ファセットを選択して `:` を入力すると、過去 15 分間のログ数が多い順に値が表示されます。

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="「network」というクエリとオートコンプリートの選択肢として「@network.bytes_written」、「@network.client.ip」、「@network.interface」というファセットが表示された Log Explorer の検索バー" style="width:80%;">}}

直近の 100 件の検索が保持され、入力時に提案されます。クエリに一致する保存ビューも提案され、Saved Views パネルと同じ順序で表示されます。

{{< img src="logs/explorer/search/log_recent_searches.png" alt="「service:web-store status:error」というクエリとオートコンプリートの選択肢としてさまざまな Web ストアサービスエラーの最近の検索が表示されたログ検索バー" style="width:80%;">}}


## 検索バーのスタイル設定とオートコンプリートを無効にする {#disable-styling-and-autocomplete-for-search-bar}

検索バーの右側にあるボタンを切り替えると、RAW モードで検索できます。このモードでは、構文のハイライト、検索ピルのスタイル設定、オートコンプリートが無効になります。

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="RAW 検索モードで「service:auth-dotnet status:error 500 (check-token OR create-user)」というクエリが表示されたログ検索バー" style="width:100%;">}}

検索バーは、マウスだけでなく、キーボードコマンドを使用して操作することもできます。たとえば、`CMD-A` を使用してテキストを選択し、`CMD-C` を使用してテキストをコピーし、`CMD-X` を使用してテキストを切り取り、`CMD-V` を使用してテキストを貼り付けます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/
[2]: /ja/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/preferences
[4]: /ja/logs/explorer/search_syntax/#full-text-search
[5]: /ja/dashboards/guide/custom_time_frames
[6]: /ja/logs/indexes
[7]: /ja/logs/explorer/facets/
[8]: /ja/logs/search-syntax
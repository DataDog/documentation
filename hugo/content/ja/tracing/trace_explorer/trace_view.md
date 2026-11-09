---
algolia:
  tags:
  - trace view
aliases:
- /ja/tracing/visualization/trace/
description: フレームグラフ、スパンリスト、ウォーターフォール、および詳細なスパン情報を含むマップを使用して、個々のトレースを視覚化および分析します。
further_reading:
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: ブログ
  text: 'パフォーマンスから影響へ: 有コンテキストを通じてフロントエンドチームをつなぐ'
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレーシングをセットアップする方法
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み取り方を理解する
title: トレースビュー
---
{{< img src="tracing/trace_view/trace_view.png" alt="トレースビュー" style="width:90%;">}}

## 概要 {#overview}

個々の[トレース][1]を表示して、そのすべての[スパン][2]と関連するメタデータを確認します。各トレースは、フレームグラフ、スパンリスト、ウォーターフォール、またはマップとして視覚化できます。

トレースヘッダーには、ルートスパンのサービス名、リソース名、トレース ID、エンドツーエンドのトレース期間、トレース開始時刻などの重要なトレース情報が表示されます。トレースへのパーマリンクを取得するには、[{{< ui >}}Open Full Page{{< /ui >}}] (全画面で開く) をクリックし、URL を保存します。

{{< img src="tracing/trace_view/trace_header.png" alt="トレースヘッダー" style="width:90%;">}}


## トレースの視覚化 {#trace-visualizations}

{{< tabs >}}
{{% tab "フレームグラフ" %}}

{{< img src="tracing/trace_view/flamegraph.png" alt="フレームグラフ" style="width:90%;">}}

フレームグラフはデフォルトの視覚化で、トレース内の色分けされたスパンすべてをタイムライン上に表示します。これはリクエストの実行経路や、トレースのどこに時間が費やされたかを理解するのに便利です。

グラフを操作するには、スクロールしてズームし、クリックしてドラッグして移動し、ミニマップを使用して選択したスパンにズームインしたり、フルトレースにズームアウトしたりします。

凡例では、フレームグラフの色分けに関する詳細を示しています。スパンは、[{{< ui >}}Service{{< /ui >}}] (サービス) (デフォルト)、[{{< ui >}}[Base service][1]{{< /ui >}}] ([基本サービス]) (スパンの送信元のサービス)、[{{< ui >}}Host{{< /ui >}}] (ホスト)、または [{{< ui >}}Container{{< /ui >}}] (コンテナ) でグループ化します。グループごとに、トレース実行時間の割合 ([{{< ui >}}% Exec Time{{< /ui >}}] (実行時間 (%))) またはスパン数 ([{{< ui >}}Spans{{< /ui >}}] (スパン)) のいずれかを選択して表示します。トレース内のスパンにエラーが存在する場合は、[{{< ui >}}Filter Spans{{< /ui >}}] (スパンのフィルター) の下の [{{< ui >}}Errors{{< /ui >}}] (エラー) チェックボックスを選択して、フレームグラフでこれらを強調表示します。

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
[推論サービス][2]からのスパンは、輪郭が破線で表示されます。

[2]: /ja/tracing/services/inferred_services
{{< /site-region >}}

{{< img src="tracing/trace_view/flamegraph_legend.mp4" alt="フレームグラフの凡例" video="true" style="width:90%;">}}

[1]: /ja/tracing/guide/service_overrides#base-service
{{% /tab %}}
{{% tab "スパンリスト" %}}

{{< img src="tracing/trace_view/spanlist.png" alt="トレースビュー" style="width:90%;">}}

[リソース][1]をグループ (デフォルトでは[サービス][2]) ごとに表示し、スパン数に従ってソートします。この視覚化は、リソースまたはグループごとにレイテンシー情報をスキャンするのに役立ちます。

対応するボタンとテキストベースの検索を使用して、リソースをタイプまたはネーミング情報でフィルタリングします。

{{< img src="tracing/trace_view/spanlist_headers.png" alt="スパンリストのヘッダー" style="width:90%;">}}

グループは、対応する列のヘッダーをクリックすることでソートできます ([{{< ui >}}RESOURCE{{< /ui >}}] (リソース)、[{{< ui >}}SPANS{{< /ui >}}] (スパン)、平均期間 ([{{< ui >}}AVG DURATION{{< /ui >}}] (平均期間))、実行時間 ([{{< ui >}}EXEC TIME{{< /ui >}}] (実行時間))、またはトレース実行時間の割合 ({{< ui >}}% EXEC TIME{{< /ui >}}))。

[1]: /ja/tracing/glossary/#resources
[2]: /ja/tracing/glossary/#services
{{% /tab %}}
{{% tab "ウォーターフォール" %}}

{{< img src="tracing/trace_view/waterfall2.png" alt="ウォーターフォール" style="width:100%;">}}

タイムライン上にトレースのすべてのスパンを表示します。各行が 1 つのスパンに対応しています。この視覚化によって、トレースの関連する部分のみを取り出して強調することができます。

各行 (スパン) は以下を示します。

- **スパンの相対期間**: 色分けされた棒グラフの長さが、トレース期間全体に対する割合に対応しています。
- **スパンの絶対期間**: ミリ秒 (ms) 単位の絶対時間です。
- **スパンの詳細**: 対応するサービス名とリソース名が表示されます。
- **ステータス**: 該当する場合、HTTP ステータスコードが表示されます。
- **色分け**: スパンはサービス (デフォルト)、ホスト、またはコンテナごとに色分けされます。スパンの色分け方法を変更するには、[{{< ui >}}Color by{{< /ui >}}] (色分け) ドロップダウンを使用します。

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
[推論サービス][1]からのスパンは、破線の下線で表されます。

[1]: /ja/tracing/services/inferred_services
{{< /site-region >}}

スパンの子孫を展開するか、折りたたむには、行のシェブロン (>) アイコンをクリックします。すべてのスパンを展開するか、折りたたむには、[{{< ui >}}Expand all{{< /ui >}}] (すべて展開) (+) または [{{< ui >}}Collapse all{{< /ui >}}] (すべて折り畳み) (-) ボタンをクリックします。

{{% /tab %}}
{{% tab "マップ" %}}

{{< img src="tracing/trace_view/trace-map.png" alt="トレースマップ" style="width:100%;">}}

トレースマップには、単一のトレースに関与するすべてのサービスを表したものが示されます。これは、サービスレベルでのトランザクションライフサイクルの概要を提供し、サービスの依存関係を示します。

マップ上の各ノードは、トランザクションライフサイクル内のサービスを表しています。マップ上の循環依存関係を防ぐため、元のサービスによってすでに呼び出されているサービスを別のサービスが呼び出す場合は、重複したノードとして表されます。[推論サービス][2]は、輪郭が破線で、背景が紫色で表示されます。

サービスノードには [{{< ui >}}total execution time{{< /ui >}}] (合計実行時間) の割合が明示されます。これは、サービスレベルでのトレース期間の内訳を示します。

[サービスエントリスパン][1]がエラー状態にある場合、障害のあるサービスを強調表示するために、対応するサービスノードの枠線が赤くなります。サービス終了スパンでエラーが発生した場合は、次のサービスへの呼び出しを示すエッジも赤で強調表示されます。

各ノードのサービスエントリスパンに関する詳細情報を表示するには、エラー状態にカーソルを合わせます。ツールチップには、サービスエントリスパンの操作とリソース名の詳細とエラーメッセージが表示されます。さらに詳しく調べるには、[{{< ui >}}View Entry Span{{< /ui >}}] (エントリスパンを表示) をクリックしてウォーターフォールビューに切り替えます。

[1]: /ja/glossary/#service-entry-span
[2]: /ja/tracing/services/inferred_services
{{% /tab %}}
{{< /tabs >}}

### スパンにフォーカスする {#focus-on-a-span}
ウォーターフォールおよびフレームグラフの視覚化では、スパンにフォーカスすることで、スパンおよびその子のみを表示することができます。スパンにフォーカスすると、トレースの他の部分により気が散ることなく、特定の操作群を分離して調査できるため、大規模なトレースで役立ちます。

フレームグラフでは、スパンを選択し、ミニマップの横にあるフォーカスアイコンをクリックします。ウォーターフォールでは、スパンにカーソルを合わせ、右側にあるフォーカスアイコンをクリックします。選択したスパンを新しいルートとして視覚化のスケールが再設定され、その子孫がタイムラインに表示されます。すべてのトレースを再度表示するには、フォーカスをリセットします。

{{< img src="/tracing/trace_view/flamegraph-focus-on-span.mp4" alt="フレームグラフでのスパンへのフォーカス" video="true" style="width:90%;">}}
{{< img src="tracing/trace_view/waterfall-focus-on-spans.mp4" alt="ウォーターフォールでのスパンへのフォーカス" video="true" style="width:90%;">}}

<div class="alert alert-info">フォーカスした場合、変更されるのは表示のみです。検索結果からスパンを除外したり、基盤となるトレースを変更したりすることはありません。</div>

### トレースのプレビュー {#trace-preview}
トレースのサイズが 100MB を超えた場合は、デフォルトのトレースサイドパネルを使用してすべてを視覚化することはできません。そのような場合は、トレースプレビューモードが有効になります。このモードでは、調査を継続するために役立つ、最も重要なスパンのみが返されます。これには、次のものが含まれます。

- サービスエントリレベルのスパン
- エラースパン
- 長時間実行されるスパン
- 他のスパンまたはトレースにリンクされたスパン

大規模なトレース向けの視覚化オプションは、ウォーターフォールビューとマップビューでのみ利用できます。プレビューモードでは、ウォーターフォールビューで、デフォルトでは含まれていないスパンを取得するための追加オプションが提供されます。これらのスパンはグループ化され、番号付きのピルを使用して表されます。各ピルには、そのグループで利用可能なスパンの合計数が表示されます。番号付きのピルをクリックすると、そのグループ内のすべてのスパンを展開して表示できます。

{{< img src="tracing/visualization/trace/trace-preview.png" alt="トレースのプレビュー" style="width:100%;">}}

## スパン検索 {#span-search}

ウォーターフォールおよびフレームグラフの視覚化では、検索オプションを使用して特定のクエリに一致するスパンを見つけることができます。検索クエリに一致するスパンはトレースビューで強調表示され、検索バーの横にある矢印を使用してそれらの一致を移動できます。

<img src="https://github.com/user-attachments/assets/4c6fc35a-65b7-42ee-bc24-fcb9adb9d0b8" alt="Search bar" style="width:90%;">

**注**: [`Error`] チェックボックスが選択されている場合、検索結果にはクエリに一致し、かつエラー状態であるスパンが返されます。

トレースサイドパネルの検索クエリでは、以下のオプションがサポートされています。

- **フリーテキスト検索:**
自由入力形式のテキスト検索では、サービス名、リソース名、またはオペレーション名でフィルタリングできます。これらのカテゴリー内で指定されたテキストを含むスパンが強調表示されます。
例: `web`
- **キーと値の検索:**
key:value 表現を使用して、特定のキーと値のペアを持つスパンをフィルタリングします。
例: `service:web-ui`

**注**: トレース検索バーではワイルドカードはサポートされていません。

**サポートされている表現:**
- グループ表現: `language:(go OR python)`
- ブール表現: `service:event-query OR terminator`
- 範囲表現: `duration:>200ms`

**注**: 数値では、`<`、`>`、`<=`、および `>=` の表現がサポートされます。


## 詳細{#more-information}

トレースビューの高さ調節可能な下部には、選択したスパンとトレース情報が表示されます。

<div class="alert alert-tip">エラーを含むトレースで、トレース詳細パネルの [<strong>Investigate With Bits AI</strong>] (Bits AI で調査) をクリックすると、自動調査が開始されます。Bits AI はスパンツリーを調べてリクエストが失敗した場所を特定し、関連するログと調査結果を関連付けます。詳細については、「<a href="/bits_ai/bits_chat/">Bits Chat</a>」を参照してください。</div>

スパンヘッダーには、選択したスパンのサービス名、オペレーション名、リソース名、およびレイテンシー情報が含まれています。名前付きのピルをクリックして、プラットフォームの他の部分に移動したり、[Trace Explorer][5] の検索を絞り込んだりすることができます。

{{< img src="tracing/trace_view/span_header.png" alt="スパンヘッダー" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
スパンがインスツルメントされたサービスからデータベース、キュー、またはサードパーティサービスへのクライアント呼び出しを表す場合、スパンヘッダーにはサービスと推論エンティティが表示されます。

{{< img src="tracing/trace_view/span_header_inferred.png" alt="推論されたスパンヘッダー" style="width:90%;">}}
{{< /site-region >}}

{{< tabs >}}
{{% tab "スパン情報" %}} 

カスタムタグを含む、すべてのスパンメタデータを表示します。スパンタグをクリックして、Trace Explorer で検索クエリを更新するか、タグの値をクリップボードにコピーします。

以下の情報がさまざまな条件下で表示されます。
- エラーメッセージとスタックトレース (エラースパン上)
- SQL クエリマークアップ (データベーススパン上)
- RUM コンテキストとメタデータ (RUM スパン上)
- Spark メトリクス (Spark ジョブスパン上)
- git 警告メッセージ (CI テストで git 情報が見つからない場合)

{{< img src="tracing/trace_view/info_tab.png" alt="スパンの [Info] (情報) タブ" style="width:90%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
サービス名がベースサービス名からオーバーライドされている場合、情報セクションの上部に以下が表示されます。
- [{{< ui >}}[Base service][2]{{< /ui >}}] (基本サービス): `@base_service` 属性によって識別されるスパン発行元のサービス。
- [{{< ui >}}[Service override][3]{{< /ui >}}] (サービスオーバーライド): Datadog Integrations によって自動設定、またはプログラマティック API によって変更されたベースサービス名とは異なるサービス名。サービスオーバーライドは、`service` 予約属性によって識別されます。
- [{{< ui >}}[Inferred service][4]{{< /ui >}}] (推論サービス)(_該当する場合_): ベースサービスから呼び出される推論先エンティティ名で、[ピア属性][5]のいずれかで識別されます。

{{< img src="tracing/trace_view/base_override_inferred_service.png" alt="ベース、オーバーライド、および推論サービス" style="width:80%;">}}

[2]: /ja/tracing/guide/service_overrides#base-service
[3]: /ja/tracing/guide/service_overrides
[4]: /ja/tracing/services/inferred_services
[5]: /ja/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

[1]: /ja/tracing/glossary/#trace
{{% /tab %}}
{{% tab "インフラストラクチャー" %}}

選択したスパンのインフラストラクチャー情報を、ホストレベルとコンテナレベル (利用可能な場合) の間で切り替えます。

関連するタグや、CPU、メモリ、I/O などの重要なホスト/コンテナのメトリクスグラフを、トレースが発生した日時のオーバーレイとともに確認します。

{{< img src="tracing/trace_view/infrastructure_tab.png" alt="[Infrastructure] (インフラストラクチャー) タブ" style="width:90%;">}}

{{% /tab %}}
{{% tab "ログ" %}}

トレース発生時のサービスに関連するログを表示します。ログにカーソルを合わせると、そのタイムスタンプを示す行がトレースフレームグラフ上に表示されます。ログをクリックすると、[ログエクスプローラー検索][1]ページが開きます。

{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="トレース内のログ" style="width:100%;">}}


[1]: /ja/logs/explorer/search/
{{% /tab %}}
{{% tab "プロセス" %}}

サービスのスパンをクリックすると、基盤となるインフラストラクチャーで実行中のプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関関係にあります。CPU および RSS メモリなどのプロセスメトリクスをコードレベルのエラーと共に分析することで、アプリケーション固有の問題なのか、インフラストラクチャーの問題なのかを切り分けることができます。プロセスをクリックすると、[Live Processes ページ][1]が開きます。スパン固有のプロセスを表示するには、[プロセス収集][2] を有効にしてください。関連するプロセスは、現在サーバーレスおよびブラウザのトレースではサポートされていません。

{{< img src="tracing/trace_view/processes_tab.png" alt="[Processes] (プロセス) タブ" style="width:90%;">}}

[1]: https://docs.datadoghq.com/ja/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/ja/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "ネットワーク" %}}

サービスのスパンをクリックすると、リクエストを行っているサービスのネットワーク依存関係を確認できます。ボリューム、エラー (TCP 再送回数)、ネットワークレイテンシー (TCP ラウンドトリップ時間) などの主要なネットワークパフォーマンスメトリクスを使用して、特にコードエラーが発生していない場合に、アプリケーション固有の問題とネットワーク全体の問題とを区別します。たとえば、ネットワークテレメトリを使用して、リクエストレイテンシーの高さが関連アプリケーションのトラフィックの過負荷によるものか、または下流の Pod、セキュリティグループ、またはその他のタグ付きエンドポイントとの依存関係の不具合によるものかを判断できます。プロセスをクリックすると、[Network Analytics][1] ページが開きます。スパン固有のプロセスを表示するには、[Cloud Network Monitoring][2] を有効にしてください。

**注**: 関連するネットワークテレメトリは、現在サーバーレスのトレースではサポートされていません。

{{< img src="tracing/trace_view/network_tab.png" alt="[Network] (ネットワーク) タブ" style="width:90%;">}}

[1]: /ja/network_monitoring/performance/network_analytics
[2]: /ja/network_monitoring/performance/setup
{{% /tab %}}

{{% tab "セキュリティ" %}}

分散型トレーシングのサービスを対象とした攻撃の試行を確認できます。攻撃者が使用したパターン、攻撃を検出したルール、攻撃者がサービスの脆弱性を発見したかどうかを確認することができます。

[{{< ui >}}View in AAP{{< /ui >}}] (AAP で表示) をクリックすると、[Datadog App and API Protection][1]を使用してさらに詳しく調査できます。

{{< img src="tracing/trace_view/security_tab.png" alt="[Security] (セキュリティ) タブ" style="width:90%;">}}

[1]: /ja/security/application_security/how-it-works/
{{% /tab %}}
{{% tab "プロファイル" %}}

[プロファイル][1]を表示して、パフォーマンスの問題に関連するコード行を特定します。左側の値は、選択されたスパン中に各メソッド呼び出しに費やされた時間を表します。

{{< img src="profiler/profiles_tab.png" alt="選択されたスパンで各メソッドに費やされた時間が示されている [Profiles] (プロファイル) タブ" style="width:90%;">}}

[1]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{% tab "スパンリンク" %}}

[スパンリンク][4]は、因果関係はあるが、典型的な親子関係を持たない 1 つ以上のスパンを相関付けます。

フレームグラフのスパンをクリックすると、スパンリンクで接続されたスパンが表示されます。

{{< img src="tracing/span_links/span_links_tab_2.png" alt="[Span Links] (スパンリンク) タブ" style="width:90%;">}}

**注**: スパンリンクは、たとえば[保持フィルター][1]を使用して、対応するスパンが取り込まれ、インデックス化された場合にのみ表示されます。

スパンリンクの詳細とカスタムインスツルメンテーションでスパンリンクを追加する方法については、[スパンリンク][4]をお読みください。

[1]: /ja/tracing/trace_pipeline/trace_retention/
[2]: /ja/tracing/trace_collection/custom_instrumentation/php#adding-span-links-beta
[3]: /ja/tracing/trace_collection/otel_instrumentation/java#requirements-and-limitations
[4]: /ja/tracing/trace_collection/span_links/

{{% /tab %}}
{{< /tabs >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/tracing/glossary/#spans
[3]: /ja/tracing/glossary/#services
[4]: /ja/tracing/glossary/#resources
[5]: /ja/tracing/trace_explorer
[6]: /ja/glossary/#service-entry-span
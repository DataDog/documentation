---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
aliases:
- /ja/bits_ai/mcp_server/tools/
description: Datadog MCP サーバーで利用可能なすべてのツールを、ツールセットごとに整理し、サンプルプロンプトと共に参照します。
further_reading:
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP サーバー
- link: mcp_server/setup
  tag: ドキュメント
  text: Datadog MCP サーバーを設定する
title: Datadog MCP サーバーツール
---
Datadog MCP サーバーで利用可能なツールは以下の通りです。各エントリには、必要なツールセット、権限、およびサンプルプロンプトが含まれています。ツールは [ツールセット][1] ごとに分類されています。それにより、必要なツールのみ使用でき、貴重なコンテキストウィンドウのスペースを節約できます。

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
製品特有のツールを有効にするには、Datadog MCP サーバーへの接続に使用するエンドポイント URL の末尾に、`toolsets` クエリパラメーターを含めてください。たとえば、選択した [Datadogサイト][2] に基づいて({{< region-param key="dd_site_name" >}}) この URL で有効になるのは、APM と Agent の可観測性ツール_だけ_です。

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

特定のツールは、`omit_tools` クエリパラメーターを使用して除外することもできます。

[2]: /ja/getting_started/site/
{{< /site-region >}}

MCP サーバーへの接続、ツールセットの有効化、および特定のツールの除外の詳細については、[Datadog MCP サーバーを設定する][1]をご覧ください。

<div class="alert alert-info">Datadog MCP サーバーツールは大規模開発作業中であり、変更される可能性があります。プロンプトやクエリに関するフィードバック、ユースケース、または問題については、<a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">このフィードバックフォーム</a>を通じてご連絡ください。</div>

## コアツール {#core-tools}

ログ、メトリクス、トレース、ダッシュボード、モニター、インシデント、ホスト、サービス、イベント、およびノートブックのデフォルトツールセット

### `search_datadog_events`{#search-datadog-events}
*ツールセット: **コア***\
*必要な権限: `Events` および `Timeseries`*\
モニターアラート、デプロイ通知、インフラストラクチャーの変更、セキュリティの発見、サービスステータスの変更などのイベントを検索します。

- 過去 24 時間のすべてのデプロイイベントを表示します。
- エラーステータスの本番環境に関連するイベントを見つけます。
- 過去 1 時間に `service:api` タグが付けられたイベントを取得します。

**注**: 詳細については、[Event Management API][15] をご覧ください。

### `get_datadog_incident`{#get-datadog-incident}
*ツールセット: **コア***\
*必要な権限: `Incidents Read`*\
インシデントに関する詳細情報を取得します。

- インシデント ABC123 の詳細を取得します。
- インシデント ABC123 のステータスは何ですか？
- 昨日の Redis インシデントに関する完全な情報を取得します。

**注**: ツールは稼働中ですが、インシデントのタイムラインデータは含まれていません。

### `get_datadog_metric`{#get-datadog-metric}
*ツールセット: **コア***\
*必要な権限: `Cloud Cost Management Read` または `Metrics` または `Timeseries`*\
履歴またはリアルタイムのメトリックデータをクエリしたり、分析したりします。カスタムクエリや集計がサポートされています。

- 過去 4 時間のすべてのホストの CPU 利用率メトリクスを表示します。
- 本番環境の Redis レイテンシーメトリクスを取得します。
- 1 月から 2 月にかけて私のクラウドコストはどのくらい変化しましたか？

### `get_datadog_metric_context`{#get-datadog-metric-context}
*ツールセット: **コア***\
*必要な権限: `Cloud Cost Management Read` または `Metrics`*\
メトリックに関する詳細情報を取得します。それには、メタデータ、利用可能なタグ、およびフィルタリングとグループ化のためのタグ値が含まれます。

- メトリック `system.cpu.user` に対して利用可能なタグは何ですか？
- `redis.info.latency_ms` の `env` タグに対して可能な値をすべて表示します。
- メトリック `requests.count` のメタデータと次元を取得します。

### `search_datadog_monitors`{#search-datadog-monitors}
*ツールセット: **コア***\
*必要な権限: `Monitors Read`*\
Datadog モニターに関する情報を取得します。これには、ステータス、しきい値、およびアラート条件が含まれます。

- 現在アラートを出しているすべてのモニターをリストします。
- 私たちの支払いサービスに関連するモニターを表示してください。
- `team:infrastructure` のタグが付けられているのモニターを見つけます。

### `get_datadog_trace`{#get-datadog-trace}
*ツールセット: **コア***\
*必要な権限: `APM Read`*\
トレース ID を使用して Datadog APM から完全なトレースを取得します。

- ID が 7d5d747be160e280504c099d984bcfe0 の完全なトレースを取得します。
- トレース abc123 のすべてのスパンをタイミング情報と共に表示します。
- ID xyz789 のデータベースクエリを含むトレースの詳細を取得します。

**注**: 数千のスパンがある大きなトレースは切り捨てられる可能性があり (その旨が示されます)、すべてのスパンを取得する手段はありません。

### `search_datadog_dashboards`{#search-datadog-dashboards}
*ツールセット: **コア***\
*必要な権限: `Dashboards Read`および`User Access Read`*\
利用可能な Datadog ダッシュボードと主要な詳細をリストします。

- 私たちのアカウントで利用可能なダッシュボードをすべて表示してください。
- インフラストラクチャー監視に関連するダッシュボードをリストします。
- エンジニアリングチームのための共有ダッシュボードを見つけます。

**注**: このツールでは、関連するダッシュボードをリストしますが、その内容に関する詳細は限られています。完全なウィジェット定義を取得するには、`get_datadog_dashboard`を使います。

### `get_datadog_notebook`{#get-datadog-notebook}
*ツールセット: **コア***\
*必要な権限: `Notebooks Read`*\
特定のノートブックの ID に基づいて、名前、ステータス、著者を含む詳細情報を取得します。

- ノートブック abc-123-def の詳細を取得します。
- 昨日のデバッグノートブックの内容を表示してください。

### `search_datadog_notebooks`{#search-datadog-notebooks}
*ツールセット: **コア***\
*必要な権限: `Notebooks Read`*\
Datadog ノートブックをリストしたり検索したりします。著者、タグ、コンテンツによるフィルタリングがサポートされます。

- プラットフォームチームが作成したすべてのノートブックを表示してください。
- パフォーマンス調査に関連するノートブックを見つけます。
- `incident-response` のタグが付いたノートブックをリストします。

### `search_datadog_hosts`{#search-datadog-hosts}
*ツールセット: **コア***\
*必要な権限: `Hosts Read` および `Timeseries`*\
監視対象のホストに関する情報をリストしたり、それを指定したりします。フィルタリングと検索がサポートされます。

- 私たちの本番環境にあるすべてのホストを表示してください。
- 過去 1 時間に報告していない不健康なホストをリストします。
- `role:database` のタグが付いているすべてのホストを取得します。

### `search_datadog_incidents`{#search-datadog-incidents}
*ツールセット: **コア***\
*必要な権限: `Incidents Read`*\
Datadog のインシデントのリストを取得します。状態、重大度、メタデータが含まれます。

- 重大度別にすべてのアクティブなインシデントを表示してください。
- 過去 1 週間に解決されたインシデントのリストを表示します。
- 顧客に影響を与えるインシデントを見つけます。

### `search_datadog_metrics`{#search-datadog-metrics}
*ツールセット: **コア***\
*必要な権限: `Metrics`*\
用可能なメトリクスをリストします。フィルタリングとメタデータのオプションがあります。

- 利用可能なすべての Redis メトリクスを表示します。
- 私たちのインフラストラクチャーに関連する CPU メトリクスのリストを表示します。
- `service:api` のタグが付いたメトリクスを見つけます。

### `search_datadog_services`{#search-datadog-services}
*ツールセット: **コア***\
*必要な権限: `Service Catalog Read`*\
詳細とチーム情報を含む、Datadog の Catalog 内のサービス一覧を表示します。

- 私たちのマイクロサービスアーキテクチャにあるすべてのサービスを表示してください。
- プラットフォームチームが所有するサービスのリストを取得します。
- 支払い処理に関連するサービスを見つけます。

### `search_datadog_service_dependencies`{#search-datadog-service-dependencies}
*ツールセット: **コア***\
*必要な権限: `APM Read` および `Service Catalog Read` および `Teams Read`*\
サービスの依存関係 (上流/下流) およびチームが所有するサービスを取得します。

- チェックアウトサービスを呼び出すすべての上流サービスを表示します。
- 支払い API が依存している下流サービスは何ですか？
- プラットフォームチームが所有するすべてのサービスのリストを取得します。

### `search_datadog_spans`{#search-datadog-spans}
*ツールセット: **コア***\
*必要な権限: `APM Read`*\
サービス、時間、リソースなどのフィルターを使用して APM トレースからスパンを取得します。

- チェックアウトサービスのうち、エラーを含むスパンを表示してください。
- 過去 30 分間のうち遅いデータベースクエリを見つけます。
- 私たちの支払いサービスに対する失敗した API リクエストのスパンを取得します。

### `analyze_datadog_logs`{#analyze-datadog-logs}
*ツールセット: **コア***\
*必要な権限: `Logs Read Data` および `Logs Read Index Data` および `Timeseries`*\
SQL クエリを使用して Datadog ログを分析して、カウント、集計、数値分析を実行します。これを統計分析に使うことができます。

- 過去 1 時間のサービス別エラーログをカウントします。
- 上位 10 の HTTP ステータスコードとそのカウントを表示してください。
- その期間中に最も多くログを記録していたサービスはどれですか？

### `search_datadog_logs`{#search-datadog-logs}
*ツールセット: **コア***\
*必要な権限: `Logs Read Data` および `Logs Read Index Data`*\
時間、クエリ、サービス、ホスト、ストレージ階層などのフィルターを使用してログを検索し、ログの詳細を返します。`get_logs` から名前が変更されました。

- 過去 1 時間のうち nginx サービスからのエラーログを表示してください。
- 私たちの API サービスからの「接続タイムアウト」を含むログを見つけます。
- 本番環境からのすべての 500 ステータスコードのログを取得します。

### `search_datadog_rum_events`{#search-datadog-rum-events}
*ツールセット: **コア***\
*必要な権限: `RUM Apps Read`*\
高度なクエリ構文を使用して Datadog RUM イベントを検索します。

- RUM で JavaScript エラーとコンソール警告を表示します。
- 読み込みが遅いページ (3 秒以上) を見つけます。
- 製品詳細ページで最近のユーザーインタラクションを表示します。

### `create_datadog_notebook`{#create-datadog-notebook}
*ツールセット: **コア***\
*必要な権限: `Notebooks Read` および `Notebooks Write`*\
新しい Datadog ノートブックを作成します。

- チェックアウトサービスのレイテンシースパイクに関する調査を文書化するためのノートブックを作成します。
- 私たちの週次パフォーマンスレビューのための新しいノートブックを作成します。

### `edit_datadog_notebook`{#edit-datadog-notebook}
*ツールセット: **コア***\
*必要な権限: `Notebooks Read` および `Notebooks Write`*\
既存の Datadog ノートブックを編集します。

- ノートブック abc-123-def に最新のログ分析結果のセクションを追加します。
- 今日の発見をもとにインシデント応答ノートブックを更新します。

## アラート設定 {#alerting}

モニターの検証、モニターグループの検索、およびモニターテンプレートの取得のためのツール。

### `validate_datadog_monitor`{#validate-datadog-monitor}
*ツールセット: **アラート設定***\
*必要な権限: `Monitors Read`*\
モニター定義を作成したり更新したりする前に、その正確性を検証します。

- このモニター定義を作成する前に検証します。
- 私のモニタークエリの構文が正しいか確認してください。

### `get_datadog_monitor_templates`{#get-datadog-monitor-templates}
*ツールセット: **アラート設定***\
*必要な権限: `Monitors Read`*\
モニターを作成するための利用可能なモニターテンプレートを取得します。

- 利用可能なモニターテンプレートを表示します。
- 新しいモニターを作成するために使用できるテンプレートは何ですか？

### `search_datadog_monitor_groups`{#search-datadog-monitor-groups}
*ツールセット: **アラート設定***\
*必要な権限: `Monitors Read`*\
名前や基準によりモニターグループを検索します。

- アラート状態にあるすべてのモニターグループを表示してください。
- チェックアウトサービスに関連するモニターグループを見つけます。

### `search_datadog_slos`{#search-datadog-slos}
*ツールセット: **アラート設定***\
*必要な権限: `SLOs Read`*\
Datadog SLO を名前、タグ、またはタイプで検索します。サービス、チーム、またはその他の属性でフィルタリングするためのクエリ構文をサポートします。

- `service:checkout` に関連する SLO を検索します。
- `team:backend` のタグが付いたすべての SLO をリストします。
- 支払いサービスの SLO をリストします。

### `create_datadog_monitor`{#create-datadog-monitor}
*ツールセット: **アラート設定***\
*必要な権限: `Monitors Write`*\
ドラフトモードで Datadog モニターを作成します。このツールで作成されたモニターは通知を送信せず、優先度 5 (低) に設定されています。作成前に定義を確認するには `validate_datadog_monitor` を使用してください。クエリ構文の例については、`get_datadog_monitor_templates` を使用してください。作成後、Datadog UIでモニターを公開します。

- ウェブサービスの高 CPU 使用率に対するメトリックアラートモニターを作成します。
- 支払いサービスのエラーの急増に対するログアラートモニターを設定します。
- チェックアウトエンドポイントの p95 レイテンシーを追跡するモニターを作成します。

### `get_monitor_coverage`{#get-monitor-coverage}
*ツールセット: **アラート設定***\
*必要な権限: `Monitors Read`*\
サービスまたはホストの監視のギャップとカバレッジを見つけます。既存のモニターによってカバーされている信号 (エラー率、レイテンシー、リクエスト率など) と不足している信号を返します。ギャップを埋めるには `create_datadog_monitor` と一緒に使用してください。

- `service:checkout` の監視カバレッジを取得します。
- `host:web-01` についてどの監視のギャップが存在しますか？
- エラー率モニターが不足しているサービスを見つけます。

## APM {#apm}

[APM][50] トレース分析、スパン検索、Watchdogインサイト、パフォーマンス調査のためのツール。

<div class="alert alert-info"> <code>apm</code> ツールセットはプレビュー中です。<a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">アクセスのためにサインアップします。</a></div>

### `apm_search_spans` {#apm-search-spans}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
APM クエリ構文を使用してスパンを検索します。ページネーションとタグフィルタリングがサポートされます。

- 過去 1 時間のチェックアウトサービスからのエラーを含むスパンを表示してください。
- 2 秒以上かかる遅いデータベースクエリを見つけます。
- `service:payments` と `status:error` のスパンを検索します。

### `apm_query_trace`{#apm-query-trace}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
最も自己時間が長いスパンの検出や、エラーの発生元サービスへのトレースなど、スパンをフィルタリング、集計、またはランク付けを行うためにトレースのスパンデータをクエリします。

- トレース `abc123` で自己時間が最も長い上位 5 スパンを検出します。
- トレース `abc123` でのすべてのエラーメッセージとその発生元サービスを表示します。
- このトレース内で 500ms より長くかかったデータベース呼び出しはどれですか。

### `apm_discover_span_tags`{#apm-discover-span-tags}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
指定された時間範囲内のスパンに存在するタグキーを検出します。

- `service:checkout` のスパンで利用可能なタグは何ですか？
- APM でフィルタリングに使用できるタグキーを表示してください。

### `apm_get_primary_tag_keys`{#apm-get-primary-tag-keys}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
組織に設定されている主要なタグキーを取得します。

- 私の組織の主要なタグキーは何ですか？

### `apm_search_watchdog_stories`{#apm-search-watchdog-stories}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
特定の時間範囲内でサービスの Watchdog 異常検出ストーリーを検索し、レイテンシー、エラー率、トラフィックの異常に関する AI 駆動の洞察を提供します。

- 過去 24 時間におけるチェックアウトサービスの Watchdog 異常を表示してください。
- 私の API サービスに対して遅延の異常が検出されていますか？

### `apm_get_watchdog_story`{#apm-get-watchdog-story}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
特定の Watchdog ストーリーの詳細情報を、指定された ID に基づいて取得します。

- Watchdog ストーリー `abc123` の詳細を取得します。

### `apm_latency_bottleneck_summary`{#apm-latency-bottleneck-summary}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
自己時間の計算を使用することにより、異常期間中のトレース全体におけるレイテンシーボトルネックを分析します。どのサービスとリソースの組み合わせが最も多くの自己時間を消費しているかを特定し、連鎖呼び出しパターンを検出し、レイテンシースパイクの根本原因を明らかにします。

- 本日午後 2 時から 3 時の間のチェックアウトサービスのレイテンシーボトルネックを要約します。
- このレイテンシースパイクの発生中に、支払いサービスで最も自己時間を消費しているものは何ですか？
- 10:00 から 10:30 の間に `service:api` の上位ボトルネックであるエンドポイントを特定します。

### `get_change_stories` {#get-change-stories}
*ツールセット: **apm***\
APM サービスのために、変更追跡 API から変更ストーリーを取得します。これを使用して、特定の時間範囲内で変更された内容 (デプロイ、フィーチャーフラグ、構成の更新、インフラストラクチャーイベント) を特定し、パフォーマンスの問題またはインシデントに変更を関連付けます。

- 支払いサービスの最近のデプロイメントと変更を表示してください。
- この遅延スパイクの前後で発生したインフラストラクチャーの変更は何ですか？
- 過去 1 時間におけるチェックアウトサービスのフィーチャーフラグと構成の変更を検出します。

### `semantic_search_change_stories`{#semantic-search-change-stories}
*ツールセット: **apm***\
自然言語と AI を活用したセマンティック検索を使用して、変更ストーリーを検索します。これを使用して、動作、ユーザーから報告された問題、または調査中の製品の一部に関連するフィーチャーフラグやデプロイの変更を見つけます。

- 最近行った変更で、トライアルユーザーのダッシュボードの読み込みに影響を与える可能性のある変更は何ですか？
- 請求設定ページで認証に影響を与える可能性のあるフラグはどれですか？
- 先週の欠落テレメトリに関連する変更を検出します。

### `apm_search_recommendations`{#apm-search-recommendations}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
Datadog からの APM 推奨事項を検索します。

- 私のサービスに対する APM 推奨事項を表示してください。
- 私のアプリケーションに対する最適化の提案が何かありますか？

### `apm_get_recommendation`{#apm-get-recommendation}
*ツールセット: **apm***\
*必要な権限: `APM Read`*\
特定の APM 推奨事項の詳細を、指定された ID により取得します。

- 推奨事項 `abc123`の詳細を取得します。

## ケース {#cases}

[Case Management][38] 用のツール。case の作成、検索、更新、プロジェクトの管理、および Jira の課題のリンクを含みます。

### `search_datadog_cases`{#search-datadog-cases}
*ツールセット: **ケース***\
*必要な権限: `Cases Read`*\
[Case Management][38] のケースを、ステータス、優先度、プロジェクト、担当者などのフィルターを指定して検索します。時間範囲のフィルタリングとページネーションがサポートされます。

- 私に割り当てられているすべてのオープンケースを表示してください。
- セキュリティレビュープロジェクトにオープンな P1 ケースはありますか？
- 今週オープンされた支払いサービスに関連するすべてのケースを表示してください。

### `get_datadog_case`{#get-datadog-case}
*ツールセット: **ケース***\
*必要な権限: `Cases Read`*\
特定のケースの ID またはキーに基づいて、タイトル、ステータス、優先度、担当者、およびタイムスタンプを含む詳細情報を取得します。オプションで、タイムラインの活動 (コメントやステータスの変更)およびカスタム属性を含めることができます。

- CASE-1234 の最新の更新は何ですか？ 完全なタイムラインを表示してください。
- 誰がこのケースの作業をしていますか？ これまでにどのような進展がありましたか？
- データベース移行ケースの詳細とコメントのすべてを表示します。

### `create_datadog_case`{#create-datadog-case}
*ツールセット: **ケース***\
*必要な権限: `Cases Write`*\
タイトル、プロジェクト、および説明、優先度、担当者などのオプションフィールドを含む新しい [Case Management][38] ケースを作成します。

- チェックアウトサービスでレイテンシースパイクが発生しています。調査を追跡するために P2 ケースを作成します。
- ログに見つかった疑わしいログイン活動について、セキュリティレビューケースを開きます。

### `update_datadog_case`{#update-datadog-case}
*ツールセット: **ケース***\
*必要な権限: `Cases Write`*\
既存ケースのフィールド (ステータス、優先度、タイトル、説明、担当者、期限、カスタム属性など) を更新します。データを設定したフィールドのみが更新されます。

- この問題は現在、顧客に影響を与えています。CASE-1234 を P1 にエスカレートします。
- データベース移行ケースを解決済みとしてマークします。
- CASE-1234 の締切を今週の終わりに設定します。

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*ツールセット: **ケース***\
*必要な権限: `Cases Write`*\
ケースのタイムラインにコメントを追加します。コメントではマークダウン形式がサポートされています。

- ログとトレースで見つけた内容を要約したメモをケースに追加します。
- ホットフィックスがデプロイされたことと、監視していることを更新として投稿します。
- このケースの根本原因分析の結果を文書化します。

### `link_jira_issue_to_datadog_case`{#link-jira-issue-to-datadog-case}
*ツールセット: **ケース***\
*必要な権限: `Cases Write`*

- インフラストラクチャー移行の Jira チケットをこのケースにリンクして、両方を一緒に追跡できるようにします。
- PROJ-456 を Datadog ケースに接続して、エンジニアリングチームに対して可視化します。

### `list_datadog_case_projects`{#list-datadog-case-projects}
*ツールセット: **ケース***\
*必要な権限: `Cases Read`*\
利用可能な [Case Management][38] プロジェクトをリストします。オプションとして、名前またはキーでフィルタリングできます。

- Case Management で利用可能なプロジェクトは何ですか？
- Case Management に関連するセキュリティのプロジェクトはありますか？

### `get_datadog_case_project`{#get-datadog-case-project}
*ツールセット: **ケース***\
*必要な権限: `Cases Read`*\
特定のケースプロジェクトの詳細を ID で取得します。

- このケースはどのプロジェクトの一部ですか？

### `search_datadog_users`{#search-datadog-users}
*ツールセット: **ケース***\
*必要な権限: `User Access Read`*\
メール、名前、またはハンドルで Datadog ユーザーを検索します。ケースを割り当てる先の適切な人物を見つけるのに役立ちます。

- jane.doe@example.com の Datadog のユーザーアカウントを見つけます。

## コード実行 {#code-execution}

マルチシグナル調査とアドホックデータ探索を 1 回の呼び出しで行うための、エージェントが作成した TypeScript を Datadog API への直接アクセスを持つ Datadog 管理のサンドボックスで実行する単一のツール

<div class="alert alert-info"> <code>code-exec</code> ツールセットはプレビュー中です。<a href="https://www.datadoghq.com/product-preview/mcp-codexec/">サインアップ</a>してプレビューを利用するか、または<a href="/help">Datadog サポート</a>に連絡してアクセスをリクエストしてください。</div>

このツールセットによって実行されるコードは、ユーザー自身のユーザー ID を使用して Datadog API に対して実行されます。サンドボックスにより既存の[ロール権限][56]がすべての API 呼び出しに適用されるので、エージェントは Datadog ですでにアクセスできるデータの読み取りと変更のみが可能です。

### `execute_code`{#execute-code}
*ツールセット: **code-exec***\
*必要な権限: 実行されたコードが相互作用する基盤となる Datadog リソースにアクセスするために必要な製品固有のロール権限（例: ログを読み取るための `Logs Read`）。*\
AI エージェントが作成した TypeScript を、Datadog が管理するサンドボックスで実行します。コードは、ログ、メトリクス、トレース、サービス、変更イベント、インシデント、モニター、ダッシュボード、その他の Datadog API をクエリするためのヘルパーを含む `dd.*` ネームスペースを受け取り、構造化された値をエージェントに返します。これにより、マルチシグナル調査やアドホックデータ探索に必要なラウンドトリップの回数を減らすことができます。

- `checkout-api` サービスについて、過去 2 時間のエラーログ、レイテンシーメトリクス、最近のデプロイをまとめて取得し、どのデプロイがエラーのスパイクに対応しているかを教えてください。
- 過去 1 日間の`payments` サービスのエラースパンのカウント、モニターアラート、設定変更を比較し、同時に変化したものを特定します。
- `auth-service` の過去 1 時間のログの上位エラーパターンと CPU およびメモリのメトリクスを相関付けて、エラーがリソースプレッシャーを反映しているかどうかを確認します。

## ダッシュボード {#dashboards}

[ダッシュボード][46] の取得、作成、更新、削除のためのツール、ウィジェットスキーマのリファレンスと検証も含む。

### `get_datadog_dashboard`{#get-datadog-dashboard}
*ツールセット: **コア**、**ダッシュボード***\
*必要な権限: `Dashboards Read`および`User Access Read`*\
ID で Datadog の [ダッシュボード][46] を取得し、そのタイトル、説明、タグ、およびウィジェットを返します。最初に `search_datadog_dashboards` を使用してダッシュボード IDを見つけてください。

- ダッシュボード `ps7-mn3-kwf` の詳細を取得します。
- インフラストラクチャー概要ダッシュボードのウィジェットとレイアウトを表示します。
- このダッシュボードに設定されているテンプレート変数を取得します。

### `upsert_datadog_dashboard`{#upsert-datadog-dashboard}
*ツールセット: **コア**、**ダッシュボード***\
*必要な権限: `Dashboards Read` および `Dashboards Write`*\
Datadog の [ダッシュボード][46] を作成または更新します。既存のダッシュボードを更新するには、ダッシュボード ID を指定します。新しいダッシュボードを作成するには、ID を省略します。ウィジェットを構築する前に、`get_widget_reference` を呼び出してウィジェットスキーマを取得してください。

- すべてのホストの CPU とメモリ使用量を表示するダッシュボードを作成します。
- ダッシュボード `abc-123-def` にエラー率の時系列ウィジェットを追加します。
- 私のサービス概要ダッシュボードのタイトルと説明を更新します。

### `delete_datadog_dashboard`{#delete-datadog-dashboard}
*ツールセット: **ダッシュボード***\
*必要な権限: `Dashboards Read` および `Dashboards Write`*\
ID によって Datadog の [ダッシュボード][46] を永久に削除します。この操作は元に戻せません。最初に `search_datadog_dashboards` を使用してダッシュボード IDを見つけてください。

- ダッシュボード `ps7-mn3-kwf` を削除します。
- 古いステージング環境のダッシュボードを削除します。

### `get_widget_reference`{#get-widget-reference}
*ツールセット: **ダッシュボード***\
*必要な権限: `Dashboards Read` または `Dashboards Write` または `Notebooks Read`*\
ダッシュボードウィジェットタイプのスキーマと構築手順を返します。ウィジェット定義は JSON オブジェクトです。このツールは、スキーマを表す TypeScript 型定義と、クエリパターン、数式構文、一般的な落とし穴をカバーする構築手順を返します。これは、`upsert_datadog_dashboard` でウィジェットを生成する前に呼び出してください。

- 時系列ウィジェットのスキーマを取得します。
- トップリストとクエリテーブルウィジェットの構築方法を教えてください。
- 散布図ウィジェットのスキーマは何ですか？

### `validate_dashboard_widget`{#validate-dashboard-widget}
*ツールセット: **ダッシュボード***\
*必要な権限: `Dashboards Read` または `Dashboards Write` または `Notebooks Read`*\
ウィジェット定義がダッシュボードスキーマに準拠しているかどうか検証します。これは、`upsert_datadog_dashboard` に渡す前にウィジェットの JSON を確認するために使用します。

- ダッシュボードを作成する前に、自分の時系列ウィジェット定義を検証します。
- このクエリテーブルウィジェットの JSON が正しいかどうか確認します。

### `ask_widget_expert`{#ask-widget-expert}
*ツールセット: **ダッシュボード***\
*必要な権限: `Dashboards Read` または `Dashboards Write` または `Notebooks Read`*\
Datadog ウィジェットの専門家に対して、ウィジェットの設定、スキーマ、クエリ構文、フィールドの使用、デバッグ、または落とし穴について質問します。特定の質問に最適: スキーマの検索、フィールドの明確化、既存のウィジェット定義のデバッグ、または特定のウィジェットタイプの動作を理解すること。

- トップリストにはどの response_format を使用すべきですか？
- 散布図ウィジェットのスキーマは何ですか？
- このウィジェットで、カウントであるはずの値に小数値が表示されている理由をデバッグする方法について教えてください。
- 棒グラフと折れ線グラフの両方を表示するように時系列を設定するにはどうすればよいですか？

## Database Monitoring {#database-monitoring}

[Database Monitoring][26] と対話するためのツール。

### `find_datadog_database_instances`{#find-datadog-database-instances}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
DBM 調査のためのデータベースインスタンスを発見し、ランク付けします。これは、`database_instance` パラメーターを必要とする他の DBM ツールの前に呼び出します。APM トレースまたはスパン ID、タグ、またはその両方を受け入れ、一致するインスタンスを見つけ、その健康状態を評価し、ランク付けします。

- 1 時間前からのトレース `abc123` に関連するデータベースインスタンスを見つけます。
- どの PostgreSQL インスタンスが `cluster_name:payments-prod` に一致しますか？
- サービス `checkout-api` の健全性状態に基づいてデータベースインスタンスをランク付けします。

### `get_datadog_database_calling_services`{#get-datadog-database-calling-services}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
データベースクエリを呼び出す上流の APM サービスとリソースを特定します。APM とデータベースの境界を越えた根本原因分析のため、データベースの活動とアプリケーショントレースの相関関係を調べます。

- どのサービスが `db-prod-1` で最も遅いクエリを呼び出していますか？
- クエリシグニチャ `abc123def` の主要な呼び出し元を見つけます。
- 支払いデータベースに負荷をかけている APM リソースを表示してください。

### `get_datadog_database_explain_plans`{#get-datadog-database-explain-plans}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
特定の時間枠内のクエリシグニチャに対する PostgreSQL の説明プランを取得します。オペレーターツリー、インデックス使用状況、および推定コストを含む、簡略化された計画構造を、コストでソートして返します。

- `db-prod-1` についてのクエリシグニチャ `abc123def` の説明プランを取得します。
- この遅いクエリについてコスト最高の実行計画を表示してください。
- クエリシグニチャ `xyz789` の過去 1 日間の計画のバリエーションは何ですか？

### `get_datadog_database_health_signals`{#get-datadog-database-health-signals}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
CPU の飽和、再起動、クエリのレイテンシー、ブロッキングなどの潜在的な PostgreSQL の問題を検出するために、健全性チェックを実行します。回帰期間をベース期間と比較します。

- 過去 1 時間の `db-prod-1` に対して健全性チェックを実行し、直前の 1 時間と比較します。
- インシデント発生時前後のデータベースの健全性チェックを実施します。
- 支払いデータベースの回帰を説明するシグナルは何ですか？

### `get_datadog_database_query_performance`{#get-datadog-database-query-performance}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
特定の PostgreSQL クエリのパフォーマンスを分析します。スループット、平均レイテンシー、実行時間、実行あたりの行数、キャッシュヒット率、入出力統計、接続活動、待機イベント、トランザクションの持続時間を返し、全体の統計と時間バケット分析の両方を提供します。

- 過去 1 時間のクエリシグニチャ `abc123def` のパフォーマンスを分析します。
- なぜこのクエリは PostgreSQL 本番インスタンスで遅いのですか？
- クエリシグニチャ `xyz789` の待機イベントとキャッシュヒット率を表示します。

### `get_datadog_database_query_statement`{#get-datadog-database-query-statement}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
特定のクエリシグニチャの SQL 文のテキストを取得します。これは、調査と報告を目的として、シグニチャハッシュを具体的な SQL にマッピングするために使用します。

- クエリシグニチャ `abc123def` の SQL を取得します。
- `db-prod-1` について、このクエリハッシュの背後にあるステートメントを表示してください。
- シグニチャ `xyz789` はどのクエリに対応していますか？

### `get_datadog_database_recommendations`{#get-datadog-database-recommendations}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
データベース、クエリ、テーブル、ホスト、またはインデックスに対するライブデータベースの推奨事項を取得します。ステータス、重大度、および正規化スコープブロックについて一致する推奨事項を返します。影響を受けるインスタンス、クエリ署名、テーブル、インデックス、サービス、プラン、インフラストラクチャー識別子を強調表示します。

- `db-prod-1` のオープンデータベース推奨事項を表示します。
- 支払いデータベースの欠落しているインデックスに関する推奨事項のリスト。
- クエリ署名 `abc123def` に対する、重大度の高い推奨事項を取得します。

### `get_datadog_database_schemas`{#get-datadog-database-schemas}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
1 つ以上のデータベースオブジェクトのスキーマ定義 (列、インデックス、外部キー、パーティション)を取得します。テーブル名、そしてスキーマ、データベース、およびインスタンス修飾子をオプションとして受け入れます。

- `orders` テーブルのスキーマを表示してください。
- `db-prod-1` について、`public.users` の列とインデックスを取得します。
- `payments` テーブルの外部キーを取得します。

### `optimize_datadog_database_query`{#optimize-datadog-database-query}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
PostgreSQL クエリを分析して、決定論的ルールを使用して最適化の機会を見つけます。クエリの書き換え、アンチパターン検出 (`SELECT *`、`ORDER BY` なしの `OFFSET`、`LIMIT` なしの `ORDER BY`)、欠落インデックスの提案、トランザクション中のアイドル影響分析を返します。SQLテキストまたはクエリ署名のいずれかを受け入れます。

- 支払いデータベースに対するクエリシグニチャ `abc123def` を最適化します。
- この SQL にインデックスとアンチパターンの欠落があるかどうかを確認します。
- `db-prod-1` について、最も遅いクエリの書き換えを提案します。

### `search_datadog_database_plans`{#search-datadog-database-plans}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
[Database Monitoring][26] クエリ実行計画を検索します。これにより、データベースエンジンがクエリを実行する方法 (インデックス使用状況、結合戦略、コスト見積もりを含む) が示されます。これは、クエリのパフォーマンスを分析したり、最適化の機会を特定したりするために使用します。

- 過去 1 時間について、`host:db-prod-1` の遅いクエリの実行計画を表示してください。
- 本番データベースについて `@db.plan.type:explain_analyze` を伴うクエリ計画を見つけます。
- 実行時間が 1 秒を超える、`@db.user:app_user` によるクエリの実行計画を取得します。

### `search_datadog_database_samples`{#search-datadog-database-samples}
*ツールセット: **dbm***\
*必要な権限: `Database Monitoring Read`*\
[Database Monitoring][26] クエリサンプルを検索します。それらは、個々のクエリ実行とパフォーマンスメトリクスを表します。これは、データベースの活動パターンを分析したり、遅いクエリを特定したり、データベースのパフォーマンス問題を調査したりするために使用します。

- `db:mydb` からの、`@duration:>1000000000` (実行時間が 1 秒を超える) によるクエリサンプルを表示してください。
- `host:db-prod-1`に関して、遅いクエリを見つけ、`@db.user:app_user` でフィルタリングします。
- `@db.query_signature:abc123def` の最近のクエリサンプルを取得し、パフォーマンスパターンを分析します。

## DDSQL {#ddsql}

インフラストラクチャーリソース、ログ、メトリクス、RUM、スパン、その他の Datadog データソースをサポートする SQL 方言である [DDSQL][41] を使用して Datadog データをクエリするためのツール

### `ddsql_get_spec`{#ddsql-get-spec}
*ツールセット: **ddsql***\
DDSQLのコンパクトな機能仕様を取得します。サポートされている SQL 関数、SQL キーワード、および DDSQL 固有の標準 PostgreSQL との違いが含まれます。このツールは、クエリを作成する前に、サポートされている構文を理解するために呼び出します。

- DDSQL でサポートされている SQL 関数は何ですか？
- DDSQL のクエリ構文ルールと PostgreSQL との違いを教えてください。
- DDSQL で使用できる集約関数は何ですか？

### `ddsql_schema_search_tables`{#ddsql-schema-search-tables}
*ツールセット: **ddsql***\
DDSQL データセットを検索し、テーブル (公開データソースとリファレンステーブル) と利用可能なメトリクスを返します。

- DDSQL でクエリ可能なテーブルは何ですか？
- Kubernetes に関連する DDSQL テーブルを検索します。
- DDSQL によるクエリが可能なメトリクスを教えてください。

### `ddsql_schema_get_table_columns`{#ddsql-schema-get-table-columns}
*ツールセット: **ddsql***\
スキーマメタデータから DDSQL テーブルの静的 SQL 列を取得します。

- `aws.ec2_instance` テーブルで利用可能なのはどの列ですか？
- `k8s.pods` テーブルのスキーマを表示してください。

### `ddsql_schema_search_unstructured_fields`{#ddsql-schema-search-unstructured-fields}
*ツールセット: **ddsql***\
ログ、RUM、スパンなどの非構造化 DDSQL ソースのフィールドを検索し、頻度でソートしてランク付けします。このツールは、`ddsql_schema_get_table_columns` に戻す前に、検索可能なソースについてのスキーマを発見するために使用します。

- DDSQL ログで利用可能なフィールドは何ですか？
- 私の RUM データで `service` に関連するフィールドを見つけてください。
- 私のスパンデータで最も一般的なフィールドを教えてください。

### `ddsql_run_query`{#ddsql-run-query}
*ツールセット: **ddsql***\
DDSQL クエリを実行し、結果を返します。SQL 構文を使用して、インフラストラクチャーリソース、ログ、メトリクス、RUM、スパン、およびその他の Datadog データソースをクエリする機能がサポートされます。構文の詳細については、[DDSQL リファレンス][42] を参照してください。

- 各 AWS リージョンで実行中の EC2 インスタンスは何台ですか？
- 過去 1 時間のエラーログ数で上位 10 のサービスを表示してください。
- 過去 24 時間のホストごとの平均 CPU 使用率をクエリします。

### `ddsql_create_link`{#ddsql-create-link}
*ツールセット: **ddsql***\
特定のクエリが事前入力済みの [DDSQL Editor][41] への Datadog UI リンクを生成します。

- このクエリのための DDSQL Editor リンクを生成します。
- 私のインフラストラクチャークエリを使用した DDSQL Editor への共有可能リンクを作成してください。

## Error Tracking {#error-tracking}

Datadog [Error Tracking][49] とやり取りするためのツール。

### `search_datadog_error_tracking_issues`{#search-datadog-error-tracking-issues}
*ツールセット: **error-tracking***\
*必要な権限: `Error Tracking Read`*\
データソース (RUM、ログ、トレース) 全体から Error Tracking の問題を検索します。

- 過去 24 時間の checkout サービスにおける Error Tracking 問題をすべて表示してください。
- 過去 1 週間のうち私のアプリケーションで最も頻繁に発生したエラーは何ですか？
- 本番環境で `service:api` による Error Tracking 問題を見つけます。

### `get_datadog_error_tracking_issue`{#get-datadog-error-tracking-issue}
*ツールセット: **error-tracking***\
*必要な権限: `Cases Read` および `Error Tracking Read`*\
Datadog から特定の Error Tracking 問題に関する詳細情報を取得します。

- Error Tracking 問題 `550e8400-e29b-41d4-a716-446655440000`を解決する手助けをしてください。
- Error Tracking 問題 `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` にはどんな影響がありますか？
- Error Tracking 問題 `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f` を再現するためのテストケースを作成します。

### `analyze_datadog_error_tracking_errors`{#analyze-datadog-error-tracking-errors}
*ツールセット: **error-tracking***\
*必要な権限: `Error Tracking Read` および `Timeseries`*\
SQL クエリを使用して Datadog Error Tracking を分析して、カウント、集計、数値分析を実行します。個々のエラーサンプルを操作しますが、Issue (エラーのグループ) は操作しません。

- 過去 1 時間のエラーをサービス別にカウントします。
- 過去 1 週間のチェックアウトサービスにおける上位のエラータイプを表示します。
- エラーをバージョン別に内訳表示し、どのデプロイが問題を引き起こしたかを特定します。

### `update_datadog_error_tracking_issue`{#update-datadog-error-tracking-issue}
*ツールセット: **error-tracking***\
*必要な権限: `Cases Read`、`Cases Write`、`Error Tracking Read`、および `Error Tracking Write`*\
Datadog の Error Tracking の問題の状態または担当者を更新します。

- Error Tracking Issue `550e8400-e29b-41d4-a716-446655440000` を解決済みとしてマークします。
- Error Tracking Issue `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` を私に割り当てます。
- Error Tracking Issue `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f` の状態を無視済みに設定します。

## Feature Flag {#feature-flags}

[Feature Flag][51] を管理するためのツール、フラグとその環境の作成、リスト表示、更新を含む

### `list_datadog_feature_flags`{#list-datadog-feature-flags}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read` および `Feature Flag Read`*\
ページネーション対応のフィーチャーフラグのリスト。

- 私の組織のフィーチャーフラグをすべて表示してください。
- チェックアウトサービスのフィーチャーフラグをリスト表示します。

### `get_datadog_feature_flag`{#get-datadog-feature-flag}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read` および `Feature Flag Read`*\
特定のフィーチャーフラグの詳細を取得します。

- フィーチャーフラグ `dark-mode-enabled` の詳細を取得します。
- フラグ `new-checkout-flow` の現在の設定は何ですか？

### `create_datadog_feature_flag`{#create-datadog-feature-flag}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read` および `Feature Flag Write`*\
新しいフィーチャーフラグを作成します。

- 段階的な展開のために `enable-new-dashboard` というフィーチャーフラグを作成します。
- ベータ機能のために新しいブール型フィーチャーフラグを設定します。

### `list_datadog_feature_flag_environments`{#list-datadog-feature-flag-environments}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read`*\
フィーチャーフラグのために設定された環境のリスト。

- 利用可能なフィーチャーフラグ環境を表示してください。
- フィーチャーフラグでターゲットにできる環境は何ですか？

### `list_datadog_feature_flag_allocations`{#list-datadog-feature-flag-allocations}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read` および `Feature Flag Read`*\
特定の環境におけるフィーチャーフラグの割り当てのリスト。

- 本番環境でフラグ `new-checkout-flow` の割り当てルールを表示してください。

### `update_datadog_feature_flag_environment`{#update-datadog-feature-flag-environment}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read` および `Feature Flag Write`*\
特定の環境におけるフィーチャーフラグの設定を更新します。

- ステージング環境で `dark-mode` フラグを有効にします。
- 本番環境のユーザーの 50% にフラグ `new-checkout-flow` を展開します。

### `check_datadog_flag_implementation`{#check-datadog-flag-implementation}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Environment Read` および `Feature Flag Read`*\
フィーチャーフラグがコードに実装されているかどうかを確認します。

- 私のコードベースに `enable-new-dashboard` フラグが実装されていることを確認します。

### `sync_datadog_feature_flag_allocations`{#sync-datadog-feature-flag-allocations}
*ツールセット: **feature-flags***\
*必要な権限: `Feature Flag Write`*\
特定の環境のフィーチャーフラグの割り当てを同期します。

- 本番環境でフラグ `new-checkout-flow` の割り当てを同期します。

## Kubernetes {#kubernetes}

すべてのクラスターの中から [Kubernetes][55] リソースを検索し、説明し、マニフェストを取得するためのツール

### `search_datadog_k8s_resources`{#search-datadog-k8s-resources}
*ツールセット: **kubernetes***\
*必要な権限: `Hosts Read` および `Teams Read`*\
すべてのクラスターを通じて [Kubernetes][55] リソースを検索します。このツールは、デプロイ、Pod、ノードなどの Kubernetes リソースの状態を確認するために、`kubectl` の代わりに使用します。このツールは、ローカルクラスターへのアクセスを必要とせず、すべてのクラスターで動作し、タグ付きの強化データを返します。各結果に特定のタグキーを含めたり、リソース間の関係を調査するために親リソース名を含めたりすることができます (Pod が属するデプロイなど)。

- ネームスペース `production` 内でステータスが `CrashLoopBackOff`のすべての Pod を表示します。
- クラスター `general2` 内でロールアウトが進行中のデプロイを見つけます。
- 私のクラスター内のすべてのノードを、CPU 使用率でソートして一覧表示します。
- デプロイを `service`および `env`でグループ化して、私のサービスが環境間でどのように分布しているかを確認します。

### `describe_datadog_k8s_resource`{#describe-datadog-k8s-resource}
*ツールセット: **kubernetes***\
*必要な権限: `Hosts Read`*\
特定の [Kubernetes][55] リソースに関する詳細情報を取得します。これには、CPU およびメモリのリクエストと制限などのリソース固有の詳細、そしてオプションでタグ、ラベル、注釈、マニフェスト履歴、親リソース、および [Kubernetes Explorer][55] へのディープリンクが含まれます。このツールは、`kubectl describe` の代わりに使用します。リソースは、以前の検索での UID で特定するか、リソース識別子 (クラスター、ネームスペース、リソース名) を指定することにより特定します。生マニフェスト全体については、`get_datadog_k8s_manifest` を使用します。

- クラスター `my-app`、ネームスペース `prod` 内の Pod `default` について記述します。
- ネームスペース `default`、クラスター `staging` のデプロイ `api-server` の詳細を取得します。
- この Kubernetes リソースのタグと注釈を表示します。

### `get_datadog_k8s_manifest`{#get-datadog-k8s-manifest}
*ツールセット: **kubernetes***\
*必要な権限: `Hosts Read`*\
特定の [Kubernetes][55] リソースの YAML マニフェストを取得します。このツールは、`kubectl get -o yaml` の代わりに使用します。`kubectl` JSONPath 式を使用して特定のサブツリーを抽出する機能、また、`status` と `managedFields` を省略して応答サイズを削減する簡潔モードがサポートされています。

- クラスター `prod`、ネームスペース `default` の Pod `my-app` のマニフェストを取得します。
- ネームスペース `default`、クラスター `staging` のデプロイ `api-server` のコンテナポートを表示してください。
- Pod `my-app` のマニフェストからコンテナイメージを取得します。

## ネットワーク {#networks}

[Cloud Network Monitoring][31]分析および [Network Device Monitoring][32] のためのツール

### `analyze_cloud_network_monitoring`{#analyze-cloud-network-monitoring}
*ツールセット: **ネットワーク***\
*必要な権限: `Network Connections Read`*\
[Cloud Network Monitoring][31] のデータを使用してネットワークレベルの問題を調査し、ネットワークフローデータを分析して再送信率の上昇などの異常を検出します。

- 私の Web サーバーとデータベースクラスターの間のネットワークトラフィックを分析します。
- `service:api` と `service:payments` の間に再送信の問題はありますか？
- 本番環境のネットワークフローデータに異常がないか調査します。

### `search_ndm_devices`{#search-ndm-devices}
*ツールセット: **ネットワーク***\
*必要な権限: `NDM Read`*\
Datadog [Network Device Monitoring][32] によって監視されているネットワークデバイス (ルーター、スイッチ、ファイアウォール) を検索します。

- データセンター `us-east-1` 内のすべてのネットワークデバイスを表示してください。
- エラーを報告しているファイアウォールを見つけます。
- 監視されているすべてのスイッチとそのステータスのリストを取得します。

### `get_ndm_device`{#get-ndm-device}
*ツールセット: **ネットワーク***\
*必要な権限: `NDM Read`*\
デバイス ID で指定する特定のネットワークデバイスについての詳細情報を取得します。

- ネットワークデバイス `device:abc123` の詳細を取得します。
- このルーターの構成とステータスを表示してください。

### `search_ndm_interfaces`{#search-ndm-interfaces}
*ツールセット: **ネットワーク***\
*必要な権限: `NDM Read`*\
特定のデバイスのすべてのネットワークインターフェースを取得します。

- デバイス `device:abc123` のすべてのインターフェースを表示してください。
- 私のコアルーターのインターフェースステータスのリストを取得します。

## オンボーディング {#onboarding}

エージェント的なオンボーディングツールによる Datadog のセットアップと構成のガイド

### `browser_onboarding`{#browser-onboarding}
*ツールセット: **オンボーディング***\
*必要な権限: `RUM Apps Read`*\
Browser RUM を Datadog にオンボーディングする手順を案内します。

- 私の Web アプリケーションのために Browser RUM Monitoring を設定するのを手伝ってください。

### `devices_onboarding`{#devices-onboarding}
*ツールセット: **オンボーディング***\
*必要な権限: `RUM Apps Read`*\
デバイスを Datadog モニタリングにオンボーディングする手順を案内します。

- Datadog でデバイスモニタリングを設定する手助けをしてください。

### `kubernetes_onboarding`{#kubernetes-onboarding}
*ツールセット: **オンボーディング***\
*必要な権限: なし*\
Kubernetes クラスターを Datadog にオンボーディングする手順を案内します。

- 私の Kubernetes クラスターの Datadog モニタリングを設定する手助けをしてください。

### `llm_observability_onboarding`{#llm-observability-onboarding}
*ツールセット: **オンボーディング***\
Datadog で Agent Observability をオンボーディングする手順を案内します。

- AI アプリケーション向けに Agent Observability を設定する手助けをしてください。

### `test_optimization_onboarding`{#test-optimization-onboarding}
*ツールセット: **オンボーディング***\
*必要な権限: なし*\
Test Optimization を Datadog にオンボーディングする手順を案内します。

- 私の CI パイプラインのために Test Optimization を設定する手助けをしてください。

### `serverless_onboarding`{#serverless-onboarding}
*ツールセット: **オンボーディング***\
*必要な権限: なし*\
サーバーレスアプリケーションを Datadog にオンボーディングする手順を案内します。AWS Lambda 関数や GCP Cloud Run および Cloud Run 関数 (Gen 2) が含まれます。

- 私の AWS Lambda 関数を Datadog でモニタリングする手助けをしてください。
- 私の GCP Cloud Run サービスを Datadog でモニタリングする手助けをしてください。
- 私の GCP Cloud Run 関数を Datadog でモニタリングする手助けをしてください。

### `source_map_uploads`{#source-map-uploads}
*ツールセット: **オンボーディング***\
RUM エラーマッピングのためにソースマップをアップロードする手順を案内します。

- ソースマップをアップロードして、RUM エラーに元のソースコードを表示する手助けをしてください。

## プロファイリング {#profiling}
サービス、ランタイム、トレースで [Continuous Profiler][62] データを発見、探索、分析するための読み取り専用ツール

### `get_profiling_profile_types`{#get-profiling-profile-types}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
指定されたクエリコンテキスト *(クエリ文字列と時間範囲) またはトレース/スパンコンテキストで利用可能なプロファイルタイプとファミリーを返します。最初にこれを使用して、クエリ可能な対象を確認します。

- 過去 1 時間において `service:checkout-api` に対して利用可能だったプロファイルタイプを表示してください。
- トレース `7d5d747be160e280504c099d984bcfe0` に利用できるプロファイルファミリーはどれですか？
- 本番環境で利用可能なプロファイルタイプをリストします。

### `get_profiling_services`{#get-profiling-services}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
プロファイルされたサービスとそのスコープ内のプロファイリングファミリーをリストします。結果は順不同であり、重要性や活動レベルを示唆するものではありません。

- 本番環境でプロファイリングが有効なすべてのサービスをリストします。
- JVM プロファイリングデータを含むサービスを表示してください。
- 支払いチームの環境でプロファイルされているサービスは何ですか？

### `get_profiling_runtime_ids`{#get-profiling-runtime-ids}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
スコープ内のプロファイルされた個々のランタイム ID (プロセスまたはコンテナ) を返します。デフォルトでは CPU に基づく上位 1 件が返されます。limit パラメーターで返す件数を制御します。

-  `service:checkout-api` の CPU に基づく上位10 件のランタイム ID を表示してください。
- 私の Go サービスにおいて CPU 使用率が最も高いランタイムを取得します。
- 過去 1 時間における支払いトサービスのプロファイルされたランタイム ID をリストします。

### `get_profiling_service_insights`{#get-profiling-service-insights}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
事前に計算されたサービスインサイトを返します。これには、全体的な要約、コンテキストシグナル (影響を受けたメソッド、パッケージ、プロセス)、および推奨される次のステップが含まれます。

-  `service:checkout-api` のプロファイリングインサイトを表示します。
- 支払いサービスでフラグが立てられているパフォーマンスの問題は何ですか？
- Java サービスのプロファイリングに関する推奨事項を取得します。

### `explore_profiling_flame_graph`{#explore-profiling-flame-graph}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
指定されたプロファイルタイプに対する値の寄与に基づく上位 N 件のスタックトレースを返します。フレーム、エンドポイント、または属性の正規表現によるフィルタリングがサポートされています。単一サービス。`service:family` または traceContext のいずれかを受け入れます。

- 過去 1 時間における `service:checkout-api`の CPU フレームグラフを表示します。
- 支払いサービスの上位割り当てホットスポットを検出します。
- トレース `7d5d747be160e280504c099d984bcfe0` のフレームグラフを探索します。

### `explore_profiling_call_graph`{#explore-profiling-call-graph}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
指定されたプロファイルタイプのホット関数のコールグラフビュー (呼び出し元から呼び出し先へのエッジ) を返します。デフォルトでは上位 20 ノード、5% のカットオフ、ノードごとに 5 エッジです。単一サービス。

-  `service:checkout-api` のホット CPU 関数のコールグラフを表示します。
- 私のGoサービスにおいて、最も遅いパスに対して呼び出しを行っている関数は何ですか？
- 支払いサービスの割り当てコールグラフを取得します。

### `explore_profiling_timeline`{#explore-profiling-timeline}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
スレッド、ガベージコレクションなどのレーングループのタイムラインを、CPU および I/O アクティビティと共に返します。スパン内のレイテンシーボトルネックを特定するため、クリティカルパスモード (Go 専用; traceContext が必要) がサポートされています。

- 過去 15 分間の `service:checkout-api` のスレッドタイムラインを表示します。
- Go サービスにおけるトレース `abc123`のクリティカルパスを検出します。
- レイテンシースパイク周辺のガベージコレクションと CPU アクティビティを調査します。

### `get_profiling_timeseries`{#get-profiling-timeseries}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
プロファイリングデータを時系列 (レートメトリクス) として集計して返します。トレンド、サービス間比較、回帰検出に最適です。フレームフィールド、コンテキスト、およびタグによる groupBy がサポートされています。

- 過去 24 時間の `service:checkout-api` の CPU プロファイル時系列を表示します。
- バージョンごとにグループ化された Java サービスの割り当て率を比較します。
- デプロイごとにグループ化された過去 1 週間のプロファイル回帰を検出します。

### `get_profiling_tag_names`{#get-profiling-tag-names}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
プロファイリングデータのフィルタリングに利用可能なタグ名 (service、host、env、version、family、runtime-id、kube_*) を検出します。関連性に基づいてソートされた最大 50 件の結果を返します。

- 本番環境でプロファイリングデータをフィルタリングするために利用可能なタグ名は何ですか？
- `service:checkout-api` のプロファイリングタグ名をリストします。

### `get_profiling_tag_values`{#get-profiling-tag-values}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
特定のプロファイリングタグの値を返します ( 例: サービスタグのすべての値)。頻度に基づいてソートされた最大 50 件の結果を返します。

- 過去 1 時間において、どの支払いサービスバージョンのプロファイリングデータがありましたか？
- `service:checkout-api` に対して利用可能なプロファイリングデータが最も多かった 2 つのデータセンターはどれですか？

### `get_profiling_fields`{#get-profiling-fields}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
`get_profiling_timeseries` の groupBy および filterパラメーターで使用可能なフレームおよびコンテキストファセットフィールド (`@stack.function` や `@labels.trace_endpoint` など) を検出します。sampleType でスコープされています。

- CPU プロファイルのどのフレームフィールドでグループ化できますか？
- 割り当てプロファイルに利用可能なファセットフィールドを表示します。
- `service:checkout-api` のために時系列をフィルタリングできるコンテキストフィールドをリストします。

### `get_profiling_field_values`{#get-profiling-field-values}
*ツールセット: **プロファイリング***\
*必要な権限: `Continuous Profiler Read`*\
`get_profiling_fields` で検出された特定のフレームまたはコンテキストフィールドの値を返します。頻度でソートされています。

- 私の CPU プロファイルにおける `@stack.function` の上位の値を表示します。
- `@labels.trace_endpoint` から上位エンドポイント値を取得します。
- 割り当てプロファイルのパッケージフィールドの値をリストします。

## リファレンステーブル {#reference-tables}

[リファレンステーブル][45] を管理するためのツール。テーブルのリスト表示、行の読み取り、行の追加、クラウドストレージからのテーブル作成が含まれます。

### `list_reference_tables`{#list-reference-tables}
*ツールセット **リファレンステーブル***\
組織内の [リファレンステーブル][45] をリスト表示および検索します。名前によるフィルタリングとソートが可能です。

- 私の組織内のすべてのリファレンステーブルをリスト表示します。
- 名前に `customer` が含まれるリファレンステーブルを見つけます。
- リファレンステーブルを最終更新時刻でソートして表示してください。

### `get_reference_table_rows`{#get-reference-table-rows}
*ツールセット **リファレンステーブル***\
プライマリキーの値を使用することにより、リファレンステーブルから特定の行を取得します。最初に `list_reference_tables` を使用してテーブル ID とスキーマを調べてください。

- ユーザーリファレンステーブルからプライマリキーが `user001` と `user002` の行を取得します。
- アカウントテーブルでアカウント ID が `acct-123`のエントリを検索します。

### `append_reference_table_rows`{#append-reference-table-rows}
*ツールセット **リファレンステーブル***\
既存のリファレンステーブルに新しい行を追加します。この操作は行を追加するだけであり、既存のデータを変更することも削除することもありません。各行には、テーブルのスキーマからのすべての必須フィールドが含まれている必要があります。それには、プライマリキーのフィールドも含まれます。

- ユーザー `user003` について、名前 `Carol` と年齢 `28` を含む新しい行をユーザーリファレンステーブルに追加します。
- これらの 5 つの新しいアカウントエントリをアカウントリファレンステーブルに追加します。

### `create_reference_table`{#create-reference-table}
*ツールセット **リファレンステーブル***\
Amazon S3、Google Cloud Storage、または Azure Blob Storage の CSV ファイルに基づいた新しいリファレンステーブルを作成します。サポートされるのは、`INT32` および `STRING` のフィールドタイプだけです。

- 私の S3 バケット `my-data-bucket` 内のファイル `allowlist.csv` から `ip_allowlist` という名前のリファレンステーブルを作成します。
- 自動同期が有効な新しい GCS 対応のリファレンステーブル `customer_tiers` をセットアップします。

## リモートアクション {#remote-actions}

<div class="alert alert-info"> <code>remote-actions</code> ツールセットはプレビュー中です。<a href="https://www.datadoghq.com/product-preview/datadog-agent-mcp/">アクセスのためにサインアップします。</a></div>

Datadog Agent でインスツルメントされたホストで読み取り専用の診断を実行するためのツール。コマンドは[制限付きシェルインタープリター][63]を使用して、プライベートアクションランナー (PAR) を介してホストに到達します。すべてのコマンドは、書き込みアクセス、外部バイナリ実行、ネットワークエグレスのない安全な Go ビルトインとして実行されます。許可されたコマンドのリストは、Datadog バックエンドから Agent バージョンごとに制御されます。

### `datadog_remote_action_restricted_shell_run_command`{#datadog-remote-action-restricted-shell-run-command}
*ツールセット: **remote-actions***\
*必要な権限: `Connections Resolve` および `Private Action Runner Contribute`*\
指定されたホストで読み取り専用のシェルコマンドを実行します。サポートされているコマンドには、`cat`、`ls`、`head`、`tail`、`find`、`grep`、`sed`、`cut`、`sort`、`uniq`、`wc`、`ping`、`ss`、および `ip` が含まれます。パイプ、ループ、条件、変数の代入、およびグロビングがサポートされています。

- ホスト `prod-web-01` の Datadog Agent ログの最後の 100 行を表示します。
- 過去 1 時間においてホスト `/var/log/app/` の `db-replica-3` にあったすべての ERROR エントリを検出します。
- ホスト `/etc/datadog-agent/datadog.yaml` の `prod-worker-07`の内容を取得します。

## RUM {#rum}

[Real User Monitoring][58] のためのツールであり、アプリケーションの解決、パフォーマンスの要約、ビューのために集約されたインサイトの提示、メトリクスの探索、アプリケーション構成の検査などの機能が含まれています。

<div class="alert alert-info"> <code>rum</code> ツールセットはプレビュー中です。アクセスをリクエストするには、<a href="/help">Datadog サポート</a>にお問い合わせください。</div>

### `search_rum_applications` {#search-rum-applications}
*ツールセット: **rum***\
*必要な権限: `RUM Apps Read`*\
RUM アプリケーションをリストし、後続の RUM ツール呼び出しに使用する `application_id` を解決します。

- "checkout-web" という名前の RUM アプリケーションを見つけ、そのアプリケーション ID を返します。
- 私の RUM アプリケーションをすべてリストアップします。

### `get_rum_summary`{#get-rum-summary}
*ツールセット: **rum***\
*必要な権限: `RUM Apps Read` および `Timeseries`*\
RUM アプリケーションの重要なメトリクスの要約と前期比の差分を返します。

- "checkout-web" RUM アプリケーションの過去 24 時間のパフォーマンスを要約します。
- 私のメイン RUM アプリケーションにおける Core Web Vitals は、前週比でどのように変化しましたか？

### `get_rum_insight`{#get-rum-insight}
*ツールセット: **rum***\
*必要な権限: `RUM Apps Read`*\
RUM ビューの集約されたインサイト (ウォーフォール、時間がかかっているタスク、重要な分布、タグ分析) を返します。

- "shop" アプリケーションの `/checkout` ビューについて、過去 1 時間における集計されたリソースウォーターフォールを表示します。
- ホームページにおけるデバイスタイプ別の INP 分布の内訳を示します。

### `search_rum_metrics`{#search-rum-metrics}
*ツールセット: **rum***\
*必要な権限: `RUM Apps Read`*\
アプリケーションの RUM メトリクスを調査します。これには、標準のメトリクスとカスタムメトリクスが含まれます。

- "checkout-web" アプリケーションで定義されているカスタム RUM メトリクスをリストします。
- メインアプリケーションのページ読み込み時間に関連する利用可能な RUM メトリクスを表示します。

### `search_rum_retention_filters`{#search-rum-retention-filters}
*ツールセット: **rum***\
*必要な権限: `RUM Retention Filters Read`*\
RUM アプリケーションで設定された保持フィルターをリストします。読み取り専用で、[RUM without Limits][59]をご利用のお客様が利用できます。

- "checkout-web" アプリケーションで設定されている保持フィルターをリストします。
- 私のメイン RUM アプリケーションにある保持フィルターは何ですか？

## セキュリティ {#security}

コードセキュリティスキャン、分析、検索、トリアージ[セキュリティシグナル][53]、[検出ルール][60]と[抑制][61]の管理、[セキュリティファインディング][54]の分析のためのツール

### `datadog_secrets_scan`{#datadog-secrets-scan}
*ツールセット: **セキュリティ***\
ハードコーディングされたシークレットと資格情報のコードをスキャンし、AWS キー、API キー、パスワード、トークン、プライベートキー、データベース資格情報を検出します。

- 私のコードをスキャンしてハードコーディングされたシークレットを検索します。
- このファイルにコミットされた API キーやパスワードがあるかどうか確認します。

### `get_datadog_security_signals_schema`{#get-datadog-security-signals-schema}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Signals Read`*\
セキュリティシグナルに利用可能なフィールドとそのタイプを返します。シグナルタイプは `@workflow.rule.type`の値にマッピングされます。これには、`Log Detection`、`Application Security`、`Workload Security` などがあります。

- セキュリティシグナルをフィルタリングするために使用できるフィールドは何ですか？
- Cloud SIEM シグナルの利用可能なフィールドを表示します。
- シグナルルールタイプフィールドに対して有効な enum 値は何ですか？

### `search_datadog_security_signals`{#search-datadog-security-signals}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Signals Read`*\
Datadog セキュリティモニタリングからセキュリティシグナルを検索し、取得します。これには、Cloud SIEM シグナル、アプリおよび API 保護シグナル、Workload Protection シグナルが含まれます。

- 過去 24 時間のセキュリティシグナルを表示します。
- 私の本番環境に関連する高い重大度のセキュリティシグナルを見つけます。
- 疑わしいログイン試行によってトリガーされた Cloud SIEM シグナルのリストを作成します。

### `analyze_datadog_security_signals`{#analyze-datadog-security-signals}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Signals Read` および `Timeseries`*\
SQL クエリを使用して、集約、グループ化、トレンド分析のためにセキュリティシグナルを分析します。これは、カウント、上位 N、および内訳時間変化を取得するために使用します。特定のシグナルを一覧表示または取得するには、`search_datadog_security_signals` または `get_datadog_security_signal` を使用してください。

- 過去 7 日間のシグナルカウント上位 10 の SIEM ルールを表示してください。
- セキュリティレベルが高および重大のセキュリティシグナルの件数を、重大度別に分類して取得します。
- 昨日、サービスごとに発生した App & API 保護シグナルは何件ですか？

### `get_datadog_security_signal`{#get-datadog-security-signal}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Signals Read`*\
ID によって単一のセキュリティシグナルの詳細を取得します。属性、ルール情報、トリアージ状態、タグ、およびケースの相関関係を含みます。

- セキュリティシグナル `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu` の詳細を取得します。
- このシグナルのルール、トリアージ状態、およびリンクされたケースを表示します。

### `update_datadog_security_signals_triage`{#update-datadog-security-signals-triage}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Signals Write`*\
1 つ以上のセキュリティシグナルのトリアージ状態または担当者を一括で更新します (最大 500 シグナル)。シグナル ID のリスト、または更新するすべてのシグナルに一致するフィルタークエリのいずれかを受け入れます。

- 過去 24 時間における "総当りログイン" ルールからすべてのシグナルをアーカイブします。
- `service:checkout` のすべてのオープンシグナルを under review に設定し、私に割り当てます。
- シグナル `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`を "テスト" という理由でアーカイブ済みとしてマークします。

### `get_datadog_security_detection_rules_schema`{#get-datadog-security-detection-rules-schema}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Rules Read`*\
検出ルールの作成参照とスキーマを返します。サポートされているルールタイプ、検出方法、クエリ構文、タグの規則、および有効な検索ファセットをカバーします。検出ルールを作成またはクエリする前にこのツールを使用してください。現在サポートされているルールタイプ: ログの検出、APIセキュリティ、および AppSec。

- しきい値検出ルールを作成する際に利用可能なフィールドとオプションは何ですか？
- シーケンス検出ルールのスキーマを表示します。
- 検出ルール API で使用されるタグの規則とクエリ構文は何ですか？

### `list_datadog_security_detection_rules`{#list-datadog-security-detection-rules}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Rules Read`*\
組織の検出ルールをリストします。検出ルールによって、セキュリティシグナルの生成条件が定義されます。結果をサーバー側でフィルタリングするためのオプションの自由形式クエリを受け入れます。特定のルールの完全な定義を取得するには `get_datadog_security_detection_rule` を使用してください。

- 有効なCloud SIEM 検出ルールをすべてリストします。
- `source:cloudtrail` でタグ付けされた検出ルールを表示します。
- 不可能移動を検出するために構成されているルールはどれですか？

### `get_datadog_security_detection_rule`{#get-datadog-security-detection-rule}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Rules Read`*\
ID に基づいて 1 つの検出ルールの完全な定義を取得します。これにはクエリ、ケース、オプション、フィルター、およびメタデータが含まれます。ルール ID を検出するには `list_datadog_security_detection_rules` を使用してください。

- 検出ルール `abc-123-def` の完全な定義を取得します。
- このシグナルを生成しているルールのクエリとケースを表示します。
- この検出ルールが使用しているしきい値とグループ化フィールドは何ですか？

### `get_datadog_security_suppressions`{#get-datadog-security-suppressions}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Suppressions Read`*\
セキュリティモニタリング抑制を取得します。3 つのモード (すべての抑制のリスト、ID による 1 つの抑制の取得、特定の検出ルールに影響を与える抑制の取得) がサポートされています。抑制は、条件に一致する場合に検出ルールによってシグナルが生成されないようにします。

- すべてのアクティブな抑制をリストします。
- 検出ルール `abc-123-def` の抑制を表示します。
- 抑制 `sup-456-xyz` の完全な詳細を取得します。

### `create_datadog_security_suppression`{#create-datadog-security-suppression}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Suppressions Write`*\
検出ルールが特定の条件でシグナルを生成しないようにする新しい抑制ルールを作成します。少なくとも `suppression_query` または`data_exclusion_query` のいずれか １つを指定する必要があります。

- IP `10.0.0.1` のブルートフォースルールからのシグナルを抑制します。
- 環境 `staging` を無視する異常検出ルールの抑制を作成します。
- `@usr.email` がテストアカウントに一致する場合、ルール `abc-123-def` からのシグナルを抑制します。

### `update_datadog_security_suppression`{#update-datadog-security-suppression}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Suppressions Write`*\
既存の抑制ルールを更新します。指定されたフィールドのみを変更します。`version` を指定すると、同時編集の上書きを防ぐオプティミスティック同時実行制御が有効になります。

- ブルートフォースルールの抑制を更新して、`10.0.0.2` も除外します。
- 抑制 `sup-456-xyz` の有効期限を次の四半期に変更します。
- 異常検出ルールの抑制を削除せずに無効にします。

### `delete_datadog_security_suppression`{#delete-datadog-security-suppression}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Suppressions Write`*\
抑制ルールを削除します。

- 抑制 `sup-456-xyz` を削除します。
- ブルートフォース検出ルールを停止していた抑制を削除します。

### `get_datadog_security_findings_schema`{#get-datadog-security-findings-schema}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Read`*\
セキュリティの発見にためのスキーマ (利用可能なフィールドとそのタイプ) を返します。`analyze_datadog_security_findings` を使用する前に、まずこれを呼び出してクエリ可能なフィールドを検出します。発見のタイプによるフィルタリングと応答サイズの制御がサポートされます。

- セキュリティファインディングに利用可能なフィールドは何ですか？
- ライブラリの脆弱性検出結果のスキーマを表示します。
- 誤設定の発見に関する説明を含む完全なスキーマを取得します。

### `analyze_datadog_security_findings`{#analyze-datadog-security-findings}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Read` および `Timeseries`*\
SQL クエリを使用してセキュリティファインディングを分析するための主要なツール。柔軟な SQL 集計、フィルタリング、グループ化を使用して、過去 24 時間のライブデータをクエリします。利用可能なフィールドを検出するためにまず `get_datadog_security_findings_schema` を呼び出し、その後このツールを使用してクエリします。

- 最も重要な発見があった上位 10 件のルールを表示します。
- 重大度と発見タイプ別にオープンな発見の数をカウントします。
- 利用可能なエクスプロイトがあるライブラリの脆弱性を検出し、リソース別にグループ化します。

### `search_datadog_security_findings`{#search-datadog-security-findings}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Read`*\
セキュリティファインディングの詳細を取得するためのフォールバックツール。ほとんどの分析タスクには `analyze_datadog_security_findings` を推奨します。このツールを使用するのは、完全な発見オブジェクトが必要な場合や SQL クエリでは不十分な場合だけにしてください。

- 私の AWS 環境における重要な発見の詳細を取得します。
- 特定のルールに対する完全な発見オブジェクトを取得します。
- すべてのオープンなアイデンティティリスクの発見と完全なメタデータをリストします。

### `get_datadog_security_findings_ticket_suggestions`{#get-datadog-security-findings-ticket-suggestions}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Read`、`Cases Read`*\
チケット発行のセキュリティファインディングに関するランク付けされたプロジェクト提案を返します。30 日間の使用データがある Case Management、Jira、および ServiceNow のプロジェクトを表示します。使用するプロジェクトを確認するため、`create_datadog_security_findings_ticket` の前にこれを呼び出します。

- セキュリティファインディングに関してチケットを作成するために使用できる Jira プロジェクトは何ですか？
- チケット発行に利用可能な ServiceNow プロジェクトを表示します。
- 発見に最も使用されるケース管理プロジェクトはどれですか？

### `create_datadog_security_findings_ticket`{#create-datadog-security-findings-ticket}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Write`、`Cases Read`、`Cases Write`*\
セキュリティファインディングについて、Case Management のケース、Jira の課題、またはServiceNow のチケットを作成します。特定の発見 ID とプロジェクト ID が必要です。まず `get_datadog_security_findings_ticket_suggestions` を使用して、利用可能なプロジェクトを確認してください。

- プロジェクト SECURITY での重大な発見に対して Jira チケットを作成します。
- このルールによる発見に対して Case Management ケースを作成します。
- ライブラリの脆弱性に対して ServiceNow チケットを作成します。

### `detach_datadog_security_findings_ticket`{#detach-datadog-security-findings-ticket}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Write`、`Cases Write`*\
セキュリティファインディングを、リンクされているケースまたはチケットから切り離します。Jira と ServiceNow のチケットは Case Management を通じてリンクされているため、ケースを切り離すと下流のチケットも切り離されます。

- これらの発見を、リンクされた Jira チケットから切り離します。
- これらの発見のケースとの関連付けを削除します。

### `mute_datadog_security_findings`{#mute-datadog-security-findings}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Write`*\
アラートやダッシュボードに表示されないように抑制するため、セキュリティファインディングをミュートするか、またはミュート解除します。ミュート理由 (`PENDING_FIX`、`FALSE_POSITIVE`、`ACCEPTED_RISK`、または`OTHER`) が必要です。オプションで説明文と有効期限がサポートされています。

- これらの発見を誤検知としてミュートします。
- この設定ミスを許容されたリスクとして、90 日間の有効期限を設定してミュートします。
- 以前に修正保留中としてマークされた発見のミュートを解除します。

### `assign_datadog_security_findings`{#assign-datadog-security-findings}
*ツールセット: **セキュリティ***\
*必要な権限: `Security Monitoring Findings Write`*\
セキュリティファインディングをユーザーに割り当てるか、または割り当てを解除します。割り当てはリンクされているケースにも反映されます。割り当て解除する担当者 ID を省略します。

- これらの重大な発見をセキュリティチームのリーダーに割り当てます。
- もはや関連性のない発見の割り当てを解除します。
- このルールによるすべての発見を私に割り当てます。

## ソフトウェアデリバリー {#software-delivery}

ソフトウェアデリバリー ([CI Visibility][48] と [Test Optimization][24]) とやり取りするためのツール。

### `search_datadog_ci_pipeline_events`{#search-datadog-ci-pipeline-events}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `CI Visibility Read`*\
フィルターを使用して CI イベントを検索し、それらに関する詳細を返します。

- コミット `58b1488` のすべてのパイプラインを表示します。
- ブランチ `my-branch` での最新のパイプライン失敗を表示します。
- ブランチ `integration-test` で毎回失敗するジョブ `my-branch`の修正を提案します。

### `aggregate_datadog_ci_pipeline_events`{#aggregate-datadog-ci-pipeline-events}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `CI Visibility Read`*\
CI パイプラインイベントを集約して、統計データ、メトリクス、およびグループ化した分析を生成します。

- 過去 7 日間の平均ジョブ時間はどのくらいですか？
- 過去 2 週間で失敗したパイプラインは何件ありましたか？
- パイプライン名でグループ化されたパイプライン実行時間の 95 パーセンタイルを表示します。

### `get_datadog_flaky_tests`{#get-datadog-flaky-tests}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Test Optimization Read`*\
Datadog [Test Optimization][24] で変則的なテストを検索し、トリアージの詳細 (失敗率、カテゴリ、所有者、履歴、CI への影響) を返します。ページネーションとソート機能がサポートされています。

- `@team-abc` が所有するチェックアウトサービスのアクティブな不安定テストを検出し、失敗率でソートします。
- リポジトリ `github.com/org/repo` のブランチ `main` での不安定なテストを表示します。最新のテストから順に表示します。
- 修正の優先順位を付けることができるように、高い失敗率 (50% 以上) の `timeout` カテゴリの不安定なテストをリストします。

### `update_datadog_flaky_test_states`{#update-datadog-flaky-test-states}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Test Optimization Write`*\
1 つ以上の不安定なテストの状態を `quarantined` (失敗を抑制)、`disabled` (テストをスキップ)、`fixed` (解決済みとしてマーク)、または `active` (復元) に設定します。これは明示的なユーザーの承認を必要とする書き込み操作です。すべての状態変更は元に戻すことができます。

- リポジトリ `checkout-service` のすべてのアクティブな不安定テストを隔離します。
- 不安定なテスト `AuthServiceTest::testLogin` を修正済みとしてマークします。
- `@team-payments` が所有する、失敗率が 50％ を超える不安定なテストを無効にします。

### `aggregate_datadog_test_events`{#aggregate-datadog-test-events}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Test Optimization Read`*\
Datadog [Test Optimization] イベントを集約して、信頼性とパフォーマンスのトレンドを定量化します。集約関数、オプションのメトリクス、ファセットによるグループ化、および構成可能なテストレベルがサポートされます。

- 過去 1 週間の失敗したテストの数を、ブランチごとに集計します。
- 最も遅いテストスイートを特定するため、各テストスイートの 95 パーセンタイルの実行時間を表示します。
- すべての合格テストと不合格テストをカウントします。

### `search_datadog_test_events`{#search-datadog-test-events}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Test Optimization Read`*\
フィルターを使用して [Test Optimization][24] テストイベントを検索し、それに関する詳細を返します。

- 過去 24 時間における `main` ブランチでの失敗したテストを表示します。
- コミット `abc123` のテスト実行を取得し、合格したテスト実行と失敗したテスト実行を確認します。
- チェックアウトサービスの不安定なテスト実行をすべて表示します。
- `@team-name` が所有している失敗したテストを見つけます。

### `get_datadog_code_coverage_branch_summary`{#get-datadog-code-coverage-branch-summary}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Code Coverage read`*\
リポジトリブランチについて集約したコードカバレッジ要約メトリクスを取得します。それには、総カバレッジ、パッチカバレッジ、サービス/コード所有者の内訳が含まれます。

- ブランチ `main` の `github.com/my-org/my-repo` におけるコードカバレッジはどのくらいですか？
- `github.com/my-org/my-repo` の `release/1.x` ブランチのカバレッジ概要を表示します。

### `get_datadog_code_coverage_commit_summary`{#get-datadog-code-coverage-commit-summary}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Code Coverage read`*\
リポジトリコミットについて集約したコードカバレッジ要約メトリクスを取得します。それには、総カバレッジ、パッチカバレッジ、サービス/コード所有者の内訳が含まれます。

- `github.com/my-org/my-repo` のコミット `abc123abc123abc123abc123abc123abc123abcd` のコードカバレッジを表示します。
- 私のブランチの最新コミットに対するパッチカバレッジはどのくらいですか？

### `get_datadog_test_optimization_settings`{#get-datadog-test-optimization-settings}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Test Optimization Read`*\
サービスに対して有効になっている Test Optimization 機能を取得します。これには、Test Impact Analysis (ITR)、Early Flake Detection (EFD)、Auto Test Retries (ATR)、Failed Test Replay、Code Coverage コレクション、および PR コメントが含まれます。

- どの Test Optimization 機能が`auth-service`に対して有効になっていますか？
- チェックアウトサービスの Test Optimization 設定を表示します。

### `get_datadog_flaky_tests_management_policies`{#get-datadog-flaky-tests-management-policies}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Test Optimization Read`*\
リポジトリに設定された不安定なテストの管理ポリシーを取得します。これには、自動隔離ウィンドウ、ブランチルール、失敗率のしきい値、無効化ポリシー、および再試行設定が含まれます。

-  `github.com/my-org/my-repo`の不安定なテストの管理ポリシーを表示します。
- チェックアウトサービスリポジトリに設定されている自動隔離ルールは何ですか？

### `search_dora_deployments`{#search-dora-deployments}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `DORA Metrics Read`*\
フィルターを使用して DORA デプロイイベントを検索するか、ID によって 1 つのデプロイの詳細を取得します。

- 過去 7 日間の`checkout` サービスのデプロイを表示します。
- DORA デプロイ `abc123` の詳細を取得します。
- 今月において本番環境で失敗したデプロイメントを検出します。

### `aggregate_dora_deployments`{#aggregate-dora-deployments}
*ツールセット: **ソフトウェアデリバリー***\
*必要な権限: `Timeseries`*\
サービス、チーム、またはリポジトリの DORA メトリクス (デプロイ頻度、変更リードタイム、変更失敗率、回復時間) をスカラー値または時系列として返します。タイムウィンドウにわたるソフトウェアデリバリーのパフォーマンスに関する質問に使用します。

- 過去 30 日間における `checkout` サービスのデプロイ頻度と変更失敗率はどのようなものですか？
- この `payments` サービスの過去四半期の変更リードタイムの傾向を表示します。
- `auth-service` チームの 4 つの DORA メトリクスをすべて取得します。

## Synthetic {#synthetics}

Datadog の [Synthetic テスト][47] と対話するためのツール

### `get_synthetics_tests`{#get-synthetics-tests}
*ツールセット: **synthetics***\
*必要な権限: `Synthetics Read`*\
Datadog Synthetic HTTP API テストを検索します。

- エンドポイント `/v1/my/tested/endpoint` での Synthetic テストが失敗する理由を理解する手助けをしてください。
- 障害が発生しています。ドメイン `api.mycompany.com` で失敗した Synthetic テストをすべて検出してください。
- 過去 1 時間において、ウェブサイト`api.mycompany.com` 上の Synthetic テストはまだ動作していますか？

### `edit_synthetics_tests`{#edit-synthetics-tests}
*ツールセット: **synthetics***\
*必要な権限: `Synthetics Global Variable Read` および `Synthetics Read` および `Synthetics Write`*\
Datadog Synthetic HTTP API テストを編集します。

- エンドポイント `/v1/my/tested/endpoint` で定義されている Synthetic テストのアサーションを改善します。
- テスト `aaa-bbb-ccc` を一時停止し、ロケーションをヨーロッパのロケーションのみに設定します。
- テスト `aaa-bbb-ccc` に私のチームタグを追加します。

### `synthetics_test_wizard`{#synthetics-test-wizard}
*ツールセット: **synthetics***\
*必要な権限: `Synthetics Global Variable Read` および `Synthetics Read` および `Synthetics Write`*\
Datadog Synthetics HTTP API テストをプレビューし、作成します。

- このコードファイルで定義されているすべてのエンドポイントで Synthetic テストを作成します。
- `/path/to/endpoint` で Synthetic テストを作成します。
- ドメイン `mycompany.com` が稼働しているかどうかを確認する Synthetic テストを作成します。

## ウィジェット {#widgets}

[ダッシュボード][46]および[ノートブック][57]ウィジェットの視覚化、検証、タイプ変換のためのツール。

### `get_widget`{#get-widget}
*ツールセット: **ウィジェット***\
*必要な権限: `Dashboards Read` または `Timeseries` または `Monitors Read` または `APM Read` または `RUM Apps Read`*\
Datadog のメトリクス、トレース、ログ、およびその他のデータを取得し、インタラクティブなチャートとして視覚化します。3 つのモード (ダッシュボードの検索、直接定義、URL 解決) がサポートされています。

- 過去 1 時間の `service:api` の CPU 使用率の時系列を表示します。
- ダッシュボード `2228368921512806` のウィジェット `abc-123-def` のデータを取得します。
- この Datadog 共有リンクからデータを視覚化します。

### `get_widget_reference_compressed`{#get-widget-reference-compressed}
*ツールセット: **ウィジェット***\
*必要な権限: `Dashboards Read` または `Dashboards Write` または `Notebooks Read` または `Notebooks Write`*\
ウィジェットタイプの圧縮 TypeScript スキーマと構築手順を返します。ウィジェット JSON を生成する前に呼び出してください。グループウィジェットを構築する際は、重複排除のために `group` と意図した子ウィジェットタイプの両方を 1 つの呼び出しに含めてください。

- 時系列ウィジェットの圧縮スキーマを取得します。
- トップリストおよびクエリテーブルウィジェットの構築手順を表示します。

### `search_datadog_widgets`{#search-datadog-widgets}
*ツールセット: **ウィジェット***\
*必要な権限: `Dashboards Read` または `Dashboards Write` または `Notebooks Read` または `Notebooks Write`*\
すべての Datadog ダッシュボードでウィジェットに関する情報 (ID、タイトル、および基になるクエリを含む) を検索して取得します。

- `system.cpu.user` メトリクスをクエリするすべての時系列ウィジェットを見つけます。
- すべてのダッシュボードにおけるエラー率に関連するウィジェットを検索します。

### `swap_widget_type`{#swap-widget-type}
*ツールセット: **ウィジェット***\
*必要な権限: `Dashboards Read` または `Dashboards Write` または `Notebooks Read` または `Notebooks Write`*\
クエリを保持しながら、ウィジェット定義の視覚化タイプを変換します。数式リクエストベースのウィジェットタイプ (timeseries、query_value、top list、query_table、treemap、sunburst、distribution、heatmap、geomap、list_stream) がサポートされています。

- この時系列ウィジェットをトップリストに変換します。
- クエリテーブルウィジェットをツリーマップ視覚化に変更します。

### `validate_notebook_cell`{#validate-notebook-cell}
*ツールセット: **ウィジェット***\
*必要な権限: `Timeseries`*\
ノートブックセルウィジェット定義を検証します (analysis_sql セルの SQL の正確性を含む)。analysis_sql セルを検証する際は、その上流データソースウィジェットを含めて、エンドポイントが SQL 式をそのスキーマに照らしてチェックできるようにします。

- 保存する前にこれらのノートブックセル定義を検証します。
- 分析 SQL セルが上流ウィジェットの有効な列を参照しているかどうかを確認します。

### `validate_notebook_cells`{#validate-notebook-cells}
*ツールセット: **ウィジェット***\
*必要な権限: `Timeseries`*\
複数のノートブックセルウィジェット定義を 1 回の呼び出しで検証します (analysis_sql セルの SQL の正確性を含む)。

- このノートブックのすべてのセルを公開する前に検証します。
- これらの 3 つの分析セルに SQL エラーがないか確認します。

### `verify_widget_data`{#verify-widget-data}
*ツールセット: **ウィジェット***\
*必要な権限: `Dashboards Read` または `Timeseries` または `Monitors Read` または `APM Read` または `RUM Apps Read`*\
ウィジェット定義が過去 1 時間のデータを返すかどうかを検証します。ダッシュボードにウィジェットを追加した後で、クエリが実際のデータを返すことを確認するために呼び出します。ウィジェットごとに、データが見つかったかどうかを示す 1 つの結果を返し、見つからなかった場合は理由を示します。

- これらのウィジェット定義がデータを返すかどうかを確認します。
- ダッシュボードに追加されたウィジェットが実際のメトリクスを表示しているかどうかを検証します。

### `visualize_tabular_data`{#visualize-tabular-data}
*ツールセット: **ウィジェット***\
*必要な権限: 特定の権限は必要ありません。*\
表形式のデータをインタラクティブな視覚化 (sunburst、ツリーマップ、またはトップリスト) としてレンダリングします。クエリからデータを集約した後で、階層関係やランキングを視覚化するために使用します。

- このグループ化されたメトリックデータを sunburstチャートとして視覚化します。
- この集約データをツリーマップの内訳として表示します。

## ワークフロー {#workflows}

[Workflow Automation][39] のためのツール。エージェント使用のためのワークフローのリスト表示、検査、実行、構成を含みます。

### `list_datadog_workflows`{#list-datadog-workflows}
*ツールセット: **ワークフロー***\
*必要な権限: `Workflows Read`*\
[Workflow Automation][39] ワークフローをリスト表示したり検索したりします。名前、タグ、所有者、ハンドル、トリガータイプ (`monitor`、`schedule`、`api`、`incident`など) によるフィルタリングがサポートされています。結果は、`name` や`updatedAt` などのフィールドでソートできます。

- `team:platform` でタグ付けされたすべての公開ワークフローを表示します。
- エージェントトリガーが設定されているワークフローのリストを表示します。
- Alice Smith が所有するインシデントレスポンスに関連するすべてのワークフローを見つけます。

### `get_datadog_workflow`{#get-datadog-workflow}
*ツールセット: **ワークフロー***\
*必要な権限: `Workflows Read`*\
特定のワークフローに関する詳細情報を取得します。それには、トリガー、ステップ、コネクション、入力スキーマが含まれます。

- ワークフロー`00000000-0000-0000-0000-000000000000` の詳細を取得します。
- デプロイロールバックワークフローの入力パラメーターとステップを表示します。
- このワークフローに設定されているトリガーは何ですか？

### `execute_datadog_workflow`{#execute-datadog-workflow}
*ツールセット: **ワークフロー***\
*必要な権限: `Workflows Run`*\
エージェントトリガーのある公開済みワークフローを実行します。オプションとして、ワークフローの入力スキーマのマッチングのための入力パラメーターを指定できます。

- 重大度 `high` のサービス `checkout-api` に対してインシデントエスカレーションワークフローを実行します。
- 支払いサービスのデプロイメントロールバックワークフローを実行します。
- この調査のコンテキストを使用して、オンコール通知ワークフローをトリガーします。

**注**: ワークフローは公開されており、エージェントトリガーが構成されている必要があります。必要に応じて、`update_datadog_workflow_with_agent_trigger`を使用して追加してください。

### `get_datadog_workflow_instance`{#get-datadog-workflow-instance}
*ツールセット: **ワークフロー***\
*必要な権限: `Workflows Read`*\
ステップの結果や出力など、ワークフロー実行インスタンスのステータスと詳細情報を取得します。

- 私がトリガーしたワークフローの実行ステータスは何ですか？
- インシデントエスカレーションワークフローは正常に完了しましたか？
- ワークフローインスタンス `00000000-0000-0000-0000-000000000000` からの詳細な出力を表示します。

### `update_datadog_workflow_with_agent_trigger`{#update-datadog-workflow-with-agent-trigger}
*ツールセット: **ワークフロー***\
*必要な権限: `Workflows Write`*\
ワークフローにエージェントトリガーを追加し、それを公開して AI エージェントによって実行できるようにします。

- ここから実行できるように、デプロイロールバックワークフローにエージェントトリガーを追加します。
- エージェントによってトリガーできるようにインシデントレスポンスワークフローを構成します。

[1]: /ja/mcp_server/setup#toolsets
[15]: /ja/api/latest/events/
[24]: /ja/tests/
[26]: /ja/database_monitoring/
[31]: /ja/network_monitoring/cloud_network_monitoring/
[32]: /ja/network_monitoring/devices/
[38]: /ja/service_management/case_management/
[39]: /ja/actions/workflows/
[41]: /ja/ddsql_editor/
[42]: /ja/ddsql_reference/ddsql_default/
[45]: /ja/reference_tables/
[46]: /ja/dashboards/
[47]: /ja/synthetics/
[48]: /ja/continuous_integration/
[49]: /ja/error_tracking/
[50]: /ja/tracing/
[51]: /ja/feature_flags/
[53]: /ja/security/threats/security_signals/
[54]: /ja/security/misconfigurations/findings/
[55]: /ja/containers/monitoring/kubernetes_explorer/
[60]: /ja/security/detection_rules/
[61]: /ja/security/suppressions/
[62]: /ja/getting_started/profiler/
[56]: /ja/account_management/rbac/permissions/
[57]: /ja/notebooks/
[58]: /ja/real_user_monitoring/
[59]: /ja/real_user_monitoring/rum_without_limits/
[63]: /ja/agent/guide/rshell/
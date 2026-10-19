---
aliases:
- /ja/llm_observability/mcp_server/
description: Datadog MCP Server を使用して、AI エージェントを Agent Observability のトレースおよび実験に接続します。
further_reading:
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP Server
- link: /llm_observability/improve/experiments
  tag: ドキュメント
  text: Agent Observability 実験をセットアップして使用する
- link: /llm_observability/investigate
  tag: ドキュメント
  text: Agent Observability を利用してアプリケーションを監視する
- link: /llm_observability/build_with_ai/claude_code_skills
  tag: ガイド
  text: Claude Code Skills を使用して LLM アプリケーションを分析する
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: ブログ
  text: Datadog Agent Observability を使用してコーディングエージェントから AI アプリをデバッグおよび評価する
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: ブログ
  text: Bits Evals で AI エージェントの品質を向上させる
title: Agent Observability MCP およびスキル
---
## 概要{#overview}

[Datadog MCP Server][1] を使用すると、AI エージェントは Model Context Protocol (MCP) を介して [Agent Observability][2] データにアクセスできるようになります。`llmobs` ツールセットは、Cursor、Claude Code、OpenAI Codex などの AI 搭載クライアントから直接、トレースの検索と分析、スパンの詳細とコンテンツの調査、実験結果の評価を行うためのツールを提供します。

## セットアップ{#setup}

`llmobs` ツールセットを有効にして、MCP 対応クライアントを Datadog MCP Server に接続します。

<div class="alert alert-info">Cursor や VS Code 拡張機能の構成を含む詳細なセットアップ手順については、「<a href="/mcp_server/setup/">Datadog MCP Server のセットアップ</a>」を参照してください。</div>

### 前提条件{#prerequisites}

- Agent Observability データへのアクセス権限を持つ Datadog アカウント。
- MCP 対応クライアント (例: Claude Code、Codex CLI、Cursor、Gemini CLI、または Kiro CLI)。

### エンドポイント{#endpoint}

MCP サーバーのエンドポイントは、ご利用の [Datadog サイト][5]によって異なります。{{< ui >}}Datadog Site{{< /ui >}} セレクターを使用して、該当するサイトのエンドポイントを表示できます。Agent Observability および Core ツールセットを有効にするには、`?toolsets=llmobs,core` を末尾に追加します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したサイトのエンドポイント ({{< region-param key="dd_site_name" >}}):
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトではこの製品はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

### 接続{#connect}

可能な場合は、リモート認証を選択してください。リモート OAuth フローが環境によってブロックされる場合は、ローカルバイナリ認証を使用してください。

{{< tabs >}}
{{% tab "リモート認証" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
リモート認証では、MCP 仕様の [Streamable HTTP][1] トランスポートを使用します。

**Claude Code** (コマンドライン):

<pre><code>claude mcp add --transport http datadog-mcp "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"</code></pre>

**Codex CLI** (`~/.codex/config.toml`):

<pre><code>[mcp_servers.datadog]
url = "{{< region-param key="mcp_server_endpoint" >}}"
http_headers = { "X-Datadog-MCP-Toolsets" = "llmobs,core" }
</code></pre>

構成を追加した後、`codex mcp login datadog` を実行して OAuth フローを完了します。

**Gemini CLI、Kiro CLI、およびその他の MCP 対応クライアント**:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"
    }
  }
}
</code></pre>

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトではこの製品はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "ローカルバイナリ認証" %}}

ローカルバイナリ認証では、MCP 仕様の [stdio][2] トランスポートを使用します。リモート認証が利用できない場合は、この方法を使用してください。

1. Datadog MCP Server バイナリをインストールします。

    ```bash
    curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
    ```

    The binary installs to `~/.local/bin/datadog_mcp_cli`.

2. OAuth ログインフローを完了します。

    ```bash
    datadog_mcp_cli login
    ```

3. AI クライアントを設定します。Claude Code の場合は、以下を `~/.claude.json` に追加し、コマンドパス内の `<USERNAME>` を置き換えます。

    ```json
    {
      "mcpServers": {
        "datadog": {
          "type": "stdio",
          "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
          "args": [],
          "env": {}
        }
      }
    }
    ```

    Alternatively, add the server with the Claude Code CLI:

    ```bash
    claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
    ```

[2]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
{{% /tab %}}
{{< /tabs >}}

### API キーで認証する{#authenticate-with-api-keys}

MCP サーバーはデフォルトで OAuth 2.0 を使用します。OAuth が利用できない場合は、Datadog [API キーとアプリケーションキー][6]を `DD_API_KEY` および`DD_APPLICATION_KEY` HTTP ヘッダーとして送信します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトではこの製品はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

セキュリティ上の理由から、API キーとアプリケーションキーのスコープは、必要な権限のみを持つ[サービスアカウント][7]に限定してください。

## Agent skills{#agent-skills}

Agent skills は、一般的な Agent Observability のワークフローを自動化する、AI コーディングエージェント向けの事前構築済み命令セットです。`agent-observability` スキルセットは、[Datadog agent-skills][8]リポジトリで利用可能です。これには、セッションの分類、障害の診断、実験の分析、`ddtrace.llmobs` SDK を使用した実験コードの生成、および本番環境のライブデータに対する評価器のブートストラップを行うための 6 つのスキルが含まれています。

### インストール{#install}

次のコマンドを使って `agent-observability` スキルをインストールします。

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

スキルを使用するには、`llmobs` MCP ツールセットが接続されている必要があります。まだ接続していない場合は、以下を実行してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトではこの製品はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

両方のコマンドを実行した後、Claude Code を再起動するとスキルが利用可能になります。

### 利用可能なスキル{#available-skills}

| スキル| 呼び出し方法| 機能|
|-------|-------------|-------------|
| セッション分類| `/agent-observability-session-classify` | セッション、トレース、またはバッチにおいてユーザーの意図が満たされたかどうかを分類する|
| トレース RCA| `/agent-observability-trace-rca` | 本番環境で失敗したトレースの根本原因を分析する|
| 実験アナライザ| `/agent-observability-experiment-analyzer` | LLM の実験結果を分析および比較する|
| 実験用 Python コード生成| `/agent-observability-experiment-py-bootstrap` | `ddtrace.llmobs` SDK を使用して実験用の Python コードを生成する。アプリを内部的に解析して実際の `task_fn` を接続し、`.env` ファイルから資格情報を自動検出し、評価器の選択を指示する自由形式の `--purpose` を受け入れる|
| 評価ブートストラップ| `/agent-observability-eval-bootstrap` | 評価器コードの生成、LLM-judge 評価器のオンライン公開、実験用データセットへのトレースのサンプリングを行う|
| 評価パイプライン| `/agent-observability-eval-pipeline` | 本番環境トレースから、評価器、データセット、実験、分析に至るまでの 6 段階のガイド付きパイプライン。`--stop-after` で途中で停止し、`--start-at` | でフローの途中から再開可能

#### セッション分類{#session-classification}

`/agent-observability-session-classify` は、特定のインタラクションにおいてユーザーの意図が満たされたかどうかを分類します。これは、最大 3 つのシグナルソースから情報を取得します: Agent Observability のトレース、RUM の行動データ、および Audit Trail イベント。このスキルは、裏付けとなる証拠とともに `yes / partial / no` 判定を返します。シグナルソースが追加されるたびに信頼性が向上します。

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### トレースの根本原因分析{#trace-root-cause-analysis}

`/agent-observability-trace-rca` は、LLM アプリケーションが期待どおりの結果を出力していない原因を診断します。利用可能な最も強力なシグナル (LLM-judge による評価結果、ランタイムエラー、または構造的な異常) に基づいて分析モードを選択し、構造化された RCA レポートを作成します。このレポートには、失敗の分類と、トレースの証拠に基づいた具体的な`BEFORE`/`AFTER` の修正案が含まれます。

Claude Code がコードベースにアクセスできる場合、このスキルは関連するソースファイルを検索し、インラインで差分を提案できます。

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### 評価器のブートストラップ{#evaluator-bootstrap}

`/agent-observability-eval-bootstrap` は、本番環境のトレースを分析し、観測された失敗モードに対応する一連の評価器を提案します。このツールは、以下の 4 種類のアーティファクトのいずれかを出力します: オフライン実験用の Python `BaseEvaluator`/`LLMJudge` クラス、フレームワークに依存しない JSON 仕様、Datadog に直接公開されるオンライン LLM-judge 評価器、または `--emit-dataset <path>` を介して本番環境のトレースからサンプリングされ `DatasetRecordRaw[]` 用に整形された `LLMObs.create_dataset(records=...)` JSON。dataset-emit モードは評価器のワークフローを完全にスキップし、実験への入力として使用するのに適したデータセットを作成します。

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

#### 実験アナライザ{#experiment-analyzer}

`/agent-observability-experiment-analyzer` は、実験結果を取得し、候補とベースラインの間で何が変化したかを明らかにします:  どのメトリクスが改善または悪化したか、そして候補がどこで期待どおりの性能を発揮できなかったか。

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

#### Python SDK を使用して実験コードを生成する{#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` は、`ddtrace.llmobs` SDK を使用し、標準的なリファレンスノートブックのスタイルに合わせた自己完結型の `.py` スクリプトまたは Jupyter `.ipynb` ノートブックを出力します。

データセットには、ローカルの `DatasetRecordRaw[]` JSON (ファイルにインライン化)、CSV (`LLMObs.create_dataset_from_csv` を介して実行時に読み込み)、名前による既存の Datadog データセット (`LLMObs.pull_dataset`)、またはデフォルトの小さなインライン 3 レコードサンプルを使用できます。生成されたすべての実験には、`config` と `tags` の両方で `generated_by=claude-code` と解決済みの `--purpose` がタグ付けされます。

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

#### エンドツーエンドの評価パイプライン{#end-to-end-eval-pipeline}

`/agent-observability-eval-pipeline` は、本番環境のトレースから始まり、評価器、データセット、実験、分析に至る一連のプロセスを 6 つのナレーション付きフェーズで順を追って説明し、各フェーズの間にはユーザーによるチェックポイントが設けられています。

1. **ml_app トレースの分類** – `ml_app` から最近のトレースをサンプリングして分類する
2. **根本原因分析** – 失敗したトレースがなぜ失敗しているのかを診断する
3. **評価器のブートストラップ** – 観測された失敗モードを対象とする評価器スイートを提案する
4. **データセットの作成と公開** – 入力と expected_output のペアを `DatasetRecordRaw[]` JSON に抽出し、プロジェクト (必要に応じて作成) で Datadog に公開する
5. **実験の生成と実行** – 実行可能な `.py` または `.ipynb` ファイルを生成します。これはデータセットを取得してアプリのタスク関数を接続し、エンドツーエンドで実行して `experiment.url` をキャプチャする。コード生成と実行の間には、実行前に生成されたファイルを検証できるインフェーズレビュービート (`run`/`edit`/`stop`) が設けられている
6. **実験の分析** — メトリクスの内訳と推奨事項を含む分析レポートを生成する

各フェーズには標準的な短い名前があり、これは `--start-at` および `--stop-after` オプションで指定する値と同じです。以下のテーブルは、各フェーズにおいてパイプラインが呼び出す可能性のある MCP ツールと、そのロジックの概要をまとめたものです。

| # | フェーズタイトル| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">ステージ名</span> | 呼び出される MCP ツール| 概要|
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | ml_app トレースの分類| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` |  `ml_app` の最近のルートスパンをサンプリングし、それぞれを成功/部分的な成功/失敗に分類し、共通のパターンを抽出します。|
| 2 | 根本原因分析| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | フェーズ 1 で特定された失敗スパンの完全なトレースを取得し、トレースツリーをたどって、各失敗をルートスパンおよび失敗モードに関連付けます。|
| 3 | 評価器のブートストラップ| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | なし (フェーズ 2 のレポートに基づくローカル推論)。`--publish` が設定されている場合は、オンライン LLM-judge 評価器を公開するための Datadog API 呼び出しを任意で実行| Python 評価器スイート (`sdk_code`) やフレームワークに依存しない JSON 仕様 (`data_only`) を生成するか、オンライン評価器を公開 (`publish`) する。|
| 4 | データセットの作成と公開| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans` (サンプリング用)。公開用には ddtrace SDK 経由の `LLMObs.create_dataset()` (MCP ではない)|  ルートスパンをサンプリングし、入力/expected_output ペアを抽出し、PII を削除した後、ローカル JSON に書き込んでから Datadog に公開します。|
| 5 | 実験の生成と実行| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals` (単発の起動時ビーコン – 接続性とテレメトリの確認)。ランタイムは ddtrace SDK を使用| アプリ内の LLM 呼び出し箇所を解析し、実際のエントリポイントに対して `task_fn` を接続する自己完結型の `.py` または `.ipynb` スクリプトを生成して実行します。|
| 6 | 実験の分析| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`、`get_llmobs_experiment_metric_values`、`list_llmobs_experiment_events`、`get_llmobs_experiment_event`、`get_llmobs_experiment_dimension_values` | 主要メトリクス、レコードごとのスコア、セグメントディメンション、ドリルダウン用イベントを取得し、構造化された分析レポートを生成します。|

`stop` で任意のチェックポイントで安全に停止し、後で `--start-at <stage-name>` で再開できます。再実行は不要です。従来の 3 段階の評価のみの動作を維持するには、`--stop-after eval-bootstrap` を指定します。

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

これらのスキルに関する完全なガイドと推奨されるエンドツーエンドのワークフローについては、「[Claude Code スキルを使用した LLM アプリケーションの分析][9]」を参照してください。

## ユースケース{#use-cases}

Agent Observability MCP ツールを使用すると、以下のような AI 支援ワークフローが可能になります。

- **エージェント実行のデバッグ**: ML アプリ、エラー状態、またはカスタムタグでトレースを検索し、スパン階層やコンテンツを調べて障害を特定します。
- **トレース構造の分析**: トレースの完全なスパンツリーを可視化し、エージェント、LLM、ツール、および検索がどのように相互作用しているかを把握します。
- **エージェントループの調査**: エージェントの段階的な実行ループを確認し、意思決定やツール呼び出しのパターンを理解します。
- **実験の評価**: 実験のメトリクスの統計要約を取得し、ディメンションセグメント間で結果を比較し、個々のイベントを検査します。
- **実験の作成**: `create_llmobs_experiment` を使用して新しい実験オブジェクトを登録し、モデル推論を実行せずに実験メタデータ (プロジェクト、データセット、説明、設定) を記録します。その後、`submit_llmobs_experiment_events` を使用して評価メトリクスを関連付けます。
- **実験パターンの発見**: メトリクスのパフォーマンスに基づいて実験イベントをフィルタリングおよび並べ替えを行い、パフォーマンスが最も高いケースと低いケースを特定します。
- **評価器の管理**: ML アプリケーション全体または組織全体にわたる評価器の構成を一覧表示、確認、作成、更新、および削除します。
- **パターンの探索**: パターン構成の一覧表示、実行ステータスのチェック、および発見されたトピック階層の閲覧を行い、ユーザーの質問内容やトラフィックの分布状況を把握します。
- **データセットの管理**: プロジェクトやデータセットの検索、データセットレコードの閲覧や確認、および実験で使用するデータセットへの新規レコードの追加を行います。

## 利用可能なツール{#available-tools}

`llmobs` ツールセットには、以下のツールが含まれています。

### トレースおよびスパンツール{#trace-and-span-tools}

`search_llmobs_spans`
: フィルターまたは生のクエリに一致するスパンを検索します。

`get_llmobs_trace`
: トレースの完全な構造をスパン階層ツリーとして取得します。これには、種類ごとのスパン数、エラーインジケーター、合計期間が含まれます。

`get_llmobs_span_details`
: 1 つまたは複数のスパンの詳細なメタデータを取得します。これには、タイミング、エラー情報、LLM の詳細 (モデル、トークン数)、メトリクス、評価が含まれます。

`get_llmobs_span_content`
: オプションの JSONPath 抽出を使用して、スパンフィールド (入力、出力、メッセージ、ドキュメント、またはメタデータ) の実際のコンテンツを取得します。

`find_llmobs_error_spans`
: トレース内のすべてのエラースパンを伝播コンテキストとともに検索し、スパンの種類ごとにエラーメッセージとスタックトレースをグループ化します。

`expand_llmobs_spans`
: `get_llmobs_trace` が折りたたまれたノードを返す場合に、段階的なツリー探索のために特定のスパンの子スパンを読み込みます。

`get_llmobs_agent_loop`
: エージェントの実行ループを時系列で取得し、各ステップ (LLM 呼び出し、ツール実行、意思決定など) を順を追って表示します。

### 実験ツール{#experiment-tools}

`create_llmobs_experiment`
: プロジェクト内に新しい Agent Observability 実験オブジェクトを作成します。モデルの推論を実行することなく実験を記録し、イベントやメトリクスをその実験に関連付けて報告できるようにします。`project_id` と `experiment_name` が必要です。作成された`experiment_id`とその解決された名前を返します。`submit_llmobs_experiment_events` を使用して評価メトリクスを添付するか、`update_llmobs_experiment` を使用してそのプロパティを変更します。

`get_llmobs_experiment_summary`
: すべての評価メトリクスについて、事前に計算された統計情報を含む実験の概要を取得します。他の実験ツールを使用する前に、まずこのツールを確認してください。

`list_llmobs_experiment_events`
: ディメンションやメトリクスによるフィルタリング、およびメトリクス値による並べ替えを行って、実験イベントを一覧表示します。

`get_llmobs_experiment_event`
: 入力、出力、期待される出力、すべてのメトリクス、ディメンションを含む、単一の実験イベントに関する詳細情報を取得します。

`get_llmobs_experiment_metric_values`
: 特定の評価メトリクスの統計分析結果を取得します。比較のためにディメンションでセグメント化することも可能です。

`get_llmobs_experiment_dimension_values`
: ディメンションのユニークな値とそれぞれのカウントを取得します。これは、有効なフィルターやセグメントの値を特定するのに役立ちます。

### 評価ツール{#evaluator-tools}

`list_llmobs_evals`
: すべての ML アプリケーションで設定されている LLM-judge 評価器を一覧表示します。各評価器の名前、ml_app、および有効ステータスを返します。

`list_llmobs_evals_by_ml_app`
: 特定の ML アプリケーションに対して設定された LLM-judge 評価器を一覧表示します。

`list_llmobs_feedback_labels`
: 特定の ML アプリケーションに対してユーザーから送信されたすべてのフィードバックラベルを一覧表示します。

`get_llmobs_evaluator`
: LLM-judge 評価器の構成を名前で取得します。これには、ターゲット(ml_app、サンプリング、フィルター)、LLM プロバイダー、およびジャッジプロンプトテンプレートが含まれます。

`create_or_update_llmobs_evaluator`
: LLM-judge 評価器の構成を作成または更新します。特定の ML アプリケーションを対象とし、オプションでフィルターやサンプリング率を指定できます。judge のモデルとプロンプトテンプレートによって、各スパンのスコアリング方法が定義されます。

`delete_llmobs_evaluator`
: 名前を指定して LLM-judge 評価器の構成を削除します。

### プロジェクトおよびデータセットツール{#project-and-dataset-tools}

`list_llmobs_projects`
:  組織内のすべての Agent Observability 実験プロジェクトを、作成日順 (新しい順) に一覧表示します。各プロジェクトの `id`、`name`、タイムスタンプ、およびページネーション用フィールド (`next_cursor`、`truncated`) を返します。プロジェクト名や ID が不明な場合に、それらを確認するために使用します。

`get_llmobs_project`
: ID または名前を指定して、Agent Observability 実験プロジェクトを検索します。データセットツールを呼び出す前に、これを使用して `project_id` UUID を解決します。

`list_llmobs_datasets`
: プロジェクト内のデータセットを一覧表示します。オプションで ID または名前によるフィルタリングも可能です。データセットのメタデータとページネーション用フィールドが返されます。`get_llmobs_dataset_records` または`add_llmobs_dataset_records` を使用する前に呼び出してください。これらのツールにはデータセット UUID が必要です。

`get_llmobs_dataset_records`
: 構造化されたプレビューとスキーマの概要を含むデータセットレコードを読み取ります。任意の JSON フィールド (`input`、`expected_output`、`metadata`) を読みやすいプレビュー形式に整形します。新しいレコードを作成する前に、`compute_schema=true` を使用して型情報を反映したレコード構造の概要を取得します。

`get_llmobs_full_dataset_records`
: 内容が省略されていない完全なレコードを最大 3 件取得します。`get_llmobs_dataset_records` でレコード ID を特定した後、個々のレコードを詳細に確認するために使用します。

`add_llmobs_dataset_records`
: プレビューと確定の 2 段階のフローを使用して、データセットにレコードを作成します。まず `confirmed=false` を呼び出して計画された書き込みをプレビューし、ユーザーの承認後に `confirmed=true` を呼び出してコミットします。

### Patterns ツール{#patterns-tools}

`list_llmobs_pattern_configs`
: 組織のすべての Patterns 構成を一覧表示します。各構成の `id`、`name`、`evp_query`、サンプリング設定、およびタイムスタンプが返されます。`config_id` を特定するには、まずこのエンドポイントを使用します。

`get_llmobs_pattern_config`
: 組織の Patterns 構成のうち、最近変更されたものを取得します。

`get_llmobs_pattern_run_status`
: 特定の構成に対する最新の Patterns 実行のステータスと、アクティビティごとの進捗状況を取得します。トピックの内容を確認する前に、クラスタリングが実行中か、完了したか、あるいは失敗したかをチェックするために使用します。

`list_llmobs_pattern_runs`
: 特定の構成に対する完了済みの Patterns 実行をすべて、新しい順に一覧表示します。各実行の `id`、`status`、タイムスタンプ、および使用された `config_snapshot` が返されます。

`get_llmobs_patterns`
: Patterns の実行によって検出されたトピック階層を取得します。トピックはレベルごとに整理されており、それぞれに `name`、`description`、および `point_count` があります。`run_id` を省略すると、最近完了した実行の情報を取得します。

`get_llmobs_patterns_with_points`
: 各リーフトピックにスパン ID がインライン化された実行のトピック階層を取得します。`include_metrics=true` を設定すると、スパンごとの所要時間、コスト、トークン数、評価結果も含まれます。

`get_llmobs_pattern_points`
: 単一のトピックに割り当てられたクラスタリングポイント (個々のスパン) のカーソルページネーションされたページを取得します。各ポイントには、`span_id`、`session_id`、およびスパン入力のプレビューが含まれます。ページネーションを継続するには、`next_page_token` を `page_token` として渡します。

### Annotation queue ツール{#annotation-queue-tools}

`list_llmobs_annotation_queues`
: 組織のすべての [annotation queues][10] を一覧表示します。

`create_llmobs_annotation_queue`
: トレースを人間がレビューするための annotation queue を作成します。作成時にラベルスキーマを定義することも可能です。

`update_llmobs_annotation_queue`
: annotation queue の名前、説明、またはラベルスキーマを更新します。

`delete_llmobs_annotation_queue`
: annotation queue を削除します。

`get_llmobs_annotation_label_schema`
: annotation queue のラベルスキーマを取得します。ラベルスキーマは、レビュー中にアノテーターが適用するラベルを定義するものです。

`update_llmobs_annotation_label_schema`
: annotation queue のラベルスキーマを作成または置換します。

`add_llmobs_annotation_queue_interactions`
: レビュー用の annotation queue に 1 つ以上のトレースを追加します。

`delete_llmobs_annotation_queue_interactions`
: annotation queue からトレースを削除します。

`get_llmobs_annotated_interactions`
: annotation queue 内のアノテーション済みインタラクションと、アノテーターがそれらに適用したラベルを取得します。

`get_llmobs_annotations_by_content_ids`
: コンテンツ ID を指定して、特定のトレースやセッションに適用されたアノテーションを取得します。

`upsert_llmobs_annotations`
: キュー内のインタラクションに適用されるアノテーションを作成または更新します。

`delete_llmobs_annotations`
: キュー内のインタラクションに適用されたアノテーションを削除します。

## 推奨されるワークフロー{#recommended-workflows}

### トレース分析{#trace-analysis}

1. **検索**: `search_llmobs_spans` を使用して、ML アプリ、ステータス、スパンの種類、またはカスタムタグでトレースを検索します。
2. **可視化**: `get_llmobs_trace` を使用して、スパン階層ツリー全体を表示します。
3. **調査**: `get_llmobs_span_details`を使用して、特定のスパンのメタデータ、タイミング、および評価を取得します。
4. **コンテンツの読み取り**: `get_llmobs_span_content` を使用して、実際の I/O、メッセージ、またはドキュメントを取得します。
5. **エラーのデバッグ**: `find_llmobs_error_spans` を使用して、伝播コンテキストを含むトレース内のすべてのエラーを特定します。
6. **展開**: `expand_llmobs_spans` を使用して、折りたたまれたスパンの子スパンを読み込み、詳細な調査を行います。
7. **エージェントレビュー**: `get_llmobs_agent_loop` を使用して、エージェントスパンのステップバイステップの実行フローを確認します。

### 実験の分析{#experiment-analysis}

1. **要約**: `get_llmobs_experiment_summary` を使用して、全体的な統計情報を取得し、利用可能なメトリクスとディメンションを確認します。
2. **イベントの参照**: `list_llmobs_experiment_events` を使用して、ディメンションでフィルタリングしたりメトリクスで並べ替えたりして、関心のあるイベントを検索します。
3. **イベントの調査**: `get_llmobs_experiment_event` を使用して、特定のイベントの詳細情報を表示します。
4. **メトリクスの分析**: `get_llmobs_experiment_metric_values` を使用して、パーセンタイル分布や True/False 率の取得、またはディメンションセグメント間での比較を行います。
5. **ディメンションの検出**: `get_llmobs_experiment_dimension_values` を使用して、フィルターやセグメントに指定可能な有効な値を検索します。

### データセット管理{#dataset-management}

1. **プロジェクトの検索**: `list_llmobs_projects` を使用してプロジェクトを参照します。各結果には、後続の呼び出しで必要となる `id` UUID が含まれています。プロジェクト名はわかっているものの UUID が不明な場合は、`get_llmobs_project` を使用して直接解決できます。
2. **データセットの検索**: `project_id` を指定して `list_llmobs_datasets` を使用し、データセットの一覧とそれぞれの UUID を取得します。
3. **データの理解**: `compute_schema=true` を指定して `get_llmobs_dataset_records` を使用し、レコードを閲覧して読み取りや書き込みを行う前にフィールドの型スケッチを取得します。
4. **特定のレコードの読み取り**: ID を指定して `get_llmobs_full_dataset_records` を使用し、最大 3 件のレコードの完全なコンテンツを取得します。
5. **レコードの追加**: `confirmed=false` を指定して `add_llmobs_dataset_records` を使用し、書き込みをプレビューし、ユーザーの承認後に `confirmed=true` を指定して実行します。

### パターン分析{#patterns-analysis}

1. **構成の一覧表示**: `list_llmobs_pattern_configs` を使用して、利用可能なパターン構成とその `config_id` 値を確認します。
2. **実行ステータスのチェック**: `get_llmobs_pattern_run_status` を使用して、最新の実行が完了しているか確認します。
3. **トピックの読み取り**: `get_llmobs_patterns` を使用して、名前、説明、コヒーレンススコアを含むトピック階層全体を取得します。
4. **スパンの検査**: `get_llmobs_patterns_with_points` を使用してスパン ID がインライン化されたトピックを取得するか、`get_llmobs_pattern_points` を使用して特定のトピックのスパンをページ単位で確認します。
5. **スパンコンテンツの分析**: `get_llmobs_span_details` または`get_llmobs_span_content` を前のステップの `span_id` 値とともに使用して、トピック内の個々のスパンの実際の入力、出力、およびメタデータを確認します。
6. **過去の実行の閲覧**: `list_llmobs_pattern_runs` を使用して過去の実行履歴を確認し、特定の `run_id` を渡してトピック分布の経時的な比較を行います。

## プロンプト例{#example-prompts}

接続後、次のようなプロンプトを試してください。

- 過去 1 週間の私の `customer-support-bot` アプリのエラートレースを確認してください。最も頻繁に発生している失敗パターンとその発生頻度をまとめ、優先的に修正すべきものを提案してください。
- 評価プロセスで低品​​質と判定されたエージェントの応答トレースを特定してください。入出力の内容を確認し、応答品質を向上させるためのシステムプロンプトの具体的な変更案を提示してください。
- 私のアプリの最近のエージェントのトレースを確認し、エージェントが必要以上にループしてしまったケースを特定してください。各ステップでの意思決定プロセスを分析し、不要なツール呼び出しを減らすためにツール説明文を改善する方法を提案してください。
- ユーザーから不適切な応答があったとの報告がありました。トレース ID は `trace-123` です。何が起きたのか (ユーザーの質問内容、各ステップでのエージェントの動作、問題が発生した箇所) を詳細に説明してください。コードの修正案を提示してください。
- 実験 `exp-456` を分析し、評価スコア別に分類したパフォーマンスの最も低いディメンションを Markdown 形式のテーブルにまとめてください。パフォーマンスがどこで、なぜ低下しているかを理解するのに役立つ関連情報列も併せて記載してください。
- 実験 `exp-123` (ベースライン) と実験 `exp-456` を比較してください。何が改善し、何が悪化したのか、その変化の度合いを要約してください。変更をリリースする価値があるかどうかについて推奨事項を提示してください。
- 実験 `exp-456` を要約し、スコアが最も低かったイベントの上位 5 件を特定してください。それぞれのイベントについて、入力、出力、および不合格となった評価項目を表示してください。
- プロジェクト `my-chatbot-project` に「prompt-v2-test」という新しい実験を作成し、評価メトリクスを紐付けられるようにその実験 ID を返してください。
- プロジェクト `my-project` 内のデータセットを一覧表示し、`qa-golden-set` というデータセットのレコードのサンプルとスキーマを表示してください。
- 新しいテストケースの CSV ファイルがあります。これらを `my-project` 内のデータセット `qa-golden-set` に新しいバージョンとして追加してください。最初にプレビューを表示してください。

## 他の Datadog ツールとの連携{#combine-with-other-datadog-tools}

セットアップ URL に含まれる `core` ツールセットを使用すると、AI エージェントは、Agent Observability 分析と自然に連携する追加の Datadog ツールにアクセスできるようになります。

### 分析を Datadog Notebooks にエクスポートする{#export-analysis-to-datadog-notebooks}

`core` ツールセットには `create_datadog_notebook` と `edit_datadog_notebook`が含まれており、AI エージェントは分析結果から直接 [Datadog Notebooks][3] を作成できるようになります。エージェントとのチャットで得られた知見を、トレースや実験データと並んで Datadog 上に保存される、共同編集および共有可能なノートブックにエクスポートできます。

次のようなプロンプトを試してみてください。

- 実験 `exp-456` を分析し、パフォーマンスが最も低いディメンションを特定して、評価スコア別の内訳を含むサマリーレポートを Datadog Notebook にエクスポートしてください。
- 過去 1 週間の `customer-support-bot` のエラートレースを確認し、一般的な失敗パターンや推奨される修正方法などの知見をまとめた Datadog Notebook を作成してください。

比較チャートや象限プロットなど、標準的な Datadog ウィジェットの枠を超えるカスタム可視化のために、Notebooks は [Mermaid ダイアグラム][4] もネイティブでレンダリングします。次のようなプロンプトを試してみてください。

- 実験 `exp-456` を分析し、各プロンプトバージョン間の `accuracy` スコアを比較して、各バージョンの平均スコアを示す Mermaid 棒グラフを含む Datadog Notebook に結果をエクスポートしてください。
- 実験 `exp-456` を分析し、一方の軸に `relevance`、もう一方の軸に `accuracy` を配置した Mermaid 象限チャート上に各プロンプトバージョンをプロットする Datadog Notebook をエクスポートしてください。その際、両方のディメンションでパフォーマンスが低いバージョンを特定してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/setup/
[2]: /ja/llm_observability/
[3]: /ja/notebooks/
[4]: /ja/notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /ja/getting_started/site/
[6]: /ja/account_management/api-app-keys/
[7]: /ja/account_management/org_settings/service_accounts/
[8]: https://github.com/datadog-labs/agent-skills
[9]: /ja/llm_observability/build_with_ai/claude_code_skills
[10]: /ja/llm_observability/investigate/annotation_queues
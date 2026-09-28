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
  text: Agent Observability の実験のセットアップと使用
- link: /llm_observability/investigate
  tag: ドキュメント
  text: Agent Observability でのアプリケーションの監視
- link: /llm_observability/build_with_ai/claude_code_skills
  tag: ガイド
  text: Claude Code スキルを使用した LLM アプリケーションの分析
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: ブログ
  text: Datadog Agent Observability を使用してコーディングエージェントから AI アプリをデバッグおよび評価する
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: ブログ
  text: Bits Evals で AI エージェントの品質を向上させる
title: Agent Observability MCP およびスキル
---
## 概要 {#overview}

[Datadog MCP Server][1] を使用すると、AI エージェントが Model Context Protocol (MCP) を通じて [Agent Observability][2] データにアクセスできるようになります。`llmobs` ツールセットには、トレースの検索と分析、スパンの詳細とコンテンツの調査、および実験結果の評価を AI 搭載クライアント (Cursor、Claude Code、OpenAI Codex など) から直接行うためのツールが用意されています。

## セットアップ {#setup}

`llmobs` ツールセットを有効にした Datadog MCP Server に MCP 互換クライアントを接続します。

<div class="alert alert-info">Cursor や VS Code の拡張機能の構成を含む完全なセットアップ手順については、<a href="/mcp_server/setup/">Datadog MCP サーバーを設定する</a>を参照してください。</div>

### 前提条件 {#prerequisites}

- Agent Observability データへのアクセス権限を持つ Datadog アカウント。
- MCP 互換クライアント(例: Claude Code、Codex CLI、Cursor、Gemini CLI、Kiro CLI)。

### エンドポイント {#endpoint}

MCP Server のエンドポイントは [Datadog サイト][5]によって異なります。{{< ui >}}Datadog Site{{< /ui >}} セレクターを使用してサイトのエンドポイントを表示します。`?toolsets=llmobs,core` を追加して、Agent Observability とコアツールセットを有効にします。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したサイト ({{< region-param key="dd_site_name" >}}) のエンドポイント:
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この製品は、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

### 接続 {#connect}

可能な場合は、リモート認証を選択してください。リモート OAuth フローが環境でブロックされている場合は、ローカルバイナリ認証を使用します。

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

**Gemini CLI、Kiro CLI、およびその他の MCP 互換クライアント**:

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
<div class="alert alert-danger">この製品は、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
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

3. AI クライアントを構成します。Claude Code の場合、次の内容を `~/.claude.json` に追加します。コマンドパスの `<USERNAME>` の部分を置き換えてください。

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

### API キーによる認証{#authenticate-with-api-keys}

MCP Server は、デフォルトでは OAuth 2.0 を使用します。OAuth が利用できない場合は、Datadog の [API キーとアプリケーションキー][6]を `DD_API_KEY` と `DD_APPLICATION_KEY` の HTTP ヘッダーとして送信します。

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
<div class="alert alert-danger">この製品は、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

セキュリティのため、API キーとアプリケーションキーのスコープは、必要な権限のみを持つ[サービスアカウント][7]に限定してください。

## エージェントスキル{#agent-skills}

エージェントスキルは、Agent Observability の共通のワークフローを自動化する AI コーディングエージェント向けの事前構築済みの命令セットです。`agent-observability` スキルセットは、[Datadog agent-skills][8] リポジトリで利用可能です。セッションの分類、障害の診断、実験の分析、`ddtrace.llmobs` SDK を使用した実験コードの生成、および本番環境のライブデータに対する評価器のブートストラップを行うための 6 つのスキルが用意されています。

### インストール {#install}

次のコマンドを使用して `agent-observability` スキルをインストールします。

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

スキルを使用するには、`llmobs` MCP ツールセットが接続されている必要があります。まだ接続していない場合は、次を実行します。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この製品は、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

両方のコマンドを実行した後、Claude Code を再起動するとスキルが表示されます。

### 利用可能なスキル{#available-skills}

| スキル | 呼び出し方法 | 機能 |
|-------|-------------|-------------|
| セッション分類 | `/agent-observability-session-classify` | セッション、トレース、またはバッチにおいてユーザーの意図が満たされたかどうかを分類します。 |
| トレース RCA | `/agent-observability-trace-rca` | 失敗した本番環境トレースの根本原因分析を行います。 |
| 実験アナライザー | `/agent-observability-experiment-analyzer` | LLM の実験結果の分析と比較を行います。 |
| 実験用 Python コード生成 | `/agent-observability-experiment-py-bootstrap` | `ddtrace.llmobs` SDK を使用して Python 実験コードを生成します。アプリをイントロスペクトして実際の `task_fn` を接続し、`.env` 資格情報を自動検出し、評価器の選択を指示する自由形式の `--purpose` を受け入れます。 |
| 評価器ブートストラップ | `/agent-observability-eval-bootstrap` | 評価器コードの生成、オンライン LLM ジャッジ評価器の公開、または実験で使用するためのデータセットへのトレースのサンプリングを行います。 |
| 評価器パイプライン | `/agent-observability-eval-pipeline` | 本番環境のトレースから評価器、データセット、実験、分析までの 6 フェーズのガイド付きパイプラインです。`--stop-after` で早期停止し、`--start-at` | でフローの途中から再開します。

#### セッション分類 {#session-classification}

`/agent-observability-session-classify` は、特定のインタラクションにおいてユーザーの意図が満たされたかどうかを分類します。最大 3 つの信号源から情報を取得します。Agent Observability トレース、RUM 行動データ、および Audit Trail イベントです。: このスキルは、`yes / partial / no` 判定と裏付けとなる証拠を返します。信号源を追加するたびに信頼性が向上します。

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### トレース根本原因分析 {#trace-root-cause-analysis}

`/agent-observability-trace-rca` は、LLM アプリケーションから適切な結果が得られない原因を診断します。利用可能な最も強力な信号 (LLM ジャッジ評価の判定、実行時エラー、または構造的異常) に基づいて分析モードを選択し、構造化された RCA レポートを作成します。レポートには、失敗の分類に加え、トレースの証拠に基づく具体的な `BEFORE`/`AFTER` の修正案が含まれます。

Claude Code がコードベースにアクセスできる場合、このスキルは関連するソースファイルを検索し、インラインで差分を提案できます。

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### 評価器ブートストラップ {#evaluator-bootstrap}

`/agent-observability-eval-bootstrap` は、本番環境のトレースを分析し、観察された失敗モードを対象とする評価器スイートを提案します。4 つのアーティファクトのいずれかを出力します。オフライン実験用の Python `BaseEvaluator`/`LLMJudge` クラス、フレームワークに依存しない JSON 仕様、Datadog に直接公開されるオンライン LLM ジャッジ評価器、または `--emit-dataset <path>` を介して本番環境のトレースからサンプリングされた `DatasetRecordRaw[]` JSON を `LLMObs.create_dataset(records=...)` 用に整形したものです。: データセット出力モードでは、評価器のワークフローを完全にスキップし、実験への入力として適したデータセットを作成します。

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

#### 実験アナライザー {#experiment-analyzer}

`/agent-observability-experiment-analyzer` は、実験結果を取得し、候補とベースラインの間で何が変化したか (どのメトリクスが改善し、どれが回帰し、候補がどこでパフォーマンス不足だったか) を明らかにします。: 

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

#### Python SDK を使用した実験コードの生成 {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` は、`ddtrace.llmobs` SDK を使用し、標準的なリファレンスノートブックのスタイルに一致する、自己完結型の `.py` スクリプトまたは Jupyter `.ipynb` ノートブックを出力します。

データセットは、ローカルの `DatasetRecordRaw[]` JSON (ファイルにインライン化)、CSV (`LLMObs.create_dataset_from_csv` を介して実行時に読み込み)、名前による既存の Datadog データセット (`LLMObs.pull_dataset`)、または小さな 3 レコードのインラインサンプル (デフォルト) のいずれかになります。生成されたすべての実験には、`config` と `tags` の両方で `generated_by=claude-code` と解決済みの `--purpose` がタグ付けされます。

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

#### エンドツーエンドの評価器パイプライン {#end-to-end-eval-pipeline}

`/agent-observability-eval-pipeline` は、本番環境のトレースから評価器、データセット、実験、分析までを 6 つのナレーション付きフェーズで進め、各フェーズの間にユーザーチェックポイントを設けています。

1. **ml_app トレースの分類** — `ml_app` から最近のトレースをサンプリングして分類します。
2. **根本原因分析** — 失敗したトレースの原因を診断します。
3. **評価器のブートストラップ** — 観察された失敗モードを対象とした評価器スイートを提案します。
4. **データセットの作成と公開** — 入力と期待される出力のペアを `DatasetRecordRaw[]` JSON に抽出し、プロジェクト (遅延作成) で Datadog に公開します。
5. **実験の生成と実行** — データセットを取得してアプリのタスク関数を接続する実行可能な `.py` または `.ipynb` を出力し、エンドツーエンドで実行して `experiment.url` をキャプチャします。コード生成と実行の間にフェーズ内のレビュー (`run`/`edit`/`stop`) が配置されているため、生成されたファイルを実行前に確認できます。
6. **実験の分析** — メトリクスの内訳と推奨事項を含む分析レポートを作成します。

各フェーズには標準的な短い名前があり、`--start-at` と `--stop-after` で受け入れられる値と同じです。次の表は、各フェーズでパイプラインが呼び出す可能性のある MCP ツールとそのロジックの概要を示します。

| # | フェーズタイトル | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">ステージ名</span> | 呼び出される MCP ツール | 概要 |
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | ml_app トレースの分類 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` | `ml_app` の最近のルートスパンをサンプリングし、それぞれを成功/部分的成功/失敗に分類して、共通のパターンを明らかにします。|
| 2 | 根本原因分析 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | 失敗したスパンの完全なトレースをフェーズ 1 から取得し、トレースツリーをたどって各失敗をルートスパンと失敗モードに帰属させます。|
| 3 | 評価器のブートストラップ | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | なし (フェーズ 2 レポートに関するローカル推論)、`--publish` が設定されている場合はオンライン LLM ジャッジ評価器を公開するためのオプションの Datadog API 呼び出し | Python 評価器スイートを出力 (`sdk_code`) するか、フレームワークに依存しない JSON 仕様を出力 (`data_only`) するか、オンライン評価器を公開 (`publish`) します。|
| 4 | データセットの作成と公開 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans` (サンプリング)、ddtrace SDK (MCP ではない) による `LLMObs.create_dataset()` (公開) | ルートスパンをサンプリングして入力と期待される出力のペアを抽出し、PII をスクラブしてローカル JSON に書き込んでから、Datadog に公開します。|
| 5 | 実験の生成と実行 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals` (ワンショットスタートアップビーコン — 接続性 + テレメトリ)、ランタイムは ddtrace SDK を使用 | LLM 呼び出しサイトについてアプリをイントロスペクトし、`task_fn` を実際のエントリポイントに接続する自己完結型の `.py` または `.ipynb` を出力して実行します。|
| 6 | 実験の分析 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`、`get_llmobs_experiment_metric_values`、`list_llmobs_experiment_events`、`get_llmobs_experiment_event`、`get_llmobs_experiment_dimension_values` | トップラインメトリクス、レコードごとのスコア、セグメントディメンション、およびドリルダウンイベントをプルし、構造化された分析レポートを合成します。|

任意のチェックポイントでクリーンに `stop` し、後で `--start-at <stage-name>` で再開できます。再実行は不要です。従来の 3 フェーズの評価のみの動作を維持するには `--stop-after eval-bootstrap` を渡します。

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

これらのスキルに関する完全なガイドと推奨されるエンドツーエンドのワークフローについては、[Claude Code スキルを使用した LLM アプリケーションの分析][9]を参照してください。

## ユースケース {#use-cases}

Agent Observability MCP ツールにより、次の AI 支援ワークフローが有効になります。

- **エージェント実行のデバッグ**: ML アプリ、エラーステータス、またはカスタムタグでトレースを検索し、スパン階層とコンテンツを調べて障害を特定します。
- **トレース構造の分析**: トレースの完全なスパンツリーを視覚化し、エージェント、LLM、ツール、および取得がどのように相互作用するかを理解します。
- **エージェントループの調査**: エージェントのステップバイステップの実行ループを確認し、意思決定とツール呼び出しのパターンを理解します。
- **実験の評価**: 実験メトリクスの要約統計を取得し、ディメンションセグメント間で結果を比較し、個々のイベントを検査します。
- **実験の作成**: モデル推論を実行せずに実験メタデータ (プロジェクト、データセット、説明、構成) を記録するために、`create_llmobs_experiment` で新しい実験オブジェクトを登録します。その後、`submit_llmobs_experiment_events` を使用して評価メトリクスを添付します。
- **実験パターンの発見**: メトリクスパフォーマンスで実験イベントをフィルタリングおよびソートし、最もパフォーマンスの高いケースと低いケースを見つけます。
- **評価器の管理**: ML アプリケーション全体または組織全体で、評価器の構成を一覧表示し、検査、作成、更新、および削除します。
- **パターンの探索**: パターン構成を一覧表示し、実行ステータスをチェックし、発見されたトピック階層を参照して、ユーザーが何を求めているか、トラフィックがどのように分散されているかを理解します。
- **データセットの管理**: プロジェクトとデータセットを検索し、データセットレコードを参照および検査し、実験で使用するためにデータセットに新しいレコードを追加します。

## 利用可能なツール {#available-tools}

`llmobs` ツールセットには、次のツールが含まれています。

### トレースおよびスパンツール {#trace-and-span-tools}

`search_llmobs_spans`
: フィルターまたは生のクエリに一致するスパンを検索します。

`get_llmobs_trace`
: スパンの種類別のスパン数、エラーインジケーター、合計期間を含むトレースの完全な構造をスパン階層ツリーとして取得します。

`get_llmobs_span_details`
: タイミング、エラー情報、LLM の詳細 (モデル、トークン数)、メトリクス、評価など、1 つ以上のスパンの詳細なメタデータを取得します。

`get_llmobs_span_content`
: オプションの JSONPath 抽出を使用して、スパンフィールド (入力、出力、メッセージ、ドキュメント、またはメタデータ) の実際のコンテンツを取得します。

`find_llmobs_error_spans`
: 伝播コンテキストを持つトレース内のすべてのエラースパンを、エラーメッセージとスタックトレースと共にスパンの種類ごとにグループ化して検索します。

`expand_llmobs_spans`
: `get_llmobs_trace` が折りたたまれたノードを返す場合に、段階的なツリー探索のために特定のスパンの子を読み込みます。

`get_llmobs_agent_loop`
: エージェントの実行ループの時系列表示を取得し、各ステップ (LLM 呼び出し、ツール呼び出し、決定) を順番に表示します。

### 実験ツール {#experiment-tools}

`create_llmobs_experiment`
: プロジェクト内に新しい Agent Observability 実験オブジェクトを作成します。モデル推論を実行せずに実験を記録します (これにより、イベントやメトリクスをそれに対して報告できるようになります)。`project_id` と `experiment_name` が必要です。作成された `experiment_id` とその解決された名前を返します。`submit_llmobs_experiment_events` を使用して評価メトリクスを添付するか、`update_llmobs_experiment` を使用してそのプロパティを変更します。

`get_llmobs_experiment_summary`
: すべての評価メトリクスについて、事前計算された統計を含む高レベルの実験概要を取得します。他の実験ツールを使用する前に最初に使用します。

`list_llmobs_experiment_events`
: ディメンションまたはメトリクスでフィルタリングし、メトリクス値で並べ替えて、実験イベントを一覧表示します。

`get_llmobs_experiment_event`
: 入力、出力、期待される出力、すべてのメトリクス、ディメンションを含む、単一の実験イベントの詳細を取得します。

`get_llmobs_experiment_metric_values`
: 特定の評価メトリクスの統計分析を取得します。オプションで、比較のためにディメンションごとにセグメント化することもできます。

`get_llmobs_experiment_dimension_values`
: ディメンションの一意の値とカウントを取得します。有効なフィルター値やセグメント値を見つけるのに役立ちます。

### 評価ツール {#evaluator-tools}

`list_llmobs_evals`
: すべての ML アプリケーション用に構成されたすべての LLM ジャッジ評価器を一覧表示します。各評価器の名前、ml_app、および有効化ステータスを返します。

`list_llmobs_evals_by_ml_app`
: 特定の ML アプリケーション用に構成されたすべての LLM ジャッジ評価器を一覧表示します。

`get_llmobs_evaluator`
: LLM ジャッジ評価器の構成を名前で取得します。これには、ターゲット (ml_app、サンプリング、フィルター)、LLM プロバイダー、およびジャッジプロンプトテンプレートが含まれます。

`create_or_update_llmobs_evaluator`
: LLM ジャッジ評価器の構成を作成または更新します。特定の ML アプリケーション、およびオプションでフィルターやサンプリング率をターゲットにします。ジャッジのモデルとプロンプトテンプレートによって、各スパンのスコアリング方法が定義されます。

`delete_llmobs_evaluator`
: LLM ジャッジ評価器の構成を名前で削除します。

### プロジェクトおよびデータセットツール {#project-and-dataset-tools}

`list_llmobs_projects`
: 組織のすべての Agent Observability 実験プロジェクトを作成日順 (新しい順) に一覧表示します。各プロジェクトの `id`、`name`、タイムスタンプ、およびページネーションフィールド (`next_cursor`、`truncated`) を返します。プロジェクトの名前や ID が不明な場合に、それらを見つけるために使用します。

`get_llmobs_project`
: Agent Observability 実験プロジェクトを ID または名前で検索します。データセットツールを呼び出す前に、`project_id` の UUIDを解決するために使用します。

`list_llmobs_datasets`
: プロジェクト内のデータセットを、ID または名前によるオプションのフィルター付きで一覧表示します。データセットのメタデータとページネーションフィールドを返します。`get_llmobs_dataset_records` や `add_llmobs_dataset_records` の前に使用します。これらのツールにはデータセットの UUID が必要です。

`get_llmobs_dataset_records`
: 構造化されたプレビューとスキーマの概要を含むデータセットレコードを読み取ります。任意の JSON フィールド (`input`、`expected_output`、`metadata`) を読み取り可能なプレビューに整形します。新しいレコードを作成する前に、`compute_schema=true` を使用してレコード構造の型認識スケッチを取得してください。

`get_llmobs_full_dataset_records`
: 完全でトリミングされていないコンテンツを含む特定のレコードを最大 3 件取得します。`get_llmobs_dataset_records` でレコード ID を見つけた後に、個々のレコードを詳細に調査するために使用します。

`add_llmobs_dataset_records`
: プレビューしてから確認する 2 段階のフローを使用して、データセット内にレコードを作成します。`confirmed=false` として呼び出して計画された書き込みをプレビューし、ユーザーの承認後に `confirmed=true` にしてコミットします。

### パターンツール{#patterns-tools}

`list_llmobs_pattern_configs`
: 組織のすべてのパターン構成を一覧表示します。各構成の `id`、`name`、`evp_query`、サンプリング設定、およびタイムスタンプを返します。`config_id` を見つけるために最初に使用します。

`get_llmobs_pattern_config`
: 組織の最近変更されたパターン構成を取得します。

`get_llmobs_pattern_run_status`
: 構成に対する最新のパターン実行のステータスとアクティビティごとの進捗状況を取得します。トピックを読み取る前に、クラスタリングが実行中か、完了したか、失敗したかをチェックするために使用します。

`list_llmobs_pattern_runs`
: 構成に対するすべての完了したパターン実行を新しい順に一覧表示します。各実行の `id`、`status`、タイムスタンプ、および使用された `config_snapshot` を返します。

`get_llmobs_patterns`
: パターン実行によって検出されたトピック階層を取得します。トピックはレベルごとに整理されており、それぞれに `name`、`description`、および `point_count` があります。最新の完了した実行を読み取るには、`run_id` を省略します。

`get_llmobs_patterns_with_points`
: 各リーフトピックにスパン ID がインライン化された実行のトピック階層を取得します。スパンごとの期間、コスト、トークン数、および評価も含めるには、`include_metrics=true` を設定します。

`get_llmobs_pattern_points`
: 単一のトピックに割り当てられたクラスタリングポイント (個々のスパン) のカーソルページネーションされたページを取得します。各ポイントに、`span_id`、`session_id`、およびスパン入力プレビューがあります。ページングを続行するには、`next_page_token` を`page_token` として渡します。

### アノテーションキューツール{#annotation-queue-tools}

`list_llmobs_annotation_queues`
: 組織のすべての[アノテーションキュー][10]を一覧表示します。

`create_llmobs_annotation_queue`
: トレースの人間によるレビュー用にアノテーションキューを作成します。作成時に必要に応じてラベルスキーマを定義します。

`update_llmobs_annotation_queue`
: アノテーションキューの名前、説明、またはラベルスキーマを更新します。

`delete_llmobs_annotation_queue`
: アノテーションキューを削除します。

`get_llmobs_annotation_label_schema`
: アノテーションキューのラベルスキーマを取得します。これは、レビュー中にアノテーターが適用するラベルを定義するものです。

`update_llmobs_annotation_label_schema`
: アノテーションキューのラベルスキーマを作成または置換します。

`add_llmobs_annotation_queue_interactions`
: 1 つ以上のトレースをレビュー用のアノテーションキューに追加します。

`delete_llmobs_annotation_queue_interactions`
: トレースをアノテーションキューから削除します。

`get_llmobs_annotated_interactions`
: アノテーションキュー内のアノテーションが付いたインタラクションを、アノテーターが適用したラベルと共に取得します。

`get_llmobs_annotations_by_content_ids`
: 特定のトレースまたはセッションに適用されたアノテーションコンテンツ ID で取得します。

`upsert_llmobs_annotations`
: キュー内のインタラクションに適用されるアノテーションを作成または更新します。

`delete_llmobs_annotations`
: キュー内のインタラクションに適用されたアノテーションを削除します。

## 推奨ワークフロー{#recommended-workflows}

### トレース分析{#trace-analysis}

1. **検索**: `search_llmobs_spans` を使用して、ML アプリ、ステータス、スパン、またはカスタムタグでトレースを検索します。
2. **可視化**: `get_llmobs_trace` を使用して、スパン階層ツリー全体を表示します。
3. **検査**: `get_llmobs_span_details` を使用して、特定のスパンのメタデータ、タイミング、および評価を取得します。
4. **コンテンツの読み取り**: `get_llmobs_span_content` を使用して、実際の I/O、メッセージ、またはドキュメントを取得します。
5. **エラーのデバッグ**: `find_llmobs_error_spans` を使用して、伝播コンテキストを含むトレース内のすべてのエラーを特定します。
6. **展開**: `expand_llmobs_spans` を使用して、より詳細な調査のために、折りたたまれたスパンの子を読み込みます。
7. **エージェントのレビュー**: `get_llmobs_agent_loop` を使用して、エージェントスパンのステップバイステップの実行フローを確認します。

### 実験分析 {#experiment-analysis}

1. **要約**: `get_llmobs_experiment_summary` を使用して、全体的な統計を取得し、利用可能なメトリクスとディメンションを検出します。
2. **イベントの参照**: `list_llmobs_experiment_events` を使用して、ディメンションでフィルタリングしたりメトリクスで並べ替えたりして、関心のあるイベントを検索します。
3. **イベントの検査**: `get_llmobs_experiment_event` を使用して、特定のイベントの詳細を確認します。
4. **メトリクスの分析**: `get_llmobs_experiment_metric_values` を使用して、パーセンタイル分布や真/偽の割合を取得したり、ディメンションセグメント間で比較したりします。
5. **ディメンションの検出**: `get_llmobs_experiment_dimension_values` を使用して、有効なフィルター値とセグメント値を検索します。

### データセット管理 {#dataset-management}

1. **プロジェクトの検索**: `list_llmobs_projects` を使用してプロジェクトを参照します。各結果に、後続の呼び出しに必要な `id` の UUIDが 含まれています。プロジェクトの名前はわかっているが UUID が不明な場合は、`get_llmobs_project` を使用して直接解決します。
2. **データセットの検索**: `list_llmobs_datasets` で `project_id` を使用してデータセットを一覧表示し、その UUID を取得します。
3. **データの理解**: `get_llmobs_dataset_records` で `compute_schema=true` を使用してレコードを参照し、読み取りや書き込みを行う前にフィールドの型スケッチを取得します。
4. **特定のレコードの読み取り**: `get_llmobs_full_dataset_records` を使用して、ID ごとに最大 3 件のレコードの完全なコンテンツを取得します。
5. **レコードの追加**: `add_llmobs_dataset_records` で `confirmed=false`を使用して書き込みをプレビューし、ユーザーの承認後に `confirmed=true` を使用します。

### パターン分析 {#patterns-analysis}

1. **構成の一覧表示**: `list_llmobs_pattern_configs` を使用して、利用可能なパターン構成とその `config_id` 値を検索します。
2. **実行ステータスのチェック**: `get_llmobs_pattern_run_status` を使用して、最新の実行が完了していることを確認します。
3. **トピックの読み取り**: `get_llmobs_patterns` を使用して、名前、説明、およびコヒーレンススコアを含む完全なトピック階層を取得します。
4. **スパンの検査**: `get_llmobs_patterns_with_points` を使用してスパン ID がインライン化されたトピックを取得するか、`get_llmobs_pattern_points` を使用して特定のトピックのスパンをページ送りします。
5. **スパンコンテンツの分析**: 前のステップの `span_id` 値を使用して `get_llmobs_span_details` または `get_llmobs_span_content` を実行し、トピック内の個々のスパンの実際の入力、出力、およびメタデータを検査します。
6. **過去の実行の参照**: `list_llmobs_pattern_runs` を使用して過去の実行を確認し、特定の `run_id` を渡して時間の経過に伴うトピック分布を比較します。

## プロンプトの例{#example-prompts}

接続後、次のようなプロンプトを試してください。

- 過去 1 週間の `customer-support-bot` アプリのエラートレースを確認してください。最も一般的な失敗パターン、発生頻度を要約し、どれを最初に修正すべきかを提案してください。
- 評価によって低品質とフラグが立てられたエージェントの応答のトレースを見つけてください。入力と出力を確認し、応答の品質を向上させるためのシステムプロンプトへの具体的な変更を提案してください。
- アプリの最近のエージェントトレースを確認し、エージェントが必要以上にループしたケースを見つけてください。各ステップでの意思決定を分析し、不要なツール呼び出しを減らすためにツール記述を改善する方法を提案してください。
- ユーザーから不適切な応答があったとの報告がありました。トレース ID は `trace-123` です。何が起こったのかを正確に説明してください。ユーザーが何を尋ね、エージェントが各ステップで何を行い、どこに問題があるかを教えてください。コードの修正案を提示してください。
- 実験 `exp-456` を分析し、パフォーマンスが最も低いディメンションの評価スコア別の内訳を示すマークダウンテーブルを生成してください。パフォーマンスがどこで、なぜ低下しているのかを理解するのに役立つその他の関連列を含めてください。
- 実験 `exp-123` (ベースライン) と実験 `exp-456` を比較してください。何が改善され、何が悪化したのか、またその程度を要約してください。変更をリリースする価値があるかどうか、推奨事項を教えてください。
- 実験 `exp-456` を要約し、スコアが最も低いイベントを 5 つ特定してください。それぞれについて、入力、出力、および失敗した評価を示してください。
- プロジェクト `my-chatbot-project` に「prompt-v2-test」という新しい実験を作成し、評価メトリクスを添付できるようにその実験 ID を返してください。
- `my-project` プロジェクト内のデータセットを一覧表示し、`qa-golden-set` という名前のデータセットのレコードのサンプルをスキーマと共に示してください。
- 新しいテストケースの CSV を持っています。それらを `my-project` の `qa-golden-set` データセットに、新しいバージョンとして追加してください。最初にプレビューを見せてください。

## 他の Datadog ツールとの連携{#combine-with-other-datadog-tools}

セットアップ URL に含まれる `core` ツールセットを使用すると、AI エージェントが Agent Observability の分析と自然に連携する追加の Datadog ツールにアクセスできるようになります。

### Datadog Notebooks への分析のエクスポート{#export-analysis-to-datadog-notebooks}

`core` ツールセットには `create_datadog_notebook` と `edit_datadog_notebook` が含まれており、AI エージェントは分析結果から直接 [Datadog Notebooks][3] を作成できます。エージェントチャットからの調査結果を、Datadog 内にトレースや実験と並んで存在する、共同編集可能で共有可能なノートブックにエクスポートできます。

次のようなプロンプトを試してみてください。

- 実験 `exp-456` を分析し、パフォーマンスが最も低いディメンションを特定して、評価スコア別の内訳を含む要約レポートを Datadog ノートブックにエクスポートしてください。
- 過去 1 週間の `customer-support-bot` のエラートレースを確認し、一般的な失敗パターンや推奨される修正方法を含む調査結果をまとめた Datadog ノートブックを作成してください。

比較チャートや象限プロットなど、標準の Datadog ウィジェットを超えるカスタム視覚化のために、Notebooks は [Mermaid 図][4]もネイティブにレンダリングします。次のようなプロンプトを試してみてください。

- 実験 `exp-456` を分析し、各プロンプトバージョン間で `accuracy` スコアを比較して、各バージョンの平均スコアの [Mermaid 棒グラフ]を含む Datadog ノートブックに結果をエクスポートしてください。
- 実験 `exp-456` を分析し、一方の軸に `relevance`、もう一方の軸に `accuracy` を配置した [Mermaid 象限チャート]上に各プロンプトバージョンをプロットする Datadog ノートブックをエクスポートしてください。両方のディメンションでパフォーマンスが低いバージョンを特定してください。

## 参考資料 {#further-reading}

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
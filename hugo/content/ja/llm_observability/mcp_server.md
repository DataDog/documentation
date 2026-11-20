---
description: Datadog MCP Server を使用して、AI エージェントを Agent Observability のトレースおよび実験に接続します。
further_reading:
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP Server
- link: /llm_observability/experiments
  tag: ドキュメント
  text: Agent Observability の実験を設定して使用する
- link: /llm_observability/monitoring
  tag: ドキュメント
  text: Agent Observability でアプリケーションを監視する
- link: /llm_observability/guide/claude_code_skills
  tag: ガイド
  text: Claude Code スキルで LLM アプリケーションを分析する
title: Agent Observability MCP およびスキル
---
## 概要{#overview}

[Datadog MCP Server][1] を使用すると、AI エージェントは Model Context Protocol (MCP) を介して [Agent Observability][2] データにアクセスできるようになります。`llmobs` ツールセットは、Cursor、Claude Code、OpenAI Codex といった AI 搭載クライアントから直接、トレースの検索と分析、スパンの詳細や内容の確認、そして実験結果の評価を行うためのツールを提供します。

## セットアップ{#setup}

`llmobs` ツールセットを有効にした状態で、MCP 互換クライアントを Datadog MCP Server に接続します。

<div class="alert alert-info">Cursor や VS Code 拡張機能の設定を含む完全なセットアップ手順については、「<a href="/mcp_server/setup/">Datadog MCP Server のセットアップ</a>」を参照してください。</div>

### 前提条件{#prerequisites}

- Agent Observability データにアクセスする権限を持つ Datadog アカウント
- MCP 互換クライアント (例: Claude Code、Codex CLI、Cursor、Gemini CLI、または Kiro CLI)

### エンドポイント{#endpoint}

MCP Server のエンドポイントは、ご利用の [Datadog サイト][5]によって異なります。{{< ui >}}Datadog Site{{< /ui >}} セレクターを使用して、サイトのエンドポイントを表示します。`?toolsets=llmobs,core` を追加して、Agent Observability とコアツールセットを有効にします。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
選択したサイトのエンドポイント ({{< region-param key="dd_site_name" >}}):
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この製品は、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

### 接続{#connect}

可能な場合はリモート認証を選択します。環境によってリモート OAuth フローがブロックされる場合は、ローカルバイナリ認証を使用します。

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

設定を追加した後、`codex mcp login datadog` を実行して OAuth フローを完了します。

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

3. AI クライアントを設定します。Claude Code の場合は、`~/.claude.json` に以下を追加し、コマンドパス内の `<USERNAME>` を置き換えてください。

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

MCP Server はデフォルトで OAuth 2.0 を使用します。OAuth が利用できない場合は、Datadog の [API キーとアプリケーションキー][6]を `DD_API_KEY` および`DD_APPLICATION_KEY` HTTP ヘッダーとして送信してください。

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

セキュリティ上の理由から、API キーとアプリケーションキーのスコープを、必要な権限のみを持つ[サービスアカウント][7]に限定してください。

## Agent スキル{#agent-skills}

エージェントスキルは、一般的な Agent Observability ワークフローを自動化する、AI コーディングエージェント向けの事前構築済み命令セットです。`agent-observability` スキルセットは、[Datadog agent-skills][8] リポジトリで利用可能です。これには、セッションの分類、障害の診断、実験の分析、`ddtrace.llmobs` SDK を使用した実験コードの生成、および本番環境のライブデータに対する評価器のブートストラップを行うための 6 つのスキルが含まれています。

### インストール{#install}

以下のコマンドを実行して `agent-observability` スキルをインストールします。

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

このスキルを使用するには、`llmobs` MCP ツールセットが接続されている必要があります。まだ接続していない場合は、以下を実行してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">この製品は、選択したサイト ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

両方のコマンドを実行した後、Claude Code を再起動するとスキルが利用可能になります。

### 利用可能なスキル{#available-skills}

| スキル| 呼び出し方法| 機能|
|-------|-------------|-------------|
| セッション分類| `/agent-observability-session-classify` | セッション、トレース、またはバッチにおいてユーザーの意図が満たされたかどうかを分類する|
| トレース RCA| `/agent-observability-trace-rca` | 本番環境で失敗したトレースの根本原因分析を行う|
| 実験アナライザー| `/agent-observability-experiment-analyzer` | LLM 実験結果の分析と比較を行う|
| Python 実験コード生成| `/agent-observability-experiment-py-bootstrap` | `ddtrace.llmobs` SDK を使用して Python 実験コードを生成する。アプリをイントロスペクトして実際の `task_fn` を組み込み、`.env` の認証情報を自動検出し、評価器の選択を指示する自由記述の `--purpose` 引数も受け入れる|
| 評価ブートストラップ| `/agent-observability-eval-bootstrap` | 評価器コードの生成、オンライン LLM-judge 評価器の公開、または実験用データセットへのトレースのサンプリングを行う|
| 評価パイプライン| `/agent-observability-eval-pipeline` | 本番環境のトレースから評価器、データセット、実験、分析に至るまでの 6 段階のガイド付きパイプライン。`--stop-after` で途中で停止し、以下で途中から再開可能 `--start-at` |

#### セッション分類{#session-classification}

`/agent-observability-session-classify` は、特定のインタラクションにおいてユーザーの意図が満たされたかどうかを分類します。最大 3 つのシグナルソースを利用:  Agent Observability のトレース、RUM の行動データ、Audit Trail イベント。このスキルは、裏付けとなる証拠とともに `yes / partial / no` の判定を返します。シグナルソースが増えるごとに、判定の信頼性が向上します。

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### トレースの根本原因分析{#trace-root-cause-analysis}

`/agent-observability-trace-rca` は、LLM アプリケーションが期待通りの結果を出力していない原因を診断します。利用可能な最も有力なシグナル (LLM-judge による評価判定、ランタイムエラー、または構造的な異常) に基づいて分析モードを選択し、構造化された RCA レポートを作成します。レポートには、失敗の分類と、トレースの証拠に基づいた具体的な修正案 `BEFORE`/`AFTER` 修正案が含まれます。

Claude Code がコードベースにアクセスできる場合、このスキルは関連するソースファイルを検索し、インラインで差分を提案できます。

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### 評価器のブートストラップ{#evaluator-bootstrap}

`/agent-observability-eval-bootstrap` は、本番環境のトレースを分析し、観測された失敗モードを対象とした一連の評価器を提案します。出力される成果物は、以下の 4 つのいずれかです:  オフライン実験用の Python `BaseEvaluator`/`LLMJudge` クラス、フレームワークに依存しない JSON 仕様、Datadog に直接公開されるオンライン LLM-judge 評価器、または `--emit-dataset <path>` オプションを使用した場合は、本番環境のトレースからサンプリングされ `LLMObs.create_dataset(records=...)` 用に整形された `DatasetRecordRaw[]` 形式の JSON。データセット出力モードでは評価器のワークフローは完全にスキップされ、実験の入力として使用するのに適したデータセットが生成されます。

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

#### 実験アナライザー{#experiment-analyzer}

`/agent-observability-experiment-analyzer` は実験結果を取得し、候補とベースラインの間で何が変化したか明らかにします:  どのメトリクスが改善または悪化したか、候補のパフォーマンスがどこで劣っていたか。

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

#### Python SDK を使用して実験コードを生成する{#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` は、`ddtrace.llmobs` SDK を使用し、標準的なリファレンスノートブックのスタイルに準拠した、自己完結型の `.py` スクリプトまたは `.ipynb` ノートブックを生成します。

データセットとしては、ローカルの `DatasetRecordRaw[]` JSON (ファイル内に直接記述)、CSV (`LLMObs.create_dataset_from_csv` を介して実行時に読み込み)、名前で指定する既存の Datadog データセット (`LLMObs.pull_dataset`)、またはデフォルトの 3 レコードからなる小規模なインラインサンプルのいずれかを使用可能です。生成されるすべての実験には、`generated_by=claude-code` というタグに加え、解決済みの `--purpose` が `config` と `tags` の両方にタグ付けされます。

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

#### エンドツーエンド評価パイプライン{#end-to-end-eval-pipeline}

`/agent-observability-eval-pipeline` は、本番環境のトレースから始まり、評価器、データセット、実験、分析に至る一連のプロセスを 6 つのフェーズで進めます。各フェーズの間にはユーザーによるチェックポイントが設けられています。

1. **ml_app トレースの分類** – `ml_app` から最近のトレースをサンプリングして分類します。
2. **根本原因分析** – 失敗したトレースがなぜ失敗しているのかを診断します。
3. **評価器のブートストラップ** – 観察された失敗モードに対処する評価器スイートを提案します。
4. **データセットの作成と公開** – 入力と期待される出力のペアを `DatasetRecordRaw[]` JSON に抽出し、Datadog 上のプロジェクト (必要に応じて自動作成) に公開します。
5. **実験の生成と実行** – データセットを取得し、アプリのタスク関数を組み込んだ実行可能な `.py` または `.ipynb` ファイルを生成して出力した後、それをエンドツーエンドで実行して、`experiment.url` をキャプチャします。コード生成と実行の間には、生成されたファイルを実行前に確認できるレビュー段階 (`run`/`edit`/`stop`) が設けられています。
6. **実験の分析** – メトリクスの内訳と推奨事項を含む分析レポートを作成します。

各フェーズには標準的な短縮名が割り当てられており、これらは `--start-at` や `--stop-after` オプションで指定する値と共通です。以下のテーブルは、各フェーズにおいてパイプラインが呼び出す可能性のある MCP ツールと、そのロジックの概要をまとめたものです。

| # | フェーズタイトル| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">ステージ名</span> | 呼び出される MCP ツール| 概要|
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | ml_app トレースの分類| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` | `ml_app` の最近のルートスパンをサンプリングし、それぞれを成功/部分/失敗に分類して、共通のパターンを抽出します。|
| 2 | 根本原因分析| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | フェーズ 1 で特定された失敗スパンの完全なトレースを取得し、トレースツリーをたどって、各失敗をルートスパンおよび失敗モードに関連付けます。|
| 3 | 評価器のブートストラップ| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | なし (フェーズ 2 のレポートに基づくローカルでの推論)。`--publish` が設定されている場合、オンライン LLM-judge 評価器を公開するためのオプションの Datadog API 呼び出しを実行| Python 評価器スイート (`sdk_code`) やフレームワークに依存しない JSON 仕様 (`data_only`) を出力するか、オンライン評価器を公開 (`publish`) します。|
| 4 | データセットの作成と公開| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans` (サンプリング用)。公開には ddtrace SDK (MCP ではなく) 経由で`LLMObs.create_dataset()` を使用| ルートスパンをサンプリングし、入力と期待される出力のペアを抽出し、PII を削除してローカル JSON に書き出した後、Datadog に公開します。|
| 5 | 実験の生成と実行| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals` (起動時の単発ビーコン – 接続性とテレメトリ確認)。ランタイムは ddtrace SDK を使用。| LLM 呼び出しサイトについてアプリをイントロスペクトし、自己完結型の `.py` または `.ipynb` を出力して `task_fn` を実際のエントリポイントに接続し、実行します。|
| 6 | 実験の分析| <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`、`get_llmobs_experiment_metric_values`、`list_llmobs_experiment_events`、`get_llmobs_experiment_event`、`get_llmobs_experiment_dimension_values` | 主要メトリクス、レコードごとのスコア、セグメントディメンション、ドリルダウンイベントを取得し、構造化された分析レポートを生成します。|

`stop` で任意のチェックポイントで安全に中断でき、後で `--start-at <stage-name>` で再開できます。再実行は不要です。従来の評価のみの 3 フェーズ動作を維持するには、`--stop-after eval-bootstrap` を指定します。

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

これらのスキルに関する詳細なガイドと推奨されるエンドツーエンドのワークフローについては、「[Claude Code スキルを使用した LLM アプリケーションの分析][9]」を参照してください。

## ユースケース{#use-cases}

Agent Observability MCP ツールを使用すると、以下のような AI 支援ワークフローが可能になります。

- **エージェント実行のデバッグ**:  ML アプリ、エラーステータス、またはカスタムタグでトレースを検索し、スパンの階層や内容を調査して障害を特定します。
- **トレース構造の分析**:  トレースの完全なスパンツリーを可視化し、エージェント、LLM、ツール、および検索がどのように相互作用しているかを把握します。
- **エージェントループの調査**:  エージェントのステップごとの実行ループを確認し、意思決定やツール呼び出しのパターンを理解します。
- **実験の評価**:  実験メトリクスの統計概要を取得し、ディメンションセグメント間で結果を比較し、個々のイベントを詳細に確認します。
- **実験の作成**:  `create_llmobs_experiment` を使用して新しい実験オブジェクトを登録し、モデル推論を実行せずに実験メタデータ (プロジェクト、データセット、説明、構成) を記録します。その後、`submit_llmobs_experiment_events` を使用して評価メトリクスを関連付けます。
- **実験パターンの発見**:  メトリクスのパフォーマンスに基づいて実験イベントをフィルタリングおよび並べ替え、最もパフォーマンスの高いケースと低いケースを特定します。
- **評価器の管理**:  ML アプリケーション全体または組織全体にわたる評価器の設定について、一覧表示、詳細確認、作成、更新、削除を行います。
- **パターンの探索**:  パターン設定の一覧表示、実行状況のチェック、発見されたトピック階層の閲覧を行い、ユーザーの質問内容やトラフィックの分布状況を把握します。
- **データセットの管理**:  プロジェクトやデータセットの検索、データセット内のレコードの閲覧や確認に加え、実験で使用する新しいレコードをデータセットに追加します。

## 利用可能なツール{#available-tools}

`llmobs` ツールセットには、以下のツールが含まれています。

### トレースおよびスパンツール{#trace-and-span-tools}

`search_llmobs_spans`
:  フィルターまたは生のクエリに一致するスパンを検索します。

`get_llmobs_trace`
: トレースの完全な構造をスパン階層ツリーとして取得します。これには、種類別のスパン数、エラーインジケーター、合計所要時間が含まれます。

`get_llmobs_span_details`
: タイミング、エラー情報、LLM の詳細 (モデル、トークン数)、メトリクス、評価結果など、1 つ以上のスパンの詳細なメタデータを取得します。

`get_llmobs_span_content`
: オプションの JSONPath 抽出を使用して、スパンのフィールド (入力、出力、メッセージ、ドキュメント、またはメタデータ) の実際のコンテンツを取得します。

`find_llmobs_error_spans`
: 伝播コンテキストを持つトレース内のすべてのエラースパンを検索し、エラーメッセージとスタックトレースとともにスパンの種類ごとにグループ化します。

`expand_llmobs_spans`
: `get_llmobs_trace` が折りたたまれたノードを返す場合、段階的なツリー探索のために特定のスパンの子スパンを読み込みます。

`get_llmobs_agent_loop`
: エージェントの実行ループを時系列で取得し、各ステップ (LLM 呼び出し、ツール実行、意思決定など) を順を追って表示します。

### 実験ツール{#experiment-tools}

`create_llmobs_experiment`
: プロジェクト内に新しい LLM Observability 実験オブジェクトを作成します。モデルの推論を実行することなく実験を記録し、イベントやメトリクスをその実験に関連付けて報告できるようにします。`project_id` および `experiment_name` が必要です。作成された `experiment_id` とその解決済みの名前を返します。`submit_llmobs_experiment_events` を使用して評価メトリクスを添付するか、`update_llmobs_experiment` を使用してそのプロパティを変更します。

`get_llmobs_experiment_summary`
: すべての評価メトリクスの事前計算された統計を含む、高レベルの実験サマリーを取得します。他の実験ツールを使用する前に、ここから始めてください。

`list_llmobs_experiment_events`
: ディメンションまたはメトリクスでフィルタリングし、メトリクス値で並べ替えて、実験イベントを一覧表示します。

`get_llmobs_experiment_event`
: 入力、出力、期待される出力、すべてのメトリクスやディメンションを含む、単一の実験イベントの詳細を取得します。

`get_llmobs_experiment_metric_values`
: 特定の評価メトリクスの統計分析を取得します。オプションで、比較のためにディメンションごとにセグメント化することも可能です。

`get_llmobs_experiment_dimension_values`
: ディメンションのユニークな値とそれぞれの件数を取得します。これは、有効なフィルター値やセグメント値を特定するのに役立ちます。

### 評価器ツール{#evaluator-tools}

`list_llmobs_evals`
: すべての ML アプリケーションで設定されている LLM-judge 評価器を一覧表示します。各評価器の名前、ml_app、および有効ステータスを返します。

`list_llmobs_evals_by_ml_app`
: 特定の ML アプリケーション用に設定されたすべての LLM-judge 評価器を一覧表示します。

`get_llmobs_evaluator`
: 名前を指定して、LLM-judge 評価器の設定を取得します。これには、対象 (ml_app、サンプリング、フィルター)、LLM プロバイダー、評価用プロンプトテンプレートが含まれます。

`create_or_update_llmobs_evaluator`
: LLM-judge 評価器の設定を作成または更新します。特定の ML アプリケーションを対象とし、オプションでフィルターやサンプリング率を指定できます。評価用のモデルとプロンプトテンプレートによって、各スパンのスコアリング方法を定義します。

`delete_llmobs_evaluator`
: 名前を指定して、LLM-judge 評価器の設定を削除します。

### プロジェクトおよびデータセットツール{#project-and-dataset-tools}

`list_llmobs_projects`
: 組織のすべての LLM Observability 実験プロジェクトを、作成日順 (新しい順) に一覧表示します。各プロジェクトの `id`、`name`、タイムスタンプ、およびページネーション用フィールド (`next_cursor`、`truncated`) を返します。プロジェクト名や ID が不明な場合に、それらを確認するために使用します。

`get_llmobs_project`
: ID または名前で LLM Observability 実験プロジェクトを検索します。データセットツールを呼び出す前に、`project_id` UUID を解決するために使用します。

`list_llmobs_datasets`
: プロジェクト内のデータセットを一覧表示します。ID または名前によるフィルタリングも可能です。データセットのメタデータとページネーション用フィールドが返されます。`get_llmobs_dataset_records` または`add_llmobs_dataset_records` を使用する前に呼び出します。これらのツールにはデータセット UUID が必要です。

`get_llmobs_dataset_records`
: 構造化されたプレビューとスキーマの概要を含むデータセットレコードを読み取ります。任意の JSON フィールド (`input`、`expected_output`、`metadata`) を読みやすいプレビュー形式に整形します。新しいレコードを作成する前に、レコード構造の型を認識したスケッチを取得するには、`compute_schema=true` を指定します。

`get_llmobs_full_dataset_records`
: 内容が切り捨てられていない完全なレコードを最大 3 件取得します。`get_llmobs_dataset_records` でレコード ID を特定した後、個々のレコードを詳細に確認するために使用します。

`add_llmobs_dataset_records`
: プレビューして確定する 2 ステップのフローを使用して、データセット内にレコードを作成します。まず `confirmed=false` で呼び出して予定された書き込み内容をプレビューし、ユーザーの承認後に `confirmed=true` でコミットします。

### Patterns 分析ツール{#patterns-tools}

`list_llmobs_pattern_configs`
: 組織のすべての Patterns 設定を一覧表示します。各設定の `id`、`name`、`evp_query`、サンプリング設定、およびタイムスタンプが返されます。`config_id` を特定するには、まずこのエンドポイントを使用します。

`get_llmobs_pattern_config`
: 組織の Patterns 設定のうち、最も最近変更されたものを取得します。

`get_llmobs_pattern_run_status`
: 特定の設定に対する最新の Patterns 実行のステータスとアクティビティごとの進捗状況を取得します。トピックの内容を確認する前に、クラスタリングが実行中か、完了したか、あるいは失敗したかをチェックするために使用します。

`list_llmobs_pattern_runs`
: 特定の設定に対する完了済みのすべての Patterns 実行を、新しい順に一覧表示します。各実行の `id`、`status`、タイムスタンプ、および使用された `config_snapshot` が返されます。

`get_llmobs_patterns`
: Patterns 実行によって検出されたトピック階層を取得します。トピックはレベルごとに整理されており、それぞれに`name`、`description`、`point_count` があります。`run_id` を省略すると、最も最近完了した実行の情報を取得します。

`get_llmobs_patterns_with_points`
: 特定の実行におけるトピック階層を取得します。各リーフトピックにはスパン ID がインラインで含まれます。`include_metrics=true` を設定すると、スパンごとの所要時間、コスト、トークン数、および評価も含まれます。

`get_llmobs_pattern_points`
: 単一のトピックに割り当てられたクラスタリングポイント (個々のスパン) のカーソルページネーション方式のページを取得します。各ポイントには、`span_id`、`session_id`、およびスパン入力のプレビューが含まれます。ページネーションを継続するには、`next_page_token`を `page_token` として渡します。

## 推奨されるワークフロー{#recommended-workflows}

### トレース分析{#trace-analysis}

1. **検索**: `search_llmobs_spans` を使用して、ML アプリ、ステータス、スパンの種類、またはカスタムタグでトレースを検索します。
2. **可視化**: `get_llmobs_trace` を使用して、スパン階層ツリー全体を表示します。
3. **調査**: `get_llmobs_span_details` を使用して、特定のスパンのメタデータ、タイミング、および評価を取得します。
4. **コンテンツの読み取り**: `get_llmobs_span_content` を使用して、実際の I/O、メッセージ、またはドキュメントを取得します。
5. **エラーのデバッグ**: `find_llmobs_error_spans` を使用して、伝播コンテキストを含むトレース内のすべてのエラーを特定します。
6. **展開**: `expand_llmobs_spans` を使用して、折りたたまれたスパンの子スパンを読み込み、より詳細に調査します。
7. **Agent のレビュー**: `get_llmobs_agent_loop` を使用して、エージェントスパンのステップバイステップの実行フローを確認します。

### 実験の分析{#experiment-analysis}

1. **要約**: `get_llmobs_experiment_summary` を使用して、全体的な統計情報を取得し、利用可能なメトリクスやディメンションを確認します。
2. **イベントの閲覧**: `list_llmobs_experiment_events` を使用して、ディメンションでフィルタリングしたりメトリクスで並べ替えたりして、関心のあるイベントを検索します。
3. **イベントの調査**: `get_llmobs_experiment_event` を使用して、特定のイベントの詳細を表示します。
4. **メトリクスの分析**: `get_llmobs_experiment_metric_values` を使用して、パーセンタイル分布や true/false の割合を取得したり、ディメンションセグメント間で比較したりします。
5. **ディメンションの検出**: `get_llmobs_experiment_dimension_values` を使用して、有効なフィルター値とセグメント値を検索します。

### データセット管理{#dataset-management}

1. **プロジェクトの検索**: `list_llmobs_projects` を使用してプロジェクトを閲覧します。各結果には、後続の呼び出しに必要な `id` UUID が含まれています。プロジェクト名はわかっているが UUID が不明な場合は、`get_llmobs_project` を使用して直接解決できます。
2. **データセットの検索**: `list_llmobs_datasets` を `project_id` と共に使用して、データセットを一覧表示し、それぞれの UUID を取得します。
3. **データの理解**: `get_llmobs_dataset_records` と共に `compute_schema=true` を使用して、読み取りや書き込みを行う前に、レコードを閲覧し、フィールドの型スケッチを取得します。
4. **特定のレコードの読み取り**: ID を指定して `get_llmobs_full_dataset_records` を使用し、最大 3 件のレコードの完全なコンテンツを取得します。
5. **レコードの追加**: `add_llmobs_dataset_records` と`confirmed=false` を使用して書き込みをプレビューし、ユーザーの承認後に `confirmed=true` を指定して実行します。

### パターン分析{#patterns-analysis}

1. **設定の一覧表示**: `list_llmobs_pattern_configs` を使用して、利用可能なパターン設定とその `config_id` 値を見つけます。
2. **実行ステータスのチェック**: `get_llmobs_pattern_run_status` を使用して、最新の実行が完了していることを確認します。
3. **トピックの読み取り**: `get_llmobs_patterns` を使用して、名前、説明、コヒーレンススコアを含むトピック階層全体を取得します。
4. **スパンの検査**: `get_llmobs_patterns_with_points` を使用してスパン ID がインライン化されたトピックを取得するか、`get_llmobs_pattern_points` を使用して特定のトピックのスパンをページ単位で確認します。
5. **スパンコンテンツの分析**: 前のステップで得た `span_id` 値を使用して `get_llmobs_span_details` または `get_llmobs_span_content` を実行し、トピック内の個々のスパンの実際の入力、出力、メタデータを検査します。
6. **過去の実行の閲覧**: `list_llmobs_pattern_runs` を使用して過去の実行を確認し、特定の `run_id` を渡して時間の経過に伴うトピック分布を比較します。

## プロンプトの例{#example-prompts}

接続後、以下のようなプロンプトを試してください。

- 過去 1 週間の私の `customer-support-bot` アプリのエラートレースを確認してください。最も頻繁に発生している失敗パターンとその発生頻度をまとめ、優先的に修正すべきものを提案してください。
- 評価プロセスで低品​​質と判定されたエージェントの応答トレースを特定してください。入出力の内容を確認し、応答品質を向上させるためのシステムプロンプトの具体的な変更案を提示してください。
- 私のアプリの最近のエージェントのトレースを確認し、エージェントが必要以上にループしてしまったケースを特定してください。各ステップでの意思決定を分析し、不要なツール呼び出しを減らすためにツール記述を改善する方法を提案してください。
- ユーザーから不適切な応答があったとの報告がありました。トレース ID は `trace-123` です。何が起こったのかを正確に説明してください。ユーザーが何を尋ね、エージェントが各ステップで何を行い、どこで問題が発生したのかを教えてください。コードの修正案を提示してください。
- 実験 `exp-456` を分析し、評価スコア別に分類したパフォーマンスの最も低いディメンションのマークダウンテーブルを作成してください。パフォーマンスがどこで、なぜ低下しているのかを理解するのに役立つその他の関連列を含めてください。
- 実験 `exp-123` (ベースライン) と実験 `exp-456` を比較してください。何が改善し、何が悪化したのか、またその程度を要約してください。変更をリリースする価値があるかどうかについて推奨事項を教えてください。
- 実験 `exp-456` を要約し、スコアの低いイベントの上位 5 つを特定してください。それぞれのイベントについて、入力、出力、および不合格となった評価を表示してください。
- プロジェクト `my-chatbot-project` に「prompt-v2-test」という新しい実験を作成し、評価メトリクスを添付できるようにその実験 ID を返してください。
- プロジェクト `my-project` のデータセットを一覧表示し、`qa-golden-set` という名前のデータセットのレコードのサンプルを、スキーマを含めて表示してください。
- 新しいテストケースの CSV ファイルがあります。それらを `my-project` の `qa-golden-set` データセットに新しいバージョンとして追加してください。最初にプレビューを表示してください。

## 他の Datadog ツールとの連携{#combine-with-other-datadog-tools}

セットアップ URL に含まれる `core` ツールセットを使用することで、AI エージェントは、Agent Observability による分析と自然に連携する他の Datadog ツールも利用できるようになります。

### 分析結果の Datadog Notebooks へのエクスポート{#export-analysis-to-datadog-notebooks}

`core` ツールセットには `create_datadog_notebook` と `edit_datadog_notebook` が含まれており、これらを使用することで、AI エージェントは分析結果から直接 [Datadog Notebooks][3] を作成できるようになります。エージェントとのチャットで得られた知見を、トレースや実験とともに Datadog 内に保存される、共同編集および共有可能なノートブックにエクスポートできます。

次のようなプロンプトを試してみてください。

- 実験 `exp-456` を分析し、パフォーマンスの最も低いディメンションを特定して、評価スコア別の内訳を含む要約レポートを Datadog Notebooks にエクスポートしてください。
- 過去 1 週間の `customer-support-bot` のエラートレースを確認し、一般的な失敗パターンや推奨される修正方法を含む調査結果をまとめた Datadog Notebook を作成してください。

比較チャートや象限プロットなど、標準の Datadog ウィジェットの枠を超えるカスタム可視化のために、Notebooks は [Mermaid 図][4]もネイティブでレンダリングします。次のようなプロンプトを試してみてください。

- 実験 `exp-456` を分析し、各プロンプトバージョン間の `accuracy` スコアを比較して、各バージョンの平均スコアを示す Mermaid 棒グラフを含む Datadog Notebooks に結果をエクスポートしてください。
- 実験 `exp-456` を分析し、各プロンプトバージョンを、`relevance` を一方の軸、`accuracy` をもう一方の軸とする Mermaid 象限チャートにプロットした Datadog Notebooks をエクスポートしてください。その際、両方のディメンションでパフォーマンスが低いバージョンを特定してください。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/mcp_server/setup/
[2]: /ja/llm_observability/
[3]: /ja/notebooks/
[4]: /ja/notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /ja/getting_started/site/
[6]: /ja/account_management/api-app-keys/
[7]: /ja/account_management/org_settings/service_accounts/
[8]: https://github.com/datadog-labs/agent-skills
[9]: /ja/llm_observability/guide/claude_code_skills
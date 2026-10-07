---
aliases:
- /ja/llm_observability/guide/claude_code_skills/
description: Datadog の Claude Code スキルを使用して、ライブ本番環境データに対し、セッションの分類、障害の診断、実験の比較、Python
  実験コードの生成、および評価器のブートストラップを実行します。
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: ドキュメント
  text: Agent Observability 評価
- link: /llm_observability/improve/experiments/
  tag: ドキュメント
  text: LLM 実験
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: ガイド
  text: '評価開発者ガイド: カスタム評価器の構築'
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: ブログ
  text: Bits Evals で AI エージェントの品質を向上させる
- link: https://github.com/datadog-labs/agent-skills
  tag: GitHub
  text: datadog-labs/agent-skills
title: Claude Code Skills を使用した LLM アプリケーションの分析
---
## 概要 {#overview}

Datadog は、Agent Observability 分析を開発ワークフローに直接取り込む一連の [Claude Code][1] スキルを提供しています。ダッシュボードを手動で操作する代わりに、Claude Code セッションからこれらのスキルを呼び出して、ライブ本番環境データに対し、セッションの分類、障害の診断、実験の比較、Python 実験コードの生成、および評価器のブートストラップを実行できます。

| スキル | 何をするか |
|-------|-------------|
| `/agent-observability-session-classify` | ml_app からのセッション、トレース、またはセッションのバッチにおいて、ユーザーの意図が満たされたかどうかを分類する |
| `/agent-observability-trace-rca` | 本番環境の LLM トレースに対する根本原因を分析する |
| `/agent-observability-experiment-analyzer` | LLM 実験結果を分析および比較する |
| `/agent-observability-experiment-py-bootstrap` | `ddtrace.llmobs` SDK を使用して Python 実験コードを生成します。アプリケーションを検査して実際の `task_fn` (プレースホルダーなし) を接続し、`.env` から資格情報を自動検出し、評価器の選択を指示する自由形式の `--purpose` を受け入れる |
| `/agent-observability-eval-bootstrap` | トレースから評価器コードを生成したり、オンラインの LLM ジャッジ評価器を公開したり、実験で使用するためにトレースをデータセットにサンプリングしたりする |
| `/agent-observability-eval-pipeline` | 本番環境トレースから、評価器、データセット、実験、分析に至るまでの 6 段階のガイド付きパイプライン。`--stop-after` で早期停止し、`--start-at` でフローの途中から再開します。|

これらのスキルは、構造化された実用的な出力 (修正前後の提案を含む RCA レポート、生成された評価器コード、実験の比較など) を生成し、それをコーディングエージェントに直接渡してアプリケーションに修正を適用できます。Claude Code がコードベースにアクセスできる場合、関連するシステムプロンプト、ツール定義、またはルーティングロジックを検索し、セッションを離れることなく特定の差分を提案できます。

## セットアップ {#setup}

### 前提条件 {#prerequisites}

- [Claude Code][1] がインストール済みおよび認証済み
- [Agent Observability でインスツルメント済み][2] でトレースを生成している LLM アプリケーションが少なくとも 1 つ必要
- データバックエンド: Datadog MCP サーバー **または** `pup` CLI のいずれか

### スキルをインストールする {#install-the-skills}

スキルは [agent-skills][6] リポジトリで公開されています。次のコマンドを使ってインストールしてください。

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

インストール後、すべての Claude Code セッションでスキルが利用可能になります。

### Datadog MCP サーバー {#datadog-mcp-server}

Datadog MCP サーバーオプションを使用するには、Agent Observability MCP サーバーを Claude Code セッションに接続してください。

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">選択したサイトではこの製品はサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

すべてのスキルは、起動時に MCP サーバーを自動的に検出し、その後も継続して使用します。

### オプション B: pup CLI {#option-b-pup-cli}

MCP サーバーを使用したくない場合は、Datadog の内部 CLI である [`pup`][5] を介してスキルを実行することもできます。`pup` をインストールして認証してください。

```shell
pup auth login
```

各スキルは起動時に MCP サーバーが利用可能かどうかを検出し、利用できない場合は `pup` を確認して自動的に pup モードに切り替えます。スキルの呼び出し時に `--backend pup` を渡すことで、明示的に pup モードを強制することもできます。

pup モードでは、すべての Datadog API 呼び出しは MCP ツールではなく `pup llm-obs` サブコマンドを通じて行われます。出力とワークフローは同一です。

## スキル {#skills}

### セッションとトレースの分類 {#classify-sessions-and-traces}

`/agent-observability-session-classify` は、特定のインタラクションにおいてユーザーの意図が満たされたかどうかを評価します。提供するものに応じて、3 つのモードで動作します。

| モード | 呼び出し方法 | 使用のタイミング |
|------|-------------|----------|
| セッション | `session_id` | 特定のセッションの評価 |
| トレース | `trace_id` | 単一の Agent Observability トレースの評価 |
| アプリ | `ml_app` | 最近のセッションやトレースのバッチのサンプリングと分類 |

このスキルは最大 3 つのシグナルソースから情報を取得し、アクセス可能なデータが多いほど精度が向上します。

- **Agent Observability トレース** — 完全なスパンツリー、会話内容、ツール呼び出しの結果、および評価ジャッジの判定。常に使用可能です。
- **RUM 行動シグナル** — ページビュー、カスタムアクション、滞在時間、およびトレースの内容を裏付けたり矛盾したりする明示的なフィードバックイベント。RUM がアプリに実装されている場合に使用可能です。
- **Audit Trail** — サーバーで確認された書き込みイベント (ダッシュボードの作成、モニターの変更、ノートブックの削除など)。アシスタントの操作が実際に反映されたかどうかを証明します。セッションにアセットの作成や編集が含まれる場合に最も信頼できるシグナルとなります。

このスキルは、デフォルトで 1 文の理由を添えたコンパクトな `yes / partial / no` 判定を返します。完全なマークダウンレポートを取得するには、`verbose: true` を追加してください。

**例:**

```
/agent-observability-session-classify session_id=abc-123
/agent-observability-session-classify trace_id=def-456
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

### 根本原因分析による障害診断 {#diagnose-failures-with-root-cause-analysis}

`/agent-observability-trace-rca` は、失敗したトレースのスパンツリーをたどり、LLM アプリケーションが不適切な結果を出力している原因を特定します。次の利用可能なシグナルに基づいて、最適な分析モードを選択します。LLM ジャッジによる評価判定 (最も強力なシグナル)、ランタイムエラー、またはレイテンシの異常値やエージェントループの決定などの構造的異常。

このスキルは、失敗したスパンをサンプリングして障害分類にグループ化し、根本原因のカテゴリ、裏付けとなる証拠、具体的な修正案を含む構造化された RCA レポートを作成します。各修正には、トレースからの実際のテキストやコード (システムプロンプトの抜粋、ツール引数の形式、ルーティングロジックなど) が含まれ、`BEFORE` / `AFTER` で変更箇所が正確に示されます。

Claude Code がコードベースにアクセスできる場合、このスキルは関連するソースファイルを検索し、すぐに適用可能な差分を提案します。システムプロンプトの不備、ツールの誤用、またはルーティングエラーが発生した場合、セッションを離れることなく、診断からプルリクエストの作成までを行うことができます。

**例:**

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

### 実験の分析と比較 {#analyze-and-compare-experiments}

`/agent-observability-experiment-analyzer` は実験結果を取得し、候補とベースラインの間で何が変更されたかを明らかにします。単一の実験 (探索分析) またはペア (比較分析) に対して機能します。

このスキルは、どのメトリクスが改善または悪化したか、どのイベントカテゴリが変化したか、そして候補がどこで期待を下回ったかを強調表示するため、自信を持って昇格の判断を下すことができます。

**例**

```
/agent-observability-experiment-analyzer experiment_id=exp-123
/agent-observability-experiment-analyzer experiment_id=exp-456 baseline_id=exp-123
```

### Python SDK を使用して実験コードを生成する {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap`は、`ddtrace.llmobs` SDK を使用して標準の [リファレンスノートブック][7] と一致する、自己完結型の `.py` スクリプトまたは Jupyter `.ipynb` ノートブックを出力します。

データセットには、ローカルの `DatasetRecordRaw[]` JSON (ファイルにインライン化)、CSV (`LLMObs.create_dataset_from_csv` を介して実行時に読み込み)、名前による既存の Datadog データセット (`LLMObs.pull_dataset`)、またはデフォルトの小さなインライン 3 レコードサンプルを使用できます。

**以下のフラグはすべて任意です。**引数なしで `/agent-observability-experiment-py-bootstrap` を呼び出すと、必要な情報が求められ、デフォルトの 3 レコードのサンプルに対して実行可能なファイルが生成されます。

| オプション | 必須 | デフォルト | 説明 |
|--------|----------|---------|-------------|
| <span class="text-nowrap">`--purpose`</span> | No | 設定されていない、または推論できない場合は入力を求められる | 実験が何を検証するかを説明する自由形式の文字列。イントロスペクションのランキング、ラッパーの戻り値の形状、および評価器のセマンティクスに影響を与える |
| <span class="text-nowrap">`--format`</span> | No | `py` | `py` または `ipynb` |
| <span class="text-nowrap">`--dataset`</span> | No | インラインの 3 レコードサンプル | ローカル `DatasetRecordRaw[]` JSON または CSV。`--dataset-name` | とは相互に排他的
| <span class="text-nowrap">`--dataset-name`</span> | No | なし | `LLMObs.pull_dataset` を介して実行時に取得する既存の Datadog データセット。`--dataset` | とは相互に排他的
| <span class="text-nowrap">`--dataset-version`</span> | No | 最新 | `--dataset-name` | を使用する際に特定のバージョンを固定する
| <span class="text-nowrap">`--project-name`</span> | No | `experiment-<service-name>` コードベースから推論 | Experiments UI に表示される Datadog プロジェクト名 |
| <span class="text-nowrap">`--evaluator-style`</span> | No | `function` | `function` / `class` / `remote`。サーフェスを選択します。`--purpose` がセマンティクスを選択する |
| <span class="text-nowrap">`--task-source`</span> | No | イントロスペクションから自動 | 明示的 `<module.path>:<function>` `task_fn` |としてラップする
| <span class="text-nowrap">`--placeholder-task`</span> | No | オフ | イントロスペクションをスキップして汎用的な `# TODO(user)` プレースホルダーを出力する |
| <span class="text-nowrap">`--app-root`</span> | No | 推論 | イントロスペクションスキャンをこのディレクトリに制限する |
| <span class="text-nowrap">`--env-file`</span> | No | なし | 明示的 `.env` パス。生成されたファイルに `ENV_FILE_OVERRIDE` | として組み込み
| <span class="text-nowrap">`--jobs`</span> | No | `10` | 同時実行数が `experiment.run(jobs=N)` | に渡される
| <span class="text-nowrap">`--output`</span> | No | `./experiments/experiment.<ext>` | 出力ファイルパス |

**例**

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection on ambiguous queries" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond --evaluator-style remote
/agent-observability-experiment-py-bootstrap --placeholder-task --format ipynb
```

### トレースデータから評価器をブートストラップする {#bootstrap-evaluators-from-trace-data}

`/agent-observability-eval-bootstrap` は、ml_app (またはコンテキスト内にすでにある RCA レポート) からの本番環境トレースを分析し、観測された障害モードを捕捉する評価器のスイートを提案します。4 つのアーティファクトのいずれかを出力します。

| モード | フラグ | 出力 |
|------|------|--------|
| SDK コード (デフォルト) | — | Python `BaseEvaluator` / `LLMJudge` [LLM Experiment][3] にすぐに組み込めるクラス |
| JSON 仕様 | `--data-only` | フレームワークに依存しない評価器仕様。レビューや手動実装に適している |
| オンラインジャッジ | `--publish` | Datadog に直接公開され、ml_app で有効化される LLM ジャッジ評価器 |
| データセットの出力 | `--emit-dataset <path>` | 1 つの `DatasetRecordRaw[]`JSON ファイルが本番環境トレースからサンプリングされ、`LLMObs.create_dataset(records=...)` 用に整えられます。評価器のワークフローを完全にスキップします。このモードは評価器ではなくデータセットを生成します |

最初の 3 つのモードは同じ評価器プロポーザルワークフロー (ワークフロー) を共有しており、スイートの具体化方法のみが異なります。4 番目のモード (`--emit-dataset`) は独立しており、`ml_app` (`@status:ok` にフィルタリング済み) のルートスパンをサンプリングし、レコードごとに `input_data` と `expected_output` を抽出し、文字列値に対して PII スクラブを実行し、データセットとして Datadog に公開して実験を実行できる JSON ファイルを書き出します。レコードごとの `tags` は自動正規化されるため (生の文字列は `tag:<value>` としてラップされます)、`Dataset.append()` がレコードを拒否することはありません。`expected_output` フィールドは**本番環境の動作ベースライン**として文書化されており、グラウンドトゥルースではありません。ラベル付きゴールドセットに昇格する前の回帰スタイルの実験 (リファクタリングによって観測される出力が変化するかどうか)に役立ちます。

**例**

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json --trace-limit 25
```

### エンドツーエンドのパイプラインを実行する {#run-the-end-to-end-pipeline}

`/agent-observability-eval-pipeline` は、agent-observability サブスキルを単一の監視されたナレーション付きワークフローに連結し、本番環境トレースから、評価器、データセット、実験、および分析へと進むプロセスを実現します。各フェーズには同じエンベロープがあります。生成されるエンティティに名前を付けるバナー、その目的を説明する教育ブロック、アクション (サブスキルの呼び出しまたは小さな実行可能ステップ)、および確認を待つチェックポイントです。既存の評価器や実験がなく、決定論的なウォークスルーを希望する場合の推奨される開始点です。

```
Phase 1: Classify ml_app traces      → agent-observability-session-classify (ml_app mode)
Phase 2: Root cause analysis         → agent-observability-trace-rca
Phase 3: Bootstrap evaluators        → agent-observability-eval-bootstrap
Phase 4: Create + publish dataset    → agent-observability-eval-bootstrap --emit-dataset + LLMObs.create_dataset(records=...)
Phase 5: Generate + run experiment   → agent-observability-experiment-py-bootstrap + python <generated_file>
                                       (with an in-phase review beat between codegen and run)
Phase 6: Analyze experiment          → agent-observability-experiment-analyzer
```

各フェーズには標準的な短い名前があり、`--start-at` および `--stop-after` で受け入れられる値と同じです。単一のフェーズを明確に参照する必要がある場合は、常にこれらの名前を使用してください (例: スクリプト内、チームメイトとのチャット、サポートチケットなど)。

| # | フェーズタイトル | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">ステージ名</span> | 呼び出されるサブスキル | 概要 | 出力アーティファクト |
|---|-------------|----------------------------------------------------------------------------------------|-------------------|---------|-----------------|
| 1 | ml_app トレース分類 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `/agent-observability-session-classify` (ml_app モード) | MCP `search_llmobs_spans` は `ml_app` の最近のルートスパンをサンプリングします。各スパンは成功/部分成功/失敗として分類され、一般的なパターンにグループ化されます。| 分類の概要 + ユニットごとのブロック |
| 2 | 根本原因分析 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `/agent-observability-trace-rca` | MCP `search_llmobs_spans`は、フェーズ 1 で特定された失敗したスパンの完全なトレースを取得します。トレースツリーをたどって、各失敗をルートスパンと失敗モードに帰属させます。| 失敗モードの分類と根本原因を含む RCA レポート |
| 3 | 評価器のブートストラップ | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | `/agent-observability-eval-bootstrap` | フェーズ 2 の RCA に関するローカル推論 — MCP 呼び出しなし。Python 評価者コード (`sdk_code`)、フレームワークに依存しない JSON 仕様 (`data_only`) を出力するか、パブリック API を介してオンライン LLM ジャッジ評価器を Datadog に直接公開します (`publish`)。| 評価スイート (`sdk_code` / `data_only` / `publish` モード) |
| 4 | データセットの作成と公開 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `/agent-observability-eval-bootstrap --emit-dataset` + `LLMObs.create_dataset(records=...)` | MCP `search_llmobs_spans` はルートスパンをサンプリングし、`(input_data, expected_output)` ペアを抽出し、PII をスクラブしてローカルの JSON ファイルに書き込みます。公開サブステップは、その後 `LLMObs.create_dataset()` を ddtrace SDK (MCP ではなく) 経由で呼び出し、データセットを Datadog にプッシュします。| ローカル `DatasetRecordRaw[]` JSON + 公開された Datadog データセット (名前、バージョン、URL) |
| 5 | 実験の生成と実行 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `/agent-observability-experiment-py-bootstrap` + `python <generated_file>` (コード生成と実行の間に `run` / `edit` / `stop` のレビュービートがあります) | 主にローカル: スキルはアプリをイントロスペクトして LLM 呼び出しサイト (OpenAI / Anthropic / LangChain / LiteLLM / LlamaIndex / Bedrock / Gemini デコレーター) を探し、`task_fn` を実際のエントリーポイントに接続する自己完結型の Python ファイルを出力します。起動時に、1 つの MCP `list_llmobs_evals` 呼び出しが接続性とテレメトリのビーコンとして実行されます。生成されたファイルは、実行時に ddtrace SDK を使用します。実行中に MCP 呼び出しは行われません。| 生成された `.py` または `.ipynb` + `experiment.url` | による実験の実行
| 6 | 実験の分析 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `/agent-observability-experiment-analyzer` | MCP を多用: トップラインメトリクスには `get_llmobs_experiment_summary`、レコードごとのスコアには `get_llmobs_experiment_metric_values`、個々の行をドリルダウンするには `list_llmobs_experiment_events` + `get_llmobs_experiment_event`、セグメントの内訳には `get_llmobs_experiment_dimension_values` を使用します。調査結果を構造化されたレポートにまとめます。| 分析レポート (メトリクスの内訳、セグメントのパフォーマンス、推奨される次の実験を含む) |

フェーズ 4 と 5 のみがマシン上でコードを実行します。それ以外は読み取り専用であるか、生成されたファイルを `--output-dir` に書き込むだけです。従来の 3 フェーズの評価パイプラインの動作 (分類 → RCA → 評価器のブートストラップのみ) は、`--stop-after eval-bootstrap` を渡すことで維持されます。フェーズ 5 では、コード生成と実行の間に一時停止するため、プロバイダーのトークンが消費される前に生成された実験ファイルを確認できます。`run` と入力すると実行、`edit` と入力すると一時停止して調整、または `stop` と入力すると正常に終了できます。

**どのフェーズからでも開始および終了できます。**パイプラインは、各チェックポイントがレンダリングされる前に、各フェーズの主要な出力 (分類サマリー、RCA レポート、評価スイート、データセット、公開されたデータセット名、実験ファイル、実験実行、分析レポート) を `<output-dir>/state/0N-<name>.{md, json}` に保存します。これは以下を意味します。

- **`stop`** 任意のチェックポイントで (または `--stop-after <phase>` を最初から) 実行を正常に終了し、再開可能な成果物をディスクに残します。
- **`--start-at <phase>`**以前のすべてのフェーズの状態ファイルを読み込み (または指定した場合はオーバーライドフラグを受け入れ)、指定されたフェーズに直接スキップします。数時間後や数日後に再開することも、以前の処理を再実行することなく「この実験を再分析する」に直接ジャンプすることも可能です。

各フェーズでのチェックポイントの語彙: `continue` は進む、`stop` は正常に終了する、`redo` は現在のフェーズを再実行する (オプションの調整メモを付加)、`back` は 1 フェーズ戻る。その他の入力は調整として扱われます。

**`<ml_app>` のみが必要です。**以下の各フラグはオプションです。スキルはそれぞれに対して適切なデフォルトを選択します。最小限の呼び出しは `/agent-observability-eval-pipeline <ml_app>` です。テーブルの残りの部分は、デフォルトを上書きしたり、フローの途中で再開したり、特定の出力場所を指定したりする場合に使用します。

| オプション | 必須 | デフォルト | 説明 |
|--------|----------|---------|-------------|
| `<ml_app>` | **Yes** | — (必須) | オンボード/評価対象のインストルメント化された LLM アプリケーション |
| `--project-name` | No | 由来: `pyproject.toml` / `setup.cfg` / `setup.py` / `package.json` / cwd | パイプラインがデータセットと実験を書き込む Datadog プロジェクト。Precheck で表示され、フェーズ 4 の `LLMObs.enable(project_name=...)` によって遅延作成される |
| `--timeframe` | No | `now-7d` | フェーズ 1 の分類およびフェーズ 4 のデータセットサンプリングのためのルックバックウィンドウ |
| `--trace-limit` | No | `20` | フェーズ 4 のサンプリング上限。フェーズ 1 は内部的に分類サンプルに `min(20, --trace-limit)` を使用 |
| `--format` | No | `py` | フェーズ 5 で `agent-observability-experiment-py-bootstrap` に渡される: `py` (スクリプト) または `ipynb` (Jupyter ノートブック) |
| `--evaluator-style` | No | `function` | フェーズ 3 およびフェーズ 5 に渡される: `function`、`class`、または `remote` |
| `--data-only` | No | オフ | フェーズ 3 のパススルー: Python SDK コードの代わりに、フレームワークに依存しない JSON 評価仕様を出力する |
| `--publish` | No | オフ | フェーズ 3 のパススルー: オンラインの LLM ジャッジ評価器を Datadog に公開する |
| `--stop-after` | No | `analyze` (すべて実行) | 指定されたフェーズが完了した後に停止します。受け入れ: `classify`、`rca`、`eval-bootstrap` * (従来の 3 フェーズの動作と一致) *、`dataset`、`experiment`、`analyze` |
| `--start-at` | No | `classify` (最初から開始) | 以前のフェーズをスキップし、指定されたフェーズから開始します。`--stop-after` と同じ語彙。`<output-dir>/state/` | から以前のフェーズのアーティファクトを自動的に読み込む
| `--classification-summary` | No | 自動読み込み元 `state/01-classification.md` | フェーズ 2 が消費するフェーズ 1 の出力を上書きする (`--start-at rca` 以降で使用) |
| `--rca-report` | No | 自動読み込み元 `state/02-rca-report.md` | フェーズ 3 が消費するフェーズ 2 の出力を上書きする |
| `--dataset-file` | No | 自動読み込み元 `state/04-published-dataset.json` の `dataset_file` フィールド | ローカルの `DatasetRecordRaw[]` JSON。再サンプリングせずに再公開する場合に、フェーズ 4 の公開サブステップで使用 |
| `--dataset-name` | No | 自動読み込み元 `state/04-published-dataset.json` | フェーズ 5 が実験を接続する、公開された Datadog データセットの名前 |
| `--experiment-file` | No | 自動読み込み元 `state/05-experiment-run.json` | 生成された実験ファイル。存在する場合、フェーズ 5 はコード生成をスキップし、直接レビュービート → 実行に進みます |
| `--experiment-id` / `--experiment-url` | No | 自動読み込み元 `state/05-experiment-run.json` | フェーズ 6 が分析する Datadog 実験 (相互排他的) |
| `--app-root` | No | cwd から解決 / `pyproject.toml` など | フェーズ 5 のタスク関数イントロスペクションをこのディレクトリツリーに制限する |
| `--env-file` | No | なし (自動検出で標準的な場所を走査する) | 認証情報読み込み用の明示的な `.env` パス。Precheck で表示 |
| `--output-dir` | No | `./experiments` | データセット JSON、公開スクリプト、生成された実験ファイル、および `state/` ディレクトリが書き込まれる場所 |

**例**

```
# Full six-phase walkthrough for a brand new ml_app
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot

# Organize the dataset and experiment under a specific Datadog project
# (the project is created lazily — no need to pre-create it in the UI)
/agent-observability-eval-pipeline my-chatbot --project-name customer-qa-eval

# Classic three-phase eval-pipeline behavior — preserves backward compatibility
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap

# Resume from where a previous run stopped
/agent-observability-eval-pipeline my-chatbot --start-at experiment

# Re-analyze a previous experiment run without re-running it
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>

# Run a single phase in isolation
/agent-observability-eval-pipeline my-chatbot --start-at dataset --stop-after dataset
```

> **プロジェクト名** — `--project-name` が省略された場合、スキルはコードベースから自動的に導出します (順序: `pyproject.toml` → `setup.cfg` → `setup.py` → `package.json` → cwd ベース名)。省略された場合は `experiment-sdk-default` が使用されます。解決された名前は、フェーズが実行される前に Precheck の出力に表示されるため、再呼び出しすることなく確認または上書きできます。Datadog プロジェクト自体は、フェーズ 4 でデータセットが公開される際に `LLMObs.enable(project_name=...)` によって遅延作成されます。UI で事前に作成しておく必要はありません。

## 一般的なワークフロー {#typical-workflow}

LLM アプリケーションの評価が初めての場合は、以下のフローが推奨されます。

1. **パイプラインを実行**して、本番環境のトレースから、評価器、シードデータセット、実験、分析までを一通り実行します。
   ```
   /agent-observability-eval-pipeline <ml_app> --project-name <project>
   ```
   従来の評価器のみの出力 (データセットや実験なし) で停止するには、`--stop-after eval-bootstrap` を渡します。前回の実行を再開するには、`--start-at <phase>` を渡します。パイプラインは `<output-dir>/state/` から以前の状態を再読み込みし、そこから継続します。

2. **修正を適用します。**フェーズ 2 で作成された RCA レポートには、トレースエビデンスに基づいた具体的な修正前後の提案が含まれています。レポートをコーディングエージェントに渡すか (または直接実行する)、コードベース内のシステムプロンプト、ツール定義、またはルーティングロジックを修正してください。

3. **オフライン実験を実行します**。生成された評価器をラベル付きデータセットに対して使用して、本番環境で有効にする前にその品質を検証してください。[評価開発者ガイド][4] を参照してください。

4. **オンライン評価器を公開します**。評価器が検証されたら実行します。`/agent-observability-eval-bootstrap` を `--publish` で実行すると、Datadog 内にオンライン LLM ジャッジ評価器が作成され、本番環境のトレースに対してリアルタイムで自動的に実行されます。コードの変更は不要です。
   ```
   /agent-observability-eval-bootstrap <ml_app> --publish
   ```

5. **監視および反復します。**アプリの進化に合わせて `/agent-observability-trace-rca` および `/agent-observability-eval-bootstrap` を再実行し、新たな障害モードを検出し、評価器スイートを最新の状態に保ってください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://claude.ai/code
[2]: /ja/llm_observability/setup/
[3]: /ja/llm_observability/improve/experiments/
[4]: /ja/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: https://datadoghq.atlassian.net/wiki/spaces/BITSAI/pages/5226692942/pup+CLI
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks
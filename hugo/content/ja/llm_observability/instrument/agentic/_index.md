---
aliases:
- /ja/llm_observability/instrumentation/agentic/
title: Agentic インスツルメンテーション
---
## ガイドライン {#guidelines}

**重要**: 他の手順へのハイパーリンクをたどる際は、ここに記載されている**すべての**ガイドラインに従ってください。

1. Datadog Agent Observability および Datadog トレーサーに関連するコードのみを追加してください。手動インスツルメンテーションを目的とする場合を除き、関連のないコードを変更しないでください。
2. モノレポや複数のサービスまたはインスツルメンテーションターゲットを持つプロジェクトで実行する場合は、どのサービスまたはサブプロジェクトを Agent Observability のインスツルメンテーション対象とするかをユーザーに確認してください。
3. 最新の Datadog SDK をインストールしてください。既にインストールされている場合は、依存関係を更新してもよいかユーザーにチェックしてください。

## 前提条件 {#pre-requisites}

1. Agent Observability データを Datadog に送信するには、Datadog API キーが必要です。API キーがないと、ユーザーは Agent Observability データを受信できないため、これは**必須要件**です。ユーザーがまだ API キーを提供しておらず、提供を希望しない場合は、アプリケーションのインスツルメンテーションを続行してください。その際、最後に API キーを設定する必要があることを明示し、設定場所を案内してください。
2. インスツルメンテーションを行うアプリケーションで使用されているプログラミング言語とフレームワークを特定してください。これは、アプリケーションを正しくインスツルメンテーションするために重要です。

## 環境変数 {#environment-variables}

すべての環境変数は、メインのアプリケーションプロセスが起動する前、_または_アプリケーションのエントリポイントの最初の行で設定する必要があります。

これらの環境変数はインライン化しないでください。代わりに、プロセスから直接読み取るようにしてください。

- ローカル開発の場合は、アプリケーションと使用している言語に適した `.env` などのファイルに設定し、Agent Observability SDK の初期化時にそれらが設定されていることを確認してください (各言語固有のガイドを参照してください)。
- ローカル開発以外の場合は、設定が必要な環境変数についてもユーザーに伝えてください。

### API キー {#api-key}

これは**極めて重要**です。以下の環境変数で API キーを設定してください。

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Agent Observability を有効にする{#enable-agent-observability}

これは**極めて重要**です。Agent Observability を適切に有効にするには、以下の環境変数を設定してください。

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Agent Observability アプリケーション名 {#agent-observability-application-name}

これは**強く推奨されます**。ユーザーが最初のプロンプトの一部としてアプリケーション名 (または `DD_LLMOBS_ML_APP`) を提供した場合は、その値を使用してください。それ以外の場合は、フォルダー、リポジトリ、またはプロジェクト名に基づいた論理名を使用してください。

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Datadog サイト {#datadog-site}

これは**オプション**です。ユーザーの API キーに関連付けられたデータセンターに対応する Datadog サイトを設定してください。提供されない場合 (場合によっては `DD_SITE` を介して)、`datadoghq.com` のサイトが使用されることをユーザーに通知してください。_値が提供されている場合_は、それを環境変数として設定してください。

```bash
DD_SITE=<provided-dd-site>
```

## アプリケーションをインスツルメンテーションする {#instrument-the-application}

検出された言語の手順に従ってください。

| 言語 | 手順 |
|----------|-------------|
| Python| [Python アプリケーションの Agentic インスツルメンテーション](/llm_observability/instrument/agentic/python.md) |
| Node.js| [Node.js アプリケーションの Agentic インスツルメンテーション](/llm_observability/instrument/agentic/nodejs.md) |
| Java| [Java アプリケーションの Agentic インスツルメンテーション](/llm_observability/instrument/agentic/java.md) |
| OpenTelemetry| [OpenTelemetry のインスツルメンテーション](/llm_observability/instrument/otel_instrumentation.md) |

{{< agent-only >}}
## 推奨されるチェックのためにエージェントのコンテキストを共有する{#share-agent-context-for-check-recommendations}

Datadog の初期オンボーディングのプロンプトに、エージェントコンテキストのアップロード URL、アップロードトークン、およびスキーマバージョンが含まれている場合にのみ、このステップを実行してください。

インスツルメンテーション後:

1. エージェントの目的、ツール、明示的な動作ルール、およびハンドオフ条件を理解するために必要なリポジトリファイルのみを検査してください。
2. 引用されたプロンプト、指示、ポリシー、またはテストによって直接サポートされている期待値のみを含めてください。1 つの期待事項につき 1 つのアトミックな動作を記録し、エージェントの入出力、トレースコンテキスト、ツール呼び出し、ツールの実行結果、あるいはそれらの順序といった観点​​から表現します。また、曖昧なルールや矛盾するルールについては、推測で補うのではなく、除外してください。
3. オンボーディングプロンプトのスキーマバージョンと以下の正確な形式を使用して、サイズ制限のある JSON 要約を作成します。

   ```json
   {
     "schema_version": "<schema-version-from-the-onboarding-prompt>",
     "context": {
       "agent_summary": "A short description of the agent",
       "capabilities": [
         {
           "name": "...",
           "description": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "tools": [
         {
           "name": "...",
           "purpose": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "behavioral_expectations": [
         {
           "id": "expectation-1",
           "behavior": "...",
           "applicability": "...",
           "failure": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "handoff_conditions": [
         {
           "id": "handoff-1",
           "condition": "...",
           "destination": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "source_references": [
         {
           "id": "source-1",
           "source_kind": "prompt",
           "path": "relative/path",
           "line_start": 1,
           "line_end": 10,
           "description": "Why this source supports the summary"
         }
       ]
     }
   }
   ```

   エンコードされた `context` オブジェクトを 64 KiB 以下に保ち、以下の収集制限を適用します。

   - 最大 20 個の機能と 30 個のツール。
   - 1 ～ 30 個の動作期待値。
   - 最大 20 個のハンドオフ条件。
   - 1 ～ 60 個のソース参照。

   各機能、ツール、動作期待値、およびハンドオフ条件に対して、1 ～ 10 個の固有のソース参照 ID を使用します。各動作期待値とハンドオフ条件は、少なくとも 1 つの `prompt`、`instruction`、`policy`、または `test` ソースを引用し、1 ～ 6 個の固有の観測可能なシグナルを含める必要があります。

   `agent_summary` を 1 ～ 1,000 文字に保ちます。名前とハンドオフ先を 1 ～ 120 文字に保ちます。説明、目的、動作、適用性ステートメント、失敗、引き渡し条件、およびソースパスは、1 文字から 500 文字の間に収めます。ソース参照の説明は 1 文字から 300 文字の間に収めます。

   すべてのソース参照、動作期待値、およびハンドオフ条件には、文字、数字、ハイフン、またはアンダースコアのみを含む 1 ～ 64 文字の ID を付与します。ソース参照 ID は `source_references` 内で一意である必要があります。動作期待値とハンドオフ条件の ID は、両方のコレクション全体で一意である必要があります。ID はこのアップロードに対してローカルなものであり、各推奨チェックがその証拠を引用できるようにします。

   `source_kind` は `prompt`、`instruction`、`policy`、`test`、`tool_definition`、または`implementation` からのみ使用します。`observable_signals` は`agent_input`、`agent_output`、`trace_context`、`tool_call`、`tool_result`、または`tool_order` からのみ使用します。`line_end` を含める場合は、肯定的な `line_start` も含め、`line_end` を`line_start` 以上にする必要があります。

4. JSON をオンボーディングプロンプトのアップロード URL に一度送信します。`POST` を使用し、`Content-Type: application/json` を設定し、アップロードトークンは `Authorization: Bearer <upload-token>` ヘッダーでのみ渡します。

以下のセキュリティ要件に従ってください。

- アップロードトークンは使い捨ての秘密情報として扱ってください。ソースファイル、構成、シェル履歴、出力、またはログに書き込まないでください。
- 構造化されたサマリーのみをアップロードしてください。生のソースコード、完全なプロンプト、秘密情報、資格情報、環境変数、顧客データ、トレース内容、または任意のメタデータをアップロードしないでください。
- 正規化されたリポジトリ相対の POSIX ソースパスと、最小限の有用な行範囲を使用してください。絶対パス、バックスラッシュ、コロン、非正規化されたセパレーター、または `.` や `..` のパスセグメントは使用しないでください。ソース参照は証拠を特定するものであり、その内容をコピーしてはなりません。
- アップロードが失敗した場合は、インスツルメンテーションを継続し、Datadog がオプションのコンテキストを受信しなかったことをユーザーに伝えてください。より広範なデータで再試行しないでください。

{{< /agent-only >}}
## プロンプトをインスツルメンテーションし、Prompt Management を提供する{#instrument-prompts-and-offer-prompt-management}

Prompt Tracking は、デフォルトの Agent Observability インスツルメンテーションの一部です。選択した各 LLM 呼び出しのプロンプト構築境界を特定し、プロンプトテンプレートを動的変数とは別に保持してください。

1. ユーザーのリクエストで既に Datadog 管理プロンプト ID が指定されている場合は、「[Prompt Management Agentic インテグレーションガイド](/llm_observability/instrument/agentic/prompt_management.md)」に従ってください。Prompt Management を使用するかどうかについて再度尋ねないでください。
2. それ以外の場合は、アプリケーションのプロンプトと、それらのフォーマットに使用される動的変数を特定してください。既存のプロバイダー、モデル、プロンプトコンテンツ、およびアプリケーションの動作を保持してください。
3. サポートされている Python アプリケーションの場合は、特定したプロンプトをユーザーに伝え、それらのプロンプトを Datadog で管理するかどうかを尋ねてください。ユーザーが同意した場合は、「[Prompt Management Agentic インテグレーションガイド](/llm_observability/instrument/agentic/prompt_management.md)」に従って、選択したローカルプロンプトを昇格させ、ローカルでの構築を管理対象プロンプトの取得に置き換えてください。
4. ユーザーが Prompt Management を拒否した場合、またはアプリケーションの言語がサポートされていない場合は、「[Prompt Tracking の手順](/llm_observability/instrument/prompt_tracking)」に従って、選択したプロンプトに構造化プロンプトメタデータを組み込んでください。ランタイムでのプロンプト取得は追加しないでください。

Prompt Management がローカルプロンプトを置き換える場合は、重複する構造化プロンプトメタデータを添付するのではなく、管理対象プロンプトの自動追跡を使用してください。

## トレースを表示する {#viewing-traces}

アプリケーションにアクセスして Datadog でデータを確認できることをユーザーに伝えてください。

**必須**: ユーザーがこのアプリケーションに関連付けられたデータを表示できるパーマリンクを提供してください。これは以下の形式になります。

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

提供された値を入力してください。
1. `dd_site` - [Datadog site](#datadog-site)の値が提供されている場合は、その値を使用してください。それ以外の場合は、`datadoghq.com` を使用してください。
2. `application_name`- [Agent Observability アプリケーション名](#llm-observability-application-name)セクションから提供された値、または推論された値のいずれかを使用してください。

## 言語固有の指示{#language-specific-instructions}

{{< whatsnext desc="コーディングエージェントを使用してアプリケーションをインスツルメンテーションします。" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Python アプリケーションの Agentic インスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Node.js アプリケーションの Agentic インスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Java アプリケーションの Agentic インスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Prompt Management Agentic インテグレーション{{< /nextlink >}}
{{< /whatsnext >}}
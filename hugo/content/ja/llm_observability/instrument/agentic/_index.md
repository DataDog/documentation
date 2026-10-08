---
aliases:
- /ja/llm_observability/instrumentation/agentic/
title: Agentic インスツルメンテーション
---
## ガイドライン {#guidelines}

**重要**: 他の手順へのハイパーリンクをたどる際は、ここに記載されている**すべての**ガイドラインに従ってください。

1. Datadog Agent Observability および Datadog トレーサーに関連するコードのみを追加してください。手動インスツルメンテーションを目的とする場合を除き、関連のないコードを変更しないでください。
2. モノレポや複数のサービスまたはインスツルメンテーションターゲットを持つプロジェクトで実行する場合は、どのサービスまたはサブプロジェクトを Agent Observability のインスツルメンテーション対象とするかをユーザーに確認してください。
3. インストールされている Datadog SDK が、アプリケーションに必要なインスツルメンテーションをサポートしているかどうかをチェックします。サポートされている場合は、そのバージョンを使用します。インスツルメンテーションに SDK の更新が必要な場合は、その理由を説明し、依存関係を更新する前に必ず問い合わせを行ってください。オプションの Prompt Management にのみ必要な更新は、ユーザーがその統合を選択するまで延期します。
4. アプリケーションの既存のプロバイダー、モデル、プロンプトコンテンツ、動作、パッケージマネージャー、およびシークレット管理ワークフローを維持します。

まず、プロンプト追跡（Prompt Tracking）や要求されたコンテキスト共有を含む、インスツルメンテーションを完了させます。次に、オプションのホスト型 Prompt Management を提案します。Prompt Management は、インスツルメンテーション、コンテキスト共有、またはチェックの推奨事項には必須ではありません。

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
| Python | [Python アプリケーションの Agentic インスツルメンテーション][1] |
| Node.js | [Node.js アプリケーションの Agentic インスツルメンテーション][2] |
| Java | [Java アプリケーションの Agentic インスツルメンテーション][3] |
| OpenTelemetry | [OpenTelemetry のインスツルメンテーション][4] |

## プロンプトのインスツルメンテーション {#instrument-prompts}

Prompt Tracking は、デフォルトの Agent Observability インスツルメンテーションの一部です。選択した各 LLM 呼び出しについて、アプリケーションがどこでプロンプトを構築しているかを特定します。プロンプトテンプレートは、それを埋めるために使用される変数値とは分けて保持してください。

ローカルプロンプトの場合は、[プロンプト追跡の指示][5]に従って、プロンプトテンプレートと変数値を LLM スパンとともに記録します。プロンプトを構築する既存のコードはそのまま保持してください。Datadog Prompt Management からプロンプトを取得するコードに置き換えないでください。

アプリケーションがすでに Datadog Prompt Management からプロンプトを取得している場合は、その統合を維持してください。自動追跡は、フォーマット済みのプロンプトが変更されずに、サポートされている自動インスツルメンテーション対象のプロバイダーに渡される場合に適用されます。アプリケーションがフォーマット済みのプロンプトをプロバイダーに送信する前にコピーまたは変更する場合は、[Track prompt usage][6] で説明されているように明示的なアノテーションを追加してください。自動追跡によってすでにプロンプトのメタデータが取得されている場合は、手動でアノテーションを追加しないでください。

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
## トレースを表示する {#viewing-traces}

インスツルメンテーションの変更点、残りのセットアップ要件、およびコンテキストのアップロードが要求された場合にそのステップが成功したかどうかを報告してください。アプリケーションの実行方法と Datadog でデータを表示する方法をユーザーに伝えてください。検証なしにトレースや推奨事項が利用可能であると主張しないでください。

**必須**: ユーザーがこのアプリケーションに関連付けられたデータを表示できるパーマリンクを提供してください。これは以下の形式になります。

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

提供された値を入力してください。
1. `dd_site`: [Datadog site](#datadog-site)の値が提供されている場合は、その値を使用してください。それ以外の場合は、`datadoghq.com` を使用してください。
2. `application_name`: [Agent Observability アプリケーション名](#agent-observability-application-name)セクションから提供された値、または推論された値のいずれかを使用してください。

## オプションのプロンプト管理 {#optional-prompt-management}

インスツルメンテーションと要求されたコンテキストの共有が完了したら、結果を報告してください。次に、Python アプリケーション向けのオプションのホスト型 Prompt Management に対応してください。

- ユーザーがすでに Datadog 管理プロンプト ID を提供している場合は、「Prompt Management Agentic インテグレーションガイド」に従ってください。Prompt Management を有効にするかどうかについて再度尋ねないでください。
- そうでない場合は、アプリケーションのローカルプロンプトを特定し、Datadog でそれらを管理するかどうかをユーザーに尋ねてください。ユーザーが同意した場合は、ガイドに従って選択したプロンプトの管理バージョンを作成し、それらを取得するようにアプリケーションを更新してください。
- ユーザーが拒否した場合、または回答がない場合は、インスツルメンテーションされたローカルプロンプトをそのままにしてください。

ガイドの [Track prompt usage section][6] に従って、自動追跡が必要か、明示的なアノテーションが必要かを判断してください。プロンプトのメタデータが重複しないようにしてください。

Prompt Management に SDK の更新が必要な場合は、その理由を説明し、依存関係を更新する前に許可を求めてください。このオプションの更新によって、コアとなるインスツルメンテーションやコンテキストの共有が遅延してはなりません。

## 言語固有の指示{#language-specific-instructions}

{{< whatsnext desc="コーディングエージェントを使用してアプリケーションをインスツルメンテーションします。" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Python アプリケーションの Agentic インスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Node.js アプリケーションの Agentic インスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Java アプリケーションの Agentic インスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Prompt Management Agentic インテグレーション{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/llm_observability/instrument/agentic/python.md
[2]: /ja/llm_observability/instrument/agentic/nodejs.md
[3]: /ja/llm_observability/instrument/agentic/java.md
[4]: /ja/llm_observability/instrument/otel_instrumentation.md
[5]: /ja/llm_observability/instrument/prompt_tracking.md
[6]: /ja/llm_observability/instrument/agentic/prompt_management.md#track-prompt-usage
[7]: /ja/llm_observability/instrument/agentic/prompt_management.md
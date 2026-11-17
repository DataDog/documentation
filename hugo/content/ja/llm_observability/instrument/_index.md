---
aliases:
- /ja/llm_observability/instrumentation/
- /ja/llm_observability/instrument/agentic/
- /ja/llm_observability/instrumentation/agentic/
description: Datadog SDK、OpenTelemetry、または HTTP API を使用して LLM アプリケーションをインスツルメントし、Agent
  Observability でプロンプトとトレースを追跡します。
further_reading:
- link: /llm_observability/instrument/auto_instrumentation/
  tag: ドキュメント
  text: Agent Observability のための自動インスツルメンテーション
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: ブログ
  text: Datadog LLM Observability は OpenTelemetry GenAI セマンティック規約をネイティブにサポート
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: ラーニングセンター
  text: Agent Observability を使い始める
title: Agent Observability のインスツルメンテーション
---
## 概要 {#overview}

LLM アプリケーションまたはエージェントをインスツルメントして、Agent Observability でトレース、プロンプト、トークン使用量、レイテンシー、およびエラーを収集します。サポートされているプロバイダーとフレームワークには自動インスツルメンテーションを使用し、その他の操作にはカスタムスパンを追加します。これらの手順を自分で実行しても、このページをコーディングエージェントに渡しても、どちらでもかまいません。

{{< skill-callout
    title="コーディングエージェントを使用した Agent Observability のセットアップ"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided setup of Python and Node.js applications."
    action_name="copy_dd_orchestrator_agent_observability_setup_prompt"
    lang="text" >}}
https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md のスキルを使用して、私のプロジェクトで Datadog Agent Observability をインスツルメントします。
{{< /skill-callout >}}

{{< agent-only >}}
このページおよびリンク先のセットアップガイドの手順に従う際には、必ず、以下のガイドラインに従ってください。

1. Agent Observability および Datadog トレーサーに関連するコードのみを追加します。手動インスツルメンテーションで必要な場合を除き、関係のないアプリケーションコードは変更しないでください。
2. モノレポまたは複数のサービスのあるプロジェクトの場合は、編集する前にインスツルメントするサービスまたはサブプロジェクトを確認してください。
3. インストールされている Datadog SDK を調べます。必要なインスツルメンテーションがサポートされている場合は、それを再利用してください。更新が必要な場合は、その理由を説明し、依存関係を変更する前に確認してください。オプションの Prompt Management にのみ必要な更新は、ユーザーがその統合を選択するまで延期してください。
4. アプリケーションのプロバイダー、モデル、プロンプトの内容、動作、パッケージマネージャー、およびシークレット管理ワークフローを維持します。
5. オプションのホスト型 Prompt Management を提案する前に、Prompt Tracking と要求されたすべてのコンテキスト共有を含むインスツルメンテーションを完了します。Prompt Management は、インスツルメンテーション、コンテキスト共有、またはチェックの推奨には必要ありません。
{{< /agent-only >}}

## 前提条件 {#prerequisites}

- データを Datadog に直接送信するための [Datadog API key][8] を取得します。
- アカウントに関連付けられている [Datadog サイト][9]を選択します。

{{< agent-only >}}
セットアップガイドを選択する前に、アプリケーションを調査して、その言語、フレームワーク、LLM プロバイダー、および起動コマンドを特定してください。エージェントレスセットアップの場合は、既存のシークレット管理ワークフローを通じてユーザーが提供した API キーを使用してください。ユーザーがキーを提供しておらず、提供を希望しない場合は、コードの変更を続行してください。最終的な回答で、データ送信にはキーが必要であることを説明し、キーを設定する場所を示してください。キーがない場合、データ送信が成功したと主張しないでください。
{{< /agent-only >}}

## 環境変数を設定する {#configure-environment-variables}

アプリケーションの起動前に環境変数を設定するか、SDK の初期化前に環境変数を読み込みます。

{{< agent-only >}}
アプリケーションの既存の構成またはシークレット管理ワークフローを使用します。ローカル開発の場合は、既存の `.env` ファイルを使用できます。認証情報をソースコードに含めないでください。
{{< /agent-only >}}

次の例では、Datadog Agent を使用せずにデータを Datadog に直接送信します。プレースホルダーを置き換え、これらの値をアプリケーションプロセスに読み込んでください。

```text
DD_API_KEY=<DATADOG_API_KEY>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
DD_SITE=<DATADOG_SITE>
```

アプリケーションが Datadog Agent 経由でデータを送信する場合は、代わりに以下の環境変数を使用してください。`DD_TRACE_AGENT_URL` をご使用の Datadog Agent の URL に設定します。

```text
DD_TRACE_AGENT_URL=<DATADOG_AGENT_URL>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=false
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
```

### Agent Observability アプリケーション名 {#agent-observability-application-name}

`DD_LLMOBS_ML_APP` を、アプリケーションのトレースとスパンをグループ化するために使用する名前に設定します。既存のアプリケーション名を維持するか、サービス、リポジトリ、またはプロジェクトに基づいて名前を選択してください。[アプリケーション命名ガイドライン][10]を参照してください。

{{< agent-only >}}
ユーザーがアプリケーション名または `DD_LLMOBS_ML_APP` を提供した場合は、それを使用します。そうでない場合は、既存の名前を維持するか、フォルダー、リポジトリ、またはプロジェクトから論理的な名前を推測してください。使用した名前を報告してください。
{{< /agent-only >}}

### Datadog サイト {#datadog-site}

`DD_SITE` を API キーに関連付けられているサイトに設定します。デフォルトは `datadoghq.com` です。その他の値については、[Datadog サイト][9]を参照してください。

{{< agent-only >}}
提供された `DD_SITE` 値を使用してください。値が提供または設定されていない場合は、`datadoghq.com` が使用されることをユーザーに伝えてください。ローカル開発環境以外にデプロイする場合は、起動前にユーザーが設定する必要がある環境変数の一覧を示してください。
{{< /agent-only >}}

## アプリケーションをインスツルメンテーションする {#instrument-the-application}

ご使用のアプリケーションに合った方法を選択してください。

| 方法 | 用途 |
|----------|------------|
| [自動インスツルメンテーション][1] | Python、Node.js、Java でサポートされている LLM プロバイダーおよびフレームワーク。|
| [SDK インスツルメンテーション][2] | カスタムスパン、ワークフロー、評価、およびセッション追跡。Go のサポートは実験的であり、手動インスツルメンテーションのみを提供します。|
| [OpenTelemetry インスツルメンテーション][4] | サポートされている OpenTelemetry スパンを出力するアプリケーションおよびフレームワーク。|
| [HTTP API インスツルメンテーション][3] | HTTP 経由で直接スパンと評価を送信するカスタム統合。|

自動インスツルメンテーションは、入力プロンプト、出力補完、トークン使用量とコスト (利用可能な場合)、レイテンシー、エラー、モデルパラメーター、およびフレームワークのメタデータをキャプチャします。サポートされている LLM 呼び出しでは、手動のスパン作成は不要です。

[自動インスツルメンテーションのセットアップ][11]に従って、お使いの言語用の SDK をインストールおよび初期化してください。カスタム操作の場合は、[SDK リファレンス][2]を参照してスパンを追加してください。

直接 HTTP 送信を行う場合は、[スパン API][12] および[評価 API][13] を使用してください。

{{< agent-only >}}
Python、Node.js、または Java の場合は、[自動インスツルメンテーションガイド](/llm_observability/instrument/auto_instrumentation.md#set-up-automatic-instrumentation)に記載の言語ごとのセットアップに従います。Next.js アプリケーションの場合は、一般的な Node.js のセットアップではなく、[Next.js ガイド](/llm_observability/guide/nextjs_guide.md)に従います。OpenTelemetry アプリケーションの場合は、[OpenTelemetry ガイド](/llm_observability/instrument/otel_instrumentation.md)に従います。セットアップが完了したらここに戻り、プロンプトをインスツルメントして残りの手順を完了してください。
{{< /agent-only >}}

## プロンプトをインスツルメントする {#instrument-prompts}

プロンプトのインスツルメンテーション手順については、「[Prompt Management の設定][7]」を参照してください。既存の管理対象プロンプトを使用することも、ローカルプロンプトを昇格させることもできます。ローカルプロンプトをフォールバックとして保持します。

「[プロンプトの使用状況の追跡][6]」に従って、自動追跡と明示的なアノテーションのいずれかを選択します。

{{< agent-only >}}
インスツルメンテーションの結果を報告したら、以下のようにします。

- ユーザーが Datadog の管理対象プロンプト ID を提供した場合は、[Prompt Management ガイド](/llm_observability/configure/prompt_management.md)に従います。再度有効にするかどうか尋ねないでください。
- そうでない場合は、Python または Node.js アプリケーションのローカルプロンプトを特定し、ユーザーにそれらのプロンプトを Datadog で管理するかどうか確認してください。ユーザーが同意した場合は、ガイドに従って選択したプロンプトを昇格させ、ランタイム取得を統合してください。
- ユーザーが拒否した場合、または回答がない場合は、インスツルメンテーションされたローカルプロンプトを変更せず、そのままにしてください。
- Prompt Management で SDK の更新が必要な場合は、その理由を説明し、依存関係を変更する前に確認してください。このオプションの更新によって、主要なインスツルメンテーションやコンテキスト共有を遅らせてはなりません。
{{< /agent-only >}}

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

   `source_kind` は `prompt`、`instruction`、`policy`、`test`、`tool_definition`、または `implementation` からのみ使用します。`observable_signals` は `agent_input`、`agent_output`、`trace_context`、`tool_call`、`tool_result`、または `tool_order` からのみ使用します。`line_end` を含める場合は、肯定的な `line_start` も含め、`line_end` を`line_start` 以上にする必要があります。

4. JSON をオンボーディングプロンプトのアップロード URL に一度送信します。`POST` を使用し、`Content-Type: application/json` を設定し、アップロードトークンは `Authorization: Bearer <upload-token>` ヘッダーでのみ渡します。

以下のセキュリティ要件に従ってください。

- アップロードトークンは使い捨ての秘密情報として扱ってください。ソースファイル、構成、シェル履歴、出力、またはログに書き込まないでください。
- 構造化されたサマリーのみをアップロードしてください。生のソースコード、完全なプロンプト、秘密情報、資格情報、環境変数、顧客データ、トレース内容、または任意のメタデータをアップロードしないでください。
- 正規化されたリポジトリ相対の POSIX ソースパスと、最小限の有用な行範囲を使用してください。絶対パス、バックスラッシュ、コロン、非正規化されたセパレーター、または `.` や `..` のパスセグメントは使用しないでください。ソース参照は証拠を特定するものであり、その内容をコピーしてはなりません。
- アップロードが失敗した場合は、インスツルメンテーションを継続し、Datadog がオプションのコンテキストを受信しなかったことをユーザーに伝えてください。より広範なデータで再試行しないでください。

{{< /agent-only >}}

## トレースを表示する {#view-traces}

アプリケーションを実行し、インスツルメントされた LLM 呼び出しを行ってください。[Agent Observability][14] を開き、アプリケーションを選択してそのトレースを調査してください。

アプリケーションのデータに直接リンクするには、選択した [Datadogサイト][9]のURLを使用し、アプリケーション名でフィルタリングしてください。

```text
https://{{< region-param key="dd_full_site" >}}/llm/applications?query=@ml_app:<APPLICATION_NAME>
```

{{< agent-only >}}
インスツルメンテーションの変更点、残りのセットアップ要件、およびアプリケーションの実行方法を報告してください。コンテキスト共有が要求された場合は、アップロードが成功したかどうかを報告してください。検証せずに、トレースや推奨事項が使用可能であると主張しないでください。

提供されたアプリケーション名または推論されたアプリケーション名を使用して、アプリケーションへの直接リンクを提供してください。`DD_SITE` からアプリケーションのホストを特定してください。`datadoghq.com` には `app.datadoghq.com` を使用し、`datadoghq.eu` には `app.datadoghq.eu` を使用し、`ddog-gov.com` には `app.ddog-gov.com` を使用し、サポートされているその他のサイトには `DD_SITE` の値そのものを使用してください。クエリ値を URL エンコードしてください。
{{< /agent-only >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/instrument/auto_instrumentation/
[2]: /ja/llm_observability/instrument/sdk/
[3]: /ja/llm_observability/instrument/api/
[4]: /ja/llm_observability/instrument/otel_instrumentation/
[6]: /ja/llm_observability/configure/prompt_management/#track-prompt-usage
[7]: /ja/llm_observability/configure/prompt_management/
[8]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[9]: /ja/getting_started/site/
[10]: /ja/llm_observability/instrument/sdk/#application-naming-guidelines
[11]: /ja/llm_observability/instrument/auto_instrumentation/#set-up-automatic-instrumentation
[12]: /ja/llm_observability/instrument/api/?tab=model#spans-api
[13]: /ja/llm_observability/instrument/api/?tab=model#evaluations-api
[14]: https://app.datadoghq.com/llm/applications
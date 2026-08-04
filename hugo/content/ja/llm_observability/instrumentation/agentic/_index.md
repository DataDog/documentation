---
title: Agentic Instrumentation
---
## ガイドライン {#guidelines}

**重要**: 他の手順へのハイパーリンクをたどる際は、ここに記載されている**すべての**ガイドラインに従ってください。

1. Datadog Agent Observability および Datadog トレーサーに関連するコードのみを追加してください。手動インスツルメンテーションを目的とする場合を除き、関連のないコードを変更しないでください。
2. モノレポや複数のサービスまたはインスツルメンテーションターゲットを持つプロジェクトで実行する場合は、どのサービスまたはサブプロジェクトを Agent Observability のインスツルメンテーション対象とするかをユーザーに確認してください。
3. 最新の Datadog SDK をインストールしてください。すでにインストールされている場合は、依存関係を更新してもよいかユーザーに確認してください。

## 前提条件 {#pre-requisites}

1. Agent Observability データを Datadog に送信するには、Datadog API Key が必要です。API キーがないと、ユーザーは Agent Observability データを受信できないため、これは**必須要件**です。ユーザーがまだ API キーを提供しておらず、提供を希望しない場合は、アプリケーションのインスツルメンテーションを続行してください。その際、最後に API キーを設定する必要があることを明示し、設定場所を案内してください。
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
| Python| [Python アプリケーションの Agentic Instrumentation](/llm_observability/instrumentation/agentic/python.md) |
| Node.js| [Node.js アプリケーションの Agentic Instrumentation](/llm_observability/instrumentation/agentic/nodejs.md) |
| Java| [Java アプリケーションの Agentic Instrumentation](/llm_observability/instrumentation/agentic/java.md) |
| OpenTelemetry| [OpenTelemetry Instrumentation](/llm_observability/instrumentation/otel_instrumentation.md) |

## プロンプトをインスツルメンテーションし、Prompt Management を提供する{#instrument-prompts-and-offer-prompt-management}

Prompt Tracking は、デフォルトの Agent Observability インスツルメンテーションの一部です。選択した各 LLM 呼び出しのプロンプト構築境界を特定し、プロンプトテンプレートを動的変数とは別に保持してください。

1. ユーザーのリクエストですでに Datadog 管理プロンプト ID が指定されている場合は、[Prompt Management の Agent による統合ガイド](/llm_observability/instrumentation/agentic/prompt_management.md)に従ってください。Prompt Management を使用するかどうかについて再度尋ねないでください。
2. それ以外の場合は、アプリケーションのプロンプトと、それらのフォーマットに使用される動的変数を特定してください。既存のプロバイダー、モデル、プロンプトコンテンツ、およびアプリケーションの動作を保持してください。
3. サポートされている Python アプリケーションの場合は、特定したプロンプトをユーザーに伝え、それらのプロンプトを Datadog で管理するかどうかを尋ねてください。ユーザーが同意した場合は、[Prompt Management の Agent による統合ガイド](/llm_observability/instrumentation/agentic/prompt_management.md)に従って、選択したローカルプロンプトを昇格させ、ローカルでの構築を管理対象プロンプトの取得に置き換えてください。
4. ユーザーが Prompt Management を拒否した場合、またはアプリケーションの言語がサポートされていない場合は、[Prompt Tracking の手順](/llm_observability/monitoring/prompt_tracking)に従って、選択したプロンプトに構造化プロンプトメタデータを組み込んでください。ランタイムでのプロンプト取得は追加しないでください。

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
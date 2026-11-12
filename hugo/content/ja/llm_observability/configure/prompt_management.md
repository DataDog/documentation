---
aliases:
- /ja/llm_observability/monitoring/prompt_management/
description: Prompt Management を使用して、Python、Go、および JavaScript アプリケーションで管理対象プロンプトの作成、バージョン管理、取得を行います。
further_reading:
- link: /llm_observability/instrument/prompt_tracking
  tag: ドキュメント
  text: Prompt Tracking
- link: /llm_observability/improve/playground
  tag: ドキュメント
  text: Playground
- link: /llm_observability/instrument/sdk/?tab=python
  tag: ドキュメント
  text: Agent Observability SDK
title: Prompt Management
---
## 概要{#overview}

Prompt Management は、LLM アプリケーションで使用されるプロンプトの一元化されたレジストリを提供します。プロンプトテンプレートをアプリケーションコードや構成ファイルにハードコーディングする代わりに、Agent Observability を通じてプロンプトを作成、バージョン管理、更新し、実行時に取得します。

実行時の取得は、Python では `ddtrace` SDK を通じてサポートされています。プロンプトの取得と Prompt Tracking は別個のものです。`LLMObs.get_prompt()` は Agent Observability を有効にせずに管理対象プロンプトを取得できますが、LLM スパンを作成し、それらにプロンプトメタデータを関連付けるには、Agent Observability を有効にする必要があります。

プロンプトバージョンを作成した後、[Prompt Experimentation][10] を使用して A/B テストで比較するか、Guarded Rollout を使用して段階的にデプロイします。

Prompt Management は [Prompt Tracking][1] と連携して動作します。Agent Observability が有効になっている場合、サポートされている自動インスツルメンテーション対象の LLM 呼び出しに直接渡された管理対象プロンプトは、結果として生成されるスパンに関連付けられます。

## 前提条件 {#prerequisites}

- Python 3.9 以降。
- ddtrace>=4.13.0
- [Datadog サイト][2] と [Datadog API key][3]Datadog Agent を介してトレースが送信される場合でも、プロンプトの取得には API キーが必要です。
- 環境ごとにプロンプトを解決するための `llm_observability_read`、`feature_flag_config_read`、および `feature_flag_environment_config_read` 権限を持つ [Datadog Application Key][4]。Datadog で既存のアプリケーションキーを選択する場合は、そのキーにこれらの権限があることを確認してください。
- API または Python SDK を介してプロンプトを管理するには、アプリケーションキーに `llm_observability_write` および `feature_flag_config_write` 権限も必要です。

## SDK のインストール {#install-the-sdk}

アプリケーションで使用する Python 環境に、最新の `ddtrace` パッケージをインストールまたはアップグレードします。

```shell
pip install --upgrade ddtrace
```

## Python で管理対象プロンプトを使用する {#use-a-managed-prompt-in-python}

### Prompt Management をコーディング Agent と統合する {#integrate-prompt-management-with-a-coding-agent}

以下のプロンプトを貼り付けて、管理対象プロンプトを任意のコーディング Agent と統合します。

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

オプションで、選択した Datadog 認証情報を追加すると、コーディング Agent が同じセッションで統合の設定と検証を行えるようになります。

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**注:** プロンプトに API キーとアプリケーションキーを含めることは任意であり、コーディング Agent が Prompt Management を統合するために必須ではありません。それらは信頼できるコーディング Agent のセッションでのみ含めてください。

統合が完了したら、アプリケーションを実行し、変更された LLM フローをトリガーします。プロンプトページに戻って使用状況を確認します。新しいプロンプト呼び出しが表示されるまで 1 分ほどかかる場合があります。

### プロンプトの取得を設定する {#configure-prompt-retrieval}

Datadog サイト、認証情報、およびデプロイ環境は、アプリケーションですでに使用されている構成およびシークレット管理ワークフローを通じて提供してください。たとえば、アプリケーションの環境ファイル、Docker Compose または Kubernetes の構成、デプロイプラットフォーム、またはシークレットマネージャーを使用します。実行時には、`ddtrace` をインポートする前に、以下の環境変数を設定する必要があります。

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` は、プロンプトのバージョンを解決するために使用する環境を選択し、プロンプトがデプロイされている環境と一致している必要があります。

### プロンプトを取得、フォーマット、使用する {#retrieve-format-and-use-a-prompt}

アプリケーションですでに使用されているプロンプトをフォールバックとして保持します。フォールバックにより、レジストリ、環境解決、ネットワーク、またはサーバーの障害が発生した場合でも、アプリケーションは動作し続けます。

次の例では、チャットプロンプトを取得してフォーマットし、フォーマットされたメッセージを直接 OpenAI に渡します。

```python
from ddtrace.llmobs import LLMObs
from openai import OpenAI

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": "Acme Inc.",
    "question": "How do I reset my password?",
}

prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    fallback=default_messages,
)
messages = prompt.format(**variables)

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
```

`prompt.format()` は、テキストプロンプトの場合は文字列を、チャットプロンプトの場合はメッセージのリストを返します。フォーマットされた値を、LLM プロバイダー呼び出しの対応するテキストまたはメッセージパラメーターに渡します。

取得に失敗し、フォールバックが提供されていない場合、`get_prompt()` は `ValueError` を発生させます。フォールバックは認証を置き換えるものではありません。`DD_API_KEY` は常に必要であり、`DD_APP_KEY` が設定されている場合は `DD_ENV` も必要です。

プロンプト構成を使用しない場合は、アプリケーションコード内でプロンプトを組み合わせるか、最終的なプロバイダー向けプロンプトを単一のプロンプトとして管理します。1 つの管理対象プロンプトを別のプロンプトに含めるには、[構成によるプロンプトの再利用](#reuse-prompts-with-composition)を参照してください。プロンプト構成はプレビュー版です。

### バージョンを選択 {#select-a-version}

`DD_ENV` が指定されていない場合、`get_prompt()` は最新のプロンプトバージョンを取得します。

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

`DD_ENV` が指定されている場合、`get_prompt()` はその環境のプロンプトバージョンを解決します。これには、[前提条件](#prerequisites)に記載されている読み取り権限を持つ `DD_APP_KEY` が必要です。

`DD_ENV` とは無関係に正確な数値バージョンを取得するには、`version` を渡します。

```python
prompt = LLMObs.get_prompt("customer-support-greeting", version=2)
```

`version` 引数は、環境解決よりも優先されます。

### プロンプトの使用状況を追跡する {#track-prompt-usage}

管理対象プロンプトを LLM スパンに関連付けるには、[Agent Observability を有効にし][5]、既存の実行ワークフローを使用して、自動インスツルメンテーションを有効にした状態でアプリケーションを実行します。

アプリケーションが Python プロセスの開始前に設定を受け取る場合は、`ddtrace-run` を使用します。たとえば、同等のシェルコマンドは次のとおりです。

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

アプリケーションが Python で設定を読み込む場合は、最初に設定を読み込み、LLM プロバイダーやその他のアプリケーションモジュールをインポートする前に `ddtrace.auto` をインポートします。

```python
from dotenv import load_dotenv

load_dotenv()

import ddtrace.auto

from ddtrace.llmobs import LLMObs
from openai import OpenAI
```

このセットアップは、`python app.py` のようなアプリケーションの通常の Python コマンドで実行します。`ddtrace-run` も併用しないでください。アプリケーションが設定を読み込む前に、`ddtrace` が初期化されます。

アプリケーションが Datadog Agent 経由でデータを送信しない場合は、`DD_LLMOBS_AGENTLESS_ENABLED=1` も設定します。

[サポートされている自動インスツルメンテーション対象のプロバイダー][6] の場合は、[プロンプトを取得、フォーマット、使用する](#retrieve-format-and-use-a-prompt)に示すように、`prompt.format()` によって返された値をプロバイダー呼び出しに直接渡します。これにより、管理対象プロンプトが生成されたスパンに自動的に関連付けられます。

フォーマットされた値をコピー、再構築、または変換すると、プロンプト追跡メタデータが失われる可能性があります。たとえば、管理対象システムプロンプトとユーザーの質問を連結すると、そのメタデータを含まない新しい文字列が作成されます。管理対象プロンプトを生成された LLM スパンに関連付けるには、`LLMObs.annotation_context()` を使用します。

```python
prompt = LLMObs.get_prompt(
    "customer-support-system-prompt",
    fallback="You are a helpful support agent writing for a {{audience}} audience.",
)
variables = {"audience": audience}
system_prompt = prompt.format(**variables)
combined_prompt = f"{system_prompt}\n\nUser question: {question}"

with LLMObs.annotation_context(
    prompt=prompt.to_annotation_dict(**variables),
):
    response = client.responses.create(
        model="gpt-4o",
        input=combined_prompt,
    )
```

`format()` に渡すのと同じ変数を `to_annotation_dict()` にも渡すことで、追跡対象のプロンプトに、その呼び出しで使用された値が含まれるようにします。

`annotation_context()`は、コンテキスト内で作成された LLM スパンにメタデータを関連付けます。スパン自体は作成しません。自動インスツルメンテーションの対象ではないプロバイダーの場合は、まず [LLM 呼び出しを手動でインスツルメンテーション][7] して、LLM スパンを作成します。明示的な `annotation_context()` は、自動プロンプト追跡よりも優先されます。詳細については、[Prompt Tracking][1] を参照してください。

## プロンプトを作成および管理する {#create-and-manage-prompts}

{{< ui >}}Prompts{{< /ui >}} UI、Python SDK、または API を通じて、プロンプトを作成し、新しいバージョンを公開します。

### プロンプトを作成する {#create-a-prompt}

#### 追跡対象のプロンプトを昇格する {#promote-a-tracked-prompt}

Agent Observability ですでに追跡されているプロンプトを管理対象プロンプトに昇格させるには、{{< ui >}}Prompts{{< /ui >}} ページに移動してプロンプトを開き、{{< ui >}}Register{{< /ui >}} をクリックします。その後、UI でプロンプトを更新し、実行時に取得できます。

#### UI でゼロから作成する {#in-the-ui-from-scratch}

{{< ui >}}Prompts{{< /ui >}} ページに移動し、{{< ui >}}\+ New Prompt{{< /ui >}} をクリックします。

Prompt Editor で:

1. 1 つ以上のメッセージを追加し、それぞれに {{< ui >}}System{{< /ui >}}、{{< ui >}}User{{< /ui >}}、または {{< ui >}}Assistant{{< /ui >}} の役割を割り当てます。
2. 任意のメッセージで `{{variable_name}}` 構文を使用して、動的コンテンツを追加します。
3. オプション: メッセージプレースホルダーのプレビューにアクセスできる場合は、[{{< ui >}}Add Message Placeholder{{< /ui >}}] をクリックします。「[実行時にメッセージを挿入する](#insert-messages-at-runtime)」セクションを参照してください。
4. オプション: [{{< ui >}}Run{{< /ui >}}] をクリックして、サンプル値でプロンプトをテストします。
5. [{{< ui >}}Save Prompt{{< /ui >}}] をクリックして、保存ダイアログを開きます。

ユーザークエリとコンテキストが変数として挿入されるように、プロンプトを構成します。

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="'You are a support agent for {{company}}' という内容の [System Prompt] メッセージと、{{question}} を含む [User Prompt] メッセージが表示され、右上に [Save Prompt] ボタンがある Playground。" style="width:100%;" >}}

保存ダイアログで:

| フィールド | 説明 |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | プロンプトの一意の識別子 (例: `customer-support-greeting`)。この ID を使用して、`LLMObs.get_prompt()` でプロンプトを取得します。|
| {{< ui >}}Description{{< /ui >}} | このバージョンに関する任意のメモ。|
| {{< ui >}}Deployment{{< /ui >}} | このバージョンがデプロイされる環境。|

{{< ui >}}Create Prompt{{< /ui >}} をクリックして、プロンプトをレジストリに保存します。

### プロンプトを更新、一覧表示、削除する {#update-list-and-delete-prompts}

#### UI で {#in-the-ui}

{{< ui >}}Prompts{{< /ui >}} ページでプロンプトを開き、以下の操作を行います。

- **新しいバージョンを作成する**: {{< ui >}}Edit{{< /ui >}} をクリックし、Prompt Editor でメッセージを更新します。
- **別の環境にバージョンをデプロイする**: バージョンを選択し、その {{< ui >}}Deployment{{< /ui >}} 環境を更新します。
- **プロンプトを削除する**: プロンプトのオプションメニューから {{< ui >}}Delete{{< /ui >}} を選択します。これにより、プロンプトとそのバージョン履歴がレジストリから削除されます。

### Python SDK を使用する{#use-the-python-sdk}

`LLMObs.create_prompt()` を使用してプロンプトを作成し、最初のバージョンを 1 つ以上の環境にデプロイします。`env_ids` の値は、[環境一覧 API][9] から取得できる Feature Flags 環境 ID です。

```python
from ddtrace.llmobs import LLMObs

chat_template = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

created_prompt = LLMObs.create_prompt(
    "customer-support-greeting",
    chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

別のバージョンを公開してデプロイするには、`LLMObs.create_prompt_version()` を使用します。

```python
created_version = LLMObs.create_prompt_version(
    "customer-support-greeting",
    updated_chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

プロンプトの作成、バージョン管理、デプロイはセットアップ操作として扱います。アプリケーションの起動時やリクエストパスでは実行しないでください。実行時に、`LLMObs.get_prompt()` を使用してデプロイ済みのプロンプトを取得します。

これらのメソッドには、[前提条件](#prerequisites)に記載されている API およびアプリケーションキーの権限が必要です。

`LLMObs.list_prompts()` および `LLMObs.list_prompt_versions()` を使用して管理対象のプロンプトを確認し、`LLMObs.update_prompt()` および `LLMObs.update_prompt_version()` を使用してメタデータやデプロイメントを更新し、`LLMObs.delete_prompt()` を使用してプロンプトとそのすべてのバージョンを削除します。

### API を使用する {#use-the-api}

Prompt Management API を使用して、プロンプトおよびプロンプトのバージョンを作成、取得、更新、削除します。エンドポイントのスキーマ、リクエストのメディアタイプ、および例については、[Agent Observability API リファレンス][8] を参照してください。

## 実行時にメッセージを挿入する{#insert-messages-at-runtime}

<div class="alert alert-info"><strong>プレビュー:</strong> メッセージプレースホルダーはプレビューで利用可能です。アクセスをリクエストするには、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>またはカスタマーサクセスマネージャーにお問い合わせください。</div>

メッセージプレースホルダーは、実行時に保存されたプロンプトに会話履歴やツールとのやり取りを挿入します。テキスト変数 (`{{question}}` など) は、メッセージ内のテキストを置き換えます。メッセージプレースホルダーは、完全なメッセージのリストを挿入します。

プロンプトバージョンには、実行時に渡すメッセージではなく、プレースホルダーの名前と位置が保存されます。プロンプト内で履歴を移動するには、新しいプロンプトバージョンを公開します。アプリケーションコードを変更する必要はありません。

**プレビュー SDK へのアクセス:** 使用する言語向けの SDK バージョンについては、[Datadog サポート](https://www.datadoghq.com/support/)またはカスタマーサクセスマネージャーにお問い合わせください。

### プレースホルダーを定義する{#define-the-placeholder}

プロンプトエディターで [{{< ui >}}Add Message Placeholder{{< /ui >}}] をクリックし、`history` などの名前を入力します。上下の矢印ボタンを使用して、メッセージ間でプレースホルダーを移動します。プロンプト内のテキスト変数とは異なる名前を使用してください。エディターは、保存前に互換性のある SDK 要件を表示します。

{{< img src="llm_observability/monitoring/message-placeholder-editor.png" alt="システム指示と質問変数を含むユーザー メッセージの間に履歴メッセージプレースホルダーがあるプロンプトエディター。" >}}

Python SDK で同じプロンプトを作成するには、履歴が属する場所に `"type": "placeholder"` を持つ項目を追加します。

```python
from ddtrace.llmobs import LLMObs

LLMObs.create_prompt(
    "support-assistant",
    [
        {"role": "system", "content": "You are a concise assistant for {{plan}} customers."},
        {"type": "placeholder", "name": "history"},
        {"role": "user", "content": "{{question}}"},
    ],
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

プレースホルダー名 `history` は、アプリケーションが実行時にメッセージを渡すために使用するキーです。これはメッセージロールではありません。セットアップ要件と環境 ID については、「[Python SDK を使用する](#use-the-python-sdk)」セクションを参照してください。

### 実行時の値を指定する{#supply-runtime-values}

プロンプトを取得し、テキスト変数を含むリストを渡します。SDK は、プレースホルダーの位置に履歴メッセージを順番に挿入します。

{{< tabs >}}
{{% tab "Python" %}}

```python
prompt = LLMObs.get_prompt("support-assistant")

variables = {
    "plan": "enterprise",
    "question": "Can I export the report?",
    "history": [
        {"role": "user", "content": "Where are reports located?"},
        {"role": "assistant", "content": "Under Analytics."},
    ],
}
messages = prompt.format(**variables)
```
{{% /tab %}}

{{% tab "Go" %}}

```go
prompt, err := llmobs.GetPrompt(ctx, "support-assistant")
if err != nil {
	return err
}

variables := map[string]any{
	"plan":     "enterprise",
	"question": "Can I export the report?",
	"history": []map[string]any{
		{"role": "user", "content": "Where are reports located?"},
		{"role": "assistant", "content": "Under Analytics."},
	},
}
rendered, err := prompt.Format(variables)
if err != nil {
	return err
}
messages := rendered.Messages
```
{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
const prompt = await tracer.llmobs.getPrompt('support-assistant')

const variables = {
  plan: 'enterprise',
  question: 'Can I export the report?',
  history: [
    { role: 'user', content: 'Where are reports located?' },
    { role: 'assistant', content: 'Under Analytics.' }
  ]
}
const messages = prompt.format(variables)
```
{{% /tab %}}
{{< /tabs >}}

結果には 4 つのメッセージが含まれ、プレースホルダー項目はありません。

```json
[
  {"role": "system", "content": "You are a concise assistant for enterprise customers."},
  {"role": "user", "content": "Where are reports located?"},
  {"role": "assistant", "content": "Under Analytics."},
  {"role": "user", "content": "Can I export the report?"}
]
```

フォーマットされたメッセージをモデルプロバイダーに渡します。挿入されたメッセージに `{{variable}}` 構文が含まれている場合、SDK はそれをそのままリテラルテキストとして残します。

他の管理対象プロンプトと同じ [プロンプト追跡](#track-prompt-usage) ワークフローを使用します。プロンプトメタデータは、実行時の値ではなくプレースホルダーの定義を保持します。展開されたメッセージは、既存の入力キャプチャおよびプライバシー設定に従います。

### ツールインタラクションを含める {#include-tool-interactions}

プレースホルダーは、ツール呼び出しやツール応答を挿入することもできます。モデルプロバイダーのメッセージ形式を使用してください。たとえば、OpenAI Chat Completions 形式では、各ツールレスポンスの `tool_call_id` を、そのツール呼び出しの `id` に設定します。

```python
variables["history"] = [
    {
        "role": "assistant",
        "tool_calls": [{
            "id": "call_1",
            "type": "function",
            "function": {"name": "get_plan", "arguments": "{}"},
        }],
    },
    {"role": "tool", "tool_call_id": "call_1", "content": "enterprise"},
]
messages = prompt.format(**variables)
```

SDK は、これらのメッセージをそのまま挿入します。アプリケーションがツールを実行し、そのレスポンスを提供します。

### メッセージプレースホルダーの要件と制限{#message-placeholder-requirements-and-limits}

- すべてのプレースホルダーに対してリストを渡してください。空のリスト (`[]`) の場合、メッセージは挿入されません。
- 挿入されるメッセージには、テキスト、アシスタントのツール呼び出し、またはツールレスポンスを含めることができます。SDK はツールを実行したり、プロバイダー固有のフィールドを検証したりしません。
- プロンプトで同じプレースホルダー名が複数回使用されている場合、それぞれの箇所に同じリストが挿入されます。異なるプレースホルダー名には、異なるリストを渡すことができます。
- ネストされたプレースホルダーや、画像や音声などのマルチモーダルコンテンツはサポートされていません。

## プロンプト構成のバージョン管理 {#version-prompt-configuration}

設定をプロンプトと一緒に保存することで、両方を 1 つのバージョンとして更新したり、ロールバックしたりできます。構成は次の用途に使用します。

- **モデル設定** (`model` や `temperature` など)。
- **構造化出力スキーマ** (`response_format` など)。
- **ツール定義** (`tools` や `tool_choice` など)。

構成は、自分でフィールドを定義する JSON オブジェクトです。アプリケーションがこれらの設定を読み取って適用します。Datadog が Playground の実行やモデル呼び出しに自動的に適用することはありません。構成にシークレットを保存しないでください。

### 構成を追加 {#add-configuration}

1. [{{< ui >}}Prompts{{< /ui >}}] ページで、[{{< ui >}}New Prompt{{< /ui >}}] をクリックして、テンプレートを作成します。
2. [{{< ui >}}Save Prompt{{< /ui >}}] をクリックします。プロンプト ID を入力し、[{{< ui >}}Configuration (optional){{< /ui >}}] を展開して、設定を追加します。

   ```json
   {
     "model": "<MODEL_NAME>",
     "temperature": 0.2
   }
   ```

3. `<MODEL_NAME>` をこれらの設定をサポートするモデルに置き換え、[{{< ui >}}Create prompt{{< /ui >}}] をクリックします。

エディターには有効な JSON オブジェクトが必要です。この例のテキストはプレースホルダーであり、保存された構成ではありません。

{{< img src="llm_observability/monitoring/create-prompt-configuration-document-extractor.png" alt="オプションの [Configuration] (構成) セクションを展開し、モデル、温度、JSON レスポンス形式の設定を表示した [Create new prompt] (新しいプロンプトの作成) ダイアログ" style="width:100%;" >}}

### 構成の更新 {#update-configuration}

1. プロンプトバージョンを開き、[{{< ui >}}Configuration{{< /ui >}}] タブを選択します。
2. [{{< ui >}}Update configuration{{< /ui >}}] をクリックして、設定を編集します。
3. [{{< ui >}}Save version{{< /ui >}}] をクリックします。保存する前に差分を確認するには、まず [{{< ui >}}Review changes{{< /ui >}}] をクリックします。

{{< img src="llm_observability/monitoring/configuration-tab-app-configured-cropped.png" alt="保存されたモデル設定と [Update Configuration] (構成を更新) ボタンを表示した [Configuration] タブ" style="width:100%;" >}}

これにより、元のバージョンを上書きせずに新しいバージョンが作成されます。[{{< ui >}}Compare{{< /ui >}}] を使用すると、構成の変更内容を確認できます。

準備ができたら、そのバージョンを環境にデプロイします。その環境を取得するアプリケーションは、選択されたテンプレートと構成をまとめて受け取ります。両方をロールバックするには、以前のバージョンをデプロイします。保存するだけでは、環境が提供するバージョンは変更されません。

### アプリケーションでの構成の使用{#use-configuration-in-your-application}

アプリケーションの環境にデプロイされたプロンプトを取得し、その構成をモデルクライアントに渡します。

**プレビュー SDK へのアクセス:** 使用する言語向けの SDK バージョンについては、Datadog サポートまたはカスタマーサクセスマネージャーにお問い合わせください。

これらの例では、上記の構成を使用する `summarizer` という名前のプロンプトを使用します。

{{< tabs >}}
{{% tab "Python" %}}

`prompt.config` から構成にアクセスします。

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt("summarizer")
config = prompt.config

model = config["model"]
temperature = config.get("temperature", 0.2)
```

[モデル呼び出し](#retrieve-format-and-use-a-prompt)でこれらの値を `prompt.format(...)` とともに使用します。

{{% /tab %}}
{{% tab "Node.js" %}}

`dd-trace` を初期化した状態で、非同期アプリケーションコード内から `prompt.config` にアクセスします。

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('summarizer')
const config = prompt.config

const model = config.model
const temperature = config.temperature ?? 0.2
```

これらの値を、フォーマット済みのプロンプトとともに既存のモデルクライアントに渡します。

{{% /tab %}}
{{% tab "Go" %}}

リクエストハンドラーまたはアプリケーション関数内で `prompt.Config()` にアクセスします。

```go
prompt, err := llmobs.GetPrompt(ctx, "summarizer")
if err != nil {
    return err
}
config := prompt.Config()

model := config["model"].(string)
temperature, ok := config["temperature"].(float64)
if !ok {
    temperature = 0.2
}
```

これらの値を、`prompt.Format(...)` が返すメッセージとともにモデルクライアントに渡します。

{{% /tab %}}
{{< /tabs >}}

**API での作成:** [Prompt Management API][8] を使用して、プロンプトとバージョンを作成することもできます。`config` を省略すると、新しいプロンプトでは空の構成が作成され、新しいバージョンでは最新の構成が継承されます。`{}` を送信してクリアします。

## 構成によるプロンプトの再利用{#reuse-prompts-with-composition}

<div class="alert alert-info"><strong>プレビュー:</strong> プロンプトの構成はプレビュー版で利用可能です。アクセスをリクエストするには、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>またはカスタマーサクセスマネージャーにお問い合わせください。</div>

プロンプトの構成を使用すると、あるプロンプトに別のプロンプトを含めることができるため、共有の指示をコピーすることなく再利用できます。たとえば、サポートアシスタントと請求アシスタントの両方に、同じ対応ポリシーを含めることができます。別のプロンプトを含めるには、次の2つの方法があります。

- **チャットメッセージ**: チャットプロンプトから一部またはすべてのメッセージを含めます。
- **テキスト**: テキストプロンプトの内容をメッセージ内に挿入します。

各インクルードは、特定のバージョンを指し示します。含まれているプロンプトの新しいバージョンを公開しても、すでにそれを含んでいるプロンプトは変更されません。

### チャットメッセージを含める{#include-chat-messages}

#### UI で{#in-the-ui-1}

次の例では、共有応答ポリシーをサポートアシスタントのプロンプトに追加します。

1. ID `response-policy` と {{< ui >}}System{{< /ui >}} メッセージ「`Answer concisely. If you do not know the answer, say so.`」を持つプロンプトを保存します。
2. [{{< ui >}}Prompts{{< /ui >}}] ページで、[{{< ui >}}New Prompt{{< /ui >}}] をクリックします。プロンプトエディターで [{{< ui >}}Include Prompt{{< /ui >}}]をクリックし、`response-policy` バージョン 1 を選択して、[{{< ui >}}Add prompt{{< /ui >}}] をクリックします。
3. インクルードされているプロンプトの後に、「{{question}}」を含む {{< ui >}}User{{< /ui >}} メッセージを追加します。`. If the editor added empty messages, remove them.
4. Click {{< ui >}}Save{{< /ui >}}、プロンプト ID として「support-assistant-composed」を入力し、[{{< ui >}}Create prompt{{< /ui >}}] をクリックします。

{{< img src="llm_observability/monitoring/prompt-composition-example.png" alt="システムメッセージとして含まれている応答ポリシーバージョン 1 と、その後に続く質問変数を含むユーザーメッセージを表示する Playground。" style="width:100%;" >}}

プロンプトは次のようになります。

```text
System: Answer concisely. If you do not know the answer, say so.
User: {{question}}
```

アプリケーションは、通常通り[プロンプトを取得してフォーマットします](#retrieve-format-and-use-a-prompt)。インクルードされているメッセージが取得したプロンプトにすでに含まれているため、`response-policy` を別にフェッチする必要はありません。

デフォルトでは、インクルードによって、含まれるプロンプトのすべてのメッセージが順番に追加されます。一部のメッセージのみを含める、並べ替える、または繰り返すには、プロンプトエディターで [{{< ui >}}Included Prompt{{< /ui >}}] をクリックし、[{{< ui >}}Customize messages{{< /ui >}}] を選択します。カスタマイズしても、インクルードされているプロンプトは変更されません。

#### API で{#with-the-api}

`include` オブジェクトを `template.messages` で使用すると、チャットプロンプトの特定のバージョンが参照されます。この例では、バージョン 1 のチャットプロンプト `response-policy` を想定しています。これをインクルードするプロンプトを作成するには、この JSON ボディを `POST /api/v2/llm-obs/v1/prompts` に送信します。

```json
{
  "data": {
    "type": "prompt-templates",
    "attributes": {
      "prompt_id": "support-assistant-composed",
      "template": {
        "messages": [
          { "include": { "prompt_id": "response-policy", "version": 1 } },
          { "role": "user", "content": "{{question}}" }
        ]
      }
    }
  }
}
```

認証およびメッセージ選択のオプションについては、「[Agent Observability プロンプトの作成][11]」を参照してください。

### メッセージ内のテキストをインクルードする{#include-text-in-a-message}

メッセージ全体ではなくフレーズを再利用するには、[{{< ui >}}Include Prompt{{< /ui >}}] をクリックし、テキストプロンプトとバージョンを選択し、[{{< ui >}}Insert text{{< /ui >}}] をクリックします。参照は、最後に編集可能なメッセージの末尾に追加されます。それを必要な場所に移動してください。

たとえば、`response-style` のバージョン 1 に `Answer concisely.` が含まれている場合、次のように記述します。

```text
{{>response-style version=1}} Answer {{question}}.
```

解決されたテンプレートは次のとおりです。

```text
Answer concisely. Answer {{question}}.
```

参照は、追加のスペースや改行なしで、含まれているテキストに正確に解決されます。必ずバージョンを指定してください。指定しない場合、「{{>response-style}}」はインクルードではなく、リテラルテキストのままになります。プレビューアクセス権なしでプロンプトを作成する場合、インライン参照はそのままリテラルテキストになります。以前に保存された構成バージョンは引き続き使用可能です。

API リクエストでは、テキスト `template` またはチャットメッセージの `content` で同じ構文を使用してください。

### インクルードを確認して更新する{#review-and-update-includes}

保存されたバージョンでは、{{< ui >}}Prompt Template{{< /ui >}} に作成した参照が表示されます。{{< ui >}}Resolved Prompt{{< /ui >}} には、実行時変数が入力される前の展開されたメッセージが表示されます。

共有ポリシーが変更された場合は、その {{< ui >}}Used By{{< /ui >}} タブを使用して、それを参照しているプロンプトを見つけてください。使用しているプロンプトを開き、インクルードを新しいソースバージョンに置き換えた後、更新されたプロンプトをテストして、保存し、デプロイしてください。ソースが後で削除されても、既存のバージョンは元のコンテンツのままになります。

## 高度な使用方法{#advanced-usage}

### 1 つの環境から複数のバージョンを提供する{#serve-multiple-versions-from-one-environment}

Prompt Management は、Datadog の Feature Flags 製品に基づいています。各環境で、`get_prompt()` の呼び出しはデフォルトのバージョンに解決されます。また、ターゲティングルールに一致する呼び出しには、別のバージョンを提供することもできます。

たとえば、ターゲティングルールを使用して、`production` 内の一部のユーザーに不安定なプロンプトバージョンをロールアウトし、それ以外のユーザーには引き続き安定版を提供することができます。

```python
## DD_ENV=production
prompt = LLMObs.get_prompt("my-prompt")               # resolves to the stable version
prompt = LLMObs.get_prompt("my-prompt", tag="unstable") # resolves to the unstable version
```

これを構成するには、次のようにします。

1. プロンプトのバージョン一覧で、環境にカーソルを合わせて [{{< ui >}}Targeting Rules{{< /ui >}}] をクリックします。

   {{< img src="llm_observability/monitoring/prompt-environment-targeting-rules-link.png" alt="現在 1 つのプロンプトバージョンを提供している環境と、ターゲティングルールへのリンクを示す環境パネル。" style="width:60%;" >}}

2. [{{< ui >}}Add Targeting Rule{{< /ui >}}] をクリックします。

   {{< img src="llm_observability/monitoring/prompt-targeting-rules-default-version.png" alt="ルールが一致しない場合に提供されるデフォルトバージョンと [Add Targeting Rule] ボタンを表示する、環境の [Targeting Rules] パネル。" style="width:100%;" >}}

3. ルールのフィルターを定義します。たとえば、属性 `tag=unstable` を渡す `get_prompt()` の呼び出しに一致させ、結果のバリアントを不安定なプロンプトバージョンに設定します。

   {{< img src="llm_observability/monitoring/prompt-targeting-rule-tag-filter.png" alt="タグ属性が「unstable」に設定されている条件に一致するターゲティングルールのフィルタービルダー。" style="width:100%;" >}}

4. ルールを保存します。`tag=unstable` を使用した呼び出しは一致したバージョンに解決され、それ以外の呼び出しはすべてデフォルトバージョンにフォールバックします。

ターゲティングルールで参照される属性を、キーワード引数として `get_prompt()` に渡します。一致する属性を渡さない呼び出しは、引き続き環境のデフォルトバージョンに解決されます。

ターゲティングルールに関係なく特定のバージョンを取得するには、「[バージョンを選択](#select-a-version)」の説明に従って `version` を渡します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/instrument/prompt_tracking
[2]: /ja/getting_started/site/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/account_management/api-app-keys/#application-keys
[5]: /ja/llm_observability/instrument/sdk/?tab=python
[6]: /ja/llm_observability/instrument/auto_instrumentation/?tab=python
[7]: /ja/llm_observability/instrument/sdk/?tab=python#manual-instrumentation
[8]: /ja/api/latest/agent-observability/
[9]: /ja/api/latest/feature-flags/list-environments/
[10]: /ja/llm_observability/configure/prompt_experimentation/
[11]: /ja/api/latest/agent-observability/create-an-agent-observability-prompt/
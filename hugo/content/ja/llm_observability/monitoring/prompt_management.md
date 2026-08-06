---
description: Prompt Management を使用して、Python アプリケーションで管理対象プロンプトの作成、バージョン管理、取得を行います。
further_reading:
- link: /llm_observability/monitoring/prompt_tracking
  tag: ドキュメント
  text: Prompt Tracking
- link: /llm_observability/playground
  tag: ドキュメント
  text: Playground
- link: /llm_observability/instrumentation/sdk/?tab=python
  tag: ドキュメント
  text: Agent Observability SDK
title: Prompt Management
---
{{< callout url="https://www.datadoghq.com/" btn_hidden="true">}}
Prompt Management はプレビュー版です。
{{< /callout >}}

## 概要 {#overview}

Prompt Management は、LLM アプリケーションで使用されるプロンプトの一元化されたレジストリを提供します。プロンプトテンプレートをアプリケーションコードや構成ファイルにハードコーディングする代わりに、Agent Observability を通じてプロンプトを作成、バージョン管理、更新し、実行時に取得します。

実行時の取得は、Python では `ddtrace` SDK を通じてサポートされています。プロンプトの取得と Prompt Tracking は別個のものです。`LLMObs.get_prompt()` は Agent Observability を有効にせずに管理対象プロンプトを取得できますが、LLM スパンを作成し、それらにプロンプトメタデータを関連付けるには、Agent Observability を有効にする必要があります。

Prompt Management は [Prompt Tracking][1] と連携して動作します。Agent Observability が有効になっている場合、サポートされている自動インスツルメンテーション対象の LLM 呼び出しに直接渡された管理対象プロンプトは、結果として生成されるスパンに関連付けられます。

## 前提条件 {#prerequisites}

- Python 3.9 以降。
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
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrumentation/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

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

管理対象プロンプトは、テンプレート内で他の管理対象プロンプトを参照することはできません。プロンプトを構成するには、アプリケーションコード内でそれらを組み合わせるか、最終的なプロバイダー向けプロンプトを単一のプロンプトとして管理します。

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

{{< ui >}}Prompts{{< /ui >}} ページに移動し、{{< ui >}}+ New Prompt{{< /ui >}} をクリックします。

Prompt Editor で:

1. 1 つ以上のメッセージを追加し、それぞれに {{< ui >}}System{{< /ui >}}、{{< ui >}}User{{< /ui >}}、または {{< ui >}}Assistant{{< /ui >}} の役割を割り当てます。
2. 任意のメッセージで `{variable_name}}` 構文を使用して、動的コンテンツを追加します。
3. オプション: {{< ui >}}Run{{< /ui >}} をクリックして、サンプル値でプロンプトをテストします。
4. {{< ui >}}Save Prompt{{< /ui >}} をクリックして、保存ダイアログを開きます。

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

`LLMObs.create_prompt()` を使用してプロンプトを作成し、最初のバージョンを 1 つ以上の環境にデプロイします。`env_ids` の値は、[環境一覧 API][9] から取得できる Feature Flag 環境 ID です。

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

Prompt Management API を使用して、プロンプトおよびプロンプトのバージョンを作成、取得、更新、削除します。エンドポイントのスキーマ、リクエストのメディアタイプ、および例については、[LLM Observability API リファレンス][8] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/monitoring/prompt_tracking
[2]: /ja/getting_started/site/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/account_management/api-app-keys/#application-keys
[5]: /ja/llm_observability/instrumentation/sdk/?tab=python
[6]: /ja/llm_observability/instrumentation/auto_instrumentation/?tab=python
[7]: /ja/llm_observability/instrumentation/sdk/?tab=python#manual-instrumentation
[8]: /ja/api/latest/llm-observability/
[9]: /ja/api/latest/feature-flags/list-environments/
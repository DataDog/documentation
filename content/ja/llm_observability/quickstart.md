---
aliases:
- /ja/tracing/llm_observability/quickstart
title: LLM Observability クイックスタート
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability is not available in the US1-FED site.
</div>
{{% /site-region %}}

クイックスタートのドキュメントでは、LLM Observability SDK for Python を使用しています。詳しい使い方は [SDK ドキュメント][1]を参照してください。アプリケーションが他の言語で書かれている場合は、代わりに [API][8] を呼び出すことでトレースを作成できます。

## Jupyter ノートブッククイックスタート

Jupyter ノートブックから例を実行するには、[LLM Observability Jupyter Notebooks リポジトリ][12]を参照してください。

## コマンドラインクイックスタート

以下の手順を使用して、LLM Observability のトレースを生成する簡単な Python スクリプトを実行します。

### 前提条件

- LLM Observability には、Datadog API キーが必要です ([API キーの作成手順][7]を参照してください)。
- 以下のスクリプト例では OpenAI を使用していますが、他のプロバイダーを使用するように変更することも可能です。記述されているスクリプトを実行するには、以下が必要です。
    - 環境変数として保存された OpenAI API キー (`OPENAI_API_KEY`)。作成手順は OpenAI ドキュメントの[アカウントのセットアップ][4]と [API キーのセットアップ][6]を参照してください。
    - インストールされた OpenAI Python ライブラリ。手順は OpenAI ドキュメントの [Python のセットアップ][5]を参照してください。

### 1. SDK のインストール

以下の `ddtrace` と `openai` パッケージをインストールします。

{{< code-block lang="shell" >}}
pip install ddtrace
pip install openai
{{< /code-block >}}

### 2. スクリプトの作成

以下の Python スクリプトは OpenAI を 1 回呼び出します。これを `quickstart.py` という名前で保存します。

{{< code-block lang="python" filename="quickstart.py" >}}
import os
from openai import OpenAI

oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

completion = oai_client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
)
{{< /code-block >}}

### 3. スクリプトの実行

以下のシェルコマンドで Python スクリプトを実行し、OpenAI の呼び出しのトレースを Datadog に送信します。

{{< code-block lang="shell" >}}
DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DATADOG_SITE> \
DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
{{< /code-block >}}

必要な環境変数の詳細は [SDK ドキュメント][9]を参照してください。

### 4. トレースの表示

LLM 呼び出しのトレースは、Datadog の LLM Observability の [Traces タブ][3]に表示されます。

{{< img src="llm_observability/quickstart-trace.png" alt="An LLM Observability trace displaying a single LLM request" style="width:100%;" >}}

表示されるトレースは単一の LLM スパンで構成されています。`ddtrace-run` コマンドは [Datadog のサポートされているインテグレーションリスト][10]にある LLM 呼び出しを自動的にトレースします。

もしアプリケーションがより精巧なプロンプトや、LLM を含む複雑なチェーンやワークフローで構成されている場合は、[インスツルメンテーションガイド][11]や [SDK ドキュメント][1]を使ってトレースすることができます。


[1]: /ja/llm_observability/sdk/
[3]: https://app.datadoghq.com/llm/traces
[4]: https://platform.openai.com/docs/quickstart/account-setup
[5]: https://platform.openai.com/docs/quickstart/step-1-setting-up-python
[6]: https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key
[7]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /ja/llm_observability/api
[9]: /ja/llm_observability/sdk/#command-line-setup
[10]: /ja/llm_observability/auto_instrumentation
[11]: /ja/llm_observability/trace_an_llm_application
[12]: https://github.com/DataDog/llm-observability
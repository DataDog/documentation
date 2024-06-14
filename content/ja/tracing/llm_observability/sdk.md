---
title: LLM Observability Python SDK リファレンス
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
LLM Observability は US1-FED サイトでは利用できません。
</div>
{{% /site-region %}}

<div class="alert alert-info">LLM Observability は公開ベータ版です。</a></div>

## 概要

LLM Observability SDK for Python は、Python ベースの LLM アプリケーションの可観測性を向上させます。この SDK は Python バージョン 3.7 以降をサポートしています。LLM Observability のインテグレーションサポートについては、[自動インスツルメンテーション][13]を参照してください。

関数デコレータやコンテキストマネージャーを使用して、ワークフロー、タスク、API 呼び出しなどのさまざまな操作のトレースをインストールおよび構成できます。また、同じ環境から複数の LLM サービスやモデルをサポートし、アプリケーションのパフォーマンスや挙動をより深く理解するために、これらのトレースにメタデータを付与することもできます。

Jupyter ノートブックから実行できる使用例については、[LLM Observability Jupyter Notebooks リポジトリ][10]を参照してください。

## セットアップ

### 前提条件

1. 最新の `ddtrace` パッケージがインストールされている必要があります。

{{< code-block lang="shell">}}
pip install ddtrace
{{< /code-block >}}

2. LLM Observability には、Datadog API キーが必要です ([API キーの作成手順][7]を参照してください)。

### コマンドラインのセットアップ

`ddtrace-run` コマンドを使用してアプリケーションを実行し、必要な環境変数を指定することで、LLM Observability を有効にします。

**注**: `ddtrace-run` は自動的にすべての LLM Observability インテグレーションを有効にします。

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

`DD_API_KEY`
: 必須 - _文字列_
<br />Datadog API キー。

`DD_SITE`
: 必須 - _文字列_
<br />LLM データを送信する Datadog サイト。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。

`DD_LLMOBS_ENABLED`
: 必須 - _整数または文字列_
<br />LLM Observability へのデータ送信を有効にするかどうかを切り替えます。`1` または `true` に設定します。

`DD_LLMOBS_ML_APP`
: 必須 - _文字列_
<br />LLM アプリケーション、サービス、またはプロジェクトの名前で、すべてのトレースとスパンがグループ化されています。これは異なるアプリケーションや実験を区別するのに役立ちます。許可される文字やその他の制約については、[アプリケーション名のガイドライン](#application-naming-guidelines)を参照してください。指定した root スパンでこの値をオーバーライドするには、[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

`DD_LLMOBS_AGENTLESS_ENABLED`
: オプション - _整数または文字列_ - **デフォルト**: `false`
<br />Datadog Agent を使用していない場合のみ必要で、その場合は `1` または `true` に設定します。

### コード内のセットアップ

`ddtrace-run` コマンドで実行する代わりに、`LLMOBs.enable()` 関数を使ってプログラムで LLM Observability を有効にします。**注**:このセットアップ方法は `ddtrace-run` コマンドでは使用しないでください。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
  integrations_enabled=True,
)
{{< /code-block >}}

`ml_app`
: オプション - _文字列_
<br />LLM アプリケーション、サービス、またはプロジェクトの名前で、すべてのトレースとスパンがグループ化されています。これは異なるアプリケーションや実験を区別するのに役立ちます。許可される文字やその他の制約については、[アプリケーション名のガイドライン](#application-naming-guidelines)を参照してください。指定したトレースでこの値をオーバーライドするには、[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。指定がない場合、デフォルトは `DD_LLMOBS_ML_APP` です。

`integrations_enabled` - **デフォルト**: `true`
: オプション - _ブール値_
<br />Datadog がサポートしている [LLM インテグレーション][13]の LLM 呼び出しを自動的にトレースすることを有効にするフラグ。指定しない場合、サポートされているすべての LLM インテグレーションがデフォルトで有効になります。LLM インテグレーションの使用を避けるには、この値を `false` に設定します。

`agentless_enabled`
: オプション - _ブール値_ - **デフォルト**: `false`
<br />Datadog Agent を使用しない場合のみ必要で、その場合は `True` に設定します。これは `ddtrace` ライブラリが Datadog Agent を必要とするデータを送信しないように構成します。指定しない場合、デフォルトは `DD_LLMOBS_AGENTLESS_ENABLED` です。

`site`
: オプション - _文字列_
<br />LLM データを送信する Datadog サイト。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。指定しない場合、デフォルトは `DD_SITE` です。

`api_key`
: オプション - _文字列_
<br />Datadog API キー。指定しない場合、デフォルトは `DD_API_KEY` です。

`env`
: オプション - _文字列_
<br />アプリケーションの環境名 (例: `prod`、`pre-prod`、`staging`)。指定しない場合、デフォルトは `DD_ENV` です。

`service`
: オプション - _文字列_
<br />アプリケーションで使用するサービスの名前。指定しない場合、デフォルトは `DD_SERVICE` です。

#### アプリケーション名のガイドライン

アプリケーション名 (`DD_LLMOBS_ML_APP` の値) は必ずアルファベットで始めてください。名前には以下の文字を含めることができます。

- 英数字
- アンダースコア
- マイナス
- コロン
- ピリオド
- スラッシュ

名前は最大 200 文字までで、Unicode 文字 (日本語などの言語を含むほとんどの文字セットを含む) を含むことができます。

## スパンのトレース

スパンをトレースするには、`ddtrace.llmobs.decorators.<SPAN_KIND>()` をトレースしたい関数のデコレータ (例えば、タスクスパンの場合は `llmobs.decorators.task()`) として使用します。利用可能なスパンの種類のリストについては、[スパンの種類のドキュメント][8]を参照してください。関数内の操作のより詳細なトレースについては、[インラインメソッドを使ったスパンのトレース](#tracing-span-using-inline-methods)を参照してください。

### LLM スパン

**注**: [Datadog の LLM インテグレーション ][13]でサポートされている LLM プロバイダーやフレームワークを使用している場合、これらの操作をトレースするために LLM スパンを手動で開始する必要はありません。

LLM スパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.llm()` を使います。

#### 引数

`model_name`
: 必須 - _文字列_
<br/>呼び出された LLM の名前。

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`model_provider`
: オプション - _文字列_ - **デフォルト**: `"custom"`

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # LLM を呼び出すユーザーアプリケーションロジック
    return completion
{{< /code-block >}}

### ワークフロースパン

ワークフロースパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.workflow()` を使います。

#### 引数

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

### Agent スパン

Agent スパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.agent()` を使います。

#### 引数

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent(name="react_agent")
def run_agent():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

### ツールスパン

ツールスパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.tool()` を使います。

#### 引数

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool(name="get_current_weather")
def call_weather_api():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

### タスクスパン

タスクスパンをトレースするには、関数デコレータ `LLMObs.task()` を使います。

#### 引数

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

### 埋め込みスパン

埋め込みスパンをトレースするには、関数デコレータ `LLMObs.embedding()` を使います。

**注**: 埋め込みスパンの入力にアノテーションを付けるには、他のスパンタイプとは異なるフォーマットが必要です。埋め込み入力を指定する方法の詳細については、[スパンにアノテーションを付ける](#annotating-a-span)を参照してください。

#### 引数

`model_name`
: 必須 - _文字列_
<br/>呼び出された LLM の名前。

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`model_provider`
: オプション - _文字列_ - **デフォルト**: `"custom"`

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

### 取得スパン

取得スパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.retrieval()` を使います。

**注**: 取得スパンの出力にアノテーションを付けるには、他のスパンタイプとは異なるフォーマットが必要です。取得出力を指定する方法の詳細については、[スパンにアノテーションを付ける](#annotating-a-span)を参照してください。

#### 引数

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` がトレースされた関数名になります。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳しくは[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>その操作が属する ML アプリケーションの名前。詳しくは[複数アプリケーションのトレース](#tracing-multiple-applications)を参照してください。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import retrieval

@retrieval(name="get_relevant_docs")
def similarity_search():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

## ユーザーセッションの追跡

セッションを追跡することで、特定のユーザーと複数のインタラクションを関連付けることができます。新しいトレースの root スパンや、新しいプロセスのスパンを開始する際には、`session_id` 引数に、基盤となるユーザーセッションの文字列 ID を指定してください。

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(session_id="<SESSION_ID>")
def process_message():
    ... # ユーザーアプリケーションロジック
    return 
{{< /code-block >}}

## スパンにアノテーションを付ける

SDK は、スパンに入力、出力、メタデータのアノテーションを付けるために、`LLMObs.annotate()` メソッドを提供します。

### 引数

`LLMObs.annotate()` メソッドは以下の引数を受け付けます。

`span`
: オプション - _スパン_ - **デフォルト**: 現在のアクティブスパン
<br />アノテーションを付けるスパン。`span` が指定されない場合 (関数デコレータを使用する場合）、SDK は現在のアクティブなスパンにアノテーションを付けます。

`input_data`
: オプション - _JSON シリアライズ可能な型または辞書のリスト_
<br />JSON シリアライズ可能な型 (非 LLM スパンの場合）、または以下の形式の辞書のリスト: `{"role": "...", "content": "..."}` (LLM スパンの場合）。 **注**: 埋め込みスパンは特別なケースであり、`{"text": "..."}` の形式の文字列または辞書 (または辞書のリスト) を必要とします。

`output_data`
: オプション - _JSON シリアライズ可能な型または辞書のリスト_
<br />JSON シリアライズ可能な型 (非 LLM スパンの場合）、または以下の形式の辞書のリスト: `{"role": "...", "content": "..."}` (LLM スパンの場合）。 **注**: 取得スパンは特別なケースであり、`{"text": "...", "name": "...", "score": float, "id": "..."}` の形式の文字列または辞書 (または辞書のリスト) を必要とします。

`metadata`
: オプション - _辞書_
<br />スパンで記述された入力または出力操作に関連するメタデータ情報としてユーザーが追加できる、JSON シリアライズ可能なキーと値のペアの辞書 (`model_temperature`、`max_tokens`、`top_k` など)。

`metrics`
: オプション - _辞書_
<br />スパンで記述された操作に関連するメトリクスとしてユーザーが追加できる、JSON シリアライズ可能なキーと数値の辞書 (`input_tokens`、`output_tokens`、`total_tokens` など)。

`tags`
: オプション - _辞書_
<br />スパンのコンテキストに関するタグとしてユーザーが追加できる、JSON シリアライズ可能なキーと値のペアの辞書 (`session`、`environment`、`system`、`versioning` など)。タグの詳細については、[タグの概要][9]を参照してください。

### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import embedding, llm, retrieval, workflow

@llm(model="model_name", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # ここに llm 呼び出し
    LLMObs.annotate(
        span=None,
        input_data=[{"role": "user", "content": "Hello world!"}],
        output_data=[{"role": "assistant", "content": "How can I help?"}],
        metadata={"temperature": 0, "max_tokens": 200},
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
        tags={"host": "host_name"},
    )
    return resp

@workflow
def process_message(prompt):
    resp = llm_call_inline(prompt)
    LLMObs.annotate(
        span=None,
        input_data="prompt",
        output_data="output",
        tags={"host": "host_name"},
    )
    return resp

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # ユーザーアプリケーションロジック
    LLMObs.annotate(
        span=None,
        input_data={"text": "Hello world!"},
        output_data=[0.0023064255, -0.009327292, ...],
        metrics={"input_tokens": 4},
        tags={"host": "host_name"},
    )
    return

@retrieval(name="get_relevant_docs")
def similarity_search():
    ... # ユーザーアプリケーションロジック
    LLMObs.annotate(
        span=None,
        input_data="Hello world!",
        output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
        tags={"host": "host_name"},
    )
    return

{{< /code-block >}}

## 評価

LLM Observability SDK は、トレースした LLM アプリケーションの評価を LLM Observability に送信するためのメソッド `LLMObs.export_span()` と `LLMObs.submit_evaluation()` を提供しています。

### スパンのエクスポート

`LLMObs.export_span()` は、スパンからスパンコンテキストを抽出するために使用することができます。このメソッドを使用して、評価を対応するスパンに関連付ける必要があります。

#### 引数

`LLMObs.export_span()` メソッドは以下の引数を受け付けます。

`span`
: オプション - _スパン_
<br />スパンコンテキスト (スパンとトレース ID) の抽出元のスパン。指定されない場合 (関数デコレータを使用する場合)、SDK は現在のアクティブなスパンをエクスポートします。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # LLM を呼び出すユーザーアプリケーションロジック
    span_context = LLMObs.export_span(span=None)
    return completion
{{< /code-block >}}


### 評価の送信

`LLMObs.submit_evaluation()` は、指定されたスパンに関連付けられたカスタム評価を送信するために使用することができます。

#### 引数

`LLMObs.submit_evaluation()` メソッドは以下の引数を受け付けます。

`span_context`
: 必須 - _辞書_
<br />評価を関連付けるスパンコンテキスト。これは `LLMObs.export_span()` の出力である必要があります。

`label`
: 必須 - _文字列_
<br />評価の名前。

`metric_type`
: 必須 - _文字列_
<br />評価のタイプ。「categorical」または「score」のいずれかである必要があります。

`value`
: 必須 - _文字列または数値型_
<br />評価値。文字列 (categorical `metric_type` の場合) または整数/浮動小数点数 (score `metric_type` の場合) である必要があります。

`tags`
: オプション - _辞書_
<br />ユーザーが評価に関するタグとして追加できる、文字列のキーと値のペアの辞書。タグの詳細については、[タグの概要][9]を参照してください。

### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # LLM を呼び出すためのユーザーアプリケーションロジック
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context,
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
    )
    return completion
{{< /code-block >}}

## 高度なトレース

### インラインメソッドを使ったスパンのトレース

各スパンの種類ごとに、`ddtrace.llmobs.LLMObs` クラスは対応するインラインメソッドを提供しており、指定されたコードブロックが含む操作を自動的にトレースします。これらのメソッドは関数デコレータと同じ引数シグネチャを持ちますが、`name` が指定されていない場合はスパンの種類 (`llm`、`workflow` など) がデフォルトになります。これらのメソッドは、囲まれたコードブロックが完了すると自動的にスパンを終了させるコンテキストマネージャーとして使用することができます。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # ユーザーアプリケーションロジック
    return
{{< /code-block >}}

### コンテキストをまたがるスパンの永続化

異なるコンテキストやスコープ間でスパンを手動で開始・停止するには

1. 同じメソッド (例えば、ワークフロースパンの `LLMObs.workflow` メソッド) を使って手動でスパンを開始しますが、コンテキストマネージャーとしてではなく、単なる関数呼び出しとして行います。
2. 他の関数の引数としてスパンオブジェクトを渡します。
3. `span.finish()` メソッドでスパンを手動で停止します。**注**: スパンは手動で終了させる必要があり、そうしないと送信されません。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    workflow_span = LLMObs.workflow(name="process_message")
    ... # ユーザーアプリケーションロジック
    separate_task(workflow_span)
    return

def separate_task(workflow_span):
    ... # ユーザーアプリケーションロジック
    workflow_span.finish()
    return
{{< /code-block >}}

### サーバーレス環境でのフラッシュ

`LLMObs.flush()` は、バッファリングされたすべての LLM Observability データを Datadog バックエンドに送信するブロッキング関数です。これはサーバーレス環境において、すべての LLM Observability のトレースが送信されるまでアプリケーションが終了しないようにするのに便利です。

### 複数のアプリケーションのトレース

SDK は同じサービスから複数の LLM アプリケーションの追跡をサポートしています。

環境変数 `DD_LLMOBS_ML_APP` を構成して、生成されるすべてのスパンがデフォルトでグループ化される LLM アプリケーションの名前にすることができます。

この構成をオーバーライドして、指定された root スパンに異なる LLM アプリケーション名を使用するには、新しいトレースの root スパンまたは新しいプロセスのスパンを開始するときに、`ml_app` 引数に基礎となる LLM アプリケーションの文字列名を渡します。

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # ユーザーアプリケーションロジック
    return
{{< /code-block >}}

### 分散型トレーシング

SDK は分散型サービスまたはホスト間のトレーシングをサポートしています。分散型トレーシングは Web リクエスト間でスパン情報を伝播することで機能します。

`ddtrace` ライブラリはすぐに使えるインテグレーションをいくつか提供しており、よく使われる [Web フレームワーク ][11]や [HTTP][12] ライブラリの分散型トレーシングをサポートしています。アプリケーションがこれらのサポートされているライブラリを使用してリクエストを行う場合、以下を実行することで分散型トレーシングを有効にすることができます
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

アプリケーションがこれらのサポートされているライブラリのいずれかを使用していない場合は、HTTP ヘッダーとの間でスパン情報を手動で伝播することによって分散型トレーシングを有効にすることができます。SDK は `LLMObs.inject_distributed_headers()` と `LLMObs.activate_distributed_headers()` というヘルパーメソッドを提供しており、リクエストヘッダーにトレースコンテキストを注入したり有効にしたりすることができます。

#### 分散ヘッダーの注入

`LLMObs.inject_distributed_headers()` メソッドはスパンを受け取り、リクエストに含まれる HTTP ヘッダーにそのコンテキストを注入します。このメソッドは以下の引数を受け付けます。

`request_headers`
: 必須 - _辞書_
<br />トレースコンテキスト属性で拡張する HTTP ヘッダー。

`span`
: オプション - _スパン_ - **デフォルト**: `現在アクティブなスパン。`
<br />指定されたリクエストヘッダーにコンテキストを注入するスパン。どのようなスパン (関数デコレータを含む) でも、デフォルトは現在のアクティブなスパンです。

#### 分散ヘッダーの有効化

`LLMObs.activate_distributed_headers()` メソッドは HTTP ヘッダーを受け取り、新しいサービスで有効にするトレースコンテキスト属性を抽出します。

**注**: `LLMObs.activate_distributed_headers()` メソッドは、下流のサービスでスパンを開始する前に呼び出す必要があります。先に開始されたスパン (関数デコレータのスパンを含む) は分散型トレーシングにキャプチャされません。

このメソッドは以下の引数を受け付けます。

`request_headers`
: 必須 - _辞書_
<br />トレースコンテキスト属性を抽出する HTTP ヘッダー。


#### 例

{{< code-block lang="python" filename="client.py" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def client_send_request():
    request_headers = {}
    request_headers = LLMObs.inject_distributed_headers(request_headers)
    send_request("<method>", request_headers)  # 任意の HTTP 呼び出し
{{< /code-block >}}

{{< code-block lang="python" filename="server.py" >}}
from ddtrace.llmobs import LLMObs

def server_process_request(request):
    LLMObs.activate_distributed_headers(request.headers)
    with LLMObs.task(name="process_request") as span:
        pass  # 任意のサーバー作業
{{< /code-block >}}


[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /ja/tracing/llm_observability/span_kinds/
[9]: /ja/getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: https://docs.datadoghq.com/ja/tracing/trace_collection/compatibility/python/#integrations
[12]: https://docs.datadoghq.com/ja/tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /ja/tracing/llm_observability/auto_instrumentation/
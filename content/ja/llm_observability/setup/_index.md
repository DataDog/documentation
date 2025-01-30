---
aliases:
- /ja/tracing/llm_observability/trace_an_llm_application
- /ja/llm_observability/trace_an_llm_application
further_reading:
- link: https://www.datadoghq.com/blog/llm-observability-chain-tracing/
  tag: ブログ
  text: LLM チェーンをインスツルメンテーションすることで、LLM Observability を詳細に取得
- link: /llm_observability/submit_evaluations
  tag: ガイド
  text: Submit Evaluations to LLM Observability
title: LLM Observability のセットアップ
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択されたサイト ({{< region-param key="dd_site_name" >}}) では、現時点では LLM Observability はご利用いただけません。</div>
{{< /site-region >}} 

## 概要 

LLM Observability へのデータ送信を開始するには、[LLM Observability SDK for Python][1] を使用するか、[LLM Observability API][2] を呼び出してアプリケーションをインスツルメンテーションします。

LLM アプリケーションのインタラクションとパフォーマンスデータは、[**LLM Observability Traces** ページ][3]で視覚化できます。アプリケーションが処理した各リクエストはトレースとして表示されます。

{{< img src="llm_observability/traces.png" alt="リクエストの各スパンを表示する LLM Observability トレース" style="width:100%;" >}} 

トレースの詳細については、[用語と概念][4]を参照し、アプリケーションのニーズに最も適したインスツルメンテーションオプションを決定してください。

## LLM アプリケーションのインスツルメンテーション 

Datadog では、特定の LLM プロバイダライブラリに対する LLM コールをキャプチャするための[自動インスツルメンテーション][4]を提供しています。ただし、LLM Observability SDK for Python を使用して LLM アプリケーションを手動でインスツルメンテーションすると、追加の LLM Observability 機能にアクセスできるようになります。

<div class="alert alert-info">この手順では、<a href="/llm_observability/setup/sdk">LLM Observability SDK for Python</a> を使用します。アプリケーションがサーバーレス環境で実行されている場合は、<a href="/llm_observability/setup/sdk/#aws-lambda-setup">サーバーレスのセットアップ手順</a>に従ってください。</br></br>アプリケーションが Python で記述されていない場合は、SDK 関数呼び出しの代わりに API リクエストを使用して、以下の手順を完了できます。</div>

LLM アプリケーションをインスツルメンテーションするには

1. [LLM Observability SDK for Python をインストール][5]します。
1. アプリケーションの起動コマンドで[必要な環境変数][6]を指定するか、プログラムで[コード内][7]で指定して、SDK を構成します。Datadog API キー、Datadog サイト、機械学習 (ML) アプリ名を構成していることを確認してください。

## LLM アプリケーションのトレース

LLM アプリケーションをトレースするには

1. LLM アプリケーションコードで[スパンを作成](#creating-spans)して、アプリケーションの操作を表現します。スパンについての詳細は、[用語と概念](#terms-and-concepts)を参照してください。

   より便利なトレースを作成するために[スパンをネスト](#nesting-spans)することができます。追加の例や詳細な使用方法については、[LLM アプリケーションのトレース][8]および [SDK ドキュメント][9]を参照してください。

1. 入力データ、出力データ、メタデータ (`temperature` など)、メトリクス (`input_tokens` など)、キー値タグ (`version:1.0.0` など) を[スパンに注釈として追加](#annotating-spans)します。
1. オプションとして、ユーザーセッションなどの[高度なトレース機能](#advanced-tracing)を追加します。
1. LLM アプリケーションを実行します。
    - コマンドラインによるセットアップ方法を使用した場合は、アプリケーションを実行するコマンドに `ddtrace-run` を使用する必要があります。これは、[こちらの指示][6]に記載されています。
    - コード内セットアップ方法を使用した場合は、通常通りアプリケーションを実行します。

生成されたトレースは [**LLM Observability Traces** ページ][3]の **Traces** タブで、生成されたメトリクスはすぐに使える [LLM Observability Overview ダッシュボード][10]で確認できます。

### スパンの作成

スパンを作成するには、LLM Observability SDK では、関数デコレーターを使用する方法と、インラインのコンテキストマネージャーを使用する方法の 2 つのオプションが用意されています。

関数デコレーターを使用する方法が推奨されます。コンテキストマネージャーを使用する方法はより高度で、トレースをより細かく制御できます。

デコレーター
: `ddtrace.llmobs.decorators.<SPAN_KIND>()` を、トレースしたい関数にデコレーターとして使用します。 `<SPAN_KIND>` を希望する[スパン種類][4]に置き換えます。

インライン
: `ddtrace.llmobs.LLMObs.<SPAN_KIND>()` をコンテキストマネージャーとして使用して、[任意のインラインコードをトレース][12]します。 `<SPAN_KIND>` を希望する[スパン種類][4]に置き換えます。

以下の例ではワークフロースパンを作成します。

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def extract_data(document):
    ... # LLM を搭載したワークフローにより、ドキュメントから構造データを抽出します
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data(document):
    with LLMObs.workflow(name="extract_data") as span:
        ... # LLM を搭載したワークフローにより、ドキュメントから構造データを抽出します
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### スパンにアノテーションを付ける

入力、出力、メタデータ、メトリクス、タグなどの追加情報をスパンに追加するには、LLM Observability SDK の [`LLMObs.annotate()`][11] メソッドを使用します。

以下の例では、[上記の例](#creating-spans)で作成したワークフロースパンに注釈を付けています。

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def extract_data(document: str, generate_summary: bool):
    extracted_data = ... # ユーザーアプリケーションロジック
    LLMObs.annotate(
        input_data=document,
        output_data=extracted_data,
        metadata={"generate_summary": generate_summary},
        tags={"env": "dev"},
    )
    return extracted_data
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data(document: str, generate_summary: bool):
    with LLMObs.workflow(name="extract_data") as span:
        ... # ユーザーアプリケーションロジック
        extracted_data = ... # ユーザーアプリケーションロジック
        LLMObs.annotate(
            input_data=document,
            output_data=extracted_data,
            metadata={"generate_summary": generate_summary},
            tags={"env": "dev"},
        )
        return extracted_data
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### スパンのネスト

現在のスパンが終了する前に新しいスパンを開始すると、2 つのスパン間の親子関係が自動的にトレースされます。親スパンはより大きな操作を表し、子スパンはそれより小さなネストされたサブ操作を表します。

以下の例では、2 つのスパンでトレースを作成しています。

{{< tabs >}}
{{% tab "Decorators" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # ドキュメントのデータ抽出を行います
    return

@task
def preprocess_document():
    ... # ドキュメントをデータ抽出用に前処理します
    return
{{< /code-block >}}
{{% /tab %}}

{{% tab "Inline" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def extract_data():
    with LLMObs.workflow(name="extract_data") as workflow_span:
        with LLMObs.task(name="preprocess_document") as task_span:
            ... # ドキュメントをデータ抽出用に前処理します
        ... # ドキュメントのデータ抽出を行います
    return
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

その他のトレース方法およびトレース機能の詳細については、[SDK ドキュメント][1]を参照してください。

### 高度なトレース

LLM アプリケーションの複雑さに応じて、次のことも可能です。

- `session_id` を指定して[ユーザーセッションを追跡][12]する。
- 手動で開始および停止することにより、[コンテキストまたはスコープ間のスパンを維持][13]する。
- 新しいトレースを開始する際に、[複数の LLM アプリケーションを追跡][14]する。これは、サービスを区別したり、複数の実験を実行したりする際に便利です。
- [SDK][1] または [API][2] を使用して、LLM アプリケーションのユーザーからのフィードバック (例えば、1 から 5 までの評価) などの[カスタム評価を送信][15]する。

## 権限

デフォルトでは、[Datadog Read ロール][16]を持つユーザーのみが LLM Observability を表示できます。詳細については、[権限ドキュメント][17]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/setup/sdk
[2]: /ja/llm_observability/setup/api
[3]: https://app.datadoghq.com/llm/traces
[4]: /ja/llm_observability/terms
[5]: /ja/llm_observability/setup/sdk/#installation
[6]: /ja/llm_observability/setup/sdk/#command-line-setup
[7]: /ja/llm_observability/setup/sdk/#in-code-setup
[8]: /ja/llm_observability/quickstart
[9]: /ja/llm_observability/setup/sdk/#tracing-spans
[10]: https://app.datadoghq.com/dash/integration/llm_analytics
[11]: /ja/llm_observability/setup/sdk/#annotating-a-span
[12]: /ja/llm_observability/setup/sdk/#annotating-a-span
[13]: /ja/llm_observability/setup/sdk/#tracking-user-sessions
[14]: /ja/llm_observability/setup/sdk/#tracing-multiple-applications
[15]: /ja/llm_observability/submit_evaluations
[16]: /ja/account_management/rbac/#datadog-default-roles
[17]: /ja/account_management/rbac/permissions/#llm-observability
---
aliases:
- /ja/tracing/llm_observability/sdk/python
- /ja/llm_observability/sdk/python
- /ja/llm_observability/setup/sdk/python
- /ja/llm_observability/setup/sdk/nodejs
- /ja/llm_observability/setup/sdk
- /ja/llm_observability/setup/sdk/java
- /ja/llm_observability/sdk/java
- /ja/llm_observability/sdk/
- /ja/llm_observability/instrumentation/custom_instrumentation
- /ja/tracing/llm_observability/trace_an_llm_application
- /ja/llm_observability/setup
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Datadog LLM Observability を使用して、LLM プロンプトを追跡、比較、最適化します。
title: LLM Observability SDK リファレンス
---
## 概要

Datadog の LLM Observability SDK は、自動インスツルメンテーションおよび手動インスツルメンテーション API を提供し、LLM アプリケーションの観測可能性とインサイトを提供します。

## セットアップ

### 要件

[Datadog API キー][1]。

[1]: https://app.datadoghq.com/organizationsettings/apikeys

{{< tabs >}}
{{% tab "Python" %}}
最新の `ddtrace` パッケージがインストールされています (Python 3.7 以降が必要です)。
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
最新の `ddtrace` パッケージがインストールされています (Node.js 16 以降が必要です)。
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
最新の [`ddtracejava` JAR][1] がダウンロードされています。LLM Observability SDK は、`ddtracejava` v1.51.0 以降 (Java 8 以降が必要です) でサポートされています。

[1]: https://github.com/DataDog/ddtracejava
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="コマンドラインのセットアップ" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
LLM Observability を有効にするには、`ddtracerun` コマンドを使用してアプリケーションを実行し、必要な環境変数を指定します。

**注**: `ddtracerun` は自動的にすべての LLM Observability インテグレーションを有効にします。

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### コマンドラインのセットアップ用の環境変数

`DD_SITE`
必須 - _文字列_
<br />LLM データ送信のための送信先 Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。

`DD_LLMOBS_ENABLED`
必須 - _整数または文字列_
<br />切り替えて、LLM Observability へのデータ送信を有効にします。`1` または `true` に設定する必要があります。

`DD_LLMOBS_ML_APP`
オプション - _文字列_
<br />すべてのトレースとスパンのグループ化が行われる LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。許可されている文字やその他の制約については、[アプリケーション命名ガイドライン](#applicationnamingguidelines)を参照してください。特定のルートスパンに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。指定しない場合、[`DD_SERVICE`][1] の値、または上流サービスから伝播された `DD_LLMOBS_ML_APP` の値がデフォルト設定されます。
<br />**注**: バージョン`ddtrace==3.14.0` より前では、これは**必須フィールド**です。

`DD_LLMOBS_AGENTLESS_ENABLED`
オプション - _整数または文字列_  **デフォルト**: `false`
<br />Datadog Agent を使用していない場合のみ必要で、その場合は `1` または `true` に設定する必要があります。

`DD_API_KEY`
オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合のみ必要です。

[1]: /ja/getting_started/tagging/unified_service_tagging?tab=kubernetes#noncontainerizedenvironment
{{% /tab %}}

{{% tab "Node.js" %}}
LLM Observability を有効にするには、`NODE_OPTIONS="import ddtrace/initialize.mjs"` を使用してアプリケーションを実行し、必要な環境変数を指定します。

**注**: `ddtrace/initialize.mjs` はすべての APM インテグレーションを自動的にオンにします。

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### コマンドラインのセットアップ用の環境変数

`DD_SITE`
必須 - _文字列_
<br />LLM データ送信のための Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。

`DD_LLMOBS_ENABLED`
必須 - _整数または文字列_
<br />切り替えて、LLM Observability へのデータ送信を有効にします。`1` または `true` に設定する必要があります。

`DD_LLMOBS_ML_APP`
オプション - _文字列_
<br />すべてのトレースとスパンのグループ化が行われる LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。許可されている文字やその他の制約については、[アプリケーション命名ガイドライン](#applicationnamingguidelines)を参照してください。特定のルートスパンに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。指定しない場合、[`DD_SERVICE`][1] の値、または上流サービスから伝播された `DD_LLMOBS_ML_APP` の値がデフォルト設定されます。
<br />**注**: バージョン`ddtrace@5.66.0` より前では、これは**必須フィールド**です。

`DD_LLMOBS_AGENTLESS_ENABLED`
オプション - _整数または文字列_  **デフォルト**: `false`
<br />Datadog Agent を使用していない場合のみ必要で、その場合は `1` または `true` に設定する必要があります。

`DD_API_KEY`
オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合のみ必要です。

[1]: /ja/getting_started/tagging/unified_service_tagging?tab=kubernetes#noncontainerizedenvironment
{{% /tab %}}
{{% tab "Java" %}}

LLM Observability を有効にするには、`ddtracejava`を使用してアプリケーションを実行し、必要なパラメーターを環境変数またはシステムプロパティとして指定します。

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### 環境変数とシステムプロパティ

次のパラメーターを環境変数 (たとえば、`DD_LLMOBS_ENABLED`) または Java システムプロパティ (たとえば、`dd.llmobs_enabled`) として指定できます。

`DD_SITE` または `dd.site`
必須 - _文字列_
<br />LLM データ送信のための送信先 Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。

`DD_LLMOBS_ENABLED` または `dd.llmobs.enabled`
必須 - _整数または文字列_
<br />切り替えて、LLM Observability へのデータ送信を有効にします。`1` または `true` に設定する必要があります。

`DD_LLMOBS_ML_APP` または `dd.llmobs.ml.app`
オプション - _文字列_
<br />すべてのトレースとスパンのグループ化が行われる LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。許可されている文字やその他の制約については、[アプリケーション命名ガイドライン](#applicationnamingguidelines)を参照してください。特定のルートスパンに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。指定しない場合、[`DD_SERVICE`][1] の値、または上流サービスから伝播された `DD_LLMOBS_ML_APP` の値がデフォルト設定されます。
<br />**注**: `ddtracejava`のバージョン1.54.0 より前では、これは**必須フィールド**です。

`DD_LLMOBS_AGENTLESS_ENABLED` または `dd.llmobs.agentless.enabled`
オプション - _整数または文字列_  **デフォルト**: `false`
<br />Datadog Agent を使用していない場合のみ必要で、その場合は `1` または `true` に設定する必要があります。

`DD_API_KEY` または `dd.api.key`
オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合のみ必要です。

[1]: /ja/getting_started/tagging/unified_service_tagging?tab=kubernetes#noncontainerizedenvironment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="コード内のセットアップ" level="h3" expanded=false id="in-code-setup" %}}

[コマンドラインのセットアップ](#commandlinesetup)を使用する代わりに、プログラムにより LLM Observability を有効にすることもできます。

{{< tabs >}}
{{% tab "Python" %}}

`LLMObs.enable()` 関数を使用して LLM Observability を有効にします。

<div class="alert alert-info">
このセットアップ方法を <code>ddtracerun</code> コマンドと一緒に使用しないでください。
</div>

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
)
{{< /code-block >}}

##### パラメーター

`ml_app`
オプション - _文字列_
<br />すべてのトレースとスパンのグループ化が行われる LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。許可されている文字やその他の制約については、[アプリケーション命名ガイドライン](#applicationnamingguidelines)を参照してください。特定のトレースに対してこの値をオーバーライドするには、[複数アプリケーションのトレース](#tracingmultipleapplications)を参照してください。指定しない場合、`DD_LLMOBS_ML_APP` の値がデフォルト設定されます。

`integrations_enabled`  **デフォルト**: `true`
オプション - _boolean_
<br />Datadog がサポートする [LLM インテグレーション][1] のために、LLM 呼び出しの自動追跡を有効化するフラグです。指定しない場合、サポートされているすべての LLM インテグレーションがデフォルトで有効になります。LLM インテグレーションを使用しないようにするには、この値を `false` に設定してください。

`agentless_enabled`
オプション - _boolean_  **デフォルト**: `false`
<br />Datadog Agent を使用していない場合のみ必要で、その場合はこれを `True` に設定する必要があります。これは、`ddtrace` ライブラリにより、Datadog エージェントを必要とするデータが送信されないように設定します。指定しない場合、`DD_LLMOBS_AGENTLESS_ENABLED` の値がデフォルト設定されます。

`site`
オプション - _文字列_
<br />LLM データ送信のための Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}指定しない場合、`DD_SITE` の値がデフォルト設定されます。

`api_key`
オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合のみ必要です。指定しない場合、`DD_API_KEY` の値がデフォルト設定されます。

`enabled`
オプション - _文字列_
<br />アプリケーションの環境の名前 (例: `prod`、`preprod`、`staging`)。指定しない場合、`DD_ENV` の値がデフォルト設定されます。

`service`
オプション - _文字列_
<br />アプリケーションで使用されるサービスの名前。指定しない場合、`DD_SERVICE` の値がデフォルト設定されます。

[1]: /ja/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
このセットアップ方法を <code>ddtrace/initialize.mjs</code> コマンドと一緒に使用しないでください。
</div>

`init()` 関数を使用して LLM Observability を有効にします。

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    agentlessEnabled: true,
  },
  site: "<YOUR_DATADOG_SITE>",
  env: "<YOUR_ENV>",
});

const llmobs = tracer.llmobs;
{{< /code-block >}}

**`llmobs` 設定のオプション**

`mlApp`
オプション - _文字列_
<br />すべてのトレースとスパンのグループ化が行われる LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。許可されている文字やその他の制約については、[アプリケーション命名ガイドライン](#applicationnamingguidelines)を参照してください。特定のトレースに対してこの値をオーバーライドするには、[複数アプリケーションのトレース](#tracingmultipleapplications)を参照してください。指定しない場合、`DD_LLMOBS_ML_APP` の値がデフォルト設定されます。

`agentlessEnabled`
オプション - _boolean_  **デフォルト**: `false`
<br /> Datadog Agent を使用していない場合のみ必要で、その場合はこれを `true` に設定する必要があります。これは、`ddtrace` ライブラリにより、Datadog エージェントを必要とするデータが送信されないように設定します。指定しない場合、`DD_LLMOBS_AGENTLESS_ENABLED` の値がデフォルト設定されます。

**一般的なトレーサー設定のオプション**:

`site`
オプション - _文字列_
<br />LLM データ送信のための Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}指定しない場合、`DD_SITE` の値がデフォルト設定されます。

`enabled`
オプション - _文字列_
<br />アプリケーションの環境の名前 (例: `prod`、`preprod`、`staging`)。指定しない場合、`DD_ENV` の値がデフォルト設定されます。

`service`
オプション - _文字列_
<br />アプリケーションで使用されるサービスの名前。指定しない場合、`DD_SERVICE` の値がデフォルト設定されます。

##### 環境変数

次の値を環境変数として設定してください。プログラムにより設定することはできません。

`DD_API_KEY`
オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合のみ必要です。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="AWS Lambda のセットアップ" level="h3" expanded=false id="aws-lambda-setup" %}}

既存の AWS Lambda 関数を LLM Observability でインスツルメントするには、Datadog 拡張機能と各言語レイヤーを使用します。

1. AWS コンソールで Cloudshell を開きます。
2. Datadog CLI クライアントをインストールします。

```shell
npm install -g @datadog/datadog-ci
```
3. Datadog API キーとサイトを設定します。

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
すでに Secrets Manager にシークレットがある場合や、シークレットを使用することが望ましい場合は、シークレット ARN を使用して API キーを設定できます。

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. LLM Observability を使用して Lambda 関数をインストールします (これには Datadog 拡張機能レイヤーのバージョン 77 以降が必要です)。
{{< tabs >}}
{{% tab "Python" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Lambda 関数を呼び出し、LLM Observability のトレースが Datadog UI に表示されることを確認します。

Lambda 関数が返される前に `flush` メソッドを使用して、LLM Observability のトレースを手動でフラッシュします。

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs
def handler():
  # function body
  LLMObs.flush()
```
{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
import tracer from 'dd-trace';
const llmobs = tracer.llmobs;

export const handler = async (event) => {
  // your function body
  llmobs.flush();
};
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


SDK をインストールし、アプリケーションを実行した後、自動インスツルメンテーションから LLM Observability にいくつかのデータが表示されなければなりません。手動インスツルメンテーションを使用して、まだサポートされていないライブラリからのカスタムビルドのフレームワークや操作をキャプチャできます。

## 手動インスツルメンテーション

{{< tabs >}}
{{% tab "Python" %}}

LLM 操作をキャプチャするために、関数デコレータを使用してワークフローを簡単にインスツルメントすることができます。

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

または、細かい操作をキャプチャするためのコンテキストマネージャベースのアプローチ

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

with LLMObs.llm(model="gpt-4o"):
    call_llm()
    LLMObs.annotate(
        metrics={
            "input_tokens": ...,
            "output_tokens": ...,
        },
    )
{{< /code-block >}}


利用可能なスパンの種類のリストについては、[スパンの種類のドキュメント][1] を参照してください。関数内の操作をより詳細にトレースする方法については、[インラインメソッドを使用したスパンのトレース](#tracingspansusinginlinemethods)を参照してください。

[1]: /ja/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

スパンをトレースするには、トレースしたい関数の関数ラッパーとして `llmobs.wrap(options, function)` を使用します。利用可能なスパンの種類のリストについては、[スパンの種類のドキュメント][1] を参照してください。関数内の操作をより詳細にトレースする方法については、[インラインメソッドを使用したスパンのトレース](#tracingspansusinginlinemethods)を参照してください。

### スパンの種類

スパンの種類は必須であり、`llmobs` トレース関数 (`trace`、`wrap`、および `decorate`) に渡される `options` オブジェクトに指定します。サポートされているスパンの種類のリストについては、[スパンの種類のドキュメント][1] を参照してください。

**注:** 無効なスパンの種類を持つスパンは、LLM Observability に送信されません。

### 自動関数引数/出力/名前キャプチャ

`llmobs.wrap` (TypeScript の場合は[`llmobs.decorate`](#functiondecoratorsintypescript) と一緒に) では、トレースされている関数の入力、出力、および名前のキャプチャが自動的に試みられます。スパンに手動でアノテーションを付ける必要がある場合は、[スパンの強化](#enrichingspans)を参照してください。アノテーションを付けた入力と出力により、自動キャプチャがオーバーライドされます。さらに、関数名をオーバーライドするには、オプションオブジェクトの `name` プロパティを `llmobs.wrap` 関数に渡します。

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### ラップされた関数のスパンを終了する条件

`llmobs.wrap` は、[`tracer.wrap`][2] の基本的な動作を拡張します。関数が呼び出されたときに作成される基本的なスパンは、次の条件で終了します。

 関数が Promise を返す場合、スパンは Promise が解決したとき、または拒否されたときに終了します。
関数が最後のパラメーターとしてコールバックを受け取る場合、スパンはそのコールバックが呼び出されたときに終了します。
関数がコールバックを受け取らず、Promise を返さない場合、スパンは関数実行の終了時に終了します。

次の例は、最後の引数がコールバックである 2 番目の条件を示しています。

#### 例

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // user application logic
  // the span for this function is finished when `next` is called
  next(err)
}
myAgentMiddleware = llmobs.wrap({ kind: 'agent' }, myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

アプリケーションがコールバック関数を使用しない場合は、代わりにインラインでトレースされたブロックを使用することをお勧めします。詳細については、[インラインメソッドを使用したトレースのスパン](#tracingspansusinginlinemethods)を参照してください。

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // the `next` callback is not being used here
  return llmobs.trace({ kind: 'agent', name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}

app.use(myAgentMiddleware)

{{< /code-block >}}

[1]: /ja/llm_observability/terms/
[2]: /ja/tracing/trace_collection/custom_instrumentation/nodejs/ddapi/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### スパンの開始

開始するスパンの種類に基づいて、複数の方法でスパンを開始することができます。サポートされているスパンの種類のリストについては、[スパンの種類のドキュメント][1] を参照してください。

すべてのスパンは、`LLMObsSpan` のオブジェクトインスタンスとして開始されます。各スパンには、スパンとやりとりし、データを記録するためのメソッドがあります。

### スパンの終了

トレースを送信し、Datadog アプリで表示するためには、スパンを終了する必要があります。

スパンを終了するには、スパンオブジェクトインスタンスで `finish()` を呼び出します。可能であれば、例外が発生したとしてもスパンが送信されるように、スパンを `try/finally` ブロックでラップしてください。

#### 例

```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /ja/llm_observability/terms/#spankinds
{{% /tab %}}
{{< /tabs >}}

### LLM 呼び出し

<div class="alert alert-info">LLM プロバイダーや、<a href="/llm_observability/instrumentation/auto_instrumentation/">Datadog の LLM インテグレーション</a>によってサポートされているフレームワークを使用している場合、これらの操作をトレースするために LLM スパンを手動で開始する必要はありません。</div>

{{< tabs >}}
{{% tab "Python" %}}
LLM 呼び出しをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.llm()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
必須 - _文字列_
<br/>呼び出された LLM の名前。

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`model_provider`
オプション - _文字列_  **デフォルト**: `"custom"`
<br />モデルプロバイダーの名前。
<br />**注**: 米ドルでの推定コストを表示するには、`model_provider` を次のいずれかの値に設定してください: `openai`、`azure_openai`、または `anthropic`。

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
LLM 呼び出しをトレースするには、スパンの種類を `llm` と指定し、必要に応じてオプションオブジェクトに次の引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
オプション - _文字列_  **デフォルト**: `"custom"`
<br/>呼び出された LLM の名前。

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`modelProvider`
オプション - _文字列_  **デフォルト**: `"custom"`
<br/>モデルプロバイダーの名前。
<br />**注**: 米ドルでの推定コストを表示するには、`modelProvider` を次のいずれかの値に設定してください: `openai`, `azure_openai`, または `anthropic`。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
LLM 呼び出しをトレースするには、次のメソッドをインポートして、次の引数を指定して呼び出します。

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`spanName` はスパンの種類にデフォルト設定されます。

`modelName`
オプション - _文字列_  **デフォルト**: `"custom"`
<br/>呼び出された LLM の名前。

`modelProvider`
オプション - _文字列_  **デフォルト**: `"custom"`
<br/>モデルプロバイダーの名前。
<br />**注**: 米ドルでの推定コストを表示するには、`modelProvider` を次のいずれかの値に設定してください: `openai`, `azure_openai`, または `anthropic`。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。非 null の値を指定すると、アプリケーションの開始時に指定された ML アプリ名がオーバーライドされます。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### ワークフロー

{{< tabs >}}
{{% tab "Python" %}}
ワークフローのスパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.workflow()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

ワークフローのスパンをトレースするには、スパンの種類を `workflow` と指定し、必要に応じてオプションオブジェクトに引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
ワークフローのスパンをトレースするには、次のメソッドをインポートして、次の引数を指定して呼び出します。

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`spanName` はスパンの種類にデフォルト設定されます。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。非 null の値を指定すると、アプリケーションの開始時に指定された ML アプリ名がオーバーライドされます。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String executeWorkflow() {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", null, "session-141");
    String workflowResult = workflowFn(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return workflowResult;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### エージェント

{{< tabs >}}
{{% tab "Python" %}}
エージェントの実行をトレースするには、関数デコレータ `ddtrace.llmobs.decorators.agent()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。
{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
エージェントの実行をトレースするには、スパンの種類を `agent` と指定し、必要に応じて、オプションオブジェクトに引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
エージェントの実行をトレースするには、次のメソッドをインポートして、次の引数を指定して呼び出します。

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`spanName` のデフォルトはトレースされた関数の名前になります。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。非 null の値を指定すると、アプリケーションの開始時に指定された ML アプリ名がオーバーライドされます。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### ツール呼び出し

{{< tabs >}}
{{% tab "Python" %}}
ツール呼び出しをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.tool()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
ツール呼び出しをトレースするには、スパンの種類を `tool` と指定し、必要に応じてオプションオブジェクトに引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
ツール呼び出しをトレースするには、次のメソッドをインポートし、次の引数を指定して呼び出します。

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`spanName` のデフォルトはトレースされた関数の名前になります。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。非 null の値を指定すると、アプリケーションの開始時に指定された ML アプリ名がオーバーライドされます。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### タスク

{{< tabs >}}
{{% tab "Python" %}}
タスクスパンをトレースするには、関数デコレータ `LLMObs.task()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="task-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
タスクスパンをトレースするには、スパンの種類を `task` と指定し、必要に応じてオプションオブジェクトに引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="task-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
タスクスパンをトレースするには、次のメソッドをインポートし、次の引数を指定して呼び出します。

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`spanName` のデフォルトはトレースされた関数の名前になります。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。非 null の値を指定すると、アプリケーションの開始時に指定された ML アプリ名がオーバーライドされます。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### 埋め込み

{{< tabs >}}
{{% tab "Python" %}}
埋め込み操作をトレースするには、関数デコレータ `LLMObs.embedding()` を使用します。

**注**: 埋め込みスパンの入力のアノテーションを付けるには、他のスパンタイプとは異なるフォーマットが必要です。埋め込み入力を指定する方法の詳細については、[スパンの強化](#enrichingspans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
必須 - _文字列_
<br/>呼び出された LLM の名前。

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` にはトレースされた関数の名前が設定されます。

`model_provider`
オプション - _文字列_  **デフォルト**: `"custom"`

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
埋め込み操作をトレースするには、スパンの種類を`embedding`として指定し、必要に応じてオプションオブジェクトに引数を指定します。

**注**: 埋め込みスパンの入力のアノテーションを付けるには、他のスパンタイプとは異なるフォーマットが必要です。埋め込み入力を指定する方法の詳細については、[スパンの強化](#enrichingspans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
オプション - _文字列_  **デフォルト**: `"custom"`
<br/>呼び出された LLM の名前。

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` にはトレースされた関数の名前が設定されます。

`modelProvider`
オプション - _文字列_  **デフォルト**: `"custom"`
<br/>モデルプロバイダーの名前。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### 取得

{{< tabs >}}
{{% tab "Python" %}}
取得スパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.retrieval()` を使用します。

**注**: 取得スパンの出力のアノテーションを付けるには、他のスパンタイプとは異なるフォーマットが必要です。取得出力を指定する方法の詳細については、[スパンの強化](#enrichingspans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`session_id`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`ml_app`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import retrieval

@retrieval
def get_relevant_docs(question):
    context_documents = ... # user application logic
    LLMObs.annotate(
        input_data=question,
        output_data = [
            {"id": doc.id, "score": doc.score, "text": doc.text, "name": doc.name} for doc in context_documents
        ]
    )
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

取得スパンをトレースするには、スパンの種類を `retrieval` と指定し、必要に応じてオプションオブジェクトに次の引数を指定します。

**注**: 取得スパンの出力のアノテーションを付けるには、他のスパンタイプとは異なるフォーマットが必要です。取得出力を指定する方法の詳細については、[スパンの強化](#enrichingspans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
オプション - _文字列_
<br/>操作の名前。指定されていない場合、`name` のデフォルトはトレースされた関数の名前になります。

`sessionId`
オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#trackingusersessions)を参照してください。

`mlApp`
オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracingmultipleapplications)を参照してください。

{{% /collapse-content %}}

#### 例

ここには、スパンにアノテーションを付ける例も含まれています。詳細については、[スパンの強化](#enrichingspans)を参照してください。

{{< code-block lang="javascript" >}}
function getRelevantDocs (question) {
  const contextDocuments = ... // user application logic
  llmobs.annotate({
    inputData: question,
    outputData: contextDocuments.map(doc => ({
      id: doc.id,
      score: doc.score,
      text: doc.text,
      name: doc.name
    }))
  })
  return
}
getRelevantDocs = llmobs.wrap({ kind: 'retrieval' }, getRelevantDocs)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## スパンのネスト

現在のスパンが終了する前に新しいスパンを開始すると、2 つのスパンの間にある親子関係が自動的にトレースされます。親スパンは大きな操作を表し、子スパンはその中の小さなネストされたサブ操作を表します。

{{< tabs >}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # performs data extraction on the document
    return

@task
def preprocess_document(document):
    ... # preprocesses a document for data extraction
    return
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
function preprocessDocument (document) {
  ... // preprocesses a document for data extraction
  return
}
preprocessDocument = llmobs.wrap({ kind: 'task' }, preprocessDocument)

function extractData (document) {
  preprocessDocument(document)
  ... // performs data extraction on the document
  return
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)
{{< /code-block >}}
{{% /tab %}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;

public class MyJavaClass {
  public void preprocessDocument(String document) {
  LLMObsSpan taskSpan = LLMObs.startTaskSpan("preprocessDocument", null, "session-141");
   ...   // preprocess document for data extraction
   taskSpan.annotateIO(...); // record the input and output
   taskSpan.finish();
  }

  public String extractData(String document) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("extractData", null, "session-141");
    preprocessDocument(document);
    ... // perform data extraction on the document
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
  }
}

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## スパンの強化

<div class="alert alert-info">
ここでの <code>メトリクス</code> パラメーターは、個々のスパンに属性として付加された数値を指します — <a href="/llm_observability/monitoring/metrics/">Datadog プラットフォームメトリクス</a>ではありません。<code>input_tokens</code>、<code>output_tokens</code>、<code>total_tokens</code> のような特定の認識されたキーに対して、Datadog はこれらのスパン属性を使用して、ダッシュボードやモニターで使用するための対応するプラットフォームメトリクス (<code>ml_obs.span.llm.input.tokens</code> など) を生成します。
</div>

{{< tabs >}}
{{% tab "Python" %}}
SDK には、入力、出力、およびメタデータでスパンを強化するための `LLMObs.annotate()` メソッドが用意されています。

`LLMObs.annotate()` メソッドは次の引数を受け付けます。

{{% collapse-content title="引数" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
オプション - _スパン_  **デフォルト**: 現在のアクティブなスパン
<br />アノテーションを付けるスパン。`span` が指定されていない場合 (関数デコレータを使用する場合など)、SDK は現在のアクティブなスパンにアノテーションを付けます。

`input_data`
オプション - _JSON のシリアライズ可能な型、または辞書のリスト_
<br />JSON のシリアライズ可能な型 (非 LLM スパン用) またはこの形式の辞書のリスト: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`、ここで `"tool_calls"` は、必須キー `"name"`、`"arguments"` を持つツール呼び出し辞書のオプションのリストであり、オプションのキー `"tool_id"`、`"type"`、および `"tool_results"` は、必須キー `"result"` と、関数呼び出しシナリオ用のオプションのキー `"name"`、`"tool_id"`、`"type"` を持つツール結果辞書のオプションのリストです。**注**: 埋め込みスパンは特別なケースであり、`{"text": "..."}` という形式の文字列または辞書 (または辞書のリスト) が必要です。

`output_data`
オプション - _JSON のシリアライズ可能な型、または辞書のリスト_
<br />JSON のシリアライズ可能な型 (非 LLM スパン用) またはこの形式の辞書のリスト: `{"content": "...", "role": "...", "tool_calls": ...}`、ここで `"tool_calls"` は、必須キー `"name"`、`"arguments"` と、関数呼び出しシナリオ用のオプションのキー `"tool_id"`、`"type"` を持つツール呼び出し辞書のオプションのリストです。**注**: 取得スパンは特別なケースであり、`{"text": "...", "name": "...", "score": float, "id": "..."}` という形式の文字列または辞書 (または辞書のリスト) が必要です。

`tool_definitions`
オプション - _辞書のリスト_
<br />関数呼び出しシナリオ用のツール定義辞書のリスト。各ツール定義には、必須の `"name": "..."` キーと、オプションの `"description": "..."` および `"schema": {...}` キーが必要です。

`metadata`
オプション - _辞書_
<br />スパンで記述された入力または出力操作に関連するメタデータ情報としてユーザーが追加できる、JSON のシリアライズ可能なキーと値のペアの辞書です (`model_temperature`、`max_tokens`、`top_k` など)。

`metrics`
オプション - _辞書_
<br />スパンで記述された操作に関連するメトリクスとしてユーザーが追加できる、JSON のシリアライズ可能なキーと数値の辞書です (`input_tokens`、`output_tokens`、`total_tokens`、`time_to_first_token` など)。`time_to_first_token` の単位は秒であり、デフォルトで出力される `duration` メトリクスと同様です。

`notification`
オプション - _辞書_
<br />ユーザーがタグとしてスパンに追加できる、JSON のシリアライズ可能なキーと値のペアの辞書です。キーの例: `session`、`env`、`system`、`version`。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import embedding, llm, retrieval, workflow

@llm(model_name="model_name", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
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
def extract_data(document):
    resp = llm_call(document)
    LLMObs.annotate(
        input_data=document,
        output_data=resp,
        tags={"host": "host_name"},
    )
    return resp

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
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
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data="Hello world!",
        output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
        tags={"host": "host_name"},
    )
    return

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
SDK には、入力、出力、メタデータを使用してスパンにアノテーションを付けるための `llmobs.annotate()` メソッドが用意されています。

`LLMObs.annotate()` メソッドは次の引数を受け付けます。

{{% collapse-content title="引数" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
オプション - _スパン_  **デフォルト**: 現在のアクティブなスパン
<br />アノテーションを付けるスパン。`span` が指定されていない場合 (関数ラッパーを使用している場合など)、SDK により現在のアクティブなスパンにアノテーションが付けられます。

`annotationOptions`
必須 - _オブジェクト_
<br />スパンにアノテーションを付けるための異なるタイプのデータのオブジェクトです。

`annotationOptions` オブジェクトには、次の項目を含めることができます。

`inputData`
オプション - _JSON のシリアライズ可能な型、またはオブジェクトのリスト_
<br />(非 LLM スパン用の) JSON のシリアライズ可能な型、またはこの形式の辞書のリスト: `{role: "...", content: "..."}` (LLM スパン用)。 **注**: 埋め込みスパンは特別なケースであり、`{text: "..."}` という形式の文字列またはオブジェクト (またはオブジェクトのリスト) が必要です。

`outputData`
オプション - _JSON のシリアライズ可能な型、またはオブジェクトのリスト_
<br />(非 LLM スパン用の) JSON のシリアライズ可能な型、またはこの形式のオブジェクトのリスト: `{role: "...", content: "..."}` (LLM スパン用)。**注**: 取得スパンは特別なケースであり、`{text: "...", name: "...", score: number, id: "..."}` という形式の文字列またはオブジェクト (またはオブジェクトのリスト) が必要です。

`metadata`
オプション - _オブジェクト_
<br />スパンで記述された入力または出力操作に関連するメタデータ情報としてユーザーが追加できる、JSON のシリアライズ可能なキーと値のペアのオブジェクト (`model_temperature`、`max_tokens`、`top_k` など)。

`metrics`
オプション - _オブジェクト_
<br />スパンで記述された操作に関連するメトリクスとしてユーザーが追加できる、JSON のシリアライズ可能なキーと数値のオブジェクト (`input_tokens`、`output_tokens`、`total_tokens` など)。

`notification`
オプション - _オブジェクト_
<br />スパンのコンテキストに関してユーザーがタグとして追加できる、JSON のシリアライズ可能なキーと値のペアのオブジェクト (`session`、`environment`、`system`、`versioning` など)。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: "Hello world!" }],
    outputData: [{ role: "assistant", content: "How can I help?" }],
    metadata: { temperature: 0, max_tokens: 200 },
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 },
    tags: { host: "host_name" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind:'llm', modelName: 'modelName', modelProvider: 'modelProvider' }, llmCall)

function extractData (document) {
  const resp = llmCall(document)
  llmobs.annotate({
    inputData: document,
    outputData: resp,
    tags: { host: "host_name" }
  })
  return resp
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)

function performEmbedding () {
  ... // user application logic
  llmobs.annotate(
    undefined, { // this can be set to undefined or left out entirely
      inputData: { text: "Hello world!" },
      outputData: [0.0023064255, -0.009327292, ...],
      metrics: { input_tokens: 4 },
      tags: { host: "host_name" }
    }
  )
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // user application logic
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap({ kind: 'retrieval', name: 'getRelevantDocs' }, similaritySearch)

{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
SDK には、入力、出力、メトリクス、メタデータを使用してスパンにアノテーションを付けるためのいくつかのメソッドが用意されています。

### 入力と出力のアノテーション付け

`LLMObsSpan` インターフェイスの `annotateIO()` メンバーメソッドを使用して、`LLMObsSpan` に構造化された入力および出力データを追加します。ここにはオプションの引数と LLM メッセージオブジェクトが含まれます。

#### 引数

引数が null または空の場合、処理は何も行われません。たとえば、`inputData` が空でない文字列で、`outputData` が null の場合、`inputData` のみが記録されます。

`inputData`
オプション - _文字列_ または _リスト<LLMObs.LLMMessage>_
<br />文字列 (非 LLM スパン用)、または LLM スパン用の `LLMObs.LLMMessage` のリスト。

`outputData`
オプション - _文字列_ または _リスト<LLMObs.LLMMessage>_
<br />文字列 (非 LLM スパン用)、または LLM スパン用の `LLMObs.LLMMessage` のリスト。

#### LLM メッセージ
LLM スパンは、`LLMObs.LLMMessage` オブジェクトを使用して LLM メッセージでアノテーションを付ける必要があります。

`LLMObs.LLMMessage` オブジェクトは、次の引数を指定して `LLMObs.LLMMessage.from()` を呼び出すことでインスタンス化できます。

`role`
必須 - _文字列_
<br />メッセージの作成者の役割を記述する文字列。

`content`
必須 - _文字列_
<br />メッセージの内容を含む文字列。

#### 例

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String systemMessage = "You are a helpful assistant";
    Response chatResponse = ... // user application logic to invoke LLM
    llmSpan.annotateIO(
      Arrays.asList(
        LLMObs.LLMMessage.from("user", userInput),
        LLMObs.LLMMessage.from("system", systemMessage)
      ),
      Arrays.asList(
        LLMObs.LLMMessage.from(chatResponse.role, chatResponse.content)
      )
    );
    llmSpan.finish();
    return chatResponse;
  }
}
```

### メトリクスの追加

#### メトリクスの一括追加

`LLMObsSpan` インターフェイスの `setMetrics()` メンバーメソッドは、複数のメトリクスを一括でアタッチするための次の引数を受け付けます。

##### 引数

`metrics`
必須 - _Map&lt;string, number>_
<br /> スパンで記述された操作に関連するメトリクスを記録するためにユーザーが追加できる JSON のシリアライズ可能なキーと数値のマップ (たとえば、`input_tokens`、`output_tokens`、`total_tokens`)。

#### 単一のメトリクスを追加

`LLMObsSpan` インターフェイスの `setMetric()` メンバーメソッドは、単一のメトリクスをアタッチするための次の引数を受け付けます。

##### 引数

`key`
必須 - _CharSequence_
<br /> メトリクスの名前。

`value`
必須 - _int_、 _long_、または _double_
<br /> メトリクスの値。

#### 例

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "time_per_output_token", 0.1773
    ));
    llmSpan.setMetric("total_tokens", 955);
    llmSpan.setMetric("time_to_first_token", 0.23);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### タグの追加

タグの詳細については、[タグの概要][1] を参照してください。

#### タグの一括追加

`LLMObsSpan` インターフェイスの `setTags()` メンバーメソッドは、複数のタグを一括でアタッチするための次の引数を受け付けます。

##### 引数

`notification`
必須 - _Map&lt;string, object>_
<br /> スパンのコンテキストを説明するためにユーザーがタグとして追加できる JSON のシリアライズ可能なキーと値のペアのマップ (たとえば、`session`、`environment`、`system`、または`version`)。

#### 単一のタグを追加

`LLMObsSpan` インターフェイスの `setTag()` メンバーメソッドは、単一のタグをアタッチするための次の引数を受け付けます。

##### 引数

`key`
必須 - _文字列_
<br /> タグのキー。

`value`
必須 - _int_、_long_、_double_、_boolean_、または_String_
<br /> タグの値。

#### 例

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setTags(Map.of(
      "chat_source", "web",
      "users_in_chat", 3
    ));
    llmSpan.setTag("is_premium_user", true);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### エラーのアノテーション付け

#### Throwable の追加 (推奨)

`LLMObsSpan` インターフェイスの `addThrowable()` メンバーメソッドは、スタックトレースを持つ Throwable をアタッチするための次の引数を受け付けます。

##### 引数

`throwable`
必須 - _Throwable_
<br /> 発生した Throwable/Exception。

#### エラーメッセージの追加

`LLMObsSpan` インターフェイスの `setErrorMessage()` メンバーメソッドは、エラー文字列をアタッチするための次の引数を受け付けます。

##### 引数

`errorMessage`
必須 - _文字列_
<br /> エラーメッセージ。

#### エラーフラグの設定

`LLMObsSpan` インターフェイスの `setError()` メンバーメソッドは、操作にエラーがあることを示すための次の引数を受け付けます。

##### 引数

`error`
必須 - _boolean_
<br /> `true` の場合、スパンでエラーが発生しています。

#### 例

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();
    }
    return chatResponse;
  }
}
```

### メタデータのアノテーション付け

`LLMObsSpan` インターフェイスの `setMetadata()` メンバーメソッドは、次の引数を受け付けます。

`metadata`
必須 - _Map&lt;string, object>_
<br />スパンによって記述された入力または出力操作に関連するメタデータを含む、JSON のシリアライズ可能なキーと値のペアのマップです。

#### 例

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    llmSpan.setMetadata(
      Map.of(
        "temperature", 0.5,
        "is_premium_member", true,
        "class", "e1"
      )
    );
    String chatResponse = ... // user application logic to invoke LLM
    return chatResponse;
  }
}
```

[1]: /ja/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

### 自動インスツルメンテーションスパンのアノテーション付け

{{< tabs >}}
{{% tab "Python" %}}

SDK の `LLMObs.annotation_context()` メソッドは、アノテーションコンテキストがアクティブな間に開始されたすべての自動インスツルメンテーションスパンを変更するために使用できるコンテキストマネージャーを返します。

`LLMObs.annotation_context()` メソッドは、次の引数を受け付けます。

{{% collapse-content title="引数" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
オプション - _str_
<br />アノテーションコンテキスト内で開始される自動インスツルメンテーションスパンのスパン名をオーバーライドする名前です。

`prompt`
オプション - _辞書_
<br />LLM 呼び出しに使用されるプロンプトを表す辞書です。完全なスキーマとサポートされているキーについては、[プロンプトオブジェクト](#prompttrackingarguments)のドキュメントを参照してください。`Prompt` オブジェクトを `ddtrace.llmobs.utils` からインポートし、`prompt` 引数として渡すこともできます。**注**: この引数は LLM スパンにのみ適用されます。

`notification`
オプション - _辞書_
<br />ユーザーがタグとしてスパンに追加できる、JSON のシリアライズ可能なキーと値のペアの辞書です。キーの例: `session`、`env`、`system`、`version`。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def rag_workflow(user_question):
    context_str = retrieve_documents(user_question).join(" ")

    with LLMObs.annotation_context(
        prompt = Prompt(
            id="chatbot_prompt",
            version="1.0.0",
            template="Please answer the question using the provided context: {{question}}\n\nContext:\n{{context}}",
            variables={
                "question": user_question,
                "context": context_str,
            }
        ),
        tags = {
            "retrieval_strategy": "semantic_similarity"
        },
        name = "augmented_generation"
    ):
        completion = openai_client.chat.completions.create(...)
    return completion.choices[0].message.content

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

SDKの `llmobs.annotationContext()` は、コールバック関数のスコープ内で開始されたすべての自動インスツルメンテーションスパンを変更するために使用できるコールバック関数を受け付けます。

`llmobs.annotationContext()` メソッドは、第 1 引数に次のオプションを受け付けます。

{{% collapse-content title="オプション" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
オプション - _str_
<br />アノテーションコンテキスト内で開始される自動インスツルメンテーションスパンのスパン名をオーバーライドする名前です。

`notification`
オプション - _オブジェクト_
<br />ユーザーがスパンにタグとして追加できる JSON のシリアライズ可能なキーと値のペアのオブジェクトです。キーの例: `session`、`env`、`system`、`version`。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。

{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function ragWorkflow(userQuestion) {
    const contextStr = retrieveDocuments(userQuestion).join(" ");

    const completion = await llmobs.annotationContext({
      tags: {
        retrieval_strategy: "semantic_similarity"
      },
      name: "augmented_generation"
    }, async () => {
      const completion = await openai_client.chat.completions.create(...);
      return completion.choices[0].message.content;
    });
}

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## プロンプト追跡

構造化されたプロンプトメタデータを LLM スパンにアタッチすることにより、結果を再現し、変更を監査し、バージョン間でプロンプトのパフォーマンスを比較できるようにします。テンプレートを使用する際、LLM Observability は、テンプレートの内容の変更に基づいて[バージョン追跡](#versiontracking)も提供します。

{{< tabs >}}
{{% tab "Python" %}}
LLM 呼び出しの前にプロンプトメタデータをアタッチするには、`LLMObs.annotation_context(prompt=...)` を使用します。スパンアノテーションの詳細については、[スパンの強化](#enrichingspans)を参照してください。

#### 引数

{{% collapse-content title="引数" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
必須の - 辞書
<br />次のプロンプトスキーマに従った型付き辞書。

{{% /collapse-content %}}

{{% collapse-content title="プロンプト構造" level="h4" expanded=false id="prompt-structure" %}}

サポートされているキー:

 `id` (str): このプロンプトの論理識別子。`ml_app` ごとに一意である必要があります。デフォルトは `{ml_app}unnamed_prompt` です。
 `version` (str): プロンプトのバージョンタグ (例: "1.0.0")。詳細については、[バージョン追跡](#versiontracking)を参照してください。
`variables` (Dict[str, str]): テンプレートのプレースホルダーに入力するために使用される変数。
`template` (str): プレースホルダーを含むテンプレート文字列 (例: `"Translate {{text}} to {{lang}}")。
`chat_template` (List[Message]): マルチメッセージテンプレート形式。`{ "role": "<role>", "content": "<template string with placeholders>" }` オブジェクトのリストを指定します。
`tags` (Dict[str, str]): プロンプト実行にアタッチするタグ。
`rag_context_variables` (List[str]): グラウンドトゥルース/コンテキストコンテンツを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。
`rag_query_variables` (List[str]): ユーザーのクエリを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。

{{% /collapse-content %}}

#### 例: シングルテンプレートプロンプト

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def answer_question(text):
    # Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    with LLMObs.annotation_context(prompt={
        "id": "translation-template",
        "version": "1.0.0",
        "chat_template": [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        "variables": {"lang": "fr", "text": text},
        "tags": {"team": "nlp"}
    }):
        # Example provider call (replace with your client)
        completion = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Translate to fr: {text}"}]
        )
    return completion
{{< /code-block >}}

#### 例: LangChain プロンプトテンプレート

LangChain のプロンプトテンプレートを自動インスツルメンテーションと一緒に使用する際は、意味のある名前の変数にテンプレートを割り当ててください。自動インスツルメンテーションは、これらの名前を使用してプロンプトを特定します。

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

LLM 呼び出しの前にプロンプトメタデータをアタッチするには、`llmobs.annotationContext({ prompt: ... }, () => { ... })` を使用します。スパンアノテーションの詳細については、[スパンの強化](#enrichingspans)を参照してください。

#### 引数

{{% collapse-content title="オプション" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
必須 - オブジェクト
<br />次のプロンプトスキーマに従うオブジェクト。

{{% /collapse-content %}}

{{% collapse-content title="プロンプト構造" level="h4" expanded=false id="prompt-structure" %}}

サポートされているプロパティ:

 `id` (文字列): このプロンプトの論理識別子。`ml_app` ごとに一意である必要があります。デフォルトは `{ml_app}unnamed_prompt` です。
 `version` (文字列): プロンプトのバージョンタグ (例: 「1.0.0」)。詳細については、[バージョン追跡](#versiontracking)を参照してください。
`variables` (Record&lt;string, string>
): テンプレートのプレースホルダーに入力するために使用される変数。
`template` (文字列 | List[Message]): プレースホルダーを含むテンプレート文字列 (例: `"Translate {{text}} to {{lang}}"`)。または、`{ "role": "<role>", "content": "<template string with placeholders>" }` オブジェクトのリストです。
`tags` (Record&lt;string, string>
): プロンプト実行にアタッチするタグ。
`contextVariables` (string[]): グラウンドトゥルース/コンテキストコンテンツを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。
`queryVariables` (string[]): ユーザーのクエリを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。

{{% /collapse-content %}}

#### 例: シングルテンプレートプロンプト

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function answerQuestion(text) {
    // Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    return llmobs.annotationContext({
      prompt: {
        id: "translation-template",
        version: "1.0.0",
        chat_template: [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        variables: {"lang": "fr", "text": text},
        tags: {"team": "nlp"}
      }
    }, () => {
      // Example provider call (replace with your client)
      return openaiClient.chat.completions.create({
          model: "gpt-4o",
          messages: [{"role": "user", "content": f"Translate to fr: {text}"}]
        });
    });
}
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

#### 注
 プロンプトのアノテーション付けは LLM スパンでのみ利用可能です。
アノテーションは、正しい LLM スパンに適用されるようにするため、プロバイダー呼び出しの直前に配置します。
アプリケーション内の異なるプロンプトを区別するために、固有のプロンプト `id` を使用してください。
テンプレートを静的に保つためにプレースホルダー構文 (`{{variable_name}}` など) を使用し、`variables` セクションで動的コンテンツを定義します。
ブロック内で複数の自動インスツルメンテーション LLM 呼び出しを行う場合、アノテーションコンテキストを使用して同じプロンプトメタデータを呼び出し全体に適用します。[自動インスツルメンテーションスパンのアノテーション付け](#annotatingautoinstrumentedspans)を参照してください。

### バージョン追跡

LLM Observability は、バージョンが明示的に指定されていない場合に、プロンプトの自動バージョニングを提供します。プロンプトメタデータに `version` タグなしで `template` または `chat_template` を指定すると、システムではテンプレートの内容のハッシュを計算して自動的にバージョンが生成されます。`version` タグを指定した場合、LLM Observability では自動生成したバージョンラベルの代わりに指定したバージョンラベルが使用されます。

バージョニングシステムは次のように機能します。
 **自動バージョニング**: `version` タグを指定していない場合、LLM Observability では `template` または `chat_template` の内容のハッシュを計算して自動的に数値のバージョン識別子が生成されます。
 **手動バージョニング**: `version` タグを指定した場合、LLM Observability では指定した通りにバージョンラベルが使用されます。
 **バージョン履歴**: プロンプトの進展を時系列で追跡するために、自動生成されたバージョンと手動バージョンの両方がバージョン履歴に保持されます。

これにより、テンプレート内容の変更に基づく自動バージョン管理に依存するか、独自のバージョンラベルでバージョニングを完全に制御するかを柔軟に選択できます。

## コストモニタリング
トークンメトリクス (自動コスト追跡用) またはコストメトリクス (手動コスト追跡用) を LLM/埋め込みスパンにアタッチします。トークンメトリクスを使用すると、Datadog でプロバイダーの価格を使用してコストを計算でき、コストメトリクスを使用すると、カスタムモデルまたはサポートされていないモデルを使用する際に、独自の価格を提供できます。詳細については、[コスト][14] を参照してください。

自動インスツルメンテーションを使用している場合、トークンとコストメトリクスは自動的にスパンに表示されます。手動でインスツルメントする場合は、次のガイダンスに従ってください。

<div class="alert alert-info">このコンテキストでは、「トークンメトリクス」と「コストメトリクス」は、<code>LLMObs.annotate()</code> メソッドの <code>metrics</code> パラメーターを介してスパンにアタッチする数値のキーと値のペアを指します。これらは、<a href="/llm_observability/monitoring/metrics/">Datadog プラットフォームの LLM Observability メトリクス</a>とは異なります。<code>input_tokens</code>、<code>output_tokens</code>、<code>input_cost</code>、<code>output_cost</code> のような認識されたキーについては、Datadog ではこれらのスパン属性を使用して、ダッシュボードやモニターで使用するための対応するプラットフォームメトリクス (<code>ml_obs.span.llm.input.cost</code>など) を生成します。</div>

{{< tabs >}}
{{% tab "Python" %}}

#### ユースケース: 一般的なモデルプロバイダーの使用
Datadog では、OpenAI、Azure OpenAI、Anthropic、Google Gemini などの一般的なモデルプロバイダーがサポートされています。これらのプロバイダーを使用する場合、LLM リクエストに `model_name`、`model_provider`、およびトークン使用量によりアノテーション付けするだけで済みます。Datadog では、プロバイダーの価格に基づいて推定コストが自動的に計算されます。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate token metrics
    LLMObs.annotate(
        metrics={
          "input_tokens": 50,
          "output_tokens": 120,
          "total_tokens": 170,
          "non_cached_input_tokens": 13,  # optional
          "cache_read_input_tokens": 22,  # optional
          "cache_write_input_tokens": 15, # optional
        },
    )
    return resp
{{< /code-block >}}

#### ユースケース: カスタムモデルの使用
カスタムモデルまたはサポートされていないモデルの場合、コストデータにより手動でスパンにアノテーション付けする必要があります。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="custom_model", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate cost metrics
    LLMObs.annotate(
        metrics={
          "input_cost": 3,
          "output_cost": 7,
          "total_cost": 10,
          "non_cached_input_cost": 1,    # optional
          "cache_read_input_cost": 0.6,  # optional
          "cache_write_input_cost": 1.4, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## 評価

LLM Observability SDK には、評価を Datadog にエクスポートおよび送信するためのメソッドが用意されています。

<div class="alert alert-info">豊富な結果メタデータを使用して、再利用可能なクラスベースの評価機能 (<code>BaseEvaluator</code>、<code>BaseSummaryEvaluator</code>) を構築する方法については、<a href="/llm_observability/guide/evaluation_developer_guide/">評価開発者ガイド</a>を参照してください。</div>

評価は単一のスパンに結合する必要があります。ターゲットスパンは、次の 2 つの方法のいずれかを使用して特定できます。
 _タグベースの結合_ - 単一のスパンに設定された一意のキーと値のタグペアを使用して、評価を結合します。タグのキーと値ペアが複数のスパンに一致する場合、またはどのスパンにも一致しない場合、評価の結合は失敗します。
 _直接スパン参照_ - スパンの一意のトレース ID とスパン ID の組み合わせを使用して、評価を結合します。

### スパンのエクスポート
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` は、スパンからスパンコンテキストを抽出するために使用できます。このメソッドは、評価をそれに対応するスパンに関連付けるのに役立ちます。

#### 引数
`LLMObs.export_span()` メソッドは次の引数を受け付けます。

`span`
オプション - _スパン_
<br />スパンのコンテキスト (スパンおよびトレース ID) を抽出するスパン。指定しない場合 (関数デコレータを使用する場合など)、SDK により現在のアクティブスパンがエクスポートされます。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
`llmobs.exportSpan()` は、スパンからスパンのコンテキストを抽出するために使用できます。このメソッドを使用して、評価をそれに対応するスパンに関連付ける必要があります。

#### 引数

`llmobs.exportSpan()` メソッドは次の引数を受け付けます。

`span`
オプション - _スパン_
<br />スパンのコンテキスト (スパンおよびトレース ID) を抽出するスパン。指定しない場合 (関数ラッパーを使用する場合など)、SDK により現在アクティブなスパンがエクスポートされます。

#### 例

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 評価の送信

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` は、指定されたスパンに関連付けられたカスタム評価を送信するために使用できます。

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> は非推奨であり、次のメジャーバージョンの ddtrace (4.0) で削除されます。移行するには、<code>LLMObs.submit_evaluation_for</code> の呼び出しを <code>LLMObs.submit_evaluation</code> という名前に変更してください。</div>

**注**: カスタム評価は、自分で実装し、ホストする評価機能です。これらは、組み込みの評価機能を使用して Datadog により自動的に計算される、既成の評価機能とは異なります。アプリケーションのために既成の評価を構成するには、Datadog の [**LLM Observability**] > [**Settings**] (設定) > [**Evaluations**] (評価)][1] ページを使用してください。

`LLMObs.submit_evaluation()` メソッドは次の引数を受け付けます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
必須 - _文字列_
<br />評価の名前。

`metric_type`
必須 - _文字列_
<br />評価のタイプ。`categorical`、`score`、`boolean` または `json` でなければなりません。

`value`
必須 - _文字列、数値型、または辞書_
<br />評価の値。文字列 (`metric_type==categorical`)、整数/浮動小数点数 (`metric_type==score`)、boolean (`metric_type==boolean`)、または辞書 (`metric_type==json`) である必要があります。

`span`
オプション - _辞書_
<br />この評価に関連付けられたスパンを一意に識別する辞書。`span_id` (文字列) と `trace_id` (文字列) を含む必要があります。この辞書を生成するには、[`LLMObs.export_span()`](#exportingaspan) を使用してください。

`span_with_tag_value`
オプション - _辞書_
<br />この評価に関連付けられたスパンを一意に識別する辞書。`tag_key` (文字列) と `tag_value` (文字列) を含む必要があります。

   **注**: `span` または `span_with_tag_value` のいずれか一方が必要です。両方を指定するか、どちらも指定しないと、ValueError が発生します。

`ml_app`
必須 - _文字列_
<br />ML アプリケーションの名前。

`timestamp_ms`
オプション - _整数_
<br />評価メトリクス結果が生成されたときのミリ秒単位の Unix タイムスタンプです。指定しない場合は、現在の時間がデフォルト設定されます。

`notification`
オプション - _辞書_
<br />評価に関してユーザーがタグとして追加できる文字列のキーと値のペアの辞書です。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。

`assessment`
オプション - _文字列_
<br />この評価に対するアセスメントです。受け付けられる値は `pass` と `fail` です。

`reasoning`
オプション - _文字列_
<br />評価結果のテキスト説明。

`metadata`
オプション - _辞書_
<br />評価結果に関連付けられた任意の構造化メタデータを含む辞書。
{{% /collapse-content %}}

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via a tag key-value pair
    msg_id = get_msg_id()
    LLMObs.annotate(
        tags = {'msg_id': msg_id}
    )

    LLMObs.submit_evaluation(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )
    return completion
{{< /code-block >}}

[1]: https://app.datadoghq.com/llm/evaluations

{{% /tab %}}

{{% tab "Node.js" %}}

`llmobs.submitEvaluation()` は、指定されたスパンに関連付けられたカスタム評価を送信するために使用できます。

`llmobs.submitEvaluation()` メソッドは次の引数を受け付けます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
必須 - _辞書_
<br />評価に関連付けるスパンコンテキスト。これは `LLMObs.export_span()` の出力である必要があります。

`evaluationOptions`
必須 - _オブジェクト_
<br />評価データのオブジェクト。

`evaluationOptions` オブジェクトには次の項目を含めることができます。

`label`
必須 - _文字列_
<br />評価の名前。

`metricType`
必須 - _文字列_
<br />評価のタイプ。"categorical"、"score"、"boolean" または "json" のいずれかである必要があります。

`value`
必須 - _文字列または数値型_
<br />評価の値。文字列 (カテゴリカル `metric_type` 用)、数値 (スコア `metric_type` 用)、boolean (boolean `metric_type` 用)、または JSON オブジェクト (json `metric_type` 用) である必要があります。

`notification`
オプション - _辞書_
<br />評価に関してユーザーがタグとして追加できる文字列のキーと値のペアの辞書です。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。

`assessment`
オプション - _文字列_
<br />この評価に対するアセスメントです。受け付けられる値は `pass` と `fail` です。

`reasoning`
オプション - _文字列_
<br />評価結果のテキスト説明。

`metadata`
オプション - _辞書_
<br />評価結果に関連付けられた任意の構造化メタデータを含む JSON オブジェクト。
{{% /collapse-content %}}

#### 例

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  llmobs.submitEvaluation(spanContext, {
    label: "harmfulness",
    metricType: "score",
    value: 10,
    tags: { evaluationProvider: "ragas" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

[1]: /ja/getting_started/tagging/
{{% /tab %}}
{{% tab "Java" %}}

`LLMObs.SubmitEvaluation()` を使用して、指定されたスパンに関連付けられたカスタム評価を送信します。

`LLMObs.SubmitEvaluation()` メソッドは次の引数を受け付けます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
必須 - _LLMObsSpan_
<br />評価に関連付けるスパンコンテキスト。

`label`
必須 - _文字列_
<br />評価の名前。

`categoricalValue` または `scoreValue`
必須 - _String_ または _double_
<br />評価の値。文字列 (カテゴリ評価用) または double (スコア評価用) である必要があります。

`notification`
オプション - _Map&lt;string, object>_
<br />評価をタグ付けするために使用される文字列のキーと値のペアの辞書。タグの詳細については、[タグの概要](/getting_started/tagging/)を参照してください。
{{% /collapse-content %}}

#### 例

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();

      // submit evaluations
      LLMObs.SubmitEvaluation(llmSpan, "toxicity", "toxic", Map.of("language", "english"));
      LLMObs.SubmitEvaluation(llmSpan, "f1-similarity", 0.02, Map.of("provider", "f1-calculator"));
    }
    return chatResponse;
  }
}
{{< /code-block >}}

[1]: /ja/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

## スパン処理

スパン上の入力および出力データを変更するには、プロセッサー関数を設定します。プロセッサー関数は、条件付きの入力/出力変更を可能にするために、スパンタグにアクセスできます。プロセッサー関数は、変更されたスパンを返してそれを出力するか、`None`/`null` を返してスパンが完全に出力されるのを防ぐことができます。これは、機密データを含むスパンや特定の基準を満たすスパンをフィルタリングするのに便利です。

{{< tabs >}}
{{% tab "Python" %}}

### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_output") == "true":
        for message in span.output:
            message["content"] = ""
    return span


# If using LLMObs.enable()
LLMObs.enable(
  ...
  span_processor=redact_processor,
)
# else when using `ddtrace-run`
LLMObs.register_processor(redact_processor)

with LLMObs.llm("invoke_llm_with_no_output"):
    LLMObs.annotate(tags={"no_output": "true"})
{{< /code-block >}}


### 例: インスツルメンテーションによる条件付き変更

自動インスツルメンテーションを使用する場合、スパンは必ずしもコンテキスト的にアクセスできるわけではありません。自動インスツルメンテーションスパンの入力と出力を条件付きで変更するには、スパンプロセッサーに加えて `annotation_context()` を使用します。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_input") == "true":
        for message in span.input:
            message["content"] = ""
    return span

LLMObs.register_processor(redact_processor)


def call_openai():
    with LLMObs.annotation_context(tags={"no_input": "true"}):
        # make call to openai
        ...
{{< /code-block >}}

### 例: スパンが出力されるのを防ぐ

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan
from typing import Optional

def filter_processor(span: LLMObsSpan) -> Optional[LLMObsSpan]:
    # Skip spans that are marked as internal or contain sensitive data
    if span.get_tag("internal") == "true" or span.get_tag("sensitive") == "true":
        return None  # This span will not be emitted

    # Process and return the span normally
    return span

LLMObs.register_processor(filter_processor)

# This span will be filtered out and not sent to Datadog
with LLMObs.workflow("internal_workflow"):
    LLMObs.annotate(tags={"internal": "true"})
    # ... workflow logic
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

### 例

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function redactProcessor(span) {
  if (span.getTag("no_output") === "true") {
    for (const message of span.output) {
      message.content = ""
    }
  }
  return span
}

llmobs.registerProcessor(redactProcessor)
{{< /code-block >}}

### 例: インスツルメンテーションによる条件付き変更

自動インスツルメンテーションを使用する場合、スパンは必ずしもコンテキスト的にアクセスできるわけではありません。自動インスツルメンテーションスパンの入力と出力を条件付きで変更するには、スパンプロセッサーに加えて `llmobs.annotationContext()` を使用します。

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function redactProcessor(span) {
  if (span.getTag("no_input") == "true") {
    for (const message of span.input) {
      message.content = "";
    }
  }

  return span;
}

llmobs.registerProcessor(redactProcessor);

async function callOpenai() {
  await llmobs.annotationContext({ tags: { no_input: "true" } }, async () => {
    // make call to openai
  });
}
{{< /code-block >}}

### 例: スパンが出力されるのを防ぐ

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function filterProcessor(span) {
  // Skip spans that are marked as internal or contain sensitive data
  if (span.getTag("internal") === "true" || span.getTag("sensitive") === "true") {
    return null  // This span will not be emitted
  }

  // Process and return the span normally
  return span
}

llmobs.registerProcessor(filterProcessor)

// This span will be filtered out and not sent to Datadog
function internalWorkflow() {
  return llmobs.trace({ kind: 'workflow', name: 'internalWorkflow' }, (span) => {
    llmobs.annotate({ tags: { internal: "true" } })
    // ... workflow logic
  })
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## ユーザーセッションの追跡

セッション追跡により、特定のユーザーに複数のインタラクションを関連付けることができます。

{{< tabs >}}
{{% tab "Python" %}}
新しいトレースまたは新しいプロセス内のスパンの root スパンを開始する際には、基盤となるユーザーセッションの文字列 ID を持つ `session_id` 引数を指定し、スパンのタグとして送信します。オプションで、`user_handle`、`user_name`、および `user_id` タグも指定できます。

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(session_id="<SESSION_ID>")
def process_user_message():
    LLMObs.annotate(
        ...
        tags = {"user_handle": "poodle@dog.com", "user_id": "1234", "user_name": "poodle"}
    )
    return
{{< /code-block >}}

### セッショントラッキングタグ

| タグ | 説明 |
|||
| `session_id` | 単一のユーザーセッション、たとえばチャットセッションを表す ID。|
| `user_handle` | チャットセッションのユーザーのハンドル。|
| `user_name` | チャットセッションのユーザーの名前。|
| `user_id` | チャットセッションのユーザーの ID。|
{{% /tab %}}

{{% tab "Node.js" %}}
新しいトレースまたは新しいプロセス内のスパンの root スパンを開始する際には、基盤となるユーザーセッションの文字列 ID を持つ `sessionId` 引数を指定します。

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
新しいトレースまたは新しいプロセス内のスパンの root スパンを開始する際には、基盤となるユーザーセッションの文字列 ID を持つ `sessionId` 引数を指定します。

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String processChat(int userID) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("incoming-chat", null, "session-" + System.currentTimeMillis() + "-" + userID);
    String chatResponse = answerChat(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 分散トレーシング

SDK では、分散サービスまたはホスト間のトレーシングがサポートされています。分散トレーシングは、Web リクエスト間でスパン情報を伝播させることによって機能します。

{{< tabs >}}
{{% tab "Python" %}}

`ddtrace` ライブラリには、人気のある [Web フレームワーク][1] および [HTTP][2] ライブラリ向けの分散トレーシングをサポートする組み込みインテグレーションが用意されています。サポートされているこれらのライブラリを使用してアプリケーションでリクエストが行われる場合、次のコマンドを実行することで分散トレーシングを有効にできます。
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

アプリケーションにより、サポートされているこれらのライブラリのいずれも使用されていない場合、HTTP ヘッダーとの間でスパン情報を手動で伝播させることで、分散トレーシングを有効にできます。SDK には、リクエストヘッダーにトレースコンテキストを挿入および有効化するためのヘルパーメソッド `LLMObs.inject_distributed_headers()` と `LLMObs.activate_distributed_headers()` が用意されています。

### 分散ヘッダーへの挿入

`LLMObs.inject_distributed_headers()` メソッドはスパンを受け取り、リクエストに含まれる HTTP ヘッダーにそのコンテキストを挿入します。このメソッドは次の引数を受け付けます。

`request_headers`
必須 - _辞書_
<br />トレースコンテキスト属性で拡張するための HTTP ヘッダー。

`span`
オプション - _スパン_  **デフォルト**: `現在のアクティブスパン。`
<br />指定されたリクエストヘッダーにそのコンテキストを挿入するスパン。関数デコレータを含む任意のスパン、デフォルトでは現在のアクティブスパンになります。

### 分散ヘッダーの有効化

`LLMObs.activate_distributed_headers()` メソッドは HTTP ヘッダーを受け取り、新しいサービスで有効にするトレースコンテキスト属性を抽出します。

**注**: 下流サービスでスパンを開始する前に `LLMObs.activate_distributed_headers()` を呼び出す必要があります。以前に開始されたスパン (関数デコレータのスパンを含む) は、分散トレースに取り込まれません。

このメソッドは次の引数を受け付けます。

`request_headers`
必須 - _辞書_
<br />トレースコンテキスト属性を抽出するための HTTP ヘッダー。


### 例

{{< code-block lang="python" filename="client.py" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def client_send_request():
    request_headers = {}
    request_headers = LLMObs.inject_distributed_headers(request_headers)
    send_request("<method>", request_headers)  # arbitrary HTTP call
{{< /code-block >}}

{{< code-block lang="python" filename="server.py" >}}
from ddtrace.llmobs import LLMObs

def server_process_request(request):
    LLMObs.activate_distributed_headers(request.headers)
    with LLMObs.task(name="process_request") as span:
        pass  # arbitrary server work
{{< /code-block >}}

[1]: /ja/tracing/trace_collection/compatibility/python/#integrations
[2]: /ja/tracing/trace_collection/compatibility/python/#librarycompatibility
{{% /tab %}}
{{% tab "Node.js" %}}

`ddtrace` ライブラリには、人気のある [Web フレームワーク][1] のための分散トレースをサポートする組み込みインテグレーションが用意されています。トレーサーを要求すると、これらのインテグレーションが自動的に有効になりますが、次のようにオプションで無効にすることもできます。

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /ja/tracing/trace_collection/compatibility/nodejs/#webframeworkcompatibility
{{% /tab %}}
{{< /tabs >}}


## 高度なトレース

{{< tabs >}}
{{% tab "Python" %}}
### インラインメソッドを使用したスパンのトレース

各スパンの種類について、`ddtrace.llmobs.LLMObs` クラスには、特定のコードブロックが含む操作を自動的にトレースするための対応するインラインメソッドが用意されています。これらのメソッドは、対応する関数デコレータと同じ引数シグネチャを持ち、指定されていない場合は `name` がスパンの種類 (`llm`、`workflow` など) にデフォルト設定されます。これらのメソッドは、囲まれたコードブロックが完了した後にスパンを自動的に終了させるためのコンテキストマネージャーとして使用できます。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### コンテキストをまたがるスパンの永続化

異なるコンテキストやスコープ間でスパンを手動で開始・停止するには

1. 同じメソッド (たとえば、ワークフロースパンの `LLMObs.workflow` メソッド) を使用して手動でスパンを開始しますが、コンテキストマネージャーとしてではなく、単なる関数呼び出しとして行います。
2. 他の関数の引数としてスパンオブジェクトを渡します。
3. `span.finish()` メソッドを使用してスパンを手動で停止します。**注**: スパンは手動で終了する必要があります。そうしないと、送信されません。

#### 例

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    workflow_span = LLMObs.workflow(name="process_message")
    ... # user application logic
    separate_task(workflow_span)
    return

def separate_task(workflow_span):
    ... # user application logic
    workflow_span.finish()
    return
{{< /code-block >}}

#### サーバーレス環境における強制フラッシュ

`LLMObs.flush()` は、バッファされたすべての LLM Observability データを Datadog バックエンドに送信するブロッキング関数です。これは、サーバーレス環境で、すべての LLM Observability トレースが送信されるまでアプリケーションが終了しないようにするのに役立ちます。

### 複数のアプリケーションのトレース

SDK では、同じサービスからの複数の LLM アプリケーションのトレースがサポートされています。

環境変数 `DD_LLMOBS_ML_APP` を、生成されるすべてのスパンがデフォルトでグループ化される LLM アプリケーションの名前に設定できます。

この設定をオーバーライドして、指定された root スパンに異なる LLM アプリケーション名を使用するには、新しいトレースまたは新しいプロセス内のスパンの root スパンを開始するときに、`ml_app` 引数に基礎となる LLM アプリケーションの文字列名を渡します。

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### インラインメソッドを使用したスパンのトレース

`llmobs` SDK には、指定のコードブロックが含む操作を自動的にトレースするための対応するインラインメソッドが用意されています。これらのメソッドは、対応する関数ラッパーと同じ引数シグネチャを持っていますが、名前を匿名コールバックから推測することができないため、`name` が必要です。このメソッドは、次の条件下でスパンを終了します。

 関数が Promise を返す場合、スパンは Promise が解決したとき、または拒否されたときに終了します。
関数が最後のパラメーターとしてコールバックを受け取る場合、スパンはそのコールバックが呼び出されたときに終了します。
関数がコールバックを受け取らず、Promise を返さない場合、スパンは関数実行の終了時に終了します。

#### コールバックなしの例

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### コールバックありの例

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, (workflowSpan, cb) => {
    ... // user application logic
    let maybeError = ...
    cb(maybeError) // the span will finish here, and tag the error if it is not null or undefined
    return
  })
}
{{< /code-block >}}

この関数の戻り値の型は、トレースされた関数の戻り値の型と一致します。

{{< code-block lang="javascript" >}}
function processMessage () {
  const result = llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return 'hello world'
  })

  console.log(result) // 'hello world'
  return result
}
{{< /code-block >}}

### TypeScript における関数デコレータ

Node.js LLM Observability SDK には、TypeScript アプリケーション用の関数デコレータとして機能する `llmobs.decorate` 関数が用意されています。この関数のトレース動作は `llmobs.wrap` と同じです。

#### 例

{{< code-block lang="javascript" >}}
// index.ts
import tracer from 'dd-trace';
tracer.init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
  },
});

const { llmobs } = tracer;

class MyAgent {
  @llmobs.decorate({ kind: 'agent' })
  async runChain () {
    ... // user application logic
    return
  }
}

{{< /code-block >}}

### サーバーレス環境における強制フラッシュ

`llmobs.flush()` は、バッファされたすべての LLM Observability データを Datadog バックエンドに送信するブロッキング関数です。これは、サーバーレス環境で、すべての LLM Observability トレースが送信されるまでアプリケーションが終了しないようにするのに役立ちます。

### 複数のアプリケーションのトレース

SDK では、同じサービスからの複数の LLM アプリケーションのトレースがサポートされています。

環境変数 `DD_LLMOBS_ML_APP` を、生成されるすべてのスパンがデフォルトでグループ化される LLM アプリケーションの名前に設定できます。

この構成をオーバーライドして、指定された root スパンに異なる LLM アプリケーション名を使用するには、新しいトレースまたは新しいプロセス内のスパンの root スパンを開始するときに、`mlApp` 引数に基礎となる LLM アプリケーションの文字列名を渡します。

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### アプリケーション命名ガイドライン

アプリケーション名 (`DD_LLMOBS_ML_APP` の値) は、次のガイドラインに従う必要があります。

 小文字の Unicode 文字列でなければならない
 最大 193 文字まで使用できる
 連続したアンダースコアや末尾のアンダースコアを含むことはできない
 次の文字を含めることができる
    英数字
    アンダースコア
    マイナス
    コロン
    ピリオド
    スラッシュ

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openaipython
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchainai/langchain
[7]: /ja/account_management/apiappkeys/#addanapikeyorclienttoken
[8]: /ja/llm_observability/terms/
[9]: /ja/getting_started/tagging/
[10]: https://github.com/DataDog/llmobservability
[11]: /ja/tracing/trace_collection/compatibility/python/#integrations
[12]: /ja/tracing/trace_collection/compatibility/python/#librarycompatibility
[13]: /ja/llm_observability/instrumentation/auto_instrumentation/
[14]: /ja/llm_observability/monitoring/cost
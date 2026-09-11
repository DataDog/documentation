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
description: Python、Node.js、Java 向けの Agent Observability SDK のリファレンスドキュメントです。自動および手動のインスツルメンテーションについて説明しています。
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: ブログ
  text: Datadog LLM Observability を使用した LLM プロンプトの追跡、比較、最適化
title: Agent Observability SDK リファレンス
---
## 概要 {#overview}

Agent Observability SDK は、LLM アプリケーションの可観測性とインサイトを提供するために、自動インスツルメンテーションおよび手動インスツルメンテーション API を提供します。

## セットアップ {#setup}

### 要件{#requirements}

- [Datadog API キー][1]。

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- 最新の `ddtrace` パッケージがインストールされていること (Python 3.7 以降が必要です)。
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- 最新の `dd-trace` パッケージがインストールされていること (Node.js 16 以降が必要です)。
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- 最新の [`dd-trace-java` JAR][1] をダウンロード済みであること。Agent Observability SDK は `dd-trace-java` v1.51.0 以降でサポートされています (Java 8 以降が必要です)。

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="コマンドラインセットアップ" level="h4" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
`ddtrace-run` コマンドを使用してアプリケーションを実行し、必要な環境変数を指定することで、Agent Observability を有効にします。

**注**: `ddtrace-run` は、すべての Agent Observability インテグレーションを自動的に有効にします。

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### コマンドラインセットアップ用の環境変数{#environment-variables-for-command-line-setup}

`DD_SITE`
: 必須 - _文字列_
<br />LLM データ送信先の Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。

`DD_LLMOBS_ENABLED`
: 必須 - _整数または文字列_
<br />Agent Observability へのデータ送信を有効にするための切り替えスイッチ。`1` または `true` に設定する必要があります。

`DD_LLMOBS_ML_APP`
: オプション - _文字列_
<br />すべてのトレースとスパンがグループ化される、LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。使用可能な文字やその他の制約については、[アプリケーション命名ガイドライン](#application-naming-guidelines)を参照してください。特定のルートスパンに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。指定しない場合、[`DD_SERVICE`][1] の値、またはアップストリームサービスから伝播された `DD_LLMOBS_ML_APP` の値がデフォルトで使用されます。
<br />**注**: バージョン `ddtrace==3.14.0` より前では、これは**必須フィールド**です。

`DD_LLMOBS_AGENTLESS_ENABLED`
: オプション - _整数または文字列_ - **デフォルト**: `false`
<br />Datadog Agent を使用していない場合にのみ必要です。その場合は、`1` または `true` に設定する必要があります。

`DD_LLMOBS_SAMPLE_RATE`
: オプション - _浮動小数点数_ - **デフォルト**: `1.0`
<br />Agent Observability によって保持されるトレースの割合。[トレースサンプリング](#trace-sampling)を参照してください。

`DD_API_KEY`
: オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合にのみ必要です。

`DD_MCP_CAPTURE_INTENT`
: オプション - _整数または文字列_ - **デフォルト**: `false`
<br />`1` または `true` に設定すると、呼び出し元のモデルに対してツールを呼び出した理由を説明するよう要求する引数がすべての MCP サーバーツールに追加されます。インテントはツールのスパンに記録されます。

[1]: /ja/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}


{{% tab "Node.js" %}}
アプリケーションを `NODE_OPTIONS="--import dd-trace/initialize.mjs"` で実行し、必要な環境変数を指定することで、Agent Observability を有効にします。

**注**: `dd-trace/initialize.mjs` は、すべての APM インテグレーションを自動的に有効にします。

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### コマンドラインセットアップ用の環境変数{#environment-variables-for-command-line-setup-1}

`DD_SITE`
: 必須 - _文字列_
<br />LLM データを送信する Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。

`DD_LLMOBS_ENABLED`
: 必須 - _整数または文字列_
<br />Agent Observability へのデータ送信を有効にするための切り替えスイッチ。`1` または `true` に設定する必要があります。

`DD_LLMOBS_ML_APP`
: オプション - _文字列_
<br />すべてのトレースとスパンがグループ化される、LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。使用可能な文字やその他の制約については、[アプリケーション命名ガイドライン](#application-naming-guidelines)を参照してください。特定のルートスパンに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。指定しない場合、[`DD_SERVICE`][1] の値、またはアップストリームサービスから伝播された `DD_LLMOBS_ML_APP` の値がデフォルトで使用されます。
<br />**注**: バージョン `dd-trace@5.66.0` より前では、これは**必須フィールド**です。

`DD_LLMOBS_AGENTLESS_ENABLED`
: オプション - _整数または文字列_ - **デフォルト**: `false`
<br />Datadog Agent を使用していない場合にのみ必要です。その場合は、`1` または `true` に設定する必要があります。

`DD_LLMOBS_SAMPLE_RATE`
: オプション - _浮動小数点数_ - **デフォルト**: `1.0`
<br />Agent Observability によって保持されるトレースの割合。[トレースサンプリング](#trace-sampling)を参照してください。

`DD_API_KEY`
: オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合にのみ必要です。

[1]: /ja/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

アプリケーションを `dd-trace-java` で実行し、必要なパラメータを環境変数またはシステムプロパティとして指定することで、Agent Observability を有効にします。

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### 環境変数およびシステムプロパティ {#environment-variables-and-system-properties}

次のパラメータを環境変数 (例: `DD_LLMOBS_ENABLED`) または Java システムプロパティ (例: `dd.llmobs_enabled`) として指定できます。

`DD_SITE`または `dd.site`
: 必須 - _文字列_
<br />LLM データ送信先の Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。

`DD_LLMOBS_ENABLED` または `dd.llmobs.enabled`
: 必須 - _整数または文字列_
<br />Agent Observability へのデータ送信を有効にするための切り替えスイッチ。`1` または `true` に設定する必要があります。

`DD_LLMOBS_ML_APP`または `dd.llmobs.ml.app`
: オプション - _文字列_
<br />すべてのトレースとスパンがグループ化される、LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。使用可能な文字やその他の制約については、[アプリケーション命名ガイドライン](#application-naming-guidelines)を参照してください。特定のルートスパンに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。指定しない場合、[`DD_SERVICE`][1] の値、またはアップストリームサービスから伝播された `DD_LLMOBS_ML_APP` の値がデフォルトで使用されます。
<br />**注**: `dd-trace-java` のバージョン 1.54.0 より前では、これは**必須フィールド**です。

`DD_LLMOBS_AGENTLESS_ENABLED`または `dd.llmobs.agentless.enabled`
: オプション - _整数または文字列_ - **デフォルト**: `false`
<br />Datadog Agent を使用していない場合にのみ必要です。その場合は、`1` または `true` に設定する必要があります。

`DD_API_KEY`または `dd.api.key`
: オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合にのみ必要です。

[1]: /ja/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="コード内セットアップ" level="h4" expanded=false id="in-code-setup" %}}

[コマンドラインセットアップ](#command-line-setup)を使用する代わりに、プログラムで Agent Observability を有効にすることもできます。

{{< tabs >}}
{{% tab "Python" %}}

`LLMObs.enable()` 関数を使用して Agent Observability を有効にします。

<div class="alert alert-info">
このセットアップ方法は、 <code>ddtrace-run</code> コマンドと一緒に使用しないでください。
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

##### パラメータ {#parameters}

`ml_app`
: オプション - _文字列_
<br />すべてのトレースとスパンがグループ化される、LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。使用可能な文字やその他の制約については、[アプリケーション命名ガイドライン](#application-naming-guidelines)を参照してください。特定のトレースに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。指定しない場合、`DD_LLMOBS_ML_APP` の値がデフォルトで使用されます。

`integrations_enabled`- **デフォルト**: `true`
: オプション - _ブール値_
<br />Datadog がサポートする [LLM インテグレーション][1]について、LLM 呼び出しの自動トレースを有効にするフラグ。指定しない場合、サポートされているすべての LLM インテグレーションがデフォルトで有効になります。LLM インテグレーションを使用しないようにするには、この値を `false` に設定してください。

`agentless_enabled`
: オプション - _ブール値_ - **デフォルト**: `false`
<br />Datadog Agent を使用していない場合にのみ必要です。その場合は、`True` に設定する必要があります。これは、Datadog Agent を必要とするデータを送信しないように `ddtrace` ライブラリを設定するものです。指定しない場合、`DD_LLMOBS_AGENTLESS_ENABLED` の値がデフォルトで使用されます。

`site`
: オプション - _文字列_
<br />LLM データを送信する Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。指定しない場合、`DD_SITE` の値がデフォルトで使用されます。

`api_key`
: オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合にのみ必要です。指定しない場合、`DD_API_KEY` の値がデフォルトで使用されます。

`env`
: オプション - _文字列_
<br />アプリケーションの環境の名前 (例: `prod`、`pre-prod`、`staging`)。指定しない場合、`DD_ENV` の値がデフォルトで使用されます。

`service`
: オプション - _文字列_
<br />アプリケーションに使用されるサービスの名前。指定しない場合、`DD_SERVICE` の値がデフォルトで使用されます。

`sample_rate`
: オプション - _浮動小数点数_
<br />Agent Observability によって保持されるトレースの割合。`ddtrace` 4.12.0 以降が必要です。設定されている場合、`DD_LLMOBS_SAMPLE_RATE` よりも優先されます。[トレースサンプリング](#trace-sampling)を参照してください。

`capture_intent`
: オプション - _ブール値_ - **デフォルト**: `false`
<br />`True` に設定すると、呼び出し元のモデルに対してツールを呼び出した理由を説明するよう要求する引数がすべての MCP サーバーツールに追加されます。インテントはツールのスパンに記録されます。指定しない場合、`DD_MCP_CAPTURE_INTENT` の値がデフォルトで使用されます。

[1]: /ja/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
このセットアップ方法は、 <code>dd-trace/initialize.mjs</code> コマンドと一緒に使用しないでください。
</div>

`init()` 関数を使用して Agent Observability を有効にします。

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
: オプション - _文字列_
<br />すべてのトレースとスパンがグループ化される、LLM アプリケーション、サービス、またはプロジェクトの名前。これは、異なるアプリケーションや実験を区別するのに役立ちます。使用可能な文字やその他の制約については、[アプリケーション命名ガイドライン](#application-naming-guidelines)を参照してください。特定のトレースに対してこの値を上書きするには、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。指定しない場合、`DD_LLMOBS_ML_APP` の値がデフォルトで使用されます。

`agentlessEnabled`
: オプション - _ブール値_ - **デフォルト**: `false`
<br />Datadog Agent を使用していない場合にのみ必要です。その場合は、`true` に設定する必要があります。これは、Datadog Agent を必要とするデータを送信しないように `dd-trace` ライブラリを設定するものです。指定しない場合、`DD_LLMOBS_AGENTLESS_ENABLED` の値がデフォルトで使用されます。

`sampleRate`
: オプション - _数値_
<br />Agent Observability によって保持されるトレースの割合。`dd-trace` 5.110.0 以降が必要です。設定されている場合、`DD_LLMOBS_SAMPLE_RATE` よりも優先されます。[トレースサンプリング](#trace-sampling)を参照してください。

**一般的なトレーサー設定のオプション**:

`site`
: オプション - _文字列_
<br />LLM データを送信する Datadog サイト。使用するサイトは {{< region-param key="dd_site" code="true" >}}です。指定しない場合、`DD_SITE` の値がデフォルトで使用されます。

`env`
: オプション - _文字列_
<br />アプリケーションの環境の名前 (例: `prod`、`pre-prod`、`staging`)。指定しない場合、`DD_ENV` の値がデフォルトで使用されます。

`service`
: オプション - _文字列_
<br />アプリケーションに使用されるサービスの名前。指定しない場合、`DD_SERVICE` の値がデフォルトで使用されます。

##### 環境変数 {#environment-variables}

次の値を環境変数として設定します。これらはプログラムで設定することはできません。

`DD_API_KEY`
: オプション - _文字列_
<br />Datadog API キー。Datadog Agent を使用していない場合にのみ必要です。

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="AWS Lambda のセットアップ" level="h4" expanded=false id="aws-lambda-setup" %}}

既存の AWS Lambda 関数を Agent Observability でインスツルメンテーションするには、Datadog 拡張機能と各言語レイヤーを使用します。

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
4. Agent Observability を使用して Lambda 関数をインストールします (これには Datadog 拡張機能レイヤーのバージョン 77 以上が必要です)。
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

4. Lambda 関数を呼び出し、Datadog UI で Agent Observability のトレースが表示されることを確認します。

Lambda 関数が終了する前に、`flush` メソッドを使用して Agent Observability のトレースを手動でフラッシュします。

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


SDK をインストールしてアプリケーションを実行すると、自動インスツルメンテーションによる Agent Observability のデータが表示されるはずです。手動インスツルメンテーションは、カスタム構築されたフレームワークや、まだサポートされていないライブラリの操作をキャプチャするために使用できます。

## トレースサンプリング {#trace-sampling}

<div class="alert alert-info">トレースサンプリングは、Python SDK (<code>ddtrace</code> 4.12.0以降) および Node.js SDK (<code>dd-trace</code> 5.110.0以降) で利用可能です。Java SDK はトレースサンプリングをサポートしていません。</div>

トレースサンプリングは、Agent Observability が保持するトレースの割合を設定します。Agent Observability の課金は送信するスパンの量に基づくため、サンプルレートの設定は Agent Observability のコストを管理する 1 つの方法です。SDK はルートスパンでサンプリングの決定を行い、[分散トレーシング](#distributed-tracing)を通じてダウンストリームサービスで作成されたスパンを含む、そのルートスパンのすべての子スパンに適用します。

サンプリングは、[トークンやコストのメトリクス](/llm_observability/monitoring/cost/)、その他の運用メトリクスなど、[Agent Observability のメトリクス](/llm_observability/monitoring/metrics/)には影響しません。サンプリングされていないスパンは Datadog がトレースを取り込んだ後に破棄されるため、これらのメトリクスは、指定されたサンプルレートに関係なく、アプリケーションのインスツルメンテーションされたトラフィックの 100% に基づきます。トレースサンプリングは、取り込み後に適用される[自動化ルール](/llm_observability/monitoring/automation_rules/)や [APM トレースサンプリング](/tracing/trace_pipeline/ingestion_mechanisms/)といったアプリ内コントロールからも独立しています。

次の 2 つのメカニズムのいずれかを通じてサンプルレートを設定します。

- **環境変数** (`DD_LLMOBS_SAMPLE_RATE`): [コマンドラインセットアップ](#command-line-setup)と[コード内セットアップ](#in-code-setup)の両方に適用されます。
- **コード内パラメータ** (Python では `sample_rate`、Node.js では `sampleRate`): [コード内セットアップ](#in-code-setup)で SDK を有効にする際に、Python では `LLMObs.enable()` に、Node.js では `llmobs` で渡されます。設定されている場合、`DD_LLMOBS_SAMPLE_RATE` よりも優先されます。

サンプルレートは `0.0` (トレースを保持しない) から `1.0` (すべてのトレースを保持する) までの浮動小数点数です。デフォルトは `1.0` です。範囲外の値は無視されます。

{{< tabs >}}
{{% tab "Python" %}}
環境変数を使用してサンプルレートを設定します。

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

または `sample_rate` を `LLMObs.enable()` に渡します。これは環境変数よりも優先されます。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  sample_rate=0.5,
)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
環境変数を使用してサンプルレートを設定します。

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 NODE_OPTIONS="--import dd-trace/initialize.mjs" <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

または `llmobs` で `sampleRate` を `init()` に渡します。これは環境変数よりも優先されます。

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    sampleRate: 0.5,
  },
});

const llmobs = tracer.llmobs;
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 手動インスツルメンテーション{#manual-instrumentation}

{{< tabs >}}
{{% tab "Python" %}}

LLM 操作をキャプチャするために、関数デコレータを使用してワークフローを簡単にインスツルメンテーションできます。

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

または、きめ細かな操作をキャプチャするためにコンテキストマネージャーベースのアプローチを使用します。

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


利用可能なスパンの種類の一覧については、[スパンの種類のドキュメント][1]を参照してください。関数内の操作をより詳細にトレースするには、[インラインメソッドを使用したスパンのトレース](#tracing-spans-using-inline-methods)を参照してください。

[1]: /ja/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

スパンをトレースするには、トレースしたい関数の関数ラッパーとして `llmobs.wrap(options, function)` を使用します。利用可能なスパンの種類の一覧については、[スパンの種類のドキュメント][1]を参照してください。関数内の操作をより詳細にトレースするには、[インラインメソッドを使用したスパンのトレース](#tracing-spans-using-inline-methods)を参照してください。

### スパンの種類 {#span-kinds}

スパンの種類は必須であり、`llmobs` トレース関数 (`trace`、`wrap`、および `decorate`) に渡される `options` オブジェクトで指定されます。サポートされているスパンの種類の一覧については、[スパンの種類のドキュメント][1]を参照してください。

**注:** 無効なスパンの種類を持つスパンは、Agent Observability に送信されません。

### 関数の引数/出力/名前の自動キャプチャ {#automatic-function-argumentoutputname-capturing}

`llmobs.wrap` (TypeScript 用の [`llmobs.decorate`](#function-decorators-in-typescript) も同様) は、トレース対象の関数の入力、出力、および名前を自動的にキャプチャしようとします。スパンに手動でアノテーションを付ける必要がある場合は、[スパンのエンリッチメント](#enriching-spans)を参照してください。アノテーションを付けた入力と出力は、自動キャプチャを上書きします。さらに、関数名を上書きするには、options オブジェクトの `name` プロパティを `llmobs.wrap` 関数に渡します。

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### ラップされた関数のスパンを終了するための条件 {#conditions-for-finishing-a-span-for-a-wrapped-function}

`llmobs.wrap` は、[`tracer.wrap`][2] の基盤となる動作を拡張します。関数が呼び出されたときに作成される基盤となるスパンは、次の条件で終了します。

- 関数が Promise を返す場合、その Promise が解決または拒否されたときにスパンが終了します。
- 関数が最後のパラメータとしてコールバックを受け取る場合、そのコールバックが呼び出されたときにスパンが終了します。
- 関数がコールバックを受け取らず、Promise も返さない場合、関数実行の終了時にスパンが終了します。

次の例は、最後の引数がコールバックである 2 番目の条件を示しています。

#### 例 {#example}

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

アプリケーションでコールバック関数を使用しない場合は、代わりにインラインのトレースブロックを使用することをお勧めします。詳細については、[インラインメソッドを使用したスパンのトレース](#tracing-spans-using-inline-methods)を参照してください。

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
[2]: /ja/tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### スパンの開始 {#starting-a-span}

開始するスパンの種類に基づいて、スパンを開始する方法は複数あります。サポートされているスパンの種類の一覧については、[スパンの種類のドキュメント][1]を参照してください。

すべてのスパンは、`LLMObsSpan` のオブジェクトインスタンスとして開始されます。各スパンには、スパンと対話してデータを記録するために使用できるメソッドがあります。

### スパンの終了 {#finishing-a-span}

トレースを送信して Datadog アプリで表示されるようにするには、スパンを終了する必要があります。

スパンを終了するには、スパンオブジェクトインスタンスで `finish()` を呼び出します。可能であれば、例外が発生した場合でもスパンが確実に送信されるように、スパンを `try/finally` ブロックでラップします。

#### 例 {#example-1}

```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /ja/llm_observability/terms/#span-kinds
{{% /tab %}}
{{< /tabs >}}

### LLM 呼び出し {#llm-calls}

<div class="alert alert-info">Datadog の <a href="/llm_observability/instrumentation/auto_instrumentation/">LLM インテグレーション</a>でサポートされている LLM プロバイダーやフレームワークを使用している場合、それらの操作をトレースするために手動で LLM スパンを開始する必要はありません。</div>

<div class="alert alert-info">LLM スパンを手動でインスツルメンテーションしている場合は、トークン数 ( <code>input_tokens</code>、<code>output_tokens</code>、 <code>total_tokens</code>など) をスパンにアノテーションを付けて自分で記録する必要があります。詳細については、<a href="#enriching-spans">スパンのエンリッチメント</a>を参照してください。</div>

{{< tabs >}}
{{% tab "Python" %}}
LLM 呼び出しをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.llm()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: 必須 - _文字列_
<br/>呼び出された LLM の名前。

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`model_provider`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br />モデルプロバイダーの名前。
<br />**注**: 推定コストを米ドルで表示するには、`model_provider` を `openai`、`azure_openai`、または `anthropic` のいずれかの値に設定してください。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例{#example-2}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(prompt):
    completion = ... # user application logic to invoke LLM
    LLMObs.annotate(
        input_data=[{"role": "user", "content": prompt}],
        output_data=[{"role": "assistant", "content": completion}],
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
    )
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
LLM 呼び出しをトレースするには、スパンの種類を `llm` として指定し、必要に応じて options オブジェクトで次の引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br/>呼び出された LLM の名前。

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`modelProvider`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br/>モデルプロバイダーの名前。
<br />**注**: 推定コストを米ドルで表示するには、`modelProvider` を `openai`、`azure_openai`、または `anthropic` のいずれかの値に設定してください。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例{#example-3}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: prompt }],
    outputData: [{ role: "assistant", content: completion }],
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
LLM 呼び出しをトレースするには、次のメソッドをインポートし、下記の引数を指定して呼び出します。

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`spanName` はデフォルトでスパンの種類に設定されます。

`modelName`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br/>呼び出された LLM の名前。

`modelProvider`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br/>モデルプロバイダーの名前。
<br />**注**: 推定コストを米ドルで表示するには、`modelProvider` を `openai`、`azure_openai`、または `anthropic` のいずれかの値に設定してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。null 以外の値を指定すると、アプリケーションの開始時に指定された ML アプリケーション名が上書きされます。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

{{% /collapse-content %}}

#### 例{#example-4}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "total_tokens", 955
    ));
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### ワークフロー {#workflows}

{{< tabs >}}
{{% tab "Python" %}}
ワークフロースパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.workflow()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例{#example-5}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

ワークフロースパンをトレースするには、スパンの種類を `workflow` として指定し、必要に応じて options オブジェクトで引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例{#example-6}

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
ワークフロースパンをトレースするには、次のメソッドをインポートし、下記の引数を指定して呼び出します。

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`spanName` はデフォルトでスパンの種類に設定されます。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。null 以外の値を指定すると、アプリケーションの開始時に指定された ML アプリケーション名が上書きされます。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

{{% /collapse-content %}}

#### 例{#example-7}

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


### エージェント{#agents}

{{< tabs >}}
{{% tab "Python" %}}
エージェントの実行をトレースするには、関数デコレータ `ddtrace.llmobs.decorators.agent()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。
{{% /collapse-content %}}

#### 例{#example-8}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
エージェントの実行をトレースするには、スパンの種類を `agent` として指定し、必要に応じて options オブジェクトで引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例{#example-9}

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
エージェントの実行をトレースするには、次のメソッドをインポートし、下記の引数を指定して呼び出します。

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`spanName` はデフォルトでトレース対象関数の名前に設定されます。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。null 以外の値を指定すると、アプリケーションの開始時に指定された ML アプリケーション名が上書きされます。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### ツール呼び出し{#tool-calls}

{{< tabs >}}
{{% tab "Python" %}}
ツール呼び出しをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.tool()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-10}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
ツール呼び出しをトレースするには、スパンの種類を `tool` として指定し、必要に応じて options オブジェクトで引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-11}

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
ツール呼び出しをトレースするには、次のメソッドをインポートし、下記の引数を指定して呼び出します。

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`spanName` はデフォルトでトレース対象関数の名前に設定されます。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。null 以外の値を指定すると、アプリケーションの開始時に指定された ML アプリケーション名が上書きされます。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### タスク {#tasks}

{{< tabs >}}
{{% tab "Python" %}}
タスクスパンをトレースするには、関数デコレータ `LLMObs.task()` を使用します。

{{% collapse-content title="引数" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-12}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
タスクスパンをトレースするには、スパンの種類を `task` として指定し、必要に応じて options オブジェクトで引数を指定します。

{{% collapse-content title="引数" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-13}

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
タスクスパンをトレースするには、次のメソッドをインポートし、下記の引数を指定して呼び出します。

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="引数" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`spanName` はデフォルトでトレース対象関数の名前に設定されます。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。null 以外の値を指定すると、アプリケーションの開始時に指定された ML アプリケーション名が上書きされます。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### 埋め込み {#embeddings}

{{< tabs >}}
{{% tab "Python" %}}
埋め込み操作をトレースするには、関数デコレータ `LLMObs.embedding()` を使用します。

**注**: 埋め込みスパンの入力にアノテーションを付けるには、他のスパンタイプとは異なる形式が必要です。埋め込み入力の指定方法の詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: 必須 - _文字列_
<br/>呼び出された LLM の名前。

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はトレース対象関数の名前に設定されます。

`model_provider`
: オプション - _文字列_ - **デフォルト**: `"custom"`

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-14}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
埋め込み操作をトレースするには、スパンの種類を `embedding` として指定し、必要に応じて options オブジェクトで引数を指定します。

**注**: 埋め込みスパンの入力にアノテーションを付けるには、他のスパンタイプとは異なる形式が必要です。埋め込み入力の指定方法の詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br/>呼び出された LLM の名前。

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はトレース対象関数の名前に設定されます。

`modelProvider`
: オプション - _文字列_ - **デフォルト**: `"custom"`
<br/>モデルプロバイダーの名前。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-15}

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### 検索 {#retrievals}

{{< tabs >}}
{{% tab "Python" %}}
検索スパンをトレースするには、関数デコレータ `ddtrace.llmobs.decorators.retrieval()` を使用します。

**注**: 検索スパンの出力にアノテーションを付けるには、他のスパンタイプとは異なる形式が必要です。検索出力の指定方法の詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`session_id`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`ml_app`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-16}

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

検索スパンをトレースするには、スパンの種類を `retrieval` として指定し、必要に応じて options オブジェクトで次の引数を指定します。

**注**: 検索スパンの出力にアノテーションを付けるには、他のスパンタイプとは異なる形式が必要です。検索出力の指定方法の詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

{{% collapse-content title="引数" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: オプション - _文字列_
<br/>操作の名前。指定しない場合、`name` はデフォルトでトレース対象関数の名前に設定されます。

`sessionId`
: オプション - _文字列_
<br/>基盤となるユーザーセッションの ID。詳細については、[ユーザーセッションの追跡](#tracking-user-sessions)を参照してください。

`mlApp`
: オプション - _文字列_
<br/>操作が属する ML アプリケーションの名前。詳細については、[複数のアプリケーションのトレース](#tracing-multiple-applications)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-17}

ここには、スパンにアノテーションを付ける例も含まれています。詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

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

## スパンのネスト {#nesting-spans}

現在のスパンが終了する前に新しいスパンを開始すると、2 つのスパン間の親子関係が自動的にトレースされます。親スパンは大きな操作を表し、子スパンはその中の小さなネストされたサブ操作を表します。

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


## スパンのエンリッチメント {#enriching-spans}

<div class="alert alert-info">
ここでの <code>metrics</code> パラメータは、個々のスパンに属性として付与される数値のことであり、<a href="/llm_observability/monitoring/metrics/">Datadog プラットフォームのメトリクス</a>ではありません。特定の認識されたキー ( <code>input_tokens</code>、<code>output_tokens</code>、 <code>total_tokens</code>など) について、Datadog はこれらのスパン属性を使用して、ダッシュボードやモニターで使用するための対応するプラットフォームのメトリクス ( <code>ml_obs.span.llm.input.tokens</code>など) を生成します。
</div>

{{< tabs >}}
{{% tab "Python" %}}
SDK には、入力、出力、メタデータでスパンをエンリッチするためのメソッド `LLMObs.annotate()` が用意されています。

`LLMObs.annotate()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h3" expanded=false id="annotating-span-arguments" %}}

`span`
: オプション - _スパン_ - **デフォルト**: 現在のアクティブなスパン
<br />アノテーションを付けるスパン。`span` が指定されていない場合 (関数デコレータを使用する場合など)、SDK は現在のアクティブなスパンにアノテーションを付けます。

`input_data`
: オプション - _JSON のシリアライズ可能な型、または辞書のリスト_
<br />JSON のシリアライズ可能な型 (LLM 以外のスパンの場合)、または辞書のリスト (形式: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ..., "audio_parts": ..., "image_parts": ...}`)。ここで、`"tool_calls"` は、必須のキー `"name"`、`"arguments"` とオプションのキー `"tool_id"`、`"type"` を持つツール呼び出し辞書のオプションのリストです。`"tool_results"` は、必須のキー `"result"` とオプションのキー `"name"`、`"tool_id"`、`"type"` (関数呼び出しシナリオ用) を持つツール結果辞書のオプションのリストです。`"audio_parts"` および `"image_parts"` は、マルチモーダルスパン用のメディア辞書のオプションのリストであり、それぞれ必須の `"mime_type"` と `"content"` (インラインで保持される base64 エンコードされたメディア) または `"attachment_key"` のいずれか一方を持ちます。**注**: 埋め込みスパンは特殊なケースであり、`{"text": "..."}` の形式の文字列または辞書 (あるいは辞書のリスト) が必要です。

`output_data`
: オプション - _JSON のシリアライズ可能な型、または辞書のリスト_
<br />JSON のシリアライズ可能な型 (LLM 以外のスパンの場合)、または辞書のリスト(形式: `{"content": "...", "role": "...", "tool_calls": ..., "audio_parts": ..., "image_parts": ...}`)。ここで、`"tool_calls"` は、必須のキー `"name"`、`"arguments"` とオプションのキー `"tool_id"`、`"type"` (関数呼び出しシナリオ用) を持つツール呼び出し辞書のオプションのリストです。`"audio_parts"` および `"image_parts"` は、マルチモーダルスパン用のメディア辞書のオプションのリストであり、それぞれ必須の `"mime_type"` と `"content"` (インラインで保持される base64 エンコードされたメディア) または `"attachment_key"` のいずれか一方を持ちます。**注**: 検索スパンは特殊なケースであり、`{"text": "...", "name": "...", "score": float, "id": "..."}` の形式の文字列または辞書 (あるいは辞書のリスト) が必要です。

`tool_definitions`
: オプション - _辞書のリスト_
<br />関数呼び出しシナリオ用のツール定義辞書のリスト。各ツール定義には、必須の `"name": "..."` キーとオプションの `"description": "..."` キーおよび `"schema": {...}` キーが含まれます。

`metadata`
: オプション - _辞書_
<br />スパンによって記述される入力操作または出力操作に関連するメタデータ情報としてユーザーが追加できる、JSON のシリアライズ可能なキーと値のペアの辞書 (`model_temperature`、`max_tokens`、`top_k` など)。

`metrics`
: オプション - _辞書_
<br />スパンによって記述される操作に関連するメトリクスとしてユーザーが追加できる、JSON のシリアライズ可能なキーと数値の辞書 (`input_tokens`、`output_tokens`、`total_tokens`、`time_to_first_token` など)。`time_to_first_token` の単位は秒であり、デフォルトで出力される `duration` メトリクスと同様です。

`tags`
: オプション - _辞書_
<br />ユーザーがスパンにタグとして追加できる、JSON のシリアライズ可能なキーと値のペアの辞書。キーの例: `session`、`env`、`system`、および `version`。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`cost_tags`
: オプション - _文字列のリスト_
<br />生成される LLM のコストメトリクスおよびトークンメトリクスにカスタムタグとして伝播させるタグキーのリスト (`tags` で設定済みか、同じスパン上で以前にアノテーション付けされたもの)。既存のタグキーを参照していないエントリはスキップされます。詳細については、[コスト監視](#cost-monitoring)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-18}

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

@llm(model_name="gpt-realtime", model_provider="openai")
def voice_turn(user_audio_bytes):
    import base64
    resp = ... # multimodal (audio) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "Hey, how are you?",  # transcript of the input audio
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(user_audio_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[
            {
                "role": "assistant",
                "content": "Hey! I'm doing great, thanks for asking. How about you?",
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(resp.audio_bytes).decode("utf-8")}
                ],
            }
        ],
    )
    return resp

@llm(model_name="gpt-4o", model_provider="openai")
def describe_image(image_bytes):
    import base64
    resp = ... # multimodal (vision) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "What is in this image?",
                "image_parts": [
                    {"mime_type": "image/png", "content": base64.b64encode(image_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[{"role": "assistant", "content": "The image shows a golden retriever puppy."}],
    )
    return resp

{{< /code-block >}}

`audio_parts` または `image_parts` でアノテーションが付けられたメッセージは、トレースビューでインラインオーディオプレーヤーおよび画像としてレンダリングされます。

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Agent Observability トレースビューの LLM スパン。USER の入力メッセージに「Hey, how are you?」というトランスクリプト付きのインラインオーディオプレーヤーが表示され、出力の ASSISTANT メッセージに「Click to play audio」というコントロールと「Hey!I'm doing great, thanks for asking.How about you?」というトランスクリプトが表示されています。" style="width:100%;" >}}

{{< img src="llm_observability/instrumentation/image_example.png" alt="Agent Observability トレースビューの LLM スパン。入力の USER メッセージに「What is in this image?」というプロンプトが表示され、黒い子犬のインライン写真が添えられており、出力の ASSISTANT メッセージで、それが木の床の上にいる黒いラブラドール・レトリバーの子犬であると説明されています。" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Node.js" %}}
SDK には、入力、出力、メタデータでスパンにアノテーションを付けるためのメソッド `llmobs.annotate()` が用意されています。

`LLMObs.annotate()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h3" expanded=false id="annotating-span-arguments" %}}
`span`
: オプション - _スパン_ - **デフォルト**: 現在のアクティブなスパン
<br />アノテーションを付けるスパン。`span` が指定されていない場合 (関数ラッパーを使用する場合など)、SDK は現在のアクティブなスパンにアノテーションを付けます。

`annotationOptions`
: 必須 - _オブジェクト_
<br />スパンにアノテーションを付けるための、さまざまな種類のデータを含むオブジェクト。

`annotationOptions` オブジェクトには、次のものを含めることができます。

`inputData`
: オプション - _JSON のシリアライズ可能な型、またはオブジェクトのリスト_
<br />JSON のシリアライズ可能な型 (LLM 以外のスパンの場合)、または辞書のリスト (形式: `{role: "...", content: "...", audioParts: [...], imageParts: [...]}` (LLM スパンの場合) のいずれか。`audioParts` および `imageParts` は、マルチモーダルスパン用のメディアオブジェクトのオプションのリストであり、それぞれ必須の `mimeType` と `content` (インラインで保持される base64 エンコードされたメディア) または `attachmentKey` のいずれか一方を持ちます。**注**: 埋め込みスパンは特殊なケースであり、`{text: "..."}` の形式の文字列またはオブジェクト (あるいはオブジェクトのリスト) が必要です。

`outputData`
: オプション - _JSON のシリアライズ可能な型、またはオブジェクトのリスト_
<br />JSON のシリアライズ可能な型 (LLM 以外のスパンの場合)、またはオブジェクトのリスト (形式: `{role: "...", content: "...", audioParts: [...], imageParts: [...]}`) (LLM スパンの場合)。`audioParts` および `imageParts` は、マルチモーダルスパン用のメディアオブジェクトのオプションのリストであり、それぞれ必須の `mimeType` と `content` (インラインで保持される base64 エンコードされたメディア) または `attachmentKey` のいずれか一方を持ちます。**注**: 検索スパンは特殊なケースであり、`{text: "...", name: "...", score: number, id: "..."}` の形式の文字列またはオブジェクト (あるいはオブジェクトのリスト) が必要です。

`metadata`
: オプション - _オブジェクト_
<br />スパンによって記述される入力操作または出力操作に関連するメタデータ情報としてユーザーが追加できる、JSON のシリアライズ可能なキーと値のペアのオブジェクト (`model_temperature`、`max_tokens`、`top_k` など)。

`metrics`
: オプション - _オブジェクト_
<br />スパンによって記述される操作に関連するメトリクスとしてユーザーが追加できる、JSON のシリアライズ可能なキーと数値のオブジェクト (`input_tokens`、`output_tokens`、`total_tokens` など)。

`tags`
: オプション - _オブジェクト_
<br />スパンのコンテキストに関するタグとしてユーザーが追加できる、JSON のシリアライズ可能なキーと値のペアのオブジェクト (`session`、`environment`、`system`、`versioning` など)。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`costTags`
: オプション - _文字列の配列_
<br />生成される LLM のコストメトリクスおよびトークンメトリクスにカスタムタグとして伝播させるタグキーのリスト (`tags` で設定済みか、同じスパン上で以前にアノテーション付けされたもの)。既存のタグキーを参照していないエントリはスキップされます。詳細については、[コスト監視](#cost-monitoring)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-19}

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

function voiceTurn (userAudioBytes) {
  const resp = ... // multimodal (audio) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "Hey, how are you?", // transcript of the input audio
        audioParts: [{ mimeType: "audio/wav", content: userAudioBytes.toString("base64") }]
      }
    ],
    outputData: [
      {
        role: "assistant",
        content: "Hey! I'm doing great, thanks for asking. How about you?",
        audioParts: [{ mimeType: "audio/wav", content: resp.audioBuffer.toString("base64") }]
      }
    ]
  })
  return resp
}
voiceTurn = llmobs.wrap({ kind: 'llm', modelName: 'gpt-audio', modelProvider: 'openai' }, voiceTurn)

function describeImage (imageBytes) {
  const resp = ... // multimodal (vision) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "What is in this image?",
        imageParts: [{ mimeType: "image/png", content: imageBytes.toString("base64") }]
      }
    ],
    outputData: [{ role: "assistant", content: "The image shows a golden retriever puppy." }]
  })
  return resp
}
describeImage = llmobs.wrap({ kind: 'llm', modelName: 'gpt-4o', modelProvider: 'openai' }, describeImage)

{{< /code-block >}}

`audioParts` または `imageParts` でアノテーションが付けられたメッセージは、トレースビューでインラインオーディオプレーヤーおよび画像としてレンダリングされます。

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Agent Observability トレースビューの LLM スパン。USER の入力メッセージに「Hey, how are you?」というトランスクリプト付きのインラインオーディオプレーヤーが表示され、出力の ASSISTANT メッセージに「Click to play audio」というコントロールと「Hey!I'm doing great, thanks for asking.How about you?」というトランスクリプトが表示されています。" style="width:100%;" >}}

{{< img src="llm_observability/instrumentation/image_example.png" alt="Agent Observability トレースビューの LLM スパン。入力の USER メッセージに「What is in this image?」というプロンプトが表示され、黒い子犬のインライン写真が添えられており、出力の ASSISTANT メッセージで、それが木の床の上にいる黒いラブラドール・レトリバーの子犬であると説明されています。" style="width:100%;" >}}

OpenAI の音声チャット補完の場合、`audioParts` も [Datadog の LLM インテグレーション](/llm_observability/instrumentation/auto_instrumentation/)によって自動的にキャプチャされます。手動でのアノテーション付けは不要です。`audioParts` とは異なり、`imageParts` は現在自動的にキャプチャされず、手動でアノテーションを付ける必要があります。自動キャプチャは将来のリリースで予定されています。

{{% /tab %}}
{{% tab "Java" %}}
SDK には、入力、出力、メトリクス、メタデータでスパンにアノテーションを付けるための複数のメソッドが用意されています。

### 入力と出力のアノテーション付け {#annotating-inputs-and-outputs}

`LLMObsSpan` インターフェースの `annotateIO()` メンバーメソッドを使用して、構造化された入力データと出力データを `LLMObsSpan` に追加します。これには、オプションの引数と LLM メッセージオブジェクトが含まれます。

#### 引数 {#arguments}

引数が null または空の場合、何も起こりません。たとえば、`inputData` が空ではない文字列で `outputData` が null の場合、`inputData` のみが記録されます。

`inputData`
: オプション - _String_ または _List<LLMObs.LLMMessage>_
<br />文字列 (LLM 以外のスパンの場合) または `LLMObs.LLMMessage` のリスト (LLM スパンの場合) のいずれか。

`outputData`
: オプション - _String_ または _List<LLMObs.LLMMessage>_
<br />文字列 (LLM 以外のスパンの場合) または `LLMObs.LLMMessage` のリスト (LLM スパンの場合) のいずれか。

#### LLM メッセージ {#llm-messages}
LLM スパンには、`LLMObs.LLMMessage` オブジェクトを使用して LLM メッセージをアノテーションとして付ける必要があります。

`LLMObs.LLMMessage` オブジェクトは、次の引数を指定して `LLMObs.LLMMessage.from()` を呼び出すことでインスタンス化できます。

`role`
: 必須 - _String_
<br />メッセージの作成者の役割を説明する文字列。

`content`
: 必須 - _String_
<br />メッセージの内容を含む文字列。

#### 例 {#example-20}

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

### メトリクスの追加 {#adding-metrics}

#### メトリクスの一括追加 {#bulk-add-metrics}

`LLMObsSpan` インターフェースの `setMetrics()` メンバーメソッドは、複数のメトリクスを一括で付与するために次の引数を受け入れます。

##### 引数 {#arguments-1}

`metrics`
: 必須 - _Map<String, Number>_
<br />スパンによって記述される操作に関連するメトリクスを記録するためにユーザーが追加できる、JSON のシリアライズ可能なキーと数値のマップ (`input_tokens`、`output_tokens`、`total_tokens` など)。

#### 単一のメトリクスの追加 {#add-a-single-metric}

`setMetric()` インターフェースの `LLMObsSpan` メンバーメソッドは、単一のメトリクスを付与するために次の引数を受け入れます。

##### 引数 {#arguments-2}

`key`
: 必須 - _CharSequence_
<br /> メトリクスの名前。

`value`
: 必須 - _int_、_long_、または _double_
<br /> メトリクスの値。

#### 例 {#examples}

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

### タグの追加 {#adding-tags}

タグの詳細については、[タグの使用を開始する][1]を参照してください。

#### タグの一括追加 {#bulk-add-tags}

`setTags()` インターフェースの `LLMObsSpan` メンバーメソッドは、複数のタグを一括で付与するために次の引数を受け入れます。

##### 引数 {#arguments-3}

`tags`
: 必須 - _Map<String, Object>_
<br /> スパンのコンテキストを記述するためにユーザーがタグとして追加できる、JSON のシリアライズ可能なキーと値のペアのマップ (`session`、`environment`、`system`、`version` など)。

#### 単一のタグの追加 {#add-a-single-tag}

`setTag()` インターフェースの `LLMObsSpan` メンバーメソッドは、単一のタグを付与するために次の引数を受け入れます。

##### 引数 {#arguments-4}

`key`
: 必須 - _String_
<br /> タグのキー。

`value`
: 必須 - _int_、_long_、_double_、_boolean_、または _String_
<br /> タグの値。

#### 例 {#examples-1}

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

### エラーのアノテーション付け {#annotating-errors}

#### Throwable の追加 (推奨) {#adding-a-throwable-recommended}

`addThrowable()` インターフェースの `LLMObsSpan` メンバーメソッドは、スタックトレース付きの throwable を付与するために次の引数を受け入れます。

##### 引数 {#arguments-5}

`throwable`
: 必須 - _Throwable_
<br /> 発生した throwable/例外。

#### エラーメッセージの追加 {#adding-an-error-message}

`setErrorMessage()` インターフェースの `LLMObsSpan` メンバーメソッドは、エラー文字列を付与するために次の引数を受け入れます。

##### 引数 {#arguments-6}

`errorMessage`
: 必須 - _String_
<br /> エラーのメッセージ。

#### エラーフラグの設定 {#setting-an-error-flag}

`setError()` インターフェースの `LLMObsSpan` メンバーメソッドは、操作のエラーを示すために次の引数を受け入れます。

##### 引数 {#arguments-7}

`error`
: 必須 - _boolean_
<br /> スパンがエラーになった場合は `true`。

#### 例 {#examples-2}

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

### メタデータのアノテーション付け {#annotating-metadata}

`setMetadata()` インターフェースの `LLMObsSpan` メンバーメソッドは、次の引数を受け入れます。

`metadata`
: 必須 - _Map<String, Object>_
<br />スパンによって記述される入力操作または出力操作に関連するメタデータを含む、JSON のシリアライズ可能なキーと値のペアのマップ。

#### 例 {#example-21}

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

### 自動インスツルメンテーションスパンのアノテーション付け {#annotating-auto-instrumented-spans}

{{< tabs >}}
{{% tab "Python" %}}

SDK の `LLMObs.annotation_context()` メソッドは、アノテーションコンテキストがアクティブな間に開始されたすべての自動インスツルメンテーションスパンを変更するために使用できるコンテキストマネージャーを返します。

`LLMObs.annotation_context()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: オプション - _文字列_
<br />アノテーションコンテキスト内で開始されるすべての自動インスツルメンテーションスパンのスパン名を上書きする名前。

`prompt`
: オプション - _辞書_
<br />LLM 呼び出しに使用されるプロンプトを表す辞書。完全なスキーマとサポートされているキーについては、[Prompt オブジェクト](#prompt-tracking-arguments)のドキュメントを参照してください。`Prompt` オブジェクトを `ddtrace.llmobs.utils` からインポートし、`prompt` 引数として渡すこともできます。**注**: この引数は LLM スパンにのみ適用されます。

`tags`
: オプション - _辞書_
<br />ユーザーがスパンにタグとして追加できる、JSON のシリアライズ可能なキーと値のペアの辞書。キーの例: `session`、`env`、`system`、および `version`。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`cost_tags`
: オプション - _文字列のリスト_
<br />生成される LLM のコストメトリクスおよびトークンメトリクスにカスタムタグとして伝播させるタグキーのリスト。各エントリは、スパン開始時に `tags` に存在するキー (同じコンテキストまたは親コンテキストに提供されたもの) を参照する必要があります。`LLMObs.annotate()` で後から追加されたタグキーは保持されません。詳細については、[コスト監視](#cost-monitoring)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-22}

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

SDK の `llmobs.annotationContext()` は、コールバック関数のスコープ内で開始されたすべての自動インスツルメンテーションスパンを変更するために使用できるコールバック関数を受け入れます。

`llmobs.annotationContext()` メソッドは、最初の引数で次のオプションを受け入れます。

{{% collapse-content title="オプション" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: オプション - _文字列_
<br />アノテーションコンテキスト内で開始されるすべての自動インスツルメンテーションスパンのスパン名を上書きする名前。

`tags`
: オプション - _オブジェクト_
<br />ユーザーがスパンにタグとして追加できる、JSON のシリアライズ可能なキーと値のペアのオブジェクト。キーの例: `session`、`env`、`system`、および`version`。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`costTags`
: オプション - _文字列の配列_
<br />生成される LLM のコストメトリクスおよびトークンメトリクスにカスタムタグとして伝播させるタグキーのリスト。各エントリは、スパン開始時に `tags` に存在するキー (同じコンテキストまたは親コンテキストに提供されたもの) を参照する必要があります。`llmobs.annotate()` で後から追加されたタグキーは保持されません。詳細については、[コスト監視](#cost-monitoring)を参照してください。

{{% /collapse-content %}}

#### 例 {#example-23}

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

## プロンプト追跡{#prompt-tracking}

構造化されたプロンプトメタデータを LLM スパンに付与することで、結果の再現、変更の監査、およびバージョン間でのプロンプトパフォーマンスの比較が可能になります。テンプレートを使用する場合、Agent Observability はテンプレートコンテンツの変更に基づいた[バージョン追跡](#version-tracking)も提供します。

{{< tabs >}}
{{% tab "Python" %}}
LLM 呼び出しの前にプロンプトメタデータを付与するには、`LLMObs.annotation_context(prompt=...)` を使用します。スパンアノテーションの詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

#### 引数{#arguments-8}

{{% collapse-content title="引数" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: 必須 - 辞書
<br />下記のプロンプトスキーマに従う型付き辞書。

{{% /collapse-content %}}

{{% collapse-content title="プロンプト構造" level="h5" expanded=false id="prompt-structure" %}}

サポートされているキー:

- `id` (str): このプロンプトの論理識別子。`ml_app` ごとに一意である必要があります。デフォルトは `{ml_app}-unnamed_prompt` です。
- `version` (str): プロンプトのバージョンタグ (例: "1.0.0")。詳細については、[バージョン追跡](#version-tracking)を参照してください。
- `variables`(Dict[str, str]): テンプレートのプレースホルダーに値を入力するために使用される変数。
- `template`(str): プレースホルダーを含むテンプレート文字列 (例: `"Translate {{text}} to {{lang}}\"`)。
- `chat_template`(List[Message]): マルチメッセージテンプレート形式。`{ "role": "<role>", "content": "<template string with placeholders>" }` オブジェクトのリストを指定します。
- `tags`(Dict[str, str]): プロンプト実行に付与するタグ。
- `rag_context_variables`(List[str]): グラウンドトゥルースやコンテキストコンテンツを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。
- `rag_query_variables`(List[str]): ユーザーのクエリを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。

{{% /collapse-content %}}

#### 例: 単一テンプレートプロンプト {#example-single-template-prompt}

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

#### 例: LangChain プロンプトテンプレート {#example-langchain-prompt-templates}

LangChain のプロンプトテンプレートを自動インスツルメンテーションで使用する場合は、意味のある名前を持つ変数にテンプレートを割り当ててください。自動インスツルメンテーションでは、これらの名前を使用してプロンプトを識別します。

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

LLM 呼び出しの前にプロンプトメタデータを付与するには、`llmobs.annotationContext({ prompt: ... }, () => { ... })` を使用します。スパンアノテーションの詳細については、[スパンのエンリッチメント](#enriching-spans)を参照してください。

#### 引数{#arguments-9}

{{% collapse-content title="オプション" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: 必須 - オブジェクト
<br />下記のプロンプトスキーマに従うオブジェクト。

{{% /collapse-content %}}

{{% collapse-content title="プロンプト構造" level="h5" expanded=false id="prompt-structure" %}}

サポートされているプロパティ:

- `id` (string): このプロンプトの論理識別子。`ml_app` ごとに一意である必要があります。デフォルトは `{ml_app}-unnamed_prompt` です。
- `version` (string): プロンプトのバージョンタグ (例: "1.0.0")。詳細については、[バージョン追跡](#version-tracking)を参照してください。
- `variables`(Record<string, string>): テンプレートのプレースホルダーに値を入力するために使用される変数。
- `template`(string | List[Message]): プレースホルダーを含むテンプレート文字列 (例: `"Translate {{text}} to {{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` オブジェクトのリスト。
- `tags`(Record<string, string>): プロンプト実行に付与するタグ。
- `contextVariables`(string[]): グラウンドトゥルースやコンテキストコンテンツを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。
- `queryVariables`(string[]): ユーザーのクエリを含む変数キー。[ハルシネーション検出](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)に使用されます。

{{% /collapse-content %}}

#### 例: 単一テンプレートプロンプト {#example-single-template-prompt-1}

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

#### 注記 {#notes}
- プロンプトのアノテーション付けは LLM スパンでのみ利用可能です。
- 正しい LLM スパンに適用されるよう、プロバイダー呼び出しの直前にアノテーションを配置してください。
- アプリケーション内の異なるプロンプトを区別するために、一意のプロンプト `id` を使用してください。
- 次のようなプレースホルダー構文を使用してテンプレートを静的に保ち (例:{{variable_name}}`) and define dynamic content in the `variables` セクションで動的コンテンツを定義します。
- ブロック内で複数の自動インスツルメンテーション LLM 呼び出しを行う場合は、アノテーションコンテキストを使用して、呼び出し全体に同じプロンプトメタデータを適用してください。[自動インスツルメンテーションスパンのアノテーション付け](#annotating-auto-instrumented-spans)を参照してください。

### バージョン追跡{#version-tracking}

Agent Observability は、明示的なバージョンが指定されていない場合に、プロンプトの自動バージョニングを提供します。プロンプトメタデータで `version` タグなしで `template` または `chat_template` を指定すると、システムはテンプレートコンテンツのハッシュを計算してバージョンを自動的に生成します。`version` タグを指定した場合、Agent Observability は自動生成の代わりに指定されたバージョンラベルを使用します。

バージョニングシステムは次のように機能します。
- **自動バージョニング**: `version` タグが指定されていない場合、Agent Observability は `template` または `chat_template` のコンテンツのハッシュを計算して、数値のバージョン識別子を自動的に生成します。
- **手動バージョニング**: `version` タグが指定されている場合、Agent Observability は指定されたバージョンラベルをそのまま使用します。
- **バージョン履歴**: 自動生成されたバージョンと手動で指定されたバージョンの両方がバージョン履歴に保持され、時間の経過に伴うプロンプトの進化を追跡します。

これにより、テンプレートコンテンツの変更に基づく自動バージョン管理に依存するか、独自のバージョンラベルを使用してバージョン管理を完全に制御するかを選択できる柔軟性が得られます。

## MCP インテントキャプチャ{#mcp-intent-capture}

MCP ツールが呼び出された理由を把握するには、MCP サーバーでインテントキャプチャを有効にします。有効にすると、呼び出し元のモデルに対してツールを呼び出した理由を説明するよう要求する引数がすべての MCP サーバーツールに追加されます。インテントはツールのスパンに記録されるため、ツールの定義や説明を改善するのに役立ちます。

{{< tabs >}}
{{% tab "Python" %}}

`DD_MCP_CAPTURE_INTENT` 環境変数を使用して MCP インテントキャプチャを有効にします。

{{< code-block lang="shell" >}}
DD_MCP_CAPTURE_INTENT=1 DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

または、`LLMObs.enable()` で `capture_intent` パラメータを使用してプログラムで有効にします。

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  capture_intent=True,
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## コスト監視{#cost-monitoring}
LLM/埋め込みスパンにトークンメトリクス (自動コスト追跡用) またはコストメトリクス (手動コスト追跡用) を付与します。トークンメトリクスを使用すると、Datadog はプロバイダーの価格設定を使用してコストを計算できます。一方、コストメトリクスを使用すると、カスタムモデルやサポートされていないモデルを使用する際に独自の価格設定を提供できます。詳細については、[コスト][14]を参照してください。

自動インスツルメンテーションを使用している場合、トークンメトリクスとコストメトリクスはスパンに自動的に表示されます。手動でインスツルメンテーションを行う場合は、下記のガイダンスに従ってください。

<div class="alert alert-info">このコンテキストにおいて、「トークンメトリクス」および「コストメトリクス」とは、 <code>metrics</code> パラメータ ( <code>LLMObs.annotate()</code> メソッド) を通じてスパンに付与する数値のキーと値のペアを指します。これらは、<a href="/llm_observability/monitoring/metrics/">Datadog プラットフォームの Agent Observability メトリクス</a>とは異なります。認識されたキー ( <code>input_tokens</code>、<code>output_tokens</code>、<code>input_cost</code>、 <code>output_cost</code>など) について、Datadog はこれらのスパン属性を使用して、ダッシュボードやモニターで使用するための対応するプラットフォームのメトリクス ( <code>ml_obs.span.llm.input.cost</code>など) を生成します。</div>

### 使用例: 一般的なモデルプロバイダーの使用{#use-case-using-a-common-model-provider}
Datadog は、OpenAI、Azure OpenAI、Anthropic、Google Gemini などの一般的なモデルプロバイダーをサポートしています。これらのプロバイダーを使用する場合、LLM リクエストにモデル名、モデルプロバイダー、およびトークン使用量をアノテーションするだけで済みます。Datadog は、プロバイダーの価格設定に基づいて推定コストを自動的に計算します。

各トークンが何を表しているか、Datadog がそれらをどのように計算するかの詳細については、[トークン数の計算方法][16]を参照してください。

{{< tabs >}}
{{% tab "Python" %}}

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

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_tokens: 50,
      output_tokens: 120,
      total_tokens: 170,
      non_cached_input_tokens: 13,  // optional
      cache_read_input_tokens: 22,  // optional
      cache_write_input_tokens: 15  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "gpt-5.1", "openai", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_tokens", 50,
      "output_tokens", 120,
      "total_tokens", 170,
      "non_cached_input_tokens", 13,  // optional
      "cache_read_input_tokens", 22,  // optional
      "cache_write_input_tokens", 15  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 使用例: カスタムモデルの使用{#use-case-using-a-custom-model}
カスタムモデルやサポートされていないモデルの場合は、スパンにドル単位のコストデータを手動でアノテーションする必要があります。

{{< tabs >}}
{{% tab "Python" %}}

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
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_cost: 3,
      output_cost: 7,
      total_cost: 10,
      non_cached_input_cost: 1,    // optional
      cache_read_input_cost: 0.6,  // optional
      cache_write_input_cost: 1.4  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'custom_model', modelProvider: 'model_provider' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "custom_model", "model_provider", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_cost", 3,
      "output_cost", 7,
      "total_cost", 10,
      "non_cached_input_cost", 1,    // optional
      "cache_read_input_cost", 0.6,  // optional
      "cache_write_input_cost", 1.4  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### コストメトリクスおよびトークンメトリクスへのカスタムタグの追加{#adding-custom-tags-to-cost-and-tokens-metrics}
デフォルトでは、LLM のコストトークンおよびトークンメトリクスには、`model_name`、`model_provider`、`ml_app` などの一連の固定された OOTB タグが含まれます。チーム、顧客、機能など、アプリケーション固有の属性で LLM の支出を分析するには、スパンの既存のタグキーのサブセットをマークして、それらのメトリクスにカスタムタグとして伝播させます。カスタムのダッシュボードやモニターなどの使用例については、[コストメトリクスおよびトークンメトリクスのカスタムタグ][15]を参照してください。

各エントリは文字列である必要があり、アノテーションが適用される時点でスパンの `tags` パラメータを通じてすでに提供されているキーを参照する必要があります。単一のスパンにアノテーションを付ける場合、キーは同じアノテーション呼び出し内の `tags`、または同じスパンに対する以前のアノテーションを通じて提供できます。アノテーションコンテキストを使用する場合、スパン開始時に `tags` に存在するキーのみが対象となります。個別のスパンアノテーションを通じて後から追加されたキーは保持されません。既存のタグキーを参照していないエントリはスキップされます。

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        metrics={"input_tokens": 50, "output_tokens": 120, "total_tokens": 170},
        tags={"team": "nlp", "customer_tier": "enterprise", "host": "host_name"},
        cost_tags=["team", "customer_tier"],
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: { input_tokens: 50, output_tokens: 120, total_tokens: 170 },
    tags: { team: 'nlp', customer_tier: 'enterprise', host: 'host_name' },
    costTags: ['team', 'customer_tier']
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

この方法でアノテーションコンテキストを通じてタグを伝播させ、コンテキスト内で開始されたすべての自動インスツルメンテーションスパンに適用することもできます。

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
with LLMObs.annotation_context(
    tags={"team": "nlp", "customer_tier": "enterprise"},
    cost_tags=["team", "customer_tier"],
):
    resp = ... # llm call here
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
llmobs.annotationContext({
  tags: { team: 'nlp', customer_tier: 'enterprise' },
  costTags: ['team', 'customer_tier']
}, () => {
  const resp = ... // llm call here
})
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## 評価{#evaluations}

Agent Observability SDK には、評価を Datadog にエクスポートおよび送信するためのメソッドが用意されています。

<div class="alert alert-info">再利用可能なクラスベースの評価器 (<code>BaseEvaluator</code>、<code>BaseSummaryEvaluator</code>) を構築し、詳細な結果メタデータを含めるには、<a href="/llm_observability/guide/evaluation_developer_guide/">評価開発者ガイド</a>を参照してください。</div>

評価は単一のスパンに結合する必要があります。ターゲットスパンは、次の 2 つの方法のいずれかで識別できます。
- _タグベースの結合_ - 単一のスパンに設定された一意のキーと値のタグペアを使用して、評価を結合します。タグのキーと値のペアが複数のスパンに一致する場合、またはどのスパンにも一致しない場合、評価の結合は失敗します。
- _直接スパン参照_ - スパンの一意のトレース ID とスパン ID の組み合わせを使用して、評価を結合します。

### スパンのエクスポート {#exporting-a-span}
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` は、スパンからスパンコンテキストを抽出するために使用できます。このメソッドは、評価を対応するスパンに関連付ける際に役立ちます。

#### 引数 {#arguments-10}
`LLMObs.export_span()` メソッドは、次の引数を受け入れます。

`span`
: オプション - _スパン_
<br />スパンコンテキスト (スパン ID とトレース ID) を抽出する対象のスパン。指定しない場合 (関数デコレータを使用する場合など)、SDK は現在のアクティブなスパンをエクスポートします。

#### 例 {#example-24}

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
`llmobs.exportSpan()` は、スパンからスパンコンテキストを抽出するために使用できます。評価を対応するスパンに関連付けるには、このメソッドを使用する必要があります。

#### 引数 {#arguments-11}

`llmobs.exportSpan()` メソッドは、次の引数を受け入れます。

`span`
: オプション - _スパン_
<br />スパンコンテキスト (スパン ID とトレース ID) を抽出する対象のスパン。指定しない場合 (関数ラッパーを使用する場合など)、SDK は現在のアクティブなスパンをエクスポートします。

#### 例 {#example-25}

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

### 評価の送信 {#submitting-evaluations}

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` は、特定のスパンに関連付けられたカスタム評価を送信するために使用できます。

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> は非推奨であり、ddtrace の次のメジャーバージョン (4.0) で削除される予定です。移行するには、 <code>LLMObs.submit_evaluation_for</code> 呼び出しの名前を <code>LLMObs.submit_evaluation</code>に変更してください。</div>

**注**: カスタム評価は、自分で独自に実装してホストする評価器です。これらは、Datadog が組み込みの評価器を使用して自動的に計算する既成の評価とは異なります。すぐに使える評価をアプリケーション用に設定するには、Datadog の [[**Agent Observability**] > [**Settings**] (設定) > [**Evaluations**] (評価)][1] ページを使用してください。

`LLMObs.submit_evaluation()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: 必須 - _文字列_
<br />評価の名前。

`metric_type`
: 必須 - _文字列_
<br />評価のタイプ。`categorical`、`score`、`boolean`、または `json` である必要があります。

`value`
: 必須 - _文字列、数値型、または辞書_
<br />評価の値。文字列 (`metric_type==categorical`)、整数/浮動小数点数 (`metric_type==score`)、ブール値 (`metric_type==boolean`)、または辞書 (`metric_type==json`) である必要があります。

`span`
: オプション - _辞書_
<br />この評価に関連付けられたスパンを一意に識別する辞書。`span_id` (文字列) と `trace_id` (文字列) を含む必要があります。この辞書の生成には [`LLMObs.export_span()`](#exporting-a-span) を使用します。

`span_with_tag_value`
: オプション - _辞書_
<br />この評価に関連付けられたスパンを一意に識別する辞書。`tag_key` (文字列) と `tag_value` (文字列) を含む必要があります。

   **注**: `span` と `span_with_tag_value` は、いずれか一方のみを指定する必要があります。両方を指定した場合、またはどちらも指定しなかった場合は、ValueError が発生します。

`ml_app`
: 必須 - _文字列_
<br />ML アプリケーションの名前。

`timestamp_ms`
: オプション - _整数_
<br />評価メトリクス結果が生成されたミリ秒単位の Unix タイムスタンプ。指定しない場合、現在の時刻がデフォルトで使用されます。

`tags`
: オプション - _辞書_
<br />評価に関するタグとしてユーザーが追加できる、文字列のキーと値のペアの辞書。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`assessment`
: オプション - _文字列_
<br />この評価の評価結果。指定可能な値は `pass` および `fail` です。

`reasoning`
: オプション - _文字列_
<br />評価結果のテキストによる説明。

`metadata`
: オプション - _辞書_
<br />評価結果に関連付けられた任意の構造化メタデータを含む辞書。
{{% /collapse-content %}}

#### 例 {#example-26}

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

`llmobs.submitEvaluation()` は、特定のスパンに関連付けられたカスタム評価を送信するために使用できます。

`llmobs.submitEvaluation()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: 必須 - _辞書_
<br />評価を関連付けるスパンコンテキスト。これは `LLMObs.export_span()` の出力でなければなりません。

`evaluationOptions`
: 必須 - _オブジェクト_
<br />評価データのオブジェクト。

`evaluationOptions` オブジェクトには、次のものを含めることができます。

`label`
: 必須 - _文字列_
<br />評価の名前。

`metricType`
: 必須 - _文字列_
<br />評価のタイプ。"categorical"、"score"、"boolean"、または "json" のいずれかである必要があります。

`value`
: 必須 - _文字列または数値型_
<br />評価の値。文字列 (`metric_type` が categorical の場合)、数値 (`metric_type` が score の場合)、ブール値 (`metric_type` が boolean の場合)、または JSON オブジェクト (`metric_type` が json の場合) である必要があります。

`tags`
: オプション - _辞書_
<br />評価に関するタグとしてユーザーが追加できる、文字列のキーと値のペアの辞書。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`assessment`
: オプション - _文字列_
<br />この評価の評価結果。指定可能な値は `pass` および `fail` です。

`reasoning`
: オプション - _文字列_
<br />評価結果のテキストによる説明。

`metadata`
: オプション - _辞書_
<br />評価結果に関連付けられた任意の構造化メタデータを含む JSON オブジェクト。
{{% /collapse-content %}}

#### 例 {#example-27}

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

`LLMObs.SubmitEvaluation()` を使用して、特定のスパンに関連付けられたカスタム評価を送信します。

`LLMObs.SubmitEvaluation()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: 必須 - _LLMObsSpan_
<br />評価を関連付けるスパンコンテキスト。

`label`
: 必須 - _String_
<br />評価の名前。

`categoricalValue`または `scoreValue`
: 必須 - _String_ または _double_
<br />評価の値。文字列 (評価が categorical の場合) または倍精度浮動小数点数 (評価が score の場合) である必要があります。

`tags`
: オプション - _Map<String, Object>_
<br />評価のタグ付けに使用される文字列のキーと値のペアの辞書。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。
{{% /collapse-content %}}

#### 例 {#example-28}

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

### エンドユーザーフィードバックの送信 {#submitting-end-user-feedback}

エンドユーザーフィードバックは、LLM アプリケーションのユーザーからの入力 (高評価や低評価、ユーザーがエージェントの変更を受け入れたかどうか、自由記述のコメントなど) を収集します。評価とは異なり、フィードバックには送信者の ID が含まれ、スパン、トレース、セッション、または顧客定義のエンティティを対象にすることができます。詳細については、[エンドユーザーフィードバック](/llm_observability/evaluations/end_user_feedback/)を参照してください。

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_feedback()` を使用して、スパン、トレース、セッション、または顧客定義のエンティティに関連付けられたエンドユーザーフィードバックを送信します。

`LLMObs.submit_feedback()` メソッドは、次の引数を受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
: 必須 - _文字列_
<br />フィードバックメトリクスの名前。`.` を含めてはなりません。

`metric_type`
: 必須 - _文字列_
<br />フィードバックのタイプ。`categorical`、`score`、`boolean`、`json`、または `text` である必要があります。

`value`
: 必須 - _文字列、数値型、ブール値、または辞書_
<br />フィードバックの値。文字列 (`metric_type==categorical` または `metric_type==text`)、整数/浮動小数点数 (`metric_type==score`)、ブール値 (`metric_type==boolean`)、または辞書 (`metric_type==json`) である必要があります。

`submitter`
: 必須 - _辞書_
<br />フィードバックの送信者を識別する辞書。空でない `id` (文字列) を含めなければなりません。さらに、オプションで `user` などの `type` (文字列) を含めることができます。

`span`
: オプション - _辞書_
<br />このフィードバックに関連付けられたスパンを識別する辞書。この辞書の生成には [`LLMObs.export_span()`](#exporting-a-span) を使用します。

`span_id`
: オプション - _文字列_
<br />このフィードバックに関連付けられたスパンの ID。

`trace_id`
: オプション - _文字列_
<br />このフィードバックに関連付けられたトレースの ID。

`session_id`
: オプション - _文字列_
<br />このフィードバックに関連付けられたセッションの ID。

`feedback_join_key`
: オプション - _文字列_
<br />このフィードバックに関連付けられた顧客定義のキー (インシデント ID やチケット ID など)。フィードバックをスパンに接続するには、まず同じ値を持つ `feedback_join_key` タグでそれらにアノテーションを付けてください。[スパンのエンリッチメント](#enriching-spans)を参照してください。

   **注**: `span`、`span_id`、`trace_id`、`session_id`、または `feedback_join_key` のいずれか 1 つのみを指定する必要があります。複数指定した場合、または何も指定しなかった場合は、`ValueError` が発生します。

`ml_app`
: オプション - _文字列_
<br />ML アプリケーションの名前。指定しない場合、SDK に対して設定された ML アプリケーションがデフォルトで使用されます。

`timestamp_ms`
: オプション - _整数_
<br />フィードバックが生成されたミリ秒単位の Unix タイムスタンプ。指定しない場合、現在の時刻がデフォルトで使用されます。

`tags`
: オプション - _辞書_
<br />フィードバックに関するタグとしてユーザーが追加できる、文字列のキーと値のペアの辞書。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`assessment`
: オプション - _文字列_
<br />このフィードバックの評価結果。指定可能な値は `pass` および `fail` です。

`reasoning`
: オプション - _文字列_
<br />フィードバックのテキストによる説明。
{{% /collapse-content %}}

#### 例 {#example-29}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)

    # submitting feedback for a trace
    LLMObs.submit_feedback(
        label="thumbs",
        metric_type="categorical",
        value="down",
        submitter={"id": "user-123", "type": "user"},
        trace_id=span_context["trace_id"],
        assessment="fail",
    )

    # connecting the span to a customer-defined entity
    LLMObs.annotate(tags={"feedback_join_key": "incident-123"})

    # submitting feedback for that entity
    LLMObs.submit_feedback(
        label="user_comment",
        metric_type="text",
        value="The investigation missed the customer impact.",
        submitter={"id": "user-123", "type": "user"},
        feedback_join_key="incident-123",
    )
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
`llmobs.submitFeedback()` を使用して、スパン、トレース、セッション、または顧客定義のエンティティに関連付けられたエンドユーザーフィードバックを送信します。

`llmobs.submitFeedback()` メソッドは、次のプロパティを持つ options オブジェクトを受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
: 必須 - _文字列_
<br />フィードバックメトリクスの名前。`.` を含めてはなりません。

`metricType`
: 必須 - _文字列_
<br />フィードバックのタイプ。`categorical`、`score`、`boolean`、`json`、または `text` のいずれかである必要があります。

`value`
: 必須 - _文字列、数値、ブール値、またはオブジェクト_
<br />フィードバックの値。文字列 (`categorical` および `text` のメトリクスタイプの場合)、数値 (`score` の場合)、ブール値 (`boolean` の場合)、または JSON オブジェクト (`json` の場合) である必要があります。

`submitter`
: 必須 - _オブジェクト_
<br />フィードバックの送信者を識別するオブジェクト。空でない `id` (文字列) を含めなければなりません。さらに、オプションで `user` などの `type` (文字列) を含めることができます。

`span`
: オプション - _オブジェクト_
<br />フィードバックを付与するスパンのスパンコンテキスト。これは [`llmobs.exportSpan()`](#exporting-a-span) の出力でなければなりません。

`spanId`
: オプション - _文字列_
<br />フィードバックを付与するスパンの ID。

`traceId`
: オプション - _文字列_
<br />フィードバックを付与するトレースの ID。

`sessionId`
: オプション - _文字列_
<br />フィードバックを付与するセッションの ID。

`feedbackJoinKey`
: オプション - _文字列_
<br />フィードバックを付与する顧客定義のキー (インシデント ID やチケット ID など)。フィードバックをスパンに接続するには、スパンに同じキーを設定してください。

   **注**: `span`、`spanId`、`traceId`、`sessionId`、または `feedbackJoinKey` のいずれか 1 つのみを指定する必要があります。複数指定した場合、または何も指定しなかった場合は、エラーが発生します。

`mlApp`
: オプション - _文字列_
<br />ML アプリケーションの名前。指定しない場合、SDK に対して設定された ML アプリケーションがデフォルトで使用されます。

`timestampMs`
: オプション - _数値_
<br />フィードバックが生成されたミリ秒単位の Unix タイムスタンプ。指定しない場合、現在の時刻がデフォルトで使用されます。

`tags`
: オプション - _オブジェクト_
<br />フィードバックに関するタグとしてユーザーが追加できる、文字列のキーと値のペアのオブジェクト。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`assessment`
: オプション - _文字列_
<br />このフィードバックの評価結果。指定可能な値は `pass` および `fail` です。

`reasoning`
: オプション - _文字列_
<br />フィードバックのテキストによる説明。
{{% /collapse-content %}}

#### 例 {#example-30}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()

  // submitting feedback for a trace
  llmobs.submitFeedback({
    label: 'thumbs',
    metricType: 'boolean',
    value: true,
    submitter: { id: 'user-123', type: 'user' },
    traceId: spanContext.traceId,
    assessment: 'pass'
  })

  // connecting the span to a customer-defined entity
  llmobs.annotate({
    tags: { feedback_join_key: 'incident-123' }
  })

  // submitting feedback for that entity
  llmobs.submitFeedback({
    label: 'user_comment',
    metricType: 'text',
    value: 'This answer was helpful.',
    submitter: { id: 'user-123', type: 'user' },
    feedbackJoinKey: 'incident-123'
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
`LLMObs.submitFeedback()` を使用して、スパン、トレース、セッション、または顧客定義のエンティティに関連付けられたエンドユーザーフィードバックを送信します。`LLMObs.Feedback.builder()` を使用してフィードバックを構築します。

builder は次のメソッドを受け入れます。

{{% collapse-content title="引数" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label(String label)`
: 必須
<br />フィードバックメトリクスの名前。`.` を含めてはなりません。

`categoricalValue(String)`、`scoreValue(double)`、`booleanValue(boolean)`、`jsonValue(Map<String, Object>)`、または `textValue(String)`
: 必須
<br />フィードバックの値。これらのメソッドのいずれか 1 つのみを設定します。これによりメトリクスのタイプも決まります。

`submitter(String id, String type)`または `submitter(Submitter submitter)`
: 必須
<br />フィードバックの送信者を識別します。`id` は空ではない文字列である必要があります。`type` は、`user` のようなオプションの修飾子です。

`span(LLMObsSpan span)`、`spanId(String)`、`traceId(String)`、`sessionId(String)`、または `feedbackJoinKey(String)`
: 必須
<br />フィードバックを付与するエンティティ。これらのメソッドのいずれか 1 つのみを設定します。顧客定義のエンティティ (インシデント ID やチケット ID など) には `feedbackJoinKey` を使用し、スパンに同じキーを設定してフィードバックを接続します。

`mlApp(String mlApp)`
: オプション
<br />ML アプリケーションの名前。指定しない場合、トレーサー用に設定された ML アプリケーションがデフォルトで使用されます。

`timestampMs(long timestampMs)`
: オプション
<br />フィードバックが生成されたミリ秒単位の Unix タイムスタンプ。指定しない場合、現在の時刻がデフォルトで使用されます。

`tags(Map<String, Object> tags)`または `tag(String key, Object value)`
: オプション
<br />フィードバックのタグ付けに使用するキーと値のペア。タグの詳細については、[タグの使用を開始する](/getting_started/tagging/)を参照してください。

`assessment(Assessment assessment)`
: オプション
<br />このフィードバックの評価結果。指定可能な値は `LLMObs.Feedback.Assessment.PASS` および `LLMObs.Feedback.Assessment.FAIL` です。

`reasoning(String reasoning)`
: オプション
<br />フィードバックのテキストによる説明。
{{% /collapse-content %}}

**注**: `LLMObs.submitFeedback()` はフィードバックを検証し、Agent Observability が有効でフィードバックが無効な場合 (ターゲット、値、または送信者が欠落している場合など) に `IllegalArgumentException` をスローします。Agent Observability が無効な場合、または Agent が接続されていない場合、この呼び出しは何も行いません。

#### 例 {#example-31}

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
      // connecting the span to a customer-defined entity
      llmSpan.setTag("feedback_join_key", "incident-123");
      llmSpan.finish();

      // submitting feedback for a trace
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .traceId(llmSpan.getTraceId().toString())
              .label("thumbs")
              .booleanValue(true)
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.PASS)
              .reasoning("answered the question")
              .build());

      // submitting feedback for that entity
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .feedbackJoinKey("incident-123")
              .label("user_comment")
              .textValue("The answer missed the customer impact.")
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.FAIL)
              .build());
    }
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## スパン処理 {#span-processing}

スパンの入出力データを変更するには、プロセッサ関数を設定します。プロセッサ関数はスパンタグにアクセスできるため、条件付きの入出力変更が可能になります。プロセッサ関数は、変更後のスパンを返して出力するか、`None`/`null`を返してスパンの出力を完全に防ぐことができます。これは、機密データを含むスパンや特定の基準を満たすスパンを除外する場合に役立ちます。

{{< tabs >}}
{{% tab "Python" %}}

### 例 {#example-32}

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


### 例: 自動インスツルメンテーションによる条件付き変更{#example-conditional-modification-with-auto-instrumentation}

自動インスツルメンテーションを使用する場合、スパンが常にコンテキスト的にアクセス可能であるとは限りません。自動インスツルメンテーションスパンの入出力を条件付きで変更するには、スパンプロセッサに加えて `annotation_context()` を使用します。

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

### 例: スパンの出力を防ぐ{#example-preventing-spans-from-being-emitted}

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

### 例 {#example-33}

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

### 例: 自動インスツルメンテーションによる条件付き変更{#example-conditional-modification-with-auto-instrumentation-1}

自動インスツルメンテーションを使用する場合、スパンが常にコンテキスト的にアクセス可能であるとは限りません。自動インスツルメンテーションスパンの入出力を条件付きで変更するには、スパンプロセッサに加えて `llmobs.annotationContext()` を使用します。

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

### 例: スパンの出力を防ぐ{#example-preventing-spans-from-being-emitted-1}

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


## ユーザーセッションの追跡{#tracking-user-sessions}

セッショントラッキングを使用すると、特定のユーザーに複数のインタラクションを関連付けることができます。

{{< tabs >}}
{{% tab "Python" %}}
新しいトレースのルートスパンを開始する場合や新しいプロセスでスパンを開始する場合は、`session_id` 引数に基盤となるユーザーセッションの文字列 ID を指定します。これはスパンのタグとして送信されます。必要に応じて、`user_handle`、`user_name`、および `user_id` タグを指定することもできます。

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

### セッショントラッキングタグ{#session-tracking-tags}

| タグ | 説明|
|---|---|
| `session_id` | 単一のユーザーセッション (チャットセッションなど) を表す ID。|
| `user_handle` | チャットセッションのユーザーのハンドル。|
| `user_name` | チャットセッションのユーザーの名前。|
| `user_id` | チャットセッションのユーザーのID。|
{{% /tab %}}

{{% tab "Node.js" %}}
新しいトレースのルートスパンを開始する場合や新しいプロセスでスパンを開始する場合は、`sessionId` 引数に基盤となるユーザーセッションの文字列 ID を指定します。

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
新しいトレースのルートスパンを開始する場合や新しいプロセスでスパンを開始する場合は、`sessionId` 引数に基盤となるユーザーセッションの文字列 ID を指定します。

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

## 分散トレーシング{#distributed-tracing}

SDK は、分散したサービス間やホスト間でのトレースをサポートしています。分散トレースは、Web リクエスト間でスパン情報を伝播させることで機能します。

{{< tabs >}}
{{% tab "Python" %}}

`ddtrace` ライブラリには、一般的な [Web フレームワーク][1]および [HTTP][2] ライブラリの分散トレースをサポートする、すぐに使えるインテグレーションが用意されています。これらのサポートされているライブラリを使用してアプリケーションでリクエストを行う場合、次のコマンドを実行することで分散トレースを有効にできます。
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

これらのサポートされているライブラリをアプリケーションで使用していない場合は、HTTP ヘッダーとの間でスパン情報を手動で伝播させることにより、分散トレースを有効にできます。SDK には、リクエストヘッダーにトレースコンテキストを注入および有効化するためのヘルパーメソッド `LLMObs.inject_distributed_headers()` および `LLMObs.activate_distributed_headers()` が用意されれています。

### 分散ヘッダーの注入 {#injecting-distributed-headers}

`LLMObs.inject_distributed_headers()` メソッドは、スパンを受け取り、リクエストに含める HTTP ヘッダーにそのコンテキストを注入します。このメソッドは、次の引数を受け入れます。

`request_headers`
: 必須 - _辞書_
<br />トレースコンテキスト属性で拡張する HTTP ヘッダー。

`span`
: オプション - _スパン_ - **デフォルト**: `The current active span.`
<br />指定されたリクエストヘッダーにコンテキストを注入するスパン。すべてのスパン (関数デコレータを使用する場合も含む) において、現在の有効なスパンがデフォルトで使用されます。

### 分散ヘッダーの有効化 {#activating-distributed-headers}

`LLMObs.activate_distributed_headers()` メソッドは、HTTP ヘッダーを受け取り、新しいサービスで有効にするトレースコンテキスト属性を抽出します。

**注**: ダウンストリームサービスでスパンを開始する前に `LLMObs.activate_distributed_headers()` を呼び出す必要があります。それ以前に開始されたスパン (関数デコレータのスパンを含む) は、分散トレースでキャプチャされません。

このメソッドは、次の引数を受け入れます。

`request_headers`
: 必須 - _辞書_
<br />トレースコンテキスト属性を抽出する HTTP ヘッダー。


### 例 {#example-34}

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
[2]: /ja/tracing/trace_collection/compatibility/python/#library-compatibility
{{% /tab %}}
{{% tab "Node.js" %}}

`dd-trace` ライブラリには、一般的な [Ｗebフレームワーク][1] の分散トレースをサポートする、すぐに使えるインテグレーションが用意されています。トレーサーを要求すると、これらのインテグレーションが自動的に有効になりますが、必要に応じて次のように無効にすることもできます。

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /ja/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## 高度なトレース {#advanced-tracing}

{{< tabs >}}
{{% tab "Python" %}}
### インラインメソッドを使用したスパンのトレース {#tracing-spans-using-inline-methods}

スパンの種類ごとに、`ddtrace.llmobs.LLMObs` クラスは、特定のコードブロックに伴う操作を自動的にトレースするための対応するインラインメソッドを提供します。これらのメソッドは、関数デコレータの対応するものと同じ引数シグネチャを持ちますが、`name` が指定されていない場合は、スパンの種類 (`llm`、`workflow` など) がデフォルトで使用されるという点が異なります。これらのメソッドはコンテキストマネージャーとして使用でき、囲まれたコードブロックが完了した後にスパンを自動的に終了させることができます。

#### 例 {#example-35}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### コンテキスト間でのスパンの永続化 {#persisting-a-span-across-contexts}

異なるコンテキストやスコープ間でスパンを手動で開始および停止するには、次のようにします。

1. コンテキストマネージャーとしてではなく、通常の関数呼び出しとして、同じメソッド (例: ワークフローのスパン用の `LLMObs.workflow` メソッド) を使用してスパンを手動で開始します。
2. スパンオブジェクトを引数として他の関数に渡します。
3. `span.finish()` メソッドを使用して、スパンを手動で停止します。**注**: スパンは手動で終了させる必要があります。そうしないと送信されません。

#### 例 {#example-36}

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

#### サーバーレス環境での強制フラッシュ {#force-flushing-in-serverless-environments}

`LLMObs.flush()` は、バッファリングされたすべての Agent Observability データを Datadog バックエンドに送信するブロッキング関数です。これは、すべての Agent Observability トレースが送信されるまでアプリケーションが終了しないようにする必要があるサーバーレス環境で役立ちます。

### 複数のアプリケーションのトレース {#tracing-multiple-applications}

SDK は、同一サービスから複数の LLM アプリケーションをトレースすることをサポートしています。

環境変数 `DD_LLMOBS_ML_APP` を LLM アプリケーションの名前に設定できます。デフォルトでは、生成されたすべてのスパンがこの名前にグループ化されます。

この設定を上書きして、特定のルートスパンに別の LLM アプリケーション名を使用するには、新しいトレースのルートスパンまたは新しいプロセスのスパンを開始する際に、基盤となる LLM アプリケーションの文字列名を指定して `ml_app` 引数を渡します。

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### インラインメソッドを使用したスパンのトレース {#tracing-spans-using-inline-methods-1}

`llmobs`SDK には、特定のコードブロックを伴う操作を自動的にトレースするための対応するインラインメソッドが用意されています。これらのメソッドは、関数ラッパーの対応するものと同じ引数シグネチャを持ちますが、匿名コールバックからは名前を推論できないため、`name` が必須であるという点が異なります。このメソッドは、次の条件でスパンを終了します。

- 関数が Promise を返す場合、その Promise が解決または拒否されたときにスパンが終了します。
- 関数が最後のパラメータとしてコールバックを受け取る場合、そのコールバックが呼び出されたときにスパンが終了します。
- 関数がコールバックを受け取らず、Promise も返さない場合、関数実行の終了時にスパンが終了します。

#### コールバックを使用しない例 {#example-without-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### コールバックを使用する例 {#example-with-a-callback}

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

この関数の戻り値の型は、トレースする関数の戻り値の型と一致します。

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

### TypeScript における関数デコレータ {#function-decorators-in-typescript}

Node.js の Agent Observability SDK は、TypeScript アプリケーションの関数デコレータとして機能する `llmobs.decorate` 関数を提供しています。この関数のトレース動作は `llmobs.wrap` と同じです。

#### 例 {#example-37}

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

### サーバーレス環境での強制フラッシュ {#force-flushing-in-serverless-environments-1}

`llmobs.flush()` は、バッファリングされたすべての Agent Observability データを Datadog バックエンドに送信するブロッキング関数です。これは、すべての Agent Observability トレースが送信されるまでアプリケーションが終了しないようにする必要があるサーバーレス環境で役立ちます。

### 複数のアプリケーションのトレース {#tracing-multiple-applications-1}

SDK は、同一サービスから複数の LLM アプリケーションをトレースすることをサポートしています。

環境変数 `DD_LLMOBS_ML_APP` を LLM アプリケーションの名前に設定できます。デフォルトでは、生成されたすべてのスパンがこの名前にグループ化されます。

この設定を上書きして、特定のルートスパンに別の LLM アプリケーション名を使用するには、新しいトレースのルートスパンまたは新しいプロセスのスパンを開始する際に、基盤となる LLM アプリケーションの文字列名を指定して `mlApp` 引数を渡します。

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### アプリケーション命名ガイドライン {#application-naming-guidelines}

アプリケーション名 (`DD_LLMOBS_ML_APP` の値) は、次のガイドラインに従う必要があります。

- 小文字の Unicode 文字列であること
- 最大 193 文字までであること
- 連続するアンダースコアや末尾のアンダースコアを含まないこと
- 次の文字を使用すること
   - 英数字
   - アンダースコア
   - マイナス
   - コロン
   - ピリオド
   - スラッシュ

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /ja/llm_observability/terms/
[9]: /ja/getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /ja/tracing/trace_collection/compatibility/python/#integrations
[12]: /ja/tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /ja/llm_observability/instrumentation/auto_instrumentation/
[14]: /ja/llm_observability/monitoring/cost
[15]: /ja/llm_observability/monitoring/cost/#custom-tags-on-cost-and-tokens-metrics
[16]: /ja/llm_observability/monitoring/cost/#how-token-counts-are-calculated
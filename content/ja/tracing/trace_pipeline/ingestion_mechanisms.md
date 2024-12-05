---
aliases:
- /ja/tracing/trace_ingestion/mechanisms
description: トレース取り込みを制御するトレーサーと Agent のメカニズムの概要。
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: ドキュメント
  text: Ingestion Controls
- link: /tracing/trace_pipeline/trace_retention/
  tag: ドキュメント
  text: トレースの保持
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用量メトリクス
title: 取り込みのメカニズム
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="取り込みサンプリングルール" >}}


アプリケーションで生成されたスパンを Datadog に送信する (_取り込む_) かどうかは、複数のメカニズムによって決定されます。これらのメカニズムの背後にあるロジックは、[トレーシングライブラリ][1]と Datadog Agent の中にあります。構成によっては、インスツルメントされたサービスによって生成されたトラフィックの全てまたは一部が取り込まれます。

取り込まれた各スパンには、このページで説明されているメカニズムのいずれかを参照する一意の**取り込み理由**が付加されています。[使用量メトリクス][2]`datadog.estimated_usage.apm.ingested_bytes` と `datadog.estimated_usage.apm.ingested_spans` は `ingestion_reason` によってタグ付けされています。

[取り込み理由ダッシュボード][3]を使って、それぞれの取り込み理由を確認することができます。各メカニズムに起因するボリュームの概要を把握し、どの構成オプションに焦点を当てるべきかを迅速に知ることができます。

## ヘッドベースサンプリング

デフォルトのサンプリングメカニズムは_ヘッドベースサンプリング_と呼ばれています。トレースを維持するか削除するかの決定は、トレースの一番最初、[ルートスパン][4]の開始時に行われます。この決定は、HTTP リクエストヘッダーなどのリクエストコンテキストの一部として、他のサービスに伝搬されます。

この判断はトレースの最初に行われ、その後トレースのすべての部分に伝えられるため、トレースは全体として保持または削除されることが保証されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="ヘッドベースサンプリング" style="width:100%;" >}}

ヘッドベースサンプリングのサンプリングレートは、以下の 2 か所で設定できます。
- **[Agent](#in-the-agent)** レベル (デフォルト)
- [トレースライブラリ](#in-tracing-libraries-user-defined-rules)**レベル: 任意のトレースライブラリのメカニズムが Agent の設定をオーバーライドします。

### Agent で
`ingestion_reason: auto`

Datadog Agent は、トレーシングライブラリにサンプリングレートを継続的に送信し、トレースのルートで適用させます。Agent は、1 秒間に 10 個のトレースを目標にレートを調整し、トラフィックに応じて各サービスに分配します。

例えば、サービス `A` が `B` よりもトラフィックが多い場合、Agent は `A` のサンプリングレートを変化させて、`A` が 1 秒間に 7 つ以上のトレースを保持しないようにし、同様に `B` のサンプリングレートを調整して `B` が 1 秒間に 3 つのトレース、合計 1 秒間に 10 個以上のトレースを保持しないようにします。

#### リモート構成

Sampling rate configuration in the Agent is configurable remotely if you are using Agent version [7.42.0][20] or higher. To get started, set up [Remote Configuration][23] and then configure the `ingestion_reason` parameter from the [Ingestion Control page][5]. Remote Configuration allows you to change the parameter without having to restart the Agent. Remotely set configuration takes precedence over local configurations, including environment variables and settings from `datadog.yaml`.

#### ローカル構成

Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数に、Agent の目標の 1 秒あたりのトレースを設定します。
```
@param max_traces_per_second - 整数 - オプション - デフォルト: 10
@env DD_APM_MAX_TPS - 整数 - オプション - デフォルト: 10
```

**注**:
- Agent で設定した traces-per-second サンプリングレートは、Datadog トレースライブラリにのみ適用されます。OpenTelemetry SDK など他のトレースライブラリには影響を与えません。
- The maximum traces per second is a target, not a fixed value. In reality, it fluctuates depending on traffic spikes and other factors.

Datadog Agent の[自動計算されたサンプリングレート](#in-the-agent)を使ってサンプリングされたトレースの全てのスパンには、取り込み理由 `auto` のタグが付けられています。`ingestion_reason` タグは、[使用量メトリクス][2]にも設定されています。Datadog Agent のデフォルトのメカニズムを使用するサービスは、[Ingestion Control Page][5] の Configuration の列で `Automatic` とラベル付けされます。

### トレーシングライブラリ: ユーザー定義のルール
`ingestion_reason: rule`

よりきめ細かい制御を行うには、トレースライブラリのサンプリング構成オプションを使用します。
- Set a specific **sampling rate to apply to the root of the trace**, by service, and/or resource name, overriding the Agent's [default mechanism](#in-the-agent).
- 1 秒間に取り込まれるトレース数の**レートリミット**を設定します。デフォルトのレートリミットは、サービスインスタンスあたり 1 秒あたり 100 トレースです (Agent [デフォルトメカニズム](#in-the-agent)を使用している場合、レートリミッターは無視されます)。

**Note**: Sampling rules are also head-based sampling controls. If the traffic for a service is higher than the configured maximum traces per second, then traces are dropped at the root. It does not create incomplete traces.

構成は、環境変数で設定するか、コードで直接設定することができます。

{{< tabs >}}
{{% tab "Java" %}}
**Remote configuration**

<div class="alert alert-info"><strong>Resource-based sampling rules are in Beta</strong>: Starting from version <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, for Java applications, set by-service and by-resource sampling rates from the <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a> UI. Request access to the feature via this <a href="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/">link</a>.</div>

Read more about how to remotely configure sampling rates by service and resource in the [Resource-based sampling guide][1].

**Note**: Remotely set configuration takes precedence over local configuration.

**Local configuration**

For Java applications, set by-service and by-resource (starting from version [v1.26.0][3] for resource-based sampling) sampling rates with the `DD_TRACE_SAMPLING_RULES` environment variable.

For example, to capture 100% of traces for the resource `GET /checkout` from the service `my-service`, and 20% of other endpoints' traces, set:

```
# using system property
java -Ddd.trace.sampling.rules='[{\"service\": \"my-service\", \"resource\": \"GET /checkout\", \"sample_rate\":1},{\"service\": \"my-service\", \"sample_rate\":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

サービス名の値は大文字と小文字を区別し、実際のサービス名の大文字と小文字を一致させる必要があります。

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

**Note**: The use of `DD_TRACE_SAMPLE_RATE` is deprecated. Use `DD_TRACE_SAMPLING_RULES` instead. For instance, if you already set `DD_TRACE_SAMPLE_RATE` to `0.1`, set `DD_TRACE_SAMPLING_RULES` to `[{"sample_rate":0.1}]` instead.

サンプリングコントロールについては、[Java トレースライブラリドキュメント][2]を参照してください。

[1]: /ja/tracing/guide/resource_based_sampling
[2]: /ja/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
For Python applications, set by-service and by-resource (starting from version [v2.8.0][1] for resource-based sampling) sampling rates with the `DD_TRACE_SAMPLING_RULES` environment variable.

For example, to capture 100% of traces for the resource `GET /checkout` from the service `my-service`, and 20% of other endpoints' traces, set:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

**Note**: The use of `DD_TRACE_SAMPLE_RATE` is deprecated. Use `DD_TRACE_SAMPLING_RULES` instead. For instance, if you already set `DD_TRACE_SAMPLE_RATE` to `0.1`, set `DD_TRACE_SAMPLING_RULES` to `[{"sample_rate":0.1}]` instead.

サンプリングコントロールについては、[Python トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /ja/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
Ruby アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[Ruby トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Remote configuration**

<div class="alert alert-info"><strong>Resource-based sampling rules are in Beta</strong>: Starting from version <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1">1.63.1</a>, for Go applications, set by-service and by-resource sampling rates from the <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a> UI. Request access to the feature via this <a href="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/">link</a>.</div>

Read more about how to remotely configure sampling rates by service and resource in this [article][3].

**Note**: The remotely set configuration takes precedence over local configuration.

**Local configuration**

For Go applications, set by-service and by-resource (starting from version [v1.60.0][2] for resource-based sampling) sampling rates with the `DD_TRACE_SAMPLING_RULES` environment variable.

For example, to capture 100% of traces for the resource `GET /checkout` from the service `my-service`, and 20% of other endpoints' traces, set:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

**Note**: The use of `DD_TRACE_SAMPLE_RATE` is deprecated. Use `DD_TRACE_SAMPLING_RULES` instead. For instance, if you already set `DD_TRACE_SAMPLE_RATE` to `0.1`, set `DD_TRACE_SAMPLING_RULES` to `[{"sample_rate":0.1}]` instead.

サンプリングコントロールについては、[Go トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /ja/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
Node.js アプリケーションの場合は、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。

また、サービス別のサンプリングレートを設定することもできます。例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```javascript
tracer.init({
    ingestion: {
        sampler: {
            sampleRate: 0.1,
            rules: [
                { sampleRate: 0.5, service: 'my-service' }
            ]
        }
    }
});
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[Node.js トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
PHP アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

サンプリングコントロールについては、[PHP トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
Starting in [v0.1.0][1], the Datadog C++ library supports the following configurations:
- グローバルサンプリングレート: 環境変数 `DD_TRACE_SAMPLE_RATE`
- サービス別のサンプリングレート: 環境変数 `DD_TRACE_SAMPLING_RULES`
- レートリミットの設定: 環境変数 `DD_TRACE_RATE_LIMIT`

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ does not provide integrations for automatic instrumentation, but it's used by proxy tracing such as Envoy, Nginx, or Istio. Read more about how to configure sampling for proxies in [Tracing proxies][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /ja/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
.NET アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

<div class="alert alert-info"><strong>ベータ版</strong>: バージョン 2.35.0 から、サービスが実行される場所で <a href="/agent/remote_config/">Agent リモート構成</a>が有効になっている場合、<a href="/tracing/service_catalog">サービスカタログ</a> の UI でサービスごとの <code>DD_TRACE_SAMPLE_RATE</code> を設定できます。</div>

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

Read more about sampling controls in the [.NET tracing library documentation][1].\
Read more about [configuring environment variables for .NET][2].

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**注**: トレースライブラリ構成を使用してサンプリングされたトレースのすべてのスパンには、取り込み理由 `rule` というタグが付けられます。ユーザー定義のサンプリングルールで構成されたサービスは、[Ingestion Control Page][5] の Configuration 列で `Configured` としてマークされます。

## エラーとレアトレース

ヘッドベースサンプリングで捕捉できなかったトレースについては、2 つの Datadog Agent の追加サンプリングメカニズムにより、重要かつ多様なトレースが保持され、取り込まれるようにします。この 2 つのサンプラーは、あらかじめ決められたタグの組み合わせをすべてキャッチすることで、多様なローカルトレースセット (同一ホストからのスパンセット) を保持します。

- **Error traces**: サンプリングエラーは、システムの潜在的な不具合を可視化するために重要です。
- **Rare traces**: レアトレースをサンプリングすることで、トラフィックの少ないサービスやリソースを確実に監視し、システム全体の可視性を維持することができます。

**注**: [ライブラリサンプリングルール](#in-tracing-libraries-user-defined-rules)を設定したサービスでは、エラーサンプリングとレアサンプリングは無視されます。

### エラートレース
`ingestion_reason: error`

エラーサンプラーは、ヘッドベースサンプリングでは捕捉できないエラースパンを含むトレースの断片を捕捉します。最大 10 トレース/秒 (Agent 毎) の速度でエラートレースを捕捉します。ヘッドベースのサンプリングレートが低い場合に、エラーを包括的に可視化することができます。

Agent バージョン 7.33 以降では、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数でエラーサンプラーを構成することが可能です。
```
@param errors_per_second - 整数 - オプション - デフォルト: 10
@env DD_APM_ERROR_TPS - 整数 - オプション - デフォルト: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="エラーサンプリング" style="width:100%;" >}}

**注**:
1. エラーサンプラーを無効にするには、このパラメーターを `0` に設定します。
2. エラーサンプラーは、Agent レベルのエラースパンを持つローカルトレースをキャプチャします。トレースが分散されている場合、完全なトレースが Datadog に送信される保証はありません。
3. デフォルトでは、トレーシングライブラリのルールや `manual.drop` などのカスタムロジックによってドロップされたスパンは、エラーサンプラーでは**除外**されます。

#### Datadog Agent 7.42.0 以降

<div class="alert alert-warning"> この機能は現在ベータ版です。この機能へのアクセスをリクエストするには、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>にご連絡ください。</div>

The error sampling is remotely configurable if you're using the Agent version [7.42.0][20] or higher. Follow the [documentation][21] to enable remote configuration in your Agents. With remote configuration, you are able to enable the collection of rare spans without having to restart the Datadog Agent.

#### Datadog Agent 6/7.41.0 以降

トレーシングライブラリのルールや `manual.drop` などのカスタムロジックによってドロップされたスパンがエラーサンプラーに**含まれる**ようにデフォルトの動作をオーバーライドするには、Datadog Agent (または Kubernetes の Datadog Agent ポッド内の専用 Trace Agent コンテナ) で `DD_APM_FEATURES=error_rare_sample_tracer_drop` として機能を有効にします。


#### Datadog Agent 6/7.33〜6/7.40.x

エラーサンプリングのデフォルト動作は、これらの Agent のバージョンでは変更できません。Datadog Agent を Datadog Agent 6/7.41.0 以降にアップグレードしてください。


### レアトレース
`ingestion_reason: rare`

レアサンプラーは、Datadog にレアスパンのセットを送信します。これは、`env`、`service`、`name`、`resource`、`error.type`、`http.status` の組み合わせを最大で毎秒 5 トレース (Agent 毎) 捕捉することができます。ヘッドベースのサンプリングレートが低い場合に、低トラフィックのリソースを確実に可視化することができます。

**注**: レアサンプラーは、Agent レベルのローカルトレースをキャプチャします。トレースが分散されている場合、完全なトレースが Datadog に送信されることを保証する方法はありません。

#### Datadog Agent 7.42.0 以降

<div class="alert alert-warning"> この機能は現在ベータ版です。この機能へのアクセスをリクエストするには、<a href="https://www.datadoghq.com/support/">Datadog サポート</a>にご連絡ください。</div>

The rare sampling rate is remotely configurable if you're using the Agent version [7.42.0][20] or higher. Follow the [documentation][21] to enable remote configuration in your Agents. With remote configuration, you are able to change the parameter value without having to restart the Datadog Agent.

#### Datadog Agent 6/7.41.0 以降

デフォルトでは、レアサンプラーは**有効ではありません**。

**注**: **有効**の場合、トレーシングライブラリのルールや `manual.drop` などのカスタムロジックによってドロップされたスパンは、このサンプラーでは**除外**されます。

レアサンプラーを設定するには、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数 `DD_APM_ENABLE_RARE_SAMPLER` で `apm_config.enable_rare_sampler` 設定を更新してください。

```
@params apm_config.enable_rare_sampler - ブール値 - オプション - デフォルト: false
@env DD_APM_ENABLE_RARE_SAMPLER - ブール値 - オプション - デフォルト: false
```

トレーシングライブラリのルールや `manual.drop` などのカスタムロジックによってドロップされたスパンを評価するには、Trace Agent の `DD_APM_FEATURES=error_rare_sample_tracer_drop` で機能を有効にします。


#### Datadog Agent 6/7.33〜6/7.40.x

デフォルトでは、レアサンプラーが有効になっています。

**注**: **有効**の場合、トレーシングライブラリのルールや `manual.drop` などのカスタムロジックによってドロップされたスパンは、このサンプラーでは**除外**されます。これらのスパンをこのロジックに含めるには、Datadog Agent 6.41.0/7.41.0 以降にアップグレードしてください。

レアサンプラーのデフォルト設定を変更するには、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数 `DD_APM_DISABLE_RARE_SAMPLER` で `apm_config.disable_rare_sampler` 設定を更新してください。

```
@params apm_config.disable_rare_sampler - ブール値 - オプション - デフォルト: false
@env DD_APM_DISABLE_RARE_SAMPLER - ブール値 - オプション - デフォルト: false
```

## 強制維持と削除
`ingestion_reason: manual`

ヘッドベースのサンプリングメカニズムは、トレーシングライブラリレベルでオーバーライドすることができます。例えば、クリティカルなトランザクションを監視する必要がある場合、関連するトレースを強制的に保持させることができます。一方、ヘルスチェックのような不要または反復的な情報については、トレースを強制的に削除することができます。

- スパンに Manual Keep を設定して、そのスパンとすべての子スパンを取り込むように指示します。問題のスパンがトレースのルートスパンでない場合、結果のトレースは UI で不完全に表示されることがあります。

- スパンに Manual Drop を設定して、子スパンが**取り込まれない**ようにします。[エラーとレアサンプラー](#error-and-rare-traces)は Agent では無視されます。

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

手動でトレースを保持:

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // トレース方法からアクティブなスパンを取り除く
        Span span = GlobalTracer.get().activeSpan();
        // 常にトレースを保持
        span.setTag(DDTags.MANUAL_KEEP, true);
        // 続いて実装方法を入力
    }
}
```

手動でトレースを削除:

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // トレース方法からアクティブなスパンを取り除く
        Span span = GlobalTracer.get().activeSpan();
        // 常にトレースをドロップ
        span.setTag(DDTags.MANUAL_DROP, true);
        // 続いて実装方法を入力
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

手動でトレースを保持:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # 常にトレースを保持
    span.set_tag(MANUAL_KEEP_KEY)
    # 続いて実装方法を入力
```

手動でトレースを削除:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # 常にトレースをドロップ
    span.set_tag(MANUAL_DROP_KEY)
    # 続いて実装方法を入力
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

手動でトレースを保持:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # アクティブトレースに影響する
  # 続いて実装方法を入力
end
```

手動でトレースを削除:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # アクティブトレースに影響する
  # 続いて実装方法を入力
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

手動でトレースを保持:

```Go
package main

import (
    "log"
    "net/http"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    //  /posts URLでwebリクエストのスパンを作成
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // 常にこのトレースを保持:
    span.SetTag(ext.ManualKeep, true)
    //続いて実装方法を入力

}
```

手動でトレースを削除:

```Go
package main

import (
    "log"
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    //  /posts URLでwebリクエストのスパンを作成
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // 常にこのトレースを削除:
    span.SetTag(ext.ManualDrop, true)
    //続いて実装方法を入力
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

手動でトレースを保持:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// 常にトレースを保持
span.setTag(tags.MANUAL_KEEP)
//続いて実装方法を入力

```

手動でトレースを削除:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// 常にトレースを削除
span.setTag(tags.MANUAL_DROP)
//続いて実装方法を入力

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

手動でトレースを保持:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // 常にこのトレースを保持
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    //続いて実装方法を入力
}
```

手動でトレースを削除:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // 常にこのトレースをドロップ
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    //続いて実装方法を入力
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


手動でトレースを保持:

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // 常にこのトレースを保持
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  }
?>
```

手動でトレースを削除:

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // 常にこのトレースをドロップ
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

手動でトレースを保持:

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto span = tracer.create_span(span_cfg);
// Always keep this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_KEEP));
//method impl follows
```

手動でトレースを削除:

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

using namespace dd = datadog::tracing;

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto another_span = tracer.create_span(span_cfg);
// Always drop this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_DROP));
//method impl follows
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

手動によるトレース保持は、コンテキスト伝搬の前に行われるべきです。コンテキスト伝搬の後に保持される場合、システムはサービス間でトレース全体が保持されることを保証することはできません。手動によるトレース保持はトレースクライアントの位置で設定されるため、サンプリングルールに基づいて Agent またはサーバーの位置によってトレースが削除される可能性があります。


## シングルスパン
`ingestion_reason: single_span`

特定のスパンをサンプリングする必要があるが、完全なトレースは必要ない場合、トレーシングライブラリでは、単一のスパンに設定されるサンプリングレートを設定することができます。

例えば、特定のサービスをモニターするために[スパンからのメトリクス][6]を構築する場合、スパンのサンプリングルールを構成することで、サービスを流れるすべてのリクエストのトレースを 100% 取り込む必要がなく、これらのメトリクスが 100% のアプリケーショントラフィックに基づくことを確認することができます。

この機能は、Datadog Agent v[7.40.0][19]+ で利用可能です。

**注**: [ヘッドベースサンプリング](#head-based-sampling)によって保持されているスパンをドロップするためにシングルスパンサンプリングルールを使用することは**できません**。ヘッドベースサンプリングによってドロップされる追加のスパンを保持するためにのみ使用できます。

{{< tabs >}}
{{% tab "Java" %}}
トレーシングライブラリの[バージョン 1.7.0][1] から、Java アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 50 スパンを 100% 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Java トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /ja/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
バージョン [v1.4.0][1] 以降、Python アプリケーションでは、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


サンプリングコントロールについては、[Python トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /ja/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
バージョン [v1.5.0][1] 以降、Ruby アプリケーションでは、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Ruby トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /ja/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
バージョン [v1.41.0][1] 以降、Go アプリケーションでは、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
Starting from version [v1.60.0][3], for Go applications, set by-resource and by-tags **span** sampling rules with the `DD_SPAN_SAMPLING_RULES` environment variable.

For example, to collect `100%` of the spans from the service for the resource `POST /api/create_issue`, for the tag `priority` with value `high`:

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

サンプリングコントロールについては、[Go トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /ja/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Node.js アプリケーションでは、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Node.js トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
バージョン [v0.77.0][1] 以降、PHP アプリケーションでは、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[PHP トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /ja/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
Starting from version [v0.1.0][1], for C++ applications, set by-service and by-operation name **span** sampling rules with the `DD_SPAN_SAMPLING_RULES` environment variable.

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
バージョン [v2.18.0][1] 以降、.NET アプリケーションでは、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の **span** サンプリングルールを設定します。

例えば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンを `100%` 収集するには

```
@env DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'
```

サンプリングコントロールについては、[.NET トレースライブラリドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><a href="/tracing/legacy_app_analytics/">App Analytics</a> のメカニズムは完全に非推奨となります。完全なトレースなしでシングルスパンを取り込むには、<a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">シングルスパンサンプリング</a>構成を使用します。完全なトレースを取り込むには、<a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">ヘッドベースサンプリング</a>構成を使用します。</div>

## 製品の取り込まれたスパン

### RUM トレース
`ingestion_reason:rum`

Web アプリケーションやモバイルアプリケーションからのリクエストは、バックエンドサービスがインスツルメントされたときにトレースを生成します。[APM とリアルユーザーモニタリングのインテグレーション][7]は、Web やモバイルアプリケーションのリクエストを対応するバックエンドトレースにリンクし、フロントエンドとバックエンドの全データを 1 つのレンズで見ることができるようにします。

RUM ブラウザ SDK のバージョン `4.30.0` からは、`traceSampleRate` という初期化パラメーターを設定することで、取り込み量を制御し、バックエンドのトレースのサンプリングを保持することができます。`traceSampleRate` には `0` から `100` の間の数値を設定します。
もし `traceSampleRate` の値が設定されていない場合は、デフォルトでブラウザのリクエストから来るトレースの 100% が Datadog に送信されます。

同様に、他の SDK でも同様のパラメーターでトレースサンプリングレートを制御してください。

| SDK         | パラメーター             | 最小バージョン    |
|-------------|-----------------------|--------------------|
| Browser     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _サンプリングレートは、[1.13.0][16] 以降、取り込み制御ページで報告しています。_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _サンプリングレートは、[1.15.0][17] 以降、取り込み制御ページで報告しています。_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _サンプリングレートは、[1.2.0][18] 以降、取り込み制御ページで報告しています。_  |

### Synthetic トレース
`ingestion_reason:synthetics` と `ingestion_reason:synthetics-browser`

HTTP テストとブラウザテストは、バックエンドサービスがインストルメントされたときに、トレースを生成します。[Synthetic テストと APM のインテグレーション][13]は、 Synthetic テストを対応するバックエンドのトレースとリンクさせます。失敗したテストの実行から、そのテストの実行によって生成されたトレースを見ることで、問題の根本的な原因を突き止めることができます。

デフォルトでは、Synthetic HTTP テストとブラウザテストの 100% がバックエンドトレースを生成します。

### その他の製品

いくつかの追加の取り込み理由は、特定の Datadog 製品によって生成されるスパンに起因します。

| 製品    | 取り込み理由                    | 取り込みのメカニズムの説明 |
|------------|-------------------------------------|---------------------------------|
| サーバーレス | `lambda` と `xray`                   | Datadog トレーシングライブラリまたは AWS X-Ray インテグレーションでトレースした[サーバーレスアプリケーション][14]から受信したトレース。 |
| Application Security Management     | `appsec`                            | Datadog トレーシングライブラリから取り込まれたトレースで、[ASM][15] によって脅威としてフラグが立てられたもの。 |
| データジョブのモニタリング    | `data_jobs`                            | Traces ingested from the Datadog Java Tracer Spark integration or the Databricks integration. |

## OpenTelemetry の取り込みメカニズム
`ingestion_reason:otel`

OpenTelemetry SDK のセットアップ (OpenTelemetry Collector または Datadog Agent を使用) に応じて、取り込みサンプリングを制御する複数の方法があります。様々な OpenTelemetry のセットアップで OpenTelemetry SDK、OpenTelemetry Collector、Datadog Agent レベルでのサンプリングに利用できるオプションの詳細は [OpenTelemetry による取り込みサンプリング][22] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/dd_libraries/
[2]: /ja/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /ja/tracing/glossary/#trace-root-span
[5]: /ja/tracing/trace_pipeline/ingestion_controls/
[6]: /ja/tracing/trace_pipeline/generate_metrics/
[7]: /ja/real_user_monitoring/platform/connect_rum_and_traces/
[8]: https://github.com/DataDog/browser-sdk/releases/tag/v4.30.0
[9]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[10]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[11]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0
[13]: /ja/synthetics/apm/
[14]: /ja/serverless/distributed_tracing/
[15]: /ja/security/application_security/
[16]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.13.0
[17]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.15.0
[18]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.2.0
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.40.0
[20]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[21]: /ja/agent/remote_config/#enabling-remote-configuration
[22]: /ja/opentelemetry/guide/ingestion_sampling_with_opentelemetry
[23]: /ja/agent/remote_config/
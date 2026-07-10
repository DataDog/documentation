---
aliases:
- /ja/tracing/trace_ingestion/mechanisms
description: トレース取り込みを制御する SDK および Agent のメカニズムの概要。
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: ドキュメント
  text: 取り込みのコントロール
- link: /tracing/trace_pipeline/trace_retention/
  tag: ドキュメント
  text: トレースの保持
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用量メトリクス
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: ブログ
  text: 'Datadog の大規模な最適化: Zendesk におけるコスト効率に優れた観測可能性'
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: ラーニングセンター
  text: APM レート制限と保持
title: 取り込みのメカニズム
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="取り込みサンプリングルール" >}}


アプリケーションによって生成されたスパンを Datadog に送信するかどうか (_取り込み_) の判断は、複数のメカニズムによってなされます。これらのメカニズムの背後にあるロジックは、[SDK][1] と Datadog Agent にあります。構成に応じて、インスツルメントされたサービスによって生成されたすべてまたは一部のトラフィックが取り込まれます。

取り込まれた各スパンには、このページで説明されているメカニズムのいずれかを指す固有の**取り込み理由**があります。[使用量メトリクス][2] `datadog.estimated_usage.apm.ingested_bytes` と `datadog.estimated_usage.apm.ingested_spans` は `ingestion_reason` によってタグ付けされています。

[取り込み理由ダッシュボード][3]を使用することにより、文脈の中で各取り込み理由を調査し、注目すべき構成オプションを特定します。

## ヘッドベースサンプリング {#head-based-sampling}

デフォルトのサンプリングメカニズムは、_ヘッドベースサンプリング_と呼ばれています。トレースを保持するか削除するかの決定は、[ルートスパン][4]の開始時になされ、その後、リクエストコンテキストの一部として他のサービスに伝播します (たとえば HTTP リクエストヘッダーとして)。

この判断はトレースの最初になされ、その後すべての部分に伝えられるため、トレースは全体として保持または削除されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="ヘッドベースサンプリング" style="width:100%;" >}}

ヘッドベースサンプリングのサンプリングレートは、以下の 2 か所で設定できます。
- **[エージェント](#in-the-agent)** レベルで (デフォルト)
- **[SDK](#in-sdks-user-defined-rules)** レベルで: どの SDK メカニズムも Agent の設定をオーバーライドします。

### Agent で {#in-the-agent}
`ingestion_reason: auto`

Datadog Agent は、トレースのルートで適用するために、SDK にサンプリングレートを継続的に送信します。Agent は、トラフィックに応じてサービスに分配される、全体で 1 秒あたり 10 のトレースを取得できるようにレートを調整します。

たとえば、サービス `A` がサービス `B` よりもトラフィックが多い場合、Agent は `A` のサンプリングレートを変化させて、`A` が 1 秒間に 7 つのトレースを超えないようにし、同じように `B` のサンプリングレートを調整して `B` が 1 秒間に 3 つのトレースを超えないようにします。これにより、合計で 1 秒間に最大 10 個のトレースとなります。

#### リモート設定 {#remote-configuration}

Agent のサンプリングレート設定は、Agent バージョン [7.42.0][20] 以上を使用している場合、リモートで設定可能です。始めるには、[Remote Configuration][21] をセットアップした後、[Ingestion Control ページ][5]から `ingestion_reason` パラメーターを設定します。Remote Configuration を使用すると、Agent を再起動することなくパラメーターを変更できます。リモートで設定された設定内容は、環境変数や `datadog.yaml` からの設定を含むローカル設定よりも優先されます。

#### ローカル設定 {#local-configuration}

Agent のメイン構成ファイル (`datadog.yaml`) または環境変数に、Agent の目標の 1 秒あたりのトレースを設定します。

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**注**:
- Agent で設定された 1 秒あたりのトレース数のサンプリングレートは、Datadog SDK にのみ適用されます。OpenTelemetry SDK などの他の SDK には影響しません。
- 目標は固定値ではありません。実際には、トラフィックの急増や他の要因に応じて変動します。

Datadog Agent の[自動サンプリングレート](#in-the-agent)によってサンプリングされたトレースのスパンには、取り込み理由 `auto` がタグ付けされます。`ingestion_reason` タグは [使用状況メトリクス][2] にも設定されています。このデフォルトメカニズムを使用しているサービスは、[Ingestion Control ページ][5] の [Configuration] (設定) 列で `Automatic` としてラベル付けされています。

### SDK: ユーザー定義ルール {#in-sdks-user-defined-rules}
`ingestion_reason: rule`

よりきめ細かく制御するには、SDK のサンプリング構成オプションを使用します。
- サービスまたはリソース名ごとに、**トレースのルートに適用する特定のサンプリングレート**を設定し、Agent の[デフォルトメカニズム](#in-the-agent)をオーバーライドします。
- 1 秒間に取り込まれるトレース数の**レート制限**を設定します。デフォルトのレート制限は、サービスインスタンスごとに 1 秒あたり 100 トレースです。Agent の[デフォルトメカニズム](#in-the-agent)を使用している場合、レートリミッターは無視されます。

**注**: サンプリングルールは、ヘッドベースのサンプリング制御でもあります。サービスのトラフィックが設定された 1 秒あたりの最大トレース数を超える場合、ルートでトレースが削除されます。不完全なトレースは作成されません。

構成は、環境変数で設定するか、コードで直接設定することができます。

{{< tabs >}}
{{% tab "Java" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a> から、Java アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで設定する方法については、[リソースベースのサンプリングガイド][1] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**

Java アプリケーションでは、`DD_TRACE_SAMPLING_RULES` 環境変数を使用して、サービスごとおよびリソースごとのサンプリングレートを設定します (リソースベースのサンプリングはバージョン [v1.26.0][3] から)。

たとえば、サービス `my-service` からリソース `GET /checkout` のトレースを 100% キャプチャし、他のエンドポイントのトレースを 20% キャプチャするには、次のように設定します。

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

サービス名の値は大文字と小文字を区別し、実際のサービス名の大文字と小文字を一致させる必要があります。

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの 1 秒あたりの最大トレース数を設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

**注**: `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。

サンプリングコントロールについては、[Java SDK ドキュメント][2] を参照してください。

[1]: /ja/tracing/guide/resource_based_sampling
[2]: /ja/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a> から、Python アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで設定する方法については、[リソースベースのサンプリングガイド][3] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**
Python アプリケーションでは、`DD_TRACE_SAMPLING_RULES` 環境変数を使用して、サービスごとおよびリソースごとのサンプリングレートを設定します (リソースベースのサンプリングはバージョン [v2.8.0][1] から)。

たとえば、サービス `my-service` からリソース `GET /checkout` のトレースを 100% キャプチャし、他のエンドポイントのトレースを 20% キャプチャするには、次のように設定します。

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの 1 秒あたりの最大トレース数を設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

**注**: `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。

サンプリングコントロールについては、[Python SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /ja/tracing/trace_collection/dd_libraries/python
[3]: /ja/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a> から、Ruby アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで設定する方法については、[リソースベースのサンプリングガイド][1] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**
Ruby アプリケーションの場合は、`DD_TRACE_SAMPLE_RATE` 環境変数を使用して、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使用して、サービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50% 送信し、トレースの残りを 10% 送信するには、次のようにします。

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの 1 秒あたりの最大トレース数を設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリングコントロールについては、[Ruby SDK ドキュメント][1] を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a> から、Go アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法については、[こちらの記事][3] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**

Go アプリケーションでは、環境変数 `DD_TRACE_SAMPLING_RULES` を使用して、サービスごとおよびリソースごとのサンプリングレートを設定します (リソースベースのサンプリングはバージョン [v1.60.0][2] から)。

たとえば、サービス `my-service` からリソース `GET /checkout` のトレースを 100% キャプチャし、他のエンドポイントのトレースを 20% キャプチャするには、次のように設定します。

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの 1 秒あたりの最大トレース数を設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

**注**: `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。

サンプリングコントロールについては、[Go SDK ドキュメント][1] を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /ja/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a> から、Go アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで設定する方法については、[リソースベースのサンプリングガイド][1] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**

Node.js アプリケーションの場合は、環境変数 `DD_TRACE_SAMPLE_RATE` を使用して、ライブラリのグローバルサンプリングレートを設定します。

サービスごとのサンプリングレートも設定できます。たとえば、`my-service` という名前のサービスのトレースを 50% 送信し、トレースの残りを 10% 送信するには、次のようにします。

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

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの 1 秒あたりの最大トレース数を設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリングコントロールについては、[Node.js SDK ドキュメント][1] を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a> から、PHP アプリケーションでは、<a href="https://app.datadoghq.com/apm/traces/ingestion-control">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで設定する方法については、[リソースベースのサンプリングガイド][1] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**

PHP アプリケーションの場合は、環境変数 `DD_TRACE_SAMPLE_RATE` を使用して、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使用して、サービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50% 送信し、他のエンドポイントのトレースを 20%、トレースの残りを 10% 送信するには、次のように設定します。

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

サンプリングコントロールについては、[PHP SDK ドキュメント][1] を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**リモート設定**

バージョン <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a> から、C++ アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで設定する方法については、[リソースベースのサンプリングガイド][1] を参照してください。

**注**: リモートで設定された設定内容は、ローカル設定よりも優先されます。

**ローカル設定**
[v0.1.0][1] からは、Datadog C++ ライブラリは以下の構成をサポートしています。
- グローバルサンプリングレート: `DD_TRACE_SAMPLE_RATE` 環境変数
- サービスごとのサンプリングレート: `DD_TRACE_SAMPLING_RULES` 環境変数。
- レート制限設定: `DD_TRACE_RATE_LIMIT` 環境変数。

たとえば、`my-service` という名前のサービスのトレースを 50% 送信し、トレースの残りを 10% 送信するには、次のようにします。

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ は自動インスツルメンテーションのインテグレーションを提供しません。Envoy、NGINX、Istio などのプロキシのトレースに C++ を使用します。プロキシのサンプリング設定方法については、[プロキシのトレース][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /ja/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
.NET アプリケーションの場合は、環境変数 `DD_TRACE_SAMPLE_RATE` を使用して、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使用して、サービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50% 送信し、トレースの残りを 10% 送信するには、次のようにします。

```
#using powershell
$env:DD_TRACE_SAMPLE_RATE=0.1
$env:DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'

#using JSON file   
{
    "DD_TRACE_SAMPLE_RATE": "0.1",
    "DD_TRACE_SAMPLING_RULES": "[{\"service\": \"my-service\", \"resource\": \"GET /checkout\", \"sample_rate\": 0.5}]"
}
```

<div class="alert alert-info">バージョン 2.35.0 以降、このサービスが実行される環境で <a href="/remote_configuration">Agent Remote Configuration</a> が有効になっている場合は、サービスごとに <code>DD_TRACE_SAMPLE_RATE</code> を<a href="/tracing/software_catalog">Software Catalog</a> の UI で設定できます。</div>

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの 1 秒あたりの最大トレース数を設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリングコントロールについては、[.NET SDK ドキュメント][1] を参照してください。\
[.NET の環境変数の設定][2] で詳細を確認してください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**注**: SDK の構成を使用してサンプリングされたトレースのすべてのスパンには、取り込み理由 `rule` がタグ付けされています。ユーザー定義のサンプリングルールで設定されたサービスは、[Ingestion Control ページ][5] の [Configuration] 列で `Configured` としてマークされます。

## エラーとレアトレース {#error-and-rare-traces}

ヘッドベースのサンプリングで取得されないトレースについて、2 つの追加の Datadog Agent サンプリングメカニズムにより、さもなければ見過ごされていたかもしれない重要かつ多様なトレースがキャッチされます。これらのサンプラーは、あらかじめ定められたタグのセットのすべての組み合わせを取得することによって、ローカルトレースの多様なセット (同じホストからのスパン) を保持します。

- **エラートレース**: エラーサンプリングにより、潜在的なシステム障害の可視性が提供されます。
- **レアトレース**: レアトレースサンプリングは、システム全体の低トラフィックサービスやリソースに対する可視性を維持します。

**注**: [ライブラリサンプリングルール](#in-sdks-user-defined-rules)を設定したサービスでは、エラーサンプリングとレアサンプリングは無視されます。

### エラートレース {#error-traces}
`ingestion_reason: error`

エラーサンプラーでは、ヘッドベースのサンプリングで取得されないエラースパンを含むトレースを、最大で Agent につき 1 秒あたり 10 トレースの割合で取得します。これにより、ヘッドベースのサンプリングレートが低い場合でもエラーの可視性が維持されます。

Agent バージョン 7.33 以降では、Agent のメイン構成ファイル (`datadog.yaml`) または環境変数でエラーサンプラーを構成することが可能です。

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="エラーサンプリング" style="width:100%;" >}}

**注**:
1. エラーサンプラーを無効にするには、このパラメーターを `0` に設定します。
2. エラーサンプラーは、Agent レベルでローカルエラートレースを取得します。トレースが分散している場合、完全なトレースが Datadog に送信されないことがあります。
3. デフォルトでは、SDK のルールや `manual.drop` などのカスタムロジックによってドロップされるスパンは、エラーサンプラーでは**除外**されます。

#### Datadog Agent 7.42.0 以降 {#datadog-agent-7420-and-higher}

エラーサンプリングは、Agent バージョン [7.42.0][20] 以降を使用している場合、リモートで設定可能です。[ドキュメント][21] に従って、Agent でリモート設定を有効にしてください。リモート構成を使用すると、Datadog Agent を再起動することなく、レアスパンの収集を有効にすることができます。

#### Datadog Agent 6/7.41.0 以降 {#datadog-agent-67410-and-higher}

SDK のルールや `manual.drop` などのカスタムロジックではドロップされるスパンが、エラーサンプラーに**含められる**ようにデフォルトの動作をオーバーライドするには、この機能を有効にするため、Datadog Agent (または Kubernetes の Datadog Agent Pod 内の専用 Trace Agent コンテナ) で `DD_APM_FEATURES=error_rare_sample_tracer_drop` とします。

#### Datadog Agent 6/7.33 〜 6/7.40.x {#datadog-agent-6733-to-6740x}

これらの Agent バージョンでは、エラーサンプリングのデフォルト動作を変更することはできません。Datadog Agent を Datadog Agent 6/7.41.0 以降にアップグレードしてください。

### レアトレース {#rare-traces}
`ingestion_reason: rare`

レアサンプラーは、Datadog に一連のレアスパンを送信します。`env`、`service`、`name`、`resource`、`error.type`、および `http.status` の組み合わせを、Agent ごとに 1 秒あたり最大 5 トレースの割合でキャッチします。これにより、ヘッドベースのサンプリングレートが低い場合でも低トラフィックリソースの可視性が維持されます。

**注**: レアサンプラーは、Agent レベルでローカルトレースを取得します。トレースが分散している場合、完全なトレースが Datadog に送信される保証はありません。

#### Datadog Agent 7.42.0 以降 {#datadog-agent-7420-and-higher-1}

レアサンプリングは、Agent バージョン [7.42.0][20] 以降を使用している場合、リモートで設定可能です。[ドキュメント][21] に従って、Agent でリモート設定を有効にしてください。リモート設定を使用すると、Datadog Agent を再起動することなく、パラメーター値を変更できます。

#### Datadog Agent 6/7.41.0 以降 {#datadog-agent-67410-and-higher-1}

デフォルトの場合、レアサンプラーは**有効になっていません**。

**注**: **有効になっている**場合、SDK のルールや `manual.drop` などのカスタムロジックによってドロップされるスパンは、このサンプラーでは**除外**されます。

レアサンプラーを構成するには、Datadog Agent のメイン構成ファイル (`datadog.yaml`) で `apm_config.enable_rare_sampler` 設定を更新するか、環境変数 `DD_APM_ENABLE_RARE_SAMPLER` を使用します。

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

SDK ルールや `manual.drop` のようなカスタムロジックによってドロップされるスパンを評価するには、Trace Agent で `DD_APM_FEATURES=error_rare_sample_tracer_drop` としてその機能を有効にします。

#### Datadog Agent 6/7.33 〜 6/7.40.x {#datadog-agent-6733-to-6740x-1}

デフォルトでは、レアサンプラーが有効になっています。

**注**: **有効になっている**場合、SDK のルールや `manual.drop` などのカスタムロジックによってドロップされるスパンは、このサンプラーでは**除外**されます。これらのスパンをこのロジックに含めるには、Datadog Agent 6.41.0/7.41.0 以降にアップグレードしてください。

レアサンプラーのデフォルト設定を変更するには、Agent のメイン構成ファイル (`datadog.yaml`) で `apm_config.disable_rare_sampler` の設定を更新するか、環境変数 `DD_APM_DISABLE_RARE_SAMPLER` を使用します。

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## 強制保持と削除 {#force-keep-and-drop}
`ingestion_reason: manual`

ヘッドベースのサンプリングメカニズムは、SDK レベルでオーバーライドできます。たとえば、重要なトランザクションを監視する必要がある場合、関連するトレースを強制保持できます。一方、ヘルスチェックのような不要または反復的な情報については、トレースを強制削除できます。

- スパンに手動保持を設定して、それとすべての子スパンを取り込むことを示します。該当するスパンがトレースのルートスパンでない場合、結果として得られるトレースが UI で適切に表示されない可能性があります。

- スパンに手動削除を設定して、子スパンが取り込まれ**ない**ようにします。[エラーサンプラーとレアサンプラー](#error-and-rare-traces)は、Agent で無視されます。

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
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always keep the trace
        span.setTag(DDTags.MANUAL_KEEP, true);
        // method impl follows
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
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always Drop the trace
        span.setTag(DDTags.MANUAL_DROP, true);
        // method impl follows
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
    # Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    # method impl follows
```

手動でトレースを削除:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Drop the Trace
    span.set_tag(MANUAL_DROP_KEY)
    # method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

手動でトレースを保持:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

手動でトレースを削除:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

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
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)
    //method impl follows

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
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

手動でトレースを保持:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

手動でトレースを削除:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)
//method impl follows

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

手動でトレースを保持:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    //method impl follows
}
```

手動でトレースを削除:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always drop this trace
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    //method impl follows
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
    // Always keep this trace
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
    // Always drop this trace
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

コンテキスト伝播の前に手動保持を設定します。コンテキスト伝播の後に設定した場合、複数サービス間でトレース全体が保持されない可能性があります。この決定はトレースクライアントで設定されるため、トレースはサンプリングルールに基づいて Agent により、またはサーバーによりドロップされる可能性があります。


## シングルスパン {#single-spans}
`ingestion_reason: single_span`

特定のスパンをサンプリングする必要があるが、完全なトレースは必要ない場合、SDK では、単一スパンにサンプリングレートを設定することができます。

たとえば、特定のサービスをモニターするために [スパンからのメトリクス][6] を構築する場合、スパンのサンプリングルールを構成することで、サービスを流れるすべてのリクエストのトレースを 100% 取り込む必要がなく、これらのメトリクスが 100% のアプリケーショントラフィックに基づくようにすることができます。

この機能は、Datadog Agent v[7.40.0][19]+ で利用可能です。

**注**: [ヘッドベースサンプリング](#head-based-sampling)によって保持されているスパンをドロップするためにシングルスパンサンプリングルールを使用することは**できません**。ヘッドベースサンプリングによってドロップされる追加のスパンを保持するためにのみ使用できます。

{{< tabs >}}
{{% tab "Java" %}}
SDK の[バージョン 1.7.0][1] 以降、Java アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 50 スパンを 100% 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Java SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /ja/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
バージョン [v1.4.0][1] 以降、Python アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Python SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /ja/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
バージョン [v1.5.0][1] 以降、Ruby アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Ruby SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /ja/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
バージョン [v1.41.0][1] 以降、Go アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
バージョン [v1.60.0][3] 以降、Go アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でリソース別とタグ別の**スパン**サンプリングルールを設定します。

たとえば、リソース `POST /api/create_issue` 用のサービスから、タグ `priority` の値 `high` に対して、`100%` のスパンを収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

サンプリングコントロールについては、[Go SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /ja/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Node.js アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別および操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[Node.js SDK ドキュメント][1] を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
バージョン [v0.77.0][1] 以降、PHP アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリングコントロールについては、[PHP SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /ja/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
バージョン [v0.1.0][1] 以降、C++ アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
バージョン [v2.18.0][1] 以降、.NET アプリケーションの場合、環境変数 `DD_SPAN_SAMPLING_RULES` でサービス名別と操作名別の**スパン**サンプリングルールを設定します。

たとえば、`my-service` という名前のサービスから、`http.request` という操作で、1 秒間に最大 `50` スパンの `100%` を収集するには、次のようにします。

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

サンプリングコントロールについては、[.NET SDK ドキュメント][2] を参照してください。

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><a href="/tracing/legacy_app_analytics/">App Analytics</a> レガシーメカニズムは完全に廃止されました。個々のスパンを取り込む場合には、<strong>シングルスパンサンプリング</strong> (上記参照) を使用します。またはトレース全体を取り込む場合には、<a href="#head-based-sampling">ヘッドベースのサンプリング</a>を使用します。</div>

## 製品の取り込まれたスパン {#product-ingested-spans}

### RUM トレース {#rum-traces}
`ingestion_reason:rum`

Web またはモバイルアプリケーションからリクエストがあると、バックエンドサービスがインスツルメントされるときにトレースが生成されます。[APM と Real User Monitoring のインテグレーション][7] により、Web およびモバイルアプリケーションからのリクエストが対応するバックエンドトレースにリンクされるため、フロントエンドとバックエンドの完全なデータを同時に確認できます。

RUM ブラウザ SDK のバージョン `4.30.0` 以降、`traceSampleRate` 初期化パラメーターの設定により、取り込まれるボリュームを制御し、バックエンドトレースのサンプリングを保持することができます。`traceSampleRate` を、`0` と `100` の間の数値に設定します。
`traceSampleRate` の値が設定されていない場合、ブラウザリクエストからのトレースの 100 %がデフォルトで Datadog に送信されます。

他の SDK でもトレースサンプリングレートを制御できます。

| SDK         | パラメーター             | 最小バージョン    |
|-------------|-----------------------|--------------------|
| ブラウザ     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _サンプリングレートは、[1.13.0][16] 以降、Ingestion Control ページで報告しています。_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _サンプリングレートは、[1.15.0][17] 以降、Ingestion Control ページで報告しています。_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _サンプリングレートは、[1.2.0][18] 以降、Ingestion Control ページで報告しています。_  |

### Synthetic トレース {#synthetic-traces}
`ingestion_reason:synthetics` と `ingestion_reason:synthetics-browser`

HTTP およびブラウザテストにより、バックエンドサービスがインスツルメントされるときにトレースが生成されます。[APM とSynthetic テストインテグレーション][13] により、Synthetic テストと対応するバックエンドトレースがリンクされます。テスト実行が失敗した場合、そのテスト実行によって生成されたトレースを見て問題の根本原因にナビゲートします。

デフォルトでは、Synthetic HTTP テストとブラウザテストの 100% がバックエンドトレースを生成します。

### その他の製品 {#other-products}

いくつかの追加の取り込み理由は、特定の Datadog 製品によって生成されるスパンに起因します。

| 製品    | 取り込み理由                    | 取り込みのメカニズムの説明 |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` と `xray`                   | Datadog SDK または AWS X-Ray インテグレーションでトレースした[サーバーレスアプリケーション][14]から受信したトレース。|
| アプリと API の保護     | `appsec`                            | Datadog SDK から取り込まれ、[AAP][15] によって脅威としてフラグ付けされたトレース。|
| Data Observability: Jobs Monitoring    | `data_jobs`                            | Datadog Java Tracer Spark インテグレーションまたは Databricks インテグレーションから取り込まれたトレース。|

## OpenTelemetry の取り込みメカニズム {#ingestion-mechanisms-in-opentelemetry}
`ingestion_reason:otel`

OpenTelemetry SDK (OpenTelemetry Collector または Datadog Agent を使用) を使用したセットアップに応じて、取り込みサンプリングを制御する複数の方法があります。各種 OpenTelemetry セットアップの OpenTelemetry SDK、OpenTelemetry Collector、および Datadog Agent レベルでのサンプリングに利用できるオプションの詳細については、[OpenTelemetry による取り込みサンプリング][22] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/dd_libraries/
[2]: /ja/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /ja/tracing/glossary/#trace-root-span
[5]: /ja/tracing/trace_pipeline/ingestion_controls/
[6]: /ja/tracing/trace_pipeline/generate_metrics/
[7]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
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
[21]: /ja/tracing/guide/remote_config/
[22]: /ja/opentelemetry/guide/ingestion_sampling_with_opentelemetry
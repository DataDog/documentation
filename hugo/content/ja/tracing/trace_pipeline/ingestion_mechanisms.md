---
aliases:
- /ja/tracing/trace_ingestion/mechanisms
description: トレースのインジェストを制御する SDK および Agent のメカニズムの概要。
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
  text: 'Datadog の大規模最適化: Zendesk におけるコスト効率の高いオブザーバビリティ'
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: ラーニングセンター
  text: APM レート制限と保持
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: アーキテクチャセンター
  text: '分散型トレーシングの習得: データ量の課題と Datadog の効率的なサンプリングへのアプローチ'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: アーキテクチャセンター
  text: '分散型トレーシングの最適化: 予算内で重要なトレースをキャプチャするためのベストプラクティス'
title: インジェストのメカニズム
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="インジェストサンプリングルール" >}}


アプリケーションによって生成されたスパンが Datadog に送信 (_インジェスト_) されるかどうかは、複数のメカニズムによって決定されます。これらのメカニズムの背後のロジックは、[SDK][1] および Datadog Agent にあります。構成に応じて、インスツルメントされたサービスによって生成されたトラフィックのすべてまたは一部がインジェストされます。

インジェストされた各スパンには、このページで説明されているメカニズムのいずれかを参照する固有の**インジェスト理由**があります。[使用量メトリクス][2]の `datadog.estimated_usage.apm.ingested_bytes` と `datadog.estimated_usage.apm.ingested_spans` は、`ingestion_reason` によってタグ付けされています。

[インジェスト理由ダッシュボード][3]を使用して、各インジェスト理由をコンテキスト内で調査し、どの構成オプションに注目すべきかを特定します。

## ヘッドベースのサンプリング {#head-based-sampling}

デフォルトのサンプリングメカニズムは、_ヘッドベースのサンプリング_と呼ばれます。トレースを保持するか破棄するかの決定は、[ルートスパン][4]の開始時に行われ、リクエストコンテキストの一部 (HTTP リクエストヘッダーなど) として他のサービスに伝播されます。

決定がトレースの開始時に行われ、すべての部分に伝達されるため、トレースは全体として保持または破棄されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="ヘッドベースのサンプリング" style="width:100%;" >}}

ヘッドベースのサンプリングのサンプリングレートは、次の 2 か所で設定できます。
- **[Agent](#in-the-agent)** レベル (デフォルト)
- **[SDK](#in-sdks-user-defined-rules)** レベル: SDK のメカニズムは Agent の設定をオーバーライドします。

### Agent の場合 {#in-the-agent}
`ingestion_reason: auto`

Datadog Agent は、トレースのルートに適用するサンプリングレートを SDK に継続的に送信します。Agent は、トラフィックに応じてサービスに分散させ、全体で 1 秒あたり 10 トレースという目標を達成するようにレートを調整します。

たとえば、サービス `A` のトラフィックがサービス `B` より多い場合、Agent は `A` のサンプリングレートを変更して、`A` が 1 秒あたり最大 7 トレースを保持するようにし、同様に `B` のサンプリングレートを調整して、`B` が 1 秒あたり最大 3 トレースを保持するようにすることで、合計で 1 秒あたり 10 トレースになるようにします。

#### リモート構成 {#remote-configuration}

Agent のサンプリングレート構成は、Agent バージョン [7.42.0][20] 以降を使用している場合、リモートで構成可能です。開始するには、[Remote Configuration][21] をセットアップし、[[Ingestion Control] ページ][5]から `ingestion_reason` パラメーターを構成します。Remote Configuration を使用すると、Agent を再起動せずにパラメーターを変更できます。リモートで設定された構成は、環境変数や `datadog.yaml` からの設定を含むローカル構成よりも優先されます。

#### ローカル構成 {#local-configuration}

Agent の 1 秒あたりの目標トレース数を、メイン構成ファイル (`datadog.yaml`) で設定するか、環境変数として設定します。

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**注**:
- Agent で設定された 1 秒あたりのトレースサンプリングレートは、Datadog SDK にのみ適用されます。OpenTelemetry SDK など、他の SDK には影響しません。
- 目標は固定値ではありません。実際には、トラフィックの急増などの要因によって変動します。

Datadog Agent の[自動サンプリングレート](#in-the-agent)によってサンプリングされたトレースのスパンには、インジェスト理由 `auto` がタグ付けされます。`ingestion_reason` タグは、[使用量メトリクス][2]にも設定されます。このデフォルトメカニズムを使用するサービスは、[[Ingestion Control] ページ][5]の [Configuration] (構成) 列で `Automatic` とラベル付けされます。

### SDK の場合: ユーザー定義ルール{#in-sdks-user-defined-rules}
`ingestion_reason: rule`

より詳細な制御を行うには、SDK のサンプリング構成オプションを使用します。
- サービス名またはリソース名ごとに**トレースのルートに適用する特定のサンプリングレート**を設定し、Agent の[デフォルトメカニズム](#in-the-agent)をオーバーライドします。
- 1 秒あたりのインジェストトレース数に**レート制限**を設定します。デフォルトのレート制限は、サービスインスタンスあたり 1 秒間に 100 トレースです。Agent の[デフォルトメカニズム](#in-the-agent)を使用する場合、レートリミッターは無視されます。

**注**: サンプリングルールもヘッドベースのサンプリング制御です。サービスのトラフィックが、構成された 1 秒あたりの最大トレース数を超えると、トレースはルートでドロップされます。不完全なトレースは作成されません。

設定は、環境変数またはコード内で直接行うことができます。

{{< tabs >}}
{{% tab "Java" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a> 以降、Java アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">[Ingestion Control] ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、[リソースベースのサンプリングガイド][1]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**

Java アプリケーションでは、`DD_TRACE_SAMPLING_RULES` 環境変数を使用して、サービスごとおよびリソースごとのサンプリングレートを設定します (リソースベースのサンプリングについてはバージョン [v1.26.0][3] 以降)。

たとえば、サービス `my-service` のリソース `GET /checkout` のトレースを 100% キャプチャし、他のエンドポイントのトレースを 20% キャプチャするには、次のように設定します。

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

サービス名の値は大文字と小文字を区別するため、実際のサービス名の大文字と小文字と一致させる必要があります。

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

**注**: `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。

サンプリング制御の詳細については、[Java SDK のドキュメント][2]を参照してください。

[1]: /ja/tracing/guide/resource_based_sampling
[2]: /ja/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a> 以降、Python アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">[Ingestion Control] ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、[リソースベースのサンプリングガイド][3]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**
Python アプリケーションでは、`DD_TRACE_SAMPLING_RULES` 環境変数を使用して、サービスごとおよびリソースごとのサンプリングレートを設定します (リソースベースのサンプリングについてはバージョン [v2.8.0][1] 以降)。

たとえば、サービス `my-service` のリソース `GET /checkout` のトレースを 100% キャプチャし、他のエンドポイントのトレースを 20% キャプチャするには、次のように設定します。

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

**注**: `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。

サンプリング制御の詳細については、[Python SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /ja/tracing/trace_collection/dd_libraries/python
[3]: /ja/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a> 以降、Ruby アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">[Ingestion Control] ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、[リソースベースのサンプリングガイド][1]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**
Ruby アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使用してライブラリのグローバルサンプリングレートを設定し、`DD_TRACE_SAMPLING_RULES` 環境変数を使用してサービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50%、残りのトレースを 10% 送信するには、次のように設定します。

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリング制御の詳細については、[Ruby SDK のドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a> 以降、Go アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">[Ingestion Control] ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、こちらの[記事][3]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**

Go アプリケーションでは、`DD_TRACE_SAMPLING_RULES` 環境変数を使用して、サービスごとおよびリソースごとのサンプリングレートを設定します (リソースベースのサンプリングについてはバージョン [v1.60.0][2] 以降)。

たとえば、サービス `my-service` のリソース `GET /checkout` のトレースを 100% キャプチャし、他のエンドポイントのトレースを 20% キャプチャするには、次のように設定します。

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

**注**: `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。

サンプリング制御の詳細については、[Go SDK のドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /ja/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a> 以降、Node.js アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">[Ingestion Control] ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、[リソースベースのサンプリングガイド][1]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**

Node.js アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使用してライブラリのグローバルサンプリングレートを設定します。

サービスごとのサンプリングレートを設定することも可能です。たとえば、`my-service` という名前のサービスのトレースを 50%、残りのトレースを 10% 送信するには、次のように設定します。

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

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリング制御の詳細については、[Node.js SDK のドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a> 以降、PHP アプリケーションでは、<a href="https://app.datadoghq.com/apm/traces/ingestion-control">[Ingestion Control] ページ</a>からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、[リソースベースのサンプリングガイド][1]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**

PHP アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使用してライブラリのグローバルサンプリングレートを設定し、`DD_TRACE_SAMPLING_RULES` 環境変数を使用してサービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50%、他のエンドポイントのトレースを 20%、残りのトレースを 10% 送信するには、次のように設定します。

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

サンプリング制御の詳細については、[PHP SDK のドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**リモート構成**

バージョン <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a> 以降、C++ アプリケーションでは、<a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">[Ingestion Control] ページ</a>の UI からサービスごとおよびリソースごとのサンプリングレートを設定します。

サービスごとおよびリソースごとのサンプリングレートをリモートで構成する方法の詳細については、[リソースベースのサンプリングガイド][1]を参照してください。

**注**: リモートで設定された構成は、ローカル構成よりも優先されます。

**ローカル構成**
[v0.1.0][1] 以降、Datadog C++ ライブラリは以下の構成をサポートしています。
- グローバルサンプリングレート: `DD_TRACE_SAMPLE_RATE` 環境変数。
- サービスごとのサンプリングレート: `DD_TRACE_SAMPLING_RULES` 環境変数。
- レート制限設定: `DD_TRACE_RATE_LIMIT` 環境変数。

たとえば、`my-service` という名前のサービスのトレースを 50%、残りのトレースを 10% 送信するには、次のように設定します。

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ は、自動インスツルメンテーションのためのインテグレーションを提供していませんが、Envoy、NGINX、Istio などのプロキシトレーシングで使用されます。プロキシのサンプリング構成方法の詳細については、[プロキシのトレース][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /ja/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab "Rust" %}}
**ローカル構成**

Rust アプリケーションでは、`DD_TRACE_SAMPLING_RULES` 環境変数を使用してサービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50%、残りのトレースを 10% 送信するには、次のように設定します。

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5},{"sample_rate": 0.1}]'
```

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリング制御の詳細については、[Rust SDK のドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/rust
{{% /tab %}}
{{% tab ".NET" %}}
.NET アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使用してライブラリのグローバルサンプリングレートを設定し、`DD_TRACE_SAMPLING_RULES` 環境変数を使用してサービスごとのサンプリングレートを設定します。

たとえば、`my-service` という名前のサービスのトレースを 50%、残りのトレースを 10% 送信するには、次のように設定します。

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

<div class="alert alert-info">バージョン 2.35.0 以降、サービスが実行されている場所で <a href="/remote_configuration">Agent Remote Configuration</a> が有効になっている場合、サービスごとの <code>DD_TRACE_SAMPLE_RATE</code> を <a href="/internal_developer_portal/catalog/">Catalog</a> UI で設定できます。</div>

`DD_TRACE_RATE_LIMIT` 環境変数をサービスインスタンスあたりの最大トレース数/秒に設定して、レート制限を構成します。`DD_TRACE_RATE_LIMIT` 値が設定されていない場合、1 秒あたり 100 トレースの制限が適用されます。

サンプリング制御の詳細については、[.NET SDK のドキュメント][1]を参照してください。\
.NET の環境変数の構成については、[こちら][2]をご覧ください。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**注**: SDK 構成を使用してサンプリングされたトレースのすべてのスパンには、インジェスト理由 `rule` がタグ付けされます。ユーザー定義のサンプリングルールで構成されたサービスは、[[Ingestion Control] ページ][5]の [Configuration] 列で `Configured` とマークされます。

## エラートレースとレアトレース {#error-and-rare-traces}

ヘッドベースのサンプリングで捕捉されなかったトレースについては、2 つの追加の Datadog Agent サンプリングメカニズムにより、本来ならドロップされる重要なトレースや多様なトレースが捕捉されます。これらのサンプラーは、所定のタグセットのすべての組み合わせを捕捉することで、多様なローカルトレース (同じホストからのスパン) のセットを保持します。

- **エラートレース**: エラーサンプリングは、潜在的なシステム障害を可視化します。
- **レアトレース**: レアトレースサンプリングは、トラフィックの少ないサービスやリソースの可視性をシステム全体で維持します。

**注**: [ライブラリサンプリングルール](#in-sdks-user-defined-rules)を設定したサービスでは、エラーサンプラーとレアトレースサンプラーは無視されます。

### エラートレース {#error-traces}
`ingestion_reason: error`

エラーサンプラーは、ヘッドベースのサンプリングで捕捉されなかったエラースパンを含むトレースの一部を、Agent あたり毎秒最大 10 トレースのレートで捕捉します。ヘッドベースのサンプリングのレートが低い場合に、エラーの可視性を維持するのに役立ちます。

Agent バージョン 7.33 以降では、Agent のメイン構成ファイル (`datadog.yaml`) または環境変数でエラーサンプラーを構成できます。

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="エラーサンプリング" style="width:100%;" >}}

**注**:
1. エラーサンプラーを無効にするには、このパラメーターを `0` に設定します。
2. エラーサンプラーは、Agent レベルでローカルのエラートレースを捕捉します。トレースが分散されている場合、トレース全体が Datadog に送信されない可能性があります。
3. SDK ルールや `manual.drop` などのカスタムロジックによってドロップされたスパンは、デフォルトではエラーサンプラーの下で**除外**されます。

#### Datadog Agent 7.42.0 以降 {#datadog-agent-7420-and-higher}

Agent バージョン [7.42.0][20] 以降を使用している場合、エラーサンプリングはリモートで構成可能です。[ドキュメント][21]に従って、Agent でリモート構成を有効にします。リモート構成を使用すると、Datadog Agent を再起動せずに、レアスパンの収集を有効にできます。

#### Datadog Agent 6/7.41.0 以降 {#datadog-agent-67410-and-higher}

SDK ルールや `manual.drop` などのカスタムロジックによってドロップされたスパンがエラーサンプラーによって**含まれる**ようにデフォルトの動作をオーバーライドするには、Datadog Agent (または Kubernetes の Datadog Agent Pod 内の専用 Trace Agent コンテナ) で `DD_APM_FEATURES=error_rare_sample_tracer_drop` を使用してこの機能を有効にします。

#### Datadog Agent 6/7.33 ～ 6/7.40.x {#datadog-agent-6733-to-6740x}

これらの Agent バージョンでは、エラーサンプリングのデフォルト動作を変更することはできません。Datadog Agent を Datadog Agent 6/7.41.0 以降にアップグレードしてください。

### レアトレース {#rare-traces}
`ingestion_reason: rare`

レアサンプラーは、一連のレアスパンを Datadog に送信します。`env`、`service`、`name`、`resource`、`error.type`、および `http.status` の組み合わせが、Agent あたり毎秒最大 5 トレースで捕捉されます。ヘッドベースのサンプリングのレートが低い場合に、トラフィックの少ないリソースの可視性を維持するのに役立ちます。

**注**: レアサンプラーは、Agent レベルでローカルトレースを捕捉します。トレースが分散されている場合、完全なトレースが Datadog に送信される保証はありません。

#### Datadog Agent 7.42.0 以降 {#datadog-agent-7420-and-higher-1}

Agent バージョン [7.42.0][20] 以降を使用している場合、レアサンプリングはリモートで構成可能です。[ドキュメント][21]に従って、Agent でリモート構成を有効にします。リモート構成を使用すると、Datadog Agent を再起動せずにパラメーター値を変更できます。

#### Datadog Agent 6/7.41.0 以降 {#datadog-agent-67410-and-higher-1}

デフォルトでは、レアサンプラーは**有効になっていません**。

**注**: **有効**にした場合、SDK ルールや `manual.drop` などのカスタムロジックによってドロップされたスパンは、このサンプラーの下で**除外**されます。

レアサンプラーを構成するには、Agent のメイン構成ファイル (`datadog.yaml`) で `apm_config.enable_rare_sampler` 設定を更新するか、環境変数 `DD_APM_ENABLE_RARE_SAMPLER` を使用します。

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

SDK ルールや `manual.drop` などのカスタムロジックによってドロップされたスパンを評価するには、Trace Agent で `DD_APM_FEATURES=error_rare_sample_tracer_drop` を使用してこの機能を有効にします。

#### Datadog Agent 6/7.33 ～ 6/7.40.x {#datadog-agent-6733-to-6740x-1}

デフォルトでは、レアサンプラーは有効になっています。

**注**: **有効**にした場合、SDK ルールや `manual.drop` などのカスタムロジックによってドロップされたスパンは、このサンプラーの下で**除外されます**。これらのスパンをこのロジックに含めるには、Datadog Agent 6.41.0/7.41.0 以降にアップグレードしてください。

デフォルトのレアサンプラー設定を変更するには、Agent のメイン構成ファイル (`datadog.yaml`) で `apm_config.disable_rare_sampler` 設定を更新するか、環境変数 `DD_APM_DISABLE_RARE_SAMPLER` を使用します。

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## 強制保持とドロップ{#force-keep-and-drop}
`ingestion_reason: manual`

ヘッドベースのサンプリングメカニズムは、SDK レベルでオーバーライドできます。たとえば、重要なトランザクションを監視する必要がある場合、関連するトレースを強制的に保持させることができます。その一方で、ヘルスチェックなどの不要または反復的な情報については、トレースを強制的にドロップさせることができます。

- スパンに Manual Keep を設定すると、そのスパンとすべての子スパンがインジェストされるようになります。問題のスパンがトレースのルートスパンではない場合、結果として得られるトレースは UI 上で不完全に見えることがあります。

- スパンに Manual Drop を設定すると、**いかなる子スパンも**インジェストされなくなります。[エラーサンプラーとレアサンプラー](#error-and-rare-traces)は、Agent で無視されます。

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,rust" >}}
{{< programming-lang lang="java" >}}

トレースを手動で保持:

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

トレースを手動でドロップ:

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

トレースを手動で保持:

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

トレースを手動でドロップ:

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

トレースを手動で保持:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

トレースを手動でドロップ:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

トレースを手動で保持:

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

トレースを手動でドロップ:

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

トレースを手動で保持:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

トレースを手動でドロップ:

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

トレースを手動で保持:

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

トレースを手動でドロップ:

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


トレースを手動で保持:

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

トレースを手動でドロップ:

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

トレースを手動で保持:

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

トレースを手動でドロップ:

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
{{< programming-lang lang="rust" >}}

<div class="alert alert-info">Rust SDK は OpenTelemetry API を使用しており、Datadog の <code>ManualKeep</code>/<code>ManualDrop</code> タグはサポートしていません。Rust でトレースを強制的に保持またはドロップするには、 <code>sampling.priority</code> <a href="/tracing/trace_collection/custom_instrumentation/rust">カスタムインスツルメンテーション</a>を使用して、ルートスパンに OpenTelemetry 属性を設定してください。</div>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

コンテキスト伝播の前に Manual Keep を設定してください。コンテキスト伝播の後に設定した場合、トレース全体がサービス間で保持されない可能性があります。この決定はトレーシングクライアントで設定されるため、トレースが Agent またはサーバーによってサンプリングルールに基づいてドロップされる可能性があります。


## 単一スパン{#single-spans}
`ingestion_reason: single_span`

特定のスパンをサンプリングする必要があるが、トレース全体は必要ない場合、SDK を使用して単一スパンのサンプリングレートを設定できます。

たとえば、特定のサービスを監視するために[スパンからメトリクス][6]を作成している場合、そのサービスを流れるすべてのリクエストのトレースを 100% インジェストすることなく、それらのメトリクスがアプリケーショントラフィックの 100% に基づくようにスパンサンプリングルールを構成できます。

この機能は、Datadog Agent v[7.40.0][19] 以降で利用可能です。

**注**: 単一スパンサンプリングルールは、[ヘッドベースのサンプリング](#head-based-sampling)によって保持されるスパンを**ドロップすることはできません**。ヘッドベースのサンプリングによってドロップされた追加のスパンを保持するためにのみ使用できます。

{{< tabs >}}
{{% tab "Java" %}}
SDK [バージョン 1.7.0][1] 以降、Java アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 50 スパンで 100% 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリング制御の詳細については、[Java SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /ja/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
バージョン [v1.4.0][1] 以降、Python アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリング制御の詳細については、[Python SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /ja/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
バージョン [v1.5.0][1] 以降、Ruby アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリング制御の詳細については、[Ruby SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /ja/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
バージョン [v1.41.0][1] 以降、Go アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
バージョン [v1.60.0][3] 以降、Go アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してリソースごとおよびタグごとの**スパン**サンプリングルールを設定します。

たとえば、タグ `priority` の値が `high` であるリソース `POST /api/create_issue` のスパンをサービスから `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

サンプリング制御の詳細については、[Go SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /ja/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Node.js アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリング制御の詳細については、[Node.js SDK のドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
バージョン [v0.77.0][1] 以降、PHP アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

サンプリング制御の詳細については、[PHP SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /ja/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
バージョン [v0.1.0][1] 以降、C++ アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab "Rust" %}}
Rust アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
{{% /tab %}}
{{% tab ".NET" %}}
バージョン [v2.18.0][1] 以降、.NET アプリケーションでは、`DD_SPAN_SAMPLING_RULES` 環境変数を使用してサービスごとおよび操作名ごとの**スパン**サンプリングルールを設定します。

たとえば、`my-service` というサービスから操作 `http.request` のスパンを 1 秒あたり最大 `50` スパンで `100%` 収集するには、次のようにします。

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

サンプリング制御の詳細については、[.NET SDK のドキュメント][2]を参照してください。

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">レガシー <a href="/tracing/legacy_app_analytics/">App Analytics</a> メカニズムは完全に非推奨となりました。個々のスパンをインジェストするには<strong>単一スパンサンプリング</strong> (上記参照) を使用し、完全なトレースをインジェストするには<a href="#head-based-sampling">ヘッドベースのサンプリング</a>を使用してください。</div>

## 製品からインジェストされるスパン {#product-ingested-spans}

### RUM トレース {#rum-traces}
`ingestion_reason:rum`

Web アプリケーションやモバイルアプリケーションからのリクエストは、バックエンドサービスがインスツルメントされている場合にトレースを生成します。[APM と Real User Monitoring のインテグレーション][7]により、Web アプリケーションやモバイルアプリケーションのリクエストとそれに対応するバックエンドトレースがリンクされるため、フロントエンドとバックエンドの全データを一元的に確認できます。

RUM Browser SDK のバージョン `4.30.0` 以降では、`traceSampleRate` 初期化パラメーターを構成することで、インジェストされるボリュームを制御して、バックエンドトレースのサンプリングを保持できます。`traceSampleRate` を `0` から `100` の間の数値に設定します。
`traceSampleRate` 値が設定されていない場合、ブラウザリクエストからのトレースの 100% がデフォルトで Datadog に送信されます。

他の SDK でもトレースサンプリングレートを制御できます。

| SDK         | パラメーター             | 最小バージョン    |
|-------------|-----------------------|--------------------|
| Browser     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _サンプリングレートが [Ingestion Control] ページで報告されるのは [1.13.0][16] 以降_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _サンプリングレートが [Ingestion Control] ページで報告されるのは [1.15.0][17] 以降_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _サンプリングレートが [Ingestion Control] ページで報告されるのは [1.2.0][18] 以降_  |

### Synthetic トレース {#synthetic-traces}
`ingestion_reason:synthetics` および `ingestion_reason:synthetics-browser`

HTTP テストおよびブラウザテストは、バックエンドサービスがインスツルメントされている場合にトレースを生成します。[APM と Synthetic Testing のインテグレーション][13]により、Synthetic テストとそれに対応するバックエンドトレースがリンクされます。失敗したテスト実行から問題の根本原因に移動するには、そのテスト実行によって生成されたトレースを確認します。

デフォルトでは、Synthetic HTTP テストおよびブラウザテストの 100% がバックエンドトレースを生成します。

### その他の製品 {#other-products}

特定の Datadog 製品によって生成されるスパンに、追加のインジェスト理由が割り当てられることがあります。

| 製品    | インジェスト理由                    | インジェストメカニズムの説明 |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` および `xray`                   | Datadog SDK または AWS X-Ray インテグレーションを使用してトレースされた [Serverless アプリケーション][14]から受信したトレース。|
| App and API Protection     | `appsec`                            | Datadog SDK からインジェストされ、[AAP][15] によって脅威としてフラグが立てられたトレース。|
| Data Observability: Jobs Monitoring    | `data_jobs`                            | Datadog Java Tracer Spark インテグレーションまたは Databricks インテグレーションからインジェストされたトレース。|

## OpenTelemetry のインジェストメカニズム {#ingestion-mechanisms-in-opentelemetry}
`ingestion_reason:otel`

OpenTelemetry SDK の設定 (OpenTelemetry Collector または Datadog Agent を使用) に応じて、インジェストサンプリングを制御する方法が複数あります。さまざまな OpenTelemetry 設定で OpenTelemetry SDK、OpenTelemetry Collector、および Datadog Agent のレベルのサンプリングに使用可能なオプションの詳細については、[Ingestion Sampling with OpenTelemetry][22] を参照してください。

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
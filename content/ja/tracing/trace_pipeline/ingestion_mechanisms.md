---
aliases:
- /ja/tracing/trace_ingestion/mechanisms
description: トレース取り込みを制御するトレーサーと Agent のメカニズムの概要。
further_reading:
- link: /tracing/trace_ingestion/ingestion_controls/
  tag: ドキュメント
  text: Ingestion Controls
- link: /tracing/trace_retention/
  tag: ドキュメント
  text: トレースの保持
- link: /tracing/trace_ingestion/usage_metrics/
  tag: ドキュメント
  text: 使用量メトリクス
kind: documentation
title: 取り込みのメカニズム
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="取り込みサンプリングルール" >}}


アプリケーションで生成されたスパンを Datadog に送信する (_取り込む_) かどうかは、複数のメカニズムによって決定されます。これらのメカニズムの背後にあるロジックは、[トレーシングライブラリ][1]と Datadog Agent の中にあります。構成によっては、インスツルメントされたサービスによって生成されたトラフィックの全てまたは一部が取り込まれます。

取り込まれた各スパンには、このページで説明されているメカニズムのいずれかを参照する一意の**取り込み理由**が付加されています。[使用量メトリクス][2]`datadog.estimated_usage.apm.ingested_bytes` と `datadog.estimated_usage.apm.ingested_spans` は `ingestion_reason` によってタグ付けされています。

[取り込み理由ダッシュボード][3]を使って、それぞれの取り込み理由を確認することができます。各メカニズムに起因するボリュームの概要を把握し、どの構成オプションに焦点を当てるべきかを迅速に知ることができます。

## ヘッドベースサンプリング

デフォルトのサンプリングメカニズムは_ヘッドベースサンプリング_と呼ばれています。トレースを維持するか削除するかの決定は、トレースの一番最初、[ルートスパン][4]の開始時に行われます。この決定は、HTTP リクエストヘッダーなどのリクエストコンテキストの一部として、他のサービスに伝搬されます。

この判断はトレースの最初に行われ、その後トレースのすべての部分に伝えられるため、トレースは全体として保持または削除されることが保証されます。

ヘッドベースサンプリングのサンプリングレートは、以下の 2 か所で設定できます。
- **[Agent](#in-the-agent)** レベル (デフォルト)
- [トレースライブラリ](#in-tracing-libraries-user-defined-rules)**レベル: 任意のトレースライブラリのメカニズムが Agent の設定をオーバーライドします。

### Agent で
`ingestion_reason: auto`

Datadog Agent は、トレーシングライブラリにサンプリングレートを継続的に送信し、トレースのルートで適用させます。Agent は、1 秒間に 10 個のトレースを目標にレートを調整し、トラフィックに応じて各サービスに分配します。

例えば、サービス `A` が `B` よりもトラフィックが多い場合、Agent は `A` のサンプリングレートを変化させて、`A` が 1 秒間に 7 つ以上のトレースを保持しないようにし、同様に `B` のサンプリングレートを調整して `B` が 1 秒間に 3 つのトレース、合計 1 秒間に 10 個以上のトレースを保持しないようにします。

Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数に、Agent の目標の 1 秒あたりのトレースを設定します。
```
@param max_traces_per_second - 整数 - オプション - デフォルト: 10
@env DD_APM_MAX_TPS - 整数 - オプション - デフォルト: 10
```

**注**: Agent で設定した traces-per-second サンプリングレートは、Datadog トレースライブラリにのみ適用されます。OpenTelemetry SDK など他のトレースライブラリには影響を与えません。

Datadog Agent の[自動計算されたサンプリングレート](#in-the-agent)を使ってサンプリングされたトレースの全てのスパンには、取り込み理由 `auto` のタグが付けられています。 `ingestion_reason` タグは、[使用量メトリクス][2]にも設定されています。Datadog Agent のデフォルトのメカニズムを使用するサービスは、[Ingestion Control Page][5] の Configuration の列で `Automatic` とラベル付けされます。

### トレーシングライブラリ: ユーザー定義のルール
`ingestion_reason: rule`

よりきめ細かい制御を行うには、トレースライブラリのサンプリング構成オプションを使用します。
- Agent の[デフォルトメカニズム](#in-the-agent)をオーバーライドし、ライブラリの**すべてのルートサービスに適用する特定のサンプリングレート**を設定します。
- 特定のルートサービスまたは特定のスパン操作名に対して**適用するサンプリングレート**を設定します。
- 1 秒間に取り込まれるトレース数の**レートリミット**を設定します。デフォルトのレートリミットは、サービスインスタンスあたり 1 秒あたり 100 トレースです (Agent [デフォルトメカニズム](#in-the-agent)を使用している場合、レートリミッターは無視されます)。

**注**: これらのルールは、ヘッドベースサンプリング制御でもあります。あるサービスのトラフィックが構成された最大トレース数/秒より大きい場合、トレースはルートでドロップされます。不完全なトレースを作成することはありません。

構成は、環境変数で設定するか、コードで直接設定することができます。

{{< tabs >}}
{{% tab "Java" %}}
Java アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_SERVICE_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースの 20% を送信するには

```
# システムプロパティを使用する
java -Ddd.trace.sampling.service.rules=my-service:0.2 -javaagent:dd-java-agent.jar -jar my-app.jar

# 環境変数を使用する
export DD_TRACE_SAMPLING_SERVICE_RULES=my-service:0.2
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[Java トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/java
{{% /tab %}}
{{% tab "Python" %}}
Python アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.5}]
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[Python トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/python
{{% /tab %}}
{{% tab "Ruby" %}}
Ruby アプリケーションの場合は、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。

また、サービスごとにサンプリングレートを構成することも可能です。例えば、`my-service` という名前のサービスのトレースの 20% を送信するには

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.sampler = Datadog::Tracing::Sampling::PrioritySampler.new(
    post_sampler: Datadog::Tracing::Sampling::RuleSampler.new(
      [
        # 20.00% ですべての 'my-service' トレースをサンプリングします。
        Datadog::Tracing::Sampling::SimpleRule.new(service: 'my-service', sample_rate: 0.2000)
      ]
    )
  )
end
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[Ruby トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
Go アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[Go トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/go
{{% /tab %}}
{{% tab "NodeJS" %}}
Node.js アプリケーションの場合は、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。

また、サービス別のサンプリングレートを設定することもできます。例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```javascript
tracer.init({
  ingestion:
    sampler: {
      sampleRate: 0.1,
      rules: [
        { sampleRate: 0.5, service: 'my-service' }
      ]
    }
  }
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[NodeJS トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
PHP アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

サンプリングコントロールについては、[PHP トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/php
{{% /tab %}}
{{% tab "C++" %}}
バージョン `1.3.2` からは、Datadog C++ ライブラリは以下の構成をサポートしています。
- グローバルサンプリングレート: 環境変数 `DD_TRACE_SAMPLE_RATE`
- サービス別のサンプリングレート: 環境変数 `DD_TRACE_SAMPLING_RULES`
- レートリミットの設定: 環境変数 `DD_TRACE_RATE_LIMIT`

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

C++ では、すぐに使えるインスツルメンテーションのインテグレーションは提供されていませんが、Envoy、Nginx、Istio などのプロキシトレーシングで利用されています。プロキシに対するサンプリングの構成方法については、[プロキシのトレース][1]で詳しく説明しています。

[1]: /ja/tracing/setup_overview/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
.NET アプリケーションでは、`DD_TRACE_SAMPLE_RATE` 環境変数を使って、ライブラリのグローバルサンプリングレートを設定します。環境変数 `DD_TRACE_SAMPLING_RULES` を使って、サービスごとのサンプリングレートを設定します。

例えば、`my-service` という名前のサービスのトレースを 50% 送信し、残りのトレースを 10% 送信するには

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

環境変数 `DD_TRACE_RATE_LIMIT` に、サービスインスタンスごとの秒あたりのトレース数を設定して、レートリミットを構成します。`DD_TRACE_RATE_LIMIT` の値が設定されていない場合、1 秒あたり 100 のトレース制限が適用されます。

サンプリングコントロールについては、[.NET トレースライブラリドキュメント][1]を参照してください。

[1]: /ja/tracing/setup_overview/setup/dotnet-core
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

**注**: エラーサンプラーを無効にするには、このパラメーターを `0` に設定します。

**注**: エラーサンプラーは、Agent レベルのエラースパンを持つローカルトレースをキャプチャします。トレースが分散されている場合、完全なトレースが Datadog に送信されることを保証する方法はありません。


### レアトレース
`ingestion_reason: rare`

レアサンプラーは、Datadog にレアスパンのセットを送信します。これは、`env`、`service`、`name`、`resource`、`error.type`、`http.status` の組み合わせを最大で毎秒 5 トレース (Agent 毎) 捕捉することができます。ヘッドベースのサンプリングレートが低い場合に、低トラフィックのリソースを確実に可視化することができます。

Agent バージョン 7.33 以降では、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数でレアサンプラーを無効にすることが可能です。

```
@params apm_config.disable_rare_sampler - ブール値 - オプション - デフォルト: false
@env DD_APM_DISABLE_RARE_SAMPLER - ブール値 - オプション - デフォルト: false
```

**注**: レアサンプラーは、Agent レベルのローカルトレースをキャプチャします。トレースが分散されている場合、完全なトレースが Datadog に送信されることを保証する方法はありません。

## 強制維持と削除
`ingestion_reason: manual`

ヘッドベースのサンプリングメカニズムは、トレーシングライブラリレベルでオーバーライドすることができます。例えば、クリティカルなトランザクションを監視する必要がある場合、関連するトレースを強制的に保持させることができます。一方、ヘルスチェックのような不要または反復的な情報については、トレースを強制的に削除することができます。

- スパンに `ManualKeep` を設定して、そのスパンとすべての子スパンを取り込むように指示します。問題のスパンがトレースのルートスパンでない場合、結果のトレースは UI で不完全に表示されることがあります。
```
// dd-trace-go で
span.SetTag(ext.ManualKeep, true)
```
- ManualDrop を設定して、子スパンが**取り込まれない**ようにします。[エラーとレアサンプラー](#error-and-rare-traces)は Agent では無視されます。
```
span.SetTag(ext.ManualDrop, true)
```

## シングルスパン (App Analytics)
`ingestion_reason: analytic`

<div class="alert alert-warning">
2020 年 10 月 20 日、App Analytics は Tracing without Limits に置き換わりました。これは、レガシーの App Analytics に関連する構成情報を持つ非推奨のメカニズムです。代わりに、新しい構成オプションの<a href="#head-based-sampling">ヘッドベースサンプリング</a>を使用して、データ取り込みを完全に制御します。
</div>

特定のスパンをサンプリングする必要があるが、トレース全体を利用する必要がない場合、トレーサーでは、単一のスパンに対してサンプリングレートを構成することが可能です。このスパンは、包含するトレースが削除された場合でも、構成されたレートを下回ることなく取り込まれます。

### トレーシングライブラリで

分析メカニズムを使用するには、環境変数またはコード内のいずれかで有効にします。また、すべての `analytics_enabled` スパンに適用されるサンプリングレートを定義します。

{{< tabs >}}
{{% tab "環境変数" %}}

```
@env  DD_TRACE_ANALYTICS_ENABLED - ブール値 - オプションの false
```
{{% /tab %}}
{{% tab "Code API" %}}

```
// dd-trace-go で
// デフォルトで analytics_enabled を設定
tracerconfig.WithAnalytics(on bool)
// すべての analytics_enabled スパンに適用される生のサンプリングレートを設定
tracerconfig.SetAnalyticsRate(0.4)
```

{{% /tab %}}
{{< /tabs >}}

任意のシングルスパンに `analytics_enabled:true` のタグを付けます。さらに、そのスパンに関連付けるサンプリングレートを指定します。
```
// dd-trace-go で
// スパン analytics_enabled を作成
span.SetTag(ext.AnalyticsEvent, true)
// 0.5 のレートでスパン analytics_enabled を作成
s := tracer.StartSpan("redis.cmd", AnalyticsRate(0.5))
```

### Agent で

Agent では、追加のレートリミッターが 200 スパン/秒に設定されています。この制限に達した場合、一部のスパンは削除され、Datadog に転送されません。

Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数でレートを設定します。
```
@param max_events_per_second - 整数 - オプションの 200
@env DD_APM_MAX_EPS - 整数 - オプションの 200
```

## 製品の取り込まれたスパン

### RUM トレース
`ingestion_reason:rum`

Web アプリケーションやモバイルアプリケーションからのリクエストは、バックエンドサービスがインスツルメントされたときにトレースを生成します。[APM とリアルユーザーモニタリングのインテグレーション][6]は、Web やモバイルアプリケーションのリクエストを対応するバックエンドトレースにリンクし、フロントエンドとバックエンドの全データを 1 つのレンズで見ることができるようにします。

RUM ブラウザ SDK のバージョン `4.10.0` からは、`tracingSampleRate` という初期化パラメーターを設定することで、取り込み量を制御し、バックエンドのトレースのサンプリングを保持することができます。 `tracingSampleRate` には `0` から `100` の間の数値を設定します。
もし `tracingSampleRate` の値が設定されていない場合は、デフォルトでブラウザのリクエストから来るトレースの 100% が Datadog に送信されます。

同様に、他の SDK でも同様のパラメーターでトレースサンプリングレートを制御してください。

| SDK         | パラメーター             | 最小バージョン   |
|-------------|-----------------------|-------------------|
| Browser     | `tracingSampleRate`   | [v4.10.0][7]      |
| iOS         | `tracingSamplingRate` | [1.11.0][8]       |
| Android     | `traceSamplingRate`   | [1.13.0][9]       |
| Flutter     | `tracingSamplingRate` | [1.0.0-beta.2][10] |
| React Native | `tracingSamplingRate` | [1.0.0-rc6][11]   |

### Synthetic トレース
`ingestion_reason:synthetics` と `ingestion_reason:synthetics-browser`

HTTP テストとブラウザテストは、バックエンドサービスがインストルメントされたときに、トレースを生成します。[Synthetic テストと APM のインテグレーション][12]は、 Synthetic テストを対応するバックエンドのトレースとリンクさせます。失敗したテストの実行から、そのテストの実行によって生成されたトレースを見ることで、問題の根本的な原因を突き止めることができます。

デフォルトでは、Synthetic HTTP テストとブラウザテストの 100% がバックエンドトレースを生成します。

### その他の製品

いくつかの追加の取り込み理由は、特定の Datadog 製品によって生成されるスパンに起因します。

| 製品    | 取り込み理由                    | 取り込みのメカニズムの説明 |
|------------|-------------------------------------|---------------------------------|
| サーバーレス | `lambda` と `xray`                   | Datadog トレーシングライブラリまたは AWS X-Ray インテグレーションでトレースした[サーバーレスアプリケーション][13]から受信したトレース。 |
| アプリケーション セキュリティ モニタリング     | `appsec`                            | Datadog トレーシングライブラリから取り込まれたトレースで、[ASM][14] によって脅威としてフラグが立てられたもの。 |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/setup/
[2]: /ja/tracing/trace_ingestion/usage_metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /ja/tracing/visualization/#trace-root-span
[5]: /ja/tracing/trace_ingestion/control_page
[6]: /ja/real_user_monitoring/connect_rum_and_traces/
[7]: https://github.com/DataDog/browser-sdk/releases/tag/v4.10.0
[8]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[9]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[10]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_tracking_http_client%2Fv1.0.0-beta.2
[11]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0-rc6
[12]: /ja/synthetics/apm/
[13]: /ja/serverless/distributed_tracing/
[14]: /ja/security_platform/application_security/
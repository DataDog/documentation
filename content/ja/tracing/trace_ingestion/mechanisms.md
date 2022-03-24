---
title: 取り込みのメカニズム
kind: documentation
description: トレース取り込みを制御するトレーサーと Agent のメカニズムの概要。
further_reading:
  - link: /tracing/trace_ingestion/ingestion_controls/
    tag: ドキュメント
    text: Ingestion Controls
  - link: /tracing/trace_retention/
    tag: ドキュメント
    text: トレースの保持
  - link: /tracing/trace_retention/usage_metrics/
    tag: ドキュメント
    text: 使用量メトリクス
---
アプリケーションで生成されたスパンを Datadog に送信する (_取り込む_) かどうかは、複数のメカニズムによって決定されます。これらのメカニズムの背後にあるロジックは、[トレーシングライブラリ][1]と Datadog Agent の中にあります。構成によっては、インスツルメントされたサービスによって生成されたトラフィックの全てまたは一部が取り込まれます。

取り込まれた各スパンには、このページで説明されているメカニズムのいずれかを参照する一意の**取り込み理由**が付加されています。使用量メトリクス `datadog.estimated_usage.apm.ingested_bytes` と `datadog.estimated_usage.apm.ingested_spans` は `ingestion_reason` によってタグ付けされています。

## ヘッドベースのデフォルトメカニズム
`ingestion_reason: auto`

デフォルトのサンプリングメカニズムは_ヘッドベースサンプリング_と呼ばれています。トレースを維持するか削除するかの決定は、トレースの一番最初、[ルートスパン][2]の開始時に行われます。この決定は、HTTP リクエストヘッダーなどのリクエストコンテキストの一部として、他のサービスに伝搬されます。

この判断はトレースの最初に行われ、その後トレースのすべての部分に伝えられるため、トレースは全体として保持または削除されることが保証されます。

### Agent で

Datadog Agent は、トレーシングライブラリにサンプリングレートを継続的に送信し、トレースのルートで適用させます。Agent は、1 秒間に 10 個のトレースを目標にレートを調整し、トラフィックに応じて各サービスに分配します。

例えば、サービス `A` が `B` よりもトラフィックが多い場合、Agent は `A` のサンプリングレートを変化させて、`A` が 1 秒間に 7 つ以上のトレースを保持しないようにし、同様に `B` のサンプリングレートを調整して `B` が 1 秒間に 3 つのトレース、合計 1 秒間に 10 個以上のトレースを保持しないようにします。

Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数に、Agent の目標の 1 秒あたりのトレースを設定します。
```
@param max_traces_per_second - 整数 - オプション - デフォルト: 10
@env DD_APM_MAX_TPS - 整数 - オプション - デフォルト: 10
```

### トレーシングライブラリ: ユーザー定義のルール
`ingestion_reason: rule`

ライブラリレベルでは、より具体的なサンプリング構成が可能です。
- Agent の[デフォルトメカニズム](#head-based-default-mechanism)をオーバーライドし、すべてのルートサービスに適用する特定のサンプリングレートを設定します。
- 特定のルートサービスのサンプリングレートを設定します。
- 1 秒間に取り込まれるトレース数の上限を設定します。

**注**: これらのルールは、ヘッドベースサンプリングメカニズムにも従っています。あるサービスのトラフィックが構成された最大トレース数/秒より大きい場合、トレースはルートでドロップされます。不完全なトレースを作成することはありません。

構成は、環境変数で設定するか、コードで直接設定することができます。

{{< tabs >}}
{{% tab "環境変数" %}}

```
@env  DD_TRACE_SAMPLE_RATE - 整数 - オプションの null (デフォルトは Agent のデフォルトフィードバックループ)
@env DD_TRACE_SAMPLING_RULES - 整数 - オプションの null
@env  DD_TRACE_RATE_LIMIT - 整数 - オプションの 100 (Agent のデフォルトメカニズムを使用する場合、レートリミッターは無視されます)
```

{{% /tab %}}
{{% tab "Code API" %}}

以下の Python の例では、全トレースの 10% をサンプリングし、1 秒間に 100 トレースのレート制限をかけ、特定のサービスのサンプリングレートをオーバーライドしています。
```
# in dd-trace-py
tracer.configure(sampler=DatadogSampler(
    default_sample_rate=0.10, # トレースの 10% を保持
    rate_limit=100, #ただし、1 秒あたり最大 100 トレース
    rules=[
      # 「my-service」のサンプリングは 100% だが、全体のトレース数は 100/秒に制限されている
      SamplingRule(sample_rate=1.0, service=’my-service’),
    ],
)
```

{{% /tab %}}
{{< /tabs >}}

取り込みの構成については、[トレーシングライブラリ][1]のドキュメントを参照してください。

**注**: ユーザー定義ルールで構成されたサービスは、[Ingestion Control Page][3] Configuration 列に `Configured` と表示されます。デフォルトのメカニズムを使用するように構成されたサービスは、`Automatic` と表示されます。

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
2020 年 10 月 20 日、App Analytics は Tracing without Limits に置き換わりました。これは、レガシーの App Analytics に関連する構成情報を持つ非推奨のメカニズムです。代わりに、新しい構成オプションの<a href="#head-based-default-mechanism">ヘッドベースサンプリング</a>を使用して、データ取り込みを完全に制御します。
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

## エラーとレアトレース

ヘッドベースサンプリングで捕捉できなかったトレースについては、Agent メカニズムにより、重要かつ多様なトレースが保持され、取り込まれるようにします。この 2 つのサンプラーは、あらかじめ決められたタグの組み合わせをすべてキャッチすることで、多様なトレースセットを保持します。

- **Error traces**: サンプリングエラーは、システムの潜在的な不具合を可視化するために重要です。
- **Rare traces**: レアトレースをサンプリングすることで、トラフィックの少ないサービスやリソースを確実に監視し、システム全体の可視性を維持することができます。


### エラートレース
`ingestion_reason: error`

エラーサンプラーは、ヘッドベースのサンプリングでは捕捉できないエラースパンを含むトレースの断片を捕捉します。`service`、`name`、`resource`、`http.status`、`error.type` のすべての組み合わせを捕捉するように 10 トレース/秒のレートを分散させます。

Agent バージョン 7.33 以降では、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数でエラーサンプラーを構成することが可能です。
```
@param errors_per_second - 整数 - オプション - デフォルト: 10
@env DD_APM_ERROR_TPS - 整数 - オプション - デフォルト: 10
```

**注**: エラーサンプラーを無効にするには、このパラメーターを `0` に設定します。

### レアトレース
`ingestion_reason: rare`

レアサンプラーは、レアスパンのセットを Datadog に送信します。レアサンプリングは、`env`、`service`、`name`、`resource`、`error.type`、`http.status` の組み合わせをキャッチするために、分散レートにもなっています。レアトレースのデフォルトのサンプリングレートは、1 秒間に 5 個のトレースです。

Agent バージョン 7.33 以降では、Agent のメインコンフィギュレーションファイル (`datadog.yaml`) または環境変数でレアサンプラーを無効にすることが可能です。

```
@params apm_config.disable_rare_sample - ブール値 - オプション - デフォルト: false
@env DD_APM_DISABLE_RARE_SAMPLER - ブール値 - オプション - デフォルト: false
```

**注**: このメカニズムは、ヘッドベースのサンプリングの下流で発生するため、サンプリングされたレアトレースは不完全になる可能性があります。Agent がトレーシングライブラリから完全なトレースを受信することを保証する方法はありません。

## 製品の取り込まれたスパン

いくつかの追加の取り込み理由は、特定の Datadog 製品によって生成されるスパンに起因します。

| 製品    | `ingestion_reason`                    |
|------------|-------------------------------------|
| Synthetic モニタリング | `synthetics` と `synthetics-browser` |
| リアルユーザーモニタリング (RUM)        | `RUM`                               |
| サーバーレス | `lambda` と `xray`                   |
| アプリケーションセキュリティ     | `appsec`                            |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/setup/
[2]: /ja/tracing/visualization/#trace-root-span
[3]: /ja/tracing/trace_ingestion/control_page
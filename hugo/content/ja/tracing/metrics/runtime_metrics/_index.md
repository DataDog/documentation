---
aliases:
- /ja/tracing/advanced/runtime_metrics/
- /ja/tracing/metrics/runtime_metrics/dotnet
- /ja/tracing/metrics/runtime_metrics/java
- /ja/tracing/metrics/runtime_metrics/nodejs
- /ja/tracing/metrics/runtime_metrics/python
- /ja/tracing/metrics/runtime_metrics/ruby
- /ja/tracing/runtime_metrics/dotnet
- /ja/tracing/runtime_metrics/java
- /ja/tracing/runtime_metrics/nodejs
- /ja/tracing/runtime_metrics/python
- /ja/tracing/runtime_metrics/ruby
description: アプリケーションのパフォーマンスに関する追加情報を、トレースに紐づくランタイムメトリクスと共に取得します。
further_reading:
- link: /opentelemetry/integrations/runtime_metrics/
  tag: よくあるご質問
  text: OpenTelemetry ランタイムメトリクス
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: よくあるご質問
  text: ログとトレースの相関
- link: tracing/trace_collection/custom_instrumentation
  tag: よくあるご質問
  text: アプリケーションを手動でインスツルメントしてトレースを作成する
- link: tracing/glossary/
  tag: よくあるご質問
  text: サービス、リソース、トレースの調査
title: ランタイムメトリクス
---
## 概要 {#overview}

ランタイムメトリクスは、アプリケーションのメモリ使用量、ガーベジコレクション、並列処理をモニターします。Datadog SDK は、サポートされている環境のこれらのメトリクスを自動的に収集し、Datadog Agent に送信します。

これらのメトリクスは、ボトルネックを特定し、パフォーマンスの問題をトラブルシューティングし、リソースの利用を最適化する上で役立ちます。ランタイムメトリクスがトレースやログと共に表示されるため、アプリケーションの健全性とパフォーマンスを包括的に把握できます。

アプリケーションを Datadog のトレースライブラリではなく OpenTelemetry で計測する場合は、設定の手順について [OpenTelemetry ランタイムメトリクス][10] を参照してください。

## 互換性 {#compatibility}

ランタイムメトリクスは、いくつかのプログラミング言語とランタイムで利用可能ですが、サポートレベルと構成オプションは異なります。

{{< tabs >}}
{{% tab "Java" %}}

- **デフォルトで有効**: はい
- **ライブラリバージョン**: 0.29.0 以降
- **ランタイム**: Java 8 以降

<div class="alert alert-danger">AWS Lambda 環境では JMX メトリクスの収集はサポートされていません。</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **デフォルトで有効**: いいえ
  - **ライブラリバージョン**: 0.30.0 以降
  - **サポートレベル**: プレビュー
  - **ランタイム**: サポート対象のすべての Python バージョン

{{% /tab %}}

{{% tab "Ruby" %}}

  - **デフォルトで有効**: いいえ
  - **ライブラリバージョン**: 0.44.0 以降
  - **ランタイム**: サポート対象のすべての Ruby バージョン


<div class="alert alert-info">アプリケーションに <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> gem を追加する必要があります。</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **デフォルトで有効**: いいえ
  - **ライブラリバージョン**: 1.18.0 以降
  - **ランタイム**: サポート対象のすべての Go バージョン

{{% /tab %}}

{{% tab "Node.js" %}}

  - **デフォルトで有効**: いいえ
  - **ライブラリバージョン**: 3.0.0 以降
  - **ランタイム**: サポート対象のすべての Node.js バージョン

{{% /tab %}}

{{% tab ".NET" %}}

  - **デフォルトで有効**: はい。.NET 6 以降 (v3.40.0 以降) で有効です。
  - **ライブラリバージョン**: 1.23.0 以降
  - **ランタイム**: .NET Framework 4.6.1 以降および .NET Core 3.1 以降 (.NET 5 およびそれ以降を含む)。

#### Internet Information Services (IIS) のアクセス許可 (.NET Framework のみ) {#permissions-for-internet-information-services-iis-net-framework-only}

.NET Framework では、メトリクスはパフォーマンスカウンターを使用して収集されます。非対話型ログオンセッションのユーザー (IIS アプリケーションプールアカウントと一部のサービスアカウントを含む) は、カウンターデータにアクセスするために **Performance Monitoring Users** グループに追加する必要があります。

IIS アプリケーションプールは、ユーザーリストに表示されない特別なアカウントを使用します。そのアカウントを Performance Monitoring Users グループに追加するには、`IIS APPPOOL\<name of the pool>` を探します。たとえば、DefaultAppPool のユーザーは `IIS APPPOOL\DefaultAppPool` になります。

これは、"Computer Management" UI から、または管理者コマンドプロンプトから実行できます。

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-danger">PHP のランタイムメトリクスは、サポート対象外です。</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class="alert alert-danger">C++ のランタイムメトリクスはサポート対象外です。</div>

{{% /tab %}}
{{< /tabs >}}

## セットアップ手順 {#setup-instructions}

ランタイムメトリクスをセットアップするには、Datadog Agent とユーザーのアプリケーションの両方を構成する必要があります。

### 1. Datadog Agent を構成する {#1-configure-the-datadog-agent}

[Agent 用の DogStatsD][2] を有効化します。デフォルトでは、Datadog Agent はポート `8125` を介して UDP を使用してメトリクスを取り込むように構成されています。

{{% collapse-content title="コンテナ固有の構成" level="h4" expanded=false %}}

Agent をコンテナ化環境で実行する場合、追加の構成が必要です。

1. DogStatsD の非ローカルトラフィックが有効になっていることを確認してください。この設定はデフォルトで有効になっています。過去に無効化した場合は、メインの [`datadog.yaml` 構成ファイル][8] で `dogstatsd_non_local_traffic: true` を設定するか、[環境変数][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` を設定します。
2. 以下のコンテナ固有のセットアップ手順に従ってください。

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2" >}}

3. Datadog Agent で`DD_SITE` を設定します。 {{< region-param key="dd_site" code="true" >}} Datadog Agent が確実に正しい Datadog の場所にデータを送信するためです。

{{< /site-region >}}

{{% /collapse-content %}}

### 2. ユーザーのアプリケーションを構成する {#2-configure-your-application}

環境変数を使用してユーザーのアプリケーションのランタイムメトリクスを構成します。一部の言語では、ランタイムメトリクスを[コードで直接に](#code-based-configuration)構成することもサポートされています。

#### 環境変数 {#environment-variables}

ユーザーのアプリケーション内のランタイムメトリクスを設定するために、以下の環境変数を使用してください。

`DD_RUNTIME_METRICS_ENABLED`
: **デフォルト**: Java と .NET 6 以降 (v3.40.0 以降) の場合は `true`、他のすべての言語とランタイムの場合は `false` です。<br>
**説明**: ランタイムメトリクスの収集を有効化します。メトリクスは、インスツルメントされたアプリケーションに対して構成され、Datadog Agent に送信されます。

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **デフォルト**: Java の場合は `true`、Node.js、Ruby、Python の場合は `false` です。.NET と Go の場合は存在せず、`runtime_id` は常に報告されます。<br>
**説明**: 強化されたランタイムメトリクスを有効化し、各メトリクスに `runtime_id` タグを付加します。`runtime_id` はアプリケーションのプロセス識別子を表し、ランタイムメトリクスを実行中の各アプリケーションと直接関連付けることができるようにします。

`DD_AGENT_HOST`
: **デフォルト**: `localhost` <br>
**説明**: SDK のメトリクス送信用にホストのアドレスを設定します。ホスト名または IP アドレスで指定できます。

`DD_DOGSTATSD_PORT`
: **デフォルト**: `8125` <br>
**説明**: SDK のメトリクス送信用のポートを設定します。

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **デフォルト**: .NET 8 以降 (`DD_RUNTIME_METRICS_ENABLED` が明示的に設定されていない場合は .NET 6/7) でトレーサー v3.40.0 以降を開始する場合は`true`、それ以外の場合は `false` です。<br>
**説明**: .NET 6 以降で利用可能です。これは、.NET トレーサーが`EventListener` ベースのコレクターの代わりに新しい [`System.Diagnostics.Metrics`][9] API を使用してメトリクスを収集するかどうかをコントロールします。

#### コードベースの構成 {#code-based-configuration}

環境変数に加えて、一部の言語ではランタイムメトリクスをコードで直接に構成することがサポートされています。

{{< tabs >}}
{{% tab "Java" %}}

ランタイムメトリクスは [environment variables](#environment-variables) でのみ有効化できます。

ただし、カスタム JMX メトリクスを追加すると、収集されるメトリクスを拡張できます。詳細については、[JMX 統合][100] のドキュメントを参照してください。

[100]: /ja/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

ランタイムメトリクスは [environment variables](#environment-variables) またはコードで有効化できます。

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">これは、以下を使用していないにのみ適用されます。 <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

ランタイムメトリクスは [environment variables](#environment-variables) またはコードで有効化できます。

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
{{% /tab %}}

{{% tab "Go" %}}

ランタイムメトリクスは [environment variables](#environment-variables) またはコードで有効化できます。

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

`WithDogstatsdAddr` オプションを使用すると、DogStatsD サーバー用のカスタムアドレスを指定できます。アドレスがデフォルトの `localhost:8125` と異なる場合は、[`WithDogstatsdAddr`][101] (または、[`WithDogstatsdAddress` v1][100]) オプションを使用してください。(1.18.0 以降で利用可能)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

ランタイムメトリクスは [environment variables](#environment-variables) またはコードで有効化できます。

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

ランタイムメトリクスは [environment variables](#environment-variables) でのみ有効化できます。

{{% /tab %}}
{{< /tabs >}}

## ダッシュボード {#dashboards}

セットアップが完了したら、以下の場所でランタイムメトリクスを表示できます。

- インスツルメントされたサービスの詳細ページ
- フレームグラフの**メトリクス**タブ
- デフォルトのランタイムダッシュボード

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM ランタイムトレース" >}}

## トラブルシューティング {#troubleshooting}
- フレームグラフ内でランタイムメトリクスを関連付けるには、環境全体で `env` タグ (大文字と小文字を区別) が設定され、一致していることを確認してください。
- Fargate 使用時にサービスページにランタイムメトリクスが表示されるようにするには、Agent タスクに `DD_DOGSTATSD_TAGS` が設定されていて、構成された `env` タグがインスツルメントされたサービスの `env` と一致することを確認します。

## 収集データ {#data-collected}

サポートされている言語はそれぞれ、メモリ使用量、ガーベジコレクション、CPU 使用率、その他のパフォーマンス指標に関するインサイトを提供する一連のランタイムメトリクスを収集します。

{{< tabs >}}
{{< tab "Java" >}}
{{< get-metrics-from-git "java" >}}
{{< /tab >}}

{{< tab "Python" >}}
{{< get-metrics-from-git "python" >}}
{{< /tab >}}

{{< tab "Ruby" >}}
{{< get-metrics-from-git "ruby" >}}
{{< /tab >}}

{{< tab "Go" >}}
{{< get-metrics-from-git "go" >}}
{{< /tab >}}

{{< tab "Node.js" >}}
{{< get-metrics-from-git "node" >}}
{{< /tab >}}

{{< tab ".NET" >}}
{{< get-metrics-from-git "dotnet" >}}
{{< /tab >}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/extend/dogstatsd/#setup
[3]: /ja/agent/docker/#dogstatsd-custom-metrics
[7]: /ja/extend/dogstatsd/unix_socket/
[8]: /ja/agent/configuration/agent-configuration-files/#main-configuration-file
[9]: https://learn.microsoft.com/dotnet/api/system.diagnostics.metrics
[10]: /ja/opentelemetry/integrations/runtime_metrics/
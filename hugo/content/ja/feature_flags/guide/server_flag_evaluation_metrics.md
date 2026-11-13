---
description: Datadog Agent とアプリケーションを構成して、サーバーサイドの機能フラグの評価メトリクスを出力および可視化します。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: ドキュメント
  text: Feature Flag グラフ
- link: /metrics/
  tag: ドキュメント
  text: メトリクス
- link: /dashboards/
  tag: ドキュメント
  text: ダッシュボード
title: サーバーサイドのフラグ評価メトリクスをセットアップする
---
## 概要 {#overview}

フラグ評価メトリクスを使用すると、サーバーサイドのアプリケーションが機能フラグの各バリアントを返す頻度を測定できます。これらのメトリクスを使用して、フラグの採用状況を長期的に追跡し、ターゲティングルールが期待どおりに機能していることを確認し、フラグ評価データをダッシュボードでグラフ化します。

<div class="alert alert-warning"> <code>feature_flag.evaluations</code> メトリクスは実験的なものであり、将来のリリースで変更または削除される可能性があります。</div>

<div class="alert alert-info"> <code>feature_flag.evaluations</code> メトリクスは、実験エクスポージャーイベントや Event Platform Proxy (EVP) フラグ評価イベントとは別個のものです。エクスポージャーイベントおよび EVP イベントの送信には、標準トレーサー URL (ポート 8126) が使用されます。このメトリクスは、ポート 4317 または 4318 の OTLP エンドポイントを使用します。</div>

## 前提条件 {#prerequisites}

フラグ評価メトリクスを設定する前に、以下を確認してください。

- [サーバーサイドの機能フラグ][1] がすでに構成されていること。
- Agent ベースのデプロイメントの場合、Datadog Agent 7.32.0 以降が実行されており、OTLP メトリクスを受信できること。
- 非 Agent サーバーレスデプロイメントの場合、プラットフォームでサポートされているサーバーレステレメトリパスが構成されていること。
- Java、Node.js、Python のサーバーレス環境については、[フィーチャーフラグテレメトリの送信][7] を参照してください。
- レガシーアクティベーションパスを使用する Agent 対応の構成の場合、アプリケーションで `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` が設定されていること。
- サーバーサイドのトレーサーが、フラグ評価メトリクスをサポートする最小バージョンを満たしていること。

| 言語 | トレーサーの最小バージョン |
| -------- | ---------------------- |
| .NET     | 3.44.0                 |
| Go       | 2.8.0                  |
| Java     | 1.62.0                 |
| Node.js  | 5.99.0                 |
| PHP      | 1.21.1                 |
| Python   | 4.7.0                  |
| Ruby     | 2.32.0                 |

Agentless 構成の配信とこのメトリクスは、独立したパスを使用します。サポートされている Agent 対応テレメトリまたはサーバーレステレメトリの設定で必要な OTLP パスを構成すると、Agentless SDK がメトリクスを出力できます。

## ステップ 1: OTLP レシーバーを構成する {#step-1-configure-an-otlp-receiver}

フラグ評価メトリクスは OpenTelemetry (OTLP) 経由で出力されます。Agent 対応のデプロイメントでは、デフォルトでオフになっている Datadog Agent OTLP レシーバーを有効にします。セットアップ手順については、[Datadog Agent による OTLP の取り込み][2] を参照してください。非 Agent サーバーレスデプロイメントの場合、Serverless Monitoring 設定でサポートされている OTLP またはカスタムメトリクスのパスを使用してください。

アプリケーションが使用するプロトコル (ポート 4317 での gRPC、またはポート 4318 での HTTP) のみを有効にする必要があります。

<div class="alert alert-info">Docker で Agent v7.61.0 以降を実行している場合は、OTLP パイプラインの既知の問題を回避するために、Agent コンテナで <code>HOST_PROC=/proc</code> を設定してください。</div>

## ステップ 2: アプリケーションを構成する {#step-2-configure-your-application}

Java 以外のサポートされているトレーサーと配信モードの組み合わせについては、標準の [サーバーサイド機能フラグの構成][1] に加えて、次の環境変数を設定してください。Java の場合、`DD_METRICS_OTEL_ENABLED` は効果がありません。代わりに [Java: OpenTelemetry SDK 依存関係の追加](#java-add-the-opentelemetry-sdk-dependencies)セクションを参照してください。

{{< code-block lang="bash" >}}
# Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

### Java: OpenTelemetry SDK の依存関係の {#java-add-the-opentelemetry-sdk-dependencies}

Java プロバイダーは OpenTelemetry SDK を介して `feature_flag.evaluations` を記録し、OTLP 経由でエクスポートするため、`opentelemetry-sdk-metrics` 依存関係と `opentelemetry-exporter-otlp` 依存関係がアプリケーションのクラスパスに存在している必要があります。[Java 機能フラグの依存関係][6] とともにそれらを追加してください。OpenTelemetry API と SDK のバージョンが同一であるようにするため、OpenTelemetry BOM をインポートします。

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation platform('io.opentelemetry:opentelemetry-bom:1.47.0')
    implementation 'io.opentelemetry:opentelemetry-sdk-metrics'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    implementation(platform("io.opentelemetry:opentelemetry-bom:1.47.0"))
    implementation("io.opentelemetry:opentelemetry-sdk-metrics")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
{{< code-block lang="xml" filename="pom.xml" >}}
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.opentelemetry</groupId>
            <artifactId>opentelemetry-bom</artifactId>
            <version>1.47.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk-metrics</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Java トレーサーでは、OpenTelemetry SDK がクラスパスに存在する場合、プロバイダーは OTLP メトリクスエクスポーターを自動的に開始します。依存関係がない場合、メトリクスは出力されず、トレーサーは `OpenTelemetry SDK is not on the classpath` をログに記録します。

<div class="alert alert-info">Spring Boot アプリケーションでは、Spring Boot の OpenTelemetry 自動構成によって <code>OpenTelemetrySdk</code> ビーンが作成されます。解決された OpenTelemetry SDK のバージョンがクラスパスの OpenTelemetry API のバージョンと一致しない場合、起動は <code>BeanCreationException</code> ( <code>openTelemetry</code> ビーン) と <code>NoClassDefFoundError: io/opentelemetry/sdk/internal/ScopeConfigurator</code>で失敗します。上記のように <code>opentelemetry-bom</code> をインポートすると、API と SDK の同じバージョンが維持され、エラーが解決されます。</div>

### Ruby: OpenTelemetry メトリクス gem の追加 {#ruby-add-the-opentelemetry-metrics-gems}

Ruby アプリケーションでは、OpenTelemetry メトリクス SDK gem と OTLP メトリクスエクスポーター gem をアプリケーションバンドルに追加します。

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
{{< /code-block >}}

`bundle install` を使用して gem をインストールします。これらの gem は、OpenTelemetry メトリクスプロバイダーと OTLP メトリクスエクスポーターを提供します。`DD_METRICS_OTEL_ENABLED=true` が設定されている場合に Ruby トレーサーはこれらを使用します。gem がない場合、Ruby トレーサーは `feature_flag.evaluations` メトリクスを出力せず、`Failed to load OpenTelemetry metrics gems` をログに記録します。

### エンドポイントの構成 {#endpoint-configuration}

`DD_TRACE_AGENT_URL` およびポート 8126 の標準 `serverless-init` リスナーは、OTLP メトリクスエンドポイントを構成しません。次のセクションで説明するように、OTLP エンドポイントを個別に構成してください。非 Agent サーバーレスデプロイメントの場合、このメトリクスを構成する前に、プラットフォームの Serverless Monitoring 設定に従ってください。

デフォルトでは、ほとんどのトレーサーは `DD_AGENT_HOST` のポート`4318` (HTTP) で Agent に OTLP メトリクスを送信します。Agent に到達するためにアプリケーションで `DD_AGENT_HOST` がすでに設定されている場合、エンドポイントの構成は不要です。

以下の場合は、OTLP エンドポイントを明示的に設定してください。

- Agent が `DD_AGENT_HOST` のデフォルトの OTLP ポートに到達できない場合 (リモート Agent やデフォルト以外のポートなど)。
- **Java** トレーサーを使用している場合。そのフラグ評価メトリクスエクスポーターは、ポート `4318` で OTLP/HTTP のみをサポートしています (gRPC はサポートされていません)。Java トレーサーは `DD_AGENT_HOST` からエンドポイントを導出せず、デフォルトで `http://localhost:4318` を使用します。Agent が `OTEL_EXPORTER_OTLP_ENDPOINT` にない場合は、`localhost` を Agent の HTTP エンドポイントに設定します。
- **Python** トレーサーを使用している場合。Python トレーサーはデフォルトでポート `4317` で gRPC を使用し、HTTP は使用しません。Agent で gRPC OTLP レシーバーを有効にするか、プロトコルをオーバーライドして代わりに HTTP を使用するように設定します。

{{< code-block lang="bash" >}}
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
{{< /code-block >}}

エンドポイントを設定するには、標準の OpenTelemetry 変数を使用します。

{{< code-block lang="bash" >}}
# Point OTLP data at the Datadog Agent (HTTP, port 4318)
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318

# Or use gRPC (port 4317). For most tracers, the default protocol is http/protobuf,
# so set the protocol explicitly when switching to gRPC:
# OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4317
# OTEL_EXPORTER_OTLP_PROTOCOL=grpc
{{< /code-block >}}

`<AGENT_HOST>` を Datadog Agent のホスト名または IP アドレスに置き換えます。

Docker Compose の例:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
services:
  datadog-agent:
    environment:
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
      - HOST_PROC=/proc  # If running Agent v7.61.0+ in Docker

  app-go:
    environment:
      - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
      - DD_METRICS_OTEL_ENABLED=true
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://datadog-agent:4318
    depends_on:
      datadog-agent:
        condition: service_healthy
{{< /code-block >}}

## ステップ 3: メトリクスが送信されていることを確認する {#step-3-verify-metrics-are-flowing}

デプロイ後に、メトリクスが Datadog に到達していることを確認します。

1. [Metrics Explorer][3] に移動し、`feature_flag.evaluations` を検索します。
2. アプリケーションでフラグを評価してから数分以内にメトリクスが表示されない場合は、以下を確認してください。
   - Agent の OTLP レシーバーが有効になっており、正しいポートが公開されている。
   - `OTEL_EXPORTER_OTLP_ENDPOINT` が別のコレクターではなく、Agent を指している。
   - アプリケーションが実行時にサーバー SDK を使用してフラグをアクティブに評価している (コードパスが実行されている)。

## ステップ 4: メトリクスの保持を有効にする {#step-4-enable-metric-retention}

デフォルトでは、`feature_flag.evaluations` は 1 時間分のデータのみを保持します。より長い履歴を保持するには、次のようにします。

1. [Metrics Summary][4] に移動し、`feature_flag.evaluations` を検索します。
2. メトリクスを選択し、[**Historical Metrics**] (過去のメトリクス) を有効にします。

これはオプトイン設定であり、OTLP メトリクスに対して自動的に有効になることはありません。

## ダッシュボードでのフラグ評価のグラフ化 {#graph-flag-evaluations-on-a-dashboard}

次のクエリを使用して、[ダッシュボード][5] でフラグキーとバリアントごとにフラグ評価をグラフ化します。

{{< code-block lang="text" >}}
sum:feature_flag.evaluations{*} by {feature_flag.key,feature_flag.result.variant}
{{< /code-block >}}

メトリクス `feature_flag.evaluations` は、次のタグを持つカウンターです。

| タグ                                  | 説明                                        |
| ------------------------------------ | -------------------------------------------------- |
| `feature_flag.key`                   | 評価対象のフラグキー                       |
| `feature_flag.result.variant`        | 評価で返されたバリアント             |
| `feature_flag.result.reason`         | 評価結果の理由               |
| `feature_flag.result.allocation_key` | 評価されたターゲティングルールの識別子 (存在する場合のみ出力されます) |
| `error.type`                         | エラータイプ (エラー評価時にのみ出力されます) |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/server/
[2]: /ja/opentelemetry/setup/otlp_ingest_in_the_agent/
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /ja/dashboards/
[6]: /ja/feature_flags/server/java/#installation
[7]: /ja/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
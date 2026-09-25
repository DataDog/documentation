---
further_reading:
- link: /opentelemetry/compatibility/
  tag: ドキュメント
  text: Datadog と OpenTelemetry の互換性
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: ドキュメント
  text: カスタム OpenTelemetry コンポーネントを使用する
- link: /opentelemetry/instrument/
  tag: ドキュメント
  text: OpenTelemetry を使用してアプリケーションをインスツルメントする
title: OpenTelemetry を使用してサポートされていないランタイムをインスツルメントする。
---
## 概要 {#overview}

アプリケーションのランタイムが [Datadog SDK][1] でネイティブにサポートされていない場合は、OpenTelemetry SDK を使用して Datadog にテレメトリを送信できます。このアプローチでは、ネイティブランタイムのサポートを待たずにトレースとメトリクスを取得できます。

このガイドでは、例として [Bun][2] アプリケーションをインスツルメントする手順を説明します。Bun はほとんどの Node.js API と互換性があるため、[OpenTelemetry Node.js SDK][3] を使用して Bun アプリケーションをインスツルメントできます。OpenTelemetry SDK と互換性のある他のサポートされていないランタイムにも、同じパターンを適用できます。

## サポートレベル {#support-level}

<div class="alert alert-info">
このガイドは<strong>Custom Components</strong> <a href="/opentelemetry/compatibility/#support-levels">サポートレベル</a>に該当します。Datadog はこのドキュメントを出発点として提供しますが、ランタイムの機能やその中での OpenTelemetry SDK の動作を直接サポートするものではありません。ランタイム固有の問題については、<a href="https://opentelemetry.io/community/">OpenTelemetry コミュニティ</a>またはランタイムのメンテナーにお問い合わせください。
</div>

## 前提条件 {#prerequisites}

- Datadog にデータを送信するように構成された OpenTelemetry 互換バックエンド。DDOT Collector、OTel Collector と Datadog エクスポーター、または直接 OTLP インジェストなどのセットアップオプションについては、[OpenTelemetry のデータを Datadog に送信する][4] を参照してください。
- [Bun][2] がインストールされていること (v1.0 以降)。
- インスツルメントする Bun アプリケーション。

## Bun アプリケーションのインスツルメント {#instrument-a-bun-application}

### OpenTelemetry パッケージのインストール {#install-opentelemetry-packages}

プロジェクトのルートディレクトリから、必要な OpenTelemetry パッケージをインストールします。

```shell
bun add @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/exporter-metrics-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

### テレメトリ初期化モジュールの作成 {#create-a-telemetry-initialization-module}

Node.js では、OpenTelemetry は通常 `--require` フラグに基づいて読み込まれ、アプリケーションコードが実行される前にインスツルメンテーションをプリロードします。Bun のモジュール解決システムは動作が異なるため、代わりにプログラムで OpenTelemetry を初期化する必要があります。

OpenTelemetry Node.js SDK を構成する `tracing.ts` ファイルを作成します。

{{< code-block lang="typescript" filename="tracing.ts" >}}
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || '<YOUR_SERVICE_NAME>',
  [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION || '1.0.0',
  'telemetry.sdk.runtime': 'bun',
});

const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter(),
  metricReaders: [new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  })],
  instrumentations: [getNodeAutoInstrumentations({
    // Disable fs instrumentation to avoid compatibility issues with Bun
    '@opentelemetry/instrumentation-fs': { enabled: false },
  })],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry SDK', err))
    .finally(() => process.exit(0));
});
{{< /code-block >}}

`<YOUR_SERVICE_NAME>` をアプリケーションのサービス名に置き換えます。

### アプリケーションのエントリポイントでテレメトリを初期化する {#initialize-telemetry-at-your-application-entry-point}

他のアプリケーションをインポートする**前**に、`tracing.ts` モジュールをインポートします。自動インスツルメンテーションのためにライブラリにパッチを適用するには、OpenTelemetry SDK を最初に初期化する必要があります。

{{< code-block lang="typescript" filename="index.ts" >}}
import './tracing';

// Import your application code after tracing is initialized
import { startApp } from './app';

startApp();
{{< /code-block >}}

### 環境変数の構成 {#configure-environment-variables}

OTLP エクスポーターエンドポイントとサービス ID を構成するには、次の環境変数を設定します。

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
```

`OTEL_EXPORTER_OTLP_ENDPOINT` の値は、セットアップによって異なります。
- **ローカルコレクター** (DDOT または OTel Collector): `http://localhost:4318` (デフォルトは HTTP) または `http://localhost:4317` (gRPC)
- **リモートコレクター**: コレクターのアドレスとポートを使用します。

その他の構成オプションについては、[OpenTelemetry 環境変数の仕様][5] を参照してください。

### アプリケーションの実行 {#run-your-application}

Bun アプリケーションを開始します。

```shell
bun run index.ts
```

### Bun ネイティブ API の手動インスツルメンテーションの追加 {#add-manual-instrumentation-for-bun-native-apis}

`Bun.serve()`、`bun:sqlite`、およびネイティブファイル I/O API などの組み込み Bun API は、自動的にインスツルメントされません。これらの API からテレメトリをキャプチャするには、`@opentelemetry/api` パッケージを使用して手動でスパンを作成してください。

次の例では、`Bun.serve()` ルートハンドラーをカスタムスパンでラップしています。

{{< code-block lang="typescript" filename="server.ts" >}}
import { trace, SpanKind } from '@opentelemetry/api';

const tracer = trace.getTracer('bun-app');

export function startServer() {
  Bun.serve({
    port: 3000,
    fetch(req) {
      return tracer.startActiveSpan('handleRequest', { kind: SpanKind.SERVER }, (span) => {
        try {
          span.setAttribute('http.method', req.method);
          span.setAttribute('http.url', req.url);
          return new Response('Hello from Bun!');
        } finally {
          span.end();
        }
      });
    },
  });
}
{{< /code-block >}}

その他の手動インスツルメンテーションパターンについては、[OpenTelemetry JS インスツルメンテーションのドキュメント][7] を参照してください。

### Datadog でのトレースの確認 {#verify-traces-in-datadog}

アプリケーションでいくつかのリクエストが処理された後に、次のようにします。

1. Datadog の [[{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Traces{{< /ui >}}] (トレース)][6] に移動します。
2. サービス名を検索します。
3. 期待されるスパンとメタデータを含むトレースが表示されることを確認します。

## 制限事項 {#limitations}

- **自動インスツルメンテーションの対応範囲**: OpenTelemetry Node.js 自動インスツルメンテーションライブラリは、Bun の Node.js 互換レイヤーに依存しています。一般的なライブラリ (HTTP クライアント、Express、データベースドライバなど) は動作しますが、一部のインスツルメンテーションパッケージは期待どおりに機能しない場合があります。
- **Bun ネイティブ API**: `Bun.serve()`、`bun:sqlite`、およびネイティブのファイル I/O API などの組み込み Bun API は、自動的にインスツルメントされません。例については、[Bun ネイティブ API の手動インスツルメンテーションの追加](#add-manual-instrumentation-for-bun-native-apis)を参照してください。
- **ライブラリの互換性**: すべての Node.js インスツルメンテーションライブラリが Bun で動作することは保証されていません。特定の依存関係をテストし、エラーの原因となるインスツルメンテーションがある場合は、`getNodeAutoInstrumentations()` に構成オプションを渡してそのインスツルメンテーションを無効にしてください。`@opentelemetry/instrumentation-fs` パッケージは問題の原因となることが多く、上記の構成例では無効にされています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://bun.com/docs/installation
[3]: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
[4]: /ja/opentelemetry/setup/
[5]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
[6]: https://app.datadoghq.com/apm/traces
[7]: https://opentelemetry.io/docs/languages/js/instrumentation/
---
aliases:
- /ja/opentelemetry/guide/otel_api_tracing_interoperability/
further_reading:
- link: /tracing/trace_collection/otel_instrumentation/
  tag: ドキュメント
  text: OpenTelemetry API を使ったカスタムインスツルメンテーション
- link: /tracing/trace_collection/trace_context_propagation/
  tag: ドキュメント
  text: Datadog におけるトレースコンテキストの伝播
title: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
---

## OpenTelemetry API によるカスタムインスツルメンテーション

Datadog トレーシングライブラリは、コードのインスツルメンテーションのために [OpenTelemetry API][1] の実装を提供します。これにより、Datadog のネイティブな実装や機能、製品を利用しながら、すべてのサービスのインスツルメンテーションをベンダーニュートラルに維持できます。

[OpenTelemetry API でコードをインスツルメンテーションする]ことによって

- コードがベンダー固有の API 呼び出しから解放されます。
- コードがコンパイル時に Datadog トレーシングライブラリに依存しません (ランタイムのみ)。
- コードが非推奨の OpenTracing API を使用しません。

インスツルメンテーションされたアプリケーションで、OpenTelemetry SDK を Datadog トレーシングライブラリに置き換えることで、実行中のコードによって生成されたトレースを、Datadog トレースや [Continuous Profiler][3]、[Data Streams Monitoring][4]、[Application Security Management][5]、[Live Processes][6] などの Datadog 独自製品で処理、分析、監視できます。

## W3C トレースコンテキストの伝播

Datadog 内での OpenTelemetry トレースデータのシームレスな処理と、Datadog インスツルメンテーションによって生成されたトレースデータとの相関を容易にするために、最新バージョンの Datadog トレーシングライブラリは、デフォルトで [Datadog (`datadog`) と W3C (`tracecontext`) の伝播スタイル][8]を両方サポートしています。[ランタイムトレーシングライブラリの依存関係を最新バージョンに更新してください][7]。

このコンテキスト伝播スタイルにより、Datadog トレーサーは、OpenTelemetry SDK や他の W3C 準拠のトレーサーと同じアプリケーション環境で動作できます。


## 128 ビットのトレース ID

W3C のトレースは、Datadog のトレースがこれまで使用してきた 64 ビットのトレース ID ではなく、128 ビットのトレース ID を暗黙的に含んでいます。最新の Datadog トレーシングライブラリのデフォルト構成では、`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` の設定を使用して、128 ビットのトレース ID を持つトレースデータを生成します。

[W3C Trace Context の推奨][9]に従い、Datadog の 128 ビットトレース ID は、下位 64 ビットにランダム性を持たせています。この制限により、64 ビットのトレース ID を生成するライブラリと 128 ビットの ID をサポートする新しいライブラリを混在させたシステムの後方互換性が提供されます。そのようなシステムでは、完全な 128 ビットのトレース ID を持つスパンと、切り捨てられた下位 64 ビットのトレース ID を持つスパンがバックエンドに到達し、同じトレースの一部として一致して扱われる可能性があります。

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="128 ビットのトレース ID は、トレーシングライブラリが 64 ビットのトレース ID を生成するコードにトレースコンテキストと一緒に渡すことができ、Datadog はバックエンドでそれらを正常に相関させることができます。" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /ja/tracing/trace_collection/otel_instrumentation/
[3]: /ja/profiler/
[4]: /ja/data_streams/
[5]: /ja/security/application_security/
[6]: /ja/infrastructure/process
[7]: /ja/tracing/trace_collection/dd_libraries/
[8]: /ja/tracing/trace_collection/trace_context_propagation/
[9]: https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers
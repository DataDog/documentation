---
aliases:
- /ja/path-to-old-doc/
disable_toc: false
further_reading:
- link: /opentelemetry/reference/trace_context_propagation
  tag: ドキュメント
  text: トレースコンテキストの伝播
title: トレース ID
---

W3C のトレースは、Datadog のトレースが従来使用してきた 64 ビットのトレース ID ではなく、128 ビットのトレース ID を暗黙的に含みます。Datadog トレーシング ライブラリの最新のデフォルト構成では、Datadog でも 128 ビットのトレース ID を持つトレース データを生成するために、`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` を使用します。

[W3C Trace Context の推奨][1] に従い、Datadog の 128 ビットのトレース ID では下位 64 ビットにランダム性を持たせています。この制限により、64 ビットのトレース ID を生成するライブラリと、128 ビットの ID をサポートする新しいライブラリが混在するシステムでも後方互換性が確保されます。そのようなシステムでは、完全な 128 ビットのトレース ID を持つスパンと、切り詰められた下位 64 ビットのトレース ID を持つスパンがバックエンドに到達し、一致するものとして扱われ、同じトレースの一部と見なされます。

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="128 ビットのトレース ID は、トレーシングライブラリが 64 ビットのトレース ID を生成するコードにトレースコンテキストと一緒に渡すことができ、Datadog はバックエンドでそれらを正常に相関させることができます。" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers
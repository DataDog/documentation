---
aliases:
- /ja/tracing/advanced/runtime_metrics/
- /ja/tracing/runtime_metrics/
description: アプリケーションのパフォーマンスに関する詳細情報を、トレースに紐づくランタイムメトリクスと共に取得します。
title: ランタイムメトリクス
type: multi-code-lang
---

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM ランタイムトレース" >}}

トレースクライアントでランタイムメトリクス収集を有効にすると、アプリケーションのパフォーマンスに関する詳細情報を得られます。ランタイムメトリクスは、[サービス][1]のコンテクストで表示することが可能で、要求された時点でのトレースビューに関連付けられ、プラットフォームのあらゆる場所で使用できます。下記から言語を選択して、ランタイムメトリクスを自動で収集する方法をご確認ください。

{{< partial name="apm/apm-runtime-metrics.html" >}}
<br>

[1]: /ja/tracing/glossary/#services
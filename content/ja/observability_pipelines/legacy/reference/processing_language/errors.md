---
aliases:
- /ja/observability_pipelines/reference/processing_language/errors/
title: (レガシー) エラー
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines は、US1-FED Datadog サイトではご利用いただけません。</div>
{{< /site-region >}}

Datadog Processing Language (DPL)、または Vector Remap Language (VRL) はフェイルセーフ言語です。つまり、潜在的なエラーがすべて処理されない限り、DPL/VRL プログラムはコンパイルされません。これにより、 DPL/VRL プログラムが不正なデータを処理できるようになります。

## コンパイル時のエラー
{{< vrl-errors >}}
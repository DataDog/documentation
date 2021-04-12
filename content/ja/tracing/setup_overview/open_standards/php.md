---
title: PHP オープン標準
kind: documentation
description: PHP のオープン標準
code_lang: php
type: multi-code-lang
code_lang_weight: 50
---
## OpenTracing

PHP トレーサーは、Composer と共にインストールされる [**opentracing/opentracing** ライブラリ][1]を介して OpenTracing をサポートします。

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

[自動インスツルメンテーション][2]が有効になっている場合、OpenTracing 互換のトレーサーがグローバルトレーサーとして利用可能になります。

```php
<?php
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...既定の方法で OpenTracing を使用します
?>
```

<div class="alert alert-info">ddtrace のバージョン 0.46.0 以前では、OpenTracing に互換性のあるトレーサーが <code>OpenTracing\GlobalTracer::get()</code> から自動で返されます。グローバルトレーサーの手動設定は不要です。</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /ja/tracing/setup/php/#automatic-instrumentation
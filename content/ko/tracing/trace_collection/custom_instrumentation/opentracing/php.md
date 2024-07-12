---
aliases:
- /ko/tracing/setup_overview/open_standards/php
- /ko/tracing/trace_collection/open_standards/php
- /ko/tracing/trace_collection/opentracing/php
code_lang: php
code_lang_weight: 50
description: PHP용 OpenTracing 계측
kind: 설명서
title: PHP OpenTracing 계측
type: multi-code-lang
---

PHP 트레이서는 다음과 같이 컴포저와 함께 설치되는 [**opentracing/opentracing** 라이브러리][1]로 OpenTracing을 지원합니다.

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

[자동 계측][2]이 활성화되면 다음과 같이 OpenTracing 호환 트레이서를 전역 트레이서로 사용할 수 있습니다.

```php
<?php
// 컴포저 autoload.php를 불러온 직후에 전역 트레이서를 한 번 설정합니다.
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);

// 스팬이 필요한 모든 위치
$scope = $otTracer->startActiveSpan('web.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', 'resource_name');
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...예측대로 OpenTracing 사용
$scope->close();
?>
```

<div class="alert alert-info">ddtrace 0.46.0 이전 버전에서는 전역 트레이서를 수동으로 설정하지 않아도 <code>OpenTracing\GlobalTracer::get()</code>에서 OpenTracing 호환 트레이서가 자동 반환되었습니다.</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /ko/tracing/setup/php/#automatic-instrumentation
---
aliases:
- /ko/tracing/setup_overview/open_standards/go
- /ko/tracing/trace_collection/open_standards/go
- /ko/tracing/trace_collection/opentracing/go/
code_lang: go
code_lang_weight: 30
description: 'Go용 OpenTracing 계측 '
kind: 설명서
title: Go OpenTracing 계측
type: multi-code-lang
---


Datadog은 OpenTracing 표준을 지원합니다. 자세한 내용 및 정보를 확인하려면 [OpenTracing API][1] 또는 하단의 설정 정보를 참조하세요.

## 설정

[`opentracer` 패키지][2]를 불러와 Datadog 트레이서를 [OpenTracing][3] 호환 트레이서로 노출합니다.

다음은 기본 사용 예시입니다.

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // 일반 트레이서로 시작해 opentracing.Tracer 인터페이스로 반환합니다.
    // Datadog 트레이서에서 기본적으로 사용하는 것과 동일한 옵션 세트를 사용할 수도 있습니다.
    t := opentracer.New(tracer.WithServiceName("<SERVICE_NAME>"))

    // 트레이서 패키지용 일반 중지 호출을 사용해 중단합니다.
    defer tracer.Stop()

    // 전역 OpenTracing 트레이서를 설정합니다.
    opentracing.SetGlobalTracer(t)

    // 평소처럼 OpenTracing API를 사용합니다.
}
```

[1]: https://github.com/opentracing/opentracing-go
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[3]: http://opentracing.io
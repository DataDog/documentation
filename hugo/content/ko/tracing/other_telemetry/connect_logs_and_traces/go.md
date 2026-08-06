---
aliases:
- /ko/tracing/connect_logs_and_traces/go
code_lang: go
code_lang_weight: 30
description: Go 로그와 트레이스를 연결해 Datadog에서 상호 연결할 수 있습니다.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: 설명서
  text: 애플리케이션을 수동으로 계측하여 트레이스를 생성합니다.
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: 블로그
  text: 로그 요청을 트레이스와 자동으로 상호 연결
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 길라잡이
  text: 제품 간 상관관계를 활용한 쉬운 트러블슈팅
title: Go 로그와 트레이스 상호 연결
type: multi-code-lang
---

## 수동 삽입

Go 트레이서 API를 사용하면 `%v` 형식 지정자를 사용해 스팬 정보와 로그 문을 출력할 수 있습니다.

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // /posts URL에서 웹 요청용 스팬 생성.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // 로그 메시지에 스팬 정보 추가:
    log.Printf("my log message %v", span)
}
```

위는 표준 라이브러리의 `log` 패키지에서 스팬 컨텍스트를 사용하는 방법을 보여주는 예시입니다. 제3자 패키지에도 유사한 로직을 적용할 수 있습니다.

**참고**: [Datadog 로그 통합][1]을 사용하여 로그를 파싱하지 않는 경우, 커스텀 로그 파싱 규칙에서 `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env`, `dd.version`가 문자열로 파싱되는지 확인해야 합니다. 자세한 내용은 [트레이스 ID 패널에 표시되지 않는 상호 연결 로그][2]를 참고하세요.

## logrus 로그에 삽입

로그와 스팬에 연결할 수 있는 logrus 패키지용 후크를 사용할 수 있습니다.
Go 트레이서에서 이 패키지를 사용할 수 있습니다.

```go
package main

import (
    "github.com/sirupsen/logrus"

    dd_logrus "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // 선택 사항: JSON을 사용하도록 로그 형식 변경(Cf. Go 로그 수집)
    logrus.SetFormatter(&logrus.JSONFormatter{})

    // Datadog 컨텍스트 로그 후크 추가
    logrus.AddHook(&dd_logrus.DDContextLogHook{}) 

    // ...
}
```

이 명령을 사용하면 컨텍스트를 포함해 로깅하는 경우 로그에 트레이스 ID를 자동으로 삽입합니다.
```go
    // 컨텍스트를 포함한 로깅
    logrus.WithContext(ctx).Info("Go logs and traces connected!")
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_collection/go/#configure-your-logger
[2]: /ko/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
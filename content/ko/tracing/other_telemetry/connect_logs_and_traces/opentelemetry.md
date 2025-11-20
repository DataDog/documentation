---
aliases:
- /ko/tracing/connect_logs_and_traces/opentelemetry
code_lang: opentelemetry
code_lang_weight: 80
description: 애플리케이션 로그와 OpenTelemetry 트레이스를 연결하여 Datadog에서 상호 연관성을 확인하세요
further_reading:
- link: /opentelemetry/otel_tracing/
  tag: 설명서
  text: Datadog에 OpenTelemetry 트레이스 전송
- link: https://opentelemetry.io/docs/collector/
  tag: 외부 사이트
  text: 컬렉터 설명서
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: 블로그
  text: Datadog과 OpenTelemetry의 파트너십
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 길라잡이
  text: 제품 간 상관관계를 활용한 쉬운 트러블슈팅
title: OpenTelemetry 트레이스 및 로그 상관 관계
type: multi-code-lang
---

Datadog 내에서 OpenTelemetry 언어 SDK 로그 및 트레이스를 연결하는 것은 [Datadog SDK 로그와 트레이스][1]를 연결하는 것과 유사하지만 몇 가지 추가 단계가 있습니다.

1. OpenTelemetry `TraceId` 및 `SpanId` 속성은 Datadog 규칙과 다릅니다. 따라서 OpenTelemetry 형식([부호 없는 128비트 정수 및 부호 없는 64비트 정수는 각각 32 Hex 및 16 Hex 소문자 문자열][2])의 `TraceId` 및 `SpanId`를 Datadog 형식([부호 없는 64비트 정수][3])으로 변환해야 합니다.

2. 트레이스 로그 상관 관계가 작동하려면 언어 수준 로그가 Datadog 속성으로 변환되어야 하기 때문에 로그가 JSON으로 전송되는지 확인하세요.

특정 언어에서 OpenTelemetry 트레이스와 로그를 상호 연관시키는 방법은 다음 예제를 참조하세요.

{{< tabs >}}
{{% tab "Python" %}}

트레이스를 로그와 수동으로 연관시키려면 OpenTelemetry 형식인 `trace_id` 및 `span_id`를 Datadog 형식으로 변환하는 프로세서와 사용 중인 로깅 모듈을 패치합니다. 다음 예에서는 [structlog 로깅 라이브러리][1]를 사용합니다. 다른 로깅 라이브러리의 경우 [Datadog SDK 예제를 수정][2]하는 것이 더 적절할 수 있습니다. `trace-examples` GitHub 리포지토리에서 [트레이스 및 로그 상관 관계를 사용하여 OpenTelemetry가 계측된  Python 애플리케이션의 예][3]를 찾을 수도 있습니다.

```python
# ########## injection.py
from opentelemetry import trace

class CustomDatadogLogProcessor(object):
    def __call__(self, logger, method_name, event_dict):
        # Datadog 형식의 트레이스 컨텍스트를 로그에 추가하는 예
        # 출처: https://github.com/open-telemetry/opentelemetry-python-contrib/blob/b53b9a012f76c4fc883c3c245fddc29142706d0d/exporter/opentelemetry-exporter-datadog/src/opentelemetry/exporter/datadog/propagator.py#L122-L129 
        current_span = trace.get_current_span()
        if not current_span.is_recording():
            return event_dict

        context = current_span.get_span_context() if current_span is not None else None
        if context is not None:
            event_dict["dd.trace_id"] = str(context.trace_id & 0xFFFFFFFFFFFFFFFF)
            event_dict["dd.span_id"] = str(context.span_id)

        return event_dict        
# ##########

# ########## app.py
import .injection
import logging
import structlog
# Datadog 형식의 트레이스 ID를 로그에 삽입하려면 사용자 정의 형식을 추가하세요.
structlog.configure(
    processors=[
        injection.CustomDatadogLogProcessor(),
        structlog.processors.JSONRenderer(sort_keys=True)
    ],
)

log = structlog.getLogger()

log.info("Example log line with trace correlation info")
```



[1]: https://www.structlog.org/en/stable/standard-library.html
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/python/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/python-microservice/ddlogging/injection.py#L3
{{% /tab %}}

{{% tab "Node.js" %}}

트레이스를 로그와 수동으로 연관시키려면 OpenTelemetry 형식인 `trace_id`, `span_id`를 Datadog 형식으로 변환하는 프로세서와 사용 중인 로깅 모듈을 패치합니다. 다음 예에서는 [winston 로깅 라이브러리][1]를 사용합니다. 다른 로깅 라이브러리의 경우 [Datadog SDK 예제를 수정][2]하는 것이 더 적절할 수 있습니다. `trace-examples` GitHub 리포지토리에서 [트레이스 및 로그 상관 관계를 사용하여 OpenTelemetry가 계측된 Node.js 애플리케이션의 예][3]를 찾을 수도 있습니다.

```js
// ########## logger.js

// 아래 주소와 함께 dd로 변환합니다
// https://github.com/DataDog/dd-trace-js/blob/main/packages/dd-trace/src/id.js
const opentelemetry = require('@opentelemetry/api');
const winston = require('winston')

const tracingFormat = function () {
  return winston.format(info => {
    const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
    if (span) {
      const { spanId, traceId } = span.spanContext();
      const traceIdEnd = traceId.slice(traceId.length / 2);
      info['dd.trace_id'] = BigInt(`0x${traceIdEnd}`).toString();
      info['dd.span_id'] = BigInt(`0x${spanId}`).toString();
    }
    return info;
  })();
}

module.exports = winston.createLogger({
  transports: [new winston.transports.Console],
  format: winston.format.combine(tracingFormat(), winston.format.json())
});

// ##########

// ########## index.js
//
// ...
// 트레이서를 초기화합니다
// ...
// 
const logger = require('./logger') 
//
// 애플리케이션에서 로거를 사용합니다
logger.info("Example log line with trace correlation info")
```



[1]: https://github.com/winstonjs/winston
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/nodejs/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/node-microservice/logger.js#L86
{{% /tab %}}

{{% tab "Ruby" %}}

트레이스를 로그와 수동으로 연관시키려면 OpenTelemetry 형식인 `trace_id`, `span_id`를 Datadog 형식으로 변환하는 프로세서와 사용 중인 로깅 모듈을 패치합니다. 다음 예에서는 [Ruby 표준 로깅 라이브러리][1]를 사용합니다. 다른 로깅 라이브러리의 경우 [Datadog SDK 예제를 수정][2]하는 것이 더 적절할 수 있습니다. `trace-examples` GitHub 리포지토리에서 [트레이스 및 로그 상관 관계를 사용하여 OpenTelemetry가 계측된   Ruby 애플리케이션의 예][3]를 찾을 수도 있습니다.

```ruby
logger = Logger.new(STDOUT)
logger.progname = 'multivac'
original_formatter = Logger::Formatter.new
logger.formatter  = proc do |severity, datetime, progname, msg|
  current_span = OpenTelemetry::Trace.current_span(OpenTelemetry::Context.current).context

  dd_trace_id = current_span.trace_id.unpack1('H*')[16, 16].to_i(16).to_s
  dd_span_id = current_span.span_id.unpack1('H*').to_i(16).to_s

  if current_span
    "#{{datetime: datetime, progname: progname, severity: severity, msg: msg, 'dd.trace_id': dd_trace_id, 'dd.span_id': dd_span_id}.to_json}\n"
  else
    "#{{datetime: datetime, progname: progname, severity: severity, msg: msg}.to_json}\n"
  end
end

logger.info("Example log line with trace correlation info")
```




[1]: https://ruby-doc.org/stdlib-3.0.0/libdoc/logger/rdoc/index.html
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/ruby/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/ruby-microservice/app.rb#L21-L35
{{% /tab %}}

{{% tab "Java" %}}

트레이스와  로그를 수동으로 연관시키려면 먼저 [openTelemetry-java-instrumentation Logger MDC Instrumentation][1]을 활성화하세요. 그런 다음 OpenTelemetry 형식의 `trace_id`, `span_id`를 Datadog 형식으로 변환하는 프로세서와 사용 중인 로깅 모듈을 패치합니다. 다음 예제에서는 [Spring Boot 및 Logback][2]을 사용합니다. 다른 로깅 라이브러리의 경우 [Datadog SDK 예제를 수정][3]하는 것이 더 적절할 수 있습니다.

```java
String traceIdValue = Span.current().getSpanContext().getTraceId();
String traceIdHexString = traceIdValue.substring(traceIdValue.length() - 16 );
long datadogTraceId = Long.parseUnsignedLong(traceIdHexString, 16);
String datadogTraceIdString = Long.toUnsignedString(datadogTraceId);

String spanIdHexString = Span.current().getSpanContext().getSpanId();
long datadogSpanId = Long.parseUnsignedLong(spanIdHexString, 16);
String datadogSpanIdString = Long.toUnsignedString(datadogSpanId);

logging.pattern.console = %d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg dd.trace_id=%X{datadogTraceIdString} dd.span_id=%X{datadogSpanIdString} %n
```

Java 로그를 Datadog으로 보내는 방법은 [Java 로그 수집][4]을 참조하세요.

[1]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/logger-mdc-instrumentation.md
[2]: https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-logging.html
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2#manually-inject-trace-and-span-ids
[4]: /ko/logs/log_collection/java/?tab=logback
{{% /tab %}}

{{% tab "PHP" %}}

PHP의 트레이스 및 로그 상관관계를 확인하려면 위에서 설명한 추가 단계를 포함하도록 [Datadog SDK PHP 예제][1]를 수정하세요.

궁금하신 사항은 [Datadog 지원팀에 문의][2]하세요.




[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/php/
[2]: /ko/help/
{{% /tab %}}

{{% tab "Go" %}}

트레이스와 로그를 수동으로 연관시키려면 OpenTelemetry 형식의 `trace_id`, `span_id`를 Datadog 형식으로 변환하는 함수와 사용 중인 로깅 모듈을 패치합니다. 다음 예제에서는 [logrus 라이브러리][1]를 사용합니다.

```go
package main

import (
    "context"
    log "github.com/sirupsen/logrus"
    "go.opentelemetry.io/otel"
    "strconv"
)

func main() {
    ctx := context.Background()
    tracer := otel.Tracer("example/main")
    ctx, span := tracer.Start(ctx, "example")
    defer span.End()

    log.SetFormatter(&log.JSONFormatter{})

    standardFields := log.Fields{
        "dd.trace_id": convertTraceID(span.SpanContext().TraceID().String()),
        "dd.span_id":  convertTraceID(span.SpanContext().SpanID().String()),
        "dd.service":  "serviceName",
        "dd.env":      "serviceEnv",
        "dd.version":  "serviceVersion",
    }

    log.WithFields(standardFields).WithContext(ctx).Info("hello world")
}

func convertTraceID(id string) string {
    if len(id) < 16 {
        return ""
    }
    if len(id) > 16 {
        id = id[16:]
    }
    intValue, err := strconv.ParseUint(id, 16, 64)
    if err != nil {
        return ""
    }
    return strconv.FormatUint(intValue, 10)
}


```

궁금하신 사항은 [Datadog 지원팀에 문의][2]하세요.



[1]: https://github.com/sirupsen/logrus
[2]: /ko/help/
{{% /tab %}}

{{% tab ".NET" %}}

트레이스와 로그를 수동으로 연관시키려면 OpenTelemetry `TraceId` 및 `SpanId`를 Datadog에서 사용하는 형식으로 변환합니다. `dd.trace_id` 및 `dd.span_id` 속성에서 해당 ID를 및 로그에 추가하세요. 다음 예에서는 [Serilog 라이브러리][1]를 사용하고 OpenTelemetry(`System.DiagnosticSource.Activity`) 트레이스 및 스팬 ID를 Datadog의 필수 형식으로 변환하는 방법을 보여줍니다.

```csharp
var stringTraceId = Activity.Current.TraceId.ToString();
var stringSpanId = Activity.Current.SpanId.ToString();

var ddTraceId = Convert.ToUInt64(stringTraceId.Substring(16), 16).ToString();
var ddSpanId = Convert.ToUInt64(stringSpanId, 16).ToString();

using (LogContext.PushProperty("dd.trace_id", ddTraceId))
using (LogContext.PushProperty("dd.span_id", ddSpanId))
{
    Serilog.Log.Logger.Information("Example log line with trace correlation info");
}
```


[1]: https://serilog.net/
{{% /tab %}}

{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[2]: https://github.com/open-telemetry/opentelemetry-specification/blob/eeef21259a12d61100804eff2e12ba06523821c3/specification/trace/api.md#retrieving-the-traceid-and-spanid
[3]: /ko/api/latest/tracing/#send-traces
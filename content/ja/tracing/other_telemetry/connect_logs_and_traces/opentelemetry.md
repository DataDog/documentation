---
aliases:
- /ja/tracing/connect_logs_and_traces/opentelemetry
code_lang: opentelemetry
code_lang_weight: 80
description: アプリケーションログと OpenTelemetry トレースを接続して Datadog で関連付けます
further_reading:
- link: /opentelemetry/otel_tracing/
  tag: ドキュメント
  text: OpenTelemetry トレースを Datadog へ送信
- link: tracing/glossary/
  tag: OpenTelemetry
  text: Collectorドキュメント
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: GitHub
  text: Datadog と OpenTelemetry のパートナーシップ
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
title: OpenTelemetry トレースとログに接続
type: multi-code-lang
---

OpenTelemetry 言語の SDK ログおよびトレースの Datadog 内での接続は、[Datadog SDK ログおよびトレース][1]の接続とほぼ同じですが、さらに以下の手順が必要です。

1. OpenTelemetry `TraceId` および `SpanId` プロパティは、Datadog のルールセットと異なります。そのため、`TraceId` と `SpanId` を OpenTelemetry の形式 ([符号なし 128bit 整数および符号なし 64bit 整数は、それぞれ 32 Hex 文字列および 16 Hex 文字列 (小文字)][2]) を Datadog 形式 ([符号なし 64bit 整数][3]) に変換する必要があります。

2. 自動挿入

3. トレースとログの相関が機能するには、言語レベルログが Datadog 属性に変換される必要があるため、ログが JSON として送信されていることを確認します。

特定の言語における OpenTelemetry トレースおよびログの相関方法について、詳しくは以下の例を参照してください。

{{< tabs >}}
{{% tab "Python" %}}

手動でトレースとログに相関性を持たせるには、OpenTelemetry 形式の `trace_id` および `span_id` を Datadog 形式に変換するプロセッサで、使用しているロギングモジュールにパッチを適用します。以下の例では、[structlog ロギングライブラリ][1]を使用しています。その他のロギングライブラリの場合は、[Datadog SDK の例を変更][2]した方がより適切なことがあります。また、`trace-examples` GitHub リポジトリでは、[OpenTelemetry がインスツルメントされた Python アプリケーションとそのトレース-ログ相関の例][3]が紹介されています。

```python
# ########## injection.py
from opentelemetry import trace

class CustomDatadogLogProcessor(object):
    def __call__(self, logger, method_name, event_dict):
        # Datadog 形式のトレースコンテキストのログへの追加例
        # from: https://github.com/open-telemetry/opentelemetry-python-contrib/blob/b53b9a012f76c4fc883c3c245fddc29142706d0d/exporter/opentelemetry-exporter-datadog/src/opentelemetry/exporter/datadog/propagator.py#L122-L129 
        current_span = trace.get_current_span()

        if current_span is not None:
            event_dict['dd.trace_id'] = str(current_span.context.trace_id & 0xFFFFFFFFFFFFFFFF)
            event_dict['dd.span_id'] = str(current_span.context.span_id)

        return event_dict        
# ##########

# ########## app.py
import .injection
import logging
import structlog
# カスタム形式を追加して、Datadog 形式のトレース ID をログに挿入
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
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/python/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/python-microservice/ddlogging/injection.py#L3
{{< /tabs >}}

{{% tab "Node.js" %}}

手動でトレースとログに相関性を持たせるには、OpenTelemetry 形式の `trace_id` および `span_id` を Datadog 形式に変換するプロセッサで、使用しているロギングモジュールにパッチを適用します。以下の例では、[winston ロギングライブラリ][1]を使用しています。その他のロギングライブラリの場合は、[Datadog SDK の例を変更][2]した方がより適切なことがあります。また、`trace-examples` GitHub リポジトリでは、[OpenTelemetry がインスツルメントされた Node.js アプリケーションとそのトレース-ログ相関の例][3]が紹介されています。

```js
// ########## logger.js

// 以下で dd に変換します。
// https://github.com/DataDog/dd-trace-js/blob/master/packages/dd-trace/src/id.js
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
// トレーサーを初期化します
// ...
// 
const logger = require('./logger') 
//
// アプリケーションでロガーを使用します
logger.info("Example log line with trace correlation info")
```



[1]: https://github.com/winstonjs/winston
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/nodejs/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/node-microservice/logger.js#L86
{{< /tabs >}}

{{% tab "Ruby" %}}

手動でトレースとログに相関性を持たせるには、OpenTelemetry 形式の `trace_id` および `span_id` を Datadog 形式に変換するプロセッサで、使用しているロギングモジュールにパッチを適用します。以下の例では、[Ruby 標準ライブラリロギング][1]を使用しています。Rails などその他のロギングライブラリの場合は、[Datadog SDK の例を変更][2]した方がより適切なことがあります。また、`trace-examples` GitHub リポジトリでは、[OpenTelemetry がインスツルメントされた Ruby アプリケーションとそのトレース-ログ相関の例][3]が紹介されています。

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
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/ruby/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/ruby-microservice/app.rb#L21-L35
{{< /tabs >}}

{{% tab "Java" %}}

手動でトレースとログに相関性を持たせるには、まず [openTelemetry-java-instrumentation ロガー MDC インスツルメンテーション][1]を有効にします。次に、OpenTelemetry 形式の `trace_id` および `span_id` を Datadog 形式に変換するプロセッサで、使用しているロギングモジュールにパッチを適用します。以下の例では、[Spring Boot および Logback][2]を使用しています。その他のロギングライブラリの場合は、[Datadog SDK の例を変更][2]した方がより適切なことがあります。

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


[1]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/logger-mdc-instrumentation.md
[2]: https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-logging.html
[3]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2#manually-inject-trace-and-span-ids
{{< /tabs >}}

{{% tab "PHP" %}}

PHP のトレースとログの相関では、[Datadog SDK PHP 例][1]を変更して上記で説明した追加ステップを含めます。

ご質問は、[Datadog サポートまでお問い合わせ][2]ください。




[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/php/
[2]: /ja/help/
{{< /tabs >}}

{{% tab "Go" %}}

トレースをログと手動で関連付けるには、使用しているログモジュールに、OpenTelemetry 形式の `trace_id` と `span_id` を Datadog 形式に変換する関数を適用します。次の例では、[logrus Library][1] を使用しています。

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

ご質問は、[Datadog サポートまでお問い合わせ][2]ください。



[1]: https://github.com/sirupsen/logrus
[2]: /ja/help/
{{< /tabs >}}

{{% tab ".NET" %}}

トレースとログを手動で相関付けるには、OpenTelemetry の `TraceId` と `SpanId` を Datadog が使用するフォーマットに変換します。これらの ID をログに `dd.trace_id` と `dd.span_id` 属性で追加してください。次の例では、[Serilog ライブラリ][1]を使用して、OpenTelemetry (`System.DiagnosticSource.Activity`) のトレースとスパン ID を Datadog の要求するフォーマットに変換する方法を示しています。

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
{{< /tabs >}}

{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[2]: https://github.com/open-telemetry/opentelemetry-specification/blob/eeef21259a12d61100804eff2e12ba06523821c3/specification/trace/api.md#retrieving-the-traceid-and-spanid
[3]: /ja/api/latest/tracing/#send-traces
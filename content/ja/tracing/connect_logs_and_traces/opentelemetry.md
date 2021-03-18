---
title: OpenTelemetry トレースとログに接続
kind: documentation
description: アプリケーションログと OpenTelemetry トレースを接続して Datadog で関連付けます
further_reading:
  - link: /tracing/setup_overview/open_standards/
    tag: Documentation
    text: OpenTelemetry トレースを Datadog へ送信
  - link: 'https://opentelemetry.io/docs/collector/'
    tag: OpenTelemetry
    text: Collectorドキュメント
  - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
    tag: ブログ
    text: Datadog と OpenTelemetry のパートナーシップ
---
OpenTelemetry 言語の SDK ログおよびトレースの Datadog 内での接続は、[Datadog SDK ログおよびトレース][1]の接続とほぼ同じですが、さらに以下の手順が必要です。

1. OpenTelemetry `TraceId` および `SpanId` プロパティは、Datadog のルールセットと異なります。そのため、`TraceId` と `SpanId` を OpenTelemetry の形式 ([符号なし 128bit 整数および符号なし 64bit 整数は、それぞれ 32 Hex 文字列および 16 Hex 文字列 (小文字)][2]) を Datadog 形式 ([符号なし 64bit 整数][3]) に変換する必要があります。

2. OpenTelemetry 言語の SDK には、Datadog SDK で提供されるトレースとログ間の自動相関がないため、前述のように変換済みの `TraceId` および `SpanId` をそれぞれ `dd.trace_id`、`dd.span_id` とマークしたログ属性として追加するプロセッサを使用して、特定のロギングモジュールまたはライブラリに手動でパッチを適用する必要があります。

3. トレースとログの相関が機能するには、言語レベルログが Datadog 属性に変換される必要があるため、ログが JSON として送信されていることを確認します。

特定の言語における OpenTelemetry トレースおよびログの相関方法について、詳しくは以下の例を参照してください。

{{< programming-lang-wrapper langs="python,nodejs,ruby,java,php,go,dotnet" >}}

{{< programming-lang lang="python" >}}

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
[2]: /ja/tracing/connect_logs_and_traces/python/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/python-microservice/ddlogging/injection.py#L3
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

手動でトレースとログに相関性を持たせるには、OpenTelemetry 形式の `trace_id` および `span_id` を Datadog 形式に変換するプロセッサで、使用しているロギングモジュールにパッチを適用します。以下の例では、[winston ロギングライブラリ][1]を使用しています。その他のロギングライブラリの場合は、[Datadog SDK の例を変更][2]した方がより適切なことがあります。また、`trace-examples` GitHub リポジトリでは、[OpenTelemetry がインスツルメントされた Nodejs アプリケーションとそのトレース-ログ相関の例][3]が紹介されています。

```js
// ########## logger.js

// 以下で dd に変換:
// https://github.com/DataDog/dd-trace-js/blob/master/packages/dd-trace/src/id.js
const opentelemetry = require('@opentelemetry/api');
const winston = require('winston')
const UINT_MAX = 4294967296

// バッファを数字列に変換。
function toNumberString (buffer, radix) {
  let high = readInt32(buffer, 0)
  let low = readInt32(buffer, 4)
  let str = ''

  radix = radix || 10

  while (1) {
    const mod = (high % radix) * UINT_MAX + low

    high = Math.floor(high / radix)
    low = Math.floor(mod / radix)
    str = (mod % radix).toString(radix) + str

    if (!high && !low) break
  }

  return str
}

// 指定した radix を使用して数字列をバッファに変換。
function fromString (str, raddix) {
  const buffer = new Uint8Array(8)
  const len = str.length

  let pos = 0
  let high = 0
  let low = 0

  if (str[0] === '-') pos++

  const sign = pos

  while (pos < len) {
    const chr = parseInt(str[pos++], raddix)

    if (!(chr >= 0)) break // NaN

    low = low * raddix + chr
    high = high * raddix + Math.floor(low / UINT_MAX)
    low %= UINT_MAX
  }

  if (sign) {
    high = ~high

    if (low) {
      low = UINT_MAX - low
    } else {
      high++
    }
  }

  writeUInt32BE(buffer, high, 0)
  writeUInt32BE(buffer, low, 4)

  return buffer
}

// 符号なしバイト整数をバッファに記述。
function writeUInt32BE (buffer, value, offset) {
  buffer[3 + offset] = value & 255
  value = value >> 8
  buffer[2 + offset] = value & 255
  value = value >> 8
  buffer[1 + offset] = value & 255
  value = value >> 8
  buffer[0 + offset] = value & 255
}

// バッファを符号なしバイト整数に読み込み。
function readInt32 (buffer, offset) {
  return (buffer[offset + 0] * 16777216) +
    (buffer[offset + 1] << 16) +
    (buffer[offset + 2] << 8) +
    buffer[offset + 3]
}

const tracingFormat = function () {
  return winston.format(info => {
    const span = opentelemetry.getSpan(opentelemetry.context.active());
    if (span) {
      const context = span.context();
      const traceIdEnd = context.traceId.slice(context.traceId.length / 2)
      info['dd.trace_id'] = toNumberString(fromString(traceIdEnd,16))
      info['dd.span_id'] = toNumberString(fromString(context.spanId,16))
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
// トレーサーを初期化
// ...
// 
const logger = require('./logger') 
//
// アプリケーションでロガーを使用
logger.info("Example log line with trace correlation info")
```


[1]: https://github.com/winstonjs/winston
[2]: /ja/tracing/connect_logs_and_traces/nodejs/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/node-microservice/logger.js#L86
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

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
[2]: /ja/tracing/connect_logs_and_traces/ruby/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/ruby-microservice/app.rb#L21-L35
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

手動でトレースとログに相関性を持たせるには、まず [openTelemetry-java-instrumentation ロガー MDC インスツルメンテーション][1]を有効にします。次に、OpenTelemetry 形式の `trace_id` および `span_id` を Datadog 形式に変換するプロセッサで、使用しているロギングモジュールにパッチを適用します。以下の例では、[Spring Boot および Logback][2]を使用しています。その他のロギングライブラリの場合は、[Datadog SDK の例を変更][2]した方がより適切なことがあります。

```java
String traceIdValue = Span.current().getSpanContext().getTraceIdAsHexString()
String traceIdHexString = traceIdValue.substring(traceIdValue.length() - 16 );
long datadogTraceId = Long.parseUnsignedLong(traceIdHexString, 16);
String datadogTraceIdString = Long.toUnsignedString(datadogTraceId)

logging.pattern.console = %d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg dd.trace_id=%X{datadogTraceIdString} dd.span_id=%X{spanId} %n
```

[1]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/logger-mdc-instrumentation.md
[2]: https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-logging.html
[3]: /ja/tracing/connect_logs_and_traces/java/?tab=log4j2#manually-inject-trace-and-span-ids
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

PHP のトレースとログの相関では、[Datadog SDK PHP 例][1]を変更して上記で説明した追加ステップを含めます。

ご質問は、[Datadog サポートまでお問い合わせ][2]ください。



[1]: /ja/tracing/connect_logs_and_traces/php/
[2]: /ja/help/
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Go のトレースとログの相関では、[Datadog SDK Go 例][1]を変更して上記で説明した追加ステップを含めます。

ご質問は、[Datadog サポートまでお問い合わせ][2]ください。


[1]: /ja/tracing/connect_logs_and_traces/go/
[2]: /ja/help/
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

.NET のトレースとログの相関では、[Datadog SDK .NET 例][1]を変更して上記で説明した追加ステップを含めます。

ご質問は、[Datadog サポートまでお問い合わせ][2]ください。


[1]: /ja/tracing/connect_logs_and_traces/dotnet/
[2]: /ja/help/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/connect_logs_and_traces/
[2]: https://github.com/open-telemetry/opentelemetry-specification/blob/eeef21259a12d61100804eff2e12ba06523821c3/specification/trace/api.md#retrieving-the-traceid-and-spanid
[3]: /ja/api/latest/tracing/#send-traces
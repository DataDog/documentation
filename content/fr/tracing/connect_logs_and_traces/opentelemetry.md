---
title: Associer vos traces OpenTelemetry à vos logs
kind: documentation
description: Associez vos logs d'application à vos traces OpenTelemetry pour les mettre en corrélation dans Datadog.
further_reading:
  - link: /tracing/setup_overview/open_standards/
    tag: Documentation
    text: Envoyer vos traces OpenTelemetry à Datadog
  - link: 'https://opentelemetry.io/docs/collector/'
    tag: OpenTelemetry
    text: Documentation Collector
  - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
    tag: Blog
    text: Partenariat de Datadog avec OpenTelemetry
---
Le processus d'association des logs et des traces pour les SDK OpenTelemetry est similaire à celui des [logs et des traces du SDK Datadog][1]. Vous devez simplement effectuer quelques étapes supplémentaires :

1. Les propriétés OpenTelemetry `TraceId` et `SpanId` ne respectent pas les normes de Datadog. Il est donc nécessaire de remplacer le format OpenTelemetry de `TraceId` et `SpanId` (à savoir, [un entier de 128 bits non signé et un entier de 64 bits non signé représentés respectivement par une chaîne en minuscule de 32 et 16 caractères hexadécimaux][2]) par un format Datadog ([un entier non signé 64 bits][3]).

2. Contrairement aux SDK Datadog, les SDK OpenTelemetry ne prennent pas en charge la mise en corrélation automatique entre les traces et les logs. Ainsi, il est nécessaire d'ajouter manuellement à votre module de journalisation, ou à votre bibliothèque, un processeur qui ajoute les `TraceId` et `SpanId` convertis précédemment en tant qu'attributs de log `dd.trace_id` et `dd.span_id`.

3. Assurez-vous que vos logs sont envoyés au format JSON, car vos logs au niveau des langages doivent être convertis en attributs Datadog afin que la corrélation entre les traces et les logs fonctionne.

Consultez les exemples suivants pour chaque langage afin de découvrir comment mettre en corrélation vos traces et vos logs OpenTelemetry.

{{< programming-lang-wrapper langs="python,nodejs,ruby,java,php,go,dotnet" >}}

{{< programming-lang lang="python" >}}

Pour mettre manuellement en corrélation vos traces et vos logs, ajoutez à votre module de journalisation un processeur qui convertit `trace_id` et `span_id` du format OpenTelemetry au format Datadog. L'exemple suivant utilise la [bibliothèque de journalisation structlog][1]. Pour les autres bibliothèques de journalisation, il peut être plus pertinent de [modifier les exemples de SDK Datadog][2]. Vous pouvez également consulter [un exemple d'application Python instrumentée avec OpenTelemetry et disposant de traces et de logs corrélés][3] dans le référentiel GitHub `trace-examples`.

```python
# ########## injection.py
from opentelemetry import trace

class CustomDatadogLogProcessor(object):
    def __call__(self, logger, method_name, event_dict):
        # Un exemple de contexte de trace au format Datadog ajouté aux logs
        # depuis https://github.com/open-telemetry/opentelemetry-python-contrib/blob/b53b9a012f76c4fc883c3c245fddc29142706d0d/exporter/opentelemetry-exporter-datadog/src/opentelemetry/exporter/datadog/propagator.py#L122-L129 
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
# Ajouter un format personnalisé pour injecter dans les logs des ID de trace au format Datadog
structlog.configure(
    processors=[
        injection.CustomDatadogLogProcessor(),
        structlog.processors.JSONRenderer(sort_keys=True)
    ],
)

log = structlog.getLogger()

log.info("Exemple de ligne de log avec des informations de corrélation des traces")
```


[1]: https://www.structlog.org/en/stable/standard-library.html
[2]: /fr/tracing/connect_logs_and_traces/python/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/python-microservice/ddlogging/injection.py#L3
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Pour mettre manuellement en corrélation vos traces et vos logs, ajoutez à votre module de journalisation un processeur qui convertit `trace_id` et `span_id` du format OpenTelemetry au format Datadog. L'exemple suivant utilise la [bibliothèque de journalisation winston][1]. Pour les autres bibliothèques de journalisation, il peut être plus pertinent de [modifier les exemples de SDK Datadog][2]. Vous pouvez également consulter [un exemple d'application NodeJS instrumentée avec OpenTelemetry et disposant de traces et de logs corrélés][3] dans le référentiel GitHub `trace-examples`.

```js
// ########## logger.js

// convertir au format dd avec :
// https://github.com/DataDog/dd-trace-js/blob/master/packages/dd-trace/src/id.js
const opentelemetry = require('@opentelemetry/api');
const winston = require('winston')
const UINT_MAX = 4294967296

// Convertir un buffer en chaîne numérique
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

// Convertir une chaîne numérique en buffer en utilisant le base spécifiée
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

// Stocker les octets d'un entier non signé dans un buffer
function writeUInt32BE (buffer, value, offset) {
  buffer[3 + offset] = value & 255
  value = value >> 8
  buffer[2 + offset] = value & 255
  value = value >> 8
  buffer[1 + offset] = value & 255
  value = value >> 8
  buffer[0 + offset] = value & 255
}

// Lire un buffer contenant des octets d'entier non signé
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
// Initialiser votre traceur
// ...
// 
const logger = require('./logger') 
//
// utiliser le logger dans votre application
logger.info("Exemple de ligne de log avec des informations de corrélation des traces")
```


[1]: https://github.com/winstonjs/winston
[2]: /fr/tracing/connect_logs_and_traces/nodejs/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/node-microservice/logger.js#L86
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Pour mettre manuellement en corrélation vos traces et vos logs, ajoutez à votre module de journalisation un processeur qui convertit `trace_id` et `span_id` du format OpenTelemetry au format Datadog. L'exemple suivant utilise la [bibliothèque de journalisation Ruby standard][1]. Pour les applications Rails, ou les autres bibliothèques de journalisation, il peut être plus pertinent de [modifier les exemples de SDK Datadog][2]. Vous pouvez également consulter [un exemple d'application Ruby instrumentée avec OpenTelemetry et disposant de traces et de logs corrélés][3] dans le référentiel GitHub `trace-examples`.

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

logger.info("Exemple de ligne de log avec des informations de corrélation des traces")
```



[1]: https://ruby-doc.org/stdlib-3.0.0/libdoc/logger/rdoc/index.html
[2]: /fr/tracing/connect_logs_and_traces/ruby/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/ruby-microservice/app.rb#L21-L35
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Pour mettre manuellement en corrélation vos traces et vos logs, activez d'abord l'[instrumentation du logger MDC openTelemetry-java-instrumentation][1]. Ajoutez ensuite au module un processeur qui convertit `trace_id` et `span_id` du format OpenTelemetry au format Datadog. L'exemple suivant utilise [Spring Boot et Logback][2]. Pour les autres bibliothèques de journalisation, il peut être plus pertinent de [modifier les exemples de SDK Datadog][3].

```java
String traceIdValue = Span.current().getSpanContext().getTraceId();
String traceIdHexString = traceIdValue.substring(traceIdValue.length() - 16 );
long datadogTraceId = Long.parseUnsignedLong(traceIdHexString, 16);
String datadogTraceIdString = Long.toUnsignedString(datadogTraceId);

String spanIdValue = Span.current().getSpanContext().getSpanId();
String spanIdHexString = spanIdValue.substring(spanIdValue.length() - 16 );
long datadogSpanId = Long.parseUnsignedLong(spanIdHexString, 16);
String datadogSpanIdString = Long.toUnsignedString(datadogSpanId);

logging.pattern.console = %d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg dd.trace_id=%X{datadogTraceIdString} dd.span_id=%X{datadogSpanIdString} %n
```

[1]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/logger-mdc-instrumentation.md
[2]: https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-logging.html
[3]: /fr/tracing/connect_logs_and_traces/java/?tab=log4j2#manually-inject-trace-and-span-ids
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

Pour mettre en corrélation des traces et des logs en PHP, modifiez les [exemples de SDK Datadog PHP][1] en suivant les étapes supplémentaires présentées ci-dessus.

Pour toute question, contactez [l'assistance Datadog][2].



[1]: /fr/tracing/connect_logs_and_traces/php/
[2]: /fr/help/
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Pour mettre en corrélation des traces et des logs en Go, modifiez les [exemples de SDK Datadog Go][1] en suivant les étapes supplémentaires présentées ci-dessus.

Pour toute question, contactez [l'assistance Datadog][2].


[1]: /fr/tracing/connect_logs_and_traces/go/
[2]: /fr/help/
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

Pour mettre en corrélation des traces et des logs en .NET, modifiez les [exemples de SDK Datadog .NET][1] en suivant les étapes supplémentaires présentées ci-dessus.

Pour toute question, contactez [l'assistance Datadog][2].


[1]: /fr/tracing/connect_logs_and_traces/dotnet/
[2]: /fr/help/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/connect_logs_and_traces/
[2]: https://github.com/open-telemetry/opentelemetry-specification/blob/eeef21259a12d61100804eff2e12ba06523821c3/specification/trace/api.md#retrieving-the-traceid-and-spanid
[3]: /fr/api/latest/tracing/#send-traces
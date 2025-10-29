---
description: Aprende a añadir la instrumentación personalizada a métodos y funciones
  para obtener una visibilidad detallada de tu lógica empresarial y del rendimiento
  de tu aplicación.
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 minutos
  text: Alertar sobre la latencia p99 anómala de un servicio de base de datos
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 minutos
  text: Comparar la latencia del servicio con la de la semana anterior
- link: /tracing/guide/slowest_request_daily/
  tag: 3 minutos
  text: Depurar la traza (traza) más lenta en el endpoint más lento de un servicio
    web
- link: /tracing/guide/
  tag: ''
  text: Todas las guías
title: Instrumentar un método personalizado para obtener una visibilidad profunda
  de tu lógica de negocio
---

_8 minutos para completarlo_

{{< img src="tracing/guide/custom_span/custom_span_1_cropped.png" alt="Vista de análisis" style="width:90%;">}}

<div class="alert alert-danger">En esta página se describe el uso de OpenTracing para la instrumentación personalizada de aplicaciones. OpenTracing está obsoleto. Los conceptos presentados aquí todavía se aplican, pero te recomendamos seguir las instrucciones y ejemplos de <a href="/tracing/trace_collection/otel_instrumentation/">Instrumentación personalizada con OpenTelemetry</a> para tu lenguaje. </div>

Para proporcionarte una visibilidad profunda de tu lógica de negocio, la APM de Datadog te permite personalizar los tramos (spans) que componen tus trazas en función de tus necesidades e implementación. Esto te permite rastrear cualquier método de tu código base e incluso componentes específicos dentro de los métodos. Puedes utilizar esto para optimizar y monitorizar áreas críticas de tu aplicación en la granularidad que funcione para ti.

Datadog instrumenta muchos marcos predefinidos, como servicios web, bases de datos y cachés y te permite instrumentar tu propia lógica de negocio para tener la visibilidad exacta que necesitas. Mediante la creación de tramos para los métodos, puedes optimizar el tiempo y rastrear errores utilizando la gráfica de llamas y las monitorizaciones de APM.

## Instrumentar tu código

**Follow the example to get your code instrumented** (Seguir el ejemplo para instrumentar tu código).

En estos ejemplos se explica el rastreo de todo el método `BackupLedger.write` para medir su tiempo y estado de ejecución.`BackupLedger.write` es una acción que guarda en la memoria el estado actual de un libro de contabilidad de transacciones antes de hacer una llamada a una base de datos de pagos para contabilizar un nuevo cargo de un cliente. Esto sucede cuando se accede al endpoint `charge` del servicio de pagos:

{{< img src="tracing/guide/custom_span/custom_span_2_cropped.png" alt="Vista de análisis" style="width:90%;">}}

El tramo `http.request POST /charge/` está tardando mucho sin tener ningún tramo secundario directo. Esta es una pista de que esta solicitud requiere más instrumentación para conocer mejor su comportamiento. Según el lenguaje de programación que utilices, decora tus funciones de forma diferente:
{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

En Java, la APM Datadog te permite instrumentar tu código para generar tramos personalizados, ya sea utilizando decoradores de métodos o instrumentando bloques de código específicos.

**Instrumentar un método con un decorador**:

Este ejemplo añade un tramo al método `BackupLedger.write`, que añade nuevas filas a un libro de contabilidad de transacciones. Se añade un tramo para rastrear todas las transacciones contabilizadas como una sola unidad.

```java
import datadog.trace.api.Trace

public class BackupLedger {

  // Utiliza la anotación @Trace para rastrear métodos personalizados
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      ledger.put(transaction.getId(), transaction);
    }

    // [...]
  }
}
```

**Instrument a specific code block** (Instrumentar un bloque de código específico):

Este ejemplo añade tramos secundarios al tramo `BackupLedger.write` creado anteriormente. Este método añade un tramo secundario para cada transacción en el libro de contabilidad y una [etiqueta personalizada][1] con el ID de transacción específico.

```java
import datadog.trace.api.Trace;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class BackupLedger {

  // Utiliza la anotación `@Trace` para rastrear métodos personalizados
  @Trace
  public void write(List<Transaction> transactions) {
    para (Transaction transaction : transactions) {
      // Utiliza `GlobalTracer` para rastrear bloques del código insertado
      Tracer tracer = GlobalTracer.get();
      // Nota: El ámbito en el siguiente bloque intentar con el recurso
      // se cerrará automáticamente al final del bloque de código.
      // Si no utilizas una instrucción probar con el recurso, deberás
      // llamar a scope.close().
      prueba (Scope scope = tracer.buildSpan("BackupLedger.persist").startActive(true)) {
        // Añade metadatos personalizados al tramo
        scope.span().setTag("transaction.id", transaction.getId());
        ledger.put(transaction.getId(), transaction);
      }
    }

    // [...]
  }
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

En Python, la APM Datadog te permite instrumentar tu código para generar tramos personalizados, ya sea utilizando decoradores de métodos o instrumentando bloques de código específicos.

**Instrumentar un método con un decorador**:

Este ejemplo añade un tramo al método `BackupLedger.write`, que añade nuevas filas a un libro de contabilidad de transacciones. Se añade un tramo para rastrear todas las transacciones contabilizadas como una sola unidad.

```python
from ddtrace import tracer

class BackupLedger:

    # Utiliza el decorador `tracer.wrap` para rastrear métodos personalizados
    @tracer.wrap()
    def write(self, transactions):
        para una transacción en transacciones:
            self.ledger[transaction.id] = transaction

        # [...]
```

**Instrument a specific code block** (Instrumentar un bloque de código específico):

Este ejemplo añade tramos secundarios al tramo `BackupLedger.write` creado anteriormente. Este método añade un tramo secundario para cada transacción en el libro de contabilidad y una [etiqueta personalizada][1] con el ID de transacción específico.

```python
from ddtrace import tracer

class BackupLedger:

    # Utiliza el decorador `tracer.wrap` para rastrear métodos personalizados
    @tracer.wrap()
    def write(self, transactions):
        para la transacción en transacciones:
            # Utiliza el administrador del contexto `tracer.trace` para rastrear bloques del código insertado
            con el tramo tracer.trace('BackupLedger.persist'):
                # Añade metadatos personalizados al tramo "persist_transaction"
                span.set_tag('transaction.id', transaction.id)
                self.ledger[transaction.id] = transaction

        # [...]
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

En Ruby, la APM Datadog te permite instrumentar tu código para generar tramos personalizados instrumentando bloques de código específicos.

  Este ejemplo crea un nuevo tramo para la llamada al método `BackupLedger.write` y un tramo secundario para cada transacción contabilizada en el libro de contabilidad con una [etiqueta personalizada][1] con el ID de transacción específico.

```ruby
require 'ddtrace'

class BackupLedger

  def write(transactions)
    # Utiliza `Datadog::Tracing.trace` global para rastrear bloques del código insertado
    Datadog::Tracing.trace('BackupLedger.write') do |method_span|
      transactions.each do |transaction|
        Datadog::Tracing.trace('BackupLedger.persist') do |span|
          # Añade metadatos personalizados al tramo "persist_transaction"
          span.set_tag('transaction.id', transaction.id)
          ledger[transaction.id] = transaction
        end
      end
    end

    # [...]
  end
end
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

  En Go, la APM Datadog te permite instrumentar tu código para generar tramos personalizados instrumentando bloques de código específicos.

  Este ejemplo crea un nuevo tramo para cada transacción contabilizada en el libro de contabilidad y añade una [etiqueta personalizada][1] con el ID de transacción específico al tramo.

  {{% tracing-go-v2 %}}

```go
package ledger

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

// [...]

func (bl *BackupLedger) write(ctx context.Context, transactions []*Transaction) (err error) {
  // Trace the `write` function and capture the error if present
  span, ctx := tracer.StartSpanFromContext(ctx, "BackupLedger.write")
  defer func() {
    span.Finish(tracer.WithError(err))
  }()

  for _, t := range transactions {
    if err := bl.persistTransaction(ctx, t); err != nil {
      return err
    }
  }
  return nil
}

// persistTransaction is an inner function you may want to Trace. You can use the
// same approach as before because the `ctx` you pass down includes out-of-the-box span
// references to create a parent/child relationships.
func (bl *BackupLedger) persistTransaction(ctx context.Context, transaction *Transaction) error {
  id := transaction.ID
  span, _ := tracer.StartSpanFromContext(ctx, "BackupLedger.persist", tracer.Tag("transaction_id", id))
  defer span.Finish()

  if t, ok := bl.transactions[id]; ok {
    return errors.New("duplicate entry")
  }
  bl.transactions[id] = transaction
  return nil
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[2]: /es/tracing/trace_collection/custom_instrumentation/go/migration

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

  En Node.js, la APM Datadog te permite instrumentar tu código para generar tramos personalizados instrumentando bloques de código específicos.

Este ejemplo crea un nuevo tramo para la llamada al método `BackupLedger.write` y un tramo secundario para cada transacción contabilizada en el libro de contabilidad con una [etiqueta personalizada][1] con el ID de transacción específico.

```javascript
const tracer = require('dd-trace')

function write (transactions) {
  // Utiliza el administrador de contexto `tracer.trace` para rastrear bloques del código insertado
  tracer.trace('BackupLedger.write', () => {
    para (const transaction of transactions) {
      tracer.trace('BackupLedger.persist' , (span) => {
        // Añade metadatos personalizados al tramo "persist_transaction"
        span.setTag('transaction.id', transaction.id)
        this.ledger[transaction.id] = transaction
      })
    }
  })

  // [...]
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

  En .NET, la APM Datadog te permite instrumentar tu código para generar tramos personalizados instrumentando bloques de código específicos.

Este ejemplo crea un nuevo tramo para cada transacción contabilizada en el libro de contabilidad y añade una [etiqueta personalizada][1] con el ID de transacción específico al tramo.

```csharp
using Datadog.Trace;

public void Write(List<Transaction> transactions)
{
    // Utiliza el rastreador global para rastrear bloques del código insertado
    utilizando (var scope = Tracer.Instance.StartActive("BackupLedger.write"))
    {
        foreach (var transaction in transactions)
        {
            utilizando (var scope = Tracer.Instance.StartActive("BackupLedger.persist"))
            {
                // Añade metadatos personalizados al tramo
                scope.Span.SetTag("transaction.id", transaction.Id);
                this.ledger[transaction.Id] = transaction;
            }
        }
    }

    // [...]
}
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

En PHP, la APM Datadog te permite instrumentar tu código para generar tramos personalizados, ya sea utilizando contenedores de métodos o instrumentando bloques de código específicos.

**Instrument a method with a wrapper** (Instrumentar un método con un contenedor):

Este ejemplo añade un tramo al método `BackupLedger.write`, que añade nuevas filas a un libro de contabilidad de transacciones. Se añade un tramo para rastrear todas las transacciones contabilizadas como una sola unidad utilizando la función `DDTrace\trace_method()` .

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        $this->transactions[$transaction->getId()] = $transaction;
      }

      # [...]
    }
  }

  // For ddtrace < v0.47.0 use \dd_trace_method()
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

**Instrument a specific code block** (Instrumentar un bloque de código específico):

Este ejemplo añade tramos secundarios al tramo `BackupLedger.write` creado anteriormente. Este método añade un tramo secundario para cada transacción en el libro de contabilidad y una [etiqueta personalizada][1] con el ID de transacción específico.

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        // Utiliza el rastreador global para rastrear bloques del código insertado
        $span = \DDTrace\start_span();
        $span->name = 'BackupLedger.persist';

        // Añade metadatos personalizados al tramo
        $span->meta['transaction.id'] = $transaction->getId();
        $this->transactions[$transaction->getId()] = $transaction;

        // Cierra el tramo
        \DDTrace\close_span();
      }

      # [...]
    }
  }

  // For ddtrace < v0.47.0 use \dd_trace_method()
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Aprovechar la UI de Datadog para ver tus nuevos tramos personalizados

Ahora que has instrumentado tu lógica de negocio, es el momento de ver los resultados en la UI de la APM Datadog .

1. Ve a **[Software Catalog][1]** y haz clic en el servicio al que has añadido spans (tramos) personalizados, para abrir su page (página) de servicio. En la page (página) de servicio, haz clic en el **recurso específico** que has añadido, cambia el filtro de tiempo a `The past 15 minutes` y desplázate hacia abajo hasta la tabla resumen de spans (tramos):

    {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="Tabla de resumen de tramos" style="width:90%;">}}

La tabla resumen tramos proporciona información agregada sobre los tramos que componen tus trazas. Aquí puedes identificar tramos que se repiten una cantidad anormal de veces, lo cual indica algún bucle o ineficiencia de acceso a la base de datos (como el problema [`n+1`][2]).

2. Desplázate hacia abajo a **Traces list** (Lista de trazas) y haz clic en una de tus trazas.

    {{< img src="tracing/guide/custom_span/custom_span_4_cropped.png" alt="Vista de análisis" style="width:90%;">}}

Has añadido con éxito tramos personalizados a tu código base y has hecho que estén disponibles en la gráfica de llamas y en [Análisis de la aplicación][3]. Este es el primer paso para aprovechar al máximo las herramientas de Datadog. Ahora puedes [añadir etiquetas personalizadas a tus tramos][4] para hacerlos aún más potentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://bojanv91.github.io/posts/2018/06/select-n-1-problem
[3]: https://app.datadoghq.com/apm/traces?viz=timeseries
[4]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
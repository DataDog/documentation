---
title: Métricas personalizadas de aplicaciones serverless de AWS Lambda
---

## Información general

Hay varias formas de enviar métricas personalizadas a Datadog desde una función de Lambda.

- **[Creación de métricas personalizadas a partir de logs o trazas (traces)](#creating-custom-metrics-from-logs-or-traces)**: si tus funciones de Lambda ya envían datos de trazas o logs a Datadog, y los datos que quieres consultar se encuentran en un log o una traza existente, puedes generar métricas personalizadas a partir de logs y trazas sin volver a desplegar ni hacer cambios en el código de tu aplicación.
- **[Envío de métricas personalizadas mediante la Datadog Lambda Extension](#with-the-datadog-lambda-extension)**: si quieres enviar métricas personalizadas directamente desde tu función de Lambda, Datadog recomienda utilizar la [Datadog Lambda Extension][1].
- **[Envío de métricas personalizadas mediante la función de Lambda del Datadog Forwarder](#with-the-datadog-forwarder)**: si envías telemetría desde tu función de Lambda a través de la función de Lambda del Datadog Forwarder, puedes enviar métricas personalizados a través de logs con las funciones auxiliares que ofrece Datadog.
- **[(Obsoleto) Envío de métricas personalizadas desde logs de CloudWatch](#deprecated-cloudwatch-logs)**: el método para enviar métricas personalizadas mediante la impresión de un log formateado como `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` ha quedado en desuso. Datadog recomienda utilizar la [Datadog Lambda Extension](#with-the-datadog-lambda-extension) en su lugar.
- **(Obsoleto) Envío de métricas personalizadas mediante la biblioteca Lambda de Datadog**: la biblioteca Lambda de Datadog para Python, Node.js y Go admite el envío de métricas personalizadas de forma sincrónica desde el tiempo de ejecución a Datadog con el bloqueo de la invocación cuando `DD_FLUSH_TO_LOG` se define como `false`. Además de la sobrecarga del rendimiento, los envíos de métricas también pueden sufrir errores intermitentes debido a la falta de reintentos por problemas transitorios de red. Datadog recomienda utilizar la [Datadog Lambda Extension](#with-the-datadog-lambda-extension) en su lugar.
- **(No recomendado) Uso de una biblioteca de terceros**: la mayoría de las bibliotecas de terceros no envían métricas como distribuciones y pueden dar lugar a resultados mal contabilizados. También pueden sufrir errores intermitentes debido a la falta de reintentos por problemas transitorios de red.

### Comprender las métricas de distribución

Cuando Datadog recibe varios puntos de métricas count o gauge que comparten la misma marca de tiempo y el mismo conjunto de etiquetas, solo cuenta el punto más reciente. Esto funciona para las aplicaciones basadas en hosts porque el Datadog Agent agrega los puntos de métricas y les aplica una etiqueta `host` única.

Una función de Lambda puede iniciar muchos entornos de ejecución de forma simultánea cuando hay un aumento de tráfico. La función puede llegar a enviar puntos de métricas count o gauge que se sobrescriben entre sí y generan resultados mal contabilizados. Para evitar este problema, las métricas personalizadas generadas a partir de funciones de Lambda se envían como [distribuciones][2], ya que los puntos de las métricas de distribución se agregan en el backend de Datadog y todos ellos se cuentan.

Las distribuciones ofrecen las agregaciones `avg`, `sum`, `max`, `min` y `count` de forma predeterminada. En la página Metric Summary (Resumen de métrica), puedes habilitar agregaciones percentiles (p50, p75, p90, p95, p99) y también [gestionar etiquetas][3]. Para monitorizar la distribución de un tipo de métrica gauge, utiliza `avg` tanto para las [agregaciones temporales como espaciales][4]. Para monitorizar la distribución de un tipo de métrica count, utiliza `sum` tanto para las [agregaciones temporales como espaciales][4]. Lee la guía [Consulta al gráfico][5] para saber cómo funcionan las agregaciones temporales y espaciales.

### Envío de muchos puntos de datos

Cuando se utiliza el Forwarder para enviar muchos puntos de datos para la misma métrica y el mismo conjunto de etiquetas, por ejemplo, dentro de un gran bucle `for`, puede haber un impacto notable en el rendimiento de Lambda y también un impacto en el coste de CloudWatch. Para evitar la sobrecarga, puedes agregar los puntos de datos en tu aplicación. Consulta el siguiente ejemplo de Python:

```python
def lambda_handler(event, context):

    # Ineficiente cuando event['Records'] contiene muchos registros
    for record in event['Records']:
      lambda_metric("record_count", 1)

    # Implementación mejorada
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

## Creación de métricas personalizadas a partir de logs o trazas

Con las métricas basadas en logs, puedes registrar un recuento de logs que coincidan con una consulta o resumir un valor numérico contenido en un log, como la duración de una solicitud. Las métricas basadas en logs son una forma rentable de resumir los datos de los logs de todo el flujo (stream) de la ingesta. Obtén más información sobre la [creación de métricas basadas en logs][6].

También puedes generar métricas a partir de todos los tramos (spans) ingeridos, independientemente de si están indexados por un filtro de retención. Obtén más información sobre la [creación de métricas basadas en tramos][7].
## Con la Datadog Lambda Extension

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de métricas personalizadas desde AWS Lambda" >}}

Datadog recomienda utilizar la [Datadog Lambda Extension][1] para enviar métricas personalizadas como [**distribución**](#understanding-distribution-metrics) desde los tiempos de ejecución de Lambda admitidos.

1. Sigue las [instrucciones de instalación serverless][8] generales para tu tiempo de ejecución de Lambda.
1. Si no te interesa recopilar las trazas de tu función de Lambda, define la variable de entorno `DD_TRACE_ENABLED` como `false`.
1. Si no te interesa recopilar los logs de tu función de Lambda, define la variable de entorno `DD_SERVERLESS_LOGS_ENABLED` como `false`.
1. Sigue el código de ejemplo o las instrucciones que se indican más abajo para enviar tu métrica personalizada.

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Nombre de la métrica
        12.45,                                  # Valor de la métrica
        tags=['product:latte', 'order:online']  # Etiquetas asociadas
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Nombre de la métrica
        12.45,                      // Valor de la métrica
        'product:latte',            // Primera etiqueta
        'order:online'              // Segunda etiqueta
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Nombre de la métrica
    12.45,                          // Valor de la métrica
    "product:latte", "order:online" // Etiquetas asociadas
  )
}
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Instala la última versión de [java-dogstatsd-client][1] y, luego, sigue el código de ejemplo que aparece abajo para enviar tus métricas personalizadas como [**distribución**](#understanding-distribution-metrics).

```java
package com.datadog.lambda.sample.java;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyResponseEvent;

// import the statsd client builder
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // instantiate the statsd client
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // submit a distribution metric
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }

    static {
        // ensure all metrics are flushed before shutdown
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                System.out.println("[runtime] shutdownHook triggered");
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    System.out.println("[runtime] sleep interrupted");
                }
                System.out.println("[runtime] exiting");
            }
        });
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Instala la última versión de [dogstatsd-csharp-client][1] y, luego, sigue el código de ejemplo que aparece abajo para enviar tus métricas personalizadas como [**métricas de distribución**](#understanding-distribution-metrics).

```csharp
using System.IO;

// importa el cliente statsd
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // crea la instancia del cliente statsd
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };
        if (!DogStatsd.Configure(dogstatsdConfig))
            throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    }

    public Stream MyHandler(Stream stream)
    {
        // envía una métrica de distribución
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // la lógica de tu función
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. [Instala][1] el cliente DogStatsD para tu tiempo de ejecución.
2. Sigue el [código de ejemplo][2] para enviar tus métricas personalizadas como [**distribución**](#understanding-distribution-metrics).


[1]: /es/developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /es/developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Con el Datadog Forwarder

Datadog recomienda utilizar la [función de Lambda del Datadog Forwarder][9] para enviar métricas personalizados desde tiempos de ejecución de Lambda que no son compatibles con la Lambda Datadog Extension.

1. Sigue las [instrucciones de instalación serverless][8] generales para instrumentar tu función de Lambda con la función de Lambda del Datadog Forwarder.
1. Si no te interesa recopilar las trazas de tu función de Lambda, define la variable de entorno `DD_TRACE_ENABLED` como `false` en tu función de Lambda.
1. Si no te interesa recopilar los logs de tu función de Lambda, define el parámetro del stack tecnológico de CloudFormation `DdForwardLog` como `false` en el Forwarder.
1. Importa y utiliza una función auxiliar de la biblioteca Lambda de Datadog, como `lambda_metric` o `sendDistributionMetric`, para enviar tus métricas personalizadas con el código de ejemplo que aparece abajo.

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Nombre de la métrica
        12.45,                                  # Valor de la métrica
        tags=['product:latte', 'order:online']  # Etiquetas asociadas
    )

    # Envía una métrica con una marca de tiempo que esté dentro de los últimos 20 minutos
    lambda_metric(
        "coffee_house.order_value",             # Nombre de la métrica
        12.45,                                  # Valor de la métrica
        timestamp=int(time.time()),             # Unix epoch en segundos
        tags=['product:latte', 'order:online']  # Etiquetas asociadas
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Nombre de la métrica
        12.45,                      // Valor de la métrica
        'product:latte',            // Primera etiqueta
        'order:online'              // Segunda etiqueta
    );

    // Envía una métrica con una marca de tiempo que esté dentro de los últimos 20 minutos
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // Nombre de la métrica
        12.45,                      // Valor de la métrica
        new Date(Date.now()),       // Fecha
        'product:latte',            // Primera etiqueta
        'order:online',             // Segunda etiqueta
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Nombre de la métrica
    12.45,                          // Valor de la métrica
    "product:latte", "order:online" // Etiquetas asociadas
  )

  // Envía una métrica con una marca de tiempo que esté dentro de los últimos 20 minutos
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // Nombre de la métrica
    12.45,                          // Valor de la métrica
    time.Now(),                     // Marca de tiempo
    "product:latte", "order:online" // Etiquetas asociadas
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # Solo tienes que envolver el controlador de tu función (no las funciones auxiliares).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Nombre de la métrica
          12.45,                              # Valor de la métrica
          "product":"latte", "order":"online" # Etiquetas asociadas
        )

        # Envía una métrica con una marca de tiempo que esté dentro de los últimos 20 minutos
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Nombre de la métrica
          12.45,                              # Valor de la métrica
          time: Time.now.utc,                 # Marca de tiempo
          "product":"latte", "order":"online" # Etiquetas asociadas
        )
    end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order", "online");

        dd.metric(
            "coffee_house.order_value", // Nombre de la métrica
            12.45,                      // Valor de la métrica
            myTags);                    // Etiquetas asociadas
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

Escribe una función reutilizable que genere logs de tus métricas personalizadas en el siguiente formato:

```json
{
    "m": "Nombre de la métrica",
    "v": "Valor de la métrica",
    "e": "Marca de tiempo Unix (segundos)",
    "t": "Matriz de etiquetas"
}
```

Por ejemplo:

```json
{
    "m": "coffee_house.order_value",
    "v": 12.45,
    "e": 1572273854,
    "t": ["product:latte", "order:online"]
}
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## [OBSOLETO] Logs de CloudWatch

**Este método de envío de métricas personalizadas ya no es compatible y está deshabilitado para todos los clientes nuevos. Migra a una de las soluciones recomendadas.**

**Nota**: Si vas a migrar a una de las soluciones recomendadas, tendrás que empezar a instrumentar tus métricas personalizadas con **nombres de métrica nuevos** cuando las envíes a Datadog. No puede existir de forma simultánea el mismo nombre de métrica tanto como tipo de métrica de distribución como de no distribución.

Esto requiere los siguientes permisos de AWS en tu [política de IAM de Datadog][10].

| Permiso de AWS            | Descripción                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | Enumera los grupos de logs disponibles.                                  |
| `logs:DescribeLogStreams` | Enumera los flujos de logs disponibles para un grupo.                     |
| `logs:FilterLogEvents`    | Recupera eventos de log específicos de un flujo para generar métricas. |

Para enviar métricas personalizadas a Datadog desde tus logs de Lambda, imprime una línea de log en el siguiente formato:

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

Donde:

- `MONITORING` indica a la integración de Datadog que debe recopilar esta entrada de log.
- `<UNIX_EPOCH_TIMESTAMP>` está en segundos, no en milisegundos.
- `<METRIC_VALUE>` DEBE ser un número (entero o flotante).
- `<METRIC_TYPE>` es `count`, `gauge`, `histogram` o `check`.
- `<METRIC_NAME>` identifica tu métrica de forma exclusiva y sigue la [política de nomenclatura de métricas][11].
- `<TAG_LIST>` es opcional, se separa por comas y debe ir precedido de `#`. La etiqueta `function_name:<name_of_the_function>` se aplica automáticamente a las métricas personalizadas.

**Nota**: La suma de cada marca de tiempo se utiliza para counts y el último valor de una marca de tiempo dada se utiliza para gauges. No se recomienda imprimir una sentencia de log cada vez que aumenta una métrica, ya que esto hace que el análisis de logs tarde más. Actualiza continuamente el valor de la métrica en tu código e imprime una sentencia de log para esa métrica antes de que la función termine de ejecutarse.

[1]: /es/serverless/libraries_integrations/extension/
[2]: /es/metrics/distributions/
[3]: /es/metrics/distributions/#customize-tagging
[4]: /es/metrics/#time-and-space-aggregation
[5]: /es/dashboards/guide/query-to-the-graph/
[6]: /es/logs/logs_to_metrics/
[7]: /es/tracing/trace_pipeline/generate_metrics/
[8]: /es/serverless/installation/
[9]: /es/serverless/forwarder/
[10]: /es/integrations/amazon_web_services/?tab=roledelegation#datadog-aws-iam-policy
[11]: /es/metrics/
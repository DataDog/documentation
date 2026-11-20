---
title: Custom Metrics desde aplicaciones Serverless de AWS Lambda
---
## Descripción general {#overview}

Existen algunas formas diferentes de enviar Custom Metrics a Datadog desde una función Lambda.

- **[Crear Custom Metrics a partir de registros o trazas](#creating-custom-metrics-from-logs-or-traces)**: Si sus funciones Lambda ya envían datos de trazas o registros a Datadog y los datos que desea consultar están capturados en un registro o una traza existente, puede generar Custom Metrics a partir de registros y trazas sin volver a implementar la aplicación ni realizar cambios en su código.
- **[Envío de Custom Metrics mediante Datadog Lambda Extension](#with-the-datadog-lambda-extension)**: Si desea enviar Custom Metrics directamente desde su función Lambda, Datadog recomienda usar [Datadog Lambda Extension][1].
- **[Envío de Custom Metrics mediante Datadog Forwarder Lambda](#with-the-datadog-forwarder)**: Si envía telemetría desde su función Lambda a través de Datadog Forwarder Lambda, puede enviar Custom Metrics mediante registros usando las funciones auxiliares proporcionadas por Datadog.
- **[(Obsoleto) Envío de Custom Metrics desde registros de CloudWatch](#deprecated-cloudwatch-logs)**: El método para enviar Custom Metrics mediante la impresión de un registro con el formato `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` ha quedado obsoleto. Datadog recomienda usar [Datadog Lambda Extension](#with-the-datadog-lambda-extension) en su lugar.
- **(Obsoleto) Envío de Custom Metrics mediante la biblioteca de Datadog para Lambda**: La biblioteca de Datadog para Lambda, disponible para Python, Node.js y Go, permite enviar Custom Metrics de forma sincrónica desde el entorno de ejecución a Datadog al bloquear la invocación cuando `DD_FLUSH_TO_LOG` se establece en `false`. Además de la sobrecarga de rendimiento, los envíos de métricas también pueden presentar errores intermitentes por problemas transitorios de red, ya que no se realizan reintentos. Datadog recomienda usar [Datadog Lambda Extension](#with-the-datadog-lambda-extension) en su lugar.
- **(No recomendado) Uso de una biblioteca de terceros**: La mayoría de las bibliotecas de terceros no envían las métricas como distribuciones, lo que puede dar lugar a recuentos inferiores a los reales. También pueden producirse errores intermitentes por problemas transitorios de red, ya que no se realizan reintentos.

### Entender las métricas de distribución {#understanding-distribution-metrics}

Cuando Datadog recibe múltiples puntos de métricas de tipo count o gauge que comparten la misma marca de tiempo y conjunto de etiquetas, solo cuenta el más reciente. Esto funciona para aplicaciones basadas en servidores porque el Agent de Datadog agrega los puntos de métrica y les asigna una etiqueta `host` única.

Una función Lambda puede iniciar muchos entornos de ejecución concurrentes cuando aumenta el tráfico. La función puede enviar puntos de métricas de tipo count o gauge que se sobrescriben entre sí y producen recuentos inferiores a los reales. Para evitar este problema, las Custom Metrics generadas por funciones Lambda se envían como [distribuciones][2] porque los puntos de métricas de distribución se agregan en el backend de Datadog y cada punto de métrica cuenta.

Las distribuciones proporcionan agregaciones de `avg`, `sum`, `max`, `min`, `count` de forma predeterminada. En la página {{< ui >}}Metrics Catalog{{< /ui >}}, puede habilitar agregaciones de percentiles (p50, p75, p90, p95, p99) y también [administrar etiquetas][3]. Para monitorear una distribución de una métrica de tipo gauge, use `avg` tanto para las [agregaciones de tiempo como para las de espacio][4]. Para monitorear una distribución de una métrica de tipo count, use `sum` tanto para las [agregaciones de tiempo como para las de espacio][4]. Consulte la guía [Query to the Graph][5] para saber cómo funcionan las agregaciones de tiempo y espacio.

### Envío de muchos puntos de datos {#submitting-many-data-points}

Al usar el Forwarder para enviar muchos puntos de datos para la misma métrica y el mismo conjunto de etiquetas, por ejemplo, dentro de un bucle `for` grande, puede haber un impacto notable en el rendimiento de Lambda y también un impacto en los costos de CloudWatch. Puede agregar los puntos de datos en su aplicación para evitar la sobrecarga; consulte el siguiente ejemplo de Python:

```python
def lambda_handler(event, context):

    # Inefficient when event['Records'] contains many records
    for record in event['Records']:
      lambda_metric("record_count", 1)

    # Improved implementation
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

## Creación de Custom Metrics a partir de registros o trazas {#creating-custom-metrics-from-logs-or-traces}

Con las métricas basadas en registros, puede registrar un recuento de registros que coincidan con una consulta o resumir un valor numérico contenido en un registro, como la duración de una solicitud. Las métricas basadas en registros son una forma rentable de resumir los datos de registro de todo el flujo de ingesta. Obtenga más información sobre [cómo crear métricas basadas en registros][6].

También puede generar métricas a partir de todos los tramos ingeridos, independientemente de si están indexados por un filtro de retención. Obtenga más información sobre [cómo crear métricas basadas en tramos][7].
## Con Datadog Lambda Extension {#with-the-datadog-lambda-extension}

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de Custom Metrics de AWS Lambda" >}}

Datadog recomienda usar [Datadog Lambda Extension][1] para enviar Custom Metrics como [**distribuciones**](#understanding-distribution-metrics) desde los entornos de ejecución de Lambda compatibles.

1. Siga las [instrucciones generales de instalación de Serverless][8] adecuadas para el entorno de ejecución de su función Lambda.
1. Si no le interesa recopilar trazas de su función Lambda, establezca la variable de entorno `DD_TRACE_ENABLED` en `false`.
1. Si no le interesa recopilar registros de su función Lambda, establezca la variable de entorno `DD_SERVERLESS_LOGS_ENABLED` en `false`.
1. Siga el código de ejemplo o las instrucciones a continuación para enviar su métrica personalizada.

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
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
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )
}
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Instale la versión más reciente de [java-dogstatsd-client][1] y luego siga el código de ejemplo a continuación para enviar sus Custom Metrics como [**distribuciones**](#understanding-distribution-metrics).

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

Instale la versión más reciente de [dogstatsd-csharp-client][1] y luego siga el código de ejemplo a continuación para enviar sus Custom Metrics como [**métricas de distribución**](#understanding-distribution-metrics).

```csharp
using System.IO;

// import the statsd client
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // instantiate the statsd client
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
        // submit a distribution metric
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // your function logic
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. [Instale][1] el cliente de DogStatsD para su entorno de ejecución
2. Siga el [código de ejemplo][2] para enviar sus Custom Metrics como [**distribuciones**](#understanding-distribution-metrics)


[1]: /es/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /es/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Con el Datadog Forwarder {#with-the-datadog-forwarder}

Datadog recomienda utilizar [Datadog Forwarder Lambda][9] para enviar Custom Metrics desde entornos de ejecución de Lambda que no son compatibles con Datadog Lambda Extension.

1. Siga las [instrucciones generales de instalación de Serverless][8] para instrumentar su función Lambda mediante la función Datadog Forwarder Lambda.
1. Si no le interesa recopilar trazas de su función Lambda, establezca la variable de entorno `DD_TRACE_ENABLED` en `false` en su propia función Lambda.
1. Si no le interesa recopilar registros de su función Lambda, establezca el parámetro de pila de CloudFormation del Forwarder `DdForwardLog` en `false`.
1. Importe y utilice la función auxiliar de la biblioteca Datadog Lambda, como `lambda_metric` o `sendDistributionMetric`, para enviar sus Custom Metrics siguiendo el código de ejemplo a continuación.

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )

    # Submit a metric with a timestamp that is within the last 20 minutes
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        timestamp=int(time.time()),             # Unix epoch in seconds
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
    );

    // Submit a metric with a timestamp that is within the last 20 minutes
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        new Date(Date.now()),       // date
        'product:latte',            // First tag
        'order:online',             // Second tag
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
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )

  // Submit a metric with a timestamp that is within the last 20 minutes
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    time.Now(),                     // Timestamp
    "product:latte", "order:online" // Associated tags
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # You only need to wrap your function handler (Not helper functions).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          "product":"latte", "order":"online" # Associated tags
        )

        # Submit a metric with a timestamp that is within the last 20 minutes
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          time: Time.now.utc,                 # Timestamp
          "product":"latte", "order":"online" # Associated tags
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
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

Escriba una función reutilizable que registre sus Custom Metrics en el siguiente formato:

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
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

## [OBSOLETO] Registros de CloudWatch {#deprecated-cloudwatch-logs}

**Este método de envío de Custom Metrics ya no es compatible y está deshabilitado para todos los clientes nuevos. Migre a una de las soluciones recomendadas.**

**Nota**: Si está migrando a una de las soluciones recomendadas, deberá comenzar a instrumentar sus Custom Metrics con **nuevos nombres de métricas** al enviarlas a Datadog. El mismo nombre de métrica no puede existir simultáneamente para métricas de distribución y métricas que no son de distribución.

Esto requiere los siguientes permisos de AWS en su [política de IAM de Datadog][10].

| Permiso de AWS            | Descripción                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | Enumere los grupos de registro disponibles.                                  |
| `logs:DescribeLogStreams` | Enumere los flujos de registro disponibles para un grupo.                     |
| `logs:FilterLogEvents`    | Obtenga eventos de registro específicos para un flujo con el fin de generar métricas. |

Para enviar Custom Metrics a Datadog desde sus registros de Lambda, imprima una línea de registro usando el siguiente formato:

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

Donde:

- `MONITORING` indica a la integración de Datadog que debe recopilar esta entrada de registro.
- `<UNIX_EPOCH_TIMESTAMP>` está en segundos, no en milisegundos.
- `<METRIC_VALUE>` DEBE ser un número (es decir, entero o flotante).
- `<METRIC_TYPE>` es `count`, `gauge`, `histogram` o `check`.
- `<METRIC_NAME>` identifica de forma única su métrica y sigue la [política de nomenclatura de métricas][11].
- `<TAG_LIST>` es opcional, está separado por comas y debe ir precedido por `#`. La etiqueta `function_name:<name_of_the_function>` se aplica automáticamente a las Custom Metrics.

**Nota**: Para las métricas de tipo count se usa la suma de los valores de cada marca de tiempo; para las de tipo gauge se usa el último valor de una marca de tiempo determinada. No se recomienda imprimir una línea de registro cada vez que incremente una métrica, ya que esto aumenta el tiempo necesario para analizar sus registros. Actualice continuamente el valor de la métrica en su código e imprima una línea de registro para esa métrica antes de que finalice la función.

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
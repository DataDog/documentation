---
aliases:
- /es/serverless/custom_metrics
- /es/serverless/enhanced_lambda_metrics
- /es/serverless/real-time-enhanced-metrics
- /es/serverless/real_time_enhanced_metrics
kind: documentación
title: Métricas de AWS Lambda
---

Esta página trata sobre las métricas para la monitorización de aplicaciones serverless en AWS Lambda. 

Después de [instalar Serverless Monitoring para AWS Lambda][1], Datadog genera [métricas mejoradas](#enhanced-lambda-metrics) a partir de tu tiempo de ejecución de Lambda. También puedes [enviar métricas personalizadas](#submit-custom-metrics) desde tus funciones de Lambda.

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de métricas mejoradas de AWS Lambda" >}}

### Recopilar métricas procedentes de recursos distintos de Lambda

Datadog también puede ayudarte a recopilar métricas de recursos gestionados de AWS, como [API Gateway][2], [AppSync][3] y [SQS][4], para contribuir a la monitorización de toda tu aplicación serverless. Estas métricas se enriquecen con las etiquetas (tags) de los recursos de AWS correspondientes.

Para recopilar estas métricas, configura la [Integración de AWS para Datadog][5].

[1]: /es/serverless/aws_lambda/installation
[2]: /es/integrations/amazon_api_gateway/#data-collected
[3]: /es/integrations/amazon_appsync/#data-collected
[4]: /es/integrations/amazon_sqs/#data-collected
[5]: /es/integrations/amazon_web_services/

## Métricas de Lambda mejoradas

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Dashboard predeterminado para las métricas mejoradas de Lambda" width="80%">}}

Datadog genera métricas de Lambda mejoradas a partir de tu tiempo de ejecución de Lambda de forma inmediata con baja latencia, granularidad de varios segundos y metadatos detallados para arranques en frío y etiquetas personalizados.

Las métricas de Lambda mejoradas se añaden a las [métricas de Lambda][6] predeterminadas que se habilitan con la integración de AWS Lambda. Las métricas mejoradas se distinguen por estar en el espacio de nombres `aws.lambda.enhanced.*`. Puedes consultar estas métricas en el [Dashboard predeterminado para las métricas de Lambda mejoradas][7].

Están disponibles las siguientes métricas de Lambda mejoradas en tiempo real, con las etiquetas `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` y `runtime` correspondientes. 

Estas métricas son [distribuciones][8]: puedes consultarlas mediante las agregaciones `count`, `min`, `max`, `sum` y `avg`.

`aws.lambda.enhanced.invocations`
: Mide el número de veces que se invoca una función en respuesta a un evento o a la invocación de una llamada a la API.

`aws.lambda.enhanced.errors`
: Mide el número de invocaciones que fallaron debido a errores en la función.

`aws.lambda.enhanced.max_memory_used`
: Mide la cantidad máxima de memoria (en MB) utilizada por la función.

`aws.lambda.enhanced.duration`
: Mide los segundos transcurridos desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse.

`aws.lambda.enhanced.billed_duration`
: Mide el tiempo de funcionamiento facturado de la función (en incrementos de 100 ms).

`aws.lambda.enhanced.init_duration`
: Mide el tiempo de inicialización (en segundos) de una función durante un arranque en frío.

`aws.lambda.enhanced.runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función comienza a ejecutarse hasta que devuelve la respuesta al cliente, sin contar la duración posterior al tiempo de ejecución añadida por las ejecuciones de la extensión de Lambda.

`aws.lambda.enhanced.post_runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función devuelve la respuesta al cliente hasta que la función deja de ejecutarse, lo que representa la duración añadida por las ejecuciones de la extensión de Lambda.

`aws.lambda.enhanced.response_latency`
: Mide el tiempo transcurrido en milisegundos desde que se recibe la solicitud de invocación hasta que se envía el primer byte de respuesta al cliente.

`aws.lambda.enhanced.response_duration`
: Mide el tiempo transcurrido en milisegundos desde que se envía al cliente el primer byte de respuesta hasta el último byte de respuesta.

`aws.lambda.enhanced.produced_bytes`
: Mide el número de bytes devueltos por una función.

`aws.lambda.enhanced.estimated_cost`
: Mide el coste total estimado de la invocación a la función (en dólares estadounidenses).

`aws.lambda.enhanced.timeouts`
: Mide el número de veces que se agota el tiempo de espera de una función.

`aws.lambda.enhanced.out_of_memory`
: Mide el número de veces que una función se queda sin memoria.

[6]: /es/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /es/metrics/distributions/

## Enviar métricas personalizadas

### Crear métricas personalizadas a partir de logs o trazas
Si tus funciones de Lambda ya envían datos de trazas (traces) o logs a Datadog, y los datos que quieres consultar se capturan en un log o traza existente, puedes generar métricas personalizadas a partir de logs y trazas sin necesidad de volver a desplegar o hacer cambios en el código de tu aplicación.

Con las métricas basadas en logs, puedes registrar un recuento de logs que coincidan con una consulta o resumir un valor numérico contenido en un log, como la duración de una solicitud. Las métricas basadas en logs son una forma rentable de resumir los datos de los logs de todo el flujo (stream) de la ingesta. Obtén más información sobre la [creación de métricas basadas en logs][9].

También puedes generar métricas a partir de todos los tramos (spans) ingeridos, independientemente de si están indexados por un filtro de retención. Obtén más información sobre [la creación de métricas basadas en tramos][10].

### Envíar métricas personalizadas directamente desde una función de Lambda

Todas las métricas personalizadas se envían como [distribuciones](#understanding-distribution-metrics).

**Nota**: Las métricas de distribución deben enviarse con un nombre nuevo, no reutilices el nombre de una métrica enviada anteriormente.

1. [Instala Serverless Monitoring para AWS Lambda][1] y asegúrate de haber instalado la extensión Datadog Lambda.

2. Elige tu tiempo de ejecución:

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

Instala la última versión del [`java-dogstatsd-client`][1].

```java
package com.datadog.lambda.sample.java;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyResponseEvent;

// importa el compilador del cliente statsd
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // crea la instancia del cliente statsd
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // envía una métrica de distribución
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Instala la última versión del [`dogstatsd-csharp-client`][1].

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
2. Sigue el [código de ejemplo][2] para enviar tus métricas personalizadas.

[1]: /es/developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /es/developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Enviar métricas históricas con el Datadog Forwarder

En la mayoría de los casos, Datadog recomienda utilizar la extensión Datadog Lambda para enviar métricas personalizadas. Sin embargo, la extensión de Lambda solo puede enviar métricas con una marca de tiempo actual.

Para enviar métricas históricas, utiliza el Datadog Forwarder. Estas métricas pueden tener marcas de tiempo que estén dentro de la última hora.

Comienza por [instalar Serverless Monitoring para AWS Lambda][1]. Asegúrate de haber instalado el Datadog Lambda Forwarder.

A continuación, elige tu tiempo de ejecución:

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

#### Envío de muchos puntos de datos

El uso del Forwarder para enviar muchos puntos de datos para la misma métrica y el mismo conjunto de etiquetas (por ejemplo, dentro de un gran bucle `for`) puede afectar el rendimiento de Lambda y el coste de CloudWatch. 

Puedes agregar los puntos de datos de tu aplicación para evitar la sobrecarga. 

Por ejemplo, en Python:

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

### Comprender las métricas de distribución

Cuando Datadog recibe varios puntos de métricas de recuento o calibre que comparten la misma marca de tiempo y el mismo conjunto de etiquetas, solo cuenta el punto más reciente. Esto funciona para las aplicaciones basadas en hosts porque el Datadog Agent agrega los puntos de métricas y les aplica una etiqueta `host` única.

Un función de Lambda puede iniciar muchos entornos de ejecución de forma simultánea cuando aumenta el tráfico. La función puede llegar a enviar puntos de métricas de recuento o calibre que se sobrescriben entre sí y generan resultados subestimados. Para evitar este problema, las métricas personalizadas generadas a partir de funciones de Lambda se envían como [distribuciones][11], ya que los puntos de las métricas de distribución se agregan en el backend de Datadog y se cuentan todos los puntos de métricas.

Las distribuciones ofrecen las agregaciones `avg`, `sum`, `max`, `min` y `count` de forma predeterminada. En la página Metric Summary (Resumen de métrica), puedes habilitar agregaciones percentiles (p50, p75, p90, p95, p99) y también [gestionar etiquetas][12]. Para monitorizar la distribución de un tipo de métrica de calibre, utiliza `avg` tanto para las [agregaciones temporales como espaciales][13]. Para monitorizar la distribución de un tipo de métrica de recuento, utiliza `sum` tanto para las [agregaciones temporales como espaciales][13]. Lee la guía [Consulta al gráfico][14] para saber cómo funcionan las agregaciones temporales y espaciales.

[9]: /es/logs/logs_to_metrics/
[10]: /es/tracing/trace_pipeline/generate_metrics/
[11]: /es/metrics/distributions/
[12]: /es/metrics/distributions/#customize-tagging
[13]: /es/metrics/#time-and-space-aggregation
[14]: /es/dashboards/guide/query-to-the-graph/
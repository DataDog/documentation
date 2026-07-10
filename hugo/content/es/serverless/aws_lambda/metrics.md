---
aliases:
- /es/serverless/custom_metrics
- /es/serverless/enhanced_lambda_metrics
- /es/serverless/real-time-enhanced-metrics
- /es/serverless/real_time_enhanced_metrics
title: Métricas de AWS Lambda
---
Esta página discute las métricas para hacer seguimiento de aplicaciones sin servidor en AWS Lambda. Hay 3 maneras de obtener métricas de AWS Lambda:

- Puedes obtener métricas de Lambda de Cloudwatch desde la [integración de Datadog AWS][5]
- Puedes obtener [métricas mejoradas](#enhanced-lambda-metrics) al [instalar Serverless Monitoring para AWS Lambda][1] a través de la Lambda Extension de Datadog.
- Puedes [enviar métricas personalizadas](#submit-custom-metrics) a Datadog desde tus funciones de Lambda.

{{< img src="serverless/serverless_custom_metrics.png" alt="Recolección de Métricas Mejoradas de AWS Lambda" >}}

### Recolecta métricas de recursos que no son Lambda {#collect-metrics-from-non-lambda-resources}

Datadog también puede ayudarte a recolectar métricas para recursos administrados por AWS—como [API Gateway][2], [AppSync][3] y [SQS][4]—para ayudarte a hacer seguimiento de toda tu aplicación sin servidor. Estas métricas están enriquecidas con las etiquetas de recursos correspondientes de AWS.

Para recolectar estas métricas, configura la [integración de Datadog AWS][5].

[1]: /es/serverless/aws_lambda/installation
[2]: /es/integrations/amazon_api_gateway/#data-collected
[3]: /es/integrations/amazon_appsync/#data-collected
[4]: /es/integrations/amazon_sqs/#data-collected
[5]: /es/integrations/amazon_web_services/

## Métricas mejoradas de Lambda {#enhanced-lambda-metrics}

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Tablero Predeterminado de Métricas Mejoradas de Lambda" width="80%">}}

Datadog genera métricas mejoradas de Lambda desde su Lambda runtime de forma nativa, con baja latencia, granularidad de varios segundos y metadatos detallados para inicios en frío y etiquetas personalizadas.

Las métricas mejoradas de Lambda son además de las métricas predeterminadas de [Lambda][6] habilitadas con la integración de AWS Lambda. Las métricas mejoradas se distinguen por estar en el espacio de nombres `aws.lambda.enhanced.*`. Puedes ver estas métricas en el [tablero predeterminado de métricas mejoradas de Lambda][7].

Las siguientes métricas Lambda mejoradas en tiempo real están disponibles y están etiquetadas con las correspondientes etiquetas `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` y `runtime`.

Estas métricas son [distribuciones][8]:  y puedes consultarlas utilizando las agregaciones `count`, `min`, `max`, `sum` y `avg`. Las métricas mejoradas se habilitan automáticamente con [Serverless Monitoring][1], pero se pueden desactivar configurando la variable de entorno `DD_ENHANCED_METRICS` a `false` en su función Lambda.

`aws.lambda.enhanced.invocations`
: Mide la cantidad de veces que se invoca una función en respuesta a un evento o a una invocación de una llamada a la API.

`aws.lambda.enhanced.errors`
: Mide la cantidad de invocaciones que fallaron debido a errores en la función.

`aws.lambda.enhanced.max_memory_used`
: Mide la cantidad máxima de memoria (mb) utilizada por la función.

`aws.lambda.enhanced.duration`
: Mide los segundos transcurridos desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse.

`aws.lambda.enhanced.billed_duration`
: Mide la cantidad de tiempo facturado que la función estuvo en ejecución (incrementos de 100 ms).

`aws.lambda.enhanced.init_duration`
: Mide el tiempo de inicialización (segundos) de una función durante un inicio en frío.

`aws.lambda.enhanced.runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función comienza a ejecutarse hasta que devuelve la respuesta al cliente, excluyendo la duración posterior a la ejecución añadida por las ejecuciones de Lambda Extension.

`aws.lambda.enhanced.post_runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función devuelve la respuesta al cliente hasta que la función deja de ejecutarse, representando la duración añadida por las ejecuciones de Lambda Extension.

`aws.lambda.enhanced.response_latency`
: Mide el tiempo transcurrido en milisegundos desde que se recibe la solicitud de invocación hasta que se envía el primer byte de respuesta al cliente.

`aws.lambda.enhanced.response_duration`
: Mide el tiempo transcurrido en milisegundos desde que se envía el primer byte de respuesta hasta que se envía el último byte de respuesta al cliente.

`aws.lambda.enhanced.produced_bytes`
: Mide el número de bytes devueltos por una función.

`aws.lambda.enhanced.estimated_cost`
: Mide el costo total estimado de la invocación de la función (dólares estadounidenses).

`aws.lambda.enhanced.timeouts`
: Mide el número de veces que una función agota el tiempo de ejecución.

`aws.lambda.enhanced.out_of_memory`
: Mide el número de veces que una función se queda sin memoria.
: Debido a que hay muchas variaciones de errores de falta de memoria, algunos casos pueden no ser manejados adecuadamente a pesar de los mejores esfuerzos. Si encuentra tal incidencia, cree una incidencia en el [repositorio de GitHub de la Lambda Extension de Datadog][18].

`aws.lambda.enhanced.cpu_total_utilization`
: Mide la utilización total de CPU de la función como un número de núcleos.

`aws.lambda.enhanced.cpu_total_utilization_pct`
: Mide la utilización total de CPU de la función como un porcentaje.

`aws.lambda.enhanced.cpu_max_utilization`
: Mide la utilización de la CPU en el núcleo más utilizado.

`aws.lambda.enhanced.cpu_min_utilization`
: Mide la utilización de la CPU en el núcleo menos utilizado.

`aws.lambda.enhanced.cpu_system_time`
: Mide la cantidad de tiempo que la CPU pasó ejecutándose en modo kernel.

`aws.lambda.enhanced.cpu_user_time`
: Mide la cantidad de tiempo que la CPU pasó ejecutándose en modo usuario.

`aws.lambda.enhanced.cpu_total_time`
: Mide la cantidad total de tiempo que la CPU pasó ejecutándose.

`aws.lambda.enhanced.num_cores`
: Mide el número de núcleos disponibles.

`aws.lambda.enhanced.rx_bytes`
: Mide los bytes recibidos por la función.

`aws.lambda.enhanced.tx_bytes`
: Mide los bytes enviados por la función.

`aws.lambda.enhanced.total_network`
: Mide los bytes enviados y recibidos por la función.

`aws.lambda.enhanced.tmp_max`
: Mide el espacio total disponible en el directorio /tmp.

`aws.lambda.enhanced.tmp_used`
: Mide el espacio utilizado en el directorio /tmp.

`aws.lambda.enhanced.fd_max`
: Mide el número total de descriptores de archivo disponibles para su uso.

`aws.lambda.enhanced.fd_use`
: Mide el número máximo de descriptores de archivo utilizados durante la duración de la invocación de la función.

`aws.lambda.enhanced.threads_max`
: Mide el número total de hilos disponibles para su uso.

`aws.lambda.enhanced.threads_use`
: Mide el número máximo de hilos utilizados durante la duración de la invocación de la función.

[6]: /es/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /es/metrics/distributions/
[18]: https://github.com/DataDog/datadog-lambda-extension

## Envíe métricas personalizadas {#submit-custom-metrics}

### Cree métricas personalizadas a partir de registros o trazas {#create-custom-metrics-from-logs-or-traces}
Si sus funciones Lambda ya están enviando datos de trazas o registros a Datadog, y los datos que desea consultar están capturados en un registro o traza existente, puede generar métricas personalizadas a partir de registros y trazas sin volver a desplegar ni hacer cambios en el código de su aplicación.

Con métricas basadas en registros, puede registrar un conteo de registros que coincidan con una consulta o resumir un valor numérico contenido en un registro, como la duración de una solicitud. Las métricas basadas en registros son una forma rentable de resumir datos de registros de toda la corriente de ingestión. Aprenda más sobre [la creación de métricas basadas en registros][9].

También puede generar métricas a partir de todos los tramos ingeridos, independientemente de si están indexados por un filtro de retención. Aprenda más sobre [crear métricas basadas en tramos][10].

### Envíe métricas personalizadas directamente desde una función Lambda {#submit-custom-metrics-directly-from-a-lambda-function}

Todas las métricas personalizadas se envían como [distribuciones](#understanding-distribution-metrics).

**Nota**: Las métricas de distribución deben enviarse con un nuevo nombre, no reutilice el nombre de una métrica enviada anteriormente.

1. [Instale Serverless Monitoring para AWS Lambda][1] y asegúrese de haber instalado la Lambda Extension de Datadog.

2. Elija su entorno de ejecución:

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

Instale la última versión de [`java-dogstatsd-client`][1].

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

Instale la última versión de [`dogstatsd-csharp-client`][1].

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

1. [Instale][1] el cliente DogStatsD para su entorno de ejecución
2. Siga el [código de ejemplo][2] para enviar sus métricas personalizadas.

[1]: /es/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /es/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Envíe métricas históricas {#submit-historical-metrics}

Utilice la Lambda Extension de Datadog para enviar métricas históricas. Estas métricas pueden tener marcas de tiempo de hasta una hora en el pasado.

Comience por [instalar Serverless Monitoring para AWS Lambda][1]. Asegúrese de haber instalado la última Lambda Extension de Datadog.

Luego, elija su entorno de ejecución:

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

Escriba una función reutilizable que registre sus métricas personalizadas en el siguiente formato:

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

### Entendiendo las métricas de distribución {#understanding-distribution-metrics}

Cuando Datadog recibe múltiples puntos de métricas de conteo o de gauge que comparten la misma marca de tiempo y conjunto de etiquetas, solo el más reciente cuenta. Esto funciona para aplicaciones basadas en host porque los puntos métricos son agregados por el agente de Datadog y etiquetados con una etiqueta única `host`.

Una función Lambda puede lanzar muchos entornos de ejecución concurrentes cuando aumenta el tráfico. La función puede enviar puntos métricos de conteo o de gauge que se sobrescriben entre sí y provocan resultados con conteo inferior. Para evitar este problema, las métricas personalizadas generadas por funciones Lambda se envían como [distribuciones][11] porque los puntos métricos de distribución se agregan en el backend de Datadog, y cada punto métrico cuenta.

Las distribuciones proporcionan agregaciones de `avg`, `sum`, `max`, `min`, `count` por defecto. En la página Metrics Summary, puede habilitar agregaciones percentiles (p50, p75, p90, p95, p99) y también [manage tags][12]. Para monitorear una distribución para un tipo de métrica gauge, utilice `avg` para ambas [agregaciones de tiempo y desglose espacial][13]. Para monitorear una distribución para un tipo de métrica count, utilice `sum` para ambas [agregaciones de tiempo y desglose espacial][13]. Consulte la guía [Query to the Graph][14] para entender cómo funcionan las agregaciones de tiempo y desglose espacial.

### Entendiendo el uso, volumen y precios de sus métricas en Datadog {#understanding-your-metrics-usage-volume-and-pricing-in-datadog}

Datadog proporciona información granular sobre las métricas personalizadas que está ingiriendo, la cardinalidad de las etiquetas y las herramientas de gestión para sus métricas personalizadas dentro de la [Metrics Summary page][15] de la aplicación Datadog. Puede ver todas las métricas personalizadas Serverless bajo la etiqueta 'Serverless' en el [facet panel][16] de Distribution Metric Origin. También puede controlar los volúmenes y costos de métricas personalizadas con [Metrics without Limits™][17].

[9]: /es/logs/logs_to_metrics/
[10]: /es/tracing/trace_pipeline/generate_metrics/
[11]: /es/metrics/distributions/
[12]: /es/metrics/distributions/#customize-tagging
[13]: /es/metrics/#time-and-space-aggregation
[14]: /es/dashboards/guide/query-to-the-graph/
[15]: https://app.datadoghq.com/metric/summary
[16]: /es/metrics/summary/#facet-panel
[17]: /es/metrics/summary/#metrics-without-limits
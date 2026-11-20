---
aliases:
- /es/serverless/custom_metrics
- /es/serverless/enhanced_lambda_metrics
- /es/serverless/real-time-enhanced-metrics
- /es/serverless/real_time_enhanced_metrics
further_reading:
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centro de aprendizaje
  text: Configurar AWS Lambda para Serverless Monitoring con Datadog
title: Métricas de AWS Lambda
---
Esta página trata sobre las métricas para monitorear aplicaciones sin servidor en AWS Lambda. Hay 3 formas de obtener métricas de AWS Lambda:

- Puede obtener métricas de CloudWatch Lambda desde la [integración de AWS con Datadog][5]
- Puede obtener [métricas mejoradas](#enhanced-lambda-metrics) [instalando Serverless Monitoring para AWS Lambda][1] a través de Datadog Lambda Extension.
- Puede [enviar Custom Metrics](#submit-custom-metrics) a Datadog desde sus funciones de Lambda.

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de métricas mejoradas de AWS Lambda" >}}

### Recopilar métricas de recursos que no son Lambda {#collect-metrics-from-non-lambda-resources}

Datadog también puede ayudarle a recopilar métricas para recursos administrados de AWS, como [API Gateway][2], [AppSync][3] y [SQS][4], para ayudarle a monitorear toda su aplicación sin servidor. Estas métricas se enriquecen con las etiquetas de recursos de AWS correspondientes.

Para recopilar estas métricas, configure la [integración de AWS con Datadog][5].

[1]: /es/serverless/aws_lambda/installation
[2]: /es/integrations/amazon_api_gateway/#data-collected
[3]: /es/integrations/amazon_appsync/#data-collected
[4]: /es/integrations/amazon_sqs/#data-collected
[5]: /es/integrations/amazon_web_services/

## Métricas de Lambda mejoradas {#enhanced-lambda-metrics}

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda Enhanced Metrics Default Dashboard" width="80%">}}

Datadog genera métricas de Lambda mejoradas desde su entorno de ejecución de Lambda de forma inmediata con baja latencia, granularidad de varios segundos y metadatos detallados para arranques en frío y etiquetas personalizadas.

Las métricas de Lambda mejoradas se suman a las [métricas de Lambda][6] predeterminadas habilitadas con la integración de AWS Lambda. Las métricas mejoradas se distinguen por estar en el espacio de nombres `aws.lambda.enhanced.*`. Puede ver estas métricas en el [panel predeterminado de métricas mejoradas de Lambda][7].

Las siguientes métricas mejoradas de Lambda en tiempo real están disponibles y están etiquetadas con las etiquetas correspondientes `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` y `runtime`.

Estas métricas son [distribuciones][8]:  que puede consultar utilizando las agregaciones `count`, `min`, `max`, `sum` y `avg`. Las métricas mejoradas se habilitan automáticamente con [Serverless Monitoring][1], pero se pueden deshabilitar configurando la variable de entorno `DD_ENHANCED_METRICS` en `false` en su función Lambda.

`aws.lambda.enhanced.invocations`
: Mide la cantidad de veces que se invoca una función en respuesta a un evento o a una invocación de una llamada a la API.

`aws.lambda.enhanced.errors`
: Mide la cantidad de invocaciones que fallaron debido a errores en la función.

`aws.lambda.enhanced.max_memory_used`
: Mide la cantidad máxima de memoria (MB) utilizada por la función.

`aws.lambda.enhanced.duration`
: Mide los segundos transcurridos desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse.

`aws.lambda.enhanced.billed_duration`
: Mide la cantidad de tiempo facturado durante el cual se ejecutó la función (incrementos de 100 ms).

`aws.lambda.enhanced.init_duration`
: Mide el tiempo de inicialización (segundos) de una función durante un arranque en frío.

`aws.lambda.enhanced.runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función comienza a ejecutarse hasta que devuelve la respuesta al cliente, excluyendo la duración posterior al tiempo de ejecución añadida por las ejecuciones de las extensiones de Lambda.

`aws.lambda.enhanced.post_runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función devuelve la respuesta al cliente hasta que la función deja de ejecutarse, lo que representa la duración añadida por las ejecuciones de las extensiones de Lambda.

`aws.lambda.enhanced.response_latency`
: Mide el tiempo transcurrido en milisegundos desde que se recibe la solicitud de invocación hasta que se envía el primer byte de respuesta al cliente.

`aws.lambda.enhanced.response_duration`
: Mide el tiempo transcurrido en milisegundos desde que se envía el primer byte de respuesta hasta que se envía el último byte de respuesta al cliente.

`aws.lambda.enhanced.produced_bytes`
: Mide la cantidad de bytes devueltos por una función.

`aws.lambda.enhanced.estimated_cost`
: Mide el costo total estimado de la invocación de la función (dólares estadounidenses).

`aws.lambda.enhanced.timeouts`
: Mide la cantidad de veces que una función agota el tiempo de espera.

`aws.lambda.enhanced.out_of_memory`
: Mide la cantidad de veces que una función se queda sin memoria.
: Debido a que existen muchas variaciones de errores de falta de memoria, es posible que algunos casos no se manejen bien a pesar de los mejores esfuerzos. Si encuentra un caso así, cree un problema en el [repositorio de GitHub de Datadog Lambda Extension][18].

`aws.lambda.enhanced.cpu_total_utilization`
: Mide la utilización total de CPU de la función como número de núcleos.

`aws.lambda.enhanced.cpu_total_utilization_pct`
: Mide la utilización total de CPU de la función como porcentaje.

`aws.lambda.enhanced.cpu_max_utilization`
: Mide la utilización de CPU en el núcleo más utilizado.

`aws.lambda.enhanced.cpu_min_utilization`
: Mide la utilización de la CPU en el núcleo menos utilizado.

`aws.lambda.enhanced.cpu_system_time`
: Mide la cantidad de tiempo que la CPU pasó ejecutándose en modo kernel.

`aws.lambda.enhanced.cpu_user_time`
: Mide la cantidad de tiempo que la CPU pasó ejecutándose en modo usuario.

`aws.lambda.enhanced.cpu_total_time`
: Mide la cantidad total de tiempo que la CPU pasó ejecutándose.

`aws.lambda.enhanced.num_cores`
: Mide la cantidad de núcleos disponibles.

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

## Envíe Custom Metrics {#submit-custom-metrics}

### Cree Custom Metrics a partir de registros o trazas {#create-custom-metrics-from-logs-or-traces}
Si sus funciones Lambda ya están enviando datos de trazas o registros a Datadog, y los datos que desea consultar están capturados en un registro o traza existente, puede generar Custom Metrics a partir de registros y trazas sin necesidad de volver a implementar o realizar cambios en el código de su aplicación.

Con las métricas basadas en registros, puede registrar un conteo de registros que coincidan con una consulta o resumir un valor numérico contenido en un registro, como la duración de una solicitud. Las métricas basadas en registros son una forma rentable de resumir los datos de registro de todo el flujo de ingesta. Obtenga más información sobre [la creación de métricas basadas en registros][9].

También puede generar métricas a partir de todos los tramos ingeridos, independientemente de si están indexados por un filtro de retención. Obtenga más información sobre [la creación de métricas basadas en tramos][10].

### Envíe Custom Metrics directamente desde una función Lambda {#submit-custom-metrics-directly-from-a-lambda-function}

Todas las Custom Metrics se envían como [distribuciones](#understanding-distribution-metrics).

**Nota**: Las métricas de distribución deben enviarse con un nombre nuevo; no reutilice el nombre de una métrica enviada anteriormente.

1. [Instale Serverless Monitoring para AWS Lambda][1] y asegúrese de haber instalado Datadog Lambda Extension.

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

Instale la versión más reciente de [`java-dogstatsd-client`][1].

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

Instale la versión más reciente de [`dogstatsd-csharp-client`][1].

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
2. Siga el [código de ejemplo][2] para enviar sus Custom Metrics.

[1]: /es/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /es/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Enviar métricas históricas {#submit-historical-metrics}

Utilice Datadog Lambda Extension para enviar métricas históricas. Estas métricas pueden tener marcas de tiempo de hasta una hora en el pasado.

Comience por [instalar Serverless Monitoring para AWS Lambda][1]. Asegúrese de haber instalado la versión más reciente de Datadog Lambda Extension.

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

### Cómo entender las métricas de distribución {#understanding-distribution-metrics}

Cuando Datadog recibe varios puntos de métricas de conteo o de tipo gauge que comparten la misma marca de tiempo y el mismo conjunto de etiquetas, solo se tiene en cuenta el más reciente. Esto funciona para aplicaciones basadas en servidores porque el Agent de Datadog agrega los puntos de métricas y les asigna una etiqueta `host` única.

Una función Lambda puede iniciar muchos entornos de ejecución simultáneos cuando aumenta el tráfico. La función puede enviar puntos de métricas de conteo o de tipo gauge que se sobrescriben entre sí y hacen que los resultados reflejen un conteo inferior al real. Para evitar este problema, las Custom Metrics generadas por funciones Lambda se envían como [distribuciones][11] porque los puntos de métricas de distribución se agregan en el backend de Datadog y cada punto de métrica cuenta.

Las distribuciones proporcionan agregaciones de `avg`, `sum`, `max`, `min`, `count` de forma predeterminada. En la página {{< ui >}}Metrics Catalog{{< /ui >}}, puede habilitar agregaciones de percentiles (p50, p75, p90, p95, p99) y también [administrar etiquetas][12]. Para monitorear una distribución de una métrica de tipo gauge, use `avg` para las [agregaciones de tiempo y espacio][13]. Para monitorear una distribución de una métrica de tipo conteo, use `sum` para las [agregaciones de tiempo y espacio][13]. Consulte la guía [Query to the Graph][14] para saber cómo funcionan las agregaciones de tiempo y espacio.

### Comprender el uso, el volumen y los precios de sus métricas en Datadog {#understanding-your-metrics-usage-volume-and-pricing-in-datadog}

Datadog proporciona información detallada sobre las Custom Metrics que está ingiriendo, la cardinalidad de las etiquetas y herramientas para administrar sus Custom Metrics en la [página {{< ui >}}Metrics Catalog{{< /ui >}}][15] de la aplicación de Datadog. Puede ver todas las Custom Metrics sin servidor bajo la etiqueta {{< ui >}}Serverless{{< /ui >}} en {{< ui >}}Distribution Metric Origin{{< /ui >}} [{{< ui >}}facet panel{{< /ui >}}][16]. También puede controlar los volúmenes y costos de las Custom Metrics con [Metrics without Limits™][17].

También puede excluir etiquetas autoinyectadas específicas (como `function_arn`) de sus Custom Metrics. Consulte [Excluir etiquetas autoinyectadas de las Custom Metrics][19].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[9]: /es/logs/logs_to_metrics/
[10]: /es/tracing/trace_pipeline/generate_metrics/
[11]: /es/metrics/distributions/
[12]: /es/metrics/distributions/#customize-tagging
[13]: /es/metrics/#time-and-space-aggregation
[14]: /es/dashboards/guide/query-to-the-graph/
[15]: https://app.datadoghq.com/metric/catalog
[16]: /es/metrics/summary/#facet-panel
[17]: /es/metrics/summary/#metrics-without-limits
[19]: /es/serverless/aws_lambda/configuration/#exclude-auto-injected-tags-from-custom-metrics
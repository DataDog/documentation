---
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Monitorización del rendimiento del sistema durante periodos de tiempo más
    prolongados con métricas históricas
- link: /developers/dogstatsd/
  tag: Documentación
  text: Obtener más información sobre DogStatsD
- link: /developers/community/libraries/
  tag: Documentación
  text: API oficial y creada por la comunidad y bibliotecas cliente DogStatsD
title: Consumo de métricas históricas
---

## Información general

La habilitación del consumo de métricas históricas te permite recopilar valores de métrica con marcas de tiempo anteriores a una hora desde el momento del envío, pero no anteriores a tu periodo de conservación total de métricas (por defecto, 15 meses).

Tener habilitado el consumo de métricas históricas para tus métricas puede ser útil para una variedad de casos de uso, como la recuperación luego de una interrupción, la corrección de valores erróneos y la gestión de retrasos de IoT.

## ¿Qué es el consumo de métricas históricas?

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="Diagrama que muestra el flujo (flow) de consumo de métricas históricas habilitado" >}}

Datadog clasifica las *métricas históricas* como puntos de métricas con marcas de tiempo que tienen más de una hora de antigüedad con respecto al momento del envío. Si el consumo de métricas históricas no está habilitado, no se consumen valores de métricas de más de una hora de antigüedad.

Por ejemplo, tu métrica (`exampleMetricA`) emite un valor a Datadog a la 1:00 PM EST y la marca de tiempo de ese valor es 10:00 AM EST. Este valor de métrica se clasifica como histórico porque tiene una marca de tiempo 3 horas más antigua en relación con la hora del envío.

Con el consumo de métricas históricas habilitado, si envías varios valores con la misma marca de tiempo y la misma combinación de valor-etiqueta (tag) a Datadog, Datadog conserva el valor enviado más recientemente. Es decir, si dentro de la misma marca de tiempo, envías una métrica con un valor de X, y también envías esa métrica con un valor de Y, se conservará el valor que se haya enviado más recientemente.

Puedes empezar a consumir valores de métricas históricas habilitando el consumo de métricas históricas en la página [Resumen de métricas][1] para los tipos de métricas *Recuento, Tasa e Indicador*.

**Nota**: El consumo de métricas históricas no está disponible para tus métricas de distribución.

## Configuración

Para permitir el consumo de métricas históricas para una métrica específica:
1. Ve a la página [Resumen de métricas][1].
1. Haz clic en el nombre de la métrica para la que quieres habilitar el consumo de métricas históricas, para abrir el panel lateral con los detalles de la métrica.
1. Dentro de la sección *Advanced* (Avanzado) del panel lateral, haz clic en **Configure** (Configurar).
1. Selecciona el conmutador **Enable historical metrics** (Habilitar métricas históricas) y pulsa **Save** (Guardar).

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Página Resumen de métricas que muestra el panel de facetas de métricas históricas y la sección Avanzado de un panel de detalles de métricas abierto con la opción Habilitar métricas históricas seleccionada" style="width:100%;" >}}

### Configuración masiva de múltiples métricas

Puedes habilitar el consumo de métricas históricas para varias métricas a la vez, en lugar de tener que configurar cada una individualmente.

1.  Ve a la [página Resumen de métricas][1] y haz clic en el menú desplegable **Configure Metrics** (Configurar métricas).
1. Selecciona **Enable historical metrics** (Habilitar métricas históricas).
1. Especifica un prefijo en el espacio de nombres de la métrica para habilitar el consumo de métricas históricas en todas las métricas que coinciden con ese espacio de nombres.

{{< img src="metrics/custom_metrics/historical_metrics/enable_bulk_historical_metrics.mp4" alt=Vídeo "Guía de la habilitación masiva del consumo de métricas históricas" =true >}}

## Envío de métricas históricas

Después de habilitar el consumo de métricas históricas, puedes enviar valores de métricas con marcas de tiempo históricas a través de la [API](#api) o a través del [Agent](#Agent).

### API 

Con la API, puedes enviar valores de métricas con marcas de tiempo históricas en la carga útil (siempre que el nombre de la métrica ya se haya habilitado para aceptar métricas históricas a través de la interfaz de usuario descrita anteriormente).

{{< programming-lang-wrapper langs="python,java,go,ruby,typescript,curl" collapsible="true">}}

{{< programming-lang lang="Python">}}
```python
"""
El envío de métricas devuelve la respuesta "Payload accepted"
"""

from datetime import datetime
from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v2.api.metrics_api import MetricsApi
from datadog_api_client.v2.model.metric_intake_type import MetricIntakeType
from datadog_api_client.v2.model.metric_payload import MetricPayload
from datadog_api_client.v2.model.metric_point import MetricPoint
from datadog_api_client.v2.model.metric_resource import MetricResource
from datadog_api_client.v2.model.metric_series import MetricSeries

body = MetricPayload(
    series=[
        MetricSeries(
            metric="system.load.1",
            type=MetricIntakeType.UNSPECIFIED,
            points=[
                MetricPoint(

                    """ Añadir marca de tiempo histórica aquí """
                    timestamp=int(datetime.now().timestamp()),
                    """ *********************** """

                    value=0.7,
                ),
            ],
            resources=[
                MetricResource(
                    name="dummyhost",
                    type="host",
                ),
            ],
        ),
    ],
)

configuration = Configuration()
with ApiClient(configuration) as api_client:
    api_instance = MetricsApi(api_client)
    response = api_instance.submit_metrics(body=body)

    print(response)
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
// El envío de métricas devuelve la respuesta "Payload accepted"
import com.datadog.api.client.ApiClient;
import com.datadog.api.client.ApiException;
import com.datadog.api.client.v2.api.MetricsApi;
import com.datadog.api.client.v2.model.IntakePayloadAccepted;
import com.datadog.api.client.v2.model.MetricIntakeType;
import com.datadog.api.client.v2.model.MetricPayload;
import com.datadog.api.client.v2.model.MetricPoint;
import com.datadog.api.client.v2.model.MetricResource;
import com.datadog.api.client.v2.model.MetricSeries;
import java.time.OffsetDateTime;
import java.util.Collections;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = ApiClient.getDefaultApiClient();
    MetricsApi apiInstance = new MetricsApi(defaultClient);

    MetricPayload body =
        new MetricPayload()
            .series(
                Collections.singletonList(
                    new MetricSeries()
                        .metric("system.load.1")
                        .type(MetricIntakeType.UNSPECIFIED)
                        .points(
                            Collections.singletonList(
                                new MetricPoint()

                                    //Añadir marca de tiempo histórica aquí
                                    .timestamp(OffsetDateTime.now().toInstant().getEpochSecond())
                                    //***********************

                                    .value(0.7)))
                        .resources(
                            Collections.singletonList(
                                new MetricResource().name("dummyhost").type("host")))));

    try {
      IntakePayloadAccepted result = apiInstance.submitMetrics(body);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling MetricsApi#submitMetrics");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
// El envío de métricas devuelve la respuesta "Payload accepted"

package main

import (
    "context"
    "encoding/json"
    "fmt"
    "os"
    "time"

    "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
    "github.com/DataDog/datadog-api-client-go/v2/api/datadogV2"
)

func main() {
    body := datadogV2.MetricPayload{
        Series: []datadogV2.MetricSeries{
            {
                Metric: "system.load.1",
                Type:   datadogV2.METRICINTAKETYPE_UNSPECIFIED.Ptr(),
                Points: []datadogV2.MetricPoint{
                    {   
                        //Añadir marca de tiempo histórica aquí
                        Timestamp: datadog.PtrInt64(time.Now().Unix()),
                        //***********************

                        Value:     datadog.PtrFloat64(0.7),
                    },
                },
                Resources: []datadogV2.MetricResource{
                    {
                        Name: datadog.PtrString("dummyhost"),
                        Type: datadog.PtrString("host"),
                    },
                },
            },
        },
    }
    ctx := datadog.NewDefaultContext(context.Background())
    configuration := datadog.NewConfiguration()
    apiClient := datadog.NewAPIClient(configuration)
    api := datadogV2.NewMetricsApi(apiClient)
    resp, r, err := api.SubmitMetrics(ctx, body, *datadogV2.NewSubmitMetricsOptionalParameters())

    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `MetricsApi.SubmitMetrics`: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }

    responseContent, _ := json.MarshalIndent(resp, "", "  ")
    fmt.Fprintf(os.Stdout, "Response from `MetricsApi.SubmitMetrics`:\n%s\n", responseContent)
}
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
# El envío de métricas devuelve la respuesta "Payload accepted"

require "datadog_api_client"
api_instance = DatadogAPIClient::V2::MetricsAPI.new

body = DatadogAPIClient::V2::MetricPayload.new({
  series: [
    DatadogAPIClient::V2::MetricSeries.new({
      metric: "system.load.1",
      type: DatadogAPIClient::V2::MetricIntakeType::UNSPECIFIED,
      points: [
        DatadogAPIClient::V2::MetricPoint.new({

          #Añadir marca de tiempo histórica aquí 
          timestamp: Time.now.to_i,
          #***********************  

          value: 0.7,
        }),
      ],
      resources: [
        DatadogAPIClient::V2::MetricResource.new({
          name: "dummyhost",
          type: "host",
        }),
      ],
    }),
  ],
})
p api_instance.submit_metrics(body)
```
{{< /programming-lang >}}

{{< programming-lang lang="typescript" >}}
```typescript
/**
 * El envío de métricas devuelve la respuesta "Payload accepted"
 */

import { client, v2 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v2.MetricsApi(configuration);

const params: v2.MetricsApiSubmitMetricsRequest = {
  body: {
    series: [
      {
        metric: "system.load.1",
        type: 0,
        points: [
          {
            //Añadir marca de tiempo histórica aquí
            timestamp: Math.round(new Date().getTime() / 1000),
            //***********************

            value: 0.7,
          },
        ],
        resources: [
          {
            name: "dummyhost",
            type: "host",
          },
        ],
      },
    ],
  },
};

apiInstance
  .submitMetrics(params)
  .then((data: v2.IntakePayloadAccepted) => {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  })
  .catch((error: any) => console.error(error));
```
{{< /programming-lang >}}

{{< programming-lang lang="curl" >}}
```shell
## Puntos dinámicos
# Datos posteriores a las series temporales que pueden representarse gráficamente en dashboards Datadog.
# Variables de plantilla
export NOW="$(date +%s)"
# Comando Curl 
curl -X POST "https://api.datadoghq.com/api/v2/series" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-d @- << EOF
{
  "series": [
    {
      "metric": "system.load.1",
      "type": 0,
      "points": [
        {
            # Añadir marca de tiempo histórica aquí
          "timestamp": 1636629071,
            # ***********************

          "value": 0.7
        }
      ],
      "resources": [
        {
          "name": "dummyhost",
          "type": "host"
        }
      ]
    }
  ]
}
EOF
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Agent

Para enviar métricas históricas con el Agent, asegúrate de tener instalada la versión del Agent 7.40.0 o posterior. Esta versión incluye una interfaz DogStatsD actualizada, compatible con **Java**, **GoLang** y **.NET**. Esto te permite enviar puntos de métricas retrasados a través del Agent.

{{< programming-lang-wrapper langs="java,go,.NET" >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        Statsd.gaugeWithTimestamp("example_metric.gauge_with_timestamp", new Random().nextInt(20), 1205794800, new String[]{"environment:dev"});
        Statsd.countWithTimestamp("example_metric.count_with_timestamp", new Random().nextInt(20), 1205794800, new String[]{"environment:dev"});
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "log"
  "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

  ts := time.Date(2008, time.March, 17, 23, 0, 0, 0, time.UTC)
    statsd.GaugeWithTimestamp("example_metric.gauge_with_timestamp", 12, []string{"environment:dev"}, 1, ts)
  statsd.CountWithTimestamp("example_metric.count_with_timestamp", 12, []string{"environment:dev"}, 1, ts)
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };

        using (var dogStatsdService = new DogStatsdService())
        {
            dogStatsdService.Configure(dogstatsdConfig);
            var random = new Random(0);
            var dto = new DateTimeOffset(2008, 03, 17, 23, 00, 00, new TimeSpan(0, 0, 0))
            dogStatsdService.Gauge("example_metric.gauge_with_timestamp", 10, tags: new[] {"environment:dev"}, dto);
            dogStatsdService.Counter("example_metric.count_with_timestamp", 10, tags: new[] {"environment:dev"}, dto);
        }
    }
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Latencia de consumo de métricas históricas 

El consumo de métricas históricas tiene una latencia variable dependiendo de lo lejos en el pasado que estén tus métricas.

| Métrica retrasada por:   | Latencia de consumo                     |
|----------------------|---------------------------------------|
| 1 a 12 horas           | Consumo casi en tiempo real (1 hora como máximo) |
| 12 horas a 30 días   | Latencia de hasta 14 horas                 |
| Más de 30 días             | Más de 14 horas de latencia                     |


## Facturación del consumo de métricas históricas

Las métricas históricas se contabilizan y facturan como métricas personalizadas indexadas. Las métricas personalizadas facturables se determinan por la **marca de tiempo de las métricas enviadas", independientemente de si tienen una marca de tiempo de hoy o de 15 meses en el pasado. Mientras la combinación de nombre de métrica y valor de etiqueta esté informando activamente de CUALQUIER valor (independientemente de la marca de tiempo), se considerará activa en la hora en que se envió. Para obtener más información, consulte la documentación [Facturación de métricas personalizadas][3].

Realiza un seguimiento de tus métricas históricas indexadas en la sección Resumen de uso, de la página [Plan y uso][4].

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="Sección Resumen de uso de la página Plan y uso, que muestra tanto métricas personalizadas indexadas como métricas históricas indexadas" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/summary/
[2]: /es/metrics/#submit-metrics
[3]: /es/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
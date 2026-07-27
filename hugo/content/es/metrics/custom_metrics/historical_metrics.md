---
description: Ingerir valores de métricas personalizadas con marcas de tiempo anteriores
  a una hora, hasta su período de retención de métricas.
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Supervisar el rendimiento del sistema durante períodos de tiempo más largos
    con métricas históricas
- link: /extend/dogstatsd/
  tag: Documentación
  text: Aprenda más sobre DogStatsD
- link: /extend/community/libraries/
  tag: Documentación
  text: Bibliotecas cliente de API y DogStatsD, tanto oficiales como creadas por la
    comunidad.
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Supervisar el rendimiento del sistema durante períodos de tiempo más largos
    con métricas históricas
title: Ingesta de Métricas Históricas
---
{{< jqmath-vanilla >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">La ingesta de métricas históricas no es compatible con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## Resumen {#overview}

Habilitar la ingesta de métricas históricas le permite recopilar valores de **métricas personalizadas** con marcas de tiempo más antiguas de una hora desde el momento de la presentación, pero no más antiguas que su período total de retención de métricas (por defecto de 15 meses).

Tener habilitada la ingesta de métricas históricas en sus métricas puede ser útil para una variedad de casos de uso, como recuperarse de una interrupción, corregir valores erróneos y gestionar retrasos de IoT.

## ¿Qué es la ingesta de métricas históricas? {#what-is-historical-metrics-ingestion}

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="Diagrama que muestra el flujo de ingesta para métricas históricas habilitadas" >}}

Datadog clasifica *métricas históricas* como puntos métricos con marcas de tiempo que son más antiguas de una hora en relación con el momento de la presentación. Si la ingesta de métricas históricas no está habilitada, los valores de una métrica más antiguos de una hora desde la presentación no se ingieren.

Por ejemplo, su métrica (`exampleMetricA`) emite un valor a Datadog a la 1:00 PM EST, y la marca de tiempo de ese valor es 10:00 AM EST. Este valor de métrica se clasifica como _histórico_ porque tiene una marca de tiempo 3 horas más antigua en relación con el momento de la presentación.

Con la ingesta de métricas históricas habilitada, si envía múltiples valores con la misma marca de tiempo y la misma combinación de etiqueta-valor a Datadog, Datadog preserva el valor más recientemente enviado. Es decir, si dentro de la misma marca de tiempo, envía una métrica con un valor de X, y también envía esa métrica con un valor de Y, el valor que se haya enviado más recientemente será preservado.

Puede comenzar la ingesta de valores de métricas históricas habilitando la Ingesta de Métricas Históricas en la [Metrics Summary Page][1] para los tipos de métricas *cuentas, tasas y gauge*.  

**Nota**: La Ingestión de Métricas Históricas no está disponible para métricas de distribución, o métricas personalizadas generadas a partir de otros tipos de datos de Datadog (como registros).

## Configuración {#configuration}

Para habilitar la ingestión de métricas históricas para una métrica específica:
1. Navegue a la [Metrics Summary Page][1].
1. Haga clic en el nombre de la métrica para la que desee habilitar la Ingesta de Métricas Históricas para abrir el panel lateral de detalles.
1. Dentro de la sección *Avanzada* del panel lateral, haga clic en **Configure**.
1. Seleccione el interruptor **Habilitar métricas históricas** y presione **Guardar**.

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Metrics Summary page mostrando el panel de facetas de métricas históricas y la sección Avanzada de un panel de detalles de Métrica abierto con la opción Habilitar métricas históricas seleccionada." style="width:100%;" >}}

### Configuración masiva para múltiples métricas {#bulk-configuration-for-multiple-metrics}

Puedes habilitar o deshabilitar la Ingestión de Métricas Históricas para múltiples métricas a la vez, en lugar de tener que configurar cada una individualmente.

1. Navegue a la [Metrics Summary Page][1] y haga clic en el menú desplegable **Configure Metrics**.
1. Seleccione **Habilitar métricas históricas**.
1. Especifique un prefijo de espacio de nombres de métrica para seleccionar todas las métricas que coincidan con ese espacio de nombres.
1. (Opcional) Para deshabilitar la Ingestión de Métricas Históricas para todas las métricas en el espacio de nombres, haga clic en el interruptor **Métricas históricas**.

{{< img src="metrics/custom_metrics/historical_metrics/historical_metrics_ingestion_toggle.png" alt="Interruptor de ingestión de métricas históricas" >}}

## Envío de métricas históricas {#historical-metrics-submission}

Después de habilitar la Ingesta de Métricas Históricas, puede enviar valores métricos con marcas de tiempo históricas a través de la [API](#api) o a través del [Agent](#agent).

### API {#api}

Con la API, puede enviar valores métricos con marcas de tiempo históricas en la carga útil (siempre que el nombre de la métrica ya haya sido habilitado para aceptar métricas históricas a través de la interfaz de usuario descrita anteriormente).

{{< programming-lang-wrapper langs="python,java,go,ruby,typescript,curl" collapsible="true">}}

{{< programming-lang lang="python">}}

```python
"""
Submit metrics returns "Payload accepted" response
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

                    """ Add historical timestamp here """
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
// Submit metrics returns "Payload accepted" response
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
                            
                                    //Add historical timestamp here
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
// Submit metrics returns "Payload accepted" response

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
                        //Add historical timestamp here
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
# Submit metrics returns "Payload accepted" response

require "datadog_api_client"
api_instance = DatadogAPIClient::V2::MetricsAPI.new

body = DatadogAPIClient::V2::MetricPayload.new({
  series: [
    DatadogAPIClient::V2::MetricSeries.new({
      metric: "system.load.1",
      type: DatadogAPIClient::V2::MetricIntakeType::UNSPECIFIED,
      points: [
        DatadogAPIClient::V2::MetricPoint.new({

          #Add historical timestamp here  
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
 * Submit metrics returns "Payload accepted" response
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
            //Add historical timestamp here
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
## Dynamic Points
# Post time-series data that can be graphed on Datadog’s dashboards.
# Template variables
export NOW="$(date +%s)"
# Curl command
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
            # Add historical timestamp here
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

### Agente {#agent}

Para enviar métricas históricas con el Agente, asegúrese de tener instalada la versión 7.40.0 o posterior del Agente. Esta versión incluye una interfaz actualizada de DogStatsD, que soporta **Java**, **GoLang** y **.NET**. Esto le permite enviar puntos métricos retrasados a través del Agente.

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

## Latencia de Ingesta de Métricas Históricas {#historical-metrics-ingestions-latency}

La Ingesta de Métricas Históricas tiene una latencia variable dependiendo de cuán atrás en el tiempo estén las marcas de tiempo de sus métricas.

| Métrica Retrasada por:   | Latencia de Ingesta                         |
|----------------------|-------------------------------------------|
| 1-12 horas           | Ingesta Casi en Tiempo Real (máximo 1 hora) |
| 12 horas - 30 días   | Hasta 14 horas de latencia                    |
| Más de 30 días         | Más de 14 horas de latencia                     |

## Facturación de Ingesta de Métricas Históricas {#historical-metrics-ingestion-billing}

Las métricas históricas se cuentan y facturan como métricas personalizadas indexadas. Las métricas personalizadas facturables se determinan por la **marca de tiempo de las métricas enviadas**, independientemente de si tienen una marca de tiempo de hoy o de hace 15 meses. Siempre que esa combinación de nombres de métrica y valor de etiqueta esté reportando activamente **cualquier** valor (independientemente de la marca de tiempo), se consideraría activa en la hora en que fue enviada. 

El siguiente ejemplo asume:
- 3000 combinaciones únicas de etiqueta-valor
- 1500 métricas en tiempo real
- 1500 métricas históricas 
- 720 horas en el mes (30 días)
- Costo de métrica personalizada de $5 por cada 100 métricas

$(1500/ 720) ⋅ (5 / 100) + $(1500/ 720) ⋅ (5 / 100) = \\$0.21

Realice un seguimiento de sus métricas históricas indexadas a través de la sección Resumen de Uso de la [página de Plan y Uso][4].

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="Sección Resumen de Uso de la página de Plan y Uso, que muestra tanto métricas personalizadas indexadas como métricas históricas indexadas" style="width:100%;" >}}

Para más información, consulte la documentación de [facturación de Métricas Personalizadas][3].

### Facturación bajo el precio de Nombre de Métrica {#billing-under-metric-name-pricing}

Si su organización utiliza [precio de Nombre de Métrica][5] en lugar de precios por cardinalidad, la facturación de HMI es diferente. El uso de HMI se calcula en función del tiempo de ingestión en lugar de la marca de tiempo original de la métrica. Cada punto de datos de HMI contribuye tanto al volumen ingerido como al volumen indexado.

Para detalles sobre el modelo de precios de Nombre de Métrica, consulte [Precios de Nombre de Métrica para Métricas Personalizadas][5].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /es/metrics/#submit-metrics
[3]: /es/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
[5]: /es/account_management/billing/metric_name_pricing/
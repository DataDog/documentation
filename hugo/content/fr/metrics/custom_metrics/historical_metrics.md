---
description: Ingérez des valeurs de métriques personnalisées horodatées de plus d’une
  heure, jusqu’à la fin de votre période de rétention des métriques.
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Surveillez les performances du système sur des périodes plus longues avec
    des métriques historiques
- link: /extend/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /extend/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Surveillez les performances du système sur des périodes plus longues avec
    des métriques historiques
title: Ingestion historique de métriques
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

L’activation de Historical Metrics Ingestion vous permet de collecter des valeurs de **métriques personnalisées** dont l’horodatage remonte à plus d’une heure avant leur soumission, sans dépasser votre période totale de rétention des métriques (15 mois par défaut).

L’activation de Historical Metrics Ingestion pour vos métriques peut être utile dans divers cas d’utilisation, notamment pour récupérer après une panne, corriger des valeurs erronées et gérer les retards liés à l’IoT.

## Qu’est-ce que Historical Metrics Ingestion ? {#what-is-historical-metrics-ingestion}

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="Diagramme montrant le flux d’ingestion lorsque Historical Metrics est activée" >}}

Datadog classe les *métriques historiques* comme des points de métrique dont l’horodatage remonte à plus d’une heure avant leur soumission. Si Historical Metrics Ingestion n’est pas activée, les valeurs d’une métrique dont l’horodatage remonte à plus d’une heure avant leur soumission ne sont pas ingérées.

Par exemple, votre métrique (`exampleMetricA`) envoie une valeur à Datadog à 13 h 00 EST, et cette valeur est horodatée à 10 h 00 EST. Cette valeur de métrique est classée comme _historique_ car son horodatage est antérieur de 3 heures par rapport à l'heure de soumission.

Lorsque Historical Metrics Ingestion est activée pour vos métriques, si vous soumettez à Datadog plusieurs valeurs ayant le même horodatage et la même combinaison tag-valeur, Datadog conserve la dernière valeur soumise. C'est-à-dire que si, pour le même horodatage, vous soumettez une métrique avec une valeur de X, et que vous envoyez également cette métrique avec une valeur de Y, la valeur la plus récemment soumise sera conservée.

Vous pouvez commencer à ingérer des valeurs de métriques historiques en activant Historical Metrics Ingestion sur la [page Metrics Catalog][1] pour les types de métriques *comptes, taux et jauges*.  

**Remarque** : Historical Metrics Ingestion n’est pas disponible pour les métriques de distribution ni pour les métriques personnalisées générées à partir d’autres types de données Datadog (tels que les logs).

## Configuration {#configuration}

Pour activer l'ingestion de métriques historiques pour une métrique spécifique :
1. Accédez à la [page Metrics Catalog][1].
1. Cliquez sur le nom de la métrique pour laquelle vous souhaitez activer Historical Metrics Ingestion afin d'ouvrir le panneau latéral des détails de la métrique.
1. Dans la section *Advanced* du panneau latéral, cliquez sur {{< ui >}}Configure{{< /ui >}}.
1. Sélectionnez le bouton {{< ui >}}Enable historical metrics{{< /ui >}} et appuyez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Page Metrics Catalog montrant le panneau des facettes Historical Metrics et la section Advanced d’un panneau de détails de métrique ouvert, avec l’option Enable historical metrics sélectionnée" style="width:100%;" >}}

### Configuration en masse pour plusieurs métriques {#bulk-configuration-for-multiple-metrics}

Vous pouvez activer ou désactiver Historical Metrics Ingestion pour plusieurs métriques à la fois, plutôt que de devoir configurer chacune d'elles individuellement.

1. Accédez à la [page Metrics Catalog][1] et cliquez sur le menu déroulant {{< ui >}}Actions{{< /ui >}}.
1. Sélectionnez {{< ui >}}Manage Historical Metrics{{< /ui >}}.
1. Spécifiez un préfixe d'espace de nom de métrique pour sélectionner toutes les métriques correspondant à cet espace de nom.
1. (Facultatif) Pour désactiver Historical Metrics Ingestion pour toutes les métriques de l'espace de nom, cliquez sur le bouton {{< ui >}}Historical metrics{{< /ui >}}.

{{< img src="metrics/custom_metrics/historical_metrics/historical_metrics_ingestion_toggle.png" alt="Bouton d'ingestion historique de métriques" >}}

## Soumission de métriques historiques {#historical-metrics-submission}

Après avoir activé Historical Metrics Ingestion, vous pouvez soumettre des valeurs de métriques avec des horodatages historiques via l'[API](#api) ou via l'[Agent](#agent).

### API {#api}

Avec l'API, vous pouvez soumettre des valeurs de métriques avec des horodatages historiques dans la charge utile (à condition que le nom de la métrique ait déjà été activé pour accepter les métriques historiques via l'interface utilisateur décrite ci-dessus).

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

### Agent {#agent}

Pour soumettre des métriques historiques avec l'Agent, assurez-vous d'avoir installé l'Agent en version 7.40.0 ou ultérieure. Cette version inclut une interface DogStatsD mise à jour, qui prend en charge **Java**, **GoLang** et **.NET**. Cela vous permet d'envoyer des points de métrique différés via l'Agent.

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

## Latence de Historical Metrics Ingestion {#historical-metrics-ingestions-latency}

Historical Metrics Ingestion présente une latence variable selon l'ancienneté des horodatages de vos métriques.

| Métrique différée de :   | Latence d'ingestion                         |
|----------------------|-------------------------------------------|
| 1 à 12 heures           | Ingestion quasi en temps réel (1 heure maximum) |
| 12 heures à 30 jours   | Jusqu'à 14 heures de latence                    |
| Plus de 30 jours         | Plus de 14 heures de latence                     |

## Facturation de Historical Metrics Ingestion {#historical-metrics-ingestion-billing}

Les métriques historiques sont comptabilisées et facturées en tant que métriques personnalisées indexées. Les métriques personnalisées facturables sont déterminées par l'**horodatage des métriques soumises**, indépendamment du fait qu'elles aient un horodatage d'aujourd'hui ou remontant à 15 mois. Tant que cette combinaison de nom de métrique et de valeur de tag transmet **une valeur quelconque** (quel que soit l'horodatage), elle est considérée comme active pendant l'heure où elle a été soumise. 

L'exemple suivant suppose :
- 3 000 combinaisons uniques de tags et de valeurs
- 1 500 métriques en temps réel
- 1 500 métriques historiques 
- 720 heures dans le mois (30 jours)
- Coût des métriques personnalisées de 5 $ pour 100 métriques

$(1500/ 720) ⋅ (5 / 100) + $(1500/ 720) ⋅ (5 / 100) = \\$0.21

Suivez vos métriques historiques indexées dans la section Usage Summary de la [page Plan and Usage][4].

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="Section Usage Summary de la page Plan and Usage, qui affiche à la fois les métriques personnalisées indexées et les métriques historiques indexées" style="width:100%;" >}}

Pour plus d'informations, consultez la documentation sur la [facturation des métriques personnalisées][3].

### Facturation selon la tarification Metric Name {#billing-under-metric-name-pricing}

Si votre organisation utilise la [tarification Metric Name][5] au lieu de la tarification par cardinalité, la facturation HMI diffère. L'utilisation HMI est calculée en fonction de l'heure d'ingestion plutôt que de l'horodatage d'origine de la métrique. Chaque point de données HMI contribue à la fois au volume ingéré et au volume indexé.

Pour plus de détails sur le modèle de tarification Metric Name, consultez [Tarification Metric Name pour Custom Metrics][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/catalog
[2]: /fr/metrics/#submit-metrics
[3]: /fr/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
[5]: /fr/account_management/billing/metric_name_pricing/
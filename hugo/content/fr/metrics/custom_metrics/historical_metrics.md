---
description: Ingestion de valeurs de métriques personnalisées avec des horodatages
  plus anciens qu'une heure, jusqu'à votre période de conservation des métriques.
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Surveillez les performances système sur de plus longues périodes grâce aux
    métriques historiques
- link: /extend/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /extend/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Surveillez les performances système sur de plus longues périodes grâce aux
    métriques historiques
title: 'Ingestion historique de métriques '
---
{{< jqmath-vanilla >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">L'ingestion de métriques historiques n'est pas prise en charge pour votre site <a href="/getting_started/site">Datadog</a> ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## Aperçu {#overview}

L'activation de l'ingestion de métriques historiques vous permet de collecter des valeurs de **métriques personnalisées** avec des horodatages plus anciens qu'une heure à partir du moment de la soumission, mais pas plus anciens que votre période de conservation totale des métriques (par défaut de 15 mois).

Activer cette fonctionnalité sur vos métriques peut s'avérer utile dans plusieurs cas : reprise après incident, correction de valeurs erronées, gestion des retards liés à l'IoT, etc.

## Qu'est-ce que l'ingestion de métriques historiques ? {#what-is-historical-metrics-ingestion}

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="Diagramme montrant le flux d'ingestion lorsque l'ingestion des métriques historiques est activée." >}}

Datadog classe les *métriques historiques* comme des points de métriques avec des horodatages qui sont plus anciens qu'une heure par rapport au moment de la soumission. Si l'ingestion de métriques historiques n'est pas activée, les valeurs d'une métrique plus anciennes qu'une heure à partir de la soumission ne sont pas ingérées.

Par exemple, votre métrique (`exampleMetricA`) émet une valeur à Datadog à 13h00 EST, et l'horodatage de cette valeur est 10h00 EST. Cette valeur de métrique est classée comme _historique_ car elle a un horodatage 3 heures plus ancien par rapport au moment de la soumission.

Avec l'ingestion de métriques historiques activée, si vous soumettez plusieurs valeurs avec le même horodatage et la même combinaison de tag et de valeur à Datadog, Datadog préserve la valeur soumise le plus récemment. C'est-à-dire que si, dans le même horodatage, vous soumettez une métrique avec une valeur de X, et que vous envoyez également cette métrique avec une valeur de Y, la valeur qui a été soumise le plus récemment sera préservée.

Vous pouvez commencer à ingérer des valeurs de métriques historiques en activant l'ingestion de métriques historiques sur la [Page de résumé des métriques][1] pour les types de métriques *comptes, taux et jauges*.  

**Remarque** : L'ingestion de métriques historiques n'est pas disponible pour les métriques de distribution, ou les métriques personnalisées générées à partir d'autres types de données Datadog (comme les journaux).

## Configuration {#configuration}

Pour activer l'ingestion des métriques historiques pour une métrique spécifique :
1. Accédez à la [Page de résumé des métriques][1].
1. Cliquez sur le nom de la métrique pour laquelle vous souhaitez activer l'ingestion de métriques historiques afin d'ouvrir le panneau latéral des détails de la métrique.
1. Dans la section *Avancé* du panneau latéral, cliquez sur **Configurer**.
1. Sélectionnez le **Activer les métriques historiques** et appuyez sur **Enregistrer**.

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Page de résumé des métriques affichant le panneau des facettes des métriques historiques et la section avancée d'un panneau de détail de métrique ouvert avec l'option Activer les métriques historiques sélectionnée" style="width:100%;" >}}

### Configuration en masse pour plusieurs métriques {#bulk-configuration-for-multiple-metrics}

Vous pouvez activer ou désactiver l'ingestion des métriques historiques pour plusieurs métriques en une seule opération, sans avoir à les configurer une par une.

1. Accédez à la [Page de résumé des métriques][1] et cliquez sur le menu déroulant **Configurer les métriques**.
1. Sélectionnez **Activer les métriques historiques**.
1. Spécifiez un préfixe de namespace de métrique pour sélectionner toutes les métriques qui correspondent à ce namespace.
1. (Optionnel) Pour désactiver l'ingestion des métriques historiques pour toutes les métriques dans le namespace, cliquez sur le bouton **Métriques historiques**.

{{< img src="metrics/custom_metrics/historical_metrics/historical_metrics_ingestion_toggle.png" alt="Bouton d'ingestion des métriques historiques" >}}

## Soumission des métriques historiques {#historical-metrics-submission}

Après avoir activé l'ingestion des métriques historiques, vous pouvez soumettre des valeurs de métriques avec des horodatages historiques via l'[API](#api) ou via l'[Agent](#agent).

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

Pour soumettre des métriques historiques avec l'Agent, assurez-vous d'avoir installé la version 7.40.0 ou ultérieure de l'Agent. Cette version inclut une interface DogStatsD mise à jour, qui prend en charge **Java**, **GoLang** et **.NET**. Cela vous permet d'envoyer des points de métriques retardés via l'Agent.

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

## Latence de l'ingestion des métriques historiques {#historical-metrics-ingestions-latency}

La latence de l'ingestion des métriques historiques varie selon l'ancienneté des horodatages de vos métriques.

| Métrique retardée de :   | Latence d'ingestion                         |
|----------------------|-------------------------------------------|
| 1-12 heures           | Ingestion en temps quasi réel (maximum 1 heure) |
| 12 heures - 30 jours   | Jusqu'à 14 heures de latence                    |
| Plus de 30 jours         | Plus de 14 heures de latence                     |

## Facturation de l'ingestion des métriques historiques {#historical-metrics-ingestion-billing}

Les métriques historiques sont comptées et facturées comme des métriques personnalisées indexées. Les métriques personnalisées facturables sont déterminées par le **timestamp des métriques soumises**, peu importe qu'elles aient un timestamp d'aujourd'hui ou de 15 mois dans le passé. Tant que cette combinaison de nom de métrique et de valeur de tag rapporte activement **une** valeur (indépendamment du timestamp), elle serait considérée comme active à l'heure où elle a été soumise. 

L'exemple suivant suppose :
- 3000 combinaisons uniques de tag et de valeur
- 1500 métriques en temps réel
- 1500 métriques historiques 
- 720 heures dans le mois (30 jours)
- Coût de la métrique personnalisée de 5 $ par 100 métriques

$(1500/ 720) ⋅ (5 / 100) + $(1500/ 720) ⋅ (5 / 100) = \\$0.21

Suivez vos métriques historiques indexées dans la section Usage Summary (Récapitulatif d'utilisation) de la [page Plan and Usage (Abonnement et utilisation)][4].

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="Section Résumé d'utilisation de la page Plan et Utilisation, qui montre à la fois les métriques personnalisées indexées et les métriques historiques indexées" style="width:100%;" >}}

Pour plus d'informations, consultez la documentation sur la [facturation des métriques personnalisées][3].

### Facturation selon le Metric Name pricing {#billing-under-metric-name-pricing}

Si votre organisation utilise [Metric Name pricing][5] au lieu du [cardinality pricing], la facturation HMI diffère. L'utilisation de HMI est calculée en fonction du temps d'ingestion plutôt que du timestamp original de la métrique. Chaque point de données HMI contribue à la fois au volume ingéré et indexé.

Pour plus de détails sur le modèle de tarification Metric Name Pricing, consultez [Metric Name Pricing for Custom Metrics][5].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/metrics/#submit-metrics
[3]: /fr/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
[5]: /fr/account_management/billing/metric_name_pricing/
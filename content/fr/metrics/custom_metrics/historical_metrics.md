---
further_reading:
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Surveillez les performances système sur de plus longues périodes grâce aux
    métriques historiques
- link: /developers/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /developers/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: https://www.datadoghq.com/blog/historical-metrics/
  tag: Blog
  text: Surveillez les performances système sur de plus longues périodes grâce aux
    métriques historiques
title: Ingestion historique de métriques
---

{{< jqmath-vanilla >}}

{{% site-region region="gov" %}}
"<div class="alert alert-danger">L'ingestion des métriques historiques n'est pas prise en charge pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## Section Overview

Activer l'ingestion des métriques historiques vous permet de collecter des **métriques personnalisées** dont les horodatages sont antérieurs d'une heure à la date de soumission, mais pas au-delà de votre période totale de rétention des métriques (15 mois par défaut). 

Activer cette fonctionnalité sur vos métriques peut s'avérer utile dans plusieurs cas : reprise après incident, correction de valeurs erronées, gestion des retards liés à l'IoT, etc.

## Qu'est-ce que l'ingestion des métriques historiques ?

{{< img src="/metrics/custom_metrics/historical_metrics/diagram_historical-metrics-ingestion_1_240202.png" alt="Diagramme illustrant le flux d'ingestion lorsque les métriques historiques sont activées" >}}

Datadog classe comme *métriques historiques* les points de métrique dont les horodatages sont antérieurs d'une heure à leur date de soumission. Si l'ingestion des métriques historiques n'est pas activée, les valeurs de métriques plus anciennes d'une heure ne sont pas ingérées.

Par exemple, votre métrique (`exampleMetricA`) envoie une valeur à Datadog à 13 h 00 (heure de l'Est), avec un horodatage de 10 h 00. Cette valeur est considérée comme _historique_ car son horodatage est antérieur de 3 heures à la date de soumission.

Avec l'ingestion des métriques historiques activée, si vous soumettez plusieurs valeurs avec le même horodatage et les mêmes étiquettes, Datadog conserve la valeur soumise la plus récemment. Autrement dit, si vous soumettez une métrique avec la valeur X, puis avec la valeur Y pour le même horodatage, c'est la valeur soumise en dernier qui est conservée.

Vous pouvez commencer à ingérer des valeurs historiques en activant l'ingestion sur la [page de synthèse des métriques][1], pour les types de métriques *count*, *rate* et *gauge*. 

**Remarque** : L'ingestion de mesures historiques n'est pas disponible pour les mesures de distribution ou les mesures personnalisées générées à partir d'autres types de données Datadog (telles que les journaux).

## Configuration

Pour activer l'ingestion des métriques historiques pour une métrique spécifique :
1. Accédez à la [page de synthèse des métriques][1]. 
1. Cliquez sur le nom de la métrique concernée pour ouvrir le panneau latéral de détails. 
1. Dans la section *Advanced* de ce panneau, cliquez sur **Configure**. 
1. Activez l'option **Enable historical metrics** et cliquez sur **Save**. 

{{< img src="metrics/custom_metrics/historical_metrics/enable_historical_metrics.png" alt="Page de synthèse des métriques montrant le panneau des facettes et la section Advanced d'un panneau latéral avec l'option activée" style="width:100%;" >}}

### Configuration groupée pour plusieurs métriques

Vous pouvez activer ou désactiver l'ingestion des métriques historiques pour plusieurs métriques en une seule opération, sans avoir à les configurer une par une.

1. Accédez à la [page de synthèse des métriques][1] et cliquez sur le menu déroulant **Configure Metrics**.
1. Sélectionnez **Enable historical metrics**.
1. Spécifiez un préfixe d'espace de noms de métriques pour sélectionner toutes les métriques correspondant à cet espace de noms.
1. (Facultatif) Pour désactiver l'ingestion de métriques historiques pour toutes les métriques de l'espace de noms, cliquez sur le bouton **Historical metrics**.

{{< img src="metrics/custom_metrics/historical_metrics/historical_metrics_ingestion_toggle.png" alt="Bouton d'ingestion des métriques historiques" >}}

## Soumission de données historiques

Après avoir activé l'ingestion de métriques historiques, vous pouvez soumettre des valeurs de métriques avec des horodatages historiques via l'[API](#api) ou via l'[Agent](#agent).

### API 

Avec l'API, vous pouvez soumettre des valeurs de métriques avec des horodatages historiques dans la charge utile (à condition que le nom de la métrique ait déjà été activé pour accepter les métriques historiques via l'interface utilisateur décrite ci-dessus).

{{< programming-lang-wrapper langs="python,java,go,ruby,typescript,curl" collapsible="true">}}

{{< programming-lang lang="python">}}
```python
"""
L'envoi de métriques renvoie la réponse « Payload accepted »
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

                    """ Ajouter l'hotodatage historique ici """
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
// L'envoi de métriques renvoie la réponse « Payload accepted »
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
// L'envoi de métriques renvoie la réponse « Payload accepted »

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
# L'envoi de métriques renvoie la réponse « Payload accepted »

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
 * L'envoi de métriques renvoie la réponse « Payload accepted »
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
## Points dynamiques
# Envoyez des données de séries temporelles pouvant être représentées dans les dashboards de Datadog.
# Variables de modèle
export NOW="$(date +%s)"
# Commande Curl
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
            # Ajouter ici un horodatage historique
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

Pour envoyer des métriques historiques avec l'Agent, assurez-vous d'avoir installé la version 7.40.0 ou ultérieure de l'Agent. Cette version inclut une interface DogStatsD mise à jour, compatible avec **Java**, **GoLang** et **.NET**. Cela vous permet d'envoyer des points de métrique différés via l'Agent.

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

## Latence de l'ingestion des métriques historiques

La latence de l'ingestion des métriques historiques varie selon l'ancienneté des horodatages de vos métriques.

| Délai de la métrique :   | Latence d'ingestion                         |
|----------------------|-------------------------------------------|
| 1 à 12 heures           | Ingestion en temps quasi réel (1 heure maximum) |
| 12 heures à 30 jours   | Jusqu'à 14 heures de latence                    |
| Plus de 30 jours         | Plus de 14 heures de latence                     |

## Facturation de l'ingestion des métriques historiques

Les mesures historiques sont comptabilisées et facturées comme des mesures personnalisées indexées. Les mesures personnalisées facturables sont déterminées par l'**horodatage des mesures soumises**, qu'elles soient datées d'aujourd'hui ou de 15 mois. Tant que cette combinaison de nom de métrique et de valeur de tag rapporte activement **une valeur** (indépendamment de l'horodatage), elle est considérée comme active dans l'heure où elle a été soumise. 

L'exemple suivant part du principe que
- 3000 combinaisons uniques de tags et de valeurs
- 1500 mesures en temps réel
- 1500 mesures historiques 
- 720 heures dans le mois (30 jours)
- Coût des métriques personnalisées : 5 $ pour 100 métriques

$(1500/ 720) ⋅ (5 / 100) + $(1500/ 720) ⋅ (5 / 100) = \\$0.21$

Suivez vos métriques historiques indexées dans la section Usage Summary (Récapitulatif d'utilisation) de la [page Plan and Usage (Abonnement et utilisation)][4].

{{< img src="metrics/custom_metrics/historical_metrics/custom_metrics_usage_summary.png" alt="Section Récapitulatif d'utilisation de la page Plan and Usage, affichant les métriques personnalisées indexées et les métriques historiques indexées" style="width:100%;" >}}

Pour plus d'informations, voir la documentation [Facturation de métriques personnalisées][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/metrics/#submit-metrics
[3]: /fr/account_management/billing/custom_metrics/
[4]: https://app.datadoghq.com/billing/usage
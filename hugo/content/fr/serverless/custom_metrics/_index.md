---
title: Custom Metrics des applications Serverless AWS Lambda
---
## Présentation {#overview}

Il existe plusieurs façons de soumettre des Custom Metrics à Datadog depuis une fonction Lambda.

- **[Créer des Custom Metrics à partir de logs ou de traces](#creating-custom-metrics-from-logs-or-traces)** : Si vos fonctions Lambda envoient déjà des données de trace ou de log à Datadog, et que les données que vous souhaitez interroger sont capturées dans un log ou une trace existant, vous pouvez générer des Custom Metrics à partir de logs et de traces sans redéployer ni apporter de modifications au code de votre application.
- **[Soumettre des Custom Metrics avec la Datadog Lambda Extension](#with-the-datadog-lambda-extension)** : Si vous souhaitez soumettre des Custom Metrics directement depuis votre fonction Lambda, Datadog recommande d'utiliser la [Datadog Lambda Extension][1].
- **[Soumettre des Custom Metrics en utilisant la Lambda Datadog Forwarder](#with-the-datadog-forwarder)** : Si vous envoyez de la télémétrie depuis votre fonction Lambda via la Lambda Datadog Forwarder, vous pouvez soumettre des Custom Metrics via des logs en utilisant les fonctions d'assistance fournies par Datadog.
- **[(Obsolète) Soumettre des Custom Metrics à partir de logs CloudWatch](#deprecated-cloudwatch-logs)** : La méthode pour soumettre des Custom Metrics en imprimant un log formaté comme `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` est obsolète. Datadog recommande plutôt d'utiliser la [Datadog Lambda Extension](#with-the-datadog-lambda-extension).
- **(Obsolète) Soumettre des Custom Metrics en utilisant la bibliothèque Datadog Lambda** : La bibliothèque Datadog Lambda pour Python, Node.js et Go prend en charge l'envoi de Custom Metrics de manière synchrone depuis le runtime vers Datadog en bloquant l'invocation lorsque `DD_FLUSH_TO_LOG` est défini sur `false`. Outre la surcharge de performance, les soumissions de métriques peuvent également rencontrer des erreurs intermittentes dues à l'absence de nouvelles tentatives en cas de problèmes réseau transitoires. Datadog recommande plutôt d'utiliser la [Datadog Lambda Extension](#with-the-datadog-lambda-extension).
- **(Non recommandé) Utilisation d'une bibliothèque tierce** : La plupart des bibliothèques tierces ne soumettent pas les métriques sous forme de distributions et peuvent entraîner des résultats sous-évalués. Vous pouvez également rencontrer des erreurs intermittentes dues à l'absence de nouvelles tentatives en cas de problèmes réseau transitoires.

### Comprendre les métriques de distribution {#understanding-distribution-metrics}

Lorsque Datadog reçoit plusieurs points de métrique de type count ou jauge qui partagent le même horodatage et le même ensemble de tags, seul le plus récent est pris en compte. Cela fonctionne pour les applications exécutées sur des hosts, car les points de métrique sont agrégés par l'Agent Datadog et associés à un tag `host` unique.

Une fonction Lambda peut lancer de nombreux environnements d'exécution simultanés lorsque le trafic augmente. La fonction peut soumettre des points de métrique de type compteur ou jauge qui se remplacent mutuellement et entraînent des résultats sous-évalués. Pour éviter ce problème, les Custom Metrics générées par les fonctions Lambda sont soumises en tant que [distributions][2] car les points de métrique de distribution sont agrégés sur le backend Datadog, et chaque point de métrique est comptabilisé.

Les distributions fournissent des agrégations `avg`, `sum`, `max`, `min`, `count` par défaut. Sur la page {{< ui >}}Metrics Catalog{{< /ui >}}, vous pouvez activer les agrégations de centiles (p50, p75, p90, p95, p99) et également [gérer les tags][3]. Pour surveiller une distribution pour un type de métrique de jauge, utilisez `avg` pour les deux [agrégations temporelles et spatiales][4]. Pour surveiller une distribution pour un type de métrique de compteur, utilisez `sum` pour les deux [agrégations temporelles et spatiales][4]. Consultez le guide [Query to the Graph][5] pour savoir comment fonctionnent les agrégations temporelles et spatiales.

### Soumission d'un grand nombre de points de données {#submitting-many-data-points}

Lorsque vous utilisez le Forwarder pour soumettre un grand nombre de points de données pour la même métrique et le même ensemble de tags, par exemple à l'intérieur d'une grande boucle `for`, il peut y avoir un impact notable sur les performances de la fonction Lambda ainsi qu'un impact sur les coûts CloudWatch. Vous pouvez agréger les points de données dans votre application pour éviter cette surcharge ; consultez l'exemple Python suivant :

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

## Création de Custom Metrics à partir de logs ou de traces {#creating-custom-metrics-from-logs-or-traces}

Avec les métriques basées sur les logs, vous pouvez enregistrer un nombre de logs correspondant à une requête ou résumer une valeur numérique contenue dans un log, telle qu'une durée de requête. Les métriques basées sur les logs constituent un moyen rentable de résumer les données de logs provenant de l'ensemble du flux d'ingestion. Pour en savoir plus, consultez la documentation sur la [création de métriques basées sur les logs][6].

Vous pouvez également générer des métriques à partir de tous les spans ingérés, qu'ils soient indexés ou non par un filtre de rétention. Pour en savoir plus, consultez la documentation sur la [création de métriques basées sur les spans][7].
## Avec Datadog Lambda Extension {#with-the-datadog-lambda-extension}

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecte de Custom Metrics depuis AWS Lambda" >}}

Datadog recommande d'utiliser [Datadog Lambda Extension][1] pour soumettre des Custom Metrics en tant que [**distribution**](#understanding-distribution-metrics) depuis les runtimes Lambda pris en charge.

1. Suivez les [instructions d'installation serverless][8] générales appropriées pour votre runtime Lambda.
1. Si vous ne souhaitez pas collecter de traces depuis votre fonction Lambda, définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false`.
1. Si vous ne souhaitez pas collecter de logs depuis votre fonction Lambda, définissez la variable d'environnement `DD_SERVERLESS_LOGS_ENABLED` sur `false`.
1. Suivez l'exemple de code ou les instructions ci-dessous pour soumettre votre métrique personnalisée.

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

Installez la dernière version de [java-dogstatsd-client][1], puis suivez l'exemple de code ci-dessous pour soumettre vos Custom Metrics en tant que [**distribution**](#understanding-distribution-metrics).

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

Installez la dernière version de [dogstatsd-csharp-client][1], puis suivez l'exemple de code ci-dessous pour soumettre vos Custom Metrics en tant que [**métriques de distribution**](#understanding-distribution-metrics).

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

1. [Installez][1] le client DogStatsD pour votre runtime
2. Suivez l'[exemple de code][2] pour soumettre vos Custom Metrics en tant que [**distribution**](#understanding-distribution-metrics)


[1]: /fr/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /fr/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Avec le Datadog Forwarder {#with-the-datadog-forwarder}

Datadog recommande d'utiliser le [Datadog Forwarder Lambda][9] pour soumettre des Custom Metrics depuis les runtimes Lambda qui ne sont pas pris en charge par la Datadog Lambda Extension.

1. Suivez les [instructions générales d'installation serverless][8] pour instrumenter votre fonction Lambda à l'aide de la fonction Lambda Datadog Forwarder.
1. Si vous ne souhaitez pas collecter de traces depuis votre fonction Lambda, définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false` sur votre propre fonction Lambda.
1. Si vous ne souhaitez pas collecter de logs depuis votre fonction Lambda, définissez le paramètre de stack CloudFormation du Forwarder `DdForwardLog` sur `false`.
1. Importez et utilisez la fonction d'assistance de la bibliothèque Datadog Lambda, telle que `lambda_metric` ou `sendDistributionMetric`, pour soumettre vos Custom Metrics en suivant l'exemple de code ci-dessous.

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

Écrivez une fonction réutilisable qui consigne vos Custom Metrics au format suivant :

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
}
```

Par exemple :

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

## [DÉPRÉCIÉ] Logs CloudWatch {#deprecated-cloudwatch-logs}

**Cette méthode d'envoi de Custom Metrics n'est plus prise en charge et est désactivée pour tous les nouveaux clients. Migrez vers l'une des solutions recommandées.**

**Remarque** : si vous migrez vers l'une des solutions recommandées, vous devrez commencer à instrumenter vos Custom Metrics sous de **nouveaux noms de métriques** lors de leur envoi à Datadog. Le même nom de métrique ne peut pas être utilisé simultanément pour une métrique de distribution et une métrique d'un autre type.

Cela nécessite les autorisations AWS suivantes dans votre [politique IAM Datadog][10].

| Autorisation AWS            | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | Répertoriez les groupes de journaux disponibles.                                  |
| `logs:DescribeLogStreams` | Répertoriez les flux de journaux disponibles pour un groupe.                     |
| `logs:FilterLogEvents`    | Récupérez des événements de journal spécifiques pour un flux afin de générer des métriques. |

Pour envoyer des Custom Metrics à Datadog à partir de vos journaux Lambda, écrivez une ligne de journal au format suivant :

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

Où :

- `MONITORING` signale à l'intégration Datadog qu'elle doit collecter cette entrée de journal.
- `<UNIX_EPOCH_TIMESTAMP>` est en secondes, et non en millisecondes.
- `<METRIC_VALUE>` DOIT être un nombre (c'est-à-dire un entier ou un nombre à virgule flottante).
- `<METRIC_TYPE>` est `count`, `gauge`, `histogram` ou `check`.
- `<METRIC_NAME>` identifie de manière unique votre métrique et suit la [politique de nommage des métriques][11].
- `<TAG_LIST>` est facultatif, séparé par des virgules et doit être précédé de `#`. Le tag `function_name:<name_of_the_function>` est automatiquement appliqué aux Custom Metrics.

**Remarque** : la somme pour chaque horodatage est utilisée pour les compteurs et la dernière valeur pour un horodatage donné est utilisée pour les jauges. Il n'est pas recommandé d'écrire une ligne de journal chaque fois que vous incrémentez une métrique, car cela augmente le temps nécessaire à l'analyse de vos journaux. Mettez continuellement à jour la valeur de la métrique dans votre code et écrivez une ligne de journal pour cette métrique avant la fin de l'exécution de la fonction.

[1]: /fr/serverless/libraries_integrations/extension/
[2]: /fr/metrics/distributions/
[3]: /fr/metrics/distributions/#customize-tagging
[4]: /fr/metrics/#time-and-space-aggregation
[5]: /fr/dashboards/guide/query-to-the-graph/
[6]: /fr/logs/logs_to_metrics/
[7]: /fr/tracing/trace_pipeline/generate_metrics/
[8]: /fr/serverless/installation/
[9]: /fr/serverless/forwarder/
[10]: /fr/integrations/amazon_web_services/?tab=roledelegation#datadog-aws-iam-policy
[11]: /fr/metrics/
---
aliases:
- /fr/serverless/custom_metrics
- /fr/serverless/enhanced_lambda_metrics
- /fr/serverless/real-time-enhanced-metrics
- /fr/serverless/real_time_enhanced_metrics
further_reading:
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centre d'apprentissage
  text: Configurer AWS Lambda pour Serverless Monitoring avec Datadog
title: Métriques AWS Lambda
---
Cette page traite des métriques pour la surveillance des applications serverless sur AWS Lambda. Il existe 3 façons d'obtenir des métriques à partir d'AWS Lambda :

- Vous pouvez obtenir des métriques CloudWatch Lambda à partir de l'[intégration AWS Datadog][5]
- Vous pouvez obtenir des [métriques améliorées](#enhanced-lambda-metrics) en [installant Serverless Monitoring pour AWS Lambda][1] via la Datadog Lambda Extension.
- Vous pouvez [soumettre des Custom Metrics](#submit-custom-metrics) à Datadog depuis vos fonctions Lambda.

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecte de métriques améliorées depuis AWS Lambda" >}}

### Collectez des métriques à partir de ressources non-Lambda {#collect-metrics-from-non-lambda-resources}

Datadog peut également vous aider à collecter des métriques pour les ressources gérées par AWS, telles qu'[API Gateway][2], [AppSync][3] et [SQS][4], afin de vous aider à surveiller l'ensemble de votre application serverless. Ces métriques sont enrichies avec les tags de ressources AWS correspondants.

Pour collecter ces métriques, configurez l'[intégration AWS Datadog][5].

[1]: /fr/serverless/aws_lambda/installation
[2]: /fr/integrations/amazon_api_gateway/#data-collected
[3]: /fr/integrations/amazon_appsync/#data-collected
[4]: /fr/integrations/amazon_sqs/#data-collected
[5]: /fr/integrations/amazon_web_services/

## Métriques Lambda améliorées {#enhanced-lambda-metrics}

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Tableau de bord par défaut des métriques Lambda améliorées" width="80%">}}

Datadog génère des métriques Lambda améliorées à partir de votre environnement d'exécution Lambda, prêtes à l'emploi, avec une faible latence, une granularité de quelques secondes et des métadonnées détaillées pour les démarrages à froid et les tags personnalisés.

Les métriques Lambda améliorées s'ajoutent aux [métriques Lambda][6] par défaut activées avec l'intégration AWS Lambda. Les métriques améliorées se distinguent par le fait qu'elles se trouvent dans l'espace de noms `aws.lambda.enhanced.*`. Vous pouvez consulter ces métriques sur le [tableau de bord par défaut des métriques Lambda améliorées][7].

Les métriques Lambda améliorées en temps réel suivantes sont disponibles et portent les tags correspondants `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` et `runtime`.

Ces métriques sont des [distributions][8]: vous pouvez les interroger à l'aide des agrégations `count`, `min`, `max`, `sum` et `avg`. Les métriques améliorées sont activées automatiquement avec [Serverless Monitoring][1] mais peuvent être désactivées en définissant la variable d'environnement `DD_ENHANCED_METRICS` sur `false` sur votre fonction Lambda.

`aws.lambda.enhanced.invocations`
: Mesure le nombre de fois qu'une fonction est invoquée en réponse à un événement ou à un appel d'API.

`aws.lambda.enhanced.errors`
: Mesure le nombre d'invocations ayant échoué en raison d'erreurs dans la fonction.

`aws.lambda.enhanced.max_memory_used`
: Mesure la quantité maximale de mémoire (Mo) utilisée par la fonction.

`aws.lambda.enhanced.duration`
: Mesure le temps écoulé en secondes entre le début de l'exécution du code de la fonction suite à une invocation et la fin de cette exécution.

`aws.lambda.enhanced.billed_duration`
: Mesure la durée facturée pendant laquelle la fonction a été exécutée (incréments de 100 ms).

`aws.lambda.enhanced.init_duration`
: Mesure le temps d'initialisation (en secondes) d'une fonction lors d'un démarrage à froid.

`aws.lambda.enhanced.runtime_duration`
: Mesure le temps écoulé en millisecondes entre le début de l'exécution du code de la fonction et le renvoi de la réponse au client, à l'exclusion de la durée post-exécution ajoutée par les exécutions d'extensions Lambda.

`aws.lambda.enhanced.post_runtime_duration`
: Mesure le temps écoulé en millisecondes entre le renvoi de la réponse au client par le code de la fonction et l'arrêt de l'exécution de la fonction, représentant la durée ajoutée par les exécutions d'extensions Lambda.

`aws.lambda.enhanced.response_latency`
: Mesure le temps écoulé en millisecondes entre la réception de la demande d'invocation et l'envoi du premier octet de réponse au client.

`aws.lambda.enhanced.response_duration`
: Mesure le temps écoulé en millisecondes entre l'envoi du premier octet de réponse et l'envoi du dernier octet de réponse au client.

`aws.lambda.enhanced.produced_bytes`
: Mesure le nombre d'octets renvoyés par une fonction.

`aws.lambda.enhanced.estimated_cost`
: Mesure le coût total estimé de l'invocation de la fonction (en dollars américains).

`aws.lambda.enhanced.timeouts`
: Mesure le nombre de fois qu'une fonction dépasse son délai d'exécution.

`aws.lambda.enhanced.out_of_memory`
: Mesure le nombre de fois qu'une fonction manque de mémoire.
: Comme il existe de nombreuses variantes d'erreurs de mémoire insuffisante, certains cas peuvent ne pas être bien gérés malgré tous nos efforts. Si vous rencontrez un tel cas, ouvrez une issue dans le [dépôt GitHub de Datadog Lambda Extension][18].

`aws.lambda.enhanced.cpu_total_utilization`
: Mesure l'utilisation totale du processeur de la fonction en nombre de cœurs.

`aws.lambda.enhanced.cpu_total_utilization_pct`
: Mesure l'utilisation totale du processeur de la fonction en pourcentage.

`aws.lambda.enhanced.cpu_max_utilization`
: Mesure l'utilisation du processeur sur le cœur le plus sollicité.

`aws.lambda.enhanced.cpu_min_utilization`
: Mesure l'utilisation du processeur sur le cœur le moins utilisé.

`aws.lambda.enhanced.cpu_system_time`
: Mesure le temps passé par le processeur en mode noyau.

`aws.lambda.enhanced.cpu_user_time`
: Mesure le temps passé par le processeur en mode utilisateur.

`aws.lambda.enhanced.cpu_total_time`
: Mesure la durée totale d'exécution du processeur.

`aws.lambda.enhanced.num_cores`
: Mesure le nombre de cœurs disponibles.

`aws.lambda.enhanced.rx_bytes`
: Mesure les octets reçus par la fonction.

`aws.lambda.enhanced.tx_bytes`
: Mesure les octets envoyés par la fonction.

`aws.lambda.enhanced.total_network`
: Mesure les octets envoyés et reçus par la fonction.

`aws.lambda.enhanced.tmp_max`
: Mesure l'espace total disponible dans le répertoire /tmp.

`aws.lambda.enhanced.tmp_used`
: Mesure l'espace utilisé dans le répertoire /tmp.

`aws.lambda.enhanced.fd_max`
: Mesure le nombre total de descripteurs de fichiers disponibles.

`aws.lambda.enhanced.fd_use`
: Mesure le nombre maximal de descripteurs de fichiers utilisés pendant l'invocation de la fonction.

`aws.lambda.enhanced.threads_max`
: Mesure le nombre total de threads disponibles.

`aws.lambda.enhanced.threads_use`
: Mesure le nombre maximal de threads utilisés pendant l'invocation de la fonction.

[6]: /fr/integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /fr/metrics/distributions/
[18]: https://github.com/DataDog/datadog-lambda-extension

## Soumettez des Custom Metrics {#submit-custom-metrics}

### Créez des Custom Metrics à partir de logs ou de traces {#create-custom-metrics-from-logs-or-traces}
Si vos fonctions Lambda envoient déjà des données de trace ou de log à Datadog et que les données que vous souhaitez interroger figurent dans un log existant ou une trace existante, vous pouvez générer des Custom Metrics à partir de logs et de traces sans redéployer votre application ni modifier son code.

Avec les métriques basées sur les logs, vous pouvez enregistrer un nombre de logs correspondant à une requête ou résumer une valeur numérique contenue dans un log, telle qu'une durée de requête. Les métriques basées sur les logs constituent un moyen rentable de résumer les données de logs provenant de l'ensemble du flux d'ingestion. Découvrez comment [créer des métriques basées sur les logs][9].

Vous pouvez également générer des métriques à partir de tous les spans ingérés, qu'ils soient indexés ou non par un filtre de rétention. Découvrez comment [créer des métriques basées sur les spans][10].

### Soumettez des Custom Metrics directement depuis une fonction Lambda {#submit-custom-metrics-directly-from-a-lambda-function}

Toutes les Custom Metrics sont soumises sous forme de [distributions](#understanding-distribution-metrics).

**Remarque** : Les métriques de distribution doivent être soumises avec un nouveau nom ; ne réutilisez pas le nom d'une métrique précédemment soumise.

1. [Installez Serverless Monitoring pour AWS Lambda][1] et assurez-vous d'avoir installé la Datadog Lambda Extension.

2. Choisissez votre environnement d'exécution :

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

Installez la dernière version de [`java-dogstatsd-client`][1].

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

Installez la dernière version de [`dogstatsd-csharp-client`][1].

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

1. [Installez][1] le client DogStatsD pour votre environnement d'exécution
2. Suivez l'[exemple de code][2] pour soumettre vos Custom Metrics.

[1]: /fr/extend/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /fr/extend/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Soumettez des métriques historiques {#submit-historical-metrics}

Utilisez la Datadog Lambda Extension pour soumettre des métriques historiques. Ces métriques peuvent avoir des horodatages allant jusqu'à une heure dans le passé.

Commencez par [installer Serverless Monitoring pour AWS Lambda][1]. Assurez-vous d'avoir installé la dernière version de la Datadog Lambda Extension.

Ensuite, choisissez votre environnement d'exécution :

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

Écrivez une fonction réutilisable qui journalise vos Custom Metrics dans le format suivant :

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

### Comprendre les métriques de distribution {#understanding-distribution-metrics}

Lorsque Datadog reçoit plusieurs points de métrique de type count ou jauge qui partagent le même horodatage et le même ensemble de tags, seul le plus récent est pris en compte. Cela fonctionne pour les applications basées sur des hosts car les points de métrique sont agrégés par l'Agent Datadog et marqués avec un tag `host` unique.

Une fonction Lambda peut lancer de nombreux environnements d'exécution simultanés lorsque le trafic augmente. La fonction peut soumettre des points de métrique de type count ou jauge qui se remplacent mutuellement et entraînent des résultats sous-évalués. Pour éviter ce problème, les Custom Metrics générées par les fonctions Lambda sont soumises en tant que [distributions][11] car les points de métrique de distribution sont agrégés sur le backend Datadog, et chaque point de métrique compte.

Les distributions fournissent les agrégations `avg`, `sum`, `max`, `min`, `count` par défaut. Sur la page {{< ui >}}Metrics Catalog{{< /ui >}}, vous pouvez activer les agrégations de centiles (p50, p75, p90, p95, p99) et également [gérer les tags][12]. Pour surveiller une distribution pour un type de métrique jauge, utilisez `avg` pour les deux [agrégations temporelles et spatiales][13]. Pour surveiller une distribution pour un type de métrique count, utilisez `sum` pour les deux [agrégations temporelles et spatiales][13]. Reportez-vous au guide [Query to the Graph][14] pour savoir comment fonctionnent les agrégations temporelles et spatiales.

### Comprendre l'utilisation, le volume et la tarification de vos métriques dans Datadog {#understanding-your-metrics-usage-volume-and-pricing-in-datadog}

Datadog fournit des informations granulaires sur les Custom Metrics que vous ingérez, la cardinalité des tags et des outils de gestion pour vos Custom Metrics au sein de la [page {{< ui >}}Metrics Catalog{{< /ui >}}][15] de l'application Datadog. Vous pouvez afficher toutes les Custom Metrics serverless sous le tag {{< ui >}}Serverless{{< /ui >}} dans la {{< ui >}}Distribution Metric Origin{{< /ui >}} [{{< ui >}}facet panel{{< /ui >}}][16]. Vous pouvez également contrôler les volumes et les coûts des Custom Metrics avec [Metrics without Limits™][17].

Vous pouvez également exclure des tags auto-injectés spécifiques (tels que `function_arn`) de vos Custom Metrics. Consultez [Exclure les tags auto-injectés des Custom Metrics][19].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[9]: /fr/logs/logs_to_metrics/
[10]: /fr/tracing/trace_pipeline/generate_metrics/
[11]: /fr/metrics/distributions/
[12]: /fr/metrics/distributions/#customize-tagging
[13]: /fr/metrics/#time-and-space-aggregation
[14]: /fr/dashboards/guide/query-to-the-graph/
[15]: https://app.datadoghq.com/metric/catalog
[16]: /fr/metrics/summary/#facet-panel
[17]: /fr/metrics/summary/#metrics-without-limits
[19]: /fr/serverless/aws_lambda/configuration/#exclude-auto-injected-tags-from-custom-metrics
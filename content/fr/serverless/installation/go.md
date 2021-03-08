---
title: Instrumenter des applications Go
kind: documentation
further_reading:
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: Taguer des applications sans serveur
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: Tracer des applications sans serveur
  - link: serverless/custom_metrics/
    tag: Documentation
    text: Envoyer des métriques custom depuis des applications sans serveur
---
## Configuration requise

Si vous n'avez pas encore réalisé la configuration :

- Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez ces étapes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Installer la bibliothèque Lambda Datadog

Vous pouvez installer la [bibliothèque Lambda de Datadog][3] localement en exécutant la commande suivante :

```
go get github.com/DataDog/datadog-lambda-go
```

### Configurer la fonction

1. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `true`.
2. Activez [le tracing actif AWS X-Ray][4] pour votre fonction Lambda.
3. Incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda de Datadog.
    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
    )

    func main() {
      // Wrap your lambda handler like this
      lambda.Start(ddlambda.WrapHandler(myHandler, nil))
      /* OR with manual configuration options
      lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
        BatchInterval: time.Second * 15
        APIKey: "my-api-key",
      }))
      */
    }

    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // ...
    }
    ```

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][5].

### Tagging de service unifié

Bien que cette opération soit facultative, nous vous recommandons fortement d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur. Pour ce faire, suivez la [documentation relative au tagging de service unifié][6].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][7].

## Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom, consultez l'exemple de code ci-dessous :

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // Inclure la fonction handler dans un wrapper
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Envoyer une métrique custom
  ddlambda.Metric(
    "coffee_house.order_value", // Nom de la métrique
    12.45, // Valeur de la métrique
    "product:latte", "order:online" // Tags associés
  )

  // Envoyer une métrique custom avec un timestamp
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value", // Nom de la métrique
    12.45, // Valeur de la métrique
    time.Now(), // Timestamp (dans les 20 dernières minutes)
    "product:latte", "order:online" // Tags associés
  )

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Ajouter les en-têtes de tracing distribué Datadog
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[7]: https://app.datadoghq.com/functions
[8]: /fr/serverless/custom_metrics?tab=go
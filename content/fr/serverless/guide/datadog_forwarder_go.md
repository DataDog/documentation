---

title: Instrumenter des applications Go sans serveur avec le Forwarder Datadog
---
## Présentation

<div class="alert alert-warning">
Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, suivez plutôt les <a href="/serverless/installation/go">instructions d'instrumentation des fonctions Lambda avec l'extension Lambda Datadog</a>. Si vous avez configuré la surveillance sans serveur Datadog avec le Forwarder Datadog avant que les fonctionnalités Lambda clés en main ne soient proposées, consultez ce guide pour gérer votre instance.
</div>

## Configuration requise

Si vous ne l'avez pas encore fait :

- Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez les étapes suivantes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Installation

Installez la [bibliothèque Lambda Datadog][3] localement en exécutant la commande suivante :

```
go get github.com/DataDog/datadog-lambda-go
```

### Instrumentation

Suivez les étapes ci-dessous pour instrumenter la fonction :

1. Définissez les variables d'environnement `DD_FLUSH_TO_LOG` et `DD_TRACE_ENABLED` sur `true`.
2. Importez les packages nécessaires dans le fichier déclarant votre gestionnaire de fonction Lambda.

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
      "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    )
    ```
3. Incorporez votre gestionnaire de fonction Lambda à l'aide du wrapper fourni par la bibliothèque Lambda Datadog.

    ```go
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
    ```
4. Utilisez les bibliothèques incluses pour créer des spans supplémentaires, associer vos logs à vos traces et transmettre le contexte de vos traces à d'autres services.
    ```go
    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // Trace an HTTP request
      req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
      client := http.Client{}
      client = *httptrace.WrapClient(&client)
      client.Do(req)

      // Connect your Lambda logs and traces
      currentSpan, _ := tracer.SpanFromContext(ctx)
      log.Printf("my log message %v", currentSpan)

      // Create a custom span
      s, _ := tracer.StartSpanFromContext(ctx, "child.span")
      time.Sleep(100 * time.Millisecond)
      s.Finish()
    }
    ```

### Abonnement

Pour pouvoir envoyer des métriques, traces et logs à Datadog, abonnez la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][4].

### Tag

Bien que cette opération soit facultative, Datadog vous conseille d'ajouter les tags `env`, `service` et `version` à vos applications sans serveur afin de bénéficier du [tagging de service unifié][5].

## Utilisation

Après avoir configuré votre fonction en suivant la procédure ci-dessus, visualisez vos métriques, logs et traces sur la [page Serverless principale][6].

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

En savoir plus sur l'[envoi de métriques custom][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: https://app.datadoghq.com/functions
[7]: /fr/serverless/custom_metrics?tab=go
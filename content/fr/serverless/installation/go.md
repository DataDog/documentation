---
aliases:
- /fr/serverless/datadog_lambda_library/go/
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: Dépannage de la surveillance sans serveur
- link: serverless/custom_metrics/
  tag: Documentation
  text: Envoyer des métriques custom depuis des applications sans serveur
kind: documentation
title: Instrumenter des applications Go sans serveur
---

<div class="alert alert-warning">Si vos fonctions Lambda Go utilisent utiliser le runtime <code>go1.x</code> et que vous ne pouvez pas passer au runtime <code>provided.al2</code>, vous devez <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrumenter vos applications à l'aide du Forwarder Datadog</a>.</div>

<div class="alert alert-warning">Si vos fonctions Lambda sont déployées dans un VPC sans accès à Internet, vous pouvez transmettre des données <a href="/agent/guide/private-link/">en utilisant soit AWS PrivateLink</a> pour le site <code>datadoghq.com</code> de <a href="/getting_started/site/">Datadog</a>, soit <a href="/agent/proxy/">un proxy</a> pour tous les autres sites.

## Installation

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Le [plug-in Serverless Datadog][1] configure vos fonctions de sorte à ce qu'elles envoient les métriques, les traces et les logs à Datadog via l'[extension Lambda Datadog][2].

Pour installer et configurer le plug-in Serverless Datadog, suivez les étapes suivantes :

### Pour installer le plug-in Serverless Datadog :

```sh
serverless plugin install --name serverless-plugin-datadog
```

### Mettez à jour votre fichier`serverless.yml` :

```yaml
custom:
  datadog:
    site: <SITE_DATADOG>
    apiKeySecretArn: <ARN_SECRET_CLÉ_API_DATADOG>
```

Renseignez les paramètres fictifs comme suit :
- Remplacez `<SITE_DATADOG>` par le [site Datadog][3] auquel vous envoyez les données de télémétrie.
- Remplacez `<ARN_SECRET_CLÉ_API_DATADOG>` par l'ARN du secret AWS où votre [clé d'API Datadog][4] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour un test rapide, vous pouvez également utiliser `apiKey` et définir la clé d'API Datadog sous forme de texte brut.

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la [documentation du plug-in][4].

[1]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/fr/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Configuration personnalisée" %}}
### Installer l'extension Lambda Datadog

[Ajoutez la couche Lambda][1] de l'extension Lambda Datadog à vos fonctions Lambda, en utilisant le format d'ARN adapté à votre architecture et région AWS :

```sh
# Utiliser ce format lorsque Lambda est déployé avec l'architecture x86 dans les régions commerciales d'AWS
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Utiliser ce format lorsque Lambda est déployé avec l'architecture arm64 dans les régions commerciales d'AWS
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# Utiliser ce format lorsque Lambda est déployé avec l'architecture x86 dans les régions GovCloud d'AWS
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Utiliser ce format lorsque Lambda est déployé avec l'architecture arm64 dans les régions GovCloud d'AWS
arn:aws-us-gov:lambda:<RÉGION_AWS>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```

Remplacez `<RÉGION_AWS>` par une région AWS valide, telle que `us-east-1`.

### Configurer les variables d'environnement requises

- Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct).
- Définissez `DD_API_KEY_SECRET_ARN` sur l'ARN du secret AWS où votre [clé d'API Datadog][3] est stockée en toute sécurité. La clé doit être stockée sous forme de chaîne de texte brut (et non d'un blob JSON). L'autorisation `secretsmanager:GetSecretValue` est requise. Pour effectuer un test rapide, vous pouvez également utiliser `DD_API_KEY` et définir la clé d'API Datadog sous forme de texte brut.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/fr/getting_started/site/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Installer la bibliothèque Lambda Datadog

```
go get github.com/DataDog/datadog-lambda-go
```

### Mettre à jour le code de votre fonction Lambda

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func main() {
  // Utiliser un wrapper pour incorporer la fonction Lambda du gestionnaire
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Tracer une requête HTTP
  req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
  client := http.Client{}
  client = *httptrace.WrapClient(&client)
  client.Do(req)

  // Envoyer une métrique custom
  ddlambda.Metric(
    "coffee_house.order_value", // Nom de la métrique
    12.45, // Valeur de la métrique
    "product:latte", "order:online" // Tags associés
  )

  // Créer une span personnalisée
  s, _ := tracer.StartSpanFromContext(ctx, "child.span")
  time.Sleep(100 * time.Millisecond)
  s.Finish()
}
```

## Et ensuite ?

- Félicitations, vous pouvez désormais visualiser des métriques, logs et traces sur la [page d'accueil Serverless][1].
- Consultez le [guide de dépannage][2] si vous ne parvenez pas à recueillir les données de télémétrie
- Vérifiez les [configurations avancées][3] pour
    - associer des données de télémétrie à l'aide de tags
    - recueillir les données de télémétrie pour AWS API Gateway, SQS, etc.
    - capturer les charges utiles des requêtes et des réponses de Lambda
    - associer les erreurs de vos fonctions Lambda à votre code source
    - filtrer ou nettoyer des informations sensibles des logs ou des traces

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /fr/serverless/configuration/
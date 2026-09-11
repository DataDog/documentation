---
title: Métriques custom à partir d'applications sans serveur
---
## Présentation

Vous pouvez transmettre de plusieurs façons des métriques custom à Datadog depuis une fonction Lambda.

- **Créer des métriques custom à partir de logs ou de traces** : si vos fonctions Lambda envoient déjà des données de trace ou de log à Datadog, et que les données à interroger sont stockées dans des logs ou traces, vous pouvez [générer des métriques custom à partir de vos logs et traces](creer-des-métriques-custom-a-partir-de-logs-ou-de-traces) sans avoir à redéployer le code de votre application ou à y apporter des modifications.
- **Envoyer des métriques custom à l'aide de l'extension Lambda Datadog** : si vous souhaitez envoyer des métriques custom directement depuis votre fonction Lambda, Datadog vous recommande d'utiliser l'[extension Lambda Datadog](#avec-l-extension-lambda-datadog). [Vérifiez si cette extension est prise en charge][1] par le runtime de votre fonction Lambda.
- **Envoyer des métriques custom à l'aide du Lambda du Forwarder Datadog** : si vous souhaitez envoyer des métriques custom à partir d'un runtime qui n'est pas pris en charge par l'extension Lambda Datadog, vous pouvez utiliser le [Lambda du Forwarder Datadog](#avec-le-forwarder-datadog).
- **(Obsolète) Envoyer des métriques custom depuis des logs CloudWatch** : cette méthode consistant à envoyer des métriques custom en affichant un log au format `MONITORING|<TIMESTAMP_EPOCH_UNIX>|<VALEUR_MÉTRIQUE>|<TYPE_MÉTRIQUE>|<NOM_MÉTRIQUE>|#<LISTE_TAGS>` est désormais [obsolète](#obsolete-logs-cloudwatch-). Utilisez plutôt l'une des solutions ci-dessus.
- **(Non recommandé) Utiliser une bibliothèque tierce** : la plupart des bibliothèques tierces n'envoient pas de métriques sous la forme de distributions, ce qui peut entraîner la perte de certaines valeurs.

### Comprendre les métriques de distribution

Les métriques custom envoyées par les fonctions Lambda sont agrégées sous forme de [distributions][2]. En effet, elles sont conçues pour instrumenter des applications, sans tenir compte des hosts sous-jacents. Vous pouvez interroger les métriques à l'aide des agrégations `avg`, `sum`, `max`, `min` et `count`. Il est également possible d'activer les agrégations en centile (p50, p75, p90, p95, p99) et de [gérer les tags][3] des agrégations depuis la page Metric Summary.

## Créer des métriques custom depuis des logs ou des traces

Avec des métriques basées sur des logs, vous pouvez enregistrer le nombre de logs qui correspondent à une requête ou résumer une valeur numérique contenue dans un log, comme la durée des requêtes. Les métriques basées sur des logs constituent une solution rentable vous permettant de synthétiser des données de log provenant de l'ensemble du flux d'ingestion. [En savoir plus sur la création de métriques basées sur des logs][4].

Vous pouvez également générer des métriques à partir de l'ensemble des spans ingérées, qu'elles soient ou non indexées par un filtre de rétention. Consultez [cette section][5] pour en savoir plus sur la création de métriques basées sur des spans.
## Avec l'extension Lambda Datadog

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecte de métriques custom depuis AWS Lambda" >}}

Datadog recommande d'utiliser l'[extension Lambda Datadog][1] pour envoyer des métriques custom depuis des runtimes Lambda compatibles.

1. Suivez les [instructions d'installation générales de la surveillance sans serveur][6] pour votre runtime Lambda. 
1. Si vous ne souhaitez pas recueillir de traces depuis votre fonction Lambda, définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false`.
1. Si vous ne souhaitez pas recueillir de logs depuis votre fonction Lambda, définissez la variable d'environnement `DD_SERVERLESS_LOGS_ENABLED` sur `false`.
1. Importez et utilisez la fonction auxiliaire depuis la bibliothèque Lambda Datadog, par exemple `lambda_metric` ou `sendDistributionMetric`, pour envoyer vos métriques custom à partir de l'[exemple de code](#exemple-de-code-pour-l-envoi-de-metriques-custom).

SI votre fonction Lambda est exécutée sur un VPC, vérifiez qu'elle peut communiquer avec les endpoints d'API Datadog, que ce soit via une connexion publique, [PrivateLink][7] ou un [proxy][8].

## Avec le Forwarder Datadog

Datadog recommande d'utiliser le [Lambda du Forwarder Datadog][9] pour envoyer des métriques custom à partir des runtimes Lambda qui ne sont pas pris en charge par l'extension Lambda Datadog.

1. Suivez les [instructions d'installation générales de la surveillance sans serveur][6] pour configurer votre fonction Lambda, installez la bibliothèque Lambda Datadog et la fonction Lambda du Forwarder Datadog, puis abonnez le Forwarder au groupe de logs de votre fonction.
1. Si vous ne souhaitez pas recueillir de traces depuis votre fonction Lambda, définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false` sur votre fonction Lambda.
1. Si vous ne souhaitez pas recueillir de logs depuis votre fonction Lambda, définissez le paramètre `DdForwardLog` de la pile CloudFormation du Forwarder sur `false`.
1. Importez et utilisez la fonction auxiliaire depuis la bibliothèque Lambda Datadog, par exemple `lambda_metric` ou `sendDistributionMetric`, pour envoyer vos métriques custom à partir de l'[exemple de code](#exemple-de-code-pour-l-envoi-de-metriques-custom).

Si votre runtime ne prend pas en charge la bibliothèque Lambda Datadog, vous pouvez afficher vous-même des métriques dans vos logs CloudWatch, au format JSON attendu. Sélectionnez l'onglet Autre dans la section relative à l'[exemple de code](#exemple-de-code-pour-l-envoi-de-metriques-custom) pour en savoir plus.

## Exemple de code pour l'envoi de métriques custom

**Remarque :** les arguments au sein des méthodes d'envoi des métriques custom doivent respecter les règles ci-dessous.

- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][10].
- `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un entier ou un nombre flottant).
- `<LISTE_TAGS>` est facultatif et mis en forme, par exemple : `['owner:Datadog', 'env:demo', 'cooltag']`.

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Nom de la métrique
        12.45,                                  # Valeur de la métrique
        tags=['product:latte', 'order:online']  # Tags associés
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Nom de la métrique
        12.45, // Valeur de la métrique
        'product:latte', // Premier tag
        'order:online' // Deuxième tag
    );
    return {
        statusCode: 200,
        body: 'hello, dog!'
    };
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
  // Vous devez uniquement ajouter un wrapper autour du gestionnaire de votre fonction (et non autour des fonctions auxiliaires).
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
  /* OU utiliser des options de configuration manuelle
  lambda.Start(ddlambda.WrapFunction(myHandler, &ddlambda.Config{
    BatchInterval: time.Second * 15
    APIKey: "my-api-key",
  }))
  */
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Nom de la métrique
    12.45,                          // Valeur de la métrique
    "product:latte", "order:online" // Tags associés
  )
  // ...
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # Vous devez uniquement ajouter un wrapper autour du gestionnaire de votre fonction (et non autour des fonctions auxiliaires).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Nom de la métrique
          12.45,                              # Valeur de la métrique
          "product":"latte", "order":"online" # Tags associés
        )
        return { statusCode: 200, body: 'Hello World' }
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
            "coffee_house.order_value", // Nom de la métrique
            12.45,                      // Valeur de la métrique
            myTags);                    // Tags associés
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

Écrivez une fonction réutilisable qui enregistre vos métriques custom au format suivant :

```json
{
    "m": "Nom de la métrique",
    "v": "Valeur de la métrique",
    "e": "Timestamp Unix (en secondes)",
    "t": "Tableau de tags"
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

## [OBSOLÈTE] CloudWatch Logs

**Cette méthode d'envoi de métriques custom n'est plus prise en charge et n'est pas disponible pour les nouveaux clients. Utilisez plutôt l'une des solutions recommandées**

**Remarque** : si vous utilisez l'une des solutions recommandées, vos prochaines métriques custom doivent être instrumentées sous de **nouveaux noms** lors de leur envoi à Datadog. Une métrique de distribution ne peut pas coexister avec une métrique d'un autre type dans Datadog si les deux portent le même nom.

Cette méthode nécessite d'ajouter les autorisations AWS suivantes dans votre [stratégie IAM Datadog][0].

| Autorisation AWS            | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | Énumérer les groupes de logs disponibles.                                  |
| `logs:DescribeLogStreams` | Énumérer les flux de logs disponibles pour un groupe.                     |
| `logs:FilterLogEvents`    | Récupérer des événements de log spécifiques depuis un flux pour générer des métriques. |

Pour envoyer des métriques custom à Datadog à partir de vos logs Lambda, affichez une ligne de log en utilisant le format suivant :

```text
MONITORING|<TIMESTAMP_UNIX_EPOCH>|<VALEUR_MÉTRIQUE>|<TYPE_MÉTRIQUE>|<NOM_MÉTRIQUE>|#<LISTE_TAGS>
```

Où :

- `MONITORING` signale à l'intégration Datadog que cette entrée de log doit être recueillie.
- `<UNIX_EPOCH_TIMESTAMP>` est à définir en secondes, et non en millisecondes.
- `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un entier ou un nombre flottant).
- `<TYPE_MÉTRIQUE>` correspond à `count`, `gauge`, `histogram` ou `check`.
- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][10].
- `<LISTE_TAGS>` est facultatif et doit être précédé de `#`. Les tags sont séparés par des virgules. Le tag `function_name:<nom_de_la_fonction>` est automatiquement appliqué aux métriques custom.

**Remarque** : la somme de chaque timestamp est utilisée pour les counts et la dernière valeur d'un timestamp donné est utilisée pour les gauges. Nous vous déconseillons d'afficher une déclaration de log chaque fois qu'une métrique est incrémentée, car cela augmente le temps d'analyse de vos logs. Mettez à jour de façon continue la valeur de la métrique dans votre code et affichez une déclaration de log pour cette métrique avant la fin de la fonction.

[1]: /fr/serverless/libraries_integrations/extension/
[2]: /fr/metrics/distributions/
[3]: /fr/metrics/distributions/#customize-tagging
[4]: /fr/logs/logs_to_metrics/
[5]: /fr/tracing/generate_metrics/
[6]: /fr/serverless/installation/
[7]: /fr/agent/guide/private-link/
[8]: /fr/agent/proxy/
[9]: /fr/serverless/forwarder/
[10]: /fr/metrics/
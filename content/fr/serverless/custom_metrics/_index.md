---
title: Métriques custom
kind: documentation
---
{{< img src="integrations/amazon_lambda/lambda_custom_metrics.png" alt="Diagramme de l'architecture de collecte de métriques custom depuis AWS Lambda" >}}

Installez la bibliothèque Lambda Datadog pour recueillir et envoyer des métriques custom. Les métriques envoyées à partir de la bibliothèque Lambda Datadog sont automatiquement agrégées sous la forme de [distributions][1], vous permettant ainsi de représenter graphiquement les valeurs `avg`, `sum`, `max`, `min` et `count`. Vous avez également la possibilité de calculer les agrégations au 50e, 75e, 95e ou 99e centile pour un ensemble de tags depuis la page [Distributions][1].

Les métriques de distribution sont conçues pour instrumenter des objets logiques, sans tenir compte des hosts sous-jacents. Étant donné que les métriques sont agrégées côté serveur et non en local via un Agent, elles sont particulièrement adaptées à une infrastructure sans serveur.

## Métriques custom synchrones et asynchrones

La bibliothèque Lambda Datadog prend en charge l'envoi de métriques custom, de façon synchrone ou asynchrone.

**Envoi synchrone** : le comportement par défaut. Avec cette méthode, vos métriques custom sont envoyées à Datadog par HTTP à des intervalles réguliers (toutes les 10 secondes) ainsi qu'au terme de l'appel de votre fonction Lambda. Si l'appel dure moins de 10 secondes, vos métriques custom sont envoyées à la fin de celui-ci.

**Envoi asynchrone (conseillé)** : il est possible d'envoyer vos métriques custom sans aucun délai **et** de les voir apparaître en temps quasi réel dans Datadog. Pour y parvenir, la bibliothèque Lambda envoie vos métriques custom sous la forme d'un log spécial, qui est ensuite parsé par le [Forwarder Datadog][2] et transmis à Datadog. La journalisation dans AWS Lambda étant entièrement asynchrone, cette méthode permet d'éliminer toute latence au niveau de votre fonction.

## Activer les métriques custom asynchrones

1. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `True` pour votre fonction Lambda.
2. Installez la version 1.4.0 (ou une version supérieure) du [Forwarder Datadog][2].

Si vous n'utilisez pas les logs Datadog, vous avez quand même la possibilité d'envoyer vos métriques custom de façon asynchrone. Définissez la variable d'environnement `DD_FORWARD_LOG` sur `False` pour la [fonction AWS Lambda de collecte de logs Datadog][2]. De cette façon, seules les métriques custom seront transmises à Datadog. Aucun log classique ne sera envoyé.

## Exemple de code pour l'envoi de métriques custom

Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la bibliothèque Lambda et ajouter un wrapper autour du gestionnaire de votre fonction. Vous n'avez pas besoin d'ajouter un wrapper autour de vos fonctions auxiliaires.

**Remarque :** les arguments au sein des méthodes d'envoi des métriques custom doivent respecter les règles ci-dessous.

- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][3].
- `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un entier ou un nombre flottant).
- `<LISTE_TAGS>` est facultatif et mis en forme, par exemple : `['owner:Datadog', 'env:demo', 'cooltag']`.

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

# Vous devez uniquement ajouter un wrapper autour du gestionnaire de votre fonction (et non autour des fonctions auxiliaires). 
@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Nom de la métrique
        12.45,                                  # Valeur de la métrique
        tags=['product:latte', 'order:online']  # Tags associés
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const { datadog, sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Nom de la métrique
        12.45, // Valeur de la métrique
        'product:latte',
        'order:online' // Tags associés
    );
    return {
        statusCode: 200,
        body: 'hello, dog!'
    };
}
// Vous devez uniquement ajouter un wrapper autour du gestionnaire de votre fonction (et non autour des fonctions auxiliaires).
module.exports.myHandler = datadog(myHandler);

/* OU utiliser les options de configuration manuelle
module.exports.myHandler = datadog(myHandler, {
    apiKey: "my-api-key"
});
*/
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // Vous devez uniquement ajouter un wrapper autour du gestionnaire de votre fonction (et non autour des fonctions auxiliaires). 
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
  /* OU utiliser les options de configuration manuelle
  lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
    BatchInterval: time.Second * 15
    APIKey: "my-api-key",
  }))
  */
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Nom de la métrique
    12.45,                          // Valeur de la métrique
    "product:latte", "order:online" // Taga associés
  )
  // ...
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

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

{{% /tab %}}
{{% tab "Java" %}}

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        dd.metric(
            "coffee_house.order_value", // Nom de la métrique
            12.45,                      // Valeur de la métrique
            myTags);                    // Tags associés
    }
}
```

{{% /tab %}}
{{% tab "Autres runtimes" %}}


L'envoi de [métriques custom asynchrones](#metriques-custom-synchrones-et-asynchrones) est possible pour n'importe quel langage ou runtime personnalisé. Une chaîne au format JSON spéciale est ajoutée à votre fonction Lambda, et celle-ci est ensuite identifiée par le [Forwarder Datadog][1] puis envoyée à Datadog. Pour utiliser cette fonctionnalité :

1. [Activer les métriques custom asynchrones](#enabling-asynchronous-custom-metrics)
2. Écrivez une fonction réutilisable qui enregistre vos métriques custom au format suivant :

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

**Remarque :** ces métriques custom sont envoyées en tant que [distributions](#metriques-custom). Si vous avez déjà envoyé des métriques custom d'une autre façon, [consultez la documentation concernant le passage aux métriques de distribution](#comprendre-les-metriques-de-distribution).

[1]: /fr/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## Tagging de métriques custom

Nous vous conseillons de taguer vos métriques custom lors de leur envoi à l'aide de la [bibliothèque Lambda Datadog][4]. Utilisez la page [Distributions][1] pour [personnaliser les tags][5] appliqués à vos métriques custom.

Pour ajouter des tags de ressources Lambda à vos métriques custom, définissez le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder Datadog.

## Comprendre les métriques de distribution

Les métriques de distribution vous permettent de sélectionner l'agrégation souhaitée au moment de créer votre graphique ou de formuler votre requête, et non au moment d'envoyer la métrique.

Si vous avez déjà envoyé des métriques custom à partir de Lambda sans utiliser l'une des bibliothèques Lambda Datadog, vos prochaines métriques custom devront être instrumentées sous de **nouveaux noms** lors de leur envoi à Datadog. Une métrique de distribution ne peut pas coexister avec une métrique d'un autre type dans Datadog si les deux portent le même nom.

Pour activer les agrégations par centile pour vos métriques de distribution, consultez la page [Distribution][5].

## Autres méthodes d'envoi

### Exécution dans un VPC

La bibliothèque Lambda Datadog doit pouvoir [accéder à Internet][6] pour envoyer des métriques custom de façon **synchrone**. Si votre fonction Lambda est associée à un VPC, assurez-vous que les métriques custom sont envoyées de façon **asynchrone** ou que votre fonction peut communiquer avec Internet.

### Utiliser des bibliothèques tierces

Plusieurs bibliothèques open source ont été développées afin de faciliter l'envoi de métriques custom à Datadog. Toutes ne sont cependant pas conçues pour envoyer des [métriques de distribution][1], qui sont optimisées pour les fonctions Lambda. Avec les métriques de distribution, l'agrégation se fait côté serveur sans passer par un host ou un [Agent][7] local. Dans un environnement sans serveur où aucun Agent n'est utilisé, les métriques de distribution vous assurent une flexibilité optimale pour les agrégations et le tagging.

Si vous envisagez d'utiliser une bibliothèque de métriques tierce pour AWS Lambda, assurez-vous qu'elle prend en charge les métriques de distribution.

### [OBSOLÈTE] Utiliser les logs CloudWatch

**Cette méthode d'envoi de métriques custom n'est plus prise en charge et n'est pas disponible pour les nouveaux clients.** Nous vous conseillons d'envoyer vos métriques custom à l'aide d'une [bibliothèque Lambda Datadog][4].

Cette méthode nécessite d'ajouter les autorisations AWS suivantes dans votre [stratégie IAM Datadog][8].

| Autorisation AWS            | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | Énumérer les groupes de logs disponibles.                                  |
| `logs:DescribeLogStreams` | Énumérer les flux de logs disponibles pour un groupe.                     |
| `logs:FilterLogEvents`    | Récupérer des événements de log spécifiques depuis un flux pour générer des métriques. |

**[OBSOLÈTE]** Pour envoyer des métriques custom à Datadog à partir de vos logs Lambda, affichez une ligne de log en utilisant le format suivant :

```text
MONITORING|<TIMESTAMP_UNIX_EPOCH>|<VALEUR_MÉTRIQUE>|<TYPE_MÉTRIQUE>|<NOM_MÉTRIQUE>|#<LISTE_TAGS>
```

Où :

- `MONITORING` signale à l'intégration Datadog que cette entrée de log doit être recueillie.
- `<UNIX_EPOCH_TIMESTAMP>` est à définir en secondes, et non en millisecondes.
- `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un entier ou un nombre flottant).
- `<TYPE_MÉTRIQUE>` correspond à `count`, `gauge`, `histogram` ou `check`.
- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][3].
- `<LISTE_TAGS>` est facultatif et doit être précédé de `#`. Les tags sont séparés par des virgules. Le tag `function_name:<nom_de_la_fonction>` est automatiquement appliqué aux métriques custom.

**Remarque** : la somme de chaque timestamp est utilisée pour les counts et la dernière valeur d'un timestamp donné est utilisée pour les gauges. Nous vous déconseillons d'afficher une déclaration de log chaque fois qu'une métrique est incrémentée, car cela augmente le temps d'analyse de vos logs. Mettez à jour de façon continue la valeur de la métrique dans votre code et affichez une déclaration de log pour cette métrique avant la fin de la fonction.

[1]: https://docs.datadoghq.com/fr/metrics/distributions/
[2]: /fr/serverless/forwarder/
[3]: /fr/developers/metrics/
[4]: /fr/serverless/installation/installing_the_library/
[5]: /fr/metrics/distributions/#customize-tagging
[6]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[7]: /fr/agent/
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
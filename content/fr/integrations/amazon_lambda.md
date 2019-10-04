---
aliases:
  - /fr/integrations/awslambda/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Mesurez les temps d''exécution, les erreurs et les nombres d''appels de vos fonctions Lambda, ainsi que d''autres paramètres.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_lambda/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/'
    tag: Blog
    text: Comment surveiller des fonctions Lambda
  - link: 'https://www.datadoghq.com/blog/datadog-lambda-layer/'
    tag: Blog
    text: "Couche Lambda Datadog\_: surveiller des métriques custom sans serveur"
git_integration_title: amazon_lambda
has_logo: true
integration_title: "Amazon\_Lambda"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_lambda
public_title: "Intégration Datadog/Amazon\_Lambda"
short_description: 'Mesurez les temps d''exécution, les erreurs et les nombres d''appels de vos fonctions Lambda, ainsi que d''autres paramètres.'
version: '1.0'
---
## Présentation

Amazon Lambda est un service de calcul qui exécute du code en réponse à des événements et qui gère automatiquement les ressources de calcul requises par ce code.

Activez cette intégration pour commencer à recueillir des métriques custom et Cloudwatch depuis vos fonctions Lambda.

Datadog prend en charge les fonctionnalités suivantes en fonction du langage de votre fonction Lambda AWS :

|                                    | Python                                                                                             | Node                                                                                               | Java                                    | Go                                                                                               | Ruby                                                     | .NET Core                             |
|------------------------------------|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|-----------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------|
| [Métriques de runtime Lambda](#metrics) | {{< X >}}                                                                                          | {{< X >}}                                                                                          | {{< X >}}                               | {{< X >}}                                                                                        | {{< X >}}                                                | {{< X >}}                               |
| [Tracing](#trace-collection)       | {{< X >}}                                                                                          | {{< X >}}                                                                                          | {{< X >}}                               | {{< X >}}                                                                                        | {{< X >}}                                                | {{< X >}}                               |
| [Métriques custom](#custom-metrics)  | [Couche Lambda](#installing-and-using-the-datadog-layer)                                            | [Couche Lambda](#installing-and-using-the-datadog-layer)                                            | [Envoyées via logs](#using-cloudwatch-logs) | [Package Go](#installing-and-using-the-datadog-layer)                                            | [Couche Lambda](#installing-and-using-the-datadog-layer)  | [Envoyées via logs](#using-cloudwatch-logs) |
| [Journalisation](#log-collection)         | {{< X >}}                                                                                          | {{< X >}}                                                                                          | {{< X >}}                               | {{< X >}}                                                                                        | {{< X >}}                                                | {{< X >}}                               |

Le tracing distribué de bout en bout vous permet de tracer les requêtes qui s'étendent sur l'ensemble de votre infrastructure, à la fois sur les fonctions Lambda et sur les hosts exécutant l'Agent Datadog. Les traces X-Ray sont intégrées aux traces APM de Datadog, ce qui vous permet de bénéficier d'une vue globale de votre système.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Lambda` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Lambda. Pour en savoir plus sur les stratégies Lambda, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS              | Description                                                     |
    | ------------------------- | ----------------------------------------------------------- |
    | `lambda:List*`            | Énumère les tags, les métadonnées et les fonctions Lambda.                  |
    | `logs:DescribeLogGroups`  | Énumère les groupes de logs disponibles.                                  |
    | `logs:DescribeLogStreams` | Énumère les flux de logs disponibles pour un groupe.                     |
    | `logs:FilterLogEvents`    | Récupère des événements de log spécifiques depuis un flux pour générer des métriques. |
    | `tag:GetResources`        | Récupère des tags personnalisés appliqués aux fonctions Lambda.                |

3. Installez l'[intégration Datadog/AWS Lambda][5].

Une fois l'installation terminée, vous pouvez consulter l'ensemble de vos fonctions Lambda depuis l'[interface Serverless de Datadog][6]. Cette interface regroupe en une vue unique les métriques, les traces et les logs de vos fonctions Lambda AWS qui exécutent des applications sans serveur. Pour en savoir plus sur cette fonctionnalité, consultez la [documentation relative aux fonctions sans serveur de Datadog][7].

### Collecte de logs

1. Configurez [la fonction Lambda de collecte de logs AWS avec Datadog][8] si vous ne l'avez pas déjà fait.
2. Une fois la fonction Lambda installée, vous pouvez transmettre vos logs Lambda à Datadog de deux façons différentes :

    * Solution automatique : nous gérons des déclencheurs Lambda pour la collecte de logs si vous nous accordez les autorisations nécessaires. [Consultez la page principale Amazon Web Services pour configurer la collecte automatique de logs][9].
    * Solution manuelle : ajoutez manuellement un déclencheur sur le groupe de logs Cloudwatch qui contient vos logs Lambda dans la console AWS. Pour ce faire, suivez [ces étapes][10].

Accédez ensuite à la [section Logs de Datadog][11] pour commencer à explorer vos logs.

### Collecte de traces

Datadog s'intègre à [AWS X-Ray][12] pour vous permettre de recueillir et visualiser vos traces sans serveur à partir d'applications basées sur Lambda dans l'[interface Serverless][6]. Pour en savoir plus sur la configuration de cette intégration, consultez la [documentation relative aux fonctions Datadog sans serveur][7].

### Métriques custom

Si votre fonction Lambda utilise un runtime Python, installez la couche Lambda de Datadog pour recueillir et envoyer des métriques custom. Les métriques envoyées à partir de la couche Lambda de Datadog sont automatiquement agrégées sous la forme de [distributions][13], ce qui vous permet de représenter graphiquement les valeurs de moyenne, somme, maximum, minimum et total, ainsi que les 50e, 75e, 95e et 99e centiles. Si vous utilisez un autre runtime, enregistrez vos métriques custom sous un format spécifique pour qu'elles puissent être recueillies et analysées en tant que métriques par Datadog.

#### Installer et utiliser la couche Datadog

La couche Lambda de Datadog prend en charge Python, Node et Ruby. Go est également pris en charge avec un [package][23] à inclure dans votre projet. Si vous souhaitez que Datadog prenne en charge un certain runtime, contactez l'[équipe d'assistance Datadog][14].

1. Accédez à la fonction Lambda à laquelle vous souhaitez ajouter la couche dans votre console AWS.
2. Cliquez sur **Layers** sur la page principale de votre fonction.
3. Faites défiler la page et cliquez sur **Provide a layer version ARN**.
4. Saisissez un ARN au format suivant et choisissez la région, le runtime et la dernière version de la couche Lambda disponibles dans le tableau ci-dessous :

    ~~~
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
    ~~~

   Par exemple :

    ~~~
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:3
    ~~~

    | Langage | Runtime                                                    | Versions             |
    |----------|------------------------------------------------------------|----------------------|
    | Python   | `Python27`, `Python36`, `Python37`                         | [Dernière version][21] |
    | Node     | `Node8-10`, `Node10-x`                                     | [Dernière version][22] |
    | Ruby     | `Ruby`                                                     | [Dernière version][25] |

    **Utilisateurs Go :** Go étant compilé de manière statique, vous devez inclure le [package][23] dans votre projet au lieu d'utiliser une couche Lambda.

5. Accédez à la section **Environment Variables** de votre fonction et définissez les variables d'environnement suivantes avec votre [clé d'API Datadog][15] :
    * DD_API_KEY ou DD_KMS_API_KEY (si la clé est chiffrée via KMS)
6. Pour les **métriques custom totalement asynchrones et recueillies quasiment en temps réel**, vous pouvez définir la variable d'environnement `DD_FLUSH_TO_LOG` sur `True`. Les métriques seront envoyées via les logs CloudWatch au lieu des appels d'API. **Remarque** : cette option nécessite l'installation de la **dernière version** de la [fonction Lambda de collecte de logs AWS avec Datadog][8]. Si vous souhaitez que les métriques soient uniquement transmises à partir des logs CloudWatch, vous **DEVEZ** configurer la variable d'environnement `DD_FORWARD_LOG` sur `False` sur la [fonction Lambda de collecte de logs AWS avec Datadog[8] afin d'empêcher l'envoi des logs traditionnels à Datadog. 

Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la couche et ajouter un wrapper autour du gestionnaire de votre fonction.

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper


@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Nom de la métrique
        12.45,                                  # Valeur de la métrique
        tags=['product:latte', 'order:online']  # Tags associés
    )
```

{{% /tab %}}
{{% tab "Node" %}}

```javascript
const { datadog, sendDistributionMetric } = require("datadog-lambda-js");

async function myHandler(event, context) {
  sendDistributionMetric(
    "coffee_house.order_value",       // Nom de la métrique
    12.45,                            // Valeur de la métrique
    "product:latte", "order:online"   // Tags associés
  );
  return {
    statusCode: 200,
    body: "hello, dog!",
  };
}
// Inclure la fonction de votre gestionnaire dans un wrapper :
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
  // Inclure la fonction de votre gestionnaire dans un wrapper :
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
    "product:latte", "order:online" // Tags associés
  )
  // ...
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # Inclure la fonction de votre gestionnaire dans un wrapper :
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
{{< /tabs >}}

Les arguments des méthodes d'envoi des métriques custom doivent respecter le format suivant :

```
lambda_metric(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, tags=[<LISTE_TAGS>])
```

Où :

* `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][16].

* `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un nombre entier ou une valeur de type float).

* `<LISTE_TAGS>` est facultatif et formaté, par exemple : `['owner:Datadog', 'env:demo', 'cooltag']`.

**Remarque** : à l'heure actuelle, jusqu'à 3 tags peuvent être appliqués à une métrique. Si vous souhaitez appliquer davantage de tags à ces métriques, contactez l'[équipe d'assistance Datadog][14] pour augmenter cette limite pour votre organisation.

Vous trouverez des instructions détaillées pour installer et configurer les couches Lambda dans la [documentation principale d'AWS][17].

#### Exécution dans un VPC

Si votre fonction Lambda est associée à un VPC et envoie des métriques custom de manière synchrone, vérifiez qu'elle a bien [accès à Internet][24].


#### Utiliser les logs CloudWatch

Pour envoyer des métriques custom à Datadog à partir de vos logs Lambda, affichez une ligne de log Lambda, en utilisant le format suivant :

```
MONITORING|<TIMESTAMP_UNIX_EPOCH>|<VALEUR_MÉTRIQUE>|<TYPE_MÉTRIQUE>|<NOM_MÉTRIQUE>|#<LISTE_TAGS>
```

Où :

* `MONITORING` signale à l'intégration Datadog que cette entrée de log doit être recueillie.

* `<TIMESTAMP_UNIX_EPOCH>` est à définir en secondes, et non en millisecondes.

* `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un nombre entier ou une valeur de type float).

* `<TYPE_MÉTRIQUE>` correspond à `count`, `gauge`, `histogram` ou `check`.

* `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][16].

* `<LISTE_TAGS>` est facultatif et précédé du caractère `#`, et ses valeurs sont séparées par une virgule.
    Le tag `function_name:<nom_de_la_fonction>` est automatiquement appliqué aux métriques custom.

**Remarque** : la somme de chaque timestamp est utilisée pour les totaux et la dernière valeur d'un timestamp donné est utilisée pour les gauges. Nous ne conseillons pas d'afficher une déclaration de log chaque fois que vous incrémentez une métrique, car cela augmente la durée d'analyse de vos logs. Mettez à jour de façon continue la valeur de la métrique dans votre code et affichez une déclaration de log pour cette métrique avant la fin de la fonction.

Pour fonctionner dans un [VPC][19], la couche Lambda doit avoir accès à [Internet][20]. Si vous utilisez un VPC, loguez vos métriques custom dans les logs CloudWatch afin de permettre à Datadog de les analyser.

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_lambda" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de la fonction et les groupes de sécurité.

Les métriques custom sont uniquement taguées avec le nom de la fonction.

### Événements
L'intégration AWS Lambda n'inclut aucun événement.

### Checks de service
L'intégration AWS Lambda n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][14].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/fr/graphing/infrastructure/serverless
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#automatically-setup-triggers
[10]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#manually-setup-triggers
[11]: https://app.datadoghq.com/logs
[12]: https://aws.amazon.com/xray
[13]: https://docs.datadoghq.com/fr/developers/metrics/distributions
[14]: https://docs.datadoghq.com/fr/help
[15]: https://app.datadoghq.com/account/settings#api
[16]: https://docs.datadoghq.com/fr/developers/metrics
[17]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[18]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[19]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/
[20]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
[21]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[22]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[23]: https://github.com/DataDog/datadog-lambda-go/releases
[24]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
[25]: https://github.com/DataDog/datadog-lambda-layer-rb/releases


{{< get-dependencies >}}
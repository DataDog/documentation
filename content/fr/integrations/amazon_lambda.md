---
aliases:
  - /fr/integrations/awslambda/
  - /fr/serverless/real-time-enhanced-metrics/
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
integration_title: Amazon Lambda
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

Activez cette intégration pour commencer à recueillir des métriques CloudWatch. Cette page décrit également la marche à suivre pour configurer l'envoi de métriques custom, le logging et le tracing pour vos fonctions Lambda.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

{{< img src="integrations/amazon_lambda/lambda_metrics.png" alt="Diagramme de l'architecture de collecte de métriques runtime depuis AWS Lambda" >}}

#### Métriques AWS Lambda

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Lambda` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Lambda. Pour en savoir plus sur les stratégies Lambda, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | Énumère les tags, les métadonnées et les fonctions Lambda.   |
    | `tag:GetResources` | Récupère des tags personnalisés appliqués aux fonctions Lambda. |

3. Installez l'[intégration Datadog/AWS Lambda][5].

Une fois l'installation terminée, vous pouvez consulter l'ensemble de vos fonctions Lambda depuis l'[interface Serverless de Datadog][6]. Cette page regroupe en une vue unique les métriques, les traces et les logs de vos fonctions Lambda AWS qui exécutent des applications sans serveur. Pour en savoir plus sur cette fonctionnalité, consultez la [documentation relative aux fonctions sans serveur de Datadog][7].

#### Métriques Lambda optimisées transmises en temps réel

Datadog génère en temps réel des métriques runtime Lambda par défaut pour les runtimes Node.js, Python et Ruby.

Grâce à ses couches Lambda et à son Forwarder, Datadog peut générer des métriques caractérisées par une faible latence, une granularité de plusieurs secondes et des métadonnées détaillées pour les démarrages à froid et les tags personnalisés.

| Métrique                                  | Description                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **aws.lambda.enhanced.invocations**     | Mesure le nombre de fois qu'une fonction est appelée en réponse à un appel d'API d'événement ou d'invocation.                                                 |
| **aws.lambda.enhanced.errors**          | Mesure le nombre d'appels ayant échoué en raison d'erreurs dans la fonction (code de réponse 4XX).                                                  |
| **aws.lambda.enhanced.max_memory_used** | Mesure la quantité de mémoire utilisée par la fonction.                                                                                                |
| **aws.lambda.enhanced.duration**        | Mesure le temps moyen écoulé entre le moment où le code de la fonction commence à s'exécuter en raison d'un appel et l'arrêt de son exécution. |
| **aws.lambda.enhanced.billed_duration** | Mesure la durée facturée de l'exécution de la fonction (incréments de 100 ms).                                                                        |
| **aws.lambda.enhanced.init_duration** | Calcule la durée d’initialisation d'une fonction lors d'un démarrage à froid.                                  |
| **aws.lambda.enhanced.estimated_cost**  | Mesure le coût total estimé de l'appel de la fonction (en dollars).                                                                         |
| **aws.lambda.enhanced.timeouts**  | Calcule le nombre de fois qu'une fonction a expiré.                        |
| **aws.lambda.enhanced.out_of_memory**  | Calcule le nombre de fois qu'une fonction est arrivé à court de mémoire.                        |

Ces métriques reçoivent les tags `functionname`, `cold_start`, `memorysize`, `region`, `account_id`, `allocated_memory`, `executedversion`, `resource` et `runtime`. Il s'agit de métriques de type [DISTRIBUTION][8]. Vous pouvez donc afficher leur `count`, `min`, `max`, `sum` et `avg`.

##### Activation des métriques Lambda optimisées transmises en temps réel

1. Configurez ou installez la version 3.0.0 (ou une version ultérieure) du [Forwarder Datadog][9].
2. Installez la [couche Lambda Datadog][10] sur les fonctions pour lesquelles vous souhaitez obtenir ces métriques [(couche version 9+ pour Python][11], [6+ pour Node.js][12] et [5+ pour Ruby][13] ; [package version 0.5.0+ pour Go][14] ou [0.0.2+ pour Java][15]).
3. Pour ajouter automatiquement à ces métriques les tags personnalisés appliqués à votre fonction Lambda, vérifiez que vous exécutez au minimum la version 3.0.0 du Forwarder Datadog. Définissez ensuite le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder Datadog.
4. Utilisez la bibliothèque Datadog pour wrapper les gestionnaires de votre fonction Lambda AWS, tel qu'illustré dans l'[exemple de code](#exemple-de-code-pour-l-envoi-de-metriques-custom). Le [plug-in Datadog sans serveur][16] peut automatiquement wrapper tous vos gestionnaires de fonctions Python et Node.js.
5. Accédez au [dashboard par défaut des métriques Lambda optimisées][17].

**Remarque :** ces métriques sont activées par défaut, mais sont transmises **uniquement** [de façon asynchrone](#metriques-custom-synchrones-et-asynchrones). Elles sont envoyées au Forwarder Datadog par l'intermédiaire des logs CloudWatch. Votre volume de logs dans CloudWatch sera donc amené à augmenter. Cela peut accroître vos coûts AWS. Pour désactiver l'envoi des métriques optimisées, définissez la variable d'environnement `DD_ENHANCED_METRICS` sur `false` sur vos fonctions Lambda AWS.

Les métriques d'appel et d'erreur sont générées par la couche Lambda Datadog, tandis que les autres métriques sont générées par le Forwarder Datadog.

**Remarque :** tout [tag][18] appliqué à votre fonction Lambda devient automatiquement une nouvelle dimension pour l'analyse de vos métriques. Pour récupérer les tags de métriques optimisées dans Datadog, définissez le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder Datadog.

### Collecte de logs

{{< img src="integrations/amazon_lambda/lambda_logging.png" alt="Diagramme de l'architecture de collecte de logs depuis AWS Lambda" >}}

1. Si vous ne l'avez pas encore fait, configurez le Forwarder Datadog sur votre compte AWS en suivant les instructions figurant dans le [référentiel Github DataDog/datadog-serverless-functions][9].
2. Configurez les déclencheurs entraînant l'exécution du Lambda. Il existe deux façons de les configurer :

    - [Automatiquement][19]: We manage the log collection Lambda triggers for you if you grant us a set of permissions.
    - [Manuellement][20]: Set up each trigger yourself via the AWS console.
3. Accédez ensuite à la [section Logs de Datadog][21] pour commencer à explorer vos logs.

**Remarque** : définissez le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder pour vous assurer que vos logs reçoivent les tags de ressources sur la fonction Lambda d'origine.

**Remarque** : si vous appartenez à la région us-east-1 d'AWS, [utilisez l'intégration Datadog/AWS PrivateLink][22] pour transmettre vos logs à Datadog. Pour ce faire, votre fonction Forwarder [doit disposer de l'autorisation `VPCLambdaExecutionRole`][23].

### Collecte de traces

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Diagramme de l'architecture de tracing d'AWS Lambda avec Datadog" >}}

Datadog prend en charge le tracing distribué pour vos fonctions AWS Lambda, via l'[APM Datadog][24] ou [AWS X-Ray][25]. Vous pouvez utiliser l'un de ces ensembles de bibliothèques client pour générer des traces. L'[APM Datadog][24] associe ensuite automatiquement les traces des applications s'exécutant sur des hosts, des conteneurs et des fonctions sans serveur.

L'APM Datadog envoie les données de trace à Datadog en temps réel, ce qui vous permet de surveiller les traces avec peu ou pas de latence dans la [vue Live Tail] [26]. Pour améliorer ses opérations d'échantillonnage, l'APM Datadog fait également appel au tail.

Vous pouvez visualiser vos traces sur la [page Serverless][6], dans la section [App Analytics][27] et sur la [Service Map][28].

**Remarque :** l'activation de l'APM Datadog ou de l'[intégration AWS X-Ray][25] augmente le nombre de spans analysées utilisées. Cela peut avoir une incidence sur votre facturation.

#### Tracing avec l'APM Datadog

Les bibliothèques de tracing [Node.js][29], [Python][30] et [Ruby][31] Datadog prennent en charge le tracing distribué pour AWS Lambda. D'autres runtimes seront prochainement compatibles. La meilleure façon d'ajouter des fonctionnalités de tracing à votre application consiste à utiliser la [couche Lambda Datadog][10]. Celle-ci comprend la bibliothèque de tracing Datadog en tant que dépendance. Pour configurer l'APM pour votre runtime, suivez les étapes suivantes :

**Étape 1 :** installez la dernière version du [Forwarder Datadog][9].

**Étape 2 :** installez la [couche Lambda Datadog][10] sur votre fonction. Vous pouvez également installer la bibliothèque de tracing Datadog pour votre runtime :

{{< tabs >}}
{{% tab "Node.js" %}}

```bash
yarn add datadog-lambda-js
yarn add dd-trace

npm install datadog-lambda-js
npm install dd-trace
```

**3e étape :** instrumentez votre code.

```javascript
const { datadog } = require('datadog-lambda-js');
const tracer = require('dd-trace').init(); // Ajouter ici n'importe quelle configuration manuelle de traceur.

// Cette fonction sera incorporée au sein d'une span
const longCalculation = tracer.wrap('calculation-long-number', () => {
    // Insérer un calcul coûteux
});

// Cette fonction sera également incorporée au sein d'une span
module.exports.hello = datadog((event, context, callback) => {
    longCalculation();

    callback(null, {
        statusCode: 200,
        body: 'Hello, sans serveur !'
    });
});
```

Pour instrumenter vos bibliothèques Node.js et personnaliser vos traces, consultez la [documentation relative à l'APM Node.js Datadog][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/
{{% /tab %}}

{{% tab "Python" %}}

```bash
pip install datadog-lambda
```

Sinon, ajoutez `datadog-lambda` au fichier `requirements.txt` de votre projet.

**3e étape :** instrumentez votre code.

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

from ddtrace import tracer

@datadog_lambda_wrapper
def hello(event, context):
  return {
    "statusCode": 200,
    "body": get_message()
  }

@tracer.wrap()
def get_message():
  return "Hello, sans serveur !"
```

Pour instrumenter vos bibliothèques Python et personnaliser vos traces, consultez la [documentation relative à l'APM Python Datadog][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/python/
{{% /tab %}}

{{% tab "Ruby" %}}

Ajoutez ce qui suit à votre `Gemfile` ou installez les gems à l'aide du gestionnaire de packages de votre choix :

```
gem 'datadog-lambda'
gem 'ddtrace'
```

**Remarque** : `ddtrace` a recours à des extensions natives, qui doivent être compilées pour Amazon Linux avant d'être packagées et importées sur AWS Lambda. C'est pourquoi nous vous recommandons d'utiliser la [couche Lambda Datadog][51].

**3e étape :** instrumentez votre code.

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Activer l'instrumentation ici
end

def handler(event:, context:)
  Datadog::Lambda::wrap(event, context) do
    # Ajouter le code de votre fonction ici
    some_operation()
  end
end

# Instrumenter le reste de votre code avec ddtrace

def some_operation()
    Datadog.tracer.trace('some_operation') do |span|
        # À vous de jouer
    end
end
```

Pour instrumenter vos bibliothèques Ruby et personnaliser vos traces, consultez la [documentation relative à l'APM Ruby Datadog][1].


[1]: https://docs.datadoghq.com/fr/tracing/setup/ruby/
{{% /tab %}}

{{< /tabs >}}

Selon vos besoins, vous pouvez fusionner les traces générées par l'intégration AWS X-Ray et par la bibliothèque de tracing Datadog. Attention : dans la plupart des cas, une seule bibliothèque de tracing est requise. Cela permet à Datadog d'améliorer ses opérations d'[échantillonnage][32] pour les scénarios avec un volume élevé de traces.

Pour fusionner vos traces générées par AWS X-Ray et l'APM Datadog, utilisez la configuration suivante pour votre runtime :

{{< tabs >}}
{{% tab "Node.js" %}}
```javascript
module.exports.hello = datadog(
    (event, context, callback) => {
        longCalculation();

        callback(null, {
            statusCode: 200,
            body: 'Hello, sans serveur !'
        });
    },
    { mergeDatadogXrayTraces: true }
);
```
{{% /tab %}}

{{% tab "Python" %}}

Définissez la variable d'environnement `DD_MERGE_XRAY_TRACES` sur `True` sur votre fonction Lambda.

{{% /tab %}}

{{% tab "Ruby" %}}

Définissez la variable d'environnement `DD_MERGE_DATADOG_XRAY_TRACES` sur `True` sur votre fonction Lambda.

{{% /tab %}}

{{< /tabs >}}

#### Tracing de fonctions Lambda et de hosts

Lorsque cela est approprié, Datadog associe les traces AWS X-Ray aux traces de l'APM Datadog natives. Vos traces peuvent ainsi dresser un tableau complet des requêtes qui franchissent les limites de votre infrastructure, qu'il s'agisse de fonctions Lambda AWS, de hosts sur site ou de services gérés.

1. Activez l'[intégration AWS X-Ray][25] pour commencer à tracer vos fonctions Lambda.
2. Ajoutez la [couche Lambda Datadog][10] à vos fonctions Lambda.
3. [Configurez l'APM Datadog][33] sur vos hosts et votre infrastructure à base de conteneurs.

**Remarque** : pour que les traces X-Ray apparaissent sur le même flamegraph que celles de l'APM de Datadog, tous les services doivent posséder le [même tag `env`](#tag-env).

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="tracing d'une requête entre un host et une fonction Lambda" >}}

#### Organiser votre infrastructure avec les tags

Tout [tag][18] appliqué à votre fonction Lambda devient automatiquement une nouvelle dimension que vous pouvez utiliser pour filtrer vos traces.

Les tags sont particulièrement utiles dans l'APM Datadog, la Service Map et la liste des services, qui [exploitent tout le potentiel][34] des tags `env` et `service`.

**Remarque** : pour le tracing avec l'APM Datadog, définissez le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder pour vous assurer que vos traces reçoivent les tags de ressources sur la fonction Lambda d'origine. Les tags de ressources de la fonction Lambda sont automatiquement récupérés en tant que traces X-Ray dans Datadog sans aucune configuration supplémentaire.

##### Tag « env »

Utilisez le tag `env` pour faire la distinction entre vos environnements de staging, de développement et de production. Ce tag peut être utilisé pour tout type d'infrastructure, et non pas uniquement pour vos fonctions sans serveur. Par exemple, vous pouvez ajouter le tag `env:prod-eu` à vos fonctions Lambda de production pour la région Europe.

Par défaut, les fonctions Lambda reçoivent le tag `env:none` dans Datadog. Ajoutez votre propre tag pour le remplacer.

##### Tag « service »

Ajoutez le [tag][28] `service` afin de regrouper les fonctions Lambda correspondant à un même [service][35]. La [Service Map][28] et la [liste des services][36] utilisent ce tag pour représenter les relations entre les différents services et la santé de leurs monitors. Chaque service correspond à un nœud individuel sur la Service Map.

Par défaut, chaque fonction Lambda est considérée comme un `service` distinct. Ajoutez votre propre tag pour modifier ce comportement.

**Remarque** : le comportement par défaut pour les nouveaux clients de Datadog consiste à regrouper toutes les fonctions Lambda sous le service `aws.lambda` et à les représenter comme un seul nœud sur la Service Map. Taguez vos fonctions par `service` pour modifier ce comportement.

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="représentation animée de fonctions Lambda sur la service map" >}}

### Intégrations sans serveur

Les intégrations de fonctions Lambda suivantes fournissent des fonctionnalités supplémentaires pour la surveillance des applications sans serveur :

#### AWS Step Functions

Activez l'[intégration AWS Step Functions][37] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quelles machines d'état les fonctions appartiennent. Ces tags vous permettent d'obtenir une vue agrégée de vos métriques et logs Lambda par fonction dans la [vue Serverless][6].

1. Installez l'[intégration AWS Step Functions][37].
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin d'ajouter des tags supplémentaires à vos métriques Lambda.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | Énumère les instances Step Functions actives.   |
    | `states:DescribeStateMachine` | Récupère les métadonnées et les tags Step Functions.  |

#### Amazon EFS pour Lambda

Activez [Amazon EFS pour Lambda][38] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quel EFS une fonction donnée appartient. Ces tags vous permettent d'obtenir une vue agrégée de vos métriques et logs Lambda par EFS dans la [vue Serverless][6].

1. Installez l'[intégration Amazon EFS][39].
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques EFS de Lambda.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Énumère les instances EFS actives connectées aux fonctions Lambda. |

3. Accédez ensuite à l'[interface Serverless][6] pour utiliser le nouveau tag `filesystemid` sur vos fonctions Lambda.

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS pour Lambda" >}}

#### Lambda@Edge

Utilisez les tags `at_edge`, `edge_master_name` et `edge_master_arn` afin d'obtenir une vue agrégée de vos métriques et logs de fonctions Lambda lors de leur exécution dans les emplacements Edge.

### Métriques custom

{{< img src="integrations/amazon_lambda/lambda_custom_metrics.png" alt="Diagramme de l'architecture de collecte de métriques custom depuis AWS Lambda" >}}

Installez la couche Lambda de Datadog pour recueillir et envoyer des métriques custom. Les métriques envoyées à partir de la couche Lambda de Datadog sont automatiquement agrégées sous la forme de [distributions][8], vous permettant ainsi de représenter graphiquement les valeurs `avg`, `sum`, `max`, `min` et `count`. Vous avez également la possibilité de calculer les agrégations au 50e, 75e, 95e ou 99e centile pour un ensemble de tags depuis la page [Distributions][8].

Les métriques de distribution sont conçues pour instrumenter des objets logiques, sans tenir compte des hosts sous-jacents. Étant donné que les métriques sont agrégées côté serveur et non en local via un Agent, elles sont particulièrement adaptées à une infrastructure sans serveur.

#### Passer aux métriques de distribution

Les métriques de distribution vous permettent de sélectionner l'agrégation souhaitée au moment de créer votre graphique ou de formuler votre requête, et non au moment d'envoyer la métrique.

Si vous avez déjà envoyé des métriques custom à partir de Lambda sans utiliser l'une des couches Lambda Datadog, vos prochaines métriques custom devront être instrumentées sous de **nouveaux noms** lors de leur envoi à Datadog. Une métrique de distribution ne peut pas coexister avec une métrique d'un autre type dans Datadog si les deux portent le même nom.

Pour activer les agrégations par centile pour vos métriques de distribution, consultez la page [Distributions][40].

#### Tagging de métriques custom

Nous vous conseillons de taguer vos métriques custom lors de leur envoi à l'aide de la [couche Lambda Datadog][10]. Utilisez la page [Distributions][8] pour [personnaliser les tags][40] appliqués à vos métriques custom.

Pour ajouter des tags de ressources Lambda à vos métriques custom, définissez le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder Datadog.

#### Métriques custom synchrones et asynchrones

La couche Lambda Datadog prend en charge l'envoi de métriques custom de façon synchrone ou asynchrone.

**Envoi synchrone** : le comportement par défaut. Avec cette méthode, vos métriques custom sont envoyées à Datadog par HTTP à des intervalles réguliers (toutes les 10 secondes) ainsi qu'au terme de l'appel de votre fonction Lambda. Si l'appel dure moins de 10 secondes, vos métriques custom sont envoyées à la fin de celui-ci.

**Envoi asynchrone (conseillé)** : il est possible d'envoyer vos métriques custom sans aucun délai **et** de les voir apparaître en temps quasi réel dans Datadog. Pour y parvenir, la couche Lambda envoie vos métriques custom sous la forme d'une ligne de log spéciale, qui est ensuite parsée par le [Forwarder Datadog][9] et transmise à Datadog. La journalisation dans AWS Lambda étant entièrement asynchrone, cette méthode permet d'éliminer toute latence au niveau de votre fonction.

##### Activer les métriques custom asynchrones

1. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `True` pour votre fonction Lambda.
1. Si vous ne l'avez pas encore fait, configurez le Forwarder Datadog sur votre compte AWS en suivant les instructions figurant dans le [référentiel Github DataDog/datadog-serverless-functions][9].
1. Configurez les déclencheurs entraînant l'exécution du Lambda. Il existe deux façons de les configurer :
    - [Automatiquement][19]: We manage the log collection Lambda triggers for you if you grant us a set of permissions.
    - [Manuellement][20]: Set up each trigger yourself via the AWS console.

Si vous n'utilisez pas les logs Datadog, vous avez quand même la possibilité d'envoyer vos métriques custom de façon asynchrone. Définissez la variable d'environnement `DD_FORWARD_LOG` sur `False` pour la [fonction AWS Lambda de collecte de logs Datadog][9]. De cette façon, seules les métriques custom seront transmises à Datadog. Aucun log classique ne sera envoyé.

#### Exemple de code pour l'envoi de métriques custom

Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la couche Lambda et ajouter un wrapper autour du gestionnaire de votre fonction. Vous n'avez pas besoin d'ajouter un wrapper autour de vos fonctions auxiliaires.

**Remarque :** les arguments au sein des méthodes d'envoi des métriques custom doivent respecter les règles ci-dessous.

- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [convention de nommage des métriques][41].
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

1. [Activez les métriques custom asynchrones](#enabling-asynchronous-custom-metrics)
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

**Remarque :** ces métriques custom sont envoyées en tant que [distributions](#metriques-custom). Si vous avez déjà envoyé des métriques custom d'une autre façon, [consultez la documentation concernant le passage aux métriques de distribution](#passer-aux-metriques-de-distribution).


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
{{% /tab %}}
{{< /tabs >}}

#### Exécution dans un VPC

La couche Lambda Datadog doit pouvoir [accéder à Internet][42] pour envoyer des métriques custom de façon **synchrone**. Si votre fonction Lambda est associée à un VPC, assurez-vous que les métriques custom sont envoyées de façon **asynchrone** ou que votre fonction peut communiquer avec Internet.

#### Utiliser des bibliothèques tierces

Plusieurs bibliothèques open source ont été développées afin de faciliter l'envoi de métriques custom à Datadog. Toutes ne sont cependant pas conçues pour envoyer des [métriques de distribution][8], qui sont optimisées pour les fonctions Lambda. Avec les métriques de distribution, l'agrégation se fait côté serveur sans passer par un host ou un [Agent][43] local. Dans un environnement sans serveur où aucun Agent n'est utilisé, les métriques de distribution vous assurent une flexibilité optimale pour les agrégations et le tagging.

Si vous envisagez d'utiliser une bibliothèque de métriques tierce pour AWS Lambda, assurez-vous qu'elle prend en charge les métriques de distribution.

#### [OBSOLÈTE] Utiliser les logs CloudWatch

**Cette méthode d'envoi de métriques custom n'est plus prise en charge et n'est pas disponible pour les nouveaux clients.** Nous vous conseillons d'envoyer vos métriques custom à l'aide de la [couche Lambda Datadog][10].

Cette méthode nécessite d'ajouter les autorisations AWS suivantes dans votre [stratégie IAM Datadog][3].

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
- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [convention de nommage des métriques][41].
- `<LISTE_TAGS>` est facultatif et doit être précédé de `#`. Les tags sont séparés par des virgules. Le tag `function_name:<nom_de_la_fonction>` est automatiquement appliqué aux métriques custom.

**Remarque** : la somme de chaque timestamp est utilisée pour les counts et la dernière valeur d'un timestamp donné est utilisée pour les gauges. Nous vous déconseillons d'afficher une déclaration de log chaque fois qu'une métrique est incrémentée, car cela augmente le temps d'analyse de vos logs. Mettez à jour de façon continue la valeur de la métrique dans votre code et affichez une déclaration de log pour cette métrique avant la fin de la fonction.

### Couche Lambda Datadog

La couche Lambda Datadog est utilisée pour :

- La création en temps réel de [métriques Lambda optimisées](#metriques-lambda-optimisees-transmises-en temps-reel) portant sur les appels, les erreurs, les démarrages à froid, etc.
- L'envoi (synchrone ou asynchrone) de métriques custom
- La propagation automatique des en-têtes de tracing entre les requêtes en amont et les services en aval. Il est ainsi possible de procéder au tracing distribué de l'ensemble de vos fonctions Lambda, hosts, conteneurs et autres infrastructures exécutant l'Agent Datadog.
- Le packaging de la bibliothèque `dd-trace` vous permet de tracer leurs fonctions Lambda avec les bibliothèques de tracing Datadog, actuellement disponibles pour Node.js, Python et Ruby. D'autres runtimes seront prochainement pris en charge.

#### Installer et utiliser la couche Lambda Datadog

[Consultez les instructions de configuration][10] pour installer et utiliser la couche Lambda Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_lambda" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de la fonction et les groupes de sécurité.

Les métriques custom sont uniquement taguées avec le nom de la fonction.

### Événements

L'intégration AWS Lambda n'inclut aucun événement.

### Checks de service

L'intégration AWS Lambda n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][45].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/fr/infrastructure/serverless/
[8]: https://docs.datadoghq.com/fr/metrics/distributions/
[9]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[10]: /fr/infrastructure/serverless/datadog_lambda_layer/
[11]: https://github.com/DataDog/datadog-lambda-python/releases
[12]: https://github.com/DataDog/datadog-lambda-js/releases
[13]: https://github.com/DataDog/datadog-lambda-rb/releases
[14]: https://github.com/DataDog/datadog-lambda-go/releases
[15]: https://github.com/datadog/datadog-lambda-java
[16]: https://github.com/datadog/serverless-plugin-datadog
[17]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[18]: https://docs.datadoghq.com/fr/tagging/
[19]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#automatically-setup-triggers
[20]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#manually-setup-triggers
[21]: https://app.datadoghq.com/logs
[22]: https://docs.datadoghq.com/fr/agent/guide/private-link/?tab=logs
[23]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html
[24]: https://docs.datadoghq.com/fr/tracing/
[25]: https://docs.datadoghq.com/fr/integrations/amazon_xray/
[26]: https://docs.datadoghq.com/fr/tracing/livetail/
[27]: https://docs.datadoghq.com/fr/tracing/app_analytics/
[28]: https://docs.datadoghq.com/fr/tracing/visualization/services_map/#the-service-tag
[29]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/
[30]: https://docs.datadoghq.com/fr/tracing/setup/python/
[31]: https://docs.datadoghq.com/fr/tracing/setup/ruby/
[32]: https://docs.datadoghq.com/fr/tracing/guide/trace_sampling_and_storage/
[33]: https://docs.datadoghq.com/fr/tracing/send_traces/
[34]: https://docs.datadoghq.com/fr/tracing/visualization/services_map/#filtering-vs-changing-scopes
[35]: https://docs.datadoghq.com/fr/tracing/visualization/#services
[36]: https://docs.datadoghq.com/fr/tracing/visualization/services_list/
[37]: https://docs.datadoghq.com/fr/integrations/amazon_step_functions/
[38]: /fr/integrations/amazon_efs/#amazon-efs-for-lambda
[39]: /fr/integrations/amazon_efs/
[40]: /fr/metrics/distributions/#customize-tagging
[41]: https://docs.datadoghq.com/fr/developers/metrics/
[42]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[43]: https://docs.datadoghq.com/fr/agent/
[44]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[45]: https://docs.datadoghq.com/fr/help/
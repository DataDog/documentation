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

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Lambda` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Lambda. Pour en savoir plus sur les stratégies Lambda, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | Énumère les tags, les métadonnées et les fonctions Lambda.   |
    | `tag:GetResources` | Récupère des tags personnalisés appliqués aux fonctions Lambda. |

3. Installez l'[intégration Datadog/AWS Lambda][5].

Une fois l'installation terminée, vous pouvez consulter l'ensemble de vos fonctions Lambda depuis l'[interface Serverless de Datadog][6]. Cette page regroupe en une vue unique les métriques, les traces et les logs de vos fonctions Lambda AWS qui exécutent des applications sans serveur. Pour en savoir plus sur cette fonctionnalité, consultez la [documentation relative aux fonctions sans serveur de Datadog][7].

#### Tagging de métriques

Tout [tag][8] appliqué à votre fonction Lambda devient automatiquement une nouvelle dimension que vous pouvez utiliser pour filtrer vos métriques.

##### Intégration d'AWS Step Functions

Activez l'[intégration AWS Step Functions][9] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quelles machines d'état les fonctions appartiennent. Cette intégration vous permet d'obtenir une vue agrégée de vos métriques Lambda par fonction et de visualiser vos fonctions dans la [vue Serverless][6].

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
| **aws.lambda.enhanced.estimated_cost**  | Mesure le coût total estimé de l'appel de la fonction (en dollars).                                                                         |

Ces métriques possèdent les tags `functionname`, `cold_start`, `region`, `account_id`, `allocated_memory` et `runtime`. Il s'agit de métriques de type [DISTRIBUTION][10]. Vous pouvez donc afficher leur `count`, `min`, `max`, `sum` et `avg`.

##### Activation des métriques Lambda optimisées transmises en temps réel

1. Configurez ou installez la version 3.0.0 (ou une version ultérieure) du [Forwarder Datadog][11].
2. Installez la [couche Lambda Datadog](#installer-et-utiliser-la-couche-lambda-datadog) sur les fonctions pour lesquelles vous souhaitez obtenir ces métriques [(couche version 9+ pour Python][12], [6+ pour Node.js][13] et [5+ pour Ruby][14] ; [package version 0.5.0+ pour Go][15] ou [0.0.2+ pour Java][16]).
3. Pour ajouter automatiquement à ces métriques les tags personnalisés appliqués à votre fonction Lambda, vérifiez que vous exécutez au minimum la version 3.0.0 du Forwarder Datadog. Définissez ensuite le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder Datadog.
4. Incorporez les gestionnaires de votre fonction Lambda AWS au sein de la bibliothèque Datadog, tel qu'illustré dans l'[exemple de code](# exemple-de-code-pour-l-envoi-de-metriques-custom). Le [plug-in Datadog sans serveur][17] peut automatiquement incorporer tous vos gestionnaires de fonctions Python et Node.js.
5. Accédez au [dashboard par défaut des métriques Lambda optimisées][18].

**Remarque :** ces métriques sont activées par défaut, mais sont transmises **uniquement** [de façon asynchrone](#metriques-custom-synchrones-et-asynchrones). Elles sont envoyées au Forwarder Datadog par l'intermédiaire des logs CloudWatch. Votre volume de logs dans CloudWatch sera donc amené à augmenter. Cela peut accroître vos coûts AWS. Pour désactiver l'envoi des métriques optimisées, définissez la variable d'environnement `DD_ENHANCED_METRICS` sur `false` sur vos fonctions Lambda AWS.

Les métriques d'appel et d'erreur sont générées par la couche Lambda Datadog, tandis que les autres métriques sont générées par le Forwarder Datadog.

### Couche Lambda Datadog

La couche Lambda Datadog est utilisée pour :

- La création en temps réel des [métriques Lambda optimisées](#metriques-lambda-optimisees-transmises-en temps-reel) portant sur les appels, les erreurs, les démarrages à froid, …
- L'envoi (synchrone ou asynchrone) de métriques custom
- La propagation automatique des en-têtes de tracing entre les requêtes en amont et les services en aval. Il est ainsi possible de procéder au tracing distribué de l'ensemble de vos fonctions Lambda, hosts, conteneurs et autres infrastructures exécutant l'Agent Datadog.

#### Installer et utiliser la couche Lambda Datadog

Datadog propose plusieurs couches Lambda pour les langages Python, Node.js et Ruby. Go est également pris en charge avec un [package][15] à inclure dans votre projet. Nous travaillons actuellement à la prise en charge d'autres langages et runtimes. Si vous souhaitez que Datadog prenne en charge un certain runtime, contactez l'[équipe d'assistance][19].

L'ARN de la couche Lambda Datadog comprend une région, le runtime du langage et la version. Pour créer votre propre ARN, utilisez le format suivant :

```text
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

Par exemple :

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

| Langage | Runtime                                        | Versions             |
| -------- | ---------------------------------------------- | -------------------- |
| Python   | `Python27`, `Python36`, `Python37`, `Python38` | [Dernière version][12] |
| Node.js  | `Node8-10`, `Node10-x`, `Node12-x`             | [Dernière version][13] |
| Ruby     | `Ruby`                                         | [Dernière version][14] |

**Golang :** les liens vers les binaires Go étant statiques, Datadog propose un [package][15] qu'il vous suffit d'importer dans votre projet. Aucune couche Lambda n'est requise.

**Java :** Datadog propose une [bibliothèque][20] que vous pouvez importer dans votre projet. Aucune couche Lambda n'est requise.

**Remarque :** la couche Lambda Datadog et les bibliothèques client intègrent le X-Ray SDK en tant que dépendance. Vous n'avez donc pas besoin de l'installer dans vos projets.

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Accédez à la fonction Lambda à laquelle vous souhaitez ajouter la couche dans votre console AWS.
2. Cliquez sur **Layers** sur la page principale de votre fonction.
3. Faites défiler la page et cliquez sur **Add a layer**.
3. Sélectionnez l'option **Provide a layer version ARN**.
4. Spécifiez l'ARN de couche Lambda Datadog à partir du tableau ci-dessus.
5. Accédez à la section **Environment Variables** de votre fonction pour configurer votre clé d'API Datadog ainsi que toute autre option (voir le tableau ci-dessous).

{{% /tab %}}
{{% tab "Serverless Framework" %}}

Ce plug-in intègre les couches Lambda Datadog pour Node.js et Python à vos fonctions. Lors du déploiement, il génère de nouvelles fonctions handler qui enveloppent les fonctions existantes et initialisent les couches Lambda.

Le plug-in peut être installé avec l'une des commandes suivantes :

```bash
npm install --save-dev serverless-plugin-datadog  # pour les utilisateurs de NPM
yarn add --dev serverless-plugin-datadog          # pour les utilisateurs de Yarn
```

Ensuite, ajoutez ce qui suit dans votre fichier `serverless.yml` :

```yaml
plugins:
    - serverless-plugin-datadog
```

Configurez la bibliothèque en ajoutant la section suivante à votre fichier `serverless.yml`. Les valeurs par défaut y sont spécifiées, ainsi que le caractère obligatoire ou facultatif de chaque champ.

```yaml
custom:
    datadog:
        # (Obligatoire) Clé d'API Datadog, uniquement
        # nécessaire pour les métriques custom synchrones
        apiKey: '<CLÉ_API_DATADOG>'

        # (Facultatif) Clé d'API Datadog chiffrée 
        # (en cas d'utilisation de KMS)
        apiKMSKey: ''

        # (Facultatif) Définit si le plug-in doit ajouter
        #  les couches Lambda Datadog automatiquement
        #  Default: true
        #  Options: true, false
        addLayers: true

        # (Facultatif) Instance Datadog vers laquelle
        #  les données doivent être envoyées
        #  Default: datadoghq.com
        #  Options: datadoghq.com, datadoghq.eu
        site: datadoghq.com

        # (Facultatif) Définit si l'envoi asynchrone de métriques
        # custom est activé par défaut
        #  Default: false
        #  Options: true, false
        flushMetricsToLogs: false

        # (Facultatif) Le niveau de log du plug-in Datadog
        # et des couches Lambda
        #  Default: "INFO"
        #  Options: INFO, DEBUG
        logLevel: 'INFO'
```

[Documentation de Serverless Framework][1]


[1]: https://serverless.com/framework/docs/providers/aws/
{{% /tab %}}
{{% tab "AWS SAM" %}}

Pour activer le tracing via X-Ray par défaut pour vos fonctions Lambda et vos API Gateways, ajoutez les clés `Function::Tracing` et `Api::TracingEnabled` à la [section Globals][1] de votre fichier `template.yaml`. Ajoutez également votre clé d'API Datadog ainsi que les variables d'environnement de votre choix (voir le tableau ci-dessous) :

```yaml
Globals:
    Function:
        Tracing: Active
        Environment:
            Variables:
                DD_API_KEY: VOTRE_CLÉ_API_DATADOG
    Api:
        TracingEnabled: true
```

[Documentation AWS SAM][2]


[1]: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#globals-section
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
{{% /tab %}}
{{< /tabs >}}

Vous pouvez configurer la couche Lambda Datadog en ajoutant des [variables d'environnement][21] à vos fonctions Lambda :

| Variable d'environnement | Description                                                                              | Obligatoire | Valeur par défaut         | Valeurs acceptées                 |
| -------------------- | ---------------------------------------------------------------------------------------- | -------- | --------------- | ------------------------------- |
| `DD_API_KEY`         | Votre clé d'API Datadog                                                                     | Oui      |                 | Clé d'API Datadog                 |
| `DD_KMS_API_KEY`     | À utiliser à la place de `DD_API_KEY` si vous avez recours à KMS                                                 | Non       |                 | Clé d'API Datadog avec chiffrement KMS   |
| `DD_SITE`            | Définir si vous utilisez l'instance européenne de Datadog                                                  | Non       | `datadoghq.com` | `datadoghq.eu`, `datadoghq.com` |
| `DD_FLUSH_TO_LOG`    | Activer le mode zéro latence [métriques custom asynchrones](#activer-les-metriques-custom-asynchrones) | Non       | `False`         | `True`, `False`                 |
| `DD_LOG_LEVEL`       | Activer les logs détaillés pour la couche Lambda Datadog                                        | Non       | `INFO`          | `INFO`, `DEBUG`                 |

#### Développement local

Vous pouvez également inclure le package Lambda Datadog directement dans votre projet, que ce soit depuis les sources ou à l'aide du gestionnaire de packages standard de votre runtime.

| Langage | Référentiel   | Taille approximative |
| -------- | ------------ | ---------------- |
| Node.js  | [GitHub][22] | 2,6 Mo           |
| Python   | [GitHub][23] | 10 Mo            |
| Ruby     | [GitHub][24] | 2,3 Mo           |
| Go       | [GitHub][25] | 68 Ko            |
| Java     | [GitHub][26] | 51 Ko            |


**Remarque** : AWS SAM prend en charge [le téléchargement de couches Lambda][27] pour le développement local.

### Collecte de logs

{{< img src="integrations/amazon_lambda/lambda_logging.png" alt="Diagramme de l'architecture de collecte de logs depuis AWS Lambda" >}}

1. Si vous ne l'avez pas encore fait, configurez le Forwarder Datadog sur votre compte AWS en suivant les instructions figurant dans le [référentiel Github DataDog/datadog-serverless-functions][11].
2. Configurez les déclencheurs entraînant l'exécution du Lambda. Il existe deux façons de les configurer :

    - [[Automatiquement][28]]: We manage the log collection Lambda triggers for you if you grant us a set of permissions.
    - [[Manuellement][29]]: Set up each trigger yourself via the AWS console.
3. Accédez ensuite à la [section Logs de Datadog][30] pour commencer à explorer vos logs.

**Remarque** : si vous appartenez à la région us-east-1 d'AWS, [utilisez l'intégration Datadog/AWS PrivateLink][31] pour transmettre vos logs à Datadog. Pour ce faire, votre fonction Forwarder [doit disposer de l'autorisation `VPCLambdaExecutionRole`][32].

### Collecte de traces

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Diagramme de l'architecture de tracing d'AWS Lambda avec Datadog" >}}

Datadog prend en charge le tracing distribué pour vos fonctions AWS Lambda, via l'APM Datadog ou [AWS X-Ray][33]. Vous pouvez utiliser l'un de ces ensembles de bibliothèques client pour générer des traces. L'[APM Datadog][34] associe ensuite automatiquement les traces des applications s'exécutant sur des hosts, des conteneurs et des fonctions sans serveur.

Vous pouvez visualiser vos traces sur la [page Serverless][6], dans la section [App Analytics][35] et sur la [Service Map][36]. Pour obtenir des instructions de configuration détaillées, accédez à la [page de l'intégration Datadog/X-Ray][33].

**Remarque** : l'activation de l'intégration AWS X-Ray augmente le nombre de spans analysées utilisées. Cela peut avoir une incidence sur votre facturation.


#### Tracing avec l'APM Datadog

Les bibliothèques de tracing [Node.js][37], [Python][38] et [Ruby][39] Datadog prennent en charge le tracing distribué pour AWS Lambda. D'autres runtimes seront prochainement compatibles. La meilleure façon d'ajouter des fonctionnalités de tracing à votre application consiste à utiliser la [couche Lambda Datadog](#installer-et-utiliser-la-couche-lambda-datadog). Celle-ci comprend la bibliothèque de tracing Datadog en tant que dépendance. Pour configurer l'APM pour votre runtime, suivez les étapes suivantes :

**1re étape :** installez la dernière version du [Forwarder Datadog][11].

**2e étape :** installez la [couche Lambda Datadog][(#installer-et-utiliser-la-couche-lambda-datadog) sur votre fonction. Vous pouvez également installer la bibliothèque de tracing Datadog pour votre runtime :

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

N'oubliez pas que `ddtrace` a recours à des extensions natives, qui doivent être compilées pour Amazon Linux avant d'être packagées et importées sur AWS Lambda. C'est pourquoi nous vous recommandons d'utiliser la [couche Lambda Datadog](#installer-et-utiliser-la-couche-lambda-datadog). 

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

Selon vos besoins, vous pouvez fusionner les traces générées par l'intégration AWS X-Ray et par la bibliothèque de tracing Datadog. Attention : dans la plupart des cas, une seule bibliothèque de tracing est requise. Cela permet à Datadog d'améliorer ses opérations d'[échantillonnage][40] pour les scénarios avec un volume élevé de traces.

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

1. Activez l'[intégration AWS X-Ray][33] pour commencer à tracer vos fonctions Lambda.
2. Ajoutez la [couche Lambda Datadog](#installer-et-utiliser-la-couche-datadog) à vos fonctions Lambda.
3. [Configurez l'APM Datadog][41] sur vos hosts et votre infrastructure à base de conteneurs.

**Remarque** : pour que les traces X-Ray apparaissent sur le même flamegraph que celles de l'APM de Datadog, tous les services doivent posséder le [même tag `env`](#tag-env).

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="tracing d'une requête entre un host et une fonction Lambda" >}}

#### Organiser votre infrastructure avec les tags

Tout [tag][8] appliqué à votre fonction Lambda devient automatiquement une nouvelle dimension que vous pouvez utiliser pour filtrer vos traces.

Les tags sont particulièrement utiles dans l'APM Datadog, la Service Map et la liste des services, qui [exploitent tout le potentiel][42] des tags `env` et `service`.

##### Tag « env »

Utilisez le tag `env` pour faire la distinction entre vos environnements de staging, de développement et de production. Ce tag peut être utilisé pour tout type d'infrastructure, et non pas uniquement pour vos fonctions sans serveur. Par exemple, vous pouvez ajouter le tag `env:prod-eu` à vos fonctions Lambda de production pour la région Europe.

Par défaut, les fonctions Lambda reçoivent le tag `env:none` dans Datadog. Ajoutez votre propre tag pour le remplacer.

##### Tag « service »

Ajoutez le [tag][36] `service` afin de regrouper les fonctions Lambda correspondant à un même [service][43]. La [Service Map][36] et la [liste des services][44] utilisent ce tag pour représenter les relations entre les différents services et la santé de leurs monitors. Chaque service correspond à un nœud individuel sur la Service Map.

Par défaut, chaque fonction Lambda est considérée comme un `service` distinct. Ajoutez votre propre tag pour modifier ce comportement.

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="représentation animée de fonctions Lambda sur la service map" >}}

### Métriques custom

{{< img src="integrations/amazon_lambda/lambda_custom_metrics.png" alt="Diagramme de l'architecture de collecte de métriques custom depuis AWS Lambda" >}}

Installez la couche Lambda de Datadog pour recueillir et envoyer des métriques custom. Les métriques envoyées à partir de la couche Lambda de Datadog sont automatiquement agrégées sous la forme de [distributions][10], vous permettant ainsi de représenter graphiquement les valeurs `avg`, `sum`, `max`, `min` et `count`. Vous avez également la possibilité de calculer les agrégations au 50e, 75e, 95e ou 99e centile pour un ensemble de tags depuis la page [Distributions][10].

Les métriques de distribution sont conçues pour instrumenter des objets logiques, sans tenir compte des hosts sous-jacents. Étant donné que les métriques sont agrégées côté serveur et non en local via un Agent, elles sont particulièrement adaptées à une infrastructure sans serveur.

#### Passer aux métriques de distribution

Les métriques de distribution vous permettent de sélectionner l'agrégation souhaitée au moment de créer votre graphique ou de formuler votre requête, et non au moment d'envoyer la métrique.

Si vous avez déjà envoyé des métriques custom à partir de Lambda sans utiliser l'une des couches Lambda Datadog, vos prochaines métriques custom devront être instrumentées sous de **nouveaux noms** lors de leur envoi à Datadog. Une métrique de distribution ne peut pas coexister avec une métrique d'un autre type dans Datadog si les deux portent le même nom.

Pour activer les agrégations par centile pour vos métriques de distribution, consultez la page [Distributions][45].

#### Tagging de métriques custom

Nous vous conseillons de taguer vos métriques custom lors de leur envoi à l'aide de la [couche Lambda Datadog](#couche-lambda-datadog). Utilisez la page [Distributions][10] pour [personnaliser les tags][45] appliqués à vos métriques custom.

#### Métriques custom synchrones et asynchrones

La couche Lambda Datadog prend en charge l'envoi de métriques custom de façon synchrone ou asynchrone.

**Envoi synchrone** : le comportement par défaut. Avec cette méthode, vos métriques custom sont envoyées à Datadog par HTTP à des intervalles réguliers (toutes les 10 secondes) ainsi qu'au terme de l'appel de votre fonction Lambda. Si l'appel dure moins de 10 secondes, vos métriques custom sont envoyées à la fin de celui-ci.

**Envoi asynchrone (conseillé)** : il est possible d'envoyer vos métriques custom sans aucun délai **et** de les voir apparaître en temps quasi réel dans Datadog. Pour y parvenir, la couche Lambda envoie vos métriques custom sous la forme d'une ligne de log spéciale, qui est ensuite parsée par le [Forwarder Datadog][11] et transmise à Datadog. La journalisation dans AWS Lambda étant entièrement asynchrone, cette méthode permet d'éliminer toute latence au niveau de votre fonction.

##### Activer les métriques custom asynchrones

1. Définissez la variable d'environnement `DD_FLUSH_TO_LOG` sur `True` pour votre fonction Lambda.
2. Installez la version 1.4.0 (ou une version supérieure) du [ Forwarder Datadog][11].

Si vous n'utilisez pas les logs Datadog, vous avez quand même la possibilité d'envoyer vos métriques custom de façon asynchrone. Définissez la variable d'environnement `DD_FORWARD_LOG` sur `False` pour la [fonction AWS Lambda de collecte de logs Datadog][11]. De cette façon, seules les métriques custom seront transmises à Datadog. Aucun log classique ne sera envoyé.

#### Exemple de code pour l'envoi de métriques custom

Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la couche Lambda et ajouter un wrapper autour du gestionnaire de votre fonction. Vous n'avez pas besoin d'ajouter un wrapper autour de vos fonctions auxiliaires.

**Remarque :** les arguments au sein des méthodes d'envoi des métriques custom doivent respecter les règles ci-dessous.

- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][46].
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

La couche Lambda Datadog doit pouvoir [accéder à Internet][47] pour envoyer des métriques custom de façon **synchrone**. Si votre fonction Lambda est associée à un VPC, assurez-vous que les métriques custom sont envoyées de façon **asynchrone** ou que votre fonction peut communiquer avec Internet.

#### Utiliser des bibliothèques tierces

Plusieurs bibliothèques open source ont été développées afin de faciliter l'envoi de métriques custom à Datadog. Toutes ne sont cependant pas conçues pour envoyer des [métriques de distribution][10], qui sont optimisées pour les fonctions Lambda. Avec les métriques de distribution, l'agrégation se fait côté serveur sans passer par un host ou un [Agent][48] local. Dans un environnement sans serveur où aucun Agent n'est utilisé, les métriques de distribution vous assurent une flexibilité optimale pour les agrégations et le tagging.

Si vous envisagez d'utiliser une bibliothèque de métriques tierce pour AWS Lambda, assurez-vous qu'elle prend en charge les métriques de distribution.

#### [OBSOLÈTE] Utiliser les logs CloudWatch

**Cette méthode d'envoi de métriques custom n'est plus prise en charge et n'est pas disponible pour les nouveaux clients.** Nous vous conseillons d'envoyer vos métriques custom à l'aide de la [couche Lambda Datadog](#installer-et-utiliser-la-couche-lambda-datadog).

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
- `<TIMESTAMP_UNIX_EPOCH>` est à définir en secondes, et non en millisecondes.
- `<VALEUR_MÉTRIQUE>` DOIT être un nombre (c'est-à-dire un entier ou un nombre flottant).
- `<TYPE_MÉTRIQUE>` correspond à `count`, `gauge`, `histogram` ou `check`.
- `<NOM_MÉTRIQUE>` identifie de façon unique votre métrique et respecte la [stratégie de nommage des métriques][46].
- `<LISTE_TAGS>` est facultatif et doit être précédé de `#`. Les tags sont séparés par des virgules. Le tag `function_name:<nom_de_la_fonction>` est automatiquement appliqué aux métriques custom.

**Remarque** : la somme de chaque timestamp est utilisée pour les counts et la dernière valeur d'un timestamp donné est utilisée pour les gauges. Nous vous déconseillons d'afficher une déclaration de log chaque fois qu'une métrique est incrémentée, car cela augmente le temps d'analyse de vos logs. Mettez à jour de façon continue la valeur de la métrique dans votre code et affichez une déclaration de log pour cette métrique avant la fin de la fonction.

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

Besoin d'aide ? Contactez [l'assistance Datadog][19].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_lambda.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/fr/infrastructure/serverless
[8]: https://docs.datadoghq.com/fr/getting_started/tagging/
[9]: https://docs.datadoghq.com/fr/integrations/amazon_step_functions/
[10]: https://docs.datadoghq.com/fr/metrics/distributions/
[11]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[12]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[13]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[14]: https://github.com/DataDog/datadog-lambda-layer-rb/releases
[15]: https://github.com/DataDog/datadog-lambda-go/releases
[16]: https://github.com/datadog/datadog-lambda-java
[17]: https://github.com/datadog/serverless-plugin-datadog
[18]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[19]: https://docs.datadoghq.com/fr/help/
[20]: https://github.com/DataDog/datadog-lambda-java
[21]: https://github.com/DataDog/datadog-lambda-layer-python#environment-variables
[22]: https://github.com/DataDog/datadog-lambda-layer-js
[23]: https://github.com/DataDog/datadog-lambda-layer-python
[24]: https://github.com/DataDog/datadog-lambda-layer-rb
[25]: https://github.com/DataDog/datadog-lambda-go
[26]: https://github.com/DataDog/datadog-lambda-java/releases
[27]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-layers.html
[28]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#automatically-setup-triggers
[29]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#manually-setup-triggers
[30]: https://app.datadoghq.com/logs
[31]: https://docs.datadoghq.com/fr/agent/guide/private-link/?tab=logs
[32]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html
[33]: https://docs.datadoghq.com/fr/integrations/amazon_xray/
[34]: https://docs.datadoghq.com/fr/tracing/
[35]: https://docs.datadoghq.com/fr/tracing/app_analytics/
[36]: https://docs.datadoghq.com/fr/tracing/visualization/services_map/#the-service-tag
[37]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/
[38]: https://docs.datadoghq.com/fr/tracing/setup/python/
[39]: https://docs.datadoghq.com/fr/tracing/setup/ruby/
[40]: https://docs.datadoghq.com/fr/tracing/guide/trace_sampling_and_storage/
[41]: https://docs.datadoghq.com/fr/tracing/send_traces/
[42]: https://docs.datadoghq.com/fr/tracing/visualization/services_map/#filtering-vs-changing-scopes
[43]: https://docs.datadoghq.com/fr/tracing/visualization/#services
[44]: https://docs.datadoghq.com/fr/tracing/visualization/services_list/
[45]: /fr/metrics/distributions/#customize-tagging
[46]: https://docs.datadoghq.com/fr/developers/metrics/
[47]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[48]: https://docs.datadoghq.com/fr/agent/
[49]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
---
title: Guides d'utilisation de la surveillance sans serveur Python de bout en bout
aliases:
  - /fr/infrastructure/serverless/azure_app_services/python
kind: guide
---
Dans ce guide, vous découvrirez toutes les étapes à suivre pour obtenir une visibilité sur les métriques, les traces et les logs dans votre écosystème sans serveur. Premièrement, vous configurerez les **métriques Lambda optimisées de Datadog** pour illustrer comment représenter graphiquement les démarrages à froid dans votre infrastructure Lambda. Deuxièmement, vous activerez l'**ingestion de logs** Lambda et apprendrez à parcourir les logs d'erreurs Lambda. Troisièmement, vous découvrirez des outils d'analyse rapide des causes d’origine en activant le **tracing distribué** Lambda. Enfin, vous commencerez à surveiller les **métriques custom** et les services dans votre écosystème sans serveur.

## Représentation graphique des démarrages à froid Lambda

### Ingestion de métriques Lambda

Vous devez activer l'intégration Amazon Web Services pour commencer à recueillir des métriques CloudWatch à partir des fonctions Lambda. Pour ce faire, [suivez les étapes figurant dans la documentation relative à Amazon Web Services][1]. 

Si vous avez configuré l'intégration AWS avant de lire ce guide : 
- Dans le carré d'intégration AWS, assurez-vous que l'option Lambda est cochée dans la section concernant la collecte des métriques.
- En outre, assurez-vous que les autorisations `lambda:List*` et `tag:GetResources` sont incluses dans la stratégie IAM Datadog que vous avez configurée lors de l'installation.  

À cette étape, Datadog commence automatiquement à recueillir les métriques Lambda clés telles que les invocations, la durée et les erreurs. Vous pouvez les visualiser dans le [dashboard Lambda prêt à l'emploi][2], que vous trouverez sous Dashboards.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_1-compressed.mp4" video="true" alt="Dashboard Lambda par défaut"  style="width:90%;">}}

Vous pouvez également consulter l'ensemble de vos fonctions Lambda depuis l'interface Serverless de Datadog. Pour l'instant, vous ne voyez que les métriques CloudWatch. Ce guide explique comment regrouper en une vue unique les métriques optimisées, les traces et les logs de vos fonctions Lambda AWS qui exécutent des applications sans serveur.

### Représentation graphique des démarrages à froid Lambda avec métriques optimisées

Datadog a créé deux outils auxquels il est fait référence tout au long de ce guide : 
- Le Forwarder Datadog (utilisé pour les logs, les métriques optimisées, les métriques custom et le tracing) 
- La couche Lambda Datadog (utilisée pour les métriques optimisées et le tracing)  

La couche Lambda génère des données qui sont ensuite envoyées à Datadog par le Forwarder. La couche Lambda de Datadog contient également la bibliothèque de tracing de Datadog, `dd-trace`, pour votre runtime.

Vous allez maintenant configurer ces deux outils pour activer les métriques Lambda optimisées, qui sont nécessaires pour ingérer des métriques et des tags supplémentaires, tels que les démarrages à froid.

En quoi consistent les métriques Lambda optimisées ?
- Métriques runtime sans serveur avec granularité de deuxième niveau en temps réel
- Comprennent de nouveaux tags, tels que `cold_start`
- Comprennent de nouvelles métriques, notamment la durée facturée et le coût estimé

#### Installation du Forwarder Datadog

Pour installer le Forwarder Datadog, suivez les étapes ci-dessous. Assurez-vous que le Forwarder Datadog se trouve dans la même région AWS que les fonctions Lambda que vous surveillez. 

1. Connectez-vous à votre compte/rôle AWS d'administrateur et déployez cette [pile CloudFormation][3] en cliquant sur le lien.
2. Définissez `DdApiKey` sur votre clé d'API Datadog et sélectionnez le paramètre `DdSite` approprié. Tous les autres paramètres sont facultatifs. La valeur de `DdApiKey` se trouve sur votre compte Datadog, dans la section Integrations de l'onglet API.
3. Cliquez sur **Create stack** et attendez que la création soit terminée.
4. La fonction Lambda du Forwarder installée se trouve sous l'onglet **Resources** de la pile avec l'ID logique du Forwarder.
5. Accédez à l'onglet **Collect Logs** dans le carré d'intégration AWS de Datadog.
6. Sélectionnez le compte AWS à partir duquel vous souhaitez recueillir des logs, puis saisissez l'ARN du Lambda créé dans la section précédente.
7. Sélectionnez Lambda Cloudwatch Logs et tout autre service à partir duquel vous souhaitez recueillir des logs, puis cliquez sur Save.

Pour installer le Forwarder Datadog sans la pile CloudFormation, ou pour mettre à niveau un Forwarder existant, [consultez cette documentation][4].

#### Installation de la couche Lambda Datadog

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Le [framework Serverless][1] vous permet de développer et de déployer vos fonctions Lambda AWS, ainsi que les ressources d'infrastructure AWS dont elles ont besoin. Il est très couramment utilisé pour grouper et déployer des applications sans serveur. Datadog dispose d'un plug-in spécialement conçu pour faciliter la surveillance des applications sans serveur créées à l'aide du framework Serverless.

Le plug-in associe automatiquement les couches Lambda Datadog pour Node.js et Python à vos fonctions. Au moment du déploiement, il génère de nouvelles fonctions de gestionnaire qui incorporent vos fonctions existantes et initialise la couche Lambda.

Pour installer la couche Lambda Datadog, suivez les étapes ci-dessous :

1. Installez le plug-in Serverless dans votre package Python : `yarn add --dev serverless-plugin-datadog`. 

2. Ajoutez ce qui suit dans votre fichier `serverless.yml` :

```bash
plugins:
            - serverless-plugin-datadog
```

3. Ajoutez également la section suivante dans votre fichier `serverless.yml` :

```bash
custom:
        datadog:
            addLayers: true
            flushMetricsToLogs: true
            logLevel: 'INFO'
            enableDDTracing: true
```

4. Déployez à nouveau votre application sans serveur.

Si vous préférez inclure la couche Lambda directement dans votre projet, [suivez les instructions figurant dans ce référentiel Github][2] pour effectuer l'installation en utilisant la couche Lambda open-source pour Python.

La couche Lambda devrait désormais être installée automatiquement sur toutes vos fonctions. Pour en savoir plus sur les différents champs de configuration de la couche Lambda Datadog, [consultez cette documentation][3].

[1]: https://www.serverless.com/framework/docs/providers/aws/guide/intro/
[2]: https://github.com/DataDog/datadog-lambda-layer-python
[3]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{% /tab %}}
{{% tab "Console AWS" %}}

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
| Python   | `Python27`, `Python36`, `Python37`, `Python38` | [Dernière version][1]  |
| Node.js  | `Node8-10`, `Node10-x`, `Node12-x`             | [Dernière version][2]  |

1. Accédez à la fonction Lambda à laquelle vous souhaitez ajouter la couche dans votre console AWS.
2. Cliquez sur **Layers** sur la page principale de votre fonction.
3. Faites défiler la page et cliquez sur **Add a layer**.
3. Sélectionnez l'option **Provide a layer version ARN**.
4. Spécifiez l'ARN de couche Lambda Datadog à partir du tableau ci-dessus.
5. Accédez à la section **Environment Variables** de votre fonction et cliquez sur le bouton Edit.
6. Ajoutez une nouvelle variable `DD_FLUSH_TO_LOG` définie sur `true`, puis cliquez sur Save.


La couche Lambda devrait désormais être installée sur cette fonction. Vous devez répéter ces étapes pour installer la couche Lambda sur chaque fonction. Pour en savoir plus sur les différents champs de configuration de la couche Lambda Datadog, [consultez la documentation de Datadog relative à Amazon Lambda][3].

[1]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{% /tab %}}
{{% /tabs %}}


### Représentation graphique des démarrages à froid Lambda

Lorsque le Forwarder Datadog et la couche Lambda Datadog sont correctement configurés, vous pouvez accéder au [dashboard des métriques Lambda optimisées][8] par défaut.

Ce dashboard vous permet de visualiser directement un graphique intitulé « Cold Starts by Function ». Vous pouvez le développer pour consulter des informations détaillées sur des fonctions auxquelles pour lesquelles il peut être intéressant, par exemple, de fournir une programmation concurrente configurée supplémentaire.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_2-compressed.mp4" video="true" alt="Dashboard des métriques optimisées"  style="width:90%;">}}

Vous pouvez facilement reconnaître les métriques Lambda optimisées, car elles sont toutes nommées avec le préfixe `aws.lambda.enhanced.*`. Par exemple, le graphique ci-dessus mesure `aws.lambda.enhanced.invocations`, avec le tag `cold_start:true`.

## Parcourir les logs d'erreurs Lambda

### Activer l'ingestion de logs Lambda

Dans la section précédente, vous avez configuré le Forwarder Datadog pour activer les métriques optimisées. Le Forwarder Datadog est également nécessaire pour envoyer des logs de votre fonction Lambda à Datadog.

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Si vous avez suivi les étapes précédentes, le Forwarder Datadog est déjà activé, et les logs Lambda devraient déjà être automatiquement transmis à Datadog. Si vous avez suivi toute la procédure ci-dessus, mais que les logs ne s'affichent pas dans Datadog, [consultez les étapes de dépannage des logs Lambda][1].

Si une ressource est déjà abonnée à un groupe de logs que vous souhaitez surveiller avec la fonction Lambda Datadog, vous pouvez ajouter l'ARN du Forwarder dans le champ ‘forwarder’ de votre fichier serverless.yml. Une fois configuré, le plug-in essaiera d'abonner les groupes de logs CloudWatch de la fonction au Forwarder. Par exemple, votre fichier `serverless.yml` ressemblera à ce qui suit :

```bash
custom:
    datadog:
        addLayers: true
        flushMetricsToLogs: true
        logLevel: 'INFO'
        enableDDTracing: true
        # Ajouter l'ARN de votre Forwarder.
        forwarder:
```

[1]: https://docs.datadoghq.com/fr/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{% /tab %}}
{{% tab "Console AWS" %}}

Si vous avez suivi la procédure, le Forwarder Datadog est déjà activé, et les logs Lambda devraient déjà être automatiquement transmis à Datadog. Si vous avez suivi la procédure étape par étape mais que les logs ne s'affichent pas dans Datadog, [consultez les étapes de dépannage des logs Lambda][1].

Si une ressource est déjà abonnée à un groupe de logs que vous souhaitez surveiller à l'aide de la fonction Lambda de Datadog, vous pouvez la supprimer depuis la console AWS :

1. Sélectionnez la source de log sur votre fonction Lambda.
2. Sélectionnez Remove Subscription Filter dans le menu déroulant Actions.

[1]: https://docs.datadoghq.com/fr/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{% /tab %}}
{{% /tabs %}}

Si vos logs ne s'affichent toujours pas dans Datadog, vous pouvez [suivre ces étapes de dépannage][9].

### Trier vos erreurs Lambda dans le Log Explorer

Vous pouvez consulter à nouveau l'interface Serverless de Datadog pour visualiser toutes vos fonctions Lambda. Désormais, si vous accédez à une fonction spécifique, vous pouvez consulter les logs émis à partir de cette fonction, mais également accéder au Log Explorer pour en savoir plus sur ces logs.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_3-compressed.mp4" video="true" alt="Logs de la page Serverless"  style="width:90%;">}}

Vous souhaitez peut-être savoir quelles sont les erreurs que rencontrent le plus souvent vos utilisateurs. Vous pouvez rapidement filtrer vos logs pour trouver les patterns de logs d'erreur affichés à partir de vos fonctions Lambda par ordre de volume.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_4-compressed.mp4" video="true" alt="Log Patterns"  style="width:90%;">}}

## Analyse des causes d’origine pour les fonctions Lambda

### Activer le tracing distribué Lambda

Dans la première section, vous avez configuré le Forwarder Datadog et la couche Lambda pour activer les métriques optimisées. Le Forwarder Datadog et la couche Lambda sont également nécessaires pour afficher les traces distribuées à partir de vos fonctions dans Datadog.

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Si vous avez suivi la procédure, le Forwarder Datadog et la couche Lambda sont déjà activés. Avec le framework Serverless, les traces sont automatiquement transmises à Datadog sans instrumentation de code supplémentaire.

{{% /tab %}}
{{% tab "Instrumentation de code" %}}

Si vous avez suivi la procédure, le Forwarder Datadog est activé et la couche Lambda a été installée sur votre fonction. Suivez les étapes ci-dessous pour configurer l'APM en Python :

1. Ajoutez manuellement la bibliothèque de tracing à votre projet ou ajoutez `datadog-lambda` au fichier `requirements.txt` de votre projet.

```bash
pip install datadog-lambda
```

2. Instrumentez votre code.

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
{{% /tabs %}}

### Analyse des causes d’origine à l'aide de traces, de métriques et de logs

Vous pouvez consulter la page Serverless de Datadog une nouvelle fois pour voir toutes vos fonctions Lambda. Si vous accédez à une fonction spécifique, vous pouvez visualiser les traces émises à partir de cette fonction. Chaque trace peut être développée afin d'afficher un flamegraph de la durée de requête totale pour l'ensemble des fonctions Lambda, ainsi que des métriques Lambda et des logs corrélés au moment de la requête.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_5-compressed.mp4" video="true" alt="Flamegraph"  style="width:90%;">}}

Vous pouvez utiliser les traces affichées dans le flamegraph pour déterminer que la fonction Lambda actuelle présente une anomalie due à une erreur affichée à partir d'un appel de fonction ultérieur. Vous pouvez accéder rapidement à cette fonction dans la requête, et trouver la trace d'erreur et le log d'erreur correspondant, qui concerne une expiration du délai.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_6-compressed.mp4" video="true" alt="Analyse des causes d’origine"  style="width:90%;">}}

Grâce aux logs, aux traces et aux métriques optimisées accessibles depuis une unique vue, vous pouvez déterminer efficacement la cause d'origine d'un problème parmi vos requêtes sans serveur.

## Intégrations sans serveur et métriques custom

### Intégrations sans serveur de Datadog

Comme indiqué dans le [rapport Bilan sur l'adoption de l'informatique sans serveur][10] de Datadog (en anglais), la surveillance de la santé de votre écosystème sans serveur nécessite une visibilité qui ne se limite pas à vos fonctions Lambda. En premier lieu, les fonctions Lambda interagissent souvent avec SQS et DynamoDB dans la même requête. Datadog propose des intégrations et des dashboards pour tous les services qui interagissent avec vos fonctions Lambda.

Par exemple, Datadog propose une [intégration DynamoDB][11] qui recueille les métriques et les logs de performance des tables DynamoDB. Datadog offre également une intégration Amazon SQS permettant d'ingérer les métriques SQS et de recueillir les logs lors des appels d'API SQS. Ces deux intégrations sont associées respectivement à des dashboards prêts à l'emploi pour les [tables DynamoDB][11] et [SQS][12]. Les intégrations disponibles pour d'autres services communs sans serveur sont énumérées ci-dessous : 

**Data Stores :** RDS, Aurora, auto-hébergement, S3  
**Files d'attente de messages :** SNS, SQS, Kinesis  
**Fonctions Lambda :** [AWS Step Functions][13]  

Vous pouvez personnaliser n'importe quel dashboard par défaut proposé par les intégrations ci-dessus en regroupant des informations de différents services au sein d'un même dashboard.

### Envoyer des métriques custom

Les métriques custom offrent des détails supplémentaires sur les cas d'utilisation qui sont propres aux workflows de votre application, tels qu'un utilisateur qui se connecte à votre application, achète un article ou met à jour un profil utilisateur.

Dans la première section, vous avez configuré la couche Lambda Datadog pour activer les métriques optimisées. La couche Lambda Datadog est également nécessaire pour afficher les traces distribuées à partir de vos fonctions dans Datadog.

Si vous avez suivi la procédure, la couche Lambda Datadog est déjà activée. Les métriques custom envoyées à partir de la couche Lambda Datadog sont automatiquement créées sous la forme de distributions, vous permettant ainsi de représenter graphiquement les valeurs avg, sum, max, min et count par défaut. Vous pouvez également activer vos propres centiles dans la page Distribution Metrics.

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Pour ingérer une métrique custom à partir de votre fonction :

1. Assurez-vous que le paramètre `flushMetricsToLogs: true` est bien défini dans votre fichier `serverless.yml`.
2. Instrumentez votre code en suivant cet exemple (la valeur de la métrique doit être un nombre) :

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
        lambda_metric(
            "coffee_house.order_value",             # Nom de la métrique
            12.45,                                  # Valeur de la métrique
            tags=['product:latte', 'order:online']  # Tags associés
        )
```

{{% /tab %}}
{{% tab "Console AWS" %}}

Pour ingérer une métrique custom à partir de votre fonction : 

1. Assurez-vous que la variable d'environnement AWS Lambda `DD_FLUSH_TO_LOG` est définie sur `true`.
2. Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la couche Lambda et ajouter un wrapper autour du gestionnaire de votre fonction :

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
{{% /tabs %}}

La création d'un monitor pour une métrique vous permet d'être informé des problèmes clés de vos applications sans serveur. Vous pouvez alors déterminer la cause d'origine, comme illustré plus haut dans ce guide, en combinant les métriques, les traces et les logs pour l'ensemble de vos fonctions Lambda, data stores et files d'attente de messages.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_7-compressed.mp4" video="true" alt="Métriques custom"  style="width:90%;">}}

Si vous souhaitez en savoir plus sur la configuration de Lambda pour votre cas d'utilisation, vous pouvez consulter [ici][14] la documentation relative à AWS Lambda.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml
[4]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[7]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer
[8]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[9]: https://docs.datadoghq.com/fr/logs/guide/lambda-logs-collection-troubleshooting-guide/
[10]: https://www.datadoghq.com/state-of-serverless/
[11]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#overview
[12]: https://docs.datadoghq.com/fr/integrations/amazon_sqs/#overview
[13]: https://docs.datadoghq.com/fr/integrations/amazon_step_functions/#overview
[14]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/
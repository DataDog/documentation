---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - aws
  - containers
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md'
display_name: Amazon Fargate
git_integration_title: ecs_fargate
guid: 7484e55c-99ec-45ad-92f8-28e798796411
integration_id: aws-fargate
integration_title: ECS Fargate
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ecs.
metric_to_check: ecs.fargate.cpu.user
name: ecs_fargate
public_title: "Intégration Datadog/ECS\_Fargate"
short_description: "Surveillez les métriques de vos conteneurs fonctionnant avec ECS\_Fargate"
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques depuis tous vos conteneurs s'exécutant dans ECS Fargate :

* Recueillez des métriques sur les limites et l'utilisation du processeur et de la mémoire.
* Surveillez vos applications s'exécutant sur Fargate grâce aux intégrations ou aux métriques custom de Datadog.

L'Agent Datadog récupère des métriques sur les conteneurs des définitions de tâches via l'endpoint Task Metadata d'ECS. D'après la [documentation ECS][1] concernant cet endpoint :

> Cet endpoint renvoie des statistiques Docker au format JSON pour tous les conteneurs associés à la tâche. Pour en savoir plus sur les statistiques transmises, consultez la section [ContainerStats][2] de la documentation relative à l'API Docker (en anglais).

L'endpoint Task Metadata est uniquement disponible au sein de la définition de la tâche. Ainsi, l'Agent Datadog doit être exécuté en tant que conteneur supplémentaire dans la définition de la tâche.

Pour recueillir des métriques, il vous suffit de définir la variable d'environnement `ECS_FARGATE` sur `"true"` dans la définition de la tâche.

## Implémentation
Les étapes ci-dessous détaillent la configuration de l'Agent de conteneur Datadog au sein d'AWS ECS Fargate. **Attention** : la version 6.11 de l'Agent Datadog, ou une version ultérieure, est requise pour profiter de l'ensemble des fonctionnalités de l'intégration Fargate.

Les tâches sans l'Agent Datadog envoient tout de même des métriques via Cloudwatch. Néanmoins, l'Agent est requis pour utiliser Autodiscovery, obtenir des métriques détaillées sur les conteneurs, exploiter le tracing, etc. En outre, les métriques Cloudwatch sont moins granulaires et entraînent une latence plus élevée que les métriques transmises directement par l'Agent Datadog.

### Installation
Pour surveiller vos tâches ECS Fargate avec Datadog, exécutez l'Agent en tant que conteneur dans la même définition de tâche que votre application. Pour recueillir des métriques avec Datadog, chaque définition de tâche doit inclure un conteneur d'Agent Datadog en plus des conteneurs d'application. Voici les étapes de configuration à suivre :

1. **Ajouter une tâche ECS Fargate**
2. **Créer ou modifier votre stratégie IAM**
3. **Exécuter la tâche en tant que service de réplica**

#### Créer une tâche ECS Fargate
Le fonctionnement de Fargate repose sur des tâches. Celles-ci sont configurées dans les définitions de tâches. Une définition de tâche fonctionne comme un pod dans Kubernetes et doit comprendre un ou plusieurs conteneurs. Pour exécuter l'Agent Datadog, créez votre définition de tâche dans le but de lancer vos conteneurs d'application, ainsi que le conteneur de l'Agent Datadog.

Les instructions ci-dessous vous expliquent comment configurer la tâche à l'aide des [outils d'interface de ligne de commande d'AWS][3] ou de la [console Web d'Amazon][4].

##### Interface utilisateur Web

1. Connectez-vous à votre [console Web AWS][4] et accédez à la section ECS.
2. Cliquez sur **Task Definitions** dans le menu de gauche, puis cliquez sur le bouton **Create new Task Definition**.
3. Sélectionnez le type de lancement **Fargate**, puis cliquez sur le bouton **Next step**.
4. Saisissez un **Task Definition Name**, tel que `my-app-and-datadog`.
5. Sélectionnez un rôle IAM d'exécution de tâche. Consultez les exigences des différentes autorisations dans la section [Créer ou modifier votre stratégie IAM](#creer-ou-modifier-votre-strategie-iam) ci-dessous.
6. Choisissez une valeur pour **Task memory** et **Task CPU** en fonction de vos besoins.
7. Cliquez sur le bouton **Add container**.
8. Pour le champ **Container name**, saisissez `datadog-agent`.
9. Pour le champ **Image**, saisissez `datadog/agent:latest`.
10. Pour le champ **Memory Limits**, saisissez `256` comme limite logicielle.
11. Faites défiler jusqu'à atteindre la section **Advanced container configuration**, puis saisissez `10` pour **CPU units**.
12. Pour le champ **Env Variables**, ajoutez la **clé** `DD_API_KEY` et saisissez votre [clé d'API Datadog][5] en tant que valeur. *Si vous préférez stocker vos secrets dans S3, consultez le [guide de configuration d'ECS][6].*
13. Ajoutez une autre variable d'environnement avec la **clé** `ECS_FARGATE` et la valeur `true`. Cliquez sur **Add** pour ajouter le conteneur.
14. (Facultatif) Si vous utilisez datadog.eu, ajoutez une autre variable d'environnement avec la **clé** `DD_SITE` et la valeur `datadoghq.eu`.
15. Ajoutez vos autres conteneurs, tels que votre app. Pour en savoir plus sur la collecte des métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][7].
16. Cliquez sur **Create** pour créer la définition de tâche.

##### Interface de ligne de commande d'AWS

1. Téléchargez [datadog-agent-ecs-fargate.json][8].
2. Mettez à jour le fichier JSON en ajoutant un **TASK_NAME** et votre [clé d'API Datadog][5]. Veuillez noter que la variable d'environnement `ECS_FARGATE` est déjà définie sur `"true"`.
3. Ajoutez vos autres conteneurs, tels que votre app. Pour en savoir plus sur la collecte des métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][7].
3. Exécutez la commande suivante pour enregistrer la définition de tâche ECS :

```
aws ecs register-task-definition --cli-input-json file://<CHEMIN_VERS_FICHIER>/datadog-agent-ecs-fargate.json
```

#### Créer ou modifier votre stratégie IAM
Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][9] afin de recueillir des métriques ECS Fargate. Pour en savoir plus sur les stratégies ECS, [consultez la documentation du site Web d'AWS][10].

| Autorisation AWS                   | Description                                                       |
|----------------------------------|-------------------------------------------------------------------|
| `ecs:ListClusters`               | Énumère tous les clusters disponibles.                                          |
| `ecs:ListContainerInstances`     | Énumère les instances d'un cluster.                                      |
| `ecs:DescribeContainerInstances` | Décrit les instances pour ajouter des métriques sur les ressources et les tâches en cours d'exécution. |

#### Exécuter la tâche en tant que service de réplica
Dans ECS Fargate, vous êtes contraint d'exécuter la tâche en tant que [service de réplica][11]. L'Agent Datadog s'exécute dans la même définition de tâche que votre application et vos conteneurs d'intégration.

##### Interface de ligne de commande d'AWS
Exécutez les commandes suivantes à l'aide des [outils d'interface de ligne de commande d'AWS][3].

**Remarque** : la version 1.1.0 ou une version ultérieure de Fargate est requise. La commande ci-dessous spécifie donc la version de la plateforme.

Si besoin, créez un cluster :

```
aws ecs create-cluster --cluster-name "<NOM_CLUSTER>"
```

Exécutez la tâche en tant que service pour votre cluster :

```
aws ecs run-task --cluster <NOM_CLUSTER> \
--network-configuration "awsvpcConfiguration={subnets=["<SOUSRÉSEAU_PRIVÉ>"],securityGroups=["<GROUPE_SÉCURITÉ>"]}" \
--task-definition arn:aws:ecs:us-east-1:<NUMÉRO_COMPTE_AWS>:task-definition/<NOM_TÂCHE>:1 \
--region <RÉGION_AWS> --launch-type FARGATE --platform-version 1.1.0
```

##### Interface utilisateur Web

1. Connectez-vous à votre [console Web AWS][4] et accédez à la section ECS. Si besoin, créez un cluster avec le modèle de cluster **Networking only**.
2. Choisissez le cluster sur lequel exécuter l'Agent Datadog.
3. Dans l'onglet **Services**, cliquez sur le bouton **Create**.
4. Pour le champ **Launch type**, choisissez **FARGATE**.
5. Pour le champ **Task Definition**, sélectionnez la tâche créée lors des précédentes étapes.
6. Saisissez un **Service name**.
7. Pour le champ **Number of tasks**, saisissez `1`, puis cliquez sur le bouton **Next step**.
8. Sélectionnez le **VPC de cluster**, les **sous-réseaux** et les **groupes de sécurité**.
9. Les champs **Load balancing** et **Service discovery** sont facultatifs et peuvent être remplis selon vos préférences.
10. Cliquez sur le bouton **Next step**.
11. Le champ **Auto Scaling** est facultatif et peut être rempli selon vos préférences.
12. Cliquez sur le bouton **Next step**, puis sur le bouton **Create service**.

### Collecte de métriques
Une fois l'Agent Datadog configuré conformément aux instructions ci-dessus, le [check ecs_fargate][12] recueille des métriques lorsque Autodiscovery est activé. Ajoutez des étiquettes Docker à vos autres conteneurs dans la même tâche pour recueillir des métriques supplémentaires.

Pour en savoir plus sur la collecte de métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][7].

#### DogStatsD
Les métriques sont recueillies avec [DogStatsD][13] via UDP par l'intermédiaire du port 8125.

Pour envoyer des métriques custom en écoutant les paquets DogStatsD issus d'autres conteneurs, définissez la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` au sein du conteneur de l'Agent Datadog.

#### Surveillance de live processes
Activez l'[Agent de processus][14] de Datadog en définissant la variable d'environnement `DD_PROCESS_AGENT_ENABLED` sur `true` dans le conteneur de l'Agent Datadog. Puisqu'Amazon contrôle les hosts sous-jacents pour Fargate, les live processes peuvent uniquement être recueillis à partir du conteneur de l'Agent Datadog.

#### Autres variables d'environnement
Pour consulter les variables d'environnement disponibles avec le conteneur de l'Agent Datadog, consultez la section [Agent Docker][15]. **Remarque** : certaines variables ne sont pas disponibles pour Fargate.

Pour le tagging global, il est conseillé d'utiliser `DD_DOCKER_LABELS_AS_TAGS`. Avec cette méthode, l'Agent récupère les tags depuis les étiquettes de vos conteneurs Docker. Cela vous oblige à ajouter les étiquettes appropriées à vos autres conteneurs Docker. Il est possible d'ajouter des étiquettes directement dans la [définition de tâche][16].

Format pour le conteneur de l'Agent :
```shell
{ 
"name": "DD_DOCKER_LABELS_AS_TAGS", 
"value": "{"<NOM_ÉTIQUETTE_À_RECUEILLIR>":"<CLÉ_TAG_POUR_DATADOG>"}" 
}
```

Exemple pour le conteneur de l'Agent :
```shell
{ 
"name": "DD_DOCKER_LABELS_AS_TAGS", 
"value": "{"com.docker.compose.service":"service_name"}" 
}
```

**Remarque** : la notion de host pour l'utilisateur étant inexistante dans Fargate, assurez-vous de ne pas utiliser `DD_HOSTNAME`. `DD_TAGS` est généralement utilisé pour assigner des tags de host, mais à partir de la version 6.13.0 de l'Agent Datadog, vous pouvez également utiliser une variable d'environnement pour appliquer des tags globaux à vos métriques d'intégration.

### Métriques basées sur le crawler

Outre la collecte de métriques par l'Agent, Datadog propose également une intégration ECS basée sur CloudWatch. Celle-ci recueille les [métriques d'Amazon ECS CloudWatch][17].

Comme nous l'avons mentionné, les tâches Fargate transmettent également des métriques de cette façon :
> Les métriques disponibles varient en fonction du type de lancement des tâches et services de vos clusters. Si vous utilisez un type de lancement Fargate pour vos services, les métriques relatives à l'utilisation du processeur et de la mémoire vous sont fournies afin de faciliter la surveillance de vos services.

Puisque cette méthode n'utilise pas l'Agent Datadog, vous devez configurer votre intégration AWS en cochant **ECS** dans le carré d'intégration. Notre application récupère ensuite automatiquement ces métriques CloudWatch (avec l'espace de nommage `aws.ecs.*` dans Datadog). Consultez la section [Données collectées][18] de la documentation.

Si ce sont les seules métriques dont vous avez besoin, vous pouvez utiliser cette intégration pour effectuer la collecte via les métriques CloudWatch. **Remarque** : les données CloudWatch sont moins granulaires (une à cinq minutes en fonction du type de surveillance activé) et mettent plus de temps à parvenir à Datadog. En effet, la collecte des données depuis CloudWatch doit respecter les limites de l'API AWS. Les données ne peuvent pas être envoyées directement à Datadog avec l'Agent.

Le crawler CloudWatch par défaut de Datadog récupère les métriques toutes les 10 minutes. Si vous avez besoin d'un intervalle plus court, contactez [l'assistance Datadog][19] pour en discuter. **Remarque** : les appels d'API étant facturés par CloudWatch, cela entraînera une augmentation de votre facture AWS.

### Collecte de logs

Vous avez la possibilité de surveiller les logs Fargate de deux façons différentes : en utilisant l'intégration AWS FireLens basée sur le plug-in de sortie Flutent Bit de Datadog afin d'envoyer les logs à Datadog, ou en utilisant le pilote de logs `awslogs` et une fonction Lambda afin d'acheminer les logs vers Datadog. Étant donné que Fluent Bit peut être directement configuré dans vos tâches Fargate, nous vous conseillons d'utiliser AWS FireLens.

#### Fluent Bit et FireLens

Configurez l'intégration AWS FireLens basée sur le plug-in de sortie Flutent Bit de Datadog de façon à connecter vos données de logs FireLens aux logs Datadog.

1. Activez Fluent Bit dans le conteneur de routage de vos logs FireLens au sein de votre tâche Fargate. Pour en savoir plus sur l'activation de FireLens, consultez la [documentation AWS Firelens dédiée][28]. Pour en savoir plus sur les définitions de conteneur Fargate, consultez la [documentation AWS sur les définitions de conteneur][26]. AWS conseille d'utiliser l'[image Docker correspondant à votre région][32]. Voici un exemple de définition de tâche où l'image Fluent Bit est configurée :

    ```
    [ 
      { 
        "essential":true,
        "image":"amazon/aws-for-fluent-bit:latest",
        "name":"log_router",
        "firelensConfiguration":{ 
            "type":"fluentbit",
            "options":{ 
                "enable-ecs-log-metadata":"true"
            }
        }
      }
    ]
    ```


2. Ensuite, toujours dans la même tâche Fargate, définissez une configuration de log en spécifiant AWS FireLens comme pilote de logs et en configurant l'envoi des logs à Fluent Bit. Voici un exemple de définition de tâche permettant d'envoyer les données de logs à Fluent Bit avec FireLens comme pilote de logs :


    ```
    "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
            "Name": "datadog",
            "apikey": "<CLÉ_API_DATADOG>",
            "dd_service": "firelens-test",
            "dd_source": "redis",
            "dd_tags": "project:fluentbit",
            "TLS": "on",
            "Host": "http-intake.logs.datadoghq.com",
            "provider": "ecs"
        }
    }

    ```

La liste complète des paramètres acceptés est disponible dans la [documentation Datadog sur Fluentbit][35].

3. À chaque exécution d'une tâche Fargate, Fluent Bit envoie désormais les logs de conteneur à Datadog, accompagnés d'informations sur l'ensemble des conteneurs gérés par vos tâches Fargate. Vous avez la possibilité de visualiser les logs bruts sur la [page Log Explorer][30], de [créer des monitors][31] pour des logs et d'utiliser la [vue Live Container][29].

**Remarque** : pour parser des logs JSON sérialisés depuis le `stdout` d'un conteneur, ajoutez l'argument obligatoire suivant directement dans votre configuration FireLens :

```
firelensConfiguration": {
    "type": "fluentbit",
    "options": {
        "config-file-type": "file",
        "config-file-value": "/fluent-bit/configs/parse-json.conf"
    }
},
```

Cet argument convertit le JSON sérialisé du champ `log:` en champs de premier niveau. Consultez l'exemple pour AWS [Parser des logs sous forme de JSON sérialisé à partir du stdout d'un conteneur][34] pour en savoir plus.

#### Pilote de logs AWS

Surveillez les logs Fargate avec le pilote de logs `awslogs` et une fonction Lambda pour acheminer les logs vers Datadog.

1. Définissez le pilote AwsLog Fargate dans votre tâche. [Consultez le guide de développement d'AWS Fargate][20] pour obtenir des instructions à ce sujet.

2. Les définitions de tâche Fargate prennent uniquement en charge le pilote de log awslogs pour la configuration des logs. Vous pouvez ainsi configurer vos tâches Fargate de façon à envoyer des informations de journalisation à Amazon CloudWatch Logs. Voici un extrait de définition de tâche pour laquelle le pilote de log awslogs est configuré :

    ```
    "logConfiguration": {
       "logDriver": "awslogs",
       "options": {
          "awslogs-group" : "/ecs/fargate-task-definition",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
    }
    ```

    Pour en savoir plus sur l'utilisation du pilote de log awslogs dans vos définitions de tâches afin d'envoyer des logs de conteneur à CloudWatch Logs, référez-vous à la section [Utilisation du pilote de journal awslogs][21].

    Ce pilote recueille les logs générés par le conteneur et les envoie directement à CloudWatch.

3. Enfin, utilisez une [fonction Lambda][22] pour recueillir les logs à partir de CloudWatch et les envoyer à Datadog.

### Collecte de traces

1. Suivez les [instructions ci-dessus](#installation) pour ajouter le conteneur de l'Agent Datadog à la définition de votre tâche en définissant la variable d'environnement supplémentaire `DD_APM_ENABLED` sur `true`.

2. [Instrumentez votre application][23] en fonction de votre infrastructure.

3. Assurez-vous que votre application s'exécute dans la même définition de tâche que le conteneur de l'Agent Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "ecs_fargate" >}}


### Événements

Le check ECS Fargate n'inclut aucun événement.

### Checks de service

**fargate_check**  
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Fargate. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][19].

## Pour aller plus loin

* Article de blog : [Surveiller des applications AWS Fargate avec Datadog][25]
* FAQ : [Configuration d'intégration pour ECS Fargate][7]
* Article de blog : [Surveiller vos logs de conteneur Fargate avec Fluent Bit et Datadog][33]


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[2]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[3]: https://aws.amazon.com/cli
[4]: https://aws.amazon.com/console
[5]: https://app.datadoghq.com/account/settings#api
[6]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[7]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[8]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[10]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[11]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[12]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[13]: https://docs.datadoghq.com/fr/developers/dogstatsd
[14]: https://docs.datadoghq.com/fr/infrastructure/process/?tab=docker#installation
[15]: https://docs.datadoghq.com/fr/agent/docker/#environment-variables
[16]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[17]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[18]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#data-collected
[19]: https://docs.datadoghq.com/fr/help
[20]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[21]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[22]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/#log-collection
[23]: https://docs.datadoghq.com/fr/tracing/setup
[24]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/metadata.csv
[25]: https://www.datadoghq.com/blog/monitor-aws-fargate
[26]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[27]: https://docs.datadoghq.com/fr/integrations/fluentbit/
[28]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[29]: https://docs.datadoghq.com/fr/infrastructure/livecontainers/?tab=linuxwindows
[30]: https://app.datadoghq.com/logs
[31]: https://docs.datadoghq.com/fr/monitors/monitor_types/
[32]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[33]: https://www.datadoghq.com/blog/collect-fargate-logs-with-fluentbit/
[34]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[35]: https://docs.datadoghq.com/fr/integrations/fluentbit/#configuration-parameters


{{< get-dependencies >}}
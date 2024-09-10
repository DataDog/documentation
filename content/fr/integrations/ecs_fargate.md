---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Amazon Fargate: assets/dashboards/amazon_fargate_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - aws
  - containers
  - log collection
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md
display_name: Amazon Fargate
draft: false
git_integration_title: ecs_fargate
guid: 7484e55c-99ec-45ad-92f8-28e798796411
integration_id: aws-fargate
integration_title: "Amazon\_ECS sur AWS\_Fargate"
integration_version: 2.14.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ecs.
metric_to_check: ecs.fargate.cpu.user
name: ecs_fargate
public_title: "Intégration Datadog/Amazon\_ECS sur AWS\_Fargate"
short_description: "Surveillez les métriques de vos conteneurs fonctionnant avec ECS\_Fargate"
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

**Remarque** : cette page concerne l'intégration ECS Fargate. Pour EKS Fargate, consultez la documentation de Datadog dédiée à l'[intégration EKS Fargate][1].

Recueillez des métriques depuis tous vos conteneurs s'exécutant dans ECS Fargate :

- Recueillez des métriques sur les limites et l'utilisation du processeur et de la mémoire.
- Surveillez vos applications exécutées sur Fargate grâce aux intégrations ou aux métriques custom de Datadog.

L'Agent Datadog récupère des métriques sur les conteneurs des définitions de tâches via l'endpoint des métadonnées de tâches d'ECS. D'après la [documentation ECS][2] concernant cet endpoint :

> Cet endpoint renvoie des statistiques Docker au format JSON pour tous les conteneurs associés à la tâche. Pour en savoir plus sur les statistiques transmises, consultez la section [ContainerStats][3] de la documentation relative à l'API Docker (en anglais).

L'endpoint Task Metadata est uniquement disponible au sein de la définition de la tâche. Ainsi, l'Agent Datadog doit être exécuté en tant que conteneur supplémentaire dans la définition de la tâche.

Pour recueillir des métriques, il vous suffit de définir la variable d'environnement `ECS_FARGATE` sur `"true"` dans la définition de la tâche.

## Configuration

Les étapes ci-dessous détaillent la configuration de l'Agent de conteneur Datadog au sein d'AWS ECS Fargate. **Attention** : la version 6.11 de l'Agent Datadog, ou une version ultérieure, est requise pour profiter de l'ensemble des fonctionnalités de l'intégration Fargate.

Les tâches sans l'Agent Datadog envoient tout de même des métriques via Cloudwatch. Néanmoins, l'Agent est requis pour utiliser Autodiscovery, obtenir des métriques détaillées sur les conteneurs, exploiter le tracing, etc. En outre, les métriques Cloudwatch sont moins granulaires et entraînent une latence plus élevée que les métriques transmises directement par l'Agent Datadog.

### Installation

Pour surveiller vos tâches ECS Fargate avec Datadog, exécutez l'Agent en tant que conteneur dans la même définition de tâche que votre application. Pour recueillir des métriques avec Datadog, chaque définition de tâche doit inclure un conteneur d'Agent Datadog en plus des conteneurs d'application. Voici les étapes de configuration à suivre :

1. **Créer une tâche ECS Fargate**
2. **Créer ou modifier votre stratégie IAM**
3. **Exécuter la tâche en tant que service de réplica**

#### Créer une tâche ECS Fargate

Le fonctionnement de Fargate repose sur des tâches. Celles-ci sont configurées dans les définitions de tâches. Une définition de tâche fonctionne comme un pod dans Kubernetes et doit comprendre un ou plusieurs conteneurs. Pour exécuter l'Agent Datadog, créez une définition de tâche conçue pour lancer vos conteneurs d'application ainsi que le conteneur de l'Agent Datadog.

Les instructions ci-dessous vous expliquent comment configurer la tâche à l'aide des [outils d'interface de ligne de commande d'AWS][4] ou de la [console Web d'Amazon][5].

##### Interface utilisateur Web

1. Connectez-vous à votre [console Web AWS][5] et accédez à la section ECS.
2. Cliquez sur **Task Definitions** dans le menu de gauche, puis cliquez sur le bouton **Create new Task Definition**.
3. Sélectionnez le type de lancement **Fargate**, puis cliquez sur le bouton **Next step**.
4. Saisissez un **Task Definition Name**, tel que `my-app-and-datadog`.
5. Sélectionnez un rôle IAM d'exécution de tâche. Consultez les exigences des différentes autorisations dans la section [Créer ou modifier votre stratégie IAM](#creer-ou-modifier-votre-strategie-iam) ci-dessous.
6. Choisissez une valeur pour **Task memory** et **Task CPU** en fonction de vos besoins.
7. Cliquez sur le bouton **Add container**.
8. Pour **Container name**, saisissez `datadog-agent`.
9. Pour **Image**, saisissez `datadog/agent:latest`.
10. Pour le champ **Memory Limits**, saisissez `256` comme limite logicielle.
11. Faites défiler jusqu'à atteindre la section **Advanced container configuration**, puis saisissez `10` pour **CPU units**.
12. Pour le champ **Env Variables**, ajoutez la **clé** `DD_API_KEY` et saisissez votre [clé d'API Datadog][6] en tant que valeur. _Si vous préférez stocker vos secrets dans S3, consultez le [guide de configuration d'ECS][7]._
13. Ajoutez une autre variable d'environnement avec la **clé** `ECS_FARGATE` et la valeur `true`. Cliquez sur **Add** pour ajouter le conteneur.
14. Ajoutez une autre variable d'environnement en utilisant la **clé** `DD_SITE` et la valeur {{< region-param key="dd_site" code="true" >}}. Le site `datadoghq.com` est utilisé par défaut si vous ne le définissez pas.
15. (Windows uniquement) Sélectionnez `C:\` comme répertoire de travail.
16. Ajoutez vos autres conteneurs, tels que celui de votre application. Pour en savoir plus sur la collecte de métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][8].
17. Cliquez sur **Create** pour créer la définition de tâche.

##### Interface de ligne de commande d'AWS

1. Téléchargez [datadog-agent-ecs-fargate][9]. **Remarque** : si vous utilisez Internet Explorer, il est possible que le fichier téléchargé soit au format gzip, celui-ci contenant le fichier JSON mentionné ci-dessous.
2. Mettez à jour le fichier JSON en ajoutant un `TASK_NAME`, votre [clé d'API Datadog][6] et le `DD_SITE` approprié ({{< region-param key="dd_site" code="true" >}}). **Remarque** : la variable d'environnement `ECS_FARGATE` est déjà définie sur `"true"`.
3. Ajoutez vos autres conteneurs, tels que celui de votre application. Pour en savoir plus sur la collecte de métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][8].
4. Exécutez la commande suivante pour enregistrer la définition de tâche ECS :

```bash
aws ecs register-task-definition --cli-input-json file://<CHEMIN_VERS_FICHIER>/datadog-agent-ecs-fargate.json
```

##### AWS CloudFormation

Vous pouvez tirer parti des modèles [AWS CloudFormation][10] pour configurer vos conteneurs Fargate. Utilisez la ressource `AWS::ECS::TaskDefinition` dans votre modèle CloudFormation pour définir la tâche Amazon ECS et spécifier `FARGATE` comme type de lancement requis pour cette tâche. Vous pouvez ensuite définir l'option `Datadog` de façon à configurer la gestion des logs, comme dans l'exemple ci-dessous :

```yaml
Resources:
  ECSTDNJH3:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              Host: http-intake.logs.datadoghq.com
              TLS: 'on'
              dd_service: test-service
              dd_source: test-source
              provider: ecs
              apikey: <CLÉ_API>
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
**Remarque** : utilisez un [secret TaskDefinition][11] pour éviter d'exposer votre `apikey` en texte brut.

Pour en savoir plus sur les modèles et la syntaxe CloudFormation, consultez [la documentation relative à AWS CloudFormation][12].

#### Créer ou modifier votre stratégie IAM

Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][13] afin de recueillir des métriques ECS Fargate. Pour en savoir plus, consultez la section relative aux [stratégies ECS][14] de la documentation AWS.

| Autorisation AWS                   | Description                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | Énumère tous les clusters disponibles.                                          |
| `ecs:ListContainerInstances`     | Énumère les instances d'un cluster.                                      |
| `ecs:DescribeContainerInstances` | Décrit les instances pour ajouter des métriques sur les ressources et les tâches en cours d'exécution. |

#### Exécuter la tâche en tant que service de réplica

Dans ECS Fargate, vous êtes contraint d'exécuter la tâche en tant que [service de réplica][15]. L'Agent Datadog s'exécute dans la même définition de tâche que vos conteneurs d'application et d'intégration.

##### Interface de ligne de commande d'AWS

Exécutez les commandes suivantes à l'aide des [outils d'interface de ligne de commande d'AWS][4].

**Remarque** : la version 1.1.0 ou une version ultérieure de Fargate est requise. La commande ci-dessous spécifie donc la version de la plateforme.

Si besoin, créez un cluster :

```bash
aws ecs create-cluster --cluster-name "<NOM_CLUSTER>"
```

Exécutez la tâche en tant que service pour votre cluster :

```bash
aws ecs run-task --cluster <NOM_CLUSTER> \
--network-configuration "awsvpcConfiguration={subnets=["<SOUS-RÉSEAU_PRIVÉ>"],securityGroups=["<GROUPE_SÉCURITÉ>"]}" \
--task-definition arn:aws:ecs:us-east-1:<NUMÉRO_COMPTE_AWS>:task-definition/<NOM_TÂCHE>:1 \
--region <RÉGION_AWS> --launch-type FARGATE --platform-version 1.1.0
```

##### Interface utilisateur Web

1. Connectez-vous à votre [console Web AWS][5] et accédez à la section ECS. Si besoin, créez un cluster avec le modèle de cluster **Networking only**.
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

Une fois l'Agent Datadog configuré conformément aux instructions ci-dessus, le [check ecs_fargate][16] recueille des métriques lorsqu'Autodiscovery est activé. Ajoutez des étiquettes Docker aux autres conteneurs dans la même tâche pour recueillir des métriques supplémentaires.

Pour en savoir plus sur la collecte de métriques d'intégration, consultez la section [Configuration d'intégration pour ECS Fargate][8].

#### DogStatsD

Les métriques sont recueillies avec [DogStatsD][17] via UDP sur le port 8125.

Pour envoyer des métriques custom en écoutant les paquets DogStatsD issus d'autres conteneurs, définissez la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sur `true` au sein du conteneur de l'Agent Datadog.

#### Autres variables d'environnement

Pour consulter les variables d'environnement disponibles avec le conteneur de l'Agent Datadog Docker, consultez la section [Agent Docker][18]. **Remarque** : certaines variables ne sont pas disponibles pour Fargate.


| Variable d'environnement               | Description                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extrait les étiquettes de conteneur Docker                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extrait les variables d'environnement de conteneur Docker |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extrait les étiquettes de pod.                             |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajoute des tags aux métriques de check                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajoute des tags aux métriques custom                     |

Pour le tagging global, il est conseillé d'utiliser `DD_DOCKER_LABELS_AS_TAGS`. Avec cette méthode, l'Agent récupère les tags depuis les étiquettes de vos conteneurs Docker. Cela vous oblige à ajouter les étiquettes appropriées à vos autres conteneurs Docker. Il est possible d'ajouter des étiquettes directement dans la [définition de tâche][19].

Format du conteneur de l'Agent :

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"<NOM_ÉTIQUETTE_À_RECUEILLIR>\":\"<CLÉ_TAG_POUR_DATADOG>\"}"
}
```

Exemple pour le conteneur de l'Agent :

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"com.docker.compose.service\":\"service_name\"}"
}
```

**Remarque** : la notion de host pour l'utilisateur étant inexistante dans Fargate, assurez-vous de ne pas utiliser `DD_HOSTNAME`. `DD_TAGS` est généralement utilisé pour assigner des tags de host, mais à partir de la version 6.13.0 de l'Agent Datadog, vous pouvez également utiliser une variable d'environnement pour appliquer des tags globaux à vos métriques d'intégration.

### Métriques basées sur le crawler

Outre la collecte de métriques par l'Agent, Datadog propose également une intégration ECS basée sur CloudWatch. Celle-ci recueille les [métriques d'Amazon ECS CloudWatch][20].

Comme nous l'avons mentionné, les tâches Fargate transmettent également des métriques de cette façon :

> Les métriques disponibles varient en fonction du type de lancement des tâches et services de vos clusters. Si vous utilisez un type de lancement Fargate pour vos services, les métriques relatives à l'utilisation du processeur et de la mémoire vous sont fournies afin de faciliter la surveillance de vos services.

Puisque cette méthode n'utilise pas l'Agent Datadog, vous devez configurer l'intégration AWS en cochant **ECS** dans le carré d'intégration. Datadog récupère ensuite automatiquement ces métriques CloudWatch (avec l'espace de nommage `aws.ecs.*` dans Datadog). Consultez la section [Données collectées][21] de la documentation.

Si ce sont les seules métriques dont vous avez besoin, vous pouvez utiliser cette intégration pour effectuer la collecte via les métriques CloudWatch. **Remarque** : les données CloudWatch sont moins granulaires (une à cinq minutes en fonction du type de surveillance activé) et mettent plus de temps à parvenir à Datadog. En effet, la collecte des données depuis CloudWatch doit respecter les limites de l'API AWS. Les données ne peuvent pas être envoyées directement à Datadog avec l'Agent.

Le crawler CloudWatch par défaut de Datadog récupère les métriques toutes les 10 minutes. Si vous avez besoin d'un intervalle plus court, contactez l'[assistance Datadog][22] pour en discuter. **Remarque** : les appels d'API étant facturés par CloudWatch, cela entraînera une augmentation de votre facture AWS.

### Collecte de logs

Vous avez la possibilité de surveiller les logs Fargate de deux façons différentes : en utilisant l'intégration AWS FireLens basée sur le plug-in de sortie Fluent Bit de Datadog afin d'envoyer les logs à Datadog, ou en utilisant le pilote de logs `awslogs` et une fonction Lambda afin d'acheminer les logs vers Datadog. Étant donné que Fluent Bit peut être directement configuré dans vos tâches Fargate, nous vous conseillons d'utiliser AWS FireLens.

{{< tabs >}}
{{% tab "Fluent Bit et Firelens" %}}
#### Fluent Bit et FireLens

Configurez l'intégration AWS FireLens basée sur le plug-in de sortie Flutent Bit de Datadog de façon à connecter vos données de logs FireLens aux logs Datadog.

1. Activez Fluent Bit dans le conteneur de routage de vos logs FireLens au sein de votre tâche Fargate. Pour en savoir plus sur l'activation de FireLens, consultez la [documentation AWS FireLens dédiée][1]. Pour en savoir plus sur les définitions de conteneur Fargate, consultez la [documentation AWS à ce sujet][2]. AWS conseille d'utiliser l'[image Docker correspondant à votre région][3]. Voici un exemple de définition de tâche où l'image Fluent Bit est configurée :

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": { "enable-ecs-log-metadata": "true" }
     }
   }
   ```

    Si vos conteneurs publient des logs JSON sérialisés via stdout, vous devez utiliser cette [configuration FireLens supplémentaire][4] pour que leur parsing s'effectue correctement dans Datadog :

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": {
         "enable-ecs-log-metadata": "true",
         "config-file-type": "file",
         "config-file-value": "/fluent-bit/configs/parse-json.conf"
       }
     }
   }
   ```

    Cet argument convertit le JSON sérialisé du champ `log:` en champs de niveau supérieur. Consultez un exemple pour AWS dans la section relative au [parsing de logs sous forme de JSON sérialisé à partir du stdout d'un conteneur][4] (en anglais) pour en savoir plus.

2. Ensuite, toujours dans la même tâche Fargate, définissez une configuration de log en spécifiant AWS FireLens comme pilote de logs et en configurant l'envoi des logs à Fluent Bit. Voici un exemple de définition de tâche permettant d'envoyer les données de logs à Fluent Bit avec FireLens comme pilote de logs :

   ```json
   {
     "logConfiguration": {
       "logDriver": "awsfirelens",
       "options": {
         "Name": "datadog",
         "apikey": "<DATADOG_API_KEY>",
         "Host": "http-intake.logs.datadoghq.com",
         "dd_service": "firelens-test",
         "dd_source": "redis",
         "dd_message_key": "log",
         "dd_tags": "project:fluentbit",
         "TLS": "on",
         "provider": "ecs"
       }
     }
   }
   ```

    **Remarque** : si votre organisation utilise le site européen de Datadog, utilisez plutôt `http-intake.logs.datadoghq.eu` pour l'option `Host`. La liste complète des paramètres acceptés est disponible dans la [documentation Datadog sur Fluentbit][5].

3. À chaque exécution d'une tâche Fargate, Fluent Bit envoie les logs de conteneur à Datadog, accompagnés d'informations sur l'ensemble des conteneurs gérés par vos tâches Fargate. Vous avez la possibilité de visualiser les logs bruts sur la [page Log Explorer][6], de [créer des monitors][7] pour les logs et d'utiliser la [vue Live Container][8].

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[4]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[5]: https://docs.datadoghq.com/fr/integrations/fluentbit/#configuration-parameters
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/fr/monitors/monitor_types/
[8]: https://docs.datadoghq.com/fr/infrastructure/livecontainers/?tab=linuxwindows
{{% /tab %}}
{{% tab "Pilote de logs" %}}

#### Pilote de logs AWS

Surveillez les logs Fargate avec le pilote de logs `awslogs` et une fonction Lambda pour acheminer les logs vers Datadog.

1. Définissez le pilote AwsLog Fargate dans votre tâche. [Consultez le guide de développement d'AWS Fargate][1] pour obtenir des instructions à ce sujet.

2. Les définitions de tâche Fargate prennent uniquement en charge le pilote de log awslogs pour la configuration des logs. Vous pouvez ainsi configurer vos tâches Fargate de façon à envoyer des informations de journalisation à Amazon CloudWatch Logs. Voici un extrait de définition de tâche pour laquelle le pilote de log awslogs est configuré :

   ```json
   {
     "logConfiguration": {
       "logDriver": "awslogs",
       "options": {
         "awslogs-group": "/ecs/fargate-task-definition",
         "awslogs-region": "us-east-1",
         "awslogs-stream-prefix": "ecs"
       }
     }
   }
   ```

    Pour en savoir plus sur l'utilisation du pilote de log awslogs dans vos définitions de tâches afin d'envoyer des logs de conteneur à CloudWatch Logs, référez-vous à la section [Utilisation du pilote de journal awslogs][2]. Ce pilote recueille les logs générés par le conteneur et les envoie directement à CloudWatch.

3. Enfin, utilisez une [fonction Lambda][3] pour recueillir les logs à partir de CloudWatch et les envoyer à Datadog.


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[3]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/#log-collection
{{% /tab %}}
{{< /tabs >}}

### Collecte de traces

1. Suivez les [instructions ci-dessus](#installation) pour ajouter le conteneur de l'Agent Datadog à la définition de votre tâche en définissant la variable d'environnement supplémentaire `DD_APM_ENABLED` sur `true`, et configurez un port de host qui utilise **8126** avec le protocole **tcp** pour le mappage de port. Définissez la variable `DD_SITE` sur {{< region-param key="dd_site" code="true" >}}. Le site `datadoghq.com` sera utilisé par défaut si elle n'est pas définie.

2. [Instrumentez votre application][23] en fonction de votre infrastructure.

3. Assurez-vous que votre application s'exécute dans la même définition de tâche que le conteneur de l'Agent Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "ecs_fargate" >}}
 Les descriptions précisent également lorsqu'une métrique est uniquement disponible sur Linux.

### Événements

Le check ECS Fargate n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ecs_fargate" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][22].

## Pour aller plus loin

- Article de blog : [Surveiller des applications AWS Fargate avec Datadog][24]
- FAQ : [Configuration d'intégration pour ECS Fargate][8]
- Article de blog : [Surveiller vos logs de conteneur Fargate avec FireLens et Datadog][25]
- Article de blog : [Métriques clés pour la surveillance d'AWS Fargate][26]
- Article de blog : [Comment recueillir des métriques et des logs à partir de charges de travail AWS Fargate][27]
- Article de blog : [Surveillance d'AWS Fargate avec Datadog][28]
- Article de blog : [Déploiements AWS Fargate à technologie Graviton2][29]
- Article de blog : [Surveiller AWS Fargate pour les applications conteneurisées Windows][30]



[1]: http://docs.datadoghq.com/integrations/eks_fargate
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[3]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[4]: https://aws.amazon.com/cli
[5]: https://aws.amazon.com/console
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[8]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[9]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[10]: https://aws.amazon.com/cloudformation/
[11]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html
[12]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html
[13]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[14]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[15]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[16]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[17]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[18]: https://docs.datadoghq.com/fr/agent/docker/#environment-variables
[19]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[20]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[21]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#data-collected
[22]: https://docs.datadoghq.com/fr/help/
[23]: https://docs.datadoghq.com/fr/tracing/setup/
[24]: https://www.datadoghq.com/blog/monitor-aws-fargate
[25]: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
[26]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[27]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[28]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
[29]: https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/
[30]: https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/
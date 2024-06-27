---
algolia:
  tags:
  - ecs
aliases:
- /fr/agent/amazon_ecs/
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/amazon_ecs/data_collected/#metriques
  tag: Documentation
  text: Recueillir des métriques ECS
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Ajout de la prise en charge d'Amazon ECS Anywhere
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Analysez vos dépenses liées à Kubernetes et ECS avec la solution Cloud Cost
    Management de Datadog
title: Amazon ECS
---

## Présentation

Amazon ECS est un service d'orchestration de conteneurs évolutif et à hautes performances qui prend en charge les conteneurs Docker. Grâce à l'Agent Datadog, vous pouvez surveiller des conteneurs et tâches ECS sur chaque instance EC2 de votre cluster.

Cette page aborde la configuration d'Amazon ECS avec l'Agent de conteneur Datadog. Pour d'autres configurations, consultez les pages suivantes :

- [Configuration de l'Agent de conteneur Datadog v5 pour Amazon ECS][1]
- [Configuration de l'Agent pour host Datadog avec Autodiscovery][2]

**Remarque** : si vous souhaitez configurer **ECS sur Fargate**, consultez les instructions [Amazon ECS sur AWS Fargate][3]. Le conteneur de l'Agent Datadog déployé sur les instances EC2 ne peut pas surveiller les tâches Fargate. De plus, AWS Batch n'est pas pris en charge.

## Implémentation

L'Agent Datadog dans ECS doit être déployé une fois en tant que conteneur sur chaque instance EC2 de votre cluster ECS. Pour ce faire, vous devez créer une définition de tâche pour le conteneur de l'Agent Datadog, puis la déployer en tant que service Daemon. Chaque conteneur de l'Agent Datadog surveille ensuite les autres conteneurs sur leurs instances EC2 respectives.

Si vous n'avez pas configuré un cluster EC2 Container Service, consultez la [section de mise en route de la documentation ECS][4] pour mettre en place un cluster. Une fois la configuration terminée, suivez les instructions ci-dessous.

1. [Créer et ajouter une définition de tâche ECS](#creer-une-tache-ecs)
2. [Planifier l'Agent Datadog en tant que service Daemon](#executer-l-agent-en-tant-que-service-daemon)
3. **Facultatif** [Configurer les fonctionnalités supplémentaires de l'Agent Datadog](#configurer-des-fonctionnalites-supplementaires-de-l-agent)

**Remarque** : la fonction [Autodiscovery][5] de Datadog peut être utilisée avec ECS et Docker afin de découvrir et de surveiller automatiquement les tâches s'exécutant dans votre environnement.

### Créer une tâche ECS

La définition de tâche lance le conteneur de l'Agent Datadog avec les configurations nécessaires. Pour modifier la configuration de l'Agent, mettez à jour la définition de tâche en fonction de vos besoins et redéployez le service Daemon. Vous pouvez configurer la définition de tâche à l'aide des [outils d'interface de ligne de commande d'AWS][9] ou de la console Web d'Amazon.

L'exemple suivant montre comment effectuer une surveillance générale de l'infrastructure avec une configuration minimale. Toutefois, si vous souhaitez découvrir d'autres exemples de définition de tâche où diverses fonctionnalités sont activées, consultez la section [Configurer les fonctionnalités supplémentaires de l'Agent](#configurer-des-fonctionnalites-supplementaires-de-l-agent).

#### Gérer le fichier de définition de tâche

1. Pour les conteneurs Linux, téléchargez le fichier [datadog-agent-ecs.json][20]
    1. Si vous utilisez une AMI Amazon Linux 1 d'origine, utilisez [datadog-agent-ecs1.json][21]
    2. Si vous êtes sous Windows, utilisez [datadog-agent-ecs-win.json][22] 

2. Modifiez votre fichier de définition de tâche de départ
    1. Remplacez `<YOUR_DATADOG_API_KEY>` par la [clé d'API Datadog][14] de votre compte.
    2. Définissez la variable d'environnement `DD_SITE` sur {{< region-param key="dd_site" code="true">}}.

        **Remarque** : si la variable d'environnement `DD_SITE` n'est pas explicitement définie, sa valeur par défaut correspond au site `US`, à savoir `datadoghq.com`. Si vous utilisez l'un des autres sites (`EU`, `US3` ou `US1-FED`) et que vous n'avez pas défini ce paramètre, un message de clé d'API non valide s'affiche. Utilisez le [menu de sélection de site de la documentation][13] pour accéder à la documentation spécifique à votre site.

3. Facultatif :  ajoutez le bloc suivant à la définition de tâche ECS à déployer sur un [cluster ECS Anywhere][15].
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. Facultatif : ajoutez un check de santé de l'Agent à la définition de tâche ECS.
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

Pour tous ces exemples, la variable d'environnement `DD_API_KEY` peut également être spécifiée en référençant l'[ARN d'un secret « en clair » stocké dans AWS Secret Manager][16]. La variable d'environnement `DD_TAGS` permet d'ajouter d'autres tags de votre choix.

#### Enregistrer la définition de tâche

{{< tabs >}}
{{% tab "Interface de ligne de commande AWS" %}}
Une fois votre fichier de définition de tâche créé, vous pouvez exécuter la commande suivante pour l'enregistrer dans AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<chemin vers datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Interface utilisateur Web" %}}
Une fois votre fichier de définition de tâche créé, vous pouvez vous connecter à votre console AWS pour l'enregistrer.
1. Connectez-vous à votre console AWS et accédez à la section Elastic Container Service.
2. Cliquez sur **Task Definitions** sur le côté gauche, puis cliquez ensuite sur le bouton **Create new Task Definition**.
3. Sélectionnez « EC2 » comme type de lancement, ou « External » si vous prévoyez de déployer la tâche de l'Agent sur un cluster ECS Anywhere.
4. Sur la page « Configure task and container definitions », faites défiler l'écran et sélectionnez **Configure via JSON**. De là, vous pouvez copier et coller la configuration depuis votre fichier.
5. Cliquez sur **Save** dans l'onglet JSON.
6. Vous pouvez apporter des modifications supplémentaires depuis cette page ou en répétant le processus **Configure via JSON**.
7. Cliquez sur **Create** en bas pour enregistrer cette définition de tâche.

{{% /tab %}}
{{< /tabs >}}


### Exécuter l'Agent en tant que service Daemon

Dans l'idéal, chaque instance EC2 doit exécuter un conteneur de l'Agent Datadog. Pour y parvenir, nous vous conseillons d'exécuter la définition de tâche de l'Agent Datadog en tant que [service Daemon][10].

#### Planifier un service Daemon dans AWS à l'aide de la tâche ECS de Datadog

1. Connectez-vous à la console AWS et accédez à la section ECS Clusters. Cliquez sur le cluster sur lequel vous exécutez l'Agent.
2. Cliquez sur le bouton **Create** sous « Services » pour créer un service.
3. Pour le type de lancement, sélectionnez « EC2 », puis la définition de tâche précédemment créée.
4. Sélectionnez le type de service `DAEMON`, puis saisissez un nom de service. Cliquez ensuite sur **Next**.
5. Puisque le service s'exécute une fois sur chaque instance, vous n'avez pas besoin d'un répartiteur de charge. Sélectionnez None, puis cliquez sur **Next**.
6. Les services Daemon n'ont pas besoin d'Auto Scaling. Vous pouvez donc cliquer sur **Next Step**, puis sur **Create Service**.

### Configurer des fonctionnalités supplémentaires de l'Agent

La définition de tâche présentée ci-dessus est assez basique. Elle permet de déployer un conteneur de l'Agent avec une configuration de base pour recueillir des métriques générales sur les conteneurs de votre cluster ECS. Cet Agent peut également exécuter des intégrations basées sur des [étiquettes Autodiscovery avec Docker][12] découvertes sur vos conteneurs correspondants.

Si vous utilisez :
- APM : consultez la [documentation relative à la configuration d'APM][6] et l'exemple [datadog-agent-ecs-apm.json][23]
- Log Management : consultez la [documentation relative à la collecte de logs][7] et l'exemple [datadog-agent-ecs-logs.json][24]

#### DogStatsD

Si vous utilisez [DogStatsD][8], mappez le port du host sur 8125/udp dans la définition du conteneur de votre Agent Datadog :
```json
"portMappings": [
  {
    "hostPort": 8125,
    "protocol": "udp",
    "containerPort": 8125
  }
]
```

Une fois le port mappé, définissez la variable d'environnement `DD_DOGSTATSD_STATS_ENABLE` sur `true`.

Cette configuration permet au trafic DogStatsD d'être acheminé depuis les conteneurs d'applications jusqu'au conteneur de l'Agent Datadog en passant par le host et le port du host. Toutefois, le conteneur d'application doit utiliser l'adresse IP privée du host pour ce trafic. Pour ce faire, définissez la variable d'environnement `DD_AGENT_HOST` sur l'adresse IP privée de l'instance EC2, qui peut être récupérée depuis le Service des métadonnées d'instance (IMDS). Une autre solution consiste à définir l'adresse sous forme de code lors de l'initialisation. L'implémentation pour DogStatsD est la même que pour APM. Consultez [Configurer l'endpoint de l'Agent de trace][17] pour obtenir des exemples de configuration de l'endpoint de l'Agent.

Assurez-vous que les paramètres des groupes de sécurité sur vos instances EC2 n'exposent pas publiquement les ports pour APM et DogStatsD.

#### Collecte de processus

Le conteneur de l'Agent Datadog recueille automatiquement les données des live containers. Pour recueillir les données des live processes à partir de tous vos conteneurs et les envoyer à Datadog, modifiez vos définitions de tâches avec la variable d'environnement :

```json
{
  "name": "DD_PROCESS_AGENT_ENABLED",
  "value": "true"
}
```

#### Collecte de données Network Performance Monitoring

**Cette fonction est uniquement disponible sous Linux.**

1. Suivez les [instructions ci-dessus](#creer-une-tache-ecs) pour installer l'Agent Datadog.
   - Si vous procédez à l'installation pour la première fois, vous pouvez utiliser le fichier `[datadog-agent-sysprobe-ecs.json][25] ([datadog-agent-sysprobe-ecs1.json][26], si vous utilisez une AMI Amazon Linux d'origine) conformément aux [instructions ci-dessus](#gerer-le-fichier-de-definition-de-tache). **Remarque** : la configuration initiale du Network Performance Monitoring nécessite l'interface de ligne de commande, car vous ne pouvez pas ajouter `linuxParameters` dans l'interface utilisateur AWS.
2. Si vous avez déjà une définition de tâche, modifiez votre fichier [datadog-agent-ecs.json][20] ([datadog-agent-ecs1.json][21] si vous utilisez une AMI Amazon Linux d'origine) avec la configuration suivante :

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
         {
           "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      },
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```

## Mode AWSVPC

Pour l'Agent 6.10 et les versions ultérieures, le mode `awsvpc` est pris en charge par les conteneurs d'application, tant que les groupes de sécurité autorisent le groupe de sécurité de l'instance de host de se connecter aux conteneurs d'application sur les ports concernés.

Bien qu'il soit possible d'exécuter l'Agent en mode `awsvpc`, nous vous le déconseillons. En effet, il serait difficile de récupérer l'IP de l'interface réseau Elastic afin de communiquer avec l'Agent pour les métriques DogStatsd et les traces APM.

Exécutez plutôt l'Agent en mode Pont, avec le mappage des ports, afin de faciliter la récupération de l'[IP du host via le serveur de métadonnées][6].

{{% site-region region="gov" %}}
#### Proxy FIPS pour les environnements GOVCLOUD

Pour envoyer des données au centre de données GOVCLOUD de Datadog, ajoutez le conteneur sidecar `fips-proxy` et ouvrez les ports du conteneur afin que [les fonctionnalités prises en charge](https://docs.datadoghq.com/agent/configuration/agent-fips-proxy/?tab=helmonamazoneks#supported-platforms-and-limitations) fonctionnent correctement.

**Remarque** : cette fonction est uniquement disponible sous Linux.

```json
 {
   "containerDefinitions": [
     (...)
          {
            "name": "fips-proxy",
            "image": "datadog/fips-proxy:1.1.2",
            "portMappings": [
                {
                    "containerPort": 9803,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9804,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9805,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9806,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9807,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9808,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9809,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9810,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9811,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9812,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9813,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9814,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9815,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9816,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9817,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9818,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_LOCAL_ADDRESS",
                    "value": "127.0.0.1"
                }
            ]
        }
   ],
   "family": "datadog-agent-task"
}
```

Vous devez également mettre à jour les variables d'environnement du conteneur de l'Agent Datadog pour permettre l'envoi de trafic via le proxy FIPS :

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            (...)
            "environment": [
              (...)
                {
                    "name": "DD_FIPS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_HTTPS",
                    "value": "false"
                },
             ],
        },
    ],
   "family": "datadog-agent-task"
}
```
{{< /site-region >}}

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/faq/agent-5-amazon-ecs/
[2]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[3]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/fr/agent/autodiscovery/
[6]: /fr/containers/amazon_ecs/apm/
[7]: /fr/containers/amazon_ecs/logs/
[8]: /fr/developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/fr/help/
[12]: https://docs.datadoghq.com/fr/containers/docker/integrations/?tab=docker
[13]: /fr/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /fr/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
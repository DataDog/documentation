---
description: Installez et configurez le Datadog Agent sur les instances gérées Amazon
  Elastic Container Service
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentation
  text: Recueillir des métriques ECS
- link: /agent/amazon_ecs/tags/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Détectez et corrigez les problèmes ECS plus rapidement avec les monitors par
    défaut et ECS Explorer.
title: Instances gérées Amazon ECS
---
Datadog Container Monitoring permet d'obtenir une visibilité sur les applications exécutées sur des [instances gérées Amazon ECS][29].

### Fonctionnement {#how-it-works}
Pour surveiller vos instances gérées ECS avec Datadog, exécutez le Datadog Agent en tant que **tâche daemon**. Une tâche daemon permet à ECS de déployer automatiquement sur chaque host à mesure que les instances gérées rejoignent votre cluster. Cela permet une visibilité complète sur tous les conteneurs de l'instance sans nécessiter de modifications des définitions de tâche de votre application.

## Configuration {#setup}

<div class="alert alert-info">Cette configuration nécessite Datadog Agent 7.77.0+.</div>

Les instructions suivantes supposent que vous avez configuré un cluster d'instances gérées ECS. Consultez la [documentation sur les instances gérées Amazon ECS pour la création d'un cluster][1].

1. [Créez un fichier de définition de tâche daemon](#create-a-daemon-task-definition-file)
2. [Enregistrez la définition de la tâche daemon](#register-the-daemon-task-definition)
3. [Créez le daemon](#create-the-daemon)

### Créez un fichier de définition de tâche daemon {#create-a-daemon-task-definition-file}

Cette définition de tâche daemon ECS lance le conteneur du Datadog Agent avec les configurations nécessaires.

1. Téléchargez [datadog-agent-ecs-managed-instances-daemon.json][7]. Ce fichier fournit une configuration minimale pour la surveillance de l'infrastructure de base. Pour d'autres exemples de fichiers de définition de tâche daemon avec diverses fonctionnalités activées, consultez la section [Configurer des fonctionnalités d'Agent supplémentaires][27] sur cette page.
2. Modifiez le fichier de définition de tâche daemon :
    - Définissez la variable d'environnement `DD_API_KEY` en remplaçant `<YOUR_DATADOG_API_KEY>` par la [clé d'API Datadog][5] de votre compte. Alternativement, vous pouvez également [fournir l'ARN d'un secret stocké dans AWS Secrets Manager][9].
    - Définissez la variable d'environnement `DD_SITE` sur votre [site Datadog][10]. Votre site est : {{< region-param key="dd_site" code="true" >}}
3. (Facultatif) Pour ajouter un check de santé de l'Agent, ajoutez ce qui suit à votre définition de tâche daemon ECS :
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

### Enregistrez la définition de tâche daemon {#register-the-daemon-task-definition}

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Connectez-vous à votre [console AWS][1] et accédez à la section Elastic Container Service.
2. Sélectionnez {{< ui >}}Daemon Task Definitions{{< /ui >}} dans le volet de navigation. Dans le menu {{< ui >}}Create new daemon task definition{{< /ui >}}, sélectionnez {{< ui >}}Create new daemon task definition with JSON{{< /ui >}}.
3. Dans la zone de l'éditeur JSON, collez le contenu de votre fichier de définition de tâche daemon.
4. Sélectionnez {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Utilisez l'[AWS CLI][1] pour exécuter la commande suivante :

```bash
aws ecs register-daemon-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-daemon.json>
```
[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}


### Créez le daemon {#create-the-daemon}

Le daemon est attaché à un fournisseur de capacité et se déploie automatiquement sur chaque instance gérée de ce fournisseur de capacité.

{{< tabs >}}
{{% tab "Console AWS" %}}
1. Connectez-vous à votre [console Web AWS][1] et accédez à la section Elastic Container Service.
2. Choisissez le cluster sur lequel exécuter le Datadog Agent.
3. Sous l'onglet {{< ui >}}Daemons{{< /ui >}}, cliquez sur {{< ui >}}Create{{< /ui >}}.
4. Pour {{< ui >}}Daemon Task Definition{{< /ui >}}, sélectionnez la définition de tâche daemon créée lors des étapes précédentes.
5. Saisissez un {{< ui >}}Daemon name{{< /ui >}}.
6. Pour {{< ui >}}Capacity Provider{{< /ui >}}, choisissez le fournisseur de capacité associé au cluster.
7. Remplissez le reste des champs facultatifs selon vos préférences.
8. Cliquez sur {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
Utilisez l'[AWS CLI][1] pour exécuter la commande suivante :

```bash
aws ecs create-daemon \
--daemon-name <DAEMON_NAME> \
--daemon-task-definition-arn <DAEMON_TASK_DEFINITION_ARN> \
--cluster-arn <CLUSTER_ARN> \
--capacity-provider-arns <CAPACITY_PROVIDER_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## Configurez des fonctionnalités supplémentaires du Datadog Agent {#set-up-additional-datadog-agent-features}

### Collecte de métriques {#metrics-collection}

Pour activer les intégrations, ajoutez des annotations d'étiquettes Docker à vos conteneurs d'application dans la définition de tâche ECS.

#### Ajouter une intégration {#add-an-integration}

##### Mettre à jour la définition de tâche {#update-the-task-definition}

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Connectez-vous à votre [console Web AWS][1] et accédez à la section ECS.
2. Choisissez le cluster sur lequel votre application s'exécute.
3. Cliquez sur l'onglet {{< ui >}}Tasks{{< /ui >}}, puis cliquez sur le {{< ui >}}Task definition{{< /ui >}} de votre application.
4. Cliquez sur le bouton {{< ui >}}Create new revision{{< /ui >}}.
5. Sous le conteneur de l'application, ajoutez les {{< ui >}}Docker labels{{< /ui >}} suivants :

| Clé                           | Valeur                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

6. Cliquez sur le bouton {{< ui >}}Update{{< /ui >}}, puis cliquez sur le bouton {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}

Ajoutez `dockerLabels` à votre conteneur d'application dans le JSON de définition de tâche, puis enregistrez la nouvelle révision à l'aide de l'[AWS CLI][1] :

```json
{
  "containerDefinitions": [
    {
      "name": "<APP_CONTAINER_NAME>",
      "dockerLabels": {
        "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": <PORT_NUMBER>}]",
        "com.datadoghq.ad.check_names": "[\"<CHECK_NAME>\"]",
        "com.datadoghq.ad.init_configs": "[{}]"
      }
    }
  ]
}
```

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-task-definition.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

##### Mettez à jour le service {#update-the-service}

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Au sein du cluster, cliquez sur l'onglet {{< ui >}}Services{{< /ui >}}, puis cliquez sur le {{< ui >}}Service Name{{< /ui >}}.
2. Cliquez sur le bouton {{< ui >}}Update{{< /ui >}}.
3. Pour {{< ui >}}Task Definition{{< /ui >}}, choisissez le dernier {{< ui >}}Revision{{< /ui >}} dans le menu déroulant.
4. Cliquez sur le bouton {{< ui >}}Update Service{{< /ui >}}.

{{% /tab %}}
{{% tab "AWS CLI" %}}

Utilisez l'[AWS CLI][1] pour mettre à jour le service avec la nouvelle révision de définition de tâche :

```bash
aws ecs update-service --cluster <CLUSTER_NAME> \
--service <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### Exemples {#examples}

{{< tabs >}}
{{% tab "Console AWS" %}}
Utilisez le tableau suivant pour saisir les étiquettes Docker avec la [Console Web AWS][1] pour un conteneur Redis :

| Clé                           | Valeur                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
Utilisez le JSON suivant sous `containerDefinitions` pour configurer un conteneur Redis avec des étiquettes Docker via l'[AWS CLI][1] :

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### Alternative : Montez un fichier de configuration {#alternative-mount-a-configuration-file}

Pour fournir une configuration d'intégration personnalisée, vous pouvez également monter un fichier de configuration directement sur le conteneur du Datadog Agent.

Créez la structure de fichier suivante :

```
|- datadog
  |- Dockerfile
  |- conf.d
    |-redis.yaml
```

Le fichier `redis.yaml` contient les configurations pour l'intégration [Redis][28].

{{< code-block lang="yaml" filename="redis.yaml" disable_copy="false" collapsible="true" >}}
ad_identifiers:
  - redis

init_config:

instances:
    - host: %%host%%
      port: 6379
{{< /code-block >}}

Le `Dockerfile` est utilisé pour construire une image du Datadog Agent et inclure le fichier `redis.yaml` à l'emplacement correct :

{{< code-block lang="Dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
FROM public.ecr.aws/datadog/agent:latest

COPY conf.d/ /etc/datadog-agent/conf.d/
{{< /code-block >}}

Une fois l'image construite et envoyée vers un registre d'images, référencez l'image personnalisée dans la définition de tâche daemon ECS :

```
{
    "containerDefinitions": [
        {
            "image": "<registry-domain>/<namespace-or-account>/<repository>:<tag>",
            "name": "datadog-agent",
            ...
        }
    ],
    ...
}
```

### Collecte de traces (APM) {#trace-collection-apm}

Instrumentez votre application en fonction de votre configuration :

| Langue                           |
|------------------------------------|
| [Java][17] |
| [Python][18] |
| [Ruby][19] |
| [Go][20] |
| [Node.js][21] |
| [PHP][22] |
| [C++][23] |
| [.NET Core][24] |
| [.NET Framework][25] |

#### UDS {#uds}

La méthode recommandée est Unix Domain Socket (UDS). Le daemon Agent expose son socket sur le système de fichiers du host, auquel les tâches de l'application accèdent en montant le même chemin de host.

Consultez l'exemple de fichier [datadog-agent-ecs-managed-instances-daemon-apm.json][37] pour obtenir une définition complète de tâche daemon.

**Mettez à jour la définition de tâche daemon** pour ajouter le volume de host `dd-sockets` et le montage :

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "mountPoints": [
                ...
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

L'Agent conserve les fichiers de socket dans `/var/run/datadog/apm.socket` et `/var/run/datadog/dsd.socket`.

**Mettez à jour chaque définition de tâche d'application** pour monter le même chemin de host et configurer le traceur :

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            ...
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

### Collecte de logs {#log-collection}

La collecte des logs de conteneur via l'agent n'est pas prise en charge en mode démon sur les instances gérées ECS.

Pour collecter les logs de conteneur, utilisez l'une des alternatives suivantes :

- **AWS FireLens** : configurez un sidecar Fluent Bit dans vos définitions de tâche d'application. Consultez la [documentation sur la collecte des logs ECS Fargate][14] pour les instructions de configuration.
- **`awslogs` Pilote de logs** : Acheminez les logs vers Amazon CloudWatch Logs et transférez-les vers Datadog en utilisant le [CloudWatch Logs Lambda forwarder][30] ou un filtre d'abonnement.

### Collecte de processus {#process-collection}

Pour collecter des informations sur les processus en temps réel pour tous vos conteneurs et les envoyer à Datadog, mettez à jour la définition de tâche de démon avec la variable d'environnement `DD_PROCESS_AGENT_ENABLED` :

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
                {
                    "name": "DD_PROCESS_AGENT_ENABLED",
                    "value": "true"
                }
            ]
        }
    ]
}
```

### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
Cette fonctionnalité est uniquement disponible pour Linux.
</div>

Consultez l'exemple de fichier [datadog-agent-ecs-managed-instances-daemon-sysprobe.json][35] pour une définition de tâche de démon complète.

Mettez à jour votre définition de tâche de démon existante pour inclure la configuration suivante :

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
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
            "mountPoints": [
                ...
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug",
                    "readOnly": false
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        }
    ]
}
```

Pour plus d'informations, consultez la documentation [Cloud Network Monitoring][36].

## Migrez de la configuration sidecar vers la configuration démon {#migrate-from-sidecar-to-daemon-setup}

Suivez ces étapes pour migrer du déploiement sidecar hérité vers le déploiement démon.

### 1. Configurez le démon {#1-set-up-the-daemon}

Suivez les instructions de [configuration](#setup) sur cette page pour créer et enregistrer une définition de tâche de démon, puis créez le démon sur votre cluster.

### 2. Supprimez le sidecar du Datadog Agent des définitions de tâche d'application {#2-remove-the-datadog-agent-sidecar-from-application-task-definitions}

Pour chaque définition de tâche d'application qui inclut un conteneur sidecar `datadog-agent`, supprimez l'entrée `datadog-agent` de `containerDefinitions`.

### 3. Mettez à jour la configuration APM {#3-update-apm-configuration}

Le démon Agent expose son socket de trace sur le système de fichiers du host plutôt que via un volume partagé dans la tâche. Mettez à jour chaque définition de tâche d'application pour utiliser le chemin du host.

**Supprimez** le volume vide partagé (`"host": {}`) qui était utilisé dans la configuration sidecar et **remplacez-le** par un volume de chemin de host :

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

Si vous collectiez précédemment des traces via UDP (en utilisant l'adresse `localhost` du sidecar), passez à UDS en utilisant la configuration ci-dessus.

### 4. Mettez à jour la collecte de processus {#4-update-process-collection}

La configuration sidecar utilisait `pidMode: task` pour activer la collecte de processus. La configuration en mode démon utilise plutôt la variable d'environnement `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`.

Supprimez le paramètre `pidMode` de vos définitions de tâche d'application. Confirmez ensuite que la définition de tâche du démon inclut :

```json
{
    "name": "DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED",
    "value": "true"
}
```

### 5. Enregistrez et déployez les définitions de tâche mises à jour {#5-register-and-deploy-the-updated-task-definitions}

Après avoir effectué les modifications ci-dessus, enregistrez chaque définition de tâche d'application mise à jour et redéployez les services associés.

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Dans la console AWS, accédez à {{< ui >}}Elastic Container Service{{< /ui >}} > {{< ui >}}Task Definitions{{< /ui >}}.
2. Sélectionnez votre définition de tâche d'application et cliquez sur {{< ui >}}Create new revision with JSON{{< /ui >}}.
3. Appliquez vos modifications et cliquez sur {{< ui >}}Create{{< /ui >}}.
4. Accédez au service utilisant cette définition de tâche, cliquez sur {{< ui >}}Update{{< /ui >}}, sélectionnez la nouvelle révision, puis cliquez sur {{< ui >}}Update Service{{< /ui >}}.

{{% /tab %}}
{{% tab "AWS CLI" %}}

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-updated-task-definition.json>
aws ecs update-service --cluster <CLUSTER_NAME> --service <SERVICE_NAME> --task-definition <NEW_TASK_DEFINITION_ARN>
```

{{% /tab %}}
{{< /tabs >}}

## Configuration sidecar (héritée) {#sidecar-setup-legacy}

<div class="alert alert-warning">

La planification en mode démon est la méthode de déploiement recommandée pour les instances gérées ECS. Les nouveaux déploiements doivent utiliser la [configuration en mode démon][34] à la place.

</div>

Dans le modèle de déploiement sidecar, le Datadog Agent s'exécute en tant que conteneur supplémentaire au sein de chaque définition de tâche d'application.

### Créez le fichier de définition de tâche {#create-the-task-definition-file}

1. Téléchargez [datadog-agent-ecs-managed-instances-sidecar.json][31]. Ce fichier fournit une configuration minimale pour la surveillance de l'infrastructure de base.
2. Modifiez le fichier de définition de tâche :
    - Définissez la variable d'environnement `DD_API_KEY` en remplaçant `<YOUR_API_KEY>` par la [clé d'API Datadog][5] de votre compte. Alternativement, vous pouvez également [fournir l'ARN d'un secret stocké dans AWS Secrets Manager][9].
    - Définissez la variable d'environnement `DD_SITE` sur votre [site Datadog][10]. Votre site est : {{< region-param key="dd_site" code="true" >}}

### Enregistrez la définition de tâche {#register-the-task-definition}

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Connectez-vous à votre [console AWS][1] et accédez à la section Elastic Container Service.
2. Sélectionnez {{< ui >}}Task Definitions{{< /ui >}} dans le volet de navigation. Dans le menu {{< ui >}}Create new task definition{{< /ui >}}, sélectionnez {{< ui >}}Create new task definition with JSON{{< /ui >}}.
3. Dans la zone de l'éditeur JSON, collez le contenu de votre fichier de définition de tâche.
4. Sélectionnez {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Utilisez l'[AWS CLI][1] pour exécuter la commande suivante :

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-sidecar.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### Exécutez la tâche en tant que service répliqué {#run-the-task-as-a-replica-service}

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Connectez-vous à votre [console Web AWS][1] et accédez à la section Elastic Container Service.
2. Choisissez le cluster sur lequel exécuter le Datadog Agent.
3. Sous l'onglet {{< ui >}}Services{{< /ui >}}, cliquez sur {{< ui >}}Create{{< /ui >}}.
4. Pour {{< ui >}}Task Definition{{< /ui >}}, sélectionnez la tâche créée lors des étapes précédentes.
5. Saisissez un {{< ui >}}Service name{{< /ui >}}.
6. Pour {{< ui >}}Launch type{{< /ui >}}, choisissez {{< ui >}}Capacity Provider{{< /ui >}} et sélectionnez le fournisseur de capacité Managed Instance lié au cluster.
7. Pour {{< ui >}}Number of tasks{{< /ui >}}, saisissez `1`. Cliquez sur {{< ui >}}Next step{{< /ui >}}.
8. Remplissez le reste des champs facultatifs selon vos préférences.
9. Cliquez sur {{< ui >}}Create service{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Utilisez l'[AWS CLI][1] pour exécuter la commande suivante :

```bash
aws ecs create-service --cluster <CLUSTER_NAME> \
--service-name <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN> \
--desired-count 1
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### Collecte de traces (APM) {#trace-collection-apm-1}

#### UDP {#udp}

Pour collecter des traces via UDP, ne définissez pas `DD_AGENT_HOST`. Conservez la valeur `localhost` par défaut.

#### UDS {#uds-1}

Pour collecter des traces via UDS :
1. Ajoutez un volume vide à la définition de tâche en utilisant le paramètre `volumes`.
2. Montez le volume sur l'agent et le conteneur d'application en utilisant le paramètre `mountPoints`.
3. Configurez la variable d'environnement `DD_DOGSTATSD_SOCKET` sur le conteneur d'application et définissez-la sur `/var/run/datadog/dsd.socket`.

**Exemple** : Définitions de conteneur qui configurent la collecte de traces via UDS

```json
{
    "containerDefinitions": [
        {
            "image": "public.ecr.aws/datadog/agent:latest",
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "datadog-agent",
            ...
        },
        {
            "environment": [
                {
                    "name": "DD_DOGSTATSD_SOCKET",
                    "value": "/var/run/datadog/dsd.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "app",
            ...
        }
    ],
    "volumes": [
        {
            "host": {},
            "name": "dd-sockets"
        }
    ]
}
```

### Collecte de processus {#process-collection-1}

Vous pouvez surveiller les processus dans les instances gérées ECS dans Datadog en utilisant la [page Live Processes][32]. Pour activer la collecte de processus, ajoutez le [`PidMode` paramètre][33] dans la définition de tâche et définissez-le sur `task` comme suit :

```json
"pidMode": "task"
```

## Dépannage {#troubleshooting}

Besoin d'aide ? Contactez le [support Datadog][26].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-managed-instances.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /fr/resources/json/datadog-agent-ecs-managed-instances-daemon.json
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[10]: /fr/getting_started/site/
[14]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=awscli#log-collection
[17]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[18]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[19]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[20]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[21]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[22]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[23]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[24]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[25]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[26]: https://docs.datadoghq.com/fr/help/
[27]: #set-up-additional-datadog-agent-features
[28]: https://docs.datadoghq.com/fr/integrations/redis/?tab=ecs
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ManagedInstances.html
[30]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[31]: /fr/resources/json/datadog-agent-ecs-managed-instances-sidecar.json
[32]: /fr/process
[33]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[34]: #setup
[35]: /fr/resources/json/datadog-agent-ecs-managed-instances-daemon-sysprobe.json
[36]: /fr/network_monitoring/cloud_network_monitoring/
[37]: /fr/resources/json/datadog-agent-ecs-managed-instances-daemon-apm.json
---
title: Amazon ECS
kind: documentation
aliases:
  - /fr/integrations/amazon_ecs/
further_reading:
  - link: /agent/amazon_ecs/logs/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/amazon_ecs/apm/
    tag: Documentation
    text: Recueillir les traces de vos applications
  - link: '/agent/amazon_ecs/data_collected/#metriques'
    tag: Documentation
    text: Recueillir des métriques ECS
---
## Présentation

Amazon ECS est un service d'orchestration de conteneurs hautement évolutif et performant qui prend en charge les conteneurs Docker. Grâce à l'Agent Datadog, vous pouvez surveiller des conteneurs et tâches ECS sur chaque instance EC2 de votre cluster.

Cette page aborde la configuration d'Amazon ECS avec l'[Agent de conteneur Datadog v6][1]. Pour d'autres configurations, consultez les pages suivantes :

- [Configuration de l'Agent de conteneur Datadog v5 pour Amazon ECS][2]
- [Configuration de l'Agent pour host Datadog avec Autodiscovery][3]

**Remarque** : **si vous souhaitez configurer ECS sur Fargate, suivez [cette documentation][4].**

## Configuration

Pour commencer la configuration, exécutez l'[Agent Datadog][5] sur chaque instance EC2 de votre cluster ECS. Si vous n'avez pas configuré un cluster EC2 Container Service, consultez la [section de mise en route de la documentation ECS][6] pour définir un cluster. Une fois la configuration terminée, suivez les instructions ci-dessous.

1. [Créer et ajouter une tâche ECS](#create-an-ecs-task)
2. [Créer ou modifier votre stratégie IAM](#create-or-modify-your-iam-policy)
3. [Planifier l'Agent Datadog en tant que service Daemon](#run-the-agent-as-a-daemon-service)
4. **Facultatif** : [configurer la collecte de processus](#collecte-de-processus)
5. **Facultatif** : [configurer la collection de données réseau (NPM)](#collecte-de-donnees-reseau-npm)

**Remarque** : la fonction [Autodiscovery][7] de Datadog peut être utilisée avec ECS et Docker afin de découvrir et de surveiller automatiquement les tâches s'exécutant dans votre environnement.

### Créer une tâche ECS

Cette tâche lance le conteneur Datadog. Si vous devez modifier la configuration, changez la définition de cette tâche en suivant les instructions indiquées [plus loin dans ce guide](#creer-ou-modifier-votre-strategie-iam).

Si vous utilisez l'[APM][8], [DogStatsD][9] ou [Log Management][10], définissez les flags adéquats dans la définition de votre tâche :

  - Si vous utilisez l'APM, définissez `portMappings` afin que vos conteneurs en aval puissent transmettre des traces au service de l'Agent. L'APM reçoit les traces via `TCP` sur le port `8126`. Utilisez donc ces paramètres pour configurer le `hostPort` dans la définition de la tâche.

**Remarque** : pour activer la collecte de traces à partir d'autres conteneurs, vous devez vous assurer que la variable d'environnement `DD_APM_NON_LOCAL_TRAFFIC` est définie sur `true`. En savoir plus sur [l'utilisation de l'APM avec des conteneurs][11].

  - Si vous utilisez DogStatsD, définissez le `hostPort` sur `UDP` et `8125` dans la définition de votre tâche.

**Remarque** : pour activer la collecte de métriques avec DogStatsD à partir d'autres conteneurs, assurez-vous que la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` est définie sur `true`.

  - Si vous utilisez Log Management, consultez la [documentation dédiée à la collecte de logs][10].

Vérifiez bien les réglages de groupe de sécurité pour vos instances EC2. Assurez-vous que ces ports ne sont pas publiquement accessibles. Datadog utilise une IP privée pour transmettre les données des conteneurs à l'Agent.

Configurez la tâche à l'aide des [outils del 'interface de ligne de commande AWS][12] ou de la console Web d'Amazon.

{{< tabs >}}
{{% tab "Interface de ligne de commande AWS" %}}

1. Pour les conteneurs Linux, téléchargez [datadog-agent-ecs.json][1] ([datadog-agent-ecs1.json][2] si vous utilisez une AMI Amazon Linux 1 d'origine). Pour Windows, téléchargez [datadog-agent-ecs-win.json][3].
2. Modifiez `datadog-agent-ecs.json` et remplacez `<YOUR_DATADOG_API_KEY>` par la [clé d'API Datadog][4] de votre compte.
3. Facultatif : ajoutez un [check de santé de l'Agent](#check-de-sante-de-l-agent).

    Ajoutez le bloc suivant à la définition de votre tâche ECS pour créer un check de santé de l'Agent :

    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

4. Facultatif : si vous êtes sur le site européen de Datadog, modifiez `datadog-agent-ecs.json` et définissez `DD_SITE` sur `DD_SITE:datadoghq.eu`.
5. Facultatif : activez la collecte de logs en consultant la [rubrique dédiée][5].
6. Facultatif : activez la collecte de processus en consultant la [rubrique dédiée](#collecte-de-processus).
7. Facultatif : activez la collecte de traces (APM) en consultant la [rubrique dédiée][6].
8. Facultatif : activez la collecte de données réseau (NPM) en consultant la [rubrique dédiée](#collecte-pour-la-surveillance-des-performances-reseau).
9. Exécutez la commande suivante :

```bash
aws ecs register-task-definition --cli-input-json <chemin vers datadog-agent-ecs.json>
```

[1]: /resources/json/datadog-agent-ecs.json
[2]: /resources/json/datadog-agent-ecs1.json
[3]: /resources/json/datadog-agent-ecs-win.json
[4]: https://app.datadoghq.com/account/settings#api
[5]: /fr/agent/amazon_ecs/logs/
[6]: /fr/agent/amazon_ecs/apm/
{{% /tab %}}
{{% tab "Interface utilisateur Web" %}}

1. Connectez-vous à votre console AWS et accédez à la section EC2 Container Service.
2. Cliquez sur le cluster pour lequel vous souhaitez ajouter Datadog.
3. Cliquez sur **Task Definitions** sur le côté gauche, puis cliquez ensuite sur le bouton **Create new Task Definition**.
4. Saisissez un **Task Definition Name**, tel que `datadog-agent-task`.
5. Cliquez sur le lien **Add volume**.
6. Pour **Name**, saisissez `docker_sock`. Pour **Source Path**, saisissez `/var/run/docker.sock` sous Linux ou `\\.\pipe\docker_engine` sous Windows. Cliquez sur **Add**.
7. Pour Linux uniquement, ajoutez un autre volume avec le nom `proc` et le chemin source `/proc/`.
8. Pour Linux uniquement, ajoutez un autre volume avec le nom `cgroup` et le chemin source `/sys/fs/cgroup/` (ou `/cgroup/` si vous utilisez une AMI Amazon Linux 1 d'origine).
9. Cliquez sur le gros bouton **Add container**.
10. Pour **Container name**, saisissez `datadog-agent`.
11. Pour le champ **Image**, saisissez `gcr.io/datadoghq/agent:latest`.
12. Pour **Maximum memory**, indiquez `256`. **Remarque** : en cas d'utilisation intense des ressources, il se peut que vous ayez besoin de rehausser la limite de mémoire.
13. Faites défiler jusqu'à atteindre la section **Advanced container configuration**, puis saisissez `10` pour **CPU units**.
**Remarque** : pour Windows, pour **CPU units**, saisissez au moins `512`, afin d'éviter l'erreur `Timeout while starting the service`.
14. Pour **Env Variables**, ajoutez la **clé** `DD_API_KEY` et indiquez votre clé d'API Datadog en valeur. *Si vous préférez stocker ce type de secrets dans S3, consultez [le guide de configuration d'ECS][1].*
15. Ajoutez une variable d'environnement supplémentaire pour chaque tag à ajouter en utilisant la clé `DD_TAGS`.
16. Faites défiler jusqu'à atteindre la section **Storage and Logging**.
17. Dans **Mount points**, sélectionnez le volume source **docker_sock** et indiquez comme chemin du conteneur `/var/run/docker.sock` pour Linux ou `\\.\pipe\docker_engine` pour Windows. Cochez ensuite la case **Read only**.
18. Pour Linux uniquement, ajoutez un point de montage supplémentaire pour **proc** et saisissez `/host/proc/` dans le chemin du conteneur. Cochez la case **Read only**.
19. Linux uniquement : ajoutez un troisième point de montage pour **cgroup** et indiquez `/host/sys/fs/cgroup` dans le chemin du conteneur. Cochez la case **Read only**.

**Remarque** : si vous définissez la tâche Datadog de façon à utiliser 10 « CPU units », la métrique `aws.ecs.cpuutilization` pour `service:datadog-agent` peut afficher un pourcentage d'utilisation du processeur de 1000 %. Cela est dû à la façon dont AWS affiche la charge processeur. Vous pouvez ajouter davantage de « CPU units » pour corriger votre graphique.

[1]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
{{% /tab %}}
{{< /tabs >}}

### Créer ou modifier votre stratégie IAM

Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][13] afin de recueillir des métriques Amazon ECS. Pour en savoir plus sur les stratégies ECS, consultez [la documentation du site Web d'AWS][14].

| Autorisation AWS                   | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | Renvoie la liste des clusters existants.                          |
| `ecs:ListContainerInstances`     | Renvoie la liste des instances de conteneur dans un cluster précis. |
| `ecs:ListServices`               | Énumère les services qui s'exécutent sur un cluster précis.   |
| `ecs:DescribeContainerInstances` | Décrit les instances de conteneur Amazon ECS.                     |

### Exécuter l'Agent en tant que service Daemon

Dans l'idéal, l'Agent Datadog charge un conteneur sur chaque instance EC2. Pour y parvenir, nous vous conseillons d'exécuter l'Agent Datadog en tant que [service Daemon][15].

#### Planifier un service Daemon dans AWS à l'aide de la tâche ECS de Datadog

1. Connectez-vous à la console AWS et accédez à la section ECS Clusters. Cliquez sur le cluster sur lequel vous exécutez l'Agent.
2. Cliquez sur le bouton **Create** sous « Services » pour créer un service.
3. Pour le type de lancement, sélectionnez « EC2 », puis la définition de tâche précédemment créée.
4. Sélectionnez le type de service `DAEMON`, puis saisissez un nom de service. Cliquez ensuite sur **Next**.
5. Puisque le service s'exécute une fois sur chaque instance, vous n'avez pas besoin d'un répartiteur de charge. Sélectionnez None, puis cliquez sur **Next**.
6. Les services Daemon n'ont pas besoin d'Auto Scaling. Vous pouvez donc cliquer sur **Next Step**, puis sur **Create Service**.

### Collecte de processus

Pour recueillir des informations sur les processus pour l'ensemble de vos conteneurs et les envoyer à Datadog :

{{< tabs >}}
{{% tab "Linux" %}}

1. Suivez les [instructions ci-dessus](#interface-de-ligne-de-commande-d-aws) pour installer l'Agent Datadog.
2. Modifiez votre fichier [datadog-agent-ecs.json][1] ([datadog-agent-ecs1.json][2] si vous utilisez une AMI Amazon Linux d'origine) avec la configuration suivante :

```json
{
  "containerDefinitions": [
   {
      (...)
      "mountPoints": [
        {
          (...)
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "docker_sock",
          "readOnly": true
        },
        {
        (...)
        }
      ],
      "environment": [
        (...)
        {
          "name": "DD_API_KEY",
          "value": "<VOTRE_CLÉ_API_DATADOG>"
        }
      ]
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "docker_sock"
    },
    (...)
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
{{% /tab %}}
{{% tab "Windows" %}}

1. Suivez les [instructions ci-dessus](#interface-de-ligne-de-commande-d-aws) pour installer l'Agent Datadog.
2. Modifiez votre fichier [datadog-agent-ecs-win.json][1] avec la configuration suivante :

```json
{
  "containerDefinitions": [
    (...)
      "environment": [
        (...)
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
{{% /tab %}}
{{< /tabs >}}

### Collecte de données réseau (NPM)

**Cette fonction est uniquement disponible sous Linux.**

 1. Suivez les [instructions ci-dessus](#interface-de-ligne-de-commande-d-aws) pour installer l'Agent Datadog.
  - Si vous procédez à l'installation pour la première fois, il existe un fichier `datadog-agent-ecs.json`, [datadog-agent-sysprobe-ecs.json][16] ([datadog-agent-sysprobe-ecs1.json][17] si vous utilisez une AMI Amazon Linux d'origine), à utiliser avec les [instructions ci-dessus](#interface-de-ligne-de-commande-d-aws). Notez que la configuration initiale de la surveillance des performances réseau nécessite l'interface de ligne de commande, car vous ne pouvez pas ajouter `linuxParameters` dans l'interface utilisateur AWS.
 2. Si vous avez déjà une définition de tâche, modifiez votre fichier [datadog-agent-ecs.json][18] ([datadog-agent-ecs1.json][19] si vous utilisez une AMI Amazon Linux d'origine) avec la configuration suivante :

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
           "name": "DD_SYSTEM_PROBE_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN"
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

Pour l'Agent 6.10 et les versions ultérieures, le mode `awsvpc` est pris en charge par les conteneurs d'application, tant que les groupes de sécurité sont configurés pour permettre au groupe de sécurité des instances de host de se connecter aux conteneurs d'application sur les ports concernés.

Bien qu'il soit possible d'exécuter l'Agent en mode `awsvpc`, nous vous le déconseillons. En effet, il serait difficile de récupérer l'IP de l'interface réseau Elastic afin d'accéder à l'Agent pour les métriques DogStatsd et les traces de l'APM.

Exécutez plutôt l'Agent en mode Pont, avec le mappage des ports, afin de faciliter la récupération des [IP des hosts via le serveur de métadonnées][8].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][20].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/fr/integrations/faq/agent-5-amazon-ecs/
[3]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[4]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/
[5]: https://hub.docker.com/r/datadog/agent
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[7]: https://docs.datadoghq.com/fr/agent/autodiscovery/
[8]: /fr/agent/amazon_ecs/apm/
[9]: /fr/developers/dogstatsd/
[10]: /fr/agent/amazon_ecs/logs/
[11]: https://docs.datadoghq.com/fr/tracing/setup/docker/
[12]: https://aws.amazon.com/cli
[13]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#datadog-aws-iam-policy
[14]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[15]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[16]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs.json
[17]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs1.json
[18]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[19]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[20]: https://docs.datadoghq.com/fr/help/
---
aliases:
  - /fr/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez les statuts des conteneurs, mesurez l''utilisation des ressources, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ecs/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/amazon-ecs-metrics'
    tag: Blog
    text: Métriques ECS clés à surveiller
  - link: 'https://github.com/DataDog/datadog-trace-agent'
    tag: GitHub
    text: Code source de l'Agent de trace
git_integration_title: amazon_ecs
has_logo: true
integration_title: Amazon Elastic Container Service
is_public: true
kind: intégration
manifest_version: '1.0'
name: amazon_ecs
public_title: Intégration Datadog/Amazon Elastic Container Service
short_description: 'Surveillez les statuts des conteneurs, mesurez l''utilisation des ressources, et plus encore.'
version: '1.0'
---
## Présentation
Amazon Elastic Container Service (ECS) est un service d'orchestration de conteneurs hautement évolutif et à hautes performances pour des conteneurs Docker s'exécutant sur des instances EC2.

## Implémentation

Cette page couvre la configuration d'AWS ECS avec [l'Agent v6 de Datadog][1]. Pour utiliser l'Agent v5 de Datadog, consultez la page de documentation relative à la [configuration d'AWS ECS avec l'Agent v5][2].

Pour surveiller vos conteneurs et tâches ECS avec Datadog, exécutez l'Agent en tant que conteneur sur chaque instance EC2 de votre cluster ECS. Voici les différentes étapes de configuration à suivre :

1. **Créer une tâche ECS**
2. **Créer ou modifier votre stratégie IAM**
3. **Planifier l'Agent Datadog en tant que service Daemon**

Si vous n'avez pas encore configuré de cluster EC2 Container Service, consultez la [section de mise en route de la documentation ECS][3].

### Collecte de métriques
#### Créer une tâche ECS

Cette tâche lance le conteneur Datadog. Si vous devez modifier la configuration, changez la définition de cette tâche en suivant les instructions indiquées plus loin dans ce guide. Si vous utilisez l'APM, DogStatsD ou des logs, définissez les flags appropriés dans la définition de la tâche :

* Si vous utilisez l'APM, définissez `portMappings` afin que vos conteneurs en aval puissent transmettre des traces au service de l'Agent. L'APM reçoit les traces avec les ports `8126` et `TCP`. Configurez donc ces ports sur `hostPort` dans la définition de la tâche. Attention : pour activer la collecte de traces à partir d'autres conteneurs, vous devez vous assurer que la variable d'environnement `DD_APM_NON_LOCAL_TRAFFIC` est définie sur `true`. En savoir plus sur [l'utilisation de l'APM avec des conteneurs][24].

* Si vous utilisez DogStatsD, configurez un `hostPort` de `8125` en tant que `UDP` dans la définition de la tâche. Pour activer la collecte de métriques avec DogStatsD à partir d'autres conteneurs, vous devez vous assurer que la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` est définie sur `true`.

* Si vous utilisez des logs, consultez la [documentation relative à la collecte de logs](#collecte-de-logs).

Vérifiez bien les réglages de groupe de sécurité pour vos instances EC2. Assurez-vous que ces ports ne sont pas publiquement accessibles. Datadog utilise une IP privée pour transmettre les données des conteneurs à l'Agent.

Vous pouvez configurer la tâche à l'aide des [outils d'AWS CLI][4] ou de la console Web d'Amazon.

##### AWS CLI

1. Téléchargez [datadog-agent-ecs.json][5] ([datadog-agent-ecs1.json][25] si vous utilisez une AMI Amazon Linux d'origine).
2. Modifiez `datadog-agent-ecs.json` et remplacez `<YOUR_DATADOG_API_KEY>` par la [clé API Datadog][6] de votre compte.
3. Si vous êtes sur le site européen de Datadog, vous pouvez également modifier `datadog-agent-ecs.json` et remplacer `DD_SITE` par `DD_SITE:datadoghq.eu`.
4. Vous pouvez activer la collecte de logs en consultant la [rubrique dédiée](#collecte-de-logs).
5. Enfin, vous pouvez activer la collecte de processus en consultant la [rubrique dédiée][#collecte-de-processus].

6. Exécutez la commande suivante :
```
aws ecs register-task-definition --cli-input-json file://chemin/vers/ecs-agent-datadog.json
```

##### Interface utilisateur Web

1. Connectez-vous à votre console AWS et accédez à la section EC2 Container Service.
2. Cliquez sur le cluster pour lequel vous souhaitez ajouter Datadog.
3. Cliquez sur **Task Definitions** sur le côté gauche, puis cliquez ensuite sur le bouton **Create new Task Definition**.
4. Saisissez un **nom de définition de tâche**, tel que ```datadog-agent-task```.
5. Cliquez sur le lien **Add volume**.
6. Pour **Name**, saisissez ```docker_sock```. Pour **Source Path**, saisissez ```/var/run/docker.sock```. Cliquez sur **Add**.
7. Ajoutez un autre volume avec le nom ```proc``` et le chemin de source ```/proc/```.
8. Ajoutez un autre volume avec le nom ```cgroup``` et le chemin de source ```/cgroup/```.
9. Cliquez sur le gros bouton **Add container**.
10. Pour **Container name**, saisissez ```datadog-agent```.
11. Pour **Image**, saisissez ```datadog/agent:latest```.
12. Pour **Maximum memory**, indiquez ```256```.
13. Faites défiler jusqu'à atteindre la section **Advanced container configuration** et saisissez ```10``` dans le champ **CPU units**.
14. Pour **Env Variables**, ajoutez la **clé** ```DD_API_KEY``` et indiquez votre clé d'API Datadog en valeur. *Si vous préférez stocker vos secrets de cette façon dans S3, consultez [le guide de configuration d'ECS][7].*
15. Ajoutez une variable d'environnement supplémentaire pour chaque tag à ajouter en utilisant la clé ```DD_TAGS```.
16. Faites défiler jusqu'à atteindre la section **Storage and Logging**.
17. Dans **Mount points**, sélectionnez le volume de source **docker_sock** et indiquez ```/var/run/docker.sock``` dans le chemin du conteneur. Cochez ensuite la case **Read only**.
18. Ajoutez un point de montage supplémentaire pour **proc** et saisissez ```/host/proc/``` dans le chemin du conteneur. Cochez la case **Read only**.
19. Ajoutez un troisième point de montage pour **cgroup** et indiquez ```/host/sys/fs/cgroup``` dans le chemin du conteneur. Cochez la case **Read only**.

**Remarque** : si vous définissez la tâche Datadog de façon à utiliser 10 « CPU units », le paramètre `aws.ecs.cpuutilization` de `service:datadog-agent` peut afficher une exécution de 1 000 %. Cela est dû à une particularité de l'affichage de l'utilisation de processeur par AWS. Vous pouvez ajouter davantage de « CPU units » pour corriger votre graphique.

#### Créer ou modifier votre stratégie IAM

1. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][8] afin de recueillir des métriques Amazon ECS. Pour en savoir plus sur les stratégies ECS, [consultez la documentation du site Web d'AWS][9].

    | Autorisation AWS                   | Description                                                                                          |
    |----------------------------------|------------------------------------------------------------------------------------------------------|
    | `ecs:ListClusters`               | Énumère tous les clusters disponibles.                                                                             |
    | `ecs:ListContainerInstances`     | Énumère les instances d'un cluster.                                                                         |
    | `ecs:DescribeContainerInstances` | Décrit les instances pour ajouter des métriques sur les ressources et les tâches s'exécutant, et ajoute un tag de cluster aux instances EC2. |

#### Exécuter l'Agent en tant que service Daemon

Dans l'idéal, l'Agent Datadog charge un conteneur sur chaque instance EC2. Pour y parvenir, nous vous recommandons d'exécuter l'Agent Datadog en tant que [service Daemon][21].

##### Planifier un service Daemon dans AWS à l'aide de la tâche ECS de Datadog

1. Connectez-vous à la console AWS et accédez à la section ECS Clusters. Cliquez sur le cluster sur lequel vous exécutez l'Agent.
2. Cliquez sur le bouton **Create** sous « Services » pour créer un service.
3. Pour le type de lancement, sélectionnez « EC2 », puis la définition de tâche précédemment créée.
4. Sélectionnez le type de service `DAEMON`, puis saisissez un nom de service. Cliquez ensuite sur **Next**.
5. Puisque le service s'exécute une fois sur chaque instance, vous n'avez pas besoin d'un répartiteur de charge. Sélectionnez None, puis cliquez sur **Next**.
6. Les services Daemon n'ont pas besoin d'Auto Scaling. Vous pouvez donc cliquer sur **Next Step**, puis sur **Create Service**.

#### Détection dynamique et surveillance des services en cours d'exécution

La fonction [Autodiscovery][23] de Datadog peut être utilisée avec ECS et Docker afin de détecter et de surveiller automatiquement des tâches s'exécutant dans votre environnement.

#### Mode AWSVPC

Pour l'Agent v6.10+, le mode AWSVPC est pris en charge à la fois pour les conteneurs applicatifs et pour le conteneur de l'Agent, sous réserve des conditions suivantes :

1. Pour les applications et l'Agent en mode AWSVPC, les groupes de sécurité doivent être configurés pour permettre :
  * au groupe de sécurité de l'Agent d'atteindre les conteneurs applicatifs sur les ports concernés.
  * au groupe de sécurité de l'Agent d'atteindre les instances host sur le port TCP 51678. Le conteneur de l'Agent ECS doit s'exécuter en mode réseau host (par défaut) ou avoir un port relié au host.
<br><br>
2. Pour les applications en mode AWSVPC et l'Agent en mode pont, les groupes de sécurité doivent être configurés pour permettre au groupe de sécurité des instances host d'atteindre les conteneurs applicatifs sur les ports concernés.

### Collecte de logs

Pour recueillir tous les logs rédigés par des applications s'exécutant dans vos conteneurs ECS et les envoyer à votre application Datadog :

1. Suivez les [instructions ci-dessus](#aws-cli) pour installer l'Agent Datadog.
2. Modifiez votre fichier `datadog-agent-ecs.json` avec la configuration suivante :

```
{
    "containerDefinitions": [
    (...)
      "mountPoints": [
        (...)
        {
          "containerPath": "/opt/datadog-agent/run",
          "sourceVolume": "pointdir",
          "readOnly": false
        },
        (...)
      ],
      "environment": [
        (...)
        {
          "name": "DD_LOGS_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
          "value": "true"
        },
        (...)
      ]
    }
  ],
  "volumes": [
    (...)
    {
      "host": {
        "sourcePath": "/opt/datadog-agent/run"
      },
      "name": "pointdir"
    },
    (...)
  ],
  "family": "datadog-agent-task"
}
```

#### Activer la collecte de logs pour une intégration

L'attribut `source` est utilisé pour identifier l'intégration à utiliser pour chaque conteneur. Contournez-le directement dans les étiquettes de vos conteneurs pour commencer à utiliser la [collecte de logs pour une intégration][20]. Lisez [le guide sur Autodiscovery pour les logs] de Datadog pour en savoir plus sur ce processus.

### Collecte de processus

Pour recueillir des informations sur les processus pour l'ensemble de vos conteneurs et les envoyer à Datadog :

1. Suivez les [instructions ci-dessus](#aws-cli) pour installer l'Agent Datadog.
2. Modifiez votre fichier `datadog-agent-ecs.json` avec la configuration suivante :

```
{
  "containerDefinitions": [
    (...)
      "mountPoints": [
        (...)
        {
          "containerPath": "/etc/passwd",
          "sourceVolume": "passwd",
          "readOnly": true
        },
        (...)
      ],
      "environment": [
        (...)
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "volumes": [
    (...)
    {
      "host": {
        "sourcePath": "/etc/passwd"
      },
      "name": "passwd"
    },
    (...)
  ],
  "family": "datadog-agent-task"
}

```

### Collecte de traces

Une fois l'Agent Datadog installé, activez [datadog-trace-agent][26] en configurant les paramètres suivants dans la définition de tâche pour le conteneur `datadog/agent` :

- Mappage de port : host/conteneur port `8126`, protocole `tcp`
- Variables d'environnement : `DD_APM_ENABLED=true`, `DD_APM_NON_LOCAL_TRAFFIC=true` (cela active la collecte de traces depuis d'autres conteneurs).

#### Conteneur d'application

[L'endpoint de métadonnées EC2 d'Amazon][27] vous permet de découvrir l'adresse IP privée de chaque instance sous-jacente sur laquelle vos conteneurs s'exécutent. Configurez cette adresse IP comme votre hostname d'Agent de trace dans votre conteneur d'application afin de pouvoir transmettre les traces à l'Agent.

Pour obtenir l'adresse IP privée de chaque host, effectuez un cURL sur l'URL suivante, puis définissez le résultat comme la variable d'environnement de hostname de votre Agent de Trace pour chaque conteneur d'application transmis à l'APM :

```
curl http://169.254.169.254/latest/meta-data/local-ipv4
```

Vous pouvez également définir le hostname dans le code source de votre application :

{{< tabs >}}
{{% tab "Python" %}}

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const tracer = require('dd-trace')
const request = require('request')

request('http://169.254.169.254/latest/meta-data/local-ipv4', function (error, resp, body)  {
  tracer.init({hostname: body})
})
```

{{% /tab %}}
{{< /tabs >}}

Pour découvrir davantage d'exemples afin de définir le hostname de l'Agent dans d'autres langages, consultez la section [Modifier le hostname de l'Agent][28].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ecs" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

Pour réduire les données parasites, l'intégration AWS ECS est automatiquement configurée de façon à inclure les événements qui contiennent les termes suivants : `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot` et `terminate`. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Événements AWS ECS" responsive="true">}}

Pour supprimer ce filtre et recevoir tous les événements de votre intégration Datadog/AWS ECS, contactez [l'assistance Datadog][15].

### Checks de service
L'intégration AWS ECS n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][15].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/
[2]: https://docs.datadoghq.com/fr/integrations/faq/agent-5-amazon-ecs
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[4]: https://aws.amazon.com/cli/
[5]: /fr/json/datadog-agent-ecs.json
[6]: https://app.datadoghq.com/account/settings#api
[7]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[10]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html
[11]: https://docs.datadoghq.com/fr/logs/docker/
[12]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html#w2ab1c21c21c13
[13]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[14]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[15]: https://docs.datadoghq.com/fr/help/
[18]: https://docs.datadoghq.com/fr/logs/log_collection/docker/?tab=containerinstallation#activate-log-integrations
[19]: /fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[20]: https://docs.datadoghq.com/fr/logs/processing/#log-processing
[21]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[22]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[23]: https://docs.datadoghq.com/fr/agent/autodiscovery/
[24]: https://docs.datadoghq.com/fr/tracing/setup/docker/
[25]: /fr/json/datadog-agent-ecs1.json
[26]: https://github.com/DataDog/datadog-trace-agent
[27]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[28]: https://docs.datadoghq.com/fr/tracing/advanced_usage/?tab=java#change-agent-hostname


{{< get-dependencies >}}
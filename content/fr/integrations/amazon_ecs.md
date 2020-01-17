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
    text: Key ECS metrics to monitor
  - link: 'https://github.com/DataDog/datadog-trace-agent'
    tag: GitHub
    text: Code source de l'Agent de trace
git_integration_title: amazon_ecs
has_logo: true
integration_title: Amazon Elastic Container Service (ECS)
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ecs
public_title: "Intégration Datadog/Amazon\_Elastic\_Container\_Service (ECS)"
short_description: 'Surveillez les statuts des conteneurs, mesurez l''utilisation des ressources, et plus encore.'
version: '1.0'
---
## Présentation
Amazon Elastic Container Service (ECS) est un service d'orchestration de conteneurs hautement évolutif et à hautes performances pour des conteneurs Docker s'exécutant sur des instances EC2.

Cette page aborde la configuration d'AWS ECS avec l'[Agent de conteneur Datadog v6][1]. Pour d'autres configurations, consultez les pages suivantes :

* [Configuration de l'Agent de conteneur Datadog v5 pour AWS ECS][2]
* [Configuration de l'Agent pour host Datadog avec Autodiscovery][3]

## Implémentation

Pour surveiller vos conteneurs et tâches ECS avec Datadog, exécutez l'Agent en tant que conteneur sur chaque instance EC2 de votre cluster ECS. Voici les différentes étapes de configuration à suivre :

1. **Créer une tâche ECS**
2. **Créer ou modifier votre stratégie IAM**
3. **Planifier l'Agent Datadog en tant que service Daemon**

Si vous n'avez pas encore configuré un cluster EC2 Container Service, consultez la [section de mise en route de la documentation ECS][4].

### Collecte de métriques
#### Créer une tâche ECS

Cette tâche lance le conteneur Datadog. Si vous devez modifier la configuration, changez la définition de cette tâche en suivant les instructions indiquées plus loin dans ce guide. Si vous utilisez l'APM, DogStatsD ou des logs, définissez les flags appropriés dans la définition de la tâche :

* Si vous utilisez l'APM, définissez `portMappings` afin que vos conteneurs en aval puissent transmettre des traces au service de l'Agent. L'APM reçoit les traces avec les ports `8126` et `TCP`. Configurez donc ces ports sur `hostPort` dans la définition de la tâche. Attention : pour activer la collecte de traces à partir d'autres conteneurs, vous devez vous assurer que la variable d'environnement `DD_APM_NON_LOCAL_TRAFFIC` est définie sur `true`. En savoir plus sur [l'utilisation de l'APM avec des conteneurs][5].

* Si vous utilisez DogStatsD, configurez un `hostPort` de `8125` en tant que `UDP` dans la définition de la tâche. Pour activer la collecte de métriques avec DogStatsD à partir d'autres conteneurs, vous devez vous assurer que la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` est définie sur `true`.

* Si vous utilisez des logs, consultez la [documentation relative à la collecte de logs](#collecte-de-logs).

Vérifiez bien les réglages de groupe de sécurité pour vos instances EC2. Assurez-vous que ces ports ne sont pas publiquement accessibles. Datadog utilise une IP privée pour transmettre les données des conteneurs à l'Agent.

Vous pouvez configurer la tâche à l'aide des [outils d'AWS CLI][6] ou de la console Web d'Amazon.

##### Interface de ligne de commande d'AWS

1. Téléchargez [datadog-agent-ecs.json][7] ([datadog-agent-ecs1.json][8] si vous utilisez une AMI Amazon Linux d'origine).
2. Modifiez `datadog-agent-ecs.json` et remplacez `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog][9] de votre compte.
3. Si vous êtes sur le site européen de Datadog, vous pouvez également modifier `datadog-agent-ecs.json` et remplacer `DD_SITE` par `DD_SITE:datadoghq.eu`.
4. Vous pouvez activer la collecte de logs en consultant la [rubrique dédiée](#collecte-de-logs).
5. Enfin, vous pouvez activer la collecte de processus en consultant la [rubrique dédiée](#collecte-de-processus).

6. Exécutez la commande suivante :
```
aws ecs register-task-definition --cli-input-json file://chemin/vers/ecs-agent-datadog.json
```

##### Interface utilisateur Web

1. Connectez-vous à votre console AWS et accédez à la section EC2 Container Service.
2. Cliquez sur le cluster pour lequel vous souhaitez ajouter Datadog.
3. Cliquez sur **Task Definitions** sur le côté gauche, puis cliquez ensuite sur le bouton **Create new Task Definition**.
4. Saisissez un **Task Definition Name**, tel que `datadog-agent-task`.
5. Cliquez sur le lien **Add volume**.
6. Pour **Name**, saisissez `docker_sock`. Pour **Source Path**, saisissez `/var/run/docker.sock`. Cliquez sur **Add**.
7. Ajoutez un autre volume avec le nom `proc` et le chemin source `/proc/`.
8. Ajoutez un autre volume avec le nom `cgroup` et le chemin source `/sys/fs/cgroup/` (ou `/cgroup/` si vous utilisez une AMI Amazon Linux d'origine).
9. Cliquez sur le gros bouton **Add container**.
10. Pour le champ **Container name**, saisissez `datadog-agent`.
11. Pour le champ **Image**, saisissez `datadog/agent:latest`.
12. Pour **Maximum memory**, indiquez `256`. **Remarque** : en cas d'utilisation intense des ressources, il se peut que vous ayez besoin de rehausser la limite de mémoire.
13. Faites défiler jusqu'à atteindre la section **Advanced container configuration**, puis saisissez `10` pour **CPU units**.
14. Pour **Env Variables**, ajoutez la **clé** `DD_API_KEY` et indiquez votre clé d'API Datadog en valeur. *Si vous préférez stocker vos secrets de cette façon dans S3, consultez [le guide de configuration d'ECS][10].*
15. Ajoutez une variable d'environnement supplémentaire pour chaque tag à ajouter en utilisant la clé `DD_TAGS`.
16. Faites défiler jusqu'à atteindre la section **Storage and Logging**.
17. Dans **Mount points**, sélectionnez le volume de source **docker_sock** et indiquez `/var/run/docker.sock` dans le chemin du conteneur. Cochez ensuite la case **Read only**.
18. Ajoutez un point de montage supplémentaire pour **proc** et saisissez `/host/proc/` dans le chemin du conteneur. Cochez la case **Read only**.
19. Ajoutez un troisième point de montage pour **cgroup** et saisissez `/host/sys/fs/cgroup` dans le chemin du conteneur. Cochez la case **Read only** (utilisez `/host/cgroup/` si vous utilisez une AMI Amazon Linux d'origine).

**Remarque** : si vous définissez la tâche Datadog de façon à utiliser 10 « CPU units », le paramètre `aws.ecs.cpuutilization` de `service:datadog-agent` peut afficher une exécution de 1 000 %. Cela est dû à une particularité de l'affichage de l'utilisation de processeur par AWS. Vous pouvez ajouter davantage de « CPU units » pour corriger votre graphique.

#### Créer ou modifier votre stratégie IAM

Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][11] afin de recueillir des métriques Amazon ECS. Pour en savoir plus sur les stratégies ECS, consultez [la documentation du site Web d'AWS][12].

| Autorisation AWS                   | Description                                                   |
|----------------------------------|---------------------------------------------------------------|
| `ecs:ListClusters`               | Renvoie la liste des clusters existants.                          |
| `ecs:ListContainerInstances`     | Renvoie la liste des instances de conteneur dans un cluster précis. |
| `ecs:ListServices`               | Énumère les services qui s'exécutent sur un cluster précis.   |
| `ecs:DescribeContainerInstances` | Décrit les instances de conteneur Amazon ECS.                     |

#### Exécuter l'Agent en tant que service Daemon

Dans l'idéal, l'Agent Datadog charge un conteneur sur chaque instance EC2. Pour y parvenir, nous vous recommandons d'exécuter l'Agent Datadog en tant que [service Daemon][13].

##### Planifier un service Daemon dans AWS à l'aide de la tâche ECS de Datadog

1. Connectez-vous à la console AWS et accédez à la section ECS Clusters. Cliquez sur le cluster sur lequel vous exécutez l'Agent.
2. Cliquez sur le bouton **Create** sous « Services » pour créer un service.
3. Pour le type de lancement, sélectionnez « EC2 », puis la définition de tâche précédemment créée.
4. Sélectionnez le type de service `DAEMON`, puis saisissez un nom de service. Cliquez ensuite sur **Next**.
5. Puisque le service s'exécute une fois sur chaque instance, vous n'avez pas besoin d'un répartiteur de charge. Sélectionnez None, puis cliquez sur **Next**.
6. Les services Daemon n'ont pas besoin d'Auto Scaling. Vous pouvez donc cliquer sur **Next Step**, puis sur **Create Service**.

#### Détection dynamique et surveillance des services en cours d'exécution

La fonction [Autodiscovery][14] de Datadog peut être utilisée avec ECS et Docker afin de découvrir et de surveiller automatiquement des tâches s'exécutant dans votre environnement.

#### Mode AWSVPC

Pour l'Agent v6.10+, le mode AWSVPC est pris en charge à la fois pour les conteneurs d'application et pour le conteneur de l'Agent, sous réserve des conditions suivantes :

1. Pour les applications et l'Agent en mode AWSVPC, les groupes de sécurité doivent être configurés pour permettre :
  * au groupe de sécurité de l'Agent de se connecter aux conteneurs d'application sur les ports concernés.
  * au groupe de sécurité de l'Agent de se connecter aux instances du host sur le port TCP 51678. Le conteneur de l'Agent ECS doit s'exécuter en mode réseau host (par défaut) ou avoir un port lié au host.

2. Pour les applications en mode AWSVPC et l'Agent en mode pont, les groupes de sécurité doivent être configurés de façon à autoriser le groupe de sécurité des instances de host à se connecter aux conteneurs d'application sur les ports concernés.

### Collecte de logs

Pour recueillir tous les logs écrits par des applications s'exécutant dans vos conteneurs ECS et les envoyer à votre application Datadog :

1. Suivez les [instructions ci-dessus](#interface-de-ligne-de-commande-d-aws) pour installer l'Agent Datadog.
2. Modifiez votre fichier [datadog-agent-ecs.json][7] ([datadog-agent-ecs1.json][8] si vous utilisez une AMI Amazon Linux d'origine) avec la configuration suivante :

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

3. Assurez-vous que votre définition de conteneur ne contient pas de paramètre `logConfiguration.logDriver` de façon à ce que les logs soient écrits dans `stdout/stderr` et recueillis par l'Agent. Si ce paramètre est défini sur `awslogs`, recueillez vos logs Amazon ECS sans l'Agent en utilisant [AWS Lambda pour recueillir les logs ECS à partir de CloudWatch][15].

#### Activer la collecte de logs pour des intégrations

L'attribut `source` est utilisé pour identifier l'intégration à utiliser pour chaque conteneur. Contournez-le directement dans vos étiquettes de conteneurs pour commencer à [recueillir les logs d'une intégration][16]. Lisez le [guide sur Autodiscovery pour les logs][17] de Datadog pour en savoir plus sur ce processus.

### Collecte de processus

Pour recueillir des informations sur les processus pour l'ensemble de vos conteneurs et les envoyer à Datadog :

1. Suivez les [instructions ci-dessus](#interface-de-ligne-de-commande-d-aws) pour installer l'Agent Datadog.
2. Modifiez votre fichier [datadog-agent-ecs.json][7] ([datadog-agent-ecs1.json][8] si vous utilisez une AMI Amazon Linux d'origine) avec la configuration suivante :

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

Une fois l'Agent Datadog installé, activez [datadog-trace-agent][18] en configurant les paramètres suivants dans la définition de tâche pour le conteneur `datadog/agent` :

- Mappage de port : host/conteneur port `8126`, protocole `tcp`
- Variables d'environnement : `DD_APM_ENABLED=true`, `DD_APM_NON_LOCAL_TRAFFIC=true` (cela active la collecte de traces depuis d'autres conteneurs).

#### Conteneur d'application

[L'endpoint de métadonnées EC2 d'Amazon][19] vous permet de découvrir l'adresse IP privée de chaque instance sous-jacente sur laquelle vos conteneurs s'exécutent. Configurez cette adresse IP comme votre hostname d'Agent de trace dans votre conteneur d'application afin de pouvoir transmettre les traces à l'Agent.

Pour obtenir l'adresse IP privée de chaque host, effectuez un cURL sur l'URL suivante, puis définissez le résultat comme la variable d'environnement de hostname de votre Agent de Trace pour chaque conteneur d'application transmis à l'APM :

```
curl http://169.254.169.254/latest/meta-data/local-ipv4
```

```
os.environ['DATADOG_TRACE_AGENT_HOSTNAME'] = <IP_PRIVÉE_EC2>
```

Si les variables de votre application ECS sont définies au moment du lancement, vous *devez* définir le hostname en tant que variable d'environnement.

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

Pour découvrir davantage d'exemples afin de définir le hostname de l'Agent dans d'autres langages, consultez la section [Modifier le hostname de l'Agent][20].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ecs" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

Pour réduire les données parasites, l'intégration AWS ECS est automatiquement configurée de façon à inclure les événements qui contiennent les termes suivants : `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot` et `terminate`. Vous trouverez ci-dessous des exemples d'événement :

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Événements AWS ECS" >}}

Pour supprimer ce filtre et recevoir tous les événements de votre intégration Datadog/AWS ECS, contactez [l'assistance Datadog][22].

### Checks de service

* **aws.ecs.agent_connected** : renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][22].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/fr/integrations/faq/agent-5-amazon-ecs
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery/?tab=docker#how-to-set-it-up
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/fr/tracing/setup/docker
[6]: https://aws.amazon.com/cli
[7]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[8]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[9]: https://app.datadoghq.com/account/settings#api
[10]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[11]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#datadog-aws-iam-policy
[12]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[13]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[14]: https://docs.datadoghq.com/fr/agent/autodiscovery
[15]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
[16]: https://docs.datadoghq.com/fr/logs/processing/#log-processing
[17]: https://docs.datadoghq.com/fr/logs/log_collection/docker/?tab=containerinstallation#activate-log-integrations
[18]: https://github.com/DataDog/datadog-trace-agent
[19]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[20]: https://docs.datadoghq.com/fr/tracing/advanced_usage/?tab=java#change-agent-hostname
[21]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[22]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
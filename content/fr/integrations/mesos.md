---
aliases:
  - /fr/integrations/mesos_master/
  - /fr/integrations/mesos_slave/
integration_title: Mesos
is_public: true
kind: integration
short_description: 'Surveillez l''utilisation des ressources du cluster, le nombre d''instances slave et master, les différents statuts des tâches, et plus encore. and more.'
---
Ce check recueille des métriques pour les masters Mesos. Si vous cherchez à recueillir des métriques pour un slave Mesos, consultez la [documentation relative à l'intégration Mesos Slave][1].

![Dashboard Mesos Master][2]

## Présentation

Ce check recueille des métriques des masters Mesos pour :

- les ressources du cluster ;
- les slaves enregistrés, actifs, inactifs, connectés, déconnectés, etc. ;
- le nombre de tâches échouées, terminées, en cours d'exécution, etc. ;
- le nombre de frameworks actifs, inactifs, connectés ou déconnectés ;

et bien plus encore.

## Implémentation

### Installation

L'installation se fait de la même façon que vous utilisiez Mesos avec ou sans DC/OS. Exécutez le conteneur datadog-agent sur chacun de vos nœuds Mesos Master :

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY= \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  datadog/agent
```

Spécifiez votre clé d'API Datadog et votre URL d'API Mesos Master dans la commande ci-dessus.

### Configuration

Si l'URL de master transmise au lancement de datadog-agent est valide, l'Agent utilise déjà un fichier `mesos_master.d/conf.yaml` par défaut pour recueillir les métriques de vos masters : vous n'avez donc rien d'autre à configurer. Consultez le [fichier d'exemple mesos_master.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

Toutefois, vos métriques ne seront pas recueillies si l'API de votre master utilise un certificat auto-signé. Dans ce cas, spécifiez `disable_ssl_validation: true` dans `mesos_master.d/conf.yaml`.

#### Collecte de logs

L'Agent Datadog >6.0 recueille des logs à partir de vos conteneurs. Vous avez la possibilité de recueillir tous les logs de tous vos conteneurs ou de choisir les logs à recueillir en les filtrant par image de conteneur, étiquette de conteneur ou nom.

Ajoutez ces variables supplémentaires à la commande de lancement de l'Agent Datadog pour activer la collecte de logs :

- `-e DD_LOGS_ENABLED=true` : l'ajout de cette variable avec la valeur `true` active la collecte de logs. L'Agent recherche alors les instructions relatives aux logs dans les fichiers de configuration ou les étiquettes de conteneur.
- `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` : active la collecte de logs pour tous les conteneurs.
- `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` : monte le répertoire utilisé par l'Agent pour stocker les pointeurs de chaque log de conteneur, lui permettant ainsi de déterminer ce qui a été envoyé à Datadog ou non.

On obtient la commande suivante :

```shell
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
  -e DD_API_KEY= \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  datadog/agent:latest
```

Utilisez la [fonction Autodiscovery][4] pour faire en sorte que les logs remplacent les attributs `service` et `source` : vous pourrez ainsi bénéficier de la configuration automatique de l'intégration.

### Validation

Dans Datadog, recherchez `mesos.cluster` depuis la page Metrics Explorer.

## Données collectées

### Métriques
{{< get-metrics-from-git "mesos_master" >}}


### Événements

Le check Mesos-master n'inclut aucun événement.

### Checks de service

**mesos_master.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'API Master Mesos pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

- [Installation de Datadog sur Mesos avec DC/OS][6]




## Intégration Mesos_slave

![Dashboard Slave Mesos][7]

## Présentation

Ce check de l'Agent recueille des métriques des slaves Mesos pour :

- la charge système ;
- le nombre de tâches échouées, terminées, en cours d'exécution, etc. ;
- le nombre d'exécuteurs en cours d'exécution, terminés, etc. ;

Et bien plus encore.

Ce check crée également un check de service pour chaque tâche d'exécuteur.

## Configuration

### Installation

Suivez les instructions décrites dans notre [article de blog][6] pour installer l'Agent Datadog sur chaque nœud d'Agent Mesos via l'interface Web DC/OS.

### Configuration

#### DC/OS

1. Depuis l'interface Web DC/OS, cliquez sur l'onglet **Universe**. Recherchez le paquet **datadog** et cliquez sur le bouton d'installation.
1. Cliquez sur le bouton **Advanced Installation**.
1. Saisissez votre clé d'API Datadog dans le premier champ.
1. Dans le champ Instances, indiquez le nombre de nœuds slave dans votre cluster (pour déterminer ce nombre, cliquez sur l'onglet Nodes sur le côté gauche de l'interface Web DC/OS).
1. Cliquez sur **Review and Install**, puis sur **Install**.

#### Marathon

Si vous n'utilisez pas DC/OS, définissez l'application Agent Datadog via l'interface Web Marathon ou en transmettant le JSON ci-dessous à l'URL de l'API. Vous devrez remplacer `<VOTRE_CLÉ_API_DATADOG>` par votre clé d'API, et le nombre d'instances par le nombre de nœuds slave sur votre cluster. De plus, vous devrez peut-être mettre à jour l'image Docker pour la faire correspondre à un tag plus récent. Pour obtenir la dernière version de l'image, accédez au [Docker Hub][8].

```json
{
  "id": "/datadog-agent",
  "cmd": null,
  "cpus": 0.05,
  "mem": 256,
  "disk": 0,
  "instances": 1,
  "constraints": [
    ["hostname", "UNIQUE"],
    ["hostname", "GROUP_BY"]
  ],
  "acceptedResourceRoles": ["slave_public", "*"],
  "container": {
    "type": "DOCKER",
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RO"
      },
      { "containerPath": "/host/proc", "hostPath": "/proc", "mode": "RO" },
      {
        "containerPath": "/host/sys/fs/cgroup",
        "hostPath": "/sys/fs/cgroup",
        "mode": "RO"
      }
    ],
    "docker": {
      "image": "datadog/agent:latest",
      "network": "BRIDGE",
      "portMappings": [
        {
          "containerPort": 8125,
          "hostPort": 8125,
          "servicePort": 10000,
          "protocol": "udp",
          "labels": {}
        }
      ],
      "privileged": false,
      "parameters": [
        { "key": "name", "value": "datadog-agent" },
        { "key": "env", "value": "DD_API_KEY=" },
        { "key": "env", "value": "MESOS_SLAVE=true" }
      ],
      "forcePullImage": false
    }
  },
  "healthChecks": [
    {
      "protocol": "COMMAND",
      "command": { "value": "/probe.sh" },
      "gracePeriodSeconds": 300,
      "intervalSeconds": 60,
      "timeoutSeconds": 20,
      "maxConsecutiveFailures": 3
    }
  ],
  "portDefinitions": [
    { "port": 10000, "protocol": "tcp", "name": "default", "labels": {} },
    { "port": 10001, "protocol": "tcp", "labels": {} }
  ]
}
```

Vous n'avez rien d'autre à faire après avoir installé l'Agent, sauf si vous souhaitez modifier la configuration du fichier `mesos_slave.d/conf.yaml` (pour ajouter le paramètre `disable_ssl_validation: true`, par exemple).

### Validation

#### DC/OS

L'Agent Datadog devrait maintenant s'afficher dans l'onglet Services de l'interface Web DC/OS. Dans Datadog, recherchez `mesos.slave` depuis la page Metrics Explorer.

#### Marathon

Si vous n'utilisez pas DC/OS, vous trouverez datadog-agent dans la liste des applications en cours d'exécution avec un statut sain. Dans Datadog, recherchez `mesos.slave` depuis la page Metrics Explorer.

## Données collectées

### Métriques
{{< get-metrics-from-git "mesos_slave" >}}


### Événements

Le check Mesos-slave n'inclut aucun événement.

### Check de service

`mesos_slave.can_connect` :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à l'endpoint des métriques de slave Mesos. Si ce n'est pas le cas, renvoie OK.

`<nom_tâche_exécuteur>.ok` :

Le check mesos_slave crée un check de service pour chaque tâche d'exécuteur, en lui attribuant l'un des statuts suivants :

|               |                                |
| ------------- | ------------------------------ |
| Statut de la tâche   | Statut du check de service généré |
| TASK_STARTING | AgentCheck.OK                  |
| TASK_RUNNING  | AgentCheck.OK                  |
| TASK_FINISHED | AgentCheck.OK                  |
| TASK_FAILED   | AgentCheck.CRITICAL            |
| TASK_KILLED   | AgentCheck.WARNING             |
| TASK_LOST     | AgentCheck.CRITICAL            |
| TASK_STAGING  | AgentCheck.OK                  |
| TASK_ERROR    | AgentCheck.CRITICAL            |

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

- [Installation de Datadog sur Mesos avec DC/OS][6]


[1]: https://docs.datadoghq.com/fr/integrations/mesos/#mesos-slave-integration
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_master/images/mesos_dashboard.png
[3]: https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-autodiscovery
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://www.datadoghq.com/blog/deploy-datadog-dcos
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_slave/images/mesos_dashboard.png
[8]: https://hub.docker.com/r/datadog/agent/tags
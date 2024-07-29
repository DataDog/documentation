---
aliases:
- /fr/agent/amazon_ecs/logs
further_reading:
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/amazon_ecs/data_collected/#metriques
  tag: Documentation
  text: Recueillir des métriques ECS
title: Collecte de logs Amazon ECS
---

## Présentation

L'Agent Datadog 6 (et ses versions ultérieures) est capable de recueillir des logs à partir de conteneurs. Pour recueillir des logs à partir de conteneurs ECS, il est recommandé d'activer la collecte de logs dans la définition de tâche de votre Agent. Une manière de procéder consiste à modifier le [fichier de définition de tâche][7] utilisé précédemment et à [enregistrer votre définition de tâche modifiée][8]. Vous pouvez également modifier la définition de tâche directement depuis l'interface Web Amazon.

Une fois la collecte activée, le conteneur de l'Agent Datadog recueille les logs générés par les autres conteneurs d'application sur le même host. Cette collecte est toutefois limitée aux logs émis vers les flux de logs `stdout` et `stderr` avec le pilote de logging `default` ou `json-file`.

- Si vos conteneurs génèrent des fichiers de log isolés *dans leurs propres conteneurs*, vous devrez effectuer quelques [étapes supplémentaires](#fichier-de-log-dans-un-conteneur) pour que le conteneur de l'Agent puisse voir ces fichiers.
- Si vos conteneurs utilisent le [pilote de logging `awslogs` pour transmettre les logs à CloudWatch][9], l'Agent ne sera pas en mesure de voir ces logs. Vous devrez donc utiliser l'une des [intégrations de collecte de logs AWS][10] pour recueillir ces logs.

## Installation

### Définition de tâche ECS

Pour recueillir tous les logs à partir de vos conteneurs ECS exécutés, mettez à jour la définition de tâche de votre Agent issue de la [configuration ECS d'origine][11] en spécifiant les variables d'environnement et les montages ci-dessous.

{{< tabs >}}
{{% tab "Linux" %}}

Utilisez [datadog-agent-ecs-logs.json][1] comme modèle de référence pour connaître la configuration de base requise. Votre définition de tâche doit contenir les lignes suivantes :

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "/opt/datadog-agent/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "/var/lib/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
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
          }
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
      {
        "host": {
          "sourcePath": "/var/lib/docker/containers/"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-logs.json
{{% /tab %}}
{{% tab "Windows" %}}

Utilisez [datadog-agent-ecs-win-logs.json][1] comme modèle de référence pour connaître la configuration de base requise. Votre définition de tâche doit contenir les lignes suivantes :

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "C:/programdata/datadog/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "c:/programdata/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
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
          }
        ]
      }
    ],
    "volumes": [
      (...)
      {
        "name": "pointdir",
        "dockerVolumeConfiguration": {
          "autoprovision": true,
          "scope": "shared",
          "driver": "local"
        }
      },
      {
        "host": {
          "sourcePath": "c:/programdata/docker/containers"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-win-logs.json
{{% /tab %}}
{{< /tabs >}}

Ces définitions de tâche définissent la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` pour recueillir les logs depuis chaque conteneur découvert par l'Agent. Définissez cette variable d'environnement sur `false` pour ne recueillir que les logs des conteneurs qui possèdent des [étiquettes Autodiscovery](#etiquettes-autodiscovery).

Si vous disposez d'un fichier local pour la définition de tâche de votre Agent, vous pouvez répéter ces étapes pour [enregistrer votre définition de tâche modifiée][8]. Cette opération entraînera la création d'une révision. Vous pourrez ensuite ajouter une référence à cette nouvelle révision dans le service daemon de l'Agent Datadog.

## Collecte de logs personnalisée

### Étiquettes Autodiscovery
Si la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` est définie, l'Agent recueille les logs de tous les conteneurs qu'il découvre par défaut. Les tags `service` et `source` de ces logs sont définis sur le nom d'image raccourci de leur conteneur respectif. Vous pouvez spécifier des étiquettes Docker sur vos conteneurs d'application ECS pour qu'Autodiscovery personnalise la configuration de collecte utilisée par l'Agent *pour le conteneur correspondant*.

Consultez la section [Collecte de logs avec Docker][12] pour découvrir comment utiliser les configurations Autodiscovery. Par exemple, la configuration de collecte de logs suivante remplace les tags `source` et `service` des logs recueillis :

```json
[{"source": "example-source", "service": "example-service"}]
```

Dans le cas d'ECS, cette configuration peut être ajoutée à l'étiquette `com.datadoghq.ad.logs` dans la section `dockerLabels` de la définition de tâche associée au conteneur d'application qui émet ces logs.

```json
{
  "containerDefinitions": [
    {
      "name": "<NOM_CONTENEUR>",
      "image": "<IMAGE_CONTENEUR>",
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"example-source\", \"service\": \"example-service\"}]"
      }
    }
  ]
}
```

Vous pouvez aller encore plus loin [en ajoutant des tags à votre configuration de collecte de logs][4] en définissant des `log_processing_rules` pour les [options de collecte de logs avancée][5].

### Fichier de log dans un conteneur

Docker (avec le pilote `default` ou `json-file`) expose les flux de logs `stdout` et `stderr` dans un format facilement identifiable par l'Agent. Toutefois, lorsqu'un conteneur génère un fichier de log au sein de son propre conteneur, l'Agent n'est pas en mesure de voir ce fichier par défaut. Datadog vous conseille d'utiliser les flux de sortie `stdout` et `stderr` pour faciliter la collecte des logs des applications conteneurisées. Si ce n'est pas possible, vous pouvez modifier la configuration Autodiscovery afin de spécifier le chemin d'accès au fichier. Vous devrez vous assurer que le conteneur de l'Agent et le conteneur de l'application partagent un répertoire sur le host contenant le fichier de log.

La configuration de collecte de logs ci-dessous indique à l'Agent de [recueillir ce fichier de log personnalisé][3] en accédant au chemin `/var/log/example/app.log`.
```json
[{
  "type": "file",
  "path": "/var/log/example/app.log",
  "source": "example-source",
  "service": "example-service"
}]
```

Par exemple, on constate que la définition de tâche ci-dessous :
* Écrit des logs vers le fichier `/var/log/example/app.log`
* Contient une section `dockerLabels` pour configurer la collecte de logs
* Spécifie les paramètres `volumes` et `mountPoints` pour le répertoire `/var/log/example`

```json
{
  "containerDefinitions": [
    {
      "name": "example-logger",
      "image": "busybox",
      "entryPoint": ["/bin/sh", "-c", "--"],
      "command": ["while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;"],
      "mountPoints": [
        {
          "containerPath": "/var/log/example",
          "sourceVolume": "applogs"
        }
      ],
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"type\":\"file\",\"path\":\"/var/log/example/app.log\",\"source\":\"example-source\",\"service\":\"example-service\"}]"
      }
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/log/example"
      },
      "name": "applogs"
    }
  ],
  "family": "example-logger"
}
```

Les chemins d'accès dans la configuration sont toujours relatifs à l'Agent. Les mêmes paramètres `volume` et `mountPoint` doivent également être ajoutés à la définition de tâche de l'Agent pour que le fichier de log en question soit visible.

Consultez la [documentation AWS sur les bind mounts][6] pour en savoir plus sur la gestion des volumes avec ECS.

**Remarque** : lorsque vous utilisez ce type de configuration avec un conteneur, les flux de logs `stdout` et `stderr` ne sont pas recueillis automatiquement depuis le conteneur (ils sont uniquement recueillis depuis le fichier). Si vous souhaitez que les logs soient recueillis à la fois depuis les flux du conteneur et un fichier, vous devez activer explicitement cette option dans la configuration. Par exemple :

```json
[
  {
    "type": "file",
    "path": "/var/log/example/app.log",
    "source": "example-file",
    "service": "example-service"
  },
  {
    "source": "example-stream",
    "service": "example-service"
  }
]
```

## Activer les intégrations de collecte de logs

L'attribut `source` sert à identifier l'intégration à utiliser pour chaque conteneur. Contournez-le directement dans vos étiquettes de conteneurs pour commencer à utiliser les [intégrations de collecte de logs Datadog][2]. Lisez notre [guide sur l'utilisation d'Autodiscovery pour les logs][1] pour en savoir plus sur ce processus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/docker/log/?tab=containerinstallation#log-integrations
[2]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[3]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /fr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[5]: /fr/agent/logs/advanced_log_collection?tab=docker
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html
[7]: /fr/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[8]: /fr/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[10]: /fr/integrations/amazon_web_services/?tab=allpermissions#log-collection
[11]: /fr/containers/amazon_ecs/?tab=awscli#setup
[12]: /fr/containers/docker/log/?tab=dockerfile#log-integrations
---
title: Collecte de logs Amazon ECS
kind: documentation
further_reading:
  - link: /agent/amazon_ecs/apm/
    tag: Documentation
    text: Recueillir les traces de vos applications
  - link: '/agent/amazon_ecs/data_collected/#metriques'
    tag: Documentation
    text: Recueillir des métriques ECS
---
## Présentation

L'Agent Datadog 6 et ultérieur recueille des logs à partir des conteneurs. Pour recueillir des logs à partir des conteneurs ECS, il est recommandé d'activer la journalisation conteneurisée dans le fichier `datadog-agent-ecs.json` ou `datadog-agent-ecs1.json`. Cependant, si votre application génère des logs dans des fichiers de n'importe quelle capacité (logs qui ne sont pas écrits dans `stdout` ou `stderr`), il vous faudra [déployer l'Agent Datadog sur votre host](#collecte-de-logs-personnalisee) et utiliser la collecte de logs personnalisée pour suivre les fichiers.

## Installation

### Fichier ECS

Pour recueillir tous les logs écrits par des applications s'exécutant dans vos conteneurs ECS et les envoyer à votre application Datadog :

{{< tabs >}}
{{% tab "Linux" %}}

1. Suivez les [instructions de configuration pour Amazon ECS][1].
2. Modifiez votre fichier [datadog-agent-ecs.json][2] ([datadog-agent-ecs1.json][3] si vous utilisez une AMI Amazon Linux d'origine) avec la configuration suivante :

    ```text
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

3. Assurez-vous que votre définition de conteneur ne contient pas de paramètre `logConfiguration.logDriver` de façon à ce que les logs soient écrits dans `stdout/stderr` et recueillis par l'Agent. Si ce paramètre est défini sur `awslogs`, recueillez vos logs Amazon ECS sans l'Agent, en utilisant [AWS Lambda pour effectuer la collecte à partir de CloudWatch][4].

[1]: https://docs.datadoghq.com/fr/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{% tab "Windows" %}}

1. Suivez les [instructions de configuration pour Amazon ECS][1].
2. Modifiez votre fichier [datadog-agent-ecs-win.json][2] avec la configuration suivante :

    ```text
    {
      "containerDefinitions": [
        (...)
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
      "family": "datadog-agent-task"
    }
    ```

3. Assurez-vous que votre définition de conteneur ne contient pas de paramètre `logConfiguration.logDriver` de façon à ce que les logs soient écrits dans `stdout/stderr` et recueillis par l'Agent. Si ce paramètre est défini sur `awslogs`, recueillez vos logs Amazon ECS sans l'Agent, en utilisant [AWS Lambda pour effectuer la collecte à partir de CloudWatch][3].

[1]: https://docs.datadoghq.com/fr/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[3]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{< /tabs >}}

### Collecte de logs personnalisée

#### Fichier de configuration

Si votre conteneur écrit des logs dans des fichiers, consultez la [section Collecte de logs personnalisée][1] pour suivre les fichiers de logs.

Pour rassembler les logs de votre application `<NOM_APP>` stockés dans `<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log`, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][2] avec le contenu suivant :

```yaml
logs:
  - type: file
    path: "<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log"
    service: "<NOM_APP>"
    source: "<SOURCE>"
```

**Remarque** : les métadonnées du conteneur ne sont pas récupérées via la collecte de logs personnalisée. Par conséquent, l'Agent n'attribue pas automatiquement de tag aux logs. Utilisez des [tags personnalisés][3] pour créer des tags de conteneur.

#### Étiquette de conteneur

Avec l'Agent v7.25.0+/6.25.0+, il est possible d'activer le suivi des fichiers à l'aide d'une étiquette de conteneur. Les logs recueillis reçoivent alors les tags du conteneur pour lequel l'étiquette a été définie. Cet [exemple][4] explique en détail quelle étiquette utiliser.

**Remarque** : les chemins de fichier sont toujours relatifs à l'Agent. Les tâches ECS concernées nécessitent donc une configuration supplémentaire afin de partager un répertoire entre le conteneur écrivant le fichier et le conteneur de l'Agent. Consultez la [documentation AWS][5] pour en savoir plus sur la gestion de volumes avec ECS.

## Activer la collecte de logs pour une intégration

L'attribut `source` est utilisé pour identifier l'intégration à utiliser pour chaque conteneur. Contournez-le directement dans vos étiquettes de conteneurs pour commencer à [recueillir les logs d'une intégration][1]. Lisez notre [guide sur l'utilisation d'Autodiscovery pour les logs][2] pour en savoir plus sur ce processus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[4]: /fr/agent/docker/log/?tab=logcollectionfromfile#examples
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html
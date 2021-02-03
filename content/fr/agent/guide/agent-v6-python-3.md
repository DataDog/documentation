---
title: "Utiliser Python\_3 avec l'Agent\_v6 de Datadog"
kind: guide
further_reading:
  - link: /agent/versions/upgrade_to_agent_v7/
    tag: Documentation
    text: "Upgrade vers l'Agent\_v7"
---
Depuis la version 6.14.0, l'Agent v6 intègre les runtimes Python 2 et Python 3. En d'autres termes, les checks de l'Agent peuvent être exécutés aussi bien avec Python 2 que Python 3, en fonction de la configuration de l'Agent.

La version 6 de l'Agent utilise par défaut le runtime Python 2. Pour passer au runtime Python 3 :

{{< tabs >}}
{{% tab "Agent de host" %}}

1. Définissez l'option de configuration `python_version` [dans votre fichier de configuration `datadog.yaml` ][1] :

    ```yaml
    python_version: 3
    ```

2. [Redémarrez l'Agent][2].

Vous pouvez également définir la variable d'environnement `DD_PYTHON_VERSION` sur `2` ou sur `3` pour choisir le runtime Python à utiliser. Lorsque celle-ci est définie, l'option `python_version` du fichier `datadog.yaml` est ignorée.

Il s'agit d'une option de configuration au niveau de l'Agent : **tous les checks Python lancés par un Agent utilisent le même runtime Python**.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

La seule différence entre l'Agent v6.x et l'Agent v7.x concerne leur version du runtime Python. L'Agent v7.x prend en charge le runtime Python 3, tandis que l'Agent v6.x prend en charge le runtime Python 2. Ainsi, vous pouvez changer de runtime Python en passant d'une version de l'Agent à une autre. Pour ce faire, choisissez l'image de l'Agent pertinente :

* Runtime **Python 2** : les images de l'Agent v6 suivent le format `gcr.io/datadoghq/agent:6.<VERSION_MINEURE_AGENT>`, ou `gcr.io/datadoghq/agent:6.<VERSION_MINEURE_AGENT>-jmx` pour les images prenant en charge les checks JMX.

* Runtime **Python 3** : les images de l'Agent v7 suivent le format `gcr.io/datadoghq/agent:7.<VERSION_MINEURE_AGENT>`, ou `gcr.io/datadoghq/agent:7.<VERSION_MINEURE_AGENT>-jmx` pour les images prenant en charge les checks JMX.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
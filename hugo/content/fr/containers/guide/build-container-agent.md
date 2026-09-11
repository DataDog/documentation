---
aliases:
- /fr/agent/guide/build-container-agent
description: Instructions pour créer des images Docker personnalisées de l'Agent Datadog
  à partir du code source
title: Créer l'image de l'Agent Datadog
---

Suivez les instructions ci-dessous pour créer l'image Docker de l'Agent Datadog pour une `<AGENT_VERSION>` spécifique (à partir de la version 6.0).

1. Dupliquez le référentiel de l'Agent Datadog :

    ```shell
    git clone https://github.com/DataDog/datadog-agent.git
    ```

2. Accédez au dossier `datadog-agent/Dockerfiles/agent/` :

    ```shell
    cd datadog-agent/Dockerfiles/agent/
    ```

3. Sélectionnez la branche correspondant à la version de l'Agent Datadog qui vous intéresse :

    ```shell
    git branch <AGENT_VERSION> && git checkout <AGENT_VERSION>
    ```

4. Téléchargez le package Debian de l'Agent qui correspond à la version de l'Agent qui vous intéresse. Choisissez entre l'architecture AMD ou ARM :

    {{< tabs >}}
{{% tab "AMD" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_amd64.deb -o datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

{{% /tab %}}
{{% tab "ARM" %}}

```shell
curl https://s3.amazonaws.com/apt.datadoghq.com/pool/d/da/datadog-agent_<AGENT_VERSION>-1_arm64.deb -o datadog-agent_<AGENT_VERSION>-1_arm64.deb
```

{{% /tab %}}
{{< /tabs >}}

    **Remarque** : la liste complète des packages Debian disponibles se trouve [sur cette page APT][1].

5. Créez l'image de l'Agent en exécutant :

    {{< tabs >}}
{{% tab "AMD" %}}

```shell
docker build --build-arg <BUILD_ARGS> --file amd64/Dockerfile --pull --tag <IMAGE_TAG> .
```

{{% /tab %}}
{{% tab "ARM" %}}

```shell
docker build --build-arg <BUILD_ARGS> --file arm64/Dockerfile --pull --tag <IMAGE_TAG> .
```

{{% /tab %}}
{{< /tabs >}}

    Par exemple, pour créer l'image de la version 7.17.0 de l'Agent pour architectures AMD, exécutez :

    ```shell
    docker build --build-arg DD_AGENT_ARTIFACT=./datadog-agent_7.17.0-1_amd64.deb --file amd64/Dockerfile --pull --tag documentation-example .
    ```

     Les `<BUILD_ARGS>` acceptés sont :

    | Argument          | Définition                                                                  | Défaut |
    | ----------------- | --------------------------------------------------------------------------- | ------- |
    | PYTHON_VERSION    | La version du runtime Python pour votre check d'Agent.                            | `-`     |
    | WITH_JMX          | Définir sur `true` pour inclure la logique JMXFetch dans le conteneur de l'Agent.         | `false` |
    | DD_AGENT_ARTIFACT | Chemin vers l'artefact Debian de l'Agent à utiliser si celui-ci ne se trouve pas dans le même dossier. | `-`     |

[1]: http://apt.datadoghq.com/pool/d/da/
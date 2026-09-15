---
aliases:
- /fr/observability_pipelines/set_up_pipelines/run_multiple_pipelines_on_a_host/
description: Apprenez quels fichiers Worker ajouter et modifier pour exécuter plusieurs
  Observability Pipelines Workers sur un seul host.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentation
  text: Configurez un pipeline
- link: /observability_pipelines/guide/environment_variables/
  tag: Documentation
  text: Variable d'environnement pour les sources, les processeurs et les composants
title: Exécuter plusieurs pipelines sur un host
---
## Présentation {#overview}

Si vous souhaitez exécuter plusieurs pipelines sur un seul host pour envoyer des logs ou des métriques à partir de différentes sources, vous devez ajouter manuellement les fichiers Worker pour chaque Worker supplémentaire. Ce document explique quels fichiers vous devez ajouter et modifier pour exécuter ces Workers.

## Prérequis {#prerequisites}

[Configurez le premier pipeline][1] et installez le Worker sur votre host.

## Créez un pipeline supplémentaire {#create-an-additional-pipeline}

[Configurez un autre pipeline][1] pour le Worker supplémentaire que vous souhaitez exécuter sur le même host. Lorsque vous atteignez la page d'installation, suivez les étapes ci-dessous pour exécuter le Worker pour ce pipeline.

## Exécutez le Worker pour le pipeline supplémentaire {#run-the-worker-for-the-additional-pipeline}

Lorsque vous avez installé le premier Worker, vous disposez par défaut de :

- Un binaire de service : `/usr/bin/observability-pipelines-worker`
- Un fichier de définition de service qui ressemble à :
    {{< code-block lang="bash" filename="/lib/systemd/system/observability-pipelines-worker.service" >}}
    [Unit]
    Description="Observability Pipelines Worker"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
- Un fichier d'environnement qui ressemble à :
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- Un répertoire de données : `/var/lib/observability-pipelines-worker`

### Configurez le Worker supplémentaire {#configure-the-additional-worker}

Pour cet exemple, un autre pipeline a été créé avec la source Fluent. Pour configurer un Worker pour ce pipeline :

1. Exécutez la commande suivante pour créer un nouveau répertoire de données, en remplaçant `op-fluent` par un nom de répertoire adapté à votre cas d'utilisation :
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. Exécutez la commande suivante pour changer le propriétaire du répertoire de données en `observability-pipelines-worker:observability-pipelines-worker`. Assurez-vous de mettre à jour `op-fluent` avec le nom de votre répertoire de données.
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. Créez un fichier d'environnement pour le nouveau service systemd, tel que `/etc/default/op-fluent` où `op-fluent` est remplacé par votre nom de fichier spécifique. Exemple du contenu du fichier :
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    Dans cet exemple :
    -  `DD_OP_DATA_DIR` est défini sur `/var/lib/op-fluent`. Remplacez `/var/lib/op-fluent` par le chemin d'accès à votre répertoire de données.
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` est la variable d'environnement requise pour la source Fluent dans cet exemple. Remplacez-la par la [variable d'environnement][2] de votre source.
    
    Assurez-vous également de remplacer :
    - `<datadog_api_key>` par votre [clé d'API Datadog][3].
    - `<pipeline_id>` par l'ID du [pipeline][1] pour ce Worker.
    - `<dd_site>` par votre [site Datadog][4].
    - `<destination_environment_variables>` par les [variables d'environnement][2] pour vos destinations.
1. Créez une nouvelle entrée de service systemd, telle que `/lib/systemd/system/op-fluent.service`. Exemple de contenu pour l'entrée :
    {{< code-block lang="bash" filename="/lib/systemd/system/op-fluent.service" >}}
    [Unit]
    Description="OPW for Fluent Pipeline"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/op-fluent

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
    Dans cet exemple :
    - Le nom du service est `op-fluent` car le pipeline utilise la source Fluent. Remplacez `op-fluent.service` par un nom de service adapté à votre cas d'utilisation.
    - Le `Description` est `OPW for Fluent Pipeline`. Remplacez `OPW for Fluent Pipeline` par une description adaptée à votre cas d'utilisation.
    - `EnvironmentFile` est défini sur `-/etc/default/op-fluent`. Remplacez `-/etc/default/op-fluent` par le fichier de variables d'environnement du service systemd que vous avez créé pour votre Worker.
1. Exécutez cette commande pour recharger systemd :
    ```shell
    sudo systemctl daemon-reload
    ```
1. Exécutez cette commande pour démarrer le nouveau service :
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. Exécutez cette commande pour vérifier que le service est en cours d'exécution :
    ```shell
    sudo systemctl status op-fluent
    ```

De plus, vous pouvez utiliser la commande `sudo journalctl -u op-fluent.service` pour vous aider à déboguer tout problème.

## Déployez le pipeline {#deploy-the-pipeline}

1.  Accédez à la page d'installation du pipeline supplémentaire.
1.  Dans la section {{< ui >}}Deploy your pipeline{{< /ui >}}, vous devriez voir votre Worker supplémentaire détecté. Cliquez sur {{< ui >}}Deploy{{< /ui >}}.

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/?tab=pipelineui
[2]: /fr/observability_pipelines/guide/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/getting_started/site/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
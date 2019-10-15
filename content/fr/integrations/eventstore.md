---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md'
display_name: "Event\_Store"
git_integration_title: eventstore
guid: 4BEB8E51-E7DA-4145-B780-E3B3A6A8CD60
integration_id: eventstore
integration_title: "Event\_Store"
is_public: true
kind: integration
maintainer: '@xorima'
manifest_version: 1.0.0
metric_prefix: eventstore.
name: eventstore
public_title: "Intégration Datadog/Event\_Store"
short_description: "Recueille des métriques d'Event\_Store"
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques d'Event Store en temps réel pour :

* Visualiser et surveiller les files d'attente Event Store
* Enregistrer toutes les métriques disponibles au sein de l'API de statistiques

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check EventStore sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. Installez le [kit de développement][4].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `eventstore`, exécutez :

    ```
    ddev -e release build eventstore
    ```

5. [Téléchargez et lancez l'Agent Datadog][5].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_EVENTSTORE_ARTIFACT_>/<EVENTSTORE_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `eventstore.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metriques) EventStore.
  Consultez le [fichier d'exemple eventstore.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `eventstore` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "eventstore" >}}


### Événements

Le check Event Store n'inclut aucun événement.

### Checks de service

Le check Event Store n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez le [responsable de la maintenance][12] de cette intégration.

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json


{{< get-dependencies >}}
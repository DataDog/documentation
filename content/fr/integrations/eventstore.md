---
aliases: []
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

Pour installer le check Event Store sur votre host :

1. Installez le [kit de développement][1] sur n'importe quelle machine.
2. Exécutez `ddev release build eventstore` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][2].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/eventstore/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `eventstore.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Event Store.
  Consultez le [fichier d'exemple eventstore.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

Lancez la sous-commande `status` de l'Agent et cherchez `eventstore` dans la section Checks.

       Checks
       ======

       eventstore
       -----------
        - instance #0 [OK]
        - Collected 50 metrics, 0 events & 0 service checks


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

Besoin d'aide ? Contactez le [responsable de la maintenance][6] de cette intégration.

[1]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json
[7]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv


{{< get-dependencies >}}
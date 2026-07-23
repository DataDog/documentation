---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: tenable
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tenable/README.md'
display_name: Tenable
draft: false
git_integration_title: tenable
guid: 303a1ba9-5136-4d23-9785-e36ea0d6caab
integration_id: tenable
integration_title: Tenable Nessus
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tenable.
metric_to_check: ''
name: tenable
public_title: "Intégration Datadog/Tenable\_Nessus"
short_description: Suivez les logs de serveur Web et de backend Nessus
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cette intégration permet de surveiller les logs [Tenable Nessus][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour configurer cette intégration lorsque l'Agent est exécuté sur un host.

### Installation

Pour installer la configuration de l'intégration Tenable sur votre Agent :

**Remarque** : cette étape n'est pas nécessaire pour l'Agent version >= 7.18.0.

1. [Installez][2] la version 1.0 (`tenable==1.0.0`).

### Configuration

L'Agent surveille les logs `webserver` et `backend` de Tenable Nessus pour recueillir des données sur les analyses Nessus.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `tenable.d/conf.yaml`, puis modifiez-le :

   Consultez le [fichier d'exemple tenable.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

   ```yaml
      logs:
       - type: file
         path: /opt/nessus/var/nessus/logs/backend.log
         service: nessus_backend
         source: tenable

       - type: file
         path: /opt/nessus/var/nessus/logs/www_server.log
         service: nessus_webserver
         source: tenable
   ```

    Personnalisez les valeurs des paramètres `path` et `service` pour votre environnement, le cas échéant.

3. [Redémarrez l'Agent][4].


#### Données de logs recueillies

1. Les logs de backend Nessus recueillent des données relatives aux éléments suivants : noms d'analyse, heure de début, heure de fin, durées, cible(s)
2. Les logs de serveur Web Nessus recueillent des données relatives aux logs d'accès d'un serveur Nessus, y compris les adresses IP client, les user-agents et les connexions (tentatives/réussites/échecs).


### Métriques

Cette intégration n'inclut aucune métrique.

### Événements

Cette intégration n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://www.tenable.com/products/nessus
[2]: https://docs.datadoghq.com/fr/agent/guide/integration-management/#install
[3]: https://github.com/DataDog/integrations-core/blob/master/tenable/datadog_checks/tenable/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/help/
---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Active Directory: assets/dashboards/active_directory.json
  logs:
    source: ruby
  metrics_metadata: metadata.csv
  monitors:
    '[Active Directory] Anomalous number of sessions for connected LDAP clients for host: {{host.name}}': assets/monitors/ldap_client_sessions.json
    '[Active Directory] Anomalous number of successful LDAP bindings for host: {{host.name}}': assets/monitors/ldap_binding_successful.json
    '[Active Directory] Elevated LDAP binding duration for host {{host.name}}': assets/monitors/ldap_binding.json
  service_checks: assets/service_checks.json
categories:
- os & system
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md
description: Recueillez et représentez graphiquement des métriques de Microsoft Active Directory.
display_name: Active Directory
draft: false
git_integration_title: active_directory
guid: ba667ff3-cf6a-458c-aa4b-1172f33de562
integration_id: active-directory
integration_title: Active Directory
integration_version: 1.15.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: active_directory.
metric_to_check: active_directory.dra.inbound.objects.persec
name: active_directory
public_title: Integration Datadog/Active Directory
short_description: Recueillez et représentez graphiquement des métriques de Microsoft
  Active Directory.
support: core
supported_os:
- windows
---



## Présentation

Recueillez des métriques et des logs à partir de Microsoft Active Directory pour visualiser et surveiller ses performances.

## Configuration

### Installation

Le check Active Directory de l'Agent est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

Si vous installez l'Agent Datadog dans un environnement de domaine, consultez [les exigences d'installation de l'Agent][2]

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `active_directory.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance Active Directory. La configuration par défaut devrait déjà recueillir des métriques pour le localhost. Consultez le [fichier d'exemple active_directory.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

**Remarque** : les versions 1.13.0+ de ce check utilisent une nouvelle implémentation pour la collecte de métriques qui nécessite d'utiliser Python 3. Pour les hosts ne pouvant pas utiliser Python 3, ou si vous souhaitez utiliser une ancienne version de ce check, consultez [cette configuration][6].

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `active_directory.d/conf.yaml` pour commencer à recueillir vos logs Active Directory :

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: ruby
       service: "<MY_SERVICE>"
   ```

   Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple active_directory.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. Cette intégration doit être utilisée avec le [module Active Directory pour Ruby][7]. Si vous n'utilisez pas le module Ruby, définissez la valeur de `source` sur `active_directory` et configurez le `path` de votre environnement.

4. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `active_directory` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "active_directory" >}}


### Événements

Le check Active Directory n'inclut aucun événement.

### Checks de service

Le check Active Directory n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[7]: https://www.rubydoc.info/gems/activedirectory/0.9.3
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[10]: https://docs.datadoghq.com/fr/help/
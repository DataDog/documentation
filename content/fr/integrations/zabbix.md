---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md'
display_name: Zabbix
draft: true
git_integration_title: zabbix
guid: bf1fa08e-3df3-40b7-ab1d-1ba685c3057d
integration_id: zabbix
integration_title: zabbix
is_public: false
kind: integration
maintainer: KosukeKamiya@users.noreply.github.com
manifest_version: 1.0.0
metric_prefix: zabbix.
metric_to_check: ''
name: zabbix
public_title: zabbix
short_description: Recueillez l'historique des éléments via l'API Zabbix et envoyez-les à Datadog en tant que métriques.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Zabbix][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Pour installer le check Zabbix sur votre host :

1. Installez le [kit de développement][2] sur n'importe quelle machine.
2. Exécutez `ddev release build zabbix` pour générer le package.
3. [Téléchargez l'Agent Datadog][3].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/zabbix/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `zabbix.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Zabbix. Consultez le [fichier d'exemple zabbix.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `zabbix` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "zabbix" >}}


### Checks de service

`zabbix.can_connect` : renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'API Zabbix. Si ce n'est pas le cas, renvoie OK.

### Événements

Zabbix n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://www.zabbix.com/
[2]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
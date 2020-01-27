---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md'
display_name: Unbound
git_integration_title: unbound
guid: 2b31e667-1fd9-440f-9e96-c72bea3cf3ca
integration_id: unbound
integration_title: Unbound
is_public: true
kind: integration
maintainer: david.byron@avast.com
manifest_version: 1.0.0
metric_prefix: unbound.
metric_to_check: ''
name: unbound
public_title: Intégration Datadog/Unbound
short_description: Une intégration Datadog pour recueillir les métriques Unbound
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Unbound][1] avec l'Agent Datadog.

Recueillez des métriques du service Unbound en temps réel pour :

* Visualiser et surveiller les états de Unbound

## Implémentation

### Installation

Le check Unbound n'est **PAS** inclus avec le paquet de l'[Agent Datadog][2].

Pour installer le check Unbound sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build unbound` pour générer le paquet.
3. [Installez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/unbound/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `unbound.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir les métriques Unbound. Consultez
   le [fichier d'exemple unbound.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `unbound` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "unbound" >}}


### Checks de service

**unbound.can_get_stats**
Renvoie CRITICAL en cas d'échec de unbound-control ou d'erreur de parsing de la sortie. Si ce n'est pas le cas, renvoie OK.

### Événements

Le check Unbound n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://docs.datadoghq.com/fr/agent
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://docs.datadoghq.com/fr/help



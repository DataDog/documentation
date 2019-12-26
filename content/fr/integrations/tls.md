---
assets:
  dashboards:
    TLS Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tls/README.md'
display_name: TLS
git_integration_title: tls
guid: 4e27a211-a034-42dd-9939-9ef967b1da50
integration_id: tls
integration_title: TLS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tls.
metric_to_check: tls.seconds_left
name: tls
public_title: Intégration Datadog/TLS
short_description: 'Surveillez les versions du protocole TLS, l''expiration et la validité des certificats, etc.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller les versions du protocole [TLS][1], l'expiration et la validité des certificats, etc.

**Remarque** : seule la couche TCP est actuellement prise en charge.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][9] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check TLS est inclus avec le paquet de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `tls.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données TLS. Consultez le [fichier d'exemple tls.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `tls` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tls" >}}


### Événements

TLS n'inclut aucun événement.

### Checks de service

Consultez le fichier [service_checks.json][7] pour afficher la liste des checks de service fournis par cette intégration.

- `tls.can_connect` : renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'endpoint qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.
- `tls.version` : renvoie `CRITICAL` si une connexion à une version non autorisée du protocole est établie. Si ce n'est pas le cas, renvoie `OK`.
- `tls.cert_validation` : renvoie `CRITICAL` si le certificat est incorrect ou ne correspond pas au hostname du serveur. Si ce n'est pas le cas, renvoie `OK`.
- `tls.cert_expiration` : renvoie `CRITICAL` si le certificat a expiré ou expire dans moins de `days_critical`/`seconds_critical`, renvoie `WARNING` s'il expire dans moins de `days_warning`/`seconds_warning`, ou renvoie `OK` pour les autres cas.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/tls/datadog_checks/tls/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/tls/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/tls/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help
[9]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}
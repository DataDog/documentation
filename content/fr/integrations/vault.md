---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - configuration & deployment
  - aws
  - google cloud
  - azure
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vault/README.md'
display_name: Vault
git_integration_title: vault
guid: d65af827-c818-44ce-9ec3-cd7ead3ac4ce
integration_id: vault
integration_title: Vault
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vault.
metric_to_check: vault.is_leader
name: vault
public_title: Intégration Datadog/Vault
short_description: Vault est un service de gestion de secrets
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille la santé du cluster [Vault][1] et les changements de leader.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Vault est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `vault.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de performance vault. Consultez le [fichier d'exemple vault.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `vault` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "vault" >}}


### Événements

`vault.leader_change` :
Cet événement se déclenche en cas de changement de leader du cluster.

### Checks de service

`vault.can_connect` :
Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à Vault. Si ce n'est pas le cas, renvoie OK.

`vault.unsealed` :
Renvoie CRITICAL si Vault est scellé. Si ce n'est pas le cas, renvoie OK.

`vault.initialized` :
Renvoie CRITICAL si Vault n'est pas encore initialisé. Si ce n'est pas le cas, renvoie OK.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Surveiller HashiCorp Vault avec Datadog][10]

[1]: https://www.vaultproject.io
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/vault/datadog_checks/vault/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/vault/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog


{{< get-dependencies >}}
---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors:
    Snowflake failed logins: assets/recommended_monitors/snowflake_failed_logins.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - data store
  - gestion des coûts
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md'
display_name: Snowflake
draft: true
git_integration_title: snowflake
guid: 4813a514-e9a4-4f28-9b83-b4221b51b18b
integration_id: snowflake
integration_title: Snowflake
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snowflake.
metric_to_check: snowflake.storage.storage_bytes.total
name: snowflake
public_title: Intégration Datadog/Snowflake
short_description: 'Surveillez des métriques clés concernant l''utilisation des crédits, le stockage, les requêtes, l''historique utilisateur et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Snowflake][1] via l'Agent Datadog. Snowflake est un entrepôt de données analytique fourni en tant que SaaS et s'exécute entièrement sur une infrastructure cloud. 
Cette intégration permet de surveiller les crédits, la facturation, l'utilisation du stockage, l'historique des requêtes et bien plus encore.

**Remarque** : les métriques sont collectées par le biais de requêtes envoyées à Snowflake. Les requêtes provenant de l'intégration sont facturables par Snowflake.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check Snowflake est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

**Remarque** : actuellement, le check Snowflake n'est pas disponible pour macOS dans l'Agent Datadog 6 avec Python 2.

### Configuration

1. Modifiez le fichier `snowflake.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à collecter vos données de performance Snowflake. Consultez le [fichier d'exemple snowflake.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

    **Remarque** : par défaut, cette intégration surveille la base de données `SNOWFLAKE` et le schéma `ACCOUNT_USAGE`.
    Cette base de données est disponible par défaut et ne peut être consultée que par les utilisateurs disposant du rôle `ACCOUNTADMIN` ou [tout rôle accordé par le rôle ACCOUNTADMIN][4].

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `snowflake` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "snowflake" >}}


### Checks de service

`snowflake.can_connect` : renvoie `CRITICAL` si l'Agent ne parvient pas à s'authentifier et à se connecter à Snowflake. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Snowflake n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://www.snowflake.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
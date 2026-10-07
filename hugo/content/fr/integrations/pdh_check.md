---
app_id: pdh
app_uuid: 75f6813c-934c-4f1a-b8f4-71f9f1911165
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PDH
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md
display_on_public_website: true
draft: false
git_integration_title: pdh_check
integration_id: pdh
integration_title: Check PDH
integration_version: 1.17.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pdh_check
public_title: Check PDH
short_description: Recueillez et représentez graphiquement des compteurs de performances
  Windows
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  configuration: README.md#Setup
  description: Recueillez et représentez graphiquement des compteurs de performances
    Windows
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Check PDH
---



## Présentation

**Remarque** : il est déconseillé d'utiliser le check PDH. Optez plutôt pour le [check Compteurs de performances Windows][1].

Recueillez des métriques à partir des compteurs de performances Windows en temps réel pour :

- Visualiser et surveiller des compteurs de performances Windows via l'API PDH.

## Configuration

### Installation

Le check PDH est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer.

### Configuration

1. Modifiez le fichier `pdh_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance Windows. Consultez le [fichier d'exemple pdh_check.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

Lancez la [sous-commande status de l'Agent][6] et cherchez `pdh_check` dans la section Checks.

## Données collectées

### Métriques

Toutes les métriques recueillies par le check PDH sont transmises à Datadog en tant que [métriques custom][7]. Ces métriques sont susceptibles d'avoir une incidence sur votre [facturation][18].

### Événements

Le check PDH n'inclut aucun événement.

### Checks de service

Le check PDH n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.datadoghq.com/fr/integrations/windows_performance_counters/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[9]: https://docs.datadoghq.com/fr/help/
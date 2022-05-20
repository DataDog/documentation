---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - automation
  - monitoring
  - notification
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/insightfinder/README.md
display_name: InsightFinder
draft: false
git_integration_title: insightfinder
guid: 1ecaeadf-7b34-48f7-b9cb-81b8a9e4e4dc
integration_id: insightfinder
integration_title: InsightFinder
integration_version: ''
is_public: true
kind: integration
maintainer: support@insightfinder.com
manifest_version: 1.0.0
metric_prefix: insightfinder.
metric_to_check: ''
name: insightfinder
public_title: InsightFinder
short_description: Intégrez les données de Datadog afin qu'elles soient analysées par InsightFinder
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[InsightFinder][1] est une solution AIOps qui identifie les problèmes au sein de vos applications et systèmes avant qu'ils n'affectent vos utilisateurs. Basé sur un système d'apprentissage automatique non supervisé, InsightFinder analyse en continu les événements, logs, métriques et changements afin de détecter les anomalies, prédire les incidents et remédier aux pannes.

InsightFinder ingère les données de Datadog via les API standard et détecte les événements anormaux avant que votre entreprise ne soit impactée.

## Configuration

### Installation

Pour configurer l'intégration et envoyer des données à InsightFinder, consultez l'[intégration InsightFinder/Datadog][2]. Vous aurez besoin d'[une clé d'API et d'une clé d'application Datadog][3].

Si vous n'avez pas encore de compte InsightFinder, [inscrivez-vous][4] pour démarrer votre essai gratuit.

## Assistance

Contactez l'[assistance Datadog][5] ou envoyez un e-mail à l'[assistance InsightFinder][6].


[1]: https://insightfinder.com/
[2]: https://insightfinder.com/datadog-integration/
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[4]: https://app.insightfinder.com/auth/signup
[5]: https://docs.datadoghq.com/fr/help/
[6]: mailto:support@insightfinder.com
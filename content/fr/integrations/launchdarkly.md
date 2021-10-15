---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"categories":
- notification
"creates_events": true
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md"
"display_name": "LaunchDarkly"
"draft": false
"git_integration_title": "launchdarkly"
"guid": "a1441ba8-be33-4123-8808-5a87cd696b64"
"integration_id": "launchdarkly"
"integration_title": "LaunchDarkly"
"is_public": true
"kind": "integration"
"maintainer": "support@launchdarkly"
"manifest_version": "1.0.0"
"metric_prefix": "launchdarkly_relay."
"metric_to_check": "launchdarkly_relay.connections_env_platformCategory_userAgent"
"name": "launchdarkly"
"public_title": "Intégration Datadog/LaunchDarkly"
"short_description": "Surveillez les changements LaunchDarkly depuis Datadog"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## Présentation

L'intégration Datadog/LaunchDarkly vous permet de visualiser l'incidence de vos déploiements de fonctionnalités LaunchDarkly sur les services ou les systèmes de votre client. Ainsi, si le déploiement d'une fonctionnalité entraîne le ralentissement d'un service, vous pourrez en détecter la cause dans Datadog.

![Événements LaunchDarkly dans Datadog][1]

## Configuration

Cette intégration nécessite une [clé API Datadog][2]. Seuls les administrateurs Datadog peuvent en créer une. Une fois votre clé créée, consultez la [documentation LaunchDarkly relative à l'intégration Datadog][3] pour découvrir comment configurer l'intégration Datadog/LaunchDarkly.

**Remarque** : pour configurer l'intégration, vous devez avoir une [clé API Datadog][2] valide.

## Données collectées

### Métriques

L'intégration LaunchDarkly n'inclut aucune métrique.

### Événements

L'intégration LaunchDarkly envoie des événements sur les flags, projets et environnements de LaunchDarkly à Datadog.

### Checks de service

L'intégration LaunchDarkly n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance LaunchDarkly][4].

## Pour aller plus loin

Pour en savoir plus sur [LaunchDarkly][5] et cette intégration, cliquez [ici][3].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/launchdarkly/images/ld-datadog-hover.gif
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.launchdarkly.com/docs/datadog
[4]: https://support.launchdarkly.com/hc/en-us/requests/new
[5]: https://launchdarkly.com


---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - aws
  - cloud
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/appkeeper/README.md'
display_name: AppKeeper
draft: true
git_integration_title: appkeeper
guid: 3cde5eb5-eadb-4065-8235-fb035abc34be
integration_id: appkeeper
integration_title: AppKeeper
is_public: false
kind: integration
maintainer: rd-pd-1@sios.com
manifest_version: 1.0.0
metric_prefix: AppKeeper.
metric_to_check: ''
name: AppKeeper
public_title: Intégration Datadog/AppKeeper
short_description: Redémarrage de services basés sur des alertes Datadog
support: contrib
supported_os:
  - linux
  - windows
---
## Présentation

SIOS AppKeeper redémarre automatiquement les services Amazon EC2 qui ont échoué lorsque des notifications sont envoyées par Datadog, comme Synthetic. Il n'est ainsi plus nécessaire de prévoir une intervention manuelle coûteuse.

Après avoir détecté les alertes, Datadog redémarre le service via l'API Recovery d'AppKeeper.

## Configuration

### Étape 1. Obtenir la clé d'API SIOS AppKeeper

Obtenez la clé d'API SIOS AppKeeper à partir de l'interface graphique AppKeeper.

![snapshot][1]

### Étape 2. Définir le webhook dans le dashboard d'intégration Datadog

![snapshot][2]

### Étape 3. Définir la CHARGE UTILE et les EN-TÊTES PERSONNALISÉS

![snapshot][3]

1. Saisissez l'**URL suivante** : "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover".
2. Saisissez l'ID de l'instance et le nom des services pour l'instance de surveillance dans **Payload**.
3. Enregistrez le token d'API AppKeeper **appkeeper-integration-token** dans **Custom Headers**.

Pour en savoir plus sur l'intégration AppKeeper, consultez la [documentation][4] AppKeeper.

## Données collectées

### Métriques

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token2.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/datadog_webhook.jpg
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[4]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[5]: https://docs.datadoghq.com/fr/help/
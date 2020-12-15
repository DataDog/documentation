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

![snapshot][1]

![snapshot][2]

## Configuration

### 1re étape : récupération de la clé d'API SIOS AppKeeper

Récupérez la clé d'API SIOS AppKeeper à partir de l'interface graphique AppKeeper.

1. Cliquez sur **Account Information**, puis ouvrez la boîte de dialogue modale.
2. Cliquez sur **Get Token**.
3. Copiez le token.

![snapshot][3]

### 2e étape : définition du webhook dans le dashboard d'intégration Datadog

1. Cliquez sur l'intégration.
2. Cliquez sur les webhooks (installez-les si vous ne l'avez pas encore fait).

![snapshot][4]

### 3e étape : définition de la charge utile et des en-têtes personnalisés

1. Saisissez l'**URL suivante** : "https://api.appkeeper.sios.com/v2/integration/{AWS_account_ID}/actions/recover".
2. Saisissez l'ID de l'instance et le nom des services pour l'instance de surveillance dans **Payload**.
3. Enregistrez le token d'API AppKeeper **appkeeper-integration-token** dans **Custom Headers**.

![snapshot][5]

### 4e étape : intégration à la surveillance Datadog

En guise d'exemple, créez un nouveau test Synthetic et configurez l'intégration avec AppKeeper.

1. Accédez à UX Monitoring. Sélectionnez **Synthetic Test**.
2. Cliquez sur **New Test** pour créer un nouveau test Synthetics.

![snapshot][6]

3. Remplissez les champs liés à la surveillance.

![snapshot][7]

4. Ajoutez le webhook défini lors des étapes 2 et 3 dans les réglages de notification (Notify you team).

![snapshot][8]

5. Vous avez la possibilité de désactiver les notifications d'une alerte qui se déclenche régulièrement.
Dans ce cas, l'API de récupération d'AppKeeper n'est pas appelée par le webhook. **Ne définissez pas cette fonctionnalité pour empêcher les appels**.

![snapshot][9]

6. Les résultats des récupérations par AppKeeper sont indiqués dans l'interface graphique d'AppKeeper.

![snapshot][10]


Pour en savoir plus sur l'intégration AppKeeper, consultez la [documentation][11] AppKeeper (en anglais).

## Données collectées

### Métriques

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/integration.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/integration2.jpg
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token.jpg
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/datadog_webhook.jpg
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test2.jpg
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test3.jpg
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test4.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/history.jpg
[11]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[12]: https://docs.datadoghq.com/fr/help/
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
ddtype: crawler
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

SIOS AppKeeper redémarre automatiquement les services Amazon EC2 ayant échoué lorsque des notifications sont envoyées par Datadog. Il n'est ainsi plus nécessaire de prévoir une intervention manuelle coûteuse. Lorsque Datadog déclenche une alerte, le service EC2 est redémarré via l'API AppKeeper Recovery.

## Configuration

### Récupérer la clé d'API SIOS AppKeeper

Récupérez la clé d'API SIOS AppKeeper à partir de l'interface graphique d'AppKeeper.

1. Cliquez sur **Account Information** et ouvrez la boîte de dialogue modale.
2. Cliquez sur **Get token**.
3. Copiez le token.

![snapshot][1]

### Installer et configurer l'intégration Webhooks

1. Dans l'app Datadog, accédez à l'[intégration Webhooks][2] et installez-la.
2. Sélectionnez l'onglet **Configuration**.
3. Sous l'en-tête **Webhooks**, cliquez sur **New**.
4. Saisissez l'URL suivante : "https://api.appkeeper.sios.com/v2/integration/{ID_compte_AWS}/actions/recover".
5. Saisissez l'`id` et le nom de `name` pour l'instance de surveillance dans la section **Payload**.
3. Enregistrez le token de l'API AppKeeper dans la section **Custom Headers**.

![snapshot][3]

### Intégration à la surveillance Datadog

1. Créez un nouveau [test Synthetic][4] Datadog. Cliquez sur **New test** en haut à droite.
2. Lors de l'étape **Define requests**, saisissez l'URL que vous souhaitez surveiller.
3. Lors de l'étape **Define assertions**, cliquez sur **New assertion** et ajoutez les paramètres suivants : When `status code` is `200`. Cela déclenche une alerte dès lors que le code de statut n'est **pas** 200. SI vous souhaitez que la requête envoie une notification pour un statut différent, remplacez 200 par le code de statut de votre choix.
4. Cliquez à nouveau sur **New Assertion** et ajoutez un second ensemble de paramètres : And `response time` is less than `2000` ms. Cela déclenche une alerte lorsque le temps de réponse dépasse 2 000 ms. Si vous souhaitez définir un temps de réponse plus ou moins long, remplacez `2000` par la valeur de votre choix.
5. Lors de l'étape **Notify your team**, ajoutez le webhook, au format `@webhook-nom_du_webhook`. Ajoutez un message dans la notification. **Remarque** : l'intervalle de surveillance minimal pour le paramètre **renotify if the monitor has not been resolved** de cette étape est `Every 10 Minutes.` Si vous le définissez sur **Never**, cela empêchera le webhook d'appeler l'API de récupération d'AppKeeper.

![snapshot][5]

Les résultats des récupérations par AppKeeper sont indiqués dans l'interface graphique d'AppKeeper.

![snapshot][6]

Pour en savoir plus sur l'intégration AppKeeper, consultez la [documentation][7] AppKeeper.

## Données collectées

### Métriques

Consultez le fichier [metadata.csv][8] pour découvrir la liste des métriques fournies par cette intégration.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/get_token.jpg
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/payload_header.jpg
[4]: https://app.datadoghq.com/synthetics/list
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/synthetic_test_params.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/appkeeper/images/history.jpg
[7]: https://sioscoati.zendesk.com/hc/en-us/articles/900000978443-Integration
[8]: https://github.com/DataDog/integrations-extras/blob/master/appkeeper/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
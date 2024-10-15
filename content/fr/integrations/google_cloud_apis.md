---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés des API Google\_Cloud."
doc_link: https://docs.datadoghq.com/integrations/google_cloud_apis/
draft: false
git_integration_title: api_google_cloud
has_logo: true
integration_id: google-cloud-apis
integration_title: "API Google\_Cloud"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: api_google_cloud
public_title: "Intégration Datadog/API Google\_Cloud"
short_description: "Surveillez des métriques clés des API Google\_Cloud."
version: '1.0'
---
## Présentation

Les API Google Cloud vous permettent d'accéder aux produits de la Google Cloud Platform à partir de votre code.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques des API Google Cloud.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud API sont recueillis avec Google Cloud Logging et envoyés à un Cloud Pub/Sub via un forwarder Push HTTP. Si vous ne l'avez pas déjà fait, configurez un [Cloud Pub/Sub à l'aide d'un forwarder Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud API depuis Google Cloud Logging vers le Pub/Sub :

1. Accédez à la [page Google Cloud Logging][3] et filtrez les logs Google Cloud API.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_apis" >}}


### Événements

L'intégration API Google Cloud n'inclut aucun événement.

### Checks de service

L'intégration API Google Cloud n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
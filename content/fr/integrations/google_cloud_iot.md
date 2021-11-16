---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_IoT "
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_iot/'
draft: false
git_integration_title: google_cloud_iot
has_logo: true
integration_id: google-cloud-iot
integration_title: "Google\_Cloud\_IoT"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_iot
public_title: "Intégration Datadog/Google\_Cloud\_IoT"
short_description: "Surveillez des métriques clés de Google\_Cloud\_IoT."
version: '1.0'
---
## Présentation

Cloud IoT est un service entièrement géré qui vous permet de connecter, de gérer et d'ingérer, de manière simple et sécurisée, des données provenant de millions d'appareils partout dans le monde.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud IoT.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud IoT sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud IoT depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud IoT.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_iot" >}}


### Événements

L'intégration Google Cloud IoT n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud IoT n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_iot/google_cloud_iot_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
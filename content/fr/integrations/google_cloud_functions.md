---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez les temps d''exécution de fonctions min, max et moyenne.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_functions/'
draft: false
git_integration_title: google_cloud_functions
has_logo: true
integration_title: Google Cloud Functions
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_functions
public_title: "Intégration Datadog/Google\_Cloud\_Functions"
short_description: 'Surveillez les temps d''exécution de fonctions min, max et moyenne.'
version: '1.0'
---
## Présentation

Google Cloud Functions est une solution de calcul asynchrone, légère et basée sur des événements qui vous permet de créer de petites fonctions à usage unique.

Recueillez des métriques de Google Functions pour :

- Visualiser les performances de vos fonctions
- Corréler les performances de vos fonctions avec vos applications

## Configuration

### Collecte de métriques

#### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud Function sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Function depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud Function.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_functions" >}}


### Événements

L'intégration Google Cloud Functions n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Functions n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
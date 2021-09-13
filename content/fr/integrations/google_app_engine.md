---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: Recueillez des métriques pour votre projet et comparez-les entre ses différentes versions.
doc_link: 'https://docs.datadoghq.com/integrations/google_app_engine/'
draft: false
git_integration_title: google_app_engine
has_logo: true
integration_id: google-app-engine
integration_title: Google App Engine
is_public: true
kind: integration
manifest_version: '1.0'
name: google_app_engine
public_title: "Intégration Datadog/Google\_App\_Engine"
short_description: Recueillez des métriques pour votre projet et comparez-les entre ses différentes versions.
version: '1.0'
---
## Présentation

Installez l'intégration Google App Engine dans votre projet pour :

- Consulter les métriques de vos services Google App Engine (memcache, files d'attente de tâches, banques de données, etc.)
- Consulter des métriques sur les requêtes (pourcentages, latence, coût, etc.)
- Appliquer des tags aux métriques de Google App Engine en fonction de leur version pour comparer les performances des différentes versions

Vous pouvez également envoyer des métriques custom à Datadog.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google App Engine sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google App Engine depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs de Google App Engine.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_app_engine" >}}


### Événements

L'intégration Google App Engine n'inclut aucun événement.

### Checks de service

L'intégration Google App Engine n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
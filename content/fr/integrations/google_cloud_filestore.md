---
categories:
- cloud
- data store
- google cloud
- log collection
dependencies: []
description: Surveillez des métriques clés de Google Cloud Filestore.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_filestore/
draft: false
git_integration_title: google_cloud_filestore
has_logo: true
integration_id: google-cloud-filestore
integration_title: Google Cloud Filestore
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_filestore
public_title: Intégration Datadog/Google Cloud Filestore
short_description: Surveillez des métriques clés de Google Cloud Filestore.
version: '1.0'
---

## Présentation

Google Cloud Filestore est un service géré de stockage de fichiers destiné aux applications qui requièrent une interface de système de fichiers ainsi qu'un système de fichiers partagé pour les données.

Utilisez l'intégration Datadog Google Cloud Platform pour recueillir des métriques de Google Cloud Filestore.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud Filestore sont recueillis avec Google Cloud Logging et envoyés à un Cloud Pub/Sub via un forwarder Push HTTP. Si vous ne l'avez pas déjà fait, configurez un [Cloud Pub/Sub à l'aide d'un forwarder Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Filestore depuis Google Cloud Logging vers le Pub/Sub :

1. Accédez à la [page Google Cloud Logging][3] et filtrez les logs Google Cloud Filestore.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_filestore" >}}


### Événements

L'intégration Google Cloud Filestore n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Filestore n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_file/google_cloud_filestore_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
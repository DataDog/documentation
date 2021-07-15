---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Router."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_router/'
draft: false
git_integration_title: google_cloud_router
has_logo: true
integration_id: google-cloud-router
integration_title: "Google\_Cloud\_Router"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_router
public_title: "Intégration Datadog/Google\_Cloud\_Router"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Router."
version: '1.0'
---
## Présentation

Google Cloud Router permet l'échange dynamique de routes entre votre cloud privé virtuel (VPC) et vos réseaux sur site à l'aide du protocole BGP (Border Gateway Protocol).

Utilisez l'intégration Datadog Google Cloud Platform pour recueillir des métriques de Google Cloud Router.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud Router sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Router depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud Router.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_router" >}}


### Événements

L'intégration Google Cloud Router n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Router n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_router/google_cloud_router_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
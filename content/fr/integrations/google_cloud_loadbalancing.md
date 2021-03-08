---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Load\_Balancing."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/'
draft: false
git_integration_title: google_cloud_loadbalancing
has_logo: true
integration_title: "Google\_Cloud\_Load\_Balancing"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_loadbalancing
public_title: "Intégration Datadog/Google\_Cloud\_Load\_Balancing"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Load\_Balancing."
version: '1.0'
---
## Présentation

Google Cloud Load Balancing vous permet de répartir vos ressources informatiques à équilibrage de charge dans une seule ou plusieurs régions, près de vos utilisateurs, et de bénéficier de la haute disponibilité dont vous avez besoin. Associez vos ressources à une seule adresse IP Anycast et faites-les évoluer à la hausse ou à la baisse grâce à la fonctionnalité d'autoscaling intelligent.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Load Balancing.

## Implémentation

### Collecte de métriques

#### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs d'équilibreur de charge HTTP Google Cloud sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs d'équilibreur de charge HTTP Google Cloud depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][5] et filtrez les logs d'équilibreur de charge HTTP Google Cloud.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_loadbalancing" >}}


### Événements

L'intégration Google Cloud Load Balancing n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Load Balancing n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_loadbalancing/google_cloud_loadbalancing_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
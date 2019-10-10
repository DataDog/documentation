---
categories:
  - cloud
  - google cloud
  - data store
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Bigtable."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_bigtable/'
git_integration_title: google_cloud_bigtable
has_logo: true
integration_title: "Google\_Bigtable"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_bigtable
public_title: "Intégration Datadog/Google\_Bigtable"
short_description: "Surveillez des métriques clés de Google\_Bigtable."
version: 1
---
## Présentation
Cloud Bigtable est le service de base de données NoSQL big data de Google. Cette base de données est utilisée par beaucoup de services Google, tels que le moteur de recherche, Analytics, Maps et Gmail.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Bigtable.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_bigtable" >}}


### Événements
L'intégration Google Bigtable n'inclut aucun événement.

### Checks de service
L'intégration Google Bigtable n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_bigtable/google_cloud_bigtable_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
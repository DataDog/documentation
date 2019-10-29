---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Dataproc."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_dataproc/'
git_integration_title: google_cloud_dataproc
has_logo: true
integration_title: "Google\_Cloud\_Dataproc"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_dataproc
public_title: "Intégration Datadog/Google\_Cloud\_Dataproc"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Dataproc."
version: 1
---
## Présentation
Cloud Dataproc est un service cloud rapide, facile à utiliser et entièrement géré qui permet une exécution plus simple et plus rentable des clusters Apache Spark et Apache Hadoop.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Dataproc.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_dataproc" >}}


### Événements
L'intégration Google Cloud Dataproc n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Dataproc n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataproc/google_cloud_dataproc_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
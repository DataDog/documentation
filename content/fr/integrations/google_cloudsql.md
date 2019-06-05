---
categories:
  - cloud
  - data store
  - google cloud
ddtype: crawler
dependencies: []
description: 'Surveillez des métriques de base de données relatives aux performances, à la santé et à la réplication.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloudsql/'
git_integration_title: google_cloudsql
has_logo: true
integration_title: "Google\_Cloud\_SQL"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloudsql
public_title: "Intégration Datadog/Google\_Cloud\_SQL"
short_description: 'Surveillez des métriques de base de données relatives aux performances, à la santé et à la réplication.'
version: '1.0'
---
## Présentation
Google Cloud SQL est un service de base de données entièrement géré qui vous permet de configurer, maintenir, gérer et administrer facilement vos bases de données MySQL dans le cloud.

Recueillez des métriques de Google Cloud SQL pour :

* Visualiser les performances de vos bases de données CloudSQL
* Corréler les performances de vos bases de données CloudSQL avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloudsql" >}}


### Événements
L'intégration Google Cloud SQL n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud SQL n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
---
categories:
  - cloud
  - google cloud
  - data store
ddtype: crawler
dependencies: []
description: 'Surveillez les performances de lecture/écriture de Datastore, le nombre de requêtes, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_datastore/'
git_integration_title: google_cloud_datastore
has_logo: true
integration_title: "Google\_Datastore"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_datastore
public_title: "Intégration Datadog/Google\_Datastore"
short_description: 'Surveillez les performances de lecture/écriture de Datastore, le nombre de requêtes, et plus encore.'
version: '1.0'
---
## Présentation
Cloud Datastore est une base de données NoSQL à haute évolutivité pour vos applications Web et mobiles.

Recueillez des métriques de Google Datastore pour :

* Visualiser les performances de vos entrepôts de données
* Corréler les performances de vos entrepôts de données avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_datastore" >}}


### Événements
L'intégration Google Cloud Datastore n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Datastore n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_datastore/google_cloud_datastore_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
---
categories:
  - cloud
  - google cloud
  - data store
ddtype: crawler
dependencies: []
description: 'Surveillez le nombre de requêtes, les délais d''exécution, les octets et les rangs téléchargés, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_big_query/'
git_integration_title: google_cloud_big_query
has_logo: true
integration_title: "Google\_BigQuery"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_big_query
public_title: "Intégration Datadog/Google\_BigQuery"
short_description: 'Surveillez le nombre de requêtes, les délais d''exécution, les octets et les rangs téléchargés, et plus encore. more.'
version: '1.0'
---
## Présentation
BigQuery est l'entrepôt de données entièrement géré et à faible coût de Google qui stocke des pétaoctets de données à des fins d'analyse.

Recueillez des métriques de Google BigQuery pour :

* Visualiser les performances de vos requêtes BigQuery
* Corréler les performances de vos requêtes BigQuery avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_big_query" >}}


### Événements
L'intégration Google BigQuery n'inclut aucun événement.

### Checks de service
L'intégration Google BigQuery n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
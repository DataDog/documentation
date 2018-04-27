---
categories:
- cloud
- google cloud
- data store
ddtype: crawler
description: Suivre le nombre de requêtes, les temps d'exécution, les octets téléchargés et les rows, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_big_query/
git_integration_title: google_cloud_big_query
has_logo: true
integration_title: Google BigQuery
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_big_query
public_title: Intégration Datadog-Google BigQuery
short_description: Suivre le nombre de requêtes, les temps d'exécution, les octets téléchargés et les rows, et 
  more.
version: '1.0'
---

## Aperçu
BigQuery est le data warehouse à fin d'analyses de Google, entièrement géré à l'échelle du pétaoctet le tout pour un faible coût.

Obtenir les métriques de Google BigQuery pour:

* Visualiser les performances de vos requêtes BigQuery
* Corréler les performances de vos requêtes BigQuery avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [Intégration Google Cloud Platform en premier](https://docs.datadoghq.com/integrations/google_cloud_platform/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_big_query" >}}


### Evénements
L'intégration Google BigQuery n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Google BigQuery n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

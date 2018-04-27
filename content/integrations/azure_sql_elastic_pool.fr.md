---
categories:
- cloud
- azure
- data store
- provisioning
- configuration & deployment
ddtype: crawler
description: Suivre les métriques Azure SQL Elastic Pool.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_title: Microsoft Azure SQL Elastic Pool
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Intégration Datadog-Microsoft Azure SQL Elastic Pool 
short_description: Suivre les métriques Azure SQL Elastic Pool.
version: '1.0'
---

## Aperçu
Les pools Elastic constituent une solution simple simple et économique pour gérer les performances de plusieurs base de données.

Obtenir les métriques de Azure SQL Elastic Pool pour:

* Visualiser les performances de vos pools Elastic SQL
* Corréler les performances de votre pools Elastic SQL avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_sql_elastic_pool" >}}


### Evénements
L'intégration Azure SQL Elastic pools n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Azure SQL Elastic pools n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

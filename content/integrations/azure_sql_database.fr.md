---
categories:
- cloud
- data store
- caching
- azure
ddtype: crawler
description: Suivre les métriques clés de Azure SQL Database
doc_link: https://docs.datadoghq.com/integrations/azure_sql_database/
git_integration_title: azure_sql_database
has_logo: true
integration_title: Microsoft Azure SQL Database
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_sql_database
public_title: Intégration Datadog-Microsoft Azure SQL Database
short_description: Suivre les métriques clefs de Azure SQL Database
version: '1.0'
---


## Aperçu
La base de données SQL Azure vous offre un datastore robuste avec la possibilité d'évoluer pour répondre à la demande.

Obtenir les métriques de Azure SQL Database pour:

* Visualiser les performances de votre base de données SQL
* Corréler les performances de votre base de données SQL avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_sql_database" >}}


### Evénements
L'intégration Azure SQL Database n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Azure SQL Database pools n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

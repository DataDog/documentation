---
categories:
- cloud
- google cloud
ddtype: crawler
description: Suivre le min, max et average des temps d'exécution des fonctions.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_functions/
git_integration_title: google_cloud_functions
has_logo: true
integration_title: Google Cloud Functions
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_functions
public_title: Intégration Datadog-Google Cloud Functions
short_description: Suivre le min, max et average des temps d'exécution des fonctions.
version: '1.0'
---

## Aperçu
Google Cloud Functions est une solution de calcul asynchrone, légère et basée sur les événements, qui vous permet de créer de petites fonctions à usage unique.

Obtenir les métriques de Google Function pour:

* Visualiser les performances de vos Functions
* Corréler les performances de vos Functions avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [Intégration Google Cloud Platform en premier](https://docs.datadoghq.com/integrations/google_cloud_platform/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_functions" >}}


### Evénements
L'intégration Google Cloud Functions n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Google Cloud Functions n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

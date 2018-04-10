---
categories:
- cloud
- google cloud
ddtype: crawler
description: Suivre les principales métriques de Google Cloud Machine Learning.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_ml/
git_integration_title: google_cloud_ml
has_logo: true
integration_title: Google Machine Learning
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_ml
public_title: Intégration Datadog-Google Machine Learning
short_description: Suivre les principales métriques de Google Cloud Machine Learning.
version: '1.0'
---

## Aperçu
Google Cloud Machine Learning est un service managé qui vous permet de créer facilement des modèles d'apprentissage automatique, qui fonctionnent sur n'importe quel type de données, quelle que soit leur taille.

Obtenir les métriques de Google Machine Learning pour:

* Visualiser les performances de vos services ML
* Corréler les performances de vos services ML avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [Intégration Google Cloud Platform en premier][1]. Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_ml" >}}


### Evénements
L'intégration Google Cloud Machine Learning n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Google Cloud Machine Learning n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][2].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][3]


[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: http://docs.datadoghq.com/help/
[3]: https://www.datadoghq.com/blog/

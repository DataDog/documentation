---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Google Cloud Machine Learning.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_ml/'
git_integration_title: google_cloud_ml
has_logo: true
integration_title: Google Machine Learning
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_ml
public_title: Intégration Datadog/Google Machine Learning
short_description: Surveillez des métriques clés de Google Cloud Machine Learning.
version: '1.0'
---
## Présentation
Google Cloud Machine Learning est un service géré qui vous permet de créer facilement des modèles d'apprentissage automatique, qui fonctionnent sur n'importe quel type de données, quelle que soit leur taille.

Recueillez des métriques de Google Machine Learning pour :

* Visualiser les performances de vos services d'apprentissage automatique
* Corréler les performances de vos services d'apprentissage automatique avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_ml" >}}


### Événements
L'intégration Google Cloud Machine Learning n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Machine Learning n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
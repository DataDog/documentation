---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Machine Learning.
doc_link: 'https://docs.datadoghq.com/integrations/azure_machine_learning_services/'
draft: false
git_integration_title: azure_machine_learning_services
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Machine Learning
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_machine_learning_services
public_title: Intégration Datadog/Microsoft Azure Machine Learning
short_description: Surveillez des métriques clés d'Azure Machine Learning.
version: '1.0'
---
## Présentation

Le service Azure Machine Learning offre aux développeurs et aux data scientists un large éventail d'expériences productives pour créer, former et déployer des modèles d'apprentissage automatique plus rapidement. Utilisez Datadog pour surveiller les performances et l'utilisation d'Azure Machine Learning par rapport au reste de vos applications et de votre infrastructure.

Recueillez des métriques d'Azure Machine Learning pour :

* Surveiller le nombre d'exécutions et de déploiements de modèle ainsi que leur statut
* Surveiller l'utilisation de vos nœuds d'apprentissage automatique
* Optimiser votre rapport performances/coûts

## Configuration
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_machine_learning_services" >}}


### Événements
L'intégration Azure Machine Learning n'inclut aucun événement.

### Checks de service
L'intégration Azure Machine Learning n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_machine_learning_services/azure_machine_learning_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/
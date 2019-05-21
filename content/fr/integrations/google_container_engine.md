---
categories:
  - cloud
  - containers
  - google cloud
ddtype: crawler
dependencies: []
description: Surveillez l'utilisation des ressources de vos conteneurs GCE.
doc_link: 'https://docs.datadoghq.com/integrations/google_container_engine/'
git_integration_title: google_container_engine
has_logo: true
integration_title: "Google\_Container\_Engine"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_container_engine
public_title: Intégration Datadog/Google Container Engine
short_description: Surveillez l'utilisation des ressources de vos conteneurs GCE.
version: '1.0'
---
## Présentation
Google Container Engine est un puissant gestionnaire de clusters et un système d'orchestration pour l'exécution de conteneurs Docker.

Recueillez des métriques de Google Container Engine pour :

* Visualiser les performances de vos conteneurs Container Engine
* Corréler les performances de vos conteneurs Container Engine avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_container_engine" >}}


### Événements
L'intégration Google Container Engine n'inclut aucun événement.

### Checks de service
L'intégration Google Container Engine n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_container_engine/google_container_engine_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
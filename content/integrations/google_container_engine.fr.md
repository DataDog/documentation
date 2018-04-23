---
categories:
- cloud
- containers
- google cloud
ddtype: crawler
description: Monitorer l'utilisation des ressources de vos conteneurs GCE.
doc_link: https://docs.datadoghq.com/integrations/google_container_engine/
git_integration_title: google_container_engine
has_logo: true
integration_title: Google Container Engine
is_public: true
kind: integration
manifest_version: '1.0'
name: google_container_engine
public_title: Intégration Datadog-Google Container Engine
short_description: Surveiller l'utilisation des ressources de vos conteneurs GCE.
version: '1.0'
---

## Aperçu
Google Container Engine est un puissant gestionnaire de clusters et un système d'orchestration permettant d'exécuter vos conteneurs Docker.

Obtenir les métriques de Google Container Engine pour:

* Visualiser les performances de vos conteneurs Container Engine
* Corréler les performances de vos conteneurs Container Engine avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [Intégration Google Cloud Platform en premier](https://docs.datadoghq.com/integrations/google_cloud_platform/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_container_engine" >}}


### Evénements
L'intégration Google Container Engine n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Google Container Engine n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

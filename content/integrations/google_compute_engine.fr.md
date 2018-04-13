---
categories:
- cloud
- os & system
- google cloud
ddtype: crawler
description: Effectuer le suivi des instances occupées et comparer les mesures d'utilisation du compte aux limites de quota.
doc_link: https://docs.datadoghq.com/integrations/google_compute_engine/
git_integration_title: google_compute_engine
has_logo: true
integration_title: Google Compute Engine
is_public: true
kind: integration
manifest_version: '1.0'
name: google_compute_engine
public_title: Intégration Datadog-Google Compute Engine
short_description: Effectuer le suivi des instances occupées et comparer les mesures d'utilisation du compte aux quotas.
  limits.
version: '1.0'
---

## Aperçu
Google Cloud Compute Engine fournit des machines virtuelles fonctionnant dans les datacenters de Google et dans le réseau mondial de fibre optique.

Obtenir les métriques de Google Compute Engine pour:

* Visualiser les performances de vos Compute Engines
* Corréler les performances de vos Compute Engines avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [Intégration Google Cloud Platform en premier](https://docs.datadoghq.com/integrations/google_cloud_platform/). Aucune autre étape d'installation ne doit être effectuée.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_compute_engine" >}}


### Evénements
L'intégration Google Cloud Compute Engine n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Google Cloud Compute Engine n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

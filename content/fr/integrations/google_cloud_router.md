---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Router."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_router/'
git_integration_title: google_cloud_router
has_logo: true
integration_title: "Google\_Cloud\_Router"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_router
public_title: "Intégration Datadog/Google\_Cloud\_Router"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Router."
version: 1
---
## Présentation
Google Cloud Router permet l'échange dynamique de routes entre votre cloud privé virtuel (VPC) et vos réseaux sur site à l'aide du protocole BGP (Border Gateway Protocol).

Utilisez l'intégration Datadog Google Cloud Platform pour recueillir des métriques de Google Cloud Router.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_router" >}}


### Événements
L'intégration Google Cloud Router n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Router n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_router/google_cloud_router_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
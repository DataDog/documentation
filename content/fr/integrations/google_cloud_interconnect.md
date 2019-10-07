---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Interconnect."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_interconnect/'
git_integration_title: google_cloud_interconnect
has_logo: true
integration_title: "Google\_Cloud\_Interconnect"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_interconnect
public_title: "Intégration Datadog/Google\_Cloud\_Interconnect"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Interconnect."
version: 1
---
## Présentation
Google Cloud Interconnect étend votre réseau sur site au réseau de Google via une connexion hautement disponible et à faible latence.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Interconnect.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_interconnect" >}}


### Événements
L'intégration Google Cloud Interconnect n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Interconnect n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_interconnect/google_cloud_interconnect_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
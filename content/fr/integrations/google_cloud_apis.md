---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés des API Google\_Cloud."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_apis/'
git_integration_title: api_google_cloud
has_logo: true
integration_title: "API Google\_Cloud"
is_public: true
kind: integration
manifest_version: 1
name: api_google_cloud
public_title: "Intégration Datadog/API Google\_Cloud"
short_description: "Surveillez des métriques clés des API Google\_Cloud."
version: 1
---
## Présentation
Les API Google Cloud vous permettent d'accéder aux produits de la Google Cloud Platform à partir de votre code.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques des API Google Cloud.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_apis" >}}


### Événements
L'intégration API Google Cloud n'inclut aucun événement.

### Checks de service
L'intégration API Google Cloud n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
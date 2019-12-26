---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Tasks."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_tasks/'
git_integration_title: google_cloud_tasks
has_logo: true
integration_title: "Google\_Cloud\_Tasks"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_tasks
public_title: "Intégration Datadog/Google\_Cloud\_Tasks"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Tasks."
version: 1
---
## Présentation
Google Cloud Tasks est un service entièrement géré qui vous permet d'administrer l'exécution, l'envoi et la distribution d'un grand nombre de tâches distribuées.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Tasks.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_tasks" >}}


### Événements
L'intégration Google Cloud Tasks n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Tasks n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tasks/google_cloud_tasks_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
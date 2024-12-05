---
categories:
  - cloud
  - monitoring
  - google cloud
ddtype: crawler
dependencies: []
description: Surveillez la taille des logs ingérés dans Google Cloud Logging.
doc_link: https://docs.datadoghq.com/integrations/google_stackdriver_logging/
draft: false
further_reading:
  - link: https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/
    tag: Blog
    text: "Recueillir des logs Google\_Cloud avec Datadog"
git_integration_title: google_stackdriver_logging
has_logo: true
integration_id: google-stackdriver-logging
integration_title: Google Cloud Logging
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_stackdriver_logging
public_title: "Intégration Datadog/Google\_Cloud\_Logging"
short_description: "Surveillez la taille des logs ingérés dans Google\_Stackdriver."
version: '1.0'
---
## Présentation

Le service Google Cloud Logging vous permet de stocker, rechercher, analyser et surveiller les données et les événements de log depuis Google Cloud Platform, ainsi que de configurer des alertes.

Datadog récupère les **métriques** provenant de Google Cloud Logging pour vous permettre de :

- Visualiser les performances de vos logs Google Cloud.
- Corréler les performances de vos logs Google Cloud avec vos applications.

## Configuration

### Installation

Les métriques associées aux logs Google Cloud sont incluses avec l'[intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub grâce à un redirecteur Push HTTP][2] afin de transmettre vos logs GCP à Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_stackdriver_logging" >}}


**Remarque** : Datadog recueille des [métriques Google Cloud Logging définies par l'utilisateur][4] avec le préfixe `gcp.logging.user`.

### Événements

L'intégration Google Cloud Logging n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Logging n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[4]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[5]: https://docs.datadoghq.com/fr/help/
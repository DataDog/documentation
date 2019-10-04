---
categories:
  - cloud
  - monitoring
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez la taille des logs ingérés dans Google\_Stackdriver."
doc_link: 'https://docs.datadoghq.com/integrations/google_stackdriver_logging/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/'
    tag: Blog
    text: "Collecter des logs Google\_Stackdriver avec Datadog"
git_integration_title: google_stackdriver_logging
has_logo: true
integration_title: "Google\_Stackdriver\_Logging"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_stackdriver_logging
public_title: Intégration Datadog/Google Stackdriver Logging
short_description: "Surveillez la taille des logs ingérés dans Google\_Stackdriver."
version: '1.0'
---
## Présentation
Le produit Stackdriver Logging de Google vous permet de stocker, rechercher, analyser et surveiller les données et les événements des logs depuis Google Cloud Platform. Vous pouvez même configurer des alertes.

Datadog récupère les **métriques** provenant de Google Stackdriver Logging pour :

* Visualiser les performances de vos logs Stackdriver
* Corréler les performances de vos logs Stackdriver avec vos applications

## Implémentation
### Installation

Les métriques provenant des logs Stackdriver sont incluses avec l'[intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_stackdriver_logging" >}}


**Remarque** : Datadog recueille des {métriques Google Stackdriver définis par l'utilisateur][3] avec le préfixe `gcp.logging.user`.

### Événements
L'intégration Google Stackdriver Logging n'inclut aucun événement.

### Checks de service
L'intégration Google Stackdriver Logging n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[3]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[4]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
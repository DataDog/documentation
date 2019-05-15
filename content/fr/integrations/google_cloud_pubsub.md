---
categories:
  - cloud
  - processing
  - messaging
  - google cloud
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Google Cloud PubSub.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_pubsub/'
git_integration_title: google_cloud_pubsub
has_logo: true
integration_title: Google Pub/Sub
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_pubsub
public_title: Intégration Datadog/Google Pub/Sub
short_description: Surveillez des métriques clés de Google Cloud PubSub.
version: '1.0'
---
## Présentation
Google Cloud Pub/Sub apporte au cloud la flexibilité et la fiabilité des middlewares orientés message d'entreprise. 

Recueillez des métriques de Google Pub/Sub pour :

* Visualiser les performances de vos sujets et abonnements Pub/Sub
* Corréler les performances de vos sujets et abonnements Pub/Sub avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_pubsub" >}}


### Événements
L'intégration Google Cloud Pub/Sub n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Pub/Sub n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
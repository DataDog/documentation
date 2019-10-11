---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_TPU."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_tpu/'
git_integration_title: google_cloud_tpu
has_logo: true
integration_title: "Google\_Cloud\_TPU"
is_public: true
kind: integration
manifest_version: 1
name: google_cloud_tpu
public_title: "Intégration Datadog/Google\_Cloud\_TPU"
short_description: "Surveillez des métriques clés de Google\_TPU."
version: 1
---
## Présentation
Avec Google Cloud TPU, tous les chercheurs, ingénieurs, développeurs en ML ainsi que tous les data scientists exécutant des modèles de ML novateurs peuvent profiter des avantages offerts par les Tensor Processing Units (TPU) via des ressources de cloud computing évolutives et faciles à utiliser.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud TPU.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_tpu" >}}


### Événements
L'intégration Google Cloud TPU n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud TPU n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tpu/google_cloud_tpu_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
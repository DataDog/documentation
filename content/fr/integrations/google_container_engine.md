---
categories:
- cloud
- containers
- google cloud
- log collection
dependencies: []
description: Surveillez l'utilisation des ressources de vos conteneurs GCE.
doc_link: https://docs.datadoghq.com/integrations/google_container_engine/
draft: false
git_integration_title: google_container_engine
has_logo: true
integration_id: google-container-engine
integration_title: Google Container Engine
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_container_engine
public_title: Intégration Datadog/Google Container Engine
short_description: Surveillez l'utilisation des ressources de vos conteneurs GCE.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

<div class="alert alert-warning">
Cette intégration est obsolète. Consultez plutôt la <a href="https://docs.datadoghq.com/integrations/google_kubernetes_engine">documentation relative à l'intégration Google Kubernetes Engine</a>. Pour en savoir plus sur les métriques obsolètes, consultez la documentation Google sur les <a href="https://cloud.google.com/monitoring/api/metrics_gcp#gcp-container">métriques Google Cloud</a> (en anglais).
</div>

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "google_container_engine" >}}


### Aide

L'intégration Google Container Engine n'inclut aucun événement.

### Aide

L'intégration Google Container Engine n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/google_container_engine/google_container_engine_metadata.csv
[2]: https://docs.datadoghq.com/fr/help/
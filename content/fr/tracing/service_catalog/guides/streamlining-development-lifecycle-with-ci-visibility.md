---
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Catalogue des services Datadog
- link: /continuous_integration/search/?tab=pipelines
  tag: Documentation
  text: Visibilité sur les pipelines avec Datadog CI
kind: guide
title: Adopter un cycle de développement simplifié avec CI Visibility
---

Depuis la vue Delivery du catalogue des services, vous pouvez consulter votre pipeline de CI ainsi que les résultats des analyses statiques associées à vos services.

Par défaut, votre service est associé aux [pipelines de CI][4] via l'URL du référentiel. Pour modifier les pipelines associés à chaque service, changez la valeur du champ `ci-pipeline-fingerprints` dans les [métadonnées de votre service][5].

Pour ajouter ou supprimer un pipeline associé à votre service, cliquez sur `Edit Metadata` sur la page Service, puis accédez à Software Delivery. Veuillez notez que cette option est uniquement disponible pour la [version 2.2 du schéma du catalogue des services][7].

{{< img src="tracing/service_catalog/service_catalog_delivery_lens.png" alt="Ajouter un pipeline dans l'interface" >}}

Il existe deux façons d'ajouter ou de supprimer un pipeline associé :

1. Recherchez et sélectionnez les pipelines à associer.
{{< img src="tracing/service_catalog/add_pipelines_to_service.png" alt="Ajouter un pipeline dans l'interface" >}}

2. Ajoutez l'empreinte du pipeline directement aux métadonnées du service. Pour accéder à l'empreinte d'un pipeline, cliquez dessus depuis la page [Pipelines][6], puis cliquez sur l'icône en forme d'engrenage :
{{< img src="tracing/service_catalog/pipeline-fingerprint-location.png" alt="Emplacement de l'empreinte d'un pipeline" >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/tracing/service_catalog/service_definition_api/
[3]: /fr/continious-integration/pipelines/
[4]: /fr/continuous_integration/
[5]: /fr/tracing/service_catalog/service_metadata_structure
[6]: https://app.datadoghq.com/ci/pipelines
[7]: /fr/tracing/service_catalog/adding_metadata/#metadata-structure-and-supported-versions
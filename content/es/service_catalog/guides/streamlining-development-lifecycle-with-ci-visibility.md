---
aliases:
- /es/tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
further_reading:
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios de Datadog
- link: /continuous_integration/search/?tab=pipelines
  tag: Documentación
  text: Datadog CI Pipeline Visibility
title: Agilizar el ciclo de vida del desarrollo con CI Visibility
---

En la vista Delivery (Entrega) del Catálogo de servicios, puedes ver los resultados del pipeline de CI y del análisis estático asociados a tus servicios.

Por defecto, tu servicio está asociado a [pipelines de CI][4] a través de la URL del repositorio. 
Puedes editar los pipelines asociados a cada servicio modificando el campo `ci-pipeline-fingerprints` en tus [metadatos de servicio][5].

Para añadir o eliminar un pipeline asociado a tu servicio, haz clic en `Edit Metadata` en tu página de servicios, y ve a Software Delivery (Entrega de software). Ten en cuenta que esto solo está disponible para [el esquema v2.2 del Catálogo de servicio][7].

{{< img src="tracing/service_catalog/service_catalog_delivery_lens.png" alt="La vista de entrega en el catálogo de servicios" >}}

Hay dos formas de añadir o eliminar un pipeline asociado:

1. Busca y selecciona los pipelines que deseas asociar.
{{< img src="tracing/service_catalog/add_pipelines_to_service.png" alt="Editar o añadir un pipeline en la interfaz de usuario" >}}

2. Añade la huella digital del pipeline directamente a los metadatos del servicio. Puedes localizar la huella digital de un pipeline haciendo clic en un pipeline en la página [Pipelines][6] y, a continuación, en el icono del engranaje:
{{< img src="tracing/service_catalog/pipeline-fingerprint-location.png" alt="Localización de la huella de pipeline." >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /es/tracing/service_catalog/service_definition_api/
[3]: /es/continious-integration/pipelines/
[4]: /es/continuous_integration/
[5]: /es/tracing/service_catalog/service_metadata_structure
[6]: https://app.datadoghq.com/ci/pipelines
[7]: /es/tracing/service_catalog/adding_metadata/#metadata-structure-and-supported-versions
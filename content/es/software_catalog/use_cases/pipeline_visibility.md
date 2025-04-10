---
aliases:
- /es/tracing/software_catalog/use_cases/pipeline_visibility
- /es/service_catalog/use_cases/pipeline_visibility
- /es/service_catalog/use_cases/streamlining-development-lifecycle-with-ci-visibility/
- /es/tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /es/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /es/tracing/service_catalog/use_cases/pipeline_visibility
- /es/tracing/software_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /es/software_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /es/service_catalog/use_cases/ci_visibility
- /es/software_catalog/use_cases/ci_visibility
further_reading:
- link: /security/code_security/static_analysis/
  tag: Documentación
  text: Análisis estático
- link: /dora_metrics/
  tag: Documentación
  text: Métricas de DORA
title: Agilizar el ciclo de vida del desarrollo con CI Visibility
---


La pestaña Entrega del Catálogo de servicios te ayuda a evaluar y optimizar el estado previo a la producción de tu servicio, proporcionándote información sobre los pipelines CI y las infracciones de Static Analysis. 

{{< img src="tracing/software_catalog/pipeline-visibility-software-delivery.png" alt="Pestaña Entrega para monitorizar el estado previo a la producción en el Catálogo de servicios" style="width:100%;" >}}

Con Entrega, puedes:

- Monitorizar el rendimiento de los pipelines CI relacionados con tus servicios.
- Identificar problemas de seguridad y de calidad del código a partir de [Static Analysis][1].
- Solucionar problemas de ralentización y fallos previos a la producción.
- Realizar el seguimiento del tiempo de entrega de cambios integrándolo con [métricas de DORA][2].

Por defecto, tu servicio está vinculado a los pipelines CI a través de la URL de tu repositorio. Para añadir o eliminar un pipeline asociado a tu servicio:

1. Haz clic en tu servicio en el [Catálogo de software][4] para abrir el panel lateral del servicio, luego haz clic en la pestaña Propiedad y encuentra las opciones de edición de Entity Metadata.

   **Nota**: Esta opción sólo está disponible para el esquema v2.2 y posterior del Catálogo de software.

   {{< img src="tracing/software_catalog/edit_metadata.png" alt="Vista detallada del panel lateral de un servicio, con las opciones de edición de metadatos resaltadas" style="width:100%;" >}}

2. Edita los metadatos del servicio para añadir o eliminar un pipeline:

   - **Editar en la interfaz de usuario**: Busca la sección Entrega de Software, luego busca y selecciona los pipelines que quieres asociar al servicio.

      {{< img src="tracing/software_catalog/pipeline-visibility-update-metadata.png" alt="Página de configuración para actualizar metadatos del servicio, que muestra el campo Entrega de software para agregar y eliminar pipelines asociados" style="width:100%;" >}}

   - **Editar en GitHub**: Añade manualmente una huella digital de pipeline de `ci-pipeline-fingerprints` en el archivo YAML de metadatos del servicio (consulta [este ejemplo][6]). Para encontrar la huella digital de un pipeline, ve a la página [Pipelines][5], haz clic en el pipeline y selecciona el icono del engranaje.

      {{< img src="tracing/software_catalog/pipeline-visibility-pipeline-fingerprint.png" alt="Ejemplo de huella digital de un pipeline" style="width:100%;" >}}

Para obtener más detalles sobre el estado de CI y las infracciones de Static Analysis de los pipelines asociados a un determinado servicio, haz clic en el servicio y ve a la pestaña **Entrega**.

{{< img src="tracing/software_catalog/delivery_tab.png" alt="Pestaña Entrega de un servicio que muestra información de un pipeline como la frecuencia de éxito y la fecha de la última ejecución" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/static_analysis/
[2]: /es/dora_metrics/
[4]: https://app.datadoghq.com/software
[5]: https://app.datadoghq.com/ci/pipelines
[6]: /es/software_catalog/service_definitions/v2-2/#example-yaml
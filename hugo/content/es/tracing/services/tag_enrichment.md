---
description: Enriquezca automáticamente la telemetría con etiquetas de equipo y sistema
  de las definiciones de servicio del Catálogo sin volver a implementar código.
further_reading:
- link: /tracing/services/service_remapping_rules
  tag: Documentación
  text: Reglas de Service Remapping
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Catalog
title: Enriquecimiento de etiquetas
---
{{< callout url="https://www.datadoghq.com/product-preview/tag-enrichment/" >}}
El enriquecimiento de etiquetas está en versión preliminar. Para solicitar acceso, complete este formulario.
{{< /callout >}}

## Descripción general {#overview}

Utilice reglas de enriquecimiento de etiquetas para agregar etiquetas a sus registros, spans de APM y métricas de traza sin cambios de código ni nuevas implementaciones. Puede utilizar valores de los metadatos de servicio que ya haya definido en el Catálogo, el valor de otra etiqueta o un valor fijo.

## Requisitos previos {#prerequisites}

Debe tener el rol Datadog Admin para crear reglas de enriquecimiento de etiquetas. Consulte [Control de acceso basado en roles][2] para obtener más detalles.

## Crear una regla de enriquecimiento de etiquetas {#create-a-tag-enrichment-rule}

### Reglas de enriquecimiento de etiquetas predeterminadas {#default-tag-enrichment-rules}

Para habilitar una regla predeterminada, navegue a {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] y active la regla predeterminada para `team` o `system` en la parte inferior de la página.

{{< img src="tracing/services/tag_enrichment/tag-enrichment-landing.png" alt="La página de Enriquecimiento de etiquetas que muestra el panel de reglas sugeridas, con opciones para crear reglas de enriquecimiento para etiquetas de sistema y de equipo para todos los servicios." >}}

Habilitar una regla predeterminada aplica `team` o `system` a toda la telemetría de los servicios según los metadatos de entidad definidos en IDP. Solo se enriquecen los servicios con metadatos de entidad completados. Las etiquetas se agregan solo cuando la telemetría del servicio aún no tiene un valor para esa etiqueta.

### Reglas de enriquecimiento de etiquetas personalizadas {#custom-tag-enrichment-rules}

Las reglas personalizadas le permiten dirigirse a un conjunto específico de servicios y configurar exactamente cómo se obtiene y aplica cada valor de etiqueta.

1. En Datadog, navegue a {{< ui >}}IDP{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Tag Enrichment{{< /ui >}}][1] y haga clic en {{< ui >}}\+ Add Rule{{< /ui >}}.
1. Seleccione las entidades que desea enriquecer. A medida que selecciona entidades, se crea una consulta en segundo plano. Para editar la consulta, seleccione {{< ui >}}Build Advanced Query{{< /ui >}}.
   {{< img src="tracing/services/tag_enrichment/tag-enrichment-adv-query.png" alt="El modal Agregar regla de enriquecimiento de etiquetas IDP con la pestaña Crear consulta avanzada seleccionada, que muestra campos para la clave de etiqueta, el operador y el valor, con una opción Agregar condición." >}}
   - Seleccione {{< ui >}}Add Condition{{< /ui >}} para agregar una condición `AND` a su consulta.
   - Agregue múltiples valores en el campo {{< ui >}}Value{{< /ui >}} para crear una condición `OR`.
1. Elija etiquetas y métodos de enriquecimiento:
   - Seleccione la etiqueta `team`, la etiqueta `system`, la etiqueta `custom` o varias.
   - Para cada etiqueta, seleccione si el valor de la etiqueta proviene de Metadatos de entidad, el valor de una etiqueta diferente o un valor fijo.
   - Elija si el valor se aplica solo cuando aún no existe, o si se agrega a la lista actual de valores para esa etiqueta.
1. De forma predeterminada, las etiquetas se agregan solo cuando falta el valor para un elemento de telemetría determinado.
1. Opcionalmente, ingrese un nombre descriptivo para la regla.
1. Revise y guarde su regla. Después de guardar la regla, puede tomar hasta una hora para que el enriquecimiento se aplique completamente a la telemetría entrante.

### Agregar una regla de enriquecimiento de etiquetas desde una página de servicio {#add-a-tag-enrichment-rule-from-a-service-page}

En cualquier página de servicio a la que le falte una etiqueta `team` o `system`, haga clic en {{< ui >}}Service Config{{< /ui >}} para abrir el panel lateral de configuración. Un banner en la parte superior del panel indica qué etiquetas faltan.

{{< img src="tracing/services/tag_enrichment/service-config-side-panel.png" alt="El panel lateral Configuración de servicio para un servicio, que muestra un banner que indica que faltan las etiquetas de equipo y sistema en la telemetría, con un botón Agregar etiquetas." >}}

Haga clic en {{< ui >}}Add Tags{{< /ui >}} para abrir el modal de regla de enriquecimiento de etiquetas precargado con ese servicio.

{{< img src="tracing/services/tag_enrichment/add-idp-tag-enrichment-rule.png" alt="El modal Agregar regla de enriquecimiento de etiquetas IDP, que muestra campos para seleccionar entidades a enriquecer, etiquetas a agregar y el método de fuente de la etiqueta." >}}

## Comportamiento de enriquecimiento de etiquetas {#tag-enrichment-behavior}

- **Telemetría afectada**: El enriquecimiento de etiquetas se aplica solo a registros, spans de APM y métricas de traza. Debido a que [Data Observability: Jobs Monitoring][3] envía telemetría de trabajos como spans de APM, esa telemetría también se enriquece, pero las métricas de Jobs Monitoring no. El enriquecimiento de etiquetas no es compatible con otros tipos de telemetría, incluyendo métricas personalizadas y de infraestructura, Database Monitoring, perfiles, Kubernetes, Universal Service Monitoring y eventos.
- **Datos históricos**: Las reglas de enriquecimiento de etiquetas se aplican únicamente a la telemetría ingerida mientras una regla está activa. Los datos anteriores no se actualizan de forma retroactiva. Eliminar o modificar una regla impide que se aplique a telemetría nueva, pero no actualiza los datos ingeridos previamente.
- **Actualizaciones de metadatos**: Actualizar o agregar metadatos de entidad a los servicios mientras las reglas de enriquecimiento están habilitadas, incluyendo las reglas predeterminadas, actualiza automáticamente esas etiquetas.
- **Orden de procesamiento de reglas**: Las reglas de enriquecimiento de etiquetas se aplican en el orden en que fueron creadas. Las reglas en la parte superior de la lista tienen prioridad sobre las reglas que se encuentran debajo de ellas.
- **Interacción con reglas de reasignación**: Las reglas de enriquecimiento de etiquetas se aplican después de las reglas de reasignación de servicio. Si una regla de reasignación de servicio modifica la etiqueta `service`, el enriquecimiento utiliza el nombre de servicio actualizado al buscar metadatos de IDP.
- **Etiquetas primarias** El enriquecimiento de etiquetas se aplica después de la resolución de las etiquetas primarias, por lo que las etiquetas enriquecidas no pueden utilizarse como etiquetas primarias.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/software/settings/tag-enrichment
[2]: /es/account_management/rbac/
[3]: /es/data_observability/jobs_monitoring/
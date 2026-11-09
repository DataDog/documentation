---
description: Cambie el nombre, combine o divida entornos para spans de APM con reglas
  de reasignación de entornos (env remapping), sin cambiar la configuración del tracer
  ni volver a implementar código.
further_reading:
- link: /tracing/services/service_remapping_rules/
  tag: Documentación
  text: Reglas de Service Remapping
title: Reglas de reasignación de entornos
---
{{< callout url="https://www.datadoghq.com/product-preview/env-remapping/" header="¡Únase a la vista previa!" >}}
La reasignación de entornos está en versión preliminar (Preview). Para solicitar acceso, complete este formulario.
{{< /callout >}}

## Descripción general {#overview}

Las reglas de reasignación de entornos le permiten cambiar el nombre, combinar o dividir entornos desde Datadog. Las reglas actualizan los valores `env` de los spans de APM sin cambiar la configuración del tracer ni volver a implementar código.

## Requisitos previos {#prerequisites}

La creación, edición o eliminación de reglas de reasignación de entornos requiere el permiso **APM Service Remapping Write** (`apm_service_renaming_write`). Consulte [Permisos de roles de Datadog][1].

## Crear una regla de reasignación de entornos {#create-an-env-remapping-rule}

1. En Datadog, navegue a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > {{< ui >}}Service Tags Remapping{{< /ui >}}.
1. Haga clic en {{< ui >}}Add Env Rule{{< /ui >}}.
1. Utilice la barra de búsqueda para seleccionar uno o más entornos para reasignar.
1. Ingrese un nombre de entorno único en el cuadro de texto. Aparece una vista previa de los nombres de los entornos a medida que escribe.

    Para nombrar entornos basándose en sus etiquetas, utilice la sintaxis ``{{tagName}}` syntax. Si los valores de etiqueta siguen un patrón, aplique una expresión regular para extraer la parte que desea en el nombre.

    **Note**: When a tag has several values, the preview shows only those with the most spans.

1. Opcionalmente, ingrese un nombre descriptivo para la regla de Service Remapping para que pueda identificarla más tarde.
1. Revise y guarde su regla de Service Remapping.

Después de guardar la regla, puede tardar aproximadamente un minuto en surtir efecto.

## Comportamiento de las reglas de reasignación de entornos {#env-remapping-rules-behavior}

Las reglas de reasignación de entornos anulan la etiqueta `env` en la ingesta. La creación de una regla no cambia ninguna configuración preexistente que especifique un nombre de entorno. Las reglas de reasignación de entornos tienen prioridad sobre todas las demás configuraciones de nombres de entorno.

- **Datos afectados**: La reasignación de entornos se aplica solo a los spans de APM.
- **Datos históricos**: Las reglas de reasignación de entornos se aplican solo a los spans ingeridos mientras una regla está activa. Los datos anteriores no se actualizan de forma retroactiva. Eliminar o modificar una regla impide que se aplique a spans nuevos, pero no actualiza los datos ingeridos previamente.
- **Orden de procesamiento de reglas**: Las reglas de reasignación de entornos se aplican en el orden en que fueron creadas. Las reglas en la parte superior de la lista de reasignación de entornos tienen prioridad sobre las reglas que se encuentran debajo de ellas. Puede cambiar el orden de las reglas.
- **Expresiones regulares**: Utilice expresiones regulares para definir nuevos nombres de entorno. No se permiten cuantificadores codiciosos dentro del grupo de captura.
- **Interacción con las reglas de reasignación de servicio**: Las reglas de reasignación de entornos se aplican después de las [reglas de reasignación de servicio][2]. Si una regla de reasignación de servicio modifica la etiqueta `service`, la reasignación de entornos utiliza el nombre de servicio actualizado al aplicar una regla de reasignación de entornos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: /es/tracing/services/service_remapping_rules/
---
description: Aprenda a usar el procesador Edit Fields para agregar, eliminar o cambiar
  el nombre de campos en sus datos de registro.
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: documentación
  text: Reasignar atributos reservados
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Edit Fields
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador Edit Fields puede agregar, eliminar o cambiar el nombre de campos dentro de sus datos de registro. Use este procesador para enriquecer sus registros con contexto adicional, eliminar campos de bajo valor para reducir el volumen y estandarizar los nombres en atributos importantes. Seleccione {{< ui >}}add field{{< /ui >}}, {{< ui >}}drop field{{< /ui >}} o {{< ui >}}rename field{{< /ui >}} en el menú desplegable para comenzar.

Consulte la guía [Remap Reserved Attributes][1] sobre cómo usar el procesador Edit Fields para reasignar atributos.

## Configuración {#setup}

### Agregar campo {#add-field}
Use {{< ui >}}add field{{< /ui >}} para añadir un nuevo campo de clave-valor a su registro.

Para configurar el procesador de adición de campos:
1. Defina un {{< ui >}}filter query{{< /ui >}}. Solo se procesan los registros que coinciden con la consulta de filtro especificada. Todos los registros, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso de la canalización. Consulte [Sintaxis de búsqueda][2] para obtener más información.
1. Ingrese el campo y el valor que desea agregar. Para especificar un campo anidado para su clave, use la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. Todos los valores se almacenan como cadenas.
    **Nota**: Si el campo que desea agregar ya existe, el Worker registra un error en el registro y el campo existente permanece sin cambios.

### Eliminar campo {#drop-field}

Use {{< ui >}}drop field{{< /ui >}} para eliminar un campo de los datos de registro que coincidan con el filtro que especifique a continuación. Puede eliminar objetos, por lo que puede usar el procesador para eliminar claves anidadas.

Para configurar el procesador de eliminación de campos:
1. Defina un {{< ui >}}filter query{{< /ui >}}. Solo se procesan los registros que coinciden con la consulta de filtro especificada. Todos los registros, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso de la canalización. Consulte [Sintaxis de búsqueda][2] para obtener más información.
1. Ingrese la clave del campo que desea eliminar. Para especificar un campo anidado para la clave especificada, use la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.
    **Nota**: Si la clave especificada no existe, su registro no se verá afectado.

### Renombrar campo {#rename-field}

Utilice {{< ui >}}rename field{{< /ui >}} para renombrar un campo dentro de su registro.

Para configurar el procesador de renombrado de campos:
1. Defina un {{< ui >}}filter query{{< /ui >}}. Solo se procesan los registros que coinciden con la consulta de filtro especificada. Todos los registros, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso de la canalización. Consulte [Sintaxis de búsqueda][2] para obtener más información.
1. Ingrese el nombre del campo que desea renombrar en el {{< ui >}}Source field{{< /ui >}}. Para especificar un campo anidado para su clave, utilice la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. Después de renombrarlo, su campo original se elimina a menos que habilite la casilla de verificación {{< ui >}}Preserve source tag{{< /ui >}} descrita a continuación.<br>**Nota**: Si la clave de fuente que especifica no existe, se aplica un valor `null` predeterminado a su destino.
1. En el {{< ui >}}Target field{{< /ui >}}, ingrese el nombre al que desea que se renombre el campo de fuente. Para especificar un campo anidado para su clave especificada, utilice la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.<br>**Nota**: Si el campo de destino que especifica ya existe, el Worker registra un error en el registro y no sobrescribe el campo de destino existente.
1. Opcionalmente, marque la casilla {{< ui >}}Preserve source tag{{< /ui >}} si desea conservar el campo de fuente original y duplicar la información de su clave de fuente en la clave de destino especificada. Si esta casilla no está marcada, la clave de fuente se elimina después de ser renombrada.

### Ejemplo de notación de ruta {#path-notation-example-remap}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Métricas de salud {#health-metrics}

Para [métricas de componentes][3] y [métricas de búfer de procesador][4] emitidas por todos los procesadores, consulte la documentación sobre [métricas de uso de Pipelines][5]. Para filtrar o agrupar por métricas del procesador Edit Fields, utilice la etiqueta `component_type:add_fields`, `component_type:remove_fields` o `component_type:rename_fields`, dependiendo de la acción configurada.

[1]: /es/observability_pipelines/guide/remap_reserved_attributes
[2]: /es/observability_pipelines/search_syntax/logs/
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
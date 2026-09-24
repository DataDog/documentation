---
algolia:
  tags:
  - custom metrics
description: Utilice reglas de etiquetas para configurar métricas de forma proactiva,
  después de la ingesta, para mitigar la cardinalidad alta y aplicar una gestión de
  etiquetas coherente en toda su organización.
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Práctica recomendada para la gobernanza de métricas personalizadas
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Controle dinámicamente el volumen de sus métricas personalizadas con Metrics
    without Limits™
title: Reglas de indexación de etiquetas
---
## Descripción general {#overview}

Las reglas de indexación de etiquetas son configuraciones centralizadas que definen cómo Datadog maneja las etiquetas de métricas en la ingesta. Permiten controlar de forma proactiva qué etiquetas se conservan o excluyen, lo que ayuda a reducir la alta cardinalidad al eliminar etiquetas innecesarias y garantizar un etiquetado coherente en toda su organización.

Las reglas de indexación de etiquetas operan en grupos de métricas identificadas por nombre o prefijo. Se aplican tanto a las métricas existentes como a las recién ingeridas que coinciden con los patrones definidos, lo que reduce la necesidad de limpieza reactiva o cambios de código y permite una gestión de costos más predecible.

## Cree una regla de etiquetas {#create-a-tag-rule}

Después de crear una regla, Datadog la aplica automáticamente a todas las métricas coincidentes.

1. Navegue a [{{< ui >}}Metrics → Settings{{< /ui >}}][3].
2. Haga clic en {{< ui >}}\+ Create Rule{{< /ui >}}.
3. Seleccione {{< ui >}}Configure Tag Indexing Rule{{< /ui >}}.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_indexing_rule.png" alt="El menú desplegable Create Rule en Metrics Settings, que muestra la opción Configure Tag Indexing Rule resaltada." style="width:50%;">}}

### Paso 1: Establezca los detalles de la regla {#step-1-set-rule-details}

Ingrese un nombre para la regla. Utilice un nombre descriptivo que identifique claramente el propósito de la regla.

### Paso 2: Defina el contexto de la regla {#step-2-define-rule-scope}

Elija a qué métricas se aplica la regla. Defina el contexto de la regla con una o más de las siguientes opciones:

Nombres o prefijos de métricas
: Aplique la regla a nombres de métricas o espacios de nombres específicos (por ejemplo, `http.*`, `db.query.*`)

Excepciones de prefijo
: Excluya prefijos específicos del contexto de la regla (por ejemplo, aplicar a `http.*` pero excluir `http.client.*`)

{{< img src="metrics/guide/tag_indexing_rules/define_rule_scope.png" alt="El paso Elegir métricas que muestra una regla con contexto en http.* con http.client.* excluido como subprefijo." style="width:80%;">}}

Si varias reglas se aplican a las mismas métricas, Datadog las evalúa en orden. Opcionalmente, utilice el comportamiento {{< ui >}}Override{{< /ui >}} para reemplazar las reglas evaluadas anteriormente para las métricas seleccionadas.

### Paso 3: Configurar el comportamiento de las etiquetas {#step-3-configure-tag-behavior}

Defina cómo maneja la regla las etiquetas para las métricas dentro del contexto.

#### Combinar o reemplazar configuraciones existentes {#merge-or-override-existing-configurations}

Elija si esta regla se basa en configuraciones de etiquetado existentes o si las reemplaza.
- {{< ui >}}Merge{{< /ui >}} (predeterminado): aplica esta regla sobre las configuraciones de etiquetado existentes. Las métricas sin configuración previa no se ven afectadas.
- {{< ui >}}Override{{< /ui >}}: ignora todas las demás reglas que se aplican a los mismos prefijos y aplica esta regla exclusivamente. Seleccione la opción {{< ui >}}Override all other rules that apply to these prefixes{{< /ui >}} para habilitar este comportamiento.

**Nota**: utilice el comportamiento **Reemplazar** en una regla más específica para evitar que se acumulen las etiquetas excluidas de una regla más amplia. Por ejemplo, suponga que la Regla 1 utiliza el comportamiento **Combinar** para excluir `host` de `dd.*`, y la Regla 2 excluye `app_name` de `dd.payments.*`. Si la Regla 2 también utiliza **Combinar**, tanto `host` como `app_name` se eliminan de las métricas `dd.payments.*`. Si la Regla 2 utiliza **Reemplazar**, solo se elimina `app_name` (el efecto de la Regla 1 se reemplaza para ese prefijo).

#### Aplicar solo a métricas nuevas {#apply-to-new-metrics-only}

Aplica esta regla solo a las métricas enviadas después de que se crea la regla. Las métricas existentes que coinciden con la regla permanecen sin cambios.

#### Seleccione las etiquetas para incluir o excluir {#select-tags-to-include-or-exclude}

Elija si desea utilizar una lista de permitidos o una lista de bloqueados para el filtrado de etiquetas.
- {{< ui >}}Include tags{{< /ui >}}—utilice una lista de permitidos de etiquetado que permanezcan consultables.
- {{< ui >}}Exclude tags{{< /ui >}}—utilice una lista de bloqueados para definir etiquetas no consultables, o utilice el uso de etiquetas para desindexar automáticamente las etiquetas que no se han consultado en los últimos 30, 60 o 90 días y que no se utilizan en ningún panel u otros activos.

Agregue las claves de etiqueta que desea incluir o excluir.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_behavior.png" alt="El paso Elegir etiquetas que muestra la opción Incluir etiquetas seleccionada con las claves de etiqueta ingresadas." style="width:80%;">}}

Después de configurar el comportamiento de las etiquetas, la vista previa muestra una lista de las métricas afectadas (hasta 100 en la interfaz de usuario).

{{< img src="metrics/guide/tag_indexing_rules/preview_affected_metrics.png" alt="El panel de vista previa de métricas afectadas que muestra una lista de métricas que coinciden con el contexto de la regla." style="width:80%;">}}

### Limitaciones {#limitations}

- {{< ui >}}Exclude{{< /ui >}} Las reglas entran en vigor después de que Datadog observa una etiqueta en una métrica.
- Datadog evalúa las reglas de forma secuencial, y cada regla posterior se basa en o reemplaza las configuraciones anteriores.
- **Antigüedad de la etiqueta**: Para las reglas que utilizan el uso de la etiqueta, las etiquetas nuevas reciben un período de gracia de 15 días antes de quedar regidas por la regla.

## Modificar una regla {#modify-a-rule}

Navegue a [{{< ui >}}Metrics → Settings → Rules{{< /ui >}}][1] para modificar las reglas existentes. Después de realizar cambios, Datadog los aplica automáticamente a todas las métricas coincidentes.

### Editar una regla {#edit-a-rule}

Seleccione una regla para abrir su panel de detalles, luego haga clic en {{< ui >}}Edit{{< /ui >}} para cambiar el contexto, la selección de etiquetas o el comportamiento de combinación y anulación de la regla.

{{< img src="metrics/guide/tag_indexing_rules/edit_rule_configuration.png" alt="El panel lateral de detalles de la regla que muestra el tipo de regla, el contexto, la acción, las etiquetas y las opciones, con un botón Editar." style="width:80%;">}}

### Reordenar reglas {#reorder-rules}

Arrastre las reglas para cambiar el orden de evaluación. El orden de evaluación determina cómo interactúan las reglas cuando varias reglas se aplican a las mismas métricas.

### Eliminar una regla {#delete-a-rule}

Elimine las reglas que ya no sean necesarias. Cuando elimina una regla, Datadog vuelve a calcular la configuración de etiquetas para las métricas afectadas según las reglas restantes.

### Sobrescribir reglas para una métrica específica {#override-rules-for-a-specific-metric}

Para eximir a una métrica de las reglas de etiquetas, abra el panel lateral de detalles de la métrica en el Resumen de métricas, seleccione {{< ui >}}Configure This Metric Individually{{< /ui >}} y configure la métrica para conservar todas las etiquetas. Conservar todas las etiquetas omite todas las reglas de etiquetas para esa métrica sin modificar las reglas en sí.

Para volver a aplicar las reglas, restaure la configuración predeterminada de la métrica desde el mismo panel.

## Prioridad de las reglas {#rule-precedence}

Cuando varias reglas se aplican a las mismas métricas, Datadog las evalúa de forma secuencial. El orden de las reglas es importante porque:

- Las reglas que se encuentran más abajo en el orden de evaluación modifican los resultados de las reglas anteriores
- {{< ui >}}Override{{< /ui >}} el comportamiento sobrescribe las configuraciones previas para las métricas coincidentes
- {{< ui >}}Merge{{< /ui >}} el comportamiento se basa en las configuraciones existentes
- Cuando varias reglas utilizan el comportamiento {{< ui >}}Override{{< /ui >}}, la última regla aplicada determina si la configuración final está en modo de inclusión o exclusión

Reordene las reglas en la [página de Reglas][1] para cambiar qué regla tiene prioridad. Consulte los siguientes ejemplos para comprender cómo diferentes órdenes producen resultados diferentes.

## Ejemplos de prioridad {#precedence-examples}

### Ejemplo 1: Comportamiento de combinación y sobrescritura {#example-1-merge-and-override-behavior}

Las reglas de etiquetas pueden sobrescribir una configuración existente o combinarse con ella. La elección determina si una regla restablece la configuración de etiquetas o si se basa en lo que ya existe.

Etiquetas iniciales:  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="Diagrama que muestra dos reglas aplicadas a las métricas: la Regla 1 excluye env de todas las métricas usando Reemplazar, y la Regla 2 incluye env para las métricas infra usando Combinar." style="width:100%;">}}

**Información clave**: La etiqueta `env` se vuelve a añadir solo a las métricas `infra.*`.

### Ejemplo 2: Orden de las reglas {#example-2-rule-order}

Cuando varias reglas se aplican a las mismas métricas, Datadog las evalúa en orden. Las reglas que se ejecutan más tarde pueden refinar o reemplazar los efectos de las reglas anteriores.

Etiquetas iniciales:  
`host`, `env`, `service`

En este ejemplo, la Regla 2 utiliza una configuración de {{< ui >}}Include{{< /ui >}}, que actúa como una lista de permitidos. Solo se conservan las etiquetas enumeradas; cualquier etiqueta que no esté enumerada se elimina.

#### Orden 1: Regla específica primero {#order-1-specific-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="Diagrama que muestra la regla específica evaluada primero: la Regla 1 excluye servidor de las métricas infra.server, luego la Regla 2 incluye servidor para todas las métricas infra, restaurando la etiqueta." style="width:100%;">}}

**Información clave**: La Regla 1 elimina la etiqueta `host`, luego la Regla 2 vuelve a añadir `host`.

#### Orden 2: Regla general primero {#order-2-general-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="Diagrama que muestra la regla general evaluada primero: la Regla 1 incluye servidor para todas las métricas infra, luego la Regla 2 excluye servidor de las métricas infra.server, eliminando la etiqueta." style="width:100%;">}}

**Información clave**: La etiqueta `host` se elimina al final y permanece eliminada.

### Ejemplo 3: Excepción a una regla general {#example-3-exception-to-a-broad-rule}

Utilice una regla general con comportamiento de {{< ui >}}Override{{< /ui >}} para excluir una etiqueta globalmente, luego utilice una regla específica con comportamiento de {{< ui >}}Merge{{< /ui >}} para restaurar la etiqueta para métricas específicas.

Etiquetas iniciales:
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="Diagrama que muestra una regla de anulación (Override) amplia que excluye al pod de todas las métricas de kube, seguida de una regla de combinación (Merge) estrecha que incluye al pod para las métricas de kube.node, conservando todas las etiquetas originales." style="width:100%;">}}

**Información clave**: Cuando una exclusión amplia y una inclusión estrecha se cancelan entre sí para una métrica, no se aplican restricciones de etiquetas y se conservan todas las etiquetas originales.

### Ejemplo 4: Múltiples excepciones a una regla amplia {#example-4-multiple-exceptions-to-a-broad-rule}

Aplique varias reglas con comportamiento {{< ui >}}Merge{{< /ui >}} sobre una regla amplia con comportamiento {{< ui >}}Override{{< /ui >}} para restaurar diferentes etiquetas para diferentes prefijos de métricas. Las métricas que coinciden con prefijos más específicos acumulan más restauraciones.

Etiquetas iniciales:
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="Diagrama que muestra una regla de anulación (Override) amplia que excluye todas las etiquetas, seguida de dos reglas de combinación (Merge) que restauran diferentes etiquetas para diferentes prefijos, donde las métricas que coinciden con ambos prefijos obtienen ambos conjuntos de etiquetas restaurados." style="width:100%;">}}

**Información clave**: Las reglas de inclusión múltiple con comportamiento {{< ui >}}Merge{{< /ui >}}, aplicadas después de una regla de exclusión con comportamiento {{< ui >}}Override{{< /ui >}}, son aditivas (una métrica que coincide con dos prefijos de excepción obtiene ambos conjuntos de etiquetas restaurados).

## Metrics without Limits™ compatibility {#metrics-without-limits-compatibility}

Las configuraciones existentes por métrica de [Metrics without Limits™][2] (MWL) tienen prioridad sobre las reglas de indexación de etiquetas y actúan como exenciones. Mientras una exención permanezca activa, la métrica no se verá afectada por ninguna regla de indexación de etiquetas.

Puede revisar y eliminar estas exenciones desde la página de Reglas de indexación de etiquetas. Datadog clasifica cada exención como:

- **Seguro para eliminar**: Según el análisis de Datadog en las reglas de indexación de etiquetas de su cuenta, se espera que eliminar la exención reduzca el uso de sus métricas personalizadas.
- **Necesita revisión**: Eliminar la exención puede afectar el uso de sus métricas personalizadas, o es posible que sus reglas de indexación de etiquetas no conserven todas las etiquetas incluidas en la configuración de MWL existente. Revise estas exenciones cuidadosamente para evitar interrumpir paneles, monitores u otros activos que dependan de esas etiquetas.

Las exenciones se aplican a toda la cuenta, no a reglas de indexación de etiquetas individuales. Eliminar la exención de una métrica de una regla la elimina automáticamente de todas las reglas de indexación de etiquetas en su cuenta. La métrica se evalúa entonces frente a sus reglas de indexación de etiquetas según su orden actual.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /es/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings
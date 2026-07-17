---
algolia:
  tags:
  - custom metrics
description: Utiliza las reglas de etiquetas para configurar métricas de manera proactiva,
  después de la ingestión, para que puedas mitigar la alta cardinalidad y hacer cumplir
  una gestión de etiquetas consistente en toda tu organización.
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Mejores Prácticas para la Gobernanza de Custom Metrics
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Controla dinámicamente el volumen de tus Custom Metrics con Metrics without
    Limits™
title: Reglas de Indexación de Etiquetas
---
## Resumen {#overview}

Las Reglas de Indexación de Etiquetas son configuraciones centralizadas que definen cómo Datadog maneja las etiquetas de métricas durante la ingestión. Te permiten controlar proactivamente qué etiquetas se retienen o se excluyen, ayudando a reducir la alta cardinalidad al eliminar etiquetas innecesarias y asegurando una etiquetación consistente en toda tu organización.

Las Reglas de Indexación de Etiquetas operan sobre grupos de métricas identificados por nombre o prefijo. Se aplican tanto a métricas existentes como a métricas recién ingeridas que coinciden con los patrones definidos, reduciendo la necesidad de limpieza reactiva o cambios en el código mientras permiten una gestión de costos más predecible.

## Cree una regla de etiqueta {#create-a-tag-rule}

Después de crear una regla, Datadog la aplica automáticamente a todas las métricas que coinciden.

1. Navegue a [**Métricas → Configuración**][3].
2. Haga clic en **+ Crear Regla**.
3. Seleccione **Configurar Regla de Indexación de Etiquetas**.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_indexing_rule.png" alt="El menú desplegable Crear Regla en Configuración de Métricas, mostrando la opción Configurar Regla de Indexación de Etiquetas resaltada." style="width:50%;">}}

### Paso 1: Establecer detalles de la regla {#step-1-set-rule-details}

Ingrese un nombre para la regla. Utilice un nombre descriptivo que identifique claramente el propósito de la regla.

### Paso 2: Definir el contexto de la regla {#step-2-define-rule-scope}

Elija a qué métricas se aplica la regla. Defina el contexto de la regla con una o más de las siguientes opciones:

Nombres o prefijos de métricas
: Aplique la regla a nombres de métricas o espacios de nombres específicos (por ejemplo, `http.*`, `db.query.*`)

Excepciones de prefijo
: Excluya prefijos específicos del contexto de la regla (por ejemplo, aplique a `http.*` pero excluya `http.client.*`)

{{< img src="metrics/guide/tag_indexing_rules/define_rule_scope.png" alt="El paso Elegir Métricas muestra una regla con un contexto de http.* con http.client.* excluido como un subprefijo." style="width:80%;">}}

Si múltiples reglas se aplican a las mismas métricas, Datadog las evalúa en orden. Opcionalmente, use **Anular** el comportamiento para reemplazar las reglas previamente evaluadas para las métricas seleccionadas.

### Paso 3: Configurar el comportamiento de las etiquetas {#step-3-configure-tag-behavior}

Defina cómo la regla maneja las etiquetas para las métricas en su contexto.

#### Fusionar o anular configuraciones existentes {#merge-or-override-existing-configurations}

Elija si esta regla se basa en o anula las configuraciones de etiquetas existentes.
- **Fusionar** (predeterminado)—aplica esta regla sobre las configuraciones de etiquetas existentes. Las métricas sin configuración previa no se ven afectadas.
- **Anular**—ignora todas las demás reglas que se aplican a los mismos prefijos y aplica esta regla exclusivamente. Seleccione la opción **Anular todas las demás reglas que se aplican a estos prefijos** para habilitar este comportamiento.

**Nota**: Utilice el comportamiento de **Anular** en una regla más específica para evitar que las etiquetas excluidas de una regla más amplia se acumulen. Por ejemplo, supongamos que la Regla 1 utiliza el comportamiento de **Fusionar** para excluir `host` de `dd.*`, y la Regla 2 excluye `app_name` de `dd.payments.*`. Si la Regla 2 también utiliza **Fusionar**, tanto `host` como `app_name` se eliminan de las métricas de `dd.payments.*`. Si la Regla 2 utiliza **Anular**, solo se elimina `app_name` (el efecto de la Regla 1 se anula para ese prefijo).

#### Aplicar solo a nuevas métricas {#apply-to-new-metrics-only}

Aplica esta regla solo a las métricas enviadas después de que se crea la regla. Las métricas existentes que coinciden con la regla permanecen sin cambios.

#### Seleccione etiquetas para incluir o excluir {#select-tags-to-include-or-exclude}

Elija si desea usar una lista de permitidos o una lista de bloqueados para el filtrado de etiquetas.
- **Incluir etiquetas**—utilice una lista de permitidos de etiquetas que permanezcan consultables.
- **Excluir etiquetas**—utilice una lista de bloqueados para definir etiquetas no consultables.

Agregue las claves de etiqueta que desea incluir o excluir.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_behavior.png" alt="El paso Elegir Etiquetas muestra la opción Incluir etiquetas seleccionada con las claves de etiqueta ingresadas." style="width:80%;">}}

Después de configurar el comportamiento de las etiquetas, la vista previa muestra una lista de métricas afectadas (hasta 100 en la interfaz de usuario).

{{< img src="metrics/guide/tag_indexing_rules/preview_affected_metrics.png" alt="El panel de vista previa de métricas afectadas muestra una lista de métricas que coinciden con el contexto de la regla." style="width:80%;">}}

### Limitaciones {#limitations}

Las reglas de - **Excluir** entran en efecto después de que Datadog observa una etiqueta en una métrica.
- Datadog evalúa las reglas secuencialmente, y cada regla subsiguiente se basa en o anula configuraciones anteriores.

## Modifique una regla {#modify-a-rule}

Navegue a [**Métricas → Configuración → Reglas**][1] para modificar reglas existentes. Después de realizar cambios, Datadog los aplica automáticamente a todas las métricas coincidentes.

### Edite una regla {#edit-a-rule}

Seleccione una regla para abrir su panel de detalles, luego haga clic en **Editar** para cambiar el contexto de la regla, la selección de etiquetas o el comportamiento de fusión y anulación.

{{< img src="metrics/guide/tag_indexing_rules/edit_rule_configuration.png" alt="El panel lateral de detalles de la regla muestra el tipo de regla, el contexto, la acción, las etiquetas y las opciones, con un botón de Editar." style="width:80%;">}}

### Reordene reglas {#reorder-rules}

Arrastre las reglas para cambiar el orden de evaluación. El orden de evaluación determina cómo interactúan las reglas cuando múltiples reglas se aplican a las mismas métricas.

### Elimine una regla {#delete-a-rule}

Elimine reglas que ya no son necesarias. Cuando elimina una regla, Datadog recalcula la configuración de etiquetas para las métricas afectadas en función de las reglas restantes.

### Anule reglas para una métrica específica {#override-rules-for-a-specific-metric}

Para eximir una métrica de las reglas de etiquetas, abra el panel lateral de detalles de la métrica en Metrics Summary, seleccione **Configure This Metric Individually**, y establezca la métrica para retener todas las etiquetas. Retener todas las etiquetas elude todas las reglas de etiquetas para esa métrica sin modificar las reglas mismas.

Para reaplicar reglas, restaure la configuración predeterminada de la métrica desde el mismo panel.

## Precedencia de reglas {#rule-precedence}

Cuando múltiples reglas se aplican a las mismas métricas, Datadog las evalúa secuencialmente. El orden de las reglas es importante porque:

- Las reglas más bajas en el orden de evaluación modifican los resultados de las reglas anteriores
- **El comportamiento de Anular** sobrescribe configuraciones anteriores para métricas coincidentes.
- **El comportamiento de Fusionar** se basa en configuraciones existentes.
- Cuando múltiples reglas utilizan el comportamiento de **Anular**, la última regla aplicada determina si la configuración final está en modo incluir o excluir.

Reordene las reglas en la [Rules page][1] para cambiar cuál regla tiene prioridad. Consulte los siguientes ejemplos para entender cómo diferentes órdenes producen diferentes resultados.

## Ejemplos de prioridad {#precedence-examples}

### Ejemplo 1: Comportamiento de Fusionar y Anular {#example-1-merge-and-override-behavior}

Las reglas de etiquetas pueden anular una configuración existente o fusionarse con ella. La elección determina si una regla restablece la configuración de etiquetas o se fusiona con lo que ya existe.

Etiquetas de inicio:  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="Diagrama que muestra dos reglas aplicadas a métricas: la Regla 1 excluye env de todas las métricas usando Anular, y la Regla 2 incluye env para métricas de infra usando Fusionar." style="width:100%;">}}

**Perspectiva clave**: La etiqueta `env` se vuelve a agregar solo a las métricas `infra.*`.

### Ejemplo 2: Orden de reglas {#example-2-rule-order}

Cuando múltiples reglas se aplican a las mismas métricas, Datadog las evalúa en orden. Las reglas que se ejecutan más tarde pueden refinar o sobrescribir los efectos de las reglas anteriores.

Etiquetas de inicio:  
`host`, `env`, `service`

En este ejemplo, la Regla 2 utiliza una configuración de **Incluir**, que actúa como una lista de permitidos. Solo se retienen las etiquetas listadas; cualquier etiqueta no listada se elimina.

#### Orden 1: Regla específica primero {#order-1-specific-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="Diagrama que muestra la regla específica evaluada primero: la Regla 1 excluye el servidor de las métricas infra.server, luego la Regla 2 incluye el servidor para todas las métricas de infra, restaurando la etiqueta." style="width:100%;">}}

**Perspectiva clave**: La Regla 1 elimina la etiqueta `host`, luego la Regla 2 la vuelve a agregar `host`.

#### Orden 2: Regla general primero {#order-2-general-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="Diagrama que muestra la regla general evaluada primero: La Regla 1 incluye el host para todas las métricas infra, luego la Regla 2 excluye el host de las métricas infra.server, eliminando la etiqueta." style="width:100%;">}}

**Perspectiva clave**: La `host` etiqueta se elimina al final y permanece eliminada.

### Ejemplo 3: Excepción a una regla amplia {#example-3-exception-to-a-broad-rule}

Utiliza una regla amplia con comportamiento de **Anulación** para excluir una etiqueta globalmente, luego utiliza una regla específica con comportamiento de **Fusión** para restaurar la etiqueta para métricas específicas.

Etiquetas de inicio:
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="Diagrama que muestra una regla amplia de Anulación excluyendo el pod de todas las métricas kube, luego una regla estrecha de Fusión incluyendo el pod para métricas kube.node, preservando todas las etiquetas originales." style="width:100%;">}}

**Perspectiva clave**: Cuando una exclusión amplia y una inclusión estrecha se cancelan entre sí para una métrica, no se aplican restricciones de etiquetas y se preservan todas las etiquetas originales.

### Ejemplo 4: Múltiples excepciones a una regla amplia {#example-4-multiple-exceptions-to-a-broad-rule}

Superpone múltiples reglas con comportamiento de **Fusión** sobre una regla amplia con comportamiento de **Anulación** para restaurar diferentes etiquetas para diferentes prefijos de métricas. Las métricas que coinciden con prefijos más específicos acumulan más restauraciones.

Etiquetas de inicio:
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="Diagrama que muestra una regla amplia de Anulación excluyendo todas las etiquetas, luego dos reglas de Fusión restaurando diferentes etiquetas para diferentes prefijos, con métricas que coinciden con ambos prefijos recibiendo ambos conjuntos de etiquetas restauradas." style="width:100%;">}}

**Perspectiva clave**: Múltiples reglas de inclusión con comportamiento de **Fusión**, aplicadas después de una regla de exclusión con comportamiento de **Anulación**, son aditivas (una métrica que coincide con dos prefijos de excepción recibe ambos conjuntos de etiquetas restauradas).

## Compatibilidad con Metrics without Limits™ {#metrics-without-limits-compatibility}

Las reglas de etiquetas no anulan automáticamente las configuraciones por métrica existentes de [Metrics without Limits™][2] (MWL). Las configuraciones existentes de MWL tienen prioridad, y Datadog las preserva cuando crea o modifica reglas de etiquetas.

Si se elimina la configuración MWL de una métrica, las reglas de etiquetas se aplican automáticamente a esa métrica según el orden actual de las reglas.

Para excluir una métrica específica de todas las reglas de etiquetas sin eliminarlas, utilice el panel lateral de detalles de la métrica para retener todas las etiquetas. Para reaplicar reglas, restaure la configuración predeterminada de la métrica desde el mismo panel.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /es/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings
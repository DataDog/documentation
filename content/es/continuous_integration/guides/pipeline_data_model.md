---
description: Aprende cómo se modelan los pipelines y qué tipos de ejecución admite
  CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Más información sobre Pipeline Visibility
title: Modelo de datos de pipeline y tipos de ejecución
---

## Información general

Esta guía describe cómo configurar mediante programación las ejecuciones de pipelines en CI Visibility y define los tipos de ejecución de pipelines que admite CI Visibility.

Esta guía se aplica a los pipelines creados mediante la [API pública de pipelines de CI Visibility][3]. Las integraciones con otros proveedores de CI puede variar.

## Modelo de datos

Las ejecuciones de pipeline se modelan como trazas (traces), similar a una [traza distribuida de APM][1], donde tramos (spans) representa la ejecución de diferentes partes del pipeline. El modelo de datos de CI Visibility para representar ejecuciones de pipeline consta de cuatro niveles:

| Nombre del nivel | Descripción |
| ---------- | ----------- |
| Pipeline (obligatorio)  | El tramo raíz de nivel superior que contiene todos los demás niveles como secundarios. Representa la ejecución global de un pipeline de principio a fin. Este nivel a veces se denomina `build` o `workflow` en algunos proveedores de CI. |
| Etapa      | Sirve para agrupar trabajos bajo un nombre definido por el usuario. Algunos proveedores de CI no disponen de este nivel. |
| Trabajo        | La unidad de trabajo más pequeña donde se ejecutan los comandos. Todas las tareas de este nivel deben realizarse en un único nodo. |
| Paso       | En algunos proveedores de CI, este nivel representa un script de shell o una acción ejecutada dentro de un trabajo. |

Cuando un pipeline, etapa, trabajo o paso finaliza, los datos de ejecución se envían a Datadog. Para configurar Pipeline Visibility, consulta la lista de [proveedores de CI compatibles][2]. Si tu proveedor de CI o flujo de trabajo no es compatible, puedes utilizar el [endpoint de la API pública][3] para enviar las ejecuciones de tu pipeline a CI Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Ejemplo de una traza de ejecución de pipeline" style="width:100%;">}}

Se espera que las etapas, los trabajos y los pasos tengan exactamente el mismo nombre que su pipeline principal. En caso de que no coincidan, es posible que en algunos pipelines falte información sobre etapas, trabajos y pasos. Por ejemplo, pueden faltar trabajos en las tablas de resumen de trabajos.

### Identificadores únicos de pipeline

Todas las ejecuciones de pipeline dentro de un nivel deben tener un identificador único. Por ejemplo, un pipeline y un trabajo pueden tener el mismo identificador único, pero no dos pipelines.

Cuando se envían IDs repetidos con diferentes marcas de tiempo, la interfaz de usuario puede mostrar un comportamiento no deseado. Por ejemplo, las gráficas de llama pueden mostrar span tags de una ejecución de pipeline diferente. Si se envían IDs duplicados con las mismas marcas de tiempo, sólo se almacenan los valores de la última ejecución de pipeline recibida.

## Tipos de ejecución de pipeline

### Ejecución normal

La ejecución normal de un pipeline sigue el flujo que se muestra a continuación:

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Representación de una ejecución de pipeline normal" style="width:100%;">}}

Según el proveedor, pueden faltar algunos niveles. Por ejemplo, puede que no existan etapas y que los trabajos se ejecuten en paralelo o en secuencia, o una combinación de ambos.

Tras la finalización de cada componente, debe enviarse una carga útil a Datadog con todos los datos necesarios para representar la ejecución. Datadog procesa estos datos, los almacena como un evento de pipeline y los muestra en [CI Visibility][2]. Las ejecuciones de pipeline deben finalizar antes de enviarse a Datadog.

### Reintentos completos

Los reintentos completos de un pipeline deben tener ID únicos de pipeline diferentes.

En el endpoint de la API pública, puedes rellenar el campo `previous_attempt` para enlazar con reintentos anteriores. Los reintentos se tratan como ejecuciones de pipelines independientes en Datadog, y la hora de inicio y fin solo deben abarcar ese reintento.

### Reintentos parciales

Al reintentar un subconjunto de trabajos dentro de un pipeline, debes enviar un nuevo evento de pipeline con un nuevo ID único de pipeline. La carga útil de los nuevos trabajos debe estar vinculada al nuevo ID único del canal. Para vincularlos al reintento anterior, añade el campo `previous_attempt`.

Los reintentos parciales también se tratan como pipelines separados. Las horas de inicio y fin no deben incluir la hora del reintento original. Para un reintento parcial, no envíe cargas útiles para trabajos que se ejecutaron en el intento anterior. Además, establece el campo `partial_retry` en `true` en los reintentos parciales para excluirlos de la agregación al calcular los tiempos de ejecución.

Por ejemplo, un pipeline llamado `P` tiene tres trabajos diferentes, a saber `J1`, `J2` y `J3`, ejecutados secuencialmente. En la primera ejecución de `P`, sólo se ejecutan `J1` y `J2`, y `J2` falla.

Por lo tanto, necesitas enviar un total de tres cargas útiles:

1. Carga de trabajo para `J1`, con ID `J1_1` e ID de pipeline `P_1`.
2. Carga de trabajo para `J2`, con ID `J2_1` e ID de pipeline `P_1`.
3. Carga útil para `P`, con ID `P_1`.

Supongamos que se produce un reintento parcial de la cadena a partir de `J2`, en el que todos los trabajos restantes tienen éxito.

Necesitas enviar tres cargas útiles adicionales:

1. Carga de trabajo para `J2`, con ID `J2_2` e ID de pipeline `P_2`.
2. Carga de trabajo para `J3`, con ID `J3_1` e ID de pipeline `P_2`.
3. Carga útil para `P`, con ID `P_2`.

Los valores reales de los ID no son importantes. Lo que importa es que se modifiquen correctamente en función de la ejecución del pipeline como se ha especificado anteriormente.

### Pipelines bloqueados

Si un pipeline se bloquea indefinidamente debido a que requiere intervención manual, debe enviarse una carga útil del evento de pipeline en cuanto el pipeline alcance el estado de bloqueo. El estado del pipeline debe establecerse en `blocked`.

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flujo de ejecución de pipeline bloqueado" style="width:100%;">}}

Los datos restantes del pipeline deben enviarse en cargas útiles separadas con un ID único de pipeline diferente. En el segundo pipeline, puedes establecer `is_resumed` como `true` para señalar que la ejecución se reanudó desde un pipeline bloqueado.

### Pipelines descendentes

Si un pipeline se activa como secundario de otro, el campo `parent_pipeline` debe rellenarse con los datos del pipeline principal.

### Pipelines manuales

Si un pipeline se activa manualmente, el campo `is_manual` debe tener el valor true.

## Información Git

Se recomienda encarecidamente proporcionar información Git de la confirmación que desencadenó la ejecución del pipeline. Las ejecuciones de pipelines sin información Git no aparecen en la [página Cambios recientes en el código][4]. Como mínimo, se requiere la URL del repositorio, el SHA de la confirmación y el correo electrónico del autor. Para más información, consulta la [especificación del endpoint de la API pública][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/continuous_integration/pipelines/#setup
[3]: /es/api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits

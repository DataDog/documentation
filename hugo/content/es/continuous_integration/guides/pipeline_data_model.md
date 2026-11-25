---
description: Obtenga información sobre cómo se modelan las Pipelines y qué tipos de
  ejecución admite CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Obtenga información sobre Pipeline Visibility
title: Modelo de datos de canalización y tipos de ejecución
---
## Descripción general {#overview}

Esta guía describe cómo configurar programáticamente las ejecuciones de canalizaciones en CI Visibility y define los tipos de ejecución de canalizaciones que admite CI Visibility. 

Esta guía se aplica a las canalizaciones creadas mediante la [API pública de Pipelines de CI Visibility][3]. Las integraciones con otros proveedores de CI pueden variar.

## Modelo de datos {#data-model}

Las ejecuciones de canalizaciones se modelan como trazas, similares a una [traza distribuida de APM][1], donde los tramos representan la ejecución de diferentes partes de la canalización. El modelo de datos de CI Visibility para representar ejecuciones de canalizaciones consta de cuatro niveles:

| Nombre del nivel | Descripción |
| ---------- | ----------- |
| Canalización (obligatoria)  | El tramo raíz de nivel superior que contiene todos los demás niveles como elementos secundarios. Representa la ejecución general de una canalización de principio a fin. Este nivel a veces se denomina `build` o `workflow` en algunos proveedores de CI. |
| Etapa      | Sirve como agrupación de trabajos bajo un nombre definido por el usuario. Algunos proveedores de CI no tienen este nivel. |
| Trabajo        | La unidad de trabajo más pequeña donde se ejecutan los comandos. Todas las tareas en este nivel deben realizarse en un solo nodo. |
| Paso | En algunos proveedores de CI, este nivel representa un script de shell o una acción ejecutada dentro de un trabajo. |

Cuando finaliza una canalización, etapa, trabajo o paso, los datos de ejecución se envían a Datadog. Para configurar Pipeline Visibility, consulte la lista de [proveedores de CI compatibles][2]. Si su proveedor de CI o flujo de trabajo no es compatible, puede usar el [punto de conexión de la API pública][3] para enviar las ejecuciones de sus canalizaciones a CI Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Ejemplo de una traza de ejecución de canalización" style="width:100%;">}}

Se espera que las etapas, los trabajos y los pasos tengan exactamente el mismo nombre de canalización que la canalización principal. En caso de una discrepancia, es posible que a algunas canalizaciones les falte información de etapa, trabajo y paso. Por ejemplo, trabajos faltantes en las tablas de resumen de trabajos.

### ID únicos de canalización {#pipeline-unique-ids}

Todas las ejecuciones de canalización dentro de un nivel deben tener un identificador único. Por ejemplo, una canalización y un trabajo pueden tener el mismo ID único, pero no dos canalizaciones.

Al enviar IDs repetidos con diferentes marcas de tiempo, la interfaz de usuario puede mostrar un comportamiento no deseado. Por ejemplo, los gráficos de llama pueden mostrar etiquetas de tramo de una ejecución de canalización diferente. Si se envían IDs duplicados con las mismas marcas de tiempo, solo se almacenan los valores de la última ejecución de canalización recibida.

## Tipos de ejecución de canalización {#pipeline-execution-types}

### Ejecución normal {#normal-run}

La ejecución normal de una canalización sigue el flujo representado a continuación:

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Representación de una ejecución normal de canalización" style="width:100%;">}}

Dependiendo del proveedor, es posible que falten algunos niveles. Por ejemplo, es posible que las etapas no existan y que los trabajos se ejecuten en paralelo o en secuencia, o una combinación de ambos.

Después de completar cada componente, se debe enviar una carga útil a Datadog con todos los datos necesarios para representar la ejecución. Datadog procesa estos datos, los almacena como un evento de canalización y los muestra en [CI Visibility][2]. Las ejecuciones de canalización deben finalizar antes de enviarlas a Datadog.

### Reintentos completos {#full-retries}

Los reintentos completos de una canalización deben tener IDs únicos de canalización diferentes. 

En el punto de conexión de la API pública, puede completar el campo `previous_attempt` para vincular a reintentos anteriores. Los reintentos se tratan como ejecuciones de canalización separadas en Datadog, y las horas de inicio y finalización solo deben abarcar ese reintento.

### Reintentos parciales {#partial-retries}

Al reintentar un subconjunto de trabajos dentro de una canalización, debe enviar un nuevo evento de canalización con un nuevo ID único de canalización. La carga útil para cualquier trabajo nuevo debe estar vinculada al nuevo ID único de canalización. Para vincularlos al reintento anterior, agregue el campo `previous_attempt`. 

Los reintentos parciales también se tratan como canalizaciones separadas. Las horas de inicio y finalización no deben incluir el tiempo del reintento original. Para un reintento parcial, no envíe cargas útiles para los trabajos que se ejecutaron en el intento anterior. Además, establezca el campo `partial_retry` en `true` en los reintentos parciales para excluirlos de la agregación al calcular los tiempos de ejecución.

Por ejemplo, una canalización llamada `P` tiene tres trabajos diferentes, a saber, `J1`, `J2` y `J3`, ejecutados secuencialmente. En la primera ejecución de `P`, solo se ejecutan `J1` y `J2`, y `J2` falla. 

Por lo tanto, debe enviar un total de tres cargas útiles:

1. Carga útil del trabajo para `J1`, con ID `J1_1` e ID de canalización `P_1`.
2. Carga útil del trabajo para `J2`, con ID `J2_1` e ID de canalización `P_1`.
3. Carga útil de canalización para `P`, con ID `P_1`.

Suponga que hay un reintento parcial de la canalización a partir de `J2`, en el que todos los trabajos restantes tienen éxito. 

Necesita enviar tres cargas útiles adicionales:

1. Carga útil de trabajo para `J2`, con ID `J2_2` e ID de canalización `P_2`.
2. Carga útil de trabajo para `J3`, con ID `J3_1` e ID de canalización `P_2`.
3. Carga útil de canalización para `P`, con ID `P_2`.

Los valores reales de los IDs no son importantes. Lo que importa es que se modifiquen correctamente según la ejecución de la canalización, como se especificó anteriormente.

### Canalizaciones bloqueadas {#blocked-pipelines}

Si una canalización está bloqueada indefinidamente porque requiere intervención manual, se debe enviar una carga útil de evento de canalización tan pronto como la canalización alcance el estado bloqueado. El estado de la canalización debe establecerse en `blocked`. 

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flujo de una ejecución de canalización bloqueada" style="width:100%;">}}

Los datos restantes de la canalización deben enviarse en cargas útiles separadas con un ID único de canalización diferente. En la segunda canalización, puede establecer `is_resumed` en `true` para indicar que la ejecución se reanudó desde una canalización bloqueada.

### Canalizaciones descendentes {#downstream-pipelines}

Si una canalización se activa como hija de otra canalización, el campo `parent_pipeline` debe completarse con los detalles de la canalización principal.

### Canalizaciones manuales {#manual-pipelines}

Si una canalización se activa manualmente, el campo `is_manual` debe establecerse en true.

## Información de Git {#git-information}

Se recomienda encarecidamente proporcionar información de Git del commit que activó la ejecución de la canalización. Como mínimo, se requieren la URL del repositorio, el SHA del commit y el correo electrónico del autor. Para obtener más información, consulte la [especificación del punto de conexión de la API pública][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/continuous_integration/pipelines/#setup
[3]: /es/api/latest/ci-visibility-pipelines/#send-pipeline-event
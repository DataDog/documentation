---
description: Aprenda cómo se modelan las canalizaciones y qué tipos de ejecución son
  compatibles con CI Visibility.
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Aprenda sobre Pipeline Visibility
title: Modelo de Datos de Canalización y Tipos de Ejecución
---
## Resumen

Esta guía describe cómo configurar programáticamente las ejecuciones de canalización en CI Visibility y define los tipos de ejecución de canalización que CI Visibility soporta. 

Esta guía se aplica a las canalizaciones creadas utilizando la [API pública de Canalizaciones de CI Visibility][3]. Las integraciones con otros proveedores de CI pueden variar.

## Modelo de datos

Las ejecuciones de canalización se modelan como trazas, similares a una [traza distribuida de APM][1], donde los tramos representan la ejecución de diferentes partes de la canalización. El modelo de datos de CI Visibility para representar las ejecuciones de canalización consiste en cuatro niveles:

| Nombre del Nivel | Descripción |
| ---------- | ----------- |
| Canalización (requerido)  | El tramo raíz de nivel superior que contiene todos los demás niveles como hijos. Representa la ejecución general de una canalización de principio a fin. Este nivel a veces se llama `build` o `workflow` en algunos proveedores de CI. |
| Etapa      | Sirve como una agrupación de trabajos bajo un nombre definido por el usuario. Algunos proveedores de CI no tienen este nivel. |
| Trabajo        | La unidad más pequeña de trabajo donde se ejecutan los comandos. Todas las tareas en este nivel deben realizarse en un solo nodo. |
| Paso       | En algunos proveedores de CI, este nivel representa un script de shell o una acción ejecutada dentro de un trabajo. |

Cuando una canalización, etapa, trabajo o paso finaliza, los datos de ejecución se envían a Datadog. Para configurar Pipeline Visibility, consulte la lista de [proveedores de CI soportados][2]. Si su proveedor de CI o flujo de trabajo no está soportado, puede utilizar el [punto de conexión de la API pública][3] para enviar sus ejecuciones de canalización a Pipeline Visibility.

{{< img src="ci/ci-pipeline-execution.png" alt="Ejemplo de una traza de ejecución de canalización" style="width:100%;">}}

Se espera que las etapas, trabajos y pasos tengan el mismo nombre de canalización que su canalización padre. En caso de una discrepancia, algunas canalizaciones pueden carecer de información sobre etapas, trabajos y pasos. Por ejemplo, trabajos faltantes en las tablas de resumen de trabajos.

### IDs únicos de canalización

Todas las ejecuciones de canalización dentro de un nivel deben tener un identificador único. Por ejemplo, una canalización y un trabajo pueden tener el mismo ID único, pero no dos canalizaciones.

Al enviar IDs repetidos con diferentes marcas de tiempo, la interfaz de usuario puede exhibir un comportamiento indeseable. Por ejemplo, los gráficos de llamas pueden mostrar etiquetas de tramo de una ejecución de canalización diferente. Si se envían IDs duplicados con las mismas marcas de tiempo, solo se almacenan los valores de la última ejecución de canalización recibida.

## Tipos de ejecución de canalización

### Ejecución normal de canalización

La ejecución normal de una canalización sigue el flujo representado a continuación:

{{< img src="ci/pipeline-normal-execution-flow.png" alt="Representación de una ejecución normal de canalización" style="width:100%;">}}

Dependiendo del proveedor, algunos niveles pueden estar ausentes. Por ejemplo, las etapas pueden no existir, y los trabajos pueden ejecutarse en paralelo o en secuencia, o una combinación de ambos.

Después de la finalización de cada componente, se debe enviar una carga útil a Datadog con todos los datos necesarios para representar la ejecución. Datadog procesa estos datos, los almacena como un evento de canalización y los muestra en [CI Visibility][2]. Las ejecuciones de canalización deben finalizar antes de enviarlas a Datadog.

### Reintentos completos

Los reintentos completos de una canalización deben tener diferentes IDs únicos de canalización. 

En el punto de conexión de la API pública, puedes completar el campo `previous_attempt` para vincular a reintentos anteriores. Los reintentos se tratan como ejecuciones de canalización separadas en Datadog, y el tiempo de inicio y fin debe abarcar únicamente ese reintento.

### Reintentos parciales

Al reintentar un subconjunto de trabajos dentro de una canalización, debes enviar un nuevo evento de canalización con un nuevo ID único de canalización. La carga útil para cualquier nuevo trabajo debe estar vinculada al nuevo ID único de canalización. Para vincularlos al reintento anterior, agrega el campo `previous_attempt`. 

Los reintentos parciales también se tratan como canalizaciones separadas. El tiempo de inicio y fin no debe incluir el tiempo del reintento original. Para un reintento parcial, no envíes cargas útiles para trabajos que se ejecutaron en el intento anterior. Además, establece el campo `partial_retry` en `true` en reintentos parciales para excluirlos de la agregación al calcular los tiempos de ejecución.

Por ejemplo, una canalización llamada `P` tiene tres trabajos diferentes, a saber, `J1`, `J2` y `J3`, ejecutados secuencialmente. En la primera ejecución de `P`, solo se ejecutan `J1` y `J2`, y `J2` falla. 

Por lo tanto, necesitas enviar un total de tres cargas útiles:

1. Carga útil del trabajo para `J1`, con ID `J1_1` y ID de canalización `P_1`.
2. Carga útil del trabajo para `J2`, con ID `J2_1` y ID de canalización `P_1`.
3. Carga útil de la canalización para `P`, con ID `P_1`.

Supongamos que hay un reintento parcial de la canalización comenzando desde `J2`, donde todos los trabajos restantes tienen éxito. 

Necesitas enviar tres cargas útiles adicionales:

1. Carga útil del trabajo para `J2`, con ID `J2_2` y ID de canalización `P_2`.
2. Carga útil del trabajo para `J3`, con ID `J3_1` y ID de canalización `P_2`.
3. Carga útil de la canalización para `P`, con ID `P_2`.

Los valores reales de los IDs no son importantes. Lo que importa es que se modifiquen correctamente según la ejecución del pipeline como se especificó anteriormente.

### Canalizaciones bloqueadas

Si una canalización está bloqueada indefinidamente debido a que requiere intervención manual, se debe enviar una carga útil de evento de canalización tan pronto como la canalización alcance el estado bloqueado. El estado de la canalización debe establecerse en `blocked`. 

{{< img src="ci/pipeline-blocked-pipeline-execution.png" alt="Flujo de una ejecución de canalización bloqueada" style="width:100%;">}}

Los datos restantes de la canalización deben enviarse en cargas útiles separadas con un ID único de canalización diferente. En la segunda canalización, puede establecer `is_resumed` en `true` para señalar que la ejecución se reanudó desde una canalización bloqueada.

### Canalizaciones aguas abajo

Si una canalización se activa como hija de otra canalización, el campo `parent_pipeline` debe ser completado con los detalles de la canalización padre.

### Canalizaciones manuales

Si una canalización se activa manualmente, el campo `is_manual` debe establecerse en verdadero.

## Información de Git

Se recomienda encarecidamente proporcionar información de Git del commit que activó la ejecución de la canalización. Las ejecuciones de canalizaciones sin información de Git no aparecen en la [página de Cambios de Código Recientes][4]. Como mínimo, se requieren la URL del repositorio, el SHA del commit y el correo electrónico del autor. Para más información, consulte la [especificación del punto final de la API pública][3].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/continuous_integration/pipelines/#setup
[3]: /es/api/latest/ci-visibility-pipelines/#send-pipeline-event
[4]: https://app.datadoghq.com/ci/commits
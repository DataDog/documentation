---
aliases:
- /es/logs/processing/pipelines/
description: Analizar tus logs con el procesador grok
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Consultar la lista de todos los procesadores disponibles
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de logs
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: Centro de aprendizaje
  text: Profundizando en el procesamiento de logs
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Monitorizar Cloudflare Zero Trust con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Datadog Cloud SIEM
title: Pipelines
---

## Información general

Datadog [analiza][1] automáticamente logs con formato JSON. Luego, puedes añadir valor a todos tus logs (sin procesar y JSON), enviándolos a través de un pipeline de procesamiento. Los pipelines aceptan logs con una amplia variedad de formatos y los traducen a un formato común en Datadog. Implementar una estrategia de pipelines y de procesamiento de logs es beneficioso, ya que introduce una [convención de nomenclatura de atributos][2] para tu organización.

Los pipelines analizan y enriquecen los logs encadenándolos secuencialmente mediante [procesadores][3]. De este modo, se extraen detalles significativos o atributos del texto semiestructurado para reutilizarlos como [facetas][4]. Cada log que pasa por los pipelines se prueba con todos los filtros de pipelines. Si el log coincide con un filtro, todos los procesadores se aplican secuencialmente antes de pasar al siguiente.

Los pipelines y los procesadores pueden aplicarse a cualquier tipo de log. No es necesario modificar la configuración de la gestión de logs, ni implementar cambios en ninguna regla de procesamiento del lado del servidor. Todo puede configurarse en la [página de configuración de pipelines][5].

**Nota**: Para un uso óptimo de la solución Log Management, Datadog recomienda utilizar como máximo 20 procesadores por pipeline y 10 reglas de análisis por [procesador grok][6]. Datadog se reserva el derecho de desactivar reglas de análisis, procesadores o pipelines de bajo desempeño que puedan afectar al rendimiento del servicio Datadog.

## Preprocesamiento

El preprocesamiento de logs JSON se produce antes de que los logs ingresen al pipeline de procesamiento. El preprocesamiento ejecuta una serie de operaciones basadas en atributos reservados, como `timestamp`, `status`, `host`, `service` y `message`. Si tienes diferentes nombres de atributos en tus logs JSON, utiliza el preprocesamiento para asignar tus nombres de atributos de logs a los de la lista de atributos reservados.

El preprocesamiento de logs JSON viene con una configuración predeterminada que funciona para los reenviadores de logs estándar. Para editar esta configuración a fin de adaptar enfoques de reenvío de logs personalizados o específicos:

1. En la aplicación Datadog, ve a [Pipelines][7] y selecciona [Preprocesamiento de los JSON][8].

    **Nota:** El preprocesamiento de logs JSON es la única manera de definir uno de tus atributos de logs como `host` para tus logs.

2. Cambia la asignación por defecto en función del atributo reservado:

{{< tabs >}}
{{% tab "Source" %}}

#### Atributo de origen

Si un archivo de log con formato JSON incluye el atributo `ddsource`, Datadog interpreta su valor como el origen del log. Para utilizar los mismos nombres de origen que Datadog, consulta la [biblioteca de pipelines de integraciones][1].

**Nota**: Los logs procedentes de un entorno contenedorizado requieren el uso de una [variable de entorno][2] para anular los valores por defecto de origen y de servicio.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /es/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Atributo de host

El uso de Datadog Agent o del formato RFC5424 configura automáticamente el valor del host en tus logs. Sin embargo, si un archivo de log con formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el host del log:

* `host`
* `hostname`
* `syslog.hostname`

{{% /tab %}}
{{% tab "Date" (Fecha) %}}

#### Atributo de fecha

Por defecto, Datadog genera una marca de tiempo y la añade a un atributo de fecha cuando se reciben logs. Sin embargo, si un archivo de log con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como la fecha oficial del log:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Especifica los atributos alternativos que se utilizarán como origen de la fecha del log, configurando un [procesador del reasignador de fechas de logs][1].

**Nota**: Datadog rechaza una entrada de log si su fecha oficial es anterior a las 18 horas pasadas.

<div class="alert alert-warning">
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (el formato EPOCH en milisegundos)</a> y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /es/logs/log_configuration/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message" (Mensaje) %}}

#### Atributo de mensaje

Por defecto, Datadog consume el valor del mensaje como cuerpo de la entrada del log. Ese valor se resalta y se muestra en el [Explorador de logs][1], donde se indexa para el [texto completo de la búsqueda][2].

Especifica los atributos alternativos que se utilizarán como origen del mensaje del log, configurando un [procesador del reasignador de mensajes de logs][1].


[1]: /es/logs/explorer/
[2]: /es/logs/explorer/#filters-logs
[3]: /es/logs/log_configuration/processors/#log-message-remapper
{{% /tab %}}
{{% tab "Status" (Estado) %}}

#### Atributo de estado

Cada entrada de log puede especificar un nivel de estado que se pone a disposición de las búsqueda por facetas en Datadog. Sin embargo, si un archivo de log con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el estado oficial del log:

* `status`
* `severity`
* `level`
* `syslog.severity`

Especifica los atributos alternativos que se utilizarán como origen del estado del log, configurando un [procesador del reasignador de estados de logs][1].

[1]: /es/logs/log_configuration/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service" (Servicio) %}}

#### Atributo de servicio

El uso de Datadog Agent o del formato RFC5424 configura automáticamente el valor del servicio en tus logs. Sin embargo, si un archivo de log con formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el servicio del log:

* `service`
* `syslog.appname`

Especifica los atributos alternativos que se utilizarán como origen del servicio del log, configurando un [procesador del reasignador de servicios de logs][1].


[1]: /es/logs/log_configuration/processors/#service-remapper
{{% /tab %}}
{{% tab "Trace ID" (ID de rastreo) %}}

#### Atributo de ID de rastreo

Por defecto, [los rastreadores de Datadog pueden inyectar automáticamente ID de rastreo y de tramo (span) IDs en tus logs][1]. Sin embargo, si un log con formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `trace_id` del log:

* `dd.trace_id`
* `contextMap.dd.trace_id`

Especifica los atributos alternativos que se utilizarán como ID de rastreo del log, configurando un [procesador del reasignador de ID de rastreo de logs][1].


[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
[2]: /es/logs/log_configuration/processors/#trace-remapper
{{% /tab %}}
{{< /tabs >}}

## Crear un pipeline

1. En la aplicación Datadog, ve a [Pipelines][7].
2. Selecciona **New Pipeline** (Nuevo pipeline).
3. Selecciona un log en la vista previa de Live Tail para aplicarle un filtro o aplícale tu propio filtro. Elige un filtro del menú desplegable o crea tu propio filtro seleccionando el icono **</>**. Los filtros te permiten limitar los tipos de logs a los que se aplica un pipeline.

    **Nota**: El filtrado del pipeline se aplica antes que cualquiera de los procesadores del pipeline. Por esta razón, no se puede filtrar con un atributo que se extrae del propio pipeline.

4. Ponle nombre a tu pipeline.
5. (Opcional) Concede acceso de edición a los procesadores en el pipeline.
6. (Opcional) Añade etiquetas (tags) y una descripción al pipeline. La descripción y las etiquetas pueden utilizarse para indicar la finalidad del pipeline y el equipo al que pertenece.
7. Pulsa **Create** (Crear).

Ejemplo de log transformado por un pipeline:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Ejemplo de log transformado por un pipeline" style="width:50%;">}}

### Pipelines de integraciones

<div class="alert alert-info">
Consulta la <a href="/integrations/#cat-log-collection">lista de integraciones compatibles</a>.
</div>

Cuando se configuran para recopilar logs, los pipelines de procesamiento de integraciones están disponibles para determinadas fuentes. Estos pipelines son de **sólo lectura** y analizan tus logs de una forma que se adecua al origen específico. En el caso de los logs de integraciones, se instala automáticamente un pipeline de integración que se encarga del análisis de tus logs y añade la faceta correspondiente en tu Explorador de logs.

Para ver un pipeline de integración, ve a la página [Pipelines][5]. Para editar un pipeline de integración, clónalo y luego edita el clon:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Clonación de un pipeline" style="width:80%;">}}

Consulta el siguiente ejemplo de logs de ELB:

{{< img src="logs/processing/elb_log_post_processing.png" alt="Postprocesamiento de logs de ELB" style="width:70%;">}}

### Biblioteca de pipelines de integración

Para ver la lista completa de pipelines de integración que ofrece Datadog, consulta la [biblioteca de pipelines de integración][7]. La biblioteca de pipelines muestra cómo Datadog procesa diferentes formatos de logs por defecto.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Biblioteca de pipelines de integración" video=true style="width:80%;">}}

Para utilizar un pipeline de integración, Datadog recomienda instalar la integración configurando el log `source` correspondiente. Una vez que Datadog recibe el primer log con este origen, la instalación se activa automáticamente y el pipeline de integración se añade a la lista de pipelines de procesamiento. Para configurar el origen del log, consulta la [documentación sobre integraciones][9] correspondiente.

También es posible copiar un pipeline de integración utilizando el botón de clonación.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Clonación de pipelines a partir de la biblioteca" video=true style="width:80%;">}}

## Añadir un procesador o un pipeline anidado

1. En la aplicación Datadog, ve a [Pipelines][7].
2. Sitúate sobre un pipeline y haz clic en la flecha situada junto a él para expandir los procesadores y los pipelines anidados.
3. Selecciona **Add Processor** (Añadir procesador) o **Add Nested Pipeline** (Añadir pipeline anidado).

### Procesadores

Un procesador se ejecuta en un pipeline para completar una acción de estructuración de datos. Consulta la [sección Procesadores][3] para aprender a añadir y configurar un procesador por tipo de procesador, en la aplicación o con la API. 

Consulta [Análisis de fechas][10] para obtener más información sobre el análisis de una fecha personalizada, sobre un formato de hora y sobre el parámetro `timezone`, necesario si tus marcas de tiempo no están en el formato UTC.

### Pipelines anidados

Los pipelines anidados se encuentran dentro de otros pipelines. Utiliza pipelines anidados para dividir el proceso en dos pasos. Por ejemplo, utiliza primero un filtro de alto nivel, como un equipo, y luego un segundo nivel de filtrado basado en una integración, un servicio o cualquier otro atributo u etiqueta.

Un pipeline puede contener pipelines anidados y procesadores, mientras que un pipeline anidado sólo puede contener procesadores.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines anidados" style="width:80%;">}}

Introduce un pipeline dentro de otro pipeline para convertirlo en un pipeline anidado:

1. Sitúate sobre el pipeline que quieres mover y haz clic en el icono **Move to** (Mover a).
1. Selecciona el pipeline al que quieres mover el pipeline original. **Nota**: Los pipelines que contienen pipelines anidados sólo pueden moverse a una posición de nivel superior y no pueden moverse a otro pipeline.
1. Haz clic en **Move** (Mover).

## Gestión de tus pipelines

Identifica cuándo se ha realizado el último cambio en un pipeline o procesador y qué usuario ha realizado el cambio, utilizando la información de modificación del pipeline. Filtra tus pipelines utilizando esta información de modificación, así como otras propiedades de faceta como si el pipeline está habilitado o es de sólo lectura.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Gestionar tus pipelines utilizando la búsqueda por facetas, la información de modificación del pipeline y el modal de reordenamiento" style="width:50%;">}}

Reordena con precisión los pipelines con la opción `Move to` del panel deslizante de opciones. Desplázate y haz clic en la posición exacta a la que quieres mover el pipeline seleccionado con el modal `Move to`. Los pipelines no pueden introducirse en otros pipelines de sólo lectura. Los pipelines que contienen pipelines anidados sólo pueden moverse a otras posiciones de nivel superior y no pueden moverse a otros pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Reordenar tus pipelines con precisión utilizando el modal Move to (Mover a)" style="width:50%;">}}

## Métricas de uso estimado

Las métricas de uso estimado se muestran por pipeline, específicamente el volumen y el recuento de logs que se consumen y modifican por cada pipeline. También hay un enlace al [dashboard del uso estimado de logs][11] listo para utilizar de cada pipeline, donde puedes ver las métricas de uso de ese pipeline en gráficos más detallados.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="Obtener una vista rápida de las métricas de uso de tu pipeline" style="width:50%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/log_configuration/parsing/
[2]: /es/logs/log_collection/?tab=host#attributes-and-tags
[3]: /es/logs/log_configuration/processors/
[4]: /es/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /es/logs/log_configuration/processors/?tab=ui#grok-parser
[7]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[8]: https://app.datadoghq.com/logs/pipelines/remapping
[9]: /es/integrations/#cat-log-collection
[10]: /es/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[11]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
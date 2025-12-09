---
aliases:
- /es/logs/processing/pipelines/
description: Analizar, enriquecer y gestionar tus logs con pipelines y procesadores
  Datadog
further_reading:
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: Blog
  text: Cómo utilizamos Datadog para obtener una visibilidad completa y detallada
    de nuestro sistema de entrega de correo electrónico.
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
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normaliza tus datos con el OCSF Common Data Model en Cloud SIEM de Datadog
title: Pipelines
---

## Información general

<div class="alert alert-info">Los pipelines y procesadores descritos en esta documentación son específicos de los entornos de generación de logs basados en la nube. Para agregar, procesar y enrutar logs on-premises, consulta <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Observability Pipelines</a>.</div>

Datadog [analiza][1] automáticamente logs con formato JSON. Luego, puedes añadir valor a todos tus logs (sin procesar y JSON), enviándolos a un pipeline de procesamiento. Los pipelines aceptan logs con una amplia variedad de formatos y los traducen a un formato común en Datadog. Implementar una estrategia de pipelines y de procesamiento de logs es beneficioso, ya que introduce una [convención de nomenclatura de atributos][2] para tu organización.

Los pipelines analizan y enriquecen los logs encadenándolos secuencialmente mediante [procesadores][3]. De este modo, se extraen detalles significativos o atributos del texto semiestructurado para reutilizarlos como [facetas][4]. Cada log que pasa por los pipelines se prueba con todos los filtros de pipelines. Si el log coincide con un filtro, todos los procesadores se aplican secuencialmente antes de pasar al siguiente.

Los pipelines y los procesadores pueden aplicarse a cualquier tipo de log. No es necesario modificar la configuración de la gestión de logs, ni implementar cambios en ninguna regla de procesamiento del lado del servidor. Todo puede configurarse en la [página de configuración de pipelines][5].

**Nota**: Para un uso óptimo de la solución Log Management, Datadog recomienda utilizar como máximo **20 procesadores por pipeline** y **10 reglas de análisis sintáctico** en un [procesador Grok][6]. Datadog se reserva el derecho de desactivar reglas de análisis, procesadores o pipelines que no rindan lo suficiente y que puedan afectar al rendimiento del servicio de Datadog.

## Permisos de pipelines

Los pipelines utilizan el [Control de acceso detallado][7] para gestionar quién puede editar configuraciones de pipelines y procesadores. Esto significa que los permisos pueden ser asignados a **roles**, **usuarios individuales** y **equipos**, asegurando un control preciso de los recursos de pipelines. Los pipelines sin ninguna restricción se consideran sin irrestrictos, lo que significa que cualquier usuario con el permiso `logs_write_pipelines` puede modificar el pipeline y sus procesadores.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Configuración de permisos de pipelines en Datadog" style="width:80%;" >}}

Para cada pipeline, los administradores pueden elegir los siguientes contextos de edición:

- **Editor**: Solo los usuarios, equipos o roles especificados pueden editar la configuración de pipelines y procesadores.
- **Editor de procesadores**: Solo los procesadores (incluidos los pipelines anidados) pueden ser editados por usuarios, equipos o roles especificados. Nadie puede modificar los atributos de un pipeline, como su consulta de filtro o su orden en la lista global de pipelines.

<div class="alert alert-warning">Conceder a un usuario acceso a una lista de restricciones de pipelines no concede automáticamente los permisos <code>logs_write_pipelines</code> o <code>logs_write_processors</code>. Los administradores deben conceder estos permisos por separado.</div>

Puedes gestionar estos permisos mediante programación a través de la [**API**][14] y **Terraform**.

## Preprocesamiento

El preprocesamiento de logs JSON se produce antes de que los logs ingresen al pipeline de procesamiento. El preprocesamiento ejecuta una serie de operaciones basadas en atributos reservados, como `timestamp`, `status`, `host`, `service` y `message`. Si tienes diferentes nombres de atributos en tus logs JSON, utiliza el preprocesamiento para asignar tus nombres de atributos de logs a los de la lista de atributos reservados.

El preprocesamiento de logs JSON viene con una configuración predeterminada que funciona para los reenviadores de logs estándar. Para editar esta configuración y adaptar las estrategias de reenvío de logs personalizados o específicos:

1. Ve a [Pipelines][8] en Datadog y selecciona [Preprocesamiento de logs de JSON][9].

    **Nota:** El preprocesamiento de logs JSON es la única manera de definir uno de los atributos de tus logs como `host` para tus logs.

2. Cambia la asignación por defecto en función del atributo reservado:

{{< tabs >}}
{{% tab "Fuente" %}}

#### Atributo de origen

Si un archivo de log con formato JSON incluye el atributo `ddsource`, Datadog interpreta su valor como el origen del log. Para utilizar los mismos nombres de origen que Datadog, consulta la [biblioteca de pipelines de integración][1].

**Nota**: Los logs procedentes de un entorno contenedorizado requieren el uso de una [variable de entorno][2] para anular los valores por defecto del origen y del servicio.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /es/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Atributo de host

El uso de Datadog Agent o del formato RFC5424 configura automáticamente el valor del host en tus logs. Pero si un archivo de log con formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el host del log:

* `host`
* `hostname`
* `syslog.hostname`

**Nota**: En Kubernetes, si un log JSON ingestado por Datadog Agent contiene un atributo de clave `host`, `hostname` o `syslog.hostname`, ese valor anula el nombre de host del Agent predeterminado para ese log. Como resultado, el log no hereda las etiquetas (tags) esperadas a nivel de host, que se establecen a nivel de host, del host correcto. En este caso, Datadog recomienda borrar estos atributos para asegurar que tus logs puedan ser atribuidos a los hosts correctos.

{{% /tab %}}
{{% tab "Date (Fecha)" %}}

#### Atributo de fecha

Por defecto, Datadog genera una marca de tiempo y la añade a un atributo de fecha cuando se reciben logs. Pero si un archivo de log con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como la fecha oficial del log:

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

<div class="alert alert-danger">
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (el formato EPOCH de milisegundos)</a> y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /es/logs/log_configuration/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message (Mensaje)" %}}

#### Atributo de mensaje

Por defecto, Datadog ingiere el valor del mensaje como cuerpo de la entrada del log. Ese valor se resalta y se muestra en el [Log Explorer][1], donde se indexa para la [búsqueda de texto completo][2]. Sin embargo, si un archivo de log con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el mensaje oficial del log:

* `message`
* `msg`
* `log`

Especifica los atributos alternativos que se utilizarán como origen del mensaje del log, configurando un [procesador del reasignador de mensajes de logs][3].


[1]: /es/logs/explorer/
[2]: /es/logs/explorer/#filters-logs
[3]: /es/logs/log_configuration/processors/#log-message-remapper
{{% /tab %}}
{{% tab "Status" %}}

#### Atributo de estado

Cada entrada de log puede especificar un nivel de estado disponible para las búsqueda por facetas en Datadog. Pero si un archivo de log con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el estado oficial del log:

* `status`
* `severity`
* `level`
* `syslog.severity`

Especifica los atributos alternativos que se utilizarán como origen del estado del log, configurando un [procesador del reasignador de estados de logs][1].

[1]: /es/logs/log_configuration/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service (Servicio)" %}}

#### Atributo de servicio

El uso de Datadog Agent o del formato RFC5424 configura automáticamente el valor del servicio en tus logs. Pero si un archivo de log con formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el servicio del log:

* `service`
* `syslog.appname`
* `dd.service`

Especifica los atributos alternativos que se utilizarán como origen del servicio del log, configurando un [procesador del reasignador de servicios de logs][1].


[1]: /es/logs/log_configuration/processors/#service-remapper
{{% /tab %}}
{{% tab "Trace ID (ID de rastreo)" %}}

#### Atributo de ID de rastreo

Por defecto, [los rastreadores de Datadog pueden inyectar automáticamente los ID de rastreo y de tramo (span) en tus logs][1]. Pero si un log con formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `trace_id` del log:

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

Especifica los atributos alternativos que se utilizarán como ID de rastreo del log, configurando un [procesador del reasignador de ID de rastreo de logs][2].


[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
[2]: /es/logs/log_configuration/processors/#trace-remapper
{{% /tab %}}

{{% tab "Span ID" %}}

#### Atributo de ID de span (tramo)

En forma predeterminada, los rastreadores de Datadog pueden [insertar automáticamente ID de span (tramo) en tus logs][1]. Sin embargo, si un log con formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `span_id` del log:

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## Crear un pipeline

1. Ve a [Pipelines][8] en Datadog.
2. Selecciona **New Pipeline** (Nuevo pipeline).
3. Selecciona un log en la vista previa de Live Tail para aplicarle un filtro, o aplícale tu propio filtro. Elige un filtro del menú desplegable o crea tu propio filtro seleccionando el icono **</>**. Los filtros te permiten limitar los tipos de logs a los que se aplica un pipeline.

    **Nota**: El filtrado del pipeline se aplica antes que cualquier procesador del pipeline. Por esta razón, no se puede filtrar con un atributo que se extrae del propio pipeline.

4. Ponle un nombre a tu pipeline.
5. (Opcional) Añade una descripción y etiquetas al pipeline para indicar su propósito y propiedad. Las etiquetas de pipeline no afectan a los logs, pero pueden utilizarse para filtrar y buscar en la [página de pipelines][5].
6. Pulsa **Create** (Crear).

Ejemplo de log transformado por un pipeline:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Ejemplo de log transformado por un pipeline" style="width:50%;">}}

### Pipelines de integración

<div class="alert alert-info">
Consulta la <a href="/integrations/#cat-log-collection">lista de integraciones compatibles</a>.
</div>

Los pipelines de procesamiento de integración están disponibles para ciertas sources (fuentes) cuando se configuran para recopilar logs. Estos pipelines son **sólo de lectura** y analizan tus logs de forma apropiada para el source (fuente) particular. Para los logs de integración, se instala automáticamente un pipeline de integración que se encarga de analizar tus logs y añade la faceta correspondiente en tu Explorer de logs.

Para ver un pipeline de integración, ve a la página [Pipelines][8]. Para editar un pipeline de integración, clónalo y luego edita el clon:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Clonación de un pipeline" style="width:80%;">}}

Consulta el siguiente ejemplo de logs de ELB:

{{< img src="logs/processing/elb_log_post_processing.png" alt="Postprocesamiento de logs de ELB" style="width:70%;">}}

**Nota**: Los pipelines de integraciones no pueden eliminarse, solo desactivarse.

### Biblioteca de pipelines de integraciones

Para ver la lista completa de pipelines de integraciones que ofrece Datadog, consulta la [biblioteca de pipelines de integraciones][10]. La biblioteca de pipelines muestra cómo Datadog procesa diferentes formatos de log por defecto.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Biblioteca de pipelines de integraciones" video=true style="width:80%;">}}

Para utilizar un pipeline de integración, Datadog recomienda instalar la integración configurando la `source` de logs correspondiente. Una vez que Datadog reciba el primer log con esta fuente, la instalación se activa automáticamente y el pipeline de integración se añade a la lista de pipelines de procesamiento. Para configurar la fuente de logs, consulta la [documentación de la integración][11] correspondiente.

También es posible copiar un pipeline de integración utilizando el botón de clonación.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Clonación de pipelines a partir de la biblioteca" video=true style="width:80%;">}}

## Añadir un procesador o un pipeline anidado

1. Ve a [Pipelines][8] en Datadog.
2. Sitúate sobre un pipeline y haz clic en la flecha situada junto a él para expandir los procesadores y los pipelines anidados.
3. Selecciona **Add Processor** (Añadir procesador) o **Add Nested Pipeline** (Añadir pipeline anidado).

### Procesadores

Un procesador se ejecuta dentro de un pipeline para completar una acción de estructuración de datos. Consulta la [documentación sobre procesadores][3] para aprender a añadir y configurar un procesador por tipo de procesador, dentro de la aplicación o con la API.

Consulta [Análisis de fechas][12] para obtener más información sobre los formatos de fecha y hora personalizados y el parámetro `timezone` necesario para las marcas de tiempo que no sean UTC.

### Pipelines anidados

Los pipelines anidados se encuentran dentro de otros pipelines. Utiliza pipelines anidados para dividir el proceso en dos pasos. Por ejemplo, utiliza primero un filtro de alto nivel, como un equipo, y luego un segundo nivel de filtrado basado en una integración, un servicio o cualquier otro atributo u etiqueta.

Un pipeline puede contener pipelines anidados y procesadores, mientras que un pipeline anidado sólo puede contener procesadores.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines anidados" style="width:80%;">}}

Introduce un pipeline dentro de otro pipeline para convertirlo en un pipeline anidado:

1. Sitúate sobre el pipeline que quieres mover y haz clic en el icono **Move to** (Mover a).
1. Selecciona el pipeline al que quieres mover el pipeline original. **Nota**: Los pipelines que contienen pipelines anidados sólo pueden moverse a una posición de nivel superior y no pueden moverse a otro pipeline.
1. Haz clic en **Move** (Mover).

## Gestión de tus pipelines

Identifica cuándo se ha realizado el último cambio en un pipeline o procesador y qué usuario ha realizado el cambio, utilizando la información de modificación del pipeline. Filtra tus pipelines utilizando esta información de modificación, así como otras propiedades de faceta, como por ejemplo si el pipeline está habilitado o es de sólo lectura.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Gestionar tus pipelines utilizando la búsqueda por facetas, la información de modificación del pipeline y el modal de reordenamiento" style="width:50%;">}}

Reordena con precisión los pipelines utilizando la opción `Move to` del panel deslizante de opciones. Desplázate y haz clic en la posición exacta a la que quieres mover el pipeline seleccionado con el modal `Move to`. Los pipelines no pueden introducirse en otros pipelines de sólo lectura. Los pipelines que contienen pipelines anidados sólo pueden moverse a otras posiciones de nivel superior y no pueden moverse a otros pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Reordenar tus pipelines con precisión utilizando el modal Move to (Mover a)" style="width:50%;">}}

## Métricas de uso estimado

Las métricas de uso estimadas se muestran para cada pipeline. Se muestra el volumen y el recuento de logs que están siendo ingeridos y modificados por cada pipeline. Cada pipeline incluye un enlace al [dashboard de uso estimado de logs][13]. Este dashboard ofrece gráficos detallados de las métricas de uso del pipeline.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="Obtener una vista rápida de las métricas de uso de tu pipeline" style="width:50%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/log_configuration/parsing/
[2]: /es/logs/log_collection/?tab=host#attributes-and-tags
[3]: /es/logs/log_configuration/processors/
[4]: /es/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /es/logs/log_configuration/processors/?tab=ui#grok-parser
[7]: /es/account_management/rbac/granular_access/
[8]: https://app.datadoghq.com/logs/pipelines
[9]: https://app.datadoghq.com/logs/pipelines/remapping
[10]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[11]: /es/integrations/#cat-log-collection
[12]: /es/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[13]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[14]: /es/api/latest/restriction-policies/
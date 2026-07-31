---
aliases:
- /es/logs/processing/pipelines/
description: Analiza, enriquece y gestiona tus registros con las canalizaciones y
  procesadores de Datadog
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Consulta la lista completa de procesadores disponibles
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Registro sin límites*
- link: /logs/explorer/
  tag: Documentación
  text: Aprende cómo explorar tus registros
- link: /logs/troubleshooting/
  tag: Documentación
  text: Solución de problemas de registros
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centro de aprendizaje
  text: Procesa registros de manera sencilla con los pipelines de integración
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centro de aprendizaje
  text: Construye y gestiona pipelines de registros
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Monitorea Cloudflare Zero Trust con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorea 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normaliza tus datos con el modelo de datos común OCSF en Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: Blog
  text: Normaliza cualquier registro para Cloud SIEM con el procesador OCSF de Datadog
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: Blog
  text: Cómo utilizamos Datadog para obtener visibilidad integral y detallada de nuestro
    sistema de entrega de correos electrónicos
title: Pipelines
---
## Resumen {#overview}

<div class="alert alert-info">Los pipelines y procesadores descritos en esta documentación son específicos para entornos de registro basados en la nube. Para agregar, procesar y enrutar registros locales, consulta <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Pipelines de Observabilidad</a>.</div>

Datadog automáticamente [analiza][1] registros en formato JSON. Luego puedes agregar valor a todos tus registros (en bruto y JSON) enviándolos a través de una canalización de procesamiento. Los pipelines toman registros de una amplia variedad de formatos y los traducen a un formato común en Datadog. Implementar una estrategia de pipelines y procesamiento de registros es beneficioso, ya que introduce una [convención de nomenclatura de atributos][2] para tu organización.

Con los pipelines, los registros son analizados y enriquecidos al encadenarlos secuencialmente a través de [procesadores][3]. Esto extrae información o atributos significativos de texto semiestructurado para reutilizarlos como [facetas][4]. Cada registro que pasa por las canalizaciones es probado contra cada filtro de canalización. Si coincide con un filtro, entonces todos los procesadores se aplican secuencialmente antes de pasar a la siguiente canalización.

Los pipelines y procesadores pueden aplicarse a cualquier tipo de registro. No necesitas cambiar la configuración de registro ni desplegar cambios en ninguna regla de procesamiento del lado del servidor. Todo puede configurarse dentro de la [página de configuración de la canalización][5].

**Nota**: Para un uso óptimo de la solución de Gestión de Registros, Datadog recomienda usar como máximo **20 procesadores por pipeline** y **10 reglas de análisis** dentro de un [procesador Grok][6]. Datadog se reserva el derecho de deshabilitar reglas de análisis, procesadores o pipelines que no estén rindiendo adecuadamente y que puedan afectar el rendimiento del servicio de Datadog.

## Permisos de la canalización {#pipeline-permissions}

Las canalizaciones utilizan [Control de Acceso Granular][7] para gestionar quién puede editar las configuraciones de canalizaciones y procesadores. Esto significa que se pueden asignar permisos a **roles**, **usuarios individuales** y **equipos**, asegurando un control preciso sobre los recursos de la canalización. Las canalizaciones sin ninguna restricción se consideran sin restricciones, lo que significa que cualquier usuario con el permiso `logs_write_pipelines` puede modificar la canalización y sus procesadores.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Configuración de permisos de la canalización en Datadog" style="width:80%;" >}}

Para cada canalización, los administradores pueden elegir los siguientes contextos de edición:

- **Editor**: Solo los usuarios, equipos o roles especificados pueden editar la configuración de la canalización y los procesadores.
- **Editor de Procesadores**: Solo los procesadores (incluidas las canalizaciones anidadas) pueden ser editados por usuarios, equipos o roles especificados. Nadie puede modificar los atributos de la canalización, como su consulta de filtro o su orden en la lista global de canalizaciones.

<div class="alert alert-warning">Conceder a un usuario acceso a la lista de restricciones de una canalización no otorga automáticamente los <code>logs_write_pipelines</code> o <code>logs_write_processors</code> permisos. Los administradores deben otorgar esos permisos por separado.</div>

Puedes gestionar estos permisos programáticamente a través de [**API**][14] y **Terraform**.

## Preprocesamiento {#preprocessing}

El preprocesamiento de registros JSON ocurre antes de que los registros ingresen al procesamiento de la canalización. El preprocesamiento ejecuta una serie de operaciones basadas en atributos reservados, como `timestamp`, `status`, `host`, `service` y `message`. Si tienes diferentes nombres de atributos en tus registros JSON, utiliza el preprocesamiento para mapear los nombres de atributos de tus registros a los de la lista de atributos reservados.

El preprocesamiento de registros JSON viene con una configuración predeterminada que funciona para los reenvíos de registros estándar. Para editar esta configuración y adaptar enfoques de reenvío de registros personalizados o específicos:

1. Navega a [Canalizaciones][8] en Datadog y selecciona [Preprocesamiento para registros JSON][9].

    **Nota:** El preprocesamiento de registros JSON es la única forma de definir uno de tus atributos de registro como `host` para tus registros.

2. Cambia el mapeo predeterminado basado en el atributo reservado:

{{< tabs >}}
{{% tab "Fuente" %}}

#### Atributo de origen {#source-attribute}

Si un archivo de registro en formato JSON incluye el atributo `ddsource`, Datadog interpreta su valor como la fuente del registro. Para usar los mismos nombres de fuente que utiliza Datadog, consulta la [Biblioteca de Integración de Canalizaciones][1].

**Nota**: Los registros provenientes de un entorno de contenedor requieren el uso de una [variable de entorno][2] para anular los valores predeterminados de fuente y servicio.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /es/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Servidor" %}}

#### Atributo de servidor {#host-attribute}

El uso del Datadog Agent o del formato RFC5424 establece automáticamente el valor del servidor en sus registros. Sin embargo, si un archivo de registro en formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el servidor del registro:

* `host`
* `hostname`
* `syslog.hostname`

**Nota**: En Kubernetes, si un registro JSON ingerido por el Datadog Agent contiene un atributo clave `host`, `hostname` o `syslog.hostname`, ese valor anula el nombre de servidor predeterminado del Datadog Agent para ese registro. Como resultado, el registro no hereda las etiquetas de nivel de servidor esperadas, que se establecen a nivel de servidor, del servidor correcto. En este caso, Datadog recomienda eliminar estos atributos para asegurar que sus registros puedan atribuirse a los servidores correctos.

{{% /tab %}}
{{% tab "Fecha" %}}

#### Atributo de fecha {#date-attribute}

Por defecto, Datadog genera una marca de tiempo y la agrega en un atributo de fecha cuando se reciben los registros. Sin embargo, si un archivo de registro en formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como la fecha oficial del registro:

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Especifique atributos alternativos para usar como fuente de la fecha de un registro configurando un [procesador de remapeo de fecha de registro][1].

**Nota**: Datadog rechaza una entrada de registro si su fecha oficial es anterior a 18 horas en el pasado.

<div class="alert alert-danger">
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (el formato de milisegundos EPOCH)</a>, y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /es/logs/log_configuration/processors/log_date_remapper/
{{% /tab %}}
{{% tab "Mensaje" %}}

#### Atributo del mensaje {#message-attribute}

Por defecto, Datadog ingesta el valor del mensaje como el cuerpo de la entrada de registro. Ese valor se resalta y se muestra en el [Explorador de Registros][1], donde se indexa para [búsqueda de texto completo][2]. Sin embargo, si un archivo de registro en formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el mensaje oficial del registro:

* `message`
* `msg`
* `log`

Especifique atributos alternativos para usar como fuente del mensaje de un registro configurando un [procesador de remapeo de mensajes de registro][3].


[1]: /es/logs/explorer/
[2]: /es/logs/explorer/#filters-logs
[3]: /es/logs/log_configuration/processors/log_message_remapper/
{{% /tab %}}
{{% tab "Estado" %}}

#### Atributo de estado {#status-attribute}

Cada entrada de registro puede especificar un nivel de estado que está disponible para búsqueda facetada dentro de Datadog. Sin embargo, si un archivo de registro en formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el estado oficial del registro:

* `status`
* `severity`
* `level`
* `syslog.severity`

Especifique atributos alternativos para usar como fuente del estado de un registro configurando un [procesador de remapeo de estado de registro][1].

[1]: /es/logs/log_configuration/processors/log_status_remapper/
{{% /tab %}}
{{% tab "Servicio" %}}

#### Atributo de servicio {#service-attribute}

Usar el Agente de Datadog o el formato RFC5424 establece automáticamente el valor del servicio en sus registros. Sin embargo, si un archivo de registro en formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el servicio del registro:

* `service`
* `syslog.appname`
* `dd.service`

Especifique atributos alternativos para usar como fuente del servicio de un registro configurando un [procesador de remapeo de servicio de registro][1].


[1]: /es/logs/log_configuration/processors/service_remapper/
{{% /tab %}}
{{% tab "ID de traza" %}}

#### Atributo de ID de traza {#trace-id-attribute}

Por defecto, [los SDK de Datadog pueden inyectar automáticamente los IDs de traza y de span en tus registros][1]. Sin embargo, si un registro en formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `trace_id` del registro:

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

Especifica atributos alternativos para usar como fuente del ID de traza de un registro configurando un [procesador de remapeo de ID de traza][2].


[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
[2]: /es/logs/log_configuration/processors/trace_remapper/
{{% /tab %}}

{{% tab "ID de tramo" %}}

#### Atributo de ID de tramo {#span-id-attribute}

Por defecto, los SDK de Datadog pueden [inyectar automáticamente los IDs de tramo en tus registros][1]. Sin embargo, si un registro en formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `span_id` del registro:

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## Crea un pipeline {#create-a-pipeline}

1. Navega a [Pipelines][8] en Datadog.
2. Selecciona **Nuevo Pipeline**.
3. Selecciona un registro de la vista previa en tiempo real para aplicar un filtro, o aplica tu propio filtro. Elige un filtro del menú desplegable o crea tu propia consulta de filtro seleccionando el ícono **</>**. Los filtros te permiten limitar qué tipos de registros se aplican a un pipeline.

    **Nota**: El filtrado del pipeline se aplica antes de que cualquiera de los procesadores del pipeline. Por esta razón, no puedes filtrar por un atributo que se extrae en el propio pipeline.

4. Nombra tu pipeline.
5. (Opcional) Agrega una descripción y etiquetas al pipeline para indicar su propósito y propiedad. Las etiquetas del pipeline no afectan los registros, pero pueden ser utilizadas para filtrar y buscar dentro de la [página de Pipelines][8].
6. Presiona **Crear**.

Un ejemplo de un registro transformado por un pipeline:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Un ejemplo de un registro transformado por un pipeline" style="width:50%;">}}

### Pipelines de integración {#integration-pipelines}

<div class="alert alert-info">
Vea la <a href="/integrations/#cat-log-collection">lista de integraciones soportadas</a>.
</div>

Los pipelines de procesamiento de integración están disponibles para ciertas fuentes cuando están configuradas para recopilar registros. Estos pipelines son **solo lectura** y analizan sus registros de maneras apropiadas para la fuente particular. Para los registros de integración, se instala automáticamente un pipeline de integración que se encarga de analizar sus registros y agrega la faceta correspondiente en su Explorador de Registros.

Para ver un pipeline de integración, navegue a la página de [Pipelines][8]. Para editar un pipeline de integración, clónelo y luego edite el clon:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Clonando pipeline" style="width:80%;">}}

Vea el ejemplo de registros de ELB a continuación:

{{< img src="logs/processing/elb_log_post_processing.png" alt="Procesamiento de registros de ELB" style="width:70%;">}}

**Nota**: Los pipelines de integración no pueden ser eliminados, solo deshabilitados.

### Biblioteca de pipelines de integración {#integration-pipeline-library}

Para ver la lista completa de pipelines de integración que ofrece Datadog, consulte la [biblioteca de pipelines de integración][10]. La biblioteca de pipelines muestra cómo Datadog procesa diferentes formatos de registro por defecto.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Biblioteca de pipelines de integración" video=true style="width:80%;">}}

Para usar un pipeline de integración, Datadog recomienda instalar la integración configurando el registro correspondiente `source`. Después de que Datadog reciba el primer registro con esta fuente, la instalación se activa automáticamente y el pipeline de integración se agrega a la lista de pipelines de procesamiento. Para configurar la fuente de registro, consulte la [documentación de integración correspondiente][11].

También es posible copiar un pipeline de integración utilizando el botón de clonar.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Canal de clonación de la biblioteca" video=true style="width:80%;">}}

## Agrega un procesador o una canalización anidada {#add-a-processor-or-nested-pipeline}

1. Navega a [Pipelines][8] en Datadog.
2. Pasa el cursor sobre una canalización y haz clic en la flecha junto a ella para expandir procesadores y canalizaciones anidadas.
3. Selecciona **Agregar procesador** o **Agregar canalización anidada**.

### Procesadores {#processors}

Un procesador se ejecuta dentro de una canalización para completar una acción de estructuración de datos. Consulta la [documentación de procesadores][3] para aprender cómo agregar y configurar un procesador por tipo de procesador, dentro de la aplicación o con la API.

Consulta [Análisis de fechas][12] para aprender sobre formatos de fecha y hora personalizados y el parámetro `timezone` requerido para marcas de tiempo no UTC.

### Canales anidados {#nested-pipelines}

Los canales anidados son canalizaciones dentro de una canalización. Utiliza canalizaciones anidadas para dividir el procesamiento en dos pasos. Por ejemplo, primero utiliza un filtro de alto nivel como equipo y luego un segundo nivel de filtrado basado en la integración, servicio o cualquier otra etiqueta o atributo.

Una canalización puede contener canalizaciones anidadas y procesadores, mientras que una canalización anidada solo puede contener procesadores.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Canalizaciones anidadas" style="width:80%;">}}

Mueve una canalización a otra canalización para convertirla en una canalización anidada:

1. Pasa el cursor sobre la canalización que deseas mover y haz clic en el ícono **Mover a**.
1. Selecciona la canalización a la que deseas mover la canalización original. **Nota**: Las canalizaciones que contienen canalizaciones anidadas solo pueden ser movidas a otra posición de nivel superior. No se pueden mover a otra canalización.
1. Haz clic en **Mover**.

## Administra tus canalizaciones {#manage-your-pipelines}

Identifica cuándo se realizó el último cambio en una canalización o procesador y qué usuario hizo el cambio utilizando la información de modificación en la canalización. Filtra tus canalizaciones utilizando esta información de modificación, así como otras propiedades facetadas como si la canalización está habilitada o es de solo lectura.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Cómo administrar tus canalizaciones con búsqueda facetada, información de modificación de canalizaciones y el modal de reordenamiento" style="width:50%;">}}

Reordena las canalizaciones con precisión utilizando la opción `Move to` en el panel de opciones deslizante. Desplázate y haz clic en la posición exacta para mover la canalización seleccionada utilizando el modal `Move to`. Las canalizaciones no pueden ser movidas a otras canalizaciones de solo lectura. Las canalizaciones que contienen canalizaciones anidadas solo pueden ser movidas a otras posiciones de nivel superior. No pueden ser movidas a otras canalizaciones.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Cómo reordenar tus canalizaciones con precisión utilizando el modal de mover a" style="width:50%;">}}

Clona canalizaciones para reutilizar reglas y procesadores existentes sin tener que empezar de nuevo. Cuando clonas una canalización, Datadog desactiva automáticamente la canalización que clonaste. Haz clic en el interruptor para habilitar.

## Métricas de uso estimadas {#estimated-usage-metrics}

Las métricas de uso estimadas se muestran para cada canalización. Esto muestra el volumen y la cantidad de registros que están siendo ingeridos y modificados por cada canalización. Cada canalización incluye un enlace al [Tablero de Uso Estimado de Registros][13] listo para usar. Este tablero ofrece gráficos detallados de las métricas de uso de la canalización.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="Cómo obtener una vista rápida de las métricas de uso de tus canalizaciones" style="width:50%;">}}

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/log_configuration/parsing/
[2]: /es/logs/log_collection/?tab=host#attributes-and-tags
[3]: /es/logs/log_configuration/processors/
[4]: /es/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /es/logs/log_configuration/processors/grok_parser/
[7]: /es/account_management/rbac/granular_access/
[8]: https://app.datadoghq.com/logs/pipelines
[9]: https://app.datadoghq.com/logs/pipelines/remapping
[10]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[11]: /es/integrations/#cat-log-collection
[12]: /es/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[13]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[14]: /es/api/latest/restriction-policies/
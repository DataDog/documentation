---
aliases:
- /es/logs/processing/pipelines/
description: Analice, enriquezca y administre sus registros con los pipelines y procesadores
  de Datadog
further_reading:
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centro de aprendizaje
  text: Cree y administre pipelines de registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Consulte la lista completa de procesadores disponibles
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentación
  text: Aprenda a explorar sus registros
- link: /logs/troubleshooting/
  tag: Documentación
  text: Solución de problemas de registros
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centro de aprendizaje
  text: Depuración de pipelines de registros
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centro de aprendizaje
  text: Procese registros de forma inmediata con Integration Pipelines
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Monitoree Cloudflare Zero Trust con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitoree 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normalice sus datos con el modelo de datos común OCSF en Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: Blog
  text: Normalice cualquier registro para Cloud SIEM con el procesador OCSF de Datadog
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: Blog
  text: Cómo usamos Datadog para obtener una visibilidad integral y granular de nuestro
    sistema de entrega de correo electrónico
title: Pipelines
---
## Descripción general {#overview}

<div class="alert alert-info">Los pipelines y los procesadores descritos en esta documentación son específicos para entornos de registro basados en la nube. Para agregar, procesar y enrutar registros on-prem, consulte <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Observability Pipelines</a>.</div>

Datadog [realiza el parseo de][1] los registros con formato JSON de forma automática. Luego, puede agregar valor a todos sus registros (raw y JSON) enviándolos a través de un processing pipeline. Los pipelines toman registros de una amplia variedad de formatos y los traducen a un formato común en Datadog. Implementar una estrategia de pipelines de registros y procesamiento es beneficiosa, ya que introduce una [convención de nomenclatura de atributos][2] para su organización.

Con los pipelines, los registros se someten a parseo y se enriquecen encadenándolos secuencialmente a través de [procesadores][3]. Esto extrae información o atributos significativos de texto semiestructurado para reutilizarlos como [facetas][4]. Cada registro que pasa por los pipelines se prueba con cada filtro de pipeline. Si coincide con un filtro, todos los procesadores se aplican secuencialmente antes de pasar al siguiente pipeline.

Los pipelines y los procesadores se pueden aplicar a cualquier tipo de registro. No necesita cambiar la configuración de registro ni implementar cambios en ninguna reglas de procesamiento del lado del servidor. Todo se puede configurar dentro de la [página de configuración de pipelines][5].

**Nota**: Para un uso óptimo de la solución de Log Management, Datadog recomienda usar como máximo **20 procesadores por pipeline** y **10 reglas de procesamiento** dentro de un [Grok processor][6]. Datadog se reserva el derecho de deshabilitar las reglas de parseo, los procesadores o los pipelines de bajo rendimiento que puedan afectar el rendimiento del servicio de Datadog.

## Permisos de Pipeline {#pipeline-permissions}

Los pipelines utilizan [Granular Access Control][7] para administrar quién puede editar las configuraciones de pipeline y de procesadores. Esto significa que los permisos se pueden asignar a **roles**, **usuarios individuales** y **equipos**, lo que garantiza un control preciso sobre los recursos del pipeline. Los pipelines sin restricciones se consideran sin restricciones, lo que significa que cualquier usuario con el permiso `logs_write_pipelines` puede modificar el pipeline y sus procesadores.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Configuración de permisos de pipeline en Datadog" style="width:80%;" >}}

Para cada pipeline, los administradores pueden elegir los siguientes alcances de edición:

- **Editor**: Solo los usuarios, equipos o roles especificados pueden editar la configuración del pipeline y los procesadores.
- **Editor de procesadores**: Solo los usuarios, equipos o roles especificados pueden editar los procesadores (incluidas las pipelines anidadas). Nadie puede modificar los atributos del pipeline, como su consulta de filtro o su orden en la lista global de pipelines.

<div class="alert alert-warning">Otorgar a un usuario acceso a la lista de restricciones de un pipeline no le otorga automáticamente el <code>logs_write_pipelines</code> o <code>logs_write_processors</code> permisos. Los administradores deben otorgar esos permisos por separado.</div>

Puede administrar estos permisos mediante programación a través de [**API**][14] y **Terraform**.

## Preprocesamiento {#preprocessing}

El preprocesamiento de registros JSON ocurre antes de que los registros ingresen al procesamiento del pipeline. El preprocesamiento ejecuta una serie de operaciones basadas en atributos reservados, como `timestamp`, `status`, `host`, `service` y `message`. Si tiene nombres de atributos diferentes en sus registros JSON, utilice el preprocesamiento para asignar los nombres de sus atributos de registros a los de la lista de atributos reservados.

El preprocesamiento de registros JSON viene con una configuración predeterminada que funciona para el Reenvío de registros estándar. Para editar esta configuración y adaptar enfoques de reenvío de registros personalizados o específicos:

1. Vaya a [Pipelines][8] en Datadog y seleccione [{{< ui >}}Preprocessing for JSON logs{{< /ui >}}][9].

    **Nota:** El preprocesamiento de registros JSON es la única forma de definir uno de sus atributos de registro como `host` para sus registros.

2. Cambie la asignación predeterminada basada en el atributo reservado:

{{< tabs >}}
{{% tab "Fuente" %}}

#### Atributo de fuente {#source-attribute}

Si un archivo de registro con formato JSON incluye el atributo `ddsource`, Datadog interpreta su valor como la fuente del registro. Para utilizar los mismos nombres de fuente que usa Datadog, consulte la [Biblioteca de Pipelines de integración][1].

**Nota**: Los registros provenientes de un entorno en contenedores requieren el uso de una [variable de entorno][2] para anular los valores predeterminados de origen y servicio.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /es/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Atributo de host {#host-attribute}

El uso del Datadog Agent o del formato RFC5424 establece automáticamente el valor de host en sus registros. Sin embargo, si un archivo de registro con formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el host del registro:

* `host`
* `hostname`
* `syslog.hostname`

**Nota**: En Kubernetes, si un registro JSON ingerido por el Datadog Agent contiene un atributo de clave `host`, `hostname` o `syslog.hostname`, ese valor anula el nombre de host predeterminado del Agent para ese registro. Como resultado, el registro no hereda las etiquetas a nivel de host esperadas, las cuales se establecen a nivel de host, del host correcto. En este caso, Datadog recomienda borrar estos atributos para asegurar que sus registros puedan atribuirse a los hosts correctos.

{{% /tab %}}
{{% tab "Fecha" %}}

#### Atributo de fecha {#date-attribute}

De forma predeterminada, Datadog genera una marca de tiempo y la añade en un atributo de fecha cuando se reciben los registros. Sin embargo, si un archivo de registro con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como la fecha oficial del registro:

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
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (el formato EPOCH de milisegundos)</a> y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /es/logs/log_configuration/processors/log_date_remapper/
{{% /tab %}}
{{% tab "Mensaje" %}}

#### Atributo de mensaje {#message-attribute}

De forma predeterminada, Datadog ingiere el valor del mensaje como el cuerpo de la entrada de registro. Ese valor se resalta y se muestra en el [Log Explorer][1], donde se indexa para [búsqueda de texto completo][2]. Sin embargo, si un archivo de registro con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el mensaje oficial del registro:

* `message`
* `msg`
* `log`

Especifique atributos alternativos para usar como fuente del mensaje de un registro configurando un [procesador de remapeo de mensaje de registro][3].


[1]: /es/logs/explorer/
[2]: /es/logs/explorer/#filters-logs
[3]: /es/logs/log_configuration/processors/log_message_remapper/
{{% /tab %}}
{{% tab "Estado" %}}

#### Atributo de estado {#status-attribute}

Cada entrada de registro puede especificar un nivel de estado que se pone a disposición para la búsqueda por faceta dentro de Datadog. Sin embargo, si un archivo de registro con formato JSON incluye uno de los siguientes atributos, Datadog interpreta su valor como el estado oficial del registro:

* `status`
* `severity`
* `level`
* `syslog.severity`

Especifique atributos alternativos para usar como fuente del estado de un registro configurando un [procesador de remapeo de estado de registro][1].

[1]: /es/logs/log_configuration/processors/log_status_remapper/
{{% /tab %}}
{{% tab "Servicio" %}}

#### Atributo de servicio {#service-attribute}

El uso del Datadog Agent o del formato RFC5424 establece automáticamente el valor de servicio en sus registros. Sin embargo, si un archivo de registro con formato JSON incluye el siguiente atributo, Datadog interpreta su valor como el servicio del registro:

* `service`
* `syslog.appname`
* `dd.service`

Especifique atributos alternativos para usar como fuente del servicio de un registro configurando un [procesador de remapeo de servicio de registro][1].


[1]: /es/logs/log_configuration/processors/service_remapper/
{{% /tab %}}
{{% tab "ID de traza" %}}

#### Atributo de ID de traza {#trace-id-attribute}

De forma predeterminada, [los SDK de Datadog pueden inyectar automáticamente IDs de traza y de tramo en sus registros][1]. Sin embargo, si un registro con formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `trace_id` del registro:

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

Especifique atributos alternativos para usar como fuente del ID de traza de un registro configurando un [procesador de remapeo de ID de traza][2].


[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
[2]: /es/logs/log_configuration/processors/trace_remapper/
{{% /tab %}}

{{% tab "ID de tramo" %}}

#### Atributo de ID de tramo {#span-id-attribute}

De forma predeterminada, los SDK de Datadog pueden [inyectar automáticamente IDs de tramo en sus registros][1]. Sin embargo, si un registro con formato JSON incluye los siguientes atributos, Datadog interpreta su valor como el `span_id` del registro:

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## Crear una pipeline {#create-a-pipeline}

1. Navegue a [Pipelines][8] en Datadog.
2. Seleccione {{< ui >}}New Pipeline{{< /ui >}}.
3. Seleccione un registro de Live Tail para aplicar un filtro, o aplique su propio filtro. Elija un filtro del menú desplegable o cree su propia consulta de filtro seleccionando el icono {{< ui >}}</>{{< /ui >}}. Los filtros le permiten limitar a qué tipos de registros se aplica una pipeline.

    **Nota**: El filtrado de la pipeline se aplica antes que cualquiera de los procesadores de la pipeline. Por esta razón, no puede filtrar por un atributo que se extraiga en la propia pipeline.

4. Nombre su pipeline.
5. (Opcional) Agregue una descripción y etiquetas a la pipeline para indicar su propósito y propiedad. Las etiquetas de la pipeline no afectan a los registros, pero pueden utilizarse para filtrar y buscar dentro de la [Pipelines page][8].
6. Presione {{< ui >}}Create{{< /ui >}}.

Un ejemplo de un registro transformado por una pipeline:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Un ejemplo de un registro transformado por una pipeline" style="width:50%;">}}

### Pipelines de integración {#integration-pipelines}

<div class="alert alert-info">
Consulte la <a href="/integrations/#cat-log-collection">lista de integraciones admitidas</a>.
</div>

Las pipelines de procesamiento de integración están disponibles para ciertas fuentes cuando están configuradas para recopilar registros. Estas pipelines son **de solo lectura** y analizan sus registros de maneras apropiadas para la fuente en particular. Para los registros de integración, se instala automáticamente una pipeline de integración que se encarga del parseo de sus registros y agrega la faceta correspondiente en su Log Explorer.

Para ver una pipeline de integración, navegue a la página [Pipelines][8]. Para editar una pipeline de integración, clónela y luego edite el clon:

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Clonar pipeline" style="width:80%;">}}

Vea el ejemplo de registros de ELB a continuación:

{{< img src="logs/processing/elb_log_post_processing.png" alt="Procesamiento posterior de registros de ELB" style="width:70%;">}}

**Nota**: Las pipelines de integración no se pueden eliminar, solo deshabilitar.

### Biblioteca de pipelines de integración {#integration-pipeline-library}

Para ver la lista completa de pipelines de integración que ofrece Datadog, explore la [biblioteca de Pipelines de integración][10]. La biblioteca de pipelines muestra cómo Datadog procesa diferentes formatos de registro de forma predeterminada.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Biblioteca de pipelines de integración" video=true style="width:80%;">}}

Para usar una pipeline de integración, Datadog recomienda instalar la integración configurando el registro correspondiente en `source`. Después de que Datadog recibe el primer registro con esta fuente, la instalación se activa automáticamente y la pipeline de integración se agrega a la lista de Pipelines de procesamiento. Para configurar la fuente de registro, consulte la [documentación de integración][11] correspondiente.

También es posible copiar una pipeline de integración usando el botón de clonar.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Clonación de pipeline desde la biblioteca" video=true style="width:80%;">}}

## Agregue un procesador o una pipeline anidada {#add-a-processor-or-nested-pipeline}

1. Navegue a [Pipelines][8] en Datadog.
2. Pase el cursor sobre una pipeline y haga clic en la flecha junto a ella para expandir los procesadores y las pipelines anidadas.
3. Seleccione {{< ui >}}Add Processor{{< /ui >}} o {{< ui >}}Add Nested Pipeline{{< /ui >}}.

### Procesadores {#processors}

Un procesador se ejecuta dentro de una pipeline para completar una acción de estructuración de datos. Consulte la [documentación de procesadores][3] para aprender cómo agregar y configurar un procesador por tipo de procesador, dentro de la aplicación o con la API.

Consulte [Parseo de fechas][12] para obtener información sobre formatos personalizados de fecha y hora y el parámetro `timezone` requerido para marcas de tiempo que no son UTC.

### Precedencia de atributos cuando varios procesadores coinciden {#attribute-precedence}

Cuando varios procesadores dentro de pipelines coincidentes establecen el mismo atributo, el resultado depende del tipo de procesador. Existen tres comportamientos:

| Comportamiento | Descripción | Procesadores |
| --- | --- | --- |
| La última escritura gana | El valor establecido por el procesador posterior (más abajo en el orden) sobrescribe el valor anterior. | Analizador Grok, procesador de categoría, procesador aritmético, procesador de creación de cadenas, procesador de búsqueda, analizador de URL, analizador de agente de usuario, analizador GeoIP, procesador de decodificación |
| Depende de `override_on_conflict` | Sigue el parámetro `override_on_conflict`. De forma predeterminada (`false`), el elemento de destino no se sobrescribe si ya está establecido. | Remapeador, procesador de mapa de matriz |
| La primera escritura gana | Solo se aplica el primer procesador (excepto el remapeador de fecha de registro, que usa el último). Dentro de una misma pipeline, se utiliza el valor del primer procesador; en varias pipelines coincidentes, se aplica la primera que se encuentre. | Remapeador de estado de registro, Remapeador de servicio, Remapeador de mensajes de registro, Remapeador de traza, Remapeador de tramo |

Para obtener detalles sobre cada procesador, consulte [Processors][3].

### Pipelines anidadas {#nested-pipelines}

Las Pipelines anidadas son Pipelines dentro de una pipeline. Utilice Pipelines anidadas para dividir el procesamiento en dos pasos. Por ejemplo, primero utilice un filtro de alto nivel como el equipo y luego un segundo nivel de filtrado basado en la integración, el servicio o cualquier otra etiqueta o atributo.

Una pipeline puede contener Pipelines anidadas y procesadores, mientras que una pipeline anidada solo puede contener procesadores.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines anidadas" style="width:80%;">}}

Mueva una pipeline a otra pipeline para convertirla en una pipeline anidada:

1. Coloque el cursor sobre la pipeline que desea mover y haga clic en el icono {{< ui >}}Move to{{< /ui >}}.
1. Seleccione la pipeline a la que desea mover la pipeline original. **Nota**: Las Pipelines que contienen Pipelines anidadas solo pueden moverse a otra posición de nivel superior. No se pueden mover a otra pipeline.
1. Haga clic en {{< ui >}}Move{{< /ui >}}.

## Vista previa de los cambios en la pipeline {#preview-pipeline-changes}

Al crear o editar una pipeline o sus procesadores, puede obtener una vista previa de cómo afectan sus cambios a los registros antes de aplicarlos. La vista previa utiliza Live Tail de sus registros, procesada con los cambios propuestos.

{{< img src="logs/processing/pipelines/pipeline_simulation.png" alt="La vista de simulación de la pipeline que muestra los procesadores de la pipeline a la izquierda y la diferencia de un registro seleccionado a la derecha" >}}

Para cada registro, compare sus estados anterior y posterior. Seleccione el cambio con el que desea comparar:

- **Sus cambios**: compara la versión implementada actual de la pipeline con la versión con sus cambios.
- **pipeline completa**: compara el registro que ingresa a la pipeline con el registro después de que se ejecuta toda la pipeline.

Para reducir la lista de registros, use el filtro de consulta o filtre por impacto:

- **Todos los registros**: cada registro en el seguimiento de las últimas líneas.
- **Registros impactados**: solo los registros cambiados por sus ediciones en esta sesión.
- **Registros no impactados**: solo los registros que sus ediciones dejan sin cambios.

## Administre sus pipelines {#manage-your-pipelines}

Identifique cuándo se realizó el último cambio en una pipeline o procesador y qué usuario realizó el cambio utilizando la información de modificación en la pipeline. Filtre sus pipelines usando esta información de modificación, así como otras propiedades facetadas, como si el pipeline está habilitado o es de solo lectura.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Cómo administrar sus pipelines con búsqueda facetada, información de modificación de pipeline y el modal de reordenamiento" style="width:50%;">}}

Reordene los pipelines con precisión con la opción {{< ui >}}Move to{{< /ui >}} en el panel de opciones deslizante. Desplácese y haga clic en la posición exacta a la que desea mover la pipeline seleccionada usando el modal {{< ui >}}Move to{{< /ui >}}. Los pipelines no se pueden mover a otros pipelines de solo lectura. Los pipelines que contienen pipelines anidados solo se pueden mover a otras posiciones de nivel superior. No se pueden mover a otros pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Cómo reordenar sus pipelines con precisión usando el modal de mover a" style="width:50%;">}}

Clone pipelines para reutilizar reglas y procesadores existentes sin tener que empezar de nuevo. Cuando clona una pipeline, Datadog deshabilita automáticamente la pipeline que clonó. Haga clic en el interruptor para habilitar.

## Métricas de uso estimadas {#estimated-usage-metrics}

Se muestran las métricas de uso estimadas para cada pipeline. Esto muestra el volumen y la cantidad de registros que cada pipeline ingiere y modifica. Cada pipeline incluye un enlace al [Dashboard de uso estimado de registros][13] preconfigurado. Este Dashboard ofrece gráficos detallados de las métricas de uso de la pipeline.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="Cómo obtener una vista rápida de las métricas de uso de sus pipelines" style="width:50%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca comercial de Datadog, Inc.

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
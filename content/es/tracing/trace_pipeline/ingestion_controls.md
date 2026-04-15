---
aliases:
- /es/tracing/trace_ingestion/control_page
- /es/tracing/trace_ingestion/ingestion_control_page
- /es/account_management/billing/usage_control_apm/
- /es/tracing/app_analytics/
- /es/tracing/guide/ingestion_control_page/
- /es/tracing/trace_ingestion/ingestion_controls
description: Aprende a controlar las velocidades de consumo con APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentación
  text: Mecanismos de consumo
- link: /tracing/trace_pipeline/metrics/
  tag: Documentación
  text: Métricas de uso
title: Controles del consumo
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas para el muestreo del consumo" >}}

Los controles de ingesta afectan a qué trazas envían tus aplicaciones a Datadog. Las [métricas de APM][1] siempre se calculan basándose en todas las trazas y no se ven afectadas por los controles de ingesta.

La página de Ingestion Control proporciona visibilidad de la configuración de ingesta de tus aplicaciones y servicios. Desde la [página de Ingestion Control][2]:

- Obtén visibilidad de tu configuración de ingesta a nivel de servicio.
- Ajusta las tasas de muestreo de traza para los endpoints o servicios de alto rendimiento con el fin de gestionar mejor el presupuesto de ingesta.
- Ajusta las tasas de muestreo de trazas en caso de bajo rendimiento, servicios de tráfico poco frecuente o endpoints para aumentar la visibilidad.
- Comprende qué [mecanismos de ingesta][11] son responsables de la toma de muestras de la mayor parte de tus trazas.
- Investigar y actuar ante posibles problemas de configuración del consumo, como recursos limitados de la CPU o la RAM para el Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Información general de la página de Ingestion Control" >}}

## Comprender tu configuración de ingesta

Utiliza los datos del encabezado de control de ingesta para monitorizar tu ingesta de trazas. El encabezado muestra la cantidad total de datos ingeridos durante la última hora, tu uso mensual estimado y el porcentaje de tu límite de ingesta mensual asignado, calculado en función de tu infraestructura activa de APM (como hosts, tareas de Fargate y funciones sin servidor).

Si el uso mensual es inferior a `100%`, los datos ingeridos proyectados se ajustan a tu asignación mensual. Un valor de uso mensual superior a `100%` significa que se prevé que los datos mensuales ingeridos superen tu asignación mensual.

### Niveles de ingesta por servicio

La tabla de servicios contiene información sobre los volúmenes consumidos y la configuración del consumo, desglosada por servicio:

Tipo
: El tipo de servicio: servicio web, base de datos, caché, navegador, etc...

Nombre
: El nombre de cada servicio que envía trazas a Datadog. La tabla contiene servicios raíz y no raíz para los que se consumieron datos en la última hora.

Trazas/s consumidas
: Número promedio de trazas por segundo consumidas partiendo del servicio durante la última hora.

Bytes/s ingeridos
: número medio de bytes por segundo ingeridos en servicio durante la última hora.

Bytes/s de bajada
: número medio de bytes por segundo ingeridos para los que el servicio _toma la decisión de muestreo_. Esto incluye los bytes de todos los tramos de servicio descendentes en el stack tecnológico de llamadas que siguen a la decisión tomada en el encabezado de la traza. Los datos de esta columna se basan en la dimensión `sampling_service`, establecida en las métricas `datadog.estimated_usage.apm.ingested_bytes`. Para obtener más información, lee [métricas de uso de APM][15].

Desglose del tráfico
: Un desglose detallado del tráfico muestreado y no muestreado para trazas partiendo del servicio. Consulta [Desglose del tráfico](#traffic-breakdown) para obtener más información.

Configuración de ingesta
: muestra `Automatic` si se aplica el [mecanismo de muestreo por defecto basado en encabezados][4] del Agent. Si la ingesta se configuró con [reglas de muestreo de trazas][8], el servicio se marca como `Configured`; se establece una etiqueta `Local` cuando la regla de muestreo se aplica desde la configuración en la biblioteca de rastreo, se establece una etiqueta `Remote` cuando la regla de muestreo se aplica de forma remota, desde la interfaz de usuario. Para obtener más información sobre la configuración de la ingesta para un servicio, lee sobre [cambiar la tasa de ingesta predeterminada](#configure-the-service-ingestion-rate).

Infraestructura
: Hosts, contenedores y funciones en los cuales se ejecuta el servicio.

Estado del servicio
: Muestra `Limited Resource` cuando se descartan algunos tramos debido a que el Datadog Agent alcanza los límites de la CPU o de la RAM configurados [en su configuración][9], `Legacy Setup` cuando algunos tramos se consumen a través del [mecanismo de App Analytics][7] legacy o `OK` de otro modo.

Filtra la página por el entorno, la configuración y el estado para ver los servicios para los cuales necesitas tomar una decisión. Para reducir el volumen del consumo global, ordena la tabla por la columna `Downstream Bytes/s` para ver los servicios responsables de la mayor parte de tu consumo.

**Nota**: La tabla tiene la tecnología de las [métricas de uso][10] `datadog.estimated_usage.apm.ingested_spans` y `datadog.estimated_usage.apm.ingested_bytes`. Estas métricas están etiquetadas por `service`, `env` y `ingestion_reason`.

#### Desglose del tráfico

La columna Desglose del tráfico desglosa el destino de todas las trazas a partir del servicio. Te ofrece una estimación de la parte del tráfico que se ingiere y se abandona, y por qué motivos.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Desglose del tráfico del consumo de trazas" >}}

El desglose se compone de las siguientes partes:

- **Trazas completas consumidas** (azul): El porcentaje de las trazas consumidas por Datadog.
- **Trazas completas no retenidas** (gris): el porcentaje de trazas que no han sido ingeridas por Datadog. Algunas trazas pueden ser descartadas porque: 

    1. Por defecto, el [Agent establece automáticamente una tasa de muestreo][4] en servicios, en función del tráfico de servicio.
    2. El servicio está configurado para ingerir un determinado porcentaje de trazas mediante [reglas de muestreo][8].

- **Trazas completas eliminadas por el limitador de tasa del rastreador** (naranja): cuando eliges establecer manualmente la tasa de ingesta de servicio como un porcentaje con las reglas de muestreo de trazas, se habilita automáticamente un limitador de tasa, establecido en 100 trazas por segundo de forma predeterminada. Consulta la documentación [limitador de tasa][8] para cambiar esta tasa.

- **Trazas descartadas debido al límite de la CPU o la RAM del Agent** (rojo): Con este mecanismo se pueden descartar tramos y crear trazas incompletas. Para solucionarlo, aumenta la asignación de la CPU y la memoria para la infraestructura en la cual se ejecuta el Agent.

## Configuración de la ingesta para un servicio

Haz clic en servicio para ver el resumen de ingesta de servicio, que ofrece información práctica y opciones de configuración para gestionar la ingestión de trazas del servicio.

### Configuración de ingesta para un servicio

#### Tasas de muestreo por recurso

La tabla enumera las tasas de muestreo aplicadas por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de tasas de muestreo por recurso" style="width:100%;">}}

- La columna `Ingested bytes` muestra los bytes ingeridos de tramos (spans) del servicio y el recurso, mientras que la columna `Downstream bytes` muestra los bytes ingeridos desde tramos en los que la decisión de muestreo se toma a partir de ese servicio y recurso, incluidos los bytes de los servicios de descarga en la cadena de llamadas.
- La columna `Configuration` muestra desde dónde se está aplicando la frecuencia de muestreo de recursos:
  - `Automatic` si se aplica el [mecanismo de muestreo por defecto basado en el encabezado][4] del Agent.
  - `Local Configured` si se ha establecido localmente una [regla de muestreo][8] en la biblioteca de rastreo.
  - `Remote Configured` si se ha configurado una regla de muestreo remota desde la interfaz de usuario de Datadog. Para saber cómo configurar reglas de muestreo desde la página de Ingestion Control, lee la sección sobre [configuración remota de reglas de muestreo](#configure-the-service-ingestion-rates-by-resource).

**Nota**: Si el servicio no toma decisiones de muestreo, los recursos de servicio se colapsarán bajo la fila `Resources not making sampling decisions`.

**Nota**: En periodos cortos (1-4 horas), la tasa de muestreo efectiva puede mostrarse por debajo del 100 % incluso cuando está configurada al 100 %. Este es un comportamiento esperado debido a los cálculos estadísticos que necesitan más puntos de datos para converger. Todas las trazas se siguen capturando correctamente. Para una visualización más precisa, consulta las tasas de muestreo en periodos más largos.

#### Motivos de ingesta y responsables del muestreo

Explora el **Desglose de motivos del consumo** para ver qué mecanismos son responsables del consumo de tu servicio. Cada motivo del consumo está relacionado con un [mecanismo de consumo][11] específico. Después de cambiar tu configuración del consumo del servicio, puedes observar el aumento o la disminución de los bytes y tramos consumidos en esta gráfica de series temporales basado en los datos consumidos en la última hora.

Si la mayor parte de tu volumen de consumo del servicio se debe a decisiones tomadas por servicios upstream, investiga el detalle de la lista principal de los **Tomadores de decisiones de muestreo**. Por ejemplo, si tu servicio es no raíz, (lo que significa que **nunca decide** muestrear trazas), observa todos los servicios upstream responsables de tu consumo del servicio no raíz. Configura los servicios raíz upstream para reducir tu volumen total de consumo.

Para investigar más a fondo, utiliza [APM Trace - Dashboard de uso estimado][12], que ofrece información sobre el consumo global, así como gráficas de desglose por el `service`, la `env` y el `ingestion reason`.

#### Versiones del Agent y de las bibliotecas de rastreo

Consulta las versiones del **Datadog Agent y de las bibliotecas de rastreo** que utiliza tu servicio. Compara las versiones en uso con las últimas versiones publicadas para asegurarte de estar ejecutando Agents y bibliotecas actualizadas.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versiones del Agent y de las bibliotecas de rastreo" >}}

### Gestión de las tasas de muestreo de los servicios

Para controlar las tasas de muestreo de un servicio, es posible que desees utilizar:
- **Muestreo adaptativo**: ajusta automáticamente las tasas de muestreo para que coincidan con un presupuesto de volumen de ingesta mensual configurado.
- **Muestreo basado en recursos**: establece manualmente tasas de muestreo explícitas por recurso.

Las configuraciones de estas estrategias pueden aplicarse **de forma remota** a través de la interfaz de usuario de Datadog. Este método permite que los cambios surtan efecto inmediatamente sin necesidad de volver a desplegar el servicio. Para el **muestreo basado en recursos**, también tienes la opción de aplicar las configuraciones **localmente** actualizando los archivos de configuración de tu servicio y volviendo a desplegarlo.

El uso de **Remote Configuration** para las tasas de ingesta de servicios tiene requisitos específicos.

{{% collapse-content title="Requisitos de Remote Configuration" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] o posterior.
- [Configuración remota][3] activada para tu Agent.
- [Permisos] `APM Remote Configuration Write`[20]. Si no tienes estos permisos, pide a tu administrador de Datadog que actualice tus permisos desde Parámetros de organización.

A continuación, se indica la versión mínima de biblioteca de rastreo necesaria para esta función:

| Lenguaje | Versión mínima requerida |
|----------|--------------------------|
| Java     | v1.34.0                  |
| Go       | v1.64.0                  |
| Python   | v.2.9.0                  |
| Ruby     | v2.0.0                   |
| Node.js  | v5.16.0                  |
| PHP      | v1.4.0                   |
| .NET     | v2.53.2                  |
| C++      | v0.2.2                   |

{{% /collapse-content %}}

#### Muestreo adaptativo

Utiliza el muestreo adaptativo para que Datadog gestione las tasas de muestreo de los servicios en tu nombre. Especifica un volumen de ingesta mensual objetivo para uno o varios servicios sin perder de vista todos los servicios y endpoints.

Para configurar el muestreo adaptativo:

1. Navega hasta la página [Ingestion Control][2].
2. Haz clic en un servicio para ver el **Service Ingestion Summary** (Resumen de ingesta de servicios).
3. Haz clic en **Manage Ingestion Rate** (Gestionar tasa de ingesta).
4. Elige **Datadog adaptive sampling rates** (Tasas de muestreo adaptativo de Datadog) como estrategia de muestreo de tu servicio.
5. Haz clic en **Apply** (Aplicar).

<div class="alert alert-info">Si la aplicación <strong>remota</strong> de esta configuración está desactivada, asegúrate de que se cumplen los <a href="#remote-configuration-requirements">requisitos de Remote Configuración</a>.</div>

Para más información, consulta [Muestreo adaptativo][17].


#### Muestreo basado en recursos

Para configurar tasas de muestreo personalizadas para el servicio por nombre de recurso: 
1. Navega hasta la página [Ingestion Control][2].
2. Haz clic en un servicio para ver el **Service Ingestion Summary** (Resumen de ingesta de servicios).
3. Haz clic en **Manage Ingestion Rate** (Gestionar tasa de ingesta).
4. Haz clic en **Custom sampling rates only** (Solo tasas de muestreo personalizadas).
5. Haz clic en **Add new rule** (Añadir nueva regla) para establecer tasas de muestreo para algunos recursos.  
   **Nota**: Las reglas de muestreo utilizan la coincidencia de patrones glob, por lo que puedes utilizar comodines (`*`) para coincidir con varios recursos al mismo tiempo.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="Modal de configuración" style="width:100%;">}}
6. Aplica la configuración **Remotamente** o **Localmente**:
{{< tabs >}}
{{% tab "Remotely" %}}

Esta opción aplica la configuración mediante Remote Configurtion, por lo que **no es necesario** volver a desplegar el servicio para que el cambio surta efecto. Puedes observar los cambios de configuración desde [Live Search Explorer][100].

Haz clic en **Apply** (Aplicar) para guardar la configuración.

Los recursos que se han configurado remotamente aparecen como `Configured Remote` en la columna **Configuration** (Configuración).

<br><div class="alert alert-info">Si la aplicación <strong>remota</strong> de esta configuración está desactivada, asegúrate de que se cumplen los <a href="#remote-configuration-requirements">requisitos de Remote Configuration</a>.</div>

[100]: /es/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Locally" %}}

Esta opción genera la configuración para que la apliques manualmente.
1. Aplica la configuración generada a tu servicio.  
   **Nota**: El valor del nombre del servicio distingue mayúsculas y minúsculas. Debe coincidir con el nombre de tu servicio.
1. Vuelve a desplegar el servicio.
1. Confirma que se ha aplicado el nuevo porcentaje consultando la columna **Traffic Breakdown** (Desglose del tráfico). Los recursos que se han configurado localmente aparecen como `Configured Local` en la columna **Configuration** (Configuración).

{{% /tab %}}
{{< /tabs >}}

## Gestión de la configuración de la ingesta del Datadog Agent

Haz clic en **Configure Datadog Agent Ingestion** (Configurar la ingesta del Datadog Agent) para gestionar las tasas de muestreo por defecto basadas en encabezados, el muestreo de errores y el muestreo poco frecuente.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Modalidad de configuración en el nivel del Agent" >}}

- **[Head-based sampling][4]** (Muestreo basado en la fase inicial): Cuando no se establecen reglas para el muestreo de un servicio, el Datadog Agent calcula automáticamente las frecuencias de muestreo que se aplicarán a tus servicios con un objetivo de **10 trazas por segundo por Agent**. Cambia este número de destino de trazas en Datadog o configura `DD_APM_MAX_TPS` localmente en el nivel del Agent.
- **[Muestreo de tramos (spans) de error][5]**: Para las trazas no capturadas por el muestreo basado en la fase inicial, el Datadog Agent captura trazas de error locales **hasta 10 trazas por segundo por Agent**. Cambia este número de destino de trazas en Datadog o configura `DD_APM_ERROR_TPS` localmente en el nivel del Agent.
- **[Muestreo de tramos poco frecuentes][6]**: Para las trazas no capturadas por el muestreo basado en la fase inicial, el Datadog Agent captura trazas poco frecuentes locales **hasta 5 trazas por segundo por Agent**. Esta opción está desactivada por defecto. Habilita la recopilación de trazas poco frecuentes en Datadog o configura `DD_APM_ENABLE_RARE_SAMPLER` localmente en el nivel del Agent.

Con la configuración remota, no es necesario reiniciar el Agent para actualizar estos parámetros. Haz clic en `Apply` para guardar los cambios de configuración, y la nueva configuración entrará en vigor inmediatamente. La configuración remota de los parámetros de muestreo del Agent está disponible si utilizas el Agent versión [7.42.0][13] o posterior.

**Nota**: La sección `Other Ingestion Reasons` (gris) del gráfico circular representa otros motivos de ingesta que _no son configurables_ en el nivel del Datadog Agent. 

**Nota**: Los parámetros configurados en forma remota tienen prioridad sobre las configuraciones locales como las variables de entorno y la configuración de `datadog.yaml`.

## Precedencia de las reglas de muestreo

Si las reglas de muestreo se establecen en varias ubicaciones, se aplican las siguientes reglas de precedencia en orden, donde las reglas que aparecen en primer lugar en la lista pueden anular las reglas de precedencia inferior:

1. Reglas de muestreo configuradas remotamente, establecidas a través de [muestreo basado en recursos](#configure-the-service-ingestion-rates-by-resource)
1. [Reglas de muestreo adaptativo][17]
1. [Reglas de muestreo configuradas localmente][8] (`DD_TRACE_SAMPLING_RULES`)
1. [Tasa de muestreo global configurada remotamente][8]
1. [Tasa de muestreo global configurada localmente][8] (`DD_TRACE_SAMPLE_RATE`)
1. [Tasas del trace agent controladas indirectamente con la configuración del Agent](#managing-datadog-agent-ingestion-configuration) de forma remota o local (`DD_APM_MAX_TPS`)

En otras palabras, Datadog utiliza las siguientes reglas de precedencia:
- Configuración del rastreador > configuración del Agent
- Reglas de muestreo > Tasa de muestreo global
- Remoto > Local

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: /es/tracing/guide/remote_config
[4]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /es/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /es/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /es/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /es/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /es/tracing/trace_pipeline/metrics
[11]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /es/remote_configuration#enabling-remote-configuration
[15]: /es/tracing/trace_pipeline/metrics#what-is-the-sampling-service
[17]: /es/tracing/trace_pipeline/adaptive_sampling/
[18]: /es/tracing/guide/trace_ingestion_volume_control/#globally-configure-the-ingestion-sampling-rate-at-the-agent-level
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[20]: /es/account_management/rbac/permissions/
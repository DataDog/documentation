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

Los controles del consumo afectan a qué trazas (traces) envían tus aplicaciones a Datadog. Las [métricas de APM][1] siempre se calculan basándose en todas las trazas y no se ven afectadas por los controles del consumo.

La página de control del consumo ofrece visibilidad al nivel del Agent y de las bibliotecas de rastreo en la configuración del consumo de tus aplicaciones y servicios. Desde la [página de configuración del control del consumo][2], puedes:
- Obtener visibilidad de tu configuración del consumo al nivel del servicio y ajustar las frecuencias de muestreo de trazas para obtener servicios de alto rendimiento.
- Comprender qué mecanismos de consumo son responsables del muestreo de la mayor parte de tus trazas.
- Investigar y actuar ante posibles problemas de configuración del consumo, como recursos limitados de la CPU o la RAM para el Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Información general de la página de control del consumo" >}}

Todas las métricas utilizadas en la página se basan en datos del tráfico en vivo de la **última hora**. Cualquier cambio en la configuración del Agent o de las bibliotecas se refleja en la página.

## Resumen de todos los entornos

Obtén información general del total de datos consumidos durante la última hora y una estimación de tu uso mensual frente a tu asignación mensual, calculado con la infraestructura activa (hosts, tareas de Fargate y funciones serverless) de APM.

Si el uso mensual es inferior a `100%`, los datos consumidos previstos se ajustan a tu [asignación mensual][3]. Un valor de uso mensual superior a `100%` significa que se prevé que los datos mensuales consumidos superen tu asignación mensual.

## Administrar el consumo para todos los servicios en el nivel del Agent

Haz clic en **Configuración remota del consumo en el Agent** para administrar el muestreo del consumo de tus servicios de forma global. Puedes configurar en forma remota los parámetros de muestreo del Agent si utilizas el Agent versión [7.42.0][13] o superior. Lee [Cómo funciona la configuración remota][14] para obtener información sobre cómo activar la configuración remota en tus Agents.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Modalidad de configuración en el nivel del Agent" >}}

Hay tres mecanismos de muestreo del consumo que se pueden controlar desde el Datadog Agent:
- **[Head-based sampling][4]** (Muestreo basado en la fase inicial): Cuando no se establecen reglas para el muestreo de un servicio, el Datadog Agent calcula automáticamente las frecuencias de muestreo que se aplicarán a tus servicioscon un objetivo de **10 trazas por segundo por Agent**. Cambia este número de destino de trazas en Datadog o configura `DD_APM_MAX_TPS` localmente en el nivel del Agent.
-  **[Muestreo de tramos (spans) de error][5]**: Para las trazas no capturadas por el muestreo basado en la fase inicial, el Datadog Agent captura trazas de error locales **hasta 10 trazas por segundo por Agent**. Cambia este número de destino de trazas en Datadog o configura `DD_APM_ERROR_TPS` localmente en el nivel del Agent.
-  **[Muestreo de tramos poco frecuentes][6]**: Para las trazas no capturadas por el muestreo basado en la fase inicial, el Datadog Agent captura trazas poco frecuentes locales **hasta 5 trazas por segundo por Agent**. Esta opción está desactivada por defecto. Habilita la recopilación de trazas poco frecuentes en Datadog o configura `DD_APM_ENABLE_RARE_SAMPLER` localmente en el nivel del Agent.

Con la configuración remota, no es necesario reiniciar el Agent para actualizar estos parámetros. Haz clic en `Apply` para guardar los cambios de configuración y la nueva configuración entrará en vigencia inmediatamente.

**Nota**: La sección `Other Ingestion Reasons` (gris) del gráfico circular representa otros motivos de consumo que _no son configurables_ en el nivel del Datadog Agent.

**Nota**: Los parámetros configurados en forma remota tienen prioridad sobre las configuraciones locales como las variables de entorno y la configuración de `datadog.yaml`.

## Administrar el consumo para cada servicio en el nivel de la librería

La tabla de servicios contiene información sobre los volúmenes consumidos y la configuración del consumo, desglosada por servicio:

Tipo
: El tipo de servicio: servicio web, base de datos, caché, navegador, etc...

Nombre
: El nombre de cada servicio que envía trazas a Datadog. La tabla contiene servicios raíz y no raíz para los que se consumieron datos en la última hora.

Trazas/s consumidas
: Número promedio de trazas por segundo consumidas partiendo del servicio durante la última hora.

Bytes/s consumidos
: Número promedio de bytes por segundo consumidos en Datadog para el servicio durante la última hora.

Bytes/s downstream
: Número promedio de bytes por segundo consumidos para los cuales el servicio *toma la decisión de muestreo*. Esto incluye los bytes de todos los tramos secundarios que siguen la decisión tomada en el encabezado de la traza, así como los tramos capturados por el [Muestreador de errores][5], el [Muestreador de poco frecuentes][6] y el mecanismo de [App Analytics][7].

Desglose del tráfico
: Un desglose detallado del tráfico muestreado y no muestreado para trazas partiendo del servicio. Consulta [Desglose del tráfico](#traffic-breakdown) para obtener más información.

Configuración del consumo
: Muestra `Automatic` si se aplica el [mecanismo de muestreo basado en la fase inicial por defecto][4] del Agent. Si el consumo se configuró en las bibliotecas de rastreo con las [reglas de muestreo de trazas][8], el servicio se marca como `Configured`. Para más información sobre la configuración del consumo para un servicio, lee [cambiar la velocidad de consumo por defecto](#configure-the-service-ingestion-rate).

Infraestructura
: Hosts, contenedores y funciones en los cuales se ejecuta el servicio.

Estado del servicio
: Muestra `Limited Resource` cuando se descartan algunos tramos debido a que el Datadog Agent alcanza los límites de la CPU o de la RAM configurados [en su configuración][9], `Legacy Setup` cuando algunos tramos se consumen a través del [mecanismo de App Analytics][7] legacy o `OK` de otro modo.

Filtra la página por el entorno, la configuración y el estado para ver los servicios para los cuales necesitas tomar una decisión. Para reducir el volumen del consumo global, ordena la tabla por la columna `Downstream Bytes/s` para ver los servicios responsables de la mayor parte de tu consumo.

**Nota**: La tabla tiene la tecnología de las [métricas de uso][10] `datadog.estimated_usage.apm.ingested_spans` y `datadog.estimated_usage.apm.ingested_bytes`. Estas métricas están etiquetadas por `service`, `env` y `ingestion_reason`.

### Desglose del tráfico

En la columna Desglose del tráfico se desglosa el destino de todas las trazas procedentes del servicio. Te ofrece una estimación de la proporción del tráfico que se consume y se descarta y por qué motivos.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Desglose del tráfico del consumo de trazas" >}}

El desglose se compone de las siguientes partes:

- **Trazas completas consumidas** (azul): El porcentaje de las trazas consumidas por Datadog.
- **Trazas completas no retenidas** (gris): El porcentaje de las trazas que intencionalmente no se han reenviado a Datadog desde el Agent o la librería de rastreo. Esto puede ocurrir por uno de los siguientes dos motivos en función de tu configuración:

    1. Por defecto, el [Agent distribuye una velocidad de consumo][4] a los servicios en función del tráfico del servicio.
    2. Cuando el servicio se [configura][8] manualmente para consumir un determinado porcentaje de trazas en el nivel de la librería de rastreo.

- **Trazas completas descartadas por el limitador de la velocidad del rastreador** (naranja): Cuando eliges configurar manualmente la velocidad de consumo del servicio como un porcentaje con reglas para el muestreo de trazas, se habilita automáticamente un limitador de la velocidad, configurado por defecto para 100 trazas por segundo. Consulta la documentación del [limitador de la velocidad][8] para configurar manualmente esta velocidad.

- **Trazas descartadas debido al límite de la CPU o la RAM del Agent** (rojo): Con este mecanismo se pueden descartar tramos y crear trazas incompletas. Para solucionarlo, aumenta la asignación de la CPU y la memoria para la infraestructura en la cual se ejecuta el Agent.

## Resumen del consumo del servicio

Haz clic en cualquier fila de servicio para ver el Resumen del consumo del servicio, una vista detallada que ofrece información que requiere acción sobre la configuración del consumo del servicio.

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_summary.png" style="width:100%;" alt="Resumen del consumo del servicio" >}}

Explora el **Desglose de motivos del consumo** para ver qué mecanismos son responsables del consumo de tu servicio. Cada motivo del consumo está relacionado con un [mecanismo de consumo][11] específico. Después de cambiar tu configuración del consumo del servicio, puedes observar el aumento o la disminución de los bytes y tramos consumidos en esta gráfica de series temporales basado en los datos consumidos en la última hora.

Si la mayor parte de tu volumen de consumo del servicio se debe a decisiones tomadas por servicios upstream, investiga el detalle de la lista principal de los **Tomadores de decisiones de muestreo**. Por ejemplo, si tu servicio es no raíz, (lo que significa que **nunca decide** muestrear trazas), observa todos los servicios upstream responsables de tu consumo del servicio no raíz. Configura los servicios raíz upstream para reducir tu volumen total de consumo.

Para investigar más a fondo, utiliza [APM Trace - Dashboard de uso estimado][12], que ofrece información sobre el consumo global, así como gráficas de desglose por `service`, `env` y `ingestion reason`.

### Versiones del Agent y de las bibliotecas de rastreo

Consulta las versiones del **Datadog Agent y de las bibliotecas de rastreo** que utiliza tu servicio. Compara las versiones en uso con las últimas versiones publicadas para asegurarte de estar ejecutando Agents y bibliotecas actualizadas.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versiones del Agent y de las bibliotecas de rastreo" >}}

**Nota**: Es necesario actualizar el Agent a la v6.34 o la v7.34 para que se informe la información de la versión.

### Configurar la velocidad de consumo del servicio

<div class="alert alert-info">Las<strong>reglas de muestreo configuradas remotamente están en Beta</strong>. Solicita acceso a la función a través de este <a href="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/">vínculo</a> para poder configurar dinámicamente esta configuración desde la interfaz de usuario de Datadog sin tener que volver a desplegar tu servicio. Sigue las instrucciones de la <a href="/tracing/guide/resource_based_sampling">Guía de muestreo en función de los recursos</a> para empezar.</div>

Haz clic en **Administrar la velocidad de consumo** para obtener instrucciones sobre cómo configurar tu velocidad de consumo del servicio.

servicio{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_rate_config.png" style="width:100%;" alt="Cambiar la velocidad de consumo del servicio" >}}

Para especificar que se envíe un porcentaje específico del tráfico de un servicio, añade una variable de entorno o un fragmento de código generado a tu configuración de la librería de rastreo para ese servicio.

1. Selecciona el servicio para el cual deseas cambiar el porcentaje de tramos consumidos.
2. Selecciona el lenguaje del servicio.
3. Selecciona el porcentaje de consumo deseado.
4. Aplica la configuración apropiada generada a partir de estas elecciones al servicio indicado y vuelve a desplegar el servicio. **Nota**: El valor del nombre del servicio distingue entre mayúsculas y minúsculas. Debe coincidir con las mayúsculas y minúsculas de tu nombre del servicio.
5. Confirma en la Página de control del consumo que se haya aplicado tu nuevo porcentaje mirando la columna de Desglose del tráfico, en la cual se muestra la frecuencia de muestreo aplicada. El motivo del consumo del servicio aparece como `ingestion_reason:rule`.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler
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
[14]: /es/agent/remote_config/#enabling-remote-configuration

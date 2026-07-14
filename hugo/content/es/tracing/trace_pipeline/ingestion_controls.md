---
aliases:
- /es/tracing/trace_ingestion/control_page
- /es/tracing/trace_ingestion/ingestion_control_page
- /es/account_management/billing/usage_control_apm/
- /es/tracing/app_analytics/
- /es/tracing/guide/ingestion_control_page/
- /es/tracing/trace_ingestion/ingestion_controls
description: Aprende a controlar las tasas de ingestión con APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentación
  text: Mecanismos de Ingestión
- link: /tracing/trace_pipeline/metrics/
  tag: Documentación
  text: Métricas de Uso
title: Controles de Ingestión
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas de Muestreo de Ingestión" >}}

Los controles de ingestión afectan qué trazas son enviadas por tus aplicaciones a Datadog. Las [Métricas de APM][1] siempre se calculan en función de todas las trazas y no se ven afectadas por los controles de ingestión.

La página de Ingestion Control proporciona visibilidad sobre la configuración de ingestión de tus aplicaciones y servicios. Desde la [página de Ingestion Control][2]:

- Obtén visibilidad sobre la configuración de ingestión a nivel de servicio.
- Ajusta las tasas de muestreo de trazas para servicios o puntos finales de alto rendimiento para gestionar mejor el presupuesto de ingestión.
- Ajusta las tasas de muestreo de trazas para servicios o puntos finales de bajo rendimiento y tráfico raro para aumentar la visibilidad.
- Entiende cuáles [mecanismos de ingestión][11] son responsables de muestrear la mayoría de tus trazas.
- Investiga y actúa sobre posibles problemas de configuración de ingestión, como recursos limitados de CPU o RAM para el Agente.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Descripción General de la Página de Control de Ingestión" >}}

## Entendiendo tu configuración de ingestión {#understanding-your-ingestion-configuration}

Utiliza los datos en el encabezado de control de ingestión para monitorear tu ingestión de trazas. El encabezado muestra la cantidad total de datos ingeridos en la última hora, tu uso mensual estimado y el porcentaje de tu límite mensual de ingestión asignado, calculado en función de tu infraestructura activa de APM (como hosts, tareas de Fargate y funciones sin servidor).

Si el uso mensual está por debajo de `100%`, los datos ingeridos proyectados se ajustan dentro de tu asignación mensual. Un valor de uso mensual superior a `100%` significa que se proyecta que los datos ingeridos mensualmente superen su asignación mensual.

### Niveles de ingestión por servicio {#ingestion-levels-by-service}

La tabla de servicios contiene información sobre los volúmenes ingeridos y la configuración de ingestión, desglosada por servicio:

Tipo
: El tipo de servicio: servicio web, base de datos, caché, navegador, etc...

Nombre
: El nombre de cada servicio que envía trazas a Datadog. La tabla contiene servicios raíz y no raíz para los cuales se ingirió datos en la última hora.

Trazas ingeridas/s
: Número promedio de trazas por segundo ingeridas desde el servicio en la última hora.

Bytes ingeridos/s
: Número promedio de bytes por segundo ingeridos para el servicio en la última hora.

Bytes descendentes/s
: Número promedio de bytes por segundo ingeridos para los cuales el servicio _toma la decisión de muestreo_. Esto incluye los bytes de todos los spans de servicios descendentes en la pila de llamadas que siguen la decisión tomada al inicio de la traza. Los datos de esta columna se basan en la dimensión `sampling_service`, establecida en las métricas `datadog.estimated_usage.apm.ingested_bytes`. Para más información, lea [métricas de uso de APM][15].

Desglose del tráfico
: Un desglose detallado del tráfico muestreado y no muestreado para trazas que comienzan desde el servicio. Vea [Desglose del tráfico](#traffic-breakdown) para más información.

Configuración de Ingesta
: Muestra `Automatic` si el [mecanismo de muestreo basado en el encabezado por defecto][4] del Datadog Agent se aplica. Si la ingesta fue configurada con [reglas de muestreo de trazas][8], el servicio se marca como `Configured`; se establece una etiqueta `Local` cuando la regla de muestreo se aplica desde la configuración en el SDK, y se establece una etiqueta `Remote` cuando la regla de muestreo se aplica de forma remota, desde la interfaz de usuario. Para más información sobre cómo configurar la ingesta para un servicio, lee sobre [cambiar la tasa de ingesta por defecto](#configure-the-service-ingestion-rate).

Infraestructura
: Hosts, contenedores y funciones en los que se está ejecutando el servicio.

Estado del servicio
: Muestra `Limited Resource` cuando algunos spans son descartados debido a que el Datadog Agent alcanza los límites de CPU o RAM establecidos [en su configuración][9], `Legacy Setup` cuando algunos spans son ingeridos a través del antiguo [mecanismo de App Analytics][7], o `OK` de otra manera.

Filtra la página por entorno, configuración y estado para ver los servicios para los cuales necesitas tomar una acción. Para reducir el volumen global de ingesta, ordena la tabla por la `Downstream Bytes/s` columna para ver los servicios responsables de la mayor parte de tu ingesta.

**Nota**: La tabla está alimentada por las [métricas de uso][10] `datadog.estimated_usage.apm.ingested_spans` y `datadog.estimated_usage.apm.ingested_bytes`. Estas métricas están etiquetadas por `service`, `env` y `ingestion_reason`.

#### Desglose de tráfico {#traffic-breakdown}

La columna de Desglose de Tráfico desglosa el destino de todas las trazas que comienzan desde el servicio. Te da una estimación de la parte del tráfico que es ingerido y descartado, y por qué razones.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Desglose de tráfico de la ingesta de trazas" >}}

El desglose se compone de las siguientes partes:

- **Trazas completas ingeridas** (azul): El porcentaje de trazas que han sido ingeridas por Datadog.
- **Trazas completas no retenidas** (gris): El porcentaje de trazas que no han sido ingeridas por Datadog. Algunas trazas pueden ser descartadas porque: 

    1. Por defecto, el [Agente establece automáticamente una tasa de muestreo][4] en los servicios, dependiendo del tráfico del servicio.
    2. El servicio está configurado para ingerir un cierto porcentaje de trazas utilizando [reglas de muestreo][8].

- **Trazas completas descartadas por el limitador de tasa del SDK** (naranja): Cuando eliges establecer manualmente la tasa de ingesta del servicio como un porcentaje con reglas de muestreo de trazas, un limitador de tasa se habilita automáticamente, configurado por defecto a 100 trazas por segundo. Consulta la documentación del [limitador de tasa][8] para cambiar esta tasa.

- **Trazas descartadas debido al límite de CPU o RAM del Agente** (rojo): Este mecanismo puede descartar tramos y crear trazas incompletas. Para solucionar esto, aumenta la asignación de CPU y memoria para la infraestructura en la que se ejecuta el Agente.

## Configurando la ingestión para un servicio {#configuring-ingestion-for-a-service}

Haz clic en cualquier servicio para ver el Resumen de Ingestión del Servicio, que proporciona información útil y opciones de configuración para gestionar la ingestión de trazas de ese servicio.

### Configuración de ingestión para un servicio {#ingestion-configuration-for-a-service}

#### Tasas de muestreo por recurso {#sampling-rates-by-resource}

La tabla lista las tasas de muestreo aplicadas por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de tasas de muestreo por recurso" style="width:100%;">}}

- La columna `Ingested bytes` muestra los bytes ingeridos de los tramos del servicio y recurso, mientras que la columna `Downstream bytes` muestra los bytes ingeridos de los tramos donde se toma la decisión de muestreo comenzando desde ese servicio y recurso, incluyendo bytes de servicios descendentes en la cadena de llamadas.
- La columna `Configuration` muestra de dónde se está aplicando la tasa de muestreo del recurso: 
  - `Automatic` si se aplica el [mecanismo de muestreo basado en cabeza por defecto][4] del Agente.
  - `Local Configured` si se estableció una [regla de muestreo][8] localmente en el SDK.
  - `Remote Configured` si se estableció una regla de muestreo remota desde la interfaz de usuario de Datadog. Para aprender a configurar reglas de muestreo desde la página de Control de Ingestión, lee la sección sobre [configuración remota de reglas de muestreo](#configure-the-service-ingestion-rates-by-resource).

**Nota**: Si el servicio no está tomando decisiones de muestreo, los recursos del servicio se colapsarán bajo la fila `Resources not making sampling decisions`.

**Nota**: En intervalos de tiempo cortos (1-4 horas), la Tasa de Muestreo Efectiva puede mostrar menos del 100% incluso cuando está configurada al 100%. Este es un comportamiento esperado debido a cálculos estadísticos que necesitan más puntos de datos para converger. Todos los rastros aún se están capturando correctamente. Para la visualización más precisa, observe las tasas de muestreo durante períodos de tiempo más largos.

#### Razones de ingestión y tomadores de decisiones de muestreo {#ingestion-reasons-and-sampling-decision-makers}

Explore el **desglose de razones de ingestión** para ver qué mecanismos son responsables de la ingestión de su servicio. Cada razón de ingestión se relaciona con un mecanismo de ingestión específico [mecanismo de ingestión][11]. Después de cambiar la configuración de ingestión de su servicio, puede observar el aumento o disminución de bytes y tramos ingeridos en este gráfico de series temporales basado en la última hora de datos ingeridos.

Si la mayor parte del volumen de ingestión de su servicio se debe a decisiones tomadas por servicios ascendentes, investigue el detalle de la lista de los **tomadores de decisiones de muestreo**. Por ejemplo, si su servicio no es raíz (es decir, que **nunca decide** muestrear trazas), observe todos los servicios ascendentes responsables de la ingestión de ese servicio. Configure los servicios raíz ascendentes para reducir su volumen total de ingestión.

Para investigaciones adicionales, utilice el [tablero de Uso Estimado de APM traza][12], que proporciona información global de ingestión así como gráficos de desglose por `service`, `env` y `ingestion reason`.

#### Versiones de Datadog Agent y SDK {#agent-and-sdk-versions}

Vea las **versiones de Datadog Agent y SDK** que su servicio está utilizando. Compare las versiones en uso con las versiones más recientes lanzadas para asegurarse de que está utilizando Datadog Agents y bibliotecas recientes y actualizadas.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versiones de Agente y SDK" >}}

### Gestionando las tasas de muestreo de los servicios {#managing-services-sampling-rates}

Para controlar las tasas de muestreo de un servicio, puede que desee utilizar:
- **Muestreo adaptativo**: Ajustar automáticamente las tasas de muestreo para coincidir con un presupuesto de volumen de ingestión mensual configurado.
- **Muestreo basado en recursos**: Establecer manualmente tasas de muestreo explícitas por recurso.

Las configuraciones para estas estrategias se pueden aplicar **Remotamente** a través de la interfaz de usuario de Datadog. Este método permite que los cambios surtan efecto de inmediato sin necesidad de volver a implementar su servicio. Para **Muestreo basado en recursos**, también tiene la opción de aplicar configuraciones **localmente** actualizando los archivos de configuración de su servicio y volviendo a implementar.

El uso de **Configuración Remota** para las tasas de ingestión del servicio tiene requisitos específicos.

{{% collapse-content title="Requisitos de Configuración Remota" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] o superior.
- [Configuración Remota][3] habilitada para su Datadog Agent.
- `APM Remote Configuration Write` [permisos][20]. Si no tiene estos permisos, pida a su administrador de Datadog que actualice sus permisos desde la configuración de su organización.

Encuentre a continuación la versión mínima del SDK requerida para la función:

| Idioma | Versión mínima requerida |
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

#### Muestreo adaptativo {#adaptive-sampling}

Utiliza el muestreo adaptativo para permitir que Datadog gestione las tasas de muestreo de los servicios en tu nombre. Especifica un volumen de ingestión mensual objetivo para uno o varios servicios mientras mantienes visibilidad sobre todos los servicios y puntos de conexión.

Para configurar el muestreo adaptativo:

1. Navega a la página de [Ingestion Control][2].
2. Haz clic en un servicio para ver el **Resumen de Ingestión del Servicio**.
3. Haz clic en **Gestionar Tasa de Ingestión**.
4. Elige **tasas de muestreo adaptativo de Datadog** como la estrategia de muestreo de tu servicio.
5. Haz clic en **Aplicar**.

<div class="alert alert-info">Si aplicar esta configuración <strong>Remotamente</strong> está deshabilitado, asegúrate de que se cumplan los <a href="#remote-configuration-requirements">requisitos de Configuración Remota</a>.</div>

Para más información, consulta [Muestreo Adaptativo][17].


#### Muestreo basado en recursos {#resource-based-sampling}

Para configurar tasas de muestreo personalizadas para el servicio por nombre de recurso: 
1. Navega a la página de [Ingestion Control][2].
2. Haz clic en un servicio para ver el **Resumen de Ingestión del Servicio**.
3. Haz clic en **Gestionar tasa de ingestión**.
4. Haz clic en **Solo tasas de muestreo personalizadas**.
5. Haz clic en **Agregar nueva regla** para establecer tasas de muestreo para algunos recursos.  
   **Nota**: Las reglas de muestreo utilizan coincidencia de patrones globos, por lo que puedes usar comodines (`*`) para coincidir con múltiples recursos al mismo tiempo.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="Modal de Configuración" style="width:100%;">}}
6. Aplica la configuración **Remotamente** o **Localmente**:
{{< tabs >}}
{{% tab "Remotamente" %}}

Esta opción aplica la configuración utilizando Configuración Remota, por lo que **no necesitas** volver a implementar el servicio para que el cambio surta efecto. Puedes observar los cambios de configuración desde el [Explorador de Búsqueda en Vivo][100].

Haz clic en **Aplicar** para guardar la configuración. 

Los recursos que han sido configurados de forma remota se muestran como `Configured Remote` en la columna de **Configuración**.  

<br><div class="alert alert-info">Si aplicar esta configuración <strong>Remotamente</strong> está deshabilitado, asegúrate de que se cumplan los <a href="#remote-configuration-requirements">requisitos de Configuración Remota</a>.</div>

[100]: /es/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Localmente" %}}

Esta opción genera configuración para que la apliques manualmente.
1. Aplica la configuración generada a tu servicio.  
   **Nota**: El valor del nombre del servicio es sensible a mayúsculas y minúsculas. Debería coincidir con el caso de tu nombre de servicio.
1. Vuelve a implementar el servicio.
1. Confirma que el nuevo porcentaje ha sido aplicado revisando la columna de **Desglose de Tráfico**. Los recursos que han sido configurados localmente se muestran como `Configured Local` en la columna de **Configuración**.

{{% /tab %}}
{{< /tabs >}}

## Gestionando la configuración de ingesta del Agente de Datadog {#managing-datadog-agent-ingestion-configuration}

Haz clic en **Configurar la Ingesta del Agente de Datadog** para gestionar las tasas de muestreo basadas en encabezados por defecto, muestreo de errores y muestreo raro.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Modal de Configuración a Nivel de Agente" >}}

- **[Muestreo basado en encabezado][4]**: Cuando no se establecen reglas de muestreo para un servicio, el Agente de Datadog calcula automáticamente las tasas de muestreo que se aplicarán a tus servicios, apuntando a **10 trazas por segundo por Agente**. Cambia este número objetivo de trazas en Datadog, o configúralo `DD_APM_TARGET_TPS` localmente a nivel de Agente.
- **[Muestreo de errores en trazas][5]**: Para las trazas que no son capturadas por el muestreo basado en encabezado, el Agente de Datadog captura trazas de errores locales **hasta 10 trazas por segundo por Agente**. Cambia este número objetivo de trazas en Datadog, o establece `DD_APM_ERROR_TPS` localmente a nivel del Agente.
- **[Muestreo de trazas raras][6]**: Para trazas que no son capturadas por el muestreo basado en encabezado, el Agente de Datadog captura trazas raras locales **hasta 5 trazas por segundo por Agente**. Esta configuración está deshabilitada por defecto. Habilita la recolección de trazas raras en Datadog, o establece `DD_APM_ENABLE_RARE_SAMPLER` localmente a nivel del Agente.

Con la configuración remota, no es necesario reiniciar el Agente para actualizar estos parámetros. Haz clic en `Apply` para guardar los cambios de configuración, y la nueva configuración entra en efecto de inmediato. La configuración remota para los parámetros de muestreo del Agente está disponible si estás utilizando la versión del Agente [7.42.0][13] o superior.

**Nota**: La sección `Other Ingestion Reasons` (gris) del gráfico circular representa otras razones de ingestión que _no son configurables_ a nivel del Agente de Datadog. 

**Nota**: Los parámetros configurados de forma remota tienen prioridad sobre las configuraciones locales, como las variables de entorno y `datadog.yaml` la configuración.

## Prioridad de las reglas de muestreo {#sampling-rules-precedence}

Si se establecen reglas de muestreo en múltiples ubicaciones, se aplican las siguientes reglas de prioridad en orden, donde las reglas que aparecen primero en la lista pueden anular las reglas de menor prioridad:

1. Reglas de muestreo configuradas de forma remota, establecidas a través de [muestreo basado en recursos](#configure-the-service-ingestion-rates-by-resource)
1. [Reglas de muestreo adaptativo][17]
1. [Reglas de muestreo configuradas localmente][8] (`DD_TRACE_SAMPLING_RULES`)
1. [Tasa de muestreo global configurada de forma remota][8]
1. [Tasa de muestreo global configurada localmente][8] (`DD_TRACE_SAMPLE_RATE`)
1. [Tasas del agente de traza controladas indirectamente con configuraciones del Agent](#managing-datadog-agent-ingestion-configuration) de forma remota o local (`DD_APM_TARGET_TPS`)

Dicho de otra manera, Datadog utiliza las siguientes reglas de precedencia:
- Configuraciones del trazador > Configuraciones del Agent
- Reglas de muestreo > Tasa de muestreo global
- Remoto > Local

## Lectura adicional {#further-reading}

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
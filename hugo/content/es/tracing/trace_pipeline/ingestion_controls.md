---
aliases:
- /es/tracing/trace_ingestion/control_page
- /es/tracing/trace_ingestion/ingestion_control_page
- /es/account_management/billing/usage_control_apm/
- /es/tracing/app_analytics/
- /es/tracing/guide/ingestion_control_page/
- /es/tracing/trace_ingestion/ingestion_controls
description: Aprenda a controlar las tasas de ingesta con APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentación
  text: Mecanismos de ingesta
- link: /tracing/trace_pipeline/metrics/
  tag: Documentación
  text: Métricas de uso
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominando el rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente.'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Centro de arquitectura
  text: 'Optimización del rastreo distribuido: mejores prácticas para mantenerse dentro
    del presupuesto y capturar trazas críticas'
title: Controles de ingesta
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas de muestreo de ingesta" >}}

Los controles de ingesta afectan qué trazas envían sus aplicaciones a Datadog. Las [métricas de APM][1] siempre se calculan en función de todas las trazas y no se ven afectadas por los controles de ingesta.

La página de Ingestion Control proporciona visibilidad sobre la configuración de ingesta de sus aplicaciones y servicios. Desde la [página de Ingestion Control][2]:

- Obtenga visibilidad sobre la configuración de ingesta a nivel de servicio.
- Ajuste las tasas de muestreo de trazas para servicios o endpoints de alto rendimiento para gestionar mejor el presupuesto de ingesta.
- Ajuste las tasas de muestreo de trazas para servicios o endpoints de bajo rendimiento y tráfico poco frecuente para aumentar la visibilidad.
- Comprenda qué [mecanismos de ingesta][11] son responsables del muestreo de la mayoría de sus trazas.
- Investigue y actúe sobre posibles problemas de configuración de ingesta, como recursos limitados de CPU o RAM para el Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Descripción general de la página de Ingestion Control" >}}

## Comprender su configuración de ingesta {#understanding-your-ingestion-configuration}

Utilice los datos en el encabezado de control de ingesta para hacer un seguimiento de la ingesta de sus trazas. El encabezado muestra la cantidad total de datos ingeridos durante la última hora, su uso mensual estimado y el porcentaje de su límite de ingesta mensual asignado, calculado en función de su infraestructura de APM activa (como hosts, tareas de Fargate y funciones serverless).

Si el uso mensual es inferior a `100%`, los datos ingeridos proyectados se ajustan a su asignación mensual. Un valor de uso mensual superior a `100%` significa que se proyecta que los datos ingeridos mensuales superen su asignación mensual.

### Niveles de ingestión por servicio{#ingestion-levels-by-service}

La tabla de servicios contiene información sobre los volúmenes ingeridos y la configuración de ingestión, desglosada por servicio:

Tipo
: El tipo de servicio: servicio web, base de datos, caché, navegador, etc...

Nombre
: El nombre de cada servicio que envía trazas a Datadog. La tabla contiene servicios raíz y no raíz para los cuales se ingirieron datos en la última hora.

Trazas ingeridas/s
: Número promedio de trazas por segundo ingeridas que comienzan desde el servicio durante la última hora.

Bytes ingeridos/s
: Número promedio de bytes por segundo ingeridos para el servicio durante la última hora.

Bytes descendentes/s
: Número promedio de bytes por segundo ingeridos para los cuales el servicio _toma la decisión de muestreo_. Esto incluye los bytes de todos los spans de los servicios descendentes en la pila de llamadas que siguen la decisión tomada al inicio de la traza. Los datos de esta columna se basan en la dimensión `sampling_service`, establecida en las métricas `datadog.estimated_usage.apm.ingested_bytes`. Para obtener más información, lea [APM usage metrics][15].

Desglose del tráfico
: Un desglose detallado del tráfico muestreado y no muestreado para las trazas que comienzan desde el servicio. Consulte [Desglose de tráfico](#traffic-breakdown) para obtener más información.

Configuración de ingesta
: Muestra `Automatic` si se aplica el [mecanismo de muestreo basado en cabeceras predeterminado][4] del Agent. Si la ingesta se configuró con [reglas de muestreo de trazas][8], el servicio se marca como `Configured`; se establece una etiqueta `Local` cuando la regla de muestreo se aplica desde la configuración en el SDK, y se establece una etiqueta `Remote` cuando la regla de muestreo se aplica de forma remota, desde la interfaz de usuario. Para obtener más información sobre cómo configurar la ingesta para un servicio, lea sobre cómo [cambiar la tasa de ingesta predeterminada](#configure-the-service-ingestion-rate).

Infraestructura
: Hosts, contenedores y funciones en los que se ejecuta el servicio.

Estado del servicio
: Muestra `Limited Resource` cuando algunos spans se descartan debido a que el Datadog Agent alcanza los límites de CPU o RAM establecidos [en su configuración][9], `Legacy Setup` cuando algunos spans se ingieren a través del [mecanismo de App Analytics][7] heredado, o `OK` de lo contrario.

Filtre la página por entorno, configuración y estado para ver los servicios sobre los cuales necesita tomar una acción. Para reducir el volumen de ingesta global, ordene la tabla por la columna `Downstream Bytes/s` para ver los servicios responsables de la mayor parte de su ingesta.

**Nota**: La tabla funciona con las [métricas de uso][10] `datadog.estimated_usage.apm.ingested_spans` y `datadog.estimated_usage.apm.ingested_bytes`. Estas métricas están etiquetadas por `service`, `env` y `ingestion_reason`.

#### Desglose de tráfico {#traffic-breakdown}

La columna Desglose de tráfico desglosa el destino de todas las trazas que comienzan desde el servicio. Le brinda una estimación de la proporción de tráfico que se ingiere y se descarta, y por qué razones.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Desglose de tráfico de la ingesta de trazas" >}}

El desglose se compone de las siguientes partes:

- {{< ui >}}Complete traces ingested{{< /ui >}} (azul): El porcentaje de trazas que han sido ingeridas por Datadog.
- {{< ui >}}Complete traces not retained{{< /ui >}} (gris): El porcentaje de trazas que no han sido ingeridas por Datadog. Es posible que algunas trazas se descarten debido a: 

    1. De forma predeterminada, el [Agent establece automáticamente una tasa de muestreo][4] en los servicios, dependiendo del tráfico del servicio.
    2. El servicio está configurado para ingerir un cierto porcentaje de trazas utilizando [reglas de muestreo de trazas][8].

- {{< ui >}}Complete traces dropped by the SDK rate limiter{{< /ui >}} (naranja): Cuando elige establecer manualmente la tasa de ingesta del servicio como un porcentaje con reglas de muestreo de trazas, se habilita automáticamente un limitador de tasa, configurado en 100 trazas por segundo de forma predeterminada. Consulte la documentación del [limitador de tasa][8] para cambiar esta tasa.

- {{< ui >}}Traces dropped due to the Agent CPU or RAM limit{{< /ui >}} (rojo): Este mecanismo puede descartar spans y crear trazas incompletas. Para solucionar esto, aumente la asignación de CPU y memoria para la infraestructura en la que se ejecuta el Agent.

## Configuración de la ingesta para un servicio {#configuring-ingestion-for-a-service}

Haga clic en cualquier servicio para ver el Resumen de ingesta del servicio, el cual proporciona información útil y opciones de configuración para administrar la ingesta de trazas de ese servicio.

### Configuración de ingesta para un servicio {#ingestion-configuration-for-a-service}

#### Tasas de muestreo por recurso {#sampling-rates-by-resource}

La tabla enumera las tasas de muestreo aplicadas por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de tasas de muestreo por recurso" style="width:100%;">}}

- La columna `Ingested bytes` muestra los bytes ingeridos de los spans del servicio y recurso, mientras que la columna `Downstream bytes` muestra los bytes ingeridos de los spans donde la decisión de muestreo se toma a partir de ese servicio y recurso, incluyendo los bytes de los servicios descendentes en la cadena de llamadas.
- La columna `Configuration` muestra desde dónde se aplica la tasa de muestreo del recurso: 
  - `Automatic` si se aplica el [mecanismo de muestreo basado en el inicio predeterminado][4] del Agent.
  - `Local Configured` si se estableció una [regla de muestreo de trazas][8] localmente en el SDK.
  - `Remote Configured` si se estableció una regla de muestreo de trazas remota desde la interfaz de usuario de Datadog. Para aprender a configurar reglas de muestreo de trazas desde la página de Ingestion Control, lea la sección sobre [configuración remota de reglas de muestreo de trazas](#configure-the-service-ingestion-rates-by-resource).

**Nota**: Si el servicio no toma decisiones de muestreo, los recursos del servicio se agruparán bajo la fila `Resources not making sampling decisions`.

**Nota**: En marcos de tiempo cortos (1-4 horas), la tasa de muestreo efectiva puede mostrarse por debajo del 100% incluso cuando está configurada al 100%. Este es el comportamiento esperado debido a los cálculos estadísticos que necesitan más puntos de datos para converger. Todas las trazas se siguen capturando correctamente. Para obtener la visualización más precisa, vea las tasas de muestreo durante períodos de tiempo más largos.

####  Motivos de ingesta y responsables de las decisiones de muestreo {#ingestion-reasons-and-sampling-decision-makers}

Explore el {{< ui >}}Ingestion reasons breakdown{{< /ui >}} para ver qué mecanismos son responsables de la ingesta de su servicio. Cada motivo de ingesta se relaciona con un [mecanismo de ingesta][11] específico. Después de cambiar la configuración de ingesta de su servicio, puede observar el aumento o la disminución de los bytes y spans ingeridos en este gráfico de series temporales basado en la última hora de datos ingeridos.

Si la mayor parte del volumen de ingesta de su servicio se debe a decisiones tomadas por servicios ascendentes, investigue el detalle de la lista principal {{< ui >}}Sampling decision makers{{< /ui >}}. Por ejemplo, si su servicio no es raíz (lo que significa que **nunca decide** muestrear trazas), observe todos los servicios ascendentes responsables de la ingesta de su servicio no raíz. Configure los servicios raíz ascendentes para reducir su volumen general de ingesta.

Para investigaciones adicionales, utilice el [APM Trace - Estimated Usage Tableros][12], que proporciona información global de ingesta, así como gráficos de desglose por `service`, `env` y `ingestion reason`.

####  Versiones de Datadog Agent y del SDK {#agent-and-sdk-versions}

Consulte las {{< ui >}}Datadog Agent and SDK versions{{< /ui >}} que utiliza su servicio. Compare las versiones en uso con las últimas versiones lanzadas para asegurarse de que está ejecutando Datadog Agents y bibliotecas recientes y actualizadas.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versiones de Datadog Agent y del SDK" >}}

### Administración de las tasas de muestreo de los servicios {#managing-services-sampling-rates}

Para controlar las tasas de muestreo de un servicio, es posible que desee utilizar:
- {{< ui >}}Adaptive sampling{{< /ui >}}: Ajustar automáticamente las tasas de muestreo para que coincidan con un presupuesto de volumen de ingesta mensual configurado.
- {{< ui >}}Resource-based sampling{{< /ui >}}: Establecer manualmente tasas de muestreo explícitas por recurso.

Las configuraciones para estas estrategias se pueden aplicar {{< ui >}}Remotely{{< /ui >}} a través de la interfaz de usuario de Datadog. Este método permite que los cambios surtan efecto de inmediato sin necesidad de volver a implementar su servicio. Para {{< ui >}}Resource-based Sampling{{< /ui >}}, también tiene la opción de aplicar configuraciones **localmente** actualizando los archivos de configuración de su servicio y volviéndolo a implementar.

El uso de **Remote Configuration** para las tasas de ingesta de servicios tiene requisitos específicos.

{{% collapse-content title="Requisitos de Remote Configuration" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] o superior.
- [Remote Configuration][3] habilitada para su Datadog Agent.
- `APM Remote Configuration Write` [Permisos][20]. Si no tiene estos permisos, solicite a su administrador de Datadog que actualice sus permisos desde la configuración de su organización.

A continuación encontrará la versión mínima del SDK requerida para la función:

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

#### Muestreo adaptativo {#adaptive-sampling}

Utilice el muestreo adaptativo para permitir que Datadog gestione las tasas de muestreo de los servicios en su nombre. Especifique un volumen de ingesta mensual objetivo para uno o varios servicios mientras mantiene la visibilidad sobre todos los servicios y endpoints.

Para configurar el muestreo adaptativo:

1. Navegue a la página [Ingestion Control][2].
2. Haga clic en un servicio para visualizar el {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Haga clic en {{< ui >}}Manage Ingestion Rate{{< /ui >}}.
4. Elija {{< ui >}}Datadog adaptive sampling rates{{< /ui >}} como la estrategia de muestreo de su servicio.
5. Haga clic en {{< ui >}}Apply{{< /ui >}}.

<div class="alert alert-info">Si la aplicación de esta configuración <strong>de forma remota</strong> está deshabilitada, asegúrese de que se cumplan los <a href="#remote-configuration-requirements">Remote Configuration requirements</a>.</div>

Para obtener más información, consulte [Muestreo adaptativo][17].


#### Muestreo basado en recursos {#resource-based-sampling}

Para configurar tasas de muestreo personalizadas para el servicio por nombre de recurso: 
1. Navegue a la página [Ingestion Control][2].
2. Haga clic en un servicio para visualizar el {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Haga clic en {{< ui >}}Manage Ingestion rate{{< /ui >}}.
4. Haga clic en {{< ui >}}Custom sampling rates only{{< /ui >}}.
5. Haga clic en {{< ui >}}Add new rule{{< /ui >}} para establecer tasas de muestreo para algunos recursos.  
   **Nota**: Las reglas de muestreo utilizan coincidencia de patrones glob, por lo que puede usar comodines (`*`) para hacer coincidir varios recursos al mismo tiempo.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="Modal de configuración" style="width:100%;">}}
6. Aplique la configuración {{< ui >}}Remotely{{< /ui >}} o {{< ui >}}Locally{{< /ui >}}:
{{< tabs >}}
{{% tab "Remotamente" %}}

Esta opción aplica la configuración mediante Remote Configuration, por lo que **no necesita** volver a implementar el servicio para que el cambio surta efecto. Puede observar los cambios de configuración desde el [Live Search Explorer][100].

Haga clic en {{< ui >}}Apply{{< /ui >}} para guardar la configuración. 

Los recursos que se han configurado remotamente se muestran como `Configured Remote` en la columna {{< ui >}}Configuration{{< /ui >}}.  

<br><div class="alert alert-info">Si la aplicación de esta configuración <strong>Remotamente</strong> está deshabilitada, asegúrese de que se cumplan los <a href="#remote-configuration-requirements">Remote Configuration requirements</a>.</div>

[100]: /es/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Localmente" %}}

Esta opción genera la configuración para que la aplique manualmente.
1. Aplique la configuración generada a su servicio.  
   **Nota**: El valor del nombre del servicio distingue entre mayúsculas y minúsculas. Debe coincidir con las mayúsculas y minúsculas de su nombre de servicio.
1. Vuelva a implementar el servicio.
1. Confirme que se ha aplicado el nuevo porcentaje observando la columna {{< ui >}}Traffic Breakdown{{< /ui >}}. Los recursos que se han configurado localmente se muestran como `Configured Local` en la columna {{< ui >}}Configuration{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

## Administración de la configuración de Ingestion Control del Datadog Agent {#managing-datadog-agent-ingestion-configuration}

Haga clic en {{< ui >}}Configure Datadog Agent Ingestion{{< /ui >}} para administrar las tasas de muestreo basadas en encabezados predeterminadas, el muestreo de errores y el muestreo de casos poco frecuentes.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Modal de configuración a nivel de Agent" >}}

- [{{< ui >}}Head-based Sampling{{< /ui >}}][4]: Cuando no se establecen reglas de muestreo para un servicio, el Datadog Agent calcula automáticamente las tasas de muestreo que se aplicarán a sus servicios, con el objetivo de **10 trazas por segundo por Agent**. Cambie este número objetivo de trazas en Datadog, o establézcalo `DD_APM_TARGET_TPS` localmente a nivel de Agent.
- [{{< ui >}}Error Spans Sampling{{< /ui >}}][5]: Para las trazas que no captura el muestreo basado en encabezados, el Datadog Agent captura trazas de error locales **hasta 10 trazas por segundo por Agent**. Cambie este número objetivo de trazas en Datadog, o establézcalo `DD_APM_ERROR_TPS` localmente a nivel de Agent.
- [{{< ui >}}Rare Spans Sampling{{< /ui >}}][6]: Para las trazas que no captura el muestreo basado en encabezados, el Datadog Agent captura trazas raras locales **hasta 5 trazas por segundo por Agent**. Esta configuración está deshabilitada de forma predeterminada. Habilite la recopilación de trazas raras en Datadog, o establézcala `DD_APM_ENABLE_RARE_SAMPLER` localmente a nivel de Agent.

Con Remote Configuration, no tiene que reiniciar Agent para actualizar estos parámetros. Haga clic en `Apply` para guardar los cambios de configuración, y la nueva configuración entrará en vigor de inmediato. La Remote Configuration para los parámetros de muestreo de Agent está disponible si utiliza la versión de Agent [7.42.0][13] o superior.

**Nota**: La sección `Other Ingestion Reasons` (gris) del gráfico circular representa otros motivos de ingesta que _no se pueden configurar_ a nivel de Datadog Agent. 

**Nota**: Los parámetros configurados de forma remota tienen prioridad sobre las configuraciones locales, como las variables de entorno y la configuración `datadog.yaml`.

## Precedencia de las reglas de muestreo {#sampling-rules-precedence}

Si se establecen reglas de muestreo en varias ubicaciones, se aplican las siguientes reglas de precedencia en orden, donde las reglas que aparecen primero en la lista pueden anular las reglas de menor precedencia:

1. Reglas de muestreo configuradas de forma remota, establecidas a través del [muestreo basado en recursos](#configure-the-service-ingestion-rates-by-resource)
1. [Reglas de muestreo adaptativo][17]
1. [Reglas de muestreo configuradas localmente][8] (`DD_TRACE_SAMPLING_RULES`)
1. [Tasa de muestreo global configurada de forma remota][8]
1. [Tasa de muestreo global configurada localmente][8] (`DD_TRACE_SAMPLE_RATE`)
1. [Tasas de traza controladas indirectamente con la configuración de Agent](#managing-datadog-agent-ingestion-configuration) de forma remota o local (`DD_APM_TARGET_TPS`)

Dicho de otra manera, Datadog utiliza las siguientes reglas de precedencia:
- Configuración del trazador > Configuración del Agent
- Reglas de muestreo > Tasa de muestreo global
- Remoto > Local

## Lecturas adicionales {#further-reading}

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
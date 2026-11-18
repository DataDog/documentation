---
description: Utilice la página Metrics Overview para explorar sus fuentes de métricas,
  generar métricas a partir de productos de Datadog y habilitar funciones avanzadas
  de la plataforma.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Controle dinámicamente el volumen de métricas personalizadas con Metrics without
    Limits™
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para desbloquear todo el potencial de las métricas
- link: /metrics/units
  tag: Documentación
  text: Unidades de métricas
title: Página Metrics Overview
---
## Descripción general {#overview}

La página Metrics Overview proporciona a los usuarios de todos los niveles de experiencia una comprensión más profunda de su panorama de métricas. Proporciona orientación sobre cómo puede maximizar el valor de sus métricas de Datadog. 

Con la página Metrics Overview puede aprender a: 
- Explorar las fuentes de sus métricas
- Generar métricas adicionales a partir de productos de Datadog
- Habilitar capacidades avanzadas de la plataforma, como percentiles, Metrics without Limits™ e ingesta de métricas históricas

## Cómo fluyen sus métricas a través de Datadog {#how-your-metrics-flow-through-datadog}

{{< img src="metrics/overview/how_metrics_flow.png" alt="La sección sobre cómo fluyen sus métricas a través de Datadog en la página Metrics Overview" >}}

Esta sección muestra todas sus fuentes de métricas, el procesamiento y la configuración adicionales que se aplican a sus datos de métricas, y un desglose del volumen de métricas estándar y personalizadas.

**Nota**: la página Overview no está dedicada a gestionar los costos de las métricas. Consulte [Prácticas recomendadas para la gobernanza de Custom Metrics][25] para obtener más detalles sobre cómo optimizar los costos.

### Fuentes de métricas {#metric-sources}

La columna {{< ui >}}Metric Sources{{< /ui >}} muestra un resumen de las fuentes de métricas que reportan a Datadog. Haga clic en cualquiera de las fuentes para abrir [Metrics Catalog][2] con el alcance limitado a esa fuente. Sus métricas de Datadog pueden originarse de las siguientes fuentes:

{{% collapse-content title="Datadog Agent" level="h4" %}}
El [Datadog Agent][3] recopila métricas de los hosts donde está instalado y las reenvía a Datadog. Estas métricas podrían originarse de:

   - Cualquiera de las integraciones oficiales de Datadog que vienen incluidas con el Agent. Consulte el [repositorio integrations-core][4] para obtener una lista completa de las integraciones disponibles basadas en el Agent.
   - [DogStatsD][6], un servicio de agregación de métricas incluido con el Datadog Agent. DogStatsD implementa el protocolo [StatsD][7] con algunas extensiones específicas de Datadog.
   - [Verificaciones personalizadas][8], que se utilizan para recopilar métricas de aplicaciones personalizadas o sistemas únicos. Usted mismo define la lógica de la verificación en los archivos de configuración del Agent. Consulte [Cómo escribir una verificación personalizada del Agent][9] para obtener más información.
   - [Integraciones de Marketplace][10] instaladas en el Agent. El [Datadog Marketplace][11] es un mercado digital donde los socios tecnológicos pueden listar sus ofertas pagas para los usuarios de Datadog.

{{% /collapse-content %}}

{{% collapse-content title="Integraciones de nube" level="h4" %}}
También conocidas como integraciones basadas en autenticación, estas integraciones se configuran en Datadog. Usted proporciona las credenciales para obtener métricas y Datadog realiza llamadas a la API en su nombre para recopilarlas. Ejemplos comunes son las integraciones de proveedores de nube, Slack y PagerDuty. Consulte [Integraciones basadas en API][12] en la documentación para desarrolladores para obtener más información.
{{% /collapse-content %}} 

{{% collapse-content title="Datadog API" level="h4" %}}
Puede enviar métricas directamente a la [API de métricas][13].
{{% /collapse-content %}} 

En total, Datadog tiene más de {{< translate key="integration_count" >}} integraciones. Consulte [Integration Management][5] para obtener más información sobre cómo gestionar sus integraciones.

### Procesamiento configurable {#configurable-processing}

La columna {{< ui >}}Configurable Processing{{< /ui >}} enumera las diversas opciones de configuración avanzada que puede utilizar para aumentar el valor de sus métricas. Haga clic en cualquiera de las opciones para obtener más información y un enlace a la pantalla de configuración correspondiente.

{{% collapse-content title="Optimice sus costos de métricas personalizadas con Metrics without Limits™" level="h4" %}}
[Metrics without Limits™][19] le ayuda a gestionar los costos de las métricas personalizadas al indexar solo las etiquetas de métricas más valiosas para su organización. Su uso de Metrics without Limits™ se refleja en la sección superior de la página Overview como {{< ui >}}Selected Metrics{{< /ui >}}. Para obtener más información sobre cómo gestionar sus costos de métricas personalizadas, consulte [Prácticas recomendadas para la gobernanza de Custom Metrics][22].
{{% /collapse-content %}} 

{{% collapse-content title="Habilite percentiles en métricas de distribución" level="h4" %}}
Las [métricas de distribución][20] con percentiles habilitados le proporcionan percentiles globalmente precisos calculados en el servidor a partir de todos los hosts, para que pueda medir distribuciones estadísticas en toda su infraestructura distribuida.
{{% /collapse-content %}} 

{{% collapse-content title="Genere métricas a partir de otros productos de Datadog" level="h4" %}}
Algunos productos incorporan métricas estándar para ofrecer información lista para usar (por ejemplo, APM). 

##### Logs {#logs}

[Genere métricas personalizadas a partir de registros ingeridos][14] para resumir los datos de todos los registros ingeridos por Datadog. Esto le permite visualizar los datos de registro importantes para su entorno y alertar sobre ellos, incluso si los registros no están indexados para búsquedas a largo plazo.

##### APM {#apm}

[Genere métricas personalizadas a partir de sus spans ingeridos][15] para visualizar anomalías y tendencias en cualquier parámetro que sea importante para su contexto empresarial.

##### Real User Monitoring (RUM) {#real-user-monitoring-rum}

[Genere métricas personalizadas a partir de eventos de RUM][16] para resumir los datos de sus eventos de RUM, de modo que pueda visualizar los comportamientos de los usuarios que tienen mayor impacto en su organización y alertar sobre ellos.

##### Processes {#processes}

[Genere métricas personalizadas basadas en procesos][17] para monitorear el consumo de recursos de sus procesos, así como cualquier otro comportamiento relacionado con los procesos que pueda ser importante para sus necesidades comerciales.

##### Events {#events}

[Genere métricas personalizadas basadas en eventos][18] para obtener visibilidad de las alertas de monitoreo o cualquier otro dato basado en eventos ingerido por Datadog.
{{% /collapse-content %}} 

{{% collapse-content title="Ingiera métricas históricas" level="h4" %}}
[Historical Metrics Ingestion][21] le permite ingerir valores de métricas con marcas de tiempo de más de una hora de antigüedad al momento del envío.
{{% /collapse-content %}} 

### Métricas disponibles {#available-metrics}

La columna {{< ui >}}Available Metrics{{< /ui >}} desglosa su volumen total de métricas por métricas estándar y personalizadas durante el último mes. Si le interesa administrar su volumen de métricas personalizadas, consulte la [página de prácticas recomendadas para la gobernanza de Custom Metrics][25] y la [página Metrics Catalog][26] para obtener información más detallada.

## Sus métricas por fuente {#your-metrics-by-source}

Esta sección contiene un mapa de árbol que describe sus fuentes de métricas y sus volúmenes respectivos.

{{< img src="metrics/overview/metrics_by_source.png" alt="La sección Sus métricas por fuente de la página Metrics Overview" >}}

## Genere métricas desde cualquier fuente {#generate-metrics-from-any-source}

Al hacer clic en cualquiera de las opciones a continuación, accederá a la página {{< ui >}}Generate Metrics{{< /ui >}} del producto correspondiente, donde podrá crear métricas personalizadas a partir de ese producto:
   - [Logs ingeridos][14]
   - [Spans ingeridos][15]
   - [Eventos de RUM][16]
   - [Processes][17]
   - [Events][18]

## Métricas disponibles para consulta {#metrics-available-for-querying}

Utilice la barra de búsqueda en esta sección para ver los datos más recientes y las opciones de configuración de cualquiera de sus métricas. Puede buscar todas sus etiquetas o hacer clic para investigar la métrica más a fondo en las páginas [Metrics Explorer][23] o [Summary][24].

{{< img src="metrics/overview/available_metrics.png" alt="La sección Métricas disponibles para consulta de la página Metrics Overview" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/
[2]: /es/metrics/summary/
[3]: /es/agent/
[4]: https://github.com/DataDog/integrations-core
[5]: /es/agent/guide/integration-management/
[6]: /es/extend/dogstatsd/
[7]: https://github.com/statsd/statsd
[8]: /es/extend/custom_checks/
[9]: /es/extend/custom_checks/write_agent_check/
[10]: /es/integrations/#cat-marketplace
[11]: https://app.datadoghq.com/marketplace
[12]: /es/extend/integrations/?tab=integrations#api-based-integrations
[13]: /es/api/latest/metrics/#submit-metrics
[14]: /es/logs/log_configuration/logs_to_metrics/
[15]: /es/tracing/trace_pipeline/generate_metrics/
[16]: /es/real_user_monitoring/platform/generate_metrics/
[17]: /es/infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[18]: /es/events/guides/usage/#custom-metrics
[19]: /es/metrics/metrics-without-limits/
[20]: /es/metrics/distributions/
[21]: /es/metrics/custom_metrics/historical_metrics/
[22]: /es/metrics/guide/custom_metrics_governance
[23]: https://app.datadoghq.com/metric/explorer
[24]: https://app.datadoghq.com/metric/catalog
[25]: /es/metrics/guide/custom_metrics_governance/
[26]: /es/metrics/volume/
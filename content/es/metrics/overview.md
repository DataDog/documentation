---
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Controlar de manera dinámica el volumen de métricas personalizadas con Metrics
    without LimitsTM
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participar en una sesión interactiva para descubrir todo el potencial de las
    métricas
- link: /metrics/units
  tag: Documentación
  text: Unidades de métricas
title: Página de información general sobre métricas
---

## Información general

La página de información general sobre métricas proporciona a los usuarios de todos los niveles de experiencia una mayor comprensión de sus métricas. Proporciona orientación sobre cómo se puede maximizar el valor de las métricas de Datadog.

Con la página de información general sobre métricas puedes aprender cómo: 
- Explorar las fuentes de tus métricas
- Generar métricas adicionales a partir de los productos Datadog
- Activar funciones avanzadas de plataforma, como percentiles, Metrics without LimitsTM e ingestión histórica de métricas.

## Cómo fluyen tus métricas en Datadog

{{< img src="metrics/overview/how_metrics_flow.png" alt="Sección Cómo fluyen tus métricas Datadog, en la página de información general sobre métricas" >}}

Esta sección te muestra todas tus fuentes de métricas, los procesos y las configuraciones adicionales que se aplican a los datos de tus métricas y un desglose del volumen de métricas estándar y personalizadas.

**Nota**: La página de información general no está dedicada a la gestión de los costes de métricas. Para ver más información sobre cómo optimizar los costes, consulta [Prácticas recomendadas para la gobernanza de métricas personalizadas][25].

### Fuentes de métricas

La columna **Fuentes de métricas** muestra un resumen de las fuentes de métricas que informan a Datadog. Haz clic en cualquiera de las fuentes para abrir la [página Resumen][2] correspondiente a esa fuente. Tus métricas de Datadog pueden provenir de las siguientes fuentes:

{{% collapse-content title="Datadog Agent" level="h4" %}}
El [Datadog Agent][3] recopila métricas de los hosts en que está instalado y las reenvía a Datadog. Estás métricas pueden provenir de:

   - Cualquiera de las versiones oficiales de integraciones Datadog que se incluyen con el Agent. Para obtener una lista completa de las versiones disponibles de integraciones basadas en el Agent, consulta el [repositorio integrations-core][4].
   - [DogStatsD][6], un servicio de agregación de métricas que viene en el paquete del Datadog Agent. DogStatsD implementa el protocolo [StatsD][7] con algunas extensiones específicas de Datadog.
   - [Checks personalizados][8], que se utilizan para recopilar métricas de aplicaciones personalizadas o sistemas únicos. Tú defines la lógica de los checks en los archivos de configuración del Agent. Para obtener más información, consulta [Redactar un check personalizado del Agent][9].
   - [Integraciones del Marketplace][10] instaladas en el Agent. El [Datadog Marketplace][11] es un mercado digital donde los socios tecnológicos pueden ofrecer sus ofertas pagas a los usuarios de Datadog.

{{% /collapse-content %}}

{{% collapse-content title="Integraciones en la nube" level="h4" %}}
También conocidas como integraciones basadas en la autenticación, estas integraciones se configuran en Datadog. Tú proporcionas las credenciales para obtener métricas y Datadog realiza llamadas a la API en tu nombre para recopilarlas. Algunos ejemplos frecuentes son las integraciones de proveedores de nube, Slack y PagerDuty. Para obtener más información, consulta las [integraciones basadas en la API][12] en la documentación para desarrolladores.
{{% /collapse-content %}} 

{{% collapse-content title="API Datadog" level="h4" %}}
Puedes enviar métricas directamente a la [API de métricas][13].
{{% /collapse-content %}} 

En total, Datadog tiene más de {{< translate key="integration_count" >}} integraciones. Para obtener más información sobre la gestión de tus integraciones, consults [Gestión de integraciones][5].

### Procesamiento configurable

La columna **Procesamiento configurable** enumera las distintas opciones avanzadas de configuración que puedes utilizar para aumentar el valor de tus métricas. Haz clic en cualquiera de las opciones para obtener más información y ver un enlace a la pantalla de configuración correspondiente.

{{% collapse-content title="Optimiza los costes de tus métricas personalizadas con Metrics without LimitsTM" level="h4" %}}
[Metrics without LimitsTM][19] te ayuda a gestionar los costes de métricas personalizadas indexando sólo las etiquetas (tags) de métricas más valiosas para tu organización. Tu uso de Metrics without LimitsTM se refleja en la sección superior de la página de información general como **Métricas seleccionadas**. Para obtener más información sobre la gestión de los costes de métricas personalizadas, consulta [Prácticas recomendadas para la gobernanza de métricas personalizadas][22].
{{% /collapse-content %}} 

{{% collapse-content title="Habilitar percentiles en métricas de distribución" level="h4" %}}
Las [métricas de distribución][20] con percentiles habilitados te proporcionan percentiles globalmente precisos, calculados del lado del servidor a partir de todos los hosts, lo que te permite medir distribuciones estadísticas en toda tu infraestructura distribuida.
{{% /collapse-content %}} 

{{% collapse-content title="Generar métricas de otros productos Datadog" level="h4" %}}
Algunos productos incorporan métricas estándar para obtener información predefinida (por ejemplo, APM). 

##### Logs

[Genera métricas personalizadas a partir de logs ingeridos][14] para resumir los datos de todos los logs ingeridos por Datadog. Esto te permite visualizar y alertar sobre los datos de logs que son importantes para tu entorno, incluso si los logs no se indexan para su búsqueda a largo plazo.

##### APM

[Genera métricas personalizadas a partir de tus tramos (spans) ingeridos][15] para visualizar anomalías y tendencias a través de cualquier parámetro que sea importante para tu contexto empresarial.

##### Real User Monitoring (RUM)

[Genera métricas personalizadas a partir de eventos RUM][16] para resumir los datos de tus eventos RUM, de modo que puedas visualizar y alertar sobre los comportamientos de usuarios que tienen más impacto en tu organización.

##### Procesos

[Genera métricas personalizadas basadas en procesos][17] para monitorizar el consumo de recursos de tus procesos, así como cualquier otro comportamiento relacionado con procesos que pueda ser importante para tus necesidades empresariales.

##### Eventos

[Genera métricas][18] personalizadas basadas en eventos para obtener visibilidad de las alertas de monitor o de cualquier otro dato basado en eventos ingerido por Datadog.
{{% /collapse-content %}} 

{{% collapse-content title="Ingerir métricas históricas" level="h4" %}}
La [ingesta de métricas históricas][21] te permite ingerir valores de métricas con marcas de tiempo anteriores a una hora desde el momento del envío.
{{% /collapse-content %}} 

### Métricas disponibles

La columna **Métricas disponibles** desglosa tu volumen total de métricas por métricas estándar y personalizadas durante el último mes. Si te interesa gestionar tu volumen de métricas personalizadas, consulta las páginas [Prácticas recomendadas para la gestión de métricas personalizadas][25] y [Gestión del volumen de métricas][26] para obtener información más detallada.

## Tus métricas por fuente

Esta sección contiene un mapa de árbol que describe tus fuentes de métricas y sus respectivos volúmenes.

{{< img src="metrics/overview/metrics_by_source.png" alt="Sección Tus métricas por fuente, en la página de información general sobre métricas" >}}

## Generar métricas a partir de cualquier fuente

Al hacer clic en cualquiera de las opciones siguientes, accederás a la página Generar métricas del producto correspondiente, donde podrás crear métricas personalizados a partir de ese producto:
   - [Logs ingeridos][14]
   - [Tramos ingeridos][15]
   - [Eventos RUM][16]
   - [Procesos][17]
   - [Eventos][18]

## Métricas disponibles para su consulta

Utiliza la barra de búsqueda de esta sección para ver los datos y las opciones de configuración más recientes de cualquiera de tus métricas. Puedes buscar todas sus etiquetas o hacer clic para investigar más a fondo la métrica en las páginas [Explorador de métricas][23] o [Resumen][24].

{{< img src="metrics/overview/available_metrics.png" alt="Sección Métricas disponibles para su consulta, en la página de información general sobre métricas" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/
[2]: /es/metrics/summary/
[3]: /es/agent/
[4]: https://github.com/DataDog/integrations-core
[5]: /es/agent/guide/integration-management/
[6]: /es/developers/dogstatsd/
[7]: https://github.com/statsd/statsd
[8]: /es/developers/custom_checks/
[9]: /es/developers/custom_checks/write_agent_check/
[10]: /es/integrations/#cat-marketplace
[11]: https://app.datadoghq.com/marketplace
[12]: /es/developers/integrations/?tab=integrations#api-based-integrations
[13]: /es/api/latest/metrics/#submit-metrics
[14]: /es/logs/log_configuration/logs_to_metrics/
[15]: /es/tracing/trace_pipeline/generate_metrics/
[16]: /es/real_user_monitoring/platform/generate_metrics/
[17]: /es/infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[18]: /es/service_management/events/guides/usage/#custom-metrics
[19]: /es/metrics/metrics-without-limits/
[20]: /es/metrics/distributions/
[21]: /es/metrics/custom_metrics/historical_metrics/
[22]: /es/metrics/guide/custom_metrics_governance
[23]: https://app.datadoghq.com/metric/explorer
[24]: https://app.datadoghq.com/metric/summary
[25]: /es/metrics/guide/custom_metrics_governance/
[26]: /es/metrics/volume/
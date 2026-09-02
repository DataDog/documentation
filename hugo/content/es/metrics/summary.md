---
aliases:
- /es/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /es/graphing/metrics/summary/
description: Liste las métricas completas que se reportan a Datadog.
further_reading:
- link: /metrics/explorer/
  tag: Documentación
  text: Metrics Explorer
- link: /metrics/distributions/
  tag: Documentación
  text: Metrics Distributions
title: Metrics Summary
---
## Descripción general {#overview}

La [página de Metrics Summary][1] muestra una lista de sus métricas reportadas a Datadog en un marco de tiempo especificado: la última hora, el último día o la última semana. 

Busque sus métricas por nombre de métrica o etiqueta usando los campos de búsqueda {{< ui >}}Metric{{< /ui >}} o {{< ui >}}Tag{{< /ui >}}:

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="La página de Metrics Summary con NOT team:* ingresado en la barra de búsqueda de etiquetas" style="width:75%;">}}

**Nota**: Los valores de las etiquetas se conservan en el campo de búsqueda {{< ui >}}Tag{{< /ui >}} durante 28 horas. Los valores que no se enviaron en las últimas 28 horas no aparecen como opciones de búsqueda, incluso si permanecen visibles en el panel lateral de detalles de la métrica.

También puede descubrir métricas relevantes mediante el soporte de coincidencia difusa mejorada en el campo de búsqueda de métricas:

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="La página de Metrics Summary con búsqueda difusa buscando shopist checkout" style="width:75%;">}}

El filtrado de etiquetas admite sintaxis booleana y comodines para que pueda identificar: 
* Métricas que están etiquetadas con una clave de etiqueta particular, por ejemplo, `team`: `team:*`
* Métricas a las que les falta una clave de etiqueta particular, por ejemplo, `team`: `NOT team:*`

## Panel de facetas {#facet-panel}

Las barras de búsqueda proporcionan el conjunto de acciones más completo para filtrar la lista de métricas en Metrics Summary. Pero las facetas también pueden filtrar sus métricas por:

- {{< ui >}}Configuration{{< /ui >}}: Métricas con configuraciones de etiquetas
- {{< ui >}}Percentiles{{< /ui >}}: Métricas de distribución habilitadas por percentiles/capacidades de consulta avanzada
- {{< ui >}}Historical Metrics{{< /ui >}}: Métricas que tienen habilitada la ingesta de métricas históricas 
- {{< ui >}}Query Activity{{< /ui >}}: Métricas no consultadas en Datadog o mediante la API en los últimos 30, 60 o 90 días
- {{< ui >}}Related Assets{{< /ui >}}: Métricas que se están utilizando en tableros, cuadernos, monitores y SLOs.
- {{< ui >}}Metric Type{{< /ui >}}Diferencie entre métricas de distribución y no distribución (counts, gauge, rates)
- {{< ui >}}Metric Origin{{< /ui >}}: El producto del cual se originó la métrica (por ejemplo, métricas generadas a partir de registros o intervalos de APM). Para obtener más información sobre los diferentes tipos de origen de métricas, consulte [Definiciones de origen de métricas][12]

### Definiciones {#definitions}

Una métrica está **sin consultar** si no se ha accedido a ella en monitores, SLOs, cuadernos ejecutados, tableros abiertos, utilizada en consultas de Metrics Explorer o accedida a través de llamadas a la API en los últimos 30, 60 o 90 días.

Una métrica se considera **utilizada** siempre que exista en un activo, independientemente de si se ha consultado activamente.

{{< img src="metrics/summary/facet_panel_2025-02-26.png" alt="Panel de facetas de métricas" style="width:75%;">}}

## Configuración de múltiples métricas {#configuration-of-multiple-metrics}

Al hacer clic en {{< ui >}}Configure Metrics{{< /ui >}} obtendrá múltiples opciones para configurar más de una métrica a la vez: 

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="Botones de configuración masiva" style="width:100%;">}}

* {{< ui >}}Manage tags{{< /ui >}}: Configure etiquetas en múltiples métricas personalizadas que coincidan con un espacio de nombres usando Metrics without Limits™.

{{< img src="metrics/summary/tags-bulk-config.mp4" alt="Configuración masiva de etiquetas de métricas" video="true" style="width:100%;" >}}

* {{< ui >}}Enable or disable percentiles{{< /ui >}}: Administre agregaciones de percentiles en múltiples métricas de distribución. Consulte la [Distributions page][31] para obtener más información.

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="Alternar para administrar agregaciones de percentiles" style="width:100%;">}}

* {{< ui >}}Enable or disable historical metrics ingestion{{< /ui >}}: Administre la ingesta de datos históricos de métricas. Consulte la [Historical Metrics Ingestion page][30] para obtener más información.

## Panel lateral de detalles de métricas {#metric-details-sidepanel}

Haga clic en cualquier nombre de métrica para mostrar su panel lateral de detalles para obtener más información sobre los metadatos y las etiquetas de la métrica: 

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Panel de métricas" style="width:75%;">}}

### Nombre de la métrica {#metric-name}

El nombre de su métrica en `[Metrics Explorer][2], [dashboards][3], etc.

### Métricas personalizadas ingeridas {#ingested-custom-metrics}

Un nombre de métrica puede emitir múltiples métricas personalizadas ingeridas dependiendo de sus combinaciones de valores de etiqueta asociadas. Las métricas personalizadas ingeridas representan todos los datos enviados originalmente con código.

Obtenga más información en la documentación de [métricas personalizadas][4].

### Métricas personalizadas indexadas {#indexed-custom-metrics}

A diferencia de las métricas personalizadas ingeridas, las métricas personalizadas indexadas representan aquellas que permanecen consultables en toda la plataforma Datadog. Este número puede verse afectado al agregar o eliminar agregaciones de percentiles o mediante el uso de Metrics without Limits™. Obtenga más información en la documentación de [Metrics without Limits™][0].

### Hosts {#hosts}

El número total de hosts que reportan una métrica.

### Valores de etiqueta {#tag-values}

El número total de valores de etiqueta únicos adjuntos a una métrica.

[Obtenga más información sobre etiquetar][5].

### Metadatos de métricas {#metrics-metadata}

Los metadatos adjuntos a su métrica. La mayoría de los metadatos se pueden editar en la página de resumen de métricas o con la [Datadog API][6].

#### Unidad de métrica {#metric-unit}

La unidad para su métrica (byte, segundo, solicitud, consulta, etc.). Consulte la página de [unidad de métrica][7] para obtener más detalles.

Al enviar métricas personalizadas a Datadog, es posible cambiar la [unidad de medida][1] que se muestra al pasar el cursor sobre la métrica en su gráfico.

**Nota**: Esto no cambia la forma en que se muestra un gráfico de métricas. Solo cambia las unidades de medida que se consideran para los valores sin procesar cuando pasa el cursor sobre una métrica. El formato se aplica automáticamente para facilitar la lectura. Por ejemplo, los bytes (`B`) pueden mostrarse como kilobytes (`KiB`).

#### Tipo de métrica {#metric-type}

El tipo de su métrica (gauge, rate, count, distribution). Consulte la página de [tipo de métrica][8] para obtener más detalles.

**Advertencia**: Editar el tipo de métrica cambia el comportamiento de esa métrica para **ALL** sus dashboards y monitors.

#### Nombre de la integración {#integration-name}

Si la métrica proviene de una [integración][9] compatible, los metadatos enumeran el nombre de la integración. Esta información no se puede editar.

#### Intervalo {#interval}

El intervalo de recolección de la métrica en segundos.

#### Descripción de la métrica {#metric-description}

La descripción de la métrica le ayuda a entender qué representa una métrica, por qué existe y cómo se utiliza normalmente. Utilice este campo para visualizar y actualizar las descripciones de sus [métricas personalizadas][4]. Las descripciones se completan previamente para las métricas que provienen de [integraciones][9] compatibles.

#### Descripción generada por IA {#ai-generated-description}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Las descripciones de métricas generadas por IA no están disponibles para su sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Para métricas personalizadas, Datadog puede generar descripciones automáticamente utilizando el contexto disponible, incluido el nombre de la métrica, etiquetas significativas, actividad de consulta y código fuente conectado. Para usar el código fuente como contexto adicional, instale la integración de [GitHub][36], [GitLab][37] o [Azure DevOps][38] de Datadog y conecte sus [repositorios][39].

{{< img src="metrics/summary/metric_ai_generated_descriptions_03062026.png" alt="Descripciones generadas por IA en el Metrics sidepanel" style="width:80%;">}}


## Código fuente {#source-code}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Metric Source Code no está disponible para su sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La sección de Metric Source Code en el panel lateral de métricas proporciona una vista centralizada de cada métrica personalizada y su contexto subyacente.

Utilice la sección de Metric Source Code en el panel lateral de métricas para identificar el código fuente de una métrica, comprender cómo se genera y determinar la propiedad. Proporciona visibilidad sobre el contexto y la propiedad, lo que le ayuda a solucionar problemas y optimizar más rápido al vincular directamente al archivo fuente, al historial de confirmaciones y a los datos de atribución de la métrica.

{{< img src="metrics/summary/metric_source_code_03262026.png" alt="Source Code Example en el panel lateral de métricas" style="width:80%;">}}

### Solución de problemas de métricas faltantes {#troubleshooting-missing-metrics}

Si una métrica no aparece en Metric Source Code, puede deberse a cómo está definida.

Datadog detecta mejor las métricas cuando los nombres están escritos como cadenas explícitas. Es posible que no se detecten las métricas creadas mediante variables, constantes o ayudantes personalizados.

Razones comunes por las que faltan métricas:
- El nombre de la métrica se genera dinámicamente  
- La métrica se emite a través de envoltorios personalizados  
- El repositorio no está completamente indexado  

Mejor práctica:
- Defina los nombres de las métricas como cadenas explícitas cuando sea posible  

Ejemplo:

Envío de métrica mediante una variable (no recomendado)

```java
public static final String METRIC_NAME = "my.metric.name";
statsEmitter.distribution(METRIC_NAME, value, tags);
```

Envío de métrica como cadena explícita (recomendado):

```java
timer = meterRegistry.timer("my.metric.name");
```

Para garantizar una cobertura completa del código fuente de su métrica, asegúrese de haber instalado la integración de [GitHub][36], [GitLab][37] o [Azure DevOps][38] de Datadog y de que todos sus [repositorios][39] estén conectados.

### Tabla de etiquetas {#tags-table}

La tabla de etiquetas ofrece múltiples formas de explorar todas las claves de etiqueta y los valores de etiqueta que informan activamente en los datos de su métrica.

Utilice la tabla de etiquetas para:

- Ordenar las claves de etiqueta por la columna {{< ui >}}Count{{< /ui >}} (recuento de valores de etiqueta únicos).
- Busque en la tabla paginada de etiquetas una clave de etiqueta específica.
- Exporte la tabla de etiquetas como un archivo CSV descargable.
- Alterne entre las etiquetas que ha configurado en su métrica frente a las etiquetas enviadas originalmente de la métrica

Para cualquier clave de etiqueta en particular, puede:

- Inspeccione todos los valores de etiqueta de esa clave de etiqueta.
- Utilice una etiqueta específica `key:value` para filtrar aún más la lista de métricas que se muestran en la página de Metrics Summary.
- Abra un gráfico de esta métrica filtrado por su par de etiquetas `key:value` en el Metrics Explorer.
- Copie cualquier etiqueta `key:value` para filtrar en toda la aplicación.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tabla de etiquetas" video=true style="width:75%;">}}

[Obtenga más información sobre etiquetar][5].

### Activos relacionados con métricas {#metrics-related-assets}

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="Activos relacionados para un nombre de métrica especificado" style="width:80%;">}}

Para determinar el valor de cualquier nombre de métrica para su organización, utilice Activos relacionados con métricas. Los activos relacionados con métricas se refieren a cualquier tablero, notebook, monitor o SLO que consulte una métrica en particular. 

1. Desplácese hasta la parte inferior del panel lateral de detalles de la métrica, a la sección {{< ui >}}Related Assets{{< /ui >}}.
2. Haga clic en el botón desplegable para ver el tipo de activo relacionado que le interesa (tableros, monitores, notebooks, SLOs). Adicionalmente, puede usar la barra de búsqueda para validar activos específicos.
3. La columna {{< ui >}}Tags{{< /ui >}} muestra exactamente qué etiquetas se utilizan en cada activo.
   
## Custom Metrics Tags Cardinality Explorer {#custom-metrics-tags-cardinality-explorer}

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer para un nombre de métrica con picos" style="width:80%;">}}
Para determinar por qué un nombre de métrica en particular está emitiendo una gran cantidad de Custom Metrics, o tiene picos, utilice Custom Metrics Tags Cardinality Explorer. Esto le ayuda a identificar las claves de etiqueta que provocan el pico, las cuales puede excluir inmediatamente usando Metrics without Limits™ para ahorrar costos.

## Metrics without Limits™ {#metrics-without-limits}
Metrics without Limits™ le brinda control sobre el tamaño de sus métricas personalizadas sin requerir cambios en el agente o en el nivel del código. 

**Nota**: Metrics without Limits™ solo está disponible para métricas personalizadas.

Configure [ etiquetas de forma masiva ](#configuration-of-multiple-metrics) yendo a {{< ui >}}Configure Metrics{{< /ui >}} > {{< ui >}}Manage tags{{< /ui >}} en la [página de Métricas][34], o haciendo clic en el botón {{< ui >}}Manage Tags{{< /ui >}} en el panel lateral de detalles de una métrica. 

{{< img src="metrics/distributions/managetags.png" alt="Configuración de etiquetas en una distribución" style="width:80%;">}}

1. Haga clic en el nombre de su métrica de distribución personalizada en la tabla {{< ui >}}Metrics Summary{{< /ui >}} para abrir el panel lateral de detalles de la métrica.
2. Haga clic en el botón {{< ui >}}Manage Tags{{< /ui >}} para abrir el modal de configuración de etiquetas.
3. Seleccione {{< ui >}}Include tags...{{< /ui >}} o {{< ui >}}Exclude tags...{{< /ui >}} para personalizar las etiquetas que desea o no desea buscar. Para obtener más información sobre la configuración de etiquetas, consulte la documentación de [Metrics without Limits][10].
4. Visualice los efectos de su configuración de etiquetas propuesta con el estimador de cardinalidad antes de seleccionar {{< ui >}}Save{{< /ui >}}.

**Nota**: El estimador de cardinalidad requiere que la métrica tenga más de 48 horas de antigüedad.

### Etiquetas consultables {#queryable-tags}

Una vez que su métrica se haya configurado con Metrics without Limits™, puede ver qué etiquetas siguen siendo consultables; en última instancia, aquellas que contribuyen al volumen de _Indexed Custom Metrics_. Y alterne de nuevo a todas las etiquetas enviadas e ingeridas originalmente que contribuyen a su volumen de _Ingested Custom Metrics_. 

### Definiciones de origen de métricas {#metric-origin-definitions}

Esta tabla muestra la asignación entre el origen de la métrica tal como se ve en la faceta y desde dónde se envió:

| Origen de la métrica           | Enviado desde                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| Catálogo de API             | Series temporales enviadas por el producto [Catálogo][13] de Datadog desde el punto de conexión de APIM.
| APM                     | Series temporales enviadas por el producto Datadog APM para métricas generadas a partir de trazas y métricas de tramo.
| Agent                   | Series temporales enviadas por el Datadog Agent, recopiladas de [Agent integrations][10], [built-in integrations][9], [DogStatsD][32] o [custom Agent checks][33].
| Cloud Security                     | Series temporales enviadas por el producto [Cloud Security][14] de Datadog.
| Cloud Integrations      | Series temporales recopiladas de proveedores de nube como AWS, Azure y Google Cloud, etc., a partir de sus respectivas Integrations. 
| DBM                     | Series temporales enviadas por el producto [Database Monitoring][15] de Datadog, que incluye información sobre actividades/consultas/bloqueos de MySQL, Oracle y Postgres.
| DSM                     | Series temporales enviadas por el producto [Data Streams Monitoring][16] de Datadog, para métricas generadas a partir de tramos y trazas de DSM.
| Datadog Exporter        | Series temporales enviadas por el [OpenTelemetry Collector][17] o el [Datadog Exporter][18].
| Datadog Platform        | Series temporales enviadas por la ingesta de métricas que se utilizan para [informar el uso de métricas][11].
| Datadog Events                  | Series temporales generadas a partir de la plataforma Datadog Events.
| Agent Observability       | Series temporales emitidas por el producto Agent Observability utilizando el servicio `lmobs_to_metrics`.
| Logs                    | Series temporales generadas a partir de la plataforma [Logs][28] de Datadog.
| Metrics API             | Series temporales enviadas mediante el [OTLP Ingestion endpoint][21] de Datadog y el receptor OTel con contrapartes de integración de Datadog o puntos para métricas de uso estimado o el Datadog API Client.
| CNM                     | Series temporales enviadas por el producto [Cloud Network Monitoring][19] de Datadog.
| Observability Pipelines | Series temporales enviadas por el producto [Observability Pipelines][20] de Datadog, incluidas métricas de error y rendimiento.
| Other                   | Series temporales que no tienen una contraparte de integración de DD.
| Procesos               | Series temporales generadas a partir del producto [Procesos][22] de Datadog.
| RUM                     | Series temporales generadas a partir del producto [Real User Monitoring][23] de Datadog.
| Integraciones SAAS       | Series temporales recopiladas de plataformas SAAS populares como Slack, Docker, PagerDuty, etc.
| Serverless              | Series temporales enviadas por la plataforma [Serverless][24] de Datadog, incluidas Function, App Services, Cloud Run y Container App Metrics.
| Catalog         | Series temporales enviadas por el producto [Catalog][25] de Datadog, incluidas las métricas de [Scorecard][29].
| Synthetic Monitoring    | Métricas de Synthetic Monitoring y pruebas continuas generadas a partir del producto [Synthetic Monitoring][26] de Datadog. 
| USM                     | Series temporales generadas a partir del producto [Universal Service Monitoring][27] de Datadog. 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: /es/metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /es/metrics/explorer/
[3]: /es/dashboards/
[4]: /es/metrics/custom_metrics/
[5]: /es/getting_started/tagging/
[6]: /es/api/v1/metrics/#edit-metric-metadata
[7]: /es/metrics/units/
[8]: /es/metrics/types/
[9]: /es/integrations/
[10]: /es/integrations/agent_metrics/
[11]: /es/account_management/billing/usage_metrics/
[12]: /es/metrics/summary/#metric-origin-definitions
[13]: /es/internal_developer_portal/catalog/endpoints/
[14]: /es/security/cloud_security_management/
[15]: /es/database_monitoring/
[16]: /es/data_streams/
[17]: /es/opentelemetry/setup/collector_exporter/
[18]: /es/opentelemetry/collector_exporter/
[19]: /es/network_monitoring/cloud_network_monitoring/
[20]: /es/observability_pipelines/
[21]: /es/opentelemetry/setup/otlp_ingest_in_the_agent/
[22]: /es/integrations/process/
[23]: /es/monitors/types/real_user_monitoring/
[24]: /es/serverless/
[25]: /es/internal_developer_portal/catalog/
[26]: /es/synthetics/
[27]: /es/universal_service_monitoring/
[28]: /es/logs/
[29]: /es/internal_developer_portal/scorecards/
[30]: /es/metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /es/metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /es/metrics/custom_metrics/agent_metrics_submission/
[34]: https://app.datadoghq.com/metric/overview
[35]: https://app.datadoghq.com/integrations?category=Source%20Control
[36]: https://app.datadoghq.com/integrations/github/configuration
[37]: https://app.datadoghq.com/integrations/gitlab-source-code
[38]: https://app.datadoghq.com/integrations/azure-devops-source-code?subPath=configuration
[39]: https://app.datadoghq.com/source-code/repositories
[40]: https://www.datadoghq.com/product-preview/metrics-source-code-attribution/
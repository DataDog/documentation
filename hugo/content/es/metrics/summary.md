---
aliases:
- /es/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /es/graphing/metrics/summary/
description: Consulta la lista completa de métricas que informan a Datadog.
further_reading:
- link: /metrics/explorer/
  tag: Documentación
  text: Explorador de métricas
- link: /metrics/distributions/
  tag: Documentación
  text: Distribuciones de métricas
title: Resumen de métricas
---

## Información general

La [página Resumen de métricas][1] muestra una lista de tus métricas informadas a Datadog según un marco temporal específico: la última hora, día o semana.

Busca tus métricas por nombre de métrica o etiqueta (tag) utilizando los campos **Metric** (Métrica) o **Tag** (Etiqueta):

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="Página de resumen de métricas SIN equipo:* ingresado en la barra de búsqueda por etiquetas" style="width:75%;">}}

También puedes detectar métricas relevantes utilizando la compatibilidad mejorada de concordancia difusa en el campo de búsqueda de métricas:

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="La página de resumen de métricas con búsqueda difusa que busca el pago en Shopist" style="width:75%;">}}

El filtrado por etiquetas admite la sintaxis booleana y de comodín para que puedas identificar: 
* Métricas que están etiquetadas con una clave de etiqueta concreta, por ejemplo, `team`: `team:*`
* Métricas a las que les falta una determinada clave de etiqueta, por ejemplo, `team`: `NOT team:*`

## Panel de facetas

Las barras de búsqueda proporcionan el conjunto más completo de acciones para filtrar la lista de métricas. No obstante, las facetas también pueden filtrar tus métricas por:

- **Configuración**: métricas con configuraciones de etiqueta
- **Porcentajes**: métricas de distribución habilitadas por percentiles/capacidades de consulta avanzadas
- **Métricas históricas**: Métricas que tienen activada la ingesta de métricas históricas
- **Actividad de consulta**: Métricas no consultada en Datadog o por la API en los últimos 30, 60 o 90 días
- **Recursos relacionados**: Métricas que se están utilizando en dashboards, notebooks, monitores y SLOs
- **Tipo de métrica**: diferencia entre métricas de distribución y no distribución (counts, gauges, rates)
- **Origen de métricas**: Producto del que procede la métrica (por ejemplo, métricas generadas a partir de logs o tramos (spans) APM). Para obtener más información sobre los distintos tipos de origen de métricas, consulta [definiciones de orígenes de métricas][12].

### Definiciones

Una métrica está **sin consultar** si no se accedió a ella en monitores, SLOs, notebooks ejecutados, dashboards abiertos, llamadas a la API o si no se la utilizó en consultas del Explorador de métricas en los últimos 30, 60 o 90 días.

Una métrica se considera **utilizada** si existe en un recurso, independientemente de si se consultó activamente.

{{< img src="metrics/summary/facet_panel_2025-02-26.png" alt="Panel de facetas de métricas" style="width:75%;">}}

## Configuración de múltiples métricas 

Si haces clic en **Configure Metrics** (Configurar métricas), verás varias opciones para configurar más de una métrica a la vez: 

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="Botones de configuración en bloque" style="width:100%;">}}

* **Gestionar etiquetas**: configura etiquetas en múltiples métricas personalizadas coincidentes con un espacio de nombres utilizando Metrics without LimitsTM.

{{< img src="metrics/summary/tags-bulk-config.mp4" alt="Configuración en bloque de etiquetas de métricas" video="true" style="width:100%;" >}}

* **Activar o desactivar percentiles**: gestiona agregaciones de percentiles a través de múltiples métricas de distribución. Consulta la [página de Distribuciones][31] para obtener más información.

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="Cambia el conmutador para gestionar agregaciones de percentiles" style="width:100%;">}}

* **Activar o desactivar las métricas históricas**: gestiona la ingesta de datos históricos de métrica. Consulta la [página de Métricas históricas][30] para más información.

## Panel lateral de detalles de métricas

Haz clic en cualquier nombre de métrica para ver su panel lateral de detalles y obtener más información sobre los metadatos y etiquetas de métrica:

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Panel de métricas" style="width:75%;">}}

### Nombre de la métrica

El nombre de tu métrica en el [Metrics Explorer][2], [dashboards][3], etc.

### Métricas personalizadas ingeridas

Un nombre de métrica puede emitir múltiples métricas personalizadas ingeridas en función de sus combinaciones de valores y etiquetas asociadas. Las métricas personalizadas ingeridas representan todos los datos enviados originalmente con el código.

Más información en la documentación de [métricas personalizadas][4].

### Métricas personalizadas indexadas

A diferencia de las métricas personalizadas ingeridas, las métricas personalizadas indexadas representan aquellas que siguen siendo consultables en toda la plataforma Datadog. Este número puede verse afectado por la adición o eliminación de agregaciones de percentiles o por el uso de Metrics without LimitsTM. Para obtener más información, consulta la documentación de [Metrics without LimitsTM][0].

### Hosts

El número total de hosts que informan una métrica.

### Valores de etiquetas

El número total de valores de etiqueta únicos adjuntos a una métrica.

[Más información sobre el etiquetado][5].

### Metadatos de métricas

Los metadatos adjuntos a tu métrica. La mayoría de los metadatos pueden editarse en la página de resumen de métrica o con la [API de Datadog][6].

#### Unidad de métrica

La unidad para tu métrica (byte, segundo, solicitud, consulta, etc.). Consulta la página [unidad de métrica][7] para más detalles.

Al enviar métricas personalizadas a Datadog, es posible cambiar la [unidad de medida][1] que se muestra al pasar el ratón por encima de métrica en tu gráfico.

**Nota**: Esto no cambia la forma en que se muestra un gráfico de métrica. Solo cambia las unidades de medida en las que se consideran los valores brutos cuando se pasa el ratón por encima de una métrica. El formato se aplica automáticamente para facilitar la lectura. Por ejemplo, los bytes (`B`) pueden mostrarse como kilobytes (`KiB`).

#### Tipo de métrica

El tipo de su métrica (gauge, tasa, count, distribución). Consulta la página de [tipo de métrica][8] para obtener más detalles.

**Atención**: Editar el tipo de métrica cambia el comportamiento de esa métrica para **TODOS** tus dashboards y monitores.

#### Nombre de integración

Si la métrica procede de una [integración][9] compatible, los metadatos indican el nombre de la integración. Esta información no puede editarse.

#### Intervalo

El intervalo de recopilación para la métrica en segundos.

#### Descripción de métrica

La descripción de métrica te ayuda a entender lo que hace una métrica. Las descripciones se rellenan previamente para métricas procedentes de [integraciones][9] compatibles. Utiliza este campo para actualizar las descripciones de tus [métricas personalizadas][4].

### Tabla de etiquetas

La tabla de etiquetas ofrece múltiples formas de explorar todas las claves de etiqueta y los valores de etiquetar que están informando activamente en tus datos de métrica.

Utiliza la tabla de etiquetas para:

- Ordena las claves de etiqueta por la columna **Count** (recuento de valores únicos de etiqueta).
- Busca una clave de etiqueta concreta en la tabla paginada de etiquetas.
- Exporta la tabla de etiquetas como CSV descargable.
- Alterna entre etiquetas que has configurado en tu métrica frente a las etiquetas de la métrica presentada originalmente

Para cualquier clave concreta de etiqueta, puedes:

- Inspecciona todos los valores de etiqueta de esa clave de etiqueta.
- Utiliza una etiqueta `key:value` específica para filtrar aún más la lista de métricas mostradas en la página de resumen de métricas.
- Abre un gráfico de esta métrica filtrado por tu par de etiqueta `key:value` en el Metrics Explorer.
- Copia cualquier etiqueta `key:value` para filtrarlo a través de la aplicación.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tabla de etiquetas" video=true style="width:75%;">}}

[Más información sobre el etiquetado][5].

### Activos relacionados con métricas

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="Activos relacionados para un nombre de métricas específico" style="width:80%;">}}

Para determinar el valor de cualquier nombre de métrica para tu organización, utiliza Activos relacionados de métricas. Los activos relacionados de métricas se refieren a cualquier dashboard, notebook, monitor, o SLO que consulta una métrica en particular.

1. Desplázate hasta la parte inferior del panel lateral de detalles de la métrica, hasta la sección **Recursos relacionados**.
2. Haz clic en el botón desplegable para ver el tipo de recurso relacionado que te interesa en (dashboards, monitores, notebooks, SLOs). Además, puedes utilizar la barra de búsqueda para validar activos específicos.
3. La columna **Tags** (Etiquetas) muestra exactamente qué etiquetas se utilizan en cada activo.

## Explorador de la cardinalidad de etiquetas de métricas personalizadas

{{< img src="metrics/tagsexplorer.png" alt="Explorador de la cardinalidad de etiquetas de métricas personalizadas para el nombre de una métrica que presenta picos" style="width:80%;">}}
Para determinar por qué un nombre de métrica concreto está emitiendo un gran número de métricas personalizadas, o tiene picos, utiliza el explorador de la cardinalidad de etiquetas de métricas personalizadas. Esta opción te ayuda a identificar las claves de etiqueta que provocan el pico, que puedes excluir inmediatamente utilizando Metrics without LimitsTM para ahorrar costes.

## Metrics without LimitsTM
Metrics without LimitsTM te proporciona control sobre el tamaño de tus métricas personalizadas sin necesidad de realizar cambios en el Agent o a nivel de código. 

**Nota:** Metrics without LimitsTM solo está disponible para métricas personalizadas.

Puedes [configurar etiquetas en bloque](#configuration-of-multiple-metrics) accediendo a **Configurar métricas -> Gestionar etiquetas** en la [página de Métricas][34] o haciendo clic en el botón **Manage Tags** (Gestionar etiquetas) del panel lateral de detalles de una métrica.

{{< img src="metrics/distributions/managetags.png" alt="Configuración de etiquetas en una distribución" style="width:80%;">}}

1. Haz clic en el nombre de tu métrica de distribución personalizada en la tabla **Metrics Summary** (Resumen de métricas) para abrir el panel lateral de detalles de métricas.
2. Haz clic en el botón **Gestionar etiquetas** para abrir el modal de configuración de etiquetas.
3. Seleccione **Include tags...** o **Exclude tags...** (Incluir etiquetas... o Excluir etiquetas...) para personalizar las etiquetas que deseas o no consultar. Para más información sobre la configuración de etiquetas, consulta la documentación de [Metrics without Limits][10].
4. Previsualiza los efectos de tu configuración de etiqueta propuesta con el estimador de cardinalidad antes de seleccionar **Save** (Guardar).

**Nota**: El estimador de cardinalidad requiere que la métrica tenga más de 48 horas.

### Etiquetas consultables

Una vez que se ha configurado tu métrica con Metrics without LimitsTM, puedes ver qué etiquetas siguen siendo consultables (las que contribuyen al volumen _Indexed Custom Metrics_). Y puedes volver a todas las etiquetas enviadas e ingeridas originalmente que contribuyen a tu volumen _Ingested Custom Metrics_. 

### Definiciones del origen de una métrica

Esta tabla muestra la correspondencia entre el origen de una métrica tal y como se ve en la faceta y el lugar desde el que se envió:

| Origen de una métrica           | Enviada desde                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| Catálogo de APIs             | Series temporales enviadas por el producto [Catálogo de software][13] de Datadog desde el endpoint de APIM.
| APM                     | Series temporales enviadas por el producto APM de Datadog para métricas generadas a partir de métricas de trazas (traces) y tramos.
| Agent                   | Series temporales enviadas por el Datadog Agent, recopiladas de [integraciones del Agent][10], [integraciones incorporadas][9], [DogStatsD][32], o [checks personalizados del Agent][33].
| Cloud Security                     | Series temporales enviadas por el producto [Cloud Security][14] de Datadog.
| Integraciones en la nube      | Series temporales recopiladas de proveedores de nube como AWS, Azure y Google Cloud, etc. de sus respectivas integraciones. 
| DBM                     | Series temporales enviadas por el producto [Database Monitoring][15] de Datadog, que incluyen información sobre las actividades/consultas/bloqueos de MySQL, Oracle y Postgres.
| DSM                     | Series temporales enviadas por el producto [Data Streams Monitoring][16] de Datadog, para métricas generadas a partir de tramos y trazas de DSM.
| Datadog Exporter        | Series temporales enviadas por el [OpenTelemetry Collector][17] o el [Datadog Exporter][18].
| Plataforma Datadog        | Series temporales enviadas por métricas de admisión que se utilizan para [informar sobre el uso de métricas][11].
| Eventos                  | Series temporales generadas a partir de la plataforma de eventos de Datadog.
| LLM Observability       | Series temporales emitidas por el producto LLM Observability utilizando el servicio `lmobs_to_metrics`.
| Logs                    | Series temporales generadas a partir de la plataforma de [logs][28] de Datadog.
| API de métricas             | Series temporales enviadas mediante el [endpoint de ingesta OTLP][21] y el receptor OTel con una contrapartida o con puntos en la integración Datadog para obtener métricas del uso estimado o el cliente API de Datadog.
| CNM                     | Series temporales enviadas por el producto [Cloud Network Monitoring][19] de Datadog.
| Observability Pipelines | Series temporales enviadas por los [pipelines de observabilidad][20] de Datadog, incluidas las métricas de errores y rendimiento.
| Otro                   | Series temporales que no tienen una contrapartida en la integración DD.
| Procesos               | Series temporales generadas a partir del producto [Processes][22] de Datadog.
| RUM                     | Series temporales generadas a partir del producto [Real User Monitoring][23] de Datadog.
| Integraciones SAAS       | Series de tiempo recopiladas de plataformas SAAS populares como Slack, Docker, PagerDuty, etc.
| Serverless              | Series temporales enviadas por la plataforma [serverless][24] de Datadog, incluyendo Function, App Services, Cloud Run y Container App Metrics.
| Software Catalog         | Series temporales enviadas por el producto [Catálogo de software][25] de Datadog, incluyendo las métricas de [scorecards][29].
| Synthetic Monitoring    | Métricas de monitorización y tests continuos de Synthetic, generadas a partir del producto [Synthetic Monitoring][26] de Datadog.
| USM                     | Series temporales generadas a partir del producto [Universal Service Monitoring][27] de Datadog.

## Referencias adicionales

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
[13]: /es/software_catalog/endpoints/
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
[25]: /es/software_catalog/
[26]: /es/synthetics/
[27]: /es/universal_service_monitoring/
[28]: /es/logs/
[29]: /es/software_catalog/scorecards/
[30]: /es/metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /es/metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /es/metrics/custom_metrics/agent_metrics_submission/
[34]: https://app.datadoghq.com/metric/overview
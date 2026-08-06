---
description: Configure la traza y el Reenvío de registros para Azure Logic Apps utilizando
  el servicio de Reenvío Automatizado de Registros de Azure de Datadog y filtros de
  retención de APM opcionales.
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración con Azure
- link: /logs/guide/azure-automated-log-forwarding/
  tag: Documentación
  text: Reenvío Automatizado de Log Forwarding
title: Instale el Serverless Monitoring para Azure Logic Apps
---
{{< callout url="https://www.datadoghq.com/product-preview/serverless-monitoring-for-azure-logic-apps/"
 btn_hidden="false" header="¡Únase a la vista previa!">}}
El Serverless Monitoring para Azure Logic Apps está en vista previa. Complete el formulario para solicitar acceso.
{{< /callout >}}

Azure Logic Apps es un servicio totalmente administrado, y el Datadog Agent no se puede instalar directamente en Logic Apps. Sin embargo, Datadog puede monitorear Logic Apps a través de los registros de diagnóstico de Azure.

## Requisitos previos {#prerequisites}

- El servicio de [Azure Automated Log Forwarding][1] debe estar instalado

## Configuración {#setup}

### 1. Instale el Datadog Azure Automated Log Forwarding {#1-install-datadog-azure-automated-log-forwarding}

Siga las instrucciones en la [Azure Automated Log Forwarding guide][1] para instalar el servicio y configurar etiquetas para filtrar los registros de recursos deseados. Una vez instalado, todas las nuevas Logic Apps tendrán configurado automáticamente el reenvío de registros para enviar los registros de diagnóstico a Datadog.

**Nota**: El servicio de [Azure Automated Log Forwarding] crea una configuración de diagnóstico llamada `datadog_log_forwarding_<ID>` en cada Logic App. Esta configuración captura los registros de ejecución del flujo de trabajo y los reenvía a Datadog.

### 2. Configure etiquetas (opcional pero recomendado) {#2-configure-tags-optional-but-recommended}

Agregue etiquetas `service` y `env` a sus Logic Apps para organizar y filtrar sus flujos de trabajo en Datadog.

1. En el Portal de Azure, abra su Logic App
2. Navegue a la sección {{< ui >}}Tags{{< /ui >}}
3. Agregue las siguientes etiquetas:
   - `env`: El nombre del entorno (por ejemplo, `dev`, `staging` o `prod`)
   - `service`: El nombre del servicio para su Logic App

{{< img src="serverless/logic_apps/tags_configuration.png" alt="Configuración de etiquetas de Azure Logic App que muestra las etiquetas de entorno y servicio" style="width:100%;" >}}

La etiqueta `env` es necesaria para ver las trazas en Datadog y, si no se establece, tiene como valor predeterminado `dev`. La etiqueta `service` tiene como valor predeterminado el nombre del flujo de trabajo de Logic App si no se establece.

### 3. Invoque el flujo de trabajo {#3-invoke-the-workflow}

Después de configurar el reenvío de registros, invoque su flujo de trabajo de Logic App un par de veces para generar datos de ejecución.

### 4. Verifique las trazas en Datadog {#4-verify-traces-in-datadog}

Utilice Live Search en Datadog APM para verificar que se estén recibiendo las trazas:

1. Navegue a [APM > Trazas][4] en Datadog
2. Utilice la consulta `operation_name:azure.logicapps` para filtrar las trazas de Logic Apps
3. Live Search devuelve todos los tramos sin muestreo, por lo que debería ver sus ejecuciones después de que se completen

{{< img src="serverless/logic_apps/apm_live_search.png" alt="Búsqueda en vivo de Datadog APM que muestra las trazas de azure.logicapps" style="width:100%;" >}}

## Configuración adicional {#additional-configuration}

### Agregue un filtro de retención para los tramos de APM (recomendado) {#add-a-retention-filter-for-apm-spans-recommended}

Para controlar qué trazas se conservan más allá del período de búsqueda en vivo predeterminado, agregue un filtro de retención:

1. En Datadog, busque {{< ui >}}Retention Filters{{< /ui >}} (use Cmd+K y escriba "retention filters")
2. Haga clic en {{< ui >}}Add Retention Filter{{< /ui >}}
3. Establezca la consulta de filtro en `operation_name:azure.logicapps`
4. Agregue cualquier filtro adicional para su servicio, como `service:<SERVICE_NAME>` y `env:<ENV_NAME>`
5. Configure la tasa de retención según sus necesidades

{{< img src="serverless/logic_apps/retention_filter_search.png" alt="Busque filtros de retención en Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/retention_filter_configuration.png" alt="Configure el filtro de retención con la consulta operation_name:azure.logicapps" style="width:100%;" >}}

Agregar etiquetas de servicio y entorno a su filtro de retención ayuda a ahorrar costos al retener trazas solo para entornos y servicios importantes.

Consulte [Trace Retention][5] para obtener más información.

### Agregue un índice de registros (recomendado) {#add-a-log-index-recommended}

Para habilitar la búsqueda y el análisis de registros históricos de Logic Apps, cree un índice de registros dedicado:

1. En Datadog, busque {{< ui >}}Indexes{{< /ui >}} (use Cmd+K y escriba "index")
2. Navegue a {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}Indexes{{< /ui >}}
3. Haga clic en {{< ui >}}New Index{{< /ui >}}
4. Establezca el filtro en `@properties.resource.workflowId:*`
5. Configure el nombre del índice y los ajustes de retención

{{< img src="serverless/logic_apps/log_index_search.png" alt="Busque índices de registros en Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/log_index_configuration.png" alt="Configure el índice de registros con el filtro workflowId" style="width:100%;" >}}

{{% serverless/log_to_trace_indexing_note %}}

Consulte [Log Indexes][6] para obtener más información.

## Vea sus trazas de Logic App en Datadog {#see-your-logic-app-traces-in-datadog}

Después de invocar su Logic App:

1. En Datadog, vaya a [{{< ui >}}APM > Traces{{< /ui >}}][4].
2. Seleccione {{< ui >}}Live Search{{< /ui >}} en la esquina superior derecha.
3. Busque `operation_name:azure.logicapps` para encontrar sus trazas.

Si no puede ver sus trazas, consulte [Solución de problemas][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/azure-automated-log-forwarding/
[3]: /es/integrations/azure/
[4]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[5]: /es/tracing/trace_pipeline/trace_retention/
[6]: /es/logs/log_configuration/indexes/
[7]: /es/serverless/logic_apps/troubleshooting
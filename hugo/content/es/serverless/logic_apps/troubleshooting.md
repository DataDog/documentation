---
description: Diagnostique las trazas y registros faltantes para el monitoreo de Azure
  Logic Apps verificando la configuración de diagnóstico, el Log Forwarding y la generación
  de tramos de APM en Datadog.
title: Solución de problemas de Serverless Monitoring para Azure Logic Apps
---
## No puedo ver ninguna traza {#i-cannot-see-any-traces}

Siga estos pasos para diagnosticar por qué las trazas no aparecen en Datadog:

### 1. Verifique que la configuración de diagnóstico esté configurada {#1-verify-that-diagnostic-settings-are-configured}

Compruebe que la Logic App tenga la configuración de diagnóstico requerida:

1. En Azure Portal, abra su Logic App
2. Navegue a {{< ui >}}Diagnostic settings{{< /ui >}} en el menú de la izquierda
3. Verifique que exista una configuración de diagnóstico llamada `datadog_log_forwarding_<ID>`

{{< img src="serverless/logic_apps/diagnostic_settings.png" alt="Configuración de diagnóstico de Azure Logic App que muestra la configuración de Reenvío de registros" style="width:100%;" >}}

Esta configuración es creada automáticamente por el servicio [Datadog Azure Automated Log Forwarding][1]. Si falta, verifique que haya instalado correctamente el servicio Azure Automated Log Forwarding.

### 2. Verifique que los registros de Logic Apps estén en Datadog {#2-verify-that-logic-apps-logs-are-in-datadog}

Compruebe que los registros se estén reenviando a Datadog:

1. En Datadog, vaya a [{{< ui >}}Logs > Live Tail{{< /ui >}}][2]
2. Busque `@properties.resource.workflowId:*`
3. Ejecute el flujo de trabajo de su Logic App algunas veces si es necesario

Si no ve ningún registro:
- Verifique que el servicio Azure Automated Log Forwarding esté configurado correctamente

### 3. Verifique que existan tramos de APM {#3-verify-that-apm-spans-exist}

Verifique que se estén generando trazas a partir de los registros:

1. En Datadog, vaya a [{{< ui >}}APM > Traces{{< /ui >}}][3]
2. Seleccione {{< ui >}}Live Search{{< /ui >}} en la esquina superior derecha
3. Busque `operation_name:azure.logicapps`

Si ve registros pero no trazas, espere unos minutos a que se procesen los registros y se generen las trazas.

## Consejos adicionales para la solución de problemas {#additional-troubleshooting-tips}

### Los registros no aparecen en Datadog {#logs-are-not-appearing-in-datadog}

Si los registros no aparecen en Datadog:

1. **Verifique la configuración de Azure Automated Log Forwarding**: Asegúrese de que el espacio de nombres de Event Hubs y el destino de Datadog estén configurados correctamente
2. **Compruebe la categoría de registros de configuración de diagnóstico**: La configuración de diagnóstico debería estar capturando registros `WorkflowRuntime`

### Las trazas faltan de forma intermitente {#traces-are-missing-intermittently}

Si las trazas aparecen de forma inconsistente:

1. **Agregue un filtro de retención**: Cree un [filtro de retención][4] con la consulta `operation_name:azure.logicapps` para asegurarse de que las trazas se conserven
2. **Establezca la tasa de retención**: Para la depuración, establezca la tasa de retención al 100%
3. **Compruebe el muestreo**: Verifique que las trazas no se estén descartando debido a las configuraciones de muestreo

### Las etiquetas no aparecen en las trazas {#tags-are-not-appearing-on-traces}

Si las etiquetas `env` y `service` no aparecen en sus trazas:

1. **Verifique las etiquetas en Azure**: Compruebe que las etiquetas estén configuradas correctamente en la Logic App en Azure Portal
2. **Espere la propagación**: Los cambios de etiquetas pueden tardar 30 minutos en propagarse a las nuevas ejecuciones
3. **Active nuevas ejecuciones**: Invoque el flujo de trabajo nuevamente después de configurar las etiquetas

## ¿Necesita más ayuda? {#need-more-help}

Para preguntas o problemas adicionales no cubiertos aquí, contacte al [soporte de Datadog][5].

[1]: /es/logs/guide/azure-automated-log-forwarding/
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[4]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /es/help/
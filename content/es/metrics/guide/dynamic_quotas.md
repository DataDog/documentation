---
algolia:
  tags:
  - métricas personalizadas
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de métricas personalizadas
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Prácticas recomendadas para la gobernanza de métricas personalizadas
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Controla dinámicamente el volumen de tus métricas personalizadas con Metrics
    without LimitsTM
is_beta: true
private: true
title: Cuotas de métricas dinámicas
---

## Información general

{{< callout url="#" btn_hidden="true" header="¡Obtén la vista previa!" >}}
  Esta función se encuentra actualmente en vista previa.
{{< /callout >}} 

Las cuotas de métricas dinámicas de Datadog te ofrecen un mayor control sobre el coste de tus métricas personalizadas gracias a cuotas de métricas personalizadas para cuentas, equipos o nombres de métrica. Puedes definir un monitor de métricas en tus [métricas de uso estimado[[10] y, cuando se activa, el monitor inicia un flujo de trabajo a través de la [Automatización del flujo de trabajo][3]. 

El flujo de trabajo envía un mensaje de Slack (o Microsoft Teams) solicitando permiso para aplicar automáticamente configuraciones de [Metrics without LimitsTM][1] a las métricas desencadenantes, lo que reduce el uso y el coste de estas métricas en tu nombre. Estas actualizaciones de configuración son generadas por la información de consulta inteligente de Datadog, que utiliza una lista de las etiquetas (tags) consultadas activas para garantizar que tu configuración sea rentable y no sacrifique la visibilidad.

Consulta la [Guía de prácticas recomendadas para la gobernanza de métricas personalizadas][11] para obtener más información sobre la monitorización y prevención de excesos y picos repentinos en el uso general de las métricas personalizadas de tu cuenta.

## Configuración

### Requisitos previos

1. Una cuenta de Datadog con la [Automatización del flujo de trabajo][3] activada
2. La [integración de Slack][5] o [Microsoft Teams][12] en Datadog instalada

### Configurar proyecto

{{< img src="/metrics/guide/dynamic_quotas/automated_mwl_workflow_monitor.png" alt="Los cuadros de decisión en el proyecto de Datadog del flujo de trabajo automatizado de Metrics without LimitsTM" style="width:100%;" >}}

#### Crear un flujo de trabajo a partir del proyecto

1. Abre este [proyecto de flujo de trabajo][8] y haz clic en ***Create from Blueprint*** (Crear desde el proyecto).
2. Haz clic en el cuadro verde del monitor dentro del lienzo del flujo de trabajo y activa el conmutador ***Automatic triggering*** (Activación automática). 
3. Copia el ***Mention handle*** (Identificador de mención) del flujo de trabajo para utilizarlo en los pasos del monitor de métricas que se describen a continuación.

#### Configurar un monitor de métricas

1. Crea un [monitor de métricas][9].
2. En la sección **Choose the detection method** (Elige el método de detección), Datadog recomienda utilizar el tipo de monitor `Threshold Alert`. También puedes utilizar Detección de cambios o anomalías.
3. En la sección **Define the metric** (Definie la métrica), selecciona `datadog.estimated_usage.metrics.custom.by_metric` como nombre de métrica y elige el agregador de espacio `sum by`. 
4. En **Set alert conditions** (Establecer condiciones de alerta), define tu umbral de cuota.
5. En **Configure notifications & automations** (Configurar notificaciones y automatizaciones), actualiza el mensaje de notificación del monitor e incluye el identificador de mención del flujo de trabajo de la sección anterior.
6. Selecciona ***Multi Alert*** (Alerta múltiple) para enviar una notificación por cada cuenta, equipo, nombre de métrica u otra etiqueta especificada en el campo `sum by`.
7. Haz clic en ***Create*** (Crear) para crear el monitor de métricas.

#### Completar la configuración del flujo de trabajo

1. El proyecto del flujo de trabajo contiene varios cuadros de integración de Slack (o Microsoft Teams) que deben actualizarse. Para cada cuadro, introduce el canal o usuario(s) específico(s) que son responsable(s) de conceder permiso a Datadog para aplicar estas configuraciones de métricas rentables en tu nombre.
2. En el lienzo del flujo de trabajo, haz clic en ***Save*** (Guardar).
3. Haz clic en ***Publish*** (Publicar) y ***Run*** (Ejecutar) para empezar a gestionar automáticamente tus costes de métricas personalizadas. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/metrics-without-limits/
[2]: /es/monitors/configuration/#multi-alert
[3]: /es/service_management/workflows/
[4]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[5]: /es/integrations/slack/
[6]: /es/account_management/billing/usage_metrics/
[7]: /es/monitors/configuration/?tab=thresholdalert#set-alert-conditions
[8]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[9]: https://app.datadoghq.com/monitors/create/metric
[10]: /es/account_management/billing/usage_metrics/
[11]: /es/metrics/guide/custom_metrics_governance/#monitoring-and-prevention
[12]: https://docs.datadoghq.com/es/integrations/microsoft_teams/
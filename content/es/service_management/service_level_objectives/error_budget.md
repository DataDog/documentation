---
aliases:
- /es/monitors/service_level_objectives/error_budget/
description: Utilizar monitores para alertar acerca del consumo del presupuesto de
  errores de un SLO
further_reading:
- link: /service_management/service_level_objectives/
  tag: Documentación
  text: Visión general de Objetivos de nivel de servicio (SLOs)
title: Alertas en el presupuesto de errores
---

## Información general

Las alertas de presupuesto de errores de SLO se basan en umbrales y te notifican cuando se ha consumido un determinado porcentaje del presupuesto de errores de tu SLO. Por ejemplo, alertarme si se ha consumido el 75% del presupuesto de errores para mi objetivo de 7 días. Avisarme si se ha consumido el 50% (opcional).

Las alertas de presupuesto de errores están disponibles para los siguientes tipos de SLO:

- [SLOs basados en métricas][1], 
- [SLOs basados en monitores][2] que solo se componen de tipos de monitores de métricas (monitores de métrica, integración, métrica de APM, anomalía, predicción o monitores outlier) y
- [Time Slice SLOs (SLOs de fracción de tiempo)][8]

Para una descripción de la terminología clave en torno a los SLOs, incluidos los *error budgets* (presupuestos de error), puedes ver [Service Level Objectives (Objetivos de nivel de servicio [SLOs])][3].

{{< img src="service_management/service_level_objectives/slo-error-budget-alert-v2.png" alt="Configuración de alerta de presupuesto de error">}}

## Creación de un monitor

1. Navega hasta la [página de estado de SLO][4].
2. Crea un nuevo SLO o edita uno existente y, a continuación, haz clic en el botón **Save and Set Alert** (Guardar y configurar alerta). Para los SLOs existentes, también puedes hacer clic en el botón **Set up Alerts** (Configurar alertas) del panel lateral de detalles del SLO para acceder directamente a la configuración de la alerta.
3. Selecciona la pestaña **Error Budget** (Presupuesto de errores) en **Step 1: Setting alerting conditions** (Paso 1: Establecer las condiciones de la alerta).
4. Configura una alerta para que se active cuando el porcentaje del presupuesto de error consumido supere el valor `umbral`.
en los últimos `objetivo` días.
4. Añade [información de notificación][5] en la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones).
5. Haz clic en el botón **Create & Set Alert** (Crear y establecer alerta) de la página de configuración de SLO.

{{< img src="service_management/service_level_objectives/slo_create_set_alert.png" alt="Crear SLO y configurar una alerta de presupuesto de errores" style="width:80%;">}}

### Alertas para SLOs con grupos

Para los SLO de Time Slice que contienen grupos, puedes establecer alertas de presupuesto de errores basadas en los grupos de SLO o en el SLO general. Si envías alertas en función de los grupos, puedes confiar en la [agregación de alertas][9] para utilizar alertas simples o múltiples. Para los SLOs basados en métricas y monitores, sólo puedes establecer alertas de presupuesto de errores basadas en el SLO general.


### API y Terraform

Puedes crear alertas de presupuesto de errores de SLO utilizando el [create-monitor API endpoint (endpoint de API de creación de monitor)][6]. A continuación, se muestra un ejemplo de consulta para un monitor SLO, que alerta cuando se consume más del 75% del presupuesto de errores de un SLO. Sustituye *slo_id* por el ID alfanumérico del SLO sobre el que deseas configurar una alerta de tasa de consumo y sustituye *time_window* por uno de 7d, 30d o 90d, dependiendo de qué objetivo se utilice para configurar tu SLO:

```
error_budget("slo_id").over("time_window") > 75
```

Además, también se pueden crear alertas de presupuesto de errores de SLO utilizando el [datadog_monitor resource in Terraform (recurso datadog_monitor en Terraform)][7]. A continuación, se muestra un ejemplo de `.tf` para configurar una alerta de presupuesto de errores para un SLO basado en métrica utilizando el mismo ejemplo de consulta anterior.

**Para las versiones del proveedor v2.7.0 o anterior y v2.13.0 o posterior**.

**Nota:** Las alertas de presupuesto de errores de SLO sólo se admiten en el proveedor Terraform v2.7.0 o anterior y en el proveedor v2.13.0 o posterior. Las versiones entre v2.7.0 y v2.13.0 no son compatibles.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "SLO Error Budget Alert Example"
    type  = "slo alert"

    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Example monitor message"
    monitor_thresholds {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/service_management/service_level_objectives/metric/
[2]: /es/service_management/service_level_objectives/monitor/
[3]: /es/service_management/service_level_objectives/#key-terminology
[4]: https://app.datadoghq.com/slo
[5]: /es/monitors/notify/
[6]: /es/api/v1/monitors/#create-a-monitor
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[8]: /es/service_management/service_level_objectives/time_slice
[9]: /es/monitors/configuration/#set-alert-aggregation
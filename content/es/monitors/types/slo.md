---
aliases:
- /es/monitors/create/types/slo/
further_reading:
- link: /service_management/service_level_objectives/burn_rate
  tag: Documentación
  text: Alertas de tasas de consumo
- link: /service_management/service_level_objectives/error_budget
  tag: Documentación
  text: Alertas del total de errores
kind: Documentación
title: Alertas de SLOs
---

<div class="alert alert-info">
Este monitor está disponible para SLOs basados en métricas, SLOs basados en periodos de tiempo y SLOs basados en monitores compuestos por tipos de monitores de métricas (métricas, integraciones, métricas de APM, anomalías, predicciones o monitores de outliers).
</div>

## Información general

Los [objetivos de nivel de servicio][1], o SLOs, son una parte clave del conjunto de herramientas de ingeniería para la fiabilidad de los sitios web. Los SLOs proporcionan un marco para definir objetivos claros en lo que respecta al rendimiento de las aplicaciones, lo que, en última instancia, permite a los equipos de asistencia ofrecer una experiencia constante al cliente, equilibrar el desarrollo de funciones con la estabilidad de la plataforma, y mejorar la comunicación con los usuarios internos y externos.

## Creación de un monitor

Para crear una [alerta de SLO][2] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> SLO* (Monitores > Nuevo monitor > SLO).

### Seleccionar un SLO

Selecciona un [objetivo de nivel de servicio][1].

### Definir condiciones de alerta

Existen dos tipos de alertas:

Las [alertas del total de errores][3] te notifican cuando se ha consumido un determinado porcentaje del total de errores de tu SLO.

Las [alertas de las tasas de consumo][4] te notifican cuando la tasa de consumo del total de errores de tu SLO ha superado el umbral especificado y se mantiene durante un determinado periodo de tiempo.

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][3].

Además de las [variables de plantillas estándar][6] disponibles en todos los tipos de monitores, las alertas de SLOs también admiten las siguientes variables: 

| Variable   | Descripción   |
| ---------- | ------------- |
| `{{timeframe}}` | Ventana temporal del SLO (7, 30, 90 días). |
| `{{value}}` | Porcentaje del total de errores consumido (sólo alertas sobre el total de errores). |
| `{{short_window_burn_rate}}` | Valor de la tasa de consumo observado por la ventana corta (sólo alertas sobre la tasa de consumo). |
| `{{long_window_burn_rate}}` | Valor de la tasa de consumo observado por la ventana extensa (sólo alertas sobre la tasa de consumo). |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/service_level_objectives/
[2]: https://app.datadoghq.com/monitors/create/slo
[3]: /es/service_management/service_level_objectives/error_budget/
[4]: /es/service_management/service_level_objectives/burn_rate/
[5]: /es/monitors/notify/#overview
[6]: /es/monitors/notify/variables/?tab=is_alert#template-variables
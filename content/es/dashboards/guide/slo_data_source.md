---
disable_toc: false
kind: guía
title: Graficar datos históricos de SLOs en dashboards
---

{{< callout url="#" btn_hidden="true" header="false">}}
  La fuente de datos de SLOs está en fase beta pública. Esta función es compatible con los SLOs <strong>basados en métricas</strong> y los SLOs <strong>basados en intervalos de tiempo</strong>.
{{< /callout >}}

## Información general

Gráfica SLOs basados en métricas y en intervalos de tiempo en dashboards, y realiza un seguimiento de las tendencias a lo largo de 15 meses. También puedes aprovechar la función de [informes programados de dashboards][1] para enviar automáticamente informes visuales a las principales partes interesadas. 

## Configuración

{{< img src="dashboards/guide/slo_data_type/slo-data-source-good-events.png" alt="Configuración del editor de gráficos con el tipo de datos de slos seleccionado y la medición de eventos correcta seleccionada" style="width:100%;" >}}

Para empezar, elige uno de los tipos de visualización estándar de la bandeja de widgets de dashboard y selecciona *SLOs* como fuente de datos, en el menú desplegable de consulta. 

Para el parámetro *Measure* (Medición), consulta la siguiente tabla para obtener más información sobre lo que visualiza cada medición. El parámetro *Display* (visualización) te permite desglosar la consulta en función de los grupos que ya están configurados para el SLO. 

{{< callout url="#" btn_hidden="true" header="Key Information">}}
  Cuando se utiliza una medición de la fuente de datos de SLOs en el widget de series temporales, el valor que se muestra en cada punto se basa en el valor de agrupación predeterminado del widget, no en el período de tiempo de agrupación del SLO. Además, las correcciones de estado del SLO sólo se aplican a widgets escalares, no al widget de series temporales. 
{{< /callout >}}

| Medición | Tipo de SLO |  Widgets de series temporales  | Widgets escalares |
| -----  | ----- | ----- | ----- |
| Eventos buenos | Basados en métricas | Recuento de eventos buenos. | Suma de eventos buenos de todos los grupos. |
| Eventos malos | Basados en métricas | Recuento de eventos malos. | Suma de eventos malos de todos los grupos. |
| Minutos buenos | Intervalo de tiempo | Recuento de minutos buenos. | Suma de minutos buenos de todos los grupos. |
| Minutos malos | Intervalo de tiempo | Recuento de minutos malos. | Suma de minutos malos de todos los grupos. |
| Estado del SLO | Basado en métricas o intervalos de tiempo | Para cada bucket de tiempo, el estado de un SLO se calcula como la relación entre el número de eventos/minutos buenos y el total de eventos/minutos. | Relación entre el número de eventos/minutos buenos y el total de eventos/minutos. |
| Balance de errores restante | Basado en métricas o intervalos de tiempo | Para cada bucket de tiempo, el porcentaje del balance de errores restante. El objetivo de la [ventana temporal primaria][3] se utiliza en el cálculo del balance de errores. | Porcentaje del balance de errores que queda al final del periodo de tiempo del widget. |
| Índice de consumo | Basado en métricas o intervalos de tiempo | Para cada bucket de tiempo, el burn rate muestra la tasa de error observada, dividida por la tasa de error ideal. | Burn rate durante el periodo de tiempo del widget. |
| Balance de errores | Basado en métricas o intervalos de tiempo | El balance de errores se quema con el tiempo. Comienza en 100% (a menos que haya habido eventos/minutos malos en el primer bucket de tiempo) y disminuye con eventos/minutos malos. | El consumo de balances de errores no está disponible en widgets escalares. |



[1]: /es/dashboards/scheduled_reports/
[2]: /es/service_management/service_level_objectives/#slo-status-corrections
[3]: /es/service_management/service_level_objectives/#configuration
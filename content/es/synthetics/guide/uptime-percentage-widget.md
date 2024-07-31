---
aliases:
- /es/graphing/guide/uptime-percentage-widget
- /es/dashboards/guide/uptime-percentage-widget
further_reading:
- link: /monitors/monitor_uptime_widget/
  tag: Documentación
  text: Widget para monitorizar el tiempo de actividad
- link: /getting_started/synthetics/
  tag: Documentación
  text: Empezando con Synthetic Monitoring
title: Monitorizar el tiempo de actividad de un sitio web con SLOs
---

## Información general

Para poder cumplir los acuerdos de nivel del servicio suscritos con clientes internos y externos suele ser preciso medir el porcentaje de tiempo de actividad.

A continuación, te mostramos cómo lograrlo con la herramienta [Synthetic Monitoring][1] y el [widget de objetivos de nivel del servicio ][2] (SLOs). Para ello, usaremos `http://example.com/` como ejemplo.

## Crear un test de Synthetics

Para crear un [test de API de Synthetics][3] con `http://example.com/`, consulta [Crear un test de API simple][4].

Al hacer clic en **Test URL** (Probar URL), se rellenan las aserciones sobre el estado de tu sitio web. Ajústalas conforme a tu SLO.

## Configurar un widget de SLOs

### Crear un SLO

1. [Crea un SLO][5] para llevar un seguimiento del tiempo de actividad de tu sitio web en función de los resultados de los tests de Synthetics.
2. Selecciona **Monitor Based** (Basado en monitores) e introduce el nombre del test de Synthetics.

    {{< img src="synthetics/guide/uptime_slo/slo_config.png" alt="Configuración del SLO" >}}

3. Define el objetivo que pretendes conseguir.

    {{< img src="synthetics/guide/uptime_slo/slo_target.png" alt="Objetivo del SLO" >}}

4. Introduce un nombre, un mensaje y las etiquetas para detallar más el SLO.

    {{< img src="synthetics/guide/uptime_slo/slo_notif.png" alt="Notificación del SLO" >}}

5. Haz clic en **Save** (Guardar).

### Importar SLOs en el dashboard

1. [Crea un dashboard][6] para colocar en él el widget de SLOs.
2. Arrastra el widget de resumen de SLO y suéltalo en el dashboard.
3. Selecciona el SLO que has definido previamente.

    {{< img src="synthetics/guide/uptime_slo/slo_selection.png" alt="Selección del widget de SLOs" >}}

4. Personaliza el widget de SLOs según tus necesidades.

    {{< img src="synthetics/guide/uptime_slo/slo_widget_configs.png" alt="Configuración del widget de SLOs" >}}

5. Dale al widget un nombre descriptivo y haz clic en **Done** (Hecho).

    {{< img src="synthetics/guide/uptime_slo/final_dashboard.png" alt="Dashboard final" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/
[2]: /es/dashboards/widgets/slo/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /es/getting_started/synthetics/api_test#define-request
[5]: https://app.datadoghq.com/slo/new
[6]: https://app.datadoghq.com/dashboard/lists
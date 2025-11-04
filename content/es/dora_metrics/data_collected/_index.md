---
further_reading:
- link: /dora_metrics/
  tag: Documentación
  text: Más información sobre DORA Metrics
- link: /dora_metrics/setup/
  tag: Documentación
  text: Configuración de fuentes de datos de DORA Metrics
- link: /metrics/
  tag: Documentación
  text: Más información sobre métricas
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con etiquetas (tags)
title: Datos recopilados de DORA Metrics
---

<div class="alert alert-danger">DORA Metrics están en fase de Vista previa.</div>

## Información general

DORA Metrics genera [métricas][9] para cada una de las cuatro DORA Metrics principales, así como eventos con etiquetas y atributos asociados, disponibles en el [Explorador de eventos][1].

## Métricas predeterminadas

DORA Metrics proporciona las siguientes métricas predeterminadas:

| Métrica | Tipo | Descripción |
| :--- | :--- | :--- |
| `dora.deployments.count` | count | Número de despliegues detectados por Datadog en función de tu [fuente de datos de despliegue][10] seleccionada.
| `dora.change_lead_time` | distribución | Antigüedad en `seconds` de los commits de Git asociadas en el momento del despliegue.
| `dora.incidents_impact` | count | Realiza un seguimiento de los servicios o equipos afectados por incidentes. Se utiliza para la tasa de fracaso de los cambios con la fórmula `dora.incidents_impact / dora.deployments.count`. Para explicar la diferencia de tiempo entre los despliegues y el momento en que se produce el impacto, se recomienda utilizar un rollup de al menos 1 semana.
| `dora.time_to_restore` | distribución | Tiempo en `seconds` entre las marcas de tiempo `started_at` y `finished_at` de un incidente.

### Etiquetas predeterminadas

Todas las métricas personalizadas contienen los siguientes etiquetas, si hay alguna disponible:

- `service`
- `team`
- `env`
- `repository_id`

**Nota**: La etiqueta `severity` está disponible para las métricas `dora.incidents_impact` y `dora.time_to_restore` cuando es proporcionada por la fuente de datos del fallo.

Para obtener más información sobre el uso de las etiquetas `env`, `service` y `version`, consulta [Empezando con etiquetas][6].

## Métricas del tiempo del ciclo de cambio

Datadog desglosa el tiempo del ciclo de cambio en las siguientes métricas, que representan las diferentes etapas desde la creación del commit hasta su despliegue.

| Métrica | Tipo | Descripción |
|---|---|---|
| `dora.time_to_pr_ready` | duración | Tiempo desde que se crea el commit hasta que la solicitud push (PR) está lista para su revisión. Esta métrica sólo está disponible para los commits que se hicieron antes de que la solicitud push (PR) fuera marcada como lista para su revisión. |
| `dora.review_time` | duración | Tiempo transcurrido desde que la solicitud push (PR) se marca como lista para su revisión hasta que recibe la última aprobación. Esta métrica sólo está disponible para los commits que se hicieron antes de que se aprobara la solicitud push (PR). |
| `dora.merge_time` | duración | Tiempo transcurrido desde la última aprobación hasta que se fusiona la solicitud push (PR). |
| `dora.time_to_deploy` | duración | Tiempo transcurrido desde la fusión de la solicitud push (PR) hasta el inicio del despliegue. Si un commit no tiene una solicitud push (PR) asociada, esta métrica se calcula como el tiempo desde la creación del commit hasta el inicio del despliegue. |
| `dora.deploy_time` | duración | Tiempo transcurrido desde el inicio del despliegue hasta su finalización. Esta métrica no está disponible si no hay información sobre la duración del despliegue. |

Estas métricas sólo se computan cuando la fuente de metadatos del repositorio es GitHub. Debe haber una solicitud push (PR) asociada a un commit, si lo hay. Un commit está asociado a una solicitud push (PR) si el commit se introduce por primera vez en la rama de destino cuando se fusiona esa solicitud push (PR). Si un commit no tiene una solicitud push (PR) asociada, sólo estarán disponibles las métricas `dora.time_to_deploy` y `dora.deploy_time`.

**Notas:**

- Estas métricas se emiten por cada commit y no por cada despliegue.
- Existen varios casos límites dependiendo de la forma en que se introdujeron los commits en el despliegue. Consulta las [limitaciones][12].

## Examinar métricas en Gestión de eventos

Las DORA Metrics predeterminadas están disponibles en el [Explorador de eventos][1]. Para buscar y filtrar tus eventos de DORA Metrics, ve a [**Service Management** > **Event Management** > **Explorer** (Gestión de servicios > Gestión de eventos > Explorador][11] e introduce `source:software_delivery_insights` en la consulta de búsqueda.

{{< img src="dora_metrics/events.png" alt="Eventos recopilados de DORA Metrics en el Explorador de eventos" style="width:100%;" >}}

Estas métricas pueden consultarse mediante programación utilizando los endpoints de la API [Consulta de puntos de series temporales][5] y [Consulta de datos de series temporales de varios productos][6] con la fuente `software_delivery_insights`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/events/explorer/
[2]: /es/api/latest/metrics/#query-timeseries-points
[3]: /es/api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /es/getting_started/tagging/
[7]: /es/api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/es/metrics/
[10]: /es/dora_metrics/setup/deployments/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /es/dora_metrics/deployments/#limitations
---
aliases:
- /es/synthetics/private_locations/monitoring
description: Monitorizar tus localizaciones privadas
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentación
  text: Empezando con las localizaciones privadas
- link: synthetics/private_locations/dimensioning
  tag: Documentación
  text: Dimensionar tus ubicaciones privadas
- link: agent/
  tag: Documentación
  text: Instalar el Datadog Agent
title: Monitorización de tus localizaciones privadas
---

## Información general

Dispones de un conjunto de [métricas][1] predefinidas para realizar un seguimiento de alto nivel del estado de tus localizaciones privadas. Puedes visualizarlas en el panel lateral de cada una de tus localizaciones privadas en la página [Parámetros][2] o en forma de gráfica en un [dashboard][3].

{{<img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Private location monitor list" style="width:100%;">}}

En [**Parámetros de Synthetics**][2], la pestaña **Localizaciones privadas** muestra todas tus localizaciones privadas, junto con el estado de sus informes y el estado de los monitores.

Al hacer clic en una localización privada, aparece un panel que contiene información del **Estado** y los **Metadatos**. La tabla de la pestaña **Estado** muestra todos los workers que informan y la versión de imagen que están ejecutando. Esto de da una idea de cuántos workers necesitas extraer para la nueva versión de imagen.

En **Monitores** puedes ver avisos de estado, como `ALERT`, cuando algo no funciona como debería en una de tus localizaciones privadas. Por ejemplo, si la localización privada deja de informar, significa que tiene un menor aprovisionamiento o que un worker está ejecutando una versión de imagen obsoleta.

{{<img src="synthetics/private_locations/pl_monitoring_side_panel.png" alt="Private location monitoring side panel" style="width:100%;">}}

## Monitores predeterminados

Al crear una localización privada, se añaden tres monitores a tu cuenta:

| Nombre del monitor                                                                        | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Las [Localizaciones privadas Synthetic] {{location_id.name}} han dejado de informar**              | Este monitor activa una alerta `NO DATA` cuando la métrica [`synthetics.pl.worker.running`][1] deja de informar datos de una de tus localizaciones privadas. Esto indica que los workers de tu localización privada pueden haber sido eliminados o haber dejado de funcionar.                                                                                                                                                                                                                                                                                  |
| **Las [Localizaciones privadas Synthetic] {{location_id.name}} tienen un menor aprovisionamiento**            | Este monitor activa una `ALERT` cuando la métrica [`synthetics.pl.worker.remaining_slots`][1] baja de 1,5 de media durante 30 minutos. Esto indica que tu localización privada tiene un menor aprovisionamiento. [Escala vertical u horizontalmente tu localización privada][4] para garantizar que dispones de recursos suficientes para ejecutar todos los tests que tiene asignados.                                                                                                                                                      |
| **Las [Localizaciones privadas Synthetic] {{location_id.name}} utilizan una versión de imagen obsoleta** | Esto Monitor activa una `ALERT` cuando la métrica [`synthetics.pl.worker.outdated`][1] comienza a informar `1` sobre una de tus localizaciones privadas. Esto indica que al menos uno de los workers de tu localización privada está ejecutando una versión obsoleta de la imagen de la localización privada. Busca la última versión de la imagen en el [registro de contenedores Google][5] o en la [lista de Windows Installer][8] y actualiza tus workers a esa versión de la imagen extrayendo la imagen `datadog/synthetics-private-location-worker` con la etiqueta (tag) `latest`. |

No existe ningún identificador definido en estos monitores. Para recibir una alerta en caso de que uno de tus monitores empiece a fallar, añade un identificador en la [sección de notificaciones][6] de tu monitor.

Los monitores de la pestaña **Monitores** pueden tener un grupo que corresponda con el ID de tu localización privada o estar etiquetados con `location_id:<ID_OF_THE_PL>`.

## Monitorizar tus localizaciones privadas con el Datadog Agent

Además de las métricas para localizaciones privadas predefinidas, Datadog recomienda instalar el [Datadog Agent][7] junto con tu localización privada. 

El [Datadog Agent ][7] permite una visibilidad en profundidad de tus localizaciones privadas proporcionando métricas de estado de los workers subyacentes (como el uso de memoria, límites, CPU y disco). Puedes crear un gráfico utilizando estas métricas y definir una alerta para recursos bajos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/synthetics/metrics/
[2]: https://app.datadoghq.com/synthetics/settings/private-locations
[3]: /es/dashboards/
[4]: /es/synthetics/private_locations/dimensioning
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
[6]: /es/monitors/notify/
[7]: /es/agent/
[8]: https://ddsynthetics-windows.s3.amazonaws.com/installers.json
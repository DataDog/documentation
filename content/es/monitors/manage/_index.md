---
aliases:
- /es/monitors/manage_monitor/
description: Enviar notificaciones a tus equipos cuando los monitores activan alertas
further_reading:
- link: /monitors/
  tag: Documentación
  text: Crear Monitors
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de los monitores
- link: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
  tag: Blog
  text: Prácticas recomendadas para el etiquetado de tus monitores
kind: documentación
title: Gestionar monitores
---

Utiliza la página [Gestionar monitores][1] para buscar, borrar, silenciar o resolver tus monitores y editar etiquetas (tags) de monitores en bloque. También puedes clonar o editar monitores individuales a partir de los resultados de búsquedas.

{{< img src="monitors/manage_monitor/monitor_page.jpg" alt="manage monitor page" (Página de gestión de monitores"  >}}

## Buscar

Para [buscar tus monitores][2], crea una consulta utilizando el panel de facetas a la izquierda o la barra de búsqueda en la parte superior.

## Gestionar

Tras la búsqueda, selecciona uno o varios monitores para actualizarlos utilizando las casillas de verificación situadas junto a cada resultado. Selecciona todos los resultados con la casilla de verificación superior situada junto al encabezado de la columna *STATUS*. Modifica los monitores en bloque utilizando los botones situados a la derecha, arriba de los resultados de búsqueda:

| Opción     | Descripción                                                                      |
|------------|----------------------------------------------------------------------------------|
| Silenciar       | [Silencia][3] los monitores seleccionados para `1h`, `4h`, `12h`, `1d`, `1w` o `Forever`. |
| Desactivar el silenciado     | Si los monitores seleccionadas están silenciados, desactiva el silenciado.                                 |
| Resolver    | [Resuelve][4] la alerta de los monitores seleccionados.                                |
| Eliminar     | Borra los monitores seleccionados.                                                    |
| Editar etiquetas (tags)  | Edita las etiquetas de monitor de los monitores seleccionados.                                 |
| Editar equipos | Edita los [equipos][5] de los monitores seleccionados.                                  |

Para editar un monitor individual, sitúate sobre él y utiliza los botones situados en el extremo derecho: Edit (Editar), Clone (Clonar), Mute (Silenciar), Delete (Borrar). Para ver más detalles sobre un monitor, haz clic en su nombre para ver la página de estado.

**Nota**: Puedes ver vistas guardadas de monitores desde la pantalla de inicio de tu dispositivo móvil, o ver y silenciar monitores descargando la [aplicación móvil de Datadog][6], disponible en la [Apple App Store][7] y en [Google Play Store][8].

### Monitores activados

Puedes [silenciar][3] o [resolver][4] monitores activados en bloque utilizando la página [ Monitores activados][9]. Esta página sólo muestra monitores con un estado activado (Alerta, Advertencia o Sin datos).

#### Resultados agrupados

La página de monitores activados muestra una fila por cada grupo (fuente de información) de cada monitor. Por ejemplo, un monitor agrupado por host con 14 hosts en estado activado muestra 14 filas en la página de monitores activados. Esto te permite silenciar o [resolver][3] un monitor para fuentes de informes específicas.

Al escribir una consulta de búsqueda, están disponibles los mismos atributos de la página de gestión de monitores, aunque no se muestren como casillas de verificación en la página de monitores activados.

Diferencias de atributos de la página de monitores activados:

* `group_status` es el nombre del atributo, en lugar de `status`.
* El atributo `triggered` te permite filtrar monitores por el tiempo que han estado activados.
* El atributo `group` te ayuda a limitar los resultados de búsquedas para monitores agrupados por más de un etiqueta. Por ejemplo, un monitor está agrupado por `host` y `env`. Tras la búsqueda, verás cuatro filas con los grupos `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod` y `host:web02,env:prod`. Utiliza el atributo `group` para mostrar sólo hosts prod (`group:"env:prod"`) o hosts web02 (`group:"host:web02"`).

### Etiquetas de monitor

Las etiquetas de monitor son independientes de las etiquetas enviadas por el Agent o por las integraciones. Añade hasta 80 etiquetas directamente a tus monitores para filtrarlos en las páginas [Gestionar monitores][1], [Monitores activados][9] o [Gestionar el tiempo de inactividad][10]. Para obtener más información sobre las etiquetas de monitor, consulta [Asignar etiquetas (etiquetas para la interfaz de usuario][11].

**Nota**: Las etiquetas de monitor se añaden al evento de alerta generado por el monitor.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /es/monitors/manage/search/
[3]: /es/monitors/manage/status/#mute
[4]: /es/monitors/manage/status/#resolve
[5]: /es/account_management/teams/
[6]: /es/service_management/mobile/#monitors
[7]: https://apps.apple.com/app/datadog/id1391380318
[8]: https://play.google.com/store/apps/details?id=com.datadog.app
[9]: https://app.datadoghq.com/monitors/triggered
[10]: https://app.datadoghq.com/monitors#downtime
[11]: /es/getting_started/tagging/assigning_tags/?tab=monitors#ui
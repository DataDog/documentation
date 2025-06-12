---
title: Detección automática de una implementación con errores
---

## Información general

La detección automática de una implementación con errores permite identificar errores de implementación de código en minutos, lo que reduce el tiempo medio de detección (MTTD). Cada vez que se implementa código en un entorno de producción, Watchdog compara el rendimiento de la nueva versión de código con el de las versiones anteriores para detectar nuevos tipos de errores o incrementos de la tasa de error generados en una implementación. Si Watchdog detecta que una nueva implementación presenta errores, la página de servicios de APM muestra información detallada sobre el servicio afectado, además de la página de recursos de los endpoints afectados.

Cuando Watchdog detecta que una versión actualmente activa contiene errores, lo indica mediante un banner rosa en la parte superior de la página de detalles del servicio, como se muestra en la siguiente captura de pantalla. La tabla de implementaciones de la parte inferior de la pantalla, que presenta un historial de implementaciones de servicio, también indica las versiones con errores que Watchdog ha encontrado en el pasado.

{{< img src="watchdog/faulty_deployment_redesigned_cropped.png" alt="Página de servicios de APM que muestra el banner rosa en la parte superior y la tabla de implementaciones en la parte inferior" >}}

Haz clic en **View Details** (Ver detalles) en el banner para abrir un panel desplegable con información adicional sobre la implementación con errores. Esta vista proporciona detalles al respecto, que pueden incluir lo siguiente:

- Gráficos de incrementos de la tasa de error
- El tipo de error de los errores recientemente detectados
- El endpoint afectado
- El código de estado HTTP

También se puede acceder a esta vista haciendo clic en cualquier versión en la tabla de implementaciones. La siguiente captura de pantalla muestra un ejemplo de esta vista detallada, en la que el tipo de error `db.utils.OperationalError` afecta al endpoint ` /inventory`, lo que da lugar al código de estado HTTP `(500)`.

{{< img src="watchdog/faulty_deployment_details_redesigned_cropped.png" alt="Panel de seguimiento con los detalles de la implementación con errores" >}}

Siempre que se detecta una implementación con errores, Watchdog la añade como evento en el [explorador de eventos][2]. Puedes configurar un monitor para recibir notificaciones automáticas sobre estos eventos. Para ello, ve a la página [New Monitors (Nuevos monitores)][3], selecciona **Events** (Eventos) e incluye `tags:deployment_analysis` en la consulta de búsqueda que define el monitor.

También puedes activar el monitor haciendo clic en el botón **Suggested Monitors** (Monitores sugeridos) y luego en **Enable** (Activar). Este botón sólo se encuentra disponible si el servicio no tiene aún un monitor configurado. Si no aparece, sigue la instrucción anterior para crear el monitor desde la página [New Monitors (Nuevos monitores)][3].

Cada implementación se analiza repetidamente. Para evitar volver a alertar sobre la misma implementación con errores, Datadog recomienda configurar un tiempo de recuperación de 60 minutos para el monitor.

{{< img src="watchdog/faulty_deployment_suggested_monitors_redesigned_cropped.png" alt="Página de servicios de APM con el botón de monitores sugerido" >}}

### ¿Por qué una nueva implementación no se ha etiquetado con errores, a pesar de tenerlos?

Watchdog intenta determinar si la nueva implementación es la causa verosímil de los errores. Podría determinar que no es así, a través de cualquier combinación de las siguientes razones:

- Los errores de este tipo no parecen ser nuevos. Aparecen en versiones anteriores o durante implementaciones recientes.
- Los errores de este tipo son poco numerosos y transitorios. Desaparecen con el tiempo, incluso cuando se mantiene la nueva versión.
- No hubo suficientes implementaciones anteriores en el historial reciente para que Watchdog pueda establecer una referencia para el análisis.
- La tasa de error de la nueva versión no ha sido significativamente superior a la de las versiones anteriores.
- Este patrón de error es común durante las implementaciones del servicio, incluso cuando la nueva versión del código no presenta errores.

[2]: /es/service_management/events/explorer
[3]: https://app.datadoghq.com/monitors/create
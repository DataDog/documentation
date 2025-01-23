---
aliases:
- /es/tracing/trace_search_and_analytics/request_flow_map
description: Búsqueda y análisis de traza
further_reading:
- link: https://www.datadoghq.com/blog/apm-request-flow-map-datadog
  tag: Blog
  text: Más información sobre los mapas de flujo de solicitudes
title: Mapa de flujos de solicitudes
---

{{< img src="tracing/live_search_and_analytics/request_flow_map/Overview.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Mapa de flujo de solicitudes" >}}

Los _mapas de flujo de solicitudes_ combinan dos características clave de Datadog APM: el [Mapa de servicios][1] y [live exploring][2], para ayudar comprender y seguir las rutas de las solicitudes a través de tu stack. Identifica rápidamente los servicios problemáticos y los puntos de ajuste, o cuántas llamadas a la base de datos genera una solicitud a un endpoint específico.

No se requiere una configuración adicional para utilizar estos mapas de flujo, y se alimentan de tus [tramos (spans) ingeridos][3]. Limita tus trazas (traces) LIVE (últimos 15 minutos) a cualquier combinación de etiquetas (tags) y genera un mapa dinámico que represente el flujo de solicitudes entre cada servicio. El mapa se genera automáticamente basándose en tus criterios de búsqueda, y se regenerará en directo tras cualquier cambio.

## Navegar por el mapa de flujo de solicitudes

- Pasa el ratón por encima de una esquina que conecte dos servicios para ver métricas de solicitudes, errores y latencia para las solicitudes entre esos dos servicios que coinciden con los parámetros de consulta.

- Las conexiones de mayor caudal aparecen resaltadas para mostrar la ruta más común.

- Haz clic en **Export** (Exportar) para guardar una imagen PNG del mapa de flujo de solicitudes actual. Esta es una gran manera de generar un diagrama de arquitectura en directo, o uno limitado a un flujo de usuario específico.

{{< img src="tracing/live_search_and_analytics/request_flow_map/ServicePanel.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Panel lateral del mapa de flujo para información del servicio" >}}

- Haz clic en cualquier servicio del mapa para ver la información general sobre el estado y el rendimiento de ese servicio (rendimiento, latencia, tasas de error, estado de monitor), junto con las métricas de infraestructura y tiempo de ejecución.

- El mapa selecciona automáticamente una disposición adecuada en función del número de servicios presentes, y puedes hacer clic en **Cluster** (Clúster) o **Flow** (Flujo) para cambiar entre las dos disposiciones disponibles.

- Las aplicaciones RUM están representadas en el mapa de flujo de solicitudes si se han [conectado RUM y trazas][4].

{{< img src="tracing/live_search_and_analytics/request_flow_map/RUMService.mp4" alt="Enlace del servicio RUM del mapa de flujo" video=true style="width:100%;">}}

Prueba el [mapa de flujo de solicitudes en la aplicación][5]. Para empezar, limita una consulta sencilla, como un único servicio o endpoint.

### Ejemplos

Utiliza el mapa de flujo de solicitudes para investigar el comportamiento de tu aplicación:

- Busca un [recurso][6] que corresponda a una solicitud HTTP concreta.

- Si utilizas [despliegues shadow][7] o indicadores de características configuradas como etiquetas de tramo personalizadas, utiliza el mapa para comparar la latencia de las solicitudes entre ellas. Este es un gran complemento de preproducción del [seguimiento de despliegues][9] para observar cómo los posibles cambios de código afectarán a la latencia de las versiones desplegadas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/services_map/
[2]: /es/tracing/trace_explorer/
[3]: /es/tracing/trace_pipeline/ingestion_controls
[4]: /es/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[5]: https://app.datadoghq.com/apm/flow-map
[6]: /es/tracing/glossary/#resources
[7]: /es/tracing/services/deployment_tracking/#shadow-deploys
[9]: /es/tracing/services/deployment_tracking/
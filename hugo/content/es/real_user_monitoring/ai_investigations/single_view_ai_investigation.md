---
description: Realiza una investigación agentiva en una única visualización de RUM
  para identificar las causas raíz de una mala experiencia de usuario.
further_reading:
- link: /real_user_monitoring/ai_investigations/
  tag: Documentación
  text: Resumen de AI Investigations
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explorador de RUM
- link: /real_user_monitoring/explorer/events/
  tag: Documentación
  text: Panel lateral de eventos de visualización
title: Investigación de AI de Visualización Única
---
## Resumen {#overview}

La investigación de AI de Visualización Única realiza un análisis de causas raíz agentivo en una única visualización de RUM. Cuando encuentre una sesión con un rendimiento deficiente, como una página o pantalla que cargó lentamente o generó errores, haga clic en **Investigate with AI**. El agente de RUM de Datadog inspecciona todos los datos adjuntos a esa vista: errores, solicitudes de red lentas, bloqueo del hilo principal, trazas de backend, perfiles de CPU y contexto del dispositivo.

En lugar de revisar manualmente los eventos de RUM para determinar si la causa fue una llamada a la API lenta, una computación intensiva del lado del cliente o un problema de CDN, obtiene una lista clasificada de hallazgos agrupados por categoría de causa raíz: Rendimiento de la Aplicación, Lado del Servidor, Terceros y Entorno. A partir de ahí, puede hacer un seguimiento a través de una interfaz de chat o guardar los resultados en un [Notebook][1] para compartir con su equipo.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="El panel de Investigación de AI de Visualización Única que muestra hallazgos categorizados para una visualización de RUM." style="width:100%;" >}}

## Iniciar una investigación {#launch-an-investigation}

1. Abrir un panel lateral de visualización de RUM.
2. Haga clic en el botón **Investigate with AI**.

   **Note**: El botón puede tardar hasta 15 minutos en estar disponible después de que finalice una visualización.

La investigación se ejecuta y transmite resultados al panel lateral a medida que están disponibles, por lo que puede comenzar a leer los primeros hallazgos antes de que se complete el análisis.

## Lo que investiga el agente {#what-the-agent-investigates}

Para investigar una visualización, el agente de RUM de Datadog inspecciona los datos que Datadog ha recopilado para esa visualización y accede a la telemetría correlacionada cuando está disponible:

- **El evento de visualización** y sus subeventos: [recursos][2], [tareas largas][3], [errores][4] y [acciones del usuario][5].
- **Señales de rendimiento agregadas** a través de la visualización, incluyendo problemas detectados automáticamente como recursos no comprimidos, evaluación excesiva de scripts y ineficiencias de ancho de banda.
- **Contexto de dispositivo y entorno** capturado por el SDK (navegador o sistema operativo, geografía, tipo de conexión y otros [atributos de RUM][6]).
- **Trazas de APM**, cuando los recursos de la visualización están correlacionados con trazas de backend. El agente utiliza los datos de traza para atribuir retrasos del lado del servidor a tramos y servicios específicos. Para más información, consulte [Correlacionar RUM con Trazas de APM][7].
- **Datos de perfilado**, cuando se habilita [RUM profiling correlation][8] para la aplicación. El agente utiliza perfiles de CPU para atribuir hallazgos de App Performance a funciones específicas en su código.

Cuanto más ricos sean los datos disponibles para la visualización, más precisa será el análisis. Correlacionar RUM con APM y habilitar el perfilado ayuda al agente a investigar más allá de la línea de tiempo del lado del cliente.

## Fuentes de causas raíz{#sources-of-root-causes}

El agente de RUM de Datadog examina cuatro fuentes para identificar las causas raíz del bajo rendimiento en una visualización:

| Fuente            | Qué se examina                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| App Performance   | Problemas del lado del cliente, como contención del hilo principal, ejecución de código y retrasos en el renderizado.               |
| Lado del Servidor       | Latencia de backend y errores del lado del servidor que afectaron la visualización.                                                |
| Terceros       | Impacto en el rendimiento de scripts y bibliotecas de terceros cargados por la aplicación.                                 |
| Entorno       | Condiciones de red e infraestructura que afectaron la experiencia del usuario.                                    |

## Lea los resultados {#read-the-results}

Cada hallazgo se muestra como una tarjeta con un título, una descripción del problema, un nivel de severidad y enlaces a los eventos afectados. Múltiples hallazgos aparecen clasificados por impacto para que pueda enfocarse primero en los problemas de mayor impacto.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-results.png" alt="Panel de resultados que muestra hallazgos clasificados con severidad, descripciones y enlaces a los eventos afectados." style="width:70%;" >}}

Una interfaz de chat ligera le permite hacer un seguimiento del análisis: preguntar por más detalles sobre un hallazgo específico, solicitar contexto adicional o explorar síntomas relacionados.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-chat.png" alt="Una interfaz de chat que invita al usuario a hacer preguntas de seguimiento sobre los problemas encontrados en la visualización." style="width:70%;" >}}

## Tome acción {#take-action}

Después de que se complete una investigación, puede actuar sobre los hallazgos sin salir del panel:

- **Guardar en un Notebook**: Exporta la línea de tiempo completa y los hallazgos a un [Notebook][1] para compartir con su equipo.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/
[2]: /es/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[3]: /es/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[4]: /es/real_user_monitoring/error_tracking/
[5]: /es/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[6]: /es/real_user_monitoring/explorer/search/
[7]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: /es/real_user_monitoring/correlate_with_other_telemetry/profiling/
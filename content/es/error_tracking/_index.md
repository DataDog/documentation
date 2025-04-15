---
disable_toc: false
title: Error Tracking
---

## Información general

{{< img src="error_tracking/error-tracking-overview-2.png" alt="Detalles de un incidente en el Explorador de seguimiento de erores" style="width:100%;" >}}

{{% error-tracking-description %}}

Existen funciones adicionales disponibles en función del origen del error. Consulta las [fuentes de error admitidas](#supported-error-sources).

## Para empezar

- Echa un vistazo a las principales funciones de seguimiento de errores en la documentación del [Explorador de seguimiento de errores][5].
- Utiliza los enlaces específicos del producto de la siguiente sección para configurar el Seguimiento de errores para una fuente de error concreta.

## Fuentes de error admitidas

El Seguimiento de errores captura y procesa errores de tus aplicaciones web, móviles y backend. Puedes instrumentar tus aplicaciones y servicios utilizando el [SDK del navegador][6], el [SDK móvil][7] o los errores de ingesta de tus logs, trazas (traces) y eventos de Real User Monitoring.

Existen funciones adicionales en función del origen del error. Por ejemplo, en los errores originados por una traza de APM, la función [Repetición de ejecución][4] captura automáticamente los valores de las variables de producción. 

Para ver más detalles, consulta la documentación de Seguimiento de errores específica del producto:

- [APM][1]
- [Log Management][2]
- [Real User Monitoring][3]

[1]: /es/tracing/error_tracking#setup
[2]: /es/logs/error_tracking#setup
[3]: /es/real_user_monitoring/error_tracking#setup
[4]: /es/tracing/error_tracking/execution_replay
[5]: /es/error_tracking/explorer
[6]: /es/error_tracking/frontend/browser
[7]: /es/error_tracking/frontend/mobile
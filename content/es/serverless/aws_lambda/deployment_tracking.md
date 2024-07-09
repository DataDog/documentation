---
aliases:
- /es/serverless/deployment_tracking
further_reading:
- link: /serverless/distributed_tracing
  tag: Documentación
  text: Rastreo distribuido para aplicaciones serverless
- link: /serverless/serverless_tagging
  tag: Documentación
  text: Etiquetado serverless
kind: documentación
title: Seguimiento del despliegue de aplicaciones serverless de AWS Lambda
---

El seguimiento del despliegue te ayuda a comprender cuándo una nueva versión de código o un cambio en la configuración provoca un pico de errores, una disminución del rendimiento o que tu entorno de nube se desvíe de su estado esperado.

Para acceder al seguimiento del despliegue de tus aplicaciones serverless, selecciona una función en la [vista Serverless][1] para abrir un panel lateral y haz clic en la pestaña **Deployments** (Despliegues). Esto muestra métricas serverless clave como invocaciones, duración de la ejecución y recuentos de errores que se exhiben automáticamente con superposiciones de eventos que marcan despliegues de código y cambios de configuración relacionados con la función.

Para ver el historial de cambios en el código y en la configuración, ajusta el selector de tiempo global situado en la parte superior derecha de la vista.

## Configuración

Datadog recopila eventos de cambios de código y configuración en tus funciones de AWS Lambda desde AWS CloudTrail.

Si aún no lo hiciste, configura primero la integración de [Amazon Web Services][2]. Luego, añade el siguiente permiso al documento de la política de tu rol de AWS/Datadog:

```text
cloudtrail:LookupEvents
```

Si ya añadiste el permiso, pero sigues sin ver eventos para cualquiera de tus funciones de AWS Lambda, habilita el seguimiento del despliegue mediante cuadro de la integración de AWS Lambda.

{{< img src="serverless/lambda_integration_settings.png" alt="Parámetros de la integración de Lambda" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/integrations/amazon_web_services/#setup
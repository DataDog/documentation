---
description: Monitoriza datos reales de usuarios y el rendimiento del frontend con
  el kit de desarrollo de software (SDK) del navegador de Datadog RUM para optimizar
  las experiencias web e identificar problemas en toda la pila.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Información sobre el explorador RUM
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Información sobre el SDK del navegador para logs de Datadog
title: Monitorización del RUM Browser
---

## Información general

En Real User Monitoring (RUM) de Datadog, se proporciona información detallada del rendimiento del frontend de tu aplicación. Monitoriza datos reales del usuario para optimizar tu experiencia web y proporcionar experiencias del usuario. Correlaciona tests Sintético, métricas, trazas (traces) y logs de backend en un único lugar para identificar y solucionar problemas de rendimiento en todo el stack tecnológico.

Datadog te ayuda a comprender el nivel actual de la experiencia del usuario, identificar áreas de mejora y medir el éxito de cada cambio y/o implementación. Utiliza esta información para identificar y solucionar problemas inesperados del frontend antes de que los usuarios se vean afectados para ofrecer la mejor experiencia.

Con el SDK del RUM Browser de Datadog, también puedes:

- Monitorizar las vistas de páginas y el rendimiento de tu aplicación para investigar problemas de rendimiento
- Obtén una visibilidad completa e integral de los recursos y las solicitudes (como imágenes, archivos CSS, activos de JavaScript y archivos de fuentes)
- Recopilar y monitorizar automáticamente cualquier evento interesante con todo el contexto pertinente y recopilar manualmente los errores que no se rastrean automáticamente
- Realizar un rastreo de las interacciones del usuario que se han llevado a cabo durante el recorrido del usuario para obtener información sobre su comportamiento y, al mismo tiempo, cumplir los requisitos de privacidad
- Sacar a la luz los puntos débiles de los usuarios con señales de frustración
- Determinar la causa de un error hasta la línea de código para solucionarlo

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Dashboard de resumen de rendimiento de RUM" style="width:100%;">}}

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los SDK de RUM. Obtén más información sobre la [responsabilidad compartida][1].

## Empezando

{{< whatsnext desc="Para comenzar con el SDK de RUM Browser, sigue los pasos para crear una aplicación RUM basada en cómo se ofrece tu aplicación:" >}}
  {{< nextlink href="/real_user_monitoring/browser/setup/client">}}<u>Lado del cliente</u>: instrumenta cada una de tus aplicaciones web basadas en el navegador, despliega la aplicación y, a continuación, configura los parámetros de inicialización que deseas rastrear y utiliza la configuración avanzada para gestionar mejor los datos y el contexto que recopila RUM.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/browser/setup/server">}}<u>Instrumentación automática</u>: inyecta un scriptlet de RUM SDK JavaScript en las respuestas HTML de tus aplicaciones web que se ofrecen mediante un servidor web o proxy.{{< /nextlink >}}
{{< /whatsnext >}}

Desde aquí, puedes modificar los [datos y el contexto][2] que el SDK del RUM Browser recopila para satisfacer tus necesidades específicas. Aprende a sustituir la configuración predeterminada en [Configuración avanzada][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_security/real_user_monitoring/#shared-responsibility
[2]: /es/real_user_monitoring/browser/data_collected/
[3]: /es/real_user_monitoring/browser/advanced_configuration/
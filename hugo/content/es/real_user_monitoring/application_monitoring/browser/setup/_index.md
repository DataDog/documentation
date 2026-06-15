---
aliases:
- /es/real_user_monitoring/browser/setup/
description: Comprende tus opciones para configurar el SDK del navegador RUM.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentación
  text: Monitorización del Navegador RUM
title: Configuración de monitorización del navegador
---

## Configuración

{{< whatsnext desc="Elige el tipo de instrumentación para el SDK de navegador:" >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Lado del cliente</u>: instrumenta cada una de tus aplicaciones web basadas en el navegador, despliega la aplicación y, luego, configura los parámetros de inicialización que deseas rastrear y usa la configuración avanzada para gestionar mejor los datos y el contexto que recopila RUM.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Autoinstrumentación</u>: inyecta un scriptlet de RUM SDK JavaScript en las respuestas HTML de tus aplicaciones web que se envían a través de un servidor web o proxy.{{< /nextlink >}}
{{< /whatsnext >}}

## Cómo elegir el tipo de instrumentación

| | Instrumentación automática (Vista previa) | Del lado del cliente (manual) |
|----------------------|--------------------------------|----------------------|
| **Mecanismo de configuración del SDK** | [Automáticamente][1] añade RUM JS al HTML de tu aplicación web. Una vez configurada la instrumentación automática de RUM, gestiona las configuraciones desde la interfaz de usuario. | [Manualmente][2] añade el SDK de RUM al código de tu aplicación y gestiona las configuraciones en el código. |
| **Se requieren cambios de código** | No | Sí |
| **Complejidad de la instalación** | Bajo | Medio |
| **Grupos de usuarios** | **Los equipos de ingeniería y SRE** sin acceso al código frontend, o **los equipos que necesitan gestionar** todas las necesidades de observabilidad de forma centralizada, pueden encontrar esto útil para: <br>  - Desbloquear datos de rendimiento en todas las aplicaciones al configurar RUM <br> - De forma holística monitorizar el rendimiento de aplicaciones en toda la organización | **Los equipos de ingeniería de frontend, ingeniería móvil o producto** con acceso al código de frontend pueden encontrar útil este método para: <br>  - Necesidades diarias de ingeniería (por ejemplo: soporte en vivo, solucionar problemas y checks de estados para servicios descendentes) <br> -Necesidades de producto (por ejemplo: análisis de flujo de usuarios, segmentación de usuarios y seguimiento de indicadores de características) <br> - Captura de observabilidad de código interno o funciones complejas que no son capturadas por la instrumentación automática. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/server
[2]: /es/real_user_monitoring/application_monitoring/browser/setup/client
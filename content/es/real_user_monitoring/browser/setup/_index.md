---
description: Comprende tus opciones para configurar el SDK del navegador RUM.
further_reading:
- link: /real_user_monitoring/browser/
  tag: Documentación
  text: Monitorización del Navegador RUM
title: Configuración de monitorización del navegador
---

## Información general

Para empezar a utilizar el navegador de Datadog RUM, necesitas:

1. Crea una aplicación en Datadog.
2. Instrumenta tu aplicación.

La instrumentación de tu aplicación permite que los datos de observabilidad de tu aplicación se muestren en la interfaz de usuario de Datadog.

## Tipos de instrumentación

Hay dos formas de instrumentar tu aplicación: instrumentación automática o manual.

| | Instrumentación automática (Vista previa) | Del lado del cliente (manual) |
|----------------------|--------------------------------|----------------------|
| **Mecanismo de configuración del SDK** | [Automáticamente][1] añade RUM JS al HTML de tu aplicación web. Una vez configurada la instrumentación automática de RUM, gestiona las configuraciones desde la interfaz de usuario. | [Manualmente][2] añade el SDK de RUM al código de tu aplicación y gestiona las configuraciones en el código. |
| **Se requieren cambios de código** | No | Sí |
| **Complejidad de la instalación** | Bajo | Medio |
| **Grupos de usuarios** | **Los equipos de ingeniería y SRE** sin acceso al código frontend, o **los equipos que necesitan gestionar** todas las necesidades de observabilidad de forma centralizada, pueden encontrar esto útil para: <br>  - Desbloquear datos de rendimiento en todas las aplicaciones al configurar RUM <br> - De forma holística monitorizar el rendimiento de aplicaciones en toda la organización | **Los equipos de ingeniería de frontend, ingeniería móvil o producto** con acceso al código de frontend pueden encontrar útil este método para: <br>  - Necesidades diarias de ingeniería (por ejemplo: soporte en vivo, solucionar problemas y checks de estados para servicios descendentes) <br> -Necesidades de producto (por ejemplo: análisis de flujo de usuarios, segmentación de usuarios y seguimiento de indicadores de características) <br> - Captura de observabilidad de código interno o funciones complejas que no son capturadas por la instrumentación automática. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/server
[2]: /es/real_user_monitoring/browser/setup/client
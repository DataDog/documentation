---
description: Aprenda a capturar los errores gestionados en Error Tracking.
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de problemas y flujos de trabajo de Error Tracking
- link: /error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
- link: /error_tracking/guides/enable_infra
  tag: Guía
  text: Habilitar la monitorización de infraestructuras
- link: /error_tracking/guides/enable_apm
  tag: Guía
  text: Activar APM
title: Captura de errores gestionados en Error Tracking
---

## Información general

Las bibliotecas de rastreo de Datadog pueden informar automáticamente de los errores gestionaedos. Los errores se adjuntan a través de eventos de span (tramo) al span (tramo) en el que se gestionan. También se notifican directamente a Error Tracking.

## Requisitos
Lenguajes compatibles
: Python, Ruby

- Tu Datadog Agent debe estar configurado para [Standalone Backend Error Tracking][1] o [APM][2]. Debes estar ejecutando el Agent versión `7.61.0` o superior.
- La aplicación debe instrumentarse con:
  - `dd-trace (traza)-py` versión `3.8.0` o superior para Python
  - `dd-trace (traza)-rb` versión `2.16.0` o superior para Ruby

La captura de errores gestionados sólo está disponible en APM Error Tracking o Standalone Backend Error Tracking. Error Tracking para logs y RUM no es compatible.

## Configuración

Configura tu aplicación para capturar los errores gestionados utilizando una de las siguientes bibliotecas de rastreo oficiales de Datadog:

{{< partial name="error_tracking/error-tracking-handled-errors.html" >}}
<br />

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/backend/getting_started
[2]: /es/error_tracking/apm
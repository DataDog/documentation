---
description: Documentación del esquema JSON del evento backend de CSM Threats
disable_edit: true
title: Formatos de eventos de CSM Threats
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->




Cuando la actividad coincide con una [expresión del Agent][2] de [Cloud Security Management Threats][2] (CSM Threats), se recopila un evento de CSM Threats que contiene todo el contexto relevante sobre la actividad.

Este evento se envía a Datadog, donde se analiza. En función del análisis, los eventos de CSM Threats pueden activar señales de seguridad o pueden almacenarse como eventos con fines de auditoría e investigación de amenazas.

Los eventos de CSM Threats tienen el siguiente esquema JSON dependiendo de la plataforma:

* [Linux][1]
* [Windows][2]

[1]: /es/security/threats/backend_linux
[2]: /es/security/threats/backend_windows
---
description: Obtenga más información sobre el paquete Cisco ASA - Microsoft Sentinel.
title: Cisco ASA - Microsoft Sentinel
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/cisco_asa_microsoft_sentinel.png" alt="El paquete Cisco ASA - Microsoft Sentinel" style="width:25%;" >}}

Este paquete asigna eventos syslog de Cisco ASA analizados al esquema CommonSecurityLog en Microsoft Sentinel.

Qué hace este paquete:

- Asigna cuatro categorías de registro a CommonSecurityLog
- Deriva LogSeverity y DeviceAction a partir de los códigos ASA
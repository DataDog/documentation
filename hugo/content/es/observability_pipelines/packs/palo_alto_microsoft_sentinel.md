---
description: Obtenga más información sobre el paquete de Palo Alto Networks - Microsoft
  Sentinel.
title: Palo Alto Networks - Microsoft Sentinel
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/palo_alto_microsoft_sentinel.png" alt="El paquete de Palo Alto Networks - Microsoft Sentinel" style="width:25%;" >}}

Este paquete asigna los registros de PAN-OS al esquema CommonSecurityLog en Microsoft Sentinel.

Lo que hace este paquete:

- Asigna los registros de tráfico de PAN-OS al CommonSecurityLog
- Reasigna los registros de amenazas, configuración y sistema al CommonSecurityLog
- Normaliza los campos de tráfico, amenazas y sistema para la ingesta en Sentinel
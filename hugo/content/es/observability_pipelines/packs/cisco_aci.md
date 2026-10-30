---
description: Obtenga más información sobre el paquete de Cisco ACI.
title: Cisco ACI
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/cisco_aci.png" alt="El paquete de Cisco ACI" style="width:25%;" >}}

Los eventos syslog de Cisco ACI capturan la salud del fabric, los movimientos de los puntos de conexión y la actividad administrativa.

Lo que hace este paquete:

- Analiza los códigos de falla de ACI y los campos DN
- Genera métricas por gravedad y por nombre de evento
- Descarta las fallas resueltas y de bajo valor
- Etiqueta los eventos de nodo, de política y de punto de conexión
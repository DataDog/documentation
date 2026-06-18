---
description: Más información sobre el paquete de logs de tráfico de cortafuegos Juniper
  SRX.
title: Logs de tráfico de cortafuegos Juniper SRX
---

## Información general

{{< img src="observability_pipelines/packs/juniper_srx_traffic.png" alt="Paquete de logs de tráfico de cortafuegos Juniper SRX" style="width:25%;" >}}

El cortafuegos Juniper SRX registra datos de sesiones de red.

Qué hace este paquete:

- Analiza eventos de sesión RT_FLOW y los transforma en campos normalizados.
- Extrae IP, puertos y contadores de tráfico para análisis.
- Elimina logs de sesión rutinarios de poco valor.
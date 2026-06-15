---
description: Obtén más información sobre el paquete de Amazon VPC Flow Logs.
title: Amazon VPC Flow Logs
---

## Información general

{{< img src="observability_pipelines/packs/aws_vpc_flow_logs.png" alt="El paquete de Amazon VPC Flow Logs" style="width:25%;" >}}

Amazon VPC Flow Logs captura el tráfico de red entre los recursos de VPC.

Qué hace este paquete:

- Elimina los metadatos no utilizados del log
- Disminuye los flujos `ACCEPT OK` en reposo e internos
- Guarda las conexiones denegadas y rechazadas
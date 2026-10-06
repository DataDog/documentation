---
description: Obtenga más información sobre el paquete Kube Proxy.
title: Kube Proxy
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/kube_proxy.png" alt="El paquete Kube Proxy" style="width:25%;" >}}

Este paquete conserva solo los errores y advertencias de kube-proxy, descartando el ruido de sincronización de iptables de rutina que se genera en cada ciclo.

Lo que hace este paquete:

- Conserva las fallas de sincronización
- Descarta el ruido de sincronización de rutina
- Extrae el nivel de registro
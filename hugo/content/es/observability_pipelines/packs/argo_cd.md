---
description: Obtenga más información sobre el paquete de Argo CD.
title: Argo CD
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/argo_cd.png" alt="El paquete de Argo CD" style="width:25%;" >}}

Este paquete procesa eventos de sincronización, estado y RBAC de Argo CD desde el controlador de aplicaciones y el servidor API.

Lo que hace este paquete:

- Analiza el estado de sincronización
- Extrae las denegaciones de RBAC
- Descarta el ruido de sincronización saludable
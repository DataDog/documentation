---
description: Más información sobre el paquete HAProxy Ingress.
title: HAProxy Ingress
---

## Información general

{{< img src="observability_pipelines/packs/haproxy_ingress.png" alt="Paquete de HAProxy Ingress" style="width:25%;" >}}

Los logs de HAProxy Ingress registran cómo se enruta y proporciona el tráfico de entrada de Kubernetes.

Qué hace este paquete:

- Extrae campos clave para el análisis
- Elimina endpoints de comprobación rutinaria de estado y métricas.
- Genera métricas para respaldar la monitorización de clústeres
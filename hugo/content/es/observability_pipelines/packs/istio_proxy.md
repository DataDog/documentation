---
description: Más información sobre el paquete de Proxy de Istio.
title: Proxy de Istio
---

## Información general

{{< img src="observability_pipelines/packs/istio_proxy.png" alt="El paquete de Proxy de Istio" style="width:25%;" >}}

Los logs de Proxy de Istio capturan el tráfico entrante y saliente gestionado por Envoy.

Qué hace este paquete:

- Genera métricas HTTP de clave para latencia, errores y tráfico.
- Muestras de solicitudes rutinarias exitosas
- Elimina el ruido de bajo valor (checks de estado, activos estáticos, logs vacíos de `200` )
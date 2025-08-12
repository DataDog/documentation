---
aliases:
- /es/observability_pipelines/production_deployment_overview/aggregator_architecture
- /es/observability_pipelines/aggregator_architecture/
- /es/observability_pipelines/architecture/
title: (LEGACY) Prácticas recomendadas para la arquitectura del agregador de OPW
---

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">
Esta guía es para despliegues de gran escala a nivel de producción.
</div>

## Información general

La arquitectura del agregador del worker de Observability Pipelines (OPW) despliega el worker de Observability Pipelines como un servicio independiente para el procesamiento y el enrutamiento de datos centralizados:

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role2.png" alt="Diagrama que muestra el balanceador de carga de red recibiendo datos de varias fuentes y enviándolos al agregador del worker de Observability Pipelines, que tiene varios workers en diferentes zonas de disponibilidad y envía datos a varios sumideros" style="width:100%;" >}}

Despliega el worker de Observability Pipelines dentro de tu infraestructura, como cualquier otro servicio, para interceptar datos, manipularlos y luego reenviarlos a tus destinos. Cada instancia de worker de Observability Pipelines funciona de forma independiente, por lo que puedes escalar la arquitectura con un simple balanceador de carga.

Esta guía te muestra la arquitectura de agregador recomendada para los nuevos usuarios de workers de Observability Pipelines. En concreto, estos temas incluyen:

- [Optimizar la instancia][3], para que puedas escalar horizontalmente el agregador del worker de Observability Pipelines.
- Puntos de partida para calcular la capacidad de tus recursos a fin de [planificar y escalar capacidades][4] del worker de Observability Pipelines.
- Determinar tu [topología y configuraciones de red][5] para el worker de Observability Pipelines.
- Lograr una [alta durabilidad][6] y [alta disponibilidad](#high-availability).
- Utilizar el worker de Observability Pipelines como parte de tu estrategia de [recuperación de desastres][7].
- Más [configuraciones avanzadas][8] para el despliegue de múltiples agregadores, sistemas publicar-subscribir y la agregación global.

[3]: /es/observability_pipelines/legacy/architecture/optimize
[4]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling
[5]: /es/observability_pipelines/legacy/architecture/networking
[6]: /es/observability_pipelines/legacy/architecture/preventing_data_loss
[7]: /es/observability_pipelines/legacy/architecture/availability_disaster_recovery
[8]: /es/observability_pipelines/legacy/architecture/advanced_configurations
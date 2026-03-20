---
disable_toc: false
title: Escalado y rendimiento
---

A medida que amplías tu arquitectura de Observability Pipelines para cubrir tus diferentes casos de uso:

- Si deseas ejecutar varios pipelines en un host para poder enviar logs desde distintas fuentes, sigue las instrucciones de [Ejecutar varios pipelines en un host][1].
- Observability Pipelines utiliza señales de contrapresión y almacenamiento en búfer para manejar situaciones en las que el sistema no puede procesar eventos inmediatamente después de recibirlos. Consulta [Manejo de la carga y la contrapresión][2] para obtener más información.
- Cuando escalas Observability Pipelines Workers, cada Worker funciona de forma independiente. Consulta [Prácticas recomendadas para escalar pipelines][3] para ver la arquitectura de agregadores recomendada.

[1]: /es/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
[2]: /es/observability_pipelines/scaling_and_performance/handling_load_and_backpressure/
[3]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/
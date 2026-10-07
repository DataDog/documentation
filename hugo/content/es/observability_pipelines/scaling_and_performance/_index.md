---
description: Encuentre enlaces a documentación sobre temas como la ejecución de múltiples
  Pipelines en un servidor, el almacenamiento en búfer y la contrapresión, y las mejores
  prácticas para escalar los Workers de Observability Pipelines.
disable_toc: false
title: Escalamiento y rendimiento
---
A medida que escala su arquitectura de Observability Pipelines para cubrir sus diferentes casos de uso:

- Si desea ejecutar múltiples Pipelines en un servidor para poder enviar datos desde diferentes fuentes, siga las instrucciones en [Run Multiple Pipelines on a Host][1].
- Observability Pipelines utiliza señales de contrapresión y almacenamiento en búfer para manejar situaciones en las que el sistema no puede procesar eventos inmediatamente después de recibirlos. Consulte [Buffering and Backpressure][2] para obtener más información.
- Cuando escala los Workers de Observability Pipelines, cada Worker opera de forma independiente. Consulte [Best Practices for Scaling Pipelines][3] para conocer la arquitectura de agregador recomendada.

[1]: /es/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
[2]: /es/observability_pipelines/scaling_and_performance/buffering_and_backpressure/
[3]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/
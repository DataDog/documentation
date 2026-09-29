---
aliases:
- /es/observability_pipelines/rehydration/
description: Aprenda a usar Replay para extraer registros archivados y procesarlos
  en Observability Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/
  tag: Documentación
  text: Aprenda más sobre los procesadores
- link: /observability_pipelines/packs/
  tag: Documentación
  text: Aprenda más sobre Packs
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: Blog
  text: Rehidrate registros archivados en cualquier SIEM o proveedor de registros
    con Observability Pipelines
title: Replay
---
## Descripción general {#overview}

Replay para Observability Pipelines le permite extraer registros archivados del almacenamiento de objetos y procesarlos en Observability Pipelines, incluso con [Packs][1]. Esto le brinda acceso constante al contexto histórico sin tener que reconstruir flujos de trabajo o modificar las canalizaciones de ingesta.

Las organizaciones a menudo almacenan grandes volúmenes de registros en archivos rentables a largo plazo para controlar el gasto y cumplir con los requisitos de cumplimiento. Sin embargo, los datos históricos a menudo se vuelven difíciles de acceder cuando hay un incidente de seguridad, una solicitud de auditoría o una investigación operativa. Recuperar registros archivados de almacenamiento en frío puede ser lento, manual y disruptivo, lo que requiere scripts ad-hoc, descompresión o esfuerzo de ingeniería dedicado. Replay para Observability Pipelines resuelve estos problemas.

{{< img src="observability_pipelines/replay_pipeline.png" alt="Una canalización con la fuente de replay de Amazon S3." style="width:100%;" >}}

## Cómo funciona Replay {#how-replay-works}

Replay proporciona un flujo de trabajo automatizado para recuperar y reprocesar registros archivados almacenados en almacenes de objetos, como Amazon S3, Google Cloud Storage y Azure Blob Storage. Esto le ayuda a equilibrar la eficiencia del almacenamiento con el acceso rápido a los datos históricos.

Con Replay, usted puede:

### Recuperar registros archivados bajo demanda {#retrieve-archived-logs-on-demand}

Extraiga solo los datos que necesita para investigaciones, auditorías, resolución de problemas o pruebas de canalización, y elimine los largos retrasos de recuperación y los pasos de extracción manual.

### Seleccione rangos de tiempo específicos o segmentos de eventos {#target-specific-time-ranges-or-event-slices}

Especifique el marco de tiempo exacto o el subconjunto de eventos que necesita para evitar mover o procesar datos innecesariamente.

### Procese registros históricos con Observability Pipelines {#process-historical-logs-with-observability-pipelines}

Los registros reproducidos pasan por el mismo parseo, enriquecimiento, normalización y enrutamiento aplicado a los flujos de registros en vivo.

Esto garantiza:

- Formato y extracción de campos consistentes
- Enriquecimiento confiable (por ejemplo, usuario, geo-IP y metadatos de nube)
- Controles de seguridad y cumplimiento uniformes
- Comportamiento idéntico en datos históricos y en tiempo real

### Enrute los datos reproducidos a cualquier destino compatible {#route-replayed-data-to-any-supported-destination}

Puede enviar registros históricos procesados a SIEM, lagos de datos, plataformas de análisis o cualquier destino de Observability Pipelines.

### Elimine el manejo manual {#eliminate-manual-handling}

Replay proporciona una forma estructurada y predecible de extraer datos archivados de vuelta a su plataforma de observabilidad, por lo que no tiene que usar scripts personalizados, descompresión manual ni procesos de recuperación ad-hoc.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/packs/
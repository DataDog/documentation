---
description: Obtenga más información sobre el paquete de hallazgos de AlphaSOC.
title: Hallazgos de AlphaSOC
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/alphasoc_findings.png" alt="El paquete de hallazgos de AlphaSOC" style="width:25%;" >}}

Los hallazgos de AlphaSOC señalan amenazas DNS e IP detectadas en toda su red.

Qué hace este paquete:

- Extrae categorías de amenazas, puntuación y dirección IP de fuente
- Asigna las puntuaciones de gravedad de AlphaSOC al estado del registro
- Descarta los hallazgos de baja confianza con una puntuación inferior a 3
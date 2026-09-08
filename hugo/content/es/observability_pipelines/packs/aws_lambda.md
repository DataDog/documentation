---
description: Obtenga más información sobre el paquete de AWS Lambda.
title: AWS Lambda
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/aws_lambda.png" alt="El paquete de AWS Lambda" style="width:25%;" >}}

Los registros de AWS Lambda capturan invocaciones, errores y arranques en frío.

Qué hace este paquete:

- Analiza las líneas REPORT para métricas clave
- Descarta las líneas START y END
- Etiqueta los arranques en frío y los tiempos de espera
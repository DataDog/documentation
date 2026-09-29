---
description: Obtenga más información sobre el paquete de auditoría de Google Cloud.
title: Auditoría de Google Cloud
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/google_cloud_audit.png" alt="El paquete de auditoría de Google Cloud" style="width:25%;" >}}

Los registros de auditoría de Google Cloud capturan la actividad administrativa y las infracciones de políticas.

Lo que hace este paquete:

- Extrae el principal, la IP del llamador y el método de API
- Etiqueta los cambios en IAM, secretos y firewalls como de alto riesgo
- Muestrea las operaciones rutinarias de solo lectura
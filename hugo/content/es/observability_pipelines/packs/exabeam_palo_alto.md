---
description: Obtenga más información sobre el paquete Exabeam - Palo Alto.
title: Exabeam - Palo Alto
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/exabeam_palo_alto.png" alt="El paquete Exabeam - Palo Alto" style="width:25%;" >}}

Este paquete procesa el syslog de PAN-OS enviado a Exabeam y filtra los registros de tráfico vacíos y los duplicados al inicio, dejando intacto el CSV sin procesar.

Lo que hace este paquete:

- Etiqueta la fuente de PAN-OS
- Descarta los registros de tráfico vacíos
- Deja intacto el CSV sin procesar
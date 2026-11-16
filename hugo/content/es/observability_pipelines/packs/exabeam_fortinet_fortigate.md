---
description: Obtenga más información sobre el paquete Exabeam - Fortinet FortiGate.
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/
  tag: Blog
  text: Procese y dirija registros de seguridad críticos a Exabeam con Observability
    Pipelines
title: Exabeam - Fortinet FortiGate
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/exabeam_fortinet_fortigate.png" alt="El paquete Exabeam - Fortinet FortiGate" style="width:25%;" >}}

Este paquete procesa los registros del firewall FortiGate enviados a Exabeam y filtra el tráfico rutinario y el ruido de las verificaciones de estado.

Lo que hace este paquete:

- Descarta las consultas DNS y las verificaciones de estado
- Descarta el tráfico interno permitido
- Conserva los registros de amenazas y de tráfico denegado

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
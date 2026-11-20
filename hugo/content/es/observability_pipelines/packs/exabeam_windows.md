---
description: Obtenga más información sobre el paquete Exabeam - Windows.
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/
  tag: Blog
  text: Procese y dirija registros de seguridad críticos a Exabeam con Observability
    Pipelines
title: Exabeam - Windows
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/exabeam_windows.png" alt="El paquete Exabeam - Windows" style="width:25%;" >}}

Este paquete procesa los registros de eventos de Windows enviados a Exabeam y filtra los códigos que utilizan los analizadores de Exabeam, manteniendo intacto el XML sin procesar para su parseo.

Lo que hace este paquete:

- Mantiene el XML sin procesar intacto
- Mantiene los registros de Sysmon y PowerShell
- Descarta los códigos de Security no utilizados

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
---
description: Obtenga más información sobre el paquete DNS de Microsoft.
title: DNS de Microsoft
---
## Descripción general {#overview}

{{< img src="observability_pipelines/packs/microsoft_dns.png" alt="El paquete DNS de Microsoft" style="width:25%;" >}}

Este paquete analiza el registro de texto de depuración clásico del servidor DNS de Windows (dns.log) y decodifica los nombres de consulta y los códigos de respuesta.

Lo que hace este paquete:

- Decodifica nombres de consulta
- Analiza Snd/Rcv y RCODE
- Muestrea respuestas limpias
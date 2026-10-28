---
aliases:
- /es/cloudprem/introduction/
description: Conozca la arquitectura, los componentes y las características compatibles
  de BYOC Logs
title: Introducción a BYOC Logs
---
## Descripción general {#overview}

BYOC (Bring Your Own Cloud) Logs es la solución de gestión de registros de Datadog que se ejecuta en su propia infraestructura. Indexa y almacena registros en su almacenamiento de objetos, ejecuta consultas de búsqueda y análisis, y se conecta a la interfaz de usuario de Datadog para una experiencia totalmente integrada. BYOC Logs está diseñado para organizaciones con requisitos específicos:
- Requisitos de residencia de datos, privacidad y normativos
- Requisitos de alto volumen

Aquí tiene una descripción general de alto nivel de cómo funciona BYOC Logs:

{{< img src="/cloudprem/overview_diagram_byoc.png" alt="Descripción general de la arquitectura de BYOC Logs que muestra cómo fluyen los registros desde las fuentes a través de BYOC Logs hasta la plataforma Datadog" style="width:100%;" >}}

El diagrama ilustra la arquitectura híbrida de BYOC Logs, destacando cómo se procesan y almacenan los datos dentro de su infraestructura:

*   **Ingesta**: Los registros se recopilan de los Datadog Agents y otras fuentes mediante protocolos estándar.
*   **Su infraestructura**: La plataforma BYOC Logs se ejecuta completamente dentro de su infraestructura. Procesa y almacena registros en su propio almacenamiento de objetos (Amazon S3, Google Cloud Storage o Azure Blob Storage).
*   **Datadog SaaS**: La plataforma Datadog es el Control Plane de BYOC Logs. Aloja la Datadog UI y se comunica con BYOC Logs a través de una conexión segura para enviar consultas de registros y recibir resultados.

{{< whatsnext desc="Explore la arquitectura y las capacidades de BYOC Logs:">}}
  {{< nextlink href="/byoc-logs/introduction/architecture/" >}}Arquitectura: comprenda cómo funcionan juntos los componentes de BYOC Logs{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/network/" >}}Red: comprenda cómo se comunica BYOC Logs con Datadog{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/features/" >}}Funciones compatibles: vea qué funciones de Log Explorer están disponibles en BYOC Logs.{{< /nextlink >}}
{{< /whatsnext >}}

## Comience {#get-started}

{{< whatsnext desc="¿Está listo para implementar BYOC Logs? Siga estas guías:">}}
  {{< nextlink href="/byoc-logs/quickstart/" >}}Inicio rápido - Ejecute BYOC Logs localmente en 5 minutos{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/" >}}Instalación - Implemente BYOC Logs en AWS, GCP o Azure{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/ingest/agent/" >}}Ingesta de registros - Configure el Datadog Agent para enviar registros a BYOC Logs.{{< /nextlink >}}
{{< /whatsnext >}}
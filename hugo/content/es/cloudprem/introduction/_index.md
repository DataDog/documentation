---
description: Conoce la arquitectura, los componentes y las funciones compatibles de
  CloudPrem
title: Introducción a CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

CloudPrem es una solución de gestión de logs BYOC de Datadog. Se ejecuta en tu propia infraestructura, indexa y almacena logs en tu almacenamiento de objetos, ejecuta consultas de búsqueda y análisis y se conecta a la interfaz de usuarios de Datadog para ofrecer una experiencia totalmente integrada con los productos de Datadog. CloudPrem está diseñado para organizaciones con requisitos específicos:
- Residencia de datos, privacidad y requisitos normativos
- Requisitos de gran volumen

A continuación, se ofrece una descripción general de cómo funciona CloudPrem:

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="Información general de la arquitectura de CloudPrem en la que se muestra cómo fluyen los logs desde sources (fuentes) a través de CloudPrem a la plataforma de Datadog" style="width:100%;" >}}

El diagrama ilustra la arquitectura híbrida de CloudPrem, destacando cómo se procesan y almacenan los datos dentro de tu infraestructura:

*   **Ingesta**: los logs se recopilan de los Datadog Agents y de otras fuentes mediante protocolos estándar.
*   **Tu infraestructura**: la plataforma de CloudPrem se ejecuta completamente dentro de tu infraestructura. Procesa y almacena los logs en tu propio almacenamiento (S3, Azure Blob, MinIO).
*   **Datadog SaaS**: la plataforma de Datadog es el plano de control de CloudPrem, aloja la interfaz de usuario de Datadog y se comunica con CloudPrem a través de una conexión segura para enviar consultas de log y recibir resultados.

{{< whatsnext desc="Explora la arquitectura y las capacidades de CloudPrem:">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}Arquitectura: conoce cómo los componentes de CloudPrem funcionan en conjunto{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/network/" >}}Red: conoce cómo CloudPrem se comunica con Datadog{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/features/" >}}Funciones compatibles: consulta qué funciones de Log Explorer están disponibles en CloudPrem{{< /nextlink >}}
{{< /whatsnext >}}

## Para empezar

{{< whatsnext desc="¿Estás listo para desplegar CloudPrem? Sigue estas guías:">}}
  {{< nextlink href="/cloudprem/quickstart/" >}}Inicio rápido: ejecuta CloudPrem de forma local en 5 minutos{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}Instalación: despliega CloudPrem en AWS, Azure, o Kubernetes personalizado{{< /nextlink >}}
  {{< nextlink href="/cloudprem/ingest/agent/" >}}Ingesta de logs: configura el Datadog Agent para enviar logs a CloudPrem{{< /nextlink >}}
{{< /whatsnext >}}
---
aliases:
- /es/integrations/guide/source-code-integration/
description: Configure la integración de fuente que se conecta con APM para vincular
  su telemetría con sus repositorios, incrustar información de Git en los artefactos
  de su canalización de CI y utilizar integraciones de gestión de fuente para generar
  fragmentos de código en línea en todo Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/bitbucket-cloud-source-code-integration/
  tag: Blog
  text: Solucione problemas y proteja su código más rápido con la integración de fuente
    de Bitbucket Cloud de Datadog
title: Integración de fuente
---
## Descripción general {#overview}

La integración de fuente de Datadog le permite conectar sus repositorios de Git a Datadog para habilitar varias funciones relacionadas con la fuente en toda la plataforma Datadog. Permite depurar trazas de pila, perfiles lentos y otros problemas accediendo a las líneas relevantes de su fuente.

{{< img src="source_code_integration/inline-code-snippet.png" alt="Fragmento de código en línea de una Java RuntimeException con un botón para visualizar el código en GitHub" style="width:100%;">}}

## Configuración y funciones {#setup-and-features}

{{< whatsnext desc="Para la configuración y las funciones de la integración de fuente, consulte las siguientes páginas:" >}}
    {{< nextlink href="source_code/source-code-management" >}}Integraciones de proveedores de gestión de fuente{{< /nextlink >}}
    {{< nextlink href="source_code/service-mapping" >}}Mapeo de servicio
  y etiquetado de telemetría{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Mapeo de recursos de Kubernetes{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}Funciones de la integración de fuente{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
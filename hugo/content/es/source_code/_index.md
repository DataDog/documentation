---
aliases:
- /es/integrations/guide/source-code-integration/
description: Configure la integración del código fuente que se conecta con APM para
  vincular su telemetría con sus repositorios, incrustar información de Git en los
  artefactos de su canalización de CI y utilizar integraciones de gestión de código
  fuente para generar fragmentos de código en línea en Datadog.
title: Integración de Código Fuente
---
## Descripción general {#overview}

La integración de código fuente de Datadog permite conectar sus repositorios de Git a Datadog para habilitar diversas funciones relacionadas con el código fuente en toda la plataforma de Datadog. Permite depurar trazas de pila, perfiles lentos y otros problemas accediendo a las líneas relevantes de su código fuente.

{{< img src="source_code_integration/inline-code-snippet.png" alt="Fragmento de código en línea de una Java RuntimeException con un botón para ver el código en GitHub" style="width:100%;">}}

## Configuración y características {#setup-and-features}

{{< whatsnext desc="Para la configuración y características de la integración de código fuente, consulte las siguientes páginas:" >}}
    {{< nextlink href="source_code/source-code-management" >}}Integraciones de proveedores de gestión de código fuente{{< /nextlink >}}
    {{< nextlink href="source_code/service-mapping" >}}Mapeo de servicios
  y etiquetado de telemetría{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Mapeo de recursos de Kubernetes{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}Características de la integración de código fuente{{< /nextlink >}}
{{< /whatsnext >}}
---
disable_toc: false
title: Fuente del Datadog Agent
---

Utiliza la fuente del Datadog Agent de Observability Pipelines para recibir logs de tu Datadog Agent. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Configurar la fuente en la interfaz de usuario del pipeline

{{% observability_pipelines/source_settings/datadog_agent %}}

## Conectar el Datadog Agent al worker de Observability Pipelines

Utiliza el archivo de configuración del Agent o el archivo de valores del Helm chart del Agent para conectar el Datadog Agent al worker de Observability Pipelines.

{{< tabs >}}
{{% tab "Archivo de configuraión del Agent" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /tab %}}
{{% tab "Archivo de valores del Helm del Agent" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/set_up_pipelines/
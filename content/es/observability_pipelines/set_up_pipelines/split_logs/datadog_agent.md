---
aliases:
- /es/observability_pipelines/split_logs/datadog_agent/
disable_toc: false
title: Dividir logs para el Datadog Agent
---

## Información general

Configura tu Datadog Agent para enviar logs al worker Observability Pipelines y luego procesar y enrutarlos a diferentes destinos en función de tu caso de uso.

{{% observability_pipelines/use_case_images/split_logs %}}

Este documento te guiará a través de los siguientes pasos:
1. Los [requisitos previos](#prerequisites) necesarios para configurar Observability Pipelines
1. [Configuración de Observability Pipelines](#set-up-observability-pipelines)
1. [Conexión del Datadog Agent al worker de Observability Pipelines](#connect-the-datadog-agent-to-the-observability-pipelines-worker)

## Requisitos previos

{{% observability_pipelines/prerequisites/datadog_agent %}}

{{< tabs >}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/prerequisites/splunk_hec_destination_only %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/prerequisites/sumo_logic_destination_only %}}

{{% /tab %}}
{{< /tabs >}}

## Configurar Observability Pipelines

1. Navega hasta [Observability Pipelines][1].
1. Selecciona la plantilla **Split Logs** (Dividir logs) para crear un pipeline nuevo.
1. Selecciona **Datadog Agent** como el origen.

### Configurar el origen

{{% observability_pipelines/source_settings/datadog_agent %}}

### Configurar los destinos

Introduce la siguiente información en función del destino de logs seleccionado.

{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_settings/syslog %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_settings/new_relic %}}

{{% /tab %}}
{{< /tabs >}}

### Configurar procesadores

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Filtro" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Editar campos" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Muestra" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Cuota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reducir" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% /tab %}}
{{% tab "Añadir nombre de host" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Tabla de enriquecimiento" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{% tab "Generar métricas" %}}

{{% observability_pipelines/processors/generate_metrics %}}

{{% /tab %}}
{{% tab "Añadir variables de entorno" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{< /tabs >}}

### Instalar el worker de Observability Pipelines
1. Selecciona tu plataforma en el menú desplegable **Choose your installation platform** (Elige tu plataforma de instalación).
1. Ingresa la dirección del Datadog Agent. El worker de Observability Pipelines escucha en esta dirección y puerto las entradas de logs procedentes del Datadog Agent. Por ejemplo, `0.0.0.0:<port_number>`.
1. Proporciona las variables de entorno para cada uno de los destinos seleccionados.
{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{% tab "Syslog" %}}

{{% observability_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{< /tabs >}}
1. Sigue las instrucciones de tu entorno para instalar el worker.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

## Conectar el Datadog Agent al worker de Observability Pipelines

Utiliza el archivo de configuración del Agent o el archivo de valores del Helm chart del Agent para conectar el Datadog Agent al worker de Observability Pipelines.

{{< tabs >}}
{{% tab "Archivo de configuración del Agent" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /tab %}}
{{% tab "Archivo de valores del Helm del Agent" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
---
aliases:
- /es/observability_pipelines/log_volume_control/sumo_logic_hosted_collector/
disable_toc: false
title: Control del volumen de logs para la fuente de logs HTTP del recopilador alojado
  en Sumo Logic
---

## Información general

Este documento te guiará a través de los siguientes pasos para configurar el worker de Observability Pipelines con la fuente de logs HTTP del recopilador alojado en Sumo Logic para que sólo se enruten logs útiles a tus destinos.

{{% observability_pipelines/use_case_images/log_volume_control %}}

Este documento te guiará a través de los siguientes pasos:
1. Los [requisitos previos](#prerequisites) necesarios para configurar Observability Pipelines
1. [Configuración de Observability Pipelines](#set-up-observability-pipelines)
1. [Envío de logs al worker de Observability Pipelines a través del origen HTTP de Sumo Logic](#send-logs-to-the-observability-pipelines-worker-over-sumo-logic-http-source)

## Requisitos previos

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Configurar Observability Pipelines

1. Ve a [Observability Pipelines][1].
1. Selecciona la plantilla **Control del volumen de logs** para crear un nuevo pipeline.
1. Selecciona **Sumo Logic** como fuente.

### Configurar el destino

Introduce la siguiente información en función del destino seleccionado para los logs.

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
{{% tab "Analizador Grok" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Cuota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reducir" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Deduplicar" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% /tab %}}
{{% tab "Añadir nombre de host" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Analizar JSON" %}}

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
1. Selecciona tu plataforma en el menú desplegable **Elige tu plataforma de instalación**.
1. Introduce la dirección Sumo Logic. Esta es la dirección y el puerto donde tus aplicaciones están enviando sus datos de logs. El worker de Observability Pipelines escucha esta dirección para detectar logs entrantes.
1. Proporciona las variables de entorno para cada uno de los destinos seleccionados. Para obtener más información, consulta los [requisitos previos](#prerequisites).
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

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: https://app.datadoghq.com/observability-pipelines
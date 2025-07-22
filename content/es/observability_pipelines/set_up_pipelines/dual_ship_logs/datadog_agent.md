---
title: Envío doble de logs para el Datadog Agent
disable_toc: false
aliases:
    - /observability_pipelines/dual_ship_logs/datadog_agent/
---

## Información general

Configura el Datadog Agent y Observability Pipelines para que Observability Pipelines Worker agregue y procese los logs provenientes de tus fuentes previas antes de enrutarlos a varias aplicaciones.

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

Este documento te guiará a través de los siguientes pasos:
1. Los [requisitos previos](#prerequisites) necesarios para configurar Observability Pipelines
1. [Configuración de Observability Pipelines](#set-up-observability-pipelines)
1. [Conectar el Datadog Agent al Observability Pipelines Worker](#connect-the-datadog-agent-to-the-observability-pipelines-worker)

## Requisitos previos

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Configurar Observability Pipelines

1. Dirígete a [Observability Pipelines][1].
2. Selecciona la plantilla **Dual Ship (Envío doble)** para crear un nuevo pipeline.
3. Selecciona **Datadog Agent** como el origen.

### Configura la fuente

{{% observability_pipelines/source_settings/datadog_agent %}}

### Configura los destinos

Introduce la siguiente información según los destinos de logs que hayas seleccionado.

{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
<!-- {{% tab "Amazon Security Lake" %}}

##### Requisitos previos

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

##### Configura el destino

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

{{% /tab %}} -->
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Archivos de Datadog" %}}

{{% observability_pipelines/destination_settings/datadog_archives_note %}}

{{% observability_pipelines/destination_settings/datadog_archives_prerequisites %}}

Para configurar el destino, sigue las instrucciones del proveedor de la nube que estés usando para archivar tus logs.

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Almacenamiento en Google Cloud" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_google_cloud_storage %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_azure_storage %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_settings/elasticsearch %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_settings/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_settings/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_settings/opensearch %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_settings/sentinelone %}}

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
{{< /tabs >}}

#### Añadir destinos adicionales

{{% observability_pipelines/multiple_destinations %}}

### Configurar procesadores

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Añade variables de entorno" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{% tab "Añadir nombre de host" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Deduplicación" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Editar campos" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Tabla de enriquecimiento" %}}

{{% observability_pipelines/processors/enrichment_table %}}

{{% /tab %}}
{{% tab "Filtro" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Generar métricas" %}}

{{% observability_pipelines/processors/generate_metrics %}}

{{% /tab %}}
{{% tab "Analizador de Grok" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Analizar JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Analizar XML" %}}

{{% observability_pipelines/processors/parse_xml %}}

{{% /tab %}}
{{% tab "Cuota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reducir" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Reasignar a OCSF" %}}

{{% observability_pipelines/processors/remap_ocsf %}}

{{% /tab %}}
{{% tab "Muestra" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% collapse-content title="Añadir reglas desde la biblioteca" level="h5" %}}

{{% observability_pipelines/processors/sds_library_rules %}}

{{% /collapse-content %}}
{{% collapse-content title="Añadir una regla personalizada" level="h5" %}}

{{% observability_pipelines/processors/sds_custom_rules %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Dividir matriz" %}}

{{% observability_pipelines/processors/split_array %}}

{{% /tab %}}
{{< /tabs >}}

#### Añadir otro conjunto de procesadores y destinos

{{% observability_pipelines/multiple_processors %}}

### Instalar el Observability Pipelines Worker
1. Selecciona tu plataforma en el menú desplegable **Choose your installation platform (Elige tu plataforma de instalación)**.
1. Introduce la dirección del listener, que es la dirección y el puerto en los que el Observability Pipelines Worker escucha los logs entrantes del Datadog Agent. Por ejemplo, `0.0.0.0:<port_number>`.
1. Proporciona las variables de entorno para cada uno de los destinos seleccionados.
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
<!-- {{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}} -->
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Archivos de Datadog" %}}

Para el destino de archivos de Datadog, sigue las instrucciones del proveedor de la nube que utilices para archivar tus logs.

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Almacenamiento en Google Cloud" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /collapse-content %}}
{{% collapse-content title="Azure Storage" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Elasticsearch" %}}

{{% observability_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

{{% observability_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{% tab "New Relic" %}}

{{% observability_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{% tab "OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{% tab "SentinelOne" %}}

{{% observability_pipelines/destination_env_vars/sentinelone %}}

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
{{< /tabs >}}
1. Sigue las instrucciones de tu entorno para instalar el Worker.
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

## Conectar el Datadog Agent al Observability Pipelines Worker

Usa el archivo de configuración del Agent o el archivo de valores del gráfico Helm del Agent para conectar el Datadog Agent al Observability Pipelines Worker.

{{< tabs >}}
{{% tab "Archivo de configuración del Agent" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /tab %}}
{{% tab "Archivo de valores de Helm del Agent" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines

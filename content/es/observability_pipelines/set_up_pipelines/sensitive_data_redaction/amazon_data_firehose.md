---
disable_toc: false
title: Sensitive Data Redaction para Amazon Data Firehose
---

## Información general

Los datos confidenciales, como números de tarjetas de crédito, números de ruta bancaria y claves de API, pueden revelarse involuntariamente en tus logs, lo que puede exponer a tu organización a riesgos financieros y de privacidad.

Utiliza Observability Pipelines para identificar, etiquetar y, de manera opcional, ocultar o codificar información confidencial antes de enviar los logs a diferentes destinos y fuera de tu infraestructura. Puedes utilizar reglas de análisis predefinidas para detectar patrones comunes, como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización y más. También puedes crear reglas de análisis personalizadas con patrones de expresiones regulares para buscar información confidencial.

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

Este documento te guiará a través de los siguientes pasos:
1. Los [requisitos previos](#prerequisites) necesarios para configurar Observability Pipelines
1. [Configuración de Observability Pipelines](#set-up-observability-pipelines)
1. [Envío de logs al worker de Observability Pipelines](#send-Logs-to-the-observability-pipelines-worker-over-amazon_data_firehose)

## Requisitos previos

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## Configurar Observability Pipelines

1. Navega hasta [Observability Pipelines][1].
1. Selecciona la plantilla **Sensitive Data Redactions** (Redacciones de datos confidenciales) para crear un nuevo pipeline.
1. Select the **Amazon Data Firehose** source.

### Configurar el origen

{{% observability_pipelines/source_settings/amazon_data_firehose %}}

### Configurar los destinos

Introduce la siguiente información en función de los destinos de logs seleccionados.

{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

##### Requisitos previos

{{% observability_pipelines/prerequisites/amazon_security_lake %}}

##### Configurar el destino

{{% observability_pipelines/destination_settings/amazon_security_lake %}}

{{% /tab %}} 
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_settings/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_settings/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/destination_settings/datadog_archives_note %}}

{{% observability_pipelines/destination_settings/datadog_archives_prerequisites %}}

Para configurar el destino, sigue las instrucciones del proveedor de nube que utilizas para archivar tus logs.

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h5" %}}

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
{{% tab "Socket" %}}

{{% observability_pipelines/destination_settings/socket %}}

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

{{% observability_pipelines/processors/add_processors_sds %}}

{{< tabs >}}
{{% tab "Add env vars" %}}

{{% observability_pipelines/processors/add_env_vars %}}

{{% /tab %}}
{{% tab "Add hostname" %}}

{{% observability_pipelines/processors/add_hostname %}}

{{% /tab %}}
{{% tab "Procesador personalizado" %}}

{{% observability_pipelines/processors/custom_processor %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /pestaña %}}
{{% pestaña "Editar campos" %}}

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
{{% tab "Grok Parser" %}}

{{% observability_pipelines/processors/grok_parser %}}

{{% /tab %}}
{{% tab "Parse JSON" %}}

{{% observability_pipelines/processors/parse_json %}}

{{% /tab %}}
{{% tab "Analizar XML" %}}

{{% observability_pipelines/processors/parse_xml %}}

{{% /tab %}}
{{% tab "Cuota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Reduce" %}}

{{% observability_pipelines/processors/reduce %}}

{{% /tab %}}
{{% tab "Reasignar a OCSF" %}}

{{% observability_pipelines/processors/remap_ocsf %}}

{{% collapse-content title="Asignación de bibliotecas" level="h5" expanded=false id="library_mapping" %}}

{{% observability_pipelines/processors/remap_ocsf_library_mapping %}}

{{% /collapse-content %}}

{{% collapse-content title="Asignación personalizada" level="h5" expanded=false id="custom_mapping" %}}

{{% observability_pipelines/processors/remap_ocsf_custom_mapping %}}

{{% /collapse-content %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{% /tab %}}
{{% tab "Muestra" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% collapse-content title="Añadir reglas de la biblioteca" level="h5" %}}

{{% observability_pipelines/processors/sds_library_rules %}}

{{% /collapse-content %}}
{{% collapse-content title="Añadir una regla personalizada" level="h5" %}}

{{% observability_pipelines/processors/sds_custom_rules %}}

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Dividir matriz" %}}

{{% observability_pipelines/processors/split_array %}}

{{% /tab %}}
{{% tab "Procesador de etiquetas" %}}

{{% observability_pipelines/processors/tags_processor %}}

{{% /tab %}}
{{% tab "Limitar" %}}

{{% observability_pipelines/processors/throttle %}}

{{% /tab %}}
{{< /tabs >}}

#### Añadir otro conjunto de procesadores y destinos

{{% observability_pipelines/multiple_processors %}}

### Instalar el worker de Observability Pipelines
1. Selecciona tu plataforma en el menú desplegable **Elige tu plataforma de instalación**.
1. Ingresa la dirección de Amazon Data Firehose. El worker de Observability Pipelines escucha esta dirección y este puerto para recibir logs desde Amazon Data Firehose.
1. Proporciona las variables de entorno para cada uno de los destinos seleccionados. Para obtener más información, consulta [Requisitos previos](#prerequisites).
{{< tabs >}}
{{% tab "Amazon OpenSearch" %}}

{{% observability_pipelines/destination_env_vars/amazon_opensearch %}}

{{% /tab %}}
{{% tab "Amazon Security Lake" %}}

{{% observability_pipelines/destination_env_vars/amazon_security_lake %}}

{{% /tab %}}
{{% tab "Chronicle" %}}

{{% observability_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{% tab "CrowdStrike NG-SIEM" %}}

{{% observability_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Datadog Archives" %}}

Para el destino de archivos de Datadog, sigue las instrucciones del proveedor de la nube que utilices para archivar tus logs.

{{% collapse-content title="Amazon S3" level="h5" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /collapse-content %}}
{{% collapse-content title="Google Cloud Storage" level="h5" %}}

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
{{% tab "Socket" %}}

{{% observability_pipelines/destination_env_vars/socket %}}

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
1. Sigue las instrucciones de tu entorno para instalar el worker.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/install_worker/google_gke %}}

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

## Enviar logs al worker de Observability Pipelines a través de Amazon Data Firehose

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

[1]: https://app.datadoghq.com/observability-pipelines
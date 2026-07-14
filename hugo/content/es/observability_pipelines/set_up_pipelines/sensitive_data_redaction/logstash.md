---
disable_toc: false
title: Redacción de datos confidenciales para Logstash
---

## Información general

Los datos confidenciales, como números de tarjetas de crédito, números de ruta bancaria y claves de API, pueden revelarse involuntariamente en tus logs, lo que puede exponer a tu organización a riesgos financieros y de privacidad.

Utiliza pipelines de observabilidad para identificar, etiquetar y, opcionalmente, redactar o hacer hash en información confidencial antes de enrutar logs a diferentes destinos y fuera de tu infraestructura. Puedes utilizar reglas de escaneado predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, etc. O crear reglas de escaneado personalizadas mediante patrones de expresión regular que coincidan con información confidencial. También puedes crear reglas de análisis personalizadas mediante patrones de expresión regular para buscar información confidencial.

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

Este documento te guiará a través de los siguientes pasos:
1. Los [requisitos previos](#prerequisites) necesarios para configurar pipelines de observabilidad
1. [Configuración de pipelines de observabilidad](#set-up-observability-pipelines)
1. [Envío de logs al worker de pipelines de observabilidad](#send-logs-to-the-observability-pipelines-worker-over-logstash)

## Requisitos previos

{{% observability_pipelines/prerequisites/logstash %}}

## Establecer pipelines de observabilidad

1. Navega hasta [Observability Pipelines][1] (Pipelines de observabilidad).
1. Selecciona la plantilla **Sensitive Data Redactions** (Redacciones de datos confidenciales) para crear un nuevo pipeline.
1. Selecciona el origen **Logstash**.

### Configurar el origen

{{% observability_pipelines/source_settings/logstash %}}

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

{{% observability_pipelines/processors/add_processors_sds %}}

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
{{% tab "Reduce" %}}

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

### Instalar el worker de pipelines de observabilidad
1. Selecciona tu plataforma en el menú desplegable **Choose your installation platform** (Elige tu plataforma de instalación).
1. Introduce la dirección y el puerto de Logstash, como `0.0.0.0:9997`. El worker de pipelines de observabilidad escucha en esta dirección los mensajes entrantes de log.
1. Proporciona las variables de entorno para cada uno de los destinos seleccionados. Consulta los [prerrequisitos](#prerequisites) para obtener más información.
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

## Enviar logs al worker de pipelines de observabilidad a través de Logstash

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: https://app.datadoghq.com/observability-pipelines
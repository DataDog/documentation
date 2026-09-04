---
cascade:
  algolia:
    category: Guía
    rank: 20
    subcategory: Guías de integraciones
disable_toc: true
private: true
title: Guías de integración
---

{{< header-list header="Guías generales" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Solicitar integraciones de Datadog{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}Añadir metadatos personalizados con tablas de referencia{{< /nextlink >}}
    {{< nextlink href="integrations/guide/source-code-integration" tag=" Documentation" >}}Integración del código fuente en Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/high_availability" tag=" Documentation" >}}Compatibilidad de alta disponibilidad (HA) del Datadog Agent{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}Retraso de métricas en la nube{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}Añadir archivos de logs de eventos a la clase `Win32_NTLogEvent`{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}Recuperar métricas de WMI{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}Recopilar métricas personalizadas de MongoDB{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Asignar métricas de Prometheus a métricas de Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}Recopilar métricas de Prometheus y OpenMetrics desde un host{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}Tickets de Freshservice con webhooks{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}Error de la integración Hadoop Distributed File System (HDFS){{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Monitorización de HCP Consul con Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}El Agent no pudo recuperar el stub de RMIServer{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Enviar métricas de host TCP/UDP a la API de Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}SNMP frecuentemente utilizados y OID compatibles{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}Versiones de integraciones basadas en OpenMetrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Configuración manual de Pivotal Cloud Foundry{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Application Monitoring para VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Cluster Monitoring para VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/fips-integrations" tag=" fips" >}}FIPS Verified Agent Integrations{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de AWS" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}Configuración automática de la integración AWS con CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Configuración automática de la integración AWS con Terraform{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}Configuración multicuenta de la integración AWS para organizaciones{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}Configuración manual de la integración AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}Solucionar problemas de la integración AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}Monitorizar tu información de facturación de AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}Error: Datadog no tiene autorización para realizar sts:AssumeRole{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}AWS CloudWatch Metric Streams con Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Uso de Amazon CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Crear eventos de Datadog a partir de correos electrónicos de Amazon SNS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}Integración AWS y preguntas frecuentes sobre CloudWatch{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de AWS Marketplace:" >}}
    {{< nextlink href="integrations/guide/aws-marketplace-datadog-trial" tag=" AWS Marketplace" >}}Configurar la prueba de AWS Marketplace en Datadog{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de Azure:" >}}
    {{< nextlink href="integrations/guide/azure-integrations" tag=" Azure" >}}Integraciones Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-advanced-configuration" tag=" Azure" >}}Configuración avanzada de Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-integration" tag=" Azure" >}}Integración nativa de Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Marco de adopción de la nube de Azure con Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Permisos de API de Microsoft Graph para monitorizar Azure{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de Google Cloud" >}}
    {{< nextlink href="integrations/guide/gcp-metric-discrepancy" tag=" gcp" >}}Google Cloud Metric Discrepancy{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de OCI" >}}
    {{< nextlink href="integrations/guide/oci-integration-troubleshooting" tag=" oci" >}}Solucionar problemas de la integración OCI{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de JMX" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}Ejecutar comandos JMX en Windows{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}Recopilar atributos JMX de tipo compuesto{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Uso de expresiones regulares Bean para filtrar tus métricas de JMX y proporcionar etiquetas (tags) adicionales{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}¿Qué integraciones utilizan Jmxfetch?{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmxfetch-fips/" tag=" jmx" >}}Modo JMXFetch FIPS-140{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de ServiceNow" >}}
   {{< nextlink href="integrations/guide/servicenow-itom-itsm-setup" >}}Configurar ServiceNow ITOM y ITSM{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-cmdb-enrichment-setup" >}}Configurar el enriquecimiento de la CMDB de ServiceNow{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-service-graph-connector-setup" >}}Configurar el conector Service Graph de ServiceNow{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de bases de datos" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}Recopilar más métricas de la integración SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}Recopilar métricas personalizadas de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}Uso de WMI para recopilar más métricas de rendimiento de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}Problemas de conexión con la integración SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}Consultas personalizadas MySQL{{< /nextlink >}}
    {{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" Oracle" >}}Configuración de la integración Oracle en la versión del Agent 7.50.1 o posterior{{< /nextlink >}}
    {{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}Configuración de la integración Oracle en versiones del Agent anteriores a 7.50.1{{< /nextlink >}}
{{< /header-list >}}
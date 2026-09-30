---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Integrations Guides
disable_toc: true
private: true
title: Guías de integración
---
{{< header-list header="Guías generales:" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Solicitar integraciones de Datadog{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}Agregar metadatos personalizados con tablas de referencia{{< /nextlink >}}
    {{< nextlink href="source_code" tag=" Documentation" >}}Integración de código fuente de Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/high_availability" tag=" Documentation" >}}Soporte de alta disponibilidad (HA) del Datadog Agent{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}Retraso de métricas en la nube{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}Agregar archivos de registro de eventos a la `Win32_NTLogEvent` clase WMI{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}Recuperación de métricas WMI{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}Recopilar métricas personalizadas de MongoDB{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Asignación de métricas de Prometheus a métricas de Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}Recopilación de métricas de Prometheus y OpenMetrics desde un servidor{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}Tickets de Freshservice mediante Webhooks{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}Error de integración del sistema de archivos distribuido de Hadoop (HDFS){{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Monitoreo de HCP Consul con Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}El Datadog Agent no pudo recuperar el stub de RMIServer{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Enviar métricas de servidor TCP/UDP a la Datadog API{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}OIDs de SNMP de uso común y compatibles{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}Control de versiones para integraciones basadas en OpenMetrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Configuración manual de Pivotal Cloud Foundry{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Monitoreo de aplicaciones de Datadog para VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Monitoreo de clústeres de Datadog para VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/fips-integrations" tag=" fips" >}}Agent Integrations verificadas por FIPS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_troubleshooting" tag=" Microsoft Teams" >}}Solución de problemas de Microsoft Teams{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_migrate_legacy_connectors" tag=" Microsoft Teams" >}}Migrar desde conectores de Office 365 en Microsoft Teams{{< /nextlink >}}
    {{< nextlink href="integrations/guide/slack-actions" tag=" Slack" >}}Acciones de Slack para incidentes, On-Call, monitores, tableros, flujos de trabajo y cuentas{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de AWS" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}Configuración automática de la integración de AWS con CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}Configuración automática de la integración de AWS con Terraform{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}Configuración de la integración de AWS para varias cuentas para Organizations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}Configuración manual de la integración de AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}Solución de problemas de la integración de AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-metric-name-filters" tag=" AWS" >}}Configurar filtros de nombres de métricas de AWS con la API{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}Monitorear los detalles de facturación de AWS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}Error: Datadog no tiene autorización para realizar sts:AssumeRole{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}AWS CloudWatch Metric Streams con Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Uso de Amazon CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Crear eventos de Datadog a partir de correos electrónicos de Amazon SNS{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}Preguntas frecuentes sobre la integración de AWS y CloudWatch{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de AWS Marketplace:" >}}
    {{< nextlink href="integrations/guide/aws-marketplace-datadog-trial" tag=" AWS Marketplace" >}}Configuración de la prueba de Datadog en AWS Marketplace{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de Azure:" >}}
    {{< nextlink href="integrations/guide/azure-integrations" tag=" Azure" >}}Integrations de Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-advanced-configuration" tag=" Azure" >}}Configuración avanzada de Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-integration" tag=" Azure" >}}Integración nativa de Azure{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Marco de adopción de la nube de Azure con Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Permisos de la API de Microsoft Graph para monitorear Azure{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de Google Cloud" >}}
    {{< nextlink href="integrations/guide/gcp-metric-discrepancy" tag=" gcp" >}}Discrepancia de métricas de Google Cloud{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de Alibaba Cloud" >}}
    {{< nextlink href="integrations/guide/alibaba-cloud-integration-troubleshooting" tag="Alibaba Cloud" >}}Solución de problemas de integración de Alibaba Cloud{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de OCI" >}}
    {{< nextlink href="integrations/guide/oci-integration-troubleshooting" tag=" oci" >}}Solución de problemas de la integración OCI{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de JMX" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}Ejecución de comandos JMX en Windows{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}Recopilación de atributos JMX de tipo composite{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Use expresiones regulares de Bean para filtrar sus métricas JMX y proporcionar etiquetas adicionales{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}¿Qué integraciones usan Jmxfetch?{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmxfetch-fips/" tag=" jmx" >}}Modo FIPS-140 de JMXFetch{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de ServiceNow" >}}
   {{< nextlink href="integrations/guide/servicenow-itom-itsm-setup" >}}Configure ServiceNow ITOM e ITSM{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-cmdb-enrichment-setup" >}}Configurar el enriquecimiento de CMDB de ServiceNow{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-service-graph-connector-setup" >}}Configurar el conector Service Graph de ServiceNow{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Guías de bases de datos" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}Recopile más métricas de la integración de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}Recopile métricas personalizadas de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}Use WMI para recopilar más métricas de rendimiento de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}Problemas de conexión con la integración de SQL Server{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}Consultas personalizadas de MySQL{{< /nextlink >}}
    {{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" Oracle" >}}Configuración de la integración de Oracle en Agent 7.50.1+{{< /nextlink >}}
    {{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}Configuración de la integración de Oracle en versiones de Agent inferiores a 7.50.1{{< /nextlink >}}
{{< /header-list >}}
---
title: Integration Guides
disable_toc: true
private: true
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: Integrations Guides
---

{{< header-list header="General guides" >}}
    {{< nextlink href="integrations/guide/requests" tag=" documentation" >}}Request Datadog integrations{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/reference-tables/" tag=" Documentation" >}}Add Custom Metadata with Reference Tables{{< /nextlink >}}
    {{< nextlink href="source_code" tag=" Documentation" >}}Datadog Source Code Integration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/high_availability" tag=" Documentation" >}}High Availability (HA) support of the Datadog Agent{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-metric-delay" tag=" cloud" >}}Cloud metric delay{{< /nextlink >}}
    {{< nextlink href="integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class" tag=" Windows" >}}Add event log files to the `Win32_NTLogEvent` WMI class{{< /nextlink >}}
    {{< nextlink href="integrations/guide/retrieving-wmi-metrics" tag=" Windows" >}}Retrieving WMI metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mongo-custom-query-collection" tag=" MongoDB" >}}Collect MongoDB custom metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-metrics" tag=" Prometheus" >}}Mapping Prometheus metrics to Datadog metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/prometheus-host-collection" tag=" Prometheus" >}}Prometheus and OpenMetrics metrics collection from a host{{< /nextlink >}}
    {{< nextlink href="integrations/guide/freshservice-tickets-using-webhooks" tag=" Webhooks" >}}Freshservice tickets using Webhooks{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hadoop-distributed-file-system-hdfs-integration-error" tag=" Hadoop" >}}Hadoop Distributed File System (HDFS) integration error{{< /nextlink >}}
    {{< nextlink href="integrations/guide/hcp-consul" tag=" Consul" >}}Monitoring HCP Consul with Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/agent-failed-to-retrieve-rmiserver-stub" tag=" kafka" >}}Agent failed to retrieve RMIServer stub{{< /nextlink >}}
    {{< nextlink href="integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/" tag=" network" >}}Send TCP/UDP host metrics to the Datadog API{{< /nextlink >}}
    {{< nextlink href="integrations/guide/snmp-commonly-used-compatible-oids/" tag=" snmp" >}}SNMP commonly used and compatible OIDs{{< /nextlink >}}
    {{< nextlink href="integrations/guide/versions-for-openmetrics-based-integrations" tag=" openmetrics" >}}Versioning for OpenMetrics-based integrations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cloud-foundry-setup" tag=" pivotal cloud foundry" >}}Pivotal Cloud Foundry manual setup{{< /nextlink >}}
    {{< nextlink href="integrations/guide/application-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Application Monitoring for VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/cluster-monitoring-vmware-tanzu" tag=" VMWare Tanzu" >}}Datadog Cluster Monitoring for VMware Tanzu{{< /nextlink >}}
    {{< nextlink href="integrations/guide/fips-integrations" tag=" fips" >}}FIPS Verified Agent Integrations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/microsoft_teams_troubleshooting" tag=" Microsoft Teams" >}}Troubleshooting Microsoft Teams{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="AWS guides" >}}
    {{< nextlink href="getting_started/integrations/aws/" tag=" AWS" >}}AWS integration automatic setup with CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-terraform-setup" tag=" AWS" >}}AWS integration automatic setup with Terraform{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-organizations-setup" tag=" AWS" >}}AWS integration multi-account setup for Organizations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-manual-setup" tag=" AWS" >}}AWS integration manual setup{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-troubleshooting" tag=" AWS" >}}Troubleshooting the AWS integration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/monitor-your-aws-billing-details" tag=" AWS" >}}Monitor your AWS billing details{{< /nextlink >}}
    {{< nextlink href="integrations/guide/error-datadog-not-authorized-sts-assume-role" tag=" AWS" >}}Error: Datadog is not authorized to perform sts:AssumeRole{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose" tag=" AWS" >}}AWS CloudWatch Metric Streams with Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="integrations/guide/amazon_cloudformation" tag=" AWS" >}}Using Amazon CloudFormation{{< /nextlink >}}
    {{< nextlink href="integrations/guide/events-from-sns-emails" tag=" AWS" >}}Create Datadog events from Amazon SNS emails{{< /nextlink >}}
    {{< nextlink href="integrations/guide/aws-integration-and-cloudwatch-faq" tag=" AWS" >}}AWS integration and CloudWatch FAQ{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="AWS Marketplace guides:" >}}
    {{< nextlink href="integrations/guide/aws-marketplace-datadog-trial" tag=" AWS Marketplace" >}}AWS Marketplace Datadog trial setup{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Azure guides:" >}}
    {{< nextlink href="integrations/guide/azure-integrations" tag=" Azure" >}}Azure Integrations{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-advanced-configuration" tag=" Azure" >}}Azure Advanced Configuration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-native-integration" tag=" Azure" >}}Azure Native Integration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-cloud-adoption-framework" tag=" Azure" >}}Azure Cloud Adoption Framework with Datadog{{< /nextlink >}}
    {{< nextlink href="integrations/guide/azure-graph-api-permissions" tag=" Azure" >}}Microsoft Graph API Permissions for Monitoring Azure{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Google Cloud guides" >}}
    {{< nextlink href="integrations/guide/gcp-metric-discrepancy" tag=" gcp" >}}Google Cloud Metric Discrepancy{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="OCI guides" >}}
    {{< nextlink href="integrations/guide/oci-integration-troubleshooting" tag=" oci" >}}OCI Integration Troubleshooting{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="JMX guides" >}}
    {{< nextlink href="integrations/guide/running-jmx-commands-in-windows" tag=" jmx" >}}Running JMX commands in Windows{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collecting-composite-type-jmx-attributes" tag=" jmx" >}}Collecting composite-type JMX attributes{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags" tag=" jmx" >}}Use Bean regexes to filter your JMX metrics and supply additional tags{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmx_integrations/" tag=" jmx" >}}Which integrations use Jmxfetch?{{< /nextlink >}}
    {{< nextlink href="integrations/guide/jmxfetch-fips/" tag=" jmx" >}}JMXFetch FIPS-140 mode{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="ServiceNow guides" >}}
   {{< nextlink href="integrations/guide/servicenow-itom-itsm-setup" >}}Set up ServiceNow ITOM and ITSM{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-cmdb-enrichment-setup" >}}Set up ServiceNow CMDB Enrichment{{< /nextlink >}}
   {{< nextlink href="integrations/guide/servicenow-service-graph-connector-setup" >}}Set up ServiceNow Service Graph Connector{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Database guides" >}}
    {{< nextlink href="integrations/guide/collect-more-metrics-from-the-sql-server-integration" tag=" SQL Server" >}}Collect more metrics from the SQL Server integration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/collect-sql-server-custom-metrics" tag=" SQL Server" >}}Collect SQL Server custom metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics" tag=" SQL Server" >}}Use WMI to collect more SQL Server performance metrics{{< /nextlink >}}
    {{< nextlink href="integrations/guide/connection-issues-with-the-sql-server-integration" tag=" SQL Server" >}}Connection issues with the SQL Server integration{{< /nextlink >}}
    {{< nextlink href="integrations/guide/mysql-custom-queries" tag=" MySQL" >}}MySQL custom queries{{< /nextlink >}}
    {{< nextlink href="integrations/guide/oracle-check-upgrade-7.50.1" tag=" Oracle" >}}Configuring the Oracle Integration on Agent 7.50.1+{{< /nextlink >}}
    {{< nextlink href="integrations/guide/deprecated-oracle-integration" tag=" Oracle" >}}Configuring the Oracle Integration on Agent versions lower than 7.50.1{{< /nextlink >}}
{{< /header-list >}}
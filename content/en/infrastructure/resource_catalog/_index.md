---
title: Datadog Resource Catalog
is_beta: true
aliases:
  - /security_platform/cspm/resource_catalog
  - /security/cspm/resource_catalog
  - /security/misconfigurations/resource_catalog
further_reading:
- link: "/security/cloud_security_management/misconfigurations/"
  tag: "Documentation"
  text: "Cloud Security Misconfigurations"
- link: "/security/threats/"
  tag: "Documentation"
  text: "Workload Protection"
- link: "https://www.datadoghq.com/blog/datadog-resource-catalog/"
  tag: "Blog"
  text: "Govern your infrastructure resources with the Datadog Resource Catalog"
- link: "https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/"
  tag: "Blog"
  text: "Troubleshoot infrastructure issues faster with Recent Changes"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Resource Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Resource Catalog is the central hub of all your infrastructure resources. It can help you manage resource compliance, investigate root causes for incidents, and close observability gaps on your infrastructure. With the Resource Catalog, you can understand key resource information such as metadata, ownership, configurations, relationship between assets, and active security risks for your resources.

Resource Catalog leverages Datadog cloud integrations and the Datadog Agent to gather data from cloud resources such as hosts, databases, and storage services.

{{< img src="/infrastructure/resource_catalog/resource_catalog_new_2.png" alt="The Resource Catalog page showing the Catalog tab, grouped by resource type" width="100%">}}

### Use Cases

#### Resource policies and reporting
- Gain visibility into the compliance of your infrastructure with regards to ownership, versioning, migrations, and so on.
- Facilitate good tagging practices to optimize cross-telemetry insights.
- Reduce application risks by identifying and fixing security vulnerabilities in the dependencies of your services.
- Provide engineering leadership with a high-level view of security practices across teams and cloud accounts.
- Export resources for record-keeping or auditing.

#### Troubleshoot incidents and performance issues
- Access telemetry, dashboards and other Datadog views with rich insights to understand the health and performance of your resources.
- Locate team and service owners of relevant resources to speed up incident recovery.
- View resource configuration changes to identify probable root causes.

#### Optimize observability
- Spot resources that can be better monitored by Datadog and bridge observability gaps.
- Ensure proper security coverage by identifying resources that are most prone to misconfigurations or are not actively reporting security misconfigurations.

## Setup

By default, when you navigate to the Resource Catalog, you are able to see Datadog Agent monitored hosts, as well as cloud resources crawled for other Datadog products such as CNM (Cloud Network Monitoring), and DBM (Database Monitoring). To view additional cloud resources in the Resource Catalog, toggle on **extend resource collection** from the [Resource Catalog][5] setup page. 

{{< img src="/infrastructure/resource_catalog/resource-catalog-doc-img-2.png" alt="The Resource Catalog configuration page for extending resource collection" width="100%">}}

**Note**: Extending resource collection does _not_ incur additional costs. The Resource Catalog is a free product for Infrastructure Monitoring customers.

## Browse the Resource Catalog

On the [Resource Catalog page][2], explore the cloud resources in your Datadog organization. The catalog detects a resource either because it has an Agent installed on it, or because a cloud integration is configured on it. 

### Catalog tab

The Catalog tab shows context for a resource, including team ownership and related services. It helps you proactively identify and fill in missing ownership information before it's needed in an incident. The Resource Catalog also shows resource attributes customized for each resource type. You can search resources by specific attributes such as the instance type for a host, or the version for a database.

**Note**: If you use [Datadog Teams][4], select the **Teams** toggle on the left panel, then select the toggle for the teams to which you're assigned to view only the resources assigned to those teams. In addition, you can export your Resource Catalog list as a CSV file from the top right corner of the list.

To access the relevant cloud console for any resource in your list, click on a resource to open a side panel. Then, click the **Open Resource** dropdown in the top right corner to be redirected.

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel_2.png" alt="Resource Catalog side panel highlighting the Open Resource drop down" >}}

### Investigate a host or resource

<div class="alert alert-info">No secrets are displayed in this panel. Any displayed "secrets" are randomly generated strings that do not pose a security risk.</div>

Clicking on a host opens a side panel with details including:

- **Host information** such as the name, account, OS, instance type, tags, and metadata associated with the resource
- **Telemetry** including metrics, logs, traces, processes, and so on
- **Active monitor alerts** and enabled monitors status on the host
- **Agent configuration** information

{{< img src="/infrastructure/resource_catalog/resource_catalog_host_side_panel.png" alt="Resource Catalog with the host side panel open" width="100%">}}

Clicking on any resource opens a side panel with details including:

- **Resource information** such as the resource type, name, account, and tags associated with the resource.
- **Resource definition** in JSON showing the full configuration of the asset.
- **Recent Changes** showing a 7-day history of changes to the resource
- **Relationship** view showing interdependencies between resources
- **Service and team ownership** of the resource
- **Security risks** that the resource is exposed to, including misconfigurations, signals, identity risks, and vulnerabilities

## Recent changes

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
  <strong>Recent Changes</strong> is in Preview, but you can easily request access! Use this form to submit your request today.
{{< /callout >}} 

**Recent Changes** displays a 7-day history of all configuration changes to [supported resources][15] across your environments. To forward change events from your cloud environments, either enable Snapshot Changes through Resource Collection or follow the links for your cloud providers in the sections below.

**Prerequisites**: 
   - You have selected to `Enable Resource Collection` under the **Resource Collection** tab on the [cloud provider integration tile][7]. 
   - You have [access to the Preview][9].
   - Optionally, you can configure change event forwarding through one of the following cloud providers.

#### Snapshot Changes

Snapshot Changes is a generated Event Stream captured every 5 - 15 minutes through resource collection and requires no additional setup. For more frequent change updates, follow the links for your cloud providers in the following sections.

#### AWS

See the [AWS Config integration page][6] to launch a CloudFormation template that sets up change event forwarding through AWS Config. AWS Config captures configuration changes in real time, or to the extent allowed by your configuration.

#### Azure

To collect resource configuration changes, enable **Resource Collection** for your Azure subscriptions in the [Azure integration tile][14]. Azure Resource Graph captures configuration changes every 10 minutes.

#### Google Cloud Platform

See the [Resource changes collection][8] section of the Google Cloud Platform integration page for instructions on forwarding change events through a Pub/Sub topic and subscription. Google Cloud Asset Inventory captures configuration changes every 10 minutes.

## Supported Resource types

The Resource Catalog supports 100+ key resource types as listed below. For a full list of resource types supported in the Datadog platform see [here][15].

- host
- aws_acm
- aws_ami
- aws_cloudfront_distribution
- aws_cloudtrail_trail
- aws_docdb_cluster
- aws_dynamodb
- aws_ebs_snapshot
- aws_ebs_volume
- aws_ec2_instance
- aws_ec2_vpcendpoint_service
- aws_ecs_cluster
- aws_eks_cluster
- aws_elasticache
- aws_elasticsearch_domain
- aws_elb_load_balancer
- aws_elbv2_load_balancer
- aws_eni
- aws_iam_account
- aws_iam_policy
- aws_iam_role
- aws_iam_server_certificate
- aws_iam_user
- aws_kms
- aws_lambda_function
- aws_mq_broker
- aws_network_acl
- aws_rds_db_snapshot
- aws_rds_instance
- aws_redshift_cluster
- aws_s3_account_public_access_block
- aws_s3_bucket
- aws_security_group
- aws_sns_topic
- aws_sqs_queue
- aws_vpc
- aws_vpc_endpoint
- aws_vpc_nat_gateway
- aws_vpc_peering_connection
- azure_activity_log_alert
- azure_aks_cluster
- azure_app_service
- azure_automation_account
- azure_container_apps
- azure_container_registry
- azure_diagnostic_setting
- azure_function
- azure_key_vault
- azure_key_vault_key
- azure_key_vault_secret
- azure_load_balancer
- azure_load_balancer_probe
- azure_log_analytics_storage_insight
- azure_log_analytics_workspace
- azure_managed_disk
- azure_mysql_server
- azure_network_application_gateway
- azure_network_interface
- azure_network_public_ip_address
- azure_network_subnet
- azure_network_vnet
- azure_network_vnet_peering
- azure_network_watcher
- azure_policy_assignment
- azure_postgresql_firewall_rule
- azure_postgresql_server
- azure_role_assignment
- azure_role_definition
- azure_security_center_auto_provisioning
- azure_security_contact
- azure_security_group
- azure_sql_firewall_rule
- azure_sql_server
- azure_sql_server_database
- azure_storage_account
- azure_storage_blob_container
- azure_subscription
- azure_virtual_machine_instance
- gcp_bigquery_dataset
- gcp_bigquery_table
- gcp_cloudfunctions_function
- gcp_compute_disk
- gcp_compute_external_vpn_gateway
- gcp_compute_firewall
- gcp_compute_instance
- gcp_compute_network
- gcp_compute_project
- gcp_compute_route
- gcp_compute_router
- gcp_compute_ssl_policy
- gcp_compute_subnetwork
- gcp_compute_target_http_proxy
- gcp_compute_target_https_proxy
- gcp_compute_target_ssl_proxy
- gcp_compute_target_vpn_gateway
- gcp_compute_vpn_gateway
- gcp_compute_vpn_tunnel
- gcp_dataproc_cluster
- gcp_dns_managed_zone
- gcp_dns_policy
- gcp_folder
- gcp_iam_policy
- gcp_iam_service_account
- gcp_iam_service_account_key
- gcp_kms_crypto_key
- gcp_logging_log_bucket
- gcp_logging_log_metric
- gcp_logging_log_sink
- gcp_monitoring_alert_policy
- gcp_organization
- gcp_project
- gcp_sql_database_instance
- gcp_storage_bucket

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /integrations/#cat-notification
[4]: /account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /integrations/amazon_config/#resource-changes-collection
[7]: https://app.datadoghq.com/integrations
[8]: /integrations/google_cloud_platform/#resource-changes-collection
[9]: https://www.datadoghq.com/product-preview/recent-changes-tab/
[10]: https://docs.datadoghq.com/security/cloud_security_management/misconfigurations/
[11]: https://docs.datadoghq.com/security/threats/
[12]: https://docs.datadoghq.com/security/cloud_security_management/identity_risks/
[13]: https://docs.datadoghq.com/security/cloud_security_management/vulnerabilities/
[14]: https://app.datadoghq.com/integrations/azure
[15]: https://docs.datadoghq.com/infrastructure/resource_catalog/schema/

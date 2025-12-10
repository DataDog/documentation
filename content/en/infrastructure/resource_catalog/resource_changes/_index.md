---
title: Resource Changes
further_reading:
- link: "/infrastructure/resource_catalog/"
  tag: "Documentation"
  text: "Datadog Resource Catalog Overview"
- link: "https://www.datadoghq.com/blog/automate-infrastructure-operations-with-datadog-infrastructure-management/"
  tag: "Blog"
  text: "Automate infrastructure operations with Datadog Infrastructure Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Resource Changes is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
Resource Changes is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}} 

## Overview

Resource Changes provides visibility and control over configuration changes to your cloud infrastructure. It helps you monitor modifications to resources, aiding in troubleshooting incidents and understanding the evolution of your environment.

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="Datadog Resource Changes interface showing a list of infrastructure configuration changes. The table shows multiple resources with timestamps, change types, and details of the modifications. Filters are available at the top for cloud, region, environment, and other attributes." width="100%">}}

Resource Changes supports a variety of resources, including:
- Hosts
- Containers
- Serverless Functions
- Databases
- Queues
- Storage
- Networking
- Monitoring
- Identity
- Data Processing

For a comprehensive list of supported resources, see the [Supported resources](#supported-resources) section.

## Setup

To view configuration changes for your resources, ensure that resource collection is enabled for your cloud resources so they are visible within the Resource Catalog. You can manage this setting from the [Resource Catalog settings page][2] or the relevant [cloud provider integration tile][3]. This step automatically enables [Snapshot Changes](#snapshot-changes) for your resources.

<div class="alert alert-warning">Enabling resource collection can impact your AWS CloudWatch costs. To avoid these charges, disable <strong>Usage</strong> metrics in the <strong>Metric Collection</strong> tab of the <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a>.<br/>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="AWS Usage toggle in account settings" style="width:100%;" >}}</div>

### Snapshot Changes

Snapshot Changes represent configuration and relationship updates that Datadog detects by comparing snapshots of your cloud resources, taken approximately every 5-15 minutes.

To view Snapshot Changes, toggle **Snapshot Changes** on [**Infrastructure > Resources > Resource Changes**][8].

Key characteristics of Snapshot Changes:
- **No Additional Setup**: Requires no extra configuration beyond enabling resource collection.
- **Reflects Net Changes**: Since changes come from snapshots (5-15 minutes apart), they show the net difference, omitting intermediate states.
- **Retention**: Datadog Snapshot Changes are retained for one week.
- **Cost**: Generating Snapshot Changes does not incur additional event charges.

## Navigating and viewing Resource Changes

You can access Resource Changes in the Datadog platform in the following ways:

-  **Main Navigation**: Go to [**Infrastructure > Resources > Resource Changes**][8].
-  **Within a Resource's Side Panel**:
    1. Open the side panel for a specific resource (for example, by clicking on a host in the Resource Catalog or a related host view).
    2. Scroll down to the **Recent Changes** section.

## Querying Resource Changes

The Resource Changes view allows you to search and filter changes using various attributes.

| Query Parameter         | Description                                                                 | Example                                                                          |
| :---------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Change Type             | Filter by the type of change (Update, Create, Delete).                      | `latest_change_type:Update`                                                      |
| Resource Category       | Query across cloud providers for a general category of resource.            | `resource_category:hosts` (shows EC2, Azure VMs, GCP Compute instances, etc.)   |
| Resource Type           | Query for specific resource types.                                          | `resource_type:aws_ec2_instance`                                                 |
| First-Class Attributes  | Filter by attributes like Cloud Provider, Region, Environment, Account, etc. | `cloud_provider:aws region:us-east-1 env:staging account_id:123456789012`     |
| Resource Name           | Search for resources by their display name.                                 | `display_name:*bucket*`                                                          |
| Tags                    | Filter resources based on assigned tags.                                    | `tags:"application:frontend" "owner:team-alpha"`                                   |

### Supported search query types

- **Wildcard**: Use asterisks `*` for partial matching (before and after the term). Example: `service:*example*`
- **Union (OR)**: Use `OR` for multiple values (not available for resource types or categories). Example: `service:(service_a OR service_b)`
- **Exclusion (Empty/Not Empty)**: Use `-` prefix to exclude. Example: `-service:*` (shows resources where the service tag is not set).

## Troubleshooting with Resource Changes

During an incident, the most critical question is often "What changed?". Resource Changes helps you answer this.

When a monitor alerts, you are linked directly to the **Resource Changes** page. This page is pre-filtered with important context from the alert, such as the relevant time frame and any associated tags (like `service`, `env`, or `team`).

Use this centralized page to:

- **Identify risky changes**: Scan the list of modifications that occurred during the incident window for the impacted service, environment, and related shared infrastructure.
- **Investigate the details**: Select any suspicious change to view a side-by-side configuration diff and related logs (such as AWS CloudTrail) that help identify who made the change and why.

## Supported resources

Resource Changes supports a wide array of resources across [AWS](#aws-resources), [Azure](#azure-resources), and [Google Cloud Platform](#gcp-resources).

{{% collapse-content title="AWS" level="h4" expanded=false id="aws-resources" %}}

AWS resource types:

- `aws_acm_certificate`
- `aws_ami_image`
- `aws_autoscaling_group`
- `aws_autoscaling_launch_configuration`
- `aws_autoscaling_policy`
- `aws_autoscaling_scheduled_action`
- `aws_cloudformation_generatedtemplate`
- `aws_cloudformation_resourcescan`
- `aws_cloudformation_stack`
- `aws_cloudformation_stackset`
- `aws_cloudformation_type`
- `aws_cloudfront_anycast_ip_list`
- `aws_cloudfront_cache_policy`
- `aws_cloudfront_continuous_deployment_policy`
- `aws_cloudfront_distribution`
- `aws_cloudfront_field_level_encryption_config`
- `aws_cloudfront_field_level_encryption_profile`
- `aws_cloudfront_function`
- `aws_cloudfront_key_group`
- `aws_cloudfront_managed_cache_policy`
- `aws_cloudfront_managed_origin_request_policy`
- `aws_cloudfront_managed_response_headers_policy`
- `aws_cloudfront_origin_access_control`
- `aws_cloudfront_origin_request_policy`
- `aws_cloudfront_public_key`
- `aws_cloudfront_realtime_log_config`
- `aws_cloudfront_response_headers_policy`
- `aws_cloudfront_streaming_distribution`
- `aws_cloudfront_vpc_origin`
- `aws_cloudtrail_trail`
- `aws_docdb_cluster`
- `aws_dynamodb_table`
- `aws_ebs_snapshot`
- `aws_ebs_volume`
- `aws_ec2_instance`
- `aws_ec2_vpcendpoint_service`
- `aws_eks_cluster`
- `aws_elasticache_cluster`
- `aws_elastic_ip`
- `aws_elasticsearch_domain`
- `aws_elb_load_balancer`
- `aws_elbv2_load_balancer`
- `aws_eni`
- `aws_iam_account_settings`
- `aws_iam_policy`
- `aws_iam_role`
- `aws_iam_server_certificate`
- `aws_iam_user`
- `aws_kms_key`
- `aws_lambda_codesigningconfig`
- `aws_lambda_event_source_mapping`
- `aws_lambda_function`
- `aws_lambda_layer`
- `aws_lambda_policy_statement`
- `aws_mq_broker`
- `aws_network_acl`
- `aws_rds_blue_green_deployment`
- `aws_rds_cluster`
- `aws_rds_cluster_endpoint`
- `aws_rds_cluster_parameter_group`
- `aws_rds_cluster_snapshot`
- `aws_rds_db_cluster_automated_backup`
- `aws_rds_db_shard_group`
- `aws_rds_db_snapshot`
- `aws_rds_event_subscription`
- `aws_rds_export_task`
- `aws_rds_globalcluster`
- `aws_rds_instance`
- `aws_rds_instance_automated_backup`
- `aws_rds_instance_parameter_group`
- `aws_rds_integration`
- `aws_rds_option_group`
- `aws_rds_option_group_to_security_group`
- `aws_rds_proxy`
- `aws_rds_proxy_endpoint`
- `aws_rds_proxy_target_group`
- `aws_rds_reserved_instance`
- `aws_rds_security_group`
- `aws_rds_security_group_ip_range`
- `aws_rds_snapshot_tenant_database`
- `aws_rds_subnet_group`
- `aws_rds_tenant_database`
- `aws_redshift_cluster`
- `aws_s3_account_public_access_block`
- `aws_s3_bucket`
- `aws_security_group`
- `aws_sns_topic`
- `aws_sqs_queue`
- `aws_vpc`
- `aws_vpc_endpoint`
- `aws_vpc_nat_gateway`

{{% /collapse-content %}}

{{% collapse-content title="Azure" level="h4" expanded=false id="azure-resources" %}}

Azure resource types:

- `azure_activity_log_alert`
- `azure_aks_cluster`
- `azure_app_service`
- `azure_app_service_plan`
- `azure_automation_account`
- `azure_container_apps`
- `azure_container_registry`
- `azure_diagnostic_setting`
- `azure_function_app`
- `azure_key_vault`
- `azure_key_vault_key`
- `azure_key_vault_secret`
- `azure_load_balancer_probe`
- `azure_log_analytics_storage_insight`
- `azure_log_analytics_workspace`
- `azure_managed_disk`
- `azure_mysql_server`
- `azure_network_application_gateway`
- `azure_network_interface`
- `azure_network_public_ip_address`
- `azure_network_subnet`
- `azure_network_vnet`
- `azure_network_vnet_peering`
- `azure_network_watcher`
- `azure_policy_assignment`
- `azure_postgresql_firewall_rule`
- `azure_postgresql_server`
- `azure_role_assignment`
- `azure_role_definition`
- `azure_security_center_auto_provisioning`
- `azure_security_contact`
- `azure_security_group`
- `azure_sql_firewall_rule`
- `azure_sql_server`
- `azure_sql_server_database`
- `azure_storage_account`
- `azure_storage_blob_container`
- `azure_subscription`
- `azure_virtual_machine_instance`

{{% /collapse-content %}}

{{% collapse-content title="Google Cloud Platform" level="h4" expanded=false id="gcp-resources" %}}

Google Cloud Platform resource types:

- `gcp_bigquery_dataset`
- `gcp_bigquery_table`
- `gcp_cloudfunctions_function`
- `gcp_compute_disk`
- `gcp_compute_external_vpn_gateway`
- `gcp_compute_firewall`
- `gcp_compute_instance`
- `gcp_compute_network`
- `gcp_compute_project_metadata`
- `gcp_compute_route`
- `gcp_compute_router`
- `gcp_compute_ssl_policy`
- `gcp_compute_subnetwork`
- `gcp_compute_target_http_proxy`
- `gcp_compute_target_https_proxy`
- `gcp_compute_target_ssl_proxy`
- `gcp_compute_target_vpn_gateway`
- `gcp_compute_vpn_gateway`
- `gcp_compute_vpn_tunnel`
- `gcp_dataproc_cluster`
- `gcp_dns_managed_zone`
- `gcp_dns_policy`
- `gcp_folder`
- `gcp_gke_worker_node`
- `gcp_iam_policy`
- `gcp_iam_role`
- `gcp_iam_service_account`
- `gcp_iam_service_account_key`
- `gcp_kms_crypto_key`
- `gcp_kubernetes_engine_cluster`
- `gcp_kubernetes_engine_node_pool`
- `gcp_logging_log_bucket`
- `gcp_logging_log_metric`
- `gcp_logging_log_sink`
- `gcp_monitoring_alert_policy`
- `gcp_organization`
- `gcp_project`
- `gcp_run_revision`
- `gcp_sql_database_instance`
- `gcp_storage_bucket`
{{% /collapse-content %}}

If you have a request for an additional resource type, contact [Datadog Support][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/infrastructure/catalog
[2]: https://app.datadoghq.com/infrastructure/catalog/configuration
[3]: https://app.datadoghq.com/integrations
[7]: /help/
[8]: https://app.datadoghq.com/infrastructure/catalog/changes

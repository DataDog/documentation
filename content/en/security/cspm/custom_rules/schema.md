---
title: Cloud Resources Schema Reference
kind: documentation
aliases:
  - /security_platform/cspm/custom_rules/schema
---
When you [write custom rules for CSPM][1], you specify the resource types that are referenced by the rules. 

## GCP

{{< whatsnext desc="Review detailed information about GCP resource types in the following pages." >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_sql_database_instance/" >}}<code>gcp_sql_database_instance</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_compute_instance/" >}}<code>gcp_compute_instance</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_iam_policy/" >}}<code>gcp_iam_policy</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_compute_firewall/" >}}<code>gcp_compute_firewall</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_dns_managed_zone/" >}}<code>gcp_dns_managed_zone</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_iam_service_account/" >}}<code>gcp_iam_service_account</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_compute_network/" >}}<code>gcp_compute_network</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_project/" >}}<code>gcp_project</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_bigquery_table/" >}}<code>gcp_bigquery_table</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_storage_bucket/" >}}<code>gcp_storage_bucket</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_dataproc_cluster/" >}}<code>gcp_dataproc_cluster</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_iam_service_account_key/" >}}<code>gcp_iam_service_account_key</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/gcp_kms_crypto_key/" >}}<code>gcp_kms_crypto_key</code>{{< /nextlink >}}
{{< /whatsnext >}}

## AWS

{{< whatsnext desc="Review detailed information about AWS resource types in the following pages." >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_account_attributes/" >}}<code>aws_account_attributes</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_account/" >}}<code>aws_account</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_acm/" >}}<code>aws_acm</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ami/" >}}<code>aws_ami</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_apigateway_api/" >}}<code>aws_apigateway_api</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_apigateway_client_certificate/" >}}<code>aws_apigateway_client_certificate</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_autoscaling_group/" >}}<code>aws_autoscaling_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_backup_plan/" >}}<code>aws_backup_plan</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_backup_vault/" >}}<code>aws_backup_vault</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_cloudfront_distribution/" >}}<code>aws_cloudfront_distribution</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_cloudtrail_trail/" >}}<code>aws_cloudtrail_trail</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_config_recorder_status/" >}}<code>aws_config_recorder_status</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_config_recorder/" >}}<code>aws_config_recorder</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_docdb_cluster/" >}}<code>aws_docdb_cluster</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_dynamodb/" >}}<code>aws_dynamodb</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ebs_snapshot/" >}}<code>aws_ebs_snapshot</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ebs_volume/" >}}<code>aws_ebs_snapshot</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ec2_instance_type/" >}}<code>aws_ec2_instance_type</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ec2_prefix_list/" >}}<code>aws_ec2_prefix_list</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ec2/" >}}<code>aws_ec2</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ecr_registry/" >}}<code>aws_ecr_registry</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ecr_repository/" >}}<code>aws_ecr_repository</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_eks_cluster/" >}}<code>aws_eks_cluster</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_eks_nodegroup/" >}}<code>aws_eks_nodegroup</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elasticache/" >}}<code>aws_elasticache</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elasticsearch_domain_policy_statement/" >}}<code>aws_elasticsearch_domain_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elasticsearch_domain/" >}}<code>aws_elasticsearch_domain</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elb_load_balancer_v2/" >}}<code>aws_elb_load_balancer_v2</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elb_load_balancer/" >}}<code>aws_elb_load_balancer</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elbv2_load_balancer_v2/" >}}<code>aws_elbv2_load_balancer_v2</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elbv2_load_balancer/" >}}<code>aws_elbv2_load_balancer</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_eni_group/" >}}<code>aws_eni_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_eni_private_ip/" >}}<code>aws_eni_private_ip</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_eni/" >}}<code>aws_eni</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_account/" >}}<code>aws_iam_account</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_credential_report/" >}}<code>aws_iam_credential_report</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_group/" >}}<code>aws_iam_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_instance_profile/" >}}<code>aws_iam_instance_profile</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_login_profile/" >}}<code>aws_iam_login_profile</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_policy_version_statement/" >}}<code>aws_iam_policy_version_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_policy/" >}}<code>aws_iam_policy</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_role_policy_statement/" >}}<code>aws_iam_role_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_role/" >}}<code>aws_iam_role</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_server_certificate/" >}}<code>aws_iam_server_certificate</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_user/" >}}<code>aws_iam_user</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_kms_alias_policy_statement/" >}}<code>aws_kms_alias_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_kms_alias_policy_statement/" >}}<code>aws_kms_alias_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_kms_alias/" >}}<code>aws_kms_alias</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_kms/" >}}<code>aws_kms</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_lambda_function/" >}}<code>aws_lambda_function</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_lambda_policy_statement/" >}}<code>aws_lambda_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_mq_broker/" >}}<code>aws_mq_broker</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_mq_configuration_revision/" >}}<code>aws_mq_configuration_revision</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_mq_configuration/" >}}<code>aws_mq_configuration</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_mq_user/" >}}<code>aws_mq_user</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_network_acl_association/" >}}<code>aws_network_acl_association</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_network_acl/" >}}<code>aws_network_acl</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_organizations_account/" >}}<code>aws_organizations_account</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_organizations_organization/" >}}<code>aws_organizations_organization</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_organizations_organizational_unit/" >}}<code>aws_organizations_organizational_unit</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_organizations_policy_statement/" >}}<code>aws_organizations_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_organizations_root/" >}}<code>aws_organizations_root</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_rds_db_snapshot/" >}}<code>aws_rds_db_snapshot</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_rds_instance/" >}}<code>aws_rds_instance</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_rds_security_group_ip_range/" >}}<code>aws_rds_security_group_ip_range</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_rds_security_group/" >}}<code>aws_rds_security_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_redshift_cluster_v2/" >}}<code>aws_redshift_cluster_v2</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_redshift_cluster/" >}}<code>aws_redshift_cluster_v2</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_route_table/" >}}<code>aws_route_table</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_route53_domain/" >}}<code>aws_route53_domain</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_route53_hosted_zone/" >}}<code>aws_route53_hosted_zone</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_s3_account_public_access_block/" >}}<code>aws_s3_account_public_access_block</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_s3_bucket_policy_statement/" >}}<code>aws_s3_bucket_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_s3_bucket/" >}}<code>aws_s3_bucket</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_security_group_rule/" >}}<code>aws_security_group_rule</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_security_group/" >}}<code>aws_security_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_sns_policy_statement/" >}}<code>aws_sns_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_sns_topic_subscription/" >}}<code>aws_sns_topic_subscription</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_sns_topic/" >}}<code>aws_sns_topic</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_sqs_policy_statement/" >}}<code>aws_sqs_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_sqs_queue/" >}}<code>aws_sqs_queue</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_subnet/" >}}<code>aws_subnet</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_endpoint_policy_statement/" >}}<code>aws_vpc_endpoint_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_endpoint/" >}}<code>aws_vpc_endpoint</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_flow_log/" >}}<code>aws_vpc_flow_log</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_internet_gateway_address/" >}}<code>aws_vpc_internet_gateway_address</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_internet_gateway/" >}}<code>aws_vpc_internet_gateway</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_nat_gateway_address/" >}}<code>aws_vpc_nat_gateway_address</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_nat_gateway/" >}}<code>aws_vpc_nat_gateway</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_peering_connection/" >}}<code>aws_vpc_peering_connection</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_route_table_association/" >}}<code>aws_vpc_route_table_association</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc/" >}}<code>aws_vpc</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_wafv2_acl/" >}}<code>aws_wafv2_acl</code>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /security/cspm/custom_rules/

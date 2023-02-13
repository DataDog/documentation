---
title: Cloud Resources Schema Reference
kind: documentation
aliases:
  - /security_platform/cspm/custom_rules/schema
---
When you [write custom rules for CSPM][1], you specify the resource types that are referenced by the rules. 

## AWS

{{< whatsnext desc="Review detailed information about AWS resource types in the following pages." >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_acm/" >}}<code>aws_acm</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ami/" >}}<code>aws_ami</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_cloudfront_distribution/" >}}<code>aws_cloudfront_distribution</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_cloudtrail_trail/" >}}<code>aws_cloudtrail_trail</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_dynamodb/" >}}<code>aws_dynamodb</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ebs_snapshot/" >}}<code>aws_ebs_snapshot</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ebs_volume/" >}}<code>aws_ebs_volume</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_ec2_instance/" >}}<code>aws_ec2_instance</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elasticache/" >}}<code>aws_elasticache</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_elasticsearch_domain/" >}}<code>aws_elasticsearch_domain</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_eks_cluster/" >}}<code>aws_eks_cluster</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_credential_report/" >}}<code>aws_iam_credential_report</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_policy/" >}}<code>aws_iam_policy</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_role/" >}}<code>aws_iam_role</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_user/" >}}<code>aws_iam_user</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_iam_server_certificate/" >}}<code>aws_iam_server_certificate</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_kms/" >}}<code>aws_kms</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_lambda_function/" >}}<code>aws_lambda_function</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_lambda_policy_statement/" >}}<code>aws_lambda_policy_statement</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_network_acl/" >}}<code>aws_network_acl</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_rds_db_snapshot/" >}}<code>aws_rds_db_snapshot</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_rds_instance/" >}}<code>aws_rds_instance</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_redshift_cluster/" >}}<code>aws_redshift_cluster</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_s3_account_public_access_block/" >}}<code>aws_s3_account_public_access_block</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_s3_bucket/" >}}<code>aws_s3_bucket</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_security_group/" >}}<code>aws_security_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_sns_topic/" >}}<code>aws_sns_topic</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc/" >}}<code>aws_vpc</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/aws_vpc_endpoint_policy_statement/" >}}<code>aws_vpc_endpoint_policy_statement</code>{{< /nextlink >}}
{{< /whatsnext >}}

## Azure

{{< whatsnext desc="Review detailed information about Azure resource types in the following pages." >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_diagnostic_setting/" >}}<code>azure_diagnostic_setting</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_key_vault_key/" >}}<code>azure_key_vault_key</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_key_vault_secret/" >}}<code>azure_key_vault_secret</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_managed_disk/" >}}<code>azure_managed_disk</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_mysql_server/" >}}<code>azure_mysql_server</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_postgresql_firewall_rule/" >}}<code>azure_postgresql_firewall_rule</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_security_center_auto_provisioning/" >}}<code>azure_security_center_auto_provisioning</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_security_contact/" >}}<code>azure_security_contact</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_security_group/" >}}<code>azure_security_group</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_sql_server/" >}}<code>azure_sql_server</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_storage_blob_container/" >}}<code>azure_storage_blob_container</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_subscription/" >}}<code>azure_subscription</code>{{< /nextlink >}}
    {{< nextlink href="/security/cspm/custom_rules/azure_log_analytics_workspace/" >}}<code>azure_log_analytics_workspace</code>{{< /nextlink >}}
{{< /whatsnext >}}
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

[1]: /security/cspm/custom_rules/

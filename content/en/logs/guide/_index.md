---
title: Logs Guides

private: true
disable_toc: true
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: Logs Guides
---

{{< whatsnext desc="Logging Without Limits™" >}}
    {{< nextlink href="logs/guide/access-your-log-data-programmatically" >}}Programmatically access log data using the Logs Search API{{< /nextlink >}}
    {{< nextlink href="logs/guide/getting-started-lwl" >}}Logging Without Limits™ Guide{{< /nextlink >}}
    {{< nextlink href="tracing/other_telemetry/connect_logs_and_traces" >}}Correlate Logs with Traces{{< /nextlink >}}
    {{< nextlink href="logs/guide/correlate-logs-with-metrics" >}}Correlate Logs with Metrics{{< /nextlink >}}
    {{< nextlink href="logs/guide/best-practices-for-log-management" >}}Best Practices for Log Management{{< /nextlink >}}
    {{< nextlink href="logs/guide/manage_logs_and_metrics_with_terraform" >}}Manage Logs and Metrics with Terraform{{< /nextlink >}}
    {{< nextlink href="logs/guide/flex_compute" >}}Monitor Flex Compute Usage{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Collection" >}}
    {{< nextlink href="/agent/logs/advanced_log_collection" >}}Advanced log collection configurations{{< /nextlink >}}
    {{< nextlink href="/logs/guide/reduce_data_transfer_fees" >}}How to send logs to Datadog while reducing data transfer fees{{< /nextlink >}}
    {{< nextlink href="/logs/guide/forwarder/" >}}Set up Datadog Lambda Forwarder{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/" >}}Send AWS services logs with the Datadog Lambda function{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/" >}}Send AWS services logs with the Datadog Amazon Data Firehose Destination{{< /nextlink >}}
    {{< nextlink href="/logs/guide/aws-account-level-logs/" >}}Set up AWS account-level log subscriptions{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/" >}}Sending Events and Logs to Datadog with Amazon EventBridge API Destinations{{< /nextlink >}}
    {{< nextlink href="/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose" >}}Send Amazon EKS Fargate Logs with Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="/logs/guide/google-cloud-log-forwarding" >}}Google Cloud Log Forwarding Setup{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-automated-log-forwarding" >}}Azure Automated Log Forwarding{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-manual-log-forwarding" >}}Azure Manual Log Forwarding{{< /nextlink >}}
    {{< nextlink href="/logs/guide/apigee" >}}Collect Apigee Logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/fluentbit" >}}Send Fluent Bit Logs{{< /nextlink >}}
    {{< nextlink href="/integrations/google_cloud_platform/#log-collection" >}}Collect Google Cloud logs with the Datadog Dataflow template{{< /nextlink >}}
    {{< nextlink href="/logs/guide/google-cloud-logging-recommendations" >}}Google Cloud Log Forwarding Configuration Recommendations{{< /nextlink >}}
    {{< nextlink href="/logs/guide/collect-google-cloud-logs-with-push/" >}}Collect Google Cloud logs with a Pub/Sub Push subscription{{< /nextlink >}}
    {{< nextlink href="logs/guide/collect-heroku-logs" >}}Collect Heroku Logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/log-collection-troubleshooting-guide" >}}Log Collection Troubleshooting Guide{{< /nextlink >}}
    {{< nextlink href="logs/guide/docker-logs-collection-troubleshooting-guide" >}}Docker Log Collection Troubleshooting Guide{{< /nextlink >}}
    {{< nextlink href="logs/guide/lambda-logs-collection-troubleshooting-guide" >}}Lambda Log Collection Troubleshooting Guide{{< /nextlink >}}
    {{< nextlink href="logs/guide/setting-file-permissions-for-rotating-logs" >}}Setting File Permissions for Rotating Logs (Linux){{< /nextlink >}}
    {{< nextlink href="/logs/guide/how-to-set-up-only-logs" >}}Use the Datadog Agent for Log Collection Only{{< /nextlink >}}
    {{< nextlink href="logs/guide/increase-number-of-log-files-tailed" >}}Increase the Number of Log Files Tailed by the Agent{{< /nextlink >}}
    {{< nextlink href="/logs/guide/container-agent-to-tail-logs-from-host" >}}Use the Container Agent to Tail Logs from the Host{{< /nextlink >}}
    {{< nextlink href="/logs/guide/mechanisms-ensure-logs-not-lost" >}}Mechanisms to Ensure Logs are Not Lost{{< /nextlink >}}
    {{< nextlink href="/logs/guide/custom-log-file-with-heightened-read-permissions" >}}Send Logs from a Custom Log File with Heightened Read Permissions{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Processing" >}}
    {{< nextlink href="logs/guide/log-parsing-best-practice" >}}Log Parsing Best Practices{{< /nextlink >}}
    {{< nextlink href="/logs/guide/commonly-used-log-processing-rules" >}}Commonly Used Log Processing Rules{{< /nextlink >}}
    {{< nextlink href="/logs/guide/logs-not-showing-expected-timestamp" >}}Logs Not Showing the Expected Timestamp{{< /nextlink >}}
    {{< nextlink href="/logs/guide/remap-custom-severity-to-official-log-status" >}}Remap Custom Severity Values to the Official Log Status{{< /nextlink >}}
    {{< nextlink href="/logs/guide/logs-show-info-status-for-warnings-or-errors" >}}Logs Show Info Status for Warnings or Errors{{< /nextlink >}}
    {{< nextlink href="/logs/guide/regex_log_parsing" >}}Understanding Regular Expressions (Regex) for Log Parsing in Datadog{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Queries" >}}
    {{< nextlink href="logs/guide/collect-multiple-logs-with-pagination" >}}Collect multiple logs with the Log List API and pagination{{< /nextlink >}}
    {{< nextlink href="/logs/guide/build-custom-reports-using-log-analytics-api/?tab=table" >}}Build custom reports using Log Analytics API{{< /nextlink >}}
    {{< nextlink href="/logs/guide/detect-unparsed-logs/" >}}Monitor and query for unparsed logs{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Analysis with Notebooks" >}}
    {{< nextlink href="/logs/guide/analyze_ecommerce_ops" >}}Analyze E-Commerce Operations Using Payment and Customer Feedback Data{{< /nextlink >}}
    {{< nextlink href="/logs/guide/analyze_finance_operations" >}}Analyze Finance Operations Using Payment and Transaction Data{{< /nextlink >}}
    {{< nextlink href="/logs/guide/analyze_login_attempts" >}}Analyze Login Attempts for Security and Compliance{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Sensitive Data Management" >}}
    {{< nextlink href="logs/guide/logs-rbac" >}}How to set up RBAC for Logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-rbac-permissions" >}}Learn more about RBAC permissions for Logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/manage-sensitive-logs-data-access" >}}Manage sensitive logs data access{{< /nextlink >}}
    {{< nextlink href="/logs/guide/delete_logs_with_sensitive_data/" >}}Delete Logs with Sensitive Data{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Integrations" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}Ease troubleshooting with cross-product correlation{{< /nextlink >}}
{{< /whatsnext >}}

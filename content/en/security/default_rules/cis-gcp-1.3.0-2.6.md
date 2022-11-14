---
aliases:
- df5-3ga-4df
- /security_monitoring/default_rules/df5-3ga-4df
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.6
disable_edit: true
integration_id: google_logging_log_metric
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_logging_log_metric
title: A log metric filter and alerts exist for custom role changes
type: security_rules
---

## Description
It is recommended that a metric filter and alarm be established for changes to Identity and
Access Management (IAM) role creation, deletion and updating activities.

## Rationale
Google Cloud IAM provides predefined roles that give granular access to specific Google
Cloud Platform resources and prevent unwanted access to other resources. However, to
cater to organization-specific needs, Cloud IAM also provides the ability to create custom
roles. Project owners and administrators with the Organization Role Administrator role or
the IAM Role Administrator role can create custom roles. Monitoring role creation, deletion
and updating activities helps identify any over-privileged role an early stage.


### Impact
Enabling logging may result in your project being charged for the additional logs usage.

## Remediation

### From the console

#### Create the prescribed log metric

1. Go to Logging/Logs-based Metrics by visiting [https://console.cloud.google.com/logs/metrics][1] and click **CREATE METRIC**.
2. Set **Metric Type** to `Counter`. This ensures that the log metric counts the number of log entries matching the user's advanced logs query.
3. Fill out the **Log metric name** field.
4. Set the **Units** to  `1` (default).
5. Under **Filter selection**, add the following text to the **Build filter** block: 

   ```
   resource.type="iam_role"
   AND protoPayload.methodName = "google.iam.admin.v1.CreateRole"
   OR protoPayload.methodName="google.iam.admin.v1.DeleteRole"
   OR protoPayload.methodName="google.iam.admin.v1.UpdateRole"
   ```
6. Click **Create Metric**

#### Create a prescribed alert policy

1. Go to [https://console.cloud.google.com/logs/metrics][1].  Under the **User-defined Metrics** section, identify the newly created metric.
2. Click the kebab icon in the rightmost column for the new metric and select **Create alert from Metric**.
3. Leave the **Enter a Monitoring filter** field as is.
4. Set **Rolling window function** to `delta`.
5. Under **Across time series**, set the **Time series aggregation** field to `count`. 
6. Navigate to **Configure trigger** using the left-hand panel and leave the default value of `threshold` for **Condition type**. 
7. Choose the alerting threshold and trigger conditions that make most sense for your organization. For example, a **Threshold value** of `0` and an **Alert trigger** of `Any time series violates` ensures that a notification is triggered for every custom role change in the project.
8. Navigate to **Notifications and name** to configure your desired notification channel and alerting policy name. 
9. Navigate to **Review alert** and validate that all values look as expected. Then, click **CREATE POLICY**.

### From the command line

#### Create a prescribed log metric

Use the command: `gcloud beta logging metrics create`
Reference for command usage:
[https://cloud.google.com/sdk/gcloud/reference/beta/logging/metrics/create][3]

#### Create a prescribed alert policy
Use the command: `gcloud alpha monitoring policies create`
Reference for command usage:
[https://cloud.google.com/sdk/gcloud/reference/alpha/monitoring/policies/create][4]

## References
1. [https://cloud.google.com/logging/docs/logs-based-metrics/][5]
2. [https://cloud.google.com/monitoring/custom-metrics/][6]
3. [https://cloud.google.com/monitoring/alerts/][7]
4. [https://cloud.google.com/logging/docs/reference/tools/gcloud-logging][8]
5. [https://cloud.google.com/iam/docs/understanding-custom-roles][9]

[1]: https://console.cloud.google.com/logs/metrics
[2]: https://console.cloud.google.com/logs/metrics
[3]: https://cloud.google.com/sdk/gcloud/reference/beta/logging/metrics/create
[4]: https://cloud.google.com/sdk/gcloud/reference/alpha/monitoring/policies/create
[5]: https://cloud.google.com/logging/docs/logs-based-metrics/
[6]: https://cloud.google.com/monitoring/custom-metrics/
[7]: https://cloud.google.com/monitoring/alerts/
[8]: https://cloud.google.com/logging/docs/reference/tools/gcloud-logging
[9]: https://cloud.google.com/iam/docs/understanding-custom-roles

---
aliases:
- aps-lox-1m8
- /security_monitoring/default_rules/aps-lox-1m8
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.9
disable_edit: true
integration_id: google_logging_log_metric
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_logging_log_metric
title: A log metric filter and alert exists for VPC network changes
type: security_rules
---

## Description
It is recommended that a metric filter and alarm be set up for Virtual Private Cloud (VPC) network changes.

## Rationale
It is possible to have more than one VPC within a project. 
In addition, it is also possible to create a peer connection between two VPCs to enable network traffic routing between VPCs.

Monitoring changes to a VPC helps to ensure that VPC traffic flow is not getting impacted.

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
   resource.type=gce_network
   AND (protoPayload.methodName:"compute.networks.insert"
   OR protoPayload.methodName:"compute.networks.patch"
   OR protoPayload.methodName:"compute.networks.delete"
   OR protoPayload.methodName:"compute.networks.removePeering"
   OR protoPayload.methodName:"compute.networks.addPeering")
   ```
6. Click **Create Metric**.

#### Create the prescribed alert policy
1. Go to [https://console.cloud.google.com/logs/metrics][1].  Under the **User-defined Metrics** section, identify the newly created metric.
2. Click the kebab icon in the rightmost column for the new metric and select **Create alert from Metric**.
3. Leave the **Enter a Monitoring filter** field as is.
4. Set **Rolling window function** to `delta`.
5. Under **Across time series**, set the **Time series aggregation** field to `count`. 
6. Navigate to **Configure trigger** using the left-hand panel and leave the default value of `threshold` for **Condition type**. 
7. Choose the alerting threshold and trigger conditions that make most sense for your organization. For example, a **Threshold value** of `0` and an **Alert trigger** of `Any time series violates` ensures that a notification is triggered for every VPC network change in the project.
8. Navigate to **Notifications and name** to configure your desired notification channel and alerting policy name. 
9. Navigate to **Review alert** and validate that all values look as expected. Then, click **CREATE POLICY**.

### From the command line

1. Create the prescribed log metric using the following command: 
   ```
   gcloud beta logging metrics create
   ```
   [Reference for command usage][6]
2. Create the prescribed alert policy using the following command:
   ```
   gcloud alpha monitoring policies create
   ```
   [Reference for command usage][7]



## References
1. [https://console.cloud.google.com/logs/metrics][1] 
2. [https://cloud.google.com/monitoring/custom-metrics/][2]
3. [https://cloud.google.com/monitoring/alerts/][3]
4. [https://cloud.google.com/logging/docs/reference/tools/gcloud-logging][4]
5. [https://cloud.google.com/vpc/docs/overview][5]
6. [https://cloud.google.com/sdk/gcloud/reference/beta/logging/metrics/create][6]
7. [https://cloud.google.com/sdk/gcloud/reference/alpha/monitoring/policies/create][7]


[1]: https://cloud.google.com/logging/docs/logs-based-metrics/
[2]: https://cloud.google.com/monitoring/custom-metrics/
[3]: https://cloud.google.com/monitoring/alerts/
[4]: https://cloud.google.com/logging/docs/reference/tools/gcloud-logging
[5]: https://cloud.google.com/vpc/docs/overview
[6]: https://cloud.google.com/sdk/gcloud/reference/beta/logging/metrics/create
[7]: https://cloud.google.com/sdk/gcloud/reference/alpha/monitoring/policies/create

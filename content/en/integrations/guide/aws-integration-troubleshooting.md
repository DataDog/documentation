---
title: AWS Integration Troubleshooting

description: "Troubleshooting steps for the Datadog AWS Integration"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Integration"
  text: "AWS Integration"
---

## Overview

Use this guide to troubleshoot issues related to the Datadog [AWS Integration][1].

## IAM permission errors

<div class="alert alert-info">
IAM changes can take several minutes to propagate through AWS. After modifying IAM roles, policies, or trust relationships, wait at least five minutes before re-validating the integration. The Datadog UI may continue to display stale permission errors for up to a few hours after changes propagate.
</div>

### Datadog is not authorized to perform sts:AssumeRole

The `sts:Assumerole` permission error indicates an issue with the trust policy associated with the `DatadogAWSIntegrationRole`. See the [Error: Datadog is not authorized to perform sts:AssumeRole][2] documentation on how to resolve this issue.

**Note**: This error may persist in the Datadog UI for a few hours while the changes propagate.

### Resolve all AWS permissions issues

The **Resolve all AWS permissions issues** button in the AWS Integration page allows you to use a CloudFormation QuickStart stack to update your Datadog integration IAM role and resolve missing permissions issues. 
Under **Issues**, click **Resolve All AWS Permissions Issues**. This launches a CloudFormation stack that calls Datadog's public API [endpoint][13] and fetches the latest IAM permissions needed for the integration, creates new IAM policies containing those permissions, and attaches these to the integration role. It also attaches the `SecurityAudit` Managed AWS policy if it is not present.

The policies created are named with a `datadog-aws-integration-iam-permissions-` prefix, followed by a unique hash to avoid colliding with any existing policies you have configured. You can view the CloudFormation template in Datadog's public [cloudformation-template repository][14].

<div class="alert alert-danger">
Clicking <strong>Resolve All AWS Permissions Issues</strong>:<br>
  - Does not fix broken authentication issues with the role (where the role name, external ID, or trust policy configuration does not let Datadog authenticate with your AWS account)<br>
  - Does not fix cases where a Service Control Policy (SCP) is applied that explicitly denies the required permissions<br>
  - Does not impact any policies that you attach to the Datadog integration IAM role<br>
  - If clicked multiple times, any previous policies created with that prefix are deleted before new policies are created
</div>

## Data discrepancies

### Discrepancy between your data in CloudWatch and Datadog

The sections below describe three important distinctions to be aware of, as well as steps to [reconcile the discrepancy](#reconcile-the-discrepancy).

#### 1. Time aggregation

Datadog displays raw data from AWS in per-second values, regardless of the time frame selected in AWS. This is why Datadog's value could appear lower. See [Time aggregation][20] in the metric documentation for more information.

#### 2. Space aggregation

The space aggregators `min`, `max`, and `avg` have a different meaning between AWS and Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog polls metrics from AWS CloudWatch, the average latency is received as a single timeseries per Elastic Load Balancer (ELB).

Within Datadog, when you select `min`, `max`, or `avg`, you are controlling how multiple timeseries are combined. For example, requesting `system.cpu.idle` without any filter returns one series for each host that reports that metric, and those series need to be combined to be graphed. If instead you request `system.cpu.idle` from a single host, no aggregation is necessary and switching between average and max yields the same result.

See [Space aggregation][22] in the metric documentation for more information.

#### 3. Per-dimension metrics

Some AWS CloudWatch metrics are emitted once per dimension combination, which can produce values that appear inflated when aggregated in Datadog. For example, the Classic ELB metric `aws.elb.healthy_host_count` is reported separately for each Availability Zone. When cross-zone load balancing is enabled, summing this metric across all Availability Zones produces a total that is higher than the actual number of healthy hosts. See [Wrong count of aws.elb.healthy_host_count](#wrong-count-of-awselbhealthy_host_count) for details.

To avoid inflated aggregation, use the `_deduped` metric variants when available (for example, `aws.elb.healthy_host_count_deduped`), or scope your query to a specific dimension value such as a single Availability Zone.

#### Reconcile the discrepancy

1. Go to **CloudWatch**, and then **All metrics**.
2. Search for and graph the metric. 
3. Select the **Source** tab to show the full metric query.

{{< img src="integrations/guide/aws_integration_troubleshooting/cloudwatch-metric-explorer.png" alt="The all metrics page in CloudWatch displaying a metric query under the source tab, with the cursor hovering over a point on the graph to display a metric value and timestamp" responsive="true" style="width:90%;" >}}

4. Confirm that the query in CloudWatch is scoped identically to the query in Datadog:
   - Any [Dimensions][17] used in the CloudWatch metric query should match tags used in the Datadog metric query
   - Datadog queries metrics with one-minute granularity, so the **Period** of the CloudWatch metric query should also be set to one-minute precision
   - Region
   - Metric namespace and name
5. Hover over a datapoint on the graph to display the timestamp and value.
6. Find the same point in time in the Datadog graph and compare the values. If the values are equal, the original discrepancy was due to differences in either time or space aggregation between the two graphs.

## Metrics

### Metrics delayed

When using the AWS integration, Datadog pulls in your metrics through the CloudWatch API. You may see a delay in metrics from AWS due to some constraints that exist for their API.

The CloudWatch API only offers a metric-by-metric crawl to pull data. CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more frequently. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

Install the Datadog Agent on the host to avoid metric delay. See the [Datadog Agent documentation][3] to get started. Datadog has the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Contact [Datadog support][4] for additional information.

### Expected metric delays

The delay between when a metric is generated in AWS and when it appears in Datadog depends on the collection method:

| Collection method | Typical delay | Notes |
|---|---|---|
| API polling (default) | ~10 minutes | CloudWatch API rate limits and account size can increase delay. |
| [CloudWatch Metric Streams][25] | 2-3 minutes | Requires separate setup with Amazon Data Firehose. |
| [Datadog Agent][3] | Real-time | Collects host-level metrics directly, without CloudWatch. |

In addition to collection method delays, some AWS services introduce their own latency on the CloudWatch side:

- **S3 Storage Lens** metrics are published daily, not continuously.
- **AWS billing metrics** are delayed by several hours and update infrequently.
- **Detailed monitoring** for EC2 provides one-minute metrics (instead of the default five-minute granularity) but requires enablement per-instance in AWS.

<div class="alert alert-info">
Datadog does not backfill historical metric data from before the integration was enabled. Metrics begin flowing from the time the integration is successfully configured.
</div>

### Missing metrics

If you are not seeing expected AWS metrics in Datadog, work through the following checklist:

1. **Verify IAM permissions.** Confirm that the `DatadogAWSIntegrationRole` includes the required permissions for the AWS service. Some services require service-specific permissions beyond the core integration policy. See the individual [AWS integration pages][15] for service-specific permission requirements.
2. **Verify the AWS region is enabled.** In the [AWS integration page][16], confirm that the region where your resources are deployed is selected under the **General** tab. Metrics are only collected from enabled regions.
3. **Verify the service is emitting metrics to CloudWatch.** Open the CloudWatch console in AWS and confirm that the expected metrics exist. CloudWatch's API returns only metrics with datapoints, so if a resource is idle or has no attached components (for example, an ELB with no attached instances), CloudWatch may not report metrics for it.
4. **Check whether the service requires additional enablement.** Some AWS services do not emit metrics to CloudWatch by default. For example:
   - Amazon RDS requires [Enhanced Monitoring][18] to be enabled in the RDS console for OS-level metrics.
   - Amazon S3 Storage Lens metrics require Storage Lens to be configured in the S3 console.
   - AWS billing metrics require enabling `Billing` in the [Metric Collection tab][16], adding the `budgets:ViewBudget` permission, and [enabling billing metrics][19] in the AWS console. See [Monitor your AWS billing details][26] for full instructions.
   - Custom CloudWatch namespaces require the **Collect Custom Metrics** option to be enabled in the [Metric Collection tab][16].
5. **Wait for the polling interval.** API polling collects metrics approximately every 10 minutes. If you use [CloudWatch Metric Streams][25], expect a 2-3 minute delay. See [Expected metric delays](#expected-metric-delays) for more detail.
6. **Check for Service Control Policies (SCPs).** If your account is part of an AWS Organization, SCPs applied at the organization or OU level can override IAM permissions and block API calls. Verify that no SCP denies the required permissions.

### Wrong count of aws.elb.healthy_host_count

When the cross-zone load balancing option is enabled on an ELB, all the instances attached to this ELB are considered part of all availability zones (on CloudWatch's side). For example, if you have two instances in `1a` and three instances in `ab`, the metric displays five instances per availability zone.
As this can be counter intuitive, the metrics **aws.elb.healthy_host_count_deduped** and **aws.elb.un_healthy_host_count_deduped** display the count of healthy and unhealthy instances per availability zone, regardless of if this cross-zone load balancing option is enabled or not.

## Regions

### Region behavior

Datadog collects metrics only from the AWS regions you select in the [AWS integration page][16]. If you do not see data for a specific service, confirm the region where that resource is deployed is enabled.

Keep in mind:
- **Global services**: Some AWS services (such as IAM, CloudFront, and Route 53) are global and not tied to a specific region. Metrics for these services typically appear under `us-east-1` regardless of the region configuration in Datadog.
- **Regional services**: Most AWS services are regional. Datadog only collects metrics for regions explicitly enabled in the integration tile.
- **Opt-in regions**: AWS opt-in regions (such as `af-south-1`, `ap-east-1`, and `me-south-1`) must be enabled in both your [AWS account settings][23] and the Datadog integration tile. If the region is not enabled on the AWS side, Datadog cannot collect data from it.
- **New regions**: Recently launched AWS regions may be crawled automatically but might not yet appear in the Datadog integration UI or Terraform provider. Check the [AWS integration page][16] for the latest list of supported regions.

## Datadog UI

### Duplicated hosts when installing the Agent

When installing the Agent on an AWS host, you might see duplicated hosts on the Datadog infrastructure page for a few hours if you manually set the hostname in the Agent's configuration. The duplicate hosts disappear a few hours later, and does not affect your billing.

## Datadog Agent

### EC2 metadata with IMDS v2

In containerized environments the problem might be that you have locked down the EC2 metadata endpoint, by way of assigning IAM roles/credentials to pods running in the Kubernetes cluster. `Kube2IAM` and `kiam` are common tools used to do this. To solve this, update your `Kube2IAM` or `kiam` configuration to allow access to this endpoint.

IMDSv2, in its default configuration, refuses connections with an IP hop count greater than one, that is, connections that have passed through an IP gateway. This can cause problems when the Agent is running in a container with a network other than the host's network, as the runtime forwards the container's traffic through a virtual IP gateway. This is common in ECS deployments. The following options may remedy this issue:

 * [Increase the maximum hop count to at least `2`][8]. Doing so may have implications for the security of data stored in the IMDS, as it permits containers other than the Agent to access this data as well.
 * Use the hostname discovered by cloud-init, by [setting `providers.eks.ec2.useHostnameFromFile` to true][9].
 * Run the Agent in the host UTS namespace, by [setting `agents.useHostNetwork` to true][10].

### EC2 hostname with IMDS

#### Agent versions before 7.64.0

In some situations, the EC2 [IMDSv2][5] configuration may make it impossible for the Agent to access the necessary metadata. This can cause the Agent to fall back to the `os` hostname provider instead of `aws`, as seen in the output of `agent status`.

The AWS API supports disabling IMDSv1, which the Agent uses by default. If this is the case, but IMDSv2 is enabled and accessible, set the parameter `ec2_prefer_imdsv2` to `true` (defaults to `false`) in your [Agent configuration][6]. See the [Transition to using Instance Metadata Service Version 2][7] documentation for details.

Upgrading to Datadog Agent 7.64.0+ should resolve these issues as the newer versions of the Agent use IMDSv2 by default.

#### Agent version 7.64.0 and after

Starting at v7.64.0, the Datadog Agent defaults to using IMDSv2 and falls back on IMDSv1 in case of failure. To revert to the previous behavior, set `ec2_imdsv2_transition_payload_enabled` to `false` in your host configuration.
See the [Transition to using Instance Metadata Service Version 2][7] documentation for details.

## Tags

### Tag collection and propagation delays

AWS tags are collected as part of the integration's crawl cycle and may take additional time to appear in Datadog after you apply them in AWS. Expect tag propagation to take anywhere from 15 minutes to several hours, depending on the AWS service and the volume of resources in your account.

If you recently added or changed tags in AWS and do not see them reflected in Datadog:
1. Wait at least one full crawl cycle (approximately 10 minutes for API polling).
2. Verify that the `DatadogAWSIntegrationRole` has the required tag-related permissions (for example, `tag:GetResources`).
3. Confirm that the resource type supports tag collection. Not all AWS resource types support tag collection through the integration.

### Hosts still have AWS tags after removing the Amazon EC2 integration

You can use the AWS integration to collect data from CloudWatch, or install a Datadog Agent directly on each EC2 instance to get data and tags. If you have opted to use both of these methods to collect data, Datadog's backend merges the data from both from the integration and the Datadog Agent to a single host object.

If you removed the AWS integration, but continue to run a Datadog Agent on your EC2 instances, the hosts in your Datadog account continues to have the old host-tags associated with it that were collected from AWS. This is intended behavior, and it does not indicate that the AWS integration or Amazon EC2 integration is still enabled.

You can verify the integration is enabled by checking the "Apps Running" for that host from the infrastructure list or by checking the metrics summary and creating a notebook scoped to that host.

By default, host-level tags remain permanently attached to AWS hosts. If you want to permanently remove AWS host tags from a host, you can do this by the following methods:
   - Use the [Remove host tags API endpoint][11] to remove all user-assigned tags for a single host
   - Use the [remove_lingering_aws_host_tags.py tool][12] to remove all user-assigned tags from a list of hosts, or from all hosts

[1]: /integrations/amazon_web_services/
[2]: /integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /agent/
[4]: /help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /api/latest/tags/#remove-host-tags
[12]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
[13]: https://api.datadoghq.com/api/v2/integration/aws/iam_permissions
[14]: https://github.com/DataDog/cloudformation-template/tree/master/aws_attach_integration_permissions
[17]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
[20]: /metrics/#time-aggregation
[21]: /metrics/guide/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[15]: /integrations/#cat-aws
[16]: https://app.datadoghq.com/integrations/amazon-web-services
[18]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[26]: /integrations/guide/monitor-your-aws-billing-details/
[22]: /metrics/#space-aggregation
[23]: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html
[25]: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/

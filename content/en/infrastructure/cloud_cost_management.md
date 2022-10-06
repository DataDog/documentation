---
title: Cloud Cost Management
kind: documentation
---

<div class="alert alert-warning">Cloud Cost Management is in private beta and supports only AWS at this time. To request access, <a href="https://www.datadoghq.com/cloud-cost-management-beta/">use this form.</a></div>

## Overview

Cloud Cost Management provides insights for engineering and finance teams to see how changes to infrastructure can affect costs. It enables you to understand trends, allocate spend across your organization, and identify inefficiencies.
Datadog ingests your cloud cost data and transforms it into queryable metrics. If costs rise, you can correlate the change with usage metrics to determine the root cause.

To use Cloud Cost Management, you must have an AWS account with access to Cost and Usage Reports (CURs), and have the AWS integration installed in Datadog.

## Setup

To setup Cloud Cost Management in Datadog, you need to generate a Cost and Usage report.

### Prerequisite: generate a Cost and Usage Report

Follow AWS instructions for [Creating Cost and Usage Reports][1], and select the following content options for use with Datadog Cloud Cost Management:

* **Include resource IDs**
* **Automatically refresh your Cost & Usage Report**

Select the following Delivery options:

* Time granularity: **Hourly**
* Report versioning: **Create new report version**
* Compression type: **GZIP**
* Format: `text/csv`

### Configure the AWS integration

Select your AWS management account from the dropdown menu, allowing Datadog to display tags associated with this account. If you have multiple similarly-named management accounts, view the tags associated with a selected account to ensure you have selected the specific account you want.

**Note**: Datadog recommends sending a Cost and Usage Report from an [AWS **management account**][2] for cost visibility into related **member accounts**. If you decide to send a Cost and Usage report from an AWS **member account**, ensure that you have selected the following options in your **management account's** [preferences][3] to allow Datadog to have full visibility into the member account:

* **Linked Account Access**
* **Linked Account Refunds and Credits**
* **Linked Account Discounts**

### Locate the Cost and Usage Report

If you have navigated away from the report that you created in the setup prerequisites section, follow AWS documentation to find and [view your Cost and Usage Reports details][4].

To enable Datadog to locate the Cost and Usage Report, complete the fields with their corresponding details:

* **Region**: This is the region your bucket is located. For example, `us-east-1`.
* **Bucket Name**: This is the name of the s3 bucket that the CUR is saved to.
* **Report Path Prefix**: This is the folder name. If viewing **Report path prefix** from the AWS details page, this is the first section of the path. For example, if **Report path prefix** is displayed as `cur-report-dir/cost-report`, you would enter `cur-report-dir`.
* **Report Name**: This is the name you entered when you generated the report in the prerequisite section. If viewing the **Report path prefix** from the AWS details page, this is the second half of the path. For example, if **Report path prefix** is displayed as `cur-report-dir/cost-report`, you would enter `cost-report`.

### Configure access to the Cost and Usage Report

Configure AWS to ensure Datadog has permissions to access the CUR and the s3 bucket it is stored in by [creating a policy][5] using the following JSON:

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCloudCostReadBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "DDCloudCostCheckAccuracy",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListCURs",
          "Action": [
              "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListOrganizations",
          "Action": [
              "organizations:Describe*",
              "organizations:List*"
          ],
          "Effect": "Allow",
          "Resource": "*"
      }
  ]
}
{{< /code-block >}}

**Tip:** Make note of the name you created for this policy for next steps.

### Attach the policy to the Datadog integration role

Attach the new S3 policy to the Datadog integration role.

1. Navigate to **Roles** in the AWS IAM console.
2. Locate the role used by the Datadog integration. By default it is named **DatadogIntegrationRole**, but the name may vary if your organization has renamed it. Click the role name to open the role summary page.
3. Click **Attach policies**.
4. Enter the name of the S3 bucket policy created above.
5. Click **Attach policy**.

**Note:** Data can take up to 48 to 72 hours after setup to stabilize in Datadog.
## Cost types

You can visualize your ingested data using the following cost types:

| Cost Type            | Description           |
| -------------------- | --------------------- |
| `aws.cost.amortized` | Cost based on applied discount rates plus the distribution of pre-payments across usage for the discount term (accrual basis). |
| `aws.cost.unblended` | Cost shown as the amount charged at the time of usage (cash basis).|
| `aws.cost.blended`   | Cost based on the average rate paid for a usage type across an organization's member accounts.|
| `aws.cost.ondemand`  | Cost based on the list rate provided by AWS. |

## Tag enrichment

Datadog adds tags to the ingested cost data to help you further break down and understand your costs.

The added tags correlate the cost data with observability data that your systems provide to Datadog, data from resources configured with [AWS Resource tags][6], and the [Cost and Usage Report (CUR)][7].

The following tags are also available for filtering and grouping data:

| Tag                        | Description       |
| -------------------------- | ----------------- |
| `cloud_product`            | The cloud service being billed.|
| `cloud_product_group`      | The category for the cloud service being billed (for example, Compute or Storage)|
| `cloud_usage_type`         | The usage details of this item.|
| `cloud_charge_type`        | The type of charge covered by this item (for example, Usage, or Tax)|
| `cloud_purchase_type`      | Whether the usage is Reserved, Spot, or On Demand.|
| `cloud_account`            | The ID of the account that used this item.|
| `cloud_billing_account_id` | The ID of the account paying for this usage.|

## Cloud costs in dashboards

Visualizing infrastructure spend alongside related utilization metrics can help you spot potential inefficiencies and savings opportunities. You can add cloud costs to widgets in Datadog dashboards by selecting the *Cloud Cost* data source.

{{< img src="infrastructure/cloudcost/cloud_cost_data_source.png" alt="Cloud Cost available as a data source in dashboard widget creation"  >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[7]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html

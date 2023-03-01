---
title: Cloud Cost Management
kind: documentation
aliases:
  - /infrastructure/cloud_cost_management
further_reading:
  - link: "https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/"
    tag: "Blog"
    text: "Gain visibility and control of your cloud spend with Datadog Cloud Cost Management"
---
## Overview

Cloud Cost Management provides insights for engineering and finance teams to see how changes to infrastructure can affect costs. It enables you to understand trends, allocate spend across your organization, and identify inefficiencies.
Datadog ingests your cloud cost data and transforms it into queryable metrics. If costs rise, you can correlate the change with usage metrics to determine the root cause.

## Setup
{{< tabs >}}
{{% tab "AWS" %}}


To use AWS Cloud Cost Management, you must have an AWS account with access to Cost and Usage Reports (CURs), and have the AWS integration installed in Datadog. To set up Cloud Cost Management in Datadog, you need to generate a Cost and Usage report.
### Prerequisite: generate a Cost and Usage Report

Follow AWS instructions for [Creating Cost and Usage Reports][1], and select the following content options for use with Datadog Cloud Cost Management:

* **Include resource IDs**
* **Check the box for "Automatically refresh your Cost & Usage Report when charges are detected for previous months with closed bills."**

Select the following Delivery options:

* Time granularity: **Hourly**
* Report versioning: **Create new report version**
* Compression type: **GZIP** or **Parquet**
* Format: `text/csv` or `Parquet`

### Configure the AWS integration

Navigate to [Setup & Configuration](https://app.datadoghq.com/cost/setup) and select your AWS management account from the dropdown menu, allowing Datadog to display tags associated with this account. If you have multiple similarly-named management accounts, view the tags associated with a selected account to ensure you have selected the specific account you want.

**Note**: Datadog recommends sending a Cost and Usage Report from an [AWS **management account**][2] for cost visibility into related **member accounts**. If you send a Cost and Usage report from an AWS **member account**, ensure that you have selected the following options in your **management account's** [preferences][3]:

* **Linked Account Access**
* **Linked Account Refunds and Credits**
* **Linked Account Discounts**

This ensures complete cost accuracy by allowing periodic cost calculations against the AWS Cost Explorer.

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
### Cost types

You can visualize your ingested data using the following cost types:

| Cost Type            | Description           |
| -------------------- | --------------------- |
| `aws.cost.amortized` | Cost based on applied discount rates plus the distribution of pre-payments across usage for the discount term (accrual basis). |
| `aws.cost.unblended` | Cost shown as the amount charged at the time of usage (cash basis).|
| `aws.cost.blended`   | Cost based on the average rate paid for a usage type across an organization's member accounts.|
| `aws.cost.ondemand`  | Cost based on the list rate provided by AWS. |

### Tag enrichment

Datadog adds out-of-the-box tags to the ingested cost data to help you further break down and allocate your costs. These tags are derived from your [Cost and Usage Report (CUR)][6].

The following out-of-the-box tags are also available for filtering and grouping data:

| Tag                          | Description       |
| ---------------------------- | ----------------- |
| `aws_product`                | The AWS service being billed.|
| `aws_product_family`         | The category for the AWS service being billed (for example, Compute or Storage).|
| `aws_management_account_name`| The AWS management account name associated with the item.|
| `aws_management_account_id`  | The AWS management account ID associated with the item.|
| `aws_member_account_name`    | The AWS member account name associated with the item.|
| `aws_member_account_id`      | The AWS member account ID associated with the item.|
| `aws_cost_type`              | The type of charge covered by this item (for example, Usage, or Tax).|
| `aws_pricing_term`           | Whether the usage is Reserved, Spot, or On-Demand.|
| `aws_reservation_arn`        | The ARN of the Reserved Instance that the item benefited from.|
| `aws_savings_plan_arn`       | The ARN of the Savings Plan the item benefited from.|
| `aws_usage_type`             | The usage details of the item (for example, BoxUsage:i3.8xlarge).|
| `aws_operation`              | The operation associated with the item (for example, RunInstances).|
| `aws_region`                 | The region associated with the item.|
| `aws_availability_zone`      | The availability zone associated with the item.|
| `aws_resource_id`            | The resource ID associated with the item.|
| `aws_instance_type`          | The instance types associated with your items.|
| `aws_instance_family`        | The instance family associated with your item (for example, Storage optimized).|
| `is_aws_ec2_compute`         | Whether the usage is related to EC2 compute.|
| `is_aws_ec2_compute_on_demand`| Whether the usage is on-demand.|
| `is_aws_ec2_compute_reservation`| Whether the usage is associated with a Reserved Instance.|
| `is_aws_ec2_capacity_reservation`| Whether the usage is associated with a Capacity Reservation.|
| `is_aws_ec2_spot_instance`   | Whether the usage is associated with a Spot Instance.|
| `is_aws_ec2_savings_plan`    | Whether the usage is associated with a Savings Plan.|

### Tag pipelines (beta)

You can use tag pipelines to create tag rules to help fix missing or incorrect tags on your Cloud bill, or to create new, inferred tags that align with business logic.

There are two types of rules supported: **Create new tag**, and **Alias existing tag keys**. You can keep your rules organized by leveraging rules-sets, which act as folders for your rules. The rules are executed in order (from top to bottom), to keep the execution order deterministic. You can organize rules and rulesets to ensure the order of execution matches your business logic. 

### Rule types

<div class="alert alert-info"><strong>Note</strong>: A maximum of 100 rules can be created. </div>

**Create new tag** - This allows you to create a new tag (key + value) based on the presence of existing tags. For example, you can create a rule to tag all resources that are part of team A, B, or C, and also run a specified application, with a new `cost-center:webstore` tag.

**Alias existing tag keys** - This allows you to use values from an existing tag, to map to a more standardized tag key. For example, if you're looking to standardize across your organization to use the `application` tag key, but several teams have a variation of that tag (like `app`, `web-app`, or `apps`), you can alias `apps` to `application`. Each alias tag rule allows you to alias a maximum of 25 tag keys to a new tag.   

The rule stops executing for each resource, once a first match is found. For example, if a resource already has a `web-app` tag, then the rule no longer attempts to identify an `apps` or `service` tag. 

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
{{% /tab %}}

{{% tab "Azure" %}}
<div class="alert alert-warning">Azure Cloud Cost Management is in private beta. Fill out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSftAIq_g4GxBAKdWV5OjP0Ui4CAjWTzH3YCKy3n930gMz0Krg/viewform?usp=sf_link">form</a> to request access.</div>

To use Azure Cloud Cost Management in Datadog, you must have an Azure account and have the following billing exports set up: **amortized** and **actual exports**. Additionally, Datadog must have permissions to read the exports from the container.

**Note**: If you used the recommended [Datadog Resource method][1] through the Azure portal to set up the integration with Datadog, you need to create an App Registration to support Cloud Cost Management.

### Schedule exports

1. Navigate to [Exports][2] under Azure portal's *Cost Management + Billing*.
2. Select the billing scope. **Note:** The scope must be *subscription* or *resource group*.
3. Once the scope is selected, click **Add**.
4. The metric is **Actual Cost (usage and purchases)**.
5. Make sure the Export type is `Daily export of month-to-date costs`.
6. Make sure the File Partitioning is **on**.

Repeat steps one to six with export metric type **Amortized Cost (usage and purchases)**. Datadog recommends using the same storage account container.

### Provide Datadog access to your data

1. Navigate to the Storage Container where your exports are saved.
    - In the Exports tab, click the link under Storage Account to navigate to it.
    -  Click the Containers tab.
    -  Choose the storage container your bills are in.
2. Select Access Control (IAM) tab.
3. Click the Role Assignments tab, then click **Add**.  
4. Choose **Storage Blob Data Reader** and **Cost Management Reader**, then click Next.
5. Assign these permissions to one of the App Registrations you have connected with Datadog.
    - To see which App Registrations are connected to Datadog, visit [Datadog's Azure integration][3].
    -  Click **Select members**, pick the name of the App Registration, and click **Select**.
    - Select *review + assign*.

If your exports are in different storage containers, repeat steps one to five for the other storage containers.

### Steps to find the scope ID

From the export, click on the scope link. Select the ID that matches the scope type:
- If the scope type is *subscription*, use the subscription ID.
- If the scope type is *resource groups*, use the resource group name.

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/Exports
[3]: https://app.datadoghq.com/integrations/azure
{{% /tab %}}
{{< /tabs >}}

## Cloud costs in dashboards

Visualizing infrastructure spend alongside related utilization metrics can help you spot potential inefficiencies and savings opportunities. You can add cloud costs to widgets in Datadog dashboards by selecting the *Cloud Cost* data source.

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="Cloud Cost available as a data source in dashboard widget creation"  >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


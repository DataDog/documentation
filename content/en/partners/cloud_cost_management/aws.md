---
title: AWS Cloud Cost for MSP Partners
further_reading:
  - link: "/cloud_cost_management/aws/"
    tag: "Documentation"
    text: "Cloud Cost Management for AWS"
  - link: "/monitors/types/cloud_cost/"
    tag: "Documentation"
    text: "Create a Cloud Cost monitor"
  - link: "/cloud_cost_management/tags/"
    tag: "Documentation"
    text: "Learn about Tags in Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/"
    tag: "Blog"
    text: "Gain visibility and control of your cloud spend with Datadog Cloud Cost Management"
  - link: "https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/"
    tag: "Blog"
    text: "Quickly and comprehensively analyze the cloud and SaaS costs behind your services"
  - link: "https://www.datadoghq.com/blog/cloud-costs-study-learnings/"
    tag: "Blog"
    text: "Key learnings from the State of Cloud Costs study"
cascade:
    algolia:
      subcategory: 'Cloud Cost Management'
      tags: ['cloud cost', 'cloud integrations', 'cloud cost management', 'cloud cost aws']

---
## Overview

This guide explains how AWS Managed Service Providers (MSPs) configure AWS Billing Conductor and generate pro forma Cost and Usage Reports (CURs) so that a customer's member account can be connected to Datadog CCM without exposing the MSP's management account.

The steps on this page are divided between what **you (the MSP partner)** configure and what **your customer** configures in their member account.

For general (non-MSP) CCM setup instructions, see the [Datadog CCM AWS setup guide][1].

## About AWS Billing Conductor
[AWS Billing Conductor][2] is a custom billing service for AWS Marketplace Channel Partners and organizations that have chargeback requirements.
Billing Conductor enables customers to create a second, pro forma version of their costs to share with their customers or account owners.
Billing rates, credits and fees, and overhead costs can be customized at your discretion. You can also select which accounts to include in the CUR.

<div class="alert alert-warning">
- Pro forma Cost and Usage Reports do not include discounts and taxes, which makes it difficult to compare costs in Datadog to AWS Cost Explorer.<br>
- Adding accounts to a billing group impacts how Reservations and Savings Plans are shared across AWS accounts.
</div>

To create a billing conductor CUR, follow the [AWS Cost and Usage Reports user guide][3]. Ensure the CUR meets [Datadog's requirements][4].  

## Prerequisites

Before starting, verify the following:

**MSP access**  
Access to the **management account** to configure Billing Conductor (Pricing Rules, Pricing Plans, Billing Groups).

**Customer permissions**  
The customer must have permission to:
- deploy CloudFormation stacks  
- create and manage Cost and Usage Reports (CURs)  
- grant Datadog access to the S3 bucket containing the CUR  

**Datadog integration**  
The AWS integration must be installed for the **member account** in Datadog.  
For more information, see the [AWS integration setup][5].

## Configure AWS Billing Conductor

These steps **must be completed in the MSP’s management account**.

### Step 1 - Create a pricing rule

Billing Conductor computes pro forma costs by adjusting **AWS public on‑demand rates** using a **Discount** or **Markup**.

You must explicitly choose between these options:
- **Discount**: applies a percentage discount to public on-demand  
- **Markup**: applies a percentage increase to public on-demand  

<div class="alert alert-info">
Entering 0% (whether Discount or Markup) results in public on-demand pricing. The allowed range is 0-100%.
</div>

For example:

| Type | Calculation |
|------|-------------|
| Discount (20%) | public on-demand × 0.8 |
| Markup (30%) | public on-demand × 1.3 |

### Step 2 - Create a pricing plan

Create a pricing plan and attach the pricing rule created in the previous step.  
A pricing plan can contain **only one** global Discount or Markup rule.

### Step 3 - Create a billing group

Create a billing group and assign **one customer’s member account** as the **primary** account.
You can add one or more member accounts to the billing group, but only the primary member account generates the pro forma CUR that Datadog ingests.

### Step 4 - Confirm customer-side requirements

If the customer manages their member account independently, confirm they understand that they must:
- deploy the CloudFormation template
- create the CUR in their account
- grant Datadog access to the CUR bucket

## Configure Datadog Cloud Cost Management

These steps must be performed by the customer in their **member account**.

### Step 1 - Download the Datadog CCM CloudFormation template

Pro forma CURs do not support the `SPLIT_COST_ALLOCATION_DATA` option.
Because of this limitation, the customer must modify the template before deployment:
1. Download the [Datadog CCM CloudFormation template][6].
2. Remove the `SPLIT_COST_ALLOCATION_DATA` field from the template.
3. Save the modified template to use in the next step.


### Step 2 - Deploy the CloudFormation stack in AWS

1. Use the template above and deploy a stack in the customer’s member account.
2. To deploy the stack, follow the AWS documentation: [Create a stack from the CloudFormation][7]. When creating the stack, choose: **With new resources (standard)**.

### Step 3 - Configure the Cost and Usage Report settings in AWS

Enter the following information during deployment:
- **Bucket Name**: S3 bucket where CUR files are stored  
- **Bucket Region**: AWS region of that bucket (for example, `us-east-1`)  
- **Export Path Prefix**: S3 path prefix for CUR files  
- **Export Name**: Name of the Cost and Usage Report  

These values define where AWS writes the CUR and where Datadog reads it.

### Step 4 - Enter the member account's CUR parameters in Datadog

1. After deploying the CloudFormation stack, navigate to **Datadog → Cloud Cost → Settings → [Accounts][8]**.


   {{< img src="partners/cloud_cost/select_aws_account_ccm.png" alt="Select AWS Account for CCM" style="width:100%;" >}}

2. Select the member account and enter the following fields using the exact values from **Step 3**:
- Bucket Name  
- Bucket Region  
- Export Path Prefix  
- Export Name  

3. Skip the **Create CloudFormation stack step**

The stack was already deployed in **Step 3**

4. Click **Activate now**

Activate CCM for the member account.

{{< img src="partners/cloud_cost/configure_aws_ccm.png" alt="Configure AWS Cloud Cost Management" style="width:100%;" >}}

If everything is configured correctly, the account status will update as shown below.

{{< img src="partners/cloud_cost/complete_aws_ccm.png" alt="Complete AWS Cloud Cost Management" style="width:100%;" >}}

## Validation

After activation, verify that cost data is flowing into Datadog:
1. Go to **[Cloud Cost > Cost Explorer][9]** in Datadog.
2. Select **AWS** as the provider, then use filters such as **Product**, **Member Accoun Id**, or other dimensions to group and validate the data.
3. Confirm that cost data appears for the expected time range.


**Note:**  
It may take **48–72 hours** after a Cost and Usage Report (CUR) is generated for data to appear in Datadog.  
CURs use **hourly granularity**, so AWS CUR delivery timing and Datadog processing may not align perfectly in real time.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/setup/aws/
[2]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[3]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[4]: /cloud_cost_management/setup/aws/?tab=manual#prerequisite-generate-a-cost-and-usage-report
[5]: /getting_started/integrations/aws/#setup
[6]: https://datadog-cloudformation-template.s3.amazonaws.com/aws_cloud_cost/v0.0.1/main.yaml
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html
[8]: https://app.datadoghq.com/cost/setup
[9]: https://app.datadoghq.com/cost/explorer

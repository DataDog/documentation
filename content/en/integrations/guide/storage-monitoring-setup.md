---
title: Storage Monitoring for Amazon S3
private: true
---

<div class="alert alert-info">Storage Monitoring is in Preview.</div>

## Overview

Storage Monitoring for Amazon S3 provides deep, prefix-level analytics to help you understand exactly how your storage is being used, detect potential issues before they impact operations, and make data-driven decisions about storage optimization. Use these insights to help you track storage growth, investigate access patterns, and optimize costs.

This guide explains how to configure Storage Monitoring in Datadog for your S3 buckets. You can set this up either manually or using the provided CloudFormation templates. Access your Storage Monitoring data by navigating to **Infrastructure -> Resource Catalog -> Monitoring -> S3 Buckets**.

## Setup

### Installation

{{< tabs >}}
{{% tab "CloudFormation" %}}

The fastest way to set up Storage Monitoring is using the provided CloudFormation templates. This process involves two steps:

#### Step 1: Configure inventory generation


This template configures your existing S3 bucket to generate inventory reports, which Datadog uses to generate detailed metrics about your bucket prefixes.

1. Download the source-bucket-inventory-cfn.yaml template
2. In [AWS CloudFormation][1], click **Create stack** in the top right corner and select **With existing resources (import resources)**.
3. In the **Specify template** step, select **Upload a template file**.
4. Click **Choose file** and select the `source-bucket-inventory-cfn.yaml` file, then click **Next**.
5. Enter the bucket name you want AWS to start generating inventories for, and click **Next**.

 {{< img src="integrations/guide/identify_resources.png" alt="Identify S3 resources to start generating inventory" responsive="true" style="width:60%;" >}}

6. Fill in the required parameters:
   - **DestinationBucketName**: The bucket for storing inventory files.
   - **SourceBucketName**: The bucket you want to monitor and start generating inventory files for.

   Optional parameters:
   - **DestinationBucketPrefix**: Specific path within the destination bucket. Ensure this path doesn't include trailing slashes (`/`).
   - **SourceBucketPrefix**: (Optional) Limit monitoring to a specific path in the source bucket

{{< img src="integrations/guide/specify_stack_details.png" alt="Specify stack details" responsive="true" style="width:60%;" >}}

7. Click **Next**.
8. Wait for AWS to locate your source bucket, and click **Import resources** in the bottom right corner.

**Note:** This CloudFormation template can be rolled back, but rolling back doesn't delete the created resources. This is to ensure the existing bucket doesn’t get deleted. You can manually delete the inventory configurations by going on the **Management** tab in the bucket view.


#### Step 2: Configure required permissions

This template creates two IAM policies: 
  - A policy to allow Datadog to read inventory files from the destination bucket
  - A policy to allow your source bucket to write inventory files to the destination bucket

1. Download the cloud-inventory-policies-cfn.yaml template.
2. Create a new stack With New Resources (standard)
3. Fill in the required parameters:
   - **DatadogIntegrationRole**: Your Datadog AWS integration role name
   - **DestinationBucketName**: The name of the bucket that to receive your inventory files.
   - **SourceBucketName**: The name of the bucket you want to start generating inventory files for.

   Optional parameters:
    - **DestinationBucketPrefix**: If you want to reuse an existing bucket as the destination, this parameter allows the inventory files to be shipped to a specific prefix in that bucket. Ensure that any prefixes do not include trailing slashes (`/`).
   - **SourceBucketPrefix**: This parameter limits the inventory generation to a specific prefix in the source bucket.

{{< img src="integrations/guide/bucket_policy_stack_details.png" alt="Stack parameters for bucket policy" responsive="true" style="width:60%;" >}}

6. On the **Review and create** step, verify the parameters have been entered correctly, and click **Submit**

{{< img src="integrations/guide/acknowledge_bucket_policy.png" alt="Verify and launch stack" responsive="true" style="width:60%;" >}}

#### Post-Setup Steps

After completing the CloudFormation setup, reach out with the following information:
    1. Name of the destination bucket holding the inventory files
    2. Prefix where the files are stored in the destination bucket (if any)
    3. Name of the source bucket you want to monitor (the bucket producing inventory files)
    4. AWS region of the destination bucket holding the inventory files
    5. AWS account ID containing the buckets
    6. Datadog org ID


{{% /tab %}}
{{% tab "AWS Console" %}}

To manually set up the required [Amazon S3 Inventory][2] and related configuration, follow these steps:

#### Step 1: Create a destination bucket

1. [Create a new S3 bucket][3] to store your inventory files. This bucket acts as the central location for inventory reports.
2. Create a prefix within the destination bucket.

#### Step 2: Configure the bucket and integration role policies

1. Follow the steps in the [Amazon S3 user guide][4] to add a bucket policy to your destination bucket allowing write access (`s3:PutObject`) from your source buckets. 

2. Ensure the Datadog AWS integration role has `s3:GetObject` and `s3:ListObjects` permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

#### Step 3: Configure Inventory Generation

For each bucket you want to monitor:
  1. Go to the [Amazon S3 buckets page][5] in the AWS console, and select the bucket.
  2. Navigate to the bucket's **Management** tab.
  3. Click **Create inventory configuration**.
  4. Configure the following settings:
    - Set a configuration name
    - (Optional) Specify a source bucket prefix
    - We also advise picking “Current Versions Only”
    - **Destination**: select the destination bucket. For example, if the bucket is named `destination-bucket`, enter `s3://your-destination-bucket`.
       **Note**: If you want to use a prefix on the destination bucket, add this as well  
    - **Frequency**: Datadog recommends choosing **Daily**. This setting determines how often your prefix-level metrics are updated in Datadog  
    - Format: CSV
    - Enable inventory generation
    - Do not specify encryption
    - Select required metadata fields:
          - Size
          - Last Modified
          - Storage Class


#### Post-Setup Steps

After the above steps, please reach out on #storage-monitoring with the following information:

1. Name of the destination bucket where inventories are stored
2. Prefix where the inventory files will be stored
2. Region of the destination bucket
3. AWS Account ID in which the bucket is defined
4. Datadog Role Name that has the permissions to read objects in destination bucket
4. Datadog Org ID

{{% /tab %}}
{{< /tabs >}}

### Verification

To verify your setup:
Wait for the first inventory report to generate (up to 24 hours for daily inventories)
Check the destination bucket for inventory files
Confirm the Datadog integration can access the files:
Check Resource Catalog -> Monitoring -> S3 Buckets -> Installation Recommendations to see if the bucket you configured is showing in the list

### Cost Considerations
- S3 Inventory pricing: $0.0025 per million objects listed
- Standard S3 egress costs apply when syncing inventory files

### Support
If you encounter any issues or need assistance:
- Verify all permissions are correctly configured
- Contact us at mahashree.rajendran@datadoghq.com with your bucket details, AWS account ID and Datadog Org ID


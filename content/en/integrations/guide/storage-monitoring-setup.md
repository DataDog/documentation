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
   - **SourceBucketName**: The name of the bucket for which you wish to start generating inventory files

   Optional parameters:
    - **DestinationBucketPrefix**:  If you want to reuse an existing bucket as the destination, this parameter allows the inventory files to be shipped to a specific prefix in that bucket. Please don’t include trailing slashes ( “/“ ). Can be left blank.
   - **SourceBucketPrefix**: This parameter limits the inventory generation to a specific prefix in the source bucket. Can be left blank.

{{< img src="integrations/guide/bucket_policy_stack_details.png" alt="Stack parameters for bucket policy" responsive="true" style="width:60%;" >}}


4. Verify parameters and launch stack

{{< img src="integrations/guide/acknowledge_bucket_policy.png" alt="Verify and launch stack" responsive="true" style="width:60%;" >}}

#### Post-Setup Steps

After completing the CloudFormation setup, reach out with the following information:
    1. Name of the destination bucket holding the inventory files
    2. Prefix at which the files are stored in the destination bucket (if any)
    3. Name of the source bucket you want to monitor i.e. the bucket producing inventory files
    4. AWS Region of the destination bucket holding the inventory files
    5. AWS account ID in which the buckets live
    6. Datadog Org ID


{{% /tab %}}
{{% tab "AWS Console" %}}

If you prefer to set up the required [AWS Inventory](https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html) and related configuration manually, follow these steps:

#### Step 1: Create Destination Bucket

Create a new S3 bucket that will store your inventory files. This bucket will act as the central location for inventory reports. Required: Please create a prefix within the destination bucket.


#### Step 2: Configure Bucket and Integration Role Policies

Add a bucket policy to your destination bucket allowing write access i.e. s3:PutObject from your source buckets [See AWS doc]. The policy should include permissions for the source buckets to write inventory files.

Ensure your Datadog AWS integration role has s3:GetObject and s3:ListObjects permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

#### Step 3: Configure Inventory Generation

For each bucket you want to monitor:
  1. Go to the AWS S3 Console
  2. Navigate to the bucket's Management tab
  3. Click Create Inventory Configuration
  4. Configure the following settings:
    - Set a configuration name
    - (Optional) Specify a source bucket prefix
    - We also advise picking “Current Versions Only”
    - In select destination bucket, pick the newly created destination bucket. Example, if bucket is named destination-bucket `s3://your-destination-bucket`
    - If you wish to have a prefix on the destination bucket, please define it and let us know
    - Choose frequency: Daily (recommended) or Weekly [Note that this setting determines how often your prefix level metrics will be updated in Datadog]
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


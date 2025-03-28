---
title: Storage Monitoring for Amazon S3 & Google Cloud Storage
private: true
---

<div class="alert alert-info">Storage Monitoring is in Preview.</div>

## Overview

Storage Monitoring for Amazon S3 & Google Cloud Storage provides deep, prefix-level analytics to help you understand exactly how your storage is being used, detect potential issues before they impact operations, and make data-driven decisions about storage optimization. Use these insights to help you track storage growth, investigate access patterns, and optimize costs.

This guide explains how to configure Storage Monitoring in Datadog for your S3 & GCS buckets.

You can set this up either manually or using the provided CloudFormation templates. Access your Storage Monitoring data by navigating to **Infrastructure -> Storage Monitoring**.

## Setup for Amazon S3

### Installation

{{< tabs >}}
{{% tab "CloudFormation" %}}

The fastest way to set up Storage Monitoring is using the provided CloudFormation templates. This process involves two steps:

#### Step 1: Configure inventory generation


This template configures your existing S3 bucket to generate inventory reports, which Datadog uses to generate detailed metrics about your bucket prefixes.

1. Download the [source-bucket-inventory-cfn.yaml][101] template.
2. In [AWS CloudFormation][102], click **Create stack** in the top right corner and select **With existing resources (import resources)**.
3. In the **Specify template** step, select **Upload a template file**.
4. Click **Choose file** and select the `source-bucket-inventory-cfn.yaml` file, then click **Next**.
5. Enter the bucket name you want AWS to start generating inventories for, and click **Next**.

 {{< img src="integrations/guide/storage_monitoring/identify_resources.png" alt="Identify S3 resources to start generating inventory" responsive="true" style="width:90%;" >}}

6. Fill in the required parameters:
   - **DestinationBucketName**: The bucket for storing inventory files. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
   - **SourceBucketName**: The bucket you want to monitor and start generating inventory files for

   Optional parameters:
   - **SourceBucketPrefix**: (Optional) Limit monitoring to a specific path in the source bucket
   - **DestinationBucketPrefix**: Specific path within the destination bucket. Ensure this path doesn't include trailing slashes (`/`)

{{< img src="integrations/guide/storage_monitoring/specify_stack_details.png" alt="Specify stack details" responsive="true" style="width:90%;" >}}

7. Click **Next**.
8. Wait for AWS to locate your source bucket, and click **Import resources** in the bottom right corner.

**Note:** This CloudFormation template can be rolled back, but rolling back doesn't delete the created resources. This is to ensure the existing bucket doesn't get deleted. You can manually delete the inventory configurations by going on the **Management** tab in the bucket view.

**Note:** Review [Amazon S3 pricing][106] for costs related to inventory generation.
#### Step 2: Configure required permissions

This template creates two IAM policies:
  - A policy to allow Datadog to read inventory files from the destination bucket
  - A policy to allow your source bucket to write inventory files to the destination bucket

1. Download the [cloud-inventory-policies-cfn.yaml][103] template.
2. In [AWS CloudFormation][104], click **Create stack** in the top right corner and select **With new resources (standard)**.
3. In the **Specify template** step, select **Upload a template file**.
4. Click **Choose file** and select the `cloud-inventory-policies-cfn.yaml` file, then click **Next**.
5. Fill in the required parameters:
   - **DatadogIntegrationRole**: Your Datadog AWS integration role name
   - **DestinationBucketName**: The name of the bucket that receives your inventory files. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
   - **SourceBucketName**: The name of the bucket you want to start generating inventory files for

   Optional parameters:
   - **SourceBucketPrefix**: This parameter limits the inventory generation to a specific prefix in the source bucket
   - **DestinationBucketPrefix**: If you want to reuse an existing bucket as the destination, this parameter allows the inventory files to be shipped to a specific prefix in that bucket. Ensure that any prefixes do not include trailing slashes (`/`)


{{< img src="integrations/guide/storage_monitoring/bucket_policy_stack_details.png" alt="Stack parameters for bucket policy" responsive="true" style="width:90%;" >}}

6. On the **Review and create** step, verify the parameters have been entered correctly, and click **Submit**.

#### Post-setup steps

After completing the CloudFormation setup, fill out the [post-setup form][105] with the following required information:
1. Name of the destination bucket holding the inventory files.
2. Prefix where the files are stored in the destination bucket (if any).
3. Name of the source bucket you want to monitor (the bucket producing inventory files).
4. AWS region of the destination bucket holding the inventory files.
5. AWS account ID containing the buckets.
6. Datadog org ID.

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: https://forms.gle/L97Ndxr2XLen1GBs7
[106]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{% tab "AWS Console" %}}

To manually set up the required [Amazon S3 Inventory][206] and related configuration, follow these steps:

#### Step 1: Create a destination bucket

1. [Create an S3 bucket][201] to store your inventory files. This bucket acts as the central location for inventory reports. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
2. Create a prefix within the destination bucket (optional).

#### Step 2: Configure the bucket and integration role policies

1. Follow the steps in the [Amazon S3 user guide][202] to add a bucket policy to your destination bucket allowing write access (`s3:PutObject`) from your source buckets.

2. Ensure the Datadog AWS integration role has `s3:GetObject` and `s3:ListObjects` permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

#### Step 3: Configure Inventory generation

For each bucket you want to monitor:
1. Go to the [Amazon S3 buckets page][203] in the AWS console, and select the bucket.
2. Navigate to the bucket's **Management** tab.
3. Click **Create inventory configuration**.
4. Configure the following settings:
  - Set a configuration name
  - (Optional) Specify a source bucket prefix
  - **Object versions**: Datadog recommends selecting **Current Versions Only**
  - **Destination**: Select the common destination bucket for inventory files in your AWS account. For example, if the bucket is named `destination-bucket`, enter `s3://your-destination-bucket`
  **Note**: If you want to use a prefix on the destination bucket, add this as well
  - **Frequency**: Datadog recommends choosing **Daily**. This setting determines how often your prefix-level metrics are updated in Datadog
  - **Output format**: CSV
  - **Status**: Enabled
  - **Server-side encryption**: Don't specify an encryption key
  - Select the following **Additional metadata fields**:
      1. Size
      2. Last Modified
      3. Storage Class

**Note**: Review [Amazon S3 pricing][204] for costs related to inventory generation.

#### Post-setup steps

After completing the above steps, fill out the [post-setup form][205] with the following required information:

1. Name of the destination bucket where inventories are stored.
2. Prefix where the files are stored in the destination bucket (optional).
3. Region of the destination bucket.
4. AWS account ID containing the bucket.
5. Datadog role name that has the permissions to read objects in destination bucket.
6. Datadog org ID.

[201]: https://console.aws.amazon.com/s3/bucket/create
[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
[205]: https://forms.gle/L97Ndxr2XLen1GBs7
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}
{{< /tabs >}}

### Validation

To verify your setup:
   - Wait for the first inventory report to generate (up to 24 hours for daily inventories)
   - Check the destination bucket for inventory files
   - Confirm the Datadog integration can access the files:
       - Navigate to **Infrastructure -> Storage Monitoring -> Installation Recommendations** to see if the bucket you configured is showing in the list


### Troubleshooting
If you encounter any issues or need assistance:
- Make sure to use only one destination bucket for all inventory files per AWS account
- Verify all permissions are correctly configured
- If you're still encountering issues, [reach out][1] with your bucket details, AWS account ID, and Datadog org ID

## Setup for Google Cloud Storage

### Installation

The process involves the following steps:

#### Step 1: Install the GCP Integration & ensure Resource Collection is enabled

To ensure that we can collect GCP Storage metrics from your GCP project, you need to install the  GCP integration in Datadog. Make sure to enable resource collection for the project containing the buckets you want to monitor. Resource Collection allows Datadog to associate your buckets’ labels with the metrics collected through storage monitoring.

**Note**: While you have the option to disable specific metric namespaces, it is crucial that the CloudStorage namespace remains enabled.


#### Step 2: Add the `roles/storage.ObjectViewer` Role to your Datadog Service Account

This grants Datadog permission to access and extract the generated inventory reports from Google.

#### Step 3: Enable the [Storage Insights][201] API in your GCP Project

#### Step 4: Grant Service Agent Permissions

Once the Storage Insights API has been enabled, a project-level service agent will be created automatically. The naming format for this service agent is: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`
The service agent requires the following IAM roles:

1. `roles/storage.insightsCollectorService` on the source bucket (this includes storage.buckets.getObjectInsights and storage.buckets.get permissions).
2. `roles/storage.objectCreator` on the destination bucket (this includes the storage.objects.create permission).

#### Step 5: Create an Inventory Report Configuration

There are multiple ways you can create an Inventory Report Configuration. The quickest way for customers to set up Storage Monitoring is through the Google Cloud CLI or Terraform templates. Regardless of the method you choose, the most important part is that the configuration:

1. includes the following metadata fields:  "bucket", "name", "project","size","updated","storageClass"
2. generate CSV reports with '\n' as the delimiter & ',' as the separator
3. The destination path follows the format: <Bucket>/{{date}}, where <Bucket> is the monitored bucket.

{{< tabs >}}
{{% tab "Google Cloud CLI" %}}

Use the [Google Cloud CLI][301] to run the following:

```
gcloud storage insights inventory-reports create <source_bucket_url> \
  --no-csv-header \
  --display-name=datadog-storage-monitoring \
  --destination=<gs://my_example_destination_bucket/souce_bucket_name/{{date}}> \
  --metadata-fields=project,bucket,name,size,updated,storageClass \
  --schedule-starts=<YYYY-MM-DD> \
  --schedule-repeats=<daily|weekly> \
  --schedule-repeats-until=<YYYY-MM-DD>
```

[301]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#create-config-cli

{{% /tab %}}
{{% tab "Terraform" %}}

Download [this][401] terraform template inventory.tf & substitute the necessary arguments and apply the terraform in the GCP Project that has your bucket.

[401]: https://drive.google.com/open?id=11KvwAdcU0jlbBg-hE_GNVvtob8yptCep
{{% /tab %}}
{{% tab "Allow Datadog to create the configuration on your behalf" %}}

You can opt to allow Datadog to handle the inventory report configuration by providing the proper permissions to your service account.
Navigate to IAM & Admin -> Service accounts, and find your Datadog service account & add the roles/storageinsights.Admin role.

You’ll also want to navigate to the source bucket you’d like to monitor and grant that service account the following permissions:
- roles/storage.insightsCollectorService
- roles/storage.ObjectViewer

Finally, navigate to the destination bucket (where you set these inventory reports to be written to) & grant these permissions
- roles/storage.objectCreator
- roles/storage.insightsCollectorService


Alternatively, if you’d like to create a custom role specifically for Datadog, here are the required permissions:

```
storage.buckets.get
storage.objects.list
storage.buckets.getObjectInsights
storage.buckets.get
storage.objects.create
storageinsights.reportConfigs.get
storageinsights.reportConfigs.create
storageinsights.reportConfigs.list
storageinsights.reportConfigs.update
storage.objects.get
storageinsights.reportDetails.get
storageinsights.reportDetails.list
```

Once the necessary permissions have been granted, we can create the inventory report configuration with your setup details in the next step.

{{< /tabs >}}

### Post-setup steps

After completing the setup steps, fill out the [post-setup][3] form with the following required information:
1. Name of the destination bucket holding the inventory files.
2. The name of the service account with the granted permissions
3. Prefix where the files are stored in the destination bucket (if any).
4. Name of the source bucket you want to monitor (the bucket producing inventory files).
5. GCP location of the destination bucket holding the inventory files.
6. GCP ProjectID containing the buckets.
7. Datadog org ID.

### Validation

To verify your setup:
1. Wait for the first inventory report to generate (up to 24 hours/ 7 Days depending on the frequency)
2. Check the destination bucket for inventory files
3. Confirm the Datadog integration can access the files:
4. Navigate to Infrastructure -> Storage Monitoring -> Installation Recommendations to see if the bucket you configured is showing in the list


### Troubleshooting
If you encounter any issues or need assistance:
- Make sure to use only one destination bucket for all inventory files per AWS account
- Verify all permissions are correctly configured
- If you're still encountering issues, [reach out][1] with your bucket details, GCP Project ID, and Datadog org ID

[1]: mailto:storage-monitoring@datadoghq.com
[2]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#enable_the_api
[3]: https://docs.google.com/forms/d/e/1FAIpQLSeqboAbdJmDuf-4ujb3N_dK0mW2Pgupglt2r6uXD0oeVLyOyQ/viewform


---
title: Storage Management for Amazon S3, Google Cloud Storage, and Azure Blob Storage
private: false
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-storage-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot cloud storage at scale with Storage Monitoring"
    - link: "https://www.datadoghq.com/blog/storage-monitoring-recommendations/"
      tag: "Blog"
      text: "Reduce cloud storage costs and improve operational efficiency with Datadog Storage Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/storage-monitoring/" >}}
  Storage Management is in Preview. Request access to start monitoring your object storage.
{{< /callout >}}


## Overview

Storage Management for Amazon S3, Google Cloud Storage, and Azure Blob Storage provides deep, prefix-level analytics to help you understand exactly how your storage is being used. With Storage Management you can:
- **Pinpoint where spend is coming from in your bucket**: Break storage cost to the prefix so you know which workloads, teams, or environments drive growth.
- **Identify cold data**: Spot buckets with rarely accessed prefixes, and move cold data to lower-cost tiers.
- **Tune retention and lifecycle rules with data**: Read/write and age metrics show when objects were last used, so you can shift unused prefixes to Glacier, Intelligent-Tiering, and other low-cost classes.
- **Monitor data freshness**: Age metrics show how recently each prefix was updated, so you can confirm that backups and other time-sensitive data are landing in prefixes when they should.

You can access Storage Management in Datadog by navigating to **Infrastructure** > [**Storage Management**][311].

This guide explains how to configure Storage Management in Datadog for your Amazon S3 buckets, Google Cloud Storage buckets, and Azure storage accounts. Select your cloud storage service to access setup instructions.

{{< partial name="cloud_storage_monitoring/storage-monitoring-setup.html" >}}

## Setup for Amazon S3

{{< tabs >}}
{{% tab "Set up Inventory from Datadog" %}}

The fastest way to configure Storage Management is through the [Enable Buckets][501] page, where you can enable S3 inventory and configure monitoring for multiple buckets at once.

As an alternative, you can set up S3 inventory manually or with Terraform and enable Storage Management using your existing setup. For details, see [Existing S3 Inventory][506].

{{< img src="integrations/guide/storage_monitoring/add-bucket.png" alt="Select buckets for enabling Storage Monitoring" responsive="true">}}

1. **Enable Amazon S3 Integration and Resource collection for all the AWS accounts you want to monitor.** Ensure all S3 related permissions are granted for [Resource Collection][509].

2. **Enable S3 Inventory to get prefix level monitoring.**

     <div class="alert alert-info">
      - Source bucket: The S3 bucket you want to monitor with Storage Management <br>
      - Destination bucket: Used to store inventory reports (one per AWS region, can be reused cross-account)
      </div>


   1. Add the following permissions to your [Datadog IAM policy][508] so Datadog can enable S3 inventory on your source buckets and read the generated reports from the destination buckets:
      - `s3:PutInventoryConfiguration`
      - `s3:GetObject` (scoped to the destination bucket(s))
      - `s3:ListBucket` (scoped to the destination bucket(s))

      Example IAM policy:
        ```json
              {
                "Version": "2012-10-17",
                "Statement": [

                  {
                    "Sid": "AllowDatadogToEnableInventory",
                    "Effect": "Allow",
                    "Action": [
                      "s3:PutInventoryConfiguration" // If you want Datadog to enable S3 inventory through Datadog UI
                    ],
                    "Resource": "arn:aws:s3:::storage-management-source-bucket" // source bucket(s)
                  },
                  { // destination bucket
                    "Sid": "AllowDatadogToReadInventoryFiles",
                    "Effect": "Allow",
                    "Action": [
                      "s3:GetObject",
                      "s3:ListBucket"
                    ],
                    "Resource": [
                      "arn:aws:s3:::storage-management-inventory-destination",
                      "arn:aws:s3:::storage-management-inventory-destination/*" // destination bucket(s)/prefix
                    ]
                  }
                ]
              }
        ```

    2. On the **Enable it for me** tab, select the regions or accounts you want to enable and assign a destination bucket per region or per account to store S3 Inventory reports. You can either use an existing bucket or create one in AWS.

        <div class="alert alert-info">The destination buckets must allow the source buckets to write inventory data. See <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html#configure-inventory-destination-bucket-policy">Creating a destination bucket policy.</a> in the AWS documentation for details.</div>

        {{< img src="integrations/guide/storage_monitoring/enable-inventory.png" alt="Select buckets for enabling Storage Monitoring" responsive="true">}}

    3. Complete the inventory configuration. The first inventory report may take up to 24 hours to generate.



3. **Enable S3 Access Logs for prefix-level request and latency metrics:** To get prefix-level access metrics including request counts, server-side latency, and cold data identification for cost optimization, follow these additional steps:

   1. **Set up the Datadog Lambda Forwarder** (if not already configured):
      - Follow the [Datadog Forwarder installation instructions][503] to deploy the Datadog Lambda function in your AWS account
      - This Lambda function collects and forwards your S3 access logs to Datadog

   2. **Configure S3 Access Logs** for each source bucket:
      - Go to your S3 bucket properties in the AWS Console
      - Navigate to **Server access logging**
      - Enable logging and specify your destination bucket (for simplicity, you can use the destination bucket for your inventory files)
      - Set the target prefix to `access-logs/` to organize log files separately from inventory data

   3. **Set up the Lambda trigger**:

      **Option A: Automatic (Recommended)**
        - In the Datadog AWS integration page, navigate to the **[Log Collection][504]** tab
        - Enable automatic log collection for S3 by checking the S3 Access Logs checkbox
        - Datadog [automatically configures triggers][505] on your Forwarder Lambda function for S3 access logs

       **Option B: Manual**
        - In the AWS console, go to your Datadog Forwarder Lambda function
        - Click **Add trigger** and select **S3**
        - Select the bucket containing your access logs
        - Set the event type to **All object create events**
        - Set the prefix to `access-logs/` (matching your access log prefix)

       <div class="alert alert-info"> After sending, S3 Access Logs are also available in <a href="https://docs.datadoghq.com/logs/#explore">Datadog Log Management.</a>. </div>

4. Return to **Infrastructure > Storage Management** to see any new buckets. The inventory generation process starts in AWS within 24 hours of the first report. Data from your buckets is visible after this period.

[501]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[503]: https://docs.datadoghq.com/logs/guide/forwarder/?tab=cloudformation
[504]: https://app.datadoghq.com/integrations/amazon-web-services
[505]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[506]: https://docs.datadoghq.com/integrations/guide/storage-monitoring-setup/?tab=existings3inventory#setup-for-amazon-s3
[507]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
[508]: https://docs.datadoghq.com/integrations/amazon-web-services/#aws-iam-permissions
[509]: https://docs.datadoghq.com/integrations/amazon-web-services/#resource-collection

{{% /tab %}}
{{% tab "CloudFormation" %}}

You can also set up Storage Management using the provided CloudFormation templates. This process involves two steps:

### Step 1: Configure inventory generation

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
### Step 2: Configure required permissions

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

### Finish setting up S3 buckets for Storage Management
  After completing the CloudFormation setup, enable buckets for Storage Management from the Datadog UI:
  - Navigate to **Storage Management** → [Enable Buckets][105]
  - In Step 2: **Enable S3 Inventory to get prefix level monitoring**, select _I enabled it myself_
  - Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**

{{< img src="integrations/guide/storage_monitoring/enable-it-for-me.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[106]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Terraform" %}}

You can use the Terraform [aws_s3_bucket_inventory][403] resource to enable S3 Inventory.

The following example shows how to enable daily inventory on an S3 bucket for Datadog monitoring. To use this example:

   - Replace `<MY_MONITORED_BUCKET>` with the name of the bucket to be monitored.
   - Replace `<MY_INVENTORY_DESTINATION>` with the name of the bucket that receives your inventory files.
   - Replace `<DESTINATION_ACCOUNT_ID>` with the AWS account ID that owns the destination bucket.

```tf
resource "aws_s3_bucket" "monitored" {
  bucket = "<MY_MONITORED_BUCKET>"
}

resource "aws_s3_bucket" "inventory_destination" {
  bucket = "<MY_INVENTORY_DESTINATION>"
}

resource "aws_s3_bucket_inventory" "daily_inventory" {
  bucket = aws_s3_bucket.monitored.id
  name   = "datadog-daily-inventory"


  included_object_versions = "All"
  schedule {
    frequency = "Daily"
  }
  destination {
    bucket {
      account_id = "<DESTINATION_ACCOUNT_ID>"
      bucket_arn = aws_s3_bucket.inventory_destination.arn
      format     = "CSV"
      prefix     = "datadog-inventory/"
    }
  }
  optional_fields = [
    "Size",
    "StorageClass",
    "LastModifiedDate",
    "ETag",
    "IsMultipartUploaded",
    "ReplicationStatus",
    "EncryptionStatus",
    "ObjectLockRetainUntilDate",
    "ObjectLockMode",
    "ObjectLockLegalHoldStatus",
    "IntelligentTieringAccessTier",
    "BucketKeyStatus",
    "ChecksumAlgorithm",
    "ObjectAccessControlList",
    "ObjectOwner"
  ]
}
```

**Notes**:

   - The destination bucket can be your source bucket, but for security and logical separation, many organizations use a separate bucket.
   - The `optional_fields` section is required for Datadog prefix metrics and cost optimization insights like duplicate objects.

### Finish setting up S3 buckets for Storage Management

  After the inventory configuration is set up and your inventory files begin appearing in the destination bucket, enable buckets for Storage Management from the Datadog UI:
  - Navigate to **Storage Management** → [Enable Buckets][405]
  - In Step 2: **Enable S3 Inventory to get prefix level monitoring**, select _I enabled it myself_
  - Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**

{{< img src="integrations/guide/storage_monitoring/enabled-it-myself.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

### Use modules for complex setups

If you need to manage multiple buckets, complex inventory policies, encryption, or cross-account setups, you can use the [terraform-aws-s3-bucket module][402].

### Troubleshooting

- S3 Inventory files are delivered daily, and may take up to 24 hours to appear after setup.
- Ensure IAM permissions allow S3 to write inventory files to your destination bucket.
- If cross-account access is needed, confirm that the inventory destination prefix (`datadog-inventory/` in the example) is correct and accessible to Datadog.

[401]: https://docs.google.com/forms/d/e/1FAIpQLScd0xor8RQ76N6BemvvMzg9UU7Q90svFrNGY8n83sMF2JXhkA/viewform
[402]: https://github.com/terraform-aws-modules/terraform-aws-s3-bucket/tree/master/examples/s3-inventory
[403]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_inventory
[405]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
{{% /tab %}}

{{% tab "AWS Console" %}}

To manually set up the required [Amazon S3 Inventory][206] and related configuration, follow these steps:

### Step 1: Create a destination bucket

1. [Create an S3 bucket][201] to store your inventory files. This bucket acts as the central location for inventory reports. **Note**: You must only use one destination bucket for all inventory files generated in an AWS account.
2. Create a prefix within the destination bucket (optional).

### Step 2: Configure the bucket and integration role policies

1. Ensure the Datadog AWS integration role has `s3:GetObject` and `s3:ListBucket` permissions on the destination bucket. These permissions allow Datadog to read the generated inventory files.

2. Follow the steps in the [Amazon S3 user guide][202] to add a bucket policy to your destination bucket allowing write access (`s3:PutObject`) from your source buckets.

### Step 3: Configure inventory generation

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
  - Select all the available **Additional metadata fields**

**Note**: Review [Amazon S3 pricing][204] for costs related to inventory generation.

### Post-setup steps

  After the inventory configuration is set up and your inventory files begin appearing in the destination bucket, enable buckets for Storage Management from the Datadog UI:
  - Navigate to **Storage Management** → [Enable Buckets][205]
  - In Step 2: **Enable S3 Inventory to get prefix level monitoring**, select _I enabled it myself_
  - Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**

{{< img src="integrations/guide/storage_monitoring/enabled-it-myself.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

[201]: https://console.aws.amazon.com/s3/bucket/create
[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
[205]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}

{{% tab "Existing S3 Inventory" %}}

  If you have already configured S3 Inventory for the buckets you want to monitor, enable buckets for Storage Monitoring from the Datadog UI:
      - Navigate to **Storage Management** → [Enable Buckets][603]
  - In Step 2: **Enable S3 Inventory to get prefix level monitoring**, select _I enabled it myself_
      - Choose the destination buckets that contain the inventory files for the source buckets you want to monitor and click **Confirm**

{{< img src="integrations/guide/storage_monitoring/enabled-it-myself.png" alt="Select destination buckets for enabling Storage Monitoring" responsive="true">}}

[601]: https://forms.gle/dhDbSxTvCUDXg1QR7
[602]: mailto:storage-monitoring@datadoghq.com
[603]: https://app.datadoghq.com/storage-monitoring?mConfigure=true&mStorageRecGroupBy=&mView=s3
{{% /tab %}}

{{< /tabs >}}

### Validation

To verify your setup:
- Wait for the first inventory report to generate (up to 24 hours for daily inventories).
- Navigate to **Infrastructure** > [**Storage Management**][311] to see if the bucket(s) you configured are showing in the explorer list when "Monitored buckets" is selected.

  {{< img src="integrations/guide/storage_monitoring/monitored-buckets.png" alt="Validate bucket is enabled for monitoring" responsive="true">}}


### Troubleshooting

If you don't see data for buckets you set up for Storage Management:
- Check the destination bucket for inventory files. If there are no inventories, ensure the source buckets have permission to write to the destination bucket.
- Check the AWS Integration tile to confirm you're not missing any S3 related permissions as part of [Resource Collection][https://docs.datadoghq.com/integrations/amazon-web-services/#resource-collection]. Ensure all S3 related permission are granted.
- Confirm the Datadog integration can access the inventory files: ensure `s3:GetObject` and `s3:ListBucket` permissions for the destination buckets are set on the Datadog AWS Integration Role.
- If you're still encountering issues, [contact Datadog][1] with your bucket details, AWS account ID, and Datadog org name.

## Setup for Google Cloud Storage

The process involves the following steps:

#### Step 1: Install the Google Cloud integration and enable resource collection

To collect Google Cloud Storage metrics from your Google Cloud project, install the Google Cloud integration in Datadog. Enable Resource Collection for the project containing the buckets you want to monitor. Resource Collection allows Datadog to associate your buckets' labels with the metrics collected through Storage Management.

**Note**: While you can disable specific metric namespaces, keep the Cloud Storage namespace (gcp.storage) enabled.

#### Step 2: Enable the Storage Insights API

Enable the [Storage Insights][2] API in your Google Cloud project.

#### Step 3: Grant service agent permissions

After enabling the Storage Insights API, a project-level service agent is created automatically with the following format: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`

The service agent requires these IAM roles:

1. `roles/storage.insightsCollectorService` on the source bucket (includes storage.buckets.getObjectInsights and storage.buckets.get permissions)
2. `roles/storage.objectCreator` on the destination bucket (includes the storage.objects.create permission)

#### Step 4: Create an inventory report configuration

You can create an inventory report configuration in multiple ways. The quickest methods use the Google Cloud CLI or Terraform templates. Regardless of the method, ensure the configuration:

1. Includes these metadata fields: `"bucket", "name", "project", "size", "updated", "storageClass"`
2. Generates CSV reports with `'\n'` as the delimiter and `','` as the separator
3. Uses this destination path format: `<BUCKET>/{{date}}`, where `<BUCKET>` is the monitored bucket-name

{{< tabs >}}
{{% tab "Google Cloud CLI" %}}

Use the [Google Cloud CLI][301] to run the following command:

```
gcloud storage insights inventory-reports create <SOURCE_BUCKET_URL> \
  --no-csv-header \
  --display-name=datadog-storage-monitoring \
  --destination=gs://<DESTINATION_BUCKET>/<SOURCE_BUCKET>/{{date}}> \
  --metadata-fields=project,bucket,name,size,updated,storageClass \
  --schedule-starts=<YYYY-MM-DD> \
  --schedule-repeats=<DAILY|WEEKLY> \
  --schedule-repeats-until=<YYYY-MM-DD>
```

[301]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#create-config-cli

{{% /tab %}}
{{% tab "Terraform" %}}

Copy the following Terraform template, substitute the necessary arguments, and apply it in the Google Cloud project that contains your bucket.

<!-- vale off -->
{{% collapse-content title="Terraform configuration for inventory reports" level="h4" expanded=true %}}

```hcl
locals {
  source_bucket      = "" # The name of the bucket you want to monitor
  destination_bucket = "" # The bucket where inventory reports are written
  frequency          = "" # Possible values: Daily, Weekly (report generation frequency)
  location           = "" # The location of your source and destination buckets
}

data "google_project" "project" {
}

resource "google_storage_insights_report_config" "config" {
  display_name = "datadog-storage-monitoring"
  location     = local.location
  frequency_options {
    frequency = local.frequency
    start_date {
      day   = "" # Fill in the day
      month = "" # Fill in the month
      year  = "" # Fill in the year
    }
    end_date {
      day   = "" # Fill in the day
      month = "" # Fill in the month
      year  = "" # Fill in the year
    }
  }
  csv_options {
    record_separator = "\n"
    delimiter        = ","
    header_required  = false
  }
  object_metadata_report_options {
    metadata_fields = ["bucket", "name", "project", "size", "updated", "storageClass"]
    storage_filters {
      bucket = local.source_bucket
    }
    storage_destination_options {
      bucket           = google_storage_bucket.report_bucket.name
      destination_path = "${local.source_bucket}/{{date}}"
    }
  }

  depends_on = [
    google_storage_bucket_iam_member.admin
  ]
}

resource "google_storage_bucket" "report_bucket" {
  name                        = local.destination_bucket
  location                    = local.location
  force_destroy               = true
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_iam_member" "admin" {
  bucket = google_storage_bucket.report_bucket.name
  role   = "roles/storage.admin"
  member = "serviceAccount:service-${data.google_project.project.number}@gcp-sa-storageinsights.iam.gserviceaccount.com"
}
```

{{% /collapse-content %}}
<!-- vale on -->

{{% /tab %}}
{{% tab "Allow Datadog to create the configuration on your behalf" %}}

You can allow Datadog to handle the inventory report configuration by providing the proper permissions to your service account:

1. Navigate to IAM & Admin -> Service accounts
2. Find your Datadog service account and add the `roles/storageinsights.Admin` role
3. Navigate to the source bucket you want to monitor and grant these permissions:
   - `roles/storage.insightsCollectorService`
   - `roles/storage.ObjectViewer`
4. Navigate to the destination bucket and grant these permissions:
   - `roles/storage.objectCreator`
   - `roles/storage.insightsCollectorService`

Alternatively, you can create a custom role specifically for Datadog with these required permissions:

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

After granting the necessary permissions, Datadog can create the inventory report configuration with your setup details.

{{% /tab %}}
{{< /tabs >}}

#### Step 5: Add the Storage Object Viewer role to your Datadog service account

Grant Datadog permission to access and extract the generated inventory reports from Google. This permission should be on the destination bucket where the inventory reports are stored.

1. Select the destination bucket for your inventory reports
2. In the bucket details page, click the Permissions tab
3. Under Permissions, click Grant Access to add a new principal
4. Principal: Enter the Datadog Service Account email
5. Role: Select Storage Object Viewer (`roles/storage.objectViewer`)

### Post-setup steps

After completing the setup steps, fill out the [post-setup][3] form with the following required information:
1. Name of the destination bucket holding the inventory files
2. Name of the service account with the granted permissions
3. Prefix where the files are stored in the destination bucket (if any)
4. Name of the source bucket you want to monitor (the bucket producing inventory files)
5. Google Cloud location of the destination bucket holding the inventory files
6. Google Cloud ProjectID containing the buckets
7. Datadog org name

### Validation

To verify your setup:
1. Wait for the first inventory report to generate (up to 24 hours for daily reports or 7 days for weekly reports).
2. Check the destination bucket for inventory files.
3. Confirm the Datadog integration can access the files.
4. Navigate to **Infrastructure** > **Storage Management** > **Installation Recommendations** to see if your configured bucket appears in the list.

### Troubleshooting

If you encounter any issues or need assistance:
- Use only one destination bucket for all inventory files per Google Cloud project.
- Verify all permissions are correctly configured.
- If issues persist, [contact Datadog][1] with your bucket details, Google Cloud Project ID, and Datadog org name.

[1]: mailto:storage-monitoring@datadoghq.com
[2]: https://cloud.google.com/storage/docs/insights/using-inventory-reports#enable_the_api
[3]: https://forms.gle/c7b8JiLENDaUEqGk8

## Setup for Azure Blob Storage

{{< tabs >}}
{{% tab "Azure CLI" %}}

Enable inventories for the selected storage accounts in each subscription by running the following script in your [Azure Cloud Shell][301]:

```shell
curl https://datadogstoragemonitoring.blob.core.windows.net/scripts/install.sh \
  | bash -s -- <CLIENT_ID> <SUBSCRIPTION_ID> <COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>
```

Before running the script, set your [shell environment][302] to Bash and replace the various placeholder inputs with the correct values:
- `<CLIENT_ID>`: The client ID of an App Registration already set up using the [Datadog Azure integration][302]
- `<SUBSCRIPTION_ID>`: The subscription ID of the Azure subscription containing the storage accounts
- `<COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>`: A comma-separated list of the storage accounts you want to monitor (for example, `storageaccount1,storageaccount2`)

[301]: https://shell.azure.com
[302]: /integrations/azure/#setup
[303]: https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/classic?tabs=azurecli#select-your-shell-environment
{{% /tab %}}

{{% tab "Azure Portal" %}}

For Each Storage Account you wish to monitor, follow all of the steps here:

### Create a blob inventory policy
1. In the Azure portal, navigate to your Storage Account.
2. Go to **Data management** > **Blob inventory**.
3. Click **Add**.
4. Configure the policy:
   - Name: **datadog-storage-monitoring**
   - Destination container:
      - Click **Create new**, and enter the name `datadog-storage-monitoring`.
   - Object type to inventory: **Blob**
   - Schedule: **Daily**
   - Blob types: Select **Block blobs**, **Append blobs**, and **Page blobs**.
   - Subtypes: Select **Include blob versions**
   - Schema fields: Select All, or ensure that at least the following are selected:
      - **Name**
      - **Access tier**
      - **Last modified**
      - **Content length**
      - **Server encrypted**
      - **Current version status**
      - **Version ID**
   - Exclude prefix: datadog-storage-monitoring
5. Click **Add**.

### Add the role assignment
1. In the Azure portal, navigate to your Storage Account.
2. Go to **Data storage** > **Containers**.
3. Click on the **datadog-storage-monitoring** container.
4. Click on **Access control (IAM)** in the left-hand menu.
5. Click **Add** > **Add role assignment**.
6. Fill out the role assignment:
    - Role: Select **Storage Blob Data Reader**. Click **Next**.
    - Assign access to: **User, group, or service principal**.
    - Members: Click **+ Select members** and search for your App Registration by its name and select it.
    - **Note**: This should be an App Registration set up in the Datadog Azure integration. Keep in mind the Client ID for later.
7.  Click **Review + assign**.

{{% /tab %}}
{{< /tabs >}}

### Post-Installation

After you finish with the above steps, fill out the [post-setup form][310].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[310]: https://forms.gle/WXFbGyBwWfEo3gbM7
[311]: https://app.datadoghq.com/storage-monitoring

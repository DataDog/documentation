---
title: Storage Management for Google Cloud Storage
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

## Setup

### Step 1: Install the Google Cloud integration and enable resource collection

To collect Google Cloud Storage metrics from your Google Cloud project, install the Google Cloud integration in Datadog. Enable Resource Collection for the project containing the buckets you want to monitor. Resource Collection allows Datadog to associate your buckets' labels with the metrics collected through Storage Management.

**Note**: While you can disable specific metric namespaces, keep the Cloud Storage namespace (gcp.storage) enabled.

### Step 2: Enable the Storage Insights API

Enable the [Storage Insights][2] API in your Google Cloud project.

### Step 3: Grant service agent permissions

After enabling the Storage Insights API, a project-level service agent is created automatically with the following format: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`

The service agent requires these IAM roles:

1. `roles/storage.insightsCollectorService` on the source bucket (includes storage.buckets.getObjectInsights and storage.buckets.get permissions)
2. `roles/storage.objectCreator` on the destination bucket (includes the storage.objects.create permission)

### Step 4: Create an inventory report configuration

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

### Step 5: Add the Storage Object Viewer role to your Datadog service account

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

---
aliases:
- 4sd-jd8-92s
- /security_monitoring/default_rules/4sd-jd8-92s
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.13
disable_edit: true
integration_id: google_cloud_asset_inventory
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_cloud_asset_inventory
title: Cloud Asset Inventory is enabled
type: security_rules
---

## Description
GCP Cloud Asset Inventory is a service that provides a historical view of GCP resources and
IAM policies through a time-series database. The information recorded includes metadata
on Google Cloud resources, metadata on policies set on Google Cloud projects or resources,
and runtime information gathered within a Google Cloud resource.

## Rationale
The GCP resources and IAM policies captured by GCP Cloud Asset Inventory enables
security analysis, resource change tracking, and compliance auditing. It is recommended GCP Cloud Asset Inventory be enabled for all GCP projects.

### Additional Information
   - Cloud Asset Inventory only keeps a five-week history of Google Cloud asset metadata. If you need a longer history, consider building automation to export the history to Cloud Storage or BigQuery.

### Default Value
The Cloud Asset Inventory API is disabled by default in each project.

## Remediation

### From the console

1. Go to **API & Services/Library** by visiting [https://console.cloud.google.com/apis/library][1]
2. Search for `Cloud Asset API` and select the result for Cloud Asset API
3. Click the **ENABLE** button.

### From the command line

1. Enable the Cloud Asset API through the services interface
   ```
   gcloud services enable cloudasset.googleapis.com
   ```

## References
1. [https://cloud.google.com/asset-inventory/docs][2]

[1]: https://cloud.google.com/asset-inventory/docs
[2]: https://console.cloud.google.com/apis/library

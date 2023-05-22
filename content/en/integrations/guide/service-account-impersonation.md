---
title: Set up service account impersonation and automatic discovery for Google Cloud
kind: guide
---

Instead of using static credentials in private key files, you can use [service account impersonation][1] and automatic discovery to integrate Datadog with [Google Cloud][2].

This solution enables you to monitor all projects visible to a service account by assigning the required roles in the relevant projects. You can assign these roles to projects individually, or you can configure Datadog to monitor groups of projects by assigning these roles at the organization or folder level. Assigning roles in this way allows Datadog to automatically discover and monitor all projects in the given scope, including any new projects that may be added to the group in the future. 

<div class="alert alert-warning">
This feature is in beta. Log archiving to Google projects is not supported with service account impersonation. Errors and warnings about issues with service account impersonation are not fully represented in Datadog.
</div>

### Prerequisites

* If your organization restricts identities by domain, you must add Datadog’s customer identity as an allowed value in your policy. Datadog’s customer identity: `C0147pk0i`

* Service account impersonation and automatic discovery rely on having certain roles and APIs enabled to monitor projects. Before you start, ensure the following APIs are enabled for the projects you want to monitor:
  * [Cloud Resource Manager API][3]
  * [Google Cloud Billing API][4]
  * [Cloud Monitoring API][5]
  * [Compute Engine API][6]
  * [Cloud Asset API][7]
  * [IAM API][8]

### Setup

#### 1. Create your Google Cloud service account

1. Open your [Google Cloud console][9].
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Click on **CREATE SERVICE ACCOUNT** at the top.
4. Give the service account a unique name, then click **CREATE AND CONTINUE**.
5. Add the following roles to the service account:
  * Monitoring Viewer
  * Compute Viewer
  * Cloud Asset Viewer
  * Browser
6. Click **CONTINUE**, then **DONE** to complete creating the service account.

{{< img src="integration/guide/service_account_impersonation/create-service-account.png" alt="Create service account" style="width:100%;">}}



[1]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[2]: /integrations/google_cloud_platform/
[3]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[4]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[8]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[9]: https://console.cloud.google.com/
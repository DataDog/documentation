---
title: Set up service account impersonation and automatic project discovery for Google Cloud
kind: guide
further_reading:
    - link: 'integrations/google_cloud_platform/'
      tag: 'Documentation'
      text: 'Google Cloud Platform Integration'
    - link: 'https://cloud.google.com/iam/docs/granting-changing-revoking-access'
      tag: 'Google Cloud'
      text: 'Manage access to projects, folders, and organizations'
---

Instead of using static credentials in private key files, you can use [service account impersonation][1] and automatic project discovery to integrate Datadog with [Google Cloud][2].

This solution enables you to monitor all projects visible to a service account by assigning the required roles in the relevant projects. You can assign these roles to projects individually, or you can configure Datadog to monitor groups of projects by assigning these roles at the organization or folder level. Assigning roles in this way allows Datadog to automatically discover and monitor all projects in the given scope, including any new projects that may be added to the group in the future. 

### Prerequisites

* If your organization restricts identities by domain, you must add Datadog’s customer identity as an allowed value in your policy. Datadog’s customer identity: `C0147pk0i`

* Service account impersonation and automatic project discovery rely on having certain roles and APIs enabled to monitor projects. Before you start, ensure the following APIs are enabled for the projects you want to monitor:
  * [Cloud Resource Manager API][3]
  * [Google Cloud Billing API][4]
  * [Cloud Monitoring API][5]
  * [Compute Engine API][6]
  * [Cloud Asset API][7]
  * [IAM API][8]

### Setup

### 1. Create your Google Cloud service account

1. Open your [Google Cloud console][9].
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Click on **Create service account** at the top.
4. Give the service account a unique name, then click **Create and continue**.
5. Add the following roles to the service account:
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. Click **Continue**, then **Done** to complete creating the service account.

{{< img src="integrations/guide/service_account_impersonation/create-service-account.png" alt="Google Cloud console interface, showing the 'Create service account' flow. Under 'Grant this service account access to project', the four roles in the instructions are added." style="width:70%;">}}

### 2. Add the Datadog principal to your service account

1. In Datadog, navigate to the [**Integrations** > **Google Cloud Platform**][10].
2. Click on **Add GCP Account**. If you have no configured projects, you are automatically redirected to this page.
3. If you have not generated a Datadog principal for your org, click the **Generate Principal** button.
4. Copy your Datadog principal and keep it for the next section.
   {{< img src="integrations/guide/service_account_impersonation/datadog-principal.png" alt="Datadog interface, showing the 'Add New GCP Account' flow. The first step, 'Add Datadog Principal to Google,' features a text box where a user can generate a Datadog Principal and copy it to their clipboard. The second step, 'Add Service Account Email,' features a text box that the user can complete in section 3." style="width:70%;">}}
   Keep this window open for the [next section](#3-complete-the-integration-setup-in-datadog).
5. In [Google Cloud console][9], under the **Service Acounts** menu, find the service account you created in the [first section](#1-create-your-google-cloud-service-account).
6. Go to the **Permissions** tab and click on **Grant Access**.
   {{< img src="integrations/guide/service_account_impersonation/grant-access.png" alt="Google Cloud console interface, showing the Permissions tab under Service Accounts." style="width:70%;">}}
7. Paste your Datading principal into the **New principals** text box.
8. Assign the role of **Service Account Token Creator** and click **Save**.
   {{< img src="integrations/guide/service_account_impersonation/add-principals.png" alt="Google Cloud console interface, showing an 'Add principals' box and an 'Assign roles' interface." style="width:70%;">}}

**Note**: If you previously configured access using a shared Datadog principal, you can revoke the permission for that principal after you complete these steps.

### 3. Complete the integration setup in Datadog

1. In your Google Cloud console, navigate to the **Service Account** > **Details** tab. There, you can find the email associated with this Google service account. It resembles `<sa-name>@datadog-sandbox.iam.gserviceaccount.com`.
2. Copy this email.
3. Return to the integration configuration tile in Datadog (where you coppied your Datadog principal in the [previous section](#2-add-the-datadog-principal-to-your-service-account)).
4. In the box under **Add Service Account Email**, paste the email you previously coppied.
5. Click on **Verify and Save Account**.

In approximately fifteen minutes, metrics appear in Datadog.

### 4. Assign roles to other projects (optional)

Automatic project discovery simplifies to process of adding additional rpojects to be monitored. If you grant your service account access to other projects, folders, or orgs, Datadog discovers these projects (and any projects nested in the folders or orgs) and automatically adds them to your integration tile.

1. Make sure you have the appropriate permissions to assign roles at the desired scope:
   * Project IAM Admin (or higher)
   * Folder Admin
   * Organization Admin
2. In the Google Cloud console, go to the **IAM** page.
3. Select a project, folder, or organization.
4. To grant a role to a principal that does not already have other roles on the resource, click **Grant Access**, then enter the email of the service account you created earlier.
5. Assign the following roles:
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer


   **Note**: The Browser role is only required in the default project of the service account.
6. Click **Save**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[2]: /integrations/google_cloud_platform/
[3]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[4]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[8]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[9]: https://console.cloud.google.com/
[10]: https://app.datadoghq.com/integrations/google-cloud-platform


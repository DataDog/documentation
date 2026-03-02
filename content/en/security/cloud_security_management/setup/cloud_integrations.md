---
title: Deploying Cloud Security using Cloud Integrations
aliases:
  - /security/cloud_security_management/setup/csm_enterprise/cloud_accounts
  - /security/cloud_security_management/setup/csm_pro/cloud_accounts
  - /security/cloud_security_management/setup/cloud_accounts
---

Use the following instructions to enable Misconfigurations and Identity Risks (CIEM) on AWS, Azure, GCP, and OCI.

## Enable resource scanning

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable Cloud Security for each AWS, Azure, Google Cloud Platform, or Oracle Cloud Infrastucture account.

{{< partial name="security-platform/CSW-billing-note.html" >}}

{{< tabs >}}
{{% tab "AWS" %}}

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. You must also [enable resource collection][2] by attaching the AWS-managed SecurityAudit Policy to the Datadog IAM role in your AWS account.

### Enable Cloud Security for your AWS accounts

1. On the [**Cloud Security Setup**][3] page, click **Cloud Integrations**.
1. Expand the **AWS** section and click the account you want to enable Cloud Security for. A side panel with configuration options for that account opens.
1. Under **Features**, beside each feature you want to enable, turn on the **Enable** toggle.
1. To create a filter that excludes certain resources from being evaluated by Cloud Security, under **Evaluation Filters**, click **Limit to Specific Resources**. Then, click **Add Resource Tags**, add `key:value` tags as required, and click **Save**. For more information, see [Use Filters to Exclude Resources from Evaluation][5].

[1]: /integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: /security/cloud_security_management/guide/resource_evaluation_filters

{{% /tab %}}

{{% tab "Azure" %}}

### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules—including [Identity Risks][5]—you must enable the following permissions for the [Microsoft Graph API][2].

- `AuditLog.Read.All`
- `AdministrativeUnit.Read.All`
- `Application.Read.All`
- `Directory.Read.All`
- `Domain.Read.All`
- `Group.Read.All`
- `Policy.Read.All`
- `PrivilegedAssignmentSchedule.Read.AzureADGroup`
- `PrivilegedEligibilitySchedule.Read.AzureADGroup`
- `RoleManagement.Read.All`
- `User.Read.All`

### Enable Cloud Security for your Azure subscriptions

1. On the [**Cloud Security Setup**][3] page, click **Cloud Integrations**.
2. Expand the **Azure** section.
3. To enable resource scanning for a subscription, switch the **Resource Scanning** toggle to the on position.
4. To create a filter that excludes certain resources from being evaluated by Cloud Security, click the **Plus** (+) icon under **Resource Evaluation Filters**. For more information, see [Use Filters to Exclude Resources from Evaluation][4].
5. Click **Done**.

[1]: /integrations/azure
[2]: /integrations/guide/azure-graph-api-permissions/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /security/cloud_security_management/guide/resource_evaluation_filters
[5]: /security/cloud_security_management/identity_risks

{{% /tab %}}

{{% tab "Google Cloud" %}}

### Set up the Datadog Google Cloud Platform integration

The Datadog Google Cloud Platform integration uses service accounts to create an API connection between Google Cloud and Datadog. To enable metric collection, create a service account, and then provide Datadog with the service account credentials to begin making API calls on your behalf. For step-by-step instructions, see [Create your Google Cloud service account][12].

**Note**: [Google Cloud billing][4], the [Cloud Monitoring API][5], the [Compute Engine API][6], and the [Cloud Asset API][7] must all be enabled for the projects you wish to monitor.

#### Datadog

1. In Datadog, navigate to the [**Google Cloud Platform Integration**][9] page.
2. On the **Configuration** tab, locate the service account and select **Upload Private Key File** to integrate the project with Datadog.
3. Upload the JSON file, then click **Update Configuration**.
4. To monitor multiple projects, use one of the following methods:
    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the downloaded JSON file. Then, upload the file to Datadog as described in steps 1-3.

### Enable Cloud Security for your Google Cloud projects

1. On the [**Cloud Security Setup**][2] page, click **Cloud Integrations**.
2. Expand the **GCP** section.
3. To enable resource scanning for a project, switch the **Resource Scanning** toggle to the on position.
4. To create a filter that excludes certain resources from being evaluated by Cloud Security, click the **Plus** (+) icon under **Resource Evaluation Filters**. For more information, see [Use Filters to Exclude Resources from Evaluation][11].
5. Click **Done**.

[1]: /integrations/google_cloud_platform
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://support.google.com/cloud/answer/6293499?hl=en
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[8]: https://console.cloud.google.com/apis/credentials
[9]: https://app.datadoghq.com/integrations/google-cloud-platform
[10]: https://app.datadoghq.com/integrations/google-cloud-platform
[11]: /security/cloud_security_management/guide/resource_evaluation_filters
[12]: /integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /tab %}}

{{% tab "Oracle Cloud" %}}
### Set up the Datadog Oracle Cloud Infrastructure integration
If you haven't already, set up the [Oracle Cloud Infrastructure integration][1].

### Enable Cloud Security for your OCI tenancy
1. On the [**Cloud Security Setup**][2] page, click **Cloud Integrations**.
1. Expand the **OCI** section.
1. To enable resource scanning for a tenancy, switch the **Resource Scanning** toggle to the on position.
1. To create a filter that excludes certain resources from being evaluated by Cloud Security, click the **Plus** (+) icon under **Resource Evaluation Filters**. For more information, see [Use Filters to Exclude Resources from Evaluation][3].
1. Click **Done**.

[1]: /integrations/oracle-cloud-infrastructure/
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /security/cloud_security_management/guide/resource_evaluation_filters

{{% /tab %}}

{{< /tabs >}}

## Disable resource scanning

<div class="alert alert-info">You can access historical findings from the past 15 months even if resource scanning is disabled.</div>

{{< tabs >}}
{{% tab "AWS" %}}

1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **AWS**.
2. If required, use filters to find the account you want to stop resource scanning for. Click the account to open the side panel that contains its settings.
3. On the **Features** tab, beside **Posture Management**, switch the **Enable** toggle to the off position.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}
{{% tab "Azure" %}}

1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **Azure**.
1. To stop resource scanning for an account, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/azure

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **GCP**.
1. To stop resource scanning for an account, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}
{{% tab "Oracle Cloud" %}}
1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **OCI**.
1. To stop resource scanning for a tenancy, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
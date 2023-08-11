---
title: Setting Up Cloud Security Management
kind: documentation
---

Cloud Security Management (CSM)

CSM is built around the concept of packages

Note you can enable other features...

| Package           | Features                   |
|-------------------|----------------------------|
| CSM Enterprise    | Threats, Misconfigurations |
| CSM Pro           | Misconfigurations          |
| Workload Security | Threats                    |

## CSM Enterprise

### Enable resource scanning for cloud accounts

{{< tabs >}}
{{% tab "AWS" %}}

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. For CSM Misconfigurations, you must also add the [necessary permissions][2] for resource collection.

### Enable CSM Misconfigurations for AWS

Use one of the following methods to enable CSM Misconfigurations for your AWS accounts:

#### Security Setup

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][3] to activate CSM Misconfigurations for your account.
3. On the **Setup** > **Cloud Providers** tab, click the **[AWS][3]** tile.
4. To enable CSM Misconfigurations for an AWS account, turn on the **Collect Resources** toggle.

#### AWS integration tile

1. On the AWS integration tile, select an AWS account and click **Resource Collection**.
2. Select **Cloud Security Posture Management Collection** to enable resource collection for CSM Misconfigurations.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}

### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules, you must enable the `Application.Read.All`, `Directory.Read.All`, `Group.Read.All`, `Policy.Read.All`, and `User.Read.All` permissions for the Microsoft Graph API.

### Enable CSM Misconfigurations for Azure

Use one of the following methods to enable CSM Misconfigurations for your Azure subscriptions:

#### Security Setup

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][2] to activate CSM Misconfigurations for your account.
3. On the **Setup** > **Cloud Providers** tab, click the **[Azure][2]** tile.
4. Enable CSM Misconfigurations for your Azure subscriptions by turning on the **CSPM Enabled** toggle.

#### Azure integration tile

1. On the Azure integration tile, select an Azure app.
2. Under **Resource Collection**, select the **Enable resource collection for Cloud Security Posture Management** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Google Cloud" %}}

### Set up the Datadog Google Cloud integration

The Datadog Google Cloud integration uses service accounts to create an API connection between Google Cloud and Datadog. To enable metric collection for CSM Misconfigurations, create a service account, and then provide Datadog with the service account credentials to begin making API calls on your behalf.

**Note**: [Google Cloud billing][4], the [Cloud Monitoring API][5], the [Compute Engine API][6], and the [Cloud Asset API][7] must all be enabled for the projects you wish to monitor.

#### Google Cloud

1. Navigate to the [Google Cloud credentials page][8] for the Google Cloud project where you would like to set up the Datadog integration.
2. Click **Create credentials** and select **Service account**.
3. Give the service account a unique name and click **Create and Continue**.
4. Add the following roles to the service account, then click **Continue**:
    - Compute Viewer
    - Monitoring Viewer
    - Cloud Asset Viewer
5. Select the service account at the bottom of the page.
6. On the **Keys** tab, click **New Key**, then select **Create new key**.
7. Select **JSON** and click **Create** to download the JSON key.

#### Datadog

1. In Datadog, navigate to the [Datadog Google Cloud Integration tile][9].
2. On the **Configuration** tab, locate the service account and select **Upload Private Key File** to integrate the project with Datadog.
3. Upload the JSON file, then click **Update Configuration**.
4. To monitor multiple projects, use one of the following methods:
    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the downloaded JSON file. Then, upload the file to Datadog as described in steps 1-3.

### Enable CSM Misconfigurations for Google Cloud

Use one of the following methods to enable CSM Misconfigurations for your Google Cloud projects:

#### Security Setup

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][2] to activate CSM Misconfigurations for your account.
3. On the **Setup** > **Cloud Providers** tab, click the **[Google Cloud Platform][2]** tile.
4. Enable CSM Misconfigurations for your Google Cloud projects by turning on the **CSPM Enabled** toggle.

#### Google Cloud integration tile

1. On the Google Cloud integration tile, select a Google Cloud project.
2. Under **Enable resource collection for Cloud Security Posture Management**, select the **Resource collection** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://support.google.com/cloud/answer/6293499?hl=en
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[8]: https://console.cloud.google.com/apis/credentials
[9]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}

{{< /tabs >}}

### Enable CSM on the Agent for hosts and containers

## CSM Pro

### Enable resource scanning for cloud accounts

## Workload Security

### Enable CSM on the Agent for hosts and containers
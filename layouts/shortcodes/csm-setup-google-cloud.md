### Set up the Datadog Google Cloud Platform integration

The Datadog Google Cloud Platform integration uses service accounts to create an API connection between Google Cloud and Datadog. To enable metric collection, create a service account, and then provide Datadog with the service account credentials to begin making API calls on your behalf.

**Note**: [Google Cloud billing][4], the [Cloud Monitoring API][5], the [Compute Engine API][6], and the [Cloud Asset API][7] must all be enabled for the projects you wish to monitor.

#### Google Cloud

1. Navigate to the [**Google Cloud Credentials** page][8] for the Google Cloud project where you would like to set up the Datadog integration.
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

1. In Datadog, navigate to the [**Google Cloud Platform Integration** page][9].
2. On the **Configuration** tab, locate the service account and select **Upload Private Key File** to integrate the project with Datadog.
3. Upload the JSON file, then click **Update Configuration**.
4. To monitor multiple projects, use one of the following methods:
    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the downloaded JSON file. Then, upload the file to Datadog as described in steps 1-3.

### Enable CSM for your Google Cloud projects

Use one of the following methods to enable CSM for your Google Cloud projects:

#### CSM Setup page

1. On the [**Cloud Security Management Setup** page][2], click **Cloud accounts**.
2. Expand the **GCP** section.
3. To enable resource collection for a project, click the **Resource Scanning** toggle.
4. To create a filter that excludes certain resources from being evaluated by CSM, click the **Plus** (+) icon under **Resource Evaluation Filters (Optional)**. For more information, see [Use Filters to Exclude Resources from Evaluation][11].
5. Click **Done**.

#### Google Cloud Platform integration page

1. On the [**Google Cloud Platform Integration** page][10], select a Google Cloud project.
2. Under **Resource Collection**, select the **Enable Cloud Security Posture Management** checkbox.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://support.google.com/cloud/answer/6293499?hl=en
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[8]: https://console.cloud.google.com/apis/credentials
[9]: https://app.datadoghq.com/integrations/google-cloud-platform
[10]: https://app.datadoghq.com/integrations/google-cloud-platform
[11]: /security/cloud_security_management/guide/resource_evaluation_filters
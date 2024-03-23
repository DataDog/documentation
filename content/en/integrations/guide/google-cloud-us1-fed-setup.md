---
title: Google Cloud integration setup for US1-FED
kind: guide
description: "Steps for setting up the Datadog Google Cloud integration for US1-FED users"

---

## Overview

Use this guide to set up the Datadog [Google Cloud Platform integration][1].

### Installation

The Datadog Google Cloud integration can use service accounts to create an API connection between Google Cloud and Datadog. Follow the instructions below to create a service account and provide Datadog with service account credentials to begin making API calls on your behalf.

**Note**: [Google Cloud billing][4], the [Cloud Monitoring API][5], the [Compute Engine API][6], and the [Cloud Asset API][7] must all be enabled for any projects you wish to monitor.

1. Go to the [Google Cloud credentials page][2] for the Google Cloud project you want to integrate with Datadog.
2. Click **Create credentials**.
3. Select **Service account**.

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="settings" popup="true" style="width:80%;">}}

4. Give the service account a unique name and optional description.
5. Click **Create and continue**.
6. Add the following roles: 
    - Compute Viewer
    - Monitoring Viewer
    - Cloud Asset Viewer
7.  Click **Done**.
    **Note**: You must be a Service Account Key Admin to select Compute Engine and Cloud Asset roles. All selected roles allow Datadog to collect metrics, tags, events, and user labels on your behalf.
8. At the bottom of the page, find your service accounts and select the one you just created. 
9. Click **Add Key** -> **Create new key**, and choose **JSON** as the type. 
10. Click **Create**. A JSON key file is downloaded to your computer. Note where it is saved, as it is needed to complete the installation.
11. Navigate to the [Datadog Google Cloud Integration page][3].
12. On the **Configuration** tab, select **Upload Key File** to integrate this project with Datadog.
13. Optionally, you can use tags to filter out hosts from being included in this integration. Detailed instructions on this can be found in the [configuration section](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="settings" popup="true" style="width:80%;">}}

14. Press _Install/Update_.
15. If you want to monitor multiple projects, use one of the following methods:

    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the JSON file downloaded in step 6. Then upload the file to Datadog as described in steps 7-10.

### Configuration

Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the **Limit Metric Collection** textbox under a given project’s dropdown menu. Only hosts that match one of the defined tags are imported into Datadog. You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. This example includes all `c1*` sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][8] for more details.

[1]: /integrations/google_cloud_platform/
[2]: https://console.cloud.google.com/apis/credentials
[3]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[4]: https://support.google.com/cloud/answer/6293499?hl=en
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[8]: https://cloud.google.com/compute/docs/labeling-resources
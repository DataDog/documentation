---
title: Setting Up CSPM
kind: documentation
aliases:
  - /security_platform/cspm/getting_started
  - /security/cspm/getting_started
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration detection rules"
- link: "security/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
- link: "security/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud resources, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

## Enable CSPM for your cloud resources

CSPM provides agentless onboarding using existing Datadog integrations with cloud providers such as AWS, Azure, Google Cloud, Docker, and Kubernetes. For details on how to configure CSPM, select your cloud provider and follow the instructions:

{{< tabs >}}
{{% tab "AWS" %}}

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. For CSPM, you must also add the [necessary permissions][2] for resource collection.

### Enable CSPM for AWS

Use one of the following methods to enable CSPM for your AWS accounts:

#### Security Setup

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][3] to activate CSPM for your account.
3. On the **Setup** > **Cloud Providers** tab, click the **[AWS][4]** tile.
4. To enable CSPM for an AWS account, turn on the **Collect Resources** toggle.

#### AWS integration tile

1. On the AWS integration tile, select an AWS account and click **Resource Collection**.
2. Select **Cloud Security Posture Management Collection** to enable resource collection for CSPM.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=amazon-web-services

{{% /tab %}}

{{% tab "Azure" %}}

### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

### Enable CSPM for Azure

Use one of the following methods to enable CSPM for your Azure subscriptions:

#### Security Setup

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][2] to activate CSPM for your account.
3. On the **Setup** > **Cloud Providers** tab, click the **[Azure][3]** tile.
4. Enable CSPM for your Azure subscriptions by turning on the **CSPM Enabled** toggle.

#### Azure integration tile

1. On the Azure integration tile, select an Azure app.
2. Under **Resource Collection**, select the **Enable resource collection for Cloud Security Posture Management** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=azure

{{% /tab %}}

{{% tab "Google Cloud" %}}

### Set up the Datadog Google Cloud integration

If you haven't already, set up the [Google Cloud Platform integration][1] and make sure that you have successfully completed the steps for enabling [metric collection][2].

---

#### Enable metric collection

The Datadog <> Google Cloud integration uses Service Accounts to create an API connection between Google Cloud and Datadog. Below are instructions for creating a service account and providing Datadog with service account credentials to begin making API calls on your behalf.

**Note**: [Google Cloud billing][30], the [Cloud Monitoring API][31], the [Compute Engine API][32], and the [Cloud Asset API][33] must all be enabled for the project(s) you wish to monitor.

1. Navigate to the [Google Cloud credentials page][34] for the Google Cloud project where you would like to setup the Datadog integration.
2. Click **Create credentials** and select **Service account**.
3. Give the service account a unique name and click **Create and Continue**.
4. Add the following roles: Compute Viewer, Monitoring Viewer, and Cloud Asset Viewer. Click _Done_.

    **Note**: You must be a Service Account Key Admin to select Compute Engine and Cloud Asset roles. All selected roles allow Datadog to collect metrics, tags, events, and user labels on your behalf.

5. At the bottom of the page, find your Service Accounts and select the one you just created. Click _Add Key_ -> _Create new key_, and choose _JSON_ as the type. Click _Create_ and _Save_. Take note of where this file is saved, as it is needed to complete the installation.
6. Navigate to the [Datadog Google Cloud Integration tile][35].
7. On the **Configuration** tab, select _Upload Key File_ to integrate this project with Datadog.
8. Optionally, you can use tags to filter out hosts from being included in this integration. Detailed instructions on this can be found [below](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="settings" popup="true" style="width:80%;">}}

9. Press _Install/Update_.
10. If you want to monitor multiple projects, use one of the following methods:

    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the JSON file downloaded in step 5. Then upload the file to Datadog as described in steps 6-9.

#### Configuration

Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the **Limit Metric Collection** textbox under a given project’s dropdown menu. Only hosts that match one of the defined tags are imported into Datadog. You can use wildcards (`?` for single character, `*` for multi-character) to match many hosts, or `!` to exclude certain hosts. This example includes all `c1*` sized instances, but excludes staging hosts:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

See Google's documentation on [Creating and managing labels][36] for more details.

### Enable CSPM for Google Cloud

Use one of the following methods to enable CSPM for your Google Cloud projects:

### Security Setup

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][3] to activate CSPM for your account.
3. On the **Setup** > **Cloud Providers** tab, click the **[Google Cloud Platform][4]** tile.
4. Enable CSPM for your Google Cloud projects by turning on the **CSPM Enabled** toggle.

**Note**: If you do not see any data on the CSPM overview page, you may not have set up your Google Cloud integration correctly. See the [Google Cloud metric collection][2] instructions for more information.

### Google Cloud integration tile

1. On the Google Cloud integration tile, select a Google Cloud project.
2. Under **Enable resource collection for Cloud Security Posture Management**, select the **Resource collection** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#metric-collection
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=google-cloud-platform

{{% /tab %}}

{{% tab "Docker" %}}

### Enable CSPM for Docker

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][1] to activate CSPM for your account.
3. On the **Setup** > **Host and containers** tab, click the **[Docker][2]** tile.
4. Click **Select API key** to choose the API key you want to use with CSPM.
5. Copy the automatically generated command and run it in your Docker environment to enable CSPM.

[1]: https://app.datadoghq.com/security/configuration
[2]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=docker

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Enable CSPM for Kubernetes

1. If you haven't already, install the [Datadog Agent][1] (version 7.27+).
2. Navigate to **Security** > **Setup**.
3. Follow the [in-app instructions][2] to activate CSPM for your account.
4. Add the following to the `datadog` section of the `values.yaml` file:
    ```yaml
    # values.yaml file
    datadog:
    [...]
      # Add this to enable Cloud Security Posture Management and Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
    ```

5. Restart the Agent.

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=kubernetes

{{% /tab %}}
{{< /tabs >}}

## Visualize the first results

CSPM evaluates resources in increments between 15 minutes and four hours (depending on type). New findings from each scan are generated as soon as the scan completes.

To view the findings for your cloud resources, go to the [CSPM homepage][1].

{{< img src="security/cspm/summary_page.png" alt="Cloud Security Posture Management summary page" width="100%">}}

## Explore default detection rules

CSPM comes with a set of [out-of-the-box detection rules][2] that evaluate the configuration of your cloud resources and identifies potential misconfigurations so you can immediately take steps to remediate. When new configuration detection rules are added, they are automatically imported into your account.

To filter the default detection rules by cloud provider:

1. Navigate to **Security** > **Posture Management** > **Compliance Rules**.
2. Choose one of the following values from the **Tag** facet.
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **Google Cloud**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

After you explore the default detection rules, you can review and take action on your cloud misconfigurations in the [Security Findings Explorer][3], [customize how each rule scans your environment][4], and [set up notification targets][5].

## Disable CSPM

Once you've disabled CSPM, your previous findings and the homepage are still available in-app, and you do not incur additional billing costs. 

To disable CSPM for your cloud providers:

- **AWS**: On the **Setup** > **Cloud Providers** tab, click the **AWS** tile, and turn off the **Collect Resources** toggle for your AWS accounts. 
- **Azure**: On the **Setup** > **Cloud Providers** tab, click the **Azure** tile, and turn off the **CSPM Enabled** toggle for your Azure subscriptions.
- **Google Cloud**: On the **Setup** > **Cloud Providers** tab, click the **Google Cloud Platform** tile, and turn off the **CSPM Enabled** toggle for your Google Cloud projects.
- **Docker**: Set `DD_COMPLIANCE_CONFIG_ENABLED` to `false` in your Docker configuration.
- **Kubernetes**: In the `datadog` section of the `values.yaml` file, set `compliance` > `enabled` to `false`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: /security/default_rules/#cat-posture-management-cloud
[3]: https://app.datadoghq.com/security/compliance?time=now
[4]: /security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules

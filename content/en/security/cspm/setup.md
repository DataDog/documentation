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
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud resources, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

## Enable CSPM for your cloud resources

CSPM provides agentless onboarding using existing Datadog integrations with cloud providers such as AWS, Azure, GCP, Docker, and Kubernetes. For details on how to configure CSPM, select your cloud provider and follow the instructions:

{{< tabs >}}
{{% tab "AWS" %}}

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. For CSPM, you must also add the [necessary permissions][2] for resource collection.

### Enable CSPM for AWS

Use one of the following methods to enable CSPM for your AWS accounts:

#### Security Setup & Configuration

1. Navigate to **Security** > **Setup & Configuration**.
2. Follow the [in-app instructions][3] to activate CSPM for your account.
3. On the **Setup & Configuration** > **Cloud Providers** tab, click the **[AWS][4]** tile.
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

#### Security Setup & Configuration

1. Navigate to **Security** > **Setup & Configuration**.
2. Follow the [in-app instructions][2] to activate CSPM for your account.
3. On the **Setup & Configuration** > **Cloud Providers** tab, click the **[Azure][3]** tile.
4. Enable CSPM for your Azure subscriptions by turning on the **CSPM Enabled** toggle.

#### Azure integration tile

1. On the Azure integration tile, select an Azure app.
2. Under **Resource Collection**, select the **Enable resource collection for Cloud Security Posture Management** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=azure

{{% /tab %}}

{{% tab "GCP" %}}

### Set up the Datadog GCP integration

If you haven't already, set up the [Google Cloud Platform integration][1] and make sure that you have successfully completed the steps for enabling [metric collection][2].

### Enable CSPM for GCP

Use one of the following methods to enable CSPM for your GCP projects:

### Security Setup & Configuration

1. Navigate to **Security** > **Setup & Configuration**.
2. Follow the [in-app instructions][3] to activate CSPM for your account.
3. On the **Setup & Configuration** > **Cloud Providers** tab, click the **[GCP][4]** tile.
4. Enable CSPM for your GCP projects by turning on the **CSPM Enabled** toggle.

**Note**: If you do not see any data on the CSPM overview page, you may not have set up your GCP integration correctly. See the [GCP metric collection][2] instructions for more information.

### GCP integration tile

1. On the GCP integration tile, select a GCP project.
2. Under **Enable resource collection for Cloud Security Posture Management**, select the **Resource collection** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#metric-collection
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=google-cloud-platform

{{% /tab %}}

{{% tab "Docker" %}}

### Enable CSPM for Docker

1. Navigate to **Security** > **Setup & Configuration**.
2. Follow the [in-app instructions][1] to activate CSPM for your account.
3. On the **Setup & Configuration** > **Host and containers** tab, click the **[Docker][2]** tile.
4. Click **Select API key** to choose the API key you want to use with CSPM.
5. Copy the automatically generated command and run it in your Docker environment to enable CSPM.

[1]: https://app.datadoghq.com/security/configuration
[2]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=docker

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Enable CSPM for Kubernetes

1. If you haven't already, install the [Datadog Agent][1] (version 7.27+).
2. Navigate to **Security** > **Setup & Configuration**.
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

1. Navigate to **Security** > **Detection Rules**.
2. Choose one of the following values from the **Tag** facet.
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **GCP**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

After you explore the default detection rules, you can review and take action on your cloud misconfigurations in the [Security Findings Explorer][3], [customize how each rule scans your environment][4], and [set up notification targets][5].

## Disable CSPM

Once you've disabled CSPM, your previous findings and the homepage are still available in-app, and you do not incur additional billing costs. 

To disable CSPM for your cloud providers:

- **AWS**: On the **Setup & Configuration** > **Cloud Providers** tab, click the **AWS** tile, and turn off the **Collect Resources** toggle for your AWS accounts. 
- **Azure**: On the **Setup & Configuration** > **Cloud Providers** tab, click the **Azure** tile, and turn off the **CSPM Enabled** toggle for your Azure subscriptions.
- **GCP**: On the **Setup & Configuration** > **Cloud Providers** tab, click the **GCP** tile, and turn off the **CSPM Enabled** toggle for your GCP projects.
- **Docker**: Set `DD_COMPLIANCE_CONFIG_ENABLED` to `false` in your Docker configuration.
- **Kubernetes**: In the `datadog` section of the `values.yaml` file, set `compliance` > `enabled` to `false`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: /security/default_rules/#cat-posture-management-cloud
[3]: https://app.datadoghq.com/security/compliance?time=now
[4]: /security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules

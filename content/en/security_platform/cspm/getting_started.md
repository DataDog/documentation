---
title: Getting Started with CSPM
kind: documentation
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration detection rules"
- link: "security_platform/cspm/findings"
  tag: "Documentation"
  text: "Search and explore CSPM findings"
- link: "security_platform/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in this site.
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) makes it easier to assess and visualize the current and historic security posture of your cloud resources, automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks.

## Overview

CSPM is able to scan and detect misconfigurations across:
Cloud accounts: AWS, Azure, GCP
Workloads: Docker, Kubernetes

## Enable CSPM for your cloud resources

### Agentless onboarding for cloud accounts

Detect misconfigurations in your cloud environment. This section guides you through collecting resource configuration data from cloud providers. Resource configuration collection allows Datadog to assess your environments against Datadog’s out-of-the-box Posture Management cloud configuration detection rules.

Agentless onboarding for cloud accounts leverages the existing Datadog integrations with the cloud providers.

Leverages the existing Datadog integrations with the cloud providers.
Scans cloud provider APIs to collect resources and their configuration on a weekly basis.
Onboarding instructions differ per cloud provider:

- AWS
- Azure
- GCP

### Enable workload misconfigurations

Evaluate the security posture of your hosts and containers. This section guides you through configuring the Datadog Agent to scan your hosts and containers. Our agent allows Datadog to continuously assess the state of your hosts and containers against Datadog’s out-of-the-box Posture Management Infrastructure Configuration detection rules.

CSPM capabilities come built-in in the Datadog agent.
Evaluation of configuration rules is done by the agent.
Onboarding instructions for:

- Docker
- Kubernetes

{{< tabs >}}
{{% tab "AWS" %}}

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. For CSPM, you must also add the [necessary permissions][2] for resource collection.

### Enable CSPM for AWS

Use one of the following methods to enable CSPM for your AWS accounts:

#### Security Setup & Configuration

1. Navigate to **Security** > **Setup and Configuration**.
2. Select **Posture Management**.
3. To enable CSPM for an AWS account, turn on the **Collect Resources** toggle.

#### AWS integration tile

1. On the AWS integration tile, select an AWS account and click **Resource Collection**.
2. Select **Cloud Security Posture Management Collection** to enable resource collection for CSPM.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management

{{% /tab %}}

{{% tab "Azure" %}}

### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

### Enable CSPM for Azure

Use one of the following methods to enable CSPM for your Azure subscriptions:

#### Security Setup & Configuration

1. Navigate to **Security** > **Setup and Configuration**.
2. Follow the [in-app instructions][2] to activate CSPM for your account.
3. On the **Setup and Configuration** > **Cloud Providers** tab, click the **Azure** tile.
4. Enable CSPM for your Azure subscriptions by turning on the **CSPM Enabled** toggle.

#### Azure integration tile

1. On the Azure integration tile, select an Azure app.
2. Under **Resource Collection**, select the **Enable resource collection for Cloud Security Posture Management** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration

{{% /tab %}}

{{% tab "GCP" %}}

### Set up the Datadog GCP integration

If you haven't already, set up the [Google Cloud Platform integration][1].

### Enable CSPM for CCP

Use one of the following methods to enable CSPM for your GCP projects:

### Security Setup & Configuration

1. Navigate to **Security** > **Setup and Configuration**.
2. Follow the [in-app instructions][2] to activate CSPM for your account.
3. On the **Setup and Configuration** > **Cloud Providers** tab, click the **GCP** tile.
4. Enable CSPM for your GCP projects by turning on the **CSPM Enabled** toggle.

### GCP integration tile

1. On the GCP integration tile, select a GCP project.
2. Under **Enable resource collection for Cloud Security Posture Management**, select the **Resource collection** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform
[2]: https://app.datadoghq.com/security/configuration

{{% /tab %}}

{{% tab "Docker" %}}

### Enable CSPM for Docker

1. Navigate to **Security** > **Setup and Configuration**.
2. Follow the [in-app instructions][1] to activate CSPM for your account.
3. On the **Setup and Configuration** > **Host and containers** tab, click the **Docker** tile.
4. Click **Select API key** to choose the API key you want to use with CSPM.
5. Run the following command to enable CSPM in your Docker environment:

    ```bash
    DOCKER_CONTENT_TRUST=1 \
      docker run -d --name dd-agent \
      --security-opt apparmor:unconfined \
      --cap-add SYS_ADMIN \
      --cap-add SYS_RESOURCE \
      --cap-add SYS_PTRACE \
      --cap-add NET_ADMIN \
      --cap-add IPC_LOCK \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -v /etc/passwd:/etc/passwd:ro \
      -v /etc/group:/etc/group:ro \
      -v /:/host/root:ro \
      -v /etc/os-release:/host/etc/os-release \
      -v /sys/kernel/debug:/sys/kernel/debug \
      -e DD_COMPLIANCE_CONFIG_ENABLED=true \
      -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
      -e DD_SYSTEM_PROBE_ENABLED=true \
      -e HOST_ROOT=/host/root \
      -e DD_API_KEY=<DATADOG_API_KEY> \
      -e DD_SITE="datadoghq.com" \
      datadog/agent:latest
    ```

[1]: https://app.datadoghq.com/security/configuration

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. If you haven't already, install the [Datadog Agent][1] (version 7.27+).
2. Add the following to the `datadog` section of the `values.yaml` file:
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

3. Restart the Agent.

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes

{{% /tab %}}
{{< /tabs >}}

## Visualize the first results

CSPM evaluates resources in increments between 15 minutes and four hours (depending on type). New findings from each scan are generated as soon as the scan completes.

To view the findings for your cloud resources, go to the [CSPM homepage][1].

## Explore default detection rules

CSPM comes with a set of [out-of-the-box detection rules][2] that evaluate the configuration of your cloud resources and identifies potential misconfigurations so you can immediately take steps to remediate. When new configuration detection rules are added, they are automatically imported into your account.

To explore the default detection rules:

1. Navigate to **Security** > **Detection Rules**.
2. Choose one of the following values from the **Tag** facet.
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **GCP**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

After you explore the default detection rules, you can review and take action on your cloud misconfigurations in the [Security Findings Explorer][3], [customize how each rule scans your environment][4], and [set up notification targets][5].

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: /security_platform/default_rules/#cat-posture-management-cloud
[3]: https://app.datadoghq.com/security/compliance?time=now
[4]: /security_platform/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /security_platform/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules
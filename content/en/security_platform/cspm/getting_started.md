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
2. Follow the [in-app instructions][5] to activate CSPM for your account.
3. On the **Setup and Configuration** > **Cloud Providers** tab, click the **Azure** tile.
4. Enable CSPM for your Azure subscriptions by turning on the **CSPM Enabled** toggle.

#### Azure integration tile

1. On the Azure integration tile, select an Azure app.
2. Under **Resource Collection**, select the **Enable resource collection for Cloud Security Posture Management** checkbox.
3. Click **Update Configuration**.

[1]: https://docs.datadoghq.com/integrations/azure
[5]: https://app.datadoghq.com/security/configuration

{{% /tab %}}

{{% tab "GCP" %}}
text
{{% /tab %}}

{{% tab "Docker" %}}

## Enable CSPM for Docker

1. Navigate to **Security** > **Setup and Configuration**.
2. Follow the [in-app instructions][5] to activate CSPM for your account.
3. On the **Setup and Configuration** > **Host and containers** tab, click the **Docker** tile.
4. Click **Select API key** to choose the API key you want to use with CSPM.
5. Run the following command to enable CSPM in your Docker environment:
{{< code-block lang="bash" >}}
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
{{< /code-block >}}

[5]: https://app.datadoghq.com/security/configuration

{{% /tab %}}

{{% tab "Kubernetes" %}}
text
{{% /tab %}}
{{< /tabs >}}

## Visualize the first results

CSPM evaluates resources in increments between 15 minutes and four hours (depending on type). New findings from each scan are generated as soon as the scan completes.

To view the findings for your cloud resources, go to the [CSPM homepage][7].

## Explore default detection rules

CSPM comes with a set of [out-of-the-box detection rules][3] that evaluate the configuration of your cloud resources and identifies potential misconfigurations so you can immediately take steps to remediate. When new configuration detection rules are added, they are automatically imported into your account.

To explore the default detection rules:

1. Navigate to **Security** > **Detection Rules**.
2. Choose **cloud_provider:aws** from the **Tag** facet.

After you explore the default detection rules, you can review and take action on your cloud misconfigurations in the [Security Findings Explorer][6], [customize how each rule scans your environment][4], and [set up notification targets][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: /security_platform/default_rules/#cat-posture-management-cloud
[4]: /security_platform/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /security_platform/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules
[6]: https://app.datadoghq.com/security/compliance?time=now
[7]: https://app.datadoghq.com/security/compliance/homepage
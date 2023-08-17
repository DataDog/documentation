---
title: Setting Up Cloud Security Management
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/getting_started
  - /security/cloud_workload_security/getting_started
  - /security/cloud_workload_security/setup
  - /security/threats/setup
  - /security_platform/cspm/getting_started
  - /security/cspm/getting_started
  - /security/cspm/setup
  - /security/misconfigurations/setup
further_reading:
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration compliance rules"
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Learn more about Datadog Cloud Runtime Security"
- link: "https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/"
  tag: "Blog"
  text: "How to detect security threats in your systems' Linux processes"
- link: "https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The PwnKit vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The Dirty Pipe vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/"
  tag: "Blog"
  text: "Using the Dirty Pipe Vulnerability to Break Out from Containers"
- link: "https://www.datadoghq.com/blog/dns-based-threat-detection/"
  tag: "Blog"
  text: "Catch attacks at the network layer with DNS-based threat detection"
---

Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation.

CSM is available in three packages: CSM Enterprise, CSM Pro, and Workload Security. Each package includes access to a specific set of features, as shown in the following table:

| Package           | Features                                              | Setup instructions                                                                                                                                                                                    |
|-------------------|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CSM Enterprise    | Threats, Misconfigurations (cloud accounts and Agent) | [Enable resource scanning for cloud accounts](#enable-resource-scanning-for-cloud-accounts) and [Enable CSM on the Agent for hosts and containers](#enable-csm-on-the-agent-for-hosts-and-containers) |
| CSM Pro           | Misconfigurations (cloud accounts only)               | [Enable resource scanning for cloud accounts](#enable-resource-scanning-for-cloud-accounts)                                                                                                           |
| Workload Security | Threats                                               | [Enable CSM on the Agent for hosts and containers](#enable-csm-on-the-agent-for-hosts-and-containers)                                                                                                 |

**Note**: You can enable other features that aren't included in your package at any time by following the instructions.

<table>
    <tr>
        <td>Package</td>
        <td>Features</td>
        <td>Setup instructions</td>
    </tr>
    <tr>
        <td>CSM Enterprise</td>
        <td>Threats, Misconfigurations (cloud accounts and Agent)</td>
        <td>[Enable resource scanning for cloud accounts](#enable-resource-scanning-for-cloud-accounts) and [Enable CSM on the Agent for hosts and containers](#enable-csm-on-the-agent-for-hosts-and-containers)</td>
    </tr>
    <tr>
        <td>CSM Pro</td>
        <td>Misconfigurations (cloud accounts only)</td>
        <td>[Enable resource scanning for cloud accounts](#enable-resource-scanning-for-cloud-accounts)</td>
    </tr>
    <tr>
        <td>Workload Security</td>
        <td>Threats</td>
        <td>[Enable CSM on the Agent for hosts and containers](#enable-csm-on-the-agent-for-hosts-and-containers)</td>
    </tr>
</table>

## Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

{{< tabs >}}
{{% tab "AWS" %}}

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. For CSM Misconfigurations, you must also add the [required permissions][2] for resource collection.

### Enable CSM for your AWS accounts

Use one of the following methods to enable CSM for your AWS accounts:

#### CSM Setup page

1. On the **[Cloud Security Management Setup][3]** page, click **Cloud accounts**.
2. Expand the **AWS** section.
3. To enable resource collection for an account, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Amazon Web Services integration page

1. On the **[Amazon Web Services][4]** integration page, select an AWS account.
2. On the **Resource Collection** tab, select the **Cloud Security Posture Management Collection** checkbox.
3. Click **Save**.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-management-misconfigurations
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}

{{% tab "Azure" %}}

### Set up the Datadog Azure integration

If you haven't already, set up the [Microsoft Azure integration][1].

**Note**: To access the full set of Azure compliance rules for CSM Misconfigurations, you must enable the `Application.Read.All`, `Directory.Read.All`, `Group.Read.All`, `Policy.Read.All`, and `User.Read.All` permissions for the Microsoft Graph API.

### Enable CSM for your Azure subscriptions

Use one of the following methods to enable CSM for your Azure subscriptions:

#### CSM Setup page

1. On the **[Cloud Security Management Setup page][2]**, click **Cloud accounts**.
2. Expand the **Azure** section.
3. To enable resource collection for a subscription, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Azure integration page

1. On the **[Azure integration page][3]**, select an Azure app registration.
2. Under **Resource Collection**, select the **Collect resources for Cloud Security Posture Management** checkbox.
3. Click **Submit Changes**.

[1]: https://docs.datadoghq.com/integrations/azure
[2]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: https://app.datadoghq.com/integrations/azure

{{% /tab %}}

{{% tab "Google Cloud" %}}

### Set up the Datadog Google Cloud Platform integration

The Datadog Google Cloud Platform integration uses service accounts to create an API connection between Google Cloud and Datadog. To enable metric collection for CSM Misconfigurations, create a service account, and then provide Datadog with the service account credentials to begin making API calls on your behalf.

**Note**: [Google Cloud billing][4], the [Cloud Monitoring API][5], the [Compute Engine API][6], and the [Cloud Asset API][7] must all be enabled for the projects you wish to monitor.

#### Google Cloud

1. Navigate to the **[Google Cloud credentials page][8]** for the Google Cloud project where you would like to set up the Datadog integration.
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

1. In Datadog, navigate to the **[Google Cloud Platform integration page][9]**.
2. On the **Configuration** tab, locate the service account and select **Upload Private Key File** to integrate the project with Datadog.
3. Upload the JSON file, then click **Update Configuration**.
4. To monitor multiple projects, use one of the following methods:
    - Repeat the process above to use multiple service accounts.
    - Use the same service account by updating the `project_id` in the downloaded JSON file. Then, upload the file to Datadog as described in steps 1-3.

### Enable CSM for your Google Cloud projects

Use one of the following methods to enable CSM for your Google Cloud projects:

#### CSM Setup page

1. On the **[Cloud Security Management Setup page][2]**, click **Cloud accounts**.
2. Expand the **GCP** section.
3. To enable resource collection for a project, click the **Resource Scanning** toggle.
4. Click **Done**.

#### Google Cloud Platform integration page

1. On the **[Google Cloud Platform integration page][10]**, select a Google Cloud project.
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

{{% /tab %}}

{{< /tabs >}}

## Enable CSM on the Agent for hosts and containers

To enable CSM on the Agent for hosts and containers, navigate to the **[Cloud Security Management Setup page][1]**. The setup page shows a list of hosts and containers with information on the operating system and installed Agent version. Click **Enable** and follow the in-app instructions to enable CSM.

for the best experience, including step-by-step instructions scoped to your deployment configuration.

### Prerequisites

* Datadog Agent 7.44 or later.
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. CSM Threats supports the following Linux distributions:
  * Ubuntu LTS (18.04, 20.04, and 22.04)
  * Debian 10 or later
  * Amazon Linux 2 (kernels 4.15, 5.4, and 5.10) and 2023
  * SUSE Linux Enterprise Server 12 and 15
  * Red Hat Enterprise Linux 7, 8, and 9
  * Oracle Linux 7, 8, and 9
  * CentOS 7
  * Custom kernel builds are not supported.
* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][3].

### Remote Configuration

<div class="alert alert-info">Remote Configuration for CSM Threats is in beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[Remote Configuration][4] is a Datadog capability that allows you to remotely configure the behavior of Datadog resources deployed in your infrastructure. Available for CSM Threats, Remote Configuration allows you to receive new and updated Agent rules automatically when they're released.

To use Remote Configuration with CSM Threats, add the Remote Configuration scope to a new or existing API key, and then update your Datadog Agent configuration. See the [Remote Configuration setup instructions][5] for more information.

**Note**: Without Remote Configuration, Agent rules must be manually deployed to the Datadog Agent.

{{< tabs >}}
{{% tab "Kubernetes (Helm)" %}}

1. If you haven't already, install the [Datadog Agent][1].

2. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
    ```
    **Optional**: To enable Runtime Anomaly Detection, add the following to the `values.yaml` file:
   
    ```yaml
    # values.yaml file
    datadog:
      securityAgent:
        runtime:
          security_profile:
            enabled: true
    ```

3. Restart the Agent.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://docs.datadoghq.com/integrations/kubernetes_audit_logs/

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

1. If you haven't already, install the [Datadog Agent][1].

2. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    spec:
      features:
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
    ```

    **Optional** To enable Runtime Anomaly Detection, add the following to the `values.yaml` file:
   
    ```yaml
    # values.yaml file
    spec:
      features:
        cws:
          security_profile:
            enabled: true
    ```

    See the [Datadog Operator documentation][2] for additional configuration options.

3. Restart the Agent.

[1]: https://docs.datadoghq.com/containers/kubernetes/installation/?tab=operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Docker" %}}

The following command can be used to start the Runtime Security Agent and `system-probe` in a Docker environment:

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=true \ # to enable the collection of CSM Threats network events
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

{{% /tab %}}

{{% tab "Daemonset" %}}

Add the following settings to the `env` section of `security-agent` and `system-probe` in the `daemonset.yaml` file:

```bash
  # Source: datadog/templates/daemonset.yaml
  apiVersion:app/1
  kind: DaemonSet
  [...]
  spec:
  [...]
  spec:
      [...]
        containers:
        [...]
          - name: agent
            [...]
            env:
              - name: DD_REMOTE_CONFIGURATION_ENABLED
                value: "true"
          - name: system-probe
            [...]
            env:
              - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                value: "true"
              - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                value: "true"
          [...]
```

{{% /tab %}}

{{% tab "Host (Others)" %}}

For a package-based deployment, the Datadog package has to be deployed. Install the package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and the `system-probe.yaml` files need to be updated.

```bash
# /etc/datadog-agent/datadog.yaml file
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true
```

```bash
# /etc/datadog-agent/system-probe.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    enabled: true
```

**Optional**: To enable Runtime Anomaly Detection, add the following to the `system-probe.yaml` file:
```bash
# /etc/datadog-agent/system-probe.yaml file
runtime_security_config:
  security_profile:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable Runtime Anomaly Detection.
    enabled: true
```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
{{% /tab %}}

{{% tab "Amazon Elastic Beanstalk" %}}

The following deployment can be used to start the Runtime Security Agent and `system-probe` in an Amazon Elastic Beanstalk environment with multiple Docker containers:

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        },
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        },
        {
           "name": "os_release",
           "host": {
                "sourcePath": "/etc/os-release"
        }
        },
        {
           "name": "etc_passwd",
           "host": {
             "sourcePath": "/etc/passwd"
           }
        },
        {
           "name": "etc_group",
           "host": {
             "sourcePath": "/etc/group"
           }
        }
    ],
    "containerDefinitions": [
        {
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<YOUR_DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<YOUR_DD_SITE>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
                },
                {
                   "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                   "value": "true"
                },
                {
                    "name": "DD_REMOTE_CONFIGURATION_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED",
                    "value": "true"
                }
            ],
            "memory": 256,
            "dockerSecurityOptions": ["apparmor:unconfined"],
            "linuxParameters": {
             "capabilities": {
               "add": [
                 "SYS_ADMIN",
                 "SYS_RESOURCE",
                 "SYS_PTRACE",
                 "NET_ADMIN",
                 "NET_BROADCAST",
                 "NET_RAW",
                 "IPC_LOCK",
                 "CHOWN"
               ]
              }
            },
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                },
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug"
                },
                {
                    "sourceVolume": "os_release",
                    "containerPath": "/host/etc/os-release",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_passwd",
                    "containerPath": "/etc/passwd",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_group",
                    "containerPath": "/etc/group",
                    "readOnly": false
                }
            ]
        }
    ]
}
```

{{% /tab %}}

{{% tab "Docker Misconfigurations" %}}

### Enable CSM Misconfigurations for Docker

1. Navigate to **Security** > **Setup**.
2. Follow the [in-app instructions][1] to activate CSM Misconfigurations for your account.
3. On the **Setup** > **Host and containers** tab, click the **[Docker][1]** tile.
4. Click **Select API key** to choose the API key you want to use with CSM Misconfigurations.
5. Copy the automatically generated command and run it in your Docker environment to enable CSM Misconfigurations.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
{{% /tab %}}

{{% tab "Kubernetes Misconfigurations" %}}

### Enable CSM Misconfigurations for Kubernetes

1. If you haven't already, install the [Datadog Agent][1] (version 7.27+).
2. Navigate to **Security** > **Setup**.
3. Follow the [in-app instructions][1] to activate CSM Misconfigurations for your account.
4. Add the following to the `datadog` section of the `values.yaml` file:
    ```yaml
    # values.yaml file
    datadog:
    [...]
      # Add this to enable  CSM Misconfigurations and  CSM Threats
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
    ```

5. Restart the Agent.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[2]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /security/cloud_security_management/troubleshooting
[4]: /agent/remote_config
[5]: /agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
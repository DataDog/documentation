---
title: Setting Up CSM Enterprise
kind: documentation
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/threats/"
    tag: "Documentation"
    text: "Cloud Security Management Threats"
  - link: "/security/misconfigurations/"
    tag: "Documentation"
    text: "Cloud Security Management Misconfigurations"
  - link: "/security/identity_risks/"
    tag: "Documentation"
    text: "Cloud Security Management Identity Risks"
  - link: "/security/vulnerabilities/"
    tag: "Documentation"
    text: "Cloud Security Management Vulnerabilities"
  - link: "/agent/remote_config"
    tag: "Documentation"
    text: "Remote Configuration"
---

The Cloud Security Management (CSM) Enterprise package includes [CSM Threats][1], [CSM Misconfigurations][2] (cloud accounts and Agent), [CSM Identity Risks][3], and [CSM Vulnerabilities][4] (container images and hosts). To learn more about the available CSM packages, see [Setting up Cloud Security Management][8].

## Prerequisites

CSM Enterprise requires [Datadog Agent][14] 7.46 or later. Additionally, see the following requirements for CSM Threats and CSM Vulnerabilities:

### CSM Threats

CSM Threats supports the following Linux distributions:

* Ubuntu LTS (18.04, 20.04, and 22.04)
* Debian 10 or later
* Amazon Linux 2 (kernels 4.15, 5.4, and 5.10) and 2023
* SUSE Linux Enterprise Server 12 and 15
* Red Hat Enterprise Linux 7, 8, and 9
* Oracle Linux 7, 8, and 9
* CentOS 7
* Custom kernel builds are not supported.

**Notes**: 

* For compatibility with a custom Kubernetes network plugin like Cilium or Calico, see the [Troubleshooting page][15].
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. 

### CSM Vulnerabilities

* [Helm Chart][17] v3.33.6 or later (Kubernetes only).
* [containerd][16] v1.5.6 or later (Kubernetes and hosts only).

**Note**: CSM Vulnerabilities is not available for CRI-O runtime.

## Enable resource scanning for CSM misconfigurations

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-azure %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}

## Configure CSM for threats

### Enable Remote Configuration

{{< site-region region="us3,us5,eu,gov,ap1" >}}
<div class="alert alert-warning">Remote Configuration for CSM Threats is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Remote Configuration for CSM Threats is in beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[Remote Configuration][6] is a Datadog capability that allows you to remotely configure the behavior of Datadog resources deployed in your infrastructure. For CSM Threats, enabling Remote Configuration allows you to receive new and updated Agent rules automatically when they're released.

To use Remote Configuration with CSM Threats, add the Remote Configuration scope to a new or existing API key, and then update your Datadog Agent configuration. See the [Remote Configuration setup instructions][7] for more information.

**Note**: Without Remote Configuration, Agent rules must be manually deployed to the Datadog Agent.

### Configure the Agent

#### Follow the in-app instructions (recommended)

To enable CSM on the Agent, navigate to the [**Cloud Security Management Setup** page][5] and click **Hosts and containers**.

{{< img src="security/csm/hosts_containers_setup.png" alt="The Hosts and containers section on the Cloud Security Management Setup page" width="80%">}}

For each version of the Agent that is installed, click **Enable** and follow the step-by-step instructions.

Alternatively, use the following examples to enable CSM Enterprise for threats:

{{< tabs >}}
{{% tab "Kubernetes (Helm)" %}}

1. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
    ```
2. **Optional**: To enable [Runtime Anomaly Detection][1], add the following to the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:
      securityAgent:
        runtime:
          securityProfile:
            enabled: true
    ```

3. Restart the Agent.

[1]: /security/threats/runtime_anomaly_detection

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

1. Add the following to the `spec` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    spec:
      features:
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
        cspm:
          enabled: true
    ```

2. Restart the Agent.


[1]: /security/threats/runtime_anomaly_detection
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Docker" %}}

Use the following command to start the Runtime Security Agent and `system-probe` in a Docker environment:

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
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
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
              - name: DD_COMPLIANCE_CONFIG_ENABLED
                value: "true"
          [...]
```

{{% /tab %}}

{{% tab "Host (Others)" %}}

For a package-based deployment, install the Datadog package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and `system-probe.yaml` files need to be updated.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

```bash
# /etc/datadog-agent/datadog.yaml file
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true

runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

compliance_config:
 ## @param enabled - boolean - optional - default: false
 ## Set to true to enable CIS benchmarks for CSPM.
 #
 enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

compliance_config:
 ## @param enabled - boolean - optional - default: false
 ## Set to true to enable CIS benchmarks for CSPM.
 #
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

**Optional**: To enable [Runtime Anomaly Detection][1], add the following to the `system-probe.yaml` file:

```bash
# /etc/datadog-agent/system-probe.yaml file
runtime_security_config:
  security_profile:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable Runtime Anomaly Detection.
    enabled: true
```

[1]: /security/threats/runtime_anomaly_detection

{{% /tab %}}

{{% tab "AWS Elastic Beanstalk" %}}

The following deployment can be used to start the Runtime Security Agent and `system-probe` in an AWS Elastic Beanstalk environment with multiple Docker containers:

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
                },
                {
                      "name": "DD_COMPLIANCE_CONFIG_ENABLED",
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
{{< /tabs >}}

## Configure CSM for vulnerabilities

The following instructions enables the image metadata collection and [Software Bill of Materials (SBOM)][11] collection in the Datadog Agent. This allows you to scan the libraries in your container images and hosts to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers and hosts every hour.

**Note**: CSM Vulnerabilities is not available for AWS Fargate or Windows environments.

### Configure the Agent

#### Follow the in-app instructions (recommended)

To enable CSM Vulnerabilities on the Agent for your hosts and containers, navigate to the [**Cloud Security Management Setup** page][5] and click **Hosts and containers**.

{{< img src="security/csm/hosts_containers_setup.png" alt="The Hosts and containers section on the Cloud Security Management Setup page" width="80%">}}

For each version of the Agent that is installed, click **Enable** and follow the step-by-step instructions.

Alternatively, use the following examples to enable CSM Vulnerabilities:

### Containers

{{< tabs >}}
{{% tab "Kubernetes" %}}

Add the following to your `values.yaml` helm configuration file:

```yaml
datadog:
  containerImageCollection:
    enabled: true
  sbom:
    containerImage:
      enabled: true
```

{{% /tab %}}

{{% tab "ECS EC2" %}}

To enable container image vulnerability scanning on your [ECS EC2 instances][7], add the following environment variables to your `datadog-agent` container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

If the Agent fails to extract the SBOM from the container image, increase the Agent memory in the container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```

[7]: /containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

Add the following to your `datadog.yaml` configuration file:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
container_image:
  enabled: true
```

{{% /tab %}}
{{< /tabs >}}


### Hosts

**Note**: CSM Enterprise customers can enable both container and host SBOM collection at the same time by combining the [containers](#containers) setup with the following setup for hosts configuration:

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
datadog:
  sbom:
    host:
      enabled: true
```

{{% /tab %}}

{{% tab "ECS EC2" %}}

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_HOST_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

{{% /tab %}}

{{% tab "Hosts" %}}

```yaml
sbom:
  enabled: true
  host:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Enable CloudTrail logs forwarding for identity risks

**CSM Identity Risks**: 

To use CSM Identity Risks, you must [enable resource collection for AWS][2] and [enable CloudTrail logs forwarding][4].

**Note**: If you've enabled [Cloud Security Management Misconfigurations][5] for your AWS accounts, you already have [cloud resource collection][2] enabled. Similarly, if you use [Cloud SIEM][6], you already have [CloudTrail logs forwarding][4] enabled.

<div class="alert alert-info">At this time, CSM Identity Risks is available for AWS only.</div>

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][1]. You must also add the [required permissions][2] for resource collection.

### Enable AWS CloudTrail logging 

To enable CloudTrail log collection, follow the instructions on the CSM Setup page.

1. In AWS CloudTrail, create a trail and select the S3 bucket where you want to write the logs to.

### Send AWS CloudTrail logs to Datadog

Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][6] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog's [Log Explorer][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats
[2]: /security/misconfigurations
[3]: /security/identity_risks
[4]: /security/vulnerabilities
[5]: https://app.datadoghq.com/security/configuration/csm/setup
[6]: /agent/remote_config
[7]: /agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
[8]: /security/cloud_security_management/setup
[11]: https://www.cisa.gov/sbom
[12]: /security/cloud_security_management
[15]: /security/cloud_security_management/troubleshooting
[14]: /agent
[16]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[17]: /containers/kubernetes/installation/?tab=helm

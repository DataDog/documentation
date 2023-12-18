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

{{% csm-prereqs-enterprise %}}

## Enable resource scanning for cloud accounts

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

## Configure the Agent for hosts and containers

### Follow the in-app instructions (recommended)

To enable CSM on the Agent, navigate to the [**Cloud Security Management Setup** page][5] and click **Hosts and containers**.

{{< img src="security/csm/hosts_containers_setup_2.png" alt="The Hosts and containers section on the Cloud Security Management Setup page" width="80%">}}

For each version of the Agent that is installed, click **Enable** and follow the step-by-step instructions.

Alternatively, use the following examples to enable CSM Enterprise:

### Configure the Agent for Threats and Misconfigurations

#### Enable Remote Configuration

{{< site-region region="us3,us5,eu,gov,ap1" >}}
<div class="alert alert-warning">Remote Configuration for CSM Threats is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Remote Configuration for CSM Threats is in beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[Remote Configuration][6] is a Datadog capability that allows you to remotely configure the behavior of Datadog resources deployed in your infrastructure. For CSM Threats, enabling Remote Configuration allows you to receive new and updated Agent rules automatically when they're released.

To use Remote Configuration with CSM Threats, add the Remote Configuration scope to a new or existing API key, and then update your Datadog Agent configuration. See the [Remote Configuration setup instructions][7] for more information.

**Note**: Without Remote Configuration, Agent rules must be manually deployed to the Datadog Agent.

#### Configure the Agent

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
2. Restart the Agent.

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

### Configure the Agent for Vulnerabilities

The following instructions enables the image metadata collection and [Software Bill of Materials (SBOM)][11] collection in the Datadog Agent. This allows you to scan the libraries in your container images and hosts to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers and hosts every hour.

#### Containers

{{< tabs >}}
{{% tab "Kubernetes (Helm)" %}}

If you are using helm version `>= 3.46.0`, image collection is [enabled by default][1].</br>
Or, add the following to your `values.yaml` helm configuration file:

```yaml
datadog:
  containerImageCollection:
    enabled: true
  sbom:
    containerImage:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

Add the following to the spec section of your `values.yaml` file:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    # ...
    sbom:
      enabled: true
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

#### Hosts

**Note**: CSM Enterprise customers can enable both container and host SBOM collection at the same time by combining the [containers](#containers) setup with the following setup for hosts configuration:

{{< tabs >}}

{{% tab "Kubernetes (Helm)" %}}

```yaml
datadog:
  sbom:
    host:
      enabled: true
```

{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

Add the following to the spec section of your `values.yaml` file:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    # ...
    sbom:
      enabled: true
      containerImage:
        enabled: true
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

## Enable CloudTrail logs forwarding

### Set up the Datadog AWS integration

If you haven't already, set up the [Amazon Web Services integration][18].

### Enable AWS CloudTrail logging

Enable AWS CloudTrail logging so that logs are sent to a S3 bucket.

1. Click **Create trail** on the [CloudTrail dashboard][19].
2. Enter a name for your trail.
3. Create a new S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create a new AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. 
6. Click **Next**.
7. Review and click **Create trail**.

### Send AWS CloudTrail logs to Datadog

Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][20] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog's [Log Explorer][21].

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
[14]: /agent
[15]: /security/cloud_security_management/troubleshooting
[16]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[17]: /containers/kubernetes/installation/?tab=helm
[18]: /integrations/amazon_web_services/
[19]: https://console.aws.amazon.com/cloudtrail/home
[20]: https://console.aws.amazon.com/lambda/home
[21]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
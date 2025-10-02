---
title: Run Synthetic Tests from Private Locations
description: Run Synthetic API and browser tests from private locations
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Run Synthetic Tests from
  Private Locations
sourceUrl: https://docs.datadoghq.com/synthetics/platform/private_locations/index.html
---

# Run Synthetic Tests from Private Locations

## Overview{% #overview %}

Private locations allow you to **monitor internal-facing applications or any private endpoints** that aren't accessible from the public internet. They can also be used to:

- **Create custom Synthetic locations** in areas that are mission-critical to your business.
- **Verify application performance in your internal CI environment** before you release new features to production with [Continuous Testing and CI/CD](https://docs.datadoghq.com/continuous_testing/cicd_integrations).
- **Compare application performance** from both inside and outside your internal network.
- **[Authenticate Synthetic Monitoring tests using Kerberos SSO](https://docs.datadoghq.com/synthetics/guide/kerberos-authentication/)** for internal Windows-based sites and APIs.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/private_locations_worker_1.a0a7ba80447a205e0b4c5bfa86f57616.png?auto=format"
   alt="Architecture diagram of how a private location works in Synthetic Monitoring" /%}

Private locations come as Docker containers or Windows services that you can install inside of your private network. After you create and install a private location, you can assign [Synthetic tests](https://docs.datadoghq.com/synthetics/) to it, like with any managed location.

Your private location worker pulls your test configurations from Datadog's servers using HTTPS, executes the test on a schedule or on-demand, and returns the test results to Datadog's servers. You can then visualize your private locations test results in a completely identical manner to how you would visualize tests running from managed locations:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/test_results_pl.d49df3a18d0a65500fce4b34c8dc0b9e.png?auto=format"
   alt="Assign a Synthetic test to a private location" /%}

## Prerequisites{% #prerequisites %}

To use private locations for [Continuous Testing tests](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration), you need v1.27.0 or later.

{% tab title="Docker" %}
Private locations are Docker containers that you can install anywhere inside your private network. You can access the [private location worker image](https://hub.docker.com/r/datadog/synthetics-private-location-worker) on Docker hub. It can run on a Linux-based OS or Windows OS if the [Docker engine](https://docs.docker.com/engine/install/) is available on your host and can run in Linux containers mode.**\***

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

If you require FIPS support, use the [FIPS compliant image](https://hub.docker.com/r/datadog/synthetics-private-location-worker-fips) on Docker hub.
{% /callout %}

**\*** **Use and operation of this software is governed by the End User License Agreement available [here](https://www.datadoghq.com/legal/eula/).**
{% /tab %}

{% tab title="Helm" %}
Private locations are Kubernetes deployments that you can install on your Kubernetes cluster with Helm. The [helm chart](https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location) can run on Linux-based Kubernetes.

**Note**: Use and operation of this software is governed by the [End-User License Agreement](https://www.datadoghq.com/legal/eula/).
{% /tab %}

{% tab title="Windows" %}
Private locations are Windows services that you can install anywhere inside your private network using an [MSI file](https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.59.2.amd64.msi). Run this file from the virtual or physical machine that you would like to install the private location on.**\***

**\*** **Use and operation of this software is governed by the End User License Agreement available [here](https://www.datadoghq.com/legal/eula/).**

This machine's requirements are listed in the table below. PowerShell scripting must be enabled on the machine where you are installing the private location worker.

| System | Requirements                                                                         |
| ------ | ------------------------------------------------------------------------------------ |
| OS     | Windows Server 2022, Windows Server 2019, Windows Server 2016, or Windows 10.        |
| RAM    | 4GB minimum. 8GB recommended.                                                        |
| CPU    | Intel or AMD processor with 64-bit support. 2.8 GHz or faster processor recommended. |

**Note**: For Windows Private Locations to run browser tests, the browsers (for example, Chrome, Edge, or Firefox) must be installed on the Windows computer.

You must install .NET version 4.7.2 or later on your computer before using the MSI installer.

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com



{% alert level="danger" %}
FIPS compliance is not supported for Windows private locations that report to `ddog-gov.com`. To disable this behavior, use the [`--disableFipsCompliance` option](https://docs.datadoghq.com/synthetics/private_locations/configuration/?tab=docker#all-configuration-options).
{% /alert %}


{% /callout %}

{% /tab %}

### Datadog private locations endpoints{% #datadog-private-locations-endpoints %}

To pull test configurations and push test results, the private location worker needs access to the following Datadog API endpoints.

{% callout %}
# Important note for users on the following Datadog sites: app.datadoghq.com



| Port | Endpoint                          | Description                                                                                                                                                                                                                               |
| ---- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). |


{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: app.datadoghq.eu



| Port | Endpoint                         | Description                                                                                                                                                                                                                               |
| ---- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.eu` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). |

**Note**: These domains are pointing to a set of static IP addresses. These addresses can be found at [https://ip-ranges.datadoghq.eu](https://ip-ranges.datadoghq.eu).


{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: us3.datadoghq.com



| Port | Endpoint                              | Description                                                                                                                                                                                                                               |
| ---- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). |


{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: ap1.datadoghq.com



| Port | Endpoint                              | Description                                                                                                                                                                                                                               |
| ---- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap1.datadoghq.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). |


{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: ap2.datadoghq.com



| Port | Endpoint                              | Description                                                                                                                                                                                                                               |
| ---- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap2.datadoghq.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). |


{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: us5.datadoghq.com



| Port | Endpoint                              | Description                                                                                                                                                                                                                               |
| ---- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us5.datadoghq.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). |


{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com



| Port | Endpoint                         | Description                                                                                                                                                                                                                                                                                                                                            |
| ---- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 443  | `intake.synthetics.ddog-gov.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). For versions 1.32.0 and later, these requests are Federal Information Processing Standards (FIPS) compliant. |


{% /callout %}

## Set up your private location{% #set-up-your-private-location %}

Only users with the **Synthetics Private Locations Write** role can create private locations. For more information, see Permissions.

### Create your private location{% #create-your-private-location %}

Navigate to [**Synthetic Monitoring** > **Settings** > **Private Locations**](https://app.datadoghq.com/synthetics/settings/private-locations) and click **Add Private Location**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/synthetics_pl_add_1.4a28562156394a4e782adacbb3c69ec9.png?auto=format"
   alt="Create a private location" /%}

Fill out your private location details:

1. Specify your private location's **Name** and **Description**.
1. Add any **Tags** you would like to associate with your private location.
1. Choose one of your existing **API Keys**. Selecting an API key allows communication between your private location and Datadog. If you don't have an existing API key, click **Generate API key** to create one on the dedicated page. Only `Name` and `API key` fields are mandatory.
1. Set access for your private location and click **Save Location and Generate Configuration File**. Datadog creates your private location and generates the associated configuration file.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_creation_1.5889c1435655bcd013925f4a7e782720.png?auto=format"
   alt="Add details to private location" /%}

### Configure your private location{% #configure-your-private-location %}

Configure your private location by customizing the generated configuration file. When you add initial configuration parameters such as proxies and blocked reserved IPs in **Step 3**, your generated configuration file updates automatically in **Step 4**.

You can access advanced options to adjust the configuration based on your internal network setup. For more information about the `help` command, see [Configuration](https://docs.datadoghq.com/synthetics/private_locations/configuration/).

#### Proxy configuration{% #proxy-configuration %}

If the traffic between your private location and Datadog has to go through a proxy, specify your proxy URL as `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` to add the associated `proxyDatadog` parameter to your generated configuration file.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_proxy_1.f795e2ea1541371fe88b4c17accdd4d4.png?auto=format"
   alt="Add a proxy to your private location configuration file" /%}

#### Blocking reserved IPs{% #blocking-reserved-ips %}

By default, Synthetic users can create Synthetic tests on endpoints using any IP. If you want to prevent users from creating tests on sensitive internal IPs in your network, toggle the **Block reserved IPs** button to block a default set of reserved IP ranges ([IPv4 address registry](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml) and [IPv6 address registry](https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml)) and set the associated `enableDefaultBlockedIpRanges` parameter to `true` in your generated configuration file.

If some of the endpoints you are willing to test are located within one or several of the blocked reserved IP ranges, you can add their IPs and/or CIDRs to the allowed lists to add the associated `allowedIPRanges` parameters to your generated configuration file.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_reserved_ips_1.3704971fbd8ddc8cf1c27f955cb13383.png?auto=format"
   alt="Configure reserved IPs" /%}

### View your configuration file{% #view-your-configuration-file %}

After adding the appropriate options to your private location configuration file, you can copy and paste this file into your working directory. The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_view_file_1.3ceefbedf910881ac66c815075a6d013.png?auto=format"
   alt="Configure reserved IPs" /%}

Datadog does not store your secrets, so store them locally before clicking **View Installation Instructions**.

**Note:** You need to be able to reference these secrets again if you decide to add more workers or install workers on another host.

### Install your private location{% #install-your-private-location %}

You can use `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` and `DATADOG_PRIVATE_KEY` environment variables in your task definition.

Launch your private location on:

{% tab title="Docker" %}
Run this command to boot your private location worker by mounting your configuration file to the container. Ensure that your `<MY_WORKER_CONFIG_FILE_NAME>.json` file is in `/etc/docker`, not the root home folder:

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities](https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities) to your private location container.

This command starts a Docker container and makes your private location ready to run tests. **Datadog recommends running the container in detached mode with proper restart policy.**
{% /tab %}

{% tab title="Docker Compose" %}

1. Create a `docker-compose.yml` file with:

   ```yaml
   version: "3"
   services:
       synthetics-private-location-worker:
           image: datadog/synthetics-private-location-worker:latest
           volumes:
               - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
   ```

**Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities](https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities) to your private location container.

1. Start your container with:

   ```shell
   docker-compose -f docker-compose.yml up
   ```

{% /tab %}

{% tab title="Podman" %}
The Podman configuration is very similar to Docker, however, you must set `NET_RAW` as an additional capability to support ICMP tests.

1. Run `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` from the host where the container runs.

1. Run this command to boot your private location worker by mounting your configuration file to the container. Ensure that your `<MY_WORKER_CONFIG_FILE_NAME>.json` file is accessible to mount to the container:

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

If you have configured blocked reserved IP addresses, add the `NET_ADMIN` Linux capabilities to your private location container.

This command starts a Podman container and makes your private location ready to run tests. Datadog recommends running the container in detached mode with proper restart policy.
{% /tab %}

{% tab title="Kubernetes Deployment" %}
To deploy the private locations worker in a secure manner, set up and mount a Kubernetes Secret resource in the container under `/etc/datadog/synthetics-check-runner.json`.

1. Create a Kubernetes Secret with the previously created JSON file by executing the following:

   ```shell
   kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
   ```

1. Use deployments to describe the desired state associated with your private locations. Create the following `private-location-worker-deployment.yaml` file:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: datadog-private-location-worker
     namespace: default
   spec:
     selector:
       matchLabels:
         app: private-location
     template:
       metadata:
         name: datadog-private-location-worker
         labels:
           app: private-location
       spec:
         containers:
         - name: datadog-private-location-worker
           image: datadog/synthetics-private-location-worker
           volumeMounts:
           - mountPath: /etc/datadog/synthetics-check-runner.json
             name: worker-config
             subPath: <MY_WORKER_CONFIG_FILE_NAME>
         volumes:
         - name: worker-config
           secret:
             secretName: private-location-worker-config
   ```

**Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities](https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities) to your private location container.

1. Apply the configuration:

   ```shell
   kubectl apply -f private-location-worker-deployment.yaml
   ```

For OpenShift, run the private location with the `anyuid` SCC. This is required for your browser test to run.
{% /tab %}

{% tab title="Helm Chart" %}
You can set environment variables in your configuration parameters that point to secrets you have already configured. To create environment variables with secrets, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data).

Alternatively:

1. Add the [Datadog Synthetics Private Location](https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location) to your Helm repositories:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Install the chart with the release name `<RELEASE_NAME>` by using the previously created JSON file:

   ```shell
   helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
   ```

**Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities](https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities) to your private location container.
{% /tab %}

{% tab title="ECS" %}
Create a new EC2 task definition that matches the following. Replace each parameter with the corresponding value found in your previously generated private location configuration file:

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2"
    ],
    ...
}
```

**Notes:**

- If you have blocked reserved IPs, configure a [linuxParameters](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html) to grant `NET_ADMIN` capabilities to your private location containers.
- If you use the `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` and `DATADOG_PRIVATE_KEY` environment variables, you do not need to include them in the `"command": [ ]` section.

{% /tab %}

{% tab title="Fargate" %}
Create a new Fargate task definition that matches the following. Replace each parameter with the corresponding value found in your previously generated private location configuration file:

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**Note:** Because the private location firewall option is not supported on AWS Fargate, the `enableDefaultBlockedIpRanges` parameter cannot be set to `true`.
{% /tab %}

{% tab title="Fargate with AWS Secret Manager" %}
Create a secret in AWS secret manager to store all or part of the previously generated private location configuration. Keep in mind that the `publicKey` cannot be kept as it is in the configuration file. For example:

```json
{
    "datadogApiKey": "...",
    "id": "...",
    "site": "...",
    "accessKey": "...",
    "secretAccessKey": "...",
    "privateKey": "...",
    "pem": "...",
    "fingerprint": "..."
}
```

Permissions are required to allow the task definition and the AWS Fargate instance to read from the secret manager. See [Specifying sensitive data using Secrets Manager secrets in Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html) for more information.

Create a Fargate task definition that matches the following example, replacing the values in the list of secrets with the ARN of the secret you created in the previous step. For example: `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`.

If you didn't save all the configuration in the secret manager, you can still pass the value as hardcoded string arguments.

```yaml
{
    ...
    "containerDefinitions": [
        {
            "entryPoint": [
                "/bin/bash",
                "-c"
            ],
            "command": [
                "/home/dog/scripts/entrypoint.sh --locationID=$locationID --publicKey.fingerprint=$fingerprint"
            ],
            "secrets": [
              {
                "name": "DATADOG_ACCESS_KEY",
                "valueFrom": "..."
              },
              {
                "name": "DATADOG_API_KEY",
                "valueFrom": "...",
              },
              {
                "name": "fingerprint",
                "valueFrom": "...",
              },
              {
                "name": "locationID",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PUBLIC_KEY_PEM",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PRIVATE_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SECRET_ACCESS_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SITE",
                "valueFrom": "...",
              }
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**Note:** Because the private location firewall option is not supported on AWS Fargate, the `enableDefaultBlockedIpRanges` parameter cannot be set to `true`.
{% /tab %}

{% tab title="EKS" %}
Because Datadog already integrates with Kubernetes and AWS, it is ready-made to monitor EKS.

1. Create a Kubernetes Secret with the previously created JSON file by executing the following:

   ```shell
   kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
   ```

1. Use deployments to describe the desired state associated with your private locations. Create the following `private-location-worker-deployment.yaml` file:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: datadog-private-location-worker
     namespace: default
   spec:
     selector:
       matchLabels:
         app: private-location
     template:
       metadata:
         name: datadog-private-location-worker
         labels:
           app: private-location
       spec:
         containers:
         - name: datadog-private-location-worker
           image: datadog/synthetics-private-location-worker
           volumeMounts:
           - mountPath: /etc/datadog/synthetics-check-runner.json
             name: worker-config
             subPath: <MY_WORKER_CONFIG_FILE_NAME>
         volumes:
         - name: worker-config
           configMap:
             name: private-location-worker-config
   ```

**Note:** If you have blocked reserved IPs, configure a security context to grant `NET_ADMIN` [Linux capabilities](https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities) to your private location containers.

1. Apply the configuration:

   ```shell
   kubectl apply -f private-location-worker-deployment.yaml
   ```

{% /tab %}

{% tab title="Windows via GUI" %}

1. Download the [`datadog-synthetics-worker-1.59.2.amd64.msi` file](https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.59.2.amd64.msi) and run this file from the machine you want to install the private location on.

1. Click **Next** on the welcome page, read the EULA, and accept the terms and conditions. Click **Next**.

1. Modify where the application will be installed, or leave the default settings. Click **Next**.

1. To configure your Windows private location, you can either:

   - Paste and enter a JSON configuration for your Datadog Synthetics Private Location Worker. This file is generated by Datadog when you [create a private location](https://app.datadoghq.com/synthetics/settings/private-locations).

   - Browse or type a file path to a file containing a JSON configuration for your Datadog Synthetics Private Location Worker.

   - You can leave it blank and run `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` in the Windows command-line prompt after the installation is complete.

     {% image
        source="https://datadog-docs.imgix.net/images/synthetics/private_locations/configuration_selector_paste.81e7a9a3bf56f4300e374a67e643cc98.png?auto=format"
        alt="Synthetics Private Location Worker wizard, MSI installer. The option 'Paste in a JSON configuration' is selected. A text field for this JSON configuration is displayed." /%}

1. You can apply the following configuration options:

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/private_locations/settings.9ac74358e276f55f0e5f3bb804418f00.png?auto=format"
      alt="Synthetics Private Location Worker wizard, MSI installer. Firewall and log settings are displayed." /%}

   {% dl %}
   
   {% dt %}
Apply firewall rules needed by this program to Windows Firewall
   {% /dt %}

   {% dd %}
Allow the installer to apply firewall rules on install and remove them on uninstall.
   {% /dd %}

   {% dt %}
Apply rules to block reserved IPs in Windows Firewall
   {% /dt %}

   {% dd %}
Configure blocking rules for Chrome, Firefox, and Edge (if they are installed) and add rules to block reserved IP address ranges outbound in Windows Firewall.
   {% /dd %}

   {% dt %}
Enable File Logging
   {% /dt %}

   {% dd %}
Allow the Synthetics Private Location Worker to log files in the installation directory.
   {% /dd %}

   {% dt %}
Log Rotation Days
   {% /dt %}

   {% dd %}
Specifies how many days to keep logs before deleting them from the local system.
   {% /dd %}

   {% dt %}
Logging Verbosity
   {% /dt %}

   {% dd %}
Specifies the verbosity of the console and file logging for the Synthetics Private Location Worker.
   {% /dd %}

      {% /dl %}

1. Click **Next** and **Install** to start the installation process.

Once the process is complete, click **Finish** on the installation completion page.

{% alert level="warning" %}
If you entered your JSON configuration, the Windows Service starts running using that configuration. If you did not enter your configuration, run `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration >` from a command prompt or use the `start menu` shortcut to start the Synthetics Private Location Worker.
{% /alert %}

{% /tab %}

{% tab title="Windows via CLI" %}

1. Download the [`datadog-synthetics-worker-1.59.2.amd64.msi` file](https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.59.2.amd64.msi) and run this file from the machine you want to install the private location on.

1. Run one of the following commands inside the directory where you downloaded the installer:

   - In a PowerShell Terminal:

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-1.59.2.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>";
     ```

   - Or in a Command Terminal:

     ```cmd
     msiexec /i datadog-synthetics-worker-1.59.2.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>
     ```

Additional parameters can be added:

| Optional Parameter             | Definition                                                                                                                                                       | Value                               | Default Value         | Type                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------- | -------------------------------------------------- |
| APPLYDEFAULTFIREWALLRULES      | Applies firewall rules needed for the program.                                                                                                                   | 1                                   | N/A                   | 0: Disabled1: Enabled                              |
| APPLYFIREWALLDEFAULTBLOCKRULES | Blocks reserved IP addresses for each browser you have installed (Chrome, Edge, and Firefox). Blocking loopback connections is not possible in Windows Firewall. | 0                                   | N/A                   | 0: Disabled1: Enabled                              |
| LOGGING_ENABLED                | When enabled, this configures file logging. These logs are stored in the installation directory under the logs folder.                                           | 0                                   | `--enableFileLogging` | 0: Disabled1: Enabled                              |
| LOGGING_VERBOSITY              | Configures the logging verbosity for the program. This affects console and file logs.                                                                            | This affects console and file logs. | `-vvv`                | `-v`: Error`-vv`: Warning`-vvv`: Info`vvvv`: Debug |
| LOGGING_MAXDAYS                | Number of days to keep file logs on the system before deleting them. Can be any number when running an unattended installation.                                  | 7                                   | `--logFileMaxDays`    | Integer                                            |
| CONFIG_FILEPATH                | This should be changed to the path to your Synthetics Private Location Worker JSON configuration file. Wrap this path in quotes if your path contains spaces.    |                                     | `--config`            | String                                             |

{% /tab %}

For more information about private locations parameters for admins, see [Configuration](https://docs.datadoghq.com/synthetics/platform/private_locations/configuration).

#### Root certificates{% #root-certificates %}

You can upload custom root certificates to your private locations to have your API and browser tests perform the SSL handshake using your own `.pem` files.

{% tab title="Linux container" %}
When spinning up your private location containers, mount the relevant certificate `.pem` files to `/etc/datadog/certs` in the same way you mount your private location configuration file. These certificates are considered trusted CA and are used at test runtime.

{% alert level="info" %}
**Note**: If you combine all your `.pem` files into one file, the sequence of the certificates within the file is important. It is required that the intermediate certificate precedes the root certificate to successfully establish a chain of trust.
{% /alert %}

{% /tab %}

{% tab title="Windows service" %}
To install root certificates for private locations on a Windows service, use the following steps:

1. Open the Registry Editor App.
1. Navigate to the entry `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location`.
1. Create a Registry key named `Environment` with the `Multi-string` value type.

{% alert level="info" %}
**Note**: Your certificate needs to be in the same folder as the your Synthetic Monitoring Service: default: `C:\Program Files\Datadog-Synthetics\Synthetics`.
{% /alert %}

Set the value `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem`

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/windows_pl_set_service.d7e89a09d78c7e5909fd19ee8e66893c.png?auto=format"
   alt="Your image description" /%}

Open the Services App and reload the Datadog Synthetic Monitoring Private Location service.

{% /tab %}

{% tab title="Windows standalone" %}
To install root certificates for private locations on a standalone Windows process with `synthetics-private-location.exe`, use the following steps:

1. Open your Windows command prompt or PowerShell.

1. Set the environment variable and call the executable.

Example:

```text
set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

{% /tab %}

#### Set up liveness and readiness probes{% #set-up-liveness-and-readiness-probes %}

Add a liveness or readiness probe so your orchestrator can ensure the workers are running correctly.

For readiness probes, you need to enable private location status probes on port `8080` in your private location deployment. For more information, see [Private Locations Configuration](https://docs.datadoghq.com/synthetics/private_locations/configuration/).

{% tab title="Docker Compose" %}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{% /tab %}

{% tab title="Kubernetes Deployment" %}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{% /tab %}

{% tab title="Helm Chart" %}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{% /tab %}

{% tab title="ECS" %}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/usr/bin/wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{% /tab %}

{% tab title="Fargate" %}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "wget -O /dev/null -q http://localhost:8080/liveness || exit 1"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{% /tab %}

{% tab title="EKS" %}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{% /tab %}

#### Additional health check configurations{% #additional-health-check-configurations %}

{% alert level="danger" %}
This method of adding private location health checks is no longer supported. Datadog recommends using liveness and readiness probes.
{% /alert %}

The `/tmp/liveness.date` file of private location containers gets updated after every successful poll from Datadog (2s by default). The container is considered unhealthy if no poll has been performed in a while, for example: no fetch in the last minute.

Use the configuration below to set up health checks on your containers with `livenessProbe`:

{% tab title="Docker Compose" %}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "/bin/sh", "-c", "'[ $$(expr $$(cat /tmp/liveness.date) + 300000) -gt $$(date +%s%3N) ]'"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{% /tab %}

{% tab title="Kubernetes Deployment" %}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{% /tab %}

{% tab title="Helm Chart" %}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{% /tab %}

{% tab title="ECS" %}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{% /tab %}

{% tab title="Fargate" %}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{% /tab %}

{% tab title="EKS" %}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{% /tab %}

### Upgrade a private location image{% #upgrade-a-private-location-image %}

To upgrade an existing private location, click the **Gear** icon on the private location side panel and click **Installation instructions**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_edit_config.1d94e138878a0616850771bd37da409f.png?auto=format"
   alt="Access the setup workflow for a private location" /%}

Then, run the configuration command based on your environment to get the latest version of the private location image.

**Note**: If you're using `docker run` to launch your Private Location image and you've previously installed the Private Location image using the `latest` tag, make sure to add `--pull=always` to the `docker run` command to make sure the newest version is pulled rather than relying on the cached version of the image that may exist locally with the same `latest` tag.

### Test your internal endpoint{% #test-your-internal-endpoint %}

Once at least one private location worker starts reporting to Datadog, the private location status displays green.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_reporting.bdae5384b090e22d53f280db49a75b28.png?auto=format"
   alt="Private location reporting" /%}

You can see a `REPORTING` health status and an associated monitor status displayed on the Private Locations list in the **Settings** page.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_monitoring_table_reporting_1.28828235a7f604b0de81a5b48624b30b.png?auto=format"
   alt="Private location health and monitor status" /%}

Start testing your first internal endpoint by launching a fast test on one of your internal endpoints to see if you get the expected response:

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_fast_test.mp4" /%}

**Note:** Datadog only sends outbound traffic from your private location, no inbound traffic is transmitted.

## Launch Synthetic tests from your private location{% #launch-synthetic-tests-from-your-private-location %}

Create an API, multistep API, or browser test, and select your **Private Locations** of interest.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/assign-test-pl-2.55317eb80c33d978b492d867a199a173.png?auto=format"
   alt="Assign Synthetic test to private location" /%}

Use private locations just like your Datadog managed locations: assign [Synthetic tests](https://docs.datadoghq.com/synthetics/) to private locations, visualize test results, retrieve [Synthetic metrics](https://docs.datadoghq.com/synthetics/metrics), and more.

## Scale your private location{% #scale-your-private-location %}

Because you can run several workers for one single private location with a single configuration file, you can **horizontally scale** your private locations by adding or removing workers to them. When doing so, make sure to set a `concurrency` parameter and allocate worker resources that are consistent with the types and the number of tests you want your private location to execute.

You can also **vertically scale** your private locations by increasing the load your private location workers can handle. Similarly, you should use the `concurrency` parameter to adjust the maximum number of test your workers allowed to run and update the resources allocated to your workers.

For more information, see [Dimensioning Private Locations](https://docs.datadoghq.com/synthetics/private_locations/dimensioning).

In order to use private locations for Continuous Testing, set a value in the `concurrency` parameter to control your parallelization. For more information, see [Continuous Testing](https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration).

## Monitor your private location{% #monitor-your-private-location %}

While you initially add resources that are consistent with the number and type of tests to execute from your private location, the easiest way to know if you should downscale or upscale your private location is to closely monitor them. [Private Location Monitoring](https://docs.datadoghq.com/synthetics/private_locations/monitoring) provides insight about the performance and state of your private location as well as out-of-the-box metrics and monitors.

For more information, see [Private Location Monitoring](https://docs.datadoghq.com/synthetics/private_locations/monitoring).

## Permissions{% #permissions %}

By default, only users with the Datadog Admin Role can create private locations, delete private locations, and access private location installation guidelines.

Users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac/permissions) can view private locations, search for private locations, and assign Synthetic tests to private locations. Grant access to the [**Private Locations** page](https://app.datadoghq.com/synthetics/settings/private-locations) by upgrading your user to one of these two [default roles](https://docs.datadoghq.com/synthetics/private_locations/monitoring).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac#custom-roles), add your user to a custom role that includes `synthetics_private_location_read` and `synthetics_private_location_write` permissions.

{% alert level="danger" %}
**Note**: If a test includes restricted private locations, updating the test removes those locations from the test.
{% /alert %}

## Restrict access{% #restrict-access %}

Use [granular access control](https://docs.datadoghq.com/account_management/rbac/granular_access) to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
1. Click **Edit Access**.
   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/settings/grace_2.09d79bb84cb15017d170b008af71c0f9.png?auto=format"
      alt="Set permissions for your test from Private Locations configuration form" /%}
1. Click **Restrict Access**.
1. Select teams, roles, or users.
1. Click **Add**.
1. Select the level of access you want to associate with each of them.
1. Click **Done**.

{% alert level="info" %}
**Note**: You can view results from a Private Location even without Viewer access to that Private Location.
{% /alert %}

| Access level | View PL instructions | View PL metrics | Use PL in test | Edit PL configuration |
| ------------ | -------------------- | --------------- | -------------- | --------------------- |
| No access    |
| Viewer       | yes                  | yes             | yes            |
| Editor       | yes                  | yes             | yes            | yes                   |

## Further Reading{% #further-reading %}

- [Monitor your Synthetic private locations with Datadog](https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/)
- [Getting Started with Private Locations](https://docs.datadoghq.com/getting_started/synthetics/private_location)
- [Monitor your Private Locations](https://docs.datadoghq.com/synthetics/private_locations/monitoring)
- [Dimension your Private Locations](https://docs.datadoghq.com/synthetics/private_locations/dimensioning)
- [Protect Sensitive Data with Synthetics Private Location Runners](https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/)
- [Create and manage Synthetic Private Locations with Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location)

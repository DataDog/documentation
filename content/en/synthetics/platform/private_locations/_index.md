---
title: Run Synthetic Tests from Private Locations
kind: documentation
description: Run Synthetic API and browser tests from private locations
aliases:
- /synthetics/private_locations
further_reading:
    - link: 'https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/'
      tag: 'Blog'
      text: 'Monitor your Synthetic private locations with Datadog'
    - link: /getting_started/synthetics/private_location
      tag: 'Documentation'
      text: 'Getting Started with Private Locations'
    - link: '/synthetics/private_locations/monitoring'
      tag: 'Documentation'
      text: 'Monitor your Private Locations'
    - link: '/synthetics/private_locations/dimensioning'
      tag: 'Documentation'
      text: 'Dimension your Private Locations'
    - link: '/synthetics/api_tests'
      tag: 'Documentation'
      text: 'Configure an API Test'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location'
      tag: "External Site"
      text: 'Create and manage Synthetic Private Locations with Terraform'
---

## Overview

Private locations allow you to **monitor internal-facing applications or any private endpoints** that aren't accessible from the public internet. They can also be used to:

* **Create custom Synthetic locations** in areas that are mission-critical to your business.
* **Verify application performance in your internal CI environment** before you release new features to production with [Continuous Testing and CI/CD][1].
* **Compare application performance** from both inside and outside your internal network.

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Architecture diagram of how a private location works in Synthetic Monitoring" style="width:100%;">}}

Private locations come as Docker containers or Windows services that you can install inside of your private network. After you create and install a private location, you can assign [Synthetic tests][2] to it, like with any managed location.

Your private location worker pulls your test configurations from Datadog's servers using HTTPS, executes the test on a schedule or on-demand, and returns the test results to Datadog's servers. You can then visualize your private locations test results in a completely identical manner to how you would visualize tests running from managed locations:

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assign a Synthetic test to a private location" style="width:100%;">}}

## Prerequisites

To use private locations for [Continuous Testing tests][23], you need v1.27.0 or later.

{{< tabs >}}
{{% tab "Docker" %}}

Private locations are Docker containers that you can install anywhere inside your private network. You can access the [private location worker image][101] on Docker hub. It can run on a Linux-based OS or Windows OS if the [Docker engine][102] is available on your host and can run in Linux containers mode.**\***

**\*** **Use and operation of this software is governed by the End User License Agreement available [here][103].**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

Private locations are Kubernetes deployments that you can install on your Kubernetes cluster with Helm. The [helm chart][101] can run on Linux-based Kubernetes.

**Note**: Use and operation of this software is governed by the [End-User License Agreement][103].

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

Private locations are Windows services that you can install anywhere inside your private network using an [MSI file][101]. Run this file from the virtual or physical machine that you would like to install the private location on.**\***

**\*** **Use and operation of this software is governed by the End User License Agreement available [here][102].**

This machine's requirements are listed in the table below. PowerShell scripting must be enabled on the machine where you are installing the private location worker.

| System | Requirements |
|---|---|
| OS | Windows Server 2016, Windows Server 2019, or Windows 10. |
| RAM | 4GB minimum. 8GB recommended. |
| CPU | Intel or AMD processor with 64-bit support. 2.8 GHz or faster processor recommended. |

**Note**: For Windows Private Locations to run browser tests, the browsers (for example, Chrome, Edge, or Firefox) must be installed on the Windows computer.

You must install .NET version 4.7.2 or later on your computer before using the MSI installer. 

{{< site-region region="gov" >}}

<div class="alert alert-danger">FIPS compliance is not supported for private locations that report to <code>ddog-gov.com</code>. To disable this behavior, use the <a href"="https://docs.datadoghq.com/synthetics/private_locations/configuration/?tab=docker#all-configuration-options"><code>--disableFipsCompliance</code> option</a>.</div>

{{< /site-region >}}

[101]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.48.0.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Datadog private locations endpoints

To pull test configurations and push test results, the private location worker needs access to the following Datadog API endpoints.

{{< site-region region="us" >}}

| Port | Endpoint                               | Description                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com`      | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |
| 443  | `intake-v2.synthetics.datadoghq.com` for versions >=0.2.0 and <=1.4.0   | Used by the private location to push browser test artifacts such as screenshots, errors, and resources.       |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                           | Description                                                    |
| ---- | ---------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.eu`   | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |

**Note**: These domains are pointing to a set of static IP addresses. These addresses can be found at https://ip-ranges.datadoghq.eu.

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us3" >}}

| Port | Endpoint                                | Description                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com`  | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="ap1" >}}

| Port | Endpoint                                | Description                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap1.datadoghq.com`  | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us5" >}}

| Port | Endpoint                              | Description                                                    |
| ---- | ------------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.us5.datadoghq.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="gov" >}}

| Port | Endpoint                         | Description                                                                                                                                                                                                                                                                       |
|------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 443  | `intake.synthetics.ddog-gov.com` | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. For versions 1.32.0 and later, these requests are Federal Information Processing Standards (FIPS) compliant. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## Set up your private location

Only users with the **Synthetics Private Locations Write** role can create private locations. For more information, see [Permissions](#permissions).

### Create your private location

Navigate to [**Synthetic Monitoring** > **Settings** > **Private Locations**][22] and click **Add Private Location**.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Create a private location" style="width:90%;">}}

Fill out your private location details:

1. Specify your private location's **Name** and **Description**.
2. Add any **Tags** you would like to associate with your private location.
3. Choose one of your existing **API Keys**. Selecting an API key allows communication between your private location and Datadog. If you don't have an existing API key, click **Generate API key** to create one on the dedicated page. Only `Name` and `API key` fields are mandatory.
4. Set access for your private location and click **Save Location and Generate Configuration File**. Datadog creates your private location and generates the associated configuration file.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Add details to private location" style="width:85%;">}} 

### Configure your private location

Configure your private location by customizing the generated configuration file. When you add initial configuration parameters such as [proxies](#proxy-configuration) and [blocked reserved IPs](#blocking-reserved-ips) in **Step 3**, your generated configuration file updates automatically in **Step 4**.

You can access advanced options to adjust the configuration based on your internal network setup. For more information about the `help` command, see [Configuration][5].

#### Proxy configuration

If the traffic between your private location and Datadog has to go through a proxy, specify your proxy URL as `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` to add the associated `proxyDatadog` parameter to your generated configuration file.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Add a proxy to your private location configuration file" style="width:90%;">}}

#### Blocking reserved IPs

By default, Synthetic users can create Synthetic tests on endpoints using any IP. If you want to prevent users from creating tests on sensitive internal IPs in your network, toggle the **Block reserved IPs** button to block a default set of reserved IP ranges ([IPv4 address registry][6] and [IPv6 address registry][7]) and set the associated `enableDefaultBlockedIpRanges` parameter to `true` in your generated configuration file.

If some of the endpoints you are willing to test are located within one or several of the blocked reserved IP ranges, you can add their IPs and/or CIDRs to the allowed lists to add the associated `allowedIPRanges` parameters to your generated configuration file.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="Configure reserved IPs" style="width:90%;">}}

### View your configuration file

After adding the appropriate options to your private location configuration file, you can copy and paste this file into your working directory. The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="Configure reserved IPs" style="width:90%;">}}

Datadog does not store your secrets, so store them locally before clicking **View Installation Instructions**.

**Note:** You need to be able to reference these secrets again if you decide to add more workers or install workers on another host.

### Install your private location

You can use `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` and `DATADOG_PRIVATE_KEY` environment variables in your task definition.

Launch your private location on:

{{< tabs >}}

{{% tab "Docker" %}}

Run this command to boot your private location worker by mounting your configuration file to the container. Ensure that your `<MY_WORKER_CONFIG_FILE_NAME>.json` file is in `/etc/docker`, not the root home folder:

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][1] to your private location container.

This command starts a Docker container and makes your private location ready to run tests. **Datadog recommends running the container in detached mode with proper restart policy.**

#### Root certificates

You can upload custom root certificates to your private locations to have your API and browser tests perform the SSL handshake using your own `.pem` files.

When spinning up your private location containers, mount the relevant certificate `.pem` files to `/etc/datadog/certs` in the same way you mount your private location configuration file. These certificates are considered trusted CA and are used at test runtime.

For more information about private locations parameters for admins, see [Configuration][2].

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Docker Compose" %}}

1. Create a `docker-compose.yml` file with:

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][1] to your private location container.

2. Start your container with:

    ```shell
    docker-compose -f docker-compose.yml up
    ```

#### Root certificates

You can upload custom root certificates to your private locations to have your API and browser tests perform the SSL handshake using your own `.pem` files.

When spinning up your private location containers, mount the relevant certificate `.pem` files to `/etc/datadog/certs` in the same way you mount your private location configuration file. These certificates are considered trusted CA and are used at test runtime.

For more information about private locations parameters for admins, see [Configuration][2].

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Podman" %}}

The Podman configuration is very similar to Docker, however, you must set `NET_RAW` as an additional capability to support ICMP tests.

1. Run `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` from the host where the container runs.
2. Run this command to boot your private location worker by mounting your configuration file to the container. Ensure that your `<MY_WORKER_CONFIG_FILE_NAME>.json` file is accessible to mount to the container:

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   If you have configured blocked reserved IP addresses, add the `NET_ADMIN` Linux capabilities to your private location container.

This command starts a Podman container and makes your private location ready to run tests. Datadog recommends running the container in detached mode with proper restart policy.


{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

To deploy the private locations worker in a secure manner, set up and mount a Kubernetes Secret resource in the container under `/etc/datadog/synthetics-check-runner.json`.

1. Create a Kubernetes Secret with the previously created JSON file by executing the following:

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Use deployments to describe the desired state associated with your private locations. Create the following `private-location-worker-deployment.yaml` file:

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

    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][1] to your private location container.

3. Apply the configuration:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

For OpenShift, run the private location with the `anyuid` SCC. This is required for your browser test to run.

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "Helm Chart" %}}

You can set environment variables in your configuration parameters that point to secrets you have already configured. To create environment variables with secrets, see the [Kubernetes documentation][3].

Alternatively:

1. Add the [Datadog Synthetics Private Location][1] to your Helm repositories:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. Install the chart with the release name `<RELEASE_NAME>` by using the previously created JSON file:

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][2] to your private location container.

[1]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[2]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data

{{% /tab %}}

{{% tab "ECS" %}}

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

- If you have blocked reserved IPs, configure a [linuxParameters][1] to grant `NET_ADMIN` capabilities to your private location containers.
- If you use the `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` and `DATADOG_PRIVATE_KEY` environment variables, you do not need to include them in the `"command": [ ]` section.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

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

{{% /tab %}}

{{% tab "EKS" %}}

Because Datadog already integrates with Kubernetes and AWS, it is ready-made to monitor EKS.

1. Create a Kubernetes Secret with the previously created JSON file by executing the following:

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Use deployments to describe the desired state associated with your private locations. Create the following `private-location-worker-deployment.yaml` file:

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

    **Note:** If you have blocked reserved IPs, configure a security context to grant `NET_ADMIN` [Linux capabilities][1] to your private location containers.

3. Apply the configuration:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}
{{% tab "Windows via GUI" %}}

1. Download the [`datadog-synthetics-worker-1.48.0.amd64.msi` file][101] and run this file from the machine you want to install the private location on. 
1. Click **Next** on the welcome page, read the EULA, and accept the terms and conditions. Click **Next**.
1. Modify where the application will be installed, or leave the default settings. Click **Next**.
1. To configure your Windows private location, you can either:
   - Paste and enter a JSON configuration for your Datadog Synthetics Private Location Worker. This file is generated by Datadog when you [create a private location][102].
   - Browse or type a file path to a file containing a JSON configuration for your Datadog Synthetics Private Location Worker.
   - You can leave it blank and run `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` in the Windows command-line prompt after the installation is complete.
  
   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Synthetics Private Location Worker wizard, MSI installer. The option 'Paste in a JSON configuration' is selected. A text field for this JSON configuration is displayed." style="width:80%;" >}}

1. You can apply the following configuration options:
   
   {{< img src="synthetics/private_locations/settings.png" alt="Synthetics Private Location Worker wizard, MSI installer. Firewall and log settings are displayed." style="width:80%;" >}}

   Apply firewall rules needed by this program to Windows Firewall
   : Allow the installer to apply firewall rules on install and remove them on uninstall.

   Apply rules to block reserved IPs in Windows Firewall
   : Configure blocking rules for Chrome, Firefox, and Edge (if they are installed) and add rules to block reserved IP address ranges outbound in Windows Firewall.

   Enable File Logging
   : Allow the Synthetics Private Location Worker to log files in the installation directory.

   Log Rotation Days
   : Specifies how many days to keep logs before deleting them from the local system.

   Logging Verbosity
   : Specifies the verbosity of the console and file logging for the Synthetics Private Location Worker.

1. Click **Next** and **Install** to start the installation process. 
   
Once the process is complete, click **Finish** on the installation completion page.

<div class="alert alert-warning">If you entered your JSON configuration, the Windows Service starts running using that configuration. If you did not enter your configuration, run <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> from a command prompt or use the <code>start menu</code> shortcut to start the Synthetics Private Location Worker.</div>

[101]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.48.0.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{% /tab %}}
{{% tab "Windows via CLI" %}}

1. Download the [`datadog-synthetics-worker-1.48.0.amd64.msi` file][101] and run this file from the machine you want to install the private location on. 
2. Run one of the following commands inside the directory where you downloaded the installer:
   
   - In a PowerShell Terminal:

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-1.48.0.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json";
     ```
   
   - Or in a Command Terminal:
  
     ```cmd
     msiexec /i datadog-synthetics-worker-1.48.0.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json
     ```

Additional parameters can be added:

| Optional Parameter | Definition | Value | Default Value | Type |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | Applies firewall rules needed for the program. | 1 | N/A | 0: Disabled<br>1: Enabled |
| APPLYFIREWALLDEFAULTBLOCKRULES | Blocks reserved IP addresses for each browser you have installed (Chrome, Edge, and Firefox). Blocking loopback connections is not possible in Windows Firewall. | 0 | N/A | 0: Disabled<br>1: Enabled |
| LOGGING_ENABLED | When enabled, this configures file logging. These logs are stored in the installation directory under the logs folder. | 0 | `--enableFileLogging` | 0: Disabled<br>1: Enabled |
| LOGGING_VERBOSITY | Configures the logging verbosity for the program. This affects console and file logs. | This affects console and file logs. | `-vvv` | `-v`: Error<br>`-vv`: Warning<br>`-vvv`: Info<br>`vvvv`: Debug |
| LOGGING_MAXDAYS | Number of days to keep file logs on the system before deleting them. Can be any number when running an unattended installation. | 7 | `--logFileMaxDays` | Integer |
| WORKERCONFIG_FILEPATH | This should be changed to the path to your Synthetics Private Location Worker JSON configuration file. Wrap this path in quotes if your path contains spaces. | <None> | `--config` | String |

[101]: https://dd-public-oss-mirror.s3.amazonaws.com/synthetics-windows-pl/datadog-synthetics-worker-1.48.0.amd64.msi

{{% /tab %}}
{{< /tabs >}}

#### Set up liveness and readiness probes

Add a liveness or readiness probe so your orchestrator can ensure the workers are running correctly.

For readiness probes, you need to enable private location status probes on port `8080` in your private location deployment. For more information, see [Private Locations Configuration][5].

{{< tabs >}}

{{% tab "Docker Compose" %}}

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

{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

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

{{% /tab %}}

{{% tab "Helm Chart" %}}

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

{{% /tab %}}

{{% tab "ECS" %}}

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

{{% /tab %}}

{{% tab "Fargate" %}}

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

{{% /tab %}}

{{% tab "EKS" %}}

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

{{% /tab %}}

{{< /tabs >}}

#### Additional health check configurations

<div class="alert alert-danger">This method of adding private location health checks is no longer supported. Datadog recommends using liveness and readiness probes.</div>

The `/tmp/liveness.date` file of private location containers gets updated after every successful poll from Datadog (2s by default). The container is considered unhealthy if no poll has been performed in a while, for example: no fetch in the last minute.

Use the configuration below to set up health checks on your containers with `livenessProbe`:

{{< tabs >}}

{{% tab "Docker Compose" %}}

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

{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

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

{{% /tab %}}

{{% tab "Helm Chart" %}}

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

{{% /tab %}}

{{% tab "ECS" %}}

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

{{% /tab %}}

{{% tab "Fargate" %}}

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

{{% /tab %}}

{{% tab "EKS" %}}

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

{{% /tab %}}

{{< /tabs >}}

### Upgrade a private location image

To upgrade an existing private location, click the **Gear** icon on the private location side panel and click **Installation instructions**.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Access the setup workflow for a private location" style="width:90%;" >}}

Then, run the [configuration command based on your environment](#install-your-private-location
) to get the latest version of the private location image. 

**Note**: If you're using `docker run` to launch your Private Location image and you've previously installed the Private Location image using the `latest` tag, make sure to add `--pull=always` to the `docker run` command to make sure the newest version is pulled rather than relying on the cached version of the image that may exist locally with the same `latest` tag.

### Test your internal endpoint

Once at least one private location worker starts reporting to Datadog, the private location status displays green.

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Private location reporting" style="width:90%;">}}

You can see a `REPORTING` health status and an associated monitor status displayed on the Private Locations list in the **Settings** page.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Private location health and monitor status" style="width:100%;">}}

Start testing your first internal endpoint by launching a fast test on one of your internal endpoints to see if you get the expected response:

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Fast test on private location" video="true" width="90%">}}

**Note:** Datadog only sends outbound traffic from your private location, no inbound traffic is transmitted.

## Launch Synthetic tests from your private location

Create an API, multistep API, or browser test, and select your **Private Locations** of interest.

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Assign Synthetic test to private location" style="width:90%;">}}

Use private locations just like your Datadog managed locations: assign [Synthetic tests][2] to private locations, visualize test results, retrieve [Synthetic metrics][11], and more.

## Scale your private location

Because you can run several workers for one single private location with a single configuration file, you can **horizontally scale** your private locations by adding or removing workers to them. When doing so, make sure to set a `concurrency` parameter and allocate worker resources that are consistent with the types and the number of tests you want your private location to execute.

You can also **vertically scale** your private locations by increasing the load your private location workers can handle. Similarly, you should use the `concurrency` parameter to adjust the maximum number of test your workers allowed to run and update the resources allocated to your workers.

For more information, see [Dimensioning Private Locations][18].

In order to use private locations for Continuous Testing, set a value in the `concurrency` parameter to control your parallelization. For more information, see [Continuous Testing][23].

## Monitor your private location

While you initially add resources that are consistent with the number and type of tests to execute from your private location, the easiest way to know if you should downscale or upscale your private location is to closely monitor them. [Private Location Monitoring][19] provides insight about the performance and state of your private location as well as out-of-the-box metrics and monitors.

For more information, see [Private Location Monitoring][19].

## Permissions

By default, only users with the Datadog Admin Role can create private locations, delete private locations, and access private location installation guidelines.

Users with the [Datadog Admin and Datadog Standard roles][20] can view private locations, search for private locations, and assign Synthetic tests to private locations. Grant access to the [**Private Locations** page][22] by upgrading your user to one of these two [default roles][19].

If you are using the [custom role feature][21], add your user to a custom role that includes `synthetics_private_location_read` and `synthetics_private_location_write` permissions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations
[2]: /synthetics/
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /synthetics/private_locations/configuration/
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /synthetics/metrics
[12]: /synthetics/api_tests/
[13]: /synthetics/multistep?tab=requestoptions
[14]: /synthetics/browser_tests/?tab=requestoptions
[16]: /agent/
[17]: /synthetics/metrics/
[18]: /synthetics/private_locations/dimensioning
[19]: /synthetics/private_locations/monitoring
[20]: /account_management/rbac/permissions
[21]: /account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations
[23]: /continuous_testing/cicd_integrations/configuration

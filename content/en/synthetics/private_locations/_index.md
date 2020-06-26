---
title: Run Synthetics Tests from Private Locations
kind: documentation
description: Run Synthetics API and browser tests from private locations
beta: true
further_reading:
    - link: /getting_started/synthetics/private_location
      tag: 'Documentation'
      text: 'Getting Started with Private Locations'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: 'synthetics/api_tests'
      tag: 'Documentation'
      text: 'Configure an API Test'
---

<div class="alert alert-warning">
This feature is in private beta. Reach out to the <a href="https://docs.datadoghq.com/help/">Datadog support team</a> to request access.
</div>

## Overview

Private locations allow you to **monitor internal-facing applications or any private URLs** that aren’t accessible from the public internet. They can also be used to:

* **Create new custom Synthetics locations** in areas that are mission-critical to your business.
* **Verify application performance in your internal CI environment** before you release new features to production with [Synthetics CI integration][1].
* **Compare application performance** from both inside & outside your internal network.

Private locations come as Docker containers that you can install wherever makes sense inside of your private network. Once created and installed, you can assign [Synthetic tests][2] to your private location just like you would with any regular managed location.

Your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test on a schedule or on-demand, and returns the test results to Datadog’s servers. You can then visualize your private locations test results in a completely identical manner to how you would visualize tests running from managed locations:

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assign Synthetic test to private location"  style="width:100%;">}}

## Prerequisites

### Docker

The private location worker is shipped as a Docker container. It can run on a Linux based OS or Windows OS if the [Docker engine][3] is available on your host and can run in Linux containers mode.

### Datadog Private Locations Endpoints

To pull test configurations and push test results, the private location worker needs access to the below Datadog API endpoints.

{{< site-region region="us" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com` for version 0.1.6+, `api.datadoghq.com/api/` for versions <0.1.5   | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |
| 443  | `intake-v2.synthetics.datadoghq.com` for versions >0.2.0                                             | Used by the private location to push browser test artifacts (screenshots, errors, resources)                                                                         |

**Note**: Check if the endpoint corresponding to your Datadog `site` is available from the host running the worker using `curl intake.synthetics.datadoghq.com` for version 0.1.6+ (`curl https://api.datadoghq.com` for versions <0.1.5).

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                                               | Description                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `api.datadoghq.eu/api/`                                | Used by the private location to pull test configurations and push test results to Datadog using an in-house protocol based on [AWS Signature Version 4 protocol][1]. |
| 443  | `intake-v2.synthetics.datadoghq.eu` for versions >0.2.0| Used by the private location to push browser test artifacts (screenshots, errors, resources)                                                                            |

**Note**: Check if the endpoint corresponding to your Datadog `site` is available from the host running the worker using `curl https://api.datadoghq.eu`.

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## Set up your private location

### Create your private location

Go in _Synthetics_ -> _Settings_ -> _Private Locations_ and click **Add Private Location**:

{{< img src="synthetics/private_locations/add_pl.png" alt="create a private locations"  style="width:100%;">}}

**Note**: Only **Admin** users can create private locations.

Fill out your private location details: specify your private location's **Name** and **Description**, add any **Tags** you would like to associate with your private location, and choose one of your existing **API Keys**. Selecting an API key allows communication between your private location and Datadog. If you don't have an existing API key, you can click **Generate API key** and create one on the dedicated page.

**Note:** Only `Name` and `API key` fields are mandatory.

Then click **Save Location and Generate Configuration File** to create your private location and generate the associated configuration file (visible in **Step 3**).

{{< img src="synthetics/private_locations/pl_creation.png" alt="Add details to private location"  style="width:90%;">}}

### Configure your private location

Depending on your internal network set up, you can add initial configuration parameters (proxy and reserved IPs configuration) to your private location configuration file. The parameters added in **Step 2** are automatically reflected in the **Step 3** configuration file. 

#### Proxy Configuration

If the traffic between your private location and Datadog has to go through a proxy, specify your proxy URL with the following format: `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` to add the associated `proxyDatadog` parameter to your generated configuration file.

{{< img src="synthetics/private_locations/pl_proxy.png" alt="Add a proxy to your private location configuration file"  style="width:90%;">}}

[Advanced proxy configuration options][4] are available.

#### Blocking Reserved IPs

By default, Synthetic users can create Synthetic tests on endpoints using any IP. If you want to prevent users from creating tests on sensitive internal IPs in your network, toggle the **Block reserved IPs** button to block a default set of reserved IP ranges ([IPv4 address registry][5] and [IPv6 address registry][6]) and set the associated `enableDefaultBlockedIpRanges` parameter to `true` in your generated configuration file.

If some of the endpoints you are willing to test are located within one or several of the blocked reserved IP ranges, you can add their IPs and/or CIDRs to the allowed lists to add the associated `allowedIPRanges` parameters to your generated configuration file.

{{< img src="synthetics/private_locations/pl_reserved_ips.png" alt="Configure reserved IPs"  style="width:90%;">}}

[Advanced reserved IPs configuration options][7] are available.

#### Advanced Configuration

[Advanced configuration options][8] are available and can be found by running the below `help` command: 

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

### View your configuration file

After adding the appropriate options to your private location configuration file, you can copy paste the file to your working directory.

{{< img src="synthetics/private_locations/pl_view_file.png" alt="Configure reserved IPs"  style="width:90%;">}}

**Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen. **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

### Install your private location

Launch your private location on:

{{< tabs >}}

{{% tab "Docker" %}}

Run this command to boot your private location worker by mounting your configuration file to the container:

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Note:** If you blocked reserved IPs, make sure to add the `NET_ADMIN` [Linux capabilities][1] to your private location container.

This command starts a Docker container and makes your private location ready to run tests. **We recommend running the container in detached mode with proper restart policy.**

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

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
    **Note:** If you blocked reserved IPs, make sure to add the `NET_ADMIN` [Linux capabilities][1] to your private location container.

2. Start your container with:

```shell
docker-compose -f docker-compose.yml up
```

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Create a Kubernetes ConfigMap with the previously created JSON file by executing the following:

    ```shell
    kubectl create configmap private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Take advantage of deployments to describe the desired state associated with your private locations. Create the following `private-location-worker-deployment.yaml` file:

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
                      - mountPath: /etc/datadog/
                        name: worker-config
            volumes:
                - name: worker-config
                  configMap:
                      name: private-location-worker-config
    ```

    **Note:** If you blocked reserved IPs, make sure to add the `NET_ADMIN` [Linux capabilities][1] to your private location container.

3. Apply the configuration:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "ECS" %}}

Create a new EC2 task definition matching the below. Make sure to replace each parameter by the corresponding value found in your previously generated pivate location configuration file:

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

**Note:** If you blocked reserved IPs, make sure to configure a [linuxParameters][1] to grant `NET_ADMIN` capabilities to your private location containers.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

Create a new Fargate task definition matching the below. Make sure to replace each parameter by the corresponding value found in your previously generated private location configuration file:

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

**Note:** The private location firewall option is not supported on AWS Fargate - the `enableDefaultBlockedIpRanges` parameter can consequently not be set to `true`.

{{% /tab %}}

{{% tab "EKS" %}}

Because Datadog already integrates with Kubernetes and AWS, it is ready-made to monitor EKS.

1. Create a Kubernetes ConfigMap with the previously created JSON file by executing the following:

    ```shell
    kubectl create configmap private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Take advantage of deployments to describe the desired state associated with your private locations. Create the following 

    ```yaml
    private-location-worker-deployment.yaml file:
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
              - mountPath: /etc/datadog/
                name: worker-config
        volumes:
          - name: worker-config
            configMap:
              name: private-location-worker-config
    ```

    **Note:** If you blocked reserved IPs, make sure to configure a security context to grant `NET_ADMIN` [Linux capabilities][1] to your private location containers.

3. Apply the configuration:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{< /tabs >}}

### Test your internal endpoint

Once at least one private location container starts reporting to Datadog the private location status is set to green:

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Private location reporting"  style="width:90%;">}}

You can then start testing your first internal endpoint by launching a fast test on one of your internal endpoints and see if you get the expected response:

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Fast test on private location" video="true" width="80%">}}

## Launch Synthetic tests from your private locations

If your private location reports correctly to Datadog you should also see an `OK` health status displayed on private locations list from the **Settings** page:

{{< img src="synthetics/private_locations/pl_health.png" alt="Private location health"  style="width:90%;">}}

You can then go to any of your API or Browser test creation form, and tick your **Private locations** of interest to have them run your Synthetic test on schedule:

{{< img src="synthetics/private_locations/assign_test_pl.png" alt="Assign Synthetic test to private location"  style="width:80%;">}}

Your private locations can be used just like any other Datadog managed locations: assign [Synthetic tests][2] to private locations, visualize test results, get [Synthetic metrics][9], etc.

## Scale your private locations

You can easily **horizontally scale** your private locations by adding or removing workers to it. You can run several containers for one private location with one single configuration file. Each worker would then request `N` tests to run depending on its number of free slots: when worker 1 is processing tests, worker 2 requests the following tests, etc.

You can also leverage the [`concurrency` parameter][10] value to adjust the number of tests your private location workers can run in parallel.

### Hardware Requirements

#### CPU/Memory

* Base requirement: 150mCores/150MiB

* Additional equirement per slot:

| Private location test type                          | Recommended concurrency range | CPU/Memory recommendation |
| --------------------------------------------------- | ----------------------------- | ------------------------- |
| Private location running both API and Browser tests | From 1 to 50                  | 150mCores/1GiB per slot   |
| Private location running API tests only             | From 1 to 200                 | 20mCores/5MiB per slot    |
| Private location running Browser tests only         | From 1 to 50                  | 150mCores/1GiB per slot   |

**Example:** For a private location running both API and Browser tests, and with a `concurrency` set to the default `10`, recommendation for a safe usage is ~ 1.5 core `(150mCores + (150mCores*10 slots))` and ~ 10GiB memory `(150M + (1G*10 slots))`.

#### Disk

The recommendation for disk size is to allocate ~ 10MiB/slot (1MiB/slot for API-only private locations).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/ci
[2]: /synthetics/
[3]: https://docs.docker.com/engine/install/
[4]: /synthetics/private_locations/configuration/#proxy-configuration
[5]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[6]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[7]: /synthetics/private_locations/configuration/#reserved-ips-configuration
[8]: /synthetics/private_locations/configuration/
[9]: /synthetics/metrics
[10]: /synthetics/private_locations/configuration/#parallelization-configuration

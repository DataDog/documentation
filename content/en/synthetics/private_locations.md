---
title: Run Synthetics Tests from Private Locations
kind: documentation
description: Run Synthetics API and browser tests from private locations
beta: true
further_reading:
    - link: 'synthetics/#create-a-check'
      tag: 'Documentation'
      text: 'Create an API or browser check'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: 'synthetics/api_tests'
      tag: 'Documentation'
      text: 'Configure an API Test'
---

<div class="alert alert-warning">
This feature is in public beta for API Tests. The equivalent feature for Browser Tests is in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to Datadog support</a> if you would like to test it.
</div>

## Overview

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location.

By default, every second, your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test depending on the frequency defined in the configuration of the test, and returns the test results to Datadog’s servers.

Once you created a private location, configuring a [Synthetics test][1] to run from a private location is completely identical to how you would assign tests to Datadog managed locations.

## Prerequisites

### Datadog Private Locations Endpoints

To pull test configurations and push test results, the private location worker needs access to one of the Datadog API endpoints.

{{< site-region region="us" >}}

| Datadog site    | Port | Endpoint                                                                                             |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| Datadog US site | 443  | `intake.synthetics.datadoghq.com` for version 0.1.6+, `api.datadoghq.com/api/` for versions <0.1.5   |

**Note**: Check if the endpoint corresponding to your Datadog `site` is available from the host running the worker using `curl intake.synthetics.datadoghq.com` for version 0.1.6+ (`curl https://api.datadoghq.com` for versions <0.1.5).

{{< /site-region >}}

{{< site-region region="eu" >}}

| Datadog site    | Port | Endpoint                                                                                             |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------- |
| Datadog EU site | 443  | `api.datadoghq.eu/api/`                                                                              |

**Note**: Check if the endpoint corresponding to your Datadog `site` is available from the host running the worker using `curl https://api.datadoghq.eu`.

{{< /site-region >}}

### Docker

The private location worker is shipped as a Docker container. It can run on a Linux based OS or Windows OS if the [Docker engine][2] is available on your host and can run in Linux containers mode.

## Private Location Setup

### Create a new private location

Go in _Synthetics_ -> _Settings_ -> _Private Locations_ and create a new private location:

{{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations"  style="width:90%;">}}

Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

**Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen. **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

### Configure your private location

The `synthetics-private-location-worker` comes with a number of options that can be set to configure your private locations through the launch command or the configuration file. Arguments set in the launch command have precedence over the configuration file. However, these options aren't stored and are consequently only prevalent for a given launch.

| Option                   | Type             | Default                                              | Description                                                                                                                                                              |
| ------------------------ | ---------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dnsServer`              | Array of Strings | `["8.8.8.8","1.1.1.1"]`                              | DNS server IPs used in given order (`--dnsServer="1.1.1.1" --dnsServer="8.8.8.8"`)                                                                                       |
| `dnsUseHost`             | Boolean          | `false`                                              | Use local DNS config in addition to --dnsServer (currently `["<DEFAULT_DNS_IN_HOST_CONFIG"]`)                                                                            |
| `whitelistedRange.4`     | Array of Strings | `none`                                               | Grant access to IPv4 IP ranges (e.g. `--whitelistedRange.4="10.0.0.0/8"` or `--whitelistedRange.4={"10.0.0.0/8","0.0.0.0/8"}`, has precedence over `--blacklistedRange`) |
| `whitelistedRange.6`     | Array of Strings | `none`                                               | Grant access to IPv6 IP ranges (e.g. `--whitelistedRange.6="::/128"` or `--whitelistedRange.6={"::/128","64:ff9b::/96"}`, has precedence over `--blacklistedRange`)      |
| `blacklistedRange.4`     | Array of Strings | [IANA IPv4/IPv6 Special-Purpose Address Registry][3] | Deny access to IPv4 IP ranges (e.g. `--blacklistedRange.4="127.0.0.0/8" --blacklisted.4="100.64.0.0/10"`)                                                                |
| `blacklistedRange.6`     | Array of Strings | [IANA IPv4/IPv6 Special-Purpose Address Registry][3] | Deny access to IPv6 IP ranges (e.g. `--blacklistedRange.6="::1/128"`)                                                                                                    |
| `site`                   | String           | `datadoghq.com`                                      | Datadog site (`datadoghq.com` or `datadoghq.eu`)                                                                                                                         |
| `proxy`                  | String           | `none`                                               | Proxy URL. Set the `proxy` option to your proxy URL in a curl-like way, for example:  `--proxy=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT> URL`                  |
| `proxyIgnoreSSLErrors`   | Boolean          | `none`                                               | Disregard SSL errors when using a proxy.                                                                                                                                 |
| `logFormat`              | String           | `pretty`                                             | Format log output [choices: `"pretty"`, `"json"`]. Setting your log format to `json` allows you to have these logs automatically parsed when collected by Datadog.      |
| `concurrency`            | Integer          | `10`                                                 | Maximum number of tests executed in parallel.                                                                                                                            |
| `maxTimeout`             | Integer          | `60000`                                              | Maximum test execution duration, in milliseconds.                                                                                                                        |
| `maxBodySize`            | Integer          | `5e+6`                                               | Maximum HTTP body size for download, in bytes.                                                                                                                           |
| `maxBodySizeIfProcessed` | Integer          | `5e+6`                                               | Maximum HTTP body size for the assertions, in bytes.                                                                                                               |
| `regexTimeout`           | Integer          | `500`                                                | Maximum duration for regex execution, in milliseconds.                                                                                                        |

**Note**: These options and more can be found by running the help command for the Datadog worker:
```shell
docker run --rm datadog/synthetics-private-location-worker --help.
```

#### Proxy configuration

If traffic between your private location and Datadog has to go through a proxy, you need to set the `proxy` option to your proxy URL in a curl-like way (`--proxy=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT> URL` for instance). If you use this, no additional configuration on your proxy should be needed.

#### DNS configuration

By default, the Datadog workers use `8.8.8.8` to perform DNS resolution. If it fails, it makes a second attempt to communicate with `1.1.1.1`.
If you are testing an internal URL and need to use an internal DNS server, you can set the `dnsServer` option to a specific DNS IP address. Alternatively leverage the `dnsUseHost` parameter to have your worker use your local DNS config from the `etc/resolv.conf` file.

#### Special-purpose IPv4 whitelisting

If you are using private locations to monitor internal endpoints, some of your servers might be using [special-purpose IPv4][3]. These IPs are blacklisted by default, so if your private location needs to run a test on one of them, you first need to whitelist it using the `whitelistedRange` parameter.

### Install your private location worker

Launch your worker on:

{{< tabs >}}

{{% tab "Docker" %}}

Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

```shell
docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Create a Kubernetes ConfigMap with the previously created JSON file by executing the following:

```shell
kubectl create configmap private-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
```

Create a `private-worker-pod.yaml` file containing the below and modify `<MY_WORKER_CONFIG_FILE_NAME>.json` with the name of your Private Location JSON config file in the `subPath` section.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-location-worker
  annotations:
    ad.datadoghq.com/datadog-private-location-worker.logs: '[{"source":"private-location-worker","service":"synthetics"}]'
spec:
  containers:
  - name: datadog-private-location-worker
    image: datadog/synthetics-private-location-worker
    args: ["-f=json"]
    volumeMounts:
    - mountPath: /etc/datadog/synthetics-check-runner.json
      name: worker-config
      subPath: <MY_WORKER_CONFIG_FILE_NAME>.json
    livenessProbe:
      initialDelaySeconds: 30
      periodSeconds: 10
      timeoutSeconds: 2
      exec:
        command:
          - /bin/sh
          - -c
          - "[ $(expr $(cat /tmp/liveness.date) + 120000) -gt $(date +%s%3N) ]"
  volumes:
  - name: worker-config
    configMap:
      name: private-worker-config
```

Execute the below to apply the configuration to your pod:

```shell
kubectl apply -f private-worker-pod.yaml
```

{{% /tab %}}

{{< /tabs >}}

**Note**: Make sure to specify the [configuration parameters][4] you need in your configuration file or at the command level before launching your worker.

### Run tests from your worker

If your private location reports correctly to Datadog you should see the corresponding health status displayed if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages:

In your private locations list, in the **Settings** section:

{{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills"  style="width:90%;">}}

In the form when creating a test, below the **Private locations** section:

{{< img src="synthetics/private_locations/private_locations_in_list.png" alt="private locations in list"  style="width:90%;">}}

You should now be able to use your new private location as any other Datadog managed locations to run [Synthetics tests][1].

## Scale your private location

To scale a private location:

-   Change the `concurrency` parameter value to allow more parallel tests from one worker.
-   Add or remove workers associated to your private location. It is possible to run several containers for one private location with one single configuration file. Each worker would then request `N` tests to run depending on its number of free slots: when worker 1 is processing tests, worker 2 requests the following tests, etc.

## Security

The private location workers only pull data from Datadog servers. Datadog does not push data to the workers.
The secret access key, used to authenticate your private location worker to the Datadog servers, uses an in-house protocol based on [AWS Signature Version 4 protocol][5].

The test configurations are encrypted asymmetrically. The private key is used to decrypt the test configurations pulled by the workers from Datadog servers. The public key is used to encrypt the test results that are sent from the workers to Datadog's servers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/
[2]: https://docs.docker.com/engine/install/
[3]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[4]: /synthetics/private_locations/?tab=docker#configure-your-private-location
[5]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

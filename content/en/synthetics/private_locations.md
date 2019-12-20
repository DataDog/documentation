---
title: Run Synthetics tests from Private Locations
kind: documentation
description: Run Synthetics API and browser tests from Private Locations
beta: true
further_reading:
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/api_tests"
  tag: "Documentation"
  text: "Configure an API Test"
---

<div class="alert alert-warning">
This feature is in public beta and available for API Tests only. 
</div>

## Overview

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location.

## Setup

The private location worker is shipped as a Docker container, so it can run on a Linux based OS or Windows OS if the Docker engine is available on your host and can run in Linux containers mode.

By default, every second, your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test depending on the frequency defined in the configuration of the test, and returns the test results to Datadog’s servers.

Once you created a private location, configuring a Synthetics API test from a private location is completely identical to the one of Datadog managed locations.

### Create a new private location

1. Go in *Synthetics* -> *Settings* -> *Private Locations* and create a new private location:

    {{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations" responsive="true" style="width:70%;">}}

2. Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen.
    **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

3. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    ```
    docker run --init --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    One worker can process up to 10 tests in parallel by default. To scale a private location:
      * Change the `concurrency` parameter value to allow more parallel tests from one worker.
      * Add or remove workers on your host. It is possible to add several workers for one private location with one single configuration file. Each worker would then request `N` requests depending on its number of free slots and when worker 1 is processing tests, worker 2 requests the following tests, etc.

4. To pull test configurations and push test results, the private location worker needs access to one of the Datadog API endpoints:

    * For the Datadog US site: for version 0.1.6+ use `intake.synthetics.datadoghq.com` ( `api.datadoghq.com/api/` for versions <0.1.5).
    * For the Datadog EU site: `api.datadoghq.eu/api/`.

    Check if the endpoint corresponding to your Datadog `site` is available from the host runing the worker:

    * For the Datadog US site: for version 0.1.6+ use `curl intake.synthetics.datadoghq.com` (`curl https://api.datadoghq.com` for versions <0.1.5) .
    * For the Datadog EU site:   `curl https://api.datadoghq.eu`.
    
**Note**: You must allow outbound traffic on port `443` because test configurations are pulled and test results are pushed via HTTPS.

5. If your private location reports correctly to Datadog you should see the corresponding health status displayed if the private location polled your endpoint less than 5 seconds before loading the settings or create test pages:

  * In your private locations list, in the Settings section:

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills" responsive="true" style="width:70%;">}}

  * In the form when creating a test, below the Private locations section:

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="private locations in list" responsive="true" style="width:70%;">}}

6. You should now be able to use your new private location as any other Datadog managed locations for your [Synthetics API tests][1].

## Configuration

The `synthetics-private-location-worker` comes with a number of options that can be set to configure your private locations through the launch command or the configuration file. Arguments set in the launch command have precedence over the configuration file. However, these options aren't stored and are consequently only prevalent for a given launch:

| Option                   | Type             | Default                                              | Description                                                                                                                                                         |
|--------------------------|------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dnsServer`              | Array of Strings | `["8.8.8.8","1.1.1.1"]`                              | DNS server IPs used in given order (`--dnsServer="1.1.1.1" --dnsServer="8.8.8.8"`)                                                                                  |
| `dnsUseHost`             | Boolean          | `false`                                              | Use local DNS config in addition to --dnsServer (currently `["<DEFAULT_DNS_IN_HOST_CONFIG"]`)                                                                       |
| `blacklistedRange`       | Array of Strings | [IANA IPv4/IPv6 Special-Purpose Address Registry][2] | Deny access to IP ranges (e.g. `--blacklistedRange.4="127.0.0.0/8" --blacklistedRange.6="::1/128"`)                                                                 |
| `whitelistedRange`       | Array of Strings | `none`                                               | Grant access to IP ranges (e.g. `--whitelistedRange.4="10.0.0.0/8"` or `--whitelistedRange.4={"10.0.0.0/8","0.0.0.0/8"}`, has precedence over `--blacklistedRange`)                                                                                                |
| `site`                   | String           | `datadoghq.com`                                      | Datadog site (`datadoghq.com` or `datadoghq.eu`)                                                                                                                    |
| `proxy`                  | String           | `none`                                               | Proxy URL                                                                                                                                                           |
| `proxyIgnoreSSLErrors`                  | Boolean           | `none`                                               | Disregard SSL errors when using a proxy.                                                                                                                                                           |
| `logFormat`              | String           | `pretty`                                             | Format log output  [choices: `"pretty"`, `"json"`]. Setting your log format to `json` allows you to have these logs automatically parsed when collected by Datadog. |
| `concurrency`            | Integer          | `10`                                                 | Maximum number of tests executed in parallel.                                                                                                                       |
| `maxTimeout`             | Integer          | `60000`                                              | Maximum test execution duration, in milliseconds.                                                                                                                   |
| `maxBodySize`            | Integer          | `5e+6`                                               | Maximum HTTP body size for download, in bytes.                                                                                                                      |
| `maxBodySizeIfProcessed` | Integer          | `5e+6`                                               | Maximum HTTP body size for the assertions, in bytes.                                                                                                                |
| `regexTimeout`           | Integer          | `500`                                                | Maximum duration for regex execution, in milliseconds.                                                                                                              |


**Note**: These options and more can be found by running the help command for the Datadog worker `docker run --rm datadog/synthetics-private-location-worker --help`.

### Proxy configuration

If the traffic has to go through a proxy, you need to set the `proxy` option to your proxy URL in a curl-like way (`--proxy=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT> URL` for instance). If you use this, no additional configuration on your proxy should be needed.

### DNS configuration

By default, the Datadog workers use `8.8.8.8` to perform DNS resolution. If it fails, it makes a second attempt to communicate with `1.1.1.1`.

If you are testing an internal URL and need to use an internal DNS server you can set the `dnsServer` option to a specific DNS IP address. Alternatively leverage the `dnsUseHost` parameter to have your worker use your local DNS config from the `etc/resolv.conf` file.

### Special-purpose IPv4 whitelisting 

If you are using private locations to monitor internal endpoints, some of your servers might be using [special-purpose IPv4][2]. These IPs are blacklisted by default, so if your private location needs to run a test on one of them, you first need to whitelist it using the `whitelistedRange` parameter.

## Security

The private location workers only pull data from Datadog servers. Datadog does not push data to the workers.
The secret access key, used to authenticate your private location worker to the Datadog servers, uses an in-house protocol based on [AWS Signature Version 4 protocol][3].

The test configurations are encrypted asymmetrically. The private key is used to decrypt the test configurations pulled by the workers from Datadog servers. The public key is used to encrypt the test results that are sent from the workers to Datadog's servers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /synthetics/api_tests
[2]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

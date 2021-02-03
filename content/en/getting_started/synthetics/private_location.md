---
title: Getting Started with Private Locations
kind: documentation
further_reading:
    - link: '/getting_started/synthetics/api_test'
      tag: 'Documentation'
      text: 'Create your first API test'
    - link: '/synthetics/private_locations'
      tag: 'Documentation'
      text: 'Learn more about Private Locations'
---

<div class="alert alert-warning">
The access to this feature is restricted - if you don't have access, reach out to the <a href="https://docs.datadoghq.com/help/">Datadog support team</a>.
</div>

## Overview

Private locations allow you to **monitor internal-facing applications or any private URLs** that aren’t accessible from the public internet. They can also be used to:

* **Create custom locations** in areas that are mission-critical to your business.
* **Verify application performance in your internal CI environment** before you release new features to production with [Synthetic CI test integration][1].
* **Compare application performance** from both inside and outside your internal network.

Private locations come as Docker containers that you can install wherever makes sense inside of your private network. Once created and installed, you can assign [Synthetic tests][2] to your private location just like you would with any regular managed location.

Your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test on a schedule or on-demand, and returns the test results to Datadog’s servers. You can then visualize your private locations test results in a completely identical manner to how you would visualize tests running from managed locations:

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assign Synthetic test to private location"  style="width:100%;">}}

The private location worker is available on Docker Hub:

| Docker Hub                                                                |
|---------------------------------------------------------------------------|
| [hub.docker.com/r/datadog/synthetics-private-location-worker][3]          |

## Create your private location

1. Set up a [Vagrant Ubuntu 16.04 virtual machine][2].
2. Install [Docker][4] on that machine.
3. In the Datadog app, hover over **[UX Monitoring][5]** and select *Settings* -> *Private Locations*. Click **Add Private Location**.
4. Fill out your private location details (only `Name` and `API key` fields are mandatory). Click **Save Location and Generate Configuration File** to generate the configuration file associated with your private location on your worker.
5. Specify the proxy URL if the traffic between your private location and Datadog needs to go through a proxy. You can also optionally toggle the **Block reserved IPs** button to block a default set of reserved IP ranges ([IPv4 address registry][6] and [IPv6 address registry][7]).
6. Copy and paste your private location configuration file to your working directory.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen. **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

7. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

8. If your private location reports correctly to Datadog, you will see an `OK` health status on your private locations list, in the **Settings** section:

    {{< img src="synthetics/private_locations/pl_health.png" alt="Private Location Health"  style="width:100%;">}}

    You will also see private location logs populating similar to this example:

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

You are now able to use your new private location as any other Datadog managed locations to run Synthetic tests.

## Run synthetic tests with your private location

1. Create an API or a Browser on any internal endpoint or application you want to monitor.
2. Select the new private location under **Private Locations**:

    {{< img src="synthetics/private_locations/assign_test_pl.png" alt="Assign Synthetic test to private location"  style="width:75%;">}}

3. Go ahead with your test creation!

{{< whatsnext desc="After you set up your private location:">}}
{{< nextlink href="/getting_started/synthetics/api_test" tag="Documentation" >}}Create your first API test{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics/browser_test" tag="Documentation" >}}Create your first Browser test{{< /nextlink >}}
{{< nextlink href="/synthetics/private_locations" tag="Documentation" >}}Learn more about Private Locations{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /getting_started/synthetics/api_test/
[2]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[3]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml

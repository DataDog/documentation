---
title: Getting Started with Private Locations
kind: documentation
further_reading:
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Create your first API test"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Learn more about Private Locations"
---

<div class="alert alert-warning">
This feature is in public beta and available for API Tests only.
</div>

## Overview

Private locations allow you to monitor internal-facing applications or any private URLs that aren’t accessible from the public internet. They can also be used to create a new custom Synthetics location.

The private location worker is shipped as a Docker container, so it can run on a Linux based OS or Windows OS if the Docker engine is available on your host and can run in Linux containers mode.

By default, every second, your private location worker pulls your test configurations from Datadog’s servers using HTTPS, executes the test depending on the frequency defined in the configuration of the test, and returns the test results to Datadog’s servers.

Once you create a private location, the process of configuring a [Synthetics API test][1] from that private location is completely identical to that for Datadog managed locations.

## Configure your Private Location

1. Set up a [Vagrant Ubuntu 16.04 virtual machine][2].
2. Install [Docker][3] on that machine.
3. In the Datadog app, hover over **[UX Monitoring][4]** and select **Settings** -> **Private Locations**. Add a new private location:

    {{< img src="synthetics/private_locations/create_private_location.png" alt="create a private locations" responsive="true" style="width:100%;">}}

4. Fill out the Location Details and click **Save and Generate** to generate the configuration file associated with your private location on your worker.

5. Copy and paste the first tooltip to create your private location configuration file.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the Private Locations screen. **You need to be able to reference these secrets again if you decide to add more workers, or to install workers on another host.**

6. Launch your worker as a standalone container using the Docker run command provided and the previously created configuration file:

    ```
    docker run --init --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

7. If your private location reports correctly to Datadog, you will see the corresponding health status displayed if the private location polled your endpoint less than five seconds before loading the settings or create test pages:

    In your private locations list, in the **Settings** section:

    {{< img src="synthetics/private_locations/private_location_pill.png" alt="private locations pills" responsive="true" style="width:100%;">}}

    In the form when creating a test, below the private locations section:

    {{< img src="synthetics/private_locations/private_locations_in_list.png" alt="Private locations in list" responsive="true" style="width:75%;">}}

    You will also see private location logs populating similar to this example:
    ```
    2019-12-17 13:05:03 [info]: 	Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: 	Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: 	Fetching 10 messages from queue - 10 slots available
    ```

You are now able to use your new private location as any other Datadog managed locations for your Synthetics API tests. This is specifically useful to monitor any internal endpoints you might have.

## Run tests with your Private Location

8. Create an API test on any endpoint (including internal) you're interested in monitoring. If you don't know where to start you can use `https://www.shopist.io/`, which is a test web application.
9. Select the new private location under **Private Locations**.
10. Click the **Save Test** button.

For a more advanced setup, use the command and see `Learn more about Private Locations` below:

```
docker run --rm datadog/synthetics-private-location-worker --help and check
```

{{< whatsnext desc="After you set up your private location:">}}
    {{< nextlink href="/getting_started/synthetics/api_test" tag="Documentation" >}}Create your first API test{{< /nextlink >}}
    {{< nextlink href="/synthetics/private_locations" tag="Documentation" >}}Learn more about Private Locations{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /getting_started/synthetics/api_test
[2]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[3]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[4]: https://app.datadoghq.com/synthetics/list

---
title: Getting Started with Private Locations
kind: documentation
further_reading:
    - link: '/getting_started/synthetics/api_test'
      tag: 'Documentation'
      text: 'Create your first API test'
    - link: '/getting_started/synthetics/browser_test'
      tag: 'Documentation'
      text: 'Create your first Browser test'
    - link: '/synthetics/private_locations'
      tag: 'Documentation'
      text: 'Learn more about Private Locations'
---

<div class="alert alert-warning">
The access to this feature is restricted - if you don't have access, reach out to the <a href="https://docs.datadoghq.com/help/">Datadog support team</a>.
</div>

## Overview

Private locations allow you to **monitor internal-facing applications** or private URLs that aren’t accessible from the public internet. 

You can also use private locations to:

- **Create custom locations** in mission-critical areas of your business.
- **Verify the application performance in your internal testing environment** before you release new features to production with [Synthetic CI/CD Testing][1].
- **Compare the application performance** from inside and outside your internal network.

Private locations are Docker containers that you can install anywhere inside your private network. Once you've created and installed your private location, you can assign [Synthetic tests][2] to your private location just like you would with a managed location. 

Your private locations test results display identically to your managed location test results. You can access the [private location worker][3] on Docker Hub.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assign Synthetic test to private location"  style="width:100%;">}}

## Create your private location

1. Install [Docker][4] on a machine. To get started quickly, you can install Docker on a virtual machine such as [Vagrant Ubuntu 16.04][2].
2. In the Datadog application, hover over **[UX Monitoring][5]** and select **Settings** > **Private Locations**. 
3. Click **Add Private Location**.
4. Fill out your private location details (only `Name` and `API key` fields are mandatory). Depending on where you installed your private location (such as behind a proxy), you may need to configure additional parameters. For more information, see [Private Locations Configuration Options][8]. 
5. Click **Save Location and Generate Configuration File** to generate the configuration file associated with your private location on your worker.
6. Copy and paste your private location configuration file to your working directory.

    **Note**: The configuration file contains secrets for private location authentication, test configuration decryption, and test result encryption. Datadog does not store the secrets, so store them locally before leaving the **Private Locations** page. **You need to be able to reference the secrets again in order to add more workers to your private location**. 
    
7. Launch your worker as a standalone container using the Docker `run` command and the previously created configuration file:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

8. If your private location reports correctly to Datadog, you will see an `OK` health status on your **Private Locations** list in **Settings**:

    {{< img src="synthetics/private_locations/pl_health.png" alt="Private Location Health"  style="width:100%;">}}

    You should also receive private location logs on your terminal:

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

You are now able to use your new private location just like a managed location to run Synthetic tests.

## Run synthetic tests with your private location

1. Create an [API test][2], [multistep API test][9], or [browser test][10] on any internal endpoint or application you want to monitor.
2. Under **Private Locations**, select your new private location:

    {{< img src="synthetics/private_locations/assign_test_pl.png" alt="Assign Synthetic test to private location"  style="width:75%;">}}

3. Continue filling out your test!

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/ci/
[2]: /getting_started/synthetics/api_test/
[3]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[8]: /synthetics/private_locations/configuration/#configuration-options
[9]: /getting_started/synthetics/api_test#create-a-multistep-api-test
[10]: /getting_started/synthetics/browser_test
